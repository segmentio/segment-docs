---
title: Outgrow Source
---

[Outgrow](https://outgrow.co/){:target="_blank"} provides a platform for marketers to create interactive content like calculators, quizzes, and assessments to better engage customers and generate personalized leads.

This is an Event Cloud Source which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Outgrow. For any issues with the source, contact their [Support team](mailto:Questions@outgrow.co).

## Getting started

1. From your Segment workspace's [Sources catalog page](https://app.segment.com/goto-source-catalog){:target="_blank"} click **Add Source**.
2. Search for "Outgrow" in the Sources Catalog, select **Outgrow**, and click **Add Source**.
3. On the next screen, give the Source a name (e.g. Outgrow_Production) and click **Add Source** to save your settings.
4. Copy the **Write Key** from the Segment UI.
5. Log in to your Outgrow account and follow the [integration setup guide](https://support.outgrow.co/docs/outgrow-and-segment-transferring-data-collected-using-outgrow-to-segment-and-analysing-the-traffic-in-segment) to navigate to the integrations section of your content piece.
6. Paste your Segment Write Key into the Outgrow configuration settings to connect the two platforms.

## Stream

Outgrow uses our stream Source component to send Segment event data. It uses server-side **Track** and **Identify** methods to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

Outgrow provides users the flexibility to map identifiers. The default behavior is for Outgrow to pass the field mapped by the user (such as an email address) as the `userId`.

### Events

The table below lists events that Outgrow sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

| Event Name     | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| LEAD GENERATED | Triggered when a user completes a form or interaction within an Outgrow experience. |

### Event Properties

The table below lists the properties included in the events listed above. Outgrow allows for dynamic mapping, so the specific properties sent depend on your custom configuration.

| Property Name | Description                                                                        |
| ------------- | ---------------------------------------------------------------------------------- |
| email         | The email address captured in the Outgrow lead form (if mapped).                   |
| phone         | The phone number captured in the Outgrow lead form (if mapped).                   |
| userId        | The unique identifier for the user as mapped in the Outgrow settings.              |
| name          | The name of the lead captured within the Outgrow experience (if mapped).           |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don't appear, check the Event Delivery tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, contact the [Outgrow support team](mailto:Questions@outgrow.co).