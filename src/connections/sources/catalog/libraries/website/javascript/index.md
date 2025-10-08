---
title: Analytics.js Source
redirect_from:
  - '/connections/sources/catalog/libraries/website/analytics.js/'
  - '/sources/website/javascript/'
  - '/sources/website/analytics.js/'
  - '/connections/sources/catalog/libraries/website/javascript/analytics-js-2/'
strat: ajs
support_type: flagship
id: IqDTy1TpoU
---

Analytics.js enables you to send your data to hundreds of [destination tools](/docs/connections/destinations/catalog/) without having to learn, test, or use a new API every time.

Segment's Analytics.js library is fully open source and can be viewed on [GitHub](https://github.com/segmentio/analytics-next/){:target="_blank"}.

## Getting started

Use the [Analytics.js QuickStart Guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) to learn how to add Analytics.js to your site. Once you've installed the library, read on for the detailed API reference.

## Benefits of Analytics.js

Analytics.js provides 2 key benefits over the previous version.

### Performance

Analytics.js reduces page load time and improves site performance. Its package size is approximately 70% smaller than its predecessor, the classic version of Analytics.js.

> info ""
> Many factors impact page load time, including network conditions, hosting locations, and page weight. Page weight for each customer integration varies based on the number of device-mode destinations that are enabled for each source. The more device-mode destinations enabled, the more data is added to the library, which impacts its size.

### Developer experience

Analytics.js improves developer experience by introducing new ways for developers to augment events throughout the event timeline. For example, developers can augment events before an event fires, while the event is in-flight, or after the event is sent.

For example, you can use Analytics.js to build features that:

- Ensure you have user consent to track before an event fires
- Enrich events with customer or page context while in-flight with middleware
- Check an event for errors after the event is sent to Segment

## Basic tracking methods

