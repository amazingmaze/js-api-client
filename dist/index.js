// src/core/client.ts
var http2 = null;
if (typeof process !== "undefined" && process.versions && process.versions.node) {
  http2 = await import("node:http2");
}
function authenticationHeaders(config) {
  if (config.sessionId) {
    return {
      Cookie: "connect.sid=" + config.sessionId
    };
  }
  if (config.staticAuthToken) {
    return {
      "X-Crystallize-Static-Auth-Token": config.staticAuthToken
    };
  }
  return {
    "X-Crystallize-Access-Token-Id": config.accessTokenId || "",
    "X-Crystallize-Access-Token-Secret": config.accessTokenSecret || ""
  };
}
async function post(grab, path, config, query, variables, init, options) {
  try {
    const { headers: initHeaders, ...initRest } = init || {};
    const profiling = options?.profiling;
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
      ...authenticationHeaders(config),
      ...initHeaders
    };
    const body = JSON.stringify({ query, variables });
    let start = 0;
    if (profiling) {
      start = Date.now();
      if (profiling.onRequest) {
        profiling.onRequest(query, variables);
      }
    }
    const response = await grab(path, {
      ...initRest,
      method: "POST",
      headers,
      body
    });
    if (profiling) {
      const ms = Date.now() - start;
      let serverTiming = response.headers.get("server-timing") ?? void 0;
      if (Array.isArray(serverTiming)) {
        serverTiming = serverTiming[0];
      }
      const duration = serverTiming?.split(";")[1]?.split("=")[1] ?? -1;
      profiling.onRequestResolved(
        {
          resolutionTimeMs: ms,
          serverTimeMs: Number(duration)
        },
        query,
        variables
      );
    }
    if (response.ok && 204 === response.status) {
      return {};
    }
    if (!response.ok) {
      const json2 = await response.json();
      throw {
        code: response.status,
        statusText: response.statusText,
        message: json2.message,
        errors: json2.errors || {}
      };
    }
    const json = await response.json();
    if (json.errors) {
      throw {
        code: 400,
        statusText: "Error was returned from the API",
        message: json.errors[0].message,
        errors: json.errors || {}
      };
    }
    return json.data;
  } catch (exception) {
    throw exception;
  }
}
function apiHost(configuration) {
  const origin = configuration.origin || ".crystallize.com";
  return (path, prefix = "api") => `https://${prefix}${origin}/${path.join("/")}`;
}
function createApiCaller(grab, uri, configuration, options) {
  return function callApi(query, variables) {
    return post(
      grab,
      uri,
      configuration,
      query,
      variables,
      options?.extraHeaders ? {
        headers: options.extraHeaders
      } : void 0,
      options
    );
  };
}
var getExpirationAtFromToken = (token) => {
  const payload = token.split(".")[1];
  const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
  const parsedPayload = JSON.parse(decodedPayload);
  return parsedPayload.exp * 1e3;
};
function shopApiCaller(grab, configuration, options) {
  const identifier = configuration.tenantIdentifier;
  let shopApiToken = configuration.shopApiToken;
  return async function callApi(query, variables) {
    const tokenExpiresAt = shopApiToken ? getExpirationAtFromToken(shopApiToken) : null;
    const isTokenAboutToExpireOrIsExpired = tokenExpiresAt ? tokenExpiresAt - Date.now() < 1e3 * 60 * 5 : true;
    if ((!shopApiToken || isTokenAboutToExpireOrIsExpired) && options?.shopApiToken?.doNotFetch !== true) {
      const { staticAuthToken, ...withoutStaticAuthToken } = configuration;
      const headers = {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        ...authenticationHeaders(withoutStaticAuthToken)
      };
      const response = await grab(apiHost(configuration)([`@${identifier}`, "auth", "token"], "shop-api"), {
        method: "POST",
        headers,
        body: JSON.stringify({
          scopes: options?.shopApiToken?.scopes || ["cart"],
          expiresIn: options?.shopApiToken?.expiresIn || 3600 * 12
        })
      });
      const results = await response.json();
      if (results.success !== true) {
        throw new Error("Could not fetch shop api token: " + results.error);
      }
      shopApiToken = results.token;
    }
    return post(
      grab,
      apiHost(configuration)([`@${identifier}`, "cart"], "shop-api"),
      {
        ...configuration,
        shopApiToken
      },
      query,
      variables,
      {
        headers: {
          Authorization: `Bearer ${shopApiToken}`
        }
      },
      options
    );
  };
}
function createClient(configuration, options) {
  const identifier = configuration.tenantIdentifier;
  const clients = /* @__PURE__ */ new Map();
  const IDLE_TIMEOUT = 3e5;
  const grab = (url, grabOptions) => {
    if (options?.useHttp2 !== true) {
      return fetch(url, grabOptions);
    }
    const closeAndDeleteClient = (origin) => {
      const clientObj = clients.get(origin);
      if (clientObj) {
        clientObj.client.close();
        clients.delete(origin);
      }
    };
    const resetIdleTimeout = (origin) => {
      const clientObj = clients.get(origin);
      if (clientObj && clientObj.idleTimeout) {
        clearTimeout(clientObj.idleTimeout);
      }
      clientObj.idleTimeout = setTimeout(() => {
        closeAndDeleteClient(origin);
      }, IDLE_TIMEOUT);
    };
    const getClient = (origin) => {
      if (!clients.has(origin) || clients.get(origin).client.closed) {
        closeAndDeleteClient(origin);
        if (!http2) {
          throw new Error("HTTP/2 is not available in this environment. Ensure 'useHttp2' is false.");
        }
        const client = http2.connect(origin);
        client.on("error", () => {
          closeAndDeleteClient(origin);
        });
        clients.set(origin, { client, idleTimeout: null });
        resetIdleTimeout(origin);
      }
      return clients.get(origin).client;
    };
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const origin = urlObj.origin;
      const client = getClient(origin);
      resetIdleTimeout(origin);
      const headers = {
        ":method": grabOptions.method || "GET",
        ":path": urlObj.pathname + urlObj.search,
        ...grabOptions.headers
      };
      const req = client.request(headers);
      if (grabOptions.body) {
        req.write(grabOptions.body);
      }
      req.setEncoding("utf8");
      let responseData = "";
      req.on("response", (headers2) => {
        const responseHeaders = {};
        for (const name in headers2) {
          responseHeaders[name.toLowerCase()] = headers2[name];
        }
        const status = headers2[":status"] || 500;
        const statusText = statusTexts[status] || "";
        const response = {
          status,
          statusText,
          ok: status >= 200 && status < 300,
          headers: {
            get: (name) => responseHeaders[name.toLowerCase()]
          },
          text: () => Promise.resolve(responseData),
          json: () => Promise.resolve(JSON.parse(responseData))
        };
        req.on("data", (chunk) => {
          responseData += chunk;
        });
        req.on("end", () => {
          resetIdleTimeout(origin);
          resolve(response);
        });
        req.on("error", (err) => {
          resetIdleTimeout(origin);
          reject(err);
        });
      });
      req.end();
    });
  };
  const commonConfig = {
    tenantIdentifier: configuration.tenantIdentifier,
    tenantId: configuration.tenantId,
    origin: configuration.origin
  };
  const pimConfig = {
    ...commonConfig,
    sessionId: configuration.sessionId,
    accessTokenId: configuration.accessTokenId,
    accessTokenSecret: configuration.accessTokenSecret
  };
  const catalogConfig = {
    ...commonConfig,
    staticAuthToken: configuration.staticAuthToken,
    accessTokenId: configuration.accessTokenId,
    accessTokenSecret: configuration.accessTokenSecret
  };
  const discoveryConfig = {
    ...commonConfig,
    staticAuthToken: configuration.staticAuthToken
  };
  const tokenOnlyConfig = {
    ...commonConfig,
    accessTokenId: configuration.accessTokenId,
    accessTokenSecret: configuration.accessTokenSecret
  };
  return {
    catalogueApi: createApiCaller(grab, apiHost(configuration)([identifier, "catalogue"]), catalogConfig, options),
    discoveryApi: createApiCaller(
      grab,
      apiHost(configuration)([identifier, "discovery"]),
      discoveryConfig,
      options
    ),
    searchApi: createApiCaller(grab, apiHost(configuration)([identifier, "search"]), catalogConfig, options),
    orderApi: createApiCaller(grab, apiHost(configuration)([identifier, "orders"]), tokenOnlyConfig, options),
    subscriptionApi: createApiCaller(
      grab,
      apiHost(configuration)([identifier, "subscriptions"]),
      tokenOnlyConfig,
      options
    ),
    pimApi: createApiCaller(grab, apiHost(configuration)(["graphql"], "pim"), pimConfig, options),
    nextPimApi: createApiCaller(grab, apiHost(configuration)([`@${identifier}`]), pimConfig, options),
    shopCartApi: shopApiCaller(grab, configuration, options),
    config: {
      tenantId: configuration.tenantId,
      tenantIdentifier: configuration.tenantIdentifier,
      origin: configuration.origin
    },
    close: () => {
      clients.forEach((clientObj) => {
        if (clientObj.idleTimeout) {
          clearTimeout(clientObj.idleTimeout);
        }
        clientObj.client.close();
      });
      clients.clear();
    }
  };
}
var statusTexts = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required"
};

