---
title: comScore Destination
---

Our comScore destination code is open-source on GitHub if you want to check it out! [For Analytics.js](https://github.com/segment-integrations/analytics.js-integration-comscore). [For Analytics-iOS](https://github.com/segment-integrations/analytics-ios-integration-comscore). [For Analytics-Android](https://github.com/segment-integrations/analytics-android-integration-comscore)

## Getting Started

## Analytics.js

When you enable comScore in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading comScore's `beacon.js` onto your page. **This means you should remove comScore's snippet from your page.** ComScore automatically starts recording data.

## Mobile

To get started with comScore and Segment, you'll want to first integrate your mobile app with our [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) or [Android](/docs/connections/sources/catalog/libraries/mobile/android/) sources. comScore can only accept data sent directly from their iOS and Android SDKs. For that reason we can only send data directly from our iOS and Android SDKs to comScore. **Data recorded in our server-side sources cannot be sent to comScore.** Be sure to follow the additional set up steps to get started, which you can find [here for iOS](https://github.com/segment-integrations/analytics-ios-integration-comscore#analytics-ios-integration-comscore) and [here for Android](https://github.com/segment-integrations/analytics-android-integration-comscore#analytics-android-integration-comscore).

With the recent comScore update, there is an additional implementation step when getting started with comScore Android. Be sure to add this to your gradle file:

```
allprojects {
  repositories {
    maven {
      url "https://comscore.bintray.com/Analytics"
    }
  }
}
```

## React Native

{% include content/react-dest.md only="ios"%}


### Settings
Once the Segment source is integrated with your app, toggle comScore on in your Segment destinations catalog, and add your  **C2 Value**, also known as the client ID. The **C2 Value** can be found by clicking on the "Get Tag" button in the "Website" or "Mobile App" tabs within the Comscore dashboard.

For analytics.js sources, you will need to pull out the **C2 Value** from the Comscore script tag. You **do not** need to copy/paste the entire script tag.

For Mobile sources, you will also need to enter the **Publisher Secret Code** located below the **C2 Value**.

These new settings will take up to an hour to propagate to all of your existing users. For new users it'll be instantaneous!

#### App Name

You can include your **App Name** which will be included in all payloads. comScore retrieves the application name from your app's `Info.plist` application bundle name as returned by `CFBundleName` . This value is used in the classification from comScore's Audience reporting. If you want to override the automatically retrieved value, you can provide a string with your preferred app name.

#### HTTPS
We default **Use HTTPS** to true so that your data is always sent encrypted.

#### Auto Update

We enable you to choose if you want the comScore SDK to update the application usage times on regular intervals.

By default, we have `Foreground Only` on. this means we'll only update usage times when your app is in the foreground, if you uncheck this then we will update usage times even when your app is backgrounded. This is recommended if your app can deliver a user experience while the app is backgrounded, Push Notifications being a common example.

You may also choose to turn off `Foreground Only`, which leaves `AutoUpdate` enabled, which updates the application usage times when the app is both foregrounded and backgrounded.

If you turn off `AutoUpdate`, we will disable Auto Update mode but note that this is not advised.

We also allow you to configure the **Auto Update Interval** which controls how often the SDK updates usage information. This defaults to 60 seconds.

## Identify

Calling `identify` with comScore enabled will automatically set the user attributes provided as `labels`, passing that information on to comScore. With the mobile destination, we map a Segment `identify` event to comScore's `setPersistentLabelWithName`.

## Track

Calling `track` on events will automatically set the properties of that track call as hidden values in comScore to enhance your reports. With the mobile destination, we map a Segment `track` event to comScore's `notifyHiddenEventWithLabels`.

## Screen

Calling `screen` will automatically attribute the `name`, `category` and `properties` on that call to be used in the comScore tool. With the mobile destination, we map a Segment `screen` event to comScore's `notifyViewEventWithLabels`.

## Flush

Calling `flush` will clear the offline cache with comScore's `flushOfflineCache` method.


## Video Streaming

**Note**: The video tracking functionality is in beta for **mobile only**, and requires version 3.0.0 of the `Segment-comScore` SDK. If you have feedback on or questions about this beta feature, [contact us](https://segment.com/help/contact)!

To get started tracking video content through Segment, make sure you are using a media player that has an API which allows you to detect the player state. Refer to our [Video Spec](https://segment.com/docs/connections/spec/video/) and implement video tracking as outlined there. We will map the semantic events to comScore's relevant methods.

### Playback Events

When you call `Video Playback Started`, Segment initializes an instance of the comScore streamingAnalytics class with `[streamingAnalytics createPlaybackSession];`. **It is essential that this event is called in order to continue tracking through comScore**.

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

You can pass in a value for `adClassificationType` as an integratino specific option. Segment defaults to value `aa00` on all Ad related video tracking events. The values you may dynamically pass in are described by comScore below.

**LINEAR - VIDEO ON DEMAND**
Linear advertisements delivered into a media player and presented before, in the middle of, or after video content is consumed by the user. The advertisement completely takes over the full view of the media player.


|                  | video + audio |
| ---------------- | ------------- |
| Linear Pre-Roll  | va11          |
| Linear Mid-Roll  | va12          |
| Linear Post-Roll | va13          |


**LINEAR - LIVE**
Linear advertisements delivered before, in the middle of, or after a live stream of content. The advertisement completely takes over the full view of the media player.

`va21`

**BRANDED ENTERTAINMENT**
Media that a user may intentionally view (like content), or it may be served to a user during an ad break (like an advertisement).


| During Linear Pre-Roll  | va31 |
| ----------------------- | ---- |
| During Linear Mid-Roll  | va32 |
| During Linear Post-Roll | va33 |
| As Content              | va34 |
| During Live Streaming   | va35 |



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

`vc99`


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
