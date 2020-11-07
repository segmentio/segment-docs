Functions use Node.js 10.x.

Functions do not currently support importing dependencies, but you can [contact Segment Support](https://segment.com/help/contact/) to request that one be added.

The following dependencies are installed in the function environment by default.

- [`atob v2.1.2`](https://www.npmjs.com/package/atob) exposed as `atob`
- [`aws-sdk v2.488.0`](https://www.npmjs.com/package/aws-sdk) exposed as `AWS`
- [`btoa v1.2.1`](https://www.npmjs.com/package/btoa) exposed as `btoa`
- [`form-data v2.4.0`](https://www.npmjs.com/package/form-data) exposed as `FormData`
- [`@google-cloud/automl v2.2.0`](https://www.npmjs.com/package/@google-cloud/automl) exposed as `automl`
- [`@google-cloud/bigquery v5.3.0`](https://www.npmjs.com/package/@google-cloud/bigquery) exposed as `bigquery`
- [`@google-cloud/datastore v6.2.0`](https://www.npmjs.com/package/@google-cloud/datastore) exposed as `datastore`
- [`@google-cloud/firestore v4.4.0`](https://www.npmjs.com/package/@google-cloud/firestore) exposed as `firestore`
- [`@google-cloud/functions v1.1.0`](https://www.npmjs.com/package/@google-cloud/functions) exposed as `functions`
- [`@google-cloud/pubsub v2.6.0`](https://www.npmjs.com/package/@google-cloud/pubsub) exposed as `pubsub`
- [`@google-cloud/storage v5.3.0`](https://www.npmjs.com/package/@google-cloud/storage) exposed as `storage`
- [`jsonwebtoken v8.5.1`](https://www.npmjs.com/package/jsonwebtoken) exposed as `jsonwebtoken`
- [`kafka-node v5.0.0`](https://www.npmjs.com/package/kafka-node) exposed as `kafka-node`
- [`lodash v4.17.15`](https://www.npmjs.com/package/lodash) exposed as `_`
- [`node-fetch v2.6.0`](https://www.npmjs.com/package/node-fetch) exposed as `fetch`
- [`oauth v0.9.15`](https://www.npmjs.com/package/oauth) exposed as `OAuth`
- [`stripe v8.115.0`](https://www.npmjs.com/package/stripe) exposed as `stripe`
- [`xml v1.0.1`](https://www.npmjs.com/package/lodash) exposed as `xml`
- [`xml2js v0.4.23`](https://www.npmjs.com/package/xml2js) exposed as `xml2js`

Only the [`crypto` Node.js module](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html ) is included (exposed as `crypto`). [Other built-in Node.js modules](https://nodejs.org/api/modules.html) are not available.
