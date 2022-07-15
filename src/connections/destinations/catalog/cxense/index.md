---
title: Cxense Destination
hidden: true
---

## Getting Started

{% include content/connection-modes.md %}

Currently this destination supports events originating from Web sources (not Server or Mobile). You can read more about how define a source [here](/docs/connections/sources/#what-is-a-source).

To get started with Cxense and Segment, you'll need the following:

1. An existing account with [Cxense](http://www.cxense.com/).
2. A data source integrated with Segment's JavaScript SDK ([Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/)).
3. Your Cxense Site Id.

Assuming these criteria are met, you can add Cxense as a destination for your desired source in your Segment account.

- - -

## Page

Tracking pageviews is a key component of Cxense's offering. We integrate with this capability using our `.page()` method. When you trigger a `.page()` event the integration will invoke Cxense's corresponding `sendPageView` functionality. We will also pass along any [custom properties](/docs/connections/sources/catalog/libraries/website/javascript/#page) you define. Here is an example:

```js
analytics.page('My Page Name', { author: 'Chris Nixon' });
```

The above `.page()` event would result in the following Cxense functionality:

```js
window.cX.callQueue.push(['setCustomParameters', { author: 'Chris Nixon' }]);
window.cX.callQueue.push(['sendPageViewEvent']);
```

### Geography API

By default, Cxense captures location information about a user using their IP address. Their API, however, also offers the ability to explicitly define a location. If you would like to use this functionality, adhere to our [spec](/docs/connections/spec/common/#context) and pass `location.latitude` and `location.longitude` as properties of the `context` argument of your `.page()` events.

## Identify

By default, Cxense provides basic anonymous user identity management but it also allows events to be associated with a custom user identifier. Our `identify()` method is used to integrate with this through the use of Cxense's `addExternalId` method. Two things to note:

1. In order to use this functionality, you must have a customer prefix registered with Cxense and defined as a destination setting.
2. The User Id you are using with Segment `.identify()` events must be less than 40 characters. This is a limit enfored by Cxense's API.
3. The User Id will be sent to Cxense with the subsequent `.page()` event the user triggers.

Here is an example:

```js
analytics.identify('userId')
```

The above `.identify()` event would map to the following Cxense functionality:

```js
window.cX.callQueue.push(['addExternalId', {
  id: 'userId'
  type: <CUSTOMER-PREFIX>
}]);
```
**Note:** This will not happen until the next time a `.page()` event is triggered.

## Track

Customers using the Cxense DMP product are able to define and capture custom user events. We integrate with this functionality using our `.track()` method.

In order to use this functionality, you will need to have:

1. A Cxense Persisted Query Id (for all the events you would like to track).
2. A Cxense Origin identifier.
3. A Cxense Customer Prefix.

These all need to be defined as integration settings. If you are unsure about any of these, contact your Cxense representative to obtain them.

Once these settings are defined, we will begin mapping your `.track()` events to Cxense's API. Here's an example:

```js
analytics.track('Shared Article', {
    title: 'How to View a Solar Eclipse Without Damaging Your Eyes'
});
```

The above `.track()` event would result in the following Cxense functionality:

```js
window.cX.callQueue.push(['setEventAttributes', {
  origin: <CXENSE-CUSTOMER-PREFIX> + '-' + <CXENSE-ORIGIN-IDENTIFIER>,
  persistedQueryId: <CXENSE-PERSISTED-QUERY-ID>
}]);

window.cX.callQueue.push(['sendEvent', 'Shared Article', {
    title: 'How to View a Solar Eclipse Without Damaging Your Eyes'
}])
```
