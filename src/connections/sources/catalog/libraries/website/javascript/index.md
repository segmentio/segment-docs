---
title: Analytics.js 2.0 Source
redirect_from:
  - '/connections/sources/catalog/libraries/website/analytics.js/'
  - '/sources/website/javascript/'
  - '/sources/website/analytics.js/'
  - '/connections/sources/catalog/libraries/website/javascript/analytics-js-2/'
strat: ajs
---

Analytics.js 2.0, the latest version Segment's Javascript source, enables you to send your data to any tool without having to learn, test or use a new API every time.

> note ""
> Analytics.js 2.0 is available to Segment customers subject to the terms of the subscription agreement between Segment and the customer, and is not available as an open-source project.


## Benefits of Analytics.js 2.0

Analytics.js 2.0 provides two key benefits over the previous version.

### Performance

Analytics.js 2.0 provides a reduction in page load time, which improves site performance. Its package size is **~70%** smaller than the previous Analytics.js.

> info ""
> Many factors impact page load time, including page weight, network conditions, and hosting locations.


### Developer experience

Analytics.js 2.0 improves developer experience by introducing new ways for developers to augment events throughout the event timeline. For example, developers can augment events either before or after an event occurs, or while the event is in-flight. 

For example, you can use the Analytics.js 2.0 to build features that:

- Ensure you have user consent to track before an event fires
- Enrich events with customer or page context while in-flight with middleware
- Check an event for errors after the event is sent to Segment

## Getting Started

Read through the [Analytics.js QuickStart Guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) which explains how to add Analytics.js to your site. Once you've installed the library, read on for the detailed API reference!

For information about upgrading to Analytics.js 2.0, see [Upgrade to Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/upgrade-to-ajs2).

### Upgrade your existing Javascript sources

For information about upgrading your existing javascript sources, see [Upgrade to A.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/upgrade-to-ajs2).

## Basic tracking methods

