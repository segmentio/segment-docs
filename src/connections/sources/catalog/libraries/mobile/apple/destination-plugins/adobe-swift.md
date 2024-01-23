---
title: Adobe Analytics Destination
strat: adobe
redirect_from: '/connections/destinations/catalog/omniture/'
id: 5783cec280412f644ff14226
---
Once you enable Adobe Analytics (formerly known as Omniture or Sitecatalyst) in Segment, you can start sending data from any of the Segment [libraries](/docs/connections/sources/catalog/) to an Adobe report suite. When you send events from Segment's mobile SDKs or Cloud-mode libraries, Segment translates that data using a mapping that you configure, and then passes it to the Adobe Analytics [Data Insertion API](https://docs.adobe.com/content/help/en/analytics/import/c-data-insertion-api.html){:target="_blank”}.The following documentation provides detailed explanation of the Device-mode functionality. 


## Planning for Adobe Analytics

Adobe Analytics uses a slightly different approach to tracking than Segment, and it's important to understand the difference so you can effectively set up your account. Segment uses a user-action data model, which uses different types of calls to track different activities of a user on a website or app. Adobe Analytics uses page views as the basic unit of activity, and variables like custom traffic variables (also called 'props'), eVars, list variables, and hierarchy variables to add details that allow more nuanced analysis.

For example, a `Welcome Dialog Dismissed` event in Segment (where the action is "dismissed") with properties that contain the user ID (`user123`) and the dialog name `welcome-dialog`, could be modeled in Adobe Analytics as a pageView with variables that represent the dialog name, visitorID, and the event name mapping the user action ("dismissed") to an eVar.

Both Segment and Adobe Analytics have recommended standard data for tracking events. Segment has [the Spec](/docs/connections/spec/), and Adobe uses predefined events. Segment automatically maps incoming event data and some product level properties to Adobe's predefined events, when the event data is in the correct Segment Ecommerce Spec format. Video calls using the format described in this document are also automatically mapped. If you're using the Mobile SDKs, mobile lifecycle events are also automatically mapped. If you will be creating Page and Track events that are outside the scope of the Ecommerce spec, you'll need to map those to your Segment destinations settings UI.

We strongly recommend that you create a tracking plan for both your Segment and Adobe Analytics events before you send any events or properties to Adobe. This will help you map your Segment events to Adobe `events`, and Segment properties to Adobe variables. If you decide to set up Adobe Analytics for mobile, you'll have to do this mapping in both the Segment settings, and the Adobe Mobile Services dashboard - so it's good to keep your options open!

## Setting Up the Adobe Analytics SDK

Before you start sending data from your Swift application to Adobe Analytics, you must first finish the following set up steps:

- First, enable the Segment-Adobe Analytics destination from in your Segment workspace.
- From your Adobe Mobile Services dashboard, check and customize the settings on the "Manage App Settings" tab.
- Download these settings as the `ADBMobileConfig.json` file by clicking the **Config JSON** link at the bottom of the same tab. Follow the instructions in Adobe's documentation [here](https://marketing.adobe.com/resources/help/en_US/mobile/ios/dev_qs.html){:target="_blank”} 
- Finally, follow the instructions below for each mobile environment to bundle Segment's Adobe Analytics SDK in your project.

> success ""
> **Tip**: Mobile implementations use the `ADBMobileConfig.json` file to store the settings that you would otherwise enter in the Adobe Analytics destination settings in the Segment app. You can change these settings from the Manage App Settings tab in your Adobe Mobile Services dashboard, and can download the file from that same tab. This file includes the Report Suite ID, Timestamp Option, Tracking Server Secure URL, Tracking Server URL, and Use Secure URL for Server-side settings.


## Adding the dependency

### through Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repository.

