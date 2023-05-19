---
title: Analytics Kotlin Optimizely Full Stack Plugin
strat: kotlin-android
---

## Getting Started

1. In your Segment source dashboard, enable the "Optimizely Full Stack" destination (*not the "Optimizely Web" destination*).
2. Include your Optimizely project's `datafile` URL in your Segment settings.
3. Create a native Optimizely instance in your server environment so you can access Optimizely decisioning methods like `activate`, `isFeatureEnabled`.
4. Finally, define any [`events`](https://docs.developers.optimizely.com/full-stack/docs/create-events) and [`attributes`](https://docs.developers.optimizely.com/full-stack/docs/define-attributes) in your Optimizely dashboard, and to associate `metrics` with the appropriate Optimizely Experiments. Segment maps `track` event names to Optimizely `eventName` - the `eventName` corresponds to an experiment `metric`. In addition, Segment maps `track` event `context.traits` to Optimizely `attributes`.

Add Optimizely Full integration to your applications via this plugin for [Analytics-Kotlin](https://github.com/segmentio/analytics-kotlin).


## Adding the dependency
To install the Segment-Optimizely-Full Stack integration, simply add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:optimizely-full-stack:<latest_version>'
```

Or the following for Kotlin DSL

```
implementation('com.segment.analytics.kotlin.destinations:optimizely-full-stack:<latest_version>')
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library.  Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.optimizelyfull.OptimizelyFullDestinaton
```

Since the Optimizely Manager should be initialized as soon as possible in your application subclass, we leave it up to you to create this instance. You must then pass it to the Plugin.

```
   manager = OptimizelyManager.builder()
      .withSDKKey("<WRITE_YOUR_OPTIMIZELY_SDK-KEY>")
      .build(applicationContext)
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = OptimizelyFullDestinaton(optimizelyManager = manager))
```

Your events will now begin to flow to Optimizely-Full Stack in device mode.

### Track

Upon invocation of a Segment `track` event, Segment maps the event to an Optimizely `track` event:
* If the Segment event name matches exactly the name of an active experiment `metric` set up in the Optimizely dashboard;
* If the experiment `metric` is associated with a running experiment;
* If the current user is activated in a running experiment with the associated `metric`.

Segment also handles the following mapping:
* Segment `track` event name to Optimizely `eventName`.
* Segment `track` event `properties` to Optimizely `eventTags`.

`revenue` values should be passed as a Segment `property`. The value should be an integer and represent the value in cents, so, for example, $1 should be represented by `100`.

> note ""
> **Note:** [Custom Event Tags](https://docs.developers.optimizely.com/full-stack/docs/include-event-tags) in Optimizely, which include all Event Tags except `revenue` and `value`, are not displayed on the Optimizely results page, however they are available in a [Data Export](https://docs.developers.optimizely.com/web/docs/data-export) report. Event Tags can be strings, integers, floating point numbers, or boolean values. Optimizely rejects events with any other data types (for example,  arrays).

Segment defaults to identifying users with their `anonymousId`. Enabling "Use User ID" setting in your Segment dashboard means that only `track` events triggered by identified users are passed downstream to Optimizely. You may optionally fall back to `anonymousId` when `userId` is unavailable by setting `fallbackToAnonymousId` to `true`.

### Identify

Invoking a Segment `identify` event sets Segment `traits` as Optimizely `attributes`. The `attributes` are sent downstream to Optimizely upon invocation of the next Segment `track` event.

### Notification Listeners

Notification listeners are not available for Segment `track` events when implementing Optimizely using Segment using cloud-mode. [Notification listeners](https://docs.developers.optimizely.com/full-stack/docs/notification-listeners) are still available with any native call invoked from your Optimizely client instance.

## Engage

Follow these instructions on how to set up Engage and Optimizely:

* [Using Segment Personas and Optimizely Full Stack for Omnichannel Experiments](https://www.optimizely.com/insights/blog/segment-personas-optimizely-full-stack-omnichannel-experiments/){:target="_blank"}


## GDPR Support
Segment supports deleting/suppressing users in Optimizely using the [Segment app](/docs/privacy/user-deletion-and-suppression/). In order to do this however, you will need to create a [Personal Access Token](https://developers.optimizely.com/x/authentication/personal-token/) in Optimizely and provide it as the value of the Access Token setting.
