---
rewrite: true
---
[`KISSmetrics`](https://www.kissmetricshq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a behavioral email and analytics platofrm. It pulls cross-platform behavior reports so marketers can analyze key audience growth segments. It also provides an overview of custom populations, population change and growth, so marketers can analyze populations from customers who have completed actions or events.

This document was last updated on July 3, 2018. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, please let us know!

## Getting Started

<!-- {{>connection-modes}} -->

When you toggle on KISSmetrics in Segment, this is what happens:

1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for "KISSmetrics" within the Destinations Catalog and confirm the Source you’d like to connect to.
3. Drop in your KISSmetrics "API Key” into the connection settings.
4. If you are using KISSmetrics via Segment’s client-side analytics.js library, we asynchronously load KISSmetrics Javascript library onto the page. This means you should remove KISSmetrics's snippet from your page. Your KISSmetrics source will start automatically collecting "Visited Site" events and [other automatically tracked events](http://support.kissmetrics.com/article/show/javascript-settings).

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```javascript
analytics.page('Docs');
```

By default page calls with `name` and `category` properties will automatically be sent to Kissmetrics in your [`page`](/docs/spec/page/) calls. You can adjust this behavior in your Kissmetric destination settings by toggling on and off the 'Track Categorized Pages' and 'Track Named Pages' settings.

Here's an example call on docs pages:

```javascript
analytics.page('Docs', { url: 'http:example.com/docs', referrer: 'http://google.com' })
```

This [`page`](/docs/spec/page/) call is translated into an event labeled: **Viewed Docs Page** and will have the properties:

```
'Page - url': 'http:example.com/docs'
'Page - referrer': 'http://google.com'
```

__Note:__ KISSmetrics requires an initial pageview to load the library. By default we include a call to [`page`](/docs/spec/page/) in your snippet. This call must be made at least once on any page where you expect KISSmetrics to be loaded.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123');
```

When you call [`identify`](/docs/spec/identify/), we first call KISSmetrics' `identify` method to store the `userId`. Then we call `set` to store the `traits`.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```javascript
analytics.track('Clicked Button');
```

When you call [`track`](/docs/spec/track/) or one of its helper functions ([`trackLink`](/docs/sources/website/analytics.js/#track-link,[`trackForm`](/docs/sources/website/analytics.js/#track-form), we will call KISSmetrics' `record` with the exact same parameters.

The KISSmetrics javascript library automatically tracks a bunch of events (Visited Site, Ad Campaign Hit, Search Engine Hit, Form Submit, Pageview, etc.) These will all still work when you use KISSmetrics through Segment.

**Note:** If you send us an event with a property called "revenue" and we'll pass that on to KISSmetrics as `Billing amount`.

## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/spec/group/) does. An example call would look like:

```javascript
analytics.group('123');
```

When you call [`group`](/docs/spec/group/), we first call KISSmetrics' `identify` method to store the `userId`. Then we call `set` to store the company `traits` on the user. We prefix these traits with 'Group -'. For example,

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

If you haven't had a chance to review our spec, please take a look to understand what the [Alias method](https://segment.com/docs/spec/alias/) does. An example call would look like:

```javascript
analytics.alias();
```

KISSmetrics automatically aliases anonymous visitors the first time you call [`identify`](/docs/spec/identify/) from the browser. That means there's no need to explicitly call [`alias`](/docs/spec/alias/) if you're tracking anonymous visitors and identified users in client-side javascript.

### Aliasing on iOS

We will automatically call [`alias`](/docs/spec/alias/) for you the first time you [`identify`](/docs/spec/identify/) users from our iOS SDK. That way it works exactly like web browser tracking - you don't have to manually [`alias`](/docs/spec/alias/) new users.

You can read more about how KISSmetrics recommends using [`alias`](/docs/spec/alias/) [in their docs](http://support.kissmetrics.com/article/show/understanding-identities).



## Best Practices
### Merging Identities

A common use of [`alias`](/docs/spec/alias/) for KISSmetrics is when an already identified user's unique `id` changes. In this case you need to merge the old identity with a new one.

For example, if you're identifying people by their email address and they change it. In that case you'll need to alias from the previous `id` (their old email address) to the new `userId` (their new email address). Here's an example in `node`:

```javascript
analytics.alias({
  previousId: 'old_email@aol.com',
  userId: 'new_email@gmail.com'
});
```

### Aliasing New Users Server-Side

In order to [`identify`](/docs/spec/identify/) **new users** server side and connect that user profile to an existing anonymous visitor profile there's some work to be done.

**Remember:** KISSmetrics aliases automatically the first time you call [`identify`](/docs/spec/identify/) in client-side javascript, so in most cases you don't have to call [`alias`](/docs/spec/alias/) at all.

We don't recommend handling [`alias`](/docs/spec/alias/) server side, but if you must, here's how to make it happen. There are two options: aliasing **in conjunction with client-side tracking** or aliasing when **tracking exclusively server side**.

### In Conjunction with Client-Side Tracking

If you're already tracking anonymous users on the client side you'll need to pass the KISSmetrics identity from the browser to your servers in order to [`alias`](/docs/spec/alias/) it to the new `userId`.

First, use [`analytics.ready`](/docs/sources/website/analytics.js#ready) to grab the KISSmetrics identity:

```javascript
analytics.ready(function(){
  var anonIdentity = KM.i();
});
```

Next, pass the `anonIdentity` to your server and [`alias`](/docs/spec/alias/), [`identify`](/docs/spec/identify/), [`track`](/docs/spec/track/) your new user.

Here's a `node` example where the new `userId` is `12345`:

```javascript
analytics.alias({ previousId: anonIdentity, userId: '12345' });
analytics.identify('12345');
analytics.track('Connected Facebook');
```

### Tracking Exclusively Server-Side

If you're only tracking anonymous users with one of our server-side sources that makes things easier. All you have to do is [`alias`](/docs/spec/alias/) the anonymous `id` to the new `userId`.

Here's a Python example of the [`alias`](/docs/spec/alias/), [`identify`](/docs/spec/identify/), [`track`](/docs/spec/track/) sequence where the server-side anonymous `id` was `92fh49fqh9849hf` and the new `userId` is `12345`:

```python
analytics.alias('92fh49fqh9849hf', '12345')
analytics.identify('12345')
analytics.track('Registered')
```

## Appendix

###  User Properties

You can set KISSmetrics user properties in 2 ways with Segment:

1. Make an [`identify`](/docs/spec/identify/) call and include a `traits` object.
2. Make a [`track`](/docs/spec/track/) call and include a `properties` object.

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

You can track A/B testing event data like [`Experiment Viewed`](/docs/spec/ab-testing/#experiment-viewed) and send it to Kissmetrics via Segment.

In order to enable this feature,
1. Find your A/B testing tool in your Segment dashboard
2. Select "Send experiment data to other tools (as an identify call) in Overview
3. Save and Close
4. You should see these events in the debugger

### E-Commerce

If you are using our ecommerce api, we will forward that data along to KISSmetrics following the [KISSmetrics Ecommerce Essentials Guide](http://support.kissmetrics.com/article/show/ecommerce-essentials).
