---
title: Braze Destination
rewrite: true
---

[Braze](https://www.braze.com/), formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni channel customer experiences.

The Braze Destination is open-source on GitHub. You can browse the code on Github: [iOS](https://github.com/Appboy/appboy-segment-ios), [Android](https://github.com/Appboy/appboy-segment-android) (Android and iOS maintained by Braze), [Web](https://github.com/segment-integrations/analytics.js-integration-appboy), [Server](https://github.com/segmentio/integration-appboy) (Web and Server maintained by Segment). If you find any issues for mobile platforms, please let Braze know, if the issues appear on web or server, let [us know](https://segment.com/help/contact).

_**NOTE:** There are currently two major versions of the Braze SDK. Make sure you read [important notes](https://segment.com/docs/connections/destinations/catalog/braze/#migrating-to-v2-of-the-braze-web-sdk) regarding migration from Version 1 to Version 2._

This document was last updated on June 13, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

**Use Cases**

* [Trigger upgrade messages to users who are likely to upgrade with Braze and ClearBrain](https://segment.com/recipes/trigger-upgrade-messages-braze-clearbrain/)
* [Trigger notifications when users don't complete activation steps with Braze](https://segment.com/recipes/trigger-push-notifications-activation-braze/)
* [Prompt active users to leave a product review with Braze](https://segment.com/recipes/braze-customer-review-automation/)

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Braze" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. In your Segment Settings UI, add the "API Key" which can be found in your Braze Dashboard under App Settings > Manage App Group.
4. You will also need to setup a new App Group REST API Key in the Braze Dashboard under App Settings > Developer Console > API Settings. Instructions can be found [here](https://www.braze.com/documentation/REST_API/#creating-and-managing-rest-api-keys). **Note:** For this App Group REST API Key, you will only need to select users.track endpoint under "User Data"
5. If you are implementing via Analytics.js, Segment will automatically load the [Braze Web SDK](https://www.braze.com/documentation/Web/). Otherwise, depending on the source you've selected, include Braze's library by adding the following lines to your dependency configuration.


### iOS

1. Add the Braze Segment Pod to your `Podfile`:

    ```objc
    pod 'Segment-Appboy'
    ```

    We recommend using the latest version on [CocoaPods](https://cocoapods.org/pods/Segment-Appboy) since it will contain the most up to date features and bug fixes.

2. Next, declare Braze's destination in your app delegate instance:

    ```objc
      SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY_HERE"];
      [config use:[SEGAppboyIntegrationFactory instance]];
      [SEGAnalytics setupWithConfiguration:config];
    ```

    [Here](https://github.com/Appboy/appboy-segment-ios/blob/master/Example/Segment-Appboy/SEGAppDelegate.m#L10) is a sample project which shows how to integrate the above.

#### Sample App

Braze has created a sample iOS application that integrates Braze via Segment.  Check it out at the [Github repo](https://github.com/Appboy/appboy-segment-ios/tree/master/Example).

### Android

1. In your top-level project `build.gradle` add the following as a repository under allprojects > repositories.

    ```
    maven { url "http://appboy.github.io/appboy-android-sdk/sdk" }
    ```

2. Add the Braze Segment destination dependency to your app `build.gradle`:

    ```
   compile 'com.appboy:appboy-segment-integration:+'
   ```

    We recommend using the latest version on [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22appboy-segment-integration%22) since it will contain the most up-to-date features and bug fixes.

    **Note:** Our `groupId` is `com.appboy` and not `com.segment.analytics.android.integrations`.

3. Next, declare Braze's destination in your `Analytics` instance:

   ```
    Analytics analytics = new Analytics.Builder(context, "YOUR_WRITE_KEY_HERE")
      .use(AppboyIntegration.FACTORY)
      ...
     .build();
    ```

#### Sample App

Braze has created a sample Android application that integrates Braze via Segment. Check it out at the [Github repo](https://github.com/Appboy/appboy-segment-android-sample).

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page();
```

Page calls are only sent to Braze if you have enabled either "Track All Pages" or "Track Only Named Pages" within your Segment Settings UI. They will be sent as a custom event.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('ze8rt1u89', {
  firstName: 'Zaphod',
  lastName: 'Beeblebrox',
  email: 'Zaphod@hotmail.com'
});
```

When you Identify a user, we'll pass that user's information to Braze with `userId` as Braze's External User ID. Segment's special traits recognized as Braze's standard user profile fields (in parentheses) are:

| Segment Event     | Braze Event  |
|-------------------|-------------|
| `firstName`       | `first_name`|
| `lastName`        | `last_name` |
| `birthday`        | `dob`       |
| `avatar`          | `image_url` |
| `address.city`    | `home_city` |
| `address.country` | `country`   |
| `gender`          | `gender`    |

All other traits (except their [reserved keys](https://www.braze.com/documentation/Platform_Wide/#reserved-keys)) will be sent to Braze as custom attributes. You can send an array of strings as trait values but not nested objects.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Purchased Item', {
    product_id: '1234',
    name: 'bag'
})
```
When you `track` an event, we will send that event to Braze as a custom event. Note that Braze does not support arrays or nested objects for custom track event properties.

*Note*: A `userId` is required for all calls.

*Note*: We will remove the following custom properties as they are reserved by Braze and the message will be rejected if you tried to send any of them:

- `time`
- `product_id`
- `quantity`
- `event_name`
- `price`
- `currency`

### Order Completed

When you `track` an event with the name `Order Completed` using the [e-commerce tracking API](/docs/connections/spec/ecommerce/v2/), we will send the products you've listed to Braze as purchases.

### Purchases

When you pass [ecommerce events](/docs/connections/spec/ecommerce/v2/), the name of your event will be used as the `productId` in Braze. An example of a purchase event would look like:

```
analytics.track('Purchased Item', {
    revenue: '2000',
    currency: 'USD'
})
```

The example above would have "Purchased Item" as its `productId` and includes two required properties that you must pass in:

- `revenue`
- `currency`

Braze supports a currency codes as specified in [their documentation](https://www.braze.com/docs/developer_guide/rest_api/user_data/#purchase-object-specification). Please be aware that any currency reported other than USD will still be shown in [your Braze UI in USD based on the exchange rate on the date it was reported](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/analytics/logging_purchases/#logging-purchases).

You can add more product details in the form of key-value pairs to the `properties` object. However, the following reserved keys will not be passed to Braze if included in your Track call's `properties` object:

- `time`
- `product_id`
- `quantity`
- `event_name`
- `price`


## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

```
analytics.group("1234", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  totalBilled: 830
});
```

When you call `group`, we will send a custom attribute to Braze with the name `ab_segment_group_<groupId>`, where `<groupId>` is the group's ID in the method's parameters. For example, if the group's ID is `1234`, then the custom attribute name will be `ab_segment_group_1234`. The value of the custom attribute will be set to `true`.


## Other Features

### In-app Messaging

#### Mobile
In-app messages will be registered for and requested by default. This functionality can be disabled by disabling the **Enable Automatic In-App Message Registration** setting. This is only available for users of the Braze Mobile SDKs.

#### Web

Instructions on how to set this up within Braze can be found in their [docs](https://www.braze.com/academy/Best_Practices/#in-app-message-behavior). Once setup, it allows you to trigger in-app message display as a result of several different event types. By default, all In-App Messages that a user is eligible for are automatically delivered to the user upon a session start event. A new session automatically starts when a user loads your site. If you'd like to force a new session for a user, simply make an identify with the corresponding [userId](https://segment.com/docs/connections/spec/identify/#user-id) for that user.

If you don't want your site to immediately display new In-App Messages when they're received, you can disable automatic display and register your own display subscribers. To do this:

1. Disable your [Automatically Send In-App Messages Destinations setting](/docs/connections/destinations/catalog/braze/#settings). By default, it is enabled when you enable the Braze destination.

2. Create your subscriber by calling:

    ```js
    analytics.ready(function() {
      window.appboy.subscribeToNewInAppMessages(function(inAppMessages) {
         // Display the first in-app message. You could defer display here by pushing this message to code      within in your own application.
         // If you don't want to use Appboy's built-in display capabilities, you could alternatively pass      the in-app message to your own display code here.
         window.appboy.display.showInAppMessage(inAppMessages[0]);

        // Return an array with any remaining, unhandled messages to appboy's internal queue.
        // These will be part of the inAppMessages param the next time this subscriber is invoked.
         return inAppMessages.slice(1);
       });
    });
    ```

The `inAppMessages` parameter will be an array of [`appboy.ab.InAppMessage`](https://js.appboycdn.com/web-sdk/latest/doc/ab.InAppMessage.html) subclass or [`appboy.ab.ControlMessage`](https://js.appboycdn.com/web-sdk/latest/doc/ab.ControlMessage.html) objects, each of which has various lifecycle event subscription methods.


### Push Notifications

#### iOS

1. Follow the directions to register for push at in [Segment's iOS library](https://segment.com/docs/libraries/ios/) docs.
2. Add the following to your application:didFinishLaunchingWithOptions

    ```
    [[SEGAppboyIntegrationFactory instance] saveLaunchOptions:launchOptions];
    ```
3. In your application's application:didReceiveRemoteNotification: method, add the following:
    ```
    [[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];
    ```
4. If you integrated the application:didReceiveRemoteNotification:fetchCompletionHandler: in your app, add the following to that method:
    ```
     if ([Appboy sharedInstance] == nil) {
      [[SEGAppboyIntegrationFactory instance] saveRemoteNotification:userInfo];
    }
    ```
5. If you implemented handleActionWithIdentifier:forRemoteNotification:, add the following to that method:
    ```
     if ([Appboy sharedInstance] == nil) {
        [[SEGAppboyIntegrationFactory instance] saveRemoteNotification:userInfo];
      }
    ```

#### Android

1. Follow the directions in Braze's [push notification docs](https://www.braze.com/documentation/Android/#push-notifications).
2. If you don't have Braze automatically register for push (i.e. you pass the push token from an FCM or manual GCM registration) you need to ensure you call `registerAppboyPushMessages` after Braze is initialized. You can do this by checking if Braze is initialized before trying to pass the push token, and waiting for initializing to set if not.

    You can do this in an `onIntegrationReady` method:

    ```
    String appboyPushToken;
    bool appboyInitialized = false;
    …
    // When you get the push token
    String receivedToken;

    appboyPushToken = recievedToken;
    if (appboyInitialized) {
      Appboy.getInstance(getContext()).registerAppboyPushMessages(appboyPushToken);
    }

    ….

    Analytics.with(this).onIntegrationReady(Appboy, new Callback() {
      @Override public void onIntegrationReady(Object integration) {
        appboyInitialized = true;
        if(appboyPushToken != null) {
          Appboy.getInstance(getContext()).registerAppboyPushMessages(appboyPushToken);
        }
      }
    });
    ```

#### Client

1. To support push notifications on Chrome, you'll need to enable FCM/GCM as well as configure your site. Check out steps [one and two here, for detailed instructions on both](https://www.braze.com/documentation/Web/#step-1-to-support-chrome-enable-fcmgcm).

2. Browser Registration. In order for a browser to receive push notifications, you must register it for push by calling:

    ```js
    analytics.ready(function() {
      window.appboy.registerAppboyPushMessages();
    });
    ```

    **Note:** We recommend placing this snippet outside of your [Segment Snippet](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-1-copy-the-snippet) within your `script` tag.

    **Note:** This will immediately request push permission from the user.

To show your own push-related UI to the user before requesting push permission (known as a soft push prompt), you can test to see if push is supported in the user's browser by calling:

```js
analytics.ready(function() {
  if (window.appboy.isPushSupported()) {
    // Add your push logic
  }
 });
```

Braze recommends checking to see if this returns `true` since not all browsers can recieve push notifications. [See below](/docs/connections/destinations/catalog/braze/#soft-push-prompts) for instructions on setting up a soft push prompt using Braze In-App Messages.

To unsubscribe a user, call:

```js
analytics.ready(function() {
  window.appboy.unregisterAppboyPushMessages();
});
```

3. Set your GCM/FCM server API key and SenderID on the Braze dashboard. You can find more details for this [here](https://www.braze.com/documentation/Web/#step-4-set-your-gcmfcm-server-api-key-and-senderid-on-the-Braze-dashboard).

4. To support push notifications on Safari, add your Website Push ID into your Segment Settings UI and we'll send it for you when we initialize the Braze Web SDK. To get your Website Push ID, follow the first two bullet points in [these instructions](https://www.braze.com/documentation/Web/#step-5-configure-safari-push).

### Soft Push Prompts

1. Follow [step one](https://www.braze.com/documentation/Web/#soft-push-prompts) to create a "Prime for Push" in-app messaging Campaign on the Braze dashboard.

2. Disable your [Automatically Send In-App Messages Destination setting](/docs/connections/destinations/catalog/braze/#settings). By default, it is enabled when you enable the Braze destination.

3. Add the following snippet to your site:

```js
analytics.ready(function() {
  window.appboy.subscribeToNewInAppMessages(function(inAppMessages) {
    var message = inAppMessages[0];
    if (message != null) {
      var shouldDisplay = true;

      if (message instanceof appboy.ab.inAppMessage) {
        // Read the key/value pair for msg-id
        var msgId = message.extras["msg-id"];

        // If this is our push primer message
        if (msgId == "push-primer") {
          // We don't want to display the soft push prompt to users on browsers that don't support push, or if the user
          // has already granted/blocked permission
          if (!appboy.isPushSupported() || appboy.isPushPermissionGranted() || appboy.isPushBlocked())     {
            shouldDisplay = false;
          }
          // Prompt the user when the first button is clicked
          message.buttons[0].subscribeToClickedEvent(function() {
            appboy.registerAppboyPushMessages();
          });
        }
      }

      // Display the message
      if (shouldDisplay) {
        appboy.display.showInAppMessage(message);
      }
     }

    // Remove this message from the array of IAMs and return whatever's left
    return inAppMessages.slice(1);
   });
 });
```

For more details on this snippet, check out the Braze's docs [here](https://www.braze.com/documentation/Web/#soft-push-prompts).

**Note:** We recommend placing this snippet outside of your [Segment Snippet](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-1-copy-the-snippet) within your `script` tag.

4. When you'd like to display the Soft Push to a user, call:

```js
 analytics.ready(function() {
  window.appboy.logCustomEvent("prime-for-push")
 });
```

### Enable IDFA collection

To enable IDFA collection in Braze, please add following lines to your `Podfile`:

```objc
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      if target.name == "Appboy-iOS-SDK"
        target.build_configurations.each do |config|
          config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= [
          '$(inherited)', 'ABK_ENABLE_IDFA_COLLECTION']
          end
      end
    end
  end
end
```

### Migrating to v2 of the Braze Web SDK
There are currently two major [versions](https://github.com/Appboy/appboy-web-sdk/blob/master/CHANGELOG.md#breaking) of this SDK: 1 and 2. Segment currently supports both as migrating to Version 2 requires some important changes to your website.

If you have never implemented Braze on your site, either via Segment or natively, you can ignore this section. If you have had Braze running before and want to migrate to Version 2 **you must ensure you remove all references to `appboy.min.css` from your site.** This is very important as it will cause issues with Version 2 of their SDK. Once you have done this you can select Version 2 via the "Braze Web SDK Version" with your Segment Settings UI.
