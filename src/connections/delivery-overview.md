---
title: Delivery Overview
---

Delivery Overview is a visual observability tool designed to help Segment users diagnose event delivery issues for any cloud-streaming destination receiving events from cloud-streaming sources. 

> info "Delivery Overview is currently in beta"
> This means that the Delivery Overview feature is in active development, and some functionality may change before it becomes generally available. Beta users of Delivery Overview will still have access to the Event Delivery tab. During the public beta, Delivery Overview supports event-streaming, cloud-mode destinations.

## Key features

Delivery Overview has three core features:
- [Pipeline view](#pipeline-view): a visual overview of each step your data takes during the delivery process
- [Breakdown table](#breakdown-table): contains more detail about the events that were processed at each pipeline step
- [Discard table](#discard-table): contains details about the events that failed or were filtered out of your process and allows you to inspect samples of them

You can refine these tables using the time picker and the metric toggle, located under the destination header. With the time picker, you can specify a time period (last 10 minutes, 1 hour, 24 hours, 7 days, 2 weeks, or a custom date range over the last two weeks) for which you'd like to see data. With the metric toggle, you can switch between seeing metrics represented as percentages (for example, *85% of events* or *a 133% increase in events*) or as counts (*13 events* or *an increase of 145 events*.) Delivery Overview shows percentages by default.

### Pipeline view
The pipeline view provides insights into each step your data is processed by enroute to the destination, with an emphasis on the steps where data can be discarded due to errors or your filter preferences. Each step provides details into counts, change rates, and event details (like the associated Event Type or Event Names), and the discard steps (Failed on ingest, Filtered at source, Filtered at destination, & Failed delivery) provide you with the reasons events were dropped before reaching the destination. Discard steps also include how to control or alter that outcome, when possible. The pipeline view also shows a label between the Filtered at destination and Failed delivery steps indicating how many events are currently pending retry. 

The pipeline view shows the following steps:

- **Successfully received**: Events that Segment ingested from your source
- **Failed on ingest**: Events that Segment received, but were dropped due to internal data validation rules
- **Filtered at source**: Events that were discarded due to schema settings or [Protocols](/docs/protocols/) Tracking Plans
- **Filtered at destination**: Events that were discarded due to [Destination Filters](/docs/guides/filtering-data/#destination-filters), [filtering in the Integrations object](/docs/guides/filtering-data/#filtering-with-the-integrations-object), or [per source schema integration filters](/docs/guides/filtering-data/#per-source-schema-integrations-filters). [Actions destinations](/docs/connections/destinations/actions/) also have a filtering capability: for example, if your Action is set to only send Identify events, all other event types will be filtered out. Actions destinations with incomplete triggers or disabled mappings are filtered out at this step. [Consent Management](/docs/privacy/consent-management/) users also see events discarded due to consent preferences.
- **Failed delivery**: Events that have been discarded due to errors or unmet destination requirements
- **Successful delivery**: Events that were successfully delivered to the destination

Actions destinations also include a mapping dropdown, which allows you to select a [mapping](/docs/connections/destinations/actions/#customize-mappings) to filter the events in the Filtered at destination, Failed delivery and Successful delivery pipeline steps. The following image shows an Actions destination filtered to include only Track Page View events in the last three pipeline steps:

![A screenshot of the Delivery Overview tab for an Actions destination, with the Track Page View mapping selected.](images/delivery-overview-actions-destination.jpeg)

### Breakdown table
The breakdown table provides you greater detail about the selected events.

To open the breakdown table, select either the first step in the pipeline view (Successfully received,) the last step in the pipeline view (Successful delivery,) or select a discard step and then click on a discard reason. 

The breakdown table displays the following details:
- **Event type**: The Segment spec event type (Track call vs. Identify call, for example)
- **Event name**: The event name, provided by you or the source (*not available for inspection at all steps*)
- **App version**: The app/release version, provided by you or the source (*not available for inspection at all steps*)
- **Event count**: How many of each event either successfully made it through this pipeline step (in the case of the first or last steps in the pipeline view) or were filtered out (if you access it from a discard table)
- **% Change**: Insight into how the event counts differ from the last comparable time range as a percentage<sup>1</sup>

<sup>1:</sup> *Segment calculates the related change percentage by subtracting the percent of events impacted in the previous time period from the percent of impacted events in the current time period. For example, if last week 15% of your events were filtered at a source, but this week, 22% of your events were filtered at a source, you would have a related change percentage of 7%.*

### Discard table
The discard table provides you with greater detail about the events that failed to deliver or were filtered out of your sources and destinations. 

To open the discard table, click on one of the discard steps. If you click on a row in the discard table, you can see the breakdown table for the discarded events.

The discard table displays the following details:
- **Discard reason**: Any relevant error code, message, or description associated with the event's failure. When possible, Delivery Overview links to any troubleshooting information you can use to get your events up and running again. Clicking on a discard reason brings you to the [breakdown table](#breakdown-table,) where you can see more detail about discarded events. For more troubleshooting information associated with Discard Reasons, see the [Troubleshooting](#troubleshooting) documentation. 
- **Details & Samples**: View up to ten samples over the selected time range. Examine the error message and reason for the error or discard and inspect the payloads involved with the attempted transaction (*not available for inspection at all steps*)
- **Event count**: How many of each event were discarded in this pipeline step
- **% Change**: Insight into how the event counts differ from the last comparable time range as a percentage<sup>1</sup>

<sup>1:</sup> *Segment calculates the related change percentage by subtracting the percent of events impacted in the previous time period from the percent of impacted events in the current time period. For example, if last week 15% of your events were filtered at a source, but this week, 22% of your events were filtered at a source, you would have a related change percentage of 7%.*

## When should I use Delivery Overview?
Delivery Overview is useful to diagnose delivery errors in the following scenarios:
- **When setting up a destination, tracking plan, or filter for the first time**: With Delivery Overview, you can verify that the data you're sending to a new destination, a new tracking plan, or a new filter arrives in your destination as expected.
- **When data is missing from your destination**: The pipeline view can help you see where your data is getting "stuck" on the way to your destination, which can help you quickly diagnose and address problems in your data pipeline.
- **When emission or delivery volume fluctuates out of expected norms**: Delivery Overview will highlight where the largest rate change(s) occurred and what events were associated with the change.

> info "Delivery Overview in Engage Destinations"
> Because Engage uses sources for multiple purposes, you can expect to see `filtered at destination` events with the integrations object in destinations linked to Engage. Engage uses the integrations object to route events to destinations you've added to your audiences, traits, and journey steps. As a result, some events aren't meant to be delivered by the destination, so the integrations object filters them.

## Where do I find Delivery Overview?
To view the Delivery Overview page:
1. Sign into Segment.
2. From the homepage, navigate to **Connection** > **Destinations** and click on the destination you'd like to investigate.
3. Select the **Delivery Overview** tab from the destination header.

## How do I use Delivery Overview?
To use Delivery Overview: 

1. Navigate to the destination you'd like to review, and select **Delivery Overview** from the destination header.
2. On the **Delivery Overview** tab, select a time period from the time picker. <br/> ___Optional___: *Turn the metric toggle off if you'd like to see the quantity of events as counts instead of percentages. Delivery Overview shows percentages by default.*
3. Select a success or discard step to view additional context about the events that passed through that step.

## How does Delivery Overview differ from other Segment monitoring and observability products?
With Source Debugger or Event Delivery, you can only verify that events are successfully making it from your source or to your destination. If events fail, you have to troubleshoot to see where in the pipeline your events are getting stuck. With Event Tester, you can verify that your event makes it from your source to your destination, but if the results aren't what you expected, you're stuck troubleshooting your source, filters, tracking plans, and destinations. 

With Delivery Overview, you can verify that your source receives your events, that any filters and tracking plans work as expected, and that events successfully make it to your destination. Any errors or unexpected behavior can be identified using the pipeline view, leading to quicker resolution. 

## How can I configure alerts?
During the Delivery Overview beta, you can use the Event Delivery alerting features (Delivery Alerts) by selecting the **Alerts** tab in the destination header.

## Why is the Delivery Overview page only available for cloud-mode destinations? 
Similar to Segment's [Event Delivery](/docs/connections/event-delivery/) feature, the Delivery Overview page is only available for server-side integrations (also known as cloud-mode destinations). You won't be able to use the Delivery Overview page for client side integrations (also known as device-mode destinations) because device-mode data is sent directly to the destination tool's API. In order to report on deliverability, data must be sent to destinations using a server-side connection. 

## Troubleshooting

The Delivery Overview pipeline steps Failed on Ingest, Filtered at Source, Filtered at Destination, and Failed Delivery display a [discard table](#discard-table) with information about why your events might have failed to reach their destination.

This table provides a list of all possible discard reasons available at each pipeline step. 

### Failed on Ingest

| Discard Reason    | Error Code      | What happened?          | Next steps                             |
| ----------------- | -------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------- |
| Empty batch result| `empty_batch_result` | No messages found in batch. After processing messages within batch, no messages were returned. | Reach out to friends@segment.com for assistance |
| Project not found | `project_not_found`  | No project found for the provided writeKey                                                     | Provide a valid [write key](/docs/connections/find-writekey/) |
| Source disabled   | `source_disabled`    | Source is not enabled                                                                          | Check basic source settings             |
| Batch is empty    | `empty_batch`        | Batch request contained no messages                                                            | [Don't send empty batches](/docs/connections/sources/catalog/libraries/server/http-api/#batch) |
| Multi user error  | `multi_user_error`   | One or more messages within a batch had an error. Some messages in the batch were published, while others were not | Review [individual payloads for each error](/docs/connections/sources/catalog/libraries/server/http-api/#errors) |
| No userID or anonymousID | `no_user_anon_id` | A userID or anonymousID was not provided | Check event payload and client instrumentation, [as a userID or anonymousID are required fields](/docs/getting-started/04-full-install/#anatomy-of-a-segment-message:~:text=Anatomy%20of%20a,for%20maximum%20flexibility) |
| Event not defined | `event_not_defined` | Track event did not have event name | Check event payload and client instrumentation, [as `event` is a required field](docs/connections/spec/track/#:~:text=Beyond%20the%20common,for%20more%20details) |
| Track event not a string | `event_not_string` | Track event name is not a string | Check event payload and client instrumentation, [as `event` is required to be a string](docs/connections/spec/track/#:~:text=Beyond%20the%20common,for%20more%20details) |
| Properties must be an object | `properties_not_object` | Properties field was not an object type | Check event payload and client instrumentation, [as `properties` is required to be an object data type](/docs/connections/spec/track/#:~:text=Beyond%20the%20common,reserved%20property%20names) |
| Traits must be an object | `traits_not_object` | Traits field was not an object type | Check event payload and client instrumentation, [as `traits` is required to be an object data type](/docs/connections/spec/identify/#:~:text=Beyond%20the%20common,reserved%20trait%20names) |
| Name must be a non-empty string | `name_not_string` | For Page or Screen calls, name field was empty or not a string | Check event payload and client instrumentation, [as `name` is required to be a `string` data type](/docs/connections/spec/page/#:~:text=Beyond%20the%20common,through%20your%20funnel) |
| Category must be a non-empty string | `category_not_string` | For Page or Screen calls, category field was an empty string or not a string | Check event payload and client instrumentation, [as `category` is required to be a `string` data type](/docs/connections/spec/page/#:~:text=Beyond%20the%20common,through%20your%20funnel) | 
| Identifier (anonymousId and/or userId) is required to be on all payloads | `id_required` | All payloads coming into Segment require a userId and/or an anonymousId | Ensure all payloads have a [userId and/or anonymousId](/docs/getting-started/04-full-install/#anatomy-of-a-segment-message:~:text=Anatomy%20of%20a,for%20maximum%20flexibility) |
| Consent Categories object must exist on "Segment Consent Preference" event | `consent_categoryprefences_should_exist` | The user passed a Segment Consent Preference Updated event without a categories object | Check event payload and client instrumentation, [as Segment Consent Preference Updated events](/docs/privacy/consent-management/consent-in-unify/#segment-consent-preference-updated-event) require a categories object |
| Consent Categories field must be an object for "Segment Consent Preference" event | `consent_categorypreferences_should_be_object` | User passed a consent change event with a categories field in the wrong format | Check event payload and client instrumentation, [as Segment Consent Preference Updated events](/docs/privacy/consent-management/consent-in-unify/#segment-consent-preference-updated-event) require the categories field to be an object | 
| Consent Categories field must be booleans for "Segment Consent Preference" event | `consent_categorypreferences_fields_should_be_bool` | User passed a consent change event with a categories field in the wrong format | Check event payload and client instrumentation | 
| Device advertisingId should be a string for "Segment Consent Preference" event | `device_advertisingid_should_be_string` | User passed a consent change event with an advertisingId in the wrong format | Check event payload and client instrumentation | 
| anonymousId must be set for "Segment Consent Preference" event | `consent_needs_anonymous_id_set` | User passed a consent change event without an anonymousId set | Check event payload and client instrumentation | 
| anonymousId invalid for "Segment Consent Preference" event | `anonymous_id_invalid` | User passed a consent change event with an invalid anonymousId | Check event payload and client instrumentation | 
| Failed to decode payload to webhook format | `bad_request` | The payload could have an incorrect content type, body, etc. | [Fix the payload and include any missing details](/docs/connections/functions/source-functions/#error-types). The payload could have an incorrect content type, body, etc. |
| Failed to read write key from URL | `unknown_source` | Failed to find source with {{write_key}} | Verify and use the [appropriate function webhook URL](/docs/connections/functions/source-functions/#:~:text=Once%20configured%2C%20find%20the%20webhook%20URL%20%2D%20either%20on%20the%20Overview%20or%20Settings%20%E2%86%92%20Endpoint%20page.) |
| Failed to find source from write key | `unknown_source` | Failed to find source with {{write_key}} | Verify and use the [appropriate function webhook URL](/docs/connections/functions/source-functions/#:~:text=Once%20configured%2C%20find%20the%20webhook%20URL%20%2D%20either%20on%20the%20Overview%20or%20Settings%20%E2%86%92%20Endpoint%20page.) |
| The source has missing write key | `unknown_source` | Failed to find source with {{write_key}} | Verify and use the [appropriate function webhook URL](/docs/connections/functions/source-functions/#:~:text=Once%20configured%2C%20find%20the%20webhook%20URL%20%2D%20either%20on%20the%20Overview%20or%20Settings%20%E2%86%92%20Endpoint%20page.) |
| Failed to decode internal settings of the source | `invalid_settings` | Function internal settings are invalid | [Fix the function settings](/docs/connections/functions/source-functions/#:~:text=Invalid%20Settings%3A%20A%20configuration%20error%20prevented%20Segment%20from%20executing%20your%20code.%20If%20this%20error%20persists%20for%20more%20than%20an%20hour%2C%20contact%20Segment%20Support) or reach out to friends@segment.com for more details |
| Failed to decrypt internal settings of the source | `invalid_settings` | Function internal settings are invalid | [Fix the function settings](/docs/connections/functions/source-functions/#:~:text=Invalid%20Settings%3A%20A%20configuration%20error%20prevented%20Segment%20from%20executing%20your%20code.%20If%20this%20error%20persists%20for%20more%20than%20an%20hour%2C%20contact%20Segment%20Support) or reach out to friends@segment.com for more details |
| Failed to parse content-type | `BAD_REQUEST` | The payload could have an incorrect content type | [Fix the payload](/docs/connections/functions/source-functions/#:~:text=Bad%20Request%3A%20is%20any%20error%20thrown%20by%20your%20code%20not%20covered%20by%20the%20other%20errors) and include any missing details. The Content-Type Header you provided may be incorrect. Ensure you're using `application/json` or `application/x-www-form-urlencoded` as your Content-Type Header value | 
| Failed to parse request body | `BAD_REQUEST` | The payload could have an incorrect body | [Fix the payload body](/docs/connections/functions/source-functions/#:~:text=Bad%20Request%3A%20is%20any%20error%20thrown%20by%20your%20code%20not%20covered%20by%20the%20other%20errors) to ensure it's proper JSON |
| Unsupported content-type | `BAD_REQUEST` | Unsupported content type. Acceptable content types are 'application/json' and 'application/x-www-form-urlencoded' | [Fix the payload](/docs/connections/functions/source-functions/#:~:text=Bad%20Request%3A%20is%20any%20error%20thrown%20by%20your%20code%20not%20covered%20by%20the%20other%20errors) and include any missing details. The Content-Type Header you provided is incorrect. Ensure you're using `application/json` or `application/x-www-form-encoded` as your Content-Type Header value |
| Source/project is disabled | `source_disabled` | The source or project instance is disabled | Enable the source or project instance |
| Source/project is disabled | `SOURCE_DISABLED` | The source or project instance is disabled | Enable the source or project instance |
| Workspace is locked out | `locked_workspace` | The workspace is disabled/locked | Reach out to friends@segment.com for assistance |
| Function is not deployed | `internal` | The function is not deployed properly | [Re-deplopy the function](/docs/connections/functions/source-functions/#:~:text=Save%20and%20deploy,update%20existing%20functions.) or reach out to friends@segment.com if issue persists |
| Unexpected DeployType. Supported is aws::lambda |  `internal` | The function is not deployed properly | [Re-deplopy the function](/docs/connections/functions/source-functions/#:~:text=Save%20and%20deploy,update%20existing%20functions.) or reach out to friends@segment.com if issue persists |
| Invalid deploy ID, missing lambda ARN | `internal` | The function is not deployed properly | [Re-deplopy the function](/docs/connections/functions/source-functions/#:~:text=Save%20and%20deploy,update%20existing%20functions.) or reach out to friends@segment.com if issue persists |
| Failed to call tracking API | `TRACKING_API_FAILED` | Failed to call tracking API | [Check the payload](/docs/connections/sources/catalog/libraries/server/http-api/#max-request-size:~:text=Max%20Request%20Size,limits%20are%20exceeded.) or reach out to friends@segment.com for more details |
| Failed to call set API - Client Closed | `SET_API_FAILED` | Failed to call set API | [Check the payload](/docs/connections/functions/source-functions/#:~:text=absolutely%20unique%20identifier.-,Set,in%20the%20Source%20Debugger.%20Segment%20only%20sends%20events%20to%20connected%20warehouses.,-Runtime%20and%20dependencies) or reach out to friends@segment.com for more details |
| Failed to call set API - Others | `SET_API_FAILED` | Failed to call set API | [Check the payload](/docs/connections/functions/source-functions/#:~:text=absolutely%20unique%20identifier.-,Set,in%20the%20Source%20Debugger.%20Segment%20only%20sends%20events%20to%20connected%20warehouses.,-Runtime%20and%20dependencies) or reach out to friends@segment.com for more details |
| Failed to encode into lambda input format (envelope) | `lambda_err` or `internal` | Internal encoding error. | Reach out to friends@segment.com for assistance |
| Failed to create lambda client | `lambda_err` | Unexpected lambda error | Reach out to friends@segment.com for assistance |
| Lambda API permanent error | `lambda_err` | Unexpected lambda error | Reach out to friends@segment.com for assistance |
| Lambda API temporary error | `lambda_err` | Unexpected lambda error | Reach out to friends@segment.com for assistance |
| Lambda API temporary error - too many requests | `too_many_requests` | Incoming event traffic rate [exceeded the expected rate](/docs/connections/rate-limits/) | Reach out to friends@segment.com for assistance |
| Function timeout | `FUNCTION_TIMEOUT` | Function timed out. | [Optimize the function code](/docs/connections/functions/usage/) | 
| Function RetryError | `RETRY_ERROR` | Retry error from function code. Retry attempt will be done. | [Function will be retried.](/docs/connections/functions/source-functions/#:~:text=Retry%3A%20Your%20code,Retry%20error%20occurs.) Segment's systems have a retry mechanism where an event will be retried 6 times over a four-hour period with exponential backoff |
| Function Error | `INVOKE_ERROR` | Failed to execute function | Check the function code for syntax and config issues or reach out to support if issue persists | 
| Failed to decode function output | `internal` | Internal error | Reach out to friends@segment.com for assistance |
| Function is not deployed | `BAD_DEPLOY` | The function is not deployed | [Re-deploy the function](/docs/connections/functions/source-functions/#:~:text=Save%20and%20deploy,update%20existing%20functions) and then reach out to friends@segment.com for assistance if issue persists | 
| Unexpected DeployType. Supported is aws::lambda | `BAD_DEPLOY` | The function is not deployed properly | [Re-deploy the function](/docs/connections/functions/source-functions/#:~:text=Save%20and%20deploy,update%20existing%20functions) and then reach out to friends@segment.com for assistance if issue persists |  
| Invalid deploy ID, missing lambda ARN | `BAD_DEPLOY` | The function is not deployed properly | [Re-deploy the function](/docs/connections/functions/source-functions/#:~:text=Save%20and%20deploy,update%20existing%20functions) and then reach out to friends@segment.com for assistance if issue persists |  


### Filtered at source

| Discard Reason    | Error code           | What happened?                                                                                 | Next steps                             |
| ----------------- | -------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------- |
| Common schema violation | `common_schema_violation` | Event violated the [Common JSON Schema of your Tracking Plan](https://segment.com/docs/protocols/tracking-plan/create/#common-json-schema) | Check event payload against the connected Tracking Plan Common JSON schema. If the event is passing the correct Information, then update the Tracking Plan Common JSON schema with the new information. <br> **OR:** <br> Update the source Configurations settings to allow events that violate the connected Tracking Plan Common JSON schema: <br> Source > Settings >  Schema Configurations > Advanced Blocking Controls (update option(s) to “Allow”) |
| Event setting | `event_setting` | Source configured to discard events of this type | Check [source schema filers](https://segment.com/docs/guides/filtering-data/#per-source-schema-integrations-filters) by navigating to Source > Schema |
| Schema violation | `schema_violation` | Source schema settings configured to block events that violate the connected Tracking Plan JSON schema | Check event payload against the connected Tracking Plan JSON schema. If the event is passing the correct Information, then update the Tracking Plan JSON Schema with the new information. <br> **OR:** <br> Update the source Configurations settings to allow events that violate the connected Tracking Plan JSON schema: <br> Source > Settings >  Schema Configurations > JSON Schema Violations (update option(s) to “Allow”) |
| Unplanned | `unplanned` | Event blocked due to unplanned event blocking; Source schema settings configured to block events not defined in connected Tracking Plan | Check source Configurations:<br> Settings > Schema Configurations > to allow unplanned events <br> **OR:** <br> Add the new event in the connected Tracking Plan to ensure it's recognized as a planned event | 
| Unplanned and schema violation | `unplanned_and_schema_violation` | Source schema settings configured to block events not defined in connected Tracking Plan and event violated the connected Tracking Plan JSON schema | Check source Configurations:<br> Settings > Schema Configurations > to allow unplanned events <br> **OR:** <br> Add the new event in the connected Tracking Plan to ensure it's recognized as a planned event |

| Discard Reason    | Error code           | What happened?                                                                                 | Next steps                             |
| ----------------- | -------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------- |
| Duplicate record deleted | `ErrRecordDuplicate` | Duplicate records have been found for the Unique Identifier configured | Change the Unique Identifier column that has unique values per record or construct a query that returns distinct records for the Unique Identifier configured. | 
| Record with NULL unique ID configured | `ErrRecordNullUniqueID` | While extracting the records, the Unique Identifier column was found to have a null value. | Make sure to select a Not null column to use as the unique identifier or construct a query that returns not null values for the Unique Identifier configured. | 
| Value for IdentifierColumn is required | `ErrRecordMissingID` | IdentifierColumn is a required field | Select a column to use as the unique identifier for each row and input the column name in the UI | 
| Value for IdentifierColumn must be text | `ErrRecordInvalidID` | The value returned for the Unique Identifier column is other than text | Construct a SQL query to cast the Identifier column to values in text and select the casted column as the Unique Identifier column. If possible, select an Identifier column that is a text data type. | 
| 