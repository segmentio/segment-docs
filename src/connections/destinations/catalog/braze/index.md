---
title: Braze Destination
hide-cmodes: true
hide-personas-partial: true
---

[Braze](https://www.braze.com/), formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni channel customer experiences.

The Braze Destination is open-source on GitHub. You can browse the code on GitHub: [iOS](https://github.com/Appboy/appboy-segment-ios), [Android](https://github.com/Appboy/appboy-segment-android) (Android and iOS maintained by Braze), [Web](https://github.com/segment-integrations/analytics.js-integration-appboy), [Server](https://github.com/segmentio/integration-appboy) (Web and Server maintained by Segment). If you find any issues for mobile platforms, let Braze know, if the issues appear on web or server, let [us know](https://segment.com/help/contact).

> info "There are three major versions of the Braze SDK"
> If you are migrating from version 1 to version 2, see [important notes](/docs/connections/destinations/catalog/braze/#migrating-to-v2-of-the-braze-web-sdk) regarding migration from Version 1 to Version 2.

If you notice any gaps or outdated information in this document, or simply want to leave some feedback to help us improve, [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Braze" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In your Segment Settings UI, add the "API Key" which can be found in your Braze Dashboard under App Settings > Manage App Group.
4. You will also need to set up a new App Group REST API Key in the Braze Dashboard under App Settings > Developer Console > API Settings. Instructions can be found [here](https://www.braze.com/documentation/REST_API/#creating-and-managing-rest-api-keys). **Note:** For this App Group REST API Key, you will only need to select users.track endpoint under "User Data"
5. If you are implementing using Analytics.js, Segment will automatically load the [Braze Web SDK](https://www.braze.com/documentation/Web/). Otherwise, depending on the source you've selected, include Braze's library by adding the following lines to your dependency configuration.


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

Braze created a sample iOS application that integrates Braze using Segment. Check it out at the [GitHub repo](https://github.com/Appboy/appboy-segment-ios/tree/master/Example).

#### Additional device-mode set up for iOS 14 support

Segment’s Braze SDK was updated to use AppBoy's version 3.26.1 to prepare for iOS 14. Braze will continue to allow apps to provide a user’s IDFA value to the Braze SDK. The `ABK_ENABLE_IDFA_COLLECTION` macro, which would conditionally compile in optional automatic IDFA collection, will be removed in Braze's iOS 14 release.

See the [Braze iOS 14 SDK Upgrade Guide](https://www.braze.com/docs/developer_guide/platform_integration_guides/ios/ios_14/) for more information.

To use the latest Braze SDK to collect IDFAs you must do the following:

1. Upgrade to use Xcode12.
2. Update your Segment Appboy SDK to version 3.3.0 or greater.
3. Import and implement the AppTrackingTransparency (ATT) Framework.
   - Navigate to your project `Info.plist` and add a “Privacy - Tracking Usage Description”. This description appears in a popup when the application initializes in iOS 14. Users are prompted to indicate whether or not they want to allow tracking.
4. Implement Braze's `ABKIDFADelegate`. For more information on how to implement this see [Braze’s IDFA Collection documentation](https://www.braze.com/docs/developer_guide/platform_integration_guides/ios/initial_sdk_setup/other_sdk_customizations/#implementing-idfa-collection).
5. Follow [Segment's guide for collecting IDFA](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/#idfa-collection-in-40-beta-and-later)

### Android

1. In your top-level project `build.gradle` add the following as a repository under allprojects > repositories.

    ```js
    maven { url "http://appboy.github.io/appboy-android-sdk/sdk" }
    ```

2. Add the Braze Segment destination dependency to your app `build.gradle`:

    ```js
   compile 'com.appboy:appboy-segment-integration:+'
   ```

    We recommend using the latest version on [Maven](http://search.maven.org/#search%7Cga%7C1%7Ca%3A%22appboy-segment-integration%22) since it will contain the most up-to-date features and bug fixes.

    **Note:** Our `groupId` is `com.appboy` and not `com.segment.analytics.android.integrations`.

3. Next, declare Braze's destination in your `Analytics` instance:

  ```js
  Analytics analytics = new Analytics.Builder(context, "YOUR_WRITE_KEY_HERE")
    .use(AppboyIntegration.FACTORY)
    ...
   .build();
  ```

#### Sample App

Braze has created a sample Android application that integrates Braze using Segment. Check it out at the [GitHub repo](https://github.com/Appboy/appboy-segment-android-sample).

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page();
```

Page calls are only sent to Braze if you have enabled either "Track All Pages" or "Track Only Named Pages" within your Segment Settings UI. They will be sent as a custom event.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('ze8rt1u89', {
  firstName: 'Jane',
  lastName: 'Kim',
  email: 'jane.kim@example.com'
});
```

When you Identify a user, Segment passes that user's information to Braze with `userId` as Braze's External User ID. 

If you are using a device-mode connection, Braze's SDK also automatically assigns a `braze_id` to every user. This allows Braze to capture anonymous activity from the device by matching on `braze_id` instead of `userId`. This only applies to _device-mode connections_. 

To send anonymous user data in cloud-mode, you must manually include the user's `braze_id` in all your Segment API calls in the `integrations.Braze.braze_id` or `context.integrations.Braze.braze_id` object.

> tip ""
> **Tip!** Braze is complex. If you decide to use the `braze_id`,  consider [contacting Segment Success Engineering](https://segment.com/help/contact/) or a Solutions Architect to validate your Braze implementation.

Segment's special traits recognized as Braze's standard user profile fields (in parentheses) are:

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

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Purchased Item', {
    product_id: '1234',
    name: 'bag'
})
```
When you `track` an event, we will send that event to Braze as a custom event. Note that Braze does not support arrays or nested objects for custom track event properties.

*Note*: Braze requires that you include a `userId` or `braze_id` for all calls made in cloud-mode. Segment only sends a `braze_id` if a `userId` is missing. When you use a device-mode connection, Braze automatically tracks anonymous activity using the `braze_id` if a `userId` is missing.

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

```js
analytics.track('Purchased Item', {
    revenue: '2000',
    currency: 'USD'
})
```

The example above would have "Purchased Item" as its `productId` and includes two required properties that you must pass in:

- `revenue`
- `currency`

Braze supports a currency codes as specified in [their documentation](https://www.braze.com/docs/developer_guide/rest_api/user_data/#purchase-object-specification). Be aware that any currency reported other than USD will still be shown in [your Braze UI in USD based on the exchange rate on the date it was reported](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/analytics/logging_purchases/#logging-purchases).

You can add more product details in the form of key-value pairs to the `properties` object. However, the following reserved keys will not be passed to Braze if included in your Track call's `properties` object:

- `time`
- `product_id`
- `quantity`
- `event_name`
- `price`


## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```js
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

Instructions on how to set this up within Braze can be found in their [docs](https://www.braze.com/academy/Best_Practices/#in-app-message-behavior). Once setup, it allows you to trigger in-app message display as a result of several different event types. By default, all In-App Messages that a user is eligible for are automatically delivered to the user upon a session start event. A new session automatically starts when a user loads your site. If you'd like to force a new session for a user, simply make an identify with the corresponding [userId](/docs/connections/spec/identify/#user-id) for that user.

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

1. Follow the directions to register for push at in [Segment's iOS library](/docs/connections/sources/catalog/libraries/mobile/ios/) docs.
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
6. If you are using the `UserNotification` framework, follow [Braze's documentation](https://www.braze.com/docs/developer_guide/platform_integration_guides/ios/push_notifications/integration/#using-usernotification-framework-ios-10) to register push notifications using the `UserNotification` framework. Then in your application's `userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler` method, add the following:

    ```objc
    if ([Appboy sharedInstance] == nil) {
        [[SEGAppboyIntegrationFactory instance].appboyHelper saveUserNotificationCenter:center
                                                                   notificationResponse:response];
    }
    [[SEGAppboyIntegrationFactory instance].appboyHelper userNotificationCenter:center
                                                   receivedNotificationResponse:response];
    if (completionHandler) {
        completionHandler();
    }
    ```

#### Android

1. Follow the directions in Braze's [push notification docs](https://www.braze.com/documentation/Android/#push-notifications).
2. If you don't have Braze automatically register for push (i.e. you pass the push token from an FCM or manual GCM registration) you need to ensure you call `registerAppboyPushMessages` after Braze is initialized. You can do this by checking if Braze is initialized before trying to pass the push token, and waiting for initializing to set if not.

    You can do this in an `onIntegrationReady` method:

    ```js
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

    **Note:** We recommend placing this snippet outside of your [Segment Snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet) within your `script` tag.

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

**Note:** We recommend placing this snippet outside of your [Segment Snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet) within your `script` tag.

4. When you'd like to display the Soft Push to a user, call:

```js
 analytics.ready(function() {
  window.appboy.logCustomEvent("prime-for-push")
 });
```

### Enable IDFA collection

To enable IDFA collection in Braze, add following lines to your `Podfile`:

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

If you have never implemented Braze on your site, either using Segment or natively, you can ignore this section. If you have had Braze running before and want to migrate to Version 2 **you must ensure you remove all references to `appboy.min.css` from your site.** This is very important as it will cause issues with Version 2 of their SDK. Once you have done this you can select Version 2 using the "Braze Web SDK Version" with your Segment Settings UI.

## Using Braze with Personas

You can send computed traits and audiences created in Personas to Braze, and use them to run personalization campaigns or power messages to users.

Personas sends [event data](/docs/glossary/#event) about your users to Braze using an `identify` call and/or `track` call.


### Computed Traits in Braze

You can send computed traits to Braze as [custom attributes](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/analytics/setting_custom_attributes/) or as [custom events](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/analytics/tracking_custom_events/).

- If you send a computed trait using the `identify` call, they appear in Braze as custom attributes.
- If you send a computed trait using the `track` call, they appear in Braze as custom events.

You can choose which method to use (or choose to use both) when you connect the computed trait to the Braze destination.

#### Computed Traits using Identify calls

You can send computed traits created in Personas as `identify` calls to create custom attributes in Braze. The custom attribute is set to the value of the computed trait. The custom attribute name appears as the snake_cased version of the computed trait name you provide.

For example, if you have a Personas computed trait for “Last Product Viewed Item,” that would be named “last_product_viewed_item” in the user’s Personas profile.

![](images/last_viewed-user.png)

If the “Last Product Viewed Item” trait is connected to Braze to send `identify` calls, as in this example:

![](images/last_viewed-identify.png)

The following custom attribute, “last_product_viewed_item” appears in Braze on the user’s profile:

![](images/last_viewed-id-braze.png)

#### Computed Traits using Track calls

You can also send computed traits created in Personas as `track` calls to create custom events in Braze. When a Personas calculates a computed trait for a user, it sends a `Trait Computed` event to Braze.

Using the same example as above, if a user has a computed trait for “Last Product Viewed Item” and the trait is connected to Braze and configured to send `track` calls:

![](images/last_viewed-track.png)

The following custom event appears in Braze on the user’s profile:

![](images/last_viewed-track-braze.png)

> success ""
> **Tip**: You can change the name of the “computed trait” event that Braze receives by going to the Personas Destination Connection Settings.

### Audiences in Braze

You can send Audiences to Braze as [custom attributes](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/analytics/setting_custom_attributes/) or [custom events](https://www.braze.com/docs/developer_guide/platform_integration_guides/web/analytics/tracking_custom_events/).

- When you send an Audience using the `identify` call, it appears in Braze as a custom attribute.
- When you send an Audience using the `track` call, it appears in Braze as a custom event.

You can choose which method to use (or choose both) when you connect the audience to the Braze destination.

#### Audiences using Identify calls

You can send audiences created in Personas as `identify` calls to create custom attributes in Braze. If a user is added to an audience, Personas sends a custom attribute to Braze with a value of `true`. The custom attribute name is be the snake_cased version of the audience name in Personas.

For example, if a user is in a “Dormant Shoppers” audience:

![](images/dormant-user.png)

And the “Dormant Shoppers” audience is connected to Braze to send `identify` calls:

![](images/dormant-identify.png)

The “dormant_shoppers” custom attribute appears in Braze on the user’s profile:

![](images/dormant-identify-braze.png)


#### Audiences using Track calls

You can also send audiences created in Personas as `track` calls to create custom events in Braze. If a user is added to an audience, Personas sends an `Audience Entered` event to Braze. If a user leaves the audience (because they no longer satisfy the criteria) Personas sends an `Audience Exited` event to Braze.

Using the same example as above, if a user is in a “Dormant Shoppers” audience and the audience is connected to Braze to send `track` calls, Personas sends the following “Audience Entered” and “Audience Exited” events. (You can edit the names of these events from this screen.)

![](images/dormant-track.png)

The following custom event appears in Braze on the user’s profile when they enter the audience:

![](images/dormant-track-braze.png)

> success ""
> **Tip**: You can change the name of the “Audience Entered” event that Braze receives from the Personas Destination Connection Settings.

## Setting up Personas with Braze

To send computed traits or audiences to Braze, you first must connect it to your Personas space. Once it’s set up, you can select Braze as a destination for Personas data each time you create new computed traits or audiences.

1. Navigate to the **Destinations** tab in your Personas space.
2. Search for **Braze** and add the destination to your Personas space.
3. On the set up screen, enter in your App Identifier, REST API Key and Datacenter for Braze.


## Braze Personas Quick Info

- **Personas Destination type**: [Event](/docs/glossary/#event) - data is delivered to this Destination one-by-one on a realtime basis
- **Support for Track and Identify?**: Yes, both are supported.
- **Traits and Audiences created by**: Computed traits and audiences are added as custom attributes using `identify` calls. You can also send computed traits and audiences as custom events using `track` calls.
- **Must create audience_name field before Personas can update those values?**: No. If sent as an `identify` call, Personas automatically creates the computed trait or audience name as a custom attribute in Braze. If sent as a `track` call, Personas automatically creates a custom event in Braze.
- **Computed trait appears as**: A snake cased version of the computed trait name (for example, `last_product_viewed: 'Sweater'`) with a string for the value of the computed trait.
- **Audience appears as**: A snake cased version of the audience name (for example, `order_completed_last_30days: true` ) with a boolean value of `true` indicates that a user is in the audience.
- **Destination rate limit**: 100 requests per second (this is at the Personas Space-level, i.e. shared across all Audiences & Computed Traits syncing from 1 Personas Space to Braze. This rate limit would not be shared by multiple Personas Spaces.)
- **Lookback window allowed:** Yes, unlimited.
- **Identifiers required** : `userId` or `braze_id`
- **Identifiers accepted** : `userId` or `braze_id`
- **Client or Server-Side Connection**: Server-side connection for Personas

## Debounce with Middlewares

If you use the Braze destination in either [cloud or device mode](/docs/connections/destinations/#connection-modes) you can save Braze costs by "debouncing" duplicate `identify()` calls from Segment by adding our [open-source Middleware tool](https://github.com/segmentio/segment-braze-mobile-middleware) to your implementation. More information about this tool and how it works [is available in the project's README](https://github.com/segmentio/segment-braze-mobile-middleware/blob/master/README.md#how-does-this-work).


## Braze Personas FAQs

#### Which ID does Segment match on when sending data to Braze?

By default, Personas data is sent to Braze by matching the `userId`. The Segment `userId` maps to Braze’s External ID. If the user is anonymous and does not have a `userId`, you can also choose to send data using the `braze_id` auto-generated by Braze. To use `braze_id`, you must pass the `braze_id` to Segment as a [Segment externalId](/docs/personas/identity-resolution/externalids/) in the `context.integrations.Braze.braze_id` object. If `braze_id` is sent as an `externalId` **and** `userId` is missing, Personas matches on `braze_id` when sending to Braze. You can check the **Identities** tab on a user’s Personas profile to confirm that `braze_id` was successfully picked up as an `externalId`.

![](images/braze-anonid.png)

You can find the `braze_id` in the Braze UI or by using Braze’s [Users by Identifier API Endpoint](https://www.braze.com/docs/api/endpoints/export/user_data/post_users_identifier/).

#### Do Personas audiences sync with [Braze Segments](https://www.braze.com/docs/user_guide/engagement_tools/segments/)?
No. Audiences are sent to Braze as either custom attributes or custom events. You can use these events and attributes when building your Braze Segments and Campaigns.

#### How long do my computed traits and audiences exist in Braze?
All Braze user profile data (including custom events, custom attributes) is stored for as long as those profiles are active.

#### What happens if I delete a computed trait or audience in Segment?
When you delete an audience or trait in Segment they are not deleted from Braze. Data sent to Braze is immutable and cannot be deleted or modified once they receive it. However, you can [blocklist](https://www.braze.com/docs/user_guide/administrative/app_settings/manage_app_group/custom_event_and_attribute_management/#blacklisting-custom-attributes-custom-events-and-products) custom attributes and events in Braze.
