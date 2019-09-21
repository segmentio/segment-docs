---
title: Taplytics
---

Our Taplytics destination code is open sourced on Github. Feel free to check it out: [iOS](https://github.com/segment-integrations/analytics-ios-integration-taplytics), [Android](https://github.com/segment-integrations/analytics-android-integration-taplytics).

## Getting Started
Once the Segment library is integrated with your app, add your API key and select your settings then toggle Taplytics on in your Segment destinations. These new settings will take up to an hour to propagate to your existing users. For new users it’ll be instantaneous!

Follow the below steps for destination

### iOS
To get started with Taplytics on iOS, first integrate your app with the Taplytics [iOS](/docs/sources/mobile/ios) library. To get the API key, [login](https://taplytics.com/) to your account, select the App on the top left then click into the Settings menu on the left side. If you want to set up Push Notifications click on the Push Notification tab in their UI and [follow the instructions](https://taplytics.com/docs/guides/push-notifications/apple-push-certificates). Finally, you want to ensure you have configured your app delegate to [enable push notifications](/docs/sources/mobile/ios#how-do-i-use-push-notifications-).

If you want to set up deep linking, just follow [this section of their docs!](https://taplytics.com/docs/ios-sdk/getting-started#app-linking)

For more information about setting up Taplytics on iOS, see their [docs](https://taplytics.com/docs/ios-sdk/getting-started)


### Android
To get up and running with Taplytics on Android, there a couple of steps we will walk you through. You first want to ensure that you’ve integrated your mobile app with our [Android](/docs/sources/mobile/android) library.

To enable its full functionality (like Push Notifications, Deep linking), there are a couple of extra steps that you have to take care of in your Android app. [This document explains how to set up Push Notifications](https://taplytics.com/docs/android-sdk/push-notifications) and [ths one explains how to set up deep linking](https://taplytics.com/docs/android-sdk/getting-started#device-pairing).


## Identify
Use [Identify](/docs/sources/mobile/ios/#identify) to track user specific attributes. It equivalent to tracking [user attributes](https://taplytics.com/docs/guides/user-attributes-setup) on Taplytics. Taplytics supports traits supported by Segment as well as custom traits. If you set traits.id, we set that as the Unique ID for that user.

## Track
Use [track](/docs/sources/mobile/ios/#track) to track events and user behaviour in your app.
This will send the event to Taplytics with the associated properties. If you include a `revenue` property on your Track call, we'll call `logRevenue` to pass a revenue amount into Taplytics associated with the action. If you include a `value` property, we'll map it to Taplytics amount property when we `logEvent`.

## Reset
If your app supports the ability for a user to logout and login with a new identity, then you’ll need to call reset in your mobile app. Here we will call Taplytic's resetUser implementation to ensure the user information remains consistent.

{% include content/integration-foot.md %}
