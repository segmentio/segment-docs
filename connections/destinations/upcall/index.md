---
rewrite: true
---

[Upcall](https://www.upcall.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) creates real phone conversations seconds after a lead comes in and automatically follows up at the right time and with the right message, 24/7/365.

This destination is maintained by Upcall. For any issues with the destination, please [reach out to their team](mailto:success@upcall.com).


_**NOTE:** Upcall is currently in beta, which means that there may still be some bugs for us to iron out. This doc was last updated on February 21, 2019, and we'd love to hear your feedback. If you are interested in joining our beta program or have any feedback to help us improve the Upcall Destination and its documentation, please [let us know](mailto:success@upcall.com)!_


## Getting Started

{{>connection-modes}} 

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Upcall" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Upcall dashboard](https://app2.upcall.com/company/settings/integrations/api).

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call in [Node](https://segment.com/docs/sources/server/node/) would look like:
```
analytics.identify({
  userId: 'userId12345',
  traits: {
    firstName: 'Bob',
    lastName: 'Dole',
    phone: '+16501234567'
  },
  integrations: {
    Upcall: {
      campaign_id: [YOUR UPCALL CAMPAIGN ID]
    }
});
```

When you call Identify, you must include a phone number (in US or E.164 format) as a `phone` trait. Upcall will check whether the lead with the same number exists in the campaign.

If they do not exist, the lead will be added to the campaign and immediately called (if the campaign is live). If they do exist in the campaign, no action will be taken.

The `campaign_id` parameter is optional and is added to the [integrations object](https://segment.com/docs/sources/server/node/#selecting-destinations). If not provided, we will add the lead to the most recent campaign (in pending, live or paused state). It is recommended to specify it otherwise leads might get mixed up in multiple campaigns.