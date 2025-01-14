---
title: Dub Source
---

[Dub](https://dub.co/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="\_blank”} is the all-in-one link attribution platform for businesses to understand how their marketing spend are converting to sales.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Dub. For any issues with the source, [contact their Support team](mailto:support@dub.co).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="\_blank”} click **Add Source**.
2. Search for "Dub" in the Sources Catalog, select Dub, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. Dub_Prod, Dub_Staging, Dub_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI. You will need to input this key on the Dub.
6. Go to [Dub Segment integration](https://app.dub.co/settings/integrations/segment) page, paste the key and click "Save changes".
7. Go back to Segment and navigate to your Dub source. Click **Add Destinations** to add any destinations that you want to receive Dub data.

## Stream

> (delete after reading) Clarify the type of Segment events your integration will send.

Dub uses our stream Source component to send Segment event data. It uses a server-side (select from `track`, `identify`, `page`, `group`) method(s) to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

> (delete after reading) Clarify how your integration includes user identifiers in your event payloads, the example below is from Klaviyo:

The default behavior is for Klaviyo to pass the userId associated with the email recipient as the userId. There are cases in which Klaviyo does not have an associated userId, in which case the email address will be passed in as the anonymousId.

> (delete after reading) For each of the below sections, populate the event and properties that a customer would expect to receive in their downstream tools from your Event Source.

## Events

The table below lists events that Dub sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Dub includes the `userId` if available.

| Event Name         | Description                           |
| ------------------ | ------------------------------------- |
| Email Sent         | Email was sent successfully           |
| Email Opened       | Prospect opened the email             |
| Link Clicked       | Prospect clicked the tracking link    |
| Email Replied      | Prospect replied to email sent        |
| Email Bounced      | Email servers rejected the email      |
| Email Unsubscribed | Prospect clicked the unsubscribe link |

## Event Properties

The table below list the properties included in the events listed above.

| Property Name   | Description               |
| --------------- | ------------------------- |
| `email_id`      | ID of the email           |
| `from_id`       | Sender email ID           |
| `email_subject` | Subject line of the email |
| `link`          | URL of the link clicked   |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Dub support team](mailto:support@Dub.com).

> (delete after reading) Congratulations! 🎉 You’ve finished the documentation for your Segment integration. If there’s any additional information or nuance which did not fit in the above template and that you want to share with our mutual customers, feel free to include these as a separate section for us to review. If not, you may now submit this doc to our team.
