---
beta: true
title: Wishpond Destination
id: 575f018380412f644ff139bf
---
This destination is maintained by Wishpond.

The [Wishpond JavaScript (browser) Integration](https://github.com/wishpond-dev/analytics.js-integration-wishpond) destination code is open source and on GitHub. Feel free to check it out.

## Getting Started

Wishpond works with Segment's client-side JavaScript library: Analytics.js.


1.  From your Segment UI's Destinations page click on "Add Destination".
2.  Search for "Wishpond" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Merchant ID and Trackey Key from Wishpond's ["API Keys" dialog](https://www.wishpond.com/central/welcome?api_keys=true). These are also found in your Wishpond Account in the "API Keys" dropdown under your account name in the top right corner.
4. Segment automatically initializes Wishpond's Tracking Code with your Tracking Key and Merchant ID when it next loads Analytics.js.

When you enable Wishpond in Segment, your Wishpond account starts to receive data when you use `identify` or `track` methods.

## Identify

When you `identify` a user, we'll pass that user's information to Wishpond. Wishpond Tracking Code, method identify, will be triggered with the params used to identify.

For instance, when Segment `identify` is called:

```js
analytics.identify('1e810c197e', {
  name: 'Jane Kim',
  email: 'jane.kim@example.com'
});
```

Wishpond Tracker will be called with the following parameters:

```js
Wishpond.Tracker.identify('1e810c197e', {
  name: 'Jane Kim',
  email: 'jane.kim@example.com'
});
 ```

A new lead will be created be in your 'Wishpond Leads Database'. The lead will have the attributes: name 'Jane Kim', email 'jane.kim@example.com'.
To more details how Wishpond's identify works  visit [Wishpond API Docs: #identify](http://developers.wishpond.com/#identify).

## Track

When you `track` an event, we will send that event to Wishpond. Wishpond Tracking Code, method track, will be triggered with the params used to track the event.

For instance, when Segment `track` is called:

```js
analytics.track('Signed Up', {
  plan: 'Startup',
  source: 'Analytics Academy'
});});
```

Wishpond Tracker will be called with the following parameters:

```js
Wishpond.Tracker.track('Signed Up', {
  plan: 'Startup',
  source: 'Analytics Academy'
});
 ```

A new event will be added to the lead that the current session is tracking. The event title will be 'Signed Up', and it will have the properties: plan: 'Startup',source: 'Analytics Academy'.

To more details how Wishpond's identify works  visit [Wishpond API Docs: #track](http://developers.wishpond.com/#tracking-events).

- - -
## Troubleshooting/ FAQ

### Destination is not working properly

Make sure you have copied the right keys from Wishpond's ["API Keys" dialog](https://www.wishpond.com/central/welcome?api_keys=true), this destination will need `Merchant ID` and `Tracking Key`.

[Analytics.js]: https://segment.com//docs/connections/sources/catalog/libraries/website/javascript/
[ci-link]: https://circleci.com/gh/segment-integrations/analytics.js-integration-wishpond
[ci-badge]: https://circleci.com/gh/segment-integrations/analytics.js-integration-wishpond.svg?style=svg
