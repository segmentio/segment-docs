---
title: Analytics React Native Taplytics Plugin
strat: react-native
---


## Getting Started

Once the Segment library is integrated with your app, add your API key and select your settings then toggle Taplytics on in your Segment destinations. These new settings will take up to an hour to propagate to your existing users. For new users it'll be instantaneous!

## Installation
1. Install the `@taplytics/segment-react-native-plugin-taplytics` and the `taplytics-react-native` dependency.

Using NPM:

```js
    npm install --save @taplytics/segment-react-native-plugin-taplytics taplytics-react-native
```
Using Yarn:

```js
    yarn add @taplytics/segment-react-native-plugin-taplytics taplytics-react-native
```
2. Run `pod install` after the installation to autolink the Taplytics SDK.

3. Setup Taplytics
Follow the instructions to setup Taplytics for [iOS](https://docs.taplytics.com/docs/react-native-sdk#ios-setup) and [Android](https://docs.taplytics.com/docs/react-native-sdk#ios-setup).


## Identify
Use [Identify](/docs/connections/sources/catalog/libraries/mobile/ios/#identify) to track user specific attributes. It equivalent to tracking [user attributes](https://docs.taplytics.com/docs/guides-user-insights) on Taplytics. Taplytics supports traits supported by Segment as well as custom traits. If you set traits.id, we set that as the Unique ID for that user.

## Track
Use [track](/docs/connections/sources/catalog/libraries/mobile/ios/#track) to track events and user behaviour in your app.
This will send the event to Taplytics with the associated properties. If you include a `revenue` property on your Track call, we'll call `logRevenue` to pass a revenue amount into Taplytics associated with the action. If you include a `value` property, we'll map it to Taplytics amount property when we `logEvent`.

## Reset
If your app supports the ability for a user to logout and login with a new identity, then you'll need to call reset in your mobile app. Here we will call Taplytic's resetUser implementation to ensure the user information remains consistent.
