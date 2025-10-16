---
title: Optimizely Full Stack Destination
hide-personas-partial: true
redirect_from: '/connections/destinations/catalog/optimizelyx/'
id: 59d3b44b8f1480000104be6b
---
## Getting started

Segment's Optimizely Full Stack destination, previously Optimizely X, supports the following Optimizely products:

* [Optimizely Full Stack (server)](#server-side).
* [Optimizely Full Stack Android (Cloud-mode)](#android-cloud-mode-implementation).
* [Optimizely Full Stack iOS (Cloud-mode)](#ios-cloud-mode-implementation).

If you're interested in implementing Optimizely X Web or Optimizely Full Stack with the JavaScript SDK, see Segment's [**Optimizely Web Destination**](/docs/connections/destinations/catalog/optimizely-web/), or follow the links below:

* [Optimizely X Web](/docs/connections/destinations/catalog/optimizely/#optimizely-x-web).
* [Optimizely Full Stack (JavaScript SDK)](/docs/connections/destinations/catalog/optimizely-web/#optimizely-full-stack-javascript-sdk).

## Implementation prerequisite

Optimizely works differently than other Segment destinations. It requires that customers implement some Optimizely functionality natively to make sure the experiment logic runs correctly.

Segment maps Track events to Optimizely's `track` method, customers must implement all Optimizely decision-based methods, such as `activate` and `isFeatureEnabled` natively. Segment's API doesn't include methods that correspond to decision-based methods.

This requires that customers include a native Optimizely implementation before their Segment implementation on pages or in mobile apps where Optimizely experiments run.

## Server-side

### Getting started

1. In your Segment source dashboard, enable the "Optimizely Full Stack" destination (**not the "Optimizely Web" destination**).
2. Include your Optimizely project's `datafile` URL in your Segment settings.
3. Create a native Optimizely instance in your server environment so you can access Optimizely decisioning methods like `activate`, `isFeatureEnabled`.
4. Finally, define any [`events`](https://docs.developers.optimizely.com/full-stack/docs/create-events){:target="_blank"} and [`attributes`](https://docs.developers.optimizely.com/full-stack/docs/define-attributes){:target="_blank"} in your Optimizely dashboard, and to associate `metrics` with the appropriate Optimizely Experiments. Segment maps Track event names to Optimizely `eventName` - the `eventName` corresponds to an experiment `metric`. In addition, Segment maps Track event `context.traits` to Optimizely `attributes`.

> warning "Optimizely SDKs v1.x or v2.x require matching `attributes` objects for correct attribution"
> If you use Optimizely SDKs v1.x or v2.x and use any `activate` or `isFeatureEnabled` calls, the `attributes` object for each user must match the `attributes` object passed to any Track calls for that user ID so that it can be correctly attributed on the Optimizely results page.

If you are using Optimizely SDKs v3+, [Easy Event Tracking](https://blog.optimizely.com/2019/02/26/introducing-easy-event-tracking-the-easier-way-to-understand-and-optimize-the-customer-journey/){:target="_blank"} is enabled by default for decision events. Set up does not require maintaining the attributes of a user as long as the user ID stays the same between Optimizely `activate` and `isFeatureEnabled` calls and Segment Track calls to have Optimizely `metrics` populated in the Optimizely results page. If you would like to segment your Optimizely results by user `attribute`, then make sure the `attributes` passed in for the `activate` and `isFeatureEnabled` calls match the `attributes` passed in for the Track calls for that user id.

For more details on how events are attributed on the Optimizely results page, refer to Optimizely's documentation on [How Optimzely Experimentation counts conversions](https://support.optimizely.com/hc/en-us/articles/19888476989325-How-Optimizely-Experimentation-counts-conversions){:target="_blank"}.


### Track

Upon invocation of a Segment Track event, Segment maps the event to an Optimizely `track` event:
* If the Segment event name matches exactly the name of an active experiment `metric` set up in the Optimizely dashboard.
* If the experiment `metric` is associated with a running experiment.
* If the current user has been assigned a `userId` using Segment's Identify method (for example,  `analytics.identify('123')`).
* If the current user is activated in a running experiment with the associated `metric`.

Segment also handles the following mapping:
* Segment Track event name to Optimizely `eventName`.
* Segment Track event `properties` to Optimizely `eventTags`.
* Segment Track event `context.traits` to Optimizely `attributes`.

`revenue` values should be passed as a Segment `property`. The value should be an integer and represent the value in cents. For example, $1 should be represented by `100`.

> info "Custom Event Tags are not displayed on the Optimizely results page"
> Optimizely's [Custom Event Tags](https://docs.developers.optimizely.com/full-stack/docs/include-event-tags){:target="_blank"}, which include all Event Tags except `revenue` and `value`, are not displayed on the Optimizely results page. However, these tags are available in a [Data Export](https://docs.developers.optimizely.com/web/docs/data-export){:target="_blank"} report. Event Tags can be strings, integers, floating point numbers, or boolean values. Optimizely rejects events with any other data types (for example, arrays).

Segment defaults to identifying users with their `anonymousId`. Enabling the **Use User ID** setting in your Segment settings means that only Track events triggered by identified users are passed downstream to Optimizely. You may optionally fall back to `anonymousId` when `userId` is unavailable by setting `fallbackToAnonymousId` to `true`.

### Notification listeners

Segment's server-side integration with Optimizely Full Stack does not support notification listeners for SegmentTrack events. [Notification listeners](https://docs.developers.optimizely.com/full-stack/docs/notification-listeners){:target="_blank"} are still available with any native call invoked from your Optimizely client instance.

## Android cloud-mode implementation

### Getting started

1. In your Segment source dashboard, enable the "Optimizely Full Stack" destination (**not the "Optimizely Web" destination**).
2. Include the latest version of Optimizely Full Stack's native SDK in your your app-level build.gradle file and [implement Optimizely as your would natively](https://docs.developers.optimizely.com/full-stack/docs/install-the-sdk#section-android){:target="_blank"}.
3. Finally, define any [`events`](https://docs.developers.optimizely.com/full-stack/docs/create-events){:target="_blank"} and [`attributes`](https://docs.developers.optimizely.com/full-stack/docs/define-attributes){:target="_blank"} in your Optimizely dashboard, and associate `metrics` with the appropriate Optimizely Experiments. Segment maps Track event names to Optimizely `eventName` - the `eventName` corresponds to an experiment `metric`. In addition, Segment maps Identify `traits` to Optimizely `attributes`.

When implementing Optimizely Full Stack using cloud-mode, Segment maps Track events to Optimizely Track events on our servers and deliver the data to your Optimizely project as usual.

> warning "Optimizely SDKs v1.x or v2.x require matching `attributes` objects for correct attribution"
> If you use Optimizely SDKs v1.x or v2.x and use any `activate` or `isFeatureEnabled` calls, the `attributes` object for each user must match the `attributes` object passed to any Track calls for that user id so that it can be correctly attributed on the Optimizely results page.

If you are using Optimizely SDKs v3+, [Easy Event Tracking](https://blog.optimizely.com/2019/02/26/introducing-easy-event-tracking-the-easier-way-to-understand-and-optimize-the-customer-journey/){:target="_blank"} is enabled by default for decision events. Set up does not require maintaining the attributes of a user as long as the user id stays the same between Optimizely `activate` and `isFeatureEnabled` calls and Segment Track calls to have Optimizely `metrics` populated in the Optimizely results page. If you would like to segment your Optimizely results by user `attribute`, then make sure the `attributes` passed in for the `activate` and `isFeatureEnabled` calls match the `attributes` passed in for the Track calls for that user id.

For more details on how events are attributed on the Optimizely results page, refer to Optimizely's documentation on [How Optimzely Experimentation counts conversions](https://support.optimizely.com/hc/en-us/articles/19888476989325-How-Optimizely-Experimentation-counts-conversions){:target="_blank"}.

### Track

Upon invocation of a Segment Track event, Segment maps the event to an Optimizely Track event:
* If the Segment event name matches exactly the name of an active experiment `metric` set up in the Optimizely dashboard.
* If the experiment `metric` is associated with a running experiment.
* If the current user is activated in a running experiment with the associated `metric`.

Segment also handles the following mapping:
* Segment Track event name to Optimizely `eventName`.
* Segment Track event `properties` to Optimizely `eventTags`.

`revenue` values should be passed as a Segment `property`. The value should be an integer and represent the value in cents. For example, $1 should be represented by `100`.

> info "Custom Event Tags are not displayed on the Optimizely results page"
> Optimizely's [Custom Event Tags](https://docs.developers.optimizely.com/full-stack/docs/include-event-tags){:target="_blank"}, which include all Event Tags except `revenue` and `value`, are not displayed on the Optimizely results page. However, these tags are available in a [Data Export](https://docs.developers.optimizely.com/web/docs/data-export){:target="_blank"} report. Event Tags can be strings, integers, floating point numbers, or boolean values. Optimizely rejects events with any other data types (for example, arrays).

Segment defaults to identifying users with their `anonymousId`. Enabling the **Use User ID** setting in your Segment dashboard means that only Track events triggered by identified users are passed downstream to Optimizely. You may optionally fall back to `anonymousId` when `userId` is unavailable by setting `fallbackToAnonymousId` to `true`.

### Identify

Invoking a Segment Identify event sets Segment `traits` as Optimizely `attributes`. The `attributes` are sent downstream to Optimizely upon invocation of the next Segment Track event.

## Reset

Invoking this method invalidates the listener for the `Experiment Viewed` event.

### Notification listeners

If you want to use Optimizely's [notification listeners](https://docs.developers.optimizely.com/full-stack/docs/notification-listeners){:target="_blank"}, you must use the Optimizely native code to invoke them (in addition to using the Segment SDKs). Notification listeners require an [instantiated Optimizely client](https://docs.developers.optimizely.com/full-stack/docs/java#section-2-instantiate-optimizely){:target="_blank"} to be accessed, and so are not available for Segment Track events when you connect to Optimizely using cloud-mode.

## iOS cloud-mode implementation

### Getting started

1. In your Segment source dashboard, enable the "Optimizely Full Stack" destination (**not the "Optimizely Web" destination**).
2. Include the latest version of Optimizely Full Stack's native SDK in your app and [implement it as you would natively](https://docs.developers.optimizely.com/full-stack/docs/install-the-sdk#section-ios-and-tvos){:target="_blank"}.
3. Finally, define any [`events`](https://docs.developers.optimizely.com/full-stack/docs/create-events){:target="_blank"} and [`attributes`](https://docs.developers.optimizely.com/full-stack/docs/define-attributes){:target="_blank"} in your Optimizely dashboard, and to associate `metrics` with the appropriate Optimizely Experiments. Segment maps Track event names to Optimizely `eventName` - the `eventName` corresponds to an experiment `metric`. In addition, Segment maps Identify `traits` to Optimizely `attributes`.

When implementing Optimizely using cloud-mode, Segment mapS Track events to Optimizely Track events on our servers and deliver the data to your Optimizely project as usual.

> warning "Optimizely SDKs v1.x or v2.x require matching attributes objects for correct attribution"
> If you use Optimizely SDKs v1.x or v2.x and use any `activate` or `isFeatureEnabled` calls, the `attributes` object for each user must match the `attributes` object passed to any Track calls for that user id so that it can be correctly attributed on the Optimizely results page.

If you are using Optimizely SDKs v3+, [Easy Event Tracking](https://blog.optimizely.com/2019/02/26/introducing-easy-event-tracking-the-easier-way-to-understand-and-optimize-the-customer-journey/){:target="_blank"} is enabled by default for decision events. Set up does not require maintaining the attributes of a user as long as the user id stays the same between Optimizely `activate` and `isFeatureEnabled` calls and Segment Track calls to have Optimizely `metrics` populated in the Optimizely results page. If you would like to segment your Optimizely results by user `attribute`, then make sure the `attributes` passed in for the `activate` and `isFeatureEnabled` calls match the `attributes` passed in for the Track calls for that user id.

For more details on how events are attributed on the Optimizely results page, refer to Optimizely's documentation on [How Optimzely Experimentation counts conversions](https://support.optimizely.com/hc/en-us/articles/19888476989325-How-Optimizely-Experimentation-counts-conversions){:target="_blank"}.

### Track

Upon invocation of a Segment Track event, Segment maps the event to an Optimizely Track event:
* If the Segment event name matches exactly the name of an active experiment `metric` set up in the Optimizely dashboard.
* If the experiment `metric` is associated with a running experiment.
* If the current user is activated in a running experiment with the associated `metric`.

Segment also handles the following mapping:
* Segment Track event name to Optimizely `eventName`.
* Segment Track event `properties` to Optimizely `eventTags`.

`revenue` values should be passed as a Segment `property`. The value should be an integer and represent the value in cents. For example, $1 should be represented by `100`.

> info "Custom Event Tags are not displayed on the Optimizely results page"
> Optimizely's [Custom Event Tags](https://docs.developers.optimizely.com/full-stack/docs/include-event-tags){:target="_blank"}, which include all Event Tags except `revenue` and `value`, are not displayed on the Optimizely results page. However, these tags are available in a [Data Export](https://docs.developers.optimizely.com/web/docs/data-export){:target="_blank"} report. Event Tags can be strings, integers, floating point numbers, or boolean values. Optimizely rejects events with any other data types (for example, arrays).

Segment defaults to identifying users with their `anonymousId`. Enabling the **Use User ID** setting in your Segment dashboard means that only Track events triggered by identified users are passed downstream to Optimizely. You may optionally fall back to `anonymousId` when `userId` is unavailable by setting `fallbackToAnonymousId` to `true`.

### Identify

Invoking a Segment Identify event sets Segment `traits` as Optimizely `attributes`. The `attributes` are sent downstream to Optimizely upon invocation of the next Segment Track event.

### Notification listeners

Notification listeners are not available for Segment Track events when implementing Optimizely using Segment using cloud-mode. [Notification listeners](https://docs.developers.optimizely.com/full-stack/docs/notification-listeners){:target="_blank"} are still available with any native call invoked from your Optimizely client instance.

## Engage

Follow these instructions on how to set up Engage and Optimizely:

* [Using Segment Personas and Optimizely Full Stack for Omnichannel Experiments](https://www.optimizely.com/insights/blog/segment-personas-optimizely-full-stack-omnichannel-experiments/){:target="_blank"}.


## GDPR support
Segment supports deleting or rsuppressing users in Optimizely using the [Segment app](/docs/privacy/user-deletion-and-suppression/). In order to do this however, you need to create a [Personal Access Token](https://developers.optimizely.com/x/authentication/personal-token/){:target="_blank"} in Optimizely and provide it as the value of the Access Token setting.
