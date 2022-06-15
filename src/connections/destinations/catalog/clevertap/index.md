---
title: CleverTap Destination
id: 5711271880412f644ff13150
cmode-override: true
---
## Getting Started

Once the Segment library is integrated, toggle CleverTap on in your Segment destinations, and add your CleverTap Account ID and CleverTap Account Token which you can find in the CleverTap Dashboard under Settings.

You can integrate CleverTap using a server-side or mobile destination (iOS or Android). If you are interested in using CleverTap's push notifications or in-app notifications products, you should use the mobile destinations.

All server-side destination requests requires both the Segment Anonymous ID or a userId in the payload. This is a requirement from CleverTap.

CleverTap supports the `identify`, `track`, `page` (server-side only), and `screen` (iOS and server-side only) methods.


## Identify

When you identify a user, Segment passes that user's information to CleverTap with userId as CleverTap's Identity value. A number of Segment's special traits map to CleverTap's standard user profile fields.  You'll pass the key on the left into Segment and Segment transforms it to the key on the right before sending to CleverTap.

- `name` maps to `Name`
- `birthday` maps to `DOB`
- `avatar` maps to `Photo`
- `gender` maps to `Gender`
- `phone` maps to `Phone`
- `email` maps to `Email`

All other traits will be sent to CleverTap as custom attributes. The default logic will lower case and snake_case any user traits - custom or special - passed to CleverTap.

## Track

When you `track` an event, Segment sends that event to CleverTap as a custom event.  Note that CleverTap does not support arrays or nested objects for custom track event properties.

> note ""
> CleverTap requires `identify` traits such as `userId` or `email` to record and associate the Track event. Without these traits, the Track event does not appear in CleverTap.

The default logic for the cloud mode connection to CleverTap will lower case and snake_case any event properties passed from Segment's servers to CleverTap. The device mode connection will not lower case or snake_case any event properties passed directly to CleverTap from the client.

### Order Completed

When you `track` an event using the server-side destination with the name `Order Completed` using the [e-commerce tracking API](/docs/connections/spec/ecommerce/v2/), Segment maps that event to CleverTap's [Charged](https://support.clevertap.com/docs/working-with-events.html#recording-customer-purchases){:target="_blank"} event.

## Page

When you send a `page` event using the server-side destination, Segment sends that event to CleverTap as a Web Page Viewed event.

## Screen

When you send a `screen` event using the server-side destination or the iOS bundled SDK, Segment sends that event to CleverTap as an App Screen Viewed event.

## Android

### Integrating

1. Add the CleverTap Segment Destination dependency to your app build.gradle:

    `compile 'com.clevertap.android:clevertap-segment-android:+'`

    **Note**: The group Id is `com.clevertap.android`, not `com.segment.analytics.android.integrations`.

2. Next, declare CleverTap's destination in your Analytics instance:

   ```java
   Analytics analytics = new Analytics.Builder(context, "YOUR_WRITE_KEY_HERE")
     .use(CleverTapIntegration.FACTORY)
     ...
     .build();
   ```

### Integrating Push

1. In your AndroidManifest.xml, register the following CleverTap services.

    ```xml
    <service
        android:name="com.clevertap.android.sdk.FcmTokenListenerService">
        <intent-filter>
            <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
        </intent-filter>
    </service>

    <service
        android:name="com.clevertap.android.sdk.FcmMessageListenerService">
        <intent-filter>
            <action android:name="com.google.firebase.MESSAGING_EVENT"/>
        </intent-filter>
    </service>
    ```

2. For more in-depth information, visit CleverTap's [Android push integration documentation](https://developer.clevertap.com/docs/android){:target="_blank"}.

### In-App Notifications

1. In your AndroidManifest.xml, add the CleverTap InAppNotificationActivity.

    ```xml
    <activity
            android:name="com.clevertap.android.sdk.InAppNotificationActivity"
            android:configChanges="orientation|keyboardHidden"
            android:theme="@android:style/Theme.Translucent.NoTitleBar" />
    ```

    No further action is required to integrate in-app notifications, which are registered for and requested by default by the CleverTap Segment integration.


### Sample App

CleverTap has created a sample Android application that integrates CleverTap using Segment. Check it out at the [GitHub repository](https://github.com/CleverTap/clevertap-segment-android-example){:target="_blank"}.

## iOS

### Integrating

1. Add the CleverTap Segment Pod to your Podfile:

   ```objc
   `pod 'Segment-CleverTap'`
   ```

   Use the latest version on [CocoaPods](https://cocoapods.org/pods/Segment-CleverTap){:target="_blank"} since it will contain the most up to date features and bug fixes.

2. Next, declare CleverTap's integration in your app delegate instance:

   ```objc
   SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY_HERE"];
   [config use:[SEGCleverTapIntegrationFactory instance]];
   [SEGAnalytics setupWithConfiguration:config];
   ```

### Integrating Push

1. Follow the directions to register for push at: [/docs/connections/sources/catalog/libraries/mobile/ios/#how-do-i-use-push-notifications](/docs/connections/sources/catalog/libraries/mobile/ios/#how-do-i-use-push-notifications).

2. In your application's application:didReceiveRemoteNotification: method, add the following:

   `[[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];`

3. If you integrated the application:didReceiveRemoteNotification:fetchCompletionHandler: in your app, add the following to that method:

   `[[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];`

4. If you implemented handleActionWithIdentifier:forRemoteNotification:, add the following to that method:

   `[[SEGAnalytics sharedAnalytics] handleActionWithIdentifier:identifier forRemoteNotification:userInfo];`

### In-App Notifications

No further action is required to integrate in-app notifications, which are registered for and requested by default by the CleverTap Segment integration.

### Sample App

CleverTap has created a sample iOS application that integrates CleverTap using Segment. Check it out at the [GitHub repository](https://github.com/CleverTap/clevertap-segment-ios/tree/master/Example){:target="_blank"}.


## React Native

{% include content/react-dest.md %}


## Server-Side

### Push Tokens

If you chose not to bundle the CleverTap Mobile SDK, then you will have to implement your own Push Message processors (and you won't have access to CleverTap's In-App feature).

If you decide to implement your own Push Message processors, then you can pass push tokens to CleverTap using the server-side destination. You can do this by sending it inside context.device.token.
