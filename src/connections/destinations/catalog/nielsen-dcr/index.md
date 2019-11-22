---
title: Nielsen DCR Destination
---

## Getting Started

{% include content/connection-modes.md %}

Nielsen-DCR is supported on mobile apps and web browsers.

Digital Content Ratings (DCR) responds to the shifting, complex multi-platform, multi-device and multi-distribution landscape by providing comprehensive measurement of digital content consumption—including streaming video, static web pages and mobile apps—across all major devices and platforms.

In order to get started with Nielsen-DCR and retrieve an `appid` to configure this integration, you must sign a license agreement on the [Nielsen engineering portal](https://engineeringportal.nielsen.com/docs/Main_Page).

There will be an NDA to sign prior to accessing the download. Nielsen requires you fill out your company info and have a Nielsen representative before getting started.

You must also go through the pre-certification process as outlined [here](https://engineeringportal.nielsen.com/docs/Digital_Pre-Certification_Checklist) with your Nielsen representative before shipping this implementation to production.


## Mobile

To get started with Nielsen-DCR and Segment, you'll want to first integrate your mobile app with our [iOS](/docs/connections/sources/catalog/libraries/mobile/ios/) or [Android](/docs/connections/sources/catalog/libraries/mobile/android/) sources.


### iOS

#### Install the SDK

The recommended way to install Analytics for iOS is via Cocoapods, since it means you can create a build with specific destinations, and because it makes it dead simple to install and upgrade. Simply add the Analytics dependency to your Podfile, like so:

```
pod 'Analytics' '~> 3.0'
pod 'Segment-Nielsen-DCR'
```

#### Add the Nielsen App SDK Framework
The integration relies on the Nielsen App SDK framework, which can either be installed via CocoaPods or by manually adding the framework. You will need to have a Nielsen representative before getting started.

##### CocoaPods

When using the Nielsen SDK version 6.2.0.0 and above, Nielsen recommends installation via CocoaPods, and Apple recommends using the dynamic framework.

Requirements for CocoaPods:

Dynamic Framework - version 1.6.1 or higher
Static Framework - version 1.4.0 or higher

1. Set repository credentials
The first step is to add the credentials received from Nielsen into your .netrc file. Navigate to your home folder and create a file called .netrc
  ```
  cd ~/
  vi .netrc
  ```

  Add the credentials in the following format:
  ```
  machine raw.githubusercontent.com
  login <Nielsen App SDK client>
  password <Auth token>
  ```

  You will need to fill out a license agreement form and have the contact information for your Nielsen representative in order to obtain the credentials [here](https://engineeringportal.nielsen.com/docs/connections/special:Downloads)

2. Add the source to your Podfile:

  Dynamic Framework - `source 'https://github.com/NielsenDigitalSDK/nielsenappsdk-ios-specs-dynamic.git'`
  Note - you will also need to include `use_frameworks!`

  Static Framework - `source 'https://github.com/NielsenDigitalSDK/nielsenappsdk-ios-specs.git'`

3. Add the pod to your Podfile:

  `pod NielsenAppSDK`

4. Install pods

  `pod install`

The full instructions from Nielsen can be found [here](https://engineeringportal.nielsen.com/docs/Digital_Measurement_iOS_Artifactory_Guide)

##### Manual

Navigate to the [Nielsen Downloads](https://engineeringportal.nielsen.com/docs/connections/special:Downloads) page to download the iOS SDK.
You will need to fill out a license agreement form and have the contact information for your Nielsen representative ready.

Once extracted, add the static NielsenAppApi.framework to the project and ensure it's in the `Frameworks` folder, and that it is linked.

Nielsen also requires the following frameworks, which must be included into Link Binary with Libraries (within app target's Build Phases) - NOTE - if using the dynamic framework, these will dynamically be linked and there is no need to manually link these.
  - AdSupport.framework
  - SystemConfiguration.framework
  - CoreLocation.framework (Not applicable for International (Germany))
  - libsqlite3

### Android

#### Install the SDK

The recommended way to install the library for Android is with a build system like Gradle. This makes it dead simple to upgrade versions and add destinations. The library is distributed via [Maven Central](https://search.maven.org/). Simply add the `analytics` module to your `build.gradle`:

```javascript
dependencies {
  api 'com.segment.analytics.android:analytics:4.+'
  api 'com.segment.analytics.android.integrations:nielsen-dcr:+'
}
```

The NielsenDCRIntegration requires you to have Nielsen's SDK jar in your Gradle or Maven repository. You directly download the package from Nielsen or use Gradle as described [here](https://engineeringportal.nielsen.com/docs/DCR_Video_Android_SDK#How_to_obtain_the_NielsenAppApi).

#### Manually Download the Nielsen App SDK

You can manually download the framework and add it to your project.

Import the project:

![Import Project](images/import.png)

Then navigate to the Project Structure, click on the framework and import the jar there:

![Project Structure](images/projectstructure.png)

  1. Be sure to put the jar into the `libs` folder
  2. Right click it and hit 'Add as library'
  3. Ensure that `compile files('appsdk/appsdk.jar')` is in your `build.gradle` file (or `compile fileTree(dir: 'libs', include: '*.jar')` if you are using many jar files)
  4. Do a clean build (you can probably do this fine in Android Studio, but to make sure navigate in a terminal to the root folder of your app and type `./gradlew clean` (this command may be different for you).


#### Initialize the Client

We recommend initializing the client in your `Application` subclass. You must import the integration and register it with the Segment SDK.

```javascript
import com.segment.analytics.android.integrations.nielsendcr.NielsenDCRIntegration;

// Create an analytics client with the given context and Segment write key.
Analytics analytics = new Analytics.Builder(context, YOUR_WRITE_KEY)
  .use(NielsenDCRIntegration.FACTORY)
  .build();

// Set the initialized instance as a globally accessible instance.
Analytics.setSingletonInstance(analytics)

```

## Web

If you'd like to measure video on the web, all you have to do is add your **App ID** in your Segment settings and enable this destination for a JS source. We will load the Nielsen SDK onto your browser.

## Screen / Page

Segment supports translating `screen` or `page` to Nielsen as a Static App Measurement event. We will translate the following properties to the expected Nielsen metadata:

| Segment Property Name | Nielsen | Nielsen Description |
| --------| ---------- | ---------- |
| `type`| `type`| Required. Segment hardcodes `'static'` |
| `name` * | `section`| Required. Section of site|
| integration option | `segB`| Required (optional for web). Segment A.|
| integration option | `segC`| Required (optional for web). Segment B.|
| integration option | `crossId1` | Standard episode ID (mobile only)|

* _NOTE_: For web, we will use the following precedence: 1) `[category] [name]` 2) `[name]` 3) `'Loaded a Page'`

## Track

Segment only supports sending `track` events as outlined in our [Video Spec](/docs/connections/spec/video/). To get started tracking video content through Segment, make sure you are using a media player that has an API which allows you to detect the player state such as video or ad plays. For example, you would not be able to collect ad plays using YouTube since their YouTube SDK does not expose any hooks into player states during ad plays.

**IMPORTANT**: If you do not implement the Segment [Video Spec](/docs/connections/spec/video/) properly with key lifecycle events, this integration will not behave properly.

Again, please also refer to our [Video Spec](/docs/connections/spec/video/) and implement video tracking as outlined there. We will map the semantic events and properties to Nielsen's relevant methods and metadata.

### Heartbeats

Nielsen expects a heartbeat called with `playheadPosition` during session play every second until the stream is completed, paused or interrupted (due to ad breaks or buffering).The playhead position is the current location in seconds of the playhead from the beginning of the asset.

Segment will set a timer and to call this heartbeat event (`–(void) playheadPosition: (long long) playheadPos)`, `setTimeout (web)`) every second in background. You do **NOT** have to call the Segment equivalent heartbeat event (`Video Content/Ad Playing`) each second. You should follow our spec and call the Segment heartbeat event every 10 seconds (recommended). While we will keep state of our own playhead position for these background hearbeats, when we do receive an explicit Segment heartbeat event, we will respect its `properties.position` and restart the background heartbeats from that position.

### Playback Events

When you call `Video Playback Started` and `Video Playback Resumed`, Segment will call the Nielsen-DCR `play` method with the relevant `channelInfo`:

```
NSDictionary *channelInfo = @{
                                      // channelName is optional for DCR, if not present Nielsen asks to set default
                                      @"channelName" : options[@"channelName"] ?: @"defaultChannelName",
                                      // if mediaURL is not available, Nielsen expects an empty value
                                      @"mediaURL" : options[@"mediaUrl"] ?: @""
                                      };
(void) play: (id) channelInfo;

```

From there we will map to the relevant events on the instance as outlined below:

| Nielsen-DCR Spec | Segment Video Spec |
| ------------ | ------------ |
| `–(void) stop` and Heartbeat timer stopped | `Video Playback Paused` |
| `–(void) stop` and Heartbeat timer stopped | `Video Playback Interrupted` |
| Heartbeat timer stopped | `Video Playback Buffer Started` |
| Heartbeat timer updated | `Video Playback Buffer Completed` |
| Heartbeat timer stopped | `Video Playback Seek Started` |
| Heartbeat timer updated | `Video Playback Seek Completed` |
| `-(void) end` and Heartbeat timer stopped | `Video Playback Completed` |

Segment-Nielsen-DCR does not map any playback properties (ie. send metadata) on mobile.

Web supports the use case of tracking a user switching back and forth from amongst multiple videos at the same time. To do so, Segment checks the metadata on playback interrupted events and sends Nielsen updated metadata if we see that the video content has changed. We do so by storing the current `asset_id` in memory and checking to see if the `asset_id` value has changed.

For playback events, Segment's video spec expects either `ad_asset_id​` or `content_asset_id​` depending on whether the video is an ad or content. Segment will default to mapping `ad_asset_id` to Nielsen's ad metadata `assetid` and `content_asset_id` to Nielsen's content metadata. The default Segment property can be overridden in your integration settings: `Custom Content Asset Id Property Name` or `Custom Ad Asset Id Property Name`.

### Content Events

| Nielsen-DCR Spec | Segment Video Spec |
| ------------ | ------------ |
| `–(void)loadMetadata:(id)metadata;` | `Video Content Started ` |
| Heartbeat timer updated | `Video Content Playing ` |
| `–(void) end` and `-(void) stop` | `Video Content Completed` |

**Content Properties (Labels)**

| Nielsen-DCR metadata       | Segment Property |
| -------------------------- | ---------------- |
| `assetid`                  | `asset_id`       |
| `program`                  | `program`        |
| `title`                    | `title`          |
| `segB`                     | `options.segB`   |
| `segC`                     | `options.segC`   |
| `airdate`                  | `airdate`        |
| `isfullepisode`            | `full_episode`   |
| `length`                   | `total_length`   |
| `pipmode`                  | `options.pipmode`|
| `type`                     | `'content'` (hardcoded)|
| `adLoadType`               | `options.adLoadType`|
| `hasAds`                   | `options.hasAds`|
| `crossId1`                 | `options.crossId1`|
| `crossId2`                 | `options.crossId2`|

Please take note that iOS and Android expect different casing. We expect `snake_case` for iOS and `camelCase` for Android.

### Ad Events

The Segment-Nielsen-DCR integration has logic to check for `type` in case of a preroll ad. If the `type` is `preroll`, Segment calls Nielsen's `loadMetadata` method with metadata values for content followed by loadMetadata with ad (preroll) metadata. Otherwise, Segment simply calls `loadMetadata` with the ad metadata.

| Nielsen-DCR Spec | Segment Video Spec |
| ------------------------------------ | ------------------- |
| `–(void)loadMetadata:(id)metadata;` and Heartbeat timer started| `Video Ad Started ` |
| Heartbeat timer updated | `Video Ad Playing ` |
| `–(void) stop` and Heartbeat timer stopped| `Video Ad Completed` |


| Nielsen-DCR Ad metadata | Segment Property |
| ----------------------- | ---------------- |
| `assetid`               | `asset_id`       |
| `type`                  | `type`           |
| `title`                 | `title`          |

| Nielsen-DCR Ad Content metadata | Segment Property |
| ------------------------------- | ---------------- |
| `assetid`                       | `asset_id`       |
| `adloadtype`                    | `options.ad_load_type`   |
| `type`                          | `content` (hard coded)|
| `title`                         | `title`          |
| `program`                       | `program`        |
| `segB`                          | `options.segB`   |
| `segC`                          | `options.segC`   |
| `airdate`                       | `airdate`        |
| `isfullepisode`                 | `full_episode`   |
| `length`                        | `total_length`   |
| `pipmode`                       | `options.pipmode`|

Please take note that iOS and Android expect different casing. We expect `snake_case` for iOS and `camelCase` for Android.

## Integration Specific Options

Example on passing destination specific option values through on iOS

```objective-c
options:@{
  @"integrations": @{
   @"nielsen-dcr" : @{
     @"pipmode" : @"2017-05-22",
     @"adLoadType": @"c3 value",
     @"channelName: @"c4 value",
     @"mediaUrl" : @"c6 value",
     @"hasAds":  @"true",
     @"crossId1": @"cross id1 value",
     @"crossId2": @"cross id2 value"
    }
  }
}
```

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

## FAQ

#### How do you determine App Name?

Segment-Nielsen-DCR iOS retrieves the application name from your app's `Info.plist` application bundle name as returned by `CFBundleName` .

For Android, we retrieve the name of the application package from the [PackageManager](https://developer.android.com/reference/android/content/Context.html#getPackageManager()).

#### How do you determine App Version?

Segment-Nielsen-DCR retrieves the application version from your app's `Info.plist` application bundle name as returned by `CFBundleVersion`.

For Android, we retrieve the version of the application package from the [PackageManager](https://developer.android.com/reference/android/content/Context.html#getPackageManager()).

#### What are the Nielsen-DCR `clientId` and `subbrand` values?

The Parent Client ID and Sub-Brand (VCID) values are automatically populated through the AppID, which is Nielsen Supplied. By default, `clientid` and `subbrand` are setup in Nielsen backend configuration to capture brand and sub-brand information. The fields get populated from backend for a registered client `appid`.

#### Can I override the Nielsen-DCR `clientId` and `subbrand` values?

In the event that your app contains multiple brands and sub-brands, Segment lets you override the `clientId` and `subbrand` values, to give credit to another brand or sub-brand. In your Segment dashboard, under "Client Id Property Name", indicate a payload property to be mapped to the Nielsen `clientId`. To override a `subbrand`, indicate a payload property to mapped to Nielsen `subbrand` under "Subbrand Property Name".
