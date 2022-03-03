---
title: Beamer Destination
beta: true
rewrite: true
id: 5d2d8f56f159f30001b3c3a9
---
[Beamer](https://www.getbeamer.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a changelog and notification center that lets you announce new features, product updates, special offers and more.

This destination is maintained by Beamer. For any issues with the destination, [contact the Beamer Support team](mailto:info@getbeamer.com).

> success ""
> **Good to know**: This page is about the Beamer Segment destination, which receives data from Segment. There's also a page about the [Beamer Segment source](/docs/connections/sources/catalog/cloud-apps/beamer/), which sends data _to_ Segment!

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Beamer" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Beamer settings](https://app.getbeamer.com/settings#api).

You can select any of the existing API keys in [your list](https://app.getbeamer.com/settings#api), but we recommend creating a new key to use specifically with your new Segment integration. Make sure to **enable the 'Create users' and 'Update users' permissions** for the API key you select.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify({
  "email": "john.doe@example.com",
  "name": "John Doe",
  "position": "Sales associate"
})
```

`identify` calls will create a user in Beamer with the data available in each event, including basic attributes (such as ID, name or email) as well as any custom user `traits` you may send to Segment.

New users will show up in the [Users](https://app.getbeamer.com/users) section within your Beamer dashboard.
