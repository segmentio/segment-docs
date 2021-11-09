---
title: Regional Segment (Europe)
hidden: true
---
{% include content/plan-grid.md name="data-residency" %}




Segment provides regional infrastructure across Europe, Middle East, Africa and Asia Pacific with [rate limits and SLA](/docs/connections/rate-limits/).

As Schrems II restricts the transfer of personal data to any processors established in countries outside of Europe, all data in European workspaces must be ingested, stored, processed and delivered locally within the EU. Workspaces you configure to use the EU West Data Processing Region ingest (for supported sources), process, filter, deduplicate, and archive data through Segment-hosted archives hosted in S3 AWS Dublin, Ireland.

> info ""
> [Cloud object sources](/docs/connections/sources/#object-cloud-sources) and cloud event sources aren't supported in EU workspaces. 


> info ""
> Regional Segment for Europe is currently in beta. Segment’s [First-Access and Beta terms](https://segment.com/legal/first-access-beta-preview/) govern this feature.

## Create a new workspace with a different region
To create a workspace with a different data processing region:
1. Log in to your segment account.
2. Click **New Workspace**.
3. Select your **Data processing region**. This determines the location in which Segment collects, processes, and stores data that’s sent to and from your workspace. You can choose from *US West* or *EU West*.  
4. Click **Create workspace**.

> info ""
> Once you create a workspace with a specified data processing region, you can't change the region. You must create a new workspace to change the region.


## Regional Data Ingestion
Regional Data Ingestion enables you to send data to Segment from both Device-mode and Cloud-mode sources through regionally hosted API ingest points. The regional infrastructure can fail across locations within a region, but never across regions.

Segment's EU instance only supports data ingestion from Dublin, Ireland through the `in.eu2.segmentapis.com/v1` endpoint.

### Set your Data Ingestion Region
To set your Data Ingestion Region:
1. Go to your source.
2. Select the **Settings** tab.
3. Click **Regional Settings**.
4. Choose your **Data Ingestion Region**.
    * If you’re in the *US West* data processing region, you can select from: Dublin, Singapore, Oregon, and Sydney.
    * If you're in the *EU West* data processing region, Segment’s EU instance only supports data ingestion from Dublin with the `events.eu1.segmentapis.com` endpoint.


### Client-side sources
You can configure Segment’s client-side SDKs for Javascript, iOS, Android, and React Native sources to send data to a regional host after you’ve updated the Data Ingestion Region in that source’s settings.

All regions are configured on a per-source basis. Configure the region for each source separately if you don't want to use the default region.

> info ""
> For workspaces that use the EU West Data Processing region, the Dublin Ingestion region is preselected for all sources.

All Segment client-side SDKs read this setting and update themselves automatically to send data to new endpoints when the app reloads. You don't need to change the code when you switch regions.

### Server-side and project sources
When you send data from a server-side or project source, you can use the `host` configuration parameter to send data to the desired region, which will be Dublin — `in.eu2.segmentapis.com/v1`

## Regional Data Storage
[Regional Data Storage](/docs/connections/data-residency/#regional-data-storage) isn't supported in EU workspaces.

## EU Updates   
### Data Lakes
Regional Segment in the EU changes the way you [configure the Data Lakes AWS environment](/docs/connections/storage/data-lakes/data-lakes-manual-setup/#iam-role).

### Warehouse Public IP Range
Use Segment's custom CIDR `3.251.148.96/29` while authorizing Segment to write in to your Redshift or Postgres port. [BigQuery](/docs/connections/storage/catalog/bigquery/#getting-started) doesn't require you to allow a custom IP address.
