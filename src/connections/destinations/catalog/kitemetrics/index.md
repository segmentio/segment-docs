---
title: Kitemetrics Destination
rewrite: true
id: 5ca6a9bcc7781c00018a4580
---
[Kitemetrics](https://kitemetrics.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides keyword level attribution for Apple Search Ads and associates them with In-App Purchases.  Kitemetrics allows you to use automation to easily manage and optimize Apple Search Ads campaigns and bids.

This destination is maintained by Kitemetrics. For any issues with the destination, [contact the Kitemetrics Support team](mailto:support@kitemetrics.com).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}


1. From the Segment web app, click **Catalog**.
2. Search for "Kitemetrics" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Kitemetrics Account Settings -> Applications page](https://cloud.kitemetrics.com/applications).
4. Once data is flowing from your source to the Kitemetrics destination, you will need to refresh your browser to view the latest data in your Kitemetrics analytics or keywords dashboard.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does.

In order to track Apple Search Ads attribution events you will need to include the [Analytics-iAds-Attribution](https://github.com/segmentio/analytics-ios-iads-attribution) middleware library in your iOS source application.

If you are using Cocoa Pods, ensure the following two lines are included:

```ruby
pod "Analytics"
pod "Analytics-iAds-Attribution"
```

Segment and Kitemetrics can automatically record the following events: "Application Installed", "Application Opened", "Application Updated" and “In-App Purchases”. In order to capture those events you need to enable automatic tracking.  Ensure you set up [SEGAnalyticsConfiguration](/docs/connections/sources/catalog/libraries/mobile/ios/) as shown below:

Swift
```swift
let configuration = SEGAnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")
configuration.trackApplicationLifecycleEvents = true
configuration.trackInAppPurchases = true
configuration.middlewares = [SEGADTracker.middleware()]
SEGAnalytics.setup(with: configuration)
```

Objective-C
```objc
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES;
configuration.trackInAppPurchases = YES;
configuration.middlewares = @[ [SEGADTracker middleware] ];
[SEGAnalytics setupWithConfiguration:configuration];
```

Kitemetrics will show the device installs, sessions and purchases on the Analytics Dashboard. Apple Search Ads keyword attribution and average revenue per user will show up at the Keywords page.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. You can turn on automatic screen tracking and/or call it manually. An example manual call would look like:

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

Screen calls will be sent to Kitemetrics as a `custom event`.  They are available for selection as a KPI in Settings -> KPI. Screen calls can be a maximum of 255 characters.  Do not include personally identifiable information. Omit parameters or attributes from the Screen Call.
