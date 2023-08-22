---
title: Regional Segment
plan: regional
redirect_from:
  - '/connections/regional-segment/'
  - '/docs/connections/regional-segment-eu/'
  - '/docs/connections/data-residency/'
---

On July 10, 2023, the European Commission adopted the Adequacy Decision for the EU-US Data Privacy Framework ([DPF](https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_en){:target="_blank"}). This concludes that EU personal data transferred to the United States under the DPF is adequately protected when compared to the protection in the EU. With this adequacy decision in place, personal data can safely flow from the EU to US companies participating in the DPF without additional safeguards in place.

Twilio is certified under the DPF and relies on the DPF as its primary personal data transfer mechanism for EU-US personal data transfer. Twilio will rely on the DPF for and Swiss-US personal data transfers as soon as a corresponding Swiss adequacy decision is made. Twilio understands that interpretations of data residency are multi-faceted and some customers might still want their data to reside in the EU. Twilio Segment therefore offers a data residency solution outside of the DPF.

Segment offers customers the option to lead on data residency by providing regional infrastructure in both Europe and the United States. The default region for all users is in Oregon, United States. You can configure workspaces to use the EU West Data Processing Region to ingest (for supported sources), process, filter, deduplicate, and archive data through Segment-managed archives hosted in AWS S3 buckets located in Dublin, Ireland. The regional infrastructure has the same [rate limits and SLA](/docs/connections/rate-limits/) as the default region.

## Existing Workspaces
To ensure a smooth transition from a US-based Segment workspace to an EU workspace, Segment will provide additional support and tooling to help with the transition later this year. Use the form link below to provide more information about your current setup and goals for transitioning.

> info ""
> The Segment UI doesn't support moving workspaces between regions. To request help with this move, [complete the Data Residency Workspace Provisioning Flow form](https://segment.typeform.com/to/k5ADnN5e?typeform-source=segment.com#user_id=9hLQ2NuvaCLxFbdkMYbjFp){:target="_blank"}.

{% include components/ajs-cookie.html %}

## Regional Data Ingestion

Regional Data Ingestion enables you to send data to Segment from both Device-mode and Cloud-mode sources through regionally hosted API ingest points. The regional infrastructure can fail-over across locations within a region, but never across regions.

> info ""
> [Cloud event](/docs/connections/sources/#event-cloud-sources) sources aren't supported in EU workspaces.

### Client-side sources
You can configure Segment's client-side SDKs for JavaScript, iOS, Android, and React Native sources to send data to a regional host after you've updated the Data Ingestion Region in that source's settings. Segment's EU instance only supports data ingestion from Dublin, Ireland with the `events.eu1.segmentapis.com/` endpoint.

> info ""
> For workspaces that use the EU West Data Processing region, the Dublin Ingestion region is preselected for all sources.

To set your Data Ingestion Region:

1. Go to your source.
2. Select the **Settings** tab.
3. Click **Regional Settings**.
4. Choose your **Data Ingestion Region**.
    - If you're in the *US West* data processing region, you can select from: Dublin, Singapore, Oregon, and Sydney.
    - If you're in the *EU West* data processing region, Segment's EU instance only supports data ingestion from Dublin with the `events.eu1.segmentapis.com/` endpoint.

All regions are configured on a **per-source** basis. You'll need to configure the region for each source separately if you don't want to use the default region.

All Segment client-side SDKs read this setting and update themselves automatically to send data to new endpoints when the app reloads. You don't need to change code when you switch regions.

### Server-side and project sources
When you send data from a server-side or project source, you can use the `host` configuration parameter to send data to the desired region:
1. Oregon (Default) — `api.segment.io/v1`
2. Dublin — `events.eu1.segmentapis.com/`

## Create a new workspace with a different region

> info ""
> Use [this form](https://segment.typeform.com/to/k5ADnN5e#user_id=xxxxx){:target="_blank"} if you need to transition from your existing US-based workspace to an EU workspace.

To create a workspace with a different data processing region, reach out to the Segment Support team, and they will assist you with enabling the feature. Once the feature has been enabled, you'll be able to self-serve and create a new workspace in a different data processing region by following these steps:

1. Log in to your Segment account.
2. Click **New Workspace**.
3. Select your **Data processing region**. This determines the location in which Segment collects, processes, and stores data that's sent to and from your workspace. You can choose from *US West* or *EU West*.
4. Click **Create workspace**.

> info ""
> Once you create a workspace with a specified data processing region, you can't change the region. You must create a new workspace to change the region.

## EU Storage Updates
### Segment Data Lakes (AWS)
Regional Segment in the EU changes the way you [configure the Segment Data Lakes (AWS) environment](/docs/connections/storage/data-lakes/data-lakes-manual-setup/#iam-role)

### Warehouse Public IP Range
Use Segment's custom CIDR `3.251.148.96/29` while authorizing Segment to write in to your Redshift or Postgres port. [BigQuery](/docs/connections/storage/catalog/bigquery/#getting-started) doesn't require you to allow a custom IP address.

## Known Limitations
-   Regional Segment is currently limited to the EU. Future expansion of Regional Segment beyond the EU is under evaluation by Segment Product and R&D.

-   Edge proxies are deprecated. Customers using Regional Endpoints may see US-based IP addresses in event payloads, Segment recommends using the US-based endpoint (`api.segment.io`) to preserve client IP addresses. For EU customers, Segment recommends using a Regionalized EU workspace. For non-EU customers.

## Destination support and Regional endpoint availability

> info "Don't see a regional endpoint for a tool you're using?"
> As more of the partner tools you use (Sources and Destinations) start to support a regional endpoint, Segment will update this list. Your contact for that tool should have a timeline for when they're hoping to support regional data ingestion. You can also visit Segment's [support page](https://segment.com/help/contact/) for any Segment-related questions.

The following integrations marked with a ![Supports EU regional endpoints](/docs/images/supported.svg){:class="inline"} (checkmark) support EU Regional endpoints.

{% include content/regional-integrations-table.md %}
