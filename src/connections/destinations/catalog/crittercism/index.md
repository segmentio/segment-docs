---
title: Crittercism Destination
redirect_from: '/connections/destinations/catalog/apteligent/'
id: 54521fd525e721e32a72eea3
---
Our Crittercism destination code is open sourced on GitHub. Feel free to check it out: [iOS](https://github.com/segment-integrations/analytics-ios-integration-crittercism), [Android](https://github.com/segment-integrations/analytics-android-integration-crittercism).

## Getting Started

To get started with Crittercism and Segment, you'll want to integrate our [Android](/docs/connections/sources/catalog/libraries/mobile/android/) or [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) SDK into your mobile app.

Once the Segment library is integrated with your app, toggle Crittercism on in your Segment destination catalog, and add your **App Id** which you can find in your [Crittercism app settings](https://app.crittercism.com/developers/login). These new settings will take up to an hour to propagate to all of your existing users. For new users it'll be instantaneous!

### React Native set up

{% include content/react-dest.md %}

- - -


## Identify

Crittercism can show you information about the user using your app. You can record that info with our [`identify`](/docs/connections/spec/identify/) method. You should put the `identify` call as soon as you know the user's identity. This usually happens after they register or log in.


## Track

When an error occurs, you'll want to know what user actions led to the crash. Crittercism allows you to leave "breadcrumbs" for this purpose.

Whenever you call [`track`](/docs/connections/spec/track/), we'll leave a breadcrumb in Crittercism. `Track` takes the name of the event and any optional `properties` you want to associate with the event.
