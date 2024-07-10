---
title: Ripe Cloud Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: true
id: 63cade592992cf7052ce2e3e
---

[Ripe](https://www.getripe.com/){:target="_blank"} is a sales conversion tool that enables B2B revenue teams to surface and meet their best leads at the best possible time - when they are using your product.

The Ripe Segment integration is an [Actions Destination in cloud mode](/docs/connections/destinations/#connection-modes) that lets you send your product events data to Ripe.

Ripe maintains this destination. For any issues with the destination, [contact the Ripe team](mailto:support@getripe.com).

> success ""
> Set up a free account with Ripe by visiting their [website](https://www.getripe.com/){:target="_blank"}.

## Getting Started

> warning "Ripe Cloud Mode (Actions) destination requires events from an Analytics.js source"
> Ripe Cloud Mode is a way to send your backend events to Ripe and should be used in tandem with the client-side [Ripe Destination](/docs/connections/destinations/catalog/actions-ripe-web/). Without a Ripe Web Mode (Actions) destination receiving information from an Analytics.js source, you will not be able to interact with leads in the Ripe app.

1. From the Destinations catalog page in the Segment App, click Add Destination.
2. Search for "Ripe Cloud Mode (Actions)" in the Destinations Catalog, and select the "Ripe Cloud Mode (Actions)" destination.
3. Choose which Source should send data to the "Ripe" destination.
4. Go to Ripe integrations page (or onboarding page) and click on the "Segment" integration.
5. Copy the "Segment API key".
6. Enter the "Segment API Key" in the "Ripe Cloud Mode" destination settings in Segment.

## Supported Methods

Ripe supports all the following methods out of the box.


### Identify

Take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like this:

```js
analytics.identify('userId123', {
  email: 'steve@apple.com',
  firstName: 'Steve',
  lastName: 'Jobs'
});
```

Segment sends Identify calls to Ripe as `identify` events. Ripe displays these events as `Users` by default. `Identify` event data is augmented with traits. It's important to include email as a trait, as soon as it is known. Ripe will use email to populate User views by default. Ripe fully supports [Segment's Identify Spec](https://segment.com/docs/connections/spec/identify/#traits), and recommend using the standardized names for the reserved traits covered there.


### Track

Take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Clicked Book a Demo Button')
```

Segment sends Track calls to Ripe as `track` events. Track events should be flattened whenever possible. For example, rather than `Button Click` as a track event with `Book a Demo` as a property, use `Clicked Book a Demo Button`. Product Events can be filtered and grouped by `userId` or `groupId`. When firing track calls from a backend source you should always include the `userId` to ensure it can be attributed back to the correct user.


### Page

Take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like this:

```js
analytics.page()
```

Segment sends Page calls to Ripe as a `pageview` event. Ripe displays these events as Page views by default.


### Group

Take a look at the [Group method documentation](https://segment.com/docs/connections/spec/group/) to learn about what it does. An example call would look like this:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Apple Inc.",
  industry: "Technology",
  employees: 164000,
  plan: "enterprise",
  "total billed": 1000000,
  website: "apple.com"
});
```

Segment sends Group calls to Ripe as a `group` event. Group events can be augmented with group traits. Ripe displays these events as Workspaces by default. Including a name and a website (domain) as a trait is recommended, as Ripe will use the traits to populate Workspace views by default.

{% include components/actions-fields.html %}
