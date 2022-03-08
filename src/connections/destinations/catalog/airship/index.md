---
rewrite: true
title: Airship Destination
id: 5d0ac1fbc12d700001651e34
---
Airship gives brands the data, channels, orchestration and services they need to deliver push notifications, emails, SMS, in-app messages, and more to the right person at the right moment — building trust, boosting engagement, driving action, and growing value.

[Airship Cloud-mode Destination integration](https://docs.airship.com/partners/segment/#destination) enables users to set Airship tags, attributes, and custom events through Segment's `identify`, `track`, and `group` API calls.

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
To use the Segment Destination integration, you must implement `Named Users` in Airship. The Segment UserID must match the Named User ID in Airship. If your `named_user_id` and `UserID` do not match, Airship will not be able to associate `identify`, `track`, or `group` events to the proper user in Airship. You will not be able to issue automated messages or to attach user attributes from Segment within Airship.

See [Tags and Named Users](https://docs.airship.com/guides/audience/tags-named-users/) or the [Named Users API](https://docs.airship.com/api/ua/#tag/named-users) for more information about configuring named users.

## Identify

To understand the Identify API call, review the Segment [Identify](/docs/connections/spec/identify/) spec. An example call  looks like:

```
analytics.identify('jill', {
  new_customer: true,
  order_completed_last_60days: false,
});
```

The `identify` API calls are sent to Airship as `identify` events. When an `identify` event is received, Airship will use the `userId` to set attributes or tags for named users. To take advantage of attributes, you must first predefine them in Airship individually. To take advantage of identify features, in Airship you must set up a tag group called `segment-integration` and a named user must exist for the `userId`. The value of the property name will be either `true` or `false`.

### Segment Identify Events to Airship Attributes

Airship attributes are used for profile enrichment, message personalization, segment building, and user analytics.

## Segment Identify Events to Airship Tags

Airship tags are used for profile enrichment, message triggering, segment building, and user analytics.

Example use cases in Airship:
* An `identify` event sets a tag to mark the user as *liking a specific product category*
* An `identify` event sets an attribute on a user who *registers for an account*

## Track

Use this destination to send `track` events to Airship for message triggering and analytics.

For more information about the Track API call review the Segment [Track]((/docs/connections/spec/track/)) spec. An example call looks like:

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

### Segment Track Events to Airship Custom Events

Airship custom events are used to trigger automated messages for Mobile App, Web Notifications, Email, and SMS messages.

Example use cases:
* The `track` event triggers an Airship custom event on a user who has `abandoned a cart` and an Airship message is triggered for reengagement
* The `track` event triggers an Airship custom event on a user who has `uninstalled the app` to trigger an SMS, Email, or Web Notification

Custom events and tags sent from Segment are automatically populated within Airship Performance Analytics reporting dashboards.

## Group

For more information about the Group API call review the Segment [Group](/docs/connections/spec/group/) spec.

When you call `group`, the integration sets either Airship tags or attributes for
corresponding Segment traits. A *named user* must exist in Airship for the corresponding
value of `userID` in Segment.

### UserID in Segment group API call

```
{
...
"userId": "test-user-69w86c"
...
}
```

### Named user in the corresponding Airship payload
```
{
"audience": {
	"named_user_id": "test_user-69w86c"
},
...
}
```

Airship tags are set for those Segment traits that contain a boolean value (either `true`
or `false`). All tags from `group` API calls are added to the `segment-integration-group` tag
group.

### A Segment group call with boolean traits

```
...
"traits:" {
	"hiring": true,
	"has-remote-employees": false,
	...
}
...
```

### Setting the corresponding Airship tags

```
...
"add": {
	"segment-integration-group": ["hiring"]
},
"remove": {
	"segment-integration-group": ["has-remote-employees"]
}
...
```

For Segment traits that contain values of other types, such as numeric or text, Airship sets custom attributes. The integration maps the Segment group trait `name` to the Airship predefined attribute `company`.  All other traits are prefixed with `airship_segment_group_`. Names of nested traits also include their parent traits delimited by underscore (_).

### A Segment group call with non-boolean traits

```
...
"traits": {
	"name": "Initech",
	"industry": "Technology",
	"employees": 329,
	"address": {
		"city": "Portland",
		...
	}
}
...
```

### Setting the corresponding Airship attributes
```
...
"attributes": [
{
	"action": "set",
	"key": "company",
	"value": "Initech",
	...
},
{
	"action": "set",
	"key": "airship_segment_group_industry",
	"value": "Technology",
	...
},
{
	"action": "set",
	"key": "airship_segment_group_employees",
	"value": 329,
	...
},
{
	"action": "set",
	"key": "airship_segment_group_address_city",
	"value": "Portland",
	...
}
...
```

## Leverage this data in Airship

The following guides further explain the different ways of leveraging this data with Airship.

* [Cloud-mode Custom Events vs Audience Tags](https://docs.airship.com/guides/interaction/custom-events/#custom-events-vs-audience-tags){:target="_blank"}
* [Message Targeting with Tags](https://docs.airship.com/guides/audience/tags-named-users/){:target="_blank"}
* [Creating a Segment with Tags](https://docs.airship.com/tutorials/audience/segments-builder/){:target="_blank"}
* [Message Automation with Event Triggering](https://docs.airship.com/tutorials/orchestration/automation/automation/){:target="_blank"}
* [Message Personalization with Attributes](https://docs.airship.com/guides/messaging/user-guide/audience/segmentation/attributes/){:target="_blank"}