// src/core/massCallClient.ts
var createFibonnaciSleeper = () => {
  let fibonnaciA = 0, fibonnaciB = 1;
  const sleep = (s) => new Promise((r) => setTimeout(r, s * 1e3));
  return {
    wait: async () => {
      const waitTime = fibonnaciA + fibonnaciB;
      fibonnaciA = fibonnaciB;
      fibonnaciB = waitTime;
      await sleep(waitTime);
    },
    reset: () => {
      fibonnaciA = 0;
      fibonnaciB = 1;
    }
  };
};
function createMassCallClient(client, options) {
  let promises = [];
  let failedPromises = [];
  let seek = 0;
  const maxConcurrent = options.maxSpawn ?? 5;
  let increment = options.initialSpawn ?? 1;
  const sleeper = options.sleeper ?? createFibonnaciSleeper();
  const execute = async () => {
    failedPromises = [];
    let batch = [];
    let results = [];
    do {
      let batchErrorCount = 0;
      const to = seek + increment;
      batch = promises.slice(seek, to);
      const batchResults = await Promise.all(
        batch.map(async (promise) => {
          const buildStandardPromise = async (promise2) => {
            try {
              return {
                key: promise2.key,
                result: await promise2.caller(promise2.query, promise2.variables)
              };
            } catch (exception) {
              batchErrorCount++;
              const enqueueFailure = options.onFailure ? await options.onFailure({ from: seek, to }, exception, promise2) : true;
              if (enqueueFailure) {
                failedPromises.push(promise2);
              }
            }
          };
          if (!options.beforeRequest && !options.afterRequest) {
            return buildStandardPromise(promise);
          }
          return new Promise(async (resolve) => {
            let alteredPromise;
            if (options.beforeRequest) {
              alteredPromise = await options.beforeRequest({ from: seek, to }, promise);
            }
            const result = await buildStandardPromise(alteredPromise ?? promise);
            if (options.afterRequest && result) {
              await options.afterRequest({ from: seek, to }, promise, {
                [result.key]: result.result
              });
            }
            resolve(result);
          });
        })
      );
      batchResults.forEach((result) => {
        if (result) {
          results[result.key] = result.result;
        }
      });
      if (options.onBatchDone) {
        options.onBatchDone({ from: seek, to });
      }
      seek += batch.length;
      if (batchErrorCount === batch.length) {
        await sleeper.wait();
      } else {
        sleeper.reset();
      }
      if (batchErrorCount > Math.floor(batch.length / 2)) {
        increment = options.changeIncrementFor ? options.changeIncrementFor("more-than-half-have-failed", increment) : 1;
      } else if (batchErrorCount > 0 && increment > 1) {
        increment = options.changeIncrementFor ? options.changeIncrementFor("some-have-failed", increment) : increment - 1;
      } else if (batchErrorCount === 0 && increment < maxConcurrent) {
        increment = options.changeIncrementFor ? options.changeIncrementFor("none-have-failed", increment) : increment + 1;
      }
    } while (batch.length > 0 && seek < promises.length);
    return results;
  };
  let counter = 1;
  return {
    execute,
    reset: () => {
      promises = [];
      seek = 0;
      failedPromises = [];
    },
    hasFailed: () => failedPromises.length > 0,
    failureCount: () => failedPromises.length,
    retry: async () => {
      promises = [...failedPromises];
      failedPromises = [];
      seek = 0;
      return await execute();
    },
    catalogueApi: client.catalogueApi,
    discoveryApi: client.discoveryApi,
    searchApi: client.searchApi,
    orderApi: client.orderApi,
    subscriptionApi: client.subscriptionApi,
    pimApi: client.pimApi,
    shopCartApi: client.shopCartApi,
    nextPimApi: client.nextPimApi,
    config: client.config,
    close: client.close,
    enqueue: {
      catalogueApi: (query, variables) => {
        const key = `catalogueApi-${counter++}`;
        promises.push({ key, caller: client.catalogueApi, query, variables });
        return key;
      },
      discoveryApi: (query, variables) => {
        const key = `discoveryApi-${counter++}`;
        promises.push({ key, caller: client.discoveryApi, query, variables });
        return key;
      },
      searchApi: (query, variables) => {
        const key = `searchApi-${counter++}`;
        promises.push({ key, caller: client.searchApi, query, variables });
        return key;
      },
      orderApi: (query, variables) => {
        const key = `orderApi-${counter++}`;
        promises.push({ key, caller: client.orderApi, query, variables });
        return key;
      },
      subscriptionApi: (query, variables) => {
        const key = `subscriptionApi-${counter++}`;
        promises.push({ key, caller: client.subscriptionApi, query, variables });
        return key;
      },
      pimApi: (query, variables) => {
        const key = `pimApi-${counter++}`;
        promises.push({ key, caller: client.pimApi, query, variables });
        return key;
      },
      nextPimApi: (query, variables) => {
        const key = `nextPimApi-${counter++}`;
        promises.push({ key, caller: client.nextPimApi, query, variables });
        return key;
      }
    }
  };
}

// src/core/navigation.ts
import { jsonToGraphQLQuery, VariableType } from "json-to-graphql-query";
var NavigationType = /* @__PURE__ */ ((NavigationType2) => {
  NavigationType2[NavigationType2["Tree"] = 0] = "Tree";
  NavigationType2[NavigationType2["Topics"] = 1] = "Topics";
  return NavigationType2;
})(NavigationType || {});
function nestedQuery(depth, start = 1, extraQuery) {
  const props = {
    id: true,
    name: true,
    path: true,
    ...extraQuery !== void 0 ? extraQuery(start - 1) : {}
  };
  if (depth <= 1) {
    return props;
  }
  return {
    ...props,
    children: {
      ...nestedQuery(depth - 1, start + 1, extraQuery)
    }
  };
}
function buildQueryFor(type, path) {
  switch (type) {
    case 0 /* Tree */:
      return {
        __variables: {
          language: "String!",
          path: "String!"
        },
        tree: {
          __aliasFor: "catalogue",
          __args: {
            language: new VariableType("language"),
            path: new VariableType("path")
          }
        }
      };
    case 1 /* Topics */:
      if (path === "" || path === "/") {
        return {
          __variables: {
            language: "String!"
          },
          tree: {
            __aliasFor: "topics",
            __args: {
              language: new VariableType("language")
            }
          }
        };
      }
      return {
        __variables: {
          language: "String!",
          path: "String!"
        },
        tree: {
          __aliasFor: "topic",
          __args: {
            language: new VariableType("language"),
            path: new VariableType("path")
          }
        }
      };
  }
}
function fetchTree(client, type) {
  return (path, language, depth = 1, extraQuery, perLevel) => {
    const query = buildNestedNavigationQuery(type, path, depth, extraQuery, perLevel);
    return client.catalogueApi(query, { language, path });
  };
}
function buildNestedNavigationQuery(type, path, depth, extraQuery, perLevel) {
  const baseQuery = buildQueryFor(type, path);
  const query = {
    ...baseQuery,
    tree: {
      ...baseQuery.tree,
      ...nestedQuery(depth, 1, perLevel)
    },
    ...extraQuery !== void 0 ? extraQuery : {}
  };
  return jsonToGraphQLQuery({ query });
}
function createNavigationFetcher(client) {
  return {
    byFolders: fetchTree(client, 0 /* Tree */),
    byTopics: fetchTree(client, 1 /* Topics */)
  };
}

