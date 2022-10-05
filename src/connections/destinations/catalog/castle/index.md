---
title: Castle Destination
id: 56a8f566e954a874ca44d3b0
---
[Castle](https://castle.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) monitors every step of the customer journey to help visualize and proactively block fraud that would otherwise fly under the radar. Types of fraud or abuse that can be managed include bots, fake accounts, multi-accounting, and account sharing.

This destination is maintained by Castle.

## Integration steps
1. Track successful and failed logins
1. Extend server-side tracking with request properties
1. `identify`, preferably on the server-side
1. _Optional:_ Use Castle's `authenticate` API to request a risk score
1. _Recommended:_ Secure Mode

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Castle" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "Publishable Key" into your Segment Settings UI which you can find in your property in the [Castle dashboard](https://dashboard.castle.io).
4. Calls will now be visible in Castle dashboards in real-time.

**NOTE**: Castle will only ingest Segment _client-side_ events at this point. Server-side events will be dropped and not processed.

**NOTE**: Castle only supports web integrations via Segment, but we are working on mobile support so please stay tuned.

***



## Page

If you're not familiar with the Segment Specs, take a look to understand what the [`page` method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```



`page` calls will be sent to Castle as `$page` events.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Added to Cart')
```



`track` calls will be sent to Castle as a `$custom` events.

***



## Secure Mode

In order to prevent user information from being spoofed by a bad actor, it is highly recommended to send the user information as a signed JWT when Castle.js is used in production.

From your backend code, you need to encode the user as a JWT and sign it using your Castle "API Secret". Then, when Castle receives the JWT, the integrity of the user data will be verified to ensure that the data isn't being tampered with.

Below is an example of how to generate a JWT on your backend using the Ruby language:

```ruby
jwt_from_backend = JWT.encode({
  id: '97980cfea0067',
  email: 'peter@example.com'
}, ENV.fetch('CASTLE_API_SECRET'), 'HS256')
```



You then need to transfer the `user_jwt` object to your frontend either via a separate API call, or by injecting the code using a templating language:

```javascript
var userJwt = "<%= jwt_from_backend %>";

// Then use the `userJwt` argument instead of `user` when using any of the tracking methods
Castle.page({userJwt: userJwt});

analytics.identify('97980cfea0067', {
  email: 'peter@example.com',
}, {
  Castle: {
    userJwt: userJwt
  }
});
```


When Castle receives a JWT version of the user object, its contents will override the user object sent the standard Segment way.
