---
title: Canny Destination
rewrite: true
---

[Canny](https://canny.io) is a single place for all customer feedback. It saves you time managing all the feedback while keeping your customers in the loop. Let your customers post and vote on feedback from within your website or mobile app. You'll get an organized list of feedback that you can use to inform your roadmap.

This destination is maintained by Canny. For any issues with the destination, please [reach out to their team](segment-help@canny.io).

NOTE: The Canny Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on December 15, 2019. If you are interested in joining their beta program or have any feedback to help improve the Canny Destination and its documentation, please [let their team know](segment-help@canny.io)!

## Getting Started
{{>connection-modes}}

1. Go to your [Canny Admin Segment Settings](https://canny.io/redirect?to=%2Fadmin%2Fsettings%2Fsegment).
2. You will then be routed to Segment where you will be prompted to login and authorize the Canny Destination. Select the workspace and source you would like to integrate and click allow.
3. And you're done! Wasn't that easy? After clicking allow you will be rerouted back to Canny where we will complete the installation by creating the destination in Segment and configuring it with an API key.


## Identify
If you haven’t had a chance to review our spec, please take a look to understand what the Identify method does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com',
  name: 'John Doe',
});
```
Identify calls will be sent to Canny as an identify event. Once identified, users will appear in Canny and will appear in your vote-on-behalf feature. The `name` and `email` traits are **required** fields.

## Settings

### Custom Fields
Custom Fields is a list of [traits](https://segment.com/docs/connections/spec/identify/#traits) to be imported as custom fields.
