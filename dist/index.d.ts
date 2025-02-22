import * as json_to_graphql_query from 'json-to-graphql-query';
import { EnumType } from 'json-to-graphql-query';
import { z } from 'zod';
import * as fs from 'fs';

declare const addressInputRequest: z.ZodObject<{
    type: z.ZodEffects<z.ZodEnum<["delivery", "billing", "other"]>, EnumType, "delivery" | "billing" | "other">;
    firstName: z.ZodOptional<z.ZodString>;
    middleName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    street: z.ZodOptional<z.ZodString>;
    street2: z.ZodOptional<z.ZodString>;
    streetNumber: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: string | undefined;
    }, {
        key: string;
        value?: string | undefined;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    type: EnumType;
    firstName?: string | undefined;
    middleName?: string | undefined;
    lastName?: string | undefined;
    street?: string | undefined;
    street2?: string | undefined;
    streetNumber?: string | undefined;
    postalCode?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    country?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    meta?: {
        key: string;
        value?: string | undefined;
    }[] | undefined;
}, {
    type: "delivery" | "billing" | "other";
    firstName?: string | undefined;
    middleName?: string | undefined;
    lastName?: string | undefined;
    street?: string | undefined;
    street2?: string | undefined;
    streetNumber?: string | undefined;
    postalCode?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    country?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    meta?: {
        key: string;
        value?: string | undefined;
    }[] | undefined;
}>;
type AddressInputRequest = z.infer<typeof addressInputRequest>;
type Address = AddressInputRequest;

declare const orderCustomerInputRequest: z.ZodObject<{
    identifier: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    middleName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    birthDate: z.ZodOptional<z.ZodDate>;
    companyName: z.ZodOptional<z.ZodString>;
    taxNumber: z.ZodOptional<z.ZodString>;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEffects<z.ZodEnum<["delivery", "billing", "other"]>, json_to_graphql_query.EnumType, "delivery" | "billing" | "other">;
        firstName: z.ZodOptional<z.ZodString>;
        middleName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        street2: z.ZodOptional<z.ZodString>;
        streetNumber: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            value?: string | undefined;
        }, {
            key: string;
            value?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        type: json_to_graphql_query.EnumType;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }, {
        type: "delivery" | "billing" | "other";
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    identifier?: string | undefined;
    firstName?: string | undefined;
    middleName?: string | undefined;
    lastName?: string | undefined;
    birthDate?: Date | undefined;
    companyName?: string | undefined;
    taxNumber?: string | undefined;
    addresses?: {
        type: json_to_graphql_query.EnumType;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
}, {
    identifier?: string | undefined;
    firstName?: string | undefined;
    middleName?: string | undefined;
    lastName?: string | undefined;
    birthDate?: Date | undefined;
    companyName?: string | undefined;
    taxNumber?: string | undefined;
    addresses?: {
        type: "delivery" | "billing" | "other";
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
}>;
type OrderCustomerInputRequest = z.infer<typeof orderCustomerInputRequest>;
type OrderCustomer = Omit<OrderCustomerInputRequest, 'addresses'> & {
    addresses: Address[];
};
declare const createCustomerInputRequest: z.ZodObject<z.objectUtil.extendShape<{
    identifier: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    middleName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    birthDate: z.ZodOptional<z.ZodDate>;
    companyName: z.ZodOptional<z.ZodString>;
    taxNumber: z.ZodOptional<z.ZodString>;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEffects<z.ZodEnum<["delivery", "billing", "other"]>, json_to_graphql_query.EnumType, "delivery" | "billing" | "other">;
        firstName: z.ZodOptional<z.ZodString>;
        middleName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        street2: z.ZodOptional<z.ZodString>;
        streetNumber: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            value?: string | undefined;
        }, {
            key: string;
            value?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        type: json_to_graphql_query.EnumType;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }, {
        type: "delivery" | "billing" | "other";
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }>, "many">>;
}, {
    tenantId: z.ZodOptional<z.ZodString>;
    lastName: z.ZodString;
    firstName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: string | undefined;
    }, {
        key: string;
        value?: string | undefined;
    }>, "many">>;
    identifier: z.ZodOptional<z.ZodString>;
    externalReferences: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: string | undefined;
    }, {
        key: string;
        value?: string | undefined;
    }>, "many">>;
    email: z.ZodString;
}>, "strict", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    email: string;
    identifier?: string | undefined;
    middleName?: string | undefined;
    birthDate?: Date | undefined;
    companyName?: string | undefined;
    taxNumber?: string | undefined;
    phone?: string | undefined;
    meta?: {
        key: string;
        value?: string | undefined;
    }[] | undefined;
    addresses?: {
        type: json_to_graphql_query.EnumType;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
    tenantId?: string | undefined;
    externalReferences?: {
        key: string;
        value?: string | undefined;
    }[] | undefined;
}, {
    firstName: string;
    lastName: string;
    email: string;
    identifier?: string | undefined;
    middleName?: string | undefined;
    birthDate?: Date | undefined;
    companyName?: string | undefined;
    taxNumber?: string | undefined;
    phone?: string | undefined;
    meta?: {
        key: string;
        value?: string | undefined;
    }[] | undefined;
    addresses?: {
        type: "delivery" | "billing" | "other";
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
    tenantId?: string | undefined;
    externalReferences?: {
        key: string;
        value?: string | undefined;
    }[] | undefined;
}>;
type CreateCustomerInputRequest = z.infer<typeof createCustomerInputRequest>;
declare const updateCustomerInputRequest: z.ZodObject<Omit<z.objectUtil.extendShape<{
    identifier: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    middleName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    birthDate: z.ZodOptional<z.ZodDate>;
    companyName: z.ZodOptional<z.ZodString>;
    taxNumber: z.ZodOptional<z.ZodString>;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEffects<z.ZodEnum<["delivery", "billing", "other"]>, json_to_graphql_query.EnumType, "delivery" | "billing" | "other">;
        firstName: z.ZodOptional<z.ZodString>;
        middleName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        street2: z.ZodOptional<z.ZodString>;
        streetNumber: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            value?: string | undefined;
        }, {
            key: string;
            value?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        type: json_to_graphql_query.EnumType;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }, {
        type: "delivery" | "billing" | "other";
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }>, "many">>;
}, {
    tenantId: z.ZodOptional<z.ZodString>;
    lastName: z.ZodString;
    firstName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: string | undefined;
    }, {
        key: string;
        value?: string | undefined;
    }>, "many">>;
    identifier: z.ZodOptional<z.ZodString>;
    externalReferences: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        value?: string | undefined;
    }, {
        key: string;
        value?: string | undefined;
    }>, "many">>;
    email: z.ZodString;
}>, "identifier" | "tenantId">, "strict", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    email: string;
    middleName?: string | undefined;
    birthDate?: Date | undefined;
    companyName?: string | undefined;
    taxNumber?: string | undefined;
    phone?: string | undefined;
    meta?: {
        key: string;
        value?: string | undefined;
    }[] | undefined;
    addresses?: {
        type: json_to_graphql_query.EnumType;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
    externalReferences?: {
        key: string;
        value?: string | undefined;
    }[] | undefined;
}, {
    firstName: string;
    lastName: string;
    email: string;
    middleName?: string | undefined;
    birthDate?: Date | undefined;
    companyName?: string | undefined;
    taxNumber?: string | undefined;
    phone?: string | undefined;
    meta?: {
        key: string;
        value?: string | undefined;
    }[] | undefined;
    addresses?: {
        type: "delivery" | "billing" | "other";
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
    externalReferences?: {
        key: string;
        value?: string | undefined;
    }[] | undefined;
}>;
type UpdateCustomerInputRequest = z.infer<typeof updateCustomerInputRequest>;
type Customer = Omit<CreateCustomerInputRequest, 'addresses'> & {
    addresses?: Address[];
};

interface Item {
    id: string;
    name?: string;
    path?: string;
    externalReference?: string;
    topics?: Topic[];
}
interface Product extends Item {
    vatType?: VatInfo;
    isVirtual?: boolean;
    isSubscriptionOnly?: boolean;
    variants?: ProductVariant[];
    defaultVariant?: ProductVariant;
}
interface VatInfo {
    name?: string;
    percent?: number;
}
interface KeyValuePair {
    key: string;
    value?: string;
}
interface MetaProperty {
    key: string;
    value?: string;
}
interface ProductVariant {
    id: string;
    name?: string;
    images?: Image[];
    firstImage?: Image;
    sku: string;
    price?: number;
    priceVariants?: ProductPriceVariant[];
    stock?: number;
    stockLocations?: ProductStockLocation[];
    attributes?: ProductVariantAttribute[];
    externalReference?: string;
    isDefault?: boolean;
    subscriptionPlans?: ProductVariantSubscriptionPlan[];
}
interface ProductVariantPriceList {
    startDate?: Date;
    endDate?: Date;
    price?: number;
    identifier?: string;
    modifier?: number;
    modifierType?: 'PERCENTAGE' | 'RELATIVE' | 'ABSOLUTE';
}
interface ProductPriceVariant {
    identifier: string;
    name?: string;
    price?: number;
    currency?: string;
    priceForEveryone?: ProductVariantPriceList;
    priceFor?: ProductVariantPriceList;
    priceList?: ProductVariantPriceList;
}
interface ProductStockLocation {
    identifier: string;
    name: string;
    stock: number;
    meta: KeyValuePair[];
}
interface ProductVariantAttribute {
    attribute: string;
    value?: string;
}
interface ProductVariantSubscriptionPlan {
    identifier: string;
    name?: string;
    periods: ProductVariantSubscriptionPlanPeriod[];
}
interface ProductVariantSubscriptionPlanPeriod {
    id: string;
    name: string;
    initial?: ProductVariantSubscriptionPlanPricing;
    recurring?: ProductVariantSubscriptionPlanPricing;
}
interface ProductVariantSubscriptionPlanPricing {
    period: number;
    unit: SubscriptionPeriodUnit;
    price?: number;
    priceVariants?: ProductPriceVariant[];
    meteredVariables?: ProductVariantSubscriptionMeteredVariable[];
}
interface ProductVariantSubscriptionMeteredVariable {
    id: string;
    name: string;
    identifier: string;
    tiers: ProductVariantSubscriptionPlanTier[];
    tierType: TierType;
}
interface ProductVariantSubscriptionPlanTier {
    threshold: number;
    price?: number;
    priceVariants?: ProductPriceVariant[];
}
type SubscriptionPeriodUnit = 'day' | 'week' | 'month' | 'year';
type TierType = 'volume' | 'graduated';
interface Image {
    url: string;
    key: string;
    altText?: string;
    caption?: {
        json: any[];
        html: string[];
        plainText: string[];
    };
    meta?: MetaProperty[];
    metaProperty?: string;
    variants?: ImageVariant[];
    createdAt?: Date;
}
interface ImageVariant {
    url: string;
    key: string;
    width: number;
    height?: number;
    size?: number;
}
interface Topic {
    id: string;
    name: string;
    path: string;
    language?: string;
    parentId?: string;
    parent: Topic;
    children: Topic[];
    childCount: number;
    createdAt?: Date;
    items: {
        edges: {
            node: Item;
            cursor: string;
        };
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: string;
            endCursor: string;
            totalNodes: number;
        };
    };
}

