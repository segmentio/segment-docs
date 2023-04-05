---
title: Analytics Swift BugSnag Plugin
strat: swift
---

Bugsnag helps you detect and diagnose crashes in your application. Depending on the data you provide, Bugsnag can filter errors based on user name, user email, timeline, release stages, paying user status, and more.
Add BugSnag tracking support to your applications via this plugin for [Analytics-Swift](https://github.com/segmentio/analytics-swift).

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "BugSnag" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Add your API key to your connection settings. You can find your API key in your Bugsnag dashboard under “Settings”, which is located in the upper left-hand corner.

## Adding the dependency

### via Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repo.

https://github.com/segment-integrations/analytics-swift-integrations-Bugsnag

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### via Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-integrations-Bugsnag.git",
            from: "1.0.0"
        ),
```


## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentBugsnag // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: BugsnagDestination())
```
Your events will now be given to Bugsnag session data and start flowing to BugSnag via Cloud Mode.

## Identify

Once you've correctly set up your Bugsnag integration, you should [`identify`](/docs/connections/spec/identify/) each of your users as soon as you know their identity (this typically happens after log in or sign up), so that Bugsnag can provide you with more visibility into which user is encountering which error.

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```swift
struct MyTraits: Codable {
        let favoriteColor: String
}

analytics.identify(userId: "a user's id", MyTraits(favoriteColor: "fuscia"))
```

Bugsnag will show you the `userId` and `traits` in the Users tab of each error.

## Error Reporting

In addition to sending Bugsnag user-specific information, you can send handled exceptions and diagnostic data to your Bugsnag dashboard using Bugsnag's native methods. Documentation on these methods is available [on their website](https://docs.bugsnag.com/platforms/browsers/#reporting-handled-exceptions).
