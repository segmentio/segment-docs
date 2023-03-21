---
title: Ripe Cloud Mode Destination
hide-boilerplate: true
hide-dossier: true
private: true
id: 63cade592992cf7052ce2e3e
---

[Ripe](https://www.getripe.com/){:target="_new"} is a sales conversion tool that enables B2B revenue teams to surface and meet their best leads at the best possible time - when they are using your product.

The Ripe Segment integration is an [Actions-based Destination in cloud mode](https://segment.com/docs/connections/destinations/#connection-modes) that lets you send your backend events directly to Ripe.

Ripe maintains this destination. For any issues with the destination, [contact the Ripe team](mailto:support@getripe.com).

> success ""
> Set up a free account with Correlated by visiting their [website](https://www.getripe.com/){:target="_new"}.

## **Getting Started**

> warning ""
> **Before Getting Started**
> Ripe Cloud Mode is a way to send your back-end events to Ripe and should be used in tandem with our client-side [Ripe Destination](https://segment.com/docs/connections/destinations/catalog/actions-ripe-web/). Without the Ripe (web/client-side) destination installed on a javascript source, functionality will be severely limited and you will not be able to interact with leads through the Ripe web app.

1. From the Destinations catalog page in the Segment App, click Add Destination.
2. Search for “Ripe Cloud Mode” in the Destinations Catalog, and select the “Ripe Cloud Mode” destination.
3. Choose which Source should send data to the “Ripe” destination.
4. Go to Ripe integrations page (or onboarding page) and click on the “Segment” integration.
5. Copy the “Segment API key”.
6. Enter the “Segment API Key” in the “Ripe Cloud Mode” destination settings in Segment.


## **Supported Methods**

Ripe supports all the following methods out of the box.


## **Identify**

Take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'steve@apple.com',
  firstName: 'Steve',
  lastName: 'Jobs'
});
```

Segment sends Identify calls to Ripe as an `identify` events. Ripe displays these events as `Users` by default. `Identify` event data is augmented with traits. It’s important to include email as a trait, as Ripe will use email to populate User views by default. We fully support the [Segment's Identify Spec](https://segment.com/docs/connections/spec/identify/#traits), and we recommend using the standardized names for the reserved traits covered there.


## **Track**

Take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Clicked Book a Demo Button')
```

Segment sends Track calls to Ripe as a `track` events. Track events should be flattened whenever possible. For example, rather than “Button Click” as a track event with “Clicked Book a Demo Button” as a property, use “Onboarding Form Submit Button Click”. Product Events can be filtered and grouped by `userId` or `groupId`, you should always include a `userId` when firing events from your backend so the event can be tied to the user who triggered it did it.

**Page**

Take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:


Segment sends Page calls to Ripe as a page event. Ripe displays these events as Page views by default.


## **Group**

Take a look at the [Group method documentation](https://segment.com/docs/connections/spec/group/) to learn about what it does. An example call would look like:

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

Segment sends Group calls to Ripe as a `group` event. Group events can be augmented with group traits. Ripe displays these events as Workspaces by default. Including a name and a website (domain) as a trait is reccomended, as Ripe will use the traits to populate Workspace views by default.


## **Alias**

We also support the Alias call, but don’t recommend setting this up unless you’re already use it. You can read more on when and how to use it in the [Alias method documentation](https://segment.com/docs/connections/spec/alias/).


## **Available Actions**

With Ripe you can also customize and build your own mappings enabled by Segment's Actions.

{% include components/actions-fields.html %}