// src/core/hydrate.ts
import { jsonToGraphQLQuery as jsonToGraphQLQuery2 } from "json-to-graphql-query";
var priceListBlock = {
  startDate: true,
  endDate: true,
  price: true,
  identifier: true,
  modifier: true,
  modifierType: true
};
function byPaths(client, options) {
  return (paths, language, extraQuery, perProduct, perVariant) => {
    const productListQuery = paths.reduce((acc, path, index) => {
      acc[`product${index}`] = {
        __aliasFor: "catalogue",
        __args: { path, language },
        name: true,
        path: true,
        __on: {
          __typeName: "Product",
          vatType: {
            name: true,
            percent: true
          },
          variants: {
            sku: true,
            name: true,
            attributes: {
              attribute: true,
              value: true
            },
            priceVariants: {
              name: true,
              price: true,
              identifier: true,
              currency: true,
              ...options?.priceForEveryone === true ? {
                priceForEveryone: priceListBlock
              } : {},
              ...options?.priceList ? {
                priceList: {
                  __args: { identifier: options.priceList },
                  ...priceListBlock
                }
              } : {},
              ...options?.marketIdentifiers ? {
                priceFor: {
                  __args: { marketIdentifiers: options.marketIdentifiers },
                  ...priceListBlock
                }
              } : {}
            },
            ...perVariant !== void 0 ? perVariant(path, index) : {}
          },
          ...perProduct !== void 0 ? perProduct(path, index) : {}
        }
      };
      return acc;
    }, {});
    const query = {
      ...{ ...productListQuery },
      ...extraQuery !== void 0 ? extraQuery : {}
    };
    const fetch2 = client.catalogueApi;
    return fetch2(jsonToGraphQLQuery2({ query }));
  };
}
function bySkus(client, options) {
  async function getPathForSkus(skus, language) {
    const pathsSet = /* @__PURE__ */ new Set();
    let afterCursor;
    async function getNextPage() {
      if (options?.useSyncApiForSKUs) {
        const pimAPIResponse = await client.pimApi(
          `query GET_PRODUCTS_BY_SKU (
                        $skus: [String!]
                        $language: String!
                        $tenantId: ID!
                        ) {
                        product {
                            getVariants(skus: $skus, language: $language, tenantId: $tenantId) {
                                sku
                                product {
                                    tree {
                                        path
                                    }
                                }
                            }
                        }
                    }`,
          {
            skus,
            language,
            tenantId: client.config.tenantId
          }
        );
        skus.forEach((sku) => {
          const match = pimAPIResponse.product.getVariants.find((v) => v.sku === sku);
          if (match) {
            pathsSet.add(match.product.tree.path);
          }
        });
      } else {
        const searchAPIResponse = await client.searchApi(
          `query GET_PRODUCTS_BY_SKU ($skus: [String!], $after: String, $language: String!) {
                    search (
                        after: $after
                        language: $language
                        filter: {
                            include: {
                                skus: $skus
                            }
                        }
                    ) {
                        pageInfo {
                            endCursor
                            hasNextPage
                        }
                        edges {
                            node {
                                path
                            }
                        }
                    }
                }`,
          {
            skus,
            after: afterCursor,
            language
          }
        );
        const { edges, pageInfo } = searchAPIResponse.search || {};
        edges?.forEach((edge) => pathsSet.add(edge.node.path));
        if (pageInfo?.hasNextPage) {
          afterCursor = pageInfo.endCursor;
          await getNextPage();
        }
      }
    }
    await getNextPage();
    return Array.from(pathsSet);
  }
  return async (skus, language, extraQuery, perProduct, perVariant) => {
    const paths = await getPathForSkus(skus, language);
    if (paths.length === 0) {
      const empty = skus.reduce((acc, sku, index) => {
        acc[`product${index}`] = {};
        return acc;
      }, {});
      return empty;
    }
    return byPaths(client, options)(paths, language, extraQuery, perProduct, perVariant);
  };
}
function createProductHydrater(client, options) {
  return {
    byPaths: byPaths(client, options),
    bySkus: bySkus(client, options)
  };
}

// src/core/catalogue.ts
import { jsonToGraphQLQuery as jsonToGraphQLQuery3 } from "json-to-graphql-query";

// src/types/catalogue.ts
import { z } from "zod";
var componentType = z.enum([
  "Boolean",
  "ComponentChoice",
  "ContentChunk",
  "Datetime",
  "File",
  "GridRelations",
  "Image",
  "ItemRelations",
  "Location",
  "Numeric",
  "ParagraphCollection",
  "PropertiesTable",
  "RichText",
  "Selection",
  "SingleLine",
  "Video"
]).transform((value) => `${value}Content`);

// src/core/catalogue.ts
function createCatalogueFetcher(client) {
  return (query, variables) => {
    return client.catalogueApi(jsonToGraphQLQuery3({ query }), variables);
  };
}
var catalogueFetcherGraphqlBuilder = {
  onItem,
  onProduct,
  onDocument,
  onFolder,
  onComponent,
  onSubscriptionPlan
};
function onItem(onItem2, c) {
  return {
    __typeName: "Item",
    __typename: true,
    name: true,
    path: true,
    ...onItem2,
    topics: {
      name: true,
      path: true,
      ...c?.onTopic ? c.onTopic : {}
    }
  };
}
function onDocument(onDocument2, c) {
  return {
    __typeName: "Document",
    __typename: true,
    ...onDocument2
  };
}
function onFolder(onFolder2, c) {
  const children = () => {
    if (c?.onChildren) {
      return {
        chidlren: {
          ...c.onChildren
        }
      };
    }
    return {};
  };
  return {
    __typeName: "Folder",
    __typename: true,
    ...onFolder2,
    ...children()
  };
}
function onProduct(onProduct2, c) {
  const priceVariant = () => {
    if (c?.onPriceVariant) {
      return {
        priceVariants: {
          ...c.onPriceVariant
        }
      };
    }
    return {};
  };
  const variants = () => {
    if (c?.onVariant) {
      return {
        variants: {
          name: true,
          sku: true,
          price: true,
          ...priceVariant(),
          ...c?.onVariant ? c.onVariant : {}
        }
      };
    }
    return {};
  };
  const defaultVariant = () => {
    if (c?.onDefaultVariant) {
      return {
        defaultVariant: {
          ...c.onDefaultVariant
        }
      };
    }
    return {};
  };
  return {
    __typeName: "Product",
    __typename: true,
    ...onProduct2,
    vatType: {
      name: true,
      percent: true
    },
    ...defaultVariant(),
    ...variants()
  };
}
var camelCaseHyphens = (id) => id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
function onComponent(id, type, onComponent2, c) {
  const validType = componentType.parse(type);
  const aliasName = camelCaseHyphens(id);
  return {
    [aliasName]: {
      __aliasFor: "component",
      __args: {
        id
      },
      content: {
        __typename: true,
        __on: {
          __typeName: validType,
          ...onComponent2
        }
      }
    }
  };
}
function onSubscriptionPlan(c) {
  const period = (name) => {
    return {
      ...c?.onPeriod ? c.onPeriod(name) : {},
      priceVariants: {
        identifier: true,
        name: true,
        price: true,
        currency: true
      },
      meteredVariables: {
        id: true,
        name: true,
        identifier: true,
        tierType: true,
        tiers: {
          threshold: true,
          priceVariants: {
            identifier: true,
            name: true,
            price: true,
            currency: true
          }
        }
      }
    };
  };
  return {
    subscriptionPlans: {
      identifier: true,
      name: true,
      periods: {
        id: true,
        name: true,
        initial: period("initial"),
        recurring: period("recurring")
      }
    }
  };
}

// src/types/order.ts
import { EnumType as EnumType3 } from "json-to-graphql-query";
import { z as z5 } from "zod";

// src/types/customer.ts
import { z as z3 } from "zod";

// src/types/address.ts
import { z as z2 } from "zod";
import { EnumType } from "json-to-graphql-query";
var addressInputRequest = z2.object({
  type: z2.enum(["delivery", "billing", "other"]).transform((val) => new EnumType(val)),
  firstName: z2.string().optional(),
  middleName: z2.string().optional(),
  lastName: z2.string().optional(),
  street: z2.string().optional(),
  street2: z2.string().optional(),
  streetNumber: z2.string().optional(),
  postalCode: z2.string().optional(),
  city: z2.string().optional(),
  state: z2.string().optional(),
  country: z2.string().optional(),
  phone: z2.string().optional(),
  email: z2.string().optional(),
  meta: z2.array(z2.object({ key: z2.string(), value: z2.string().optional() })).optional()
}).strict();

// src/types/customer.ts
var orderCustomerInputRequest = z3.object({
  identifier: z3.string().optional(),
  firstName: z3.string().optional(),
  middleName: z3.string().optional(),
  lastName: z3.string().optional(),
  birthDate: z3.date().optional(),
  companyName: z3.string().optional(),
  taxNumber: z3.string().optional(),
  addresses: z3.array(addressInputRequest).optional()
}).strict();
var createCustomerInputRequest = orderCustomerInputRequest.extend({
  tenantId: z3.string().optional(),
  lastName: z3.string(),
  firstName: z3.string(),
  phone: z3.string().optional(),
  meta: z3.array(
    z3.object({
      key: z3.string(),
      value: z3.string().optional()
    })
  ).optional(),
  identifier: z3.string().optional(),
  externalReferences: z3.array(
    z3.object({
      key: z3.string(),
      value: z3.string().optional()
    })
  ).optional(),
  email: z3.string()
}).strict();
var updateCustomerInputRequest = createCustomerInputRequest.omit({ identifier: true, tenantId: true });