The basic tracking methods below are the building blocks of your Segment tracking. They include [Identify](#identify), [Track](#track), [Page](#page), [Group](#group), and [Alias](#alias), as described below.

These names might be familiar, because they are the basic methods covered by the [Segment Spec](/docs/connections/spec/). The documentation on this page explains how to use these methods in Analytics.js specifically.

> note ""
> **Good to know**: For any of the different methods described in this page, you can replace the properties in the code samples with variables that represent the data collected.

### Identify

The `identify` method is how you link your users, and their actions, to a recognizable `userId` and `traits`. You can see [an `identify` example in the Quickstart guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-3-identify-users) or [find details on the identify method payload](/docs/connections/spec/identify/).

> note ""
> Segment recommends _against_ using `identify` for anonymous visitors to your site. Analytics.js automatically retrieves an `anonymousId` from localStorage or assigns one for new visitors, and attaches it to all `page` and `track` events both before and after an `identify`.

The Identify method follows the format below:

```js
analytics.identify([userId], [traits], [options], [callback]);
```

The Identify call has the following fields:

<table>
  <tr>
    <td>`userId`</td>
    <td>optional</td>
    <td>String</td>
    <td>The database ID for the user. If you don't know who the user is yet, you can omit the `userId` and just record `traits`. You can read more about identities in the [identify reference](/docs/connections/spec/identify).</td>
  </tr>
  <tr>
    <td>`traits`</td>
    <td>optional</td>
    <td>Object</td>
    <td>A dictionary of traits you know about the user, like their `email` or `name`. You can read more about traits in the [identify reference](/docs/connections/spec/identify/).</td>
  </tr>
  <tr>
    <td>`options`</td>
    <td>optional</td>
    <td>Object</td>
    <td>A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a *traits* object, pass an empty object (as an '{}') before *options*_</td>
  </tr>
  <tr>
    <td>`callback`</td>
    <td>optional</td>
    <td>Function</td>
    <td>A function executed after a short timeout, giving the browser time to make outbound requests first.</td>
  </tr>
</table>


By default, Analytics.js caches traits in the browser's `localStorage` and are attaches them to each Identify call.

For example, you might call Identify when someone signs up for a newsletter, but hasn't yet created an account on your site. The example below shows an Identify call (using hard-coded traits) that you might send in this case.
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

<table>
  <tr>
    <td>`event`</td>
    <td></td>
    <td>String</td>
    <td>The name of the event you're tracking. You can read more about the [track method](/docs/connections/spec/track) and recommended event names.</td>
  </tr>
  <tr>
    <td>`properties`</td>
    <td>optional</td>
    <td>Object</td>
    <td>A dictionary of [properties](/docs/connections/spec/track#properties) for the event. If the event was `'Added to Cart'`, it might have properties like `price` and `productType`.</td>
  </tr>
  <tr>
    <td>`options`</td>
    <td>optional</td>
    <td>Object</td>
    <td>A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a *properties* object, pass an empty object (like '{}') before *options*_</td>
  </tr>
  <tr>
    <td>`callback`</td>
    <td>optional</td>
    <td>Function</td>
    <td>A function that runs after a short timeout, giving the browser time to make outbound requests first.</td>
  </tr>
</table>

The only required argument in Analytics.js is an _event name string_. You can read more about [how Segment recommends you name events](/docs/connections/spec/track#event).

Example Track call:

```js
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
```

For more information about choosing which events to track, event naming and more, check out [Analytics Academy](https://segment.com/academy/)

The only required argument on Track calls in Analytics.js is an `event` name string. Read more about how Segment recommends [naming your events](/docs/connections/spec/track#event).


#### Track Link

`trackLink` is a helper method that attaches the `track` call as a handler to a link.
With `trackLink`, Analytics.js inserts a short timeout (300 ms) to give the `track` call more time. This is useful when a page would redirect before the `track` method could complete all requests.

The `trackLink` method follows the format below.

```js
analytics.trackLink(element, event, [properties])
```

<table>
  <tr>
    <td>`element(s)` </td>
    <td>Element or Array</td>
    <td>DOM element to bind with `track` method. You may pass an array of elements or jQuery objects. _Note: This must be an element, **not** a CSS selector._</td>
  </tr>
  <tr>
    <td>`event` </td>
    <td>String or Function</td>
    <td>The name of the event, passed to the `track` method. Or a **function** that returns a string to use as the name of the `track` event.</td>
  </tr>
  <tr>
    <td>`properties` optional</td>
    <td>Object or Function</td>
    <td>A dictionary of properties to pass with the track method. Or a **function** that returns an object to use as the `properties` of the event.</td>
  </tr>
</table>

Example:

```js
var link = document.getElementById('free-trial-link');

analytics.trackLink(link, 'Clicked Free-Trial Link', {
  plan: 'Enterprise'
});
```

#### Track Form

`trackForm` is a helper method that binds a `track` call to a form submission.
The `trackForm` method inserts a short timeout (300 ms) to give the `track` call more time to complete. This is useful to prevent a page from redirecting before the `track` method could complete all requests.

The `trackForm` method follows the format below.

```js
analytics.trackForm(form, event, [properties])
```

<table>
  <tr>
    <td>`form(s)` Element or Array</td>
    <td>Element or Array</td>
    <td>The form element to track or an array of form elements or jQuery objects. _Note: trackForm takes an element, not a CSS selector._</td>
  </tr>
  <tr>
    <td>`event` </td>
    <td>String or Function</td>
    <td>The name of the event, passed to the `track` method. Or a **function** that returns a string to use as the name of the `track` event.</td>
  </tr>
  <tr>
    <td>`properties` optional</td>
    <td>Object or Function</td>
    <td>A dictionary of properties to pass with the track method. Or a **function** that returns an object to use as the `properties` of the event.</td>
  </tr>
</table>

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

Because some destinations require a `page` call to instantiate their libraries, **you must call `page`** at least once per page load. You can call it more than once if needed, for example on virtual page changes in a single page app.

Analytics.js includes a Page call by default as the final line in [the Analytics.js snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet). You can update this `page` call within the guidelines below.

The `page` method follows the format below.

```js
analytics.page([category], [name], [properties], [options], [callback]);
```

The `page` call has the following fields:

<table>
  <tr>
    <td>`category`</td>
    <td>optional</td>
    <td>String</td>
    <td>The category of the page. Useful for cases like ecommerce where many pages might live under a single category. _Note: if you pass only one string to `page` it is assumed to be `name`. You **must** include a `name` to send a `category`._</td>
  </tr>
  <tr>
    <td>`name`</td>
    <td>optional</td>
    <td> String</td>
    <td>The name of the page.</td>
  </tr>
  <tr>
    <td>`properties`</td>
    <td>optional</td>
    <td> Object </td>
    <td>A dictionary of properties of the page. Note: Analytics.js collects `url`, `title`, `referrer` and `path` are automatically. This defaults to a `canonical url`, if available, and falls back to `document.location.href`.</td>
  </tr>
  <tr>
    <td>`options`</td>
    <td>optional</td>
    <td>Object</td>
    <td>A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a `properties` object, pass an empty object (like '{}') before `options`_ </td>
  </tr>
  <tr>
    <td>`callback`</td>
    <td>optional</td>
    <td>Function</td>
    <td>A function that runs after a short timeout, giving the browser time to make outbound requests first.</td>
  </tr>
</table>


#### Default Page Properties

Analytics.js adds some properties to each `page` call.

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

This is useful for <!-- Business-to-Business (B2B) -->tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.


The Group method follows the format below.

```js
analytics.group(groupId, [traits], [options], [callback]);
```
The Group call has the following fields:

<table>
  <tr>
    <td>`groupId`</td>
    <td></td>
    <td>String</td>
    <td>The Group ID to associate with the current user.</td>
  </tr>
  <tr>
    <td>`traits`</td>
    <td>optional</td>
    <td> Object</td>
    <td>A dictionary of [traits](/docs/connections/spec/group#traits) for the group. Example traits for a group include `address`, `website` and `employees`.</td>
  </tr>
  <tr>
    <td>`options`</td>
    <td>optional</td>
    <td>Object</td>
    <td>A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call. _Note: If you do not pass a `properties` object, pass an empty object (like '{}') before `options`_</td>
  </tr>
  <tr>
    <td>`callback`</td>
    <td>optional</td>
    <td>Function</td>
    <td>A function that runs after a short timeout, giving the browser time to make outbound requests first.</td>
  </tr>
</table>


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

Find more details about `group` including the **`group` payload** in [the Group Spec](/docs/connections/spec/group/).

### Alias

The Alias method combines two unassociated user identities. Segment usually handles aliasing automatically when you call Identify on a user, however some tools require an explicit `alias` call.

This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations such as [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias) and [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias). <!-- TODO: LR Dests question: is this still true? Is there a list of the ones that require this?-->

The Alias method follows the format below:

```js
analytics.alias(userId, [previousId], [options], [callback]);
```

The Alias call has the following fields:

<table>
  <tr>
    <td>`userId`</td>
    <td></td>
    <td>String</td>
    <td>The new user ID you want to associate with the user.</td>
  </tr>
  <tr>
    <td>`previousId`</td>
    <td>optional</td>
    <td>String</td>
    <td>The previous ID that the user was recognized by. This defaults to the currently identified user's ID.</td>
  </tr>
  <tr>
    <td>`options`</td>
    <td>optional</td>
    <td>Object</td>
    <td>A dictionary of options. For example, [enable or disable specific destinations](#managing-data-flow-with-the-integrations-object) for the call.</td>
  </tr>
  <tr>
    <td>`callback`</td>
    <td>optional</td>
    <td>Function</td>
    <td>A function that is executed after a short timeout, giving the browser time to make outbound requests first.</td>
  </tr>
</table>

For more details about Alias, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).


## Utility Methods

The Analytics.js utility methods help you change how Segment loads on your page. They include:

- [Ready](#ready)
- [Debug](#debug)
- [On (Emitter)](#emitter)
- [Timeout](#extending-timeout)
- [Reset (Logout)](#reset-or-logout)

### Ready

The `ready` method allows you to pass in a method that is called once Analytics.js finishes initializing, and once all enabled device-mode destinations load. It's like [jQuery's `ready` method](https://api.jquery.com/ready/), except for destinations.

`ready` is not invoked if any destination throws an error (for example for an expired API key, incorrect settings configuration, or when a destination is blocked by the browser) during initialization.

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

<table>
  <tr>
    <td>`callback` </td>
    <td>Function</td>
    <td>A function to be executed after all enabled destinations have loaded.</td>
  </tr>
</table>

### Debug

Calling the `debug` method turns on debug mode, which logs helpful messages to the console. Refresh the page after you invoke `debug` to see the messages.

Enable:
```js
analytics.debug();
```

Disable:
```js
analytics.debug(false);
```


### Emitter

The global `analytics` object emits events whenever you call `alias`, `group`, `identify`, `track` or `page`.

Use the `on` method to set listeners for these events and run your own custom code. This can be useful if you want to send data to a service for which Segment does not have a destination.

```js
analytics.on(method, callback);
```

<table>
  <tr>
    <td>`method` </td>
    <td>String</td>
    <td>Name of the method to listen for</td>
  </tr>
  <tr>
    <td>`callback` </td>
    <td>Function</td>
    <td>A function to execute after each the emitted method, taking three arguments: `event`, `properties`, `options`</td>
  </tr>
</table>

Example:

```js
analytics.on('track', function(event, properties, options) {

  bigdataTool.push(['recordEvent', event]);

});
```

This method emits events _before_ they are processed by the Segment integration, and may not include some of the normalization Segment does on the client before sending the data to the Segment servers.

> note ""
> **Note:** Page event properties are stored in the `options` object.


### Extending Timeout

The `timeout` method sets the length (in milliseconds) of the callbacks and helper functions. This is helpful if you have multiple scripts that need to fire in your callback or `trackLink`, `trackForm` helper function.

The example below sets the timeout to 500ms.

```js
analytics.timeout(500);
```

> success ""
> **Tip**: We recommend extending to 500ms if you're triggering ad network conversion pixels since those are often a bit slower to load.


### Reset or Logout

Calling `reset` resets the `id`, including anonymousId, and clears `traits` for the currently identified user and group.

```js
analytics.reset();
```

The `reset` method only clears the cookies and `localStorage` created by Segment. It does not clear data from other integrated tools, as those native libraries might set their own cookies to manage user tracking, sessions, and manage state. To completely clear out the user session, see the documentation provided by those tools.

Segment does not share `localStorage` across subdomains. If you use Segment tracking on multiple subdomains, you must call `analytics.reset()` for each subdomain to completely clear out the user session.



## Managing data flow with the Integrations object

> success ""
> **Tip**: You can change how your data flows in several different ways without having to change your code. See [Filtering Data](/docs/guides/filtering-data/) to learn more.

You can pass an `integrations` object in the `options` of Alias, Group, Identify, Page and Track <!--TODO: Lr note, not screen?--> methods to send data to only the selected destinations. By default all destinations are enabled.

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

You don't need to include `'All': true` in this call because it is implied as the default behavior. Instead, only list the destinations that you want to exclude, with a `false` flag for each.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (for example, "AdLearn Open Platform", "awe.sm", "MailChimp", etc). If a destination has more than one acceptable name, this appears in the documentation for that destination.

> success ""
> **Tip:** Business tier customers can filter Track calls from the Source Schema page in the Segment UI. We recommend that you use the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.


### Load Options

You can modify the `.load` method in Analytics.js (the second line of the snippet) to take a second argument. If you pass an object with an `integrations` dictionary (matching the format [above](#selecting-destinations-with-the-integrations-object)), then Segment only loads the integrations in that dictionary that are marked as enabled with the boolean value `true`.

You can only call `.load` on page load, or reload (refresh). If you modify the `.load` method between page loads, it does not have any effect until the page is reloaded.

An example:

```js
analytics.load('writekey', { integrations: { All: false, 'Google Analytics': true, 'Segment.io': true } })
```

> info ""
> **Note:** To use this feature, you must be on snippet version 4.1.0 or later. You can get the latest version of the snippet [here](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet).

This way, you can conditionally load integrations based on what customers opt into on your site. The example below shows how you might load only the tools that the user agreed to use.

```js
onConsentDialogClosed(function(consentedTools){
  analytics.load('writekey', { integrations: consentedTools })
})
```


## Retries

When enabled, Analytics.js automatically retries network and server errors. With persistent retries, Analytics.js can:

- **Support offline tracking**. Analytics.js queues your events and delivers them when the user comes back online.
- **Better handle network issues**. If there happens to be a time where your application can't connect to Segment's API, we'll continue to store the events on the browser to ensure you don't lose any data.

Analytics.js stores events in `localStorage` and falls back to in-memory storage when `localStorage` is unavailable. It retries up to 10 times with an incrementally increasing back-off time between each retry. Analytics.js queues up to 100 events at a time to avoid using too much of the device's local storage. See the [destination Retries documentation](/docs/connections/destinations/#retries) to learn more.

## Plugins

Segment offers video player 'plugins' so you can quickly collect video events using Analytics.js. See the specific documentation below to learn more:

- [YouTube](/docs/connections/sources/catalog/libraries/website/plugins/youtube)
- [Vimeo](/docs/connections/sources/catalog/libraries/website/plugins/vimeo)

## Cross-Subdomain Analytics

Analytics.js tracks across subdomains out of the box; all of our destinations fully support this feature.


## Analytics.js Performance

The Analytics.js library and all of the destination libraries are loaded with the [HTML script `async` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async). This also means that Segment fires methods asynchronously, so you should adjust your code accordingly if you require that events be sent from the browser in a specific order.

While many tools require access to the DOM or cookies, for the Zendesk, Salesforce, and MailChimp destinations, Segment does not need to load a native Javascript library! Instead, Segment's servers send data to the end-tools.

Segment loads the libraries required for your **enabled** destinations. When you disable a destination, the custom version of Analytics.js loaded on your site stops requesting that library.

Using Analytics.js does not offer a large performance benefit, but is more performant than installing each of the destinations individually. And as more destinations move to accept data directly from Segment, you'll receive more performance benefits automatically.

One option, if you don't want to use any bundled third-party tools, is to use the browserify'd [analytics-node](https://github.com/segmentio/analytics-node) package. <!-- TODO LR note: WTF does "browserified" mean-->

### Bundle size

Segment's Analytics.js Javascript snippet increases the page size by about 1.1KB.

The snippet asynchronously requests and loads a customized Javascript bundle (`analytics.min.js`), which contains the code and settings needed to load your [device-mode destinations](/docs/connections/destinations/#connection-modes). The size of this file changes depending on the number of and which destinations you enable.

Without any destinations enabled, the `analytics.min.js` file is about 62KB. Each time you enable a destination, the file's size may increase slightly.

### Local storage cookies used by Analytics.js

Analytics.js uses `localstorage` cookies if you have retries enabled, to keep track of retry timing.
- The `ack` cookie is a timer used to see if another tab should claim the retry queue.
- The `reclaimStart` and `reclaimEnd` cookies determine if a tab takes over the queue from another tab.
- The `inProgress` and `queue` cookies track events in progress, and events queued for retry.

For more information, visit the [Segment localstorage-retry library](https://github.com/segmentio/localstorage-retry).

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