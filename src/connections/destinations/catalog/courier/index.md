---
rewrite: true
title: Courier Destination
id: 5e4b07ed88472cc19ea4f8d0
---
[Courier](https://courier.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides a way to design and deliver notifications. Design once with a rich visual editor and  deliver to any channel through one API request.

This destination is maintained by Courier. For any issues with the destination, [contact the Courier support team](mailto:support@courier.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %} 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for “Courier” in the Destinations Catalog, and select the “Courier” destination.
3. Choose which Source should send data to the “Courier” destination.
4. Go to the [Courier Settings Page](https://app.courier.com/settings), find and copy the “Auth Token”.
5. Enter the “Auth Token” in the “Courier” destination settings field “API Key” in Segment.

## Identify

If you aren't familiar with the Segment Spec, read through the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: carrier.pigeon@example.com'
});
```

Segment sends Identify calls to Courier as an `identify` event.

### User Profiles

Identify calls made from Segment automatically create profiles for users in Courier. `Traits` included in the Segment Identify call automatically merge into a user's Courier Profile over time. 

The example below shows a few basic properties you might want to track if you send notifications to users in one or more channels:

```js
analytics.identify('userId123', {
  email: 'carrier.pigeon@example.com',
  sms: '+1-123-555-7890',
  tokens: {
    slackToken: '****************',
    microsoftTeamsToken: '****************',
    whatsAppToken: '****************'
  },
  ...
});
```

For more information on how Courier handles profiles, see the [Courier Profile documentation](https://docs.courier.com/reference/profiles-api?utm_source=segmentio&utm_medium=docs&utm_campaign=partners)

## Track

If you aren't familiar with the Segment Spec, read through the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Courier as a `track` event.

### Inbound Events and Properties

Segment Track events are inbound events that might trigger a notification when Courier receives them. To begin, events appear in [Courier's Data Logs](https://app.courier.com/data/messages?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) after you configure the Courier destination. 

All Inbound Events coming from Segment Track calls appear with a `Segment-TrackEvent` prefix in Courier to help distinguish them from other inbound events.  

Courier extracts data from the Segment Track `properties` object, and conditionally triggers a request to the [Courier Send API](https://www.courier.com/docs/reference/send/message/) - only if that event is already [mapped](https://help.courier.com/en/articles/4202416-how-to-create-and-map-event-triggers-for-your-notifications). 

* Segment passes all `properties`  from the Track call to the `Send API` as elements in the `data` json objects. You can use these data points as variables in the Notification Template or as input on conditional routing logic.
* Courier uses the `userId` or `anonymousId` to look up and include the associated `User Profile` with the inbound event.  (See the note in the [Identify section](#identify) above.)

```js
analytics.track('Login Button Clicked', {
  orderNumber: 12345678980,
  estimatedDelivery: '2020-06-10T18:41:29.093Z',
  ...
})
```

> note "Note:"
> Courier does not send notifications until you publish a Notification Template and map incoming Segment Track events to that published Notification Template. If you send data to Courier before you complete those steps, incoming events are marked with a status of `Unmapped`.  

### Mapping Inbound Events to Notification Templates

Once you are comfortable with the Notification Template(s) and are ready to send Notifications, you can map these inbound events to start sending. You can do this directly from the [Event Log in Courier](https://app.courier.com/data/messages?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) or in the `Events` settings page.
