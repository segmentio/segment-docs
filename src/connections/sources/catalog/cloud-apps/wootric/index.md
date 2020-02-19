---
title: Wootric
beta: true
---

[Wootric](https://wootric.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is modern customer feedback management software. Easily incorporate Voice of Customer data in your decision-making processes and marketing campaigns, and trigger customer follow-up when you send survey responses to your CRM, marketing platform or data warehouses automatically.

This source is maintained by Wootric. For any issues with the source, please [reach out to the Wootric support team](mailto:support@wootric.com).

_**NOTE:** The Wootric Source is currently in beta, which means that they are still actively developing the source. This doc was last updated on February 4, 2020. If you are interested in joining their beta program or have any feedback to help improve the Wootric Source and its documentation, please [let the Wootric support team know](mailto:support@wootric.com)!_


## Getting Started

1. From your Segment UI’s Sources page click on “Add Source”.
2. Search for "Wootric" within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the setup flow to "Add Source". The nickname will be used to designate the source in the Segment interface, and Segment will create a related schema name. The schema name is the namespace you'll be querying against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Copy the Write key from the Segment UI and log in to your Wootric account - navigate to Settings > Integrations > Send Wootric Data > Send survey responses back to Segment and paste the key to connect.

## Events

Below is a table of events that Wootric sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations. Wootric will send through the `userId` if available.


|Event Name|Description|
| -------- | -------- | -------- |
|Wootric survey response created|A survey response was created|
|Wootric survey response updated|An existing survey response was updated|

## Event Properties

Below are tables outlining the properties included in the events listed above.

|Property Name|Description|
| -------- | -------- | -------- |
|channel|The channel from which the survey was responded like ‘web’ or ‘email’|
|created_at|The timestamp of when the response was created|
|metric_type|The mode of the survey like "NPS" or “CSAT”|
|properties|The survey properties|
|response_id|The id of the response|
|score|The selected score from the survey|
|survey_id|The id of the survey|
|updated_at|The timestamp of when the response was updated|
|text|The feedback text provided by the end user|


## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If there are any issues with how the events are arriving to Segment, please [contact the Wootric team](mailto:support@wootric.com).
