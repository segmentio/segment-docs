---
title: Dub Source
---

[Dub](https://dub.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="\_blank”} is the all-in-one link attribution platform for businesses to understand how their marketing spend are converting to sales.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources). This means that Dub can export data into your Segment warehouse and also integrate the exported data into your other enabled Segment destinations.

This source is maintained by Dub. For any issues with the source, [contact their Support team](mailto:support@dub.co).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="\_blank”} click **Add Source**.
2. Search for *Dub* and select the *Dub* tile. 
3. Click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. Dub_Prod, Dub_Staging, Dub_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI. You will need to input this key on the Dub.
6. Go to [Dub Segment integration](https://app.dub.co/settings/integrations/segment) page, paste the key and click **Save changes**.
7. Go back to Segment and navigate to your Dub source. Click **Add Destinations** to add any destinations that you want to receive Dub data.

## Stream

Dub uses our stream Source component to send Segment event data. It uses a server-side `track` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

> (delete after reading) Clarify how your integration includes user identifiers in your event payloads, the example below is from Klaviyo:

The default behavior is for Klaviyo to pass the userId associated with the email recipient as the userId. There are cases in which Klaviyo does not have an associated userId, in which case the email address will be passed in as the anonymousId.

## Events

The table below lists events that Dub sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Dub includes the `userId` if available.

| Event Name   | Description                     |
| ------------ | ------------------------------- |
| Link Clicked | Someone clicked your short link |
| Lead Created | A lead event was created        |
| Sale Created | A sale event was created        |

The event names "Lead Created" and "Sale Created" may differ based on what event name you're sending to Dub.

## Event Properties

You can refer to Dub's [Event Types](https://dub.co/docs/concepts/webhooks/event-types){:target="\_blank”} documentation to determine which attributes Dub forward to Segment.

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Dub support team](mailto:support@dub.co).
