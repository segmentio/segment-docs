---
title: 1Flow Swift Plugin
---

[1Flow](https://1flow.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a leading in-app user survey and messaging platform for Mobile app and SaaS businesses.

Using 1Flow, you can reach users _in-the-moment_ while they are interacting with your website or application to collect highly contextual user insights that help you improve your product offering and customer experience.

## Getting started

1. From the Segment web app, click **Catalog**, then search for **1Flow Mobile Plugin**.
2. Click **Add Destination**.
4. Select an existing Source to connect to 1Flow Mobile Plugin.
5. Go to **1flow.ai > Settings > Project Settings**, copy the 1Flow project key, and paste it into the Destination Settings in Segment.
6. Depending on the mobile source you’ve selected, include 1Flow's library by adding the following lines to your dependency configuration.

## Adding the dependency

### Through Xcode

In the Xcode `File` menu, click `Add Packages`.  You'll see a dialog where you can search for Swift packages.  In the search field, enter the URL to this repository.
```
https://github.com/1Flow-Inc/segment-1flow-ios.git
```


You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to. Once you've made your selections, click **Add Package**.  

### Through Package.swift

Open your Package.swift file and add the following to the `dependencies` section:

```
.package(
            name: "Segment",
            url: "https://github.com/1Flow-Inc/segment-1flow-ios.git",
            from: "1.0.0"
        ),
```

## Using the Plugin in your app

Open the file where you set up and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentOneFlow // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: OneFlowDestination())
```

## Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```swift
analytics.identify(userId: "peter@example.com", traits: [
    "name": "Peter Gibbons",
    "email": "peter@example.com",
    "mobile": 1234567890
])
```
The Segment identify method is equivalent to `logUser` of 1Flow. `userId` will be `userID` and `traits` will be `userDetails`.

## Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```swift
analytics.track(name: "ButtonClicked")
```
Any value passed in `name`, will be eventName and if you have passed any event property, then it will be event `parameters`.

## Screen

Send [Screen](/docs/connections/spec/screen) calls to record which mobile app screens users have viewed. For example:

```swift
analytics.screen(title: "Home")
```

Segment sends Screen calls to 1Flow as a `screen_[name]` event (or `screen_view` if a screen name isn't provided).
