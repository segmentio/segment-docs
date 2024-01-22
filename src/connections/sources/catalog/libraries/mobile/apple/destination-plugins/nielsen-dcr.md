---
title: Analytics Swift Nielsen DCR Plugin
strat: swift
---


Nielsen Digital Content Ratings (DCR) respond to the shifting, complex multi-platform, multi-device and multi-distribution landscape by providing comprehensive measurement of digital content consumption—including streaming video, static web pages and mobile apps—across all major devices and platforms. The [Analytics-Swift Nielsen-DCR Plugin](https://github.com/segment-integrations/analytics-swift-nielsen-dcr) tracks sessions via for [Analytics-Swift](https://github.com/segmentio/analytics-swift).

## Getting Started

In order to get started with Nielsen-DCR and retrieve an appid to configure this integration, you must sign a license agreement on the Nielsen engineering portal.

There will be an NDA to sign prior to accessing the download. Nielsen requires you fill out your company info and have a Nielsen representative before getting started.

You must also go through a pre-certification process with your Nielsen representative before shipping this implementation to production.

> success ""
> This plugin simply adds session data for Nielsen-DCR, and events are sent via Cloud Mode.

## Adding the dependency

### via Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repo.

https://github.com/segment-integrations/analytics-swift-nielsen-dcr

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### via Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-nielsen-dcr.git",
            from: "1.0.0"
        ),
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentNielsenDCR // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: NielsenDCRDestination())
```
Your events will now be given Nielsen-DCR session data and start flowing to Nielsen-DCR via Cloud Mode.
