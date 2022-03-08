---
title: ShareASale Destination
id: 54521fda25e721e32a72eef2
---
## Getting Started

When you enable ShareASale in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading the ShareASale tag onto your page. This means you should remove ShareASale's snippet from your page.
+ Your ShareASale sidebar will begin appearing for your team.

ShareASale is a destination that is only supported on the client-side.


## Identify

When you call [Identify](/docs/connections/spec/identify/) on analytics.js and you have enabled "Create Leads" in the advanced options, then we will create a lead for the user with the `userId` that you specify. Note that if the `userId` is not specified, then no lead is created.

## Track

ShareASale only supports the event "Order Completed", which requires the following properties:
- `orderId`
- `total` or `subtotal`
- an optional `repeat` property to signify whether a customer has bought from you before. Valid values for this property are `true` or `false`.
