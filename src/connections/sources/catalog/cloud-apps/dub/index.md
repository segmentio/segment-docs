---
title: Dub Source
id: 1Z83r1kE0V
---

[Dub](https://dub.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="\_blank”} is the all-in-one link attribution platform for businesses to understand how their marketing spend are converting to sales.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources). This means that Dub can export data into your Segment warehouse and also integrate the exported data into your other enabled Segment destinations.

This source is maintained by Dub. For any issues with the source, [contact the Dub Support team](mailto:support@dub.co).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="\_blank”} click **Add Source**.
2. Search for *Dub* and select the *Dub* tile. 
3. Click **Add Source**.
4. Give the source a name and configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments. For example, Dub_Prod, Dub_Staging, Dub_Dev.

5. Click **Add Source** to save your settings.
6. Copy the Write key from the Segment UI. 
7. Go to the [Dub Segment integration page](https://app.dub.co/settings/integrations/segment){:target="_blank"} and paste the key and click **Save changes**.
8. Go back to Segment and navigate to your Dub source. Click **Add Destinations** to add any destinations that you want to receive data.

## Stream

Dub uses Segment's stream source component to send Segment event data. It uses the server-side Track method to send data to Segment. These events are then available in any destination that accepts server-side events, and are available in a schema in your data warehouse, so you can query using SQL.


## Events

The table below lists events that Dub sends to Segment. These events appear as tables in your warehouse, and as regular events in other destinations. Dub includes the `userId` if available.

| Event Name   | Description                     |
| ------------ | ------------------------------- |
| Link Clicked | Someone clicked your short link. |
| Lead Created | A lead event was created.        |
| Sale Created | A sale event was created.        |

The event names "Lead Created" and "Sale Created" may differ based on what event name you're sending to Dub.

## Event properties

You can refer to [Dub's Event Types](https://dub.co/docs/concepts/webhooks/event-types){:target="\_blank”} documentation to determine which attributes Dub forwards to Segment.

## Adding destinations

Once your Source is set up, you can connect it with destinations.

Log in to your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the specific destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Dub support team](mailto:support@dub.co).
