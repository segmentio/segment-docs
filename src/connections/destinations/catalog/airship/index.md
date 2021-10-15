---
rewrite: true
title: Airship Destination
---

Airship gives brands the data, channels, orchestration and services they need to deliver push notifications, emails, SMS, in-app messages, and more to the right person at the right moment — building trust, boosting engagement, driving action, and growing value.

[Airship Cloud-mode Destination integration](https://docs.airship.com/partners/segment/#destination) enables users to set Airship Tags and Custom Events through Segment's `identify`, `track`, and `group` API calls.

Segment `track` API calls are received by Airship as Custom Events. The traits of the Segments `identify` API call are interpreted as either `tags` or `attributes`. Tags are all traits that contains a boolean value (either `true` or `false`). A trait which contains a non-boolean value -- and is known to Airship -- becomes an attribute.

Segment `group` API calls associate a named user with a group. Similar to `identify` API calls, `group` calls contain a set of `traits` that Airship uses as `tags` and `attributes`.


This destination is maintained by Airship. For any issues [contact the Airship Support team](mailto:support@airship.com).

> success ""
> **Good to know**: This page is about the Airship Segment destination, which receives data from Segment. There's also a page about the [Airship Segment source](/docs/connections/sources/catalog/cloud-apps/airship/), which sends data _to_ Segment!

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

Follow these steps to configure the integration

1. Log in to your Segment workspace
2. Go to the **Catalog** and click the **Destinations** tab.
3. Find the `Airship` destination (under *SMS & Push Notifications*), click the *Airship* tile and then click the *Configure Airship* button.
4. In the *Select Source* dialog, select a source and click *Confirm Source*.
5. Toggle on *Airship EU Data Center* if you are implemented in Airship's European Data Center (if you are not sure which data center you are on please [contact the Airship support team](mailto:support@airship.com)).
3. Enter the *App Key*  and Access Token that you copied when setting up the Real-Data Streaming integration in Airship. See [Airship documentation for steps to create an Access Token](https://docs.airship.com/partners/segment/#access-token).
4. For `identify` events, first [set up a tag group within Airship](https://docs.airship.com/partners/segment/#tag-group).
5. For `attributes`, first [predefine them in Airship](https://docs.airship.com/guides/messaging/user-guide/audience/segmentation/attributes/#add-attributes).

## Requirements
To use the Segment Destination integration, you must implement `Named Users` in Airship. The Segment UserID must match the Named User ID in Airship. If your `named_user_id` and `UserID` do not match, Airship will not be able to associate `identify` or `track` events to the proper user in Airship. You will not be able to issue automated messages or to attach user attributes from Segment within Airship.

See [Tags and Named Users](https://docs.airship.com/guides/audience/tags-named-users/) or the [Named Users API](https://docs.airship.com/api/ua/#tag/named-users) for more information about configuring named users.

## Identify

To understand what the [identify API call](https://segment.com/docs/connections/spec/identify/) does, be sure to review the Segment spec. An example call would look like:

```
analytics.identify('jill', {
  new_customer: true,
  order_completed_last_60days: false,
});
```

The `identify` API calls are sent to Airship as `identify` events. When an `identify` event is received, Airship will use the `userId` to set attributes or tags for named users. To take advantage of attributes, you must first predefine them in Airship individually. To take advantage of identify features, in Airship you must set up a tag group called `segment-integration` and a named user must exist for the `userId`. The value of the property name will be either `true` or `false`.

**Segment Identify Events to Airship Attributes**

Airship attributes are used for profile enrichment, message personalization, segment building, and user analytics.

**Segment Identify Events to Airship Tags**
Airship tags are used for profile enrichment, message triggering, segment building, and user analytics.

Example use cases in Airship:
* An `identify` event sets a tag to mark the user as *liking a specific product category*
* An `identify` event sets an attribute on a user who *registers for an account*

## Track

Use this destination to send `track` events to Airship for message triggering and analytics.

For more information about the [track API call](https://segment.com/docs/connections/spec/track/) review the Segment spec. An example call would look like:

```
analytics.track('Product Clicked', {
  name: 'Air Jordans',
  brand: 'Nike ',
  price: 200,
  quantity: 1,
  variant: 'Red'
});
```

The `track` API calls are sent to Airship as `track` events. As soon as a `track` event is received, Airship will create a custom event. The properties of the the `track` event are automatically added as properties on the custom event. If `revenue` is present for the `track` event, then it is set as the value of the custom event.

Note that a custom event will not be created for a `track` event which has more than 20 properties.

**Segment Track Events to Airship Custom Events**
Airship custom events are used to trigger automated messages for Mobile App, Web Notifications, Email, and SMS messages.

Example use cases:
* The `track` event triggers an Airship custom event on a user who has `abandoned a cart` and an Airship message is triggered for reengagement
* The `track` event triggers an Airship custom event on a user who has `uninstalled the app` to trigger an SMS, Email, or Web Notification

Custom events and tags sent from Segment are automatically populated within Airship Performance Analytics reporting dashboards.

## Group

For more information about the [group API call](https://segment.com/docs/connections/spec/group/) review the Segment spec. An example call would look like:

```
analytics.group('1234', {
  name: 'Initech',
  industry: 'Technology',
  employees: 329,
  plan: 'enterprise',
  totalBilled: 830
});
```

When you call `group`, Segment sends a custom attribute to Airship with the name `airship_segment_group_<groupId>`, where `<groupId>` is the group's ID passed as one of its parameters. For example, if the group's ID is `1234` then the custom attribute name is `airship_segment_group_1234`. The value of the custom attribute is `true`.

To take advantage of `group` features as tags, set up a tag group called `segment-integration-group` in Airship. A *named user* must exist for the `userID`.

# Leveraging this data in Airship

The following guides further explain the different ways of leveraging this data with Airship.

* [Cloud-mode Custom Events vs Audience Tags](https://docs.airship.com/guides/interaction/custom-events/#custom-events-vs-audience-tags)
* [Message Targeting with Tags](https://docs.airship.com/guides/audience/tags-named-users/)
* [Creating a Segment with Tags](https://docs.airship.com/tutorials/audience/segments-builder/)
* [Message Automation with Event Triggering](https://docs.airship.com/tutorials/orchestration/automation/automation/)
* [Message Personalization with Attributes](https://docs.airship.com/guides/messaging/user-guide/audience/segmentation/attributes/)
