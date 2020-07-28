---
title: Managing identity in Analytics.js
---

This page explains how Analytics.js identifies users, and passes userID and anonymousID data, and how to override and change this information.

## Segment ID Persistence

To ensure high fidelity, first-party customer data, Segment writes the user's IDs to the user's local storage, and uses that as the Segment ID on the cookie whenever possible. Local Storage is meant for storing this type of first-party customer information.

If a user returns to your site after the cookie expires, Analytics.js looks for an old ID in the user's `localStorage`, and if one is found, sets it as the user's ID again in the new cookie. If a user clears their cookies _and_ `localstorage`, all of the IDs are removed, and the user gets a completely new anonymousId when they next visit the page.

<!-- TODO: add info on how user and group info is stored - on cookie, in mem, in localStorage-->

<!-- TODO: also info on
- what is the userId
- what's it mean
- where's it set
- methods for working w/
- retrieving the userID  -->


## Anonymous IDs

Analytics.js generates a unique user ID (UUID) and sets this as `anonymousId` for all new visitors to your site.

<!-- TODO: explain when this happens - during lib init and before any device-mode dests load -  link to UUID format, you can override-->

Example:
```js
ajs_anonymous_id=%2239ee7ea5-b6d8-4174-b612-04e1ef3fa952
```

You can override the default-generated anonymousID in code, by setting is in the `options` object of a call, or by setting it in Analytics.js before you make a call. <!-- TODO: link to stuff below -->



### Refreshing the Anonymous ID

A user's `anonymousId` refreshes (changes) on any of the following conditions:

- The user clears their cookies _and_ `localstorage`
- Your site or app calls [`analytics.reset()`](/docs/connections/sources/catalog/libraries/website/javascript/#reset-or-logout) during in the user's browser session
- Your site or app calls `analytics.identify()` with a userId that differs from the current userId

### Retrieve the Anonymous ID

You can retrieve the user's current `anonymousId` with the following call:

```js
analytics.user().anonymousId();
```
If the user's `anonymousId` is `null` (meaning not set), Analytics.js automatically sets a new `anonymousId` when you call this function.


### Override the Anonymous ID from the Segment snippet

You can also set the `anonymousId` immediately inside your Segment snippet, even before the `ready` method returns:
<!-- TODO: explain when you would do this, when not to do this. What this buys you.-->

 ```js
  analytics.load('writekey');
  analytics.page();
  analytics.setAnonymousId('ABC-123-XYZ');
```

Keep in mind that setting the `anonymousId` in Analytics.js does not overwrite the anonymous tracking IDs for any destinations you're using.
<!-- TODO: device-mode dests can set an anonid - this is not the same. read the docs for each dest to find-->


### Override the default Anonymous ID with a call

Override the assigned `anonymousId` for the current user:
```js
analytics.user().anonymousId('ABC-123-XYZ');
```
<!-- TODO: explain when you would do this, when not to do this. What this buys you.
do this when - the standard UUID is not what you want, -->


### Override the Anonymous ID using the options object

<!-- LR TODO - tag P on the docs to make sure the payloads are correctly formed to show the options object -->
Or in the `options` object of [`identify`](/docs/connections/spec/identify/), [`page`](/docs/connections/spec/page/), or [`track`](/docs/connections/spec/track/) calls, like this:

<!-- TODO: add some padding between these because it's not clear how they follow. possible codetabs?-->

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
<!-- TODO: P - does this persist in this method?-->

## Saving traits to the context object

Traits are individual pieces of information that you know about a user or a group, and which can change over time.

The `options` dictionary contains a sub-dictionary called `context` which automatically captures data depending on the event- and source-type. See the [Context documentation](https://segment.com/docs/connections/spec/common/#context) to learn more.

The `context` object contains an optional `traits` dictionary that contains traits about the current user. You can use this to store information about a user that you got from previous Identify calls, and that you want to add to Track or Page events.

The information you pass in `context.traits` _does not_ appear in your downstream tools (such as Salesforce, Mixpanel, Google Analytics, etc.); however, this data _does_ appear in your [warehouses and storage destinations](/docs/connections/storage/).

<!-- different from the options, probably different behavior, probably don't persist TODO:P check this pls :) -->

Consider this Identify event:

```js
analytics.identify('12091906-01011992', {
    plan_id: 'Paid, Tier 2',
    email: 'grace@usnavy.gov'
});
```

The "trait" on this event is `plan_id`. You can pass these traits into `context.traits`, so you can use them in Track or Page events that the user triggers later.

The example below shows how you could pass the `plan_id` as a trait so you can use it later.

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

This appends the `plan_id` trait to this Track event. <!-- TODO: P - check this behavior? Does it persist? Also please add the context object brackets)  This does _not_ add the name or email, since those traits are not in the `context` object. You must do this for every susbequent event you want these traits to appear on.-->



## Clearing Traits

You can pass an empty object to the `traits` object to clear _all_ cached traits for a User or Group.

Traits are cached by default when you call the Identify and Group methods. You can clear the `traits` object for the user or group by passing `traits` an empty object:

```js
analytics.user().traits({});
```
```js
analytics.group().traits({});
```



## User and Group Information

You can use the `user` or `group` method to return information about the currently identified user or group, as soon as the Analytics.js library loads.

<!-- TODO: retrieves info from cookie, if they have any info - maybe link to the top section-->


> success ""
> **Tip:** You can wrap any reference to `user()` or `group()` in a [ready function block](/docs/connections/sources/catalog/libraries/website/javascript#ready) to ensure that Analytics.js has fully loaded so these methods are available.

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


## Anonymizing IP

Segment automatically collects the user's IP address for device-based (iOS, Android, Analytics.js and Xamarin) events.

You can pass a value for `options.context.ip` to prevent the Segment systems from recording the IP address for the request.
<!-- TODO have to send with every track call to anonymize & explicitly override. if you reset, then Seg defaults to the normal common/context behavior -->

Example:

```js
  analytics.track("Order Completed", {}, { context: { ip: "0.0.0.0" }});
```
