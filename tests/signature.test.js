const { createSignatureVerifier } = require('../dist/index.js');
var crypto = require('crypto');

describe('Test Signature HMAC', () => {
    test('Test With a Body', () => {
        const guard = createSignatureVerifier({
            secret: 'xXx',
            sha256: (data) => crypto.createHash('sha256').update(data).digest('hex'),
            jwtVerify: (token, secret) => ({
                hmac: '1101b34dac8c55e5590a37271f1c41c3d745463854613494a1624a15be24f1f8',
            }),
        });

        expect(
            guard('xXx.xXx.xXx', {
                url: 'https://a17e-2601-645-4500-330-b07d-351d-ece7-41c1.ngrok.io/test/signature',
                method: 'POST',
                body: '{"item":{"get":{"id":"63f2d3b2a94533f79fc6397b","createdAt":"2023-02-20T01:58:10.000Z","updatedAt":"2023-02-23T07:58:34.685Z","name":"test"}}}',
            }),
        );
    });

    test('Test Without a Body App', () => {
        const guard = createSignatureVerifier({
            secret: 'xXx',
            sha256: (data) => crypto.createHash('sha256').update(data).digest('hex'),
            jwtVerify: (token, secret) => ({
                hmac: '157bee342a4856e14e964356fef54fd84b3a3508c1071ed674172d3f9b68892f',
            }),
        });

        expect(
            guard('xXx.xXx.xXx', {
                url: 'https://helloworld.crystallize.app.local',
                method: 'GET',
                body: null,
            }),
        );
    });

    test('Test Without a Body Webhook', () => {
        const guard = createSignatureVerifier({
            secret: 'xXx',
            sha256: (data) => crypto.createHash('sha256').update(data).digest('hex'),
            jwtVerify: (token, secret) => ({
                hmac: '61ce7a2e5072900a13369ac7f69b9e056e91c38c42f1bfe94389c80411d94b78',
            }),
        });
        expect(
            guard('xXx.xXx.xXx', {
                url: 'https://webhook.site/b56870a7-9600-41a6-86a0-98be0c7532fd?id=65d8fc4ce2ba75beec481ec1&userId=61f9933ec63b0a44d5004c2d&tenantId=61f9937c3b63c8386ea9e153&type=document&language=en',
                webhookUrl: 'https://webhook.site/b56870a7-9600-41a6-86a0-98be0c7532fd',
                method: 'GET',
            }),
        );
    });
});
