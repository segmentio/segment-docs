title: SurveySparrow Source
---
[SurveySparrow](https://surveysparrow.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is an end-to-end omnichannel experience management platform that bundles Customer Experience and Employee Experience tools such as NPS, Offline, Chat, Classic, and 360 Surveys which are mobile-first, highly engaging, and user-friendly. 

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by SurveySparrow. For any issues with the source, [contact their Support team](mailto:support@surveysparrow.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"} click **Add Source**.
2. Search for "SurveySparrow" in the Sources Catalog, select SurveySparrow, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your SurveySparrow account - navigate to Settings > Apps and Integrations > Segment Source Integration and paste the Write key and select the Segment data processing region to connect.

## Stream

SurveySparrow uses our stream Source component to send Segment event data. It uses a server-side (`track`) method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

The default behavior is for SurveySparrow to pass the hash value of email and mobile number of respondent as the anonymousId. There are cases in which SurveySparrow does not have an associated email or mobile number, in which case a random hash will be passed in as the anonymousId.

## Events

The table below lists events that SurveySparrow sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. SurveySparrow includes the `anonymousId` if available.

| Event Name         | Description                           |
| ------------------ | ------------------------------------- |
| Submission Completed  | Survey response was submitted successfully         |

## Event Properties

The table below list the properties included in the events listed above.

| Property Name   | Description               |
| --------------- | ------------------------- |
| `event`         | Type of the event          |
| `survey`        | Will hold all the properties data  including surveys, answers,channel,expressions,variables        |
| `survey`        | Meta details about the survey          |
| `contact`       | Contact which has created the response         |
| `expressions`   | Computed expressions data of the survey         |
| `variables`     | Computed variables data of the survey         |
| `answers`       | contains answer details of the entire survey         |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don't appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the SurveySparrow support team](mailto:support@surveysparrow.com).