---
title: Ripe Web (Actions) Destination
hide-boilerplate: true
hide-dossier: true
id: 63913b2bf906ea939f153851
redirect_from: '/connections/destinations/catalog/ripe/'
---

[Ripe](https://www.getripe.com/){:target="_blank"} is a product-led sales platform that empowers you to unlock revenue pipeline with product data. By identifying and showing which prospects to focus efforts on, you can convert leads into meetings inside your product.

This destination enables you to send product data to Ripe. Sales teams can identify decision-makers and product champions by understanding what properties they have and what events they have triggered. The Ripe destination is built as an alternative to directly adding Ripe’s SDK script to your app or site.

The Ripe Segment integration is an [Actions-based Destination in device mode](/docs/connections/destinations/#connection-modes) that loads and configures Ripe’s SDK script for you. If you’re already using Segment’s Analytics.js for identifying and tracking your users, either directly or through Segment source integrations that you’ve installed, you can configure Segment to send this data directly to Ripe.

{% include content/ajs-upgrade.md %}

## Benefits of Ripe

Ripe provides the following benefits:

- **Be relevant**. The Ripe destination understands key events in Segment to identify relevant leads, and shows its widget selectively to them.
- **Quick integration**. Using the Ripe destination is the fastest way to start combining key product events with sales data and start targeting ripe leads.
- **More control**. You can customize the conditions under which the events are sent to Ripe.

## Getting started

> info ""
> Before you begin, create an API key in Ripe that you'll use to configure the integration.


1. From the Segment web app, navigate to **Connections > Catalog**, then click the **Destinations** tab at the top of the catalog.
2. Search for *Ripe Device Mode (Actions)* in the left navigation, and click it.
3. Click **Configure Ripe Device Mode (Actions)**.
4. Select an existing Source to connect to Ripe (Actions).
5. Enter your Ripe API key in the API key field.

{% include components/actions-fields.html %}

{% comment %}
## Ripe SDK

### Identify

When you have a unique identifier for a user, preferably an identifier from your database, call this method. For example, when a user logs in or updates their email. If you don't provide a `user_id` is not provided an automatically generated `anonymous_id` will be used.

If you aren't familiar with the Segment Spec, take a look at
the [Identify method documentation](/docs/connections/spec/identify/) to learn
about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Ripe as an `identify` event.

### Track

Use `track` calls to track what actions your user perform along with properties
related to the `track` call.

If you aren't familiar with the Segment Spec, take a look at
the [Track method documentation](/docs/connections/spec/track/) to learn about
what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Ripe as a `track` event.

---> Add comment on fast track property here?

### Group

If you aren't familiar with the Segment Spec, take a look at
the [Group method documentation](/docs/connections/spec/group/) to learn about
what it does. An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

Group calls from Segment update `Companies` in Ripe. Each `Company` is
associated with a distinct `group_id`.

### Page

Use page calls to track what pages your users sees. This is typically called on
each page load in a traditional web page and on route changes in
SPA-applications.

If you aren't familiar with the Segment Spec, take a look at
the [Page method documentation](/docs/connections/spec/page/) to learn about
what it does. An example call would look like:

```js
analytics.page('Home')
```

Segment sends Page calls to Ripe as a `pageview` event.

### Segment session

Ripe will use the `userId`, `anonymous` and `groupId` set in Segment and the Ripe SDK keeps track of the current ids.

{% endcomment %}
