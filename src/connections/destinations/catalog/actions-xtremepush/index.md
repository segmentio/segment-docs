---
title: Xtremepush (Actions) Destination
---
{% include content/plan-grid.md name="actions" %}

[Xtremepush](https://xtremepush.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a complete digital engagement platform. Empowering global brands to create personalised, real-time experiences for their customers across mobile, web, email, SMS and social. Xtremepush's clients are increasing revenue through data-driven, contextually-relevant interactions. The software is flexible, reliable and quick to deploy, backed up by a team of expert strategists and technical support.

This destination is maintained by Xtremepush. For any issues with the destination, [contact the Xtremepush Support team](mailto:support@xtremepush.com).

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Xtremepush (Actions) Segment destination. There's also a page about the [classic Xtremepush destination](/docs/connections/destinations/catalog/xtremepush/). Both of these destinations receive data from Segment.

## Benefits of Xtremepush (Actions) vs Xtremepush Classic

Xtremepush (Actions) provides the following benefits over the classic Xtremepush destination:

- **Easier setup**. Users see fewer initial settings which can decrease the time spent configuring the destination.
- **Increased transparency**. Users can see the exact data that is sent to the destination, and when Segment sends it.
- **Improved customization**. Users can determine how the events their sources trigger and map to actions supported by the destination.

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Xtremepush"
2. Select **Xtremepush (Actions)** and click **Add Destination**
3. Select an existing Source to connect to **Xtremepush (Actions)**.
4. Enter the "API Key" and "API Endpoint" into your Segment Settings UI which you can find from your Xtremepush Project under *Settings > Integrations* as described in the [user guide](https://docs.xtremepush.com/docs/segment){:target="_blank"}.

{% include components/actions-fields.html %}

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  phone: '1234567890',
  firstName: 'John'
});
```

When you identify a user, we'll pass that user's information to Xtremepush and will try to update or create a new user based on whether a Profile exists with that `user_id`.

Some special traits will also be used as additional user identifiers:

| Segment Trait | Xtremepush User Identifier |
| ------------- | -------------------------- |
| email         | email                      |
| phone         | mobile_number              |

For any additional traits you want to save you should create [User Profile Attributes](https://docs.xtremepush.com/docs/attributes-tags){:target="_blank"} in your Xtremepush Project.

If a trait does not match a custom Xtremepush User Profile Attribute and is not recognized as a User Identifier it will be ignored.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Product Purchased', {
  productName: 'Some Product'
})
```

Track calls will be sent to Xtremepush as a `event hits`, so you can use it to [trigger a campaign](https://docs.xtremepush.com/docs/campaign-events){:target="_blank"} for a user.

Event properties can be used as merge tags in the message content. You can also define additional rules on where to trigger the campaign based on event properties value.

## Enabling Push and In-App Notifications
To enable Xtremepush push and in-app notifications you will also need to to install the relevant Xtremepush SDKs.

[Xtremepush iOS SDK Docs](https://docs.xtremepush.com/docs/ios-integration){:target="_blank"}

[Xtremepush Android SDK Docs](https://docs.xtremepush.com/docs/android-integration){:target="_blank"}
