---
title: Groundswell Destination
rewrite: true
id: 60be57310e36edd15805ca36
---

[Groundswell](https://www.trygroundswell.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) empowers sales teams with just-in-time notifications and account prioritization based on product usage insights.

This destination is maintained by Groundswell. For any issues with the destination, [contact the Groundswell Support team](mailto:support@trygroundswell.com).


## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Groundswell" in the Destinations Catalog, and select the Groundswell destination.
3. Choose which Source should send data to the Groundswell destination.
4. Connect Segment from the ["Integrations" page](https://app.trygroundswell.com/integrations) of the Groundswell web app, then copy the "API Key".
5. Enter the "API Key" in the Groundswell destination settings in Segment.
6. When you return to the Groundswell web app, you'll be prompted to select mappings between Segment traits and Groundswell properties. You'll be able to use these later to define workflows and send data to other tools.
    - Select whether you are identifying Companies with `Group` or `Identify` traits.
    - Provide the names of Segment traits for all required Groundswell properties for both Companies and People.
    - Add any additional mappings you wish to provide for Companies and People.
7. As Groundswell begins receiving events from Segment...
    - You'll be able to add Signals from the "Signals" page.
    - People and Companies identified by Groundswell will appear on the People and Companies pages, respectively. This is a good way to confirm your mappings are configured properly.


## Supported methods

Groundswell supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).


### Identify

Send [Identify](/docs/connections/spec/identify) calls to identify individual users of your product, called "People" in Groundswell. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  name: 'John Doe'
});
```

The `email` trait is required and will be used to identify People everywhere in Groundswell. The `name` trait is optional.


### Group

Send [Group](/docs/connections/spec/group) calls to associate individual users with groups, called "Companies" in Groundswell. For example:

```js
analytics.group('userId123', {
  name: 'Example, Inc.',
  website: 'https://www.example.com'
});
```

The `name` trait is required and will be used to identify Companies everywhere in Groundswell. The `website` trait is optional.


### Track

Send [Track](/docs/connections/spec/track) calls to track individual product usage events, called "Signals" in Groundswell. For example:

```js
analytics.track('User Signed In')
```

