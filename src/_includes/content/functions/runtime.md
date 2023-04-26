Beginning April 30, 2023, Functions is migrating from Node.js 14.x to Node.js 16.x. You're not required to take any further action.

<div class="premonition success"><div class="fa fa-check-square"></div><div class="content"><p class="header">Node.js 18.x: </p><p markdown=1>Starting June 30, 2023, you can [contact Segment](https://segment.com/help/contact/){:target="_blank"} to migrate to Node.js 18.x.</p></div></div>

Functions do not currently support importing dependencies, but you can [contact Segment Support](https://segment.com/help/contact/){:target="_blank"} to request that one be added.

The following dependencies are installed in the function environment by default.

- [`atob v2.1.2`](https://www.npmjs.com/package/atob){:target="_blank"} exposed as `atob`
- [`aws-sdk v2.488.0`](https://www.npmjs.com/package/aws-sdk){:target="_blank"} exposed as `AWS`
- [`btoa v1.2.1`](https://www.npmjs.com/package/btoa){:target="_blank"} exposed as `btoa`
- [`form-data v2.4.0`](https://www.npmjs.com/package/form-data){:target="_blank"} exposed as `FormData`
- [`@google-cloud/automl v2.2.0`](https://www.npmjs.com/package/@google-cloud/automl){:target="_blank"} exposed as `google.cloud.automl`
- [`@google-cloud/bigquery v5.3.0`](https://www.npmjs.com/package/@google-cloud/bigquery){:target="_blank"} exposed as `google.cloud.bigquery`
- [`@google-cloud/datastore v6.2.0`](https://www.npmjs.com/package/@google-cloud/datastore){:target="_blank"} exposed as `google.cloud.datastore`
- [`@google-cloud/firestore v4.4.0`](https://www.npmjs.com/package/@google-cloud/firestore){:target="_blank"} exposed as `google.cloud.firestore`
- [`@google-cloud/functions v1.1.0`](https://www.npmjs.com/package/@google-cloud/functions){:target="_blank"} exposed as `google.cloud.functions`
- [`@google-cloud/pubsub v2.6.0`](https://www.npmjs.com/package/@google-cloud/pubsub){:target="_blank"} exposed as `google.cloud.pubsub`
- [`@google-cloud/storage v5.3.0`](https://www.npmjs.com/package/@google-cloud/storage){:target="_blank"} exposed as `google.cloud.storage`
- [`@google-cloud/tasks v2.6.0`](https://www.npmjs.com/package/@google-cloud/tasks){:target="_blank"} exposed as `google.cloud.tasks`
- [`hubspot-api-nodejs`](https://www.npmjs.com/package/@hubspot/api-client){:target="_blank"} exposed as `hubspotlib.hubspot`
- [`jsforce v1.11.0`](https://www.npmjs.com/package/jsforce){:target="_blank"} exposed as `jsforce`
- [`jsonwebtoken v8.5.1`](https://www.npmjs.com/package/jsonwebtoken){:target="_blank"} exposed as `jsonwebtoken`
- [`libphonenumber-js`](https://www.npmjs.com/package/libphonenumber-js){:target="_blank"} exposed as `libphonenumberjslib.libphonenumberjs`
- [`lodash v4.17.19`](https://www.npmjs.com/package/lodash){:target="_blank"} exposed as `_`
- [`mailjet`](https://www.npmjs.com/package/node-mailjet){:target="_blank"} exposed as `const mailJet = nodemailjet.nodemailjet;`
- [`moment-timezone v0.5.31`](https://www.npmjs.com/package/moment-timezone/v/0.5.31){:target="_blank"} exposed as `moment`
- [`node-fetch v2.6.0`](https://www.npmjs.com/package/node-fetch){:target="_blank"} exposed as `fetch`
- [`oauth v0.9.15`](https://www.npmjs.com/package/oauth){:target="_blank"} exposed as `OAuth`
- [`@sendgrid/client v7.4.7`](https://www.npmjs.com/package/@sendgrid/client){:target="_blank"} exposed as `sendgrid.client`
- [`@sendgrid/mail v7.4.7`](https://www.npmjs.com/package/@sendgrid/mail){:target="_blank"} exposed as `sendgrid.mail`
- [`skyflow`](https://www.npmjs.com/package/skyflow-node){:target="_blank"} exposed as `skyflowlib.skyflow`
- [`stripe v8.115.0`](https://www.npmjs.com/package/stripe){:target="_blank"} exposed as `stripe`
- [`twilio v3.68.0`](https://www.npmjs.com/package/twilio){:target="_blank"} exposed as `twilio`
- [`uuidv5 v1.0.0`](https://www.npmjs.com/package/uuidv5){:target="_blank"} exposed as `uuidv5.uuidv5`
- [`winston v2.4.6`](https://www.npmjs.com/package/winston){:target="_blank"} exposed as `const winston = winstonlib.winston`
- [`xml v1.0.1`](https://www.npmjs.com/package/xml){:target="_blank"} exposed as `xml`
- [`xml2js v0.4.23`](https://www.npmjs.com/package/xml2js){:target="_blank"} exposed as `xml2js`
- [`zlib v1.0.5`](https://www.npmjs.com/package/zlib){:target="_blank"} exposed as `zlib.zlib`

  <br> `uuidv5` is exposed as an object. Use `uuidv5.uuidv5` to access its functions. For example:

    ```js
    async function onRequest(request, settings) {
	     uuidv5 = uuidv5.uuidv5;
	     console.log(typeof uuidv5);

	      //Generate a UUID in the default URL namespace
	      var urlUUID = uuidv5('url', 'http://google/com/page');
	      console.log(urlUUID);

	      //Default DNS namespace
	      var dnsUUID = uuidv5('dns', 'google.com');
	      console.log(dnsUUID);
      }
    ```
  `zlib`'s asynchronous methods `inflate` and `deflate` must be used with `async` or `await`. For example:

    ```js
  zlib = zlib.zlib;  // Required to access zlib objects and associated functions
  async function onRequest(request, settings) {
    const body = request.json();

    const input = 'something';

    // Calling inflateSync method
    var deflated = zlib.deflateSync(input);

    console.log(deflated.toString('base64'));

    // Calling inflateSync method
    var inflated = zlib.inflateSync(new Buffer.from(deflated)).toString();

    console.log(inflated);

    console.log('Done');
    }
    ```

The following Node.js modules are available:
- [`crypto` Node.js module](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html ){:target="_blank"} exposed as `crypto`.
- [`https` Node.js module](https://nodejs.org/api/https.html){:target="_blank"} exposed as `https`.

[Other built-in Node.js modules](https://nodejs.org/api/modules.html){:target="_blank"} aren't available.

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
