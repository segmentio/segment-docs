---
title: Analytics Swift Adjust Plugin
strat: swift
---

[Adjust](https://adjust.com){:target="_blank"} is the mobile attribution provider of choice for hundreds of organizations across the globe. They unify all your marketing activities into one powerful platform, giving you the insights you need to scale your business. The Adjust Destination is open-source. You can browse the code on GitHub [here](https://github.com/segment-integrations/analytics-swift-integration-adjust).

> info ""
> Note that this plugin simply adds session data for Adjust, and events are sent via Cloud Mode.

## Getting started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Adjust" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. You don't need to include Adjust's SDK natively, as this prevent you from successfully implementing the Adjust.
4. Depending on the source you've selected, include Adjust's library by adding the following lines to your dependency configuration.

## Adding the dependency

### via Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repo.

https://github.com/segment-integrations/analytics-swift-integration-adjust

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### via Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-integration-adjust.git",
            from: "1.0.0"
        ),
```


## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentAdjust // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: AdjustDestination())
```
Your events will now be given Adjust session data and start flowing to Adjust via Cloud Mode.