// src/types/payment.ts
import { z as z4 } from "zod";
import { EnumType as EnumType2 } from "json-to-graphql-query";
var paymentProvider = z4.enum(["klarna", "stripe", "paypal", "cash", "custom"]).transform((val) => new EnumType2(val));
var klarnaPaymentInputRequest = z4.object({
  klarna: z4.string().optional(),
  orderId: z4.string().optional(),
  recurringToken: z4.string().optional(),
  status: z4.string().optional(),
  merchantReference1: z4.string().optional(),
  merchantReference2: z4.string().optional(),
  metadata: z4.string().optional()
}).strict();
var paypalPaymentInputRequest = z4.object({
  paypal: z4.string().optional(),
  orderId: z4.string().optional(),
  subscriptionId: z4.string().optional(),
  invoiceId: z4.string().optional(),
  metadata: z4.string().optional()
}).strict();
var stripePaymentInputRequest = z4.object({
  stripe: z4.string().optional(),
  customerId: z4.string().optional(),
  orderId: z4.string().optional(),
  paymentMethod: z4.string().optional(),
  paymentMethodId: z4.string().optional(),
  paymentIntentId: z4.string().optional(),
  subscriptionId: z4.string().optional(),
  metadata: z4.string().optional()
}).strict();
var cashPaymentInputRequest = z4.object({
  cash: z4.string().optional()
}).strict();
var customPaymentInputRequest = z4.object({
  properties: z4.array(
    z4.object({
      property: z4.string(),
      value: z4.string().optional()
    })
  ).optional()
}).strict();

// src/types/order.ts
var orderItemMeteredVariableInputRequest = z5.object({
  id: z5.string(),
  usage: z5.number(),
  price: z5.number()
}).strict();
var orderItemSubscriptionInputRequest = z5.object({
  name: z5.string().optional(),
  period: z5.number(),
  unit: z5.enum(["minute", "hour", "day", "week", "month", "year"]).transform((val) => new EnumType3(val)),
  start: z5.date().optional(),
  end: z5.date().optional(),
  meteredVariables: z5.array(orderItemMeteredVariableInputRequest).optional()
}).strict();
var priceInputRequest = z5.object({
  gross: z5.number().optional(),
  net: z5.number().optional(),
  currency: z5.string(),
  discounts: z5.array(
    z5.object({
      percent: z5.number().optional()
    })
  ).optional(),
  tax: z5.object({
    name: z5.string().optional(),
    percent: z5.number().optional()
  })
}).strict();
var orderMetadataInputRequest = z5.object({
  key: z5.string(),
  value: z5.string()
}).strict();
var orderItemInputRequest = z5.object({
  name: z5.string(),
  sku: z5.string().optional(),
  productId: z5.string().optional(),
  productVariantId: z5.string().optional(),
  imageUrl: z5.string().optional(),
  quantity: z5.number(),
  subscription: orderItemSubscriptionInputRequest.optional(),
  subscriptionContractId: z5.string().optional(),
  price: priceInputRequest.optional(),
  subTotal: priceInputRequest.optional(),
  meta: z5.array(orderMetadataInputRequest).optional()
}).strict();
var paymentInputRequest = z5.object({
  provider: paymentProvider,
  klarna: klarnaPaymentInputRequest.optional(),
  paypal: paypalPaymentInputRequest.optional(),
  stripe: stripePaymentInputRequest.optional(),
  cash: cashPaymentInputRequest.optional(),
  custom: customPaymentInputRequest.optional()
}).strict();
var updateOrderInputRequest = z5.object({
  customer: orderCustomerInputRequest.optional(),
  cart: z5.array(orderItemInputRequest).optional(),
  payment: z5.array(paymentInputRequest).optional(),
  total: priceInputRequest.optional(),
  additionnalInformation: z5.string().optional(),
  meta: z5.array(orderMetadataInputRequest).optional()
}).strict();
var createOrderInputRequest = updateOrderInputRequest.extend({
  customer: orderCustomerInputRequest,
  cart: z5.array(orderItemInputRequest),
  createdAt: z5.date().optional()
}).strict();

// src/core/order.ts
import { jsonToGraphQLQuery as jsonToGraphQLQuery4 } from "json-to-graphql-query";
function buildQuery(onCustomer, onOrderItem, extraQuery) {
  return {
    id: true,
    createdAt: true,
    updatedAt: true,
    customer: {
      identifier: true,
      ...onCustomer !== void 0 ? onCustomer : {}
    },
    cart: {
      name: true,
      sku: true,
      imageUrl: true,
      quantity: true,
      ...onOrderItem !== void 0 ? onOrderItem : {},
      price: {
        gross: true,
        net: true,
        discounts: {
          percent: true
        }
      }
    },
    total: {
      gross: true,
      net: true,
      currency: true,
      discounts: {
        percent: true
      },
      tax: {
        name: true,
        percent: true
      }
    },
    ...extraQuery !== void 0 ? extraQuery : {}
  };
}
function createOrderFetcher(apiClient) {
  const fetchPaginatedOrdersByCustomerIdentifier = async (customerIdentifier, extraQueryArgs, onCustomer, onOrderItem, extraQuery) => {
    const orderApi = apiClient.orderApi;
    const query = {
      orders: {
        getAll: {
          __args: {
            customerIdentifier,
            ...extraQueryArgs !== void 0 ? extraQueryArgs : {}
          },
          pageInfo: {
            hasPreviousPage: true,
            hasNextPage: true,
            startCursor: true,
            endCursor: true,
            totalNodes: true
          },
          edges: {
            cursor: true,
            node: buildQuery(onCustomer, onOrderItem, extraQuery)
          }
        }
      }
    };
    const response = await orderApi(jsonToGraphQLQuery4({ query }));
    return {
      pageInfo: response.orders.getAll.pageInfo,
      orders: response.orders.getAll?.edges?.map((edge) => edge.node) || []
    };
  };
  const fetchOrderById = async (orderId, onCustomer, onOrderItem, extraQuery) => {
    const orderApi = apiClient.orderApi;
    const query = {
      orders: {
        get: {
          __args: {
            id: orderId
          },
          id: true,
          createdAt: true,
          updatedAt: true,
          customer: {
            identifier: true,
            ...onCustomer !== void 0 ? onCustomer : {}
          },
          cart: {
            name: true,
            sku: true,
            imageUrl: true,
            quantity: true,
            ...onOrderItem !== void 0 ? onOrderItem : {},
            price: {
              gross: true,
              net: true,
              discounts: {
                percent: true
              }
            }
          },
          total: {
            gross: true,
            net: true,
            currency: true,
            discounts: {
              percent: true
            },
            tax: {
              name: true,
              percent: true
            }
          },
          ...extraQuery !== void 0 ? extraQuery : {}
        }
      }
    };
    return (await orderApi(jsonToGraphQLQuery4({ query })))?.orders?.get;
  };
  return {
    byId: fetchOrderById,
    byCustomerIdentifier: fetchPaginatedOrdersByCustomerIdentifier
  };
}
function convertDates(intent) {
  if (!intent.cart) {
    return {
      ...intent
    };
  }
  return {
    ...intent,
    cart: intent.cart.map((item) => {
      if (!item.subscription) {
        return {
          ...item
        };
      }
      return {
        ...item,
        subscription: {
          ...item.subscription,
          start: item.subscription.start?.toISOString(),
          end: item.subscription.end?.toISOString()
        }
      };
    })
  };
}
function createOrderPipelineStageSetter(apiClient) {
  return async function putInPipelineStage(id, pipelineId, stageId) {
    const mutation = {
      order: {
        setPipelineStage: {
          __args: {
            orderId: id,
            pipelineId,
            stageId
          },
          id: true
        }
      }
    };
    await apiClient.pimApi(jsonToGraphQLQuery4({ mutation }));
  };
}
function createOrderPusher(apiClient) {
  return async function pushOrder(intentOrder) {
    const intent = createOrderInputRequest.parse(intentOrder);
    const orderApi = apiClient.orderApi;
    const mutation = {
      mutation: {
        orders: {
          create: {
            __args: {
              input: {
                ...convertDates(intent),
                createdAt: intent.createdAt?.toISOString() ?? (/* @__PURE__ */ new Date()).toISOString()
              }
            },
            id: true,
            createdAt: true
          }
        }
      }
    };
    const confirmation = await orderApi(jsonToGraphQLQuery4(mutation));
    return {
      id: confirmation.orders.create.id,
      createdAt: confirmation.orders.create.createdAt
    };
  };
}
function createOrderPaymentUpdater(apiClient) {
  return async function updaptePaymentOrder(orderId, intentOrder) {
    const intent = updateOrderInputRequest.parse(intentOrder);
    const pimApi = apiClient.pimApi;
    const mutation = {
      mutation: {
        order: {
          update: {
            __args: {
              id: orderId,
              input: convertDates(intent)
            },
            id: true,
            updatedAt: true
          }
        }
      }
    };
    const confirmation = await pimApi(jsonToGraphQLQuery4(mutation));
    return {
      id: confirmation.order.update.id,
      updatedAt: confirmation.order.update.updatedAt
    };
  };
}

// src/core/search.ts
import { jsonToGraphQLQuery as jsonToGraphQLQuery5 } from "json-to-graphql-query";

