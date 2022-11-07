---
rewrite: true
title: Apptimize Destination
id: 5537d3e80a20f4e22f0fb385
---
[Apptimize](https://apptimize.com/) empowers product teams to efficiently run A/B tests, rollout and manage new features, and deliver personalized user experiences. Our Apptimize destination code is open-source. You can browse the code on GitHub for [iOS](https://github.com/Apptimize/analytics-ios-integration-apptimize) and [Android](https://github.com/Apptimize/analytics-android-integration-apptimize).

## Getting Started

{% include content/connection-modes.md %}

 1. From the Segment web app, click **Catalog**.
 2. Search for "Apptimize" in the Catalog, select it, and choose which of your sources to connect the destination to.
 3. In the destination settings, enter your Apptimize application key, the 31 character key which you can find in your [Apptimize app settings](https://apptimize.com/admin/settings/apps).
 4. Depending on the mobile library you've selected, follow the below instructions to complete your setup.

_**NOTE:** There is also an advanced setting to publish Apptimize experiment data to Segment. If you choose to automatically record screen events or track Application lifecycle events, these will also be reflected in Apptimize. You also have access to all normal Apptimize non-Segment functionality. To integrate, simply pull in the destination as a dependency and include the Apptimize Integration Factory when setting up Segment Analytics. _

### iOS

1. Include the dependency through Cocoapods:
    ```
    pod "Segment-Apptimize"
    ```
2. Update code:
    ```
    SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY_HERE"];
    [config use:[SEGApptimizeIntegrationFactory instance]];
    ...
    [SEGAnalytics setupWithConfiguration:config];
    ```

### Android

1. As Apptimize is hosted as a Maven repository, you will need to add it like so:
    ```
    maven { url 'http://maven.apptimize.com/artifactory/repo' }
    ```
2. Include the dependency through Gradle:
    ```
    compile 'com.apptimize.segment:apptimize-segment-integration:+'
    ```
3. Update code:
   ```
   Analytics analytics = new Analytics.Builder(context, "YOUR_WRITE_KEY_HERE")
     .use(ApptimizeIntegration.FACTORY)
     ...
     .build();
   ```

### Manually Initialize Apptimize

Since both iOS and Android destinations are initialized asynchronously by Segment, you can manually initialize Apptimize and run experiments without waiting for Segment to initialize for you.

**Note**: Make sure that the Apptimize app key matches the key in the Segment dashboard.

#### iOS

Set the plist property `ApptimizeAppKey` to the corresponding app key for the app.

#### Android

Use the [Apptimize.setup](https://sdk.apptimize.com/android/javadocs/javadoc-2.12.10/com/apptimize/Apptimize.html#setup(android.content.Context,%20java.lang.String) API to initialize Apptimize with the app key.

It is important to note that if the app keys in the plist/code and the Segment dashboard do not match, the SDK will use the app key from the plist/code as it finishes initialization first. While it is safe to initialize Apptimize multiple times in the app, to avoid confusion, be very careful that the app key is the same in both the places.

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example iOS call would look like:

```swift
[[SEGAnalytics sharedAnalytics] screen:@"Photo Feed"
                            properties:@{ @"Feed Type": @"public" }];
```

When you record a `screen`, Apptimize will track an event of the form `Viewed [Screen name] screen`. If you choose to automatically record screen events, they will appear in Apptimize in the above format.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example iOS call would look like:

```swift
[[SEGAnalytics sharedAnalytics] identify:@"12091906-01011992"
                                traits:@{ @"email": @"john.doe@example.com" }];
```

When you `identify` a user, Segment will pass that user's information to Apptimize. The Segment `userId` field is passed to Apptimize as an Apptimize custom attribute called `userId`. Similarly Segment's built-in traits appear in Apptimize as custom attributes, e.g. `name`, `firstName`, `address`. You can also define arbitrary traits of your choice. The destination will recognize integer attributes; all other traits will be sent as strings.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example iOS call would look like:

```swift
[[SEGAnalytics sharedAnalytics] track:@"Article Completed"
                           properties:@{ @"title": @"How to Create a Tracking Plan", @"course": @"Intro to Analytics" }];
```

When you `track` an event, the event will be marked in Apptimize as an occurence of an Apptimize event of the same name.

**Optional:** You can also specify a value for each event, by adding a `value` property to the event when tracking. This is useful, for instance, when you want to track the price of orders each time a user clicks "Buy" in your app's shopping cart. Including an example iOS call below:

```swift
[[SEGAnalytics sharedAnalytics] track:@"Item Purchased"
                           properties:@{ @"item": @"Sample Item", @"value": @5.23 }];
```

### Send Experiment Data from Apptimize

If the advanced setting `Send experiment data to other tools (as a track call)` is checked, we will automatically collect the event [`Experiment Viewed`](/docs/connections/spec/ab-testing/#experiment-viewed).

This event supports the following semantic properties:

| Property        | Type   |
|-----------------|--------|
| experimentId | String |
| experimentName  | String |
| variationId  | String |
| variationName  | String |
