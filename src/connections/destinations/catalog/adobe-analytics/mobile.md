---
title: Setting up Adobe Analytics for Mobile
strat: adobe
---

Segment supports Adobe Analytics Mobile Services. With Segment, you don't need to package Adobe Analytics SDKs to use Adobe Analytics Mobile Services features.

To learn more about Segment's mobile libraries, see the [iOS](/docs/connections/sources/catalog/libraries/mobile/ios) and [Android](/docs/connections/sources/catalog/libraries/mobile/android) technical docs.


## Setting Up the Mobile SDKs

Before you start sending data from your mobile application to Adobe Analytics, you must first finish the following set up steps:

- First, enable the Segment-Adobe Analytics destination from in your Segment workspace.
- From your Adobe Mobile Services dashboard, check and customize the settings on the "Manage App Settings" tab.
- Download these settings as the `ADBMobileConfig.json` file by clicking the **Config JSON** link at the bottom of the same tab. Follow the instructions in Adobe's documentation [here for iOS](https://marketing.adobe.com/resources/help/en_US/mobile/ios/dev_qs.html) and [here for Android](https://marketing.adobe.com/resources/help/en_US/mobile/android/dev_qs.html).
- Finally, follow the instructions below for each mobile environment to bundle Segment's Adobe Analytics SDK in your project.

> success ""
> **Tip**: Mobile implementations use the `ADBMobileConfig.json` file to store the settings that you would otherwise enter in the Adobe Analytics destination settings in the Segment app. You can change these settings from the Manage App Settings tab in your Adobe Mobile Services dashboard, and can download the file from that same tab. This file includes the Report Suite ID, Timestamp Option, Tracking Server Secure URL, Tracking Server URL, and Use Secure URL for Server-side settings.

#### For Android
```java
compile 'com.segment.analytics.android.integrations:adobeanalytics:+'
```

After adding the dependency, you must register the integration with our SDK. To do this, import the Amplitude integration:
```java
import com.segment.analytics.android.integrations.adobeanalytics.AdobeIntegration;
```

And add the following line:
```java
analytics = new Analytics.Builder(this, "write_key")
                .use(AdobeIntegration.FACTORY)
                .build();
```

**Note:** If you're working on Android, you'll also need to add these permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

