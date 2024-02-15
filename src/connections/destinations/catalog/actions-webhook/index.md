---
title: Webhooks (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 614a3c7d791c91c41bae7599
versions:
  - name: 'Webhooks (Classic)'
    link: '/docs/connections/destinations/catalog/webhooks'
---

{% include content/plan-grid.md name="actions" %}

Segment's Webhooks (Actions) destination uses internet protocol and HTTP callback to submit real-time user data to your own HTTP endpoints. With this destination, you can POST, PUT, or PATCH data to any webhook URL.

## Getting Started

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for **Webhooks (Actions)** in the Destinations Catalog, and select the destination.
3. Click **Configure Webhooks (Actions)**.
4. Select the source that will send data to Webhooks (Actions) and follow the steps to name your destination.
5. If you require authentication, add in a shared secret on the **Settings** > **Advanced Settings** tab. If you provide a shared secret, Segment will sign requests with an HMAC in the "X-Signature" request header. The HMAC is a hex-encoded SHA1 hash generated using the shared secret and the request body.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings). You can create up to 5 mappings, each of which can send to a different webhook URL.
7. Enable the destination and configured mappings.

{% include components/actions-fields.html settings="true"%}

## Batch size limits

In Webhook Actions mapping, the default value of batch size is `1000`. You can change this value, but there's a maximum batch size limit of `4000`. 

### Authentication

If you want to authenticate the requests being sent to your webhook endpoint, you can input a `sharedSecret` in the advanced option settings. If you provide this, Segment signs your requests using the shared secret and the body of the request, and add that as the ​`X-Signature`​ header. Segment calculates a SHA1 digest using the shared secret and the JSON-stringified body of the request.

An example of how one might authenticate the requests would be:

```javascript
 var signature = req.headers['x-signature'];
 var digest = crypto
     .createHmac('sha1', settings.sharedSecret)
     .update(new Buffer(JSON.stringify(req.body),'utf-8'))
     .digest('hex');

if (signature === digest) {

 // do cool stuff

}
```
