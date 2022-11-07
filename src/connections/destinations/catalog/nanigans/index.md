---
title: Nanigans Destination
id: 54521fd925e721e32a72eedd
---
## Getting Started

When you enable Nanigans in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading `Nanigans.js` onto your page. This means you should remove Nanigans's snippet from your page.
+ Nanigans starts automatically collecting data on your site.

## Track

In order for the `track` call to succeed, the requirements include a `userId` being set previously by an `identify` call.

For ecommerce events,(i.e. `purchase`) it is important that the `.track()` call also includes the below within `properties`:
- `orderId`
- `products` array, which contain objects that have `sku`, `quantity`, and `price`

More information about the semantic naming of our [ecommerce events](/docs/connections/spec/ecommerce/v2/).

If the folks at Nanigans ask you pass through any custom parameters, you can map the Segment event properties to arbitrary querystring parameters as well. **Note:** This is currently only supported using the server-side destination, which is used for our mobile and server-side libraries.

## Server-Side

By default, if you are sending data using a mobile library, we will send the `IDFA` (iOS) or `Advertising ID` (Android) so that you can associate server side events with the anonymous users from your mobile app.

However, if you are sending events with a server side library, you can still manually pass the `IDFA` or `Advertising ID` under `context.device.advertisingId` and we will send it along to achieve the same effect.

## Mobile

By default, if you send any data with either the iOS or Android library, we will send that data to Nanigans required `/mobile.php` endpoint.

If you'd like to send any other server side event using a server side library, you can either enable the option "Send Events to Mobile Endpoint" in your Nanigans settings. However, this means that ALL server side events sent from your server side library will be sent to the mobile endpoint.

If you are unsure which endpoint to send to, contact Nanigans support!
