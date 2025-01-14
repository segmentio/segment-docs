---
title: Delivery Overview for Storage Destinations
---

Delivery Overview is a visual observability tool designed to help Segment users diagnose event delivery issues for any storage destination receiving events from cloud-streaming sources.

Delivery Overview has three core features:

- [Pipeline view](#pipeline-view): A visual overview of each step your data takes during the delivery process \- from when your source receives audience events to when events are successfully delivered to your connected destination.  
- [Breakdown table](/docs/monitoring/delivery-overview#breakdown-table): If you select a step in the pipeline view, you can see more detail about the events that were processed at each pipeline step.  
- [Discard table](/docs/monitoring/delivery-overview#discard-table): If you select an event in a breakdown table, you can see more details about the events that failed or were filtered out of your process and allows you to inspect samples of them.

For more information about the breakdown and discard tables, see the [Delivery Overview](/docs/monitoring/delivery-overview) documentation.

Storage destinations

The pipeline view for storage destinations includes the following steps:

- **Successfully received**: Events that Segment ingested from your source.  
- **Failed on ingest**: Events that Segment received, but were dropped due to internal data validation rules.  
- **Filtered at source**: Events that were discarded due to schema settings or [Protocols](/docs/protocols/) Tracking Plans.  
- **Filtered at destination**: Events that were discarded due to [Destination Filters](/docs/guides/filtering-data/#destination-filters), [filtering in the Integrations object](/docs/guides/filtering-data/#filtering-with-the-integrations-object), [Destination Insert functions](/docs/connections/functions/insert-functions/), or [per source schema integration filters](/docs/guides/filtering-data/#per-source-schema-integrations-filters). [Consent Management](/docs/privacy/consent-management/) users also see events discarded due to consent preferences.  
- **Events to warehouse rows**: A read-only box that shows the point in the delivery process where Segment converts events into warehouse rows.  
- **Failed to sync**: Syncs that either failed to sync or were partially successful. Selecting this step takes you to a table of all syncs with one or more failed collections. Select a sync from the table to view the discard reason, any collections that failed, the status, and the number of rows that synced for each collection. For information about common errors, see Ware  
- **Successfully synced**: A record of all successful or partially successful syncs made with your destination. To view the reason a partially successfully sync was not fully successful, see the Failed to sync step.