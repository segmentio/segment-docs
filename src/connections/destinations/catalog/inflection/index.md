---
title: Inflection Destination
id: 62260e5dbc37b83046a847be
---

[Inflection](https://www.inflection.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides a B2B marketing automation platform for product-led growth companies. Combining Segment data with CRM data to create a single view of the customer, Inflection was built with marketing teams in mind, pricing a platform that can drive hyper-contextualized communications to support adoption, expansion, and engagement.

This destination is maintained by Inflection. For any issues with the destination, [contact the Inflection Support team](mailto:support@inflection.io).

## Getting Started
{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, select **Inflection**.
2. Choose the Source from which events have to be sent to Inflection destination.
3. [Contact the Inflection Support team](mailto:support@inflection.io) and get an **API key** generated for your account.
4. Enter the **API Key** in the Inflection destination settings on Segment.
5. Once data starts flowing in from Segment to Inflection, the stats can be viewed on the Connections page on Inflection App.


## Supported methods

Inflection supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to be added to *Product Activity* on Inflection App. For example:

```js
analytics.page()
```


### Screen

Send [Screen](/docs/connections/spec/screen) calls to be added to *Product Activity* on Inflection App. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```


### Identify

Send [Identify](/docs/connections/spec/identify) calls to Identify a user. The traits should have the `email` trait to be processed. All the other reserved traits are optional, but will be used to populate *Person DB* if available.
If a *Data Warehouse* is set to sync *Person DB* data to Inflection, the Identify call will be used only to map the `userId` to the `person.id` on Inflection app.
For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```


### Track

Send [Track](/docs/connections/spec/track) calls to be added to *Product Activity* on Inflection App. For example:

```js
analytics.track('Login Button Clicked')
```