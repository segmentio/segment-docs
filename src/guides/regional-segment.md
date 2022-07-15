---
title: Regional Segment
redirect_from:
  - '/connections/regional-segment/'
  - '/docs/connections/regional-segment-eu/'
  - '/docs/connections/data-residency/'
---
{% include content/plan-grid.md name="data-residency" %}

As Schrems II restricts the transfer of personal data to any processors established in countries outside of Europe, all data in European workspaces must be ingested, stored, processed and delivered locally within the EU. Segment offers customers the option to lead on data residency by providing regional infrastructure in both Europe and the United States.

The default region for all users is in Oregon, United States. Workspaces can be configured to use the EU West Data Processing Region ingest (for supported sources), process, filter, deduplicate, and archive data through Segment-hosted archives hosted in S3 AWS Dublin, Ireland. The regional infrastructure has the same [rate limits and SLA](/docs/connections/rate-limits/) as the default region.

## Existing Workspaces
To ensure a smooth transition from a US-based Segment workspace to an EU workspace, Segment will provide additional support and tooling to help with the transition later this year. Use the form link below to provide more information about your current setup and goals for transitioning.

{% include components/ajs-cookie.html %}

## Regional Data Ingestion

Regional Data Ingestion enables you to send data to Segment from both Device-mode and Cloud-mode sources through regionally hosted API ingest points. The regional infrastructure can fail-over across locations within a region, but never across regions.

> info ""
> [Cloud object sources](/docs/connections/sources/#object-cloud-sources) and cloud event sources aren't supported in EU workspaces.

### Client-side sources
You can configure Segment's client-side SDKs for JavaScript, iOS, Android, and React Native sources to send data to a regional host after you've updated the Data Ingestion Region in that source's settings. Segment's EU instance only supports data ingestion from Dublin, Ireland with the `events.eu1.segmentapis.com/v1` endpoint.

> info ""
> For workspaces that use the EU West Data Processing region, the Dublin Ingestion region is preselected for all sources.

To set your Data Ingestion Region:

1. Go to your source.
2. Select the **Settings** tab.
3. Click **Regional Settings**.
4. Choose your **Data Ingestion Region**.
    - If you're in the *US West* data processing region, you can select from: Dublin, Singapore, Oregon, and Sydney.
    - If you're in the *EU West* data processing region, Segment's EU instance only supports data ingestion from Dublin with the `events.eu1.segmentapis.com/v1` endpoint.

All regions are configured on a **per-source** basis. You'll need to configure the region for each source separately if you don't want to use the default region.

All Segment client-side SDKs read this setting and update themselves automatically to send data to new endpoints when the app reloads. You don't need to change code when you switch regions.

### Server-side and project sources
When you send data from a server-side or project source, you can use the `host` configuration parameter to send data to the desired region:
1. Oregon (Default) — `api.segment.io/v1`
2. Dublin — `events.eu1.segmentapis.com/v1/`

## Create a new workspace with a different region

> info ""
> Use [this form](https://segment.typeform.com/to/k5ADnN5e#user_id=xxxxx){:target="_blank"} if you need to transition from your existing US-based workspace to an EU workspace.

To create a workspace with a different data processing region:

1. Log in to your Segment account.
2. Click **New Workspace**.
3. Select your **Data processing region**. This determines the location in which Segment collects, processes, and stores data that's sent to and from your workspace. You can choose from *US West* or *EU West*.
4. Click **Create workspace**.

> info ""
> Once you create a workspace with a specified data processing region, you can't change the region. You must create a new workspace to change the region.

## EU Storage Updates
### Data Lakes
Regional Segment in the EU changes the way you [configure the Data Lakes AWS environment](/docs/connections/storage/data-lakes/data-lakes-manual-setup/#iam-role)

### Warehouse Public IP Range
Use Segment's custom CIDR `3.251.148.96/29` while authorizing Segment to write in to your Redshift or Postgres port. [BigQuery](/docs/connections/storage/catalog/bigquery/#getting-started) doesn't require you to allow a custom IP address.

## Destination support and Regional endpoint availability

> info "Don't see a regional endpoint for a tool you're using?"
> As more of the partner tools you use (Sources and Destinations) start to support a regional endpoint, Segment will update this list. Your contact for that tool should have a timeline for when they're hoping to support regional data ingestion. You can also visit Segment's [support page](https://segment.com/help/contact/) for any Segment-related questions.

The following integrations marked with a ![Supports EU regional endpoints](/docs/images/supported.svg){:class="inline"} (checkmark) support EU Regional endpoints.

{% include content/regional-integrations-table.md %}
