---
title: Delivery Overview
---

Delivery Overview is a visual observability tool designed to help Segment users diagnose event delivery issues to any cloud-streaming destination receiving events from cloud-streaming sources. 

> info "Delivery Overview is currently in beta"
> This means that the Delivery Overview feature is in active development, and some functionality may change before it becomes generally available. Beta users of Delivery Overview won't have access to the Event Delivery tab. Delivery Overview does not currently support storage destinations, device-mode destinations, object sources, or event tracing. 

## Key features

Delivery Overview has three core features:
- [Pipeline view](#pipeline-view): a visual overview of each step your data takes during the delivery process
- [Breakdown table](#breakdown-table): contains more detail about the events that were processed at each pipeline step
- [Discard table](#discard-table): contains details about the events that failed or were filtered out of your process

You can refine these tables using the time picker and the metric toggle, located under the destination header. With the time picker, you can specify a time period (last 10 minutes, 1 hour, 24 hours, or 7 days) for which you'd like to see data. With the metric toggle, you can switch between seeing metrics represented as percentages (for example, *85% of events* or *a 133% increase in events*) or as counts (*13 events* or *an increase of 145 events*.) Delivery Overview shows percentages by default.

### Pipeline view
The pipeline view provides insights into each point of failure where events may be filtered out. If you click on the first step (successfully received) and the last step (successful delivery) you can view the breakdown table. If you click any of the discard steps, you can view the discard table.

The pipeline view shows the following steps:
- **Successfully received**: Events that Segment ingested from your source
- **Failed on ingest**: Events that were not ingested into Segment when emitted from the source
- **Filtered at source**: Events that were discarded due to schema settings or [Protocols](/docs/protocols/) tracking plans
- **Filtered at destination**: Events that were discarded due to destination filters
- **Failed delivery**: Events that have been discarded due to errors or unmet destination requirements
- **Successful delivery**: Events that were successfully delivered to the destination

### Breakdown table
The breakdown table provides you with greater detail about the selected events.

To open the breakdown table, select either the first step in the pipeline view (successfully received,) the last step in the pipeline view (successful delivery,) or select a discard step and then click on a discard reason. 

The breakdown table displays the following details:
- **Event type**: The event type (track call vs. identify call, for example)
- **Event count**: How many of each event either successfully made it through this pipeline step (in the case of the first or last steps in the pipeline view) or were filtered out (if you access it from a discard table)
- **% Change**: Insight into how the event counts differ from the last comparable time range as a percentage<sup>1</sup>

<sup>1:</sup> *Segment calculates the related change percentage by subtracting the percent of events impacted in the previous time period from the percent of impacted events in the current time period. For example, if last week 15% of your events were filtered at a source, but this week, 22% of your events were filtered at a source, you would have a related change percentage of 7%.*

### Discard table
The discard table provides you with greater detail about the events that failed to deliver or were filtered out of your sources and destinations. 

To open the discard table, click on one of the discard steps. If you click on a row in the discard table, you can see the breakdown table for the discarded events.

The discard table displays the following details:
- **Discard reason**: Any relevant error code, message, or description associated with the event's failure. When possible, Delivery Overview will link to any troubleshooting information you can use to get your events up and running again. Clicking on a discard reason brings you to the [breakdown table](#breakdown-table,) where you can see more detail about discarded events.
- **Event count**: How many of each event were discarded in this pipeline step
- **% Change**: Insight into how the event counts differ from the last comparable time range as a percentage<sup>1</sup>

<sup>1:</sup> *Segment calculates the related change percentage by subtracting the percent of events impacted in the previous time period from the percent of impacted events in the current time period. For example, if last week 15% of your events were filtered at a source, but this week, 22% of your events were filtered at a source, you would have a related change percentage of 7%.*

## When should I use Delivery Overview?
Delivery Overview is useful to diagnose delivery errors in the following scenarios:
- **When setting up a destination, tracking plan, or filter for the first time**: With Delivery Overview, you can verify that the data you're sending to a new destination, a new tracking plan, or a new filter arrives in your destination as expected.
- **When data is missing from your destination**: The pipeline view can help you see where your data is getting "stuck" on the way to your destination, which can help you quickly diagnose and address problems in your data pipeline.

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
With Source Debugger or Event Delivery, you can only verify that events are successfully making it to your source or destination. If events fail, you have to troubleshoot to see where in the pipeline your events are getting stuck. With Event Tester, you can verify that your event makes it from your source to your destination, but if the results aren't what you expected, you're stuck troubleshooting your source, filters, tracking plans, and destinations. 

With Delivery Overview, you can verify that your source receives your events, that any filters and tracking plans work as expected, and that events successfully make it to your destination. Any errors or unexpected behavior can be identified using the pipeline view, leading to quicker resolution. 

## How can I configure alerts?
During the Delivery Overview beta, you can use the Event Delivery alerting features (Delivery Alerts) by selecting the **Alerts** tab in the destination header.

