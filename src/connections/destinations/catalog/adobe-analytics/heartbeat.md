---
title: Setting up Adobe Analytics Heartbeat
strat: adobe
---

Adobe Heartbeat is an Adobe Analytics add-on that allows you to collect video analytics data from [mobile applications, and Javascript or website sources](https://marketing.adobe.com/resources/help/en_US/sc/appmeasurement/hbvideo/). At this time, Adobe Heartbeat is only available for events sent device mode.

Before you start, complete these required steps.

First, connect your Adobe heartbeat server URL to Segment:
1. Find your Adobe Analytics heartbeat tracking server URL and copy it.
2. Log in to your Segment workspace, and go to the Adobe Analytics settings.
   If you have multiple sources sending to Adobe Analytics, click the one that you'll be using with Adobe Heartbeat. If you'll be using Heartbeat with more than one source, repeat these steps for each source.
3. Open the **Heartbeat Tracking Server URL** setting, and paste your server URL in the field. Click Save.

**Note**: If you don't specify a tracking server URL, Segment can't send your video events to Adobe Analytics.

Next, enable Adobe's VisitorID service in your Adobe account. You must do this to track Heartbeat data. See Adobe's documentation for more on enabling the VisitorID service.

## Set up steps for mobile

Then, set up your mobile libraries:

For Android:

- Download the latest version of the `AdobeHeartbeat.jar` file and include it in your Android project, as outlined in [Adobe's documentation here](https://marketing.adobe.com/resources/help/en_US/sc/appmeasurement/hbvideo/android_2.0/c_vhl_download_android_sdk.html).
- Follow the remaining set up steps [outlined here](https://marketing.adobe.com/resources/help/en_US/sc/appmeasurement/hbvideo/android_2.0/r_vhl_getting-started-android.html).

For iOS: the Adobe Heartbeat SDK is already included with the Segment-Adobe-Analytics SDK.



## Configure the MediaHeartbeat Instance

Segment instantiates a `MediaHeartbeat` object to track video data, but you need more information about each video session to make sure we configure the instance properly.

A "Video Playback Started" begins a new video session and destroys any existing MediaHeartbeat instances. This means that you can only track one video session at a time.

The following fields are required in order to initialize the MediaHeartbeat instance:


| Field | Description |
| ------------ | ------------ |
| `SSL` | Segment UI setting that allows you to choose whether to track data using SSL. Defaults to `false`. |
| `appVersion` | Auto-collected from your SDK. Defaults to "unknown". |
| `properties.channel` | Must be passed as a property on a "Video Playback Started" event. Sets the "channel" configuration property. Defaults to an empty string. |
| `properties.playerName` | Must be passed as a property on a "Video Playback Started" event. Sets the "playerName" configuration property. Defaults to "unknown". |
| `options.ovpName` | Must be passed as an Adobe Analytics integration-specific option. Sets the "ovp" configuration property. Defaults to "unknown". |

The following example shows how to set an integration-specific option on Android:

```java
Map<String, Object> options = new HashMap<>();
        options.put("ovp", "ovpName");

Analytics.with(this).track("Video Playback Started",
        null,
        new Options()
          .setIntegrationOptions("Adobe Analytics", options));
```

The following example shows how to set an integration-specific option on iOS:

```objc
options:@{
  @"integrations": @{
   @"Adobe Analytics" : @{
     @"ovp_name": @"ovp name",
     @"debug" : @YES
    }
  }
}
```

## Supported Video Events

Adobe Analytics supports many - but not all - of our [specced video events](/docs/connections/spec/video/). Note, too, that **some events required for Adobe Analytics are not specced as part of Segment's standard video tracking**, so read the documentation closely. The list below includes supported events, as well as the corresponding Adobe method(s) triggered. In the next section, we go into more detail on the functionality of each event, as well as list any required properties:

<table>
  <tr>
    <td>**Segment Event Name**</td>
    <td>**Adobe Analytics Method(s) Triggered**</td>
  </tr>
  <tr>
    <td>Video Playback Started</td>
    <td>`trackSessionStart`</td>
  </tr>
  <tr>
    <td>Video Playback Paused</td>
    <td>`trackPause`</td>
  </tr>
  <tr>
    <td>Video Playback Resumed</td>
    <td>`trackPlay`</td>
  </tr>
  <tr>
    <td>Video Playback Buffer Started</td>
    <td>`trackEvent(bufferStart)`</td>
  </tr>
  <tr>
    <td>Video Playback Buffer Completed</td>
    <td>`trackEvent(bufferComplete)`</td>
  </tr>
  <tr>
    <td>Video Playback Seek Started</td>
    <td>`trackEvent(seekStart)`</td>
  </tr>
  <tr>
    <td>Video Playback Seek Completed</td>
    <td>`trackEvent(seekComplete)`</td>
  </tr>
  <tr>
    <td>Video Playback Completed</td>
    <td>`trackSessionEnd`</td>
  </tr>
  <tr>
    <td>Video Playback Interrupted</td>
    <td>Pauses video playhead.</td>
  </tr>
  <tr>
    <td>Video Quality Updated</td>
    <td>Sends quality of service information to Adobe.</td>
  </tr>
  <tr>
    <td>Video Content Started</td>
    <td>`trackPlay`<br>`trackEvent(chapterStart)`</td>
  </tr>
  <tr>
    <td>Video Content Completed</td>
    <td>`trackEvent(chapterComplete)`<br>`trackComplete`</td>
  </tr>
  <tr>
    <td>Video Ad Break Started</td>
    <td>`trackEvent(adBreakStart)`</td>
  </tr>
  <tr>
    <td>Video Ad Break Completed</td>
    <td>`trackEvent(adBreakComplete)`</td>
  </tr>
  <tr>
    <td>Video Ad Started</td>
    <td>`trackEvent(adStart)`</td>
  </tr>
  <tr>
    <td>Video Ad Skipped</td>
    <td>`trackEvent(adSkip)`</td>
  </tr>
  <tr>
    <td>Video Ad Completed</td>
    <td>`trackEvent(adComplete)`</td>
  </tr>
</table>

### Video Playback Started

"Video Playback Started" is required to begin a new video session. This event **must** include the appropriate properties and options to configure the `MediaHeartbeat` instance for this video session. Although all the properties and options listed below are also **required**, you may send additional standard and custom video properties with this event.

<table>
  <tr>
    <td>**Segment Field**</td>
    <td>**Description**</td>
  </tr>
  <tr>
    <td>`properties.channel`</td>
    <td>Distribution station/channels or where the content is played.</td>
  </tr>
  <tr>
    <td>`properties.playerName`</td>
    <td>Name of the player responsible for rendering the ad.</td>
  </tr>
  <tr>
    <td>`properties.title`</td>
    <td>The title of the video session.</td>
  </tr>
  <tr>
    <td>`properties.contentAssetId`</td>
    <td>The unique id for the video session.</td>
  </tr>
  <tr>
    <td>`properties.totalLength`</td>
    <td>The total length in seconds of the video session.</td>
  </tr>
  <tr>
    <td>`properties.livestream`</td>
    <td>Whether the session is a livestream (boolean).</td>
  </tr>
  <tr>
    <td>`options.ovp`</td>
    <td>Name of the online video platform through which content gets distributed.</td>
  </tr>
</table>

### Video Playback Completed

This Segment event triggers an Adobe `trackSessionEnd()` event. You do not need to pass any properties along with this event. Properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Content Started

"Video Content Started" begins a new video chapter, or what is a content segment. This event **must** include the the following properties to configure a chapter `MediaObject`. You may also send additional standard and custom video properties with this event.

<table>
  <tr>
    <td>**Segment Field**</td>
    <td>**Description**</td>
  </tr>
  <tr>
    <td>`properties.title`</td>
    <td>The title of the current chapter.</td>
  </tr>
  <tr>
    <td>`properties.indexPosition`</td>
    <td>The index position, starting with 0, of the content in relation to the video session.(int)</td>
  </tr>
  <tr>
    <td>`properties.totalLength`</td>
    <td>The total length of the chapter in seconds.</td>
  </tr>
  <tr>
    <td>`properties.startTime`</td>
    <td>The position of the video playhead in seconds when the chapter starts playing.</td>
  </tr>
</table>

### Video Content Completed

This Segment event triggers an Adobe `trackEvent(chapterComplete)` event and a `trackComplete()` event. You do not need to pass any properties along with this event. Properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Paused

This Segment event triggers an Adobe `trackPause()` event. You do not need to pass any properties along with this event. Properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Resumed

This Segment event triggers an Adobe `trackPlay()` event. You do not need to pass any properties along with this event. Properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Buffer Started

This Segment event triggers an Adobe `trackEvent(bufferStart)` event. You do not need to pass any properties along with this event. Properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Buffer Completed

This Segment event triggers an Adobe `trackEvent(bufferComplete)` event. You do not need to pass any properties along with this event. Properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Seek Started

This Segment event triggers an Adobe `trackEvent(seekStart)` event. You do not need to pass any properties along with this event. Properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Seek Completed

This Segment event triggers an Adobe `trackEvent(seekComplete)` event. To reconcile the new playhead position, you **must** pass this value as `seekPosition`.

<table>
  <tr>
    <td>**Segment Field**</td>
    <td>**Description**</td>
  </tr>
  <tr>
    <td>`properties.seekPosition`</td>
    <td>The new position of the playhead in seconds.</td>
  </tr>
</table>

### Video Ad Break Started

This Segment event triggers an Adobe `trackEvent(adBreakStart)` event. This event **must** include the following properties to configure an ad break `MediaObject`. You may also send additional standard and custom video properties with this event.

<table>
<tr>
  <td>**Segment Field**</td>
  <td>**Description**</td>
</tr>
<tr>
  <td>`properties.title`</td>
  <td>The title of the current chapter.</td>
</tr>
<tr>
  <td>`properties.indexPosition`</td>
  <td>The index position of the content, starting with 0, in relation to the video session. (int)</td>
</tr>
<tr>
  <td>`properties.startTime`</td>
  <td>The position of the video playhead in seconds when the chapter starts playing.</td>
</tr>
</table>

### Video Ad Break Completed

This Segment event triggers an Adobe `trackEvent(adBreakComplete)` event. You do not need to pass any properties along with this event. Properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Ad Started

This Segment event triggers an Adobe `trackEvent(adStart)` event. This event **must** include the following properties to configure an ad break `MediaObject`. You may also send additional standard and custom video properties with this event.

<table>
  <tr>
    <td>**Segment Field**</td>
    <td>**Description**</td>
  </tr>
  <tr>
    <td>`properties.title`</td>
    <td>The title of the current ad.</td>
  </tr>
  <tr>
    <td>`properties.assetId`</td>
    <td>The asset id of the current ad.</td>
  </tr>
  <tr>
    <td>`properties.indexPosition`</td>
    <td>The index position of the content, starting with 0, in relation to the ad break session. (int)</td>
  </tr>
  <tr>
    <td>`properties.totalLength`</td>
    <td>The total length of the ad in seconds.</td>
  </tr>
</table>

#### Video Ad Completed

This Segment event triggers an Adobe `trackEvent(adComplete)` event. You do not need to pass any properties along with this event. Properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Quality Updated

This event is required to set quality of service information in the `MediaHeartbeat` delegate. To do so, fire this event with the following properties. All properties not set default to 0.

<table>
  <tr>
    <td>`properties.bitrate`</td>
  </tr>
  <tr>
    <td>`properties.startupTime`</td>
  </tr>
  <tr>
    <td>`properties.framerate`</td>
  </tr>
  <tr>
    <td>`properties.droppedFrames`</td>
  </tr>
</table>

## Standard Video Metadata

We map the following Segment-specced properties to Adobe constants. Note you don't need to set up standard video properties in your Adobe dashboard as with `contextData` values.

<table>
  <tr>
    <td>**Segment Property**</td>
    <td>**Adobe Constant**</td>
  </tr>
  <tr>
    <td>assetId</td>
    <td>`MediaHeartbeat.VideoMetadataKeys.ASSET_ID`</td>
  </tr>
  <tr>
    <td>contentAssetId</td>
    <td>`MediaHeartbeat.VideoMetadataKeys.ASSET_ID`</td>
  </tr>
  <tr>
    <td>program</td>
    <td>`MediaHeartbeat.VideoMetadataKeys.SHOW`</td>
  </tr>
  <tr>
    <td>season</td>
    <td>`MediaHeartbeat.VideoMetadataKeys.SEASON`</td>
  </tr>
  <tr>
    <td>episode</td>
    <td>`MediaHeartbeat.VideoMetadataKeys.EPISODE`</td>
  </tr>
  <tr>
    <td>genre</td>
    <td>`MediaHeartbeat.VideoMetadataKeys.GENRE`</td>
  </tr>
  <tr>
    <td>channel</td>
    <td>`MediaHeartbeat.VideoMetadataKeys.NETWORK`</td>
  </tr>
  <tr>
    <td>airdate</td>
    <td>`MediaHeartbeat.VideoMetadataKeys.FIRST_AIR_DATE`</td>
  </tr>
  <tr>
    <td>publisher</td>
    <td>`MediaHeartbeat.VideoMetadataKeys.ORIGINATOR`</td>
  </tr>
  <tr>
    <td>rating</td>
    <td>`MediaHeartbeat.VideoMetadataKeys.RATING`</td>
  </tr>
</table>

## Standard Ad Metadata

At the moment, Segment only passes `publisher` as standard ad metadata. We map this property to Adobe constant `MediaHeartbeat.AdMetadataKeys.ADVERTISER`.

## Custom Video Metadata

You may send any custom metadata you wish along with any video event that accepts metadata. Remember that although you do not need to set up standard video or ad metadata in your Adobe dashboard first, you **must** set up all custom video and ad metadata in Adobe before sending it. Adobe discards all metadata that have not been set up before being received in their system.

## Troubleshooting and Logging Heartbeat

For Android, Segment sets verbose Adobe Heartbeat logging if you pass `VERBOSE` as your Analytics log level when initializing Segment.

On iOS, pass in an integration specific option `debug: @YES` on `Video Playback Started` events so you can initialize the heartbeat with debugging enabled.