declare const paymentProvider: z.ZodEffects<z.ZodEnum<["klarna", "stripe", "paypal", "cash", "custom"]>, EnumType, "custom" | "klarna" | "stripe" | "paypal" | "cash">;
type PaymentProvider = z.infer<typeof paymentProvider>;
declare const klarnaPaymentInputRequest: z.ZodObject<{
    klarna: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    recurringToken: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    merchantReference1: z.ZodOptional<z.ZodString>;
    merchantReference2: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    status?: string | undefined;
    klarna?: string | undefined;
    orderId?: string | undefined;
    recurringToken?: string | undefined;
    merchantReference1?: string | undefined;
    merchantReference2?: string | undefined;
    metadata?: string | undefined;
}, {
    status?: string | undefined;
    klarna?: string | undefined;
    orderId?: string | undefined;
    recurringToken?: string | undefined;
    merchantReference1?: string | undefined;
    merchantReference2?: string | undefined;
    metadata?: string | undefined;
}>;
type KlarnaPaymentInputRequest = z.infer<typeof klarnaPaymentInputRequest>;
declare const paypalPaymentInputRequest: z.ZodObject<{
    paypal: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    subscriptionId: z.ZodOptional<z.ZodString>;
    invoiceId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    paypal?: string | undefined;
    orderId?: string | undefined;
    metadata?: string | undefined;
    subscriptionId?: string | undefined;
    invoiceId?: string | undefined;
}, {
    paypal?: string | undefined;
    orderId?: string | undefined;
    metadata?: string | undefined;
    subscriptionId?: string | undefined;
    invoiceId?: string | undefined;
}>;
type PaypalPaymentInputRequest = z.infer<typeof paypalPaymentInputRequest>;
declare const stripePaymentInputRequest: z.ZodObject<{
    stripe: z.ZodOptional<z.ZodString>;
    customerId: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    paymentMethod: z.ZodOptional<z.ZodString>;
    paymentMethodId: z.ZodOptional<z.ZodString>;
    paymentIntentId: z.ZodOptional<z.ZodString>;
    subscriptionId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    stripe?: string | undefined;
    orderId?: string | undefined;
    metadata?: string | undefined;
    subscriptionId?: string | undefined;
    customerId?: string | undefined;
    paymentMethod?: string | undefined;
    paymentMethodId?: string | undefined;
    paymentIntentId?: string | undefined;
}, {
    stripe?: string | undefined;
    orderId?: string | undefined;
    metadata?: string | undefined;
    subscriptionId?: string | undefined;
    customerId?: string | undefined;
    paymentMethod?: string | undefined;
    paymentMethodId?: string | undefined;
    paymentIntentId?: string | undefined;
}>;
type StripePaymentInputRequest = z.infer<typeof stripePaymentInputRequest>;
declare const cashPaymentInputRequest: z.ZodObject<{
    cash: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    cash?: string | undefined;
}, {
    cash?: string | undefined;
}>;
type CashPaymentInputRequest = z.infer<typeof cashPaymentInputRequest>;
declare const customPaymentInputRequest: z.ZodObject<{
    properties: z.ZodOptional<z.ZodArray<z.ZodObject<{
        property: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        property: string;
        value?: string | undefined;
    }, {
        property: string;
        value?: string | undefined;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    properties?: {
        property: string;
        value?: string | undefined;
    }[] | undefined;
}, {
    properties?: {
        property: string;
        value?: string | undefined;
    }[] | undefined;
}>;
type CustomPaymentInputRequest = z.infer<typeof customPaymentInputRequest>;
interface PaymentType {
    provider: PaymentProvider;
}
type KlarnaPayment = PaymentType & Omit<KlarnaPaymentInputRequest, 'klarna'>;
type PaypalPayment = PaymentType & Omit<PaypalPaymentInputRequest, 'paypal'>;
type StripePayment = PaymentType & Omit<StripePaymentInputRequest, 'stripe'>;
type CashPayment = PaymentType & CashPaymentInputRequest;
type CustomPayment = PaymentType & CustomPaymentInputRequest;

declare const orderItemMeteredVariableInputRequest: z.ZodObject<{
    id: z.ZodString;
    usage: z.ZodNumber;
    price: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    id: string;
    usage: number;
    price: number;
}, {
    id: string;
    usage: number;
    price: number;
}>;
type OrderItemMeteredVariableInputRequest = z.infer<typeof orderItemMeteredVariableInputRequest>;
declare const orderItemSubscriptionInputRequest: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    period: z.ZodNumber;
    unit: z.ZodEffects<z.ZodEnum<["minute", "hour", "day", "week", "month", "year"]>, EnumType, "minute" | "hour" | "day" | "week" | "month" | "year">;
    start: z.ZodOptional<z.ZodDate>;
    end: z.ZodOptional<z.ZodDate>;
    meteredVariables: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        usage: z.ZodNumber;
        price: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: string;
        usage: number;
        price: number;
    }, {
        id: string;
        usage: number;
        price: number;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    period: number;
    unit: EnumType;
    name?: string | undefined;
    start?: Date | undefined;
    end?: Date | undefined;
    meteredVariables?: {
        id: string;
        usage: number;
        price: number;
    }[] | undefined;
}, {
    period: number;
    unit: "minute" | "hour" | "day" | "week" | "month" | "year";
    name?: string | undefined;
    start?: Date | undefined;
    end?: Date | undefined;
    meteredVariables?: {
        id: string;
        usage: number;
        price: number;
    }[] | undefined;
}>;
type OrderItemSubscriptionInputRequest = z.infer<typeof orderItemSubscriptionInputRequest>;
declare const priceInputRequest: z.ZodObject<{
    gross: z.ZodOptional<z.ZodNumber>;
    net: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodString;
    discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        percent: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        percent?: number | undefined;
    }, {
        percent?: number | undefined;
    }>, "many">>;
    tax: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        percent: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        percent?: number | undefined;
    }, {
        name?: string | undefined;
        percent?: number | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    currency: string;
    tax: {
        name?: string | undefined;
        percent?: number | undefined;
    };
    gross?: number | undefined;
    net?: number | undefined;
    discounts?: {
        percent?: number | undefined;
    }[] | undefined;
}, {
    currency: string;
    tax: {
        name?: string | undefined;
        percent?: number | undefined;
    };
    gross?: number | undefined;
    net?: number | undefined;
    discounts?: {
        percent?: number | undefined;
    }[] | undefined;
}>;
type PriceInputRequest = z.infer<typeof priceInputRequest>;
declare const orderMetadataInputRequest: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodString;
}, "strict", z.ZodTypeAny, {
    value: string;
    key: string;
}, {
    value: string;
    key: string;
}>;
type OrderMetadataInputRequest = z.infer<typeof orderMetadataInputRequest>;
declare const orderItemInputRequest: z.ZodObject<{
    name: z.ZodString;
    sku: z.ZodOptional<z.ZodString>;
    productId: z.ZodOptional<z.ZodString>;
    productVariantId: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    quantity: z.ZodNumber;
    subscription: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        period: z.ZodNumber;
        unit: z.ZodEffects<z.ZodEnum<["minute", "hour", "day", "week", "month", "year"]>, EnumType, "minute" | "hour" | "day" | "week" | "month" | "year">;
        start: z.ZodOptional<z.ZodDate>;
        end: z.ZodOptional<z.ZodDate>;
        meteredVariables: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            usage: z.ZodNumber;
            price: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            usage: number;
            price: number;
        }, {
            id: string;
            usage: number;
            price: number;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        period: number;
        unit: EnumType;
        name?: string | undefined;
        start?: Date | undefined;
        end?: Date | undefined;
        meteredVariables?: {
            id: string;
            usage: number;
            price: number;
        }[] | undefined;
    }, {
        period: number;
        unit: "minute" | "hour" | "day" | "week" | "month" | "year";
        name?: string | undefined;
        start?: Date | undefined;
        end?: Date | undefined;
        meteredVariables?: {
            id: string;
            usage: number;
            price: number;
        }[] | undefined;
    }>>;
    subscriptionContractId: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodObject<{
        gross: z.ZodOptional<z.ZodNumber>;
        net: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodString;
        discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            percent: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            percent?: number | undefined;
        }, {
            percent?: number | undefined;
        }>, "many">>;
        tax: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            percent: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            percent?: number | undefined;
        }, {
            name?: string | undefined;
            percent?: number | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    }, {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    }>>;
    subTotal: z.ZodOptional<z.ZodObject<{
        gross: z.ZodOptional<z.ZodNumber>;
        net: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodString;
        discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            percent: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            percent?: number | undefined;
        }, {
            percent?: number | undefined;
        }>, "many">>;
        tax: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            percent: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            percent?: number | undefined;
        }, {
            name?: string | undefined;
            percent?: number | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    }, {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    }>>;
    meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        value: string;
        key: string;
    }, {
        value: string;
        key: string;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    name: string;
    quantity: number;
    meta?: {
        value: string;
        key: string;
    }[] | undefined;
    sku?: string | undefined;
    productId?: string | undefined;
    productVariantId?: string | undefined;
    imageUrl?: string | undefined;
    price?: {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    } | undefined;
    subscription?: {
        period: number;
        unit: EnumType;
        name?: string | undefined;
        start?: Date | undefined;
        end?: Date | undefined;
        meteredVariables?: {
            id: string;
            usage: number;
            price: number;
        }[] | undefined;
    } | undefined;
    subscriptionContractId?: string | undefined;
    subTotal?: {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    } | undefined;
}, {
    name: string;
    quantity: number;
    meta?: {
        value: string;
        key: string;
    }[] | undefined;
    sku?: string | undefined;
    productId?: string | undefined;
    productVariantId?: string | undefined;
    imageUrl?: string | undefined;
    price?: {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    } | undefined;
    subscription?: {
        period: number;
        unit: "minute" | "hour" | "day" | "week" | "month" | "year";
        name?: string | undefined;
        start?: Date | undefined;
        end?: Date | undefined;
        meteredVariables?: {
            id: string;
            usage: number;
            price: number;
        }[] | undefined;
    } | undefined;
    subscriptionContractId?: string | undefined;
    subTotal?: {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    } | undefined;
}>;
type OrderItemInputRequest = z.infer<typeof orderItemInputRequest>;
declare const paymentInputRequest: z.ZodObject<{
    provider: z.ZodEffects<z.ZodEnum<["klarna", "stripe", "paypal", "cash", "custom"]>, EnumType, "custom" | "klarna" | "stripe" | "paypal" | "cash">;
    klarna: z.ZodOptional<z.ZodObject<{
        klarna: z.ZodOptional<z.ZodString>;
        orderId: z.ZodOptional<z.ZodString>;
        recurringToken: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodString>;
        merchantReference1: z.ZodOptional<z.ZodString>;
        merchantReference2: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        status?: string | undefined;
        klarna?: string | undefined;
        orderId?: string | undefined;
        recurringToken?: string | undefined;
        merchantReference1?: string | undefined;
        merchantReference2?: string | undefined;
        metadata?: string | undefined;
    }, {
        status?: string | undefined;
        klarna?: string | undefined;
        orderId?: string | undefined;
        recurringToken?: string | undefined;
        merchantReference1?: string | undefined;
        merchantReference2?: string | undefined;
        metadata?: string | undefined;
    }>>;
    paypal: z.ZodOptional<z.ZodObject<{
        paypal: z.ZodOptional<z.ZodString>;
        orderId: z.ZodOptional<z.ZodString>;
        subscriptionId: z.ZodOptional<z.ZodString>;
        invoiceId: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        paypal?: string | undefined;
        orderId?: string | undefined;
        metadata?: string | undefined;
        subscriptionId?: string | undefined;
        invoiceId?: string | undefined;
    }, {
        paypal?: string | undefined;
        orderId?: string | undefined;
        metadata?: string | undefined;
        subscriptionId?: string | undefined;
        invoiceId?: string | undefined;
    }>>;
    stripe: z.ZodOptional<z.ZodObject<{
        stripe: z.ZodOptional<z.ZodString>;
        customerId: z.ZodOptional<z.ZodString>;
        orderId: z.ZodOptional<z.ZodString>;
        paymentMethod: z.ZodOptional<z.ZodString>;
        paymentMethodId: z.ZodOptional<z.ZodString>;
        paymentIntentId: z.ZodOptional<z.ZodString>;
        subscriptionId: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        stripe?: string | undefined;
        orderId?: string | undefined;
        metadata?: string | undefined;
        subscriptionId?: string | undefined;
        customerId?: string | undefined;
        paymentMethod?: string | undefined;
        paymentMethodId?: string | undefined;
        paymentIntentId?: string | undefined;
    }, {
        stripe?: string | undefined;
        orderId?: string | undefined;
        metadata?: string | undefined;
        subscriptionId?: string | undefined;
        customerId?: string | undefined;
        paymentMethod?: string | undefined;
        paymentMethodId?: string | undefined;
        paymentIntentId?: string | undefined;
    }>>;
    cash: z.ZodOptional<z.ZodObject<{
        cash: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        cash?: string | undefined;
    }, {
        cash?: string | undefined;
    }>>;
    custom: z.ZodOptional<z.ZodObject<{
        properties: z.ZodOptional<z.ZodArray<z.ZodObject<{
            property: z.ZodString;
            value: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            property: string;
            value?: string | undefined;
        }, {
            property: string;
            value?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        properties?: {
            property: string;
            value?: string | undefined;
        }[] | undefined;
    }, {
        properties?: {
            property: string;
            value?: string | undefined;
        }[] | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    provider: EnumType;
    custom?: {
        properties?: {
            property: string;
            value?: string | undefined;
        }[] | undefined;
    } | undefined;
    klarna?: {
        status?: string | undefined;
        klarna?: string | undefined;
        orderId?: string | undefined;
        recurringToken?: string | undefined;
        merchantReference1?: string | undefined;
        merchantReference2?: string | undefined;
        metadata?: string | undefined;
    } | undefined;
    stripe?: {
        stripe?: string | undefined;
        orderId?: string | undefined;
        metadata?: string | undefined;
        subscriptionId?: string | undefined;
        customerId?: string | undefined;
        paymentMethod?: string | undefined;
        paymentMethodId?: string | undefined;
        paymentIntentId?: string | undefined;
    } | undefined;
    paypal?: {
        paypal?: string | undefined;
        orderId?: string | undefined;
        metadata?: string | undefined;
        subscriptionId?: string | undefined;
        invoiceId?: string | undefined;
    } | undefined;
    cash?: {
        cash?: string | undefined;
    } | undefined;
}, {
    provider: "custom" | "klarna" | "stripe" | "paypal" | "cash";
    custom?: {
        properties?: {
            property: string;
            value?: string | undefined;
        }[] | undefined;
    } | undefined;
    klarna?: {
        status?: string | undefined;
        klarna?: string | undefined;
        orderId?: string | undefined;
        recurringToken?: string | undefined;
        merchantReference1?: string | undefined;
        merchantReference2?: string | undefined;
        metadata?: string | undefined;
    } | undefined;
    stripe?: {
        stripe?: string | undefined;
        orderId?: string | undefined;
        metadata?: string | undefined;
        subscriptionId?: string | undefined;
        customerId?: string | undefined;
        paymentMethod?: string | undefined;
        paymentMethodId?: string | undefined;
        paymentIntentId?: string | undefined;
    } | undefined;
    paypal?: {
        paypal?: string | undefined;
        orderId?: string | undefined;
        metadata?: string | undefined;
        subscriptionId?: string | undefined;
        invoiceId?: string | undefined;
    } | undefined;
    cash?: {
        cash?: string | undefined;
    } | undefined;
}>;
type PaymentInputRequest = z.infer<typeof paymentInputRequest>;
declare const updateOrderInputRequest: z.ZodObject<{
    customer: z.ZodOptional<z.ZodObject<{
        identifier: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        middleName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        birthDate: z.ZodOptional<z.ZodDate>;
        companyName: z.ZodOptional<z.ZodString>;
        taxNumber: z.ZodOptional<z.ZodString>;
        addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEffects<z.ZodEnum<["delivery", "billing", "other"]>, EnumType, "delivery" | "billing" | "other">;
            firstName: z.ZodOptional<z.ZodString>;
            middleName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
            street: z.ZodOptional<z.ZodString>;
            street2: z.ZodOptional<z.ZodString>;
            streetNumber: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                value: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                value?: string | undefined;
            }, {
                key: string;
                value?: string | undefined;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            type: EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }, {
            type: "delivery" | "billing" | "other";
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        identifier?: string | undefined;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        birthDate?: Date | undefined;
        companyName?: string | undefined;
        taxNumber?: string | undefined;
        addresses?: {
            type: EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }, {
        identifier?: string | undefined;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        birthDate?: Date | undefined;
        companyName?: string | undefined;
        taxNumber?: string | undefined;
        addresses?: {
            type: "delivery" | "billing" | "other";
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }>>;
    cart: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        sku: z.ZodOptional<z.ZodString>;
        productId: z.ZodOptional<z.ZodString>;
        productVariantId: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodOptional<z.ZodString>;
        quantity: z.ZodNumber;
        subscription: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            period: z.ZodNumber;
            unit: z.ZodEffects<z.ZodEnum<["minute", "hour", "day", "week", "month", "year"]>, EnumType, "minute" | "hour" | "day" | "week" | "month" | "year">;
            start: z.ZodOptional<z.ZodDate>;
            end: z.ZodOptional<z.ZodDate>;
            meteredVariables: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                usage: z.ZodNumber;
                price: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                usage: number;
                price: number;
            }, {
                id: string;
                usage: number;
                price: number;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            period: number;
            unit: EnumType;
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        }, {
            period: number;
            unit: "minute" | "hour" | "day" | "week" | "month" | "year";
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        }>>;
        subscriptionContractId: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodObject<{
            gross: z.ZodOptional<z.ZodNumber>;
            net: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodString;
            discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                percent?: number | undefined;
            }, {
                percent?: number | undefined;
            }>, "many">>;
            tax: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                percent?: number | undefined;
            }, {
                name?: string | undefined;
                percent?: number | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }>>;
        subTotal: z.ZodOptional<z.ZodObject<{
            gross: z.ZodOptional<z.ZodNumber>;
            net: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodString;
            discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                percent?: number | undefined;
            }, {
                percent?: number | undefined;
            }>, "many">>;
            tax: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                percent?: number | undefined;
            }, {
                name?: string | undefined;
                percent?: number | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }>>;
        meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            value: string;
            key: string;
        }, {
            value: string;
            key: string;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        quantity: number;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        sku?: string | undefined;
        productId?: string | undefined;
        productVariantId?: string | undefined;
        imageUrl?: string | undefined;
        price?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscription?: {
            period: number;
            unit: EnumType;
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        } | undefined;
        subscriptionContractId?: string | undefined;
        subTotal?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
    }, {
        name: string;
        quantity: number;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        sku?: string | undefined;
        productId?: string | undefined;
        productVariantId?: string | undefined;
        imageUrl?: string | undefined;
        price?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscription?: {
            period: number;
            unit: "minute" | "hour" | "day" | "week" | "month" | "year";
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        } | undefined;
        subscriptionContractId?: string | undefined;
        subTotal?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
    }>, "many">>;
    payment: z.ZodOptional<z.ZodArray<z.ZodObject<{
        provider: z.ZodEffects<z.ZodEnum<["klarna", "stripe", "paypal", "cash", "custom"]>, EnumType, "custom" | "klarna" | "stripe" | "paypal" | "cash">;
        klarna: z.ZodOptional<z.ZodObject<{
            klarna: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            recurringToken: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodString>;
            merchantReference1: z.ZodOptional<z.ZodString>;
            merchantReference2: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        }, {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        }>>;
        paypal: z.ZodOptional<z.ZodObject<{
            paypal: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            subscriptionId: z.ZodOptional<z.ZodString>;
            invoiceId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        }, {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        }>>;
        stripe: z.ZodOptional<z.ZodObject<{
            stripe: z.ZodOptional<z.ZodString>;
            customerId: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            paymentMethod: z.ZodOptional<z.ZodString>;
            paymentMethodId: z.ZodOptional<z.ZodString>;
            paymentIntentId: z.ZodOptional<z.ZodString>;
            subscriptionId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        }, {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        }>>;
        cash: z.ZodOptional<z.ZodObject<{
            cash: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            cash?: string | undefined;
        }, {
            cash?: string | undefined;
        }>>;
        custom: z.ZodOptional<z.ZodObject<{
            properties: z.ZodOptional<z.ZodArray<z.ZodObject<{
                property: z.ZodString;
                value: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                property: string;
                value?: string | undefined;
            }, {
                property: string;
                value?: string | undefined;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        }, {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        provider: EnumType;
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }, {
        provider: "custom" | "klarna" | "stripe" | "paypal" | "cash";
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }>, "many">>;
    total: z.ZodOptional<z.ZodObject<{
        gross: z.ZodOptional<z.ZodNumber>;
        net: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodString;
        discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            percent: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            percent?: number | undefined;
        }, {
            percent?: number | undefined;
        }>, "many">>;
        tax: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            percent: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            percent?: number | undefined;
        }, {
            name?: string | undefined;
            percent?: number | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    }, {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    }>>;
    additionnalInformation: z.ZodOptional<z.ZodString>;
    meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        value: string;
        key: string;
    }, {
        value: string;
        key: string;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    meta?: {
        value: string;
        key: string;
    }[] | undefined;
    customer?: {
        identifier?: string | undefined;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        birthDate?: Date | undefined;
        companyName?: string | undefined;
        taxNumber?: string | undefined;
        addresses?: {
            type: EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    } | undefined;
    cart?: {
        name: string;
        quantity: number;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        sku?: string | undefined;
        productId?: string | undefined;
        productVariantId?: string | undefined;
        imageUrl?: string | undefined;
        price?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscription?: {
            period: number;
            unit: EnumType;
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        } | undefined;
        subscriptionContractId?: string | undefined;
        subTotal?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
    }[] | undefined;
    payment?: {
        provider: EnumType;
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }[] | undefined;
    total?: {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    } | undefined;
    additionnalInformation?: string | undefined;
}, {
    meta?: {
        value: string;
        key: string;
    }[] | undefined;
    customer?: {
        identifier?: string | undefined;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        birthDate?: Date | undefined;
        companyName?: string | undefined;
        taxNumber?: string | undefined;
        addresses?: {
            type: "delivery" | "billing" | "other";
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    } | undefined;
    cart?: {
        name: string;
        quantity: number;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        sku?: string | undefined;
        productId?: string | undefined;
        productVariantId?: string | undefined;
        imageUrl?: string | undefined;
        price?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscription?: {
            period: number;
            unit: "minute" | "hour" | "day" | "week" | "month" | "year";
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        } | undefined;
        subscriptionContractId?: string | undefined;
        subTotal?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
    }[] | undefined;
    payment?: {
        provider: "custom" | "klarna" | "stripe" | "paypal" | "cash";
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }[] | undefined;
    total?: {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    } | undefined;
    additionnalInformation?: string | undefined;
}>;
type UpdateOrderInputRequest = z.infer<typeof updateOrderInputRequest>;
declare const createOrderInputRequest: z.ZodObject<z.objectUtil.extendShape<{
    customer: z.ZodOptional<z.ZodObject<{
        identifier: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        middleName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        birthDate: z.ZodOptional<z.ZodDate>;
        companyName: z.ZodOptional<z.ZodString>;
        taxNumber: z.ZodOptional<z.ZodString>;
        addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEffects<z.ZodEnum<["delivery", "billing", "other"]>, EnumType, "delivery" | "billing" | "other">;
            firstName: z.ZodOptional<z.ZodString>;
            middleName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
            street: z.ZodOptional<z.ZodString>;
            street2: z.ZodOptional<z.ZodString>;
            streetNumber: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                value: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                value?: string | undefined;
            }, {
                key: string;
                value?: string | undefined;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            type: EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }, {
            type: "delivery" | "billing" | "other";
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        identifier?: string | undefined;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        birthDate?: Date | undefined;
        companyName?: string | undefined;
        taxNumber?: string | undefined;
        addresses?: {
            type: EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }, {
        identifier?: string | undefined;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        birthDate?: Date | undefined;
        companyName?: string | undefined;
        taxNumber?: string | undefined;
        addresses?: {
            type: "delivery" | "billing" | "other";
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }>>;
    cart: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        sku: z.ZodOptional<z.ZodString>;
        productId: z.ZodOptional<z.ZodString>;
        productVariantId: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodOptional<z.ZodString>;
        quantity: z.ZodNumber;
        subscription: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            period: z.ZodNumber;
            unit: z.ZodEffects<z.ZodEnum<["minute", "hour", "day", "week", "month", "year"]>, EnumType, "minute" | "hour" | "day" | "week" | "month" | "year">;
            start: z.ZodOptional<z.ZodDate>;
            end: z.ZodOptional<z.ZodDate>;
            meteredVariables: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                usage: z.ZodNumber;
                price: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                usage: number;
                price: number;
            }, {
                id: string;
                usage: number;
                price: number;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            period: number;
            unit: EnumType;
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        }, {
            period: number;
            unit: "minute" | "hour" | "day" | "week" | "month" | "year";
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        }>>;
        subscriptionContractId: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodObject<{
            gross: z.ZodOptional<z.ZodNumber>;
            net: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodString;
            discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                percent?: number | undefined;
            }, {
                percent?: number | undefined;
            }>, "many">>;
            tax: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                percent?: number | undefined;
            }, {
                name?: string | undefined;
                percent?: number | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }>>;
        subTotal: z.ZodOptional<z.ZodObject<{
            gross: z.ZodOptional<z.ZodNumber>;
            net: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodString;
            discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                percent?: number | undefined;
            }, {
                percent?: number | undefined;
            }>, "many">>;
            tax: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                percent?: number | undefined;
            }, {
                name?: string | undefined;
                percent?: number | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }>>;
        meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            value: string;
            key: string;
        }, {
            value: string;
            key: string;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        quantity: number;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        sku?: string | undefined;
        productId?: string | undefined;
        productVariantId?: string | undefined;
        imageUrl?: string | undefined;
        price?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscription?: {
            period: number;
            unit: EnumType;
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        } | undefined;
        subscriptionContractId?: string | undefined;
        subTotal?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
    }, {
        name: string;
        quantity: number;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        sku?: string | undefined;
        productId?: string | undefined;
        productVariantId?: string | undefined;
        imageUrl?: string | undefined;
        price?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscription?: {
            period: number;
            unit: "minute" | "hour" | "day" | "week" | "month" | "year";
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        } | undefined;
        subscriptionContractId?: string | undefined;
        subTotal?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
    }>, "many">>;
    payment: z.ZodOptional<z.ZodArray<z.ZodObject<{
        provider: z.ZodEffects<z.ZodEnum<["klarna", "stripe", "paypal", "cash", "custom"]>, EnumType, "custom" | "klarna" | "stripe" | "paypal" | "cash">;
        klarna: z.ZodOptional<z.ZodObject<{
            klarna: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            recurringToken: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodString>;
            merchantReference1: z.ZodOptional<z.ZodString>;
            merchantReference2: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        }, {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        }>>;
        paypal: z.ZodOptional<z.ZodObject<{
            paypal: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            subscriptionId: z.ZodOptional<z.ZodString>;
            invoiceId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        }, {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        }>>;
        stripe: z.ZodOptional<z.ZodObject<{
            stripe: z.ZodOptional<z.ZodString>;
            customerId: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            paymentMethod: z.ZodOptional<z.ZodString>;
            paymentMethodId: z.ZodOptional<z.ZodString>;
            paymentIntentId: z.ZodOptional<z.ZodString>;
            subscriptionId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        }, {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        }>>;
        cash: z.ZodOptional<z.ZodObject<{
            cash: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            cash?: string | undefined;
        }, {
            cash?: string | undefined;
        }>>;
        custom: z.ZodOptional<z.ZodObject<{
            properties: z.ZodOptional<z.ZodArray<z.ZodObject<{
                property: z.ZodString;
                value: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                property: string;
                value?: string | undefined;
            }, {
                property: string;
                value?: string | undefined;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        }, {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        provider: EnumType;
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }, {
        provider: "custom" | "klarna" | "stripe" | "paypal" | "cash";
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }>, "many">>;
    total: z.ZodOptional<z.ZodObject<{
        gross: z.ZodOptional<z.ZodNumber>;
        net: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodString;
        discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            percent: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            percent?: number | undefined;
        }, {
            percent?: number | undefined;
        }>, "many">>;
        tax: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            percent: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            percent?: number | undefined;
        }, {
            name?: string | undefined;
            percent?: number | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    }, {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    }>>;
    additionnalInformation: z.ZodOptional<z.ZodString>;
    meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        value: string;
        key: string;
    }, {
        value: string;
        key: string;
    }>, "many">>;
}, {
    customer: z.ZodObject<{
        identifier: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        middleName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        birthDate: z.ZodOptional<z.ZodDate>;
        companyName: z.ZodOptional<z.ZodString>;
        taxNumber: z.ZodOptional<z.ZodString>;
        addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEffects<z.ZodEnum<["delivery", "billing", "other"]>, EnumType, "delivery" | "billing" | "other">;
            firstName: z.ZodOptional<z.ZodString>;
            middleName: z.ZodOptional<z.ZodString>;
            lastName: z.ZodOptional<z.ZodString>;
            street: z.ZodOptional<z.ZodString>;
            street2: z.ZodOptional<z.ZodString>;
            streetNumber: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                value: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                value?: string | undefined;
            }, {
                key: string;
                value?: string | undefined;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            type: EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }, {
            type: "delivery" | "billing" | "other";
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        identifier?: string | undefined;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        birthDate?: Date | undefined;
        companyName?: string | undefined;
        taxNumber?: string | undefined;
        addresses?: {
            type: EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }, {
        identifier?: string | undefined;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        birthDate?: Date | undefined;
        companyName?: string | undefined;
        taxNumber?: string | undefined;
        addresses?: {
            type: "delivery" | "billing" | "other";
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }>;
    cart: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        sku: z.ZodOptional<z.ZodString>;
        productId: z.ZodOptional<z.ZodString>;
        productVariantId: z.ZodOptional<z.ZodString>;
        imageUrl: z.ZodOptional<z.ZodString>;
        quantity: z.ZodNumber;
        subscription: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            period: z.ZodNumber;
            unit: z.ZodEffects<z.ZodEnum<["minute", "hour", "day", "week", "month", "year"]>, EnumType, "minute" | "hour" | "day" | "week" | "month" | "year">;
            start: z.ZodOptional<z.ZodDate>;
            end: z.ZodOptional<z.ZodDate>;
            meteredVariables: z.ZodOptional<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                usage: z.ZodNumber;
                price: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                id: string;
                usage: number;
                price: number;
            }, {
                id: string;
                usage: number;
                price: number;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            period: number;
            unit: EnumType;
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        }, {
            period: number;
            unit: "minute" | "hour" | "day" | "week" | "month" | "year";
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        }>>;
        subscriptionContractId: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodObject<{
            gross: z.ZodOptional<z.ZodNumber>;
            net: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodString;
            discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                percent?: number | undefined;
            }, {
                percent?: number | undefined;
            }>, "many">>;
            tax: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                percent?: number | undefined;
            }, {
                name?: string | undefined;
                percent?: number | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }>>;
        subTotal: z.ZodOptional<z.ZodObject<{
            gross: z.ZodOptional<z.ZodNumber>;
            net: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodString;
            discounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                percent?: number | undefined;
            }, {
                percent?: number | undefined;
            }>, "many">>;
            tax: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                percent: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                percent?: number | undefined;
            }, {
                name?: string | undefined;
                percent?: number | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }, {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        }>>;
        meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            value: string;
            key: string;
        }, {
            value: string;
            key: string;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        quantity: number;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        sku?: string | undefined;
        productId?: string | undefined;
        productVariantId?: string | undefined;
        imageUrl?: string | undefined;
        price?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscription?: {
            period: number;
            unit: EnumType;
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        } | undefined;
        subscriptionContractId?: string | undefined;
        subTotal?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
    }, {
        name: string;
        quantity: number;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        sku?: string | undefined;
        productId?: string | undefined;
        productVariantId?: string | undefined;
        imageUrl?: string | undefined;
        price?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscription?: {
            period: number;
            unit: "minute" | "hour" | "day" | "week" | "month" | "year";
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        } | undefined;
        subscriptionContractId?: string | undefined;
        subTotal?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
    }>, "many">;
    createdAt: z.ZodOptional<z.ZodDate>;
}>, "strict", z.ZodTypeAny, {
    customer: {
        identifier?: string | undefined;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        birthDate?: Date | undefined;
        companyName?: string | undefined;
        taxNumber?: string | undefined;
        addresses?: {
            type: EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    };
    cart: {
        name: string;
        quantity: number;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        sku?: string | undefined;
        productId?: string | undefined;
        productVariantId?: string | undefined;
        imageUrl?: string | undefined;
        price?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscription?: {
            period: number;
            unit: EnumType;
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        } | undefined;
        subscriptionContractId?: string | undefined;
        subTotal?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
    }[];
    meta?: {
        value: string;
        key: string;
    }[] | undefined;
    payment?: {
        provider: EnumType;
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }[] | undefined;
    total?: {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    } | undefined;
    additionnalInformation?: string | undefined;
    createdAt?: Date | undefined;
}, {
    customer: {
        identifier?: string | undefined;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        birthDate?: Date | undefined;
        companyName?: string | undefined;
        taxNumber?: string | undefined;
        addresses?: {
            type: "delivery" | "billing" | "other";
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    };
    cart: {
        name: string;
        quantity: number;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        sku?: string | undefined;
        productId?: string | undefined;
        productVariantId?: string | undefined;
        imageUrl?: string | undefined;
        price?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscription?: {
            period: number;
            unit: "minute" | "hour" | "day" | "week" | "month" | "year";
            name?: string | undefined;
            start?: Date | undefined;
            end?: Date | undefined;
            meteredVariables?: {
                id: string;
                usage: number;
                price: number;
            }[] | undefined;
        } | undefined;
        subscriptionContractId?: string | undefined;
        subTotal?: {
            currency: string;
            tax: {
                name?: string | undefined;
                percent?: number | undefined;
            };
            gross?: number | undefined;
            net?: number | undefined;
            discounts?: {
                percent?: number | undefined;
            }[] | undefined;
        } | undefined;
    }[];
    meta?: {
        value: string;
        key: string;
    }[] | undefined;
    payment?: {
        provider: "custom" | "klarna" | "stripe" | "paypal" | "cash";
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }[] | undefined;
    total?: {
        currency: string;
        tax: {
            name?: string | undefined;
            percent?: number | undefined;
        };
        gross?: number | undefined;
        net?: number | undefined;
        discounts?: {
            percent?: number | undefined;
        }[] | undefined;
    } | undefined;
    additionnalInformation?: string | undefined;
    createdAt?: Date | undefined;
}>;
type CreateOrderInputRequest = z.infer<typeof createOrderInputRequest>;
interface OrderCreatedConfirmation {
    id: string;
    createdAt: Date;
}
interface OrderUpdatedConfirmation {
    id: string;
    updatedAt: Date;
}
interface Order {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    cart: OrderItem[];
    customer: OrderCustomer;
    payment?: Payment[];
    total?: Price;
    additionnalInformation?: string;
    meta?: OrderMetadata[];
}
interface OrderItem {
    name: string;
    sku?: string;
    productId?: string;
    productVariantId?: string;
    imageUrl?: string;
    quantity: number;
    subscription?: OrderItemSubscription;
    subscriptionContractId?: string;
    price?: Price;
    subTotal?: Price;
    meta?: OrderMetadata[];
}
type Payment = KlarnaPayment | PaypalPayment | StripePayment | CashPayment | CustomPayment;
interface Price {
    gross?: number;
    net?: number;
    currency: string;
    discounts?: Discount[];
    tax?: Tax;
}
type Tax = VatInfo;
interface Discount {
    percent?: number;
}
interface OrderMetadata {
    key: string;
    value?: string;
}
interface OrderItemSubscription {
    name?: string;
    period: number;
    unit: OrderItemSubscriptionUnit;
    start?: Date;
    end?: Date;
    meteredVariables?: OrderItemSubscriptionMeteredVariable[];
}
type OrderItemSubscriptionUnit = SubscriptionPeriodUnit | 'hour' | 'minute';
interface OrderItemSubscriptionMeteredVariable {
    id: string;
    usage: number;
    price: number;
}

declare const subscriptionContractMetadataInputRequest: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodString;
}, "strict", z.ZodTypeAny, {
    value: string;
    key: string;
}, {
    value: string;
    key: string;
}>;
type SubscriptionContractMetadataInputRequest = z.infer<typeof subscriptionContractMetadataInputRequest>;
declare const subscriptionContractMeteredVariableTierInputRequest: z.ZodObject<{
    currency: z.ZodString;
    price: z.ZodNumber;
    threshold: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    price: number;
    currency: string;
    threshold: number;
}, {
    price: number;
    currency: string;
    threshold: number;
}>;
type SubscriptionContractMeteredVariableTierInputRequest = z.infer<typeof subscriptionContractMeteredVariableTierInputRequest>;
declare const subscriptionContractMeteredVariableReferenceInputRequest: z.ZodObject<{
    id: z.ZodString;
    tierType: z.ZodEffects<z.ZodEnum<["graduated", "volume"]>, EnumType, "graduated" | "volume">;
    tiers: z.ZodArray<z.ZodObject<{
        currency: z.ZodString;
        price: z.ZodNumber;
        threshold: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        price: number;
        currency: string;
        threshold: number;
    }, {
        price: number;
        currency: string;
        threshold: number;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    id: string;
    tierType: EnumType;
    tiers: {
        price: number;
        currency: string;
        threshold: number;
    }[];
}, {
    id: string;
    tierType: "graduated" | "volume";
    tiers: {
        price: number;
        currency: string;
        threshold: number;
    }[];
}>;
type SubscriptionContractMeteredVariableReferenceInputRequest = z.infer<typeof subscriptionContractMeteredVariableReferenceInputRequest>;
declare const subscriptionContractPhaseInputRequest: z.ZodObject<{
    currency: z.ZodString;
    price: z.ZodNumber;
    meteredVariables: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        tierType: z.ZodEffects<z.ZodEnum<["graduated", "volume"]>, EnumType, "graduated" | "volume">;
        tiers: z.ZodArray<z.ZodObject<{
            currency: z.ZodString;
            price: z.ZodNumber;
            threshold: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            price: number;
            currency: string;
            threshold: number;
        }, {
            price: number;
            currency: string;
            threshold: number;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        id: string;
        tierType: EnumType;
        tiers: {
            price: number;
            currency: string;
            threshold: number;
        }[];
    }, {
        id: string;
        tierType: "graduated" | "volume";
        tiers: {
            price: number;
            currency: string;
            threshold: number;
        }[];
    }>, "many">;
    productVariants: z.ZodOptional<z.ZodArray<z.ZodObject<{
        sku: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sku: string;
        quantity: number;
    }, {
        sku: string;
        quantity: number;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    price: number;
    meteredVariables: {
        id: string;
        tierType: EnumType;
        tiers: {
            price: number;
            currency: string;
            threshold: number;
        }[];
    }[];
    currency: string;
    productVariants?: {
        sku: string;
        quantity: number;
    }[] | undefined;
}, {
    price: number;
    meteredVariables: {
        id: string;
        tierType: "graduated" | "volume";
        tiers: {
            price: number;
            currency: string;
            threshold: number;
        }[];
    }[];
    currency: string;
    productVariants?: {
        sku: string;
        quantity: number;
    }[] | undefined;
}>;
type SubscriptionContractPhaseInput = z.infer<typeof subscriptionContractPhaseInputRequest>;
declare const createSubscriptionContractInputRequest: z.ZodObject<{
    customerIdentifier: z.ZodString;
    tenantId: z.ZodString;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEffects<z.ZodEnum<["delivery", "billing", "other"]>, EnumType, "delivery" | "billing" | "other">;
        firstName: z.ZodOptional<z.ZodString>;
        middleName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        street2: z.ZodOptional<z.ZodString>;
        streetNumber: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            value?: string | undefined;
        }, {
            key: string;
            value?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        type: EnumType;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }, {
        type: "delivery" | "billing" | "other";
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }>, "many">>;
    payment: z.ZodOptional<z.ZodObject<{
        provider: z.ZodEffects<z.ZodEnum<["klarna", "stripe", "paypal", "cash", "custom"]>, EnumType, "custom" | "klarna" | "stripe" | "paypal" | "cash">;
        klarna: z.ZodOptional<z.ZodObject<{
            klarna: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            recurringToken: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodString>;
            merchantReference1: z.ZodOptional<z.ZodString>;
            merchantReference2: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        }, {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        }>>;
        paypal: z.ZodOptional<z.ZodObject<{
            paypal: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            subscriptionId: z.ZodOptional<z.ZodString>;
            invoiceId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        }, {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        }>>;
        stripe: z.ZodOptional<z.ZodObject<{
            stripe: z.ZodOptional<z.ZodString>;
            customerId: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            paymentMethod: z.ZodOptional<z.ZodString>;
            paymentMethodId: z.ZodOptional<z.ZodString>;
            paymentIntentId: z.ZodOptional<z.ZodString>;
            subscriptionId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        }, {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        }>>;
        cash: z.ZodOptional<z.ZodObject<{
            cash: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            cash?: string | undefined;
        }, {
            cash?: string | undefined;
        }>>;
        custom: z.ZodOptional<z.ZodObject<{
            properties: z.ZodOptional<z.ZodArray<z.ZodObject<{
                property: z.ZodString;
                value: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                property: string;
                value?: string | undefined;
            }, {
                property: string;
                value?: string | undefined;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        }, {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        provider: EnumType;
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }, {
        provider: "custom" | "klarna" | "stripe" | "paypal" | "cash";
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }>>;
    subscriptionPlan: z.ZodOptional<z.ZodObject<{
        identifier: z.ZodString;
        periodId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        identifier: string;
        periodId: string;
    }, {
        identifier: string;
        periodId: string;
    }>>;
    status: z.ZodObject<{
        activeUntil: z.ZodDate;
        currency: z.ZodString;
        price: z.ZodNumber;
        renewAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        price: number;
        currency: string;
        activeUntil: Date;
        renewAt: Date;
    }, {
        price: number;
        currency: string;
        activeUntil: Date;
        renewAt: Date;
    }>;
    item: z.ZodObject<{
        sku: z.ZodString;
        name: z.ZodString;
        quantity: z.ZodOptional<z.ZodNumber>;
        imageUrl: z.ZodOptional<z.ZodString>;
        meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            value: string;
            key: string;
        }, {
            value: string;
            key: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        sku: string;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        imageUrl?: string | undefined;
        quantity?: number | undefined;
    }, {
        name: string;
        sku: string;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        imageUrl?: string | undefined;
        quantity?: number | undefined;
    }>;
    initial: z.ZodOptional<z.ZodObject<{
        currency: z.ZodString;
        price: z.ZodNumber;
        meteredVariables: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            tierType: z.ZodEffects<z.ZodEnum<["graduated", "volume"]>, EnumType, "graduated" | "volume">;
            tiers: z.ZodArray<z.ZodObject<{
                currency: z.ZodString;
                price: z.ZodNumber;
                threshold: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                price: number;
                currency: string;
                threshold: number;
            }, {
                price: number;
                currency: string;
                threshold: number;
            }>, "many">;
        }, "strict", z.ZodTypeAny, {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }, {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }>, "many">;
        productVariants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            sku: z.ZodString;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            sku: string;
            quantity: number;
        }, {
            sku: string;
            quantity: number;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        price: number;
        meteredVariables: {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    }, {
        price: number;
        meteredVariables: {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    }>>;
    recurring: z.ZodOptional<z.ZodObject<{
        currency: z.ZodString;
        price: z.ZodNumber;
        meteredVariables: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            tierType: z.ZodEffects<z.ZodEnum<["graduated", "volume"]>, EnumType, "graduated" | "volume">;
            tiers: z.ZodArray<z.ZodObject<{
                currency: z.ZodString;
                price: z.ZodNumber;
                threshold: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                price: number;
                currency: string;
                threshold: number;
            }, {
                price: number;
                currency: string;
                threshold: number;
            }>, "many">;
        }, "strict", z.ZodTypeAny, {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }, {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }>, "many">;
        productVariants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            sku: z.ZodString;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            sku: string;
            quantity: number;
        }, {
            sku: string;
            quantity: number;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        price: number;
        meteredVariables: {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    }, {
        price: number;
        meteredVariables: {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    }>>;
    meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        value: string;
        key: string;
    }, {
        value: string;
        key: string;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    status: {
        price: number;
        currency: string;
        activeUntil: Date;
        renewAt: Date;
    };
    customerIdentifier: string;
    tenantId: string;
    item: {
        name: string;
        sku: string;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        imageUrl?: string | undefined;
        quantity?: number | undefined;
    };
    meta?: {
        value: string;
        key: string;
    }[] | undefined;
    addresses?: {
        type: EnumType;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
    payment?: {
        provider: EnumType;
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    } | undefined;
    subscriptionPlan?: {
        identifier: string;
        periodId: string;
    } | undefined;
    initial?: {
        price: number;
        meteredVariables: {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    } | undefined;
    recurring?: {
        price: number;
        meteredVariables: {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    } | undefined;
}, {
    status: {
        price: number;
        currency: string;
        activeUntil: Date;
        renewAt: Date;
    };
    customerIdentifier: string;
    tenantId: string;
    item: {
        name: string;
        sku: string;
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        imageUrl?: string | undefined;
        quantity?: number | undefined;
    };
    meta?: {
        value: string;
        key: string;
    }[] | undefined;
    addresses?: {
        type: "delivery" | "billing" | "other";
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
    payment?: {
        provider: "custom" | "klarna" | "stripe" | "paypal" | "cash";
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    } | undefined;
    subscriptionPlan?: {
        identifier: string;
        periodId: string;
    } | undefined;
    initial?: {
        price: number;
        meteredVariables: {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    } | undefined;
    recurring?: {
        price: number;
        meteredVariables: {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    } | undefined;
}>;
type CreateSubscriptionContractInputRequest = z.infer<typeof createSubscriptionContractInputRequest>;
declare const updateSubscriptionContractInputRequest: z.ZodObject<{
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEffects<z.ZodEnum<["delivery", "billing", "other"]>, EnumType, "delivery" | "billing" | "other">;
        firstName: z.ZodOptional<z.ZodString>;
        middleName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        street2: z.ZodOptional<z.ZodString>;
        streetNumber: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            key: string;
            value?: string | undefined;
        }, {
            key: string;
            value?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        type: EnumType;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }, {
        type: "delivery" | "billing" | "other";
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }>, "many">>;
    payment: z.ZodOptional<z.ZodObject<{
        provider: z.ZodEffects<z.ZodEnum<["klarna", "stripe", "paypal", "cash", "custom"]>, EnumType, "custom" | "klarna" | "stripe" | "paypal" | "cash">;
        klarna: z.ZodOptional<z.ZodObject<{
            klarna: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            recurringToken: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodString>;
            merchantReference1: z.ZodOptional<z.ZodString>;
            merchantReference2: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        }, {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        }>>;
        paypal: z.ZodOptional<z.ZodObject<{
            paypal: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            subscriptionId: z.ZodOptional<z.ZodString>;
            invoiceId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        }, {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        }>>;
        stripe: z.ZodOptional<z.ZodObject<{
            stripe: z.ZodOptional<z.ZodString>;
            customerId: z.ZodOptional<z.ZodString>;
            orderId: z.ZodOptional<z.ZodString>;
            paymentMethod: z.ZodOptional<z.ZodString>;
            paymentMethodId: z.ZodOptional<z.ZodString>;
            paymentIntentId: z.ZodOptional<z.ZodString>;
            subscriptionId: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        }, {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        }>>;
        cash: z.ZodOptional<z.ZodObject<{
            cash: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            cash?: string | undefined;
        }, {
            cash?: string | undefined;
        }>>;
        custom: z.ZodOptional<z.ZodObject<{
            properties: z.ZodOptional<z.ZodArray<z.ZodObject<{
                property: z.ZodString;
                value: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                property: string;
                value?: string | undefined;
            }, {
                property: string;
                value?: string | undefined;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        }, {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        provider: EnumType;
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }, {
        provider: "custom" | "klarna" | "stripe" | "paypal" | "cash";
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    }>>;
    status: z.ZodOptional<z.ZodObject<{
        activeUntil: z.ZodOptional<z.ZodDate>;
        currency: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        renewAt: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        price?: number | undefined;
        currency?: string | undefined;
        activeUntil?: Date | undefined;
        renewAt?: Date | undefined;
    }, {
        price?: number | undefined;
        currency?: string | undefined;
        activeUntil?: Date | undefined;
        renewAt?: Date | undefined;
    }>>;
    item: z.ZodOptional<z.ZodObject<{
        sku: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        quantity: z.ZodOptional<z.ZodNumber>;
        imageUrl: z.ZodOptional<z.ZodString>;
        meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            value: string;
            key: string;
        }, {
            value: string;
            key: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        name?: string | undefined;
        sku?: string | undefined;
        imageUrl?: string | undefined;
        quantity?: number | undefined;
    }, {
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        name?: string | undefined;
        sku?: string | undefined;
        imageUrl?: string | undefined;
        quantity?: number | undefined;
    }>>;
    initial: z.ZodOptional<z.ZodObject<{
        currency: z.ZodString;
        price: z.ZodNumber;
        meteredVariables: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            tierType: z.ZodEffects<z.ZodEnum<["graduated", "volume"]>, EnumType, "graduated" | "volume">;
            tiers: z.ZodArray<z.ZodObject<{
                currency: z.ZodString;
                price: z.ZodNumber;
                threshold: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                price: number;
                currency: string;
                threshold: number;
            }, {
                price: number;
                currency: string;
                threshold: number;
            }>, "many">;
        }, "strict", z.ZodTypeAny, {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }, {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }>, "many">;
        productVariants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            sku: z.ZodString;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            sku: string;
            quantity: number;
        }, {
            sku: string;
            quantity: number;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        price: number;
        meteredVariables: {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    }, {
        price: number;
        meteredVariables: {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    }>>;
    recurring: z.ZodOptional<z.ZodObject<{
        currency: z.ZodString;
        price: z.ZodNumber;
        meteredVariables: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            tierType: z.ZodEffects<z.ZodEnum<["graduated", "volume"]>, EnumType, "graduated" | "volume">;
            tiers: z.ZodArray<z.ZodObject<{
                currency: z.ZodString;
                price: z.ZodNumber;
                threshold: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                price: number;
                currency: string;
                threshold: number;
            }, {
                price: number;
                currency: string;
                threshold: number;
            }>, "many">;
        }, "strict", z.ZodTypeAny, {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }, {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }>, "many">;
        productVariants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            sku: z.ZodString;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            sku: string;
            quantity: number;
        }, {
            sku: string;
            quantity: number;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        price: number;
        meteredVariables: {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    }, {
        price: number;
        meteredVariables: {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    }>>;
    meta: z.ZodOptional<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        value: string;
        key: string;
    }, {
        value: string;
        key: string;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    status?: {
        price?: number | undefined;
        currency?: string | undefined;
        activeUntil?: Date | undefined;
        renewAt?: Date | undefined;
    } | undefined;
    meta?: {
        value: string;
        key: string;
    }[] | undefined;
    addresses?: {
        type: EnumType;
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
    payment?: {
        provider: EnumType;
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    } | undefined;
    item?: {
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        name?: string | undefined;
        sku?: string | undefined;
        imageUrl?: string | undefined;
        quantity?: number | undefined;
    } | undefined;
    initial?: {
        price: number;
        meteredVariables: {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    } | undefined;
    recurring?: {
        price: number;
        meteredVariables: {
            id: string;
            tierType: EnumType;
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    } | undefined;
}, {
    status?: {
        price?: number | undefined;
        currency?: string | undefined;
        activeUntil?: Date | undefined;
        renewAt?: Date | undefined;
    } | undefined;
    meta?: {
        value: string;
        key: string;
    }[] | undefined;
    addresses?: {
        type: "delivery" | "billing" | "other";
        firstName?: string | undefined;
        middleName?: string | undefined;
        lastName?: string | undefined;
        street?: string | undefined;
        street2?: string | undefined;
        streetNumber?: string | undefined;
        postalCode?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        meta?: {
            key: string;
            value?: string | undefined;
        }[] | undefined;
    }[] | undefined;
    payment?: {
        provider: "custom" | "klarna" | "stripe" | "paypal" | "cash";
        custom?: {
            properties?: {
                property: string;
                value?: string | undefined;
            }[] | undefined;
        } | undefined;
        klarna?: {
            status?: string | undefined;
            klarna?: string | undefined;
            orderId?: string | undefined;
            recurringToken?: string | undefined;
            merchantReference1?: string | undefined;
            merchantReference2?: string | undefined;
            metadata?: string | undefined;
        } | undefined;
        stripe?: {
            stripe?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            customerId?: string | undefined;
            paymentMethod?: string | undefined;
            paymentMethodId?: string | undefined;
            paymentIntentId?: string | undefined;
        } | undefined;
        paypal?: {
            paypal?: string | undefined;
            orderId?: string | undefined;
            metadata?: string | undefined;
            subscriptionId?: string | undefined;
            invoiceId?: string | undefined;
        } | undefined;
        cash?: {
            cash?: string | undefined;
        } | undefined;
    } | undefined;
    item?: {
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        name?: string | undefined;
        sku?: string | undefined;
        imageUrl?: string | undefined;
        quantity?: number | undefined;
    } | undefined;
    initial?: {
        price: number;
        meteredVariables: {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    } | undefined;
    recurring?: {
        price: number;
        meteredVariables: {
            id: string;
            tierType: "graduated" | "volume";
            tiers: {
                price: number;
                currency: string;
                threshold: number;
            }[];
        }[];
        currency: string;
        productVariants?: {
            sku: string;
            quantity: number;
        }[] | undefined;
    } | undefined;
}>;
type UpdateSubscriptionContractInputRequest = z.infer<typeof updateSubscriptionContractInputRequest>;
type SubscriptionContractInnerDefinition = Omit<CreateSubscriptionContractInputRequest, 'customerIdentifier' | 'payment' | 'addresses' | 'tenantId' | 'status'>;
type PlanMeteredVariable = {
    id: string;
    identifier: string;
    name?: string;
    unit: string;
};
type MeteredVariable = PlanMeteredVariable & {
    id: string;
    tierType: string;
    tiers: {
        currency: string;
        threshold: number;
        price: number;
    }[];
};
type Phase = {
    period: number;
    unit: string;
    price: number;
    currency: string;
    meteredVariables?: MeteredVariable[];
};
type SubscriptionContract = {
    id: string;
    customerIdentifier: string;
    tenantId: string;
    subscriptionPlan: {
        name: string;
        identifier: string;
        meteredVariables: PlanMeteredVariable[];
    };
    item: {
        name: string;
        sku: string;
        imageUrl?: string;
        quantity?: number;
        meta?: {
            key: string;
            value?: string;
        };
    };
    payment: Payment;
    initial?: Phase;
    recurring: Phase;
    status: {
        renewAt: string;
        activeUntil: string;
        price: number;
        currency: string;
    };
    meta?: {
        key: string;
        value?: string;
    }[];
    customer?: {
        identifier: string;
        email: string;
        firstName: string;
        lastName: string;
        companyName: string;
        phone: string;
        taxNumber: string;
        meta: {
            key: string;
            value: string;
        }[];
        externalReferences: {
            key: string;
            value: string;
        }[];
        addresses?: Address[];
    };
    addresses?: Address[];
};

declare const catalogueSearchFilter: z.ZodObject<{
    searchTerm: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEffects<z.ZodEnum<["PRODUCT", "FOLDER", "DOCUMENT"]>, EnumType, "PRODUCT" | "FOLDER" | "DOCUMENT">>;
    include: z.ZodOptional<z.ZodObject<{
        itemIds: z.ZodOptional<z.ZodString>;
        productVariantIds: z.ZodOptional<z.ZodString>;
        skus: z.ZodOptional<z.ZodString>;
        shapeIdentifiers: z.ZodOptional<z.ZodString>;
        paths: z.ZodOptional<z.ZodString>;
        topicsPaths: z.ZodOptional<z.ZodObject<{
            logicalOperator: z.ZodEffects<z.ZodEnum<["AND", "OR"]>, EnumType, "AND" | "OR">;
            sections: z.ZodArray<z.ZodObject<{
                logicalOperator: z.ZodEffects<z.ZodEnum<["AND", "OR"]>, EnumType, "AND" | "OR">;
                fields: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    value: z.ZodString;
                }, "strict", z.ZodTypeAny, {
                    value: string;
                }, {
                    value: string;
                }>, "many">>;
            }, "strict", z.ZodTypeAny, {
                logicalOperator: EnumType;
                fields?: {
                    value: string;
                }[] | undefined;
            }, {
                logicalOperator: "AND" | "OR";
                fields?: {
                    value: string;
                }[] | undefined;
            }>, "many">;
        }, "strict", z.ZodTypeAny, {
            logicalOperator: EnumType;
            sections: {
                logicalOperator: EnumType;
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        }, {
            logicalOperator: "AND" | "OR";
            sections: {
                logicalOperator: "AND" | "OR";
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        }>>;
    }, "strict", z.ZodTypeAny, {
        skus?: string | undefined;
        itemIds?: string | undefined;
        productVariantIds?: string | undefined;
        shapeIdentifiers?: string | undefined;
        paths?: string | undefined;
        topicsPaths?: {
            logicalOperator: EnumType;
            sections: {
                logicalOperator: EnumType;
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        } | undefined;
    }, {
        skus?: string | undefined;
        itemIds?: string | undefined;
        productVariantIds?: string | undefined;
        shapeIdentifiers?: string | undefined;
        paths?: string | undefined;
        topicsPaths?: {
            logicalOperator: "AND" | "OR";
            sections: {
                logicalOperator: "AND" | "OR";
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        } | undefined;
    }>>;
    exclude: z.ZodOptional<z.ZodObject<{
        itemIds: z.ZodOptional<z.ZodString>;
        productVariantIds: z.ZodOptional<z.ZodString>;
        skus: z.ZodOptional<z.ZodString>;
        shapeIdentifiers: z.ZodOptional<z.ZodString>;
        paths: z.ZodOptional<z.ZodString>;
        topicsPaths: z.ZodOptional<z.ZodObject<{
            logicalOperator: z.ZodEffects<z.ZodEnum<["AND", "OR"]>, EnumType, "AND" | "OR">;
            sections: z.ZodArray<z.ZodObject<{
                logicalOperator: z.ZodEffects<z.ZodEnum<["AND", "OR"]>, EnumType, "AND" | "OR">;
                fields: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    value: z.ZodString;
                }, "strict", z.ZodTypeAny, {
                    value: string;
                }, {
                    value: string;
                }>, "many">>;
            }, "strict", z.ZodTypeAny, {
                logicalOperator: EnumType;
                fields?: {
                    value: string;
                }[] | undefined;
            }, {
                logicalOperator: "AND" | "OR";
                fields?: {
                    value: string;
                }[] | undefined;
            }>, "many">;
        }, "strict", z.ZodTypeAny, {
            logicalOperator: EnumType;
            sections: {
                logicalOperator: EnumType;
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        }, {
            logicalOperator: "AND" | "OR";
            sections: {
                logicalOperator: "AND" | "OR";
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        }>>;
    }, "strict", z.ZodTypeAny, {
        skus?: string | undefined;
        itemIds?: string | undefined;
        productVariantIds?: string | undefined;
        shapeIdentifiers?: string | undefined;
        paths?: string | undefined;
        topicsPaths?: {
            logicalOperator: EnumType;
            sections: {
                logicalOperator: EnumType;
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        } | undefined;
    }, {
        skus?: string | undefined;
        itemIds?: string | undefined;
        productVariantIds?: string | undefined;
        shapeIdentifiers?: string | undefined;
        paths?: string | undefined;
        topicsPaths?: {
            logicalOperator: "AND" | "OR";
            sections: {
                logicalOperator: "AND" | "OR";
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        } | undefined;
    }>>;
    priceVariant: z.ZodOptional<z.ZodString>;
    stockLocation: z.ZodOptional<z.ZodString>;
    productVariants: z.ZodOptional<z.ZodObject<{
        isDefault: z.ZodOptional<z.ZodBoolean>;
        priceRange: z.ZodOptional<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            min: number;
            max: number;
        }, {
            min: number;
            max: number;
        }>>;
        stock: z.ZodOptional<z.ZodObject<{
            min: z.ZodNumber;
            location: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            min: number;
            location?: string | undefined;
        }, {
            min: number;
            location?: string | undefined;
        }>>;
        stockLocations: z.ZodOptional<z.ZodObject<{
            min: z.ZodNumber;
            location: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            logicalOperator: z.ZodEnum<["OR"]>;
        }, "strict", z.ZodTypeAny, {
            logicalOperator: "OR";
            min: number;
            location?: string[] | undefined;
        }, {
            logicalOperator: "OR";
            min: number;
            location?: string[] | undefined;
        }>>;
        attributes: z.ZodOptional<z.ZodObject<{
            attribute: z.ZodString;
            value: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            value: string;
            attribute: string;
        }, {
            value: string;
            attribute: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        isDefault?: boolean | undefined;
        priceRange?: {
            min: number;
            max: number;
        } | undefined;
        stock?: {
            min: number;
            location?: string | undefined;
        } | undefined;
        stockLocations?: {
            logicalOperator: "OR";
            min: number;
            location?: string[] | undefined;
        } | undefined;
        attributes?: {
            value: string;
            attribute: string;
        } | undefined;
    }, {
        isDefault?: boolean | undefined;
        priceRange?: {
            min: number;
            max: number;
        } | undefined;
        stock?: {
            min: number;
            location?: string | undefined;
        } | undefined;
        stockLocations?: {
            logicalOperator: "OR";
            min: number;
            location?: string[] | undefined;
        } | undefined;
        attributes?: {
            value: string;
            attribute: string;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type?: EnumType | undefined;
    productVariants?: {
        isDefault?: boolean | undefined;
        priceRange?: {
            min: number;
            max: number;
        } | undefined;
        stock?: {
            min: number;
            location?: string | undefined;
        } | undefined;
        stockLocations?: {
            logicalOperator: "OR";
            min: number;
            location?: string[] | undefined;
        } | undefined;
        attributes?: {
            value: string;
            attribute: string;
        } | undefined;
    } | undefined;
    searchTerm?: string | undefined;
    include?: {
        skus?: string | undefined;
        itemIds?: string | undefined;
        productVariantIds?: string | undefined;
        shapeIdentifiers?: string | undefined;
        paths?: string | undefined;
        topicsPaths?: {
            logicalOperator: EnumType;
            sections: {
                logicalOperator: EnumType;
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        } | undefined;
    } | undefined;
    exclude?: {
        skus?: string | undefined;
        itemIds?: string | undefined;
        productVariantIds?: string | undefined;
        shapeIdentifiers?: string | undefined;
        paths?: string | undefined;
        topicsPaths?: {
            logicalOperator: EnumType;
            sections: {
                logicalOperator: EnumType;
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        } | undefined;
    } | undefined;
    priceVariant?: string | undefined;
    stockLocation?: string | undefined;
}, {
    type?: "PRODUCT" | "FOLDER" | "DOCUMENT" | undefined;
    productVariants?: {
        isDefault?: boolean | undefined;
        priceRange?: {
            min: number;
            max: number;
        } | undefined;
        stock?: {
            min: number;
            location?: string | undefined;
        } | undefined;
        stockLocations?: {
            logicalOperator: "OR";
            min: number;
            location?: string[] | undefined;
        } | undefined;
        attributes?: {
            value: string;
            attribute: string;
        } | undefined;
    } | undefined;
    searchTerm?: string | undefined;
    include?: {
        skus?: string | undefined;
        itemIds?: string | undefined;
        productVariantIds?: string | undefined;
        shapeIdentifiers?: string | undefined;
        paths?: string | undefined;
        topicsPaths?: {
            logicalOperator: "AND" | "OR";
            sections: {
                logicalOperator: "AND" | "OR";
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        } | undefined;
    } | undefined;
    exclude?: {
        skus?: string | undefined;
        itemIds?: string | undefined;
        productVariantIds?: string | undefined;
        shapeIdentifiers?: string | undefined;
        paths?: string | undefined;
        topicsPaths?: {
            logicalOperator: "AND" | "OR";
            sections: {
                logicalOperator: "AND" | "OR";
                fields?: {
                    value: string;
                }[] | undefined;
            }[];
        } | undefined;
    } | undefined;
    priceVariant?: string | undefined;
    stockLocation?: string | undefined;
}>;
type CatalogueSearchFilter = z.infer<typeof catalogueSearchFilter>;
declare const catalogueSearchOrderBy: z.ZodObject<{
    field: z.ZodEffects<z.ZodEnum<["ITEM_NAME", "PRICE", "STOCK", "CREATED_AT"]>, EnumType, "ITEM_NAME" | "PRICE" | "STOCK" | "CREATED_AT">;
    direction: z.ZodEffects<z.ZodEnum<["ASC", "DESC"]>, EnumType, "ASC" | "DESC">;
}, "strict", z.ZodTypeAny, {
    field: EnumType;
    direction: EnumType;
}, {
    field: "ITEM_NAME" | "PRICE" | "STOCK" | "CREATED_AT";
    direction: "ASC" | "DESC";
}>;
type CatalogueSearchOrderBy = z.infer<typeof catalogueSearchOrderBy>;

type ClientConfiguration = {
    tenantIdentifier: string;
    tenantId?: string;
    accessTokenId?: string;
    accessTokenSecret?: string;
    staticAuthToken?: string;
    sessionId?: string;
    shopApiToken?: string;
    origin?: string;
};
type ProfilingOptions = {
    onRequest?: (query: string, variables?: VariablesType) => void;
    onRequestResolved: ({ resolutionTimeMs, serverTimeMs, }: {
        resolutionTimeMs: number;
        serverTimeMs: number;
    }, query: string, variables?: VariablesType) => void;
};
type CreateClientOptions = {
    useHttp2?: boolean;
    profiling?: ProfilingOptions;
    extraHeaders?: RequestInit['headers'];
    shopApiToken?: {
        doNotFetch?: boolean;
        scopes?: string[];
        expiresIn?: number;
    };
};
type VariablesType = Record<string, any>;
type ApiCaller<T> = (query: string, variables?: VariablesType) => Promise<T>;
type ClientInterface = {
    catalogueApi: ApiCaller<any>;
    discoveryApi: ApiCaller<any>;
    searchApi: ApiCaller<any>;
    orderApi: ApiCaller<any>;
    subscriptionApi: ApiCaller<any>;
    pimApi: ApiCaller<any>;
    nextPimApi: ApiCaller<any>;
    shopCartApi: ApiCaller<any>;
    config: Pick<ClientConfiguration, 'tenantIdentifier' | 'tenantId' | 'origin'>;
    close: () => void;
};
declare function createClient(configuration: ClientConfiguration, options?: CreateClientOptions): ClientInterface;

type ProductHydrater = (items: string[], language: string, extraQuery?: any, perProduct?: (item: string, index: number) => any, perVariant?: (item: string, index: number) => any) => Promise<any>;
type ProductHydraterOptions = {
    useSyncApiForSKUs?: boolean;
    marketIdentifiers?: string[];
    priceList?: string;
    priceForEveryone?: boolean;
};
declare function createProductHydrater(client: ClientInterface, options?: ProductHydraterOptions): {
    byPaths: ProductHydrater;
    bySkus: ProductHydrater;
};

declare enum NavigationType {
    Tree = 0,
    Topics = 1
}
type TreeFetcher = (path: string, language: string, depth: number, extraQuery?: any, perLevel?: (currentLevel: number) => any) => Promise<any>;
declare function buildNestedNavigationQuery(type: NavigationType, path: string, depth: number, extraQuery?: any, perLevel?: (currentLevel: number) => any): string;
declare function createNavigationFetcher(client: ClientInterface): {
    byFolders: TreeFetcher;
    byTopics: TreeFetcher;
};

type CrystallizePromise<T> = {
    key: string;
    caller: ApiCaller<T>;
    query: string;
    variables?: VariablesType;
};
type MassCallClientBatch = {
    from: number;
    to: number;
};
type QueuedApiCaller = (query: string, variables?: VariablesType) => string;
type MassClientInterface = ClientInterface & {
    execute: () => Promise<any>;
    reset: () => void;
    hasFailed: () => boolean;
    failureCount: () => number;
    retry: () => Promise<any>;
    catalogueApi: ApiCaller<any>;
    searchApi: ApiCaller<any>;
    orderApi: ApiCaller<any>;
    subscriptionApi: ApiCaller<any>;
    pimApi: ApiCaller<any>;
    nextPimApi: ApiCaller<any>;
    enqueue: {
        catalogueApi: QueuedApiCaller;
        discoveryApi: QueuedApiCaller;
        searchApi: QueuedApiCaller;
        orderApi: QueuedApiCaller;
        subscriptionApi: QueuedApiCaller;
        pimApi: QueuedApiCaller;
        nextPimApi: QueuedApiCaller;
    };
};
type Sleeper = {
    wait: () => Promise<void>;
    reset: () => void;
};
/**
 * Note: MassCallClient is experimental and may not work as expected.
 * Creates a mass call client based on an existing ClientInterface.
 *
 * @param client ClientInterface
 * @param options Object
 * @returns MassClientInterface
 */
declare function createMassCallClient(client: ClientInterface, options: {
    initialSpawn?: number;
    maxSpawn?: number;
    onBatchDone?: (batch: MassCallClientBatch) => Promise<void>;
    beforeRequest?: (batch: MassCallClientBatch, promise: CrystallizePromise<any>) => Promise<CrystallizePromise<any> | void>;
    afterRequest?: (batch: MassCallClientBatch, promise: CrystallizePromise<any>, results: any) => Promise<void>;
    onFailure?: (batch: {
        from: number;
        to: number;
    }, exception: any, promise: CrystallizePromise<any>) => Promise<boolean>;
    sleeper?: Sleeper;
    changeIncrementFor?: (situaion: 'more-than-half-have-failed' | 'some-have-failed' | 'none-have-failed', currentIncrement: number) => number;
}): MassClientInterface;

type CatalogueFetcherGrapqhqlOnItem = {
    onTopic?: any;
};
type CatalogueFetcherGrapqhqlOnProduct = {
    onDefaultVariant?: any;
    onVariant?: any;
    onPriceVariant?: any;
};
type CatalogueFetcherGrapqhqlOnDocument = {};
type CatalogueFetcherGrapqhqlOnSubscriptionPlan = {
    onPeriod: (name: string) => any;
};
type CatalogueFetcherGrapqhqlOnFolder = {
    onChildren?: any;
};
type CatalogueFetcherGrapqhqlOnComponent = {};
declare const componentType: z.ZodEffects<z.ZodEnum<["Boolean", "ComponentChoice", "ContentChunk", "Datetime", "File", "GridRelations", "Image", "ItemRelations", "Location", "Numeric", "ParagraphCollection", "PropertiesTable", "RichText", "Selection", "SingleLine", "Video"]>, string, "Boolean" | "ComponentChoice" | "ContentChunk" | "Datetime" | "File" | "GridRelations" | "Image" | "ItemRelations" | "Location" | "Numeric" | "ParagraphCollection" | "PropertiesTable" | "RichText" | "Selection" | "SingleLine" | "Video">;
type ComponentType = z.infer<typeof componentType>;

declare function createCatalogueFetcher(client: ClientInterface): <T>(query: any, variables?: VariablesType) => Promise<T>;
declare const catalogueFetcherGraphqlBuilder: {
    onItem: typeof onItem;
    onProduct: typeof onProduct;
    onDocument: typeof onDocument;
    onFolder: typeof onFolder;
    onComponent: typeof onComponent;
    onSubscriptionPlan: typeof onSubscriptionPlan;
};
declare function onItem(onItem?: any, c?: CatalogueFetcherGrapqhqlOnItem): any;
declare function onDocument(onDocument?: any, c?: CatalogueFetcherGrapqhqlOnDocument): any;
declare function onFolder(onFolder?: any, c?: CatalogueFetcherGrapqhqlOnFolder): any;
declare function onProduct(onProduct?: any, c?: CatalogueFetcherGrapqhqlOnProduct): any;
declare function onComponent(id: string, type: ComponentType, onComponent?: any, c?: CatalogueFetcherGrapqhqlOnComponent): any;
declare function onSubscriptionPlan(c?: CatalogueFetcherGrapqhqlOnSubscriptionPlan): any;

declare function createOrderFetcher(apiClient: ClientInterface): {
    byId: (orderId: string, onCustomer?: any, onOrderItem?: any, extraQuery?: any) => Promise<Order>;
    byCustomerIdentifier: (customerIdentifier: string, extraQueryArgs?: any, onCustomer?: any, onOrderItem?: any, extraQuery?: any) => Promise<{
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: string;
            endCursor: string;
            totalNodes: number;
        };
        orders: Order[];
    }>;
};
declare function createOrderPipelineStageSetter(apiClient: ClientInterface): (id: string, pipelineId: string, stageId: string) => Promise<void>;
declare function createOrderPusher(apiClient: ClientInterface): (intentOrder: CreateOrderInputRequest) => Promise<OrderCreatedConfirmation>;
declare function createOrderPaymentUpdater(apiClient: ClientInterface): (orderId: string, intentOrder: UpdateOrderInputRequest) => Promise<OrderUpdatedConfirmation>;

declare function createSearcher(client: ClientInterface): {
    search: (language: string, nodeQuery: any, filter?: CatalogueSearchFilter, orderBy?: CatalogueSearchOrderBy, pageInfo?: any, limit?: {
        perPage?: number;
        total?: number;
    }, cursors?: {
        before?: string;
        after?: string;
    }) => AsyncIterableIterator<any>;
};

declare const createShapeBrowser: (client: ClientInterface) => {
    query: (identifier: string, level?: number) => string;
    fetch: (identifier: string, level?: number) => Promise<void>;
};

declare function createSubscriptionContractManager(apiClient: ClientInterface): {
    create: (intentSubsctiptionContract: CreateSubscriptionContractInputRequest, extraResultQuery?: any) => Promise<any>;
    update: (id: string, intentSubsctiptionContract: UpdateSubscriptionContractInputRequest, extraResultQuery?: any) => Promise<any>;
    fetchById: (id: string, onCustomer?: any, extraQuery?: any) => Promise<SubscriptionContract>;
    fetchByCustomerIdentifier: (customerIdentifier: string, extraQueryArgs?: any, onCustomer?: any, extraQuery?: any) => Promise<{
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: string;
            endCursor: string;
            totalNodes: number;
        };
        contracts: SubscriptionContract[];
    }>;
    getCurrentPhase: (id: string) => Promise<"initial" | "recurring">;
    getUsageForPeriod: (id: string, from: Date, to: Date) => Promise<{
        meteredVariableId: string;
        quantity: number;
    }[]>;
    createSubscriptionContractTemplateBasedOnVariantIdentity: (path: string, productVariantIdentifier: {
        sku?: string;
        id?: string;
    }, planIdentifier: string, periodId: string, priceVariantIdentifier: string, language?: string) => Promise<Omit<{
        status: {
            price: number;
            currency: string;
            activeUntil: Date;
            renewAt: Date;
        };
        customerIdentifier: string;
        tenantId: string;
        item: {
            name: string;
            sku: string;
            meta?: {
                value: string;
                key: string;
            }[] | undefined;
            imageUrl?: string | undefined;
            quantity?: number | undefined;
        };
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        addresses?: {
            type: EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
        payment?: {
            provider: EnumType;
            custom?: {
                properties?: {
                    property: string;
                    value?: string | undefined;
                }[] | undefined;
            } | undefined;
            klarna?: {
                status?: string | undefined;
                klarna?: string | undefined;
                orderId?: string | undefined;
                recurringToken?: string | undefined;
                merchantReference1?: string | undefined;
                merchantReference2?: string | undefined;
                metadata?: string | undefined;
            } | undefined;
            stripe?: {
                stripe?: string | undefined;
                orderId?: string | undefined;
                metadata?: string | undefined;
                subscriptionId?: string | undefined;
                customerId?: string | undefined;
                paymentMethod?: string | undefined;
                paymentMethodId?: string | undefined;
                paymentIntentId?: string | undefined;
            } | undefined;
            paypal?: {
                paypal?: string | undefined;
                orderId?: string | undefined;
                metadata?: string | undefined;
                subscriptionId?: string | undefined;
                invoiceId?: string | undefined;
            } | undefined;
            cash?: {
                cash?: string | undefined;
            } | undefined;
        } | undefined;
        subscriptionPlan?: {
            identifier: string;
            periodId: string;
        } | undefined;
        initial?: {
            price: number;
            meteredVariables: {
                id: string;
                tierType: EnumType;
                tiers: {
                    price: number;
                    currency: string;
                    threshold: number;
                }[];
            }[];
            currency: string;
            productVariants?: {
                sku: string;
                quantity: number;
            }[] | undefined;
        } | undefined;
        recurring?: {
            price: number;
            meteredVariables: {
                id: string;
                tierType: EnumType;
                tiers: {
                    price: number;
                    currency: string;
                    threshold: number;
                }[];
            }[];
            currency: string;
            productVariants?: {
                sku: string;
                quantity: number;
            }[] | undefined;
        } | undefined;
    }, "status" | "addresses" | "payment" | "customerIdentifier" | "tenantId">>;
    createSubscriptionContractTemplateBasedOnVariant: (variant: ProductVariant, planIdentifier: string, periodId: string, priceVariantIdentifier: string) => Promise<Omit<{
        status: {
            price: number;
            currency: string;
            activeUntil: Date;
            renewAt: Date;
        };
        customerIdentifier: string;
        tenantId: string;
        item: {
            name: string;
            sku: string;
            meta?: {
                value: string;
                key: string;
            }[] | undefined;
            imageUrl?: string | undefined;
            quantity?: number | undefined;
        };
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        addresses?: {
            type: EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
        payment?: {
            provider: EnumType;
            custom?: {
                properties?: {
                    property: string;
                    value?: string | undefined;
                }[] | undefined;
            } | undefined;
            klarna?: {
                status?: string | undefined;
                klarna?: string | undefined;
                orderId?: string | undefined;
                recurringToken?: string | undefined;
                merchantReference1?: string | undefined;
                merchantReference2?: string | undefined;
                metadata?: string | undefined;
            } | undefined;
            stripe?: {
                stripe?: string | undefined;
                orderId?: string | undefined;
                metadata?: string | undefined;
                subscriptionId?: string | undefined;
                customerId?: string | undefined;
                paymentMethod?: string | undefined;
                paymentMethodId?: string | undefined;
                paymentIntentId?: string | undefined;
            } | undefined;
            paypal?: {
                paypal?: string | undefined;
                orderId?: string | undefined;
                metadata?: string | undefined;
                subscriptionId?: string | undefined;
                invoiceId?: string | undefined;
            } | undefined;
            cash?: {
                cash?: string | undefined;
            } | undefined;
        } | undefined;
        subscriptionPlan?: {
            identifier: string;
            periodId: string;
        } | undefined;
        initial?: {
            price: number;
            meteredVariables: {
                id: string;
                tierType: EnumType;
                tiers: {
                    price: number;
                    currency: string;
                    threshold: number;
                }[];
            }[];
            currency: string;
            productVariants?: {
                sku: string;
                quantity: number;
            }[] | undefined;
        } | undefined;
        recurring?: {
            price: number;
            meteredVariables: {
                id: string;
                tierType: EnumType;
                tiers: {
                    price: number;
                    currency: string;
                    threshold: number;
                }[];
            }[];
            currency: string;
            productVariants?: {
                sku: string;
                quantity: number;
            }[] | undefined;
        } | undefined;
    }, "status" | "addresses" | "payment" | "customerIdentifier" | "tenantId">>;
};

declare function createCustomerManager(apiClient: ClientInterface): {
    create: (intentCustomer: CreateCustomerInputRequest, extraResultQuery?: any) => Promise<any>;
    update: (identifier: string, intentCustomer: UpdateCustomerInputRequest, extraResultQuery?: any) => Promise<any>;
};

type Tier = {
    threshold: number;
    price: number;
    currency: string;
};
type Prices = Record<string, number>;

declare function pricesForUsageOnTier(usage: number, tiers: Tier[], tierType: 'volume' | 'graduated'): Prices;

type CrystallizeSignature = {
    aud: 'webhook' | 'app' | 'frontend';
    sub: 'signature';
    iss: 'crystallize';
    exp: number;
    iat: number;
    userId?: string;
    tenantId: string;
    tenantIdentifier: string;
    hmac: string;
};

type SimplifiedRequest = {
    url?: string;
    method?: string;
    body?: any;
    webhookUrl?: string;
};
type CreateAsyncSignatureVerifierParams = {
    sha256: (data: string) => Promise<string>;
    jwtVerify: (token: string, secret: string, options?: any) => Promise<CrystallizeSignature>;
    secret: string;
};
declare const createAsyncSignatureVerifier: ({ sha256, jwtVerify, secret }: CreateAsyncSignatureVerifierParams) => (signature: string, request: SimplifiedRequest) => Promise<CrystallizeSignature>;
/**
 * @deprecated you should use the `CreateAsyncSignatureVerifierParams` type instead
 */
type CreateSignatureVerifierParams = {
    sha256: (data: string) => string;
    jwtVerify: (token: string, secret: string, options?: any) => CrystallizeSignature;
    secret: string;
};
/**
 * @deprecated you should use the `createAsyncSignatureVerifier` function instead
 */
declare const createSignatureVerifier: ({ sha256, jwtVerify, secret }: CreateSignatureVerifierParams) => (signature: string, request: SimplifiedRequest) => CrystallizeSignature;

interface RichTextContent {
    html?: string[];
    json?: any;
    plainText?: string[];
}

type ImageInputWithReferenceId = {
    id: string;
    filename: string;
    mimeType: string;
};
type UploadHandler = ImageInputWithReferenceId & {
    buffer: Buffer;
    stats: fs.Stats;
    apiClient: ClientInterface;
};
declare function uploadToTenant({ id, mimeType, filename, buffer, stats, apiClient, }: UploadHandler): Promise<string | false>;
declare function handleImageUpload(imagePath: string, apiClient: ClientInterface, tenantId?: string): Promise<string | boolean>;

type Deps = {
    apiClient: ClientInterface;
};
declare const placeCart: (cartId: string, { apiClient }: Deps, extraQuery?: any) => Promise<any>;
declare const addSkuItem: (cartId: string, sku: string, quantity: number, { apiClient }: Deps, extraQuery?: any) => Promise<any>;
declare const removeCartItem: (cartId: string, sku: string, quantity: number, { apiClient }: Deps, extraQuery?: any) => Promise<any>;
declare const setCartMeta: (cartId: string, meta: Array<{
    key: string;
    value: string;
}>, merge: Boolean, { apiClient }: Deps, extraQuery?: any) => Promise<any>;
declare const setCartCustomer: (cartId: string, customer: Customer, isGuest: boolean, { apiClient }: Deps, extraQuery?: any) => Promise<any>;

declare const CrystallizeClient: ClientInterface;
declare const CrystallizeNavigationFoldersFetcher: TreeFetcher;
declare const CrystallizeNavigationTopicsFetcher: TreeFetcher;
declare const CrystallizeHydraterByPaths: ProductHydrater;
declare const CrystallizeHydraterBySkus: ProductHydrater;
declare const CrystallizeOrderPusher: (intentOrder: CreateOrderInputRequest) => Promise<OrderCreatedConfirmation>;
declare const CrystallizeCreateOrderPaymentUpdater: (orderId: string, intentOrder: UpdateOrderInputRequest) => Promise<OrderUpdatedConfirmation>;
declare const CrystallizeCreateOrderPipelineStageSetter: (id: string, pipelineId: string, stageId: string) => Promise<void>;
declare const CrystallizeCatalogueFetcher: <T>(query: any, variables?: VariablesType) => Promise<T>;
declare const CrystallizeSearcher: {
    search: (language: string, nodeQuery: any, filter?: CatalogueSearchFilter, orderBy?: CatalogueSearchOrderBy, pageInfo?: any, limit?: {
        perPage?: number;
        total?: number;
    }, cursors?: {
        before?: string;
        after?: string;
    }) => AsyncIterableIterator<any>;
};
declare const CrystallizeOrderFetcherById: (orderId: string, onCustomer?: any, onOrderItem?: any, extraQuery?: any) => Promise<Order>;
declare const CrystallizeOrderFetcherByCustomerIdentifier: (customerIdentifier: string, extraQueryArgs?: any, onCustomer?: any, onOrderItem?: any, extraQuery?: any) => Promise<{
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
        totalNodes: number;
    };
    orders: Order[];
}>;
declare const CrystallizeSubscriptionContractManager: {
    create: (intentSubsctiptionContract: CreateSubscriptionContractInputRequest, extraResultQuery?: any) => Promise<any>;
    update: (id: string, intentSubsctiptionContract: UpdateSubscriptionContractInputRequest, extraResultQuery?: any) => Promise<any>;
    fetchById: (id: string, onCustomer?: any, extraQuery?: any) => Promise<SubscriptionContract>;
    fetchByCustomerIdentifier: (customerIdentifier: string, extraQueryArgs?: any, onCustomer?: any, extraQuery?: any) => Promise<{
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: string;
            endCursor: string;
            totalNodes: number;
        };
        contracts: SubscriptionContract[];
    }>;
    getCurrentPhase: (id: string) => Promise<"initial" | "recurring">;
    getUsageForPeriod: (id: string, from: Date, to: Date) => Promise<{
        meteredVariableId: string;
        quantity: number;
    }[]>;
    createSubscriptionContractTemplateBasedOnVariantIdentity: (path: string, productVariantIdentifier: {
        sku?: string;
        id?: string;
    }, planIdentifier: string, periodId: string, priceVariantIdentifier: string, language?: string) => Promise<Omit<{
        status: {
            price: number;
            currency: string;
            activeUntil: Date;
            renewAt: Date;
        };
        customerIdentifier: string;
        tenantId: string;
        item: {
            name: string;
            sku: string;
            meta?: {
                value: string;
                key: string;
            }[] | undefined;
            imageUrl?: string | undefined;
            quantity?: number | undefined;
        };
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        addresses?: {
            type: json_to_graphql_query.EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
        payment?: {
            provider: json_to_graphql_query.EnumType;
            custom?: {
                properties?: {
                    property: string;
                    value?: string | undefined;
                }[] | undefined;
            } | undefined;
            klarna?: {
                status?: string | undefined;
                klarna?: string | undefined;
                orderId?: string | undefined;
                recurringToken?: string | undefined;
                merchantReference1?: string | undefined;
                merchantReference2?: string | undefined;
                metadata?: string | undefined;
            } | undefined;
            stripe?: {
                stripe?: string | undefined;
                orderId?: string | undefined;
                metadata?: string | undefined;
                subscriptionId?: string | undefined;
                customerId?: string | undefined;
                paymentMethod?: string | undefined;
                paymentMethodId?: string | undefined;
                paymentIntentId?: string | undefined;
            } | undefined;
            paypal?: {
                paypal?: string | undefined;
                orderId?: string | undefined;
                metadata?: string | undefined;
                subscriptionId?: string | undefined;
                invoiceId?: string | undefined;
            } | undefined;
            cash?: {
                cash?: string | undefined;
            } | undefined;
        } | undefined;
        subscriptionPlan?: {
            identifier: string;
            periodId: string;
        } | undefined;
        initial?: {
            price: number;
            meteredVariables: {
                id: string;
                tierType: json_to_graphql_query.EnumType;
                tiers: {
                    price: number;
                    currency: string;
                    threshold: number;
                }[];
            }[];
            currency: string;
            productVariants?: {
                sku: string;
                quantity: number;
            }[] | undefined;
        } | undefined;
        recurring?: {
            price: number;
            meteredVariables: {
                id: string;
                tierType: json_to_graphql_query.EnumType;
                tiers: {
                    price: number;
                    currency: string;
                    threshold: number;
                }[];
            }[];
            currency: string;
            productVariants?: {
                sku: string;
                quantity: number;
            }[] | undefined;
        } | undefined;
    }, "status" | "addresses" | "payment" | "customerIdentifier" | "tenantId">>;
    createSubscriptionContractTemplateBasedOnVariant: (variant: ProductVariant, planIdentifier: string, periodId: string, priceVariantIdentifier: string) => Promise<Omit<{
        status: {
            price: number;
            currency: string;
            activeUntil: Date;
            renewAt: Date;
        };
        customerIdentifier: string;
        tenantId: string;
        item: {
            name: string;
            sku: string;
            meta?: {
                value: string;
                key: string;
            }[] | undefined;
            imageUrl?: string | undefined;
            quantity?: number | undefined;
        };
        meta?: {
            value: string;
            key: string;
        }[] | undefined;
        addresses?: {
            type: json_to_graphql_query.EnumType;
            firstName?: string | undefined;
            middleName?: string | undefined;
            lastName?: string | undefined;
            street?: string | undefined;
            street2?: string | undefined;
            streetNumber?: string | undefined;
            postalCode?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
            phone?: string | undefined;
            email?: string | undefined;
            meta?: {
                key: string;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
        payment?: {
            provider: json_to_graphql_query.EnumType;
            custom?: {
                properties?: {
                    property: string;
                    value?: string | undefined;
                }[] | undefined;
            } | undefined;
            klarna?: {
                status?: string | undefined;
                klarna?: string | undefined;
                orderId?: string | undefined;
                recurringToken?: string | undefined;
                merchantReference1?: string | undefined;
                merchantReference2?: string | undefined;
                metadata?: string | undefined;
            } | undefined;
            stripe?: {
                stripe?: string | undefined;
                orderId?: string | undefined;
                metadata?: string | undefined;
                subscriptionId?: string | undefined;
                customerId?: string | undefined;
                paymentMethod?: string | undefined;
                paymentMethodId?: string | undefined;
                paymentIntentId?: string | undefined;
            } | undefined;
            paypal?: {
                paypal?: string | undefined;
                orderId?: string | undefined;
                metadata?: string | undefined;
                subscriptionId?: string | undefined;
                invoiceId?: string | undefined;
            } | undefined;
            cash?: {
                cash?: string | undefined;
            } | undefined;
        } | undefined;
        subscriptionPlan?: {
            identifier: string;
            periodId: string;
        } | undefined;
        initial?: {
            price: number;
            meteredVariables: {
                id: string;
                tierType: json_to_graphql_query.EnumType;
                tiers: {
                    price: number;
                    currency: string;
                    threshold: number;
                }[];
            }[];
            currency: string;
            productVariants?: {
                sku: string;
                quantity: number;
            }[] | undefined;
        } | undefined;
        recurring?: {
            price: number;
            meteredVariables: {
                id: string;
                tierType: json_to_graphql_query.EnumType;
                tiers: {
                    price: number;
                    currency: string;
                    threshold: number;
                }[];
            }[];
            currency: string;
            productVariants?: {
                sku: string;
                quantity: number;
            }[] | undefined;
        } | undefined;
    }, "status" | "addresses" | "payment" | "customerIdentifier" | "tenantId">>;
};
declare const CrystallizeCustomerManager: {
    create: (intentCustomer: CreateCustomerInputRequest, extraResultQuery?: any) => Promise<any>;
    update: (identifier: string, intentCustomer: UpdateCustomerInputRequest, extraResultQuery?: any) => Promise<any>;
};

export { type Address, type AddressInputRequest, type ApiCaller, type CashPayment, type CashPaymentInputRequest, type CatalogueSearchFilter, type CatalogueSearchOrderBy, type ClientConfiguration, type ClientInterface, type CreateAsyncSignatureVerifierParams, type CreateClientOptions, type CreateCustomerInputRequest, type CreateOrderInputRequest, type CreateSignatureVerifierParams, type CreateSubscriptionContractInputRequest, CrystallizeCatalogueFetcher, CrystallizeClient, CrystallizeCreateOrderPaymentUpdater, CrystallizeCreateOrderPipelineStageSetter, CrystallizeCustomerManager, CrystallizeHydraterByPaths, CrystallizeHydraterBySkus, CrystallizeNavigationFoldersFetcher, CrystallizeNavigationTopicsFetcher, CrystallizeOrderFetcherByCustomerIdentifier, CrystallizeOrderFetcherById, CrystallizeOrderPusher, type CrystallizePromise, CrystallizeSearcher, type CrystallizeSignature, CrystallizeSubscriptionContractManager, type CustomPayment, type CustomPaymentInputRequest, type Customer, type Discount, type Image, type ImageVariant, type Item, type KeyValuePair, type KlarnaPayment, type KlarnaPaymentInputRequest, type MassCallClientBatch, type MassClientInterface, type MetaProperty, NavigationType, type Order, type OrderCreatedConfirmation, type OrderCustomer, type OrderCustomerInputRequest, type OrderItem, type OrderItemInputRequest, type OrderItemMeteredVariableInputRequest, type OrderItemSubscription, type OrderItemSubscriptionInputRequest, type OrderItemSubscriptionMeteredVariable, type OrderItemSubscriptionUnit, type OrderMetadata, type OrderMetadataInputRequest, type OrderUpdatedConfirmation, type Payment, type PaymentInputRequest, type PaymentProvider, type PaypalPayment, type PaypalPaymentInputRequest, type Price, type PriceInputRequest, type Prices, type Product, type ProductHydrater, type ProductHydraterOptions, type ProductPriceVariant, type ProductStockLocation, type ProductVariant, type ProductVariantAttribute, type ProductVariantPriceList, type ProductVariantSubscriptionMeteredVariable, type ProductVariantSubscriptionPlan, type ProductVariantSubscriptionPlanPeriod, type ProductVariantSubscriptionPlanPricing, type ProductVariantSubscriptionPlanTier, type QueuedApiCaller, type RichTextContent, type SimplifiedRequest, type Sleeper, type StripePayment, type StripePaymentInputRequest, type SubscriptionContract, type SubscriptionContractInnerDefinition, type SubscriptionContractMetadataInputRequest, type SubscriptionContractMeteredVariableReferenceInputRequest, type SubscriptionContractMeteredVariableTierInputRequest, type SubscriptionContractPhaseInput, type SubscriptionPeriodUnit, type Tax, type Tier, type TierType, type Topic, type TreeFetcher, type UpdateCustomerInputRequest, type UpdateOrderInputRequest, type UpdateSubscriptionContractInputRequest, type VariablesType, type VatInfo, addSkuItem, addressInputRequest, buildNestedNavigationQuery, cashPaymentInputRequest, catalogueFetcherGraphqlBuilder, catalogueSearchFilter, catalogueSearchOrderBy, createAsyncSignatureVerifier, createCatalogueFetcher, createClient, createCustomerInputRequest, createCustomerManager, createMassCallClient, createNavigationFetcher, createOrderFetcher, createOrderInputRequest, createOrderPaymentUpdater, createOrderPipelineStageSetter, createOrderPusher, createProductHydrater, createSearcher, createShapeBrowser, createSignatureVerifier, createSubscriptionContractInputRequest, createSubscriptionContractManager, customPaymentInputRequest, handleImageUpload, klarnaPaymentInputRequest, orderCustomerInputRequest, orderItemInputRequest, orderItemMeteredVariableInputRequest, orderItemSubscriptionInputRequest, orderMetadataInputRequest, paymentInputRequest, paymentProvider, paypalPaymentInputRequest, placeCart, priceInputRequest, pricesForUsageOnTier, removeCartItem, setCartCustomer, setCartMeta, stripePaymentInputRequest, subscriptionContractMetadataInputRequest, subscriptionContractMeteredVariableReferenceInputRequest, subscriptionContractMeteredVariableTierInputRequest, subscriptionContractPhaseInputRequest, updateCustomerInputRequest, updateOrderInputRequest, updateSubscriptionContractInputRequest, uploadToTenant };
