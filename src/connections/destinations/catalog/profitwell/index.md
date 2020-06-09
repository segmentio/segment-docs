---
title: ProfitWell Destination
rewrite: true
beta: true
---

[ProfitWell](https://www.profitwell.com) provides free subscription metrics to help you identify opportunities and then tools to help you reduce churn, optimize pricing, and grow your subscription business end-to-end. This integration enables ProfitWell users to leverage it's Retain product and Engagement Tracking capabilities.

This destination is maintained by ProfitWell. For any issues with the destination, [contact their team](mailto:product@profitwell.com).

> note ""
> **NOTE:** The ProfitWell Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on February 19, 2020. If you are interested in joining their beta program or have any feedback to help improve the ProfitWell Destination and its documentation, [let their team know](mailto:product@profitwell.com)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "ProfitWell" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop your token into the Segment destination settings for "Public API Token".
You can find your public token in the [Retain control center](https://www2.profitwell.com/app/engagement) under preview snippet.
4. Select "wep app" in the dropdown if you're tracking inside the app or "marketing" for your marketing site.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will start the ProfitWell service using the customer's email to track them. If no email is provided it will start the service anonymously.

[Customers](https://www2.profitwell.com/app/customers) need to be created first within ProfitWell in order for the indentify calls to trigger their engagements.

> note ""
> **Note**: The data doesn't sync into the ProfitWell UI in real time. It can take up to 24 hours to reflect.
