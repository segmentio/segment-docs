---
title: Analytics Swift Nielsen DTVR Plugin
strat: swift
---

Nielsen Digital Content Ratings (DCR) respond to the shifting, complex multi-platform, multi-device and multi-distribution landscape by providing comprehensive measurement of digital content consumption—including streaming video, static web pages and mobile apps—across all major devices and platforms. The [Analytics-Swift Nielsen-DTVR Plugin](https://github.com/segment-integrations/analytics-swift-nielsen-dtvr) tracks sessions for [Analytics-Swift](https://github.com/segmentio/analytics-swift).

## Getting Started

In order to get started with Nielsen-DTVR and retrieve an `appid` to configure this integration, you must sign a license agreement on the Nielsen engineering portal.

There will be an NDA to sign prior to accessing the download. Nielsen requires you fill out your company info and have a Nielsen representative before getting started.

You must also go through the pre-certification process as outlined here with your Nielsen representative before shipping this implementation to production. The Nielsen-DTVR destination in the Segment dashboard is in private beta. You will need to talk to your Segment customer service representative to get started.
ata for Nielsen-DTVR, and events are sent via Cloud Mode.

### Adding the dependency

### via Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repo.

https://github.com/segment-integrations/analytics-swift-nielsen-dtvr

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### via Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

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


Your events will now be given Nielsen-DTVR session data and start flowing to Nielsen-DTVR via Device Mode.
