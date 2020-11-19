---
rewrite: true
title: Airship Destination
---

Airship gives brands the data, channels, orchestration and services they need to deliver push notifications, emails, SMS, in-app messages, and more to the right person in the right moment — building trust, boosting engagement, driving action and growing value.

[Airship Cloud-mode Destination integration](https://docs.airship.com/partners/segment/#destination) enables users to set Airship Tags and Custom Events through Segment Identify and Track events.

This destination is maintained by Airship. For any issues [contact the Airship Support team](mailto:support@airship.com).

> success ""
> **Good to know**: This page is about the Airship Segment destination, which receives data from Segment. There's also a page about the [Airship Segment source](/docs/connections/sources/catalog/cloud-apps/airship/), which sends data _to_ Segment!

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

Follow these steps to configure the integration

1. From the Segment web app, click **Catalog**.
2. Search for "Airship" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI.
* Steps to create an Access Token to enable integration from Airship outlined [here](https://docs.airship.com/partners/segment/#access-token). Save this Access Token & API Key for the pasting into Segment Settings UI.
4. For Identify Events, be sure to set up a Tag Group first within Airship. Steps outlined [here](https://docs.airship.com/partners/segment/#tag-group).

## Requirements
To use the Segment Destination integration, you must implement Named Users in Airship. The Segment UserID must match the Named User ID in Airship.

If your `named_user_id` and `UserID` do not match, Airship will not be able to associate Identify or Track events to the proper user in Airship. This would prevent you from effectively issuing automated messages or attaching user attributes from Segment within Airship

See [Tags and Named Users](https://docs.airship.com/guides/audience/tags-named-users/) or the [Named Users API](https://docs.airship.com/api/ua/#tag/named-users) for more information about configuring named users.

## Identify

If you haven't had a chance to review the Segment spec, take a look tounderstand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('jill', {
  new_customer: true,
  order_completed_last_60days: false,
});
```

Identify calls will be sent to Airship as an `identify` event. When an `identify` event is received, Airship will use the `userId` to set named users tags. To take advantage of identify features, in Airship you must set up a tag group called `segment-integration` and a named user must exist for the `userId`. The value of the property name will be true/false value.

**Segment Identify Events to Airship Tags**
Airship Tags are used for profile enrichment, message triggering, segment building, and user analytics.

Example Use cases:
* Identify event sets an Airship tag on a user is flagged as liking a specific product category
* Identify event sets an Airship tag on a user registers for an account

## Track

Use this Destination  to send `Track` events to Airship for message triggering and analytics.

If you haven't had a chance to review the Segment spec, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Product Clicked', {
  name: 'Air Jordans',
  brand: 'Nike ',
  price: 200,
  quantity: 1,
  variant: 'Red'
});
```

Track calls will be sent to Airship as a `track` event. When a `track` event is received, an Airship custom event will be created. The event's properties will be automatically added as properties on the custom event and if revenue is present that will be set at the custom event's value.

There is a maximum limit of 20 properties for track events. A custom event will not be created for a `track` event whose properties count exceeds the limit.

**Segment Track Events to Airship Custom Events**
Airship Custom Events are used to trigger automated messages for Mobile App, Web Notifications, Email, and SMS messages.

Example Use cases:
* Track event triggers an Airship Custom Event on a user who has abandoned cart and an Airship message is triggered for reengagement
* Track event triggers an Airship Custom Event on a user who uninstalled the app to trigger an SMS, Email, or Web Notification

Custom Events and Tags sent from Segment are automatically populated within Airship Performance Analytics reporting dashboards.


# Leveraging this data in Airship

Follow the below guides for further explaination and the different ways of leveraging this data with Airship.

* [Cloud-mode Custom Events vs Audience Tags](https://docs.airship.com/guides/interaction/custom-events/#custom-events-vs-audience-tags)
* [Message Targeting with Tags](https://docs.airship.com/guides/audience/tags-named-users/)
* [Creating a Segment with Tags](https://docs.airship.com/tutorials/audience/segments-builder/)
* [Message Automation with Event Triggering](https://docs.airship.com/tutorials/orchestration/automation/automation/)
