---
rewrite: true
title: Beamer Destination
beta: true
---

[Beamer](https://www.getbeamer.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a changelog and notification center that lets you announce new features, product updates, special offers and more.

This destination is maintained by Beamer. For any issues with the destination, please [reach out to their team](mailto:info@getbeamer.com).

_**NOTE:** The Beamer Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on January 29, 2020. If you are interested in joining their beta program or have any feedback to help improve the Beamer Destination and its documentation, please [let  their team know](mailto:info@getbeamer.com)!_

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Beamer" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Beamer settings](https://app.getbeamer.com/settings#api).

You can select any of the existing API keys in [your list](https://app.getbeamer.com/settings#api), but we recommend creating a new key to use specifically with your new Segment integration. Make sure to **enable the 'Create users' and 'Update users' permissions** for the API key you select.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```js
analytics.identify({
  "email": "john.doe@segment.com",
  "name": "John Doe",
  "position": "Sales associate"
})
```

`identify` calls will create a user in Beamer with the data available in each event, including basic attributes (such as ID, name or email) as well as any custom user `traits` you may send to Segment.

New users will show up in the [Users](https://app.getbeamer.com/users) section within your Beamer dashboard.
