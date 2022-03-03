---
title: Woopra Destination
id: 54521fdc25e721e32a72ef05
---
Our Woopra destination code is all open-source on GitHub if you want to check it out: [Javascript](https://github.com/segment-integrations/analytics.js-integration-woopra), [Server](https://github.com/segmentio/integration-woopra).

## Getting Started

When you enable Woopra in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Woopra's javascript onto your page. This means you should remove Woopra's snippet from your page.
+ Woopra starts automatically collecting data on your site.

Woopra is supported on client-side and server-side.

- - -

## Page

When you call `.page()` in the browser, we will pass all the properties of the page such as `url`, `referrer`, `path`, and etc. If you pass a `name` in your `.page()` call, we will send that as `title` to Woopra.

*Note*: `.page()` calls are not supported when sending those events server side or using mobile libraries.


## Identify


### Client Side

When you call `identify` on analytics.js, we call Woopra's `woopraTracker.addVisitorProperty` for each trait that you pass in. These traits are stored in the Woopra cookie, and will be sent on the next page load.


### Server Side

When you call `identify` from the server-side languages, we call Woopra's [HTTP REST API](https://docs.woopra.com/reference/intro-http-tracking) with the traits that you pass in.


## Group

Woopra does not accept data sent using the Segment `group` method.


## Track


### Client Side

When you call `track` on analytics.js, we call Woopra's `woopraTracker.pushEvent` with the a single `settings` object where the `event` parameter you pass is set as `settings.name` for the Woopra event.


### Server Side

When you call `track` from the server-side languages, we call Woopra's HTTP REST API with the event properties that you pass in.

The default Woopra `online` [timeout](https://docs.woopra.com/reference/intro-http-tracking) is set to 60 seconds, but is adjustable with `context.Woopra.timeout`.

## Features

### Tying server side events to client side sessions

If you want your server side events to be seen as part of the same "source" or session as your client side events, all you have to do is pass us the `wooTracker` value inside your cookie. Luckily, you can easily retrieve this value by:

```js
analytics.ready(function(){
  var woopraCookie = window.woopra.cookie;

  // pass this value to your server
});
```

Now from the server side, you can attach it to the `integrations.Woopra.cookie` property:

(Ruby example)

```ruby
Analytics.track(
    user_id: '019mr8mf4r',
    event: 'Purchased Item',
    properties: { revenue: 39.95, shipping: '2-day' },
    integrations: {
      Woopra: {
       cookie: <wooTracker value>
      }
    })
```

This should let Woopra know that this server side event is part of the same session as the client. *Important*: Make sure `Woopra` is capitalized!

## Troubleshooting

### Split user profiles

If you are seeing split user profiles, the most likely culprit is that you are calling `.identify()` only on the backend using one of our server side libraries but **NOT** on the client side with `analytics.js`.

Calling `.identify()` in the browser will effectively map the `userId` you passed in with the `wooTracker` cookie value. So in the event that you call `.identify()` on the server side first, you **MUST** call `.identify()` on the client side as well to tie the `wooTracker` cookie to that `userId`.

Doing so will ensure that duplicate profiles are not created.
