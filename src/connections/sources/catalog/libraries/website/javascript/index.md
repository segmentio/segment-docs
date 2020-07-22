---
title: Analytics.js (Javascript) Source
redirect_from:
  - '/connections/sources/catalog/libraries/website/analytics.js/'
  - '/sources/website/javascript/'
  - '/sources/website/analytics.js/'
strat: ajs
---

Analytics.js, Segment's Javascript source, makes it simple to send your data to any tool without having to learn, test or implement a new API every time.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

	- [Getting Started](#getting-started)
	- [Identify](#identify)
	- [Track](#track)
	- [Page](#page)
		- [Default Page Properties](#default-page-properties)
	- [Group](#group)
	- [Alias](#alias)
	- [Ready](#ready)
	- [Selecting destinations with the Integrations object](#selecting-destinations-with-the-integrations-object)
	- [Load Options](#load-options)
	- [User & Group Information](#user-group-information)
		- [Clearing Traits](#clearing-traits)
		- [Reset or Logout](#reset-or-logout)
	- [Cross-Subdomain Analytics](#cross-subdomain-analytics)
	- [Anonymous ID](#anonymous-id)
		- [Retrieving the Anonymous ID](#retrieving-the-anonymous-id)
		- [Setting the Anonymous ID](#setting-the-anonymous-id)
		- [Refreshing the Anonymous ID](#refreshing-the-anonymous-id)
	- [Debug](#debug)
	- [Emitter](#emitter)
		- [Track Link](#track-link)
		- [Track Form](#track-form)
	- [Extending Timeout](#extending-timeout)
	- [Performance](#performance)
		- [Bundle size](#bundle-size)
	- [Retries](#retries)
	- [Anonymizing IP](#anonymizing-ip)
	- [Proxy](#proxy)
	- [Plugins](#plugins)
	- [Context & Traits](#context-traits)
	- [Segment ID Persistence](#segment-id-persistence)

<!-- /TOC -->
## Getting Started

Read through the [Analytics.js QuickStart Guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) which explains how to add Analytics.js to your site in just a few minutes. Once you've installed the library, read on for the detailed API reference!

## Identify

The `identify` method is how you associate your users and their actions to a recognizable `userId` and `traits`. You can see [an `identify` example in the Quickstart guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-identify-users) or [find details on the identify method payload](/docs/connections/spec/identify/).

> note ""
> We recommend against using `identify` for anonymous visitors to your site. Analytics.js automatically retrieves an `anonymousId` from localStorage or assigns one for new visitors. It is attached to all `page` and `track` events both before and after an `identify`.

`identify` method definition:

```js
analytics.identify([userId], [traits], [options], [callback]);
```

The `identify` call has the following fields:

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
    <td>A dictionary of traits you know about the user, like their `email` or `name`. You can read more about traits in the [identify reference](/docs/connections/spec/identify).</td>
  </tr>
  <tr>
    <td>`options`</td>
    <td>optional</td>
    <td>Object</td>
    <td>A dictionary of options. For example, [enable or disable specific destinations](#selecting-destinations-with-the-integrations-object) for the call. _Note: If you do not pass a *traits* object, pass an empty object (ie, '{}') before *options*_</td>
  </tr>
  <tr>
    <td>`callback`</td>
    <td>optional</td>
    <td>Function</td>
    <td>A function executed after a short timeout, giving the browser time to make outbound requests first.</td>
  </tr>
</table>


By default, traits are cached in the browser's local storage and attached to each subsequent `identify` call. For example, you might do that when someone signs up for a newsletter but hasn't yet created an account on your site:

Example `identify` with hard-coded information:
```js
analytics.identify({
  nickname: 'Amazing Grace',
  favoriteCompiler: 'A-0',
  industry: 'Computer Science'
});
```

and when the user completes sign up:

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

## Track

The Track method lets you record any actions your users perform. You can [see a track example in the Quickstart guide](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-3-track-actions) or find details on [the track method payload](/docs/connections/spec/track/).

Track method definition:

```js
analytics.track(event, [properties], [options], [callback]);
```

The `track` call has the following fields:

<table>
  <tr>
    <td>`event`</td>
    <td></td>
    <td>String</td>
    <td>The name of the event you're tracking. You can read more about the [track method](/docs/connections/spec/track) and what event names we recommend.</td>
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
    <td>A dictionary of options. For example, [enable or disable specific destinations](#selecting-destinations-with-the-integrations-object) for the call. _Note: If you do not pass a *properties* object, pass an empty object (ie, '{}') before *options*_</td>
  </tr>
  <tr>
    <td>`callback`</td>
    <td>optional</td>
    <td>Function</td>
    <td>A function that is executed after a short timeout, giving the browser time to make outbound requests first.</td>
  </tr>
</table>

The only required argument to track in Analytics.js is an event name string. You can read more about [how we recommend naming your events](/docs/connections/spec/track#event).

Example Track call:

```js
analytics.track('Article Completed', {
  title: 'How to Create a Tracking Plan',
  course: 'Intro to Analytics',
});
```

For more information about choosing which events to track, event naming and more, check out [Analytics Academy](https://segment.com/academy/)

The only required argument to `track` in Analytics.js is an `event` name string. Read more about how we recommend [naming your events](/docs/connections/spec/track#event).


## Page

The [`page`](/docs/connections/spec/page/) method lets you record page views on your website, along with optional extra information about the page being viewed.

Because some destinations require a `page` call to instantiate their libraries, **you must call `page`** at least once per page load!  You may call it more than once if needed, (eg, on virtual page changes in a single page app).

A `page` call is included by default as the final line in the Analytics.js [snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-1-copy-the-snippet). You may modify this `page` call within the guidelines below.

`page` method definition:

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
    <td>A dictionary of properties of the page. Note: `url`, `title`, `referrer` and `path` are collected automatically! Additionally this defaults to a `canonical url`, if available, and falls back to `document.location.href`.</td>
  </tr>
  <tr>
    <td>`options`</td>
    <td>optional</td>
    <td>Object</td>
    <td>A dictionary of options. For example, [enable or disable specific destinations](#selecting-destinations-with-the-integrations-object) for the call. _Note: If you do not pass a `properties` object, pass an empty object (ie, '{}') before `options`_ </td>
  </tr>
  <tr>
    <td>`callback`</td>
    <td>optional</td>
    <td>Function</td>
    <td>A function that is executed after a short timeout, giving the browser time to make outbound requests first.</td>
  </tr>
</table>


### Default Page Properties

A few properties are automatically added to each `page` call.

```js
analytics.page('Pricing');
```

We translate that to the following without any extra work from you:

```js
analytics.page('Pricing', {
  title: 'Segment Pricing',
  url: 'https://segment.com/pricing',
  path: '/pricing',
  referrer: 'https://segment.com/warehouses'
});
```

You can override these values. For example:

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

## Group

The `group` method associates an [identified user](/docs/connections/sources/catalog/libraries/website/javascript/#identify) with a company, organization, project, workspace, team, tribe, platoon, assemblage, cluster, troop, gang, party, society or any other collective noun you come up with for the same concept.

This is useful for <!-- Business-to-Business (B2B) -->tools like [Intercom](/docs/connections/destinations/catalog/intercom/), [Preact](/docs/connections/destinations/catalog/preact/) and [Totango](/docs/connections/destinations/catalog/totango/), as it ties the user to a **group** of other users.


Group method definition:

```js
analytics.group(groupId, [traits], [options], [callback]);
```
The `group` call has the following fields:

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
    <td>A dictionary of options. For example, [enable or disable specific destinations](#selecting-destinations-with-the-integrations-object) for the call. _Note: If you do not pass a `properties` object, pass an empty object (ie, '{}') before `options`_</td>
  </tr>
  <tr>
    <td>`callback`</td>
    <td>optional</td>
    <td>Function</td>
    <td>A function that is executed after a short timeout, giving the browser time to make outbound requests first.</td>
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

By default, group `traits` are cached in the browser's local storage and attached to each subsequent `group` call, similar to `identify` method behavior.

Find more details about `group` including the **`group` payload** in our [Spec](/docs/connections/spec/group/).

## Alias

The `alias` method combines two previously unassociated user identities. Aliasing is generally handled automatically when you `identify` a user. However, some tools require an explicit `alias` call.

This is an advanced method, but it is required to manage user identities successfully in *some* of our destinations. Most notably, you need to make alias calls to properly implement [KISSmetrics](/docs/connections/destinations/catalog/kissmetrics/#alias) and [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias). <!-- Dests question: is this still true? -->

`alias` method definition:

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
    <td>A dictionary of options. For example, [enable or disable specific destinations](#selecting-destinations-with-the-integrations-object) for the call.</td>
  </tr>
  <tr>
    <td>`callback`</td>
    <td>optional</td>
    <td>Fucntion</td>
    <td>A function that is executed after a short timeout, giving the browser time to make outbound requests first.</td>
  </tr>
</table>

For more details about `alias`, including the **`alias` call payload**, check out our [Spec](/docs/connections/spec/alias/).

## Ready

The `ready` method allows you to pass in a callback that is called once all enabled destinations load, and once Analytics.js finishes initializing. It's like jQuery's `ready` method, except for destinations.

`ready` is still invoked if a destination throws an error during initialization, such as due to an expired API key or incorrect settings configuration. Doing so prevents blocking code listening for the `ready` callback.

Code inside the `ready` function only executes after `ready` has been emitted.

If you would like to access end-tool library methods that do not match any Analytics.js methods, like adding an extra setting to Mixpanel, you can use a ready callback so that you're guaranteed to have access to the Mixpanel object, like so:


```js
analytics.ready(function() {
  window.mixpanel.set_config({ verbose: true });
});
```

`ready` method definition:

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


## Selecting destinations with the Integrations object

An `integrations` object may be passed in the `options` of `alias`, `group`, `identify`, `page` and `track` methods, allowing selective destination filtering. By default all destinations are enabled.

An example showing how to send a single message only to Intercom and Google Analytics:

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

Conversely, an example how to send a single message to all integrations **except** Intercom and Google Analytics:

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

It is not necessary to include `'All': true` in this call, as that is the default behavior. Instead, only specify which destinations should be excluded with a `false` flag for each.

Destination flags are **case sensitive** and match [the destination's name in the docs](/docs/connections/destinations/) (i.e. "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

**NOTE:** Available at the business plan level, filtering `track` calls can be done right from the Segment UI on your source schema page. We recommend using the UI if possible since it's a much simpler way of managing your filters and can be updated with no code changes on your side.

## Load Options

The `.load` method in Analytics.js (the second line of the snippet) can also be modified to take a second argument. If you pass an object with an `integrations` dictionary (matching the format [above](#selecting-destinations-with-the-integrations-object)), then we only load the integrations in that dictionary that are marked as enabled with the boolean value `true`.

**IMPORTANT:** In order to use this feature, make sure that you have a snippet version 4.1.0 or higher. You can get the latest version of the snippet [here](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-1-copy-the-snippet)

An example:

```js
analytics.load('writekey', { integrations: { All: false, 'Google Analytics': true, 'Segment.io': true } })
```

This way, you can conditionally load integrations based on what customers opt into on your site.

A pseudocode example:

```js
onConsentDialogClosed(function(consentedTools){
  analytics.load('writekey', { integrations: consentedTools })
})
```

## User & Group Information

Once Analytics.js loads, executing the `user` or `group` method functions returns information about the currently identified user or group.

**Note:** To ensure these methods are available, wrap any reference to `user()` or `group()` in a [ready function block](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript#ready).

Examples:

```js
analytics.ready(function() {

  var user = analytics.user();
  var id = user.id();
  var traits = user.traits();

});
```

```js
analytics.ready(function() {

  var group = analytics.group();
  var id = group.id();
  var traits = group.traits();

});
```


### Clearing Traits

Passing an empty object to the `traits` object clears all cached traits for a User or Group.
Remember, `traits` are cached by default by `identify` and `group` methods. You can clear the `traits` object for the user or group by passing `traits` an empty object:

```js
analytics.user().traits({});
```
```js
analytics.group().traits({});
```


### Reset or Logout

Calling `reset` resets the `id`, including anonymousId, and clear `traits` for the currently identified user and group.

```js
analytics.reset();
```

The `reset` method only clears the cookies and `localStorage` created by Segment. It does not clear data from other integrated tools, as their native libraries might set their own cookies to manage user tracking, sessions, and manage state. To completely clear out the user session, see the documentation provided by those tools.

Segment does not share `localStorage` across subdomains. If you use Segment tracking on multiple subdomains, you must call `analytics.reset()` for each subdomain to completely clear out the user session.


## Cross-Subdomain Analytics

Analytics.js tracks across subdomains out of the box; all of our destinations fully support this feature.


## Anonymous ID

Analytics.js generates a UUID and sets this as `anonymousId` for all new visitors to your site.

Example:
```js
ajs_anonymous_id=%2239ee7ea5-b6d8-4174-b612-04e1ef3fa952
```


### Retrieving the Anonymous ID

Retrieve the of the current user `anonymousId`:

```js
analytics.user().anonymousId();
```

**NOTE:** If an `anonymousId` is `null`, calling the above function automatically sets the new `anonymousId`.


### Setting the Anonymous ID

Override the assigned `anonymousId` for the current user:

```js
analytics.user().anonymousId('ABC-123-XYZ');
```

Or in the `options` object of [`identify`](/docs/connections/spec/identify), [`page`](/docs/connections/spec/page), or [`track`](/docs/connections/spec/track) calls, like this:

```js
analytics.identify('user_123', {
  name: 'Jane Kim'
}, {
  anonymousId: 'ABC-123-XYZ'
});
```
```js
analytics.page({}, { anonymousId: 'ABC-123-XYZ' });
```
```js
analytics.track('Email Clicked', {
  callToAction: 'Signup'
}, {
  anonymousId: 'ABC-123-XYZ'
});
```

You can also set the `anonymousId` immediately inside your Segment snippet, even before the `ready` method has returned:

 ```js
  analytics.load('writekey');
  analytics.page();
  analytics.setAnonymousId('ABC-123-XYZ');
```

Keep in mind that setting the `anonymousId` in Analytics.js does not overwrite the anonymous tracking IDs for any destinations you're using.


### Refreshing the Anonymous ID

A user's `anonymousId` refreshes on any of the following conditions:

* A user clears their cookies _and_ `localstorage`
* [`analytics.reset()`](/docs/connections/sources/catalog/libraries/website/javascript/#reset-or-logout) is called during in the user's browser session
* `analytics.identify()` is called with a userId that differs from the current userId


## Debug

Calling the `debug` method turns on debug mode, logging helpful messages to the console. You'll have to refresh the page after invoking `debug` to see the messages.

Enable:
```js
analytics.debug();
```

Disable:
```js
analytics.debug(false);
```


## Emitter

The global `analytics` object emits events whenever you call `alias`, `group`, `identify`, `track` or `page`.
Using the `on` method You can set listeners for these events and run your own custom code. Useful for sending data to a service for which Segment does not have a destination.

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

Note that this emits events before they are processed by the Segment integration, and may not include some of the normalization we do on the client before uploading the data to Segment's servers.

> note ""
> **Note:** Page event properties are stored in the `options` object.

### Track Link

`trackLink` is a helper method that attaches the `track` call as a handler to a link.
With `trackLink` a small timeout (300 ms) is inserted to give the `track` call more time. This is useful when a page would redirect before the `track` method could complete all requests.

`trackLink` method definition:

```js
analytics.trackLink(element, event, [properties])
```

<table>
  <tr>
    <td>`element(s)` </td>
    <td>Element or Array</td>
    <td>DOM element to be bound with `track` method. You may pass an array of elements or jQuery objects. _Note: This must be an element, **not** a CSS selector._</td>
  </tr>
  <tr>
    <td>`event` </td>
    <td>String or Function</td>
    <td>The name of the event, passed to the `track` method. Or a **function** that returns a string to be used as the name of the `track` event.</td>
  </tr>
  <tr>
    <td>`properties` optional</td>
    <td>Object or Function</td>
    <td>A dictionary of properties to pass with the track method. Or a **function** that returns an object to be used as the `properties` of the event.</td>
  </tr>
</table>

Example:

```js
var link = document.getElementById('free-trial-link');

analytics.trackLink(link, 'Clicked Free-Trial Link', {
  plan: 'Enterprise'
});
```


### Track Form

`trackForm` is a helper method that binds a `track` call to a form submission.
With `trackForm` a small timeout (300 ms) is inserted to give the `track` call more time. Useful when a page would redirect before the `track` method can complete all requests.

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
    <td>The name of the event, passed to the `track` method. Or a **function** that returns a string to be used as the name of the `track` event.</td>
  </tr>
  <tr>
    <td>`properties` optional</td>
    <td>Object or Function</td>
    <td>A dictionary of properties to pass with the track method. Or a **function** that returns an object to be used as the `properties` of the event.</td>
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

## Extending Timeout

The `timeout` method sets the length (in milliseconds) of the callbacks and helper functions:

```js
analytics.timeout(500);
```

Set the timeout to 500ms. This is helpful if you have multiple scripts that need to fire in your callback or `trackLink`, `trackForm` helper function. We recommend extending to 500ms if you're triggering ad network conversion pixels since those are often a bit slower to load.


## Performance

The Analytics.js library and all of the destination libraries are loaded with the [HTML script `async` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async). This also means that Segment methods are fired asynchronously, so you should adjust your code accordingly if you require that events be sent from the browser in a particular order.

While many tools require access to the DOM or cookies, for our Zendesk, Salesforce, and MailChimp destinations, we do not load a native Javascript library! Instead data is sent from Segment's servers to the end-tools. We aim to expand on this front in the future.

Only the libraries required for your **enabled** destinations are loaded. Whenever a destination is disabled, the custom version of Analytics.js stops requesting that library.

Using Analytics.js does not offer a _huge_ performance benefit, but it is more performant than installing each of the destinations individually. And as more destinations move server-side, you'll receive more performance benefits automatically.

One option, if you don't want to use any bundled 3rd-party tools, is to use our browserify'd [analytics-node](https://github.com/segmentio/analytics-node) package.

### Bundle size

Segment's javascript snippet ([Analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/)) has minimal impact on the size of the pages, and only increases the page size by about 1.1KB.

However, the snippet then asynchronously requests and loads a customized javascript bundle (`analytics.min.js`), which contains the code and settings needed to load your device-mode destinations. Because of this, the file size can vary depending on how many and which destinations you enable. Without any destinations, the `analytics.min.js` file is about 62KB. Each time you enable a destination, it can slightly increase the size of this file.

## Retries

When enabled, Analytics.js automatically retries network and server errors. With persistent retries, Analytics.js can:

* Support offline tracking. Analytics.js queues your events and delivers them when the user comes back online.
* Better handle network issues. If there happens to be a time where your application can't connect to Segment's API, we'll continue to store the events on the browser to ensure you don't lose any data.

Analytics.js stores events in localStorage (falling back to in-memory storage when localStorage is unavailable), and retries up to 10 times with an incrementally increasing backoff between each retry. Analytics.js queues up to 100 events at a time to avoid using too much of the device's local storage. You can see more details about the retry logic [here](/docs/connections/destinations/#retries).

## Anonymizing IP

We collect IP address for client-side (iOS, Android, Analytics.js and Xamarin) events automatically.

Passing a value for `options.context.ip` prevents our server from recording the IP address associated with the request.

Example:

```js
  analytics.track("Order Completed", {}, { context: { ip: "0.0.0.0" }});
```


## Proxy

To use a proxy server with Analytics.js, you'll first want to update the address in the snippet to use your own host instead of `cdn.segment.com`. Secondly, you'll need to write in to our support to change the endpoint we send events to from `api.segment.io` to your proxy instead. Make sure that your proxy behaves exactly like our real APIs. You can use our [proxy server](https://github.com/segmentio/segment-proxy) as an example of a correctly working proxy.

## Plugins

Segment offers 'plugins' across multiple video players that can quickly get you started collecting video events using Analytics.js. Check out the specific links below for more information:

- [Youtube](/docs/connections/sources/catalog/libraries/website/plugins/youtube)
- [Vimeo](/docs/connections/sources/catalog/libraries/website/plugins/vimeo)

## Context & Traits

Within the `options` dictionary, a sub-dictionary, `context`, exists. The context dictionary captures various data automatically depending on the event type and what your source type is. You can read more about the context dictionary [here](https://segment.com/docs/connections/spec/common/#context). Within context is an optional `traits` dictionary that contains traits about the current user. This is useful for associating information about a user from previous identify calls to a track or page event.

Consider this identify event:

```js
analytics.identify('12091906-01011992', {
    plan_id: 'Paid, Tier 2'
    email: 'grace@usnavy.gov'
});
```

The traits on this event are `plan_id`. If you want these traits to appear on a subsequent track or page event that this user triggers, you can get this association by passing those traits into `context.traits` as follows:

```js
analytics.track('Clicked Email', {
  	emailCampaign: 'First Touch'
  },
  {
    traits: {
      plan_id: 'Paid, Tier 2'
    }
  }
);
```

This would append the `plan_id` trait to this track, but not name or email since they do not exist in context. This must be done for every susbequent event you want these traits to appear on.

**Note:** information in `context.traits` does _not_ appear in your downstream tools (eg, Salesforce, Mixpanel, Google Analytics, etc.); however, this data does appear in your warehouses and raw data tools (eg, RedShift, Postgres, Amazon S3, Tray.io, etc).

## Segment ID Persistence
In order to ensure high fidelity, first-party customer data, we persist the Segment ID to local storage and use it as the Segment ID on the cookie whenever possible. Local Storage is meant for storing this type of first-party customer information.

If a user comes back to your site after a cookie has expired, Analytics.js checks localStorage to see if an ID exists, and resets it as the user's ID in the cookie. If a user clears their cookies and localstorage, all of the IDs are removed.