// src/types/search.ts
import { EnumType as EnumType4 } from "json-to-graphql-query";
import { z as z6 } from "zod";
var topicPathsFilterField = z6.object({
  value: z6.string()
}).strict();
var topicPathsFilterSection = z6.object({
  logicalOperator: z6.enum(["AND", "OR"]).transform((val) => new EnumType4(val)),
  fields: z6.array(topicPathsFilterField).optional()
}).strict();
var topicPathsFilter = z6.object({
  logicalOperator: z6.enum(["AND", "OR"]).transform((val) => new EnumType4(val)),
  sections: z6.array(topicPathsFilterSection)
}).strict();
var priceRangeFilter = z6.object({
  min: z6.number(),
  max: z6.number()
}).strict();
var stockFilter = z6.object({
  min: z6.number(),
  location: z6.string().optional()
}).strict();
var stockLocationsFilter = z6.object({
  min: z6.number(),
  location: z6.array(z6.string()).optional(),
  logicalOperator: z6.enum(["OR"])
}).strict();
var itemFilterFields = z6.object({
  itemIds: z6.string().optional(),
  productVariantIds: z6.string().optional(),
  skus: z6.string().optional(),
  shapeIdentifiers: z6.string().optional(),
  paths: z6.string().optional(),
  topicsPaths: topicPathsFilter.optional()
}).strict();
var variantAttributeFilter = z6.object({
  attribute: z6.string(),
  value: z6.string()
}).strict();
var productVariantsFilter = z6.object({
  isDefault: z6.boolean().optional(),
  priceRange: priceRangeFilter.optional(),
  stock: stockFilter.optional(),
  stockLocations: stockLocationsFilter.optional(),
  attributes: variantAttributeFilter.optional()
});
var catalogueSearchFilter = z6.object({
  searchTerm: z6.string().optional(),
  type: z6.enum(["PRODUCT", "FOLDER", "DOCUMENT"]).transform((val) => new EnumType4(val)).optional(),
  include: itemFilterFields.optional(),
  exclude: itemFilterFields.optional(),
  priceVariant: z6.string().optional(),
  stockLocation: z6.string().optional(),
  productVariants: productVariantsFilter.optional()
});
var catalogueSearchOrderBy = z6.object({
  field: z6.enum(["ITEM_NAME", "PRICE", "STOCK", "CREATED_AT"]).transform((val) => new EnumType4(val)),
  direction: z6.enum(["ASC", "DESC"]).transform((val) => new EnumType4(val))
}).strict();

// src/core/search.ts
function createSearcher(client) {
  async function* search(language, nodeQuery, filter, orderBy, pageInfo, limit, cursors) {
    const args = {
      language,
      first: limit?.perPage ?? 100
    };
    if (filter) {
      args.filter = catalogueSearchFilter.parse(filter);
    }
    if (orderBy) {
      args.orderBy = catalogueSearchOrderBy.parse(orderBy);
    }
    if (cursors?.after) {
      args.after = cursors.after;
    }
    if (cursors?.before) {
      args.after = cursors.before;
    }
    let query = {
      search: {
        __args: args,
        pageInfo: {
          ...pageInfo,
          hasNextPage: true,
          endCursor: true
        },
        edges: {
          cursor: true,
          node: nodeQuery
        }
      }
    };
    let data;
    let yieldAt = 0;
    const max = limit?.total ?? Infinity;
    do {
      args.first = Math.min(max - yieldAt, args.first);
      data = await client.searchApi(jsonToGraphQLQuery5({ query }));
      for (const edge of data.search.edges) {
        yield edge.node;
      }
      yieldAt += args.first;
      query.search.__args.after = data.search.pageInfo.endCursor;
    } while (data.search.pageInfo.hasNextPage && yieldAt < max);
  }
  return {
    search
  };
}

// src/core/shape.ts
import { jsonToGraphQLQuery as jsonToGraphQLQuery6 } from "json-to-graphql-query";
var basicComponentConfig = () => ["BasicComponentConfig"];
var structuralComponentConfig = (parentType, level) => {
  const nestableComponentType = ["Root", "Piece"];
  if (level <= 0) {
    return [];
  }
  const piece = {
    __typeName: "PieceComponentConfig",
    multilingual: true,
    identifier: true,
    components: components("Piece", level - 1)
  };
  if (!nestableComponentType.includes(parentType)) {
    return [piece];
  }
  return [
    {
      __typeName: "ComponentChoiceComponentConfig",
      multilingual: true,
      choices: {
        id: true,
        name: true,
        description: true,
        type: true,
        config: {
          __all_on: basicComponentConfig(),
          __on: structuralComponentConfig("ComponentChoice", level - 1)
        }
      }
    },
    {
      __typeName: "ComponentMultipleChoiceComponentConfig",
      multilingual: true,
      allowDuplicates: true,
      choices: {
        id: true,
        name: true,
        description: true,
        type: true,
        config: {
          __all_on: basicComponentConfig(),
          __on: structuralComponentConfig("ComponentMultipleChoice", level - 1)
        }
      }
    },
    {
      __typeName: "ContentChunkComponentConfig",
      multilingual: true,
      repeatable: true,
      components: components("ContentChunk", level - 1)
    },
    piece
  ];
};
var components = (parentType, level) => ({
  id: true,
  name: true,
  description: true,
  type: true,
  config: {
    __all_on: basicComponentConfig(),
    __on: structuralComponentConfig(parentType, level)
  }
});
var createShapeBrowser = (client) => {
  const query = (identifier, level) => {
    const componentList = components("Root", level);
    return {
      shape: {
        __args: {
          identifier
        },
        __on: {
          __typeName: "Shape",
          identifier: true,
          type: true,
          name: true,
          meta: {
            key: true,
            value: true
          },
          createdAt: true,
          updatedAt: true,
          components: componentList,
          variantComponents: componentList
        }
      }
    };
  };
  const buildQuery2 = (identifier, level = 5) => jsonToGraphQLQuery6({ query: query(identifier, level) }) + "\n" + fragments;
  return {
    query: buildQuery2,
    fetch: async (identifier, level = 5) => {
      const response = await client.nextPimApi(buildQuery2(identifier, level));
    }
  };
};
var fragments = `#graphql

fragment BooleanComponentConfig on BooleanComponentConfig {
    multilingual
}

fragment DatetimeComponentConfig on DatetimeComponentConfig {
    multilingual
}

fragment FilesComponentConfig on FilesComponentConfig {
    multilingual
    min
    max
    acceptedContentTypes {
        extensionLabel
        contentType
    }
    maxFileSize {
        size
        unit
    }
}

fragment GridRelationsComponentConfig on GridRelationsComponentConfig {
    multilingual
    min
    max
}

fragment ImagesComponentConfig on ImagesComponentConfig {
    multilingual
    min
    max
}

fragment ItemRelationsComponentConfig on ItemRelationsComponentConfig {
    multilingual
    minItems
    maxItems
    minSkus
    maxSkus
    acceptedShapeIdentifiers
    quickSelect {
        folders {
            folderId
        }
    }
}

fragment LocationComponentConfig on LocationComponentConfig {
    multilingual
}

fragment NumericComponentConfig on NumericComponentConfig {
    multilingual
    decimalPlaces
    units
}

fragment ParagraphCollectionComponentConfig on ParagraphCollectionComponentConfig {
    multilingualParagraphs: multilingual
}

fragment PropertiesTableComponentConfig on PropertiesTableComponentConfig {
    multilingual
    sections {
        keys
        title
    }
}

fragment RichTextComponentConfig on RichTextComponentConfig {
    multilingual
    min
    max
}

fragment SelectionComponentConfig on SelectionComponentConfig {
    multilingual
    min
    max
    options {
        key
        value
        isPreselected
    }
}

fragment VideosComponentConfig on VideosComponentConfig {
    multilingual
    min
    max
}

fragment BasicComponentConfig on ComponentConfig {
    ...BooleanComponentConfig
    ...DatetimeComponentConfig
    ...FilesComponentConfig
    ...GridRelationsComponentConfig
    ...ImagesComponentConfig
    ...ItemRelationsComponentConfig
    ...LocationComponentConfig
    ...NumericComponentConfig
    ...ParagraphCollectionComponentConfig
    ...PropertiesTableComponentConfig
    ...RichTextComponentConfig
    ...SelectionComponentConfig
    ...VideosComponentConfig
}

`;

// src/core/subscription.ts
import { EnumType as EnumType6, jsonToGraphQLQuery as jsonToGraphQLQuery7 } from "json-to-graphql-query";

