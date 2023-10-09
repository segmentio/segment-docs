---
title: 'Analytics-Swift for iOS & Apple'
strat: swift
redirect_from:
  - '/connections/sources/catalog/cloud-apps/swift/'
  - '/connections/sources/catalog/libraries/mobile/swift-ios/'
id: dZeHygTSD4
tags:
  - apple
  - swift
  - ios
---
With Analytics-Swift, you can send data from iOS, tvOS, iPadOS, WatchOS, macOS and Linux applications to any analytics or marketing tool without having to learn, test, or implement a new API every time. Analytics-Swift is compatible with both Swift and Objective-C applications. 

> warning ""
> If you're migrating to **Analytics-Swift** from Analytics iOS (Classic), you can skip to the [migration guide](/docs/connections/sources/catalog/libraries/mobile/apple/migration/).

## Benefits of Analytics-Swift

Analytics-Swift provides several key benefits including improvements in stability, performance, and developer experience when compared to Analytics iOS (Classic). 
### Performance

Analytics-Swift offers improved performance when compared to Analytics iOS. For a more detailed overview, you can reference the [blog post](https://segment.com/blog/sdk-performance-improvements/). 

- Faster event processing and deliver
- Significantly lower CPU usage
- Small memory & disk usage footprint

### Developer Experience

Analytics-Swift adds several improvements to the overall experience of using the core SDK, as well as improvements to the overall [Plugin Architecture](/docs/connections/sources/catalog/libraries/mobile/swift/swift-plugin-architecture).

- Ability to use Type Safe data structures rather than just dictionaries.
- Simpler syntax and more developer friendly overall.
- More customization options than ever before.

### Device Mode Transformations & Filtering
For the first time ever, developers can filter and transform their users’ events even before the events leave the mobile device. What’s more, these Filters & transformations can be applied dynamically (either through the Segment Dashboard, or Javascript uploaded to the workspace) and do not require any app updates.

Learn more about [Destination Filters](https://github.com/segmentio/DestinationFilters-swift) on Mobile, and [Edge Functions](https://github.com/segmentio/EdgeFn-Swift) on Mobile. 

## Getting started
To get started with the Analytics-Swift mobile library:

1. Create a Source in Segment.
    1. Go to **Connections > Sources > Add Source**.
    2. Search for **Apple** and click **Add source**.

2. Add the Analytics dependency to your application.
    Add the Swift package, `git@github.com:segmentio/analytics-swift.git` as a dependency through either of these 2 options:
    1. Your package.swift file
    2. Xcode
        1. Xcode 12: **File > Swift Packages > Add Package Dependency**
        2. Xcode 13: **File > Add Packages…**

    After installing the package, you can reference Analytics-Swift by importing Segment's Analytics package with `import Segment`.

3. Initialize and configure the Analytics-Swift client.
    For example, in a lifecycle method such as `didFinishLaunchingWithOptions` in iOS:

{% codeexample %}
{% codeexampletab Swift%}
  ```swift
    var analytics: Analytics? = nil

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
            // Override point for customization after application launch.
            let configuration = Configuration(writeKey: "WRITE_KEY")
                .trackApplicationLifecycleEvents(true)
                .flushInterval(10)

            analytics = Analytics(configuration: configuration)
    }
  ```
{% endcodeexampletab %}
{% codeexampletab Objective-C %}
```objc
  @import Segment;
  ...

  - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
      // Override point for customization after application launch.
      SEGConfiguration *config = [[SEGConfiguration alloc] initWithWriteKey:@"WRITE_KEY"];
      config.trackApplicationLifecycleEvents = YES;
    
      _analytics = [[SEGAnalytics alloc] initWithConfiguration: config];    

      [self.analytics track:@"Example Event"];
      [self.analytics track:@"Example Properties" properties:@{@"email": @"sloth@segment.com"}];
    
      return YES;
  }
 ```
{% endcodeexampletab %}
{% endcodeexample %}

These are the options you can apply to configure the client:

 Option Name | Description
----------- | ------------
`writeKey` *required* | This is your Segment write key.
`apiHost` | The default is set to `api.segment.io/v1`. <br> This sets a default API Host to which Segment sends event.
`autoAddSegmentDestination` | The default is set to `true`. <br> This automatically adds the Segment Destination plugin. Set to `false` if you want to add plugins to the Segment Destination.
`cdnHost` | The default is set to `cdn-settings.segment.com/v1`. <br> This sets a default CDN Host from which Segment retrieves settings.
`defaultSettings`| The default is set to `{}`. <br> This is the settings object used as fallback in case of network failure.
`flushAt`| The default is set to `20`. <br> The count of events at which Segment flushes events.
`flushInterval`| The default is set to `30` (seconds). <br> The interval in seconds at which Segment flushes events.
`trackApplicationLifecycleEvents`| The default is set to `true`. <br> This automatically tracks lifecycle events. Set to `false` to stop tracking lifecycle events.

> info "AppClip Tracking"
> If you are tracking App Clips using iOS or Swift libraries, you may encounter zeros in your device ID. Segment recommends that you set your own device ID in these instances to avoid this issue.

### Core tracking methods
Once you've installed the Analytics-Swift library, you can start collecting data through Segment's tracking methods:

- [Track](/docs/connections/sources/catalog/libraries/mobile/swift/implementation/#track)
- [Identify](/docs/connections/sources/catalog/libraries/mobile/swift/implementation/#identify)
- [Screen](/docs/connections/sources/catalog/libraries/mobile/swift/implementation/#screen)
- [Group](/docs/connections/sources/catalog/libraries/mobile/swift/implementation/#group)
- [Alias](/docs/connections/sources/catalog/libraries/mobile/swift/implementation/#alias)

## Destinations
Destinations are the business tools or apps that Segment forwards your data to. Adding Destinations allow you to act on your data and learn more about your customers in real time.

<br>Segment offers support for two different types of Destinations, learn more about the differences between the two [here]().

<div class="double">
  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/swift/cloud-mode-destinations"
    icon="destinations-catalog/cloud-apps.svg"
    title="Cloud-mode Destinations"
    description="Destinations that can be enabled from your Segment workspace and require no additional app setup."
    newtab="false"
  %}

  {% include components/reference-button.html
    href="/docs/connections/sources/catalog/libraries/mobile/swift/destination-plugins"
    icon="destinations-catalog/mobile.svg"
    title="Device-mode Destinations"
    description="Destinations that require additional app setup, and limit certain Segment functionality."
    newtab="false"
  %}
</div>

## Control upload with Flush Policies
To granularly control when Segment uploads events you can use `flushPolicies`.
A Flush Policy defines the strategy for deciding when to flush. This can be on an interval, time of day, after receiving a certain number of events, or after receiving a particular event. This gives you more flexibility on when to send event to Segment.
Set Flush Policies in the configuration of the client:
```swift
    let intervalPolicy = IntervalBasedFlushPolicy(interval: 5);
    let countPolicy = CountBasedFlushPolicy(count: 5)

    let configuration = Configuration(writeKey: myKey)
        .trackApplicationLifecycleEvents(true)
        .flushPolicies([intervalPolicy, countPolicy])
        .flushInterval(1)
```
You can set several policies at a time. When a flush occurs, it triggers an upload of the events, then resets the logic after every flush. 
As a result, only the first policy to reach `shouldFlush` will trigger a flush. In the example above either the event count reaches 5 or the timer reaches 5 seconds, whatever comes first will trigger a flush.
Segment has several standard Flush Policies:
- `CountBasedFlushPolicy` triggers when you reach a certain number of events
- `IntervalBasedFlushPolicy` triggers on an interval of milliseconds

### Adding or removing policies
One of the main advantages of Flush Policies is that you can add and remove policies on the fly. This is very powerful when you want to reduce or increase the amount of flushes. Please see the below example on how to add and remove Flush Policies
```swift
        analytics?.remove(flushPolicy: countPolicy)
        
        let newCountPolicy = CountBasedFlushPolicy(count: 50)
        analytics?.add(flushPolicy: newCountPolicy)
```
### Creating your own flush policies
You can create a custom Flush Policy special for your application needs by implementing the  `FlushPolicy` protocol. Your policies have a `shouldFlush` method. When this returns true the client attempts to upload events.

```swift
import Foundation
import Segment

public class ScreenFlushPolicy: FlushPolicy {
    public var analytics: Segment.Analytics?

    init() { }
    
    public func configure(analytics: Segment.Analytics) {
    }
    
    public func updateState(event: Segment.RawEvent) {
        if (event.type == "Screen") {
            shouldFlush()
        }
    }
    
    public func reset() {
    }
    
    public func shouldFlush() -> Bool {
        return true
    }
}
```

## Tools and extensions

Analytics for Swift is built with extensibility in mind. Use the tools list below to improve data collection.

- [Plugin architecture](/docs/connections/sources/catalog/libraries/mobile/swift/swift-plugin-architecture)
- [Typewriter](/docs/connections/sources/catalog/libraries/mobile/swift/swift-typewriter)
- [Destination Filters](/docs/connections/sources/catalog/libraries/mobile/swift/swift-destination-filters)
- [Code samples](/docs/connections/sources/catalog/libraries/mobile/swift/swift-samples)

> warning ""
> If you are using the Analytics iOS (Classic) SDK, you can find [the documentation here](/docs/connections/sources/catalog/libraries/mobile/ios). Many of the features available in the Analytics-Swift SDK are not available in the Analytics iOS (Classic) SDK. 

