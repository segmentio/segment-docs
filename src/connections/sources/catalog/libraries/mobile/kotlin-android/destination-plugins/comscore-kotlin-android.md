---
title: Analytics Kotlin comScore Plugin
strat: kotlin-android
---

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "comScore" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the Destination Settings, add the **c2 ID**. You can find your c2 option when you enter your domain and press `Get Tag at` comScore Direct. The c2 option is on line 4 of the Tag Code.

## Adding the dependency

To install the Segment-comScore integration, simply add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:comscore:<latest_version>'
```

Or the following for Kotlin DSL

```
implementation('com.segment.analytics.kotlin.destinations:comscore:<latest_version>')
```


## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library.  Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.comscore
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = ComscoreDestination())
```

Your events will now begin to flow to comScore in device mode.

## Identify

Calling `identify` with comScore enabled sets the user attributes provided as `labels`, and passes that information to comScore. With the mobile destination, Segment maps the `identify` event to comScore’s `setPersistentLabelWithName`. 

## Track

Calling `track` on events sets the properties of that track call as hidden values in comScore to enhance your reports. With the mobile destination, Segment maps the `track` event to comScore’s `notifyHiddenEventWithLabels`.

## Screen

Calling `screen` on mobile attributes the `name`, `category` and `properties` on that call to be used in the comScore tool. With the mobile destination, Segment maps the `screen` event to comScore’s `notifyViewEventWithLabels`. 

## Flush

Calling `flush` will clear the offline cache with comScore’s `flushOfflineCache` method.

## Video Streaming

