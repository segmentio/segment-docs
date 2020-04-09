---
title: Optimizely Full Stack Destination
hide-personas-partial: true
beta: true
redirect_from: '/connections/destinations/catalog/optimizelyx'
---

## Getting Started

{% include content/connection-modes.md %}

Segment's **Optimizely Full Stack (previously Optimizely X)** destination supports the following Optimizely products:

* [Optimizely Full Stack (server)](#server-side)
* [Optimizely Full Stack Android (Cloud-mode)](#android-cloud-mode-implementation)
* [Optimizely Full Stack iOS (Cloud-mode)](#ios-cloud-mode-implementation)

If you're interested in implementing Optimizely Classic, Optimizely X Web, or Optimizely Full Stack (JavaScript), please see Segment's [**Optimizely Web** destination](https://segment.com/docs/connections/destinations/catalog/optimizely-web/), which supports:

* [Optimizely Classic](https://segment.com/docs/connections/destinations/catalog/optimizely/#optimizely-classic-web)
* [Optimizely Classic Android 1.x](https://segment.com/docs/connections/destinations/catalog/optimizely/#optimizely-classic-android) (NOTE: This has been deprecated by Optimizely as of September 30, 2018.)
* [Optimizely Classic iOS 1.x](https://segment.com/docs/connections/destinations/catalog/optimizely/#optimizely-classic-ios) (NOTE: This has been deprecated by Optimizely as of September 30, 2018.)
* [Optimizely X Web](https://segment.com/docs/connections/destinations/catalog/optimizely/#optimizely-x-web)
* [Optimizely Full Stack (JavaScript)](https://segment.com/docs/connections/destinations/catalog/optimizely/#optimizely-full-stack-javascript-)

## Implementation Prerequisite

Optimizely works differently than other Segment destinations: It requires that customers implement at least some Optimizely functionalities natively.

Although Segment maps `track` events to Optimizely's `track` method, customers must implement all Optimizely decision-based methods, such as `activate`, `isFeatureEnabled`, etc., natively. Segment's API does not include methods that correspond to decision-based methods.

This limitation requires that customers include a native Optimizely implementation before their Segment implementation on pages or in mobile apps where Optimizely experiments run.

## Server Side

### Getting Started

1. In your Segment source dashboard, enable the "Optimizely Full Stack" destination (*not the "Optimizely Web" destination*).
2. Include your Optimizely project's `projectId` and `datafile` URL in your Segment settings.
3. Create a native Optimizely instance in your server environment so you can access Optimizely methods like `activate`, `isFeatureEnabled`, etc.
3. Finally, define any `metrics` and `attributes` in your Optimizely dashboard, and to associate `metrics` with the appropriate Optimizely experiments. Segment maps `track` event names to Optimizely `eventName` - the `eventName` corresponds to an experiment `metric`. In addition, Segment maps `track` event `context.traits` to Optimizely `attributes`.

### Track

Upon invocation of a Segment `track` event, Segment maps the event to an Optimizely `track` event:
* If the Segment event name matches exactly the name of an active experiment `metric` set up in the Optimizely dashboard;
* If the experiment `metric` is associated with a running experiment;
* If the current user has been assigned a `userId` via Segment's `identify` method (e.g. `analytics.identify('123')`);
* If the current user is activated in a running experiment with the associated `metric`.

Segment also handles the following mapping:
* Segment `track` event name to Optimizely `eventName`.
* Segment `track` event `properties` to Optimizely `eventTags`.
* Segment `track` event `context.traits` to Optimizely `attributes`.

`revenue` values should be passed as a Segment `property`. The value should be an integer and represent the value in cents, so, for example, $1 should be represented by `100`.

Segment defaults to identifying users with their `anonymousId`. Enabling the "Use User ID" setting in your Segment settings means that only `track` events triggered by identified users are passed downstream to Optimizely. You may optionally fall back to `anonymousId` when `userId` is unavailable by setting `fallbackToAnonymousId` to `true`.

### Notification Listeners

Segment's server-side integration with Optimizely Full Stack does not support notification listeners.

## Android Cloud-mode Implementation

### Getting Started

1. In your Segment source dashboard, enable the "Optimizely Full Stack" destination (*not the "Optimizely Web" destination*).
2. Include the latest version of Optimizely Full Stack's native SDK in your your app-level build.gradle file and [implement Optimizely as your would natively](https://docs.developers.optimizely.com/full-stack/docs/install-the-sdk#section-android).
3. Finally, define any `metrics` and `attributes` in your Optimizely dashboard, and to associate `metrics` with the appropriate Optimizely Experiments. Segment maps `track` event names to Optimizely `eventName` - the `eventName` corresponds to an experiment `metric`. In addition, Segment maps `identify` `traits` to Optimizely `attributes`.

When implementing Optimizely Full Stack via cloud-mode, Segment will map `track` events to Optimizely `track` events on our servers and deliver the data to your Optimizely project as usual.

### Track

Upon invocation of a Segment `track` event, Segment maps the event to an Optimizely `track` event:
* If the Segment event name matches exactly the name of an active experiment `metric` set up in the Optimizely dashboard;
* If the experiment `metric` is associated with a running experiment;
* If the current user is activated in a running experiment with the associated `metric`.

Segment also handles the following mapping:
* Segment `track` event name to Optimizely `eventName`.
* Segment `track` event `properties` to Optimizely `eventTags`.

`revenue` values should be passed as a Segment `property`. The value should be an integer and represent the value in cents, so, for example, $1 should be represented by `100`.

Segment defaults to identifying users with their `anonymousId`. Enabling "Use User ID" setting in your Segment dashboard means that only `track` events triggered by identified users are passed downstream to Optimizely. You may optionally fall back to `anonymousId` when `userId` is unavailable by setting `fallbackToAnonymousId` to `true`.

### Identify

Invoking a Segment `identify` event sets Segment `traits` as Optimziely `attributes`. The `attributes` are sent downstream to Optimizely upon invocation of the next Segment `track` event.

## Reset

Invoking this method invalidates the listener for the `Experiment Viewed` event.

### Notification Listeners

Notification listeners are not available when implementing Optimizely via Segment using cloud-mode. However, notification listeners are straightforward to set up, as [documented here on Optimizely's site](https://docs.developers.optimizely.com/full-stack/docs/notification-listeners).

## iOS Cloud-mode Implementation

### Getting Started

1. In your Segment source dashboard, enable the "Optimizely Full Stack" destination (*not the "Optimizely Web" destination*).
2. Include the latest version of Optimizely Full Stack's native SDK in your app and [implement it as you would natively](https://docs.developers.optimizely.com/full-stack/docs/install-the-sdk#section-ios-and-tvos).
3. Finally, define any `metrics` and `attributes` in your Optimizely dashboard, and to associate `metrics` with the appropriate Optimizely Experiments. Segment maps `track` event names to Optimizely `eventName` - the `eventName` corresponds to an experiment `metric`. In addition, Segment maps `identify` `traits` to Optimizely `attributes`.

When implementing Optimizely via cloud-mode, Segment will map `track` events to Optimizely `track` events on our servers and deliver the data to your Optimizely project as usual.

### Track

Upon invocation of a Segment `track` event, Segment maps the event to an Optimizely `track` event:
* If the Segment event name matches exactly the name of an active experiment `metric` set up in the Optimizely dashboard;
* If the experiment `metric` is associated with a running experiment;
* If the current user is activated in a running experiment with the associated `metric`.

Segment also handles the following mapping:
* Segment `track` event name to Optimizely `eventName`.
* Segment `track` event `properties` to Optimizely `eventTags`.

`revenue` values should be passed as a Segment `property`. The value should be an integer and represent the value in cents, so, for example, $1 should be represented by `100`.

Segment defaults to identifying users with their `anonymousId`. Enabling "Use User ID" setting in your Segment dashboard means that only `track` events triggered by identified users are passed downstream to Optimizely. You may optionally fall back to `anonymousId` when `userId` is unavailable by setting `fallbackToAnonymousId` to `true`.

### Identify

Invoking a Segment `identify` event sets Segment `traits` as Optimziely `attributes`. The `attributes` are sent downstream to Optimizely upon invocation of the next Segment `track` event.

### Notification Listeners

Notification listeners are not available when implementing Optimizely via Segment using cloud-mode. However, notification listeners are straightforward to set up, as [documented here on Optimizely's site](https://docs.developers.optimizely.com/full-stack/docs/notification-listeners).

## Personas

Please follow these instructions on how to setup Personas and Optimizely:

* [Using Segment Personas and Optimizely Full Stack for Omnichannel Experiments](https://blog.optimizely.com/tag/segment-personas/)

## GDPR Support
Segment supports deleting/suppressing users in Optimizely via the [Segment app](https://segment.com/docs/privacy/user-deletion-and-suppression/). In order to do this however, you will need to create a [Personal Access Token](https://developers.optimizely.com/x/authentication/personal-token/) in Optimizely and provide it as the value of the [Access Token](#access-token) setting.
