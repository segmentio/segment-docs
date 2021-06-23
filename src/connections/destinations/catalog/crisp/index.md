---
title: Crisp Destination
rewrite: true
---
[Crisp](https://crisp.chat/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is an all-in-one solution to communicate with your customers using text-messaging.

This destination is maintained by Crisp. For any issues with the destination, [contact the Crisp Support team](mailto:support@crisp.chat).

## Getting Started

{% include content/connection-modes.md %} 

1. Go to the [Crisp Plugins page](app.crisp.chat).
2. Search for the "Segment" plugin, click **Connect to Segment**.
3. The Segment App opens in a new window. Log in to authenticate the connection from Crisp.
4. Select the Workspace and Source to connect with Crisp.

## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  name: 'John Doe',
  email: 'john.doe@segment.com',
  phone: '012346789',
  avatar: 'https://pbs.twimg.com/profile_images/834424630630817795/TfyS4uXb_400x400.jpg'
});
```
Send Identify calls to create or update a User profile. The `email` trait is required to create new Users.

## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Completed Purchase', {
  revenue: 42.99,
  shippingMethod: '2-day',
  category: 'Conversion'
});
```
> warning ""
> Be sure you send an Identify call for any user who will trigger Track calls. If Crisp receives a Track call for an unknown `userId`, the call is dropped.

Crisp adds Track events to the User's profile events stream.
