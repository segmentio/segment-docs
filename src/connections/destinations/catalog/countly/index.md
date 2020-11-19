---
title: Countly Destination
---

Our Countly destination code is open source on GitHub. Feel free to check it out: [iOS](https://github.com/segmentio/analytics-ios/tree/master/Analytics/Integrations/Countly), [Android](https://github.com/segmentio/analytics-android/tree/master/analytics-integrations/countly).

## Getting Started

To get started with Countly and Segment, you'll want to first integrate your mobile app with our [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) or [Android](/docs/connections/sources/catalog/libraries/mobile/android/) sources.

Once the Segment library is integrated with your app, toggle Countly on in your Segment destinations catalog, and add your application's **App Key** and **Server URL** which you can find in your Countly Application Management. If you're using their cloud hosted solution (not hosting your own Count.ly server), then your **Server URL** is `https://cloud.count.ly`.

These new settings will take up to an hour to propogate to all of your existing users. For new users it'll be instanteneous!

- - -

## Track

Countly is built to help you better understand your user's behavior. To accomplish that, you'll want to [`track`](/docs/connections/spec/track/) your user's actions in detail.

Whenever you call [`track`](/docs/connections/spec/track/) from our iOS or Android library, we'll record an event with Countly. [`track`](/docs/connections/spec/track/) takes the name of the event and any optional `properties` you want to associate with the event.


### Custom Events

All you have to do is make a [`track`](/docs/connections/spec/track/) call to send a custom event to Countly. The event name will map to the countly "key" and we automatically set "count" to 1. If you add properties to the event those will be passed to Countly as well.


### Revenue

It's easy to track revenue in Countly through Segment. All you have to do is use our [`track`](/docs/connections/spec/track/) method with a property labeled `revenue`. The value must be a number.
