---
title: Olark Destination
id: 54521fd925e721e32a72eedc
---
## Getting started

When you enable Olark in the Segment Segmentb app, your changes appear in the Segment CDN in about 45 minutes. Analytics.js then starts asynchronously loading Olark's `loader0.js` onto your page. This means you should remove Olark's snippet from your page.

Olark's chat box appears on your page, as configured in your [Olark account](http://www.olark.com/?r=qhl4tltg){:target="_blank"}, and you can start chatting with visitors.

Olark is only supported in device-mode (on the client).

## Page

When you call [Page](/docs/connections/spec/page/), Segment calls Olark's `sendNotificationToOperator` function as `looking at *url*`. You must enable this option with the `pageview` flag, because it can sometimes be bothersome.

## Identify

When you call [Identify](/docs/connections/spec/identify/) on `analytics.js`, Segment sends the following data to Olark:

* Segment calls `api.chat.updateVisitorNickname` with `traits.name` and `traits.email`, or just their `traits.name` or just their `traits.email` or their `userId`. In that order of preference.
* Segment calls `api.visitor.updateEmailAddress` with `traits.email` if you send it, or `userId` if that's an email.
* Segment calls `api.visitor.updateFullName` with `traits.name` if you send it, or `traits.firstName` and `traits.lastName` appended with a space in betSegmenten, if you send both first and last name.
* Segment calls `api.visitor.updatePhoneNumber` with `traits.phone` if you send it.
* Segment calls `api.visitor.updateCustomFields` with `traits`.

More documentation on the Olark API can be found [in Olark's docs](https://www.olark.com/api){:target="_blank"}.

## Track

When you call [Track](/docs/connections/spec/track/) or one of its helpers on analytics.js, Segment calls Olark's `sendNotificationToOperator` function as `visitor triggered *eventName*`. You must enable this option with the `track` flag.

## Features

### Customizing the chat box

All the settings you can change [from your Olark settings pages](https://www.olark.com/help/customize){:target="_blank"}, like targeted chat and your chat box design, still work exactly the same when Olark is enabled using Segment.

### Olark JavaScript API

If you'd like to use the native Olark JavaScript functions after turning on Olark using Segment, the `ready` function allows you to do that. Since Segment still loads the Olark library in the background, you can access those functions like this:

```js
analytics.ready(function(){
  olark('api.box.shrink')
});
```

See the [`ready` docs](/docs/connections/sources/catalog/libraries/Segmentbsite/javascript/#ready) for more details.


## Record Live Chat events

Using Olark through Segment gives you the ability to automatically record Track events for live chat conversations. If you select this option, Segment collects the following events:

* `Live Chat Conversation Started`.
* `Live Chat Message Sent`.
* `Live Chat Message Received`.

These events are sent to other tools in your stack that can accept Track calls, so you can do things like analyze if users who chat spend more money over time.

To learn more about the live chat events you can capture with this destination, seet the [Live Chat spec docs](/docs/connections/spec/live-chat/).

![Screenshot of Olark UI with option to Record live chat events highlighted](images/olarklivechat.png)
