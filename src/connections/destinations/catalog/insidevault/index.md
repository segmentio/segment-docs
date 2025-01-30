---
title: QuanticMind Destination
---

## Server Side

Because QuanticMind cannot implicitly alias multiple identifiers for a given user, in order to accommodate both logged out and logged in users across client and server it is *required* to pass the `anonymousId` from the client to the server and include it in your server-side calls.

Here's how to grab the `anonymousId`:

```js
analytics.ready(function(){
    var anonId = analytics.user().anonymousId();
});
```

And here's an example of how to grab the pass it through in a call with Java:

```java
analytics.enqueue(TrackMessage.builder("Purchased Item")
    .userId("<db id here>")
    .anonymousId("<ajs anon id here>")
    .properties(ImmutableMap.builder()
        .put("revenue", 39.95)
        .put("shipping", "2-day")
        .build()
    )
);
```