The basic tracking methods below serve as the building blocks of your Segment tracking. They include [Identify](#identify), [Track](#track), [Page](#page), [Group](#group), and [Alias](#alias).

These methods correspond with those used in the [Segment Spec](/docs/connections/spec/). The documentation on this page explains how to use these methods in Analytics.js.

> success ""
> For any of the methods described in this page, you can replace the properties in the code samples with variables that represent the data collected.

### Identify

Use the Identify method to link your users and their actions to a recognizable `userId` and `traits`. You can see [an Identify call example in the Quickstart guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-3-identify-users) or [find details on the identify method payload](/docs/connections/spec/identify/).

> info "Identify calls and anonymous visitors"
> Segment recommends _against_ using an Identify call for anonymous visitors to your site. Analytics.js automatically retrieves an `anonymousId` from `localStorage` or assigns one for new visitors, and then attaches it to all Page and Track events both before and after an Identify call.

The Identify method follows the format below:

```js
analytics.identify([userId], [traits], [options], [callback]);
```

The Identify call has the following fields:

| Field      |          | Type     | Description                                                                                                                                                                                                                                       |
| ---------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `userId`   | optional | String   | The database ID for the user. If you don't know who the user is yet, you can omit the `userId` and just record `traits`. You can read more about identities in the [Identify reference](/docs/connections/spec/identify).                     |
| `traits`   | optional | Object   | A dictionary of traits you know about the user, like `email` or `name`. You can read more about traits in the [Identify reference](/docs/connections/spec/identify/).                                                                             |
| `options`  | optional | Object   | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a `traits` object, pass an empty object (as an '{}') before `options`._ |
| `callback` | optional | Function | A function executed after a timeout of 300 ms, giving the browser time to make outbound requests first.  |


If you want to set the `userId` without sending an Identify call, you can use `analytics.user().id('123')`. In the npm package, use `analytics.instance.user().id(xxx)`. This method updates the stored `userId` locally without triggering a network request. This is helpful if you want to associate a user ID silently, without sending additional data to Segment or connected destinations. Be cautious when changing the `userId` mid-session to avoid double-counting users or splitting their identity history.    

By default, Analytics.js caches traits in the browser's `localStorage` and attaches them to each Identify call.

For example, you might call Identify when someone signs up for a newsletter but hasn't yet created an account on your site. The example below shows an Identify call (using hard-coded traits) that you might send in this case.
```js
analytics.identify({
  nickname: 'Amazing Grace',
  favoriteCompiler: 'A-0',
  industry: 'Computer Science'
});
```

Then, when the user completes the sign-up process, you might see the following:

```js
analytics.identify('12091906-01011992', {
  name: 'Grace Hopper',
  email: 'grace@example.com'
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

The Track method lets you record actions your users perform. You can [see a Track example in the Quickstart guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-4-track-actions) or find details on [the Track method payload](/docs/connections/spec/track/).

The Track method follows the format below:

```js
analytics.track(event, [properties], [options], [callback]);
```

The Track call has the following fields:

| Field        |        | Type     | Description                                                                                                                                                                                                                                                    |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`      |        | String   | The name of the event you're tracking. You can read more about the [Track method](/docs/connections/spec/track) and recommended event names.                                                                                                                   |
| `properties` | optional | Object   | A dictionary of [properties](/docs/connections/spec/track#properties) for the event. If the event was `'Added to Cart'`, it might have properties like `price` and `productType`.                                                                            |
| `options`    | optional | Object   | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a `properties` object, pass an empty object (like '{}') before `options`._          |
| `callback`   | optional | Function | A function that runs after a timeout of 300 ms, giving the browser time to make outbound requests first.                                                                                                                                                       |

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

`trackLink` is a helper method that attaches a Track call as a handler to a link. When a user clicks the link, `trackLink` delays the navigation event by 300 ms before proceeding, ensuring the Track request has enough time to send before the page starts unloading.

This is useful when a page redirects too quickly, preventing the Track method from completing all requests. By momentarily delaying navigation, `trackLink` increases the likelihood that tracking data reaches Segment and destinations successfully.

The `trackLink` method follows the format below:

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
----- | -- | ---- | -----------
`form(s)` | | Element or Array | The form element to track or an array of form elements or jQuery objects. _Note: trackForm takes an element, not a CSS selector._ Segment recommends that you wait until the DOM loads before passing the form element.
`event` | | String or Function | The name of the event, passed to the `track` method. Or a **function** that returns a string to use as the name of the `track` event.
`properties` | optional | Object or Function | A dictionary of properties to pass with the Track method. Or a **function** that returns an object to use as the `properties` of the event.


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

Because some destinations require a Page call to instantiate their libraries, **you must call `page()`** at least once per page load. You can call it more than once if needed, for example, on virtual page changes in a single page app.

See the implementation guide for more information about [calling the Page method](/docs/getting-started/04-full-install/#when-to-call-page).

Analytics.js includes a Page call by default as the final line in [the Analytics.js snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet). You can update this Page call within the guidelines below.

The Page method follows the format below.

```js
analytics.page([category], [name], [properties], [options], [callback]);
```

The Page call has the following fields:

| Field        |          | Type     | Description                                                                                                                                                                                                                                          |
| ------------ | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `category`   | optional | String   | The category of the page. Useful for cases like ecommerce where many pages might live under a single category. _Note: if you pass only one string to `page` it is assumed to be `name`. You **must** include a `name` to send a `category`._         |
| `name`       | optional | String   | The name of the page.                                                                                                                                                                                                                                |
| `properties` | optional | Object   | A dictionary of properties of the page. Note: Analytics.js collects `url`, `title`, `referrer`, and `path` automatically. This defaults to a `canonical url`, if available, and falls back to `document.location.href`.                           |
| `options`    | optional | Object   | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a `properties` object, pass an empty object (like '{}') before `options`_. |
| `callback`   | optional | Function | A function that runs after a timeout of 300 ms, giving the browser time to make outbound requests first. However, this function might not execute if one of the device-mode libraries has been blocked from loading.                                                                                                                                           |

#### Default page properties

Analytics.js adds properties to each Page call.

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

Segment sets the `path` and `url` property to the value of the canonical element on your page. If a canonical element is not set, the values will be set from the browser. 

### Group

The Group method associates an [identified user](/docs/connections/sources/catalog/libraries/website/javascript/#identify) with a company, organization, project, workspace, team, tribe, platoon, assemblage, cluster, troop, gang, party, society, or any other collective noun you come up with for the same concept.

This is useful for <!-- Business-to-Business (B2B) -->tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/), and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.


The Group method follows the format below.

```js
analytics.group(groupId, [traits], [options], [callback]);
```
The Group call has the following fields:

Field | | Type | Description
----- | -- | ---- | -----------
`groupId` | | String | The Group ID to associate with the current user.
`traits` | optional | Object | A dictionary of [traits](/docs/connections/spec/group#traits) for the group. Example traits for a group include `address`, `website`, and `employees`.
`options` | optional | Object | A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a `properties` object, pass an empty object (like '{}') before `options`_.
`callback` | optional | Function | A function that runs after a timeout of 300 ms, giving the browser time to make outbound requests first.

Example Group call:

```js
analytics.group('UNIVAC Working Group', {
  principles: ['Eckert', 'Mauchly'],
  site: 'Eckert–Mauchly Computer Corporation',
  statedGoals: 'Develop the first commercial computer',
  industry: 'Technology'
});
```

By default, Analytics.js caches group `traits` in the browser's local storage and attaches them to each Group call, similar to how the Identify method works.

Find more details about the Group method, including the payload, in [the Group Spec](/docs/connections/spec/group/).

### Alias

The Alias method combines 2 unassociated user identities. Segment usually handles aliasing automatically when you call Identify on a user, however some tools require an explicit Alias call.

This is an advanced method, but it's required to manage user identities successfully in *some* Segment destinations like [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias) and [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias). <!-- TODO: LR Dests question: is this still true? Is there a list of the ones that require this?-->

The Alias call follows the format below:

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

- [Load](#load)
- [Ready](#ready)
- [Debug](#debug)
- [On (Emitter)](#emitter)
- [Timeout](#extending-timeout)
- [Reset (Logout)](#reset-or-log-out)

### Load

> info ""
> The Load method is also available when you load analytics.js through the [npm package](https://www.npmjs.com/package/@segment/analytics-next){:target="_blank"}.

You can load a buffered version of analytics.js that requires you to call `load` explicitly before analytics.js initiates any network activity. This is useful if you want to, for example, wait for user consent before you fetch tracking destinations or send buffered events to Segment.

> warning ""
> Call `load` one time only.

```js
export const analytics = new AnalyticsBrowser()

analytics.identify("hello world")

if (userConsentsToBeingTracked) {
    analytics.load({ writeKey: '<YOUR_WRITE_KEY>' }) // destinations loaded, enqueued events are flushed
}
```

You can also use the Load method if you fetch some settings asynchronously.
```js
const analytics = new AnalyticsBrowser()
fetchWriteKey().then(writeKey => analytics.load({ writeKey }))

analytics.identify("hello world")
```

### Ready

The Ready method lets you pass in a method that gets called after Analytics.js finishes initializing and after all enabled device-mode destinations load. It's like [jQuery's `ready` method](https://api.jquery.com/ready/){:target="_blank"}, except for destinations. Because it doesn't fire until all enabled device-mode destinations are loaded, it can't be used to change configuration options for downstream SDKs. That can only be done if the SDK is loaded natively. 

The Ready method isn't invoked if any destination throws an error (for example, for an expired API key, incorrect settings configuration, or when a destination is blocked by the browser) during initialization. If you want to check when Analytics.js has loaded, you can look at the value of `window.analytics.initialized`. When this value is `true`, the library has successfully initialized, even if some destinations are blocked.

**Note**: `window.analytics.initialized` is a simple boolean, not an event or a pub/sub system. This means you can't subscribe to changes in its value. If you need to detect when it changes from `false` to `true`, you must set up a polling mechanism to monitor the value.

The code in the `ready` function only executes after `ready` is emitted. 

If you want to access end-tool library methods that do not match any Analytics.js methods, like adding an extra setting to Mixpanel, you can use a `ready` callback so that you're guaranteed to have access to the Mixpanel object, like so:


```js
analytics.ready(() => {
  window.mixpanel.set_config({ verbose: true });
});
```

The Ready method uses the following format:

```js
analytics.ready(callback);
```

The Ready method has the following fields:

| Field      | Type     | Description                                                           |
| ---------- | -------- | --------------------------------------------------------------------- |
| `callback` | Function | A function to be executed after all enabled destinations have loaded. |

### Debug

Calling the Debug method turns on debug mode, which logs helpful messages to the console. Subsequent Segment events generate messages in the developer console after you invoke `debug`.

Enable:
```js
analytics.debug(true);
```

Disable:
```js
analytics.debug(false);
```


### Emitter

The global `analytics` object emits events whenever you call Alias, Group, Identify, Track, or Page.

Use the On method to set listeners for these events and run your own custom code. This can be useful if you want to send data to a service for which Segment doesn't have a destination.

```js
analytics.on(method, callback);
```

| Field      | Type     | Description                                                                                                |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `method`   | String   | Name of the method to listen for.                                                                          |
| `callback` | Function | A function to execute after each emitted method, taking 3 arguments: `event`, `properties`, and  `options`. |

Example:

```js
analytics.on('track', (event, properties, options) => {

  bigdataTool.push(['recordEvent', event]);

});
```

This method emits events _before_ they are processed by the Segment integration, and may not include some of the normalization Segment performs on the client before sending the data to the Segment servers.

> info ""
> Page event properties are stored in the Options object.


### Extending timeout

The Timeout method sets the length (in milliseconds) of callbacks and helper functions. This is useful if you have multiple scripts that need to fire in your callback, or the `trackLink` or `trackForm` helper functions.

The example below sets the timeout to 500 ms.

```js
analytics.timeout(500);
```

> success ""
> If you're triggering ad network conversion pixels, Segment recommends extending timeout to 500 ms to account for slow load times.


### Reset or log out

Calling `reset()` resets the `id`, including `anonymousId`, and clears `traits` for the currently identified user and group.

```js
analytics.reset();
```

The Reset method only clears the cookies and `localStorage` created by Segment. It doesn't clear data from other integrated tools, as those native libraries might set their own cookies to manage user tracking, sessions, and manage state. To completely clear out the user session, see the documentation provided by those tools.

Segment doesn't share `localStorage` across subdomains. If you use Segment tracking on multiple subdomains, you must call `analytics.reset()` for each subdomain to completely clear out the user session.

## Managing data flow with the Integrations object

> success ""
> You can change how your data flows in several different ways without having to change your code. See [Filtering Data](/docs/guides/filtering-data/) to learn more.

You can pass an `integrations` object in the `options` of Alias, Group, Identify, Page, and Track <!--TODO: Lr note, not screen?--> methods to send data to only the selected destinations. By default, all destinations are enabled.

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

`'All': false` tells Segment not to send data to _any_ destinations by default, unless they're explicitly listed as `true` in the next lines.

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

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (for example, "AdLearn Open Platform", "awe.sm", and "Mailchimp"). If a Destination has more than one acceptable name, this appears in the documentation for that destination.

> success ""
> Business tier customers can filter Track calls from the Source Schema page in the Segment UI. Segment recommends that you use the UI to simplify filter management and make updates without changing your site's code.


### Load options

> info ""
> To use this feature, you must be on snippet version 4.1.0 or later. You can get the latest version of the snippet from the [Analytics.js Quickstart](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet).

You can modify the Load method in Analytics.js (the second line of the snippet) to take a second argument. If you pass an object with an `integrations` dictionary, then Segment only loads the integrations in that dictionary that are marked as enabled with the boolean value `true`. 

You can only call `.load` on page load, or reload (refresh). If you modify the `.load` method between page loads, it doesn't have any effect until the page is reloaded.

Note that if you add `All: false` to your Load call, you must also add `Segment.io: true` to the integrations object to pass data to enabled destinations.

For example:

```js
analytics.load('writekey', { integrations: { All: false, 'Segment.io': true, 'Google Analytics': true } })
```

This way, you can conditionally load integrations based on what customers opt into on your site. The example below shows how you might load only the tools that the user agreed to use.

```js
onConsentDialogClosed((consentedTools) => {
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

#### ISO string conversion
By default, the Analytics.js library will convert ISO8061 strings to a Date object before passing it to downstream device-mode integrations. If you would like to disable this functionality and send those strings as they are passed to the event, you can use the load method to pass in the `disableAutoISOConversion` option.

For example:

```js
analytics.load('writekey', { disableAutoISOConversion: true })
```

#### Client hints
Some `userAgent` strings are frozen and contain less information. If you would like to request more information when it's available, you can pass an array of strings with fields you would like to request to the `highEntropyValuesClientHints` option. The example array below contains all possible values.

For example:

```js
analytics.load('writekey', { highEntropyValuesClientHints: ['architecture', 'bitness', 'model', 'platformVersion', 'uaFullVersion', 'fullVersionList', 'wow64'] })
```

#### Disabling 
For testing or staging environments, it can be useful to disable your SDK to ensure no events send. 

If `disable: true` is passed, all analytics method calls will be a no-op, and no network calls will be initiated.

```ts
analytics.load('writekey', { disable: true })
```

For wrapper/plugin authors: if you have a use case where you need special access to the CDN Settings (for example, consent management), you can also pass a function. This API waits for `cdnSettings` to be fetched. Keep in mind that `cdnSettings` is an _unstable_ object.

```ts
analytics.load('writekey', { disable: (cdnSettings) => true })
```

## Retries

Analytics.js automatically retries sending events when there are network or server errors. This helps reduce data loss in cases where the user is offline or the Segment API is temporarily unavailable.

When retries are enabled, Analytics.js can:

- **Track users offline.** Events get stored locally and sent once the user comes back online.
- **Handle intermittent network issues.** Events are queued and retried until they’re successfully delivered.

Here's how retries work:

- Events are stored in `localStorage` when available, with an in-memory fallback.
- Analytics.js retries up to 10 times, with increasing backoff intervals between attempts.
- A maximum of 100 events can be queued to avoid using too much local storage.

For more information, see the [destination retries documentation](/docs/connections/destinations/#retries).

### About the `_metadata` field

Each time an event is retried, Segment recalculates its `_metadata` field. This field helps indicate whether the event was sent to a device-mode destination. If you change your destination settings between retries, the updated `_metadata` may not reflect the original attempt, which could affect downstream debugging or delivery visibility.

## Delivery strategy configuration

The `deliveryStrategy.config` object lets you customize how data is delivered to Segment. This includes options like setting custom headers and enabling `keepalive` to capture events during hard redirects.

### Adding custom headers

You can override default headers by providing custom headers in your configuration. Use the `deliveryStrategy.config.headers` option to specify the headers, like in the following example:

```ts
analytics.load("<YOUR_WRITE_KEY>", {
  integrations: {
    'Segment.io': {
      deliveryStrategy: {
        config: {
          headers: { 'x-api-key': 'foo' }
        }
      }
    }
  }
});
```

## Keepalive

You can use the `keepalive` option to make sure that Segment captures API calls triggered during a hard redirect. When enabled, `keepalive` will try to fire events before the redirect occurs.

By default, `keepalive` is set to `false`, because all fetch requests with the `keepalive` flag are subject to a 64 KB size limit. Additionally, `keepalive` requests share this size limit with all other in-flight `keepalive` requests, regardless of whether they're related to Segment. This competition for resources can lead to data loss in some scenarios.

Segment only uses `keepalive` by default if:
- The browser detects that the page is unloading (like if the user closes the tab or navigates away).
- You have batching enabled.

To enable `keepalive`, use the following configuration:

```ts
analytics.load("<YOUR_WRITE_KEY>", {
  integrations: {
    'Segment.io': {
      deliveryStrategy: {
        config: {
          keepalive: true
        }
      }
    }
  }
});
```

## Batching
Batching is the ability to group multiple requests or calls into one request or API call. All requests sent within the same batch have the same `receivedAt` time. With Analytics.js, you can send events to Segment in batches. Sending events in batches enables you to have:
- Delivery of multiple events with fewer API calls.
- Fewer errors if a connection is lost because an entire batch will retry at once rather than multiple calls retrying at random times.

### Setup
You can start batching by changing the `strategy` to `"batching"` and the parameters for `size` and `timeout` within the Load method in the analytics object. Batching requires both parameters.

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

Upon receiving the `beforeunload` browser event, Analytics.js attempts to flush the queue using `fetch` requests with `keepalive` set to `true`. Since the max size of `keepalive` payloads is limited to 64 KB, if the queue size is bigger than 64 KB at the time the browser closes, then there is a chance of losing a subset of the queued events. Reducing the batch size or timeout will alleviate this issue, but that will be a trade-off decision.

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

## Plugins and source middleware
When you develop against Analytics 2.0, the plugins you write can augment functionality, enrich data, and control the flow and delivery of events. From modifying event payloads to changing analytics functionality, plugins and middleware help to speed up the process of getting things done.

Plugins and source middleware accomplish the same thing, but plugins are significantly more powerful (but more verbose to implement).

For basic use cases like adding event fields or dropping specific events, use [source middleware](#source-middleware). If you need more granular control of the lifecycle, or want to be able to abort the Segment initialization, you should use [plugins](#plugins-for-advanced-use-cases).

### Source middleware 
[Source middleware](/docs/connections/sources/catalog/libraries/website/javascript/middleware/) runs before any other plugins. You can use this to enrich or drop an event.

#### Example usage of `addSourceMiddleware`
Here are some examples of using `addSourceMiddleware` for enrichment and validation.

* Enrichment
    ```js
    analytics.addSourceMiddleware(({ payload, next }) => {
       const { event } = payload.obj.context
       if (event.type === 'track') {
          event.event.toLowerCase()
       }
       next(payload)
    });
    ```

* Validation
    ```js
    analytics.addSourceMiddleware(({ payload, next }) => {
      const { event } = payload.obj.context
      if (!isValid(event)) {
        return null // event is dropped
      }
      next(payload)
    });
    ```

### Advanced Plugin API
For advanced modification to the event pipeline.

| Type          | Details                                                                                                                                                                                                                                                                                                                                                                                                                   
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `before`      | Executes before event processing begins. These are plugins that run before any other plugins run. Thrown errors here can block the event pipeline. Source middleware added using `addSourceMiddleware` is treated as a `before` plugin. |
| `enrichment`  | Executes as the first level of event processing. These plugins modify an event. Thrown errors here can block the event pipeline. |
| `destination` | Executes as events begin to pass off to destinations. Segment.io is implemented as a destination plugin. Thrown errors here will _not_ block the event pipeline. |
| `after`       | Executes after all event processing completes. You can use this to perform cleanup operations. |
| `utility`     | Executes _only once_ during the analytics.js bootstrap. Gives you access to the analytics instance using the plugin's `load()` method. This doesn't allow you to modify events. |

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

Here's an example of a `utility` plugin that allows you to change the format of the `anonymous_id` cookie:

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

You can view Segment's [existing plugins](https://github.com/segmentio/analytics-next/tree/master/packages/browser/src/plugins){:target="_blank"} to see more examples.

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

Analytics.js tracks across subdomains out of the box. All Segment destinations fully support this feature.

To track activity on your subdomains, include the Segment Analytics.js snippet on each subdomain. Segment sets users' `anonymousId` on the top-level domain, so that users are tracked across any subdomain.

Because Segment tracks across subdomains, you can either use the same Segment source, or use separate sources for each subdomain. What you decide depends on your team's goals for tracking each subdomain.

> info ""
> Segment doesn't offer tracking across top-level domains out of the box. If you want to track across top-level domains, you can use Segment's [Querystring API](/docs/connections/sources/catalog/libraries/website/javascript/querystring/) to pass the `anonymousId` from Website A to Website B in the query string. When a user moves from Website A to Website B with the `anonymousId` in the query string, Analytics.js reads that value and sets the `anonymousId` to it, rather than generating a new one.  

## UTM tracking

UTM parameters are only used when linking to your site from outside your domain. When a visitor arrives using a link containing UTM parameters, Segment's Analytics.js library will parse the URL query string and add the information to the event payload. For more information about UTM tracking, see the [Tracking Customers Across Channels and Devices](/docs/guides/how-to-guides/cross-channel-tracking/) documentation.

UTM parameters contain 3 essential components (utm_source, utm_medium, and utm_campaign) and 2 optional (utm_content and utm_term). For example, if you include the following 3 parameters in your URL: `?utm_source=mysource&utm_medium=email&utm_campaign=mytestcampaign`, once a visitor arrives using a link containing the above, Segment automatically grabs the UTM parameters and subsequent events will contain these parameters within the `context` object (visible in the raw view of your Source Debugger.)

So, for example, if somebody follows the link with above query string to your site, the subsequent Page call in your Debugger should contain the below and will be passed to any enabled destinations:

```js
"context": {
 "campaign": {
 "medium": "email",
 "name": "mytestcampaign",
 "source": "mysource",
 },
```

Whenever the UTM parameters are no longer a part of the URL, Segment no longer includes them. For example, if the user goes to a new page within your website which does not contain these parameters, they will not be included in subsequent events. UTM parameters are non-persistent by default as they could potentially cause data accuracy problems. Here's an example of why: Say a user clicks on an ad and lands on your site. They navigate around and bookmark an internal page - or maybe shares a link with a friend, who shares it with another friend. All those links would then point back to the same test utm_source as the initial referrer for any purchase.

Segment doesn't validate UTM parameter names. This design supports the flexibility to track both standard parameters (for example, utm_source or utm_medium) and custom parameters defined by users. As a result, all parameters present in the URL collected as is, and are added to the context field without checks for naming conventions or validity.

If you want to ensure that only standard UTM parameters (such as utm_source, utm_medium, utm_campaign, utm_content, or utm_term) are included in the `context.campaign` object, you can implement [Source middleware](/docs/connections/sources/catalog/libraries/website/javascript/middleware/) in your Analytics.js setup. 

For example:

```js
window.analytics.addSourceMiddleware(({ payload, next }) => {
  if (payload.obj.context?.campaign) {
    const allowedFields = ["source", "medium", "term", "campaign", "content"];
    const campaign = payload.obj.context.campaign;
    Object.keys(campaign).forEach(key => {
      if (!allowedFields.includes(key)) {
        delete campaign[key];
      }
    });
  }
  next(payload);
});
```
This middleware filters out any non-standard parameters from the `context.campaign` object before they're sent to Segment or forwarded to your enabled destinations.

## Analytics.js performance

The Analytics.js library and all destination libraries are loaded with the [HTML script `async` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async){:target="_blank"}. This also means that Segment fires methods asynchronously, so you should adjust your code accordingly if you require that events be sent from the browser in a specific order.

While many tools require access to the DOM or cookies, for the Zendesk, Salesforce, and Mailchimp destinations, Segment doesn't need to load a native JavaScript library. Instead, Segment's servers send data to the end-tools.

Segment loads the libraries required for your **enabled** destinations. When you disable a destination, the custom version of Analytics.js loaded on your site stops requesting that library.

Using Analytics.js doesn't offer a large performance benefit, but is more performant than installing each of the destinations individually. And as more destinations move to accept data directly from Segment, you'll receive more performance benefits automatically.

One option, if you don't want to use any bundled third-party tools, is to use the [Analytics-Node](https://github.com/segmentio/analytics-node) package.

> info ""
> Analytics.js doesn't set third-party cookies and only sets first-party cookies.

### Bundle size

Segment's Analytics.js JavaScript snippet increases the page size by about 1.1 KB.

The snippet asynchronously requests and loads a customized JavaScript bundle (`analytics.min.js`), which contains the code and settings needed to load your [device-mode destinations](/docs/connections/destinations/#connection-modes). The size of this file changes depending on the number of and which destinations you enable.

Without any destinations enabled, the `analytics.min.js` file is about 62 KB. Each time you enable a destination, the file's size may increase slightly.

### Cookies set by Analytics.js

Segment sets 3 cookies in general:

| Cookie             | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| `ajs_anonymous_id` | An anonymous ID generated by Analytics.js, used for Segment calls.                |
| `ajs_group_id`     | A group ID that can be specified by making a Group call with Analytics.js.    |
| `ajs_user_id`      | A user ID that can be specified by making an Identify call with Analytics.js. |

For Google Chrome, these cookies expire by default **one year** after the date created. Other [supported browsers](/docs/connections/sources/catalog/libraries/website/javascript/supported-browsers/) might have a different expiration time.

Some user/group traits are also stored in `localStorage`:

| Cookie                 | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `ajs_user_traits`      | The traits that are passed in an Identify call. |
| `ajs_group_properties` | The properties that are passed in a Group call. |

Note that `localStorage` variables don't expire because the browser defines that functionality.

### Local storage cookies used by Analytics.js

Analytics.js uses `localstorage` cookies if you have retries enabled, to keep track of retry timing.
- The `ack` cookie is a timer used to see if another tab should claim the retry queue.
- The `reclaimStart` and `reclaimEnd` cookies determine if a tab takes over the queue from another tab.
- The `inProgress` and `queue` cookies track events in progress, and events queued for retry.

For more information, visit the [Segment localstorage-retry library](https://github.com/segmentio/localstorage-retry){:target="_blank"}.

You can set the `debug` cookie to `analytics.js` to log debug messages from Analytics.js to the console.

## Tracking blockers and browser privacy settings

Segment does not endorse bypassing tracking blockers or browser privacy settings for client-side tracking. Your users have control over what gets loaded on their pages and can use plugins or browser settings to block third-party scripts, including Segment. To minimize client-side data loss, Segment recommends you choose from the following routes:

- Respect the user's decision to implement tracking blockers or use privacy settings, knowing that, unfortunately, some data will be lost.
- Ask the customer to disable the tracking blockers or adjust their privacy settings (for example, in the case of large, corporate customers).
- Move as many events and tracking actions as possible to a server-side library, which won't encounter the same limitations.

To minimize client-side data loss, Segment provides a few workarounds. However, it's important to note that Segment cannot guarantee their effectiveness.

- Use the [bundle obfuscation](#bundle-obfuscation) feature. You can add an obfuscate property to the object in the second parameter, which obscures the URL from which your integrations and destination actions are loaded. This helps prevent words that are flagged by ad blockers to not be detected in your URL, enabling the integration to properly load.

- Create a [custom proxy](/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy/). This changes the URL that Segment loads from (cdn.segment.com) and the outgoing requests generated when events are triggered (api.segment.io).

- Consider implementing the Segment Edge SDK. The Segment Edge SDK uses Cloudflare Workers to facilitate first-party data collection and real-time user profiling for app personalization. It integrates Segment's library into web apps, manages user identity using HTTPOnly cookies, and employs an internal router for efficient data processing and user experience customization. This innovative approach simplifies tracking and personalization for Segment customers. More information is available in the [Edge SDK README](https://github.com/segmentio/analytics-edge/blob/main/packages/edge-sdk/README.md){:target="_blank”}.

* Consider using one of Segment’s [server-side libraries](/docs/connections/sources/#server). Using a server-side library eliminates concerns about tracking blockers and privacy browsers that can prevent Segment from loading. This option may require additional code to track actions like a Page call, as you now need to manually pass contextual information that would have been automatically collected by Analytics.js, like `url`, `path`, and `referrer`. Note that some destinations are device-mode only.

## Installing the library under a custom global namespace

When you load Analytics.js through snippet code, by default, the SDK installs on `window.analytics` global variable. If this causes a conflict with another library on your page, you can change the global variable used by Analytics.js if you use snippet version 5.2.1 or later.

Change the global variable in the beginning of your snippet code as shown below. In this case, Analytics.js uses `window.custom_key` to load instead of `window.analytics`.

```diff
  - !function(){var i="analytics", ...
  + !function(){var i="custom_key", ...
```

## Add destinations from npm

Bundle the destinations you want loaded from [npm](https://www.npmjs.com/package/@segment/analytics-next){:target="_blank"} instead of having them loaded from a remote CDN. This enables you to have fewer network requests when adding destinations.

- To add actions-based destinations from npm: 

  ```js
  import vwo from '@segment/analytics-browser-actions-vwo'
  import braze from '@segment/analytics-browser-actions-braze'

  const analytics = AnalyticsBrowser.load({
    writeKey: '<WRITE_KEY>',
    plugins: [vwo, braze],
  })
  ```

  Pass in the destination plugin to the added config option called `plugins`.  A list of all action destination packages can be found on GitHub in the [@segmentio/action-destinations](https://github.com/segmentio/action-destinations/blob/main/packages/destinations-manifest/package.json){:target="_blank"} repository.


- To add classic destinations from npm: 

  ```js
  import { AnalyticsBrowser } from '@segment/analytics-next'
  import GoogleAnalyticsIntegration from '@segment/analytics.js-integration-google-analytics'

  // The following example assumes configuration for Google Analytics will be available in the fetched settings
  const analytics = AnalyticsBrowser.load({
    writeKey: '<WRITE_KEY>',
    classicIntegrations: [ GoogleAnalyticsIntegration ]
  }),
  ```

## Segment Inspector
The Segment Inspector is a Chrome web extension that enables you to debug your Segment integration on web applications instrumented with Analytics.js. Analytics.js sends data to the extension so that you can see how events change before they're sent to your destinations and so that you can verify that the event details are correct. The Segment Inspector also lets you analyze and confirm that API calls made from your website arrive to your Analytics.js source. 

> info ""
> For the Segment Inspector to work, you must enable the Analytics.js source.

To add the Segment Inspector as a Chrome extension:
1. Go to the [Segment Inspector in the Chrome web store](https://chromewebstore.google.com/detail/segment-inspector/jfcbmnpfbhhlhfclmiijpldieboendfo){:target="_blank”}.
2. Click **Add to Chrome**.
3. Click **Add Extension** in the pop-up window.  

Once installed, use the Inspect Elements developer tool in Chrome to use the Segment Inspector. To access the Inspector, go to the top menu bar of Chrome and navigate to **View > Developer > Developer Tools** and go to the **Segment** tab. On the Segment tab, you can:
- Filter the different calls by type
- Search based off of the content in the calls
- Identify users  

### Components of the Segment Inspector 
The Segment Inspector has 3 components:
1. The **Diagnostics** tab 
   - This tab shows the library versions and the list of active integrations that are running. 
   - When you select an integration, you can see the options that passed while the integration loads. If you made any local overrides within the integration or on the page itself, they appear highlighted in the code. 
2. The **Events** tab 
   - This tab enables you to select an event and see the specific details of the event. You can view the time the event occurred, the status of the event (whether it sent or failed), what plugins were added, and how the context object changed. Any changes made to the payload appear highlighted. 
   - Select the double-checked icon to see the payload at the delivery stage.
   - Select the *fx* icon to see the payloads after plugins ran.
   - Select the single-checked icon to see the payload as it was when the event triggered.
3. The **Identity** tab 
   - This tab enables you to see the information of a user if you're using Identify. You can associate the data to an individual and measure their activity across multiple sessions and devices. This tab only shows the user's traits that are on the client. 
   - If you're not using Identify, the user remains anonymous. 

## Example uses 
Here are some examples of using Analytics.js. Note that the examples assume Analytics.js is installed through [npm](https://github.com/segmentio/analytics-next/tree/master/packages/browser){:target="_blank”}.

- **Next.js**
   - [with-segment-analytics](https://github.com/vercel/next.js/tree/canary/examples/with-segment-analytics){:target="_blank”}
   - [with-segment-analytics-pages-router](https://github.com/vercel/next.js/tree/canary/examples/with-segment-analytics-pages-router){:target="_blank”}
- **Vanilla React, Vue**
   - See [Usage in Common Frameworks and SPAs](https://github.com/segmentio/analytics-next/tree/master/packages/browser#examples--usage-in-common-frameworks-and-spas){:target="_blank”}

## External dependencies

Analytics.js production dependencies are [listed under the **dependencies** key](https://github.com/segmentio/analytics-next/blob/master/packages/browser/package.json){:target="_blank”}.
