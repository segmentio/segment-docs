---
title: Kissmetrics Destination
rewrite: true
id: 54521fd725e721e32a72eec7
---
[Kissmetrics](https://www.kissmetricshq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a behavioral email and analytics platform. It pulls cross-platform behavior reports so marketers can analyze key audience growth segments. It also provides an overview of custom populations, population change and growth, so marketers can analyze populations from customers who have completed actions or events.

## Getting Started

{% include content/connection-modes.md %}

To enable Kissmetrics in Segment:

1. From the Segment web app, click **Catalog**.
2. Search for "Kissmetrics" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Kissmetrics "API Key".
4. If you are using Kissmetrics using Segment's client-side analytics.js library, Segment asynchronously loads Kissmetrics JavaScript library onto the page. (This means you should remove Kissmetrics's snippet from your page.)

Your Kissmetrics source starts automatically collecting "Visited Site" events and [other automatically tracked events](https://support.kissmetrics.io/docs/javascript-settings).

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```javascript
analytics.page('Docs');
```

By default page calls with `name` and `category` properties will automatically be sent to Kissmetrics in your [`page`](/docs/connections/spec/page/) calls. You can adjust this behavior in your Kissmetrics destination settings by toggling on and off the 'Track Categorized Pages' and 'Track Named Pages' settings.

Here's an example call on docs pages:

```javascript
analytics.page('Docs', { url: 'http:example.com/docs', referrer: 'http://google.com' })
```

This [`page`](/docs/connections/spec/page/) call is translated into an event labeled: **Viewed Docs Page** and will have the properties:

```
'Page - url': 'http:example.com/docs'
'Page - referrer': 'http://google.com'
```

__Note:__ Kissmetrics requires an initial pageview to load the library. By default we include a call to [`page`](/docs/connections/spec/page/) in your snippet. This call must be made at least once on any page where you expect Kissmetrics to be loaded.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123');
```

When you call [`identify`](/docs/connections/spec/identify/), we first call Kissmetrics' `identify` method to store the `userId`. Then we call `set` to store the `traits`.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track('Clicked Button');
```

When you call [`track`](/docs/connections/spec/track/) or one of its helper functions ([`trackLink`](/docs/connections/sources/catalog/libraries/website/javascript/#track-link,[`trackForm`](/docs/connections/sources/catalog/libraries/website/javascript/#track-form), we will call Kissmetrics' `record` with the exact same parameters.

The Kissmetrics javascript library automatically tracks a bunch of events (Visited Site, Ad Campaign Hit, Search Engine Hit, Form Submit, Pageview, etc.) These will all still work when you use Kissmetrics through Segment.

**Note:** If you send us an event with a property called "revenue" and we'll pass that on to Kissmetrics as `Billing amount`.

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```javascript
analytics.group('123');
```

When you call [`group`](/docs/connections/spec/group/), we first call Kissmetrics' `identify` method to store the `userId`. Then we call `set` to store the company `traits` on the user. We prefix these traits with 'Group -'. For example,

```javascript
analytics.group('123', {
  name: 'Test Inc',
  employees: 250
})
```

will add the following traits to the user:

```javascript
'Group - id': '123',
'Group - Name': 'Test Inc'
'Group - Employees': 250
```

## Alias

If you're not familiar with the Segment Specs, take a look to understand what the [Alias method](/docs/connections/spec/alias/) does. An example call would look like:

```javascript
analytics.alias();
```

Kissmetrics automatically aliases anonymous visitors the first time you call [`identify`](/docs/connections/spec/identify/) from the browser. That means there's no need to explicitly call [`alias`](/docs/connections/spec/alias/) if you're tracking anonymous visitors and identified users in client-side javascript.

### Aliasing on iOS

We will automatically call [`alias`](/docs/connections/spec/alias/) for you the first time you [`identify`](/docs/connections/spec/identify/) users from our iOS SDK. That way it works exactly like web browser tracking - you don't have to manually [`alias`](/docs/connections/spec/alias/) new users.

You can read more about how Kissmetrics recommends using [`alias`](/docs/connections/spec/alias/) [in their docs](https://support.kissmetrics.io/docs/understanding-identities).



## Best Practices
### Merging Identities

A common use of [`alias`](/docs/connections/spec/alias/) for Kissmetrics is when an already identified user's unique `id` changes. In this case you need to merge the old identity with a new one.

For example, if you're identifying people by their email address and they change it. In that case you'll need to alias from the previous `id` (their old email address) to the new `userId` (their new email address). Here's an example in `node`:

```javascript
analytics.alias({
  previousId: 'old_email@aol.com',
  userId: 'new_email@example.com'
});
```

### Aliasing New Users Server-Side

In order to [`identify`](/docs/connections/spec/identify/) **new users** server side and connect that user profile to an existing anonymous visitor profile there's some work to be done.

**Remember:** Kissmetrics aliases automatically the first time you call [`identify`](/docs/connections/spec/identify/) in client-side JavaScript, so in most cases you don't have to call [`alias`](/docs/connections/spec/alias/) at all.

We don't recommend handling [`alias`](/docs/connections/spec/alias/) server side, but if you must, here's how to make it happen. There are two options: aliasing **in conjunction with client-side tracking** or aliasing when **tracking exclusively server side**.

### In Conjunction with Client-Side Tracking

If you're already tracking anonymous users on the client side you'll need to pass the Kissmetrics identity from the browser to your servers in order to [`alias`](/docs/connections/spec/alias/) it to the new `userId`.

First, use [`analytics.ready`](/docs/connections/sources/catalog/libraries/website/javascript#ready) to grab the Kissmetrics identity:

```javascript
analytics.ready(function(){
  var anonIdentity = KM.i();
});
```

Next, pass the `anonIdentity` to your server and [`alias`](/docs/connections/spec/alias/), [`identify`](/docs/connections/spec/identify/), [`track`](/docs/connections/spec/track/) your new user.

Here's a `node` example where the new `userId` is `12345`:

```javascript
analytics.alias({ previousId: anonIdentity, userId: '12345' });
analytics.identify('12345');
analytics.track('Connected Facebook');
```

### Tracking Exclusively Server-Side

If you're only tracking anonymous users with one of our server-side sources that makes things easier. All you have to do is [`alias`](/docs/connections/spec/alias/) the anonymous `id` to the new `userId`.

Here's a Python example of the [`alias`](/docs/connections/spec/alias/), [`identify`](/docs/connections/spec/identify/), [`track`](/docs/connections/spec/track/) sequence where the server-side anonymous `id` was `92fh49fqh9849hf` and the new `userId` is `12345`:

```python
analytics.alias('92fh49fqh9849hf', '12345')
analytics.identify('12345')
analytics.track('Registered')
```

## Appendix

###  User Properties

You can set Kissmetrics user properties in 2 ways with Segment:

1. Make an [`identify`](/docs/connections/spec/identify/) call and include a `traits` object.
2. Make a [`track`](/docs/connections/spec/track/) call and include a `properties` object.

### Nested Objects or Arrays

Keep in mind that if you send arrays, we will stringify them. Also if you pass a nested object as `traits` or `properties` inside the `identify` or `track` call, we will flatten them.

For example:

```
analytics.track('Signed Up', {
  foo: {
    bar: {
      prop: [1, 2, 3]
    }
  }
});
```
The properties would be sent as `foo.bar.prop: '1,2,3'`.

Note that this is without the prefix setting enabled. If you had enabled that feature, it would be `Signed Up - foo.bar.prop: '1,2,3'`.

### Receive experiment data from A/B Testing tools

You can track A/B testing event data like [`Experiment Viewed`](/docs/connections/spec/ab-testing/#experiment-viewed) and send it to Kissmetrics using Segment.

In order to enable this feature,
1. Find your A/B testing tool in your Segment dashboard
2. Select "Send experiment data to other tools (as an identify call) in Overview
3. Save and Close
4. You should see these events in the debugger

### E-Commerce

If you are using our ecommerce api, we will forward that data along to Kissmetrics following the [Kissmetrics Ecommerce Essentials Guide](https://support.kissmetrics.io/docs/e-commerce-javascript-code-examples).
