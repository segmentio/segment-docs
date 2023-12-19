---
title: White Label Loyalty Source
---

[White Label Loyalty](https://whitelabel-loyalty.com/){:target="_blank”} is an event powered loyalty solution to drive customer retention.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by White Label Loyalty. For any issues with the source, [contact their Support team](mailto:support@whitelabel-loyalty.com.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "White Label Loyalty" in the Sources Catalog, select White Label Loyalty, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings.

   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Navigate to the White Label Loyalty Console navigate to Settings > Integrations > Extensions and click the Create button (or edit an existing segment integration if you already have one).
7. Paste the write key in when prompted.
8. (OPTIONAL) specify a JSON path to use for the users ID (defaults to authIdentifier).
9. Click save.

## Stream

White Label Loyalty uses our stream Source component to send Segment event data. It uses server-side `track` and `identify` methods to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

The default behavior is for White Label Loyalty to pass the authIdentifier associated with the user as the userId. You can specify a custom JSONPath in the White Label Loyalty Console to change the source of the userId.

## Events

White Label Loyalty will send all custom and intrinsic event types created in the White Label Loyalty Console, as per the schema provided when you set it up. White Label Loyalty will include the `userId` if available.

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the White Label Loyalty support team](mailto:support@whitelabel-loyalty.com).

---