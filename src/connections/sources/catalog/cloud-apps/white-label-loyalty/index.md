---
title: White Label Loyalty Source
id: xeZMgSrtAQ
beta: true
---

[White Label Loyalty](https://whitelabel-loyalty.com/){:target="_blank”} is an event-powered loyalty solution to drive customer retention.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) that can not only export data into your Segment warehouse but also federate the exported data into your other Segment-enabled destinations.

White Label Loyalty maintains this source. For any issues with the source, [contact their support team](mailto:support@whitelabel-loyalty.com.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”}, click **Add Source**.
2. Search for "White Label Loyalty" in the Sources Catalog, select White Label Loyalty, and click **Add Source**.
3. On the next screen, give the source a name and configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but Segment recommend using something that reflects the source itself and distinguishes amongst your environments (for example, `WhiteLabel_Prod`, `WhiteLabel_Staging`, `WhiteLabel_Dev`).

4. Click **Add Source** to save your settings.
5. Copy the write key from the Segment UI.
6. In the White Label Loyalty Console, navigate to **Settings > Integrations > Extensions** and click **Create**. Alternatively, you can edit an existing Segment integration.
7. Paste the write key in when prompted.
8. (Optional:) Specify a JSON path to use for the users ID (defaults to `authIdentifier`).
9. Click **Save**.

## Stream

White Label Loyalty uses Segment's stream source component to send Segment event data. The source uses server-side Track and Identify methods to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

By default, White Label Loyalty passes the `authIdentifier` associated with the user as the `userId`. You can specify a custom JSONPath in the White Label Loyalty Console to change the source of the `userId`.

## Events

White Label Loyalty will send all custom and intrinsic event types created in the White Label Loyalty Console, as per the schema provided when you set it up. White Label Loyalty will send all events reported against a user and include the `userId`.

## Adding destinations

Now that your source is set up, you can connect it with Destinations.

Log in to your downstream tools and verify that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the destination docs for each tool for troubleshooting.

If you experience any issues with how events are arriving to Segment, [contact the White Label Loyalty support team](mailto:support@whitelabel-loyalty.com).