https://github.com/segment-integrations/analytics-swift-adobe-analytics{:target="_blank"}

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### through Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-adobe-analytics.git",
            from: "1.1.3"
        ),
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentAdobe // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: AdobeDestination())
```

## Sending Data to Adobe analytics

Segment strongly recommends that you create a tracking plan for both your Segment and Adobe Analytics events _before_ you send any events or properties to Adobe. This helps you map your Segment events to Adobe `events`, and Segment properties to Adobe `eVars` or `props`, since you'll have to do this in both the Segment settings UI and your Adobe Mobile Services dashboard.

## Sending Events

You can map Segment events in your `Events V2` settings to any event variable you already defined in your Adobe Analytics Mobile Services dashboard.

> warning ""
> **Note**: Do not use the deprecated `Events` settings. These no longer forward events to Adobe.

Here's an example of how you might map Segment events to Adobe Analytics events connected in device mode:

<!--todo: rewrite this so that it doesn't rely on the screenshots to explain how to map events in Segment-->

![A screenshot of the Adobe Analytics settings page in Segment, with the Mappings section selected.](images/eventsV2.png)

Here's an example of how you would implement the same mapping in Adobe's Mobile Services Dashboard:

![A screenshot of the Custom Metrics tab in Adobe's Mobile Services Dashboard, with one custom metric, Clicked a Button, defined.](images/map-event-adobe.png)

## Sending Custom Properties

You can use the `Context Data Variables` settings to map Segment `properties` to any context data variable defined in your Adobe Analytics Mobile Services dashboard. This includes both Adobe `props` and `eVars`. You can see a list of the Adobe variable types in your Adobe Mobile Services dashboard.

![A screenshot of the Adobe Analytics settings page in Segment, with the Mappings section selected.](images/map-property-segment.png)

Here's an example of how you would implement the same mapping in Adobe's Mobile Services Dashboard:

![A screenshot of the Custom Variables tab in Adobe's Mobile Services Dashboard, with one custom variable, Color, defined.](images/map-property-adobe.png)


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

Segment implements Adobe Lifecycle Events automatically - you don't have to enable any additional settings! Lifecycle events gather important information such as app launches, crashes, session length, and more. See the [list of all Adobe lifecycle metrics and dimensions](https://marketing.adobe.com/resources/help/en_US/mobile/android/metrics.html){:target="_blank”} to learn more.

## Identify 

When you make an Identify call, Segment sets the Adobe `visitorId` to the value of the user's Segment `userId`. The snippets below show what Segment does with this information.

{% codeexample %}
{% codeexampletab Identify on iOS %}
```objc
[ADBMobile setUserIdentifier:@"123"];
```
{% endcodeexampletab %}
{% endcodeexample %}

## Screen

When you call `screen`, Segment sends an Adobe `trackState` event, and passes the screen name and any properties you mapped to Adobe, as context data values. The snippets below show what Segment does with this information.

{% codeexample %}
{% codeexampletab Screen on iOS %}

```objc
[self.ADBMobile trackState:@"Home Screen" data:<properties mapped in contextData>];
```
{% endcodeexampletab %}
{% endcodeexample %}


## Track

When you call `track`, Segment sends an Adobe `trackAction` event, and passes your event name and any properties you mapped to Adobe, as context data values.
The snippets below show what Segment does with this information.

{% codeexample %}
{% codeexampletab Track on iOS %}

```objc
[ADBMobile trackAction:@"Clicked A Button" data:<properties mapped in contextData>];
```
{% endcodeexampletab %}
{% endcodeexample %}


## Reset

Calling `reset` sets the user's `visitorId` to  `null`. `null` is Adobe's default `visitorId` value until you explicitly set it (by calling `identify`). The snippets below show what Segment does in the background.

{% codeexample %}
{% codeexampletab Reset on iOS %}

```objc
[ADBMobile trackingClearCurrentBeacon];
```
{% endcodeexampletab %}
{% endcodeexample %}



## Flush

Calling `flush` immediately sends all locally queued events to Adobe. 

{% codeexample %}
{% codeexampletab Flush on iOS %}

And on iOS:

```objc
[ADBMobile trackingSendQueuedHits];
```
{% endcodeexampletab %}
{% endcodeexample %}
