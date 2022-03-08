---
title: Delighted Source
rewrite: true
id: 3yeoUP8E3Y
---
{% include content/source-region-unsupported.md %}

[Delighted](https://delighted.com/) is the fastest and easiest way to gather actionable feedback from your customers. Use the feedback you gather from customers in all of your decision making processes. Send your feedback to your BI and data warehouses automatically.

This source is maintained by Delighted. For any issues with the source, you may [contact the Delighted Support team](mailto:hello@delighted.com).


## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Search for Delighted within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the set up steps to "Add Source". The nickname is used as a label for the source in your Segment interface, and Segment creates a related schema name which you query against in your warehouse. The nickname can be anything, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (Eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Sign in to your Delighted account and visit the [Segment destination](https://delighted.com/integrations/segment) to connect.
5. Once you connect with Segment you need to choose which `track` events you'd like to use as triggers for surveys to be sent people. Then you can configure Delighted to send feedback back to Segment by following the next 2 steps.
6. Enable the "Sync feedback to Segment" option.
7. Copy the Write Key from your Delighted source within Segment and paste it into the provided box within Delighted

**NOTE**: We only send feedback back to Segment on surveys triggered from Segment initially. This ensures all feedback we send to Segment is identified and enriched with Segment information.

## Components

Delighted uses our stream Source component to send events to Segment. These events are then available in any Destination that accepts server-side events, including your data warehouse.

## Events

Below is a table of events that Delighted sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations.

Delighted always sends the values received from Segment for the `user_id` and/or `anonymous_id` identifiers. All calls sent to Segment from Delighted will include the original value, Delighted never generates these.

Additionally, they also send `email` and `delighted_person_id` under `context.traits`.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Survey Question Answered</td>
   <td>A user answered a question on a survey they received.</td>
  </tr>
</table>


## Event Properties

Below are tables outlining the properties included in the events listed above.

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`survey_id`</td>
   <td>The Delighted identifier for the survey.</td>
  </tr>
  <tr>
   <td>`survey_name`</td>
   <td>The name of the survey.</td>
  </tr>
  <tr>
   <td>`survey_type`</td>
   <td>The type of the survey. For example, "NPS" or "CES".</td>
  </tr>
  <tr>
   <td>`survey_medium`</td>
   <td>The medium used for the survey. For example, "Email" or "SMS".</td>
  </tr>
  <tr>
   <td>`survey_tool`</td>
   <td>The name of the survey tool. This will always be "Delighted".</td>
  </tr>
  <tr>
   <td>`survey_question_id`</td>
   <td>The Delighted identifier for the question.</td>
  </tr>
  <tr>
   <td>`survey_question_name`</td>
   <td>The name of the question.</td>
  </tr>
  <tr>
   <td>`survey_question_text`</td>
   <td>The exact text shown to the user for this question.</td>
  </tr>
  <tr>
   <td>`survey_permalink`</td>
   <td>A permanent URL to view the survey response on Delighted.</td>
  </tr>
  <tr>
   <td>`survey_tags`</td>
   <td>An array of tags added to the survey response in Delighted.</td>
  </tr>
  <tr>
   <td>`survey_notes`</td>
   <td>An array of notes added to the survey response in Delighted.</td>
  </tr>
  <tr>
   <td>`survey_properties`</td>
   <td>An object containing optional data attached to the survey. This will include all properties sent in the triggering "track" call.</td>
  </tr>
</table>

## Adding destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the [Destination docs](https://segment.com/docs/connections/destinations/) for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the Delighted team](mailto:hello@delighted.com).


## Sending Data To Delighted

The Delighted Source works only when you also connect Delighted as a downstream destination within Segment. With the Delighted Destination, you can send Delighted user and event data, which you can use to trigger surveys. Head on over to our [Delighted destination docs](/docs/connections/destinations/catalog/delighted/).
