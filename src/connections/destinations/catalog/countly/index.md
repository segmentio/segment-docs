---
title: Countly Destination
id: 54521fd525e721e32a72eea5
---
The Countly destination source code for [iOS](https://github.com/Countly/countly-sdk-ios){:target="_blank"} and [Android](https://github.com/Countly/countly-sdk-android){:target="_blank"} is available on GitHub. 

## Getting Started

To get started with Countly and Segment, add the [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/), [Android](/docs/connections/sources/catalog/libraries/mobile/android/) or [React Native](/docs/connections/sources/catalog/libraries/mobile/react-native/) libraries to your mobile app.

After you integrate the appropriate destination with your app, add the Countly destination from the destination catalog, and add your application's **App Key** and **Server URL** which you can find on the Countly Application Management screen.

These new settings take up to an hour to propagate to existing users, but is instantaneous for new users.

### React Native set up

{% include content/react-dest.md %}


## Track

Countly helps you better understand your user's behavior. To accomplish that, [`track`](/docs/connections/spec/track/) your user's actions in detail.

When you call [`track`](/docs/connections/spec/track/) from the iOS or Android library, Segment records an event with Countly. [`track`](/docs/connections/spec/track/) takes the name of the event and any optional `properties` you want to associate with the event.


### Custom Events

Make a [`track`](/docs/connections/spec/track/) call to send a custom event to Countly. The event name maps to the Countly "key" and "count" is set to 1. Segment passes properties you add to the event to Countly.

### Revenue

It's easy to track revenue in Countly through Segment. Use the [`track`](/docs/connections/spec/track/) method with a property labeled `revenue`. The value must be a number.