You can see the [Android SDK changelog](https://github.com/segment-integrations/analytics-android-integration-adobe-analytics/blob/master/CHANGELOG.md) in the open-source repository for information about specific versions of the Android Adobe Analytics SDK.

#### For iOS
```objc
pod 'Segment-Adobe-Analytics'
```

You can see the [iOS SDK changelog](https://github.com/segment-integrations/analytics-ios-integration-adobe-analytics/blob/master/Changelog.md) in the open-source repository for information about specific versions of the iOS Adobe Analytics SDK.

## Sending Data to Adobe analytics

Segment strongly recommends that you create a tracking plan for both your Segment and Adobe Analytics events _before_ you send any events or properties to Adobe. This helps you map your Segment events to Adobe `events`, and Segment properties to Adobe `eVars` or `props`, since you'll have to do this in both the Segment settings UI and your Adobe Mobile Services dashboard.

## Sending Events

You can map Segment events in your `Events V2` settings to any event variable you already defined in your Adobe Analytics Mobile Services dashboard.

> warning ""
> **Note**: Do not use the deprecated `Events` settings. These no longer forward events to Adobe.

Here's an example of how you might map Segment events to Adobe Analytics events connected in device mode:

![](/docs/connections/destinations/catalog/adobe-analytics/images/eventsV2.png)

Here's an example of how you would implement the same mapping in Adobe's Mobile Services Dashboard:

![](/docs/connections/destinations/catalog/adobe-analytics/images/map-event-adobe.png)

## Sending Custom Properties

You can use the `Context Data Variables` settings to map Segment `properties` to any context data variable defined in your Adobe Analytics Mobile Services dashboard. This includes both Adobe `props` and `eVars`. You can see a list of the Adobe variable types in your Adobe Mobile Services dashboard.

![](/docs/connections/destinations/catalog/adobe-analytics/images/map-property-segment.png)

Here's an example of how you would implement the same mapping in Adobe's Mobile Services Dashboard:

![](/docs/connections/destinations/catalog/adobe-analytics/images/map-property-adobe.png)


<table>
  <tr>
    <td>**Segment Payload Field**</td>
    <td>**iOS Mapping Notation**</td>
    <td>**Android Mapping Notation**</td>
  </tr>
  <tr>
    <td>`anonymousId`</td>
    <td>`anonymousId`</td>
    <td>`.anonymousId`</td>
  </tr>
  <tr>
    <td>`messageId`</td>
    <td>`messageId`</td>
    <td>`.messageId`</td>
  </tr>
  <tr>
    <td>`event`<br>`.track()` calls only</td>
    <td>`event`</td>
    <td>`.event`</td>
  </tr>
  <tr>
    <td>`name`<br>`screen()` calls only</td>
    <td>`name`</td>
    <td>`.name`</td>
  </tr>
  <tr>
    <td>`context.traits.key`</td>
    <td>`traits.key`</td>
    <td>`.context.traits.key`</td>
  </tr>
  <tr>
    <td>`context.key`</td>
    <td>`key`</td>
    <td>`.context.key`</td>
  </tr>
  <tr>
    <td>`context.arrayKey.key`<br>ie. `context.device.id`</td>
    <td>`arrayKey.key`<br>ie. `device.id`</td>
    <td>`.context.arrayKey.key`</td>
  </tr>
  <tr>
    <td>`properties.key`</td>
    <td>`key`</td>
    <td>`key`</td>
  </tr>
</table>

## Adobe Lifecycle events

Segment implements Adobe Lifecycle Events automatically - you don't have to enable any additional settings! Lifecycle events gather important information such as app launches, crashes, session length, and more. See the [list of all Adobe lifecycle metrics and dimensions](https://marketing.adobe.com/resources/help/en_US/mobile/android/metrics.html) to learn more.

## Identify on Mobile

When you make an Identify call, Segment sets the Adobe `visitorId` to the value of the user's Segment `userId`. The snippets below show what Segment does with this information, for iOS and Android.

{% codeexample %}
{% codeexampletab Identify on Android %}

```java
Config.setUserIdentifier("123");
```
{% endcodeexampletab %}

{% codeexampletab Identify on iOS %}

```objc
[ADBMobile setUserIdentifier:@"123"];
```
{% endcodeexampletab %}
{% endcodeexample %}

## Screen on Mobile

When you call `screen`, Segment sends an Adobe `trackState` event, and passes the screen name and any properties you mapped to Adobe, as context data values.

The snippets below show what Segment does with this information, for iOS and Android.

{% codeexample %}
{% codeexampletab Screen on Android %}
```java
Analytics.trackState("Home Screen", <properties mapped in contextData>);
```
{% endcodeexampletab %}
{% codeexampletab Screen on iOS %}

```objc
[self.ADBMobile trackState:@"Home Screen" data:<properties mapped in contextData>];
```
{% endcodeexampletab %}
{% endcodeexample %}


## Track on Mobile

When you call `track`, Segment sends an Adobe `trackAction` event, and passes your event name and any properties you mapped to Adobe, as context data values.
The snippets below show what Segment does with this information, for iOS and Android.

{% codeexample %}
{% codeexampletab Track on Android %}

```java
Analytics.trackEvent("Clicked A Button", <properties mapped in contextData>);
```
{% endcodeexampletab %}
{% codeexampletab Track on iOS %}

```objc
[ADBMobile trackAction:@"Clicked A Button" data:<properties mapped in contextData>];
```
{% endcodeexampletab %}
{% endcodeexample %}


## Reset on Mobile

Calling `reset` sets the user's `visitorId` to  `null`. `null` is Adobe's default `visitorId` value until you explicitly set it (by calling `identify`). The snippets below show what Segment does in the background.

{% codeexample %}
{% codeexampletab Reset on Android %}
```java
Config.setUserIdentifier(null);
```
{% endcodeexampletab %}
{% codeexampletab Reset on iOS %}

```objc
[ADBMobile trackingClearCurrentBeacon];
```
{% endcodeexampletab %}
{% endcodeexample %}



## Flush on Mobile

Calling `flush` immediately sends all locally queued events to Adobe. The snippets below show what Segment sends on Android and iOS.

{% codeexample %}
{% codeexampletab Flush on Android %}
```java
Analytics.sendQueuedHits();
```
{% endcodeexampletab %}
{% codeexampletab Flush on iOS %}

And on iOS:

```objc
[ADBMobile trackingSendQueuedHits];
```
{% endcodeexampletab %}
{% endcodeexample %}
