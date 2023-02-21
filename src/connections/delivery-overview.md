---
title: Delivery Overview
---

Delivery Overview is a visual observability tool designed to help Segment users diagnose event delivery issues to any cloud-streaming destination receiving events from cloud-streaming sources. 

> info "Delivery Overview is currently in beta"
> This means that the Delivery Overview feature is in active development, and some functionality may change before it becomes generally available. Beta users of Delivery Overview won't have access to the Event Delivery setting. Delivery Overview does not currently support storage destinations, device-mode destinations, object sources, or event tracing. 

## Key features

Delivery Overview has three main features: the [pipeline view](#pipeline-view), or a visual overview of each step your data takes during the delivery process, the [breakdown table](#breakdown-table), which goes into more detail about the events that were processed at each pipeline step, and the [discard table](#discard-table), which goes into more detail about the events that failed or were filtered out of your process. 

### Pipeline view
The pipeline view provides insights into each point of failure where events may be filtered out:
- **Successfully received**: Events that Segment ingested from your source
- **Failed on ingest**: Events that were not ingested into Segment when emitted from the source
- **Filtered at source**: Events that were discarded due to schema settings or [Protocols](/docs/protocols/)
- **Filtered at destination**: Events that were discarded due to destination filters
- **Failed delivery**: Events that have been discarded due to errors or unmet destination requirements
- **Successful delivery**: Events that were successfully delivered to the destination

### Breakdown table
The breakdown table provides you with greater detail about the events that passed through each step. To open the breakdown table, select one of the steps in the pipeline view. 

This table displays the following details:
- **Event details**: The event names and type of events involved (track call vs. identify call, for example)
- **Counts related**: How many of each event successfully made it through this pipeline step
- **Related change percentage**: Insight into how the event counts differ from the last comparable time range as a percentage<sup>1</sup>

<sup>1:</sup> *Segment calculates the related change percentage by subtracting the percent of events impacted in the previous time period from the percent of impacted events in the current time period. For example, if last week 15% of your events were filtered at a source, but this week, 22% of your events were filtered at a source, you would have a related change percentage of 7%.*

<!--- Is this abs value? or can you have negative% related change percentage--->


### Discard table
The discard table provides you with greater detail about the events that were discarded from your source or weren't successfully delivered to your destination during the selected time period. 

This table displays the following details:
- **Discard reason**: Any relevant error code, message, or description associated with the event's failure. When possible, Delivery Overview will link to any troubleshooting information you can use to get your events up and running again. Clicking on any discard reason brings you to the [breakdown table](#breakdown-table,) where you can see more detail about events that have a certain discard reason.
- **Counts related**: How many of each event were discarded in this pipeline step
- **Related change percentage**: Insight into how the event counts differ from the last comparable time range as a percentage<sup>1</sup>

<sup>1:</sup> *Segment calculates the related change percentage by subtracting the percent of events impacted in the previous time period from the percent of impacted events in the current time period. For example, if last week 15% of your events were filtered at a source, but this week, 22% of your events were filtered at a source, you would have a related change percentage of 7%.*

## View Delivery Overview
To view the Delivery Overview page:
1. Sign into Segment.
2. From the homepage, navigate to **Connection** > **Destinations** and click on the destination you'd like to see delivery information for.
3. Select the **Delivery Overview** page from the destination header.

### View discarded events
To view samples of discarded events on the Delivery Overview page:
1. Select the pipeline step you'd


## FAQ

### How does Delivery Overview differ from other Segment monitoring and observability products?

### How do I know which of my destinations are cloud streaming destinations?

