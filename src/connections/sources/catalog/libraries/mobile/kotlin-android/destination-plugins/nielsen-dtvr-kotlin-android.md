---
title: Analytics Kotlin Nielsen DTVR Plugin
hidden: true
---

Digital in TV Ratings (DTVR) responds to the shifting and complex multi-platform, multi-device and multi-distribution landscape by providing comprehensive measurement of digital content consumption—including streaming TV commercial video, static web pages and mobile apps—across all major devices and platforms. The [Analytics-Kotlin Nielsen-DTVR Plugin](https://github.com/segment-integrations/analytics-kotlin-nielsen-dtvr){:target="_blank”} tracks sessions for [Analytics-Kotlin](https://github.com/segmentio/analytics-kotlin){:target="_blank”}.


## Getting started

To get started with Nielsen-DTVR and retrieve an `appid` to configure this integration, you must complete the following prerequisites: 
- Fill out your company info and work with a Nielsen representative.
- Sign a license agreement on the Nielsen engineering portal.
- Sign an NDA to sign prior to accessing the download. 
- Complete a pre-certification process with your Nielsen representative before shipping this implementation to production.
- Reach out to your Segment customer service representative to enable the Nielsen-DTVR plugin, as this destination is in private beta.

### Adding the dependency
To install the Segment-Nielsen-DTVR integration, add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:nielsen-dtvr:<latest_version>'
```

Or the following for Kotlin DSL:

```
implementation("com.segment.analytics.kotlin.destinations:nielsen-dtvr:<latest_version>")
```

Also add the Maven Nielsen Digital SDK repo (since Nielsen doesn’t publish it on Maven Central) inside the repositories section in your project level build.gradle:

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
Or the following for Kotlin DSL:
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

## Using the Plugin in your App

Open the file where you set up and configured the Analytics-Kotlin library.  Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.nielsendtvr.NielsenDTVRDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = NielsenDTVRDestination())
```

Your events now flow to Nielsen-DTVR in device-mode.

## Track

Segment only supports sending Track events as outlined in the [Video Spec](/docs/connections/spec/video/). To start tracking video content through Segment, use a media player with an API which allows you to detect the player state, like video or ad plays. For example, you cannot collect ad plays using YouTube because their YouTube SDK doesn't expose any hooks into player states during ad plays.

Once you've selected a media player with an API that exposes the player state, configure video tracking using Segment's [Video Spec](/docs/connections/spec/video/) and implement video tracking as outlined in the Spec. After you've configured video tracking according to the Video Spec, Segment maps the semantic events and properties to Nielsen's relevant methods and metadata.

> warning "This integration requires strict adherence to Segment's Video Spec"
> If you do not implement the Segment [Video Spec](/docs/connections/spec/video/) properly with key lifecycle events, you might end up with unexpected behavior.


## Settings

#### App ID 
Once the Segment source is integrated with your app, toggle Nielsen-DTVR on in your Segment destinations catalog and enter your `appId`,
which you can retrieve from your Nielsen representative.

Nielsen assigns a unique GUID (`appId`) to each application you create. Segment recommends using a test `appId` during the development, test, and
certification processes, and a production `appId` when submitting your App to the Play store.

#### Enable Debug Mode 
Check this setting if you would like to activate the
Debug flag. Once the flag is active, it logs each API call made and the data
passed. DO NOT activate the Debug flag in a production environment.

#### id3Property 
Indicate the key in your payload associated with the id3 tag.
If one is not provided Segment defaults to `id3`.

#### Events to Send Id3 Tags
Add the event names you would like to trigger Segment to `sendId3` tags.

#### sfcode 
Required for mobile only: Add the unique identifier for the
environment that the Nielsen SDK should point to. If not specified, the default
value is `us`.

<!-- Nielsen does not host their framework on a dependency management site such
as Cocoapods nor Maven. You must manually add the framework after installing
the Segment-Nielsen-DTVR dependency. Navigate to [Nielsen's Engineering
Site](https://engineeringportal.nielsen.com/docs/Digital_Downloads){:target="_blank"} and
download the Video framework. -->
