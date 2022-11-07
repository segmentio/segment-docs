---
title: Rokt Destination
id: 6268a16ce311a548d8cb1a72
---

The Rokt destination optimizes campaign performance by integrating conversion attribution for Rokt Ads. By integrating this conversion data, you’ll unlock a suite of intelligent tools that learn from every conversion, constantly making adjustments to improve campaign targeting and bidding.

This destination is maintained by Rokt. If you have any issues, please contact the [Rokt support team](https://rokt.atlassian.net/servicedesk/customer/portal/20/group/98){:target="_blank"}.

## Getting Started

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for “Rokt” in the Destinations Catalog. Select the **Rokt** destination.
3. Choose which source should send data to the Rokt destination.
4. Enter the API key provided to you by your Rokt Account manager. If you haven't received your login credentials, please reach out to them.

Once you've entered the API credentials for Rokt, the chosen source sends data through to Rokt's API.

## Supported Methods

Rokt supports the `track` API call, which can be used to send data to Rokt:


### Track
The `track` API call is how you record any actions your users perform, along with any properties that describe the action. [Learn more about the track call](/docs/connections/spec/track/).
An example call would look like:
```js
analytics.track('Clicked Login Button', , {
    property1: 1,
    property2: 'test',
    property3: true
})
```

Segment sends `track` calls to Rokt as `track` events. You can use these to configure conversion goals to inform the destination predictive analyses. You can use any `track` call made in the past week as the basis for a predictive goal in the Rokt destination.
