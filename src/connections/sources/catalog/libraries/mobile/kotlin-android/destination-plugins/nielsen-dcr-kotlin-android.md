---
title: Analytics Kotlin Nielsen DCR Plugin
---

Nielsen Digital Content Ratings (DCR) respond to the shifting and complex multi-platform, multi-device, and multi-distribution landscape by providing comprehensive measurement of digital content consumption—including streaming video, static web pages and mobile apps—across all major devices and platforms. The Analytics-Kotlin Nielsen-DCR Plugin](https://github.com/segment-integrations/analytics-kotlin-nielsen-dcr){:target="_blank”} tracks data for [Analytics-Kotlin](https://github.com/segmentio/analytics-kotlin){:target="_blank”}.

## Getting started


To get started with Nielsen-DCR and retrieve an appid to configure this integration, you must complete the following prerequisite steps with Nielsen: 
- Fill out your company info and work with a Nielsen representative.
- Sign a license agreement on the Nielsen engineering portal.
- Sign an NDA to sign prior to accessing the download. 
- Complete a pre-certification process with your Nielsen representative before shipping this implementation to production.

### Adding the dependency
To install the Segment-Nielsen-DCR integration, add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:nielsen-dcr:<latest_version>'
```

Or the following for Kotlin DSL

```
implementation("com.segment.analytics.kotlin.destinations:nielsen-dcr:<latest_version>")
```

Also add the Maven Nielsen Digital SDK repo (since Nielsen doesn’t publish it on Maven Central) inside the repositories section in your project level build.gradle.
```
allprojects {
    repositories {
        mavenCentral()
        maven {
            url 'https://raw.githubusercontent.com/NielsenDigitalSDK/nielsenappsdk-android/master/'
        }
    }
}
```

Or the following for Kotlin DSL
```
allprojects {
    repositories {
        mavenCentral()
        maven {
            url = uri("https://raw.githubusercontent.com/NielsenDigitalSDK/nielsenappsdk-android/master/")
        }
    }
}

```

## Using the plugin in your app

Open the file where you set up and configured the Analytics-Kotlin library.  Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.nielsendcr.NielsenDCRDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = NielsenDCRDestination())
```

Your events contain Nielsen-DCR session data and will now begin to flow to Nielsen-DCR in device-mode.


## Screen / Page

Segment supports translating Screen or Page to Nielsen as a Static App Measurement event. Segment translates the following properties to the expected Nielsen metadata:

| Segment Property Name | Nielsen    | Nielsen Description                     |
| --------------------- | ---------- | --------------------------------------- |
| `type`                | `type`     | Required. Segment hardcodes `'static'`  |
| `name`*               | `section`  | Required. Section of site               |
| integration option    | `segB`     | Required (optional for web). Segment A. |
| integration option    | `segC`     | Required (optional for web). Segment B. |
| integration option    | `crossId1` | Standard episode ID (mobile only)       |

\* On web and mobile, you can map a custom property to `section` using the Custom Page/Screen Section Property Name setting. If this setting is left blank, Segment will fallback on the top-level `name`.

## Track

Segment only supports sending Track events as outlined in the [Video Spec](/docs/connections/spec/video/). To start tracking video content through Segment, use a media player with an API which allows you to detect the player state, like video or ad plays. For example, you cannot collect ad plays using YouTube because their YouTube SDK doesn't expose any hooks into player states during ad plays.

Once you've selected a media player with an API that exposes the player state, configure video tracking using Segment's [Video Spec](/docs/connections/spec/video/) and implement video tracking as in the Spec. After you've configured video tracking according to the Video Spec, Segment maps the semantic events and properties to Nielsen's relevant methods and metadata.

> warning "This integration requires strict adherence to Segment's Video Spec"
> If you do not implement the Segment [Video Spec](/docs/connections/spec/video/) properly with key lifecycle events, you might end up with unexpected behavior.


### Heartbeats

Nielsen expects a heartbeat called with `playheadPosition` during session play every second until the stream is completed, paused or interrupted (due to ad breaks or buffering). The playhead position is the current location in seconds of the playhead from the beginning of the asset. For livestream, Segment expects a negative integer that represents the offset in seconds in relation to the current timestamp. For example, if content is being livestreamed at 8PM but the viewer is 30 seconds behind, the value of this property should be -30. You can override this and pass the current time in seconds to Nielsen by toggling the `Enable Default to Current Time for Livestream Playhead Position` setting.

Segment sets a timer to call this heartbeat event (`–(void) playheadPosition: (long long) playheadPos)`, `setTimeout (web)`) every second in the background. You do **NOT** have to call the Segment equivalent heartbeat event (`Video Content/Ad Playing`) each second. You should follow the recommendations in the Video Spec and call the Segment heartbeat event every 10 seconds. While Nielsen keeps state of its own playhead position for these background heartbeats, when they do receive an explicit Segment heartbeat event the background heartbeats are restarted from that position.

### Playback Events

When you call `Video Playback Started` and `Video Playback Resumed`, Segment calls the Nielsen-DCR `play` method with the relevant `channelInfo`:

```
NSDictionary *channelInfo = @{
                                      // channelName is optional for DCR, if not present Nielsen asks to set default
                                      @"channelName" : options[@"channelName"] ?: @"defaultChannelName",
                                      // if mediaURL is not available, Nielsen expects an empty value
                                      @"mediaURL" : options[@"mediaUrl"] ?: @""
                                      };
(void) play: (id) channelInfo;

```

From there, Segment maps Nielsen events to relevant Segment events as outlined below:

| Nielsen-DCR Spec                           | Segment Video Spec                |
| ------------------------------------------ | --------------------------------- |
| `–(void) stop` and Heartbeat timer stopped | `Video Playback Paused`           |
| `–(void) stop` and Heartbeat timer stopped | `Video Playback Interrupted`      |
| Heartbeat timer stopped                    | `Video Playback Buffer Started`   |
| Heartbeat timer updated                    | `Video Playback Buffer Completed` |
| Heartbeat timer stopped                    | `Video Playback Seek Started`     |
| Heartbeat timer updated                    | `Video Playback Seek Completed`   |
| `-(void) end` and Heartbeat timer stopped  | `Video Playback Completed`        |


For playback events, Segment's Video Spec expects either `ad_asset_id​` or `content_asset_id​` depending on whether the video is an ad or content. Segment defaults to mapping `ad_asset_id` to Nielsen's ad metadata `assetid` and `content_asset_id` to Nielsen's content metadata. The default Segment property can be overridden in your integration settings: `Custom Content Asset Id Property Name` or `Custom Ad Asset Id Property Name`.


### Content Events

| Nielsen-DCR Spec                    | Segment Video Spec        |
| ----------------------------------- | ------------------------- |
| `–(void)loadMetadata:(id)metadata;` | `Video Content Started `  |
| Heartbeat timer updated             | `Video Content Playing `  |
| `–(void) end` and `-(void) stop`    | `Video Content Completed` |

#### Content Properties (Labels)

| Nielsen-DCR metadata | Segment Property        |
| -------------------- | ----------------------- |
| `assetid`            | `asset_id`              |
| `program`            | `program`               |
| `title`              | `title`                 |
| `segB`               | `options.segB`          |
| `segC`               | `options.segC`          |
| `airdate`            | `airdate`               |
| `isfullepisode`      | `full_episode`          |
| `length`             | `total_length`          |
| `pipmode`            | `options.pipmode`       |
| `type`               | `'content'` (hardcoded) |
| `adLoadType`         | `options.adLoadType`    |
| `hasAds`             | `options.hasAds`        |
| `crossId1`           | `options.crossId1`      |
| `crossId2`           | `options.crossId2`      |

`camelCase` is expected for Android.

### Ad Events

The Segment-Nielsen-DCR integration has logic to check for `type` in case of a preroll ad. If the `type` is `preroll`, Segment calls Nielsen's `loadMetadata` method with metadata values for content followed by loadMetadata with ad (preroll) metadata. Otherwise, Segment simply calls `loadMetadata` with the ad metadata.

| Nielsen-DCR Spec                                                | Segment Video Spec   |
| --------------------------------------------------------------- | -------------------- |
| `–(void)loadMetadata:(id)metadata;` and Heartbeat timer started | `Video Ad Started `  |
| Heartbeat timer updated                                         | `Video Ad Playing `  |
| `–(void) stop` and Heartbeat timer stopped                      | `Video Ad Completed` |


| Nielsen-DCR Ad metadata | Segment Property |
| ----------------------- | ---------------- |
| `assetid`               | `asset_id`       |
| `type`                  | `type`           |
| `title`                 | `title`          |

| Nielsen-DCR Ad Content metadata | Segment Property       |
| ------------------------------- | ---------------------- |
| `assetid`                       | `asset_id`             |
| `adloadtype`                    | `options.ad_load_type` |
| `type`                          | `content` (hard coded) |
| `title`                         | `title`                |
| `program`                       | `program`              |
| `segB`                          | `options.segB`         |
| `segC`                          | `options.segC`         |
| `airdate`                       | `airdate`              |
| `isfullepisode`                 | `full_episode`         |
| `length`                        | `total_length`         |
| `pipmode`                       | `options.pipmode`      |


`camelCase` is expected for Android.


#### Integration specific options


#### Pipmode

Current state of picture-in-picture (PIP) mode on device. Pass in `true` if the video measurement is displayed in PIP mode. Otherwise, Segment defaults to `false` if no value is present.

#### Ad load type

Type of ad load. Pass in `dynamic` to indicate Dynamic Ad Insertion (DAI). Otherwise, Segment defaults to linear.

#### Channel Name and Media URL

The SDK is started by calling the play API with the `channelName` and `mediaURL` parameters. If no value is passed in, Segment defaults to `defaultChannelName` for `channelName` and an empty String for `mediaURL`.

#### Cross Id 1

Standard episode ID.

#### Cross Id 2

Content originator ID. This value is only required for distributors.

Example for Android:

```java
Map<String, Object> nielsenOptions = new LinkedHashMap<>();
nielsenOptions.put("pipmode", "c3 value");
nielsenOptions.put("adLoadType", "c4 value");
nielsenOptions.put("channelName", "c6 value");
nielsenOptions.put("mediaUrl", "c6 value");
nielsenOptions.put("hasAds", "true");
nielsenOptions.put("crossId1", "cross id1 value");
nielsenOptions.put("crossId2", "cross id2 value");

Analytics.with(context).track("Video Playback Started", new Properties(), new Options().setIntegrationOptions("nielsen-dcr", nielsenOptions));

```

## FAQ

#### How do you determine App Name?
Segment retrieves the name of the application package from the [PackageManager](https://developer.android.com/reference/android/content/Context.html#getPackageManager()){:target="_blank"}.

#### How do you determine App Version?

Segment-Nielsen-DCR retrieves the application version from your app's `Info.plist` application bundle name as returned by `CFBundleVersion`.

For Android, we retrieve the version of the application package from the [PackageManager](https://developer.android.com/reference/android/content/Context.html#getPackageManager()){:target="_blank"}.

#### What are the Nielsen-DCR `clientId` and `subbrand` values?

The Parent Client ID and Sub-Brand (VCID) values are automatically populated through the AppID, which is Nielsen Supplied. By default, `clientid` and `subbrand` are set up in Nielsen's backend configuration to capture brand and sub-brand information. Nielsen populates the fields from backend for a registered client `appid`.

#### Can I override the Nielsen-DCR `clientId` and `subbrand` values?

In the event that your app contains multiple brands and sub-brands, Segment lets you override the `clientId` and `subbrand` values, to give credit to another brand or sub-brand. In your Segment dashboard, under "Client Id Property Name", indicate a payload property to be mapped to the Nielsen `clientId`. To override a `subbrand`, indicate a payload property to mapped to Nielsen `subbrand` under "Subbrand Property Name".