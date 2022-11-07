---
rewrite: true
title: Xtremepush Destination
id: 5ca77adcc7781c00018a459b
---
[Xtremepush](https://xtremepush.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a complete digital engagement platform. Empowering global brands to create personalised, real-time experiences for their customers across mobile, web, email, SMS and social. Xtremepush's clients are increasing revenue through data-driven, contextually-relevant interactions. The software is flexible, reliable and quick to deploy, backed up by a team of expert strategists and technical support.

This destination is maintained by Xtremepush. For any issues with the destination, [contact the Xtremepush Support team](mailto:support@xtremepush.com).

{% include content/beta-note.md %}



## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Xtremepush" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your Xtremepush Project under *Settings > Integrations* as described in the [user guide](https://docs.xtremepush.com/docs/third-party-integrations).

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

For any additional traits you want to save you should create [User Profile Attributes](https://docs.xtremepush.com/docs/attributes-tags) in your Xtremepush Project.

If a trait does not match a custom Xtremepush User Profile Attribute and is not recognized as a User Identifier it will be ignored.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Product Purchased', {
  productName: 'Some Product'
})
```

Track calls will be sent to Xtremepush as a `event hits`, so you can use it to [trigger a campaign](https://docs.xtremepush.com/docs/campaign-events) for a user.

Event properties can be used as merge tags in the message content. You can also define additional rules on where to trigger the campaign based on event properties value.

## Enabling Push and In-App Notifications
To enable Xtremepush push and in-app notifications you will also need to to install the relevant Xtremepush SDKs.

[Xtremepush iOS SDK Docs](https://docs.xtremepush.com/docs/ios-integration)

[Xtremepush Android SDK Docs](https://docs.xtremepush.com/docs/android-integration)

