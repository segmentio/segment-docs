---
rewrite: true
title: Retently Destination
---

[Retently](https://www.retently.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a customer experience management service. Measure your customer satisfaction with your company, products, or services by sending NPS, CSAT, CES, or 5-STAR surveys and act on the received feedback.

This destination is maintained by Retently. For any issues with the destination, [contact their support team](mailto:support@retently.com).

> note "Note:"
> The Retently Destination is currently in beta, which means that they are still actively developing the destination. To join their beta program, or if you have any feedback to help improve the Retently Destination and its documentation, [contact the Retently support team](mailto:support@retently.com)!

## Getting Started

{% include content/connection-modes.md %} 

The Retently integration gives you the possibility to send transactional surveys when an event is triggered in Segment. 

It takes only three steps to set everything up and start surveying your audience:

### 1. Add Retently Destination

1. From the Destinations catalog page in the Segment App, click "Add Destination".
2. Search for "Retently" in the Destinations Catalog, and select the "Retently" destination.
3. Choose which Source should send data to the "Retently" destination.

### 2. Enter the Retently API key

1. In Retently, access the [API token page](https://app.retently.com/settings/api/tokens).
2. Give the API key a name and click "Create".
3. Copy the API key and enter it in the "API key" section, on the Retently destination settings page.

### 3. Map survey campaign with Segment events

1. In Retently destination settings on the Segment app, access the "Map Retently campaigns with Segment events" section.
2. In the left input field, enter the ID of the survey campaign. [Learn how to configure the survey campaign.](https://help.retently.com/en/articles/4097690-set-up-segment-transactional-email-surveys)
3. In the right field, list the name of one or more track events that will trigger the survey in the specified campaign. Write the name of the event exactly as it's written in the `analytics.track` method (check more details in the chapter below). You can enter multiple track events, by separating them with a comma symbol (e.g., Place order, visit Dashboard).

After completing these three steps, saving your changes and activating the Retently destination, every time one of the specified track events will be triggered in Segment, a survey will be sent in your transactional campaign in Retently.


## Track

When a track event is triggered, Retently will perform the next actions:

1. Identify the event name and try to match it with the campaign ID from the Retently destination settings in Segment. If no campaign ID has this track event name listed, then the event will be dismissed by Retently. 
2. If the track event name matches with a campaign ID, then Retently will look for the `properties` object passed with the track event and will create a new customer record in Retently using the properties listed in the object.

The only property that is **required** by Retently is `email`. Any other property can be assigned optionally as customer properties in Retently. To learn how to manage customer properties via Segment track events [read Retently's documentation](https://help.retently.com/en/articles/4097690-set-up-segment-transactional-email-surveys).

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Subscription Activate Button Clicked', {
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    companyName: "ACME",
    tags: "foo, bar, baz",
    subscription_name: "Professional",
    signup_date: "01/30/2020"
})
```

Segment sends Track calls to Retently as a `track` event.