// src/types/subscription.ts
import { z as z7 } from "zod";
import { EnumType as EnumType5 } from "json-to-graphql-query";
var subscriptionContractMetadataInputRequest = z7.object({
  key: z7.string(),
  value: z7.string()
}).strict();
var subscriptionContractMeteredVariableTierInputRequest = z7.object({
  currency: z7.string(),
  price: z7.number(),
  threshold: z7.number()
}).strict();
var subscriptionContractMeteredVariableReferenceInputRequest = z7.object({
  id: z7.string(),
  tierType: z7.enum(["graduated", "volume"]).transform((val) => new EnumType5(val)),
  tiers: z7.array(subscriptionContractMeteredVariableTierInputRequest)
}).strict();
var subscriptionContractPhaseInputRequest = z7.object({
  currency: z7.string(),
  price: z7.number(),
  meteredVariables: z7.array(subscriptionContractMeteredVariableReferenceInputRequest),
  productVariants: z7.array(
    z7.object({
      sku: z7.string(),
      quantity: z7.number()
    })
  ).optional()
}).strict();
var createSubscriptionContractInputRequest = z7.object({
  customerIdentifier: z7.string(),
  tenantId: z7.string(),
  addresses: z7.array(addressInputRequest).optional(),
  payment: paymentInputRequest.optional(),
  subscriptionPlan: z7.object({
    identifier: z7.string(),
    periodId: z7.string()
  }).optional(),
  status: z7.object({
    activeUntil: z7.date(),
    currency: z7.string(),
    price: z7.number(),
    renewAt: z7.date()
  }),
  item: z7.object({
    sku: z7.string(),
    name: z7.string(),
    quantity: z7.number().optional(),
    imageUrl: z7.string().optional(),
    meta: z7.array(subscriptionContractMetadataInputRequest).optional()
  }),
  initial: subscriptionContractPhaseInputRequest.optional(),
  recurring: subscriptionContractPhaseInputRequest.optional(),
  meta: z7.array(subscriptionContractMetadataInputRequest).optional()
}).strict();
var updateSubscriptionContractInputRequest = z7.object({
  addresses: z7.array(addressInputRequest).optional(),
  payment: paymentInputRequest.optional(),
  status: z7.object({
    activeUntil: z7.date().optional(),
    currency: z7.string().optional(),
    price: z7.number().optional(),
    renewAt: z7.date().optional()
  }).optional(),
  item: z7.object({
    sku: z7.string().optional(),
    name: z7.string().optional(),
    quantity: z7.number().optional(),
    imageUrl: z7.string().optional(),
    meta: z7.array(subscriptionContractMetadataInputRequest).optional()
  }).optional(),
  initial: subscriptionContractPhaseInputRequest.optional(),
  recurring: subscriptionContractPhaseInputRequest.optional(),
  meta: z7.array(subscriptionContractMetadataInputRequest).optional()
}).strict();

// src/core/subscription.ts
function convertDates2(intent) {
  if (!intent.status) {
    return {
      ...intent
    };
  }
  let results = {
    ...intent
  };
  if (intent.status.renewAt) {
    results = {
      ...results,
      status: {
        ...results.status,
        renewAt: intent.status.renewAt.toISOString()
      }
    };
  }
  if (intent.status.activeUntil) {
    results = {
      ...results,
      status: {
        ...results.status,
        activeUntil: intent.status.activeUntil.toISOString()
      }
    };
  }
  return results;
}
function convertEnums(intent) {
  let results = {
    ...intent
  };
  if (intent.initial && intent.initial.meteredVariables) {
    results = {
      ...results,
      initial: {
        ...intent.initial,
        meteredVariables: intent.initial.meteredVariables.map((variable) => {
          return {
            ...variable,
            tierType: typeof variable.tierType === "string" ? variable.tierType : variable.tierType.value
          };
        })
      }
    };
  }
  if (intent.recurring && intent.recurring.meteredVariables) {
    results = {
      ...results,
      recurring: {
        ...intent.recurring,
        meteredVariables: intent.recurring.meteredVariables.map((variable) => {
          return {
            ...variable,
            tierType: typeof variable.tierType === "string" ? variable.tierType : variable.tierType.value
          };
        })
      }
    };
  }
  return results;
}
function createSubscriptionContractManager(apiClient) {
  const create = async (intentSubsctiptionContract, extraResultQuery) => {
    const intent = createSubscriptionContractInputRequest.parse(convertEnums(intentSubsctiptionContract));
    const api = apiClient.pimApi;
    const mutation = {
      mutation: {
        subscriptionContract: {
          create: {
            __args: {
              input: convertDates2(intent)
            },
            id: true,
            createdAt: true,
            ...extraResultQuery !== void 0 ? extraResultQuery : {}
          }
        }
      }
    };
    const confirmation = await api(jsonToGraphQLQuery7(mutation));
    return confirmation.subscriptionContract.create;
  };
  const update = async (id, intentSubsctiptionContract, extraResultQuery) => {
    const intent = updateSubscriptionContractInputRequest.parse(convertEnums(intentSubsctiptionContract));
    const api = apiClient.pimApi;
    const mutation = {
      mutation: {
        subscriptionContract: {
          update: {
            __args: {
              id,
              input: convertDates2(intent)
            },
            id: true,
            updatedAt: true,
            ...extraResultQuery !== void 0 ? extraResultQuery : {}
          }
        }
      }
    };
    const confirmation = await api(jsonToGraphQLQuery7(mutation));
    return confirmation.subscriptionContract.update;
  };
  const createSubscriptionContractTemplateBasedOnVariant = async (variant, planIdentifier, periodId, priceVariantIdentifier) => {
    const matchingPlan = variant?.subscriptionPlans?.find(
      (plan) => plan.identifier === planIdentifier
    );
    const matchingPeriod = matchingPlan?.periods?.find(
      (period) => period.id === periodId
    );
    if (!matchingPlan || !matchingPeriod) {
      throw new Error(
        `Impossible to find the Subscription Plans for SKU ${variant.sku}, plan: ${planIdentifier}, period: ${periodId}`
      );
    }
    const getPriceVariant = (priceVariants, identifier) => {
      return priceVariants.find((priceVariant) => priceVariant.identifier === identifier);
    };
    const transformPeriod = (period) => {
      return {
        currency: getPriceVariant(period.priceVariants || [], priceVariantIdentifier)?.currency || "USD",
        price: getPriceVariant(period.priceVariants || [], priceVariantIdentifier)?.price || 0,
        meteredVariables: (period.meteredVariables || []).map(
          (meteredVariable) => {
            return {
              id: meteredVariable.id,
              tierType: new EnumType6(meteredVariable.tierType),
              tiers: meteredVariable.tiers.map(
                (tier) => {
                  return {
                    threshold: tier.threshold,
                    currency: getPriceVariant(tier.priceVariants || [], priceVariantIdentifier)?.currency || "USD",
                    price: getPriceVariant(tier.priceVariants || [], priceVariantIdentifier)?.price || 0
                  };
                }
              )
            };
          }
        )
      };
    };
    const contract = {
      item: {
        sku: variant.sku,
        name: variant.name || "",
        quantity: 1,
        imageUrl: variant.firstImage?.url || ""
      },
      subscriptionPlan: {
        identifier: matchingPlan.identifier,
        periodId: matchingPeriod.id
      },
      initial: !matchingPeriod.initial ? void 0 : transformPeriod(matchingPeriod.initial),
      recurring: !matchingPeriod.recurring ? void 0 : transformPeriod(matchingPeriod.recurring)
    };
    return contract;
  };
  const createSubscriptionContractTemplateBasedOnVariantIdentity = async (path, productVariantIdentifier, planIdentifier, periodId, priceVariantIdentifier, language = "en") => {
    if (!productVariantIdentifier.sku && !productVariantIdentifier.id) {
      throw new Error(
        `Impossible to find the Subscription Plans for Path ${path} with and empty Variant Identity`
      );
    }
    const fetcher = createCatalogueFetcher(apiClient);
    const builder = catalogueFetcherGraphqlBuilder;
    const data = await fetcher({
      catalogue: {
        __args: {
          path,
          language
        },
        __on: [
          builder.onProduct(
            {},
            {
              onVariant: {
                id: true,
                name: true,
                sku: true,
                ...builder.onSubscriptionPlan()
              }
            }
          )
        ]
      }
    });
    const matchingVariant = data.catalogue?.variants?.find(
      (variant) => {
        if (productVariantIdentifier.sku && variant.sku === productVariantIdentifier.sku) {
          return true;
        }
        if (productVariantIdentifier.id && variant.id === productVariantIdentifier.id) {
          return true;
        }
        return false;
      }
    );
    if (!matchingVariant) {
      throw new Error(
        `Impossible to find the Subscription Plans for Path ${path} and Variant: (sku: ${productVariantIdentifier.sku} id: ${productVariantIdentifier.id}), plan: ${planIdentifier}, period: ${periodId} in lang: ${language}`
      );
    }
    return createSubscriptionContractTemplateBasedOnVariant(
      matchingVariant,
      planIdentifier,
      periodId,
      priceVariantIdentifier
    );
  };
  const fetchById = async (id, onCustomer, extraQuery) => {
    const query = {
      subscriptionContract: {
        get: {
          __args: {
            id
          },
          ...SubscriptionContractQuery(onCustomer, extraQuery)
        }
      }
    };
    const data = await apiClient.pimApi(jsonToGraphQLQuery7({ query }));
    return data.subscriptionContract.get;
  };
  const fetchByCustomerIdentifier = async (customerIdentifier, extraQueryArgs, onCustomer, extraQuery) => {
    const query = {
      subscriptionContract: {
        getMany: {
          __args: {
            customerIdentifier,
            tenantId: apiClient.config.tenantId,
            ...extraQueryArgs !== void 0 ? extraQueryArgs : {}
          },
          pageInfo: {
            hasPreviousPage: true,
            hasNextPage: true,
            startCursor: true,
            endCursor: true,
            totalNodes: true
          },
          edges: {
            cursor: true,
            node: SubscriptionContractQuery(onCustomer, extraQuery)
          }
        }
      }
    };
    const response = await apiClient.pimApi(jsonToGraphQLQuery7({ query }));
    return {
      pageInfo: response.subscriptionContract.getMany.pageInfo,
      contracts: response.subscriptionContract.getMany?.edges?.map((edge) => edge.node) || []
    };
  };
  const getCurrentPhase = async (id) => {
    const query = {
      subscriptionContractEvent: {
        getMany: {
          __args: {
            subscriptionContractId: id,
            tenantId: apiClient.config.tenantId,
            sort: new EnumType6("asc"),
            first: 1,
            eventTypes: new EnumType6("renewed")
          },
          edges: {
            node: {
              id: true
            }
          }
        }
      }
    };
    const contractUsage = await apiClient.pimApi(jsonToGraphQLQuery7({ query }));
    return contractUsage.subscriptionContractEvent.getMany.edges.length > 0 ? "recurring" : "initial";
  };
  const getUsageForPeriod = async (id, from, to) => {
    const query = {
      subscriptionContract: {
        get: {
          __args: {
            id
          },
          id: true,
          usage: {
            __args: {
              start: from.toISOString(),
              end: to.toISOString()
            },
            meteredVariableId: true,
            quantity: true
          }
        }
      }
    };
    const contractUsage = await apiClient.pimApi(jsonToGraphQLQuery7({ query }));
    return contractUsage.subscriptionContract.get.usage;
  };
  return {
    create,
    update,
    fetchById,
    fetchByCustomerIdentifier,
    getCurrentPhase,
    getUsageForPeriod,
    createSubscriptionContractTemplateBasedOnVariantIdentity,
    createSubscriptionContractTemplateBasedOnVariant
  };
}
var SubscriptionContractQuery = (onCustomer, extraQuery) => {
  return {
    id: true,
    tenantId: true,
    subscriptionPlan: {
      name: true,
      identifier: true,
      meteredVariables: {
        id: true,
        identifier: true,
        name: true,
        unit: true
      }
    },
    item: {
      name: true,
      sku: true,
      quantity: true,
      meta: {
        key: true,
        value: true
      }
    },
    initial: {
      period: true,
      unit: true,
      price: true,
      currency: true,
      meteredVariables: {
        id: true,
        name: true,
        identifier: true,
        unit: true,
        tierType: true,
        tiers: {
          currency: true,
          threshold: true,
          price: true
        }
      }
    },
    recurring: {
      period: true,
      unit: true,
      price: true,
      currency: true,
      meteredVariables: {
        id: true,
        name: true,
        identifier: true,
        unit: true,
        tierType: true,
        tiers: {
          currency: true,
          threshold: true,
          price: true
        }
      }
    },
    status: {
      renewAt: true,
      activeUntil: true,
      price: true,
      currency: true
    },
    meta: {
      key: true,
      value: true
    },
    addresses: {
      type: true,
      lastName: true,
      firstName: true,
      email: true,
      middleName: true,
      street: true,
      street2: true,
      city: true,
      country: true,
      state: true,
      postalCode: true,
      phone: true,
      streetNumber: true
    },
    customerIdentifier: true,
    customer: {
      identifier: true,
      email: true,
      firstName: true,
      lastName: true,
      companyName: true,
      phone: true,
      taxNumber: true,
      meta: {
        key: true,
        value: true
      },
      externalReferences: {
        key: true,
        value: true
      },
      addresses: {
        type: true,
        lastName: true,
        firstName: true,
        email: true,
        middleName: true,
        street: true,
        street2: true,
        city: true,
        country: true,
        state: true,
        postalCode: true,
        phone: true,
        streetNumber: true,
        meta: {
          key: true,
          value: true
        }
      },
      ...onCustomer !== void 0 ? onCustomer : {}
    },
    ...extraQuery !== void 0 ? extraQuery : {}
  };
};

