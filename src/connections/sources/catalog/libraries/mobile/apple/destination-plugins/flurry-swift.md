---
title: Analytics Swift Flurry Plugin
strat: swift
---

[Flurry](https://developer.yahoo.com/flurry/docs/) provides you with the tools and resources you need to gain a deep level of understanding about your users' behavior in your apps.

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Flurry" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Flurry "API Key" in Segment's Settings UI. You can retrieve this from your **Flurry Admin > Apps > API Key**. It should look like "4KKKGS3BAK4WW8WJ93DN".
4. Follow the instructions in the GitHub repo: [Swift SDK](https://github.com/segment-integrations/analytics-swift-flurry).
5. Once the Segment library is integrated with your app, toggle Flurry on in your Segment UI.

_Note: Flurry does not always display data in real time. We've seen that it can take anywhere from a few hours to a few days for certain types of data to sync with Flurry._

## Adding the dependency

***Note:** the `Flurry` library itself will be installed as an additional dependency.*

### via Xcode
In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repo.

```
https://github.com/segment-integrations/analytics-swift-flurry
```

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to.  Once you've made your selections, click the `Add Package` button.  

### via Package.swift

Open your Package.swift file and add the following do your the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-flurry.git",
            from: "1.1.3"
        ),
```


## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentFlurry // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: FlurryDestination())
```

Your events will now begin to flow to Flurry in device mode.

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does.

An example Screen call would look like:


```swift
analytics.screen(title: "SomeScreen")
```

_Note: When you toggle the Screen Tracks As Events option on in your Flurry Segment UI - we will treat `screen` calls as events when sending them to Flurry._


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example iOS call would look like:

```swift
struct MyTraits: Codable {
        let favoriteColor: String
}

analytics.identify(userId: "a user's id", MyTraits(favoriteColor: "fuscia"))
```

When you call `.identify()`, Segment uses AppsFlyer's `setCustomerUserID` to send the `userId` that was passed in.

When you call [`identify`](/docs/connections/spec/identify/), we'll set the user ID in Flurry, and set any special Flurry `traits` you provide, such as `gender`, or `age`.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example iOS call would look like:

```swift
struct TrackProperties: Codable {
        let someValue: String
}

analytics.track(name: "My Event", properties: TrackProperties(someValue: "Hello"))
```

