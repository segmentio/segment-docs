Functions use Node.js 10.x.

Functions do not currently support importing dependencies, but you can [contact Segment Support](https://segment.com/help/contact/) to request that one be added.

The following dependencies are installed in the function environment by default.

- [`atob v2.1.2`](https://www.npmjs.com/package/atob) exposed as `atob`
- [`aws-sdk v2.488.0`](https://www.npmjs.com/package/aws-sdk) exposed as `AWS`
- [`btoa v1.2.1`](https://www.npmjs.com/package/btoa) exposed as `btoa`
- [`form-data v2.4.0`](https://www.npmjs.com/package/form-data) exposed as `FormData`
- [`lodash v4.17.15`](https://www.npmjs.com/package/lodash) exposed as `_`
- [`node-fetch v2.6.0`](https://www.npmjs.com/package/node-fetch) exposed as `fetch`
- [`oauth v0.9.15`](https://www.npmjs.com/package/oauth) exposed as `OAuth`
- [`xml v1.0.1`](https://www.npmjs.com/package/lodash) exposed as `xml`

Only the [`crypto` Node.js module](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html ) is included (exposed as `crypto`). [Other built-in Node.js modules](https://nodejs.org/api/modules.html) are not available.
