---
title: Canny (Actions) Destination
id: <integration_id>
---

{% include content/plan-grid.md name="actions" %}

[Canny](https://canny.io?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a single place for all customer feedback. It saves you time managing all the feedback while keeping your customers in the loop. Let your customers post and vote on feedback from within your website or mobile app. You'll get an organized list of feedback that you can use to inform your roadmap.

This destination is maintained by Canny. For any issues with the destination, [contact the Canny Support team](mailto:segment-help@canny.io).

{% include content/ajs-upgrade.md %}

## Getting started

1. Go to your [Canny Admin Segment Settings](https://canny.io/redirect?to=%2Fadmin%2Fsettings%2Fsegment).
2. Obtain your API key by installing the integration.
3. From the Segment web app, click **Catalog**, then click **Destinations**.
4. Find the Destinations Actions item in the left navigation, and click it.
5. Click **Configure Canny (Actions)**.
6. Select an existing Source to connect to Canny (Actions).
7. After you finished configuring the destination, update the API key in the Canny (Actions) destination settings, enable destination and save changes.

{% include components/actions-fields.html %}

## Identify

If you haven't had a chance to review spec, take a look to understand what the Identify method does. An example call would look like:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
  name: "John Doe",
});
```

Identify calls will be sent to Canny as an identify event. Once identified, users will appear in Canny and will appear in your vote-on-behalf feature. The `name` and `email` traits are **required** fields.

## Group

An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "X Corp",
});
```

Group calls will be sent to Canny as an group event. Once sent, groups will appear in Canny as companies attached to users. The `name` trait is a **required** field.

### Custom Fields

Custom Fields is a list of [traits](/docs/connections/spec/identify/#traits) to be imported as custom fields for Identify events.

---
