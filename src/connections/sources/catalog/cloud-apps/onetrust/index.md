---
title: OneTrust Source
id: QhEUZnE5uF
beta: true
---

OneTrust makes it easy for you to capture, centralize, govern, and sync consented first party data while keeping trust & transparency at the forefront of all consumer interactions. The OneTrust Integration provides data to Segment’s CDP and allows you to view & activate consented data in the appropriate way. 

This is an Event Cloud Source which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations. 

This source is maintained by OneTrust. For any issues with the source, [contact their support team](mailto:support@onetrust.com){:target="_blank”}.

## Getting Started 

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.

2. Search for “OneTrust” in the Sources Catalog, select OneTrust, and click **Add Source**.

3. On the next screen, give the Source **a nickname** configure any other settings.
    - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (like `OneTrust_Prod`, `OneTrust_Staging`, or `OneTrust_Dev`).

4. Copy the **Write key** from the Segment UI and log in to your OneTrust account - navigate to Settings > Integrations > Segment Integration and paste the key after encoding it.

## Stream

OneTrust uses Segment's stream Source component to send Segment event data. It uses a server-side method(s) to send data to Segment. These events are then available in any destination that accepts server-side events and are available in a schema in your data warehouse, so you can query using SQL.

OneTrust allows you to configure the userId from various sources from within the OneTrust platform.

## Events

The following table lists events that OneTrust sends to Segment. These events show up as tables in your Warehouse and as regular events in your other Destinations.

|  Event Name | Description |
|  ------ | ------ |
| Consent Updated | The user gave or withdrew consent for an express purpose. |

## Event Properties

The following table lists event properties included with all events Segment receives from OneTrust.

|  Property Name | Type | Description |
|  ------ | ------ | ------ |
| Purpose ID | string | The GUID assigned to the purpose in OneTrust. |
| Purpose Name | string | The name given to the purpose in OneTrust for which the user gives or withdraws their consent. |
| Status | string | The current status of the users consent after the update. Options include ACTIVE, WITHDRAWN, PENDING, OPT_OUT, EXPIRED, NO_CONSENT, HARD_OPT_OUT, and NOT_OPTED_OUT. |



## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and verify that events and properties appear the way you expect. If events and properties don’t appear as you expect them to, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the OneTrust support team](support@onetrust.com).