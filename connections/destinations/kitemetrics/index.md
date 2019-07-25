---
rewrite: true
---
[Kitemetrics](https://kitemetrics.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides keyword level attribution for Apple Search Ads and associates them with In-App Purchases.  Kitemetrics allows you to leverage automation to easily manage and optimize Apple Search Ads campaigns and bids.

This destination is maintained by Kitemetrics. For any issues with the destination, please [reach out to their team](mailto:support@kitemetrics.com).

_**NOTE:** The Kitemetrics Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 9, 2019. If you are interested in joining their beta program or have any feedback to help improve the Kitemetrics Destination and its documentation, please [let  their team know](mailto:support@kitemetrics.com)!_


## Getting Started

<!-- {{>connection-modes}} -->


1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Kitemetrics" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Kitemetrics Account Settings -> Applications page](https://cloud.kitemetrics.com/applications).
4. Once data is flowing from your source to the Kitemetrics destination, you will need to refresh your browser to view the latest data in your Kitemetrics analytics or keywords dashboard.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does.

In order to track Apple Search Ads attribution events you will need to include the [Analytics-iAds-Attribution](https://github.com/segmentio/analytics-ios-iads-attribution) middleware library in your iOS source application.

If you are using Cocoa Pods, ensure the following two lines are included:

```ruby
pod "Analytics"
pod "Analytics-iAds-Attribution"
```

Segment and Kitemetrics can automatically record the following events: "Application Installed", "Application Opened", "Application Updated", "Install Attributed" and "In-App Purchases".  In order to capture those events you need to enable automatic tracking.  Ensure you setup [SEGAnalyticsConfiguration](https://segment.com/docs/sources/mobile/ios/) as shown below:

Swift
```swift
let configuration = SEGAnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")
configuration.trackApplicationLifecycleEvents = true
configuration.trackAttributionData = true
configuration.trackInAppPurchases = true
configuration.middlewares = [SEGADTracker.middleware()]
SEGAnalytics.setup(with: configuration)
```

Objective-C
```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES;
configuration.trackAttributionData = YES;
configuration.trackInAppPurchases = YES;
configuration.middlewares = @[ [SEGADTracker middleware] ];
[SEGAnalytics setupWithConfiguration:configuration];
```

Kitemetrics will show the device installs, sessions and purchases on the Analytics Dashboard. Apple Search Ads keyword attribution and average revenue per user will show up at the Keywords page.


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/screen/) does. You can turn on automatic screen tracking and/or call it manually. An example manual call would look like:

Swift
```swift
SEGAnalytics.shared().screen("Screen Title")
```

Objective-C
```objc
[[SEGAnalytics sharedAnalytics] screen:@"Screen Title"];
```

To turn on automatic screen tracking, set the SEGAnalyticsConfiguration, recordScreenViews property to true.

Swift
```swift
configuration.recordScreenViews = true
```

Objective-C
```objc
configuration.recordScreenViews = YES;
```

Screen calls will be sent to Kitemetrics as a `custom event`.  They are available for selection as a KPI in Settings -> KPI. Screen calls can be a maximum of 255 characters.  Do not include personally identifiable information. Please omit parameters or attributes from the Screen Call.
