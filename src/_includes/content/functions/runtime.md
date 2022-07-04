Functions use Node.js 14.x.

Functions do not currently support importing dependencies, but you can [contact Segment Support](https://segment.com/help/contact/) to request that one be added.

The following dependencies are installed in the function environment by default.

- [`atob v2.1.2`](https://www.npmjs.com/package/atob) exposed as `atob`
- [`aws-sdk v2.488.0`](https://www.npmjs.com/package/aws-sdk) exposed as `AWS`
- [`btoa v1.2.1`](https://www.npmjs.com/package/btoa) exposed as `btoa`
- [`form-data v2.4.0`](https://www.npmjs.com/package/form-data) exposed as `FormData`
- [`@google-cloud/automl v2.2.0`](https://www.npmjs.com/package/@google-cloud/automl) exposed as `google.cloud.automl`
- [`@google-cloud/bigquery v5.3.0`](https://www.npmjs.com/package/@google-cloud/bigquery) exposed as `google.cloud.bigquery`
- [`@google-cloud/datastore v6.2.0`](https://www.npmjs.com/package/@google-cloud/datastore) exposed as `google.cloud.datastore`
- [`@google-cloud/firestore v4.4.0`](https://www.npmjs.com/package/@google-cloud/firestore) exposed as `google.cloud.firestore`
- [`@google-cloud/functions v1.1.0`](https://www.npmjs.com/package/@google-cloud/functions) exposed as `google.cloud.functions`
- [`@google-cloud/pubsub v2.6.0`](https://www.npmjs.com/package/@google-cloud/pubsub) exposed as `google.cloud.pubsub`
- [`@google-cloud/storage v5.3.0`](https://www.npmjs.com/package/@google-cloud/storage) exposed as `google.cloud.storage`
- [`jsforce v1.11.0`](https://www.npmjs.com/package/jsforce) exposed as `jsforce`
- [`jsonwebtoken v8.5.1`](https://www.npmjs.com/package/jsonwebtoken) exposed as `jsonwebtoken`
- [`lodash v4.17.15`](https://www.npmjs.com/package/lodash) exposed as `_`
- [`moment v2.26.0`](https://www.npmjs.com/package/moment/v/2.26.0) exposed as `moment`
- [`node-fetch v2.6.0`](https://www.npmjs.com/package/node-fetch) exposed as `fetch`
- [`oauth v0.9.15`](https://www.npmjs.com/package/oauth) exposed as `OAuth`
- [`@sendgrid/client v7.4.7`](https://www.npmjs.com/package/@sendgrid/client) exposed as `sendgrid.client`
- [`@sendgrid/mail v7.4.7`](https://www.npmjs.com/package/@sendgrid/mail) exposed as `sendgrid.mail`
- [`stripe v8.115.0`](https://www.npmjs.com/package/stripe) exposed as `stripe`
- [`twilio v3.68.0`](https://www.npmjs.com/package/twilio) exposed as `twilio`
- [`uuidv5 v1.0.0`](https://www.npmjs.com/package/uuidv5) exposed as `uuidv5`
- [`xml v1.0.1`](https://www.npmjs.com/package/xml) exposed as `xml`
- [`xml2js v0.4.23`](https://www.npmjs.com/package/xml2js) exposed as `xml2js`
- [`zlib v1.0.5`](https://www.npmjs.com/package/zlib) exposed as `zlib`

Only the [`crypto` Node.js module](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html ) is included (exposed as `crypto`). [Other built-in Node.js modules](https://nodejs.org/api/modules.html) are not available.

For more information on using the `aws-sdk` module, see how to [set up functions for calling AWS APIs](/docs/connections/functions/aws-apis/).

### Caching

Basic cache storage is available through the `cache` object, which has the following methods defined:

- `cache.load(key: string, ttl: number, fn: async () => any): Promise<any>`
  - Obtains a cached value for the provided `key`, invoking the callback if the value is missing or has expired. The `ttl` is the maximum duration in milliseconds the value can be cached. If omitted or set to `-1`, the value will have no expiry.
- `cache.delete(key: string): void`
  - Immediately remove the value associated with the `key`.

Some important notes about the cache:

- When testing functions in the code editor, the cache will be empty because each test temporarily deploys a new instance of the function.
- Values in the cache are not shared between concurrently-running function instances; they are process-local which means that high-volume functions will have many separate caches.
- Values may be expunged at any time, even before the configured TTL is reached. This can happen due to memory pressure or normal scaling activity. Minimizing the size of cached values can improve your hit/miss ratio.
- Functions that receive a low volume of traffic may be temporarily suspended, during which their caches will be emptied. In general, caches are best used for high-volume functions and with long TTLs.
The following example gets a JSON value through the cache, only invoking the callback as needed:

```js
const ttl = 5 * 60 * 1000 // 5 minutes
const val = await cache.load("mycachekey", ttl, async () => {
    const res = await fetch("http://echo.jsontest.com/key/value/one/two")
    const data = await res.json()
    return data
})
```
