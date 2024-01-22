---
title: Analytics Kotlin Nielsen DTVR Plugin
strat: kotlin
---

Nielsen Digital Content Ratings (DCR) respond to the shifting, complex multi-platform, multi-device and multi-distribution landscape by providing comprehensive measurement of digital content consumption—including streaming video, static web pages and mobile apps—across all major devices and platforms. The [Analytics-Kotlin DTVR Plugin](https://github.com/segment-integrations/analytics-kotlin-nielsen-dtvr) tracks data for [Analytics-Kotlin](https://github.com/segmentio/analytics-kotlin).

## Getting Started

In order to get started with Nielsen-DTVR and retrieve an `appid` to configure this integration, you must sign a license agreement on the Nielsen engineering portal.

There will be an NDA to sign prior to accessing the download. Nielsen requires you fill out your company info and have a Nielsen representative before getting started.

You must also go through the pre-certification process as outlined here with your Nielsen representative before shipping this implementation to production. The Nielsen-DTVR destination in the Segment dashboard is in private beta. You will need to talk to your Segment customer service representative to get started.



### Adding the dependency
To install the Segment-Nielsen-DTVR integration, simply add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:nielsen-dtvr:<latest_version>'
```

Or the following for Kotlin DSL

```
implementation("com.segment.analytics.kotlin.destinations:nielsen-dtvr:<latest_version>")
```

Also add the Maven Nielsen Digital SDK repo (since Nielsen doesn’t publish it on Maven Central) inside repositories section in project level build.gradle.
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

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library.  Add this plugin to the list of imports.

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

Your events will now begin to flow to Nielsen-DTVR in device mode.

## Track

Segment only supports sending `track` events as outlined in our [Video
Spec](/docs/connections/spec/video/). To get started tracking video content through
Segment, make sure you are using a media player that has an API which allows
you to detect the player state such as video or ad plays. For example, you
would not be able to collect ad plays using YouTube since their YouTube SDK
does not expose any hooks into player states during ad plays.

**IMPORTANT**: We will map the semantic events and properties in the Segment [Video Spec](/docs/connections/spec/video/) to Nielsen's relevant methods and metadata. If you do not implement the Segment [Video Spec](/docs/connections/spec/video/) properly, this integration will not behave properly. 

## Settings

#### App ID 
Once the Segment source is integrated with your app, toggle
Nielsen-DTVR on in your Segment destinations catalog, and add your `appId`,
which you can retrieve from your Nielsen representative.

The `appId` is the unique id for the application assigned by Nielsen. It is
GUID data type. Be sure to use the test `appId` during development, test, and
certification processes. Use Production appid to submit app to App / Play
store, after receiving Nielsen certification.

These new settings will take up to an hour to propagate to all of your existing
users. For new users it will be instantaneous.

#### Enable Debug Mode 
Check this setting if you would like to activate the
Debug flag. Once the flag is active, it logs each API call made and the data
passed. DO NOT activate the Debug flag in a production environment.

#### id3Property 
Indicate the key in your payload associated with the id3 tag.
If one is not provided we will default to `id3`.

#### Events to Send Id3 Tags
Add the event names you would like to trigger Segment to `sendId3` tags.

#### sfcode 
Required for mobile only: Add the unique identifier for the
environment that the Nielsen SDK should point to. If not specified the default
value will be `us`.

<!-- Nielsen does not host their framework on a dependency management site such
as Cocoapods nor Maven. You must manually add the framework after installing
the Segment-Nielsen-DTVR dependency. Navigate to [Nielsen's Engineering
Site](https://engineeringportal.nielsen.com/docs/Digital_Downloads){:target="_blank"} and
download the Video framework. -->
