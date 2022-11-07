---
title: comScore Destination
id: 54521fd525e721e32a72eea1
---
Segment's comScore destination code is open source and available on GitHub. Feel free to check it out:
- [JavaScript](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations/comscore)
- [iOS](https://github.com/segment-integrations/analytics-ios-integration-comscore)
- [Android](https://github.com/segment-integrations/analytics-android-integration-comscore)

## Getting Started

comScore is supported on mobile apps and web browsers.


## Web

When you enable comScore in the Segment App, your changes appear in the Segment CDN within 45 minutes, and then analytics.js starts asynchronously loading comScore's `beacon.js` library onto your page. **This means you should remove comScore's snippet from your page.**

Be sure to input your comScore **c2 ID** for comScore to start recording data. The **c2 ID** can be found by clicking on the "Get Tag" button within the Comscore dashboard. You will need to pull out the **C2 Value** from the comScore script tag. You **do not** need to copy/paste the entire script tag.

## Mobile

To get started with comScore and Segment, you'll want to first integrate your mobile app with our [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) or [Android](/docs/connections/sources/catalog/libraries/mobile/android/) sources. comScore can only accept data sent directly from their iOS and Android SDKs. For that reason we can only send data directly from our iOS and Android SDKs to comScore. **Data recorded in our server-side sources cannot be sent to comScore.**

For mobile sources, you will need to enter your comScore **c2 ID** and **Publisher Secret**.

### iOS
To install comScore via Segment on iOS, please follow the additional set up steps in the Segment-Comscore iOS repository [here](https://github.com/segment-integrations/analytics-ios-integration-comscore#analytics-ios-integration-comscore).

### Android
To install comScore via Segment on Android, please follow the additional set up steps in the Segment-Comscore Android repository [here](https://github.com/segment-integrations/analytics-android-integration-comscore#analytics-android-integration-comscore).

### React Native

{% include content/react-dest.md only="ios"%}

## Page

Calling `page` on web will automatically send a call to comScore's Application Tag, along with any `labels` mapped in the **Beacon Param Map** setting.

## Identify

Calling `identify` with comScore enabled will automatically set the user attributes provided as `labels`, passing that information on to comScore. With the mobile destination, we map a Segment `identify` event to comScore's `setPersistentLabelWithName`. Identify is not supported in the web destination.

## Track

Calling `track` on events will automatically set the properties of that track call as hidden values in comScore to enhance your reports. With the mobile destination, we map a Segment `track` event to comScore's `notifyHiddenEventWithLabels`. Track is not supported in the web destination.

## Screen

Calling `screen` on mobile will automatically attribute the `name`, `category` and `properties` on that call to be used in the comScore tool. With the mobile destination, we map a Segment `screen` event to comScore's `notifyViewEventWithLabels`. Screen is not supported in the web destination.

## Flush

Calling `flush` will clear the offline cache with comScore's `flushOfflineCache` method.

## User Consent

To communicate user consent, Comscore requires customers add a label called `cs_ucfr` to events. Segment supports setting the `cs_ucfr` label on web only. Using the **Comscore User Consent Label** setting, input the custom field you would like to map to `cs_ucfr`. The custom field mapped to `cs_ucfr` should be present on **all** page calls as per comScore's requirements.

Segment will map values to comScore's `cs_ucfr` label as outlined below:

| Custom Field Value | `cs_ucfr` Value |
| ------------ | ------------ |
| `0` | `0` |
| `1` | `1` |
| `false` | `0` |
| `true` | `1` |
| If third character in the [US Privacy String](https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md) is `Y` | `0` |
| If third character in the [US Privacy String](https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md) is `N` | `1` |
| If third character in the [US Privacy String](https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md) is `-` | Not included |
| Any other string value | "" (empty string) |

`cs_ucfr` will be omitted in all other cases.

## Video Streaming

**Note**: The video tracking functionality is in beta for **mobile only**, and requires version 3.0.0 of the `Segment-comScore` SDK. If you have feedback on or questions about this beta feature, [contact us](https://segment.com/help/contact)!

To get started tracking video content through Segment, make sure you are using a media player that has an API which allows you to detect the player state. Refer to our [Video Spec](/docs/connections/spec/video/) and implement video tracking as outlined there. We will map the semantic events to comScore's relevant methods.

### Playback Events

When you call `Video Playback Started`, Segment initializes an instance of the comScore streamingAnalytics class with `[streamingAnalytics createPlaybackSession];`. **It is essential that this event is called in order to continue tracking through comScore's Streaming Tag**.

From there we will map to the relevant events on the instance as outlined below:

| comScore Spec | Segment Video Spec |
| ------------ | ------------ |
| `notifyPause` | `Video Playback Paused` |
| `notifyBufferStart` | `Video Playback Buffer Started` |
| `notifyBufferStop` | `Video Playback Buffer Completed` |
| `notifySeekStart` | `Video Playback Seek Started` |
| `notifyPlay` | `Video Playback Seek Completed` |
| `notifyPlay` | `Video Playback Resumed` |

If the `properties.position` is passed in, we will call the above methods with the play position.

**Playback Properties (Labels)**

For each playback event, we will set the following asset labels translated from our video spec to comScore:

| comScore Label                          | Segment Property    |
| --------------------------------------- | ------------------- |
| `ns_st_ci`                              | `asset_ids(s)`      |
| `ns_st_mp`                              | `video_player`      |
| `ns_st_vo`                              | `sound`             |
| `ns_st_ws`                              | `full_screen`       |
| `ns_st_br`                              | `bitrate`           |

Note that iOS and Android expect different casing. We expect `snake_case` for iOS and `camelCase` for Android.

### Content Events

| comScore Spec | Segment Video Spec |
| ------------ | ------------ |
| `notifyPlay` | `Video Content Started ` |
| `notifyPlayWithPosition` | `Video Content Playing ` |
| `notifyEnd` | `Video Content Completed` |

If the `properties.position` is passed in, we will call the above methods with the play position.

**Content Properties (Labels)**

| comScore Label             | Segment Property |
| -------------------------- | ---------------- |
| `ns_st_ci`                 | `asset_id`       |
| `ns_st_pn`                 | `pod_id`         |
| `ns_st_ep`                 | `title`          |
| `ns_st_sn`                 | `season`         |
| `ns_st_en`                 | `episode`        |
| `ns_st_ge`                 | `genre`          |
| `ns_st_pr`                 | `program`        |
| `ns_st_pu`                 | `publisher`      |
| `ns_st_st`                 | `channel`        |
| `ns_st_ce`                 | `full_episode`   |

Note that iOS and Android expect different casing. We expect `snake_case` for iOS and `camelCase` for Android.

### Ad Events

| comScore Spec | Segment Video Spec |
| ------------ | ------------ |
| `notifyPlay` | `Video Ad Started ` |
| `notifyPlayWithPosition` | `Video Ad Playing ` |
| `notifyEnd` | `Video Ad Completed` |


| comScore Label | Segment Property |
| -------------- | ---------------- |
| `ns_st_ami`    | `asset_id`       |
| `ns_st_ad`     | `type`           |
| `ns_st_amt`    | `title`          |
| `ns_st_pu`     | `publisher`      |
| `ns_st_cl`     | `total_length`   |

Note that iOS and Android expect different casing. We expect `snake_case` for iOS and `camelCase` for Android.


## Additional Video Destinations Specific Options

Example on passing destination specific option values through on iOS:

```objc
options:@{
  @"integrations": @{
   @"com-score" : @{
     @"c3": @"c3 value",
     @"c4: @"c4 value",
     @"c6" : @"c6 value",
     @"tvAirdate" : @"2017-05-22"
    }
  }
}
```

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

We allow you to pass in one or the other and map to comScore's labels for each.

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

|                  | video + audio |
| ---------------- | ------------- |
| Linear Live      | va21          |


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

|                  | video + audio |
| ---------------- | ------------- |
| Bumpers          | vc99          |


## FAQ

### How does comScore determine platform type?
The SDK auto-collects the internal device names, which comScore maps to their reportable Platforms seen broken out in your comScore Direct dashbaord.

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