// src/core/customer.ts
import { jsonToGraphQLQuery as jsonToGraphQLQuery8 } from "json-to-graphql-query";
function convertDates3(intent) {
  if (!intent.birthDate) {
    return {
      ...intent
    };
  }
  return {
    ...intent,
    birthDate: intent.birthDate.toISOString()
  };
}
function createCustomerManager(apiClient) {
  const create = async (intentCustomer, extraResultQuery) => {
    const intent = createCustomerInputRequest.parse(intentCustomer);
    const api = apiClient.pimApi;
    const mutation = {
      mutation: {
        customer: {
          create: {
            __args: {
              input: {
                ...convertDates3(intent),
                tenantId: apiClient.config.tenantId || intent.tenantId || ""
              }
            },
            identifier: true,
            ...extraResultQuery !== void 0 ? extraResultQuery : {}
          }
        }
      }
    };
    const confirmation = await api(jsonToGraphQLQuery8(mutation));
    return confirmation.customer.create;
  };
  const update = async (identifier, intentCustomer, extraResultQuery) => {
    const intent = updateCustomerInputRequest.parse(intentCustomer);
    const api = apiClient.pimApi;
    const mutation = {
      mutation: {
        customer: {
          update: {
            __args: {
              identifier,
              input: convertDates3(intent),
              tenantId: apiClient.config.tenantId || ""
            },
            identifier: true,
            ...extraResultQuery !== void 0 ? extraResultQuery : {}
          }
        }
      }
    };
    const confirmation = await api(jsonToGraphQLQuery8(mutation));
    return confirmation.customer.update;
  };
  return {
    create,
    update
  };
}

// src/core/pricing.ts
function pricesForUsageOnTier(usage, tiers, tierType) {
  const sortedTiers = tiers.sort((a, b) => a.threshold - b.threshold);
  if (sortedTiers[0].threshold > 0) {
    sortedTiers.unshift({ threshold: 0, price: 0, currency: tiers[0].currency });
  }
  if (tierType === "volume") {
    return volumeBasedPriceFor(Math.max(0, usage), sortedTiers);
  }
  return graduatedBasedPriceFor(usage, sortedTiers);
}
function volumeBasedPriceFor(usage, tiers) {
  const freeUsage = tiers.reduce((memo, tier, tierIndex) => {
    if (tier.price === 0) {
      return tiers[tierIndex + 1]?.threshold || 0;
    }
    return memo;
  }, 0);
  const forCalculationUsage = Math.max(0, usage - freeUsage);
  const tiersLength = tiers.length;
  for (let i = tiersLength - 1; i >= 0; i--) {
    const tier = tiers[i];
    if (usage < tier.threshold && i > 0) {
      continue;
    }
    return { [tier.currency]: (usage >= tier.threshold ? tier.price || 0 : 0) * forCalculationUsage };
  }
  return { USD: 0 };
}
function graduatedBasedPriceFor(usage, tiers) {
  let rest = usage;
  const splitUsage = tiers.map((tier, tierIndex) => {
    const currentThreshold = tier.threshold;
    const nextThreshold = tiers[tierIndex + 1]?.threshold;
    const maxTierUsage = nextThreshold ? nextThreshold - currentThreshold : Infinity;
    const tierUsage = rest <= maxTierUsage ? rest : maxTierUsage;
    rest -= tierUsage;
    return {
      ...tier,
      usage: tierUsage
    };
  });
  return splitUsage.reduce((memo, tier) => {
    return {
      ...memo,
      [tier.currency]: (memo[tier.currency] || 0) + tier.usage * (tier.price || 0)
    };
  }, {});
}

// src/core/verifySignature.ts
var newQueryParams = (webhookUrl, receivedUrl) => {
  const parseQueryString = (url) => {
    const urlParams = new URL(url).searchParams;
    let params = {};
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    return params;
  };
  const webhookOriginalParams = parseQueryString(webhookUrl);
  const receivedParams = parseQueryString(receivedUrl);
  const result = {};
  for (const [key, value] of Object.entries(receivedParams)) {
    if (!webhookOriginalParams.hasOwnProperty(key)) {
      result[key] = value;
    }
  }
  return result;
};
var buildChallenge = (request) => {
  return {
    url: request.url,
    method: request.method,
    body: request.body ? JSON.parse(request.body) : null
  };
};
var buildGETSituationChallenge = (request) => {
  if (request.url && request.webhookUrl && request.method && request.method.toLowerCase() === "get") {
    const body = newQueryParams(request.webhookUrl, request.url);
    if (Object.keys(body).length > 0) {
      return {
        url: request.webhookUrl,
        method: request.method,
        body
      };
    }
  }
  return null;
};
var createAsyncSignatureVerifier = ({ sha256, jwtVerify, secret }) => {
  return async (signature, request) => {
    try {
      const payload = await jwtVerify(signature, secret);
      const isValid = async (challenge2) => payload.hmac === await sha256(JSON.stringify(challenge2));
      const challenge = buildChallenge(request);
      if (!await isValid(challenge)) {
        const newChallenge = buildGETSituationChallenge(request);
        if (newChallenge && await isValid(newChallenge)) {
          return payload;
        }
        throw new Error("Invalid signature. HMAC does not match.");
      }
      return payload;
    } catch (exception) {
      throw new Error("Invalid signature. " + exception.message);
    }
  };
};
var createSignatureVerifier = ({ sha256, jwtVerify, secret }) => {
  return (signature, request) => {
    try {
      const payload = jwtVerify(signature, secret);
      const isValid = (challenge2) => payload.hmac === sha256(JSON.stringify(challenge2));
      const challenge = buildChallenge(request);
      if (!isValid(challenge)) {
        const newChallenge = buildGETSituationChallenge(request);
        if (newChallenge && isValid(newChallenge)) {
          return payload;
        }
        throw new Error("Invalid signature. HMAC does not match.");
      }
      return payload;
    } catch (exception) {
      throw new Error("Invalid signature. " + exception.message);
    }
  };
};

// src/core/uploadImage.ts
import * as fs from "fs";
import * as mime from "mime-lite";
var MUTATION_UPLOAD_FILE = `#graphql
mutation UPLOAD_FILE ($tenantId: ID!, $filename: String!, $mimeType: String!) {
    fileUpload {
        generatePresignedRequest(
            tenantId: $tenantId
            filename: $filename
            contentType: $mimeType
            type: MEDIA
        ) {
            url
            fields {
                name
                value
            }
        }
    }
}`;
async function uploadToTenant({
  id,
  mimeType,
  filename,
  buffer,
  stats,
  apiClient
}) {
  const signedRequestResult = await apiClient.pimApi(MUTATION_UPLOAD_FILE, {
    tenantId: id,
    filename,
    mimeType
  });
  const payload = signedRequestResult.fileUpload.generatePresignedRequest;
  const formData = new FormData();
  payload.fields.forEach((field) => {
    formData.append(field.name, field.value);
  });
  formData.append("file", new Blob([buffer]));
  const response = await fetch(payload.url, {
    method: "POST",
    body: formData
  });
  return response.status === 201 ? formData.get("key") : false;
}
async function handleImageUpload(imagePath, apiClient, tenantId) {
  if (!imagePath) {
    return "No image path provided";
  }
  const extension = imagePath.split(".").pop();
  const mimeType = mime.getType(extension);
  const filename = imagePath.split("T/").pop();
  if (!mimeType) {
    return "Could not find mime type for file. Halting upload";
  }
  if (!mimeType.includes("image")) {
    return "File is not an image. Halting upload";
  }
  const stats = fs.statSync(imagePath);
  const buffer = fs.readFileSync(imagePath);
  const data = {
    mimeType,
    filename,
    stats,
    buffer,
    apiClient
  };
  const tId = apiClient.config.tenantId ?? tenantId;
  if (!tId) {
    return "No tenant id provided";
  }
  const imageKey = await uploadToTenant({
    id: tId,
    ...data
  });
  return imageKey;
}

// src/core/editCart.ts
import { jsonToGraphQLQuery as jsonToGraphQLQuery9 } from "json-to-graphql-query";
var placeCart = async (cartId, { apiClient }, extraQuery) => {
  const mutation = {
    place: {
      __args: {
        id: cartId
      },
      id: true,
      ...extraQuery
    }
  };
  const response = await apiClient.shopCartApi(jsonToGraphQLQuery9({ mutation }));
  return response.place;
};
var addSkuItem = async (cartId, sku, quantity, { apiClient }, extraQuery) => {
  const mutation = {
    addSkuItem: {
      __args: {
        id: cartId,
        input: {
          sku,
          quantity
        }
      },
      id: true,
      ...extraQuery
    }
  };
  const response = await apiClient.shopCartApi(jsonToGraphQLQuery9({ mutation }));
  return response.addSkuItem;
};
var removeCartItem = async (cartId, sku, quantity, { apiClient }, extraQuery) => {
  const mutation = {
    removeCartItem: {
      __args: {
        id: cartId,
        sku,
        quantity
      },
      id: true,
      ...extraQuery
    }
  };
  const response = await apiClient.shopCartApi(jsonToGraphQLQuery9({ mutation }));
  return response.removeCartItem;
};
var setCartMeta = async (cartId, meta, merge, { apiClient }, extraQuery) => {
  const mutation = {
    setMeta: {
      __args: {
        id: cartId,
        merge,
        meta
      },
      id: true,
      ...extraQuery
    }
  };
  const response = await apiClient.shopCartApi(jsonToGraphQLQuery9({ mutation }));
  return response.setMeta;
};
var setCartCustomer = async (cartId, customer, isGuest, { apiClient }, extraQuery) => {
  const mutation = {
    setCustomer: {
      __args: {
        id: cartId,
        input: {
          isGuest,
          ...customer
        }
      },
      id: true,
      ...extraQuery
    }
  };
  const response = await apiClient.shopCartApi(jsonToGraphQLQuery9({ mutation }));
  return response.setCustomer;
};

// src/index.ts
var CrystallizeClient = createClient({
  tenantId: globalThis?.process?.env?.CRYSTALLIZE_TENANT_ID ?? "",
  tenantIdentifier: globalThis?.process?.env?.CRYSTALLIZE_TENANT_IDENTIFIER ?? "",
  accessTokenId: globalThis?.process?.env?.CRYSTALLIZE_ACCESS_TOKEN_ID ?? "",
  accessTokenSecret: globalThis?.process?.env?.CRYSTALLIZE_ACCESS_TOKEN_SECRET ?? ""
});
var navigationFetcher = createNavigationFetcher(CrystallizeClient);
var CrystallizeNavigationFoldersFetcher = navigationFetcher.byFolders;
var CrystallizeNavigationTopicsFetcher = navigationFetcher.byTopics;
var productHydrator = createProductHydrater(CrystallizeClient);
var CrystallizeHydraterByPaths = productHydrator.byPaths;
var CrystallizeHydraterBySkus = productHydrator.bySkus;
var CrystallizeOrderPusher = createOrderPusher(CrystallizeClient);
var CrystallizeCreateOrderPaymentUpdater = createOrderPaymentUpdater(CrystallizeClient);
var CrystallizeCreateOrderPipelineStageSetter = createOrderPipelineStageSetter(CrystallizeClient);
var CrystallizeCatalogueFetcher = createCatalogueFetcher(CrystallizeClient);
var CrystallizeSearcher = createSearcher(CrystallizeClient);
var orderFetcher = createOrderFetcher(CrystallizeClient);
var CrystallizeOrderFetcherById = orderFetcher.byId;
var CrystallizeOrderFetcherByCustomerIdentifier = orderFetcher.byCustomerIdentifier;
var CrystallizeSubscriptionContractManager = createSubscriptionContractManager(CrystallizeClient);
var CrystallizeCustomerManager = createCustomerManager(CrystallizeClient);
export {
  CrystallizeCatalogueFetcher,
  CrystallizeClient,
  CrystallizeCreateOrderPaymentUpdater,
  CrystallizeCreateOrderPipelineStageSetter,
  CrystallizeCustomerManager,
  CrystallizeHydraterByPaths,
  CrystallizeHydraterBySkus,
  CrystallizeNavigationFoldersFetcher,
  CrystallizeNavigationTopicsFetcher,
  CrystallizeOrderFetcherByCustomerIdentifier,
  CrystallizeOrderFetcherById,
  CrystallizeOrderPusher,
  CrystallizeSearcher,
  CrystallizeSubscriptionContractManager,
  NavigationType,
  addSkuItem,
  addressInputRequest,
  buildNestedNavigationQuery,
  cashPaymentInputRequest,
  catalogueFetcherGraphqlBuilder,
  catalogueSearchFilter,
  catalogueSearchOrderBy,
  createAsyncSignatureVerifier,
  createCatalogueFetcher,
  createClient,
  createCustomerInputRequest,
  createCustomerManager,
  createMassCallClient,
  createNavigationFetcher,
  createOrderFetcher,
  createOrderInputRequest,
  createOrderPaymentUpdater,
  createOrderPipelineStageSetter,
  createOrderPusher,
  createProductHydrater,
  createSearcher,
  createShapeBrowser,
  createSignatureVerifier,
  createSubscriptionContractInputRequest,
  createSubscriptionContractManager,
  customPaymentInputRequest,
  handleImageUpload,
  klarnaPaymentInputRequest,
  orderCustomerInputRequest,
  orderItemInputRequest,
  orderItemMeteredVariableInputRequest,
  orderItemSubscriptionInputRequest,
  orderMetadataInputRequest,
  paymentInputRequest,
  paymentProvider,
  paypalPaymentInputRequest,
  placeCart,
  priceInputRequest,
  pricesForUsageOnTier,
  removeCartItem,
  setCartCustomer,
  setCartMeta,
  stripePaymentInputRequest,
  subscriptionContractMetadataInputRequest,
  subscriptionContractMeteredVariableReferenceInputRequest,
  subscriptionContractMeteredVariableTierInputRequest,
  subscriptionContractPhaseInputRequest,
  updateCustomerInputRequest,
  updateOrderInputRequest,
  updateSubscriptionContractInputRequest,
  uploadToTenant
};
