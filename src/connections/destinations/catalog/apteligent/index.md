---
title: Apteligent Destination
---

Our Apteligent destination code is open sourced on Github. Feel free to check it out: [iOS](https://github.com/segment-integrations/analytics-ios-integration-crittercism), [Android](https://github.com/segment-integrations/analytics-android-integration-crittercism).

## Getting Started

To get started with Apteligent and Segment, you'll want to integrate our [Android](/docs/connections/sources/catalog/libraries/mobile/android/) or [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) SDK into your mobile app.

Once the Segment library is integrated with your app, toggle Apteligent on in your Segment destination catalog, and add your **App Id** which you can find in your [Apteligent app settings](https://app.apteligent.com/developers/login). These new settings will take up to an hour to propogate to all of your existing users. For new users it'll be instanteneous!

- - -


## Identify

Apteligent can show you information about the user using your app. You can record that info with our [`identify`](/docs/connections/spec/identify/) method. You should put the `identify` call as soon as you know the user's identity. This usually happens after they register or log in.


## Track

When an error occurs, you'll want to know what user actions led to the crash. Apteligent allows you to leave "breadcrumbs" for this purpose.

Whenever you call [`track`](/docs/connections/spec/track/), we'll leave a breadcrumb in Apteligent. `Track` takes the name of the event and any optional `properties` you want to associate with the event.
