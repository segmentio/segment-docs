---
title: Delivery Overview
---

Delivery Overview is a visual observability tool designed to help Segment users diagnose event delivery issues to any cloud-streaming destination receiving events from cloud-streaming sources. 

> info "Delivery Overview is currently in beta"
> This means that the Delivery Overview feature is in active development, and some functionality may change before it becomes generally available. Beta users of Delivery Overview won't have access to the Event Delivery setting. Delivery Overview does not currently support storage destinations, device-mode destinations, object sources, or event tracing. 

## Key features

Delivery Overview has three core features:
- [Pipeline view](#pipeline-view): a visual overview of each step your data takes during the delivery process
- [Breakdown table](#breakdown-table): contains more detail about the events that were processed at each pipeline step
- [Discard table](#discard-table): contains details about the events that failed or were filtered out of your process

### Pipeline view
The pipeline view provides insights into each point of failure where events may be filtered out. The first step (successfully received) and the last step (successful delivery)

- **Successfully received**: Events that Segment ingested from your source
- **Failed on ingest**: Events that were not ingested into Segment when emitted from the source
- **Filtered at source**: Events that were discarded due to schema settings or [Protocols](/docs/protocols/) tracking plans
- **Filtered at destination**: Events that were discarded due to destination filters
- **Failed delivery**: Events that have been discarded due to errors or unmet destination requirements
- **Successful delivery**: Events that were successfully delivered to the destination

### Breakdown table
The breakdown table provides you with greater detail about the selected events.

To open the breakdown table, select one of the steps in the pipeline view. 

This table displays the following details:
- **Event details**: The event name or event type (track call vs. identify call, for example)
- **Counts related**: How many of each event successfully made it through this pipeline step
- **Related change percentage**: Insight into how the event counts differ from the last comparable time range as a percentage<sup>1</sup>

<sup>1:</sup> *Segment calculates the related change percentage by subtracting the percent of events impacted in the previous time period from the percent of impacted events in the current time period. For example, if last week 15% of your events were filtered at a source, but this week, 22% of your events were filtered at a source, you would have a related change percentage of 7%.*

### Discard table
The discard table provides you with greater detail about the events that failed to deliver or were filtered out of your sources and destinations. 

To open the discard table, click on one of the discard steps (Failed on ingest, filtered at source, filtered at destination, or failed delivery.) If you click on a row in the discard table, you can see the breakdown table for the events that were discarded for a specific reason.

This table displays the following details:
- **Discard reason**: Any relevant error code, message, or description associated with the event's failure. When possible, Delivery Overview will link to any troubleshooting information you can use to get your events up and running again. Clicking on a discard reason brings you to the [breakdown table](#breakdown-table,) where you can see more detail about events that were discarded.
- **Counts related**: How many of each event were discarded in this pipeline step
- **Related change percentage**: Insight into how the event counts differ from the last comparable time range as a percentage<sup>1</sup>

<sup>1:</sup> *Segment calculates the related change percentage by subtracting the percent of events impacted in the previous time period from the percent of impacted events in the current time period. For example, if last week 15% of your events were filtered at a source, but this week, 22% of your events were filtered at a source, you would have a related change percentage of 7%.*

## Where do I find it?
To view the Delivery Overview page:
1. Sign into Segment.
2. From the homepage, navigate to **Connection** > **Destinations** and click on the destination you'd like to investigate.
3. Select the **Delivery Overview** tab from the destination header.

## How do I use Delivery Overview?
To use Delivery Overview: 

1. Open the destination you'd like to investigate, and select **Delivery Overview** from the destination header.
2. On the **Delivery Overview** tab, select a time period from the time selector. <br/> ___Optional___: *Turn the toggle off if you'd like to see the quantity of events as counts instead of percentages. Delivery Overview shows percentages by default.*
3. ?????

## FAQ

### How does Delivery Overview differ from other Segment monitoring and observability products?

### How do I know which of my destinations are cloud streaming destinations?

