---
title: Batch Destination
beta: true
id: 596d11f870a3e552b957e6d9
---
The Batch.com integration code is open sourced on GitHub. Feel free to check it out: [iOS](https://github.com/BatchLabs/ios-segment-integration), [Android](https://github.com/BatchLabs/android-segment-integration).

## Getting Started

* Batch.com supports the `screen`, `track`, `identify` and `group` methods.

* Make a Batch.com account.
* Turn on Batch.com using Segment dashboard.
* Enter your Batch LIVE API Key. You can find it in your dashboard, under 'settings'.

Events tracked using Segment's `track`/`screen` will automatically be tracked. `Identify` and `group` calls will also be mapped to Batch user data.

## Android

### Installation

Add the following dependency in your build.gradle:

```
compile "com.batch.android:sdk-segment-integration:+"
```

Import the integration:

```
import com.segment.analytics.android.integrations.batch.BatchIntegration;

```

Then, add the factory to your Analytics instance:

```java
Analytics analytics = new Analytics.Builder(this, "write_key")
                .use(BatchIntegration.getFactory(this))
                .build();
```


## iOS

### Installation

Add the following Cocoapods dependency:

```
pod 'Segment-Batch'
```

If you integrate in a Swift project or have `use_frameworks!` in your Podfile, you need to use the following to work around due to a limitation with Cocoapods:

```
pod 'Batch'
pod 'Segment-Batch/StaticLibWorkaround'
```

Then, add the integration factory in your Analytics instance:

```objc
#import <Segment-Batch/SEGBatchIntegrationFactory.h>

SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"MySegmentWriteKey"];
[config use:[SEGBatchIntegrationFactory instance]];
[SEGAnalytics setupWithConfiguration:config];
```

## Screen

When you call `screen` in your mobile app, we send a screen view to an event named `SEGMENT_SCREEN`. The screen name will be tracked as the event's label.

## Identify

When you `identify` a user, we'll pass that user's information to Batch as the custom user identifier. Batch supports tracking anonymous users, but not through Segment's `anonymousId`.

Tracked events are attached to the installation ID, and the installation ID itself can be attached/detached to a user at a later date, with no data loss.

## Track

When you `track` an event, we will send that event to Batch after converting the name to fit Batch's event naming rules.

For example, an event named `Ad Shown` will become `AD_SHOWN`. Note that this means that event names longer than 30 characters will be truncated.
The events `title` property will become the event's label.

## Group

When you call `group`, we will set the group ID in a user attribute named `SEGMENT_GROUP`.

## Features

All of our supported Segment integration features will work automatically, with no action or specific properties required on your side.

Batch's other features are available directly by using the native SDK, which comes bundled with this integration.

To use the Batch native SDK through Segment, follow the [instructions for Android](/docs/connections/sources/catalog/libraries/mobile/android/#how-can-i-use-a-destination-specific-feature) and [instructions for iOS](/docs/connections/sources/catalog/libraries/mobile/ios/#what-if-your-sdk-doesnt-support-feature-x).
