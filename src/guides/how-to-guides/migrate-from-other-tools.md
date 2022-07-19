---
title: Migrating Code From Other Analytics Tools
---

Switching from your current client-side JavaScript event tracking to Segment is easy. Below you can find migration guides for the following tools:

- Google Analytics
- Mixpanel

If you'd like us to add more tools or mobile/server-side examples to this guide [let us know](https://segment.com/help/contact/)!

## Google Analytics

### Custom Events

Google Analytics Custom Events are simple to record in Segment. You'll record them with our track method and use the same properties you would when sending to Google Analytics directly.

The only mapping exception is the Event Action. That will automatically be populated by the Event Name you include in the track call.

Here's an example:

```js
ga('send', {
  'hitType': 'event',
  'eventCategory': 'Account',
  'eventAction': 'Signed Up',
  'eventLabel': 'Premium',
  'eventValue': 4
});
```

Becomes:

```js
analytics.track('Signed Up', {
  category: 'Account',
  label: 'Premium',
  value: 4
});
```

Since Event Category is required we'll populate it with `All` if you don't specify one. You can read more about this in [our Google Analytics docs](/docs/connections/destinations/catalog/google-analytics/#track).

### Ecommerce

Segment has full support for the Google Analytics E-Commere API and the [Enhanced E-Commerce API](/docs/connections/destinations/catalog/google-analytics/#enabling-enhanced-e-commerce-tracking) as well. Make sure you follow [our e-commerce tracking plan](/docs/connections/spec/ecommerce-tracking-plan/) to make sure you'll be able to use all e-commerce features in the tools we support.

For an e-commerce transaction to appear in Google Analytics you'll need to enable e-commerce for your Google Analytics view and send an Order Completed event to Segment. This simplifies things a lot compared to the direct Google Analytics code.

Here's an example:

```js
ga('require', 'ecommerce');

ga('ecommerce:addTransaction', {
'id': '93745',
'revenue': '30',
'shipping': '3',
'tax': '2',
'currency': USD
});

ga('ecommerce:addItem', {
'id': '23423',
'name': 'Monopoly: 3rd Edition',
'sku': 'J90-32',
'category': 'Games',
'price': '19.00',
'quantity': '1'
});

ga('ecommerce:addItem', {
'id': '22744',
'name': 'Uno Card Game',
'sku': 'Q93-32',
'category': 'Cards',
'price': '3.00',
'quantity': '2'
});

ga('ecommerce:send');
```

Becomes:

```js
analytics.track('Order Completed', {
  order_id: '93745',
  total: 46,
  shipping: 3,
  tax: 2,
  currency: USD,
  products: [{
    id: '23423',
    name: 'Monopoly: 3rd Edition',
    sku: 'J90-32',
    category: 'Games',
    price: 19,
    quantity: 1
  }, {
    id: '22744',
    name: 'Uno Card Game',
    sku: 'Q93-32',
    category: 'Cards',
    price: 3,
    quantity: 2
  }]
})
```

At the very minimum you must include an orderId for each Order and for each product inside that order you must include an id and name. All other properties are optional.

### Custom Dimensions

Through Segment you can record user-scope custom dimensions using our identify, page, or track methods.

A full explanation can be found in [our Google Analytics docs](/docs/connections/destinations/catalog/google-analytics/#custom-dimensions) page, but here's a quick example:

```js
ga('set', 'dimension5', 'Male');
ga('send', 'pageview');
```

Becomes:

```js
analytics.identify({
  gender: 'Male'
});
analytics.page();
```

(This example assumes you have already mapped Gender to the correct dimension in your Segment source settings for Google Analytics.)

### Everything Else

To see a full list of Google Analytics features and how they work through Segment read [our Google Analytics docs page](/docs/connections/destinations/catalog/google-analytics/#features).

## Mixpanel

### Event Tracking

Event tracking is Mixpanel's bread and butter. Below are all the relevant Mixpanel functions and how you can map them to Segment functions.

Switching your event tracking from Mixpanel to Segment couldn't be easier. Our trackmethod maps directly to Mixpanel's. The event name is the first argument and the event properties are the second argument.

```js
mixpanel.track('Registered',{
  type: 'Referral'
});
```

Becomes:

```js
analytics.track('Registered', {
  type: 'Referral'
});
```

The identify method in Mixpanel is used to merge together events from multiple environments so your unique events number is accurate and your funnels don't break.

Since `mixpanel.identify` only takes a single argument (a userID) it maps directly to our identify method:

```js
mixpanel.identify('123');
```

Becomes:

```js
analytics.identify('123');
```

Mixpanel has the idea of Super Properties, which are user traits that get attached to every event that the user does. In Segment you can set Mixpanel Super Properties using our identify method. Super properties are only supported in client-side libraries [Analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript), [iOS](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios), [Android](https://segment.com/docs/connections/sources/catalog/libraries/mobile/android).

Here's an example:

```js
mixpanel.register({
  "gender": "male",
  "hairColor": "brown"
});
```

Becomes:

```js
analytics.identify({
  gender: 'male',
  hairColor: 'brown'
});
```

This also works when you include a userId argument in your identify call.

### Alias

Alias is necessary in Mixpanel to tie together an anonymous visitor with an identified one. The Mixpanel and Segment alias methods both work the same.

In client-side javascript passing a single argument will alias the current anonymous or identified visitor distinct\_id to the userId you pass into it:

```js
mixpanel.alias('1234');
```

Becomes:

```js
analytics.alias('1234');
```

### Track Links

If you are tracking links with Mixpanel's [track\_links](https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track_links)helper you can switch that code to the Segment [trackLink helper function](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track-link) in [Analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript).

And here's an example:

```js
// track click for link id #nav
mixpanel.track_links("#free-trial-link", "Clicked Free-Trial Link", {
  plan: 'Enterprise'
})
```

Becomes:

```js
var link = document.getElementById('free-trial-link');
analytics.trackLink(link, 'Clicked Free-Trial Link', {
  plan: 'Enterprise'
});
```

### Track Forms

If you are tracking forms with [Mixpanel's track\_forms helper](https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track_forms) you can switch that code to[the Segment trackForm helper function](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track-form) in Analytics.js.

And here's an example:

```js
// track submission for form id "register"
mixpanel.track_forms("#register", "Created Account",
  plan: 'Premium'
});
```

Becomes:

```js
var form = document.getElementById('register');
analytics.trackForm(form, 'Created Account',
  plan: 'Premium'
});
```

### People Tracking

Mixpanel people tracking is a separate database from the event tracking outlined above. For that reason there are separate API methods to record data to Mixpanel People.

This method sets people properties in Mixpanel People. In Segment you will use ouridentify method to accomplish this.

Here's an example:

```js
mixpanel.people.set({
  "$email": "jake.peterson@example.com",
  "$name": "Jake Peterson"
});
```

Becomes:

```js
analytics.identify({
  email: 'jake.peterson@example.com',
  name: 'Jake Peterson'
});
```

This also works when you include a userId argument in your identify call.

As you can see Segment also recognizes special traits like email and name and translates them to the keys that Mixpanel expects (we automatically add the dollar sign).

For more information check out [our Mixpanel docs](/docs/connections/destinations/catalog/mixpanel).

### Increment

To use Mixpanel increment through Segment you won't event need anything in your code! All you have to do is list the events you'd like to increment automatically in your Mixpanel destination settings.

Read more in [our Mixpanel Increment Docs](/docs/connections/destinations/catalog/mixpanel/#incrementing-events).

### Revenue

Mixpanel's Revenue report requires the use of a special function called `track_charge`. In Segment that special function becomes a simple track call. By using the event name `Order Completed` we'll also use that event for any tools you use that recognize our [ecommerce spec](https://segment.com/docs/connections/spec/ecommerce/v2/).

```js
mixpanel.people.track_charge(30.50,
  'orderId': 'F9274'
});
```

Becomes:

```js
analytics.track('Order Completed',
  revenue: 30.50,
  orderId: 'F9274'
});
```
