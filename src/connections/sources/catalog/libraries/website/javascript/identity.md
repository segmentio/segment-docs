---
title: Managing identity in Analytics.js
strat: ajs
---

This page explains how Analytics.js identifies users, passes `userID` and `anonymousID` data, and how to override and change this information.

## Segment ID persistence

To ensure high fidelity, first-party customer data, Segment writes the user's IDs to the user's local storage, and uses that as the Segment ID on the cookie whenever possible. Local storage is meant for storing this type of first-party customer information.

If a user returns to your site after the cookie expires, Analytics.js looks for an old ID in the user's `localStorage`, and if one is found, sets it as the user's ID again in the new cookie. If a user clears their cookies _and_ `localstorage`, all of the IDs are removed, and the user gets a completely new `anonymousID` when they next visit the page.

<!-- TODO: add info on how user and group info is stored - on cookie, in mem, in localStorage-->

<!-- TODO: also info on
- what is the userId
- what's it mean (where's it come from)
- where's it set
- methods for working w/
- retrieving the userID  -->


## Anonymous IDs

Analytics.js generates a [universally unique ID (UUID)](https://en.wikipedia.org/wiki/Universally_unique_identifier) for the viewer during the library's initialization phase, and sets this as `anonymousId` for each new visitor to your site. This happens before Analytics.js loads any device-mode destinations, and so before these destination-libraries can generate their own user IDs.

Example:
```js
ajs_anonymous_id=%2239ee7ea5-b6d8-4174-b612-04e1ef3fa952
```

You can override the default-generated `anonymousID` in code using the methods described below:
- [Set anonymousId from the Segment snippet](#override-the-anonymous-id-from-the-segment-snippet) (before the Ready method returns)
- [Use a call to override the anonymousID](#override-the-default-anonymous-id-with-a-call)
- [Set `anonymousId` in the `options` object of a call](#override-the-anonymous-id-using-the-options-object)

### Retrieve the Anonymous ID

You can get the user's current `anonymousId` using the following call:

```js
analytics.user().anonymousId();
```

If the user's `anonymousId` is `null` (meaning not set) when you call this function, Analytics.js automatically generates and sets a new `anonymousId` for the user.

If you're using the npm library, the previous call returns a promise for `user()`. As a workaround, you'll need to grab the user's current `anonymousId` in the following way: 

```js
analytics.instance?.user().anonymousId()
```

### Refreshing the Anonymous ID

A user's `anonymousId` changes when any of the following conditions are met.

- The user clears their cookies _and_ `localstorage`.
- Your site or app calls [`analytics.reset()`](/docs/connections/sources/catalog/libraries/website/javascript/#reset-or-logout) during in the user's browser session.
- Your site or app calls `analytics.identify()` with a `userId` that is different from the current `userId`.
- Your site or app is setting `ajs_user_id` to an empty string or calling `analytics.user().id('')` before calling `analytics.identify()`. This sequence of events will result in a new `anonymousId` being set when `analytics.identify()` is called.


### Override the Anonymous ID from the Segment snippet

You can also set the `anonymousId` immediately inside your Segment snippet, even before the Ready method returns.

 ```js
  analytics.load('writekey');
  analytics.page();
  analytics.setAnonymousId('ABC-123-XYZ');
```

Use this method if you are queueing calls before Ready returns and they require a custom `anonymousId`. Keep in mind that setting the `anonymousId` in Analytics.js does not overwrite the anonymous tracking IDs for any destinations you're using.

> info ""
> Device-mode destinations that load their code on your site _might_ also set their own anonymous ID for the user that is separate and different from the Segment generated one. Some destinations use the Segment `anonymousId`. Read the documentation for each destination to find out if a destination sets its own ID.

### Override the default Anonymous ID with a call

If the default generated UUID does not meet your needs, you can override the `anonymousId` for the current user with either of the following methods:

```js
analytics.user().anonymousId('ABC-123-XYZ');
```

```js
analytics.setAnonymousId('ABC-123-XYZ')
```

These methods behave exactly the same.

### Override the Anonymous ID using the options object

You can override the `anonymousID` in the `options` object of [Identify](/docs/connections/spec/identify/), [Page](/docs/connections/spec/page/), or [Track](/docs/connections/spec/track/) calls, like this:


Set the `anonymousId` in the `options` object using the format in the following examples.

The custom `anonymousId` persists when you use these methods, even if you do not explicitly specify the `anonymousId` in the calls.

For example, after a Track call sets the `anonymousID` to `ABC-123-XYZ`, any additional Track calls from this user will have the same `anonymousId`, even if it's not explicitly specified in the Track call.

#### Override anonymousId in an Identify call

You can override `anonymousID` with an Identify call. For example:

```js
analytics.identify('user_123', {
  name: 'Jane Kim'
}, {
  anonymousId: 'ABC-123-XYZ'
});
```

#### Override anonymousId on a Page call

You can override `anonymousID` with a Page call. For example:

```js
analytics.page({}, { anonymousId: 'ABC-123-XYZ' });
```

#### Override anonymousId on a Track call

You can override `anonymousID` with a Track call. For example:

```js
analytics.track('Email Clicked', {
  callToAction: 'Signup'
}, {
  anonymousId: 'ABC-123-XYZ'
});
```


## Saving traits to the context object

Traits are individual pieces of information that you know about a user or a group, and which can change over time.

The `options` dictionary contains a sub-dictionary called `context` which automatically captures data depending on the event- and source-type. See the [Context documentation](/docs/connections/spec/common/#context) to learn more.

The `context` object contains an optional `traits` dictionary that contains traits about the current user. You can use this to store information about a user that you got from previous Identify calls, and that you want to add to Track or Page events.

The information you pass in `context.traits` _does not_ appear in your downstream tools (such as Salesforce, Mixpanel, or Google Analytics); however, this data _does_ appear in your [warehouses and storage destinations](/docs/connections/storage/).

> success ""
> The `traits` object in `options.context.traits` does not cause `anonymousId` to persist across different calls.

Consider this Identify event:

```js
analytics.identify('12091906-01011992', {
    plan_id: 'Paid, Tier 2',
    email: 'grace@example.com'
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

This appends the `plan_id` trait to the Track event. This does _not_ add the name or email, since those traits were not added to the `context` object. You must do this for every following event you want these traits to appear on, as the `traits` object does not persist between calls.

By default, non-Identify events (like Track or Page) **don't automatically collect user traits** from previous Identify calls. To include traits from an `identify()` event in later events, you'll need to add them manually to the `context.traits` object within the `options` parameter.

Each Analytics.js method has an `options` parameter where you can pass the `context.traits` object, but each method has a specific format. Follow the formats in the [Segment Spec](/docs/connections/spec/) when adding traits, like in these examples:

- [Identify](/docs/connections/spec/identify/) - The [Analytics.js Identify](/docs/connections/sources/catalog/libraries/website/javascript/#identify) method follows this format : `analytics.identify([userId], [traits], [options], [callback])`;
- [Track](/docs/connections/spec/track/) - The [Analytics.js Track](/docs/connections/sources/catalog/libraries/website/javascript/#track) method follows this format : `analytics.track(event, [properties], [options], [callback])`;
- [Page](/docs/connections/spec/page/) - The [Analytics.js Page](/docs/connections/sources/catalog/libraries/website/javascript/#page) method follows this format : `analytics.page([category], [name], [properties], [options], [callback])`;
- [Group](/docs/connections/spec/group/) - The [Analytics.js Group](/docs/connections/sources/catalog/libraries/website/javascript/#group) method follows this format : `analytics.group(groupId, [traits], [options], [callback])`;

Adding traits to events is especially useful if you're using [Actions destinations](/docs/connections/destinations/actions/), since it makes those traits available for mapping in the destination’s configuration.


## Clearing traits

You can pass an empty object to the `traits` object to clear _all_ cached traits for a user or group.

Traits are cached by default when you call the Identify and Group methods. You can clear the `traits` object for the user or group by passing `traits` an empty object:

```js
analytics.user().traits({});
```
```js
analytics.group().traits({});
```

## Using analytics.user() and analytics.group() 

You can use the User or Group method as soon as the Analytics.js library loads, to return information about the currently identified user or group. This information is retrieved from the user's cookie.

<!-- TODO: retrieves info from cookie, if they have any info - maybe link to the top section-->


> success ""
> You can wrap any reference to `user()` or `group()` in a [ready function block](/docs/connections/sources/catalog/libraries/website/javascript#ready) to ensure that Analytics.js has fully loaded so these methods are available.

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

Segment automatically collects the user's IP address for device-based (iOS, Android, Analytics.js, and Xamarin) events.

> info "IPv6"
> At the moment, Segment doesn't support automatically collecting IPv6 addresses.

You can manually set the IP by passing a value for `options.context.ip` to prevent the Segment systems from recording the IP address for the request, as in the example below.

```js
  analytics.track("Order Completed", {}, { context: { ip: "0.0.0.0" }});
```

You must add this override to _every_ Track call to explicitly override IP collection. If you reset this trait in the context object, Segment defaults to the normal IP collection behavior.

