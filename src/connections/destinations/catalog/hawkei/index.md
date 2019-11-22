---
rewrite: true
title: Hawkei Destination
hide-personas-partial: true
---

## Hawkei Destination


[Hawkei](https://hawkei.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides real-time accurate error detection for your key user paths and product features. Pinpoint the root cause of an issue easily with all the meta data delivered straight to your inbox or slack channel.

This destination is maintained by Hawkei. For any issues with the destination, please [reach out to their team](mailto:support@hawkei.io).

_**NOTE:** The Hawkei Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on October 19, 2019. If you are interested in joining their beta program or have any feedback to help improve the Hawkei Destination and its documentation, please [let  their team know](mailto:support@hawkei.io)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Hawkei" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. In the settings, enter the following fields:
    * **API Key:** You can find your Api key inside the [Api Keys settings](https://app.hawkei.io/settings/api_keys).
    * **Workspace:** Enter the Hawkei workspace where you want your Segment events to be sent. You can see a list of all your Hawkei workspaces in your [Workspace settings](https://app.hawkei.io/settings/spaces).
    * **Environment:** Enter the environment you are sending events from. If you don't know what to set you should set this field to `production`.


## Page

If you haven't had a chance to review Segment's spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

When you call `page`, we store it as a `page` event inside Hawkei. You can use this event to create your flows.


## Identify

If you haven't had a chance to review Segment's spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'hans.solo@hawkei.io'
});
```

Identify calls will be sent to hawkei as an `identify` event. The associated user data will be stored in identities and all the relevant flows will be attached to this user.

## Group

If you haven't had a chance to review Segment's spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

```
analytics.group('groupId123', {
  name: 'Millenium Falcon'
});
```

Group calls will be sent to hawkei as an `group` event. The associated group data will be stored in groups and all the relevant flows will be attached to this group.


## Track

If you haven't had a chance to review Segment's spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to Hawkei as a `track` event. Use the method track anywhere you want to create an event in your code.

You'll want to create events that are part of critical paths in your application that you intend to add to the flows you want to monitor.

## Troubleshooting

## AnonymousId

All requests to Hawkei require an anonymousId to be set. Segment sets this automatically on thier client side libraries, but for server side libraries (php, Ruby etc) this needs to be explictly set.
