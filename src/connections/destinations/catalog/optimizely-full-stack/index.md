---
title: Optimizely Full Stack Destination
hide-personas-partial: true
beta: true
redirect_from: '/connections/destinations/catalog/optimizelyx/'
id: 59d3b44b8f1480000104be6b
---
## Getting Started

{% include content/connection-modes.md %}

Segment's **Optimizely Full Stack (previously Optimizely X)** destination supports the following Optimizely products:

* [Optimizely Full Stack (server)](#server-side)
* [Optimizely Full Stack Android (Cloud-mode)](#android-cloud-mode-implementation)
* [Optimizely Full Stack iOS (Cloud-mode)](#ios-cloud-mode-implementation)

If you're interested in implementing Optimizely X Web or Optimizely Full Stack with the JavaScript SDK, see Segment's [**Optimizely Web** destination](/docs/connections/destinations/catalog/optimizely-web/), which supports:

* [Optimizely X Web](/docs/connections/destinations/catalog/optimizely/#optimizely-x-web)
* [Optimizely Full Stack (JavaScript)](/docs/connections/destinations/catalog/optimizely/#optimizely-full-stack-javascript-)

## Implementation Prerequisite

Optimizely works differently than other Segment destinations: It requires that customers implement some Optimizely functionality natively to make sure your experiment logic runs correctly.

Segment maps `track` events to Optimizely's `track` method, customers must implement all Optimizely decision-based methods, such as `activate` and `isFeatureEnabled` natively. Segment's API does not include methods that correspond to decision-based methods.

This requires that customers include a native Optimizely implementation before their Segment implementation on pages or in mobile apps where Optimizely experiments run.

## Server Side

### Getting Started

1. In your Segment source dashboard, enable the "Optimizely Full Stack" destination (*not the "Optimizely Web" destination*).
2. Include your Optimizely project's `datafile` URL in your Segment settings.
3. Create a native Optimizely instance in your server environment so you can access Optimizely decisioning methods like `activate`, `isFeatureEnabled`.
4. Finally, define any [`events`](https://docs.developers.optimizely.com/full-stack/docs/create-events) and [`attributes`](https://docs.developers.optimizely.com/full-stack/docs/define-attributes) in your Optimizely dashboard, and to associate `metrics` with the appropriate Optimizely Experiments. Segment maps `track` event names to Optimizely `eventName` - the `eventName` corresponds to an experiment `metric`. In addition, Segment maps `track` event `context.traits` to Optimizely `attributes`.

> note ""
> **Note:** If you are using Optimizely SDKs v1.x or v2.x: if a visitor has any `activate` or `isFeatureEnabled` calls, their `attributes` object for these calls must match the `attributes` object passed to any `track` calls for that user id so that it can be correctly attributed on the Optimizely results page.

If you are using Optimizely SDKs v3+, [Easy Event Tracking](https://blog.optimizely.com/2019/02/26/introducing-easy-event-tracking-the-easier-way-to-understand-and-optimize-the-customer-journey/) is enabled by default for decision events. Set up does not require maintaining the attributes of a user as long as the user id stays the same between Optimizely `activate` and `isFeatureEnabled` calls and Segment `track` calls to have Optimizely `metrics` populated in the Optimizely results page. If you would like to segment your Optimizely results by user `attribute`, then make sure the `attributes` passed in for the `activate` and `isFeatureEnabled` calls match the `attributes` passed in for the `track` calls for that user id.

For more details on how events are attributed on the Optimizely results page, refer to their documentation [here](https://help.optimizely.com/Analyze_Results/How_Optimizely_counts_conversions).


### Track

Upon invocation of a Segment `track` event, Segment maps the event to an Optimizely `track` event:
* If the Segment event name matches exactly the name of an active experiment `metric` set up in the Optimizely dashboard;
* If the experiment `metric` is associated with a running experiment;
* If the current user has been assigned a `userId` using Segment's `identify` method (for example,  `analytics.identify('123')`);
* If the current user is activated in a running experiment with the associated `metric`.

Segment also handles the following mapping:
* Segment `track` event name to Optimizely `eventName`.
* Segment `track` event `properties` to Optimizely `eventTags`.
* Segment `track` event `context.traits` to Optimizely `attributes`.

`revenue` values should be passed as a Segment `property`. The value should be an integer and represent the value in cents, so, for example, $1 should be represented by `100`.

> note ""
> **Note**: [Custom Event Tags](https://docs.developers.optimizely.com/full-stack/docs/include-event-tags) in Optimizely, which include all Event Tags except `revenue` and `value`, are not displayed on the Optimizely results page, however they are available in a [Data Export](https://docs.developers.optimizely.com/web/docs/data-export) report. Event Tags can be strings, integers, floating point numbers, or boolean values. Optimizely rejects events with any other data types (for example, arrays).

Segment defaults to identifying users with their `anonymousId`. Enabling the "Use User ID" setting in your Segment settings means that only `track` events triggered by identified users are passed downstream to Optimizely. You may optionally fall back to `anonymousId` when `userId` is unavailable by setting `fallbackToAnonymousId` to `true`.

### Notification Listeners

Segment's server-side integration with Optimizely Full Stack does not support notification listeners for Segment`track` events. [Notification listeners](https://docs.developers.optimizely.com/full-stack/docs/notification-listeners) are still available with any native call invoked from your Optimizely client instance.

## Android Cloud-mode Implementation

### Getting Started

1. In your Segment source dashboard, enable the "Optimizely Full Stack" destination (*not the "Optimizely Web" destination*).
2. Include the latest version of Optimizely Full Stack's native SDK in your your app-level build.gradle file and [implement Optimizely as your would natively](https://docs.developers.optimizely.com/full-stack/docs/install-the-sdk#section-android).
3. Finally, define any [`events`](https://docs.developers.optimizely.com/full-stack/docs/create-events) and [`attributes`](https://docs.developers.optimizely.com/full-stack/docs/define-attributes) in your Optimizely dashboard, and associate `metrics` with the appropriate Optimizely Experiments. Segment maps `track` event names to Optimizely `eventName` - the `eventName` corresponds to an experiment `metric`. In addition, Segment maps `identify` `traits` to Optimizely `attributes`.

When implementing Optimizely Full Stack using cloud-mode, Segment will map `track` events to Optimizely `track` events on our servers and deliver the data to your Optimizely project as usual.

> note ""
> **Note:** If you are using Optimizely SDKs v1.x or v2.x: if a visitor has any `activate` or `isFeatureEnabled` calls, the `attributes` object for these calls must match the `attributes` object passed to any `track` calls for that user id so that it can be correctly attributed on the Optimizely results page.

If you are using Optimizely SDKs v3+, [Easy Event Tracking](https://blog.optimizely.com/2019/02/26/introducing-easy-event-tracking-the-easier-way-to-understand-and-optimize-the-customer-journey/) is enabled by default for decision events. Set up does not require maintaining the attributes of a user as long as the user id stays the same between Optimizely `activate` and `isFeatureEnabled` calls and Segment `track` calls to have Optimizely `metrics` populated in the Optimizely results page. If you would like to segment your Optimizely results by user `attribute`, then make sure the `attributes` passed in for the `activate` and `isFeatureEnabled` calls match the `attributes` passed in for the `track` calls for that user id.

For more details on how events are attributed on the Optimizely results page, refer to their documentation [here](https://help.optimizely.com/Analyze_Results/How_Optimizely_counts_conversions).

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

## Reset

Invoking this method invalidates the listener for the `Experiment Viewed` event.

### Notification Listeners

If you want to use Optimizely's [notification listeners](https://docs.developers.optimizely.com/full-stack/docs/notification-listeners), you must use the Optimizely native code to invoke them (in addition to using the Segment SDKs). Notification listeners require an [instantiated Optimizely client](https://docs.developers.optimizely.com/full-stack/docs/java#section-2-instantiate-optimizely) to be accessed, and so are not available for Segment `track` events when you connect to Optimizely using cloud-mode.


## iOS Cloud-mode Implementation

### Getting Started

1. In your Segment source dashboard, enable the "Optimizely Full Stack" destination (*not the "Optimizely Web" destination*).
2. Include the latest version of Optimizely Full Stack's native SDK in your app and [implement it as you would natively](https://docs.developers.optimizely.com/full-stack/docs/install-the-sdk#section-ios-and-tvos).
3. Finally, define any [`events`](https://docs.developers.optimizely.com/full-stack/docs/create-events) and [`attributes`](https://docs.developers.optimizely.com/full-stack/docs/define-attributes) in your Optimizely dashboard, and to associate `metrics` with the appropriate Optimizely Experiments. Segment maps `track` event names to Optimizely `eventName` - the `eventName` corresponds to an experiment `metric`. In addition, Segment maps `identify` `traits` to Optimizely `attributes`.

When implementing Optimizely using cloud-mode, Segment will map `track` events to Optimizely `track` events on our servers and deliver the data to your Optimizely project as usual.

> note ""
> **Note:** If you are using Optimizely SDKs v1.x or v2.x: if a visitor has any `activate` or `isFeatureEnabled` calls, their `attributes` object for these calls must match the `attributes` object passed to any `track` calls for that user id so that it can be correctly attributed on the Optimizely results page.

If you are using Optimizely SDKs v3+, [Easy Event Tracking](https://blog.optimizely.com/2019/02/26/introducing-easy-event-tracking-the-easier-way-to-understand-and-optimize-the-customer-journey/) is enabled by default for decision events. Set up does not require maintaining the attributes of a user as long as the user id stays the same between Optimizely `activate` and `isFeatureEnabled` calls and Segment `track` calls to have Optimizely `metrics` populated in the Optimizely results page. If you would like to segment your Optimizely results by user `attribute`, then make sure the `attributes` passed in for the `activate` and `isFeatureEnabled` calls match the `attributes` passed in for the `track` calls for that user id.

For more details on how events are attributed on the Optimizely results page, refer to their documentation [here](https://help.optimizely.com/Analyze_Results/How_Optimizely_counts_conversions).

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

## Personas

Follow these instructions on how to set up Personas and Optimizely:

* [Using Segment Personas and Optimizely Full Stack for Omnichannel Experiments](https://www.optimizely.com/insights/blog/segment-personas-optimizely-full-stack-omnichannel-experiments/){:target="_blank"}


## GDPR Support
Segment supports deleting/suppressing users in Optimizely using the [Segment app](/docs/privacy/user-deletion-and-suppression/). In order to do this however, you will need to create a [Personal Access Token](https://developers.optimizely.com/x/authentication/personal-token/) in Optimizely and provide it as the value of the Access Token setting.
