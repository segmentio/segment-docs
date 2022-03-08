---
title: Keen Destination
id: 54521fd825e721e32a72eeca
---
## Getting Started

When you enable Keen in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading `keen.js` onto your page. This means you should remove Keen's snippet from your page.
+ Since Keen only records custom events and custom user data, no events or users will appear in Keen until you start using the API outlined below.

Keen is supported on the client side and server side.

- - -

## Identify

### Client-Side

When you call `identify` on `analytics.js`, we call Keen's `setGlobalProperties` and set the `user` field with `userId` and `traits`.

*Note:* To see this information inside Keen, you **must** make `track` call as the `userId` and `traits` are simply cached on the client. Your subsequent `track` calls will be appended with the `userId` and `traits`.

### Server-Side

On the server-side, calling `identify` has no effect on Keen.

## Track

### Client-Side

When you call `track` or one of its helpers functions on analytics.js, we call Keen's `addEvent` with exactly the same parameters.


### Server-Side

When you call `track` on on the server-side, we route the event to Keen.

If you make the following Segment call using any of the server-side sources,
```javascript
analytics.track('user@example.com', 'Purchased', {
    item: 'T-Shirt',
    revenue: 19.99
});
```

We will forward the following to Keen:

* Event Collection: `Purchased`
* Event Properties:
```javascript
{
    userId: 'user@example.com'
    item: 'T-Shirt',
    revenue: 19.99
}
```
