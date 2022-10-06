---
title: Castle Destination
id: 56a8f566e954a874ca44d3b0
---
[Castle](https://castle.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} monitors every step of the customer journey to help visualize and proactively block fraud that would otherwise fly under the radar. Types of fraud or abuse that can be managed include bots, fake accounts, multi-accounting, and account sharing.

Castle maintains this destination. For any issues with the destination, contact the [Castle support team](mailto:support@castle.io).

## Getting Started

1. Navigate to **Connections > Catalog** in the Segment web app.
2. Search for *Castle* in the **Destinations** tab of the catalog, and select it, and click **Configure Castle**. 
3. Choose the sources you want to connect the destination to.
3. Enter the "Publishable Key" the Publishable Key field. Find the Publishable Key on the Castle dashboard.
Calls are now visible in Castle dashboards in real-time.

> info ""
> Castle ingests Segment Client-side events. Server-side events are dropped and not processed.
> Castle only supports web integrations through Segment, but is in the process of working on mobile support.





## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page call](/docs/connections/spec/page/) does. An example call looks like:

```
analytics.page()
```



Segment sends Page calls to Castle as `$page` events.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call looks like:

```
analytics.track('Added to Cart')
```



Segment sends Track calls to Castle as a `$custom` events.

***



## Secure Mode

Send user information as a signed JWT when you use Castle in production. This prevents bad actors from spoofing any user information.

In your backend code, encode the user as a JWT and sign it using your Castle "API Secret". When Castle receives the JWT, the integrity of the user data is verified to ensure that the data wasn't tampered with.

Below is an example of how to generate a JWT on your backend using the Ruby language:

```ruby
jwt_from_backend = JWT.encode({
  id: '97980cfea0067',
  email: 'peter@example.com'
}, ENV.fetch('CASTLE_API_SECRET'), 'HS256')
```



Transfer the `user_jwt` object to your frontend through a separate API call, or by injecting the code using a templating language:

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


When Castle receives a JWT version of the user object, its contents override the user object sent the standard Segment way.
