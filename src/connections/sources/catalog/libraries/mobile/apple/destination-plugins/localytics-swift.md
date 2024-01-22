---
title: Analytics Swift Localytics Plugin
id: 54521fd925e721e32a72eed0
---

## Getting Started

The Analytics-Swift Localytics Session Plugin provides session tracking support to your applications via this plugin for [Analytics-Swift](https://github.com/segmentio/analytics-swift)

> success ""
> This plugin simply adds session data for Localytics, and events are sent via Cloud Mode.

## Adding the dependency

### via Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repo.
```
https://github.com/segment-integrations/analytics-swift-localytics
```

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### via Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-localytics.git",
            from: "1.0.0"
        ),
```


## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentLocalytics // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: LocalyticsDestination())
```
Your events will now be given Localytics session data and start flowing to Localytics via Cloud Mode.
