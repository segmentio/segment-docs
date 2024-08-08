---
title: Blip Source
id: FOWuS0UQmP
---

[Blip](https://www.blip.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is an advanced conversation platform powered by AI.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) that can not only export data into your Segment warehouse but also federate the exported data into your other enabled Segment destinations.

White Wall maintains this source. For any issues with the source, [contact their Support team](mailto:support@whitewall.dev).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Blip" in the Sources Catalog, select Blip, and click **Add Source**.
3. On the next screen, give the Source a name and configure any other settings.
   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example, `Blip_Prod`, `Blip_Staging`, `Blip_Dev`).
4. Click **Add Source** to save your settings.
5. Copy the Write Key from the Segment UI.
6. From your Blip account, visit the Blip Store, search for "Segment", and install the extension.
7. Go to your bots page and open the extension.
8. Paste the Write Key in the corresponding field and click **Save**.

## Stream

Blip uses Segment's stream Source component to send Segment event data. It uses server-side Track and Identify methods to send data to Segment. These events are then available in any destination that accepts server-side events and available in a schema in your data warehouse, so you can query using SQL.

If available, Blip uses Blip's contact `identity` as the userId. If the `identity` is missing from the contact, an `anonymousId` gets generated.

## Events

The following table lists events that Blip sends to Segment. These events appear as tables in your warehouse and as regular events in other destinations. Blip includes the `userId` if available.

| Event Name         | Description                           |
| ------------------ | ------------------------------------- |
| `Message Sent`       | Message was sent successfully         |
| `Message Received`   | Message was received successfully     |
| `Event Tracked`      | Tracking Event from Blip was created  |

## Event Properties

See [Blip's documentation, in Portuguese](https://help.blip.ai/hc/pt-br/articles/4474381206423-Enviando-dados-para-an%C3%A1lise-atrav%C3%A9s-de-Webhooks){:target="_blank"}, to learn more about the properties that Blip sends.

## Adding destinations

Now that your source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the White Wall support team](mailto:support@whitewall.dev).
