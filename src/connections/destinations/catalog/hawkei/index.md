---
rewrite: true
title: Hawkei Destination
hide-personas-partial: true
id: 5d73347d0bbdf3a5abebca15
---
[Hawkei](https://hawkei.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides real-time accurate error detection for your key user paths and product features. Pinpoint the root cause of an issue easily with all the meta data delivered straight to your inbox or slack channel.

This destination is maintained by Hawkei. For any issues with the destination, [contact the Hawkei Support team](mailto:support@hawkei.io).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Hawkei" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the settings, enter the following fields:
    * **API Key:** You can find your Api key inside the [Api Keys settings](https://app.hawkei.io/settings/api_keys).
    * **Workspace:** Enter the Hawkei workspace where you want your Segment events to be sent. You can see a list of all your Hawkei workspaces in your [Workspace settings](https://app.hawkei.io/settings/spaces).
    * **Environment:** Enter the environment you are sending events from. If you don't know what to set you should set this field to `production`.


## Page

If you aren't familiar with the Segment Spec, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

When you call `page`, we store it as a `page` event inside Hawkei. You can use this event to create your flows.


## Identify

If you aren't familiar with the Segment Spec, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'hans.solo@hawkei.io'
});
```

Identify calls will be sent to hawkei as an `identify` event. The associated user data will be stored in identities and all the relevant flows will be attached to this user.

## Group

If you aren't familiar with the Segment Spec, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```js
analytics.group('groupId123', {
  name: 'Millenium Falcon'
});
```

Group calls will be sent to hawkei as an `group` event. The associated group data will be stored in groups and all the relevant flows will be attached to this group.


## Track

If you aren't familiar with the Segment Spec, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Clicked Login Button')
```

Track calls will be sent to Hawkei as a `track` event. Use the method track anywhere you want to create an event in your code.

You'll want to create events that are part of critical paths in your application that you intend to add to the flows you want to monitor.

## Troubleshooting

## AnonymousId

All requests to Hawkei require an `anonymousId` to be set. Segment sets this automatically on client-side libraries, but for server side libraries (php, Ruby etc) this needs to be explicitly set.
