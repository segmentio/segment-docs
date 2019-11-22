---
rewrite: true
title: Singular Destination
---

[Singular](https://www.singular.net/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a Marketing Intelligence Platform that transforms marketing data into accurate, granular and actionable insights to drive growth. By unifying marketing campaign data with attribution data, marketers can measure ROI from every touchpoint across multiple channels for a single source of truth.

This destination is maintained by Singular. For any issues with the destination, please [reach out to Singular Support](mailto:support@singular.net).

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Singular" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Add your Singular "API KEY", found in your Singular Dashboard under 'Settings' > 'SDK Keys', to the Segment Settings UI.

## What's supported

1. Install Attribution
2. Apple Search Ads Attribution
3. Custom Event Tracking
4. Revenue tracking
5. Custom User ID

## Install Attribution

Enable automatic tracking of lifecycle events (`Application Opened`, `Application Installed`, `Application Updated`) via initialization config parameters ([iOS](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/#application-lifecycle-tracking), [Android](https://segment.com/docs/connections/sources/catalog/libraries/mobile/android/#step-2-initialize-the-client)) to track installs and sessions in Singular. The Singular "**session**" will be sent automatically by the integration as long as you are including the events above.


## Apple Search Ads Attribution

To get [iAD attribution](https://searchads.apple.com/help/measure-results/) data into Singular, you must include the [analytics-ios-iads-attribution](https://github.com/segmentio/analytics-ios-iads-attribution) dependency and version 3.6.0 or higher of the [Analytics SDK](https://github.com/segmentio/analytics-ios).

To install it, simply add the following line to your Podfile:
`pod "Analytics"`
`pod "Analytics-iAds-Attribution"`

Then import the header and initialize the configuration:
```
#import <Analytics-iAds-Attribution/SEGADTracker.h>

// Initialize the configuration as you would normally.
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
...

// Configure the client with the iAD middleware to attach iAd properties.
configuration.middlewares = @[ [SEGADTracker middleware] ];

[SEGAnalytics setupWithConfiguration:configuration];

```
When iAd information is available, the attribution information is transformed to Segment context this way:
```
[analytics track:@"Application Installed",
    properties: nil,
    options: @{
      @"context" : @{
        @"campaign" : @{
          @"provider" : @"Apple",
          @"click_date" : attributionInfo[@"iad-click-date"],
          @"conversion_date" : attributionInfo[@"iad-conversion-date"],
          @"source" : @"iAd",
          @"name" : attributionInfo[@"iad-campaign-name"],
          @"content" : attributionInfo[@"iad-keyword"],
          @"ad_creative" : attributionInfo[@"iad-org-name"],
          @"ad_group" : attributionInfo[@"iad-adgroup-name"],
          @"id" : attributionInfo[@"iad-campaign-id"],
          @"ad_group_id" : attributionInfo[@"iad-adgroup-id"]
        }
      }
    }];

```
Singular has explicitly mapped the `Application Installed` lifecycle event to provide the iAd Information.


## Tracking Custom Events

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call (in Android) would look like:

```java
Analytics.with(context).track("Signup")
Analytics.with(context).track("Level9Passed")
```

Those calls will be sent to Singular and processed as custom post-install events and will be available in reporting & user-level exports.

## Revenue Tracking

Singular will receive revenue tracking when an event containing the `revenue` property is sent (including zero value). You can optionally pass the `currency` (as an iso3 code). The default currency is `USD`.


For example in Android you would do:

```java
Analytics.with(context).track("Order Completed", new Properties().putRevenue(1.99));
```

## Custom User ID
Singular has mapped the **Custom User ID** to the Segment [User ID](https://segment.com/docs/connections/spec/identify/#user-id) value. Follow the steps here to configure for: [iOS](https://segment.com/docs/connections/sources/catalog/libraries/mobile/ios/#identify), [Android](https://segment.com/docs/connections/sources/catalog/libraries/mobile/android/#identify).
