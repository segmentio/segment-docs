---
title: Kahuna Destination
id: 54751740db31d978f14a5bce
---
## Getting Started

Segment makes it easy to send your data to Kahuna. When you tracking your data using Segment's [open-source libraries](/docs/connections/sources/catalog/), Segment translates and routes your data to Kahuna in a format it can process.

If you have mobile apps, then Kahuna recommends that you use the Segment [iOS](/docs/connections/sources/catalog/libraries/mobile/ios) and or [Android](/docs/connections/sources/catalog/libraries/mobile/android) library and bundling Kahuna (see [Mobile](#mobile) section below).

If you are sending data from a server side library, read the [Server side](#server-side) section.

Be sure to enable Kahuna in your Segment destinations page and provide your **Kahuna Secret Key**, which you can find in the Settings page of the Kahuna Dashboard.

## Mobile

To use the full capability of Kahuna's Push Messaging and In-App features, you will have to bundle the Kahuna SDK while configuring your Segment mobile SDKs.

### Android

Add this to your project gradle file:

```java
allprojects {
  repositories {
    jcenter()
    maven { url "https://kahuna.github.io/kahuna-android/integration" }
    maven { url "https://kahuna.github.ios/kahuna-android/sdk" }
  }
}
```

Add this to your app level gradle file:

```java
compile ('com.kahuna.integration.android.segment:kahuna:+') {
  transitive = true
}
```

Then, bundle Kahuna during your Segment Analytics initialization, with more details [here](/docs/connections/sources/catalog/libraries/mobile/android/#bundling-integrations):

```java
Analytics analytics = new Analytics.Builder(this, "SEGMENT_KEY")
  .use(KahunaIntegration.FACTORY)
  .build();
```

### iOS

Add the Kahuna pod dependency:

```
pod "Segment-Kahuna
```

Then, bundle Kahuna during your Segment Analytics initialization, with more details [here](/docs/connections/sources/catalog/libraries/mobile/ios/#bundling-integrations):

```objc
#import <Segment-Kahuna/SEGKahunaIntegrationFactory.h>
SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];

[config use:[SEGKahunaIntegrationFactory instance]];

[SEGAnalytics setupWithConfiguration:config];
```

### Push Notifications

To use the Push Notifications and In-App functionality provided by Kahuna, follow the steps in the Kahuna SDK destination guide:

- For **iOS**, follow the steps in [Enable Personalized Push](https://app.usekahuna.com/tap/docs/Content/Integration/IOS/iOS_Push.htm) in the iOS Get Started section.

- For **Android**, follow the steps in [Enable Personalized Push](https://app.usekahuna.com/tap/docs/Content/Integration/Android/Android_Push.htm) in the Android Get Started section.

## Reset

If your app supports the ability for a user to logout and login with a new identity, then you'll need to call [`reset`](/docs/connections/sources/catalog/libraries/mobile/ios/#reset) in your mobile app. Here Segment calls Kahuna's `logout` implementation to ensure the user information remains consistent.

## Server-Side

If you are using Segment's iOS or Android libraries but have **not** bundled Kahuna's SDK as described in the [mobile](#mobile) section above, Segment uses the server side destination by default. It is recommended that you bundle the Kahuna's SDK in order to use features such as Push Notifications and In-App features.

However, any data coming from sources other than mobile apps should be using the server side destination.

### Batching

If you are using the server side destination for Kahuna, Segment recommend you set the Segment batching options as follows (note: these settings would apply to **all** of your Segment destinations):

- flushAt to 100
- flushAfter to 30 minutes (or 1800000 ms)

## Identify

Our server-side destination supports the ability to register user information with Kahuna through our identify calls. This will allow you to organize and segment your Kahuna campaigns according to the user information that you have sent.

The first thing you'll want to do is to [`identify`](/docs/connections/spec/identify/) a user with any relevant information as soon as they launch the app. You record this with our [`identify`](/docs/connections/spec/identify/) method.

`Identify` takes the `userId` of a user and any `traits` you know about them.

When you call [`identify`](/docs/connections/spec/identify/), we'll set two **Kahuna Credentials**, `user_id` and `email`. Any other traits will instead be sent to Kahuna as `user_info`, which are **User Attributes** in Kahuna.

We will also send any relevant device information such as device token, app name and version, OS and browser name, etc.

## Track

You can also use [`track`](/docs/connections/spec/track/) calls to send event data using Kahuna's `Intelligent Events`.

Whenever you call track, we'll send an event to Kahuna with the event name and a unix timestamp. We will also pass through any properties of the event. If `properties.quantity` and `properties.revenue` are set, then Segment sends the event name as well as count and value. For value, Segment first multiplies `properties.revenue` by `100` before sending to Kahuna, because Kahuna tracks value in cents not dollars.

**Note:** We will flatten any compound objects such as nested objects or arrays. We will also strip any properties that have values of `null` since Kahuna's API does not support these values. Lastly, just like the `identify` call, Segment send any relevant device parameters it can send based off the context of the call.

## Screen

When you call [`screen`](/docs/connections/spec/screen/) in your mobile app, Segment sends a screen view to Kahuna for mobile apps if `trackAllPages` is enabled for your Kahuna destination. If enabled, Segment track a Kahuna event with the format "Viewed `screen.name` Screen". If you want to enable sending `screen`events to Kahuna, simply check the box for: Track All Pages from your Segment Kahuna settings page.

## E-Commerce

Segment supports a deeper Kahuna destination with e-commerce tracking in our **mobile** SDKs (NOT in server side). All you have to do is adhere to our [`e-commerce tracking API`](/docs/connections/spec/ecommerce/v2/) and we'll track Kahuna e-commerce specific user attributes.

#### Viewed Product Category

For `Viewed Product Category`, Segment tracks the Kahuna User Attributes "Last Viewed Category" and "Categories Viewed". The value for Last Viewed Category will be taken from `properties.category`, "None" if unspecified. The value of Categories Viewed will be a list of the last 50 unique categories the user viewed, also taken from `properties.category`.

#### Viewed Product

For `Viewed Product`, Segment tracks the same Kahuna User Attributes as Viewed Product Category. We also will track another User Attribute called "Last Product Viewed Name" with the value taken from `properties.name`.

#### Added Product

For `Added Product`, Segment tracks the Kahuna User Attributes "Last Product Added To Cart Name" taken from `properties.name` and "Last Product Added To Cart Category" taken from `properties.category`. If category is unspecified, Segment tracks "None".

#### Order Completed

For `Order Completed`, Segment tracks the Kahuna User Attributes "Last Purchase Discount" taken from `properties.discount`. If `discount` is unspecified, Segment tracks 0.

### Send Push Token using Server-Side

If you chose not to bundle the Kahuna Mobile SDK, then you will have to implement your own Push Message processors, and you won't have access to Kahuna's In-App feature.

If you decide to implement your own Push Message processors, then make sure you pass the Push Tokens to Kahuna using Server Side.  You can do this by sending it inside `context.device.token`. We will send this to Kahuna as `push_token`.
