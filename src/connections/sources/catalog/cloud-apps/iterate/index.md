---
title: Iterate Source
---

[Iterate](https://iteratehq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a customer insights platform that helps you build better products by asking the right questions, at the right time.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which exports data into your Segment warehouse and federates that data into your other enabled Segment Destinations.

This source is maintained by Iterate. For any issues with the source, [contact the Iterate Support team](mailto:support@iteratehq.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Iterate" in the Sources Catalog, select Iterate, and click **Add Source**.
3. On the next screen, give the Source a name and configure any other settings.
   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. Iterate_Prod, Iterate_Staging, Iterate_Dev).
4. Click **Add Source** to save your settings.
5. Copy the **Write key** from the Segment UI.
6. Log in to your Iterate account.
7. Navigate to **Company Settings > Integrations > Segment** and paste the Write key to connect.

## Stream

Iterate sends survey response data to Segment as server-side `track` events. These events are available in any destination that accepts server-side events, and are available in a schema in your data warehouse for SQL querying.

The Iterate source uses the `external_id` (if one exists for the user) as the Segment `userId`. If an `external_id` is not available, Iterate passes the internal Iterate user ID as the `anonymousId`.

### Identify Calls

Iterate includes user traits within the `context.traits` object of the `track` event. This updates the user's profile in Segment with the latest information collected in the survey, such as:

*   The text of the answer (keyed by the question prompt or a custom attribute name).
*   User info like email, name, and phone (if collected via a "User Info" question type).

## Events

The table below lists events that Iterate sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Iterate includes the `userId` if available.

| Event Name                 | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `Survey Question Response` | A user answered a specific question in a survey. |

## Event Properties

The table below lists the properties included in the events listed above.

| Property Name         | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `survey_id`           | ID of the survey                                              |
| `survey_name`         | Name of the survey                                            |
| `question`            | The text prompt of the question answered                      |
| `response`            | The answer provided by the user                               |
| `label`               | (Optional) Custom attribute name configured for the question  |
| `response_string`     | The answer as a string (if applicable)                        |
| `response_int`        | The answer as an integer (if applicable)                      |
| `response_array`      | The answer as an array (for multi-select or matrix questions) |
| `response_year`       | The year component (for date questions)                       |
| `response_month`      | The month component (for date questions)                      |
| `response_day`        | The day component (for date questions)                        |
| `response_properties` | Map of any additional traits associated with the response     |

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Iterate support team](mailto:support@iteratehq.com).
