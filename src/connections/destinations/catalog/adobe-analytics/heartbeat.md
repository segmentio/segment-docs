---
title: Setting up Adobe Analytics Heartbeat
strat: adobe
---

Adobe Heartbeat is an Adobe Analytics add-on that allows you to collect video analytics data from [mobile applications, and JavaScript or website sources](https://marketing.adobe.com/resources/help/en_US/sc/appmeasurement/hbvideo/).

> info ""
> At this time, Adobe Heartbeat is only available for events sent using [device mode](/docs/connections/destinations/#connection-modes).

Before you start, complete these required steps.

First, connect your Adobe Heartbeat Server URL to Segment:
1. Find your Adobe Analytics Heartbeat Tracking Server URL and copy it. If you don't know where to find your Heartbeat Tracking Server URL, contact your Adobe representative.
2. Log in to your Segment workspace, and go to the Adobe Analytics settings.
   If you have multiple sources sending to Adobe Analytics, click the one that you'll be using with Adobe Heartbeat. If you'll be using Heartbeat with more than one source, repeat these steps for each source.
3. Open the **Heartbeat Tracking Server URL** setting, and paste your server URL in the field. Click Save.

**Note**: If you don't specify a Heartbeat Tracking Server URL, Segment can't send your video events to Adobe Heartbeat.

Next, enable Adobe's VisitorID service in your Adobe account. You must do this to track Heartbeat data. See Adobe's documentation for more on enabling the VisitorID service.

## Set Up Steps for Mobile

For Android:

1. If you haven't done so already, go to the Adobe Mobile Services UI and follow [these steps](https://docs.adobe.com/content/help/en/mobile-services/android/getting-started-android/requirements.html#section_044C17DF82BC4FD8A3E409C456CE9A46) to download the core `adobeMobileLibrary` and configure in your Android project. Add the `ABDMobileConfig.json` to your project from the downloaded SDK.
2. Download the latest version of the `MediaSDK.jar` file and [include it in your Android project using Adobe's documentation steps](https://docs.adobe.com/content/help/en/media-analytics/using/sdk-implement/setup/set-up-android.html).
3. Follow the [remaining set up steps](https://docs.adobe.com/content/help/en/media-analytics/using/sdk-implement/setup/set-up-android.html) to complete the installation.

For iOS: The Adobe Heartbeat SDK is already included with the Segment-Adobe-Analytics SDK when you add a Heartbeat Tracking Server URL. Ensure you have added the `ABDMobileConfig.json` for your iOS project from the Adobe Mobile Services UI.

## Set Up Steps for Web

The Adobe Heartbeat JS SDK is automatically included with the Segment-Adobe-Analytics integration when you add a Heartbeat Tracking Server URL.

Segment will map your video events to the Adobe methods as outlined below. In order to record video heartbeats to Adobe accurately on web, Adobe's SDK requires a playhead update **at least once per second** for main content. The "Video Content Playing" event updates the playhead using the `position` property. If you do not want to trigger this event every second, you can alternatively set the playhead to the window. This can be done by setting `window._segHBPlayheads` to the key-value pair of the current content's `session_id` and `position`:

```javascript
window._segHBPlayheads = { <session_id>: <position> }
```

The Segment-Adobe-Analytics integration will pick up the playhead(s) you set to `window._segHBPlayheads` and pass this to Adobe's SDK.



## Configure the MediaHeartbeat Instance

Segment instantiates a `MediaHeartbeat` object to track video data, but you need more information about each video session to make sure Segment configures the instance properly.

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
[[SEGAnalytics sharedAnalytics] track:@"Video Playback Started"
  properties:@{}
  options:@{ @"integrations": @{
                @"Adobe Analytics" : @{
                    @"ovp_name": @"ovp name",
                    @"debug" : @YES
                  }
              },
              @"context":@{}}];
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

Adobe Analytics supports many - but not all - of the [Segment Video Spec events](/docs/connections/spec/video/), however **some events required for Adobe Analytics are not included as part of Segment's standard video tracking**, so read the documentation closely. The list below shows supported events and the corresponding Adobe method(s) they trigger. The next section explains the function of each event in more detail, and lists any required properties.

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
    <td>`trackComplete`<br>`trackSessionEnd`</td>
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
    <td>`trackEvent(chapterComplete)`</td>
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

On web, multiple video sessions can be open at once so video events must have a `session_id` property unique to the session the content belongs to. If a `session_id` is not included, Segment will send `default` as the [s:event:sid](https://experienceleague.adobe.com/docs/media-analytics/using/sdk-implement/validation/heartbeat-params.html?lang=en) and Adobe will create a new session. For more information on `session_id`, please visit [Segment's Video Spec](/docs/connections/spec/video/#playback).

### Video Playback Started

"Video Playback Started" is required to begin a new video session. This event **must** include the appropriate properties and options to configure the `MediaHeartbeat` instance for this video session. Although all the properties and options listed below are also **required**, you can also send additional standard and custom video properties with this event. See the [Custom Video Metadata section below](#custom-video-metadata).

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
    <td>The title of the video.</td>
  </tr>
  <tr>
    <td>`properties.contentAssetId`</td>
    <td>The unique id for the video.</td>
  </tr>
  <tr>
    <td>`properties.totalLength`</td>
    <td>The total length in seconds of the video.</td>
  </tr>
  <tr>
    <td>`properties.livestream`</td>
    <td>Whether the video is a livestream (boolean).</td>
  </tr>
  <tr>
    <td>`properties.session_id`</td>
    <td>The unique id for the session. Required for web.</td>
  </tr>
  <tr>
    <td>`options.ovp`</td>
    <td>Name of the online video platform through which content gets distributed.</td>
  </tr>
</table>

### Video Playback Completed

This Segment event triggers an Adobe `trackSessionEnd()` event. On web, you must include a `session_id` property to tie this event to the correct video session. Any other properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

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
  <tr>
    <td>`properties.session_id`</td>
    <td>The unique id for the session. Required for web.</td>
  </tr>
</table>

### Video Content Completed

This Segment event triggers an Adobe `trackEvent(chapterComplete)` event and a `trackComplete()` event. On web, you must include a `session_id` property to tie this event to the correct video session. Any other properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Paused

This Segment event triggers an Adobe `trackPause()` event. On web, you must include a `session_id` property to tie this event to the correct video session. Any other properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Resumed

This Segment event triggers an Adobe `trackPlay()` event. On web, you must include a `session_id` property to tie this event to the correct video session. Any other properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Buffer Started

This Segment event triggers an Adobe `trackEvent(bufferStart)` event. On web, you must include a `session_id` property to tie this event to the correct video session. Any other properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Buffer Completed

This Segment event triggers an Adobe `trackEvent(bufferComplete)` event. On web, you must include a `session_id` property to tie this event to the correct video session. Any other properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Seek Started

This Segment event triggers an Adobe `trackEvent(seekStart)` event. On web, you must include a `session_id` property to tie this event to the correct video session. Any other properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

### Video Playback Seek Completed

This Segment event triggers an Adobe `trackEvent(seekComplete)` event. On web, you must include a `session_id` property to tie this event to the correct video session. To reconcile the new playhead position, you **must** also pass the position as `seekPosition`.

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
<tr>
  <td>`properties.session_id`</td>
  <td>The unique id for the session. Required for web.</td>
</tr>
</table>

### Video Ad Break Completed

This Segment event triggers an Adobe `trackEvent(adBreakComplete)` event. On web, you must include a `session_id` property to tie this event to the correct video session. Any other properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

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
  <tr>
    <td>`properties.session_id`</td>
    <td>The unique id for the session. Required for web.</td>
  </tr>
</table>

#### Video Ad Completed

This Segment event triggers an Adobe `trackEvent(adComplete)` event. On web, you must include a `session_id` property to tie this event to the correct video session. Any other properties passed to this event are not forwarded to Adobe (but are sent to other downstream destinations that support video events).

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
  <tr>
    <td>`properties.session_id` _Required for web. Defaults to `default` if missing._</td>
  </tr>
</table>

## Standard Video Metadata

Segment maps the following [Segment-spec properties](/docs/connections/spec/) to Adobe constants. Note you don't need to set up standard video properties in your Adobe dashboard as with `contextData` values.

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

At the moment, Segment only passes `publisher` as standard ad metadata. Segment maps this property to Adobe constant `MediaHeartbeat.AdMetadataKeys.ADVERTISER`.

## Custom Video Metadata

You can send custom metadata with any video event that accepts metadata. To send Custom Video Metadata, map the values you want to send in the **Context Data Variable mappings** setting in the Adobe Destination settings in the Segment web app.

> warning ""
> You do not need to map _standard_ video or ad metadata in your Adobe dashboard, you **must** set up all _custom_ video and ad metadata in Adobe before sending it. Adobe discards any metadata it receives that does not have a mapping.

### Custom Video Metadata Formatting

For custom Context Data Variables, including custom video metadata, use the following notation when mapping your Segment payload properties. The formatting for these mapings is different for iOS and Android components, so read the documentation below carefully.

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

## Troubleshooting and Logging Heartbeat

For Android, Segment sets verbose Adobe Heartbeat logging if you pass `VERBOSE` as your Analytics log level when initializing Segment.

On iOS, pass in an integration specific option `debug: @YES` on `Video Playback Started` events so you can initialize the heartbeat with debugging enabled.
