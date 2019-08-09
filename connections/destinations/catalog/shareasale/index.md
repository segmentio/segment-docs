
## Getting Started

When you toggle on ShareASale in Segment, this is what happens:

+ Our CDN is updated within 5-10 minutes. Then our snippet will start asynchronously loading ShareASale tag onto your page. This means you should remove ShareASale's snippet from your page.
+ Your ShareASale sidebar will begin appearing for your team.

ShareASale is a destination that is only supported on the client-side.


## Identify

When you call [`identify`](/docs/spec/identify) on analytics.js and you have enabled "Create Leads" in the [advanced options](/segment/testing/integrations#shareasale), then we will create a lead for the user with the `userId` that you specify. Note that if the `userId` is not specified, then no lead is created.

## Track

ShareASale only supports the event "Order Completed", which requires the following properties:
- `orderId`
- `total` or `subtotal`
- an optional `repeat` property to signify whether a customer has bought from you before. Valid values for this property are `true` or `false`.

