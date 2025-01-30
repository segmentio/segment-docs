---
title: Analytics Swift Nielsen DTVR Plugin
hidden: true
---

Digital in TV Ratings (DTVR) responds to the shifting and complex multi-platform, multi-device and multi-distribution landscape by providing comprehensive measurement of digital content consumption—including streaming TV commercial video, static web pages and mobile apps—across all major devices and platforms. For additional information, you can browse the code on GitHub in the [@segment-integrations/analytics-swift-nielsen-dtvr](https://github.com/segment-integrations/analytics-swift-nielsen-dtvr){:target="_blank”} repo.

## Getting started

To get started with Nielsen-DTVR and retrieve an `appid` to configure this integration, you must complete the following prerequisites: 
- Fill out your company info and work with a Nielsen representative.
- Sign a license agreement on the Nielsen engineering portal.
- Sign an NDA to sign prior to accessing the download. 
- Complete a pre-certification process with your Nielsen representative before shipping this implementation to production.
- Reach out to your Segment customer service representative to enable the Nielsen-DTVR plugin, as this destination is in private beta.


### Adding the dependency

### via Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repo.

```
https://github.com/segment-integrations/analytics-swift-nielsen-dtvr
```

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### via Package.swift

Open your Package.swift file and add the following to the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-nielsen-dtvr.git",
            from: "1.0.0"
        ),
```


## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentNielsenDTVR // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: NielsenDTVRDestination())
```


Your events now contain Nielsen-DVTR session data and flow to Nielsen-DVTR in device-mode.

## Track

Segment only supports sending Track events as outlined in our [Video Spec](/docs/connections/spec/video/). To get started tracking video content through Segment, make sure you are using a media player that has an API which allows you to detect the player state such as video or ad plays. For example, you would not be able to collect ad plays using YouTube since their YouTube SDK does not expose any hooks into player states during ad plays.

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
