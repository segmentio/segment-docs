---
title: InMoment (formerly Wootric)
rewrite: true
redirect_from:
  - 'connections/sources/catalog/cloud-apps/inmoment-formerly-wootric'
---

{% include content/source-region-unsupported.md %}

[InMoment](https://wootric.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) (formerly Wootric) is modern customer feedback management software. You can incorporate Voice of Customer data in your decision-making processes and marketing campaigns, and trigger customer follow-up when you send survey responses to your CRM, marketing platform or data warehouses automatically.

InMoment maintains this source. For any issues, [contact the InMoment support team](mailto:support@wootric.com).

## Getting Started

1. In Segment go to **Connections** and click **Add Source**.
2. Search for **InMoment** in the Source Catalog and confirm by clicking **Connect**.
3. Give the Source a nickname and click **Add Source**. The nickname is used to designate the source in the Segment interface, and Segment creates a related schema name. The schema name is the namespace you query against in your warehouse. The nickname can be whatever you like, but Segment recommends using a name that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Go to the **Settings > API Keys**. 
5. Copy the **Write Key** and log in to your InMoment account. 
6. Navigate to **Settings > Integrations > Send InMoment Data > Send survey responses back to Segment** and paste the write key to connect.

## Events

Below is a table of events that InMoment sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations. InMoment will send through the `userId` if available. Note: at this time event names continue to be labeled “Wootric.”


| Event Name                      | Description                             |
| ------------------------------- | --------------------------------------- |  |
| Wootric survey response created | A survey response was created           |
| Wootric survey response updated | An existing survey response was updated |

## Event Properties

Below are tables outlining the properties included in the events listed above.

| Property Name | Description                                                           |
| ------------- | --------------------------------------------------------------------- |  |
| channel       | The channel from which the survey was responded like ‘web' or ‘email' |
| created_at    | The timestamp of when the response was created                        |
| metric_type   | The mode of the survey like "NPS" or “CSAT”                           |
| properties    | The survey properties                                                 |
| response_id   | The id of the response                                                |
| score         | The selected score from the survey                                    |
| survey_id     | The id of the survey                                                  |
| updated_at    | The timestamp of when the response was updated                        |
| text          | The feedback text provided by the end user                            |


## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contain all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the InMoment team](mailto:support@wootric.com).
