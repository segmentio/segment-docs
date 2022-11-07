---
title: Canny Destination
rewrite: true
hide-dossier: true
redirect_from: '/connections/destinations/catalog/canny-functions/'
id: 609d2b40f4bd0f24a5a37fbb
---
[Canny](https://canny.io) is a single place for all customer feedback. It saves you time managing all the feedback while keeping your customers in the loop. Let your customers post and vote on feedback from within your website or mobile app. You'll get an organized list of feedback that you can use to inform your roadmap.

This destination is maintained by Canny. For any issues with the destination, [contact the Canny Support team](mailto:segment-help@canny.io).

## Getting Started

{% include content/connection-modes.md %}

1. Go to your [Canny Admin Segment Settings](https://canny.io/redirect?to=%2Fadmin%2Fsettings%2Fsegment).
2. You will then be routed to Segment where you will be prompted to login and authorize the Canny Destination. Select the workspace and source you would like to integrate and click allow.
3. After you click allow you will be rerouted back to Canny where to complete the installation by creating the destination in Segment and configuring it with an API key.


## Identify
If you haven't had a chance to review spec, take a look to understand what the Identify method does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  name: 'John Doe',
});
```
Identify calls will be sent to Canny as an identify event. Once identified, users will appear in Canny and will appear in your vote-on-behalf feature. The `name` and `email` traits are **required** fields.

### Custom Fields
Custom Fields is a list of [traits](/docs/connections/spec/identify/#traits) to be imported as custom fields.
