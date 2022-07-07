---
title: Ninetailed Destination
id: 60635bda625d1d13b153c8ca
---

[Ninetailed](https://ninetailed.io/?utm_source=segment&utm_medium=docs&utm_campaign=partners) is an API-first optimization platform for the modern web, which enables blazing fast personalization experiences and better data-driven experiences, for frameworks like ReactJS or GatsbyJS and headless CMS like Contentful.

By integrating with [Segment](https://segment.com), you can easily and accurately track conversions and integrate 1st party data for personalization with Ninetailed.

This destination is maintained by Ninetailed. For any issues with the destination, [contact the Ninetailed Support team](mailto:support@ninetailed.io).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Ninetailed" in the Destinations Catalog, and select the Ninetailed destination.
3. Choose which Source should send data to the Ninetailed destination.
4. Copy your API Key from the Ninetailed Dashboard integrated in [your CMS](https://docs.ninetailed.io/account-and-setup/api-key?utm_source=segment&utm_medium=docs&utm_campaign=partners) (for example, Contentful).
5. Enter the "API Key" in the "Ninetailed" destination settings in Segment.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Ninetailed as an `identify` event. 

Use Identify calls to associate traits with a user with which can be used for personalization in email campaigns or website components.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Ninetailed as a `track` event. 

With the Ninetailed Audience Builder, create experiences for visitors who have performed a special action, like `signup` or `registered_for_newsletter`.