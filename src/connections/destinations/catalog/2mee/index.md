---
title: 2mee Destination
rewrite: true
id: 60b5d0a01f3726b85dc05aab
---
[2mee](https://2mee.com ) is a Human Hologram platform that automatically cuts the person out from the background, removing the visual clutter, and places them in the familiar context of your phone or website so that they dominate the screen.

This destination is maintained by 2mee. For any issues with the destination, [contact the 2mee Support team](mailto:support@2mee.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **2mee** in the Destinations Catalog and it.
3. Click **Configure 2mee**. 
4. Choose which Source should send data to the 2mee destination.
5. Go to 2mee and copy the [API Key and Application ID](https://docs.2mee.com/documentation/segment) from the 2mee Dashboard.
6. Go back to Segment and paste the API Key and Application ID you just copied in the 2mee destination settings. Make sure to paste the API Key in this format: `Bearer <API Key>`.

## Supported methods

2mee supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Send [Identify](/docs/connections/spec/identify/) calls to check if a user exists within your application. For example:

```js
{
      "type": "identify",
      "userId": "<userId>"
}
```

Segment sends Identify calls to 2mee as an `identify` event.

Identify calls with a `userId` not mapped to a device fails with a `400` error code.

## Track

Send [Track](/docs/connections/spec/track/) calls to track the actions your users perform.

Configure the HoloCapsule setting in the [2mee](https://go.2mee.com/) app.

Segment requires the `userId`. Track calls without a `userId` or with a `userId` not mapped to a device fail with a `400` code.

```js
{
      "type": "track",
      "event": "<event_name>",
      "userId": "<userId>"
}
```
Segment sends Track calls to 2mee as a `track` event.

