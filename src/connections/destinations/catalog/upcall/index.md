---
rewrite: true
title: Upcall Destination
id: 5c6ce090721aa60001ad878f
---
[Upcall](https://www.upcall.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) creates real phone conversations seconds after a lead comes in and automatically follows up at the right time and with the right message, 24/7/365.

This destination is maintained by Upcall. For any issues with the destination, [contact the Upcall Support team](mailto:success@upcall.com).


{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Upcall" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Upcall dashboard](https://app2.upcall.com/company/settings/integrations/api).

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call in [Node](/docs/connections/sources/catalog/libraries/server/node/) would look like:
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

The `campaign_id` parameter is optional and is added to the [integrations object](/docs/connections/sources/catalog/libraries/server/node/#selecting-destinations). If not provided, we will add the lead to the most recent campaign (in pending, live or paused state). It is recommended to specify it otherwise leads might get mixed up in multiple campaigns.
