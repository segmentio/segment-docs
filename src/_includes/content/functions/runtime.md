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
- [`jsonwebtoken v8.5.1`](https://www.npmjs.com/package/jsonwebtoken) exposed as `jsonwebtoken`
- [`lodash v4.17.15`](https://www.npmjs.com/package/lodash) exposed as `_`
- [`moment v2.26.0`](https://www.npmjs.com/package/moment/v/2.26.0) exposed as `moment`
- [`node-fetch v2.6.0`](https://www.npmjs.com/package/node-fetch) exposed as `fetch`
- [`oauth v0.9.15`](https://www.npmjs.com/package/oauth) exposed as `OAuth`
- [`stripe v8.115.0`](https://www.npmjs.com/package/stripe) exposed as `stripe`
- [`xml v1.0.1`](https://www.npmjs.com/package/xml) exposed as `xml`
- [`xml2js v0.4.23`](https://www.npmjs.com/package/xml2js) exposed as `xml2js`

Only the [`crypto` Node.js module](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html ) is included (exposed as `crypto`). [Other built-in Node.js modules](https://nodejs.org/api/modules.html) are not available.

##### Caching

Per-function global caching is available in the `cache` namespace. The following functions are available:

- `cache.load(key: string, ttl: number, fn: async () => any): Promise<any>`
  - Obtains a cached value for the provided `key`, invoking the callback if the value is missing or has expired. The `ttl` is the maximum duration in milliseconds the value can be cached. If omitted or set to `-1`, the value will have no expiry. There is no guarantee that a value will be retained in the cache for the provided duration, however. The cache space is limited, so efforts to minimize the cached value size will afford a higher cache hit ratio.
- `cache.delete(key: string): void`
  - Forcefully remove the value associated withe the `key`.

The following example gets a JSON value through the cache, only invoking the callback as needed:

```js
const ttl = 5 * 60 * 1000 // 5 minutes
const val = await cache.load("mycachekey", ttl, () => {
    const res = await fetch("http://echo.jsontest.com/key/value/one/two")
    const data = await res.json()
    return data
})
```
