---
title: Analytics Swift Intercom Plugin
strat: swift
---

Intercom is a customer communications platform that shows you who is using your product. Intercom allows you to personally communicate with your users with targeted content, behavior-driven messages, and conversational support.

Segment’s Intercom destination plugin code is open source and available on GitHub. You can view it [here.](https://github.com/segment-integrations/analytics-swift-intercom)

## Getting Started

  1. From the Segment web app, click **Catalog**.
  2. Search for "Intercom" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. In the destination settings, enter your `App Id` and `Mobile API Key`, which can be retrieved from your Intercom account.
  4. After you build and release to the app store, Segment starts translating and sending your data to Intercom automatically.

## Adding the Dependency

> warning ""
> The Intercom library itself will be installed as an additional dependency.

### Through Xcode
In the Xcode File menu, click Add Packages. You'll see a dialog where you can search for Swift packages. In the search field, enter the URL to this repo.

https://github.com/segment-integrations/analytics-swift-intercom

You'll then have the option to pin to a version, or specific branch, as well as which project in your workspace to add it to. Once you've made your selections, click the `Add Package`` button.

### Through Package.swift

Open your Package.swift file and add the following do your the dependencies section:
```
.package(
            name: "Segment",
            url: "https://github.com/segment-integrations/analytics-swift-intercom.git",
            from: "1.1.3"
        ),
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Swift library.  Add this plugin to the list of imports.

```
import Segment
import SegmentIntercom // <-- Add this line
```

Just under your Analytics-Swift library setup, call `analytics.add(plugin: ...)` to add an instance of the plugin to the Analytics timeline.

```
let analytics = Analytics(configuration: Configuration(writeKey: "<YOUR WRITE KEY>")
                    .flushAt(3)
                    .trackApplicationLifecycleEvents(true))
analytics.add(plugin: IntercomDestination())
```

Your events will now begin to flow to Intercom in device mode.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example iOS call would look like:

```swift
struct MyTraits: Codable {
        let favoriteColor: String
}

analytics.identify(userId: "a user's id", MyTraits(favoriteColor: "fuscia"))
```

When you call `.identify()`, Segment uses Intercom's `registerUser` method to send the `userId` that was passed in the identify event.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example iOS call would look like:

```swift
struct TrackProperties: Codable {
        let someValue: String
}

analytics.track(name: "My Event", properties: TrackProperties(someValue: "Hello"))
```

When you call `track`, Segment translates it automatically and sends the event to Intercom using Intercom's `logEvent` method.

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example iOS call would look like:

```swift
struct MyTraits: Codable {
        let username: String
        let email: String
        let plan: String
}

analytics.group(groupId: "group123", traits: MyTraits(
        username: "MisterWhiskers",
        email: "hello@test.com",
        plan: "premium"))
```

When you call `Group`, Segment translates it automatically and sends the event to Intercom using Intercom's `updateUser` method. The Group traits are parsed and set using the Intercom `ICMCompany` object.
