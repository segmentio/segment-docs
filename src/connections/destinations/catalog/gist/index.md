---
title: Gist Destination
rewrite: true
id: 5ec499003e60e9200f681768
---
[Gist](https://getgist.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a marketing and support platform that helps companies attract visitors, convert leads, and support customers.

This destination is maintained by Gist. For any issues with the destination, [contact the Gist Support team](mailto:support@getgist.com).

## Getting Started
{% include content/connection-modes.md %}

1. From the Segment App's Destinations catalog page, click **Add Destination**.
2. Search for "Gist" in the Destinations Catalog, and select the Gist destination.
3. Choose which Source should send data to the Gist destination.
4. Copy your [Gist API key](https://app.getgist.com/projects/_/settings/api-key).
5. Enter the "API Key" in the Gist destination settings in Segment.

## Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

`userId` and `email` fields are **required** fields.

When you identify a new user, the contact is created in Gist. If the contact already exists, the contact properties are updated according to the traits provided.

Only `identify` events can *update* existing Contacts.

See [Gist's Contact Properties](https://docs.getgist.com/article/241-contact-properties-glossary) for more details.

## Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment's `track` events create Gist events and associate them with the corresponding Contact.

The name of the `track` event appears as a Custom Event in Gist and is able to trigger workflows, segment users, and view analytics.

An `email` field is **required** to create a Contact with a `track` event.
