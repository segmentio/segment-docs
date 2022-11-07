---
title: Analytics.js 2.0 Source
redirect_from:
  - '/connections/sources/catalog/libraries/website/analytics.js/'
  - '/sources/website/javascript/'
  - '/sources/website/analytics.js/'
  - '/connections/sources/catalog/libraries/website/javascript/analytics-js-2/'
strat: ajs
id: IqDTy1TpoU
---
Analytics.js 2.0, the latest version of Segment's JavaScript source, enables you to send your data to any tool without having to learn, test, or use a new API every time.

> info ""
> Analytics.js 2.0 is available as an [open-source project](https://github.com/segmentio/analytics-next/){:target="_blank"}.
> <br><br> All sources created on April 5, 2022 and after default to use Analytics.js 2.0.


## Benefits of Analytics.js 2.0

Analytics.js 2.0 provides two key benefits over the previous version.

### Performance

Analytics.js 2.0 reduces page load time and improves site performance. Its package size is **~70%** smaller than its predecessor, Analytics.js.

> info ""
> Many factors impact page load time, including page weight, network conditions, and hosting locations.


### Developer experience

Analytics.js 2.0 improves developer experience by introducing new ways for developers to augment events throughout the event timeline. For example, developers can augment events either before or after an event occurs, or while the event is in-flight.

For example, you can use Analytics.js 2.0 to build features that:

- Ensure you have user consent to track before an event fires
- Enrich events with customer or page context while in-flight with middleware
- Check an event for errors after the event is sent to Segment

## Getting Started

Use the [Analytics.js QuickStart Guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) to learn how to add Analytics.js to your site. Once you've installed the library, read on for the detailed API reference.

For information about upgrading to Analytics.js 2.0, see [Upgrade to Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/upgrade-to-ajs2).

### Upgrade your existing JavaScript sources

For information about upgrading your existing JavaScript sources, see [Upgrade to Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/upgrade-to-ajs2).

## Basic tracking methods

The basic tracking methods below serve as the building blocks of your Segment tracking. They include [Identify](#identify), [Track](#track), [Page](#page), [Group](#group), and [Alias](#alias).

These methods correspond with those used in the [Segment Spec](/docs/connections/spec/). The documentation on this page explains how to use these methods in Analytics.js.

> note "Good to know"
> For any of the methods described in this page, you can replace the properties in the code samples with variables that represent the data collected.

### Identify

Use the `identify` method to link your users and their actions, to a recognizable `userId` and `traits`. You can see [an `identify` example in the Quickstart guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-3-identify-users) or [find details on the identify method payload](/docs/connections/spec/identify/).

> note "`identify` and anonymous visitors"
> Segment recommends _against_ using `identify` for anonymous visitors to your site. Analytics.js automatically retrieves an `anonymousId` from `localStorage` or assigns one for new visitors, and then attaches it to all `page` and `track` events both before and after an `identify`.

The Identify method follows the format below:

```js
analytics.identify([userId], [traits], [options], [callback]);
```

The Identify call has the following fields:

| Field      |          | Type     | Description                                                                                                                                                                                                                                       |
| ---------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `userId`   | optional | String   | The database ID for the user. If you don't know who the user is yet, you can omit the `userId` and just record `traits`. You can read more about identities in the [identify reference](/docs/connections/spec/identify).                         |
| `traits`   | optional | Object   | A dictionary of traits you know about the user, like `email` or `name`. You can read more about traits in the [identify reference](/docs/connections/spec/identify/).                                                                             |
| `options`  | optional | Object   | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a `traits` object, pass an empty object (as an '{}') before `options`._ |
| `callback` | optional | Function | A function executed after a timeout of 300 ms, giving the browser time to make outbound requests first.                                                                                                                                           |

By default, Analytics.js caches traits in the browser's `localStorage` and attaches them to each Identify call.

For example, you might call Identify when someone signs up for a newsletter but hasn't yet created an account on your site. The example below shows an Identify call (using hard-coded traits) that you might send in this case.
```js
analytics.identify({
  nickname: 'Amazing Grace',
  favoriteCompiler: 'A-0',
  industry: 'Computer Science'
});
```

Then, when the user completes the sign up process, you might see the following:

```js
analytics.identify('12091906-01011992', {
  name: 'Grace Hopper',
  email: 'grace@usnavy.gov'
});
```

The traits object for the second call also includes `nickname`, `favoriteCompiler`, and `industry`.

You may omit both traits and options, and pass the callback as the second argument.

```js
analytics.identify('12091906-01011992', function(){
  // Do something after the identify request has been sent
  // Note: site-critical functionality should not depend on your analytics provider
});
```

### Track

The Track method lets you record actions your users perform. You can [see a track example in the Quickstart guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-4-track-actions) or find details on [the track method payload](/docs/connections/spec/track/).

The Track method follows the format below:

```js
analytics.track(event, [properties], [options], [callback]);
```

The `track` call has the following fields:

Field | | Type | Description
----- | | ---- | -----------
`event`| | String | The name of the event you're tracking. You can read more about the [track method](/docs/connections/spec/track) and recommended event names.
`properties` | optional | Object | A dictionary of [properties](/docs/connections/spec/track#properties) for the event. If the event was `'Added to Cart'`, it might have properties like `price` and `productType`.
`options` | optional | Object | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a `properties` object, pass an empty object (like '{}') before `options`_.
`callback` | optional | Function | A function that runs after a timeout of 300 ms, giving the browser time to make outbound requests first.

The only required argument in Analytics.js is an _event name string_. You can read more about [how Segment recommends you name events](/docs/connections/spec/track#event).

Example Track call:

```js
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
```

For more information about choosing which events to track, event naming, and more, check out [Analytics Academy](https://segment.com/academy/){:target="_blank"}.

The only required argument on Track calls in Analytics.js is an `event` name string. Read more about how Segment recommends [naming your events](/docs/connections/spec/track#event).


#### Track link

`trackLink` is a helper method that attaches the `track` call as a handler to a link.
With `trackLink`, Analytics.js inserts a timeout of 300 ms to give the `track` call more time. This is useful when a page would redirect before the `track` method could complete all requests.

The `trackLink` method follows the format below.

```js
analytics.trackLink(element, event, [properties])
```

| Field        |          | Type               | Description                                                                                                                                            |
| ------------ | -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element(s)` |          | Element or Array   | DOM element to bind with `track` method. You may pass an array of elements or jQuery objects. _Note: This must be an element, **not** a CSS selector._ |
| `event`      |          | String or Function | The name of the event, passed to the `track` method. Or a **function** that returns a string to use as the name of the `track` event.                  |
| `properties` | optional | Object or Function | A dictionary of properties to pass with the track method or a **function** that returns an object to use as the `properties` of the event.             |

Example:

```js
var link = document.getElementById('free-trial-link');

analytics.trackLink(link, 'Clicked Free-Trial Link', {
  plan: 'Enterprise'
});
```

#### Track form

`trackForm` is a helper method that binds a `track` call to a form submission.
The `trackForm` method inserts a timeout of 300 ms to give the `track` call more time to complete. This is useful to prevent a page from redirecting before the `track` method could complete all requests.

The `trackForm` method follows the format below.

```js
analytics.trackForm(form, event, [properties])
```

Field | | Type | Description
----- | | ---- | -----------
`form(s)` | | Element or Array | The form element to track or an array of form elements or jQuery objects. _Note: trackForm takes an element, not a CSS selector._
`event` | | String or Function | The name of the event, passed to the `track` method. Or a **function** that returns a string to use as the name of the `track` event.
`properties` | optional | Object or Function | A dictionary of properties to pass with the track method. Or a **function** that returns an object to use as the `properties` of the event.


Example:

```js
var form = document.getElementById('signup-form');

analytics.trackForm(form, 'Signed Up', {
  plan: 'Premium',
  revenue: 99.00
});
```

### Page

The [Page](/docs/connections/spec/page/) method lets you record page views on your website, along with optional extra information about the page viewed by the user.

Because some Destinations require a `page` call to instantiate their libraries, **you must call `page`** at least once per page load. You can call it more than once if needed, for example, on virtual page changes in a single page app.

Analytics.js includes a Page call by default as the final line in [the Analytics.js snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet). You can update this `page` call within the guidelines below.

The `page` method follows the format below.

```js
analytics.page([category], [name], [properties], [options], [callback]);
```

The `page` call has the following fields:

| Field        |          | Type     | Description                                                                                                                                                                                                                                          |
| ------------ | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `category`   | optional | String   | The category of the page. Useful for cases like ecommerce where many pages might live under a single category. _Note: if you pass only one string to `page` it is assumed to be `name`. You **must** include a `name` to send a `category`._         |
| `name`       | optional | String   | The name of the page.                                                                                                                                                                                                                                |
| `properties` | optional | Object   | A dictionary of properties of the page. Note: Analytics.js collects `url`, `title`, `referrer` and `path` are automatically. This defaults to a `canonical url`, if available, and falls back to `document.location.href`.                           |
| `options`    | optional | Object   | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a `properties` object, pass an empty object (like '{}') before `options`_. |
| `callback`   | optional | Function | A function that runs after a timeout of 300 ms, giving the browser time to make outbound requests first.                                                                                                                                             |

#### Default page properties

Analytics.js adds properties to each `page` call.

```js
analytics.page('Pricing');
```

Segment adds the following information:

```js
analytics.page('Pricing', {
  title: 'Segment Pricing',
  url: 'https://segment.com/pricing',
  path: '/pricing',
  referrer: 'https://segment.com/warehouses'
});
```

You can override these values by explicitly setting them in your calls. For example:

```js
analytics.page('Pricing', {
  title: 'My Overridden Title',
  path: '/pricing/view'
});
```
Translates to:

```js
analytics.page('Pricing', {
  title: 'My Overridden Title',
  url: 'https://segment.com/pricing',
  path: '/pricing/view',
  referrer: 'https://segment.com/warehouses'
});
```

### Group

The Group method associates an [identified user](/docs/connections/sources/catalog/libraries/website/javascript/#identify) with a company, organization, project, workspace, team, tribe, platoon, assemblage, cluster, troop, gang, party, society or any other collective noun you come up with for the same concept.

This is useful for <!-- Business-to-Business (B2B) -->tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/), and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.


The Group method follows the format below.

```js
analytics.group(groupId, [traits], [options], [callback]);
```
The Group call has the following fields:

Field | | Type | Description
----- | | ---- | -----------
`groupId` | | String | The Group ID to associate with the current user.
`traits` | optional | Object | A dictionary of [traits](/docs/connections/spec/group#traits) for the group. Example traits for a group include `address`, `website`, and `employees`.
`options` | optional | Object | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a `properties` object, pass an empty object (like '{}') before `options`_.
`callback` | optional | Function | A function that runs after a timeout of 300 ms, giving the browser time to make outbound requests first.

Example `group` call:

```js
analytics.group('UNIVAC Working Group', {
  principles: ['Eckert', 'Mauchly'],
  site: 'Eckert–Mauchly Computer Corporation',
  statedGoals: 'Develop the first commercial computer',
  industry: 'Technology'
});
```

By default, Analytics.js caches group `traits` in the browser's local storage and attaches them to each `group` call, similar to how the `identify` method works.

Find more details about `group`, including the `group` payload, in [the Group Spec](/docs/connections/spec/group/).

### Alias

The Alias method combines two unassociated user identities. Segment usually handles aliasing automatically when you call `identify` on a user, however some tools require an explicit `alias` call.

This is an advanced method, but it's required to manage user identities successfully in *some* Segment destinations like [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias) and [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias). <!-- TODO: LR Dests question: is this still true? Is there a list of the ones that require this?-->

The Alias method follows the format below:

```js
analytics.alias(userId, [previousId], [options], [callback]);
```

The Alias call has the following fields:

| Field        |          | Type     | Description                                                                                                                                     |
| ------------ | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `userId`     |          | String   | The new user ID you want to associate with the user.                                                                                            |
| `previousId` | optional | String   | The previous ID that the user was recognized by. This defaults to the currently identified user's ID.                                           |
| `options`    | optional | Object   | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. |
| `callback`   | optional | Function | A function that is executed after a timeout of 300 ms, giving the browser time to make outbound requests first.                                 |

For more details about Alias, including the **`alias` call payload**, check out the [Segment Spec](/docs/connections/spec/alias/).


## Utility methods

The Analytics.js utility methods help you change how Segment loads on your page. They include:

- [Ready](#ready)
- [Debug](#debug)
- [On (Emitter)](#emitter)
- [Timeout](#extending-timeout)
- [Reset (Logout)](#reset-or-logout)

### Ready

The `ready` method allows you to pass in a method that is called once Analytics.js finishes initializing, and once all enabled device-mode destinations load. It's like [jQuery's `ready` method](https://api.jquery.com/ready/){:target="_blank"}, except for Destinations.

The `ready` method isn't invoked if any Destination throws an error (for example, for an expired API key, incorrect settings configuration, or when a Destination is blocked by the browser) during initialization.

The code in the `ready` function only executes after `ready` is emitted.

If you want to access end-tool library methods that do not match any Analytics.js methods, like adding an extra setting to Mixpanel, you can use a `ready` callback so that you're guaranteed to have access to the Mixpanel object, like so:


```js
analytics.ready(function() {
  window.mixpanel.set_config({ verbose: true });
});
```

The `ready` method uses the following format:

```js
analytics.ready(callback);
```

The `ready` method has the following fields:

| Field      | Type     | Description                                                           |
| ---------- | -------- | --------------------------------------------------------------------- |
| `callback` | Function | A function to be executed after all enabled destinations have loaded. |

### Debug

Calling the `debug` method turns on debug mode, which logs helpful messages to the console. Refresh the page after you invoke `debug` to see the messages.

Enable:
```js
analytics.debug(true);
```

Disable:
```js
analytics.debug(false);
```


### Emitter

The global `analytics` object emits events whenever you call `alias`, `group`, `identify`, `track`, or `page`.

Use the `on` method to set listeners for these events and run your own custom code. This can be useful if you want to send data to a service for which Segment doesn't have a destination.

```js
analytics.on(method, callback);
```

| Field      | Type     | Description                                                                                                |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `method`   | String   | Name of the method to listen for.                                                                          |
| `callback` | Function | A function to execute after each emitted method, taking three arguments: `event`, `properties`, `options`. |

Example:

```js
analytics.on('track', function(event, properties, options) {

  bigdataTool.push(['recordEvent', event]);

});
```

This method emits events _before_ they are processed by the Segment integration, and may not include some of the normalization Segment performs on the client before sending the data to the Segment servers.

> note "Note"
> Page event properties are stored in the `options` object.


### Extending timeout

The `timeout` method sets the length (in milliseconds) of callbacks and helper functions. This is useful if you have multiple scripts that need to fire in your callback or `trackLink`, `trackForm` helper function.

The example below sets the timeout to 500 ms.

```js
analytics.timeout(500);
```

> success "Tip"
> If you're triggering ad network conversion pixels, Segment recommends extending timeout to 500 ms to account for slow load times.


### Reset or log out

Calling `reset` resets the `id`, including `anonymousId`, and clears `traits` for the currently identified user and group.

```js
analytics.reset();
```

The `reset` method only clears the cookies and `localStorage` created by Segment. It doesn't clear data from other integrated tools, as those native libraries might set their own cookies to manage user tracking, sessions, and manage state. To completely clear out the user session, see the documentation provided by those tools.

Segment doesn't share `localStorage` across subdomains. If you use Segment tracking on multiple subdomains, you must call `analytics.reset()` for each subdomain to completely clear out the user session.



## Managing data flow with the Integrations object

> success ""
> **Tip**: You can change how your data flows in several different ways without having to change your code. See [Filtering Data](/docs/guides/filtering-data/) to learn more.

You can pass an `integrations` object in the `options` of Alias, Group, Identify, Page, and Track <!--TODO: Lr note, not screen?--> methods to send data to only the selected destinations. By default, all Destinations are enabled.

The example below sends a message only to Intercom and Google Analytics.

```js
analytics.identify('user_123', {
  email: 'jane.kim@example.com',
  name: 'Jane Kim'
}, {
  integrations: {
    'All': false,
    'Intercom': true,
    'Google Analytics': true
  }
});
```

`'All': false` tells Segment not to send data to _any_ Destinations by default, unless they're explicitly listed as `true` in the next lines.

As an opposite example, the snippet below sends a message to all integrations _except_ Intercom and Google Analytics.

```js
analytics.identify('user_123', {
  email: 'jane.kim@example.com',
  name: 'Jane Kim'
}, {
  integrations: {
    'Intercom': false,
    'Google Analytics': false
  }
});
```

You don't need to include `'All': true` in this call because it's implied as the default behavior. Instead, only list the destinations that you want to exclude, with a `false` flag for each.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (for example, "AdLearn Open Platform", "awe.sm", "Mailchimp", etc). If a Destination has more than one acceptable name, this appears in the documentation for that destination.

> success "Tip"
> Business tier customers can filter Track calls from the Source Schema page in the Segment UI. Segment recommends that you use the UI to simplify filter management and make updates without changing your site's code.


### Load options

> info ""
> **Note:** To use this feature, you must be on snippet version 4.1.0 or later. You can get the latest version of the snippet [here](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet).

You can modify the `.load` method in Analytics.js (the second line of the snippet) to take a second argument. If you pass an object with an `integrations` dictionary (matching the format [above](#selecting-destinations-with-the-integrations-object)), then Segment only loads the integrations in that dictionary that are marked as enabled with the boolean value `true`.

You can only call `.load` on page load, or reload (refresh). If you modify the `.load` method between page loads, it doesn't have any effect until the page is reloaded.

For example:

```js
analytics.load('writekey', { integrations: { All: false, 'Google Analytics': true, 'Segment.io': true } })
```

This way, you can conditionally load integrations based on what customers opt into on your site. The example below shows how you might load only the tools that the user agreed to use.

```js
onConsentDialogClosed(function(consentedTools){
  analytics.load('writekey', { integrations: consentedTools })
})
```

#### Bundle obfuscation
You can also add an `obfuscate` property to the object in the second parameter, which obscures the URL from which your integrations and destination actions are loaded. This helps prevent words that are flagged by ad blockers to not be detected in your URL, enabling the integration to properly load.

For example:

```js
analytics.load('writekey', { obfuscate: true })
```

The `obfuscate` value is `false` by default.


## Retries

When enabled, Analytics.js automatically retries network and server errors. With persistent retries, Analytics.js can:

- **Support offline tracking**. Analytics.js queues your events and delivers them when the user comes back online.
- **Better handle network issues**. When your application can't connect to the Segment API, Segment continues to store the events on the browser to prevent data loss.

Analytics.js stores events in `localStorage` and falls back to in-memory storage when `localStorage` is unavailable. It retries up to 10 times with an incrementally increasing back-off time between each retry. Analytics.js queues up to 100 events at a time to avoid using too much of the device's local storage. See the [destination Retries documentation](/docs/connections/destinations/#retries) to learn more.


## Batching
Batching is the ability to group multiple requests or calls into one request or API call. All requests sent within the same batch have the same `receivedAt` time. With Analytics.js, you can send events to Segment in batches. Sending events in batches enables you to have:
- Delivery of multiple events with fewer API calls
- Fewer errors if a connection is lost because an entire batch will retry at once rather than multiple calls retrying at random times.

### Setup
You can start batching by changing the `strategy` to `"batching"` and the parameters for `size` and `timeout` within the `load` method in the analytics object. Batching requires both parameters.

```js
analytics.load("<write_key>", {
    integrations: {
      "Segment.io": {
        deliveryStrategy: {
          strategy: "batching",
          config: {
            size: 10,
            timeout: 5000
          }
        }
      }
    }
  });
```

You can check to see if batching works by checking your source's debugger in **Sources > Debugger**. When you select an event and view the **Raw** code, the `receivedAt` time of all the events in the batch should be the same.

#### Batch size
The batch size is the threshold that forces all batched events to be sent once it's reached. For example, `size: 10`  means that after triggering 10 events, Analytics.js sends those 10 events together as a batch to Segment.

Your total batched events can't exceed the maximum payload size of 500 KB, with a limit of 32 KB for each event in the batch. If the 500 KB limit is reached, the batch will be split.

#### Timeout
`timeout` is the number of milliseconds that forces all events queued for batching to be sent, regardless of the batch size, once it's reached. For example, `timeout: 5000` sends every event in the batch to Segment once 5 seconds passes.

### Batching FAQs
#### Will Analytics.js deliver events that are in the queue when a user closes the browser?
Analytics.js does its best to deliver the queued events before the browser closes, but the delivery isn't guaranteed.

Upon receiving the `beforeunload` browser event, Analytics.js attempts to flush the queue using `fetch` requests with `keepalive` set to true. Since the max size of `keepalive` payloads is limited to 64 KB, if the queue size is bigger than 64 KB at the time the browser closes, then there is a chance of losing a subset of the queued events. Reducing the batch size or timeout will alleviate this issue, but that will be a trade-off decision.

#### Is Batching supported on Analytics.js classic?
No. Batching is only supported as part of Analytics.js 2.0.

#### Can other destinations receive batched events?
No, this batching only impacts events sent to Segment. Once the batch reaches Segment, it's split up and follows the normal path of an event.

#### Will batching impact billing or throughput?
No, batching won't impact billing or throughput.

#### Can I use batching with partner integrations?
Partner integrations don't support batching as all other partner integrations run one event at a time. Only Segment.io events support batched delivery.

#### Does batching work on all browsers?
Batching won't work on Internet Explorer.

#### If a source has retry enabled, does the retry behavior change when using batching?
Batching delays retries, as events that are queued for batching aren't retried until a batch delivery fails.

#### When using Middlewares as a source and destination, is there a change in behavior when using batching?
No, there is no change in behavior to Middlewares.

#### When using Segment features (Schema filtering, integrations object, Protocols) to filter events from going to destinations (device and cloud-mode), will batching impact the filtering of events?
No, there is no impact to how events filter.

## Plugin architecture
When you develop against Analytics 2.0, the plugins you write can augment functionality, enrich data, and control the flow and delivery of events. From modifying event payloads to changing analytics functionality, plugins help to speed up the process of getting things done.

Though middlewares function the same as plugins, it's best to use plugins as they are easier to implement and are more testable.

### Plugin categories
Plugins are bound by Analytics 2.0 which handles operations such as observability, retries, and error handling. There are two different categories of plugins:
* **Critical Plugins**: Analytics.js expects this plugin to be loaded before starting event delivery. Failure to load a critical plugin halts event delivery. Use this category sparingly, and only for plugins that are critical to your tracking.
* **Non-critical Plugins**: Analytics.js can start event delivery before this plugin finishes loading. This means your plugin can fail to load independently from all other plugins. For example, every Analytics.js destination is a non-critical plugin. This makes it possible for Analytics.js to continue working if a partner destination fails to load, or if users have ad blockers turned on that are targeting specific destinations.

> info ""
> Non-critical plugins are only non-critical from a loading standpoint. For example, if the `before` plugin crashes, this can still halt the event delivery pipeline.

Non-critical plugins run through a timeline that executes in order of insertion based on the entry type. Segment has these five entry types of non-critical plugins:

| Type          | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `before`      | Executes before event processing begins. These are plugins that run before any other plugins run. <br><br>For example, validating events before passing them along to other plugins. A failure here could halt the event pipeline. <br><br> See the example of how Analytics.js uses the [Event Validation plugin](https://github.com/segmentio/analytics-next/blob/master/packages/browser/src/plugins/validation/index.ts){:target="_blank"} to verify that every event has the correct shape. |
| `enrichment`  | Executes as the first level of event processing. These plugins modify an event. <br><br> See the example of how Analytics.js uses the [Page Enrichment plugin](https://github.com/segmentio/analytics-next/blob/master/packages/browser/src/plugins/page-enrichment/index.ts){:target="_blank"} to enrich every event with page information.                                                                                                                                                     |
| `destination` | Executes as events begin to pass off to destinations. <br><br> This doesn't modify the event outside of the specific destination, and failure doesn't halt the execution.                                                                                                                                                                                                                                                                                                                        |
| `after`       | Executes after all event processing completes. You can use this to perform cleanup operations. <br><br>An example of this is the [Segment.io Plugin](https://github.com/segmentio/analytics-next/blob/master/packages/browser/src/plugins/segmentio/index.ts){:target="_blank"} which waits for destinations to succeed or fail so it can send it observability metrics.                                                                                                                         |
| `utility`     | Executes once during the bootstrap, to give you an outlet to make any modifications as to how Analytics.js works internally. This allows you to augment Analytics.js functionality.                                                                                                                                                                                                                                                                                                              |

### Example plugins
Here's an example of a plugin that converts all track event names to lowercase before the event goes through the rest of the pipeline:

```js
export const lowercase: Plugin = {
  name: 'Lowercase events',
  type: 'enrichment',
  version: '1.0.0',

  isLoaded: () => true,
  load: () => Promise.resolve(),

  track: (ctx) => {
    ctx.updateEvent('event', ctx.event.event.toLowerCase())
    return ctx
  }
}

const identityStitching = () => {
  let user

  const identity = {
    // Identifies your plugin in the Plugins stack.
    // Access `window.analytics.queue.plugins` to see the full list of plugins
    name: 'Identity Stitching',
    // Defines where in the event timeline a plugin should run
    type: 'enrichment',
    version: '0.1.0',

    // use the `load` hook to bootstrap your plugin
    // The load hook will receive a context object as its first argument
    // followed by a reference to the analytics.js instance from the page
    load: async (_ctx, ajs) => {
      user = ajs.user()
    },

    // Used to signal that a plugin has been property loaded
    isLoaded: () => user !== undefined,

    // Applies the plugin code to every `identify` call in Analytics.js
    // You can override any of the existing types in the Segment Spec.
    async identify(ctx) {
      // Request some extra info to enrich your `identify` events from
      // an external API.
      const req = await fetch(
        `https://jsonplaceholder.typicode.com/users/${ctx.event.userId}`
      )
      const userReq = await req.json()

      // ctx.updateEvent can be used to update deeply nested properties
      // in your events. It's a safe way to change events as it'll
      //  create any missing objects and properties you may require.
      ctx.updateEvent('traits.custom', userReq)
      user.traits(userReq)

      // Every plugin must return a `ctx` object, so that the event
      // timeline can continue processing.
      return ctx
    },
  }

  return identity
}

// Registers Segment's new plugin into Analytics.js
await window.analytics.register(identityStitching())
```

Here's an example of a `utility` plugin that allows you to change the format of the anonymous_id cookie:

```js

window.analytics.ready(() => {
      window.analytics.register({
        name: 'Cookie Compatibility',
        version: '0.1.0',
        type: 'utility',
        load: (_ctx, ajs) => {
          const user = ajs.user()
          const cookieJar = user.cookies
          const cookieSetter = cookieJar.set.bind(cookieJar)

          // blindly convert any values into JSON strings
          cookieJar.set = (key, value, opts) => cookieSetter(key, JSON.stringify(value), opts)

          // stringify any existing IDs
          user.anonymousId(user.anonymousId())
          user.id(user.id())
        },
        isLoaded: () => true
      })
    })
```

You can view Segment's [existing plugins](https://github.com/segmentio/analytics-next/tree/master/src/plugins){:target="_blank"} to see more examples.

### Register a plugin
Registering plugins enable you to modify your analytics implementation to best fit your needs. You can register a plugin using this:

```js
// A promise will resolve once the plugins have been successfully loaded into Analytics.js
// You can register multiple plugins at once by using the variable args interface in Analytics.js
await window.analytics.register(pluginA, pluginB, pluginN)
```

## Video player plugins

Segment offers video player 'plugins' so you can quickly collect video events using Analytics.js. See the specific documentation below to learn more:

- [YouTube](/docs/connections/sources/catalog/libraries/website/plugins/youtube)
- [Vimeo](/docs/connections/sources/catalog/libraries/website/plugins/vimeo)

## Cross-subdomain analytics

Analytics.js tracks across subdomains out of the box; all Segment destinations fully support this feature.


## Analytics.js performance

The Analytics.js library and all Destination libraries are loaded with the [HTML script `async` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async){:target="_blank"}. This also means that Segment fires methods asynchronously, so you should adjust your code accordingly if you require that events be sent from the browser in a specific order.

While many tools require access to the DOM or cookies, for the Zendesk, Salesforce, and Mailchimp destinations, Segment doesn't need to load a native JavaScript library. Instead, Segment's servers send data to the end-tools.

Segment loads the libraries required for your **enabled** Destinations. When you disable a destination, the custom version of Analytics.js loaded on your site stops requesting that library.

Using Analytics.js doesn't offer a large performance benefit, but is more performant than installing each of the destinations individually. And as more destinations move to accept data directly from Segment, you'll receive more performance benefits automatically.

One option, if you don't want to use any bundled third-party tools, is to use the browserify'd [analytics-node](https://github.com/segmentio/analytics-node) package. <!-- TODO LR note: WTF does "browserified" mean-->

### Bundle size

Segment's Analytics.js JavaScript snippet increases the page size by about 1.1KB.

The snippet asynchronously requests and loads a customized JavaScript bundle (`analytics.min.js`), which contains the code and settings needed to load your [device-mode destinations](/docs/connections/destinations/#connection-modes). The size of this file changes depending on the number of and which destinations you enable.

Without any destinations enabled, the `analytics.min.js` file is about 62KB. Each time you enable a destination, the file's size may increase slightly.

### Local storage cookies used by Analytics.js

Analytics.js uses `localstorage` cookies if you have retries enabled, to keep track of retry timing.
- The `ack` cookie is a timer used to see if another tab should claim the retry queue.
- The `reclaimStart` and `reclaimEnd` cookies determine if a tab takes over the queue from another tab.
- The `inProgress` and `queue` cookies track events in progress, and events queued for retry.

For more information, visit the [Segment localstorage-retry library](https://github.com/segmentio/localstorage-retry){:target="_blank"}.

You can set the `debug` cookie to `analytics.js` to log debug messages from Analytics.js to the console.

## Open source libraries

Analytics.js 2.0 includes the following open source components:

**uuid v2.0.0** ([https://github.com/lukeed/uuid](https://github.com/lukeed/uuid))
Copyright Luke Edwards <[luke.edwards05@gmail.com](mailto:luke.edwards05@gmail.com)> ([lukeed.com](https://lukeed.com/))
License: MIT License, available here: [https://github.com/lukeed/uuid/blob/master/license](https://github.com/lukeed/uuid/blob/master/license)

**component-url v0.2.1** ([https://github.com/component/url](https://github.com/component/url))
Copyright (c) 2014 Component
License: MIT License, available here: [https://github.com/component/url/blob/master/Readme.md](https://github.com/component/url/blob/master/Readme.md)

**dset v2.0.1** ([https://github.com/lukeed/dset](https://github.com/lukeed/dset))
Copyright (c) Luke Edwards <[luke.edwards05@gmail.com](mailto:luke.edwards05@gmail.com)> ([lukeed.com](https://lukeed.com/))
License: MIT License, available here: [https://github.com/lukeed/dset/blob/master/license](https://github.com/lukeed/dset/blob/master/license)

**js-cookie v2.2.1**
Copyright (c) 2018 Copyright 2018 Klaus Hartl, Fagner Brack, GitHub Contributors
 	License: MIT License, available here: [https://github.com/js-cookie/js-cookie/blob/master/LICENSE](https://github.com/js-cookie/js-cookie/blob/master/LICENSE)

**md5 v2.3.0** ([https://github.com/pvorb/node-md5](https://github.com/pvorb/node-md5))
Copyright (c) 2011-2012, Paul Vorbach.
Copyright (c) 2009, Jeff Mott.
License: BSD-3-Clause “New” or “Revised” License, available at:
[https://github.com/pvorb/node-md5/blob/master/LICENSE](https://github.com/pvorb/node-md5/blob/master/LICENSE)

**unfetch v4.1.0** ([https://github.com/developit/unfetch](https://github.com/developit/unfetch))
Copyright (c) 2017 Jason Miller
License: MIT License, available at: [https://github.com/developit/unfetch/blob/master/LICENSE.md](https://github.com/developit/unfetch/blob/master/LICENSE.md)
