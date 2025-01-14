---
title: Delivery Overview for Actions Destinations
---

Delivery Overview is a visual observability tool designed to help Segment users diagnose event delivery issues for any [Actions destinations](/docs/connections/destinations/actions/) receiving events from cloud-streaming sources.

Delivery Overview has three core features:

- [Pipeline view](#pipeline-view): A visual overview of each step your data takes during the delivery process \- from when your source receives audience events to when events are successfully delivered to your connected destination.  
- [Breakdown table](/docs/monitoring/delivery-overview): If you select a step in the pipeline view, you can see more detail about the events that were processed at each pipeline step.  
- [Discard table](/docs/monitoring/delivery-overview): If you select an event in a breakdown table, you can see more details about the events that failed or were filtered out of your process and allows you to inspect samples of them.

For more information about the breakdown and discard tables, see the [Delivery Overview](/docs/monitoring/delivery-overview) documentation.

## Pipeline view

The pipeline view for Actions destination includes the following steps:

![A screenshot of the pipeline view for an Actions destination, with 1.17 million events successfully received by a source, and 3.03 million events successfully synced to a destination](/docs/monitor/delivery-overview/images/delivery-overview-storage-destinations.jpeg)

- **Successfully received**: Events that Segment ingested from your source. You can filter these events by event type, event name, app version, and [enrichment status](/docs/unify/data-graph/linked-events/).  
- **Failed on ingest**: Events that Segment received, but were dropped due to internal data validation rules.  
- **Filtered at source**: Events that were discarded due to schema settings or [Protocols](/docs/protocols/) Tracking Plans.  
- **Mapping dropdown**: Select a [mapping](/docs/connections/destinations/actions/#customize-mappings) to filter the events in the Filtered at destination, Failed delivery and Successful delivery pipeline steps.  
- **Filtered at destination**: Events that were discarded due to [Destination Filters](/docs/guides/filtering-data/#destination-filters), [filtering in the Integrations object](/docs/guides/filtering-data/#filtering-with-the-integrations-object), [Destination Insert functions](/docs/connections/functions/insert-functions/), or [per source schema integration filters](/docs/guides/filtering-data/#per-source-schema-integrations-filters). If your Action is set to only send Identify events, all other event types will be filtered out. Actions destinations with incomplete triggers or disabled mappings are filtered out at this step. [Consent Management](/docs/privacy/consent-management/) users also see events discarded due to consent preferences.  
- **Retry count**: The number of events currently pending retry.  
- **Failed delivery**: Events that have been discarded due to errors or unmet destination requirements.  
- **Successful delivery**: Events that were successfully delivered to the destination.