> info ""
> The video tracking functionality is in beta for **mobile only**, and requires version 3.0.0 of the `Segment-comScore` SDK. If you have feedback on or questions about this beta feature, [contact Support](https://segment.com/help/contact).

To get started tracking video content through Segment, make sure you are using a media player that has an API which allows you to detect the player state. Refer to the [Video Spec](/docs/connections/spec/video/) and implement video tracking as outlined there. Segment map the semantic events to comScore's relevant methods.

### Playback Events

When you call `Video Playback Started`, Segment initializes an instance of the comScore streamingAnalytics class with `[streamingAnalytics createPlaybackSession];`. **It is essential that this event is called in order to continue tracking through comScore's Streaming Tag**.

From there Segment maps to the relevant events on the instance as outlined below:

| comScore Spec       | Segment Video Spec                |
| ------------------- | --------------------------------- |
| `notifyPause`       | `Video Playback Paused`           |
| `notifyBufferStart` | `Video Playback Buffer Started`   |
| `notifyBufferStop`  | `Video Playback Buffer Completed` |
| `notifySeekStart`   | `Video Playback Seek Started`     |
| `notifyPlay`        | `Video Playback Seek Completed`   |
| `notifyPlay`        | `Video Playback Resumed`          |

If the `properties.position` is passed in, Segment calls the above methods with the play position.

**Playback Properties (Labels)**

For each playback event, Segment sets the following asset labels translated from the video spec to comScore:

| comScore Label | Segment Property |
| -------------- | ---------------- |
| `ns_st_ci`     | `asset_ids(s)`   |
| `ns_st_mp`     | `video_player`   |
| `ns_st_vo`     | `sound`          |
| `ns_st_ws`     | `full_screen`    |
| `ns_st_br`     | `bitrate`        |

Note that iOS and Android expect different casing. Segment expects `snake_case` for iOS and `camelCase` for Android.

### Content Events

| comScore Spec            | Segment Video Spec        |
| ------------------------ | ------------------------- |
| `notifyPlay`             | `Video Content Started `  |
| `notifyPlayWithPosition` | `Video Content Playing `  |
| `notifyEnd`              | `Video Content Completed` |

If the `properties.position` is passed in, Segment calls the above methods with the play position.

**Content Properties (Labels)**

| comScore Label | Segment Property |
| -------------- | ---------------- |
| `ns_st_ci`     | `asset_id`       |
| `ns_st_pn`     | `pod_id`         |
| `ns_st_ep`     | `title`          |
| `ns_st_sn`     | `season`         |
| `ns_st_en`     | `episode`        |
| `ns_st_ge`     | `genre`          |
| `ns_st_pr`     | `program`        |
| `ns_st_pu`     | `publisher`      |
| `ns_st_st`     | `channel`        |
| `ns_st_ce`     | `full_episode`   |

Note that iOS and Android expect different casing. Segment expects `snake_case` for iOS and `camelCase` for Android.

### Ad Events

| comScore Spec            | Segment Video Spec   |
| ------------------------ | -------------------- |
| `notifyPlay`             | `Video Ad Started `  |
| `notifyPlayWithPosition` | `Video Ad Playing `  |
| `notifyEnd`              | `Video Ad Completed` |


| comScore Label | Segment Property |
| -------------- | ---------------- |
| `ns_st_ami`    | `asset_id`       |
| `ns_st_ad`     | `type`           |
| `ns_st_amt`    | `title`          |
| `ns_st_pu`     | `publisher`      |
| `ns_st_cl`     | `total_length`   |

Note that iOS and Android expect different casing. Segment expects `snake_case` for iOS and `camelCase` for Android.


## Additional Video Destinations Specific Options

Example for Android:

```java
Map<String, Object> comScoreOptions = new LinkedHashMap<>();
comScoreOptions.put("c3", "c3 value");
comScoreOptions.put("c4", "c4 value");
comScoreOptions.put("c6", "c6 value");

Analytics.with(context).track("Video Playback Started", new Properties(), new Options().setIntegrationOptions("comScore", comScoreOptions));
```

### Video Metrix Dictionary Classification
Represented with the labels `c3`, `c4`, `c6`, these labels determine which entity the clip will credit to in the Video Metrix dictionary. Segment allows you to pass values for these labels as a destination-specific option, since these values will.

These are required fields, so all three of these labels must always be passed. Unused labels must still be passed with the literal string value `*null`. These values should ONLY appear as part of the video destination, they should not appear or be set in the general mobile destination.

### Airdates

Only mapped on content events. ComScore has two definitions for Airdates: TV Airdate and Digital Airdate.This airdate helps comScore establish monetization windows (live, day +1, day +3, ...) for any given episode or show. The monetization windows are used to calculate commercial and program ratings. Each expects a value in **yyyy-mm-dd** format.

Segment allows you to pass in one or the other and map to comScore's labels for each.

`tvAirdate` : TV Airdate. The date on which the content aired on TV.

`digitalAirdate` : Digital Airdate. The date on which the content aired digitally.

### Classification Type

Classification types are how comScore differentiates between an Ad and Content. Segment allows you to pass in a value for the classification type in two ways:

#### Ad Classification Type

You can pass in a value for `adClassificationType` as an integration specific option. Segment defaults to value `va00` on all Ad related video tracking events. The values you may dynamically pass in are described by comScore below.

**LINEAR - VIDEO ON DEMAND**
Linear advertisements delivered into a media player and presented before, in the middle of, or after video content is consumed by the user. The advertisement completely takes over the full view of the media player.

|                  | video + audio |
| ---------------- | ------------- |
| Linear Pre-Roll  | va11          |
| Linear Mid-Roll  | va12          |
| Linear Post-Roll | va13          |


**LINEAR - LIVE**
Linear advertisements delivered before, in the middle of, or after a live stream of content. The advertisement completely takes over the full view of the media player.

|             | video + audio |
| ----------- | ------------- |
| Linear Live | va21          |


**BRANDED ENTERTAINMENT**
Media that a user may intentionally view (like content), or it may be served to a user during an ad break (like an advertisement).

|                         | video + audio |
| ----------------------- | ------------- |
| During Linear Pre-Roll  | va31          |
| During Linear Mid-Roll  | va32          |
| During Linear Post-Roll | va33          |
| As Content              | va34          |
| During Live Streaming   | va35          |



#### Content Classification Type

You can pass in a value for `contentClassificationType` as a destination-specific option. Segment defaults to value `vc00` on all Content related video tracking events. The values you may dynamically pass in are described by comScore below.

**PREMIUM**
Content with strong brand equity or brand recognition. Premium content is usually created or produced by media and entertainment companies using professional-grade equipment, talent, and production crews that hold or maintain the rights for distribution and syndication.

|                            | video + audio |
| -------------------------- | ------------- |
| Short Form Video On Demand | vc11          |
| Long Form Video On Demand  | vc12          |
| Live Streaming             | vc13          |

**USER-GENERATED**
Content with little-to-no brand equity or brand recognition. User-generated content (UGC) has minimal production value, and is uploaded to the Internet by non-media professionals.

|                            | video + audio |
| -------------------------- | ------------- |
| Short Form Video On Demand | vc21          |
| Long Form Video On Demand  | vc22          |
| Live Streaming             | vc23          |


**BUMPERS**
Bumpers - also known as billboards or slates - are static promotional items which usually run before content and usually last less than 5 seconds.

|         | video + audio |
| ------- | ------------- |
| Bumpers | vc99          |


## FAQ

### How does comScore determine platform type?
The SDK auto-collects the internal device names, which comScore maps to their reportable Platforms seen broken out in your comScore Direct dashboard.

### How does comScore determine unique devices?
The comScore SDK will collect unique device id's under the hood, so based on this there is some filtering that can happen here. IN order to see a number for this metric, you need to select a Geography, Client ID, and Platform in the comScore dashboard. The *All* option will not produce a unique device.

### How does comScore determine the application name?
Used in the classification from comScore's Audience reporting, comScore retrieves the application name from your app's Info.plist application bundle name as returned by `CFBundleName`.  If you want to override the automatically retrieved value, you can provide a string with your preferred app name.

### How does comScore work with ProGuard?
If you are using `minifyEnabled` in your build, you would need to add the following to your proguard-project.txt file.

```
-keep class com.comscore.** { *; }
-dontwarn com.comscore.**
```

The comScore library uses static classes and the code is already optimized. These setting inform ProGuard to add the library as-is.

