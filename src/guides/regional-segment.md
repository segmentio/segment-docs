---
title: Regional Segment
plan: regional
redirect_from:
  - '/connections/regional-segment/'
  - '/docs/connections/regional-segment-eu/'
  - '/docs/connections/data-residency/'
---

On July 10, 2023, the European Commission adopted the Adequacy Decision for the EU-US Data Privacy Framework ([DPF](https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_en){:target="_blank"}). This concludes that EU personal data transferred to the United States under the DPF is adequately protected when compared to the protection in the EU. With this adequacy decision in place, personal data can safely flow from the EU to US companies participating in the DPF without additional safeguards in place.

Twilio is certified under the DPF and relies on it as the primary mechanism for EU–US personal data transfers. Twilio will also rely on the DPF for Swiss–US transfers once a corresponding Swiss adequacy decision is in place. Twilio understands that interpretations of data residency are multi-faceted and some customers might still want their data to reside in the EU. Twilio Segment therefore offers a data residency solution outside of the DPF.

While the DPF enables compliant transfers, some customers may still require that their data remain within the EU. For those cases, Twilio Segment offers a data residency solution outside of the DPF.

Segment provides regional infrastructure in both the United States and Europe. By default, new workspaces use U.S. infrastructure (based in Oregon). 

If you need EU data residency, you must either create a workspace in the EU or request a migration for an existing workspace. Only EU workspaces store data exclusively in the EU.

## Regional Data Ingestion

Regional Data Ingestion enables you to send data to Segment from both Device-mode and Cloud-mode sources through regionally hosted API ingest points. The regional infrastructure can fail-over across locations within a region, but never across regions.

### Cloud-event sources

{% include content/eu-cloud-event-sources.html %}

### Configuring Segment Sources

To send data from mobile apps to the correct region, you must update your SDK configuration to use the right endpoint. You must do this even if your source settings are already configured in Segment itself.

> warning "Use the correct endpoint"
> Starting in Q2 2025, Segment will reject data sent to the wrong region. Your SDK must be configured to send data to the correct regional endpoint to prevent dropped events.

Segment's EU instance only supports data ingestion through the Dublin region, using this endpoint:

`https://events.eu1.segmentapis.com/v1`

#### SDK configuration examples

Use the examples in this section to configure mobile SDKs to point to the EU endpoint. These examples use JavaScript-style syntax for clarity. Refer to your platform's documentation for exact implementation.

{% codeexample %}
{% codeexampletab iOS/Android/Xamarin/Flutter %}
```js
// Pseudocode example — set these options using your platform's syntax
const analytics = new Analytics({
  writeKey: '<YOUR_WRITE_KEY>',
  apiHost: "events.eu1.segmentapis.com/v1",
  // other options...
})
```
{% endcodeexampletab %}

{% codeexampletab React Native %}
```js
// Pseudocode example — set these options using your platform's syntax
const analytics = new Analytics({
  writeKey: '<YOUR_WRITE_KEY>',
  proxy: "https://events.eu1.segmentapis.com/v1",
  useSegmentEndpoints: true,
  // other options...
})
```
{% endcodeexampletab %}
{% endcodeexample %}

If you're using the Segment EU endpoint with Analytics-C# source, you must manually append `/v1` to the URL (like `events.eu1.segmentapis.com/v1`).

For workspaces using the `EU WEST` data processing region, the Dublin ingestion region is preselected for all sources.

To route data from your client-side sources to the correct region, you'll need to make two updates:

1. Update your SDK configuration (in code).
2. Update your source settings (in Segment).

#### Update your SDK configuration

Segment client-side SDKs (like Analytics.js, iOS, and Android) typically fetch updated settings, including the right ingestion endpoint. However, mobile apps may not always apply these changes right away.

To avoid data being sent to the wrong region, **you must add the correct endpoint configuration directly in your SDK setup.**



Use the following code examples to point your SDK to the EU endpoint:

{% codeexample %}
{% codeexampletab iOS/Android/Xamarin/Flutter %}
```js
// Pseudocode example — set these options using your platform's syntax
const analytics = new Analytics({
  writeKey: '<YOUR_WRITE_KEY>',
  apiHost: "events.eu1.segmentapis.com/v1",
  // other options...
})
```
{% endcodeexampletab %}

{% codeexampletab React Native %}
```js
// Pseudocode example — set these options using your platform's syntax
const analytics = new Analytics({
  writeKey: '<YOUR_WRITE_KEY>',
  proxy: "https://events.eu1.segmentapis.com/v1",
  useSegmentEndpoints: true,
  // other options...
})
```
{% endcodeexampletab %}
{% endcodeexample %}

#### 2. Update source settings in Segment

After making the required changes in your code, update the source's settings in the Segment UI:

1. Go to your source.
2. Select the **Settings** tab.
3. Click **Regional Settings**.
4. Choose your **Data Ingestion Region**.
    - If you're in the *US West* data processing region, you can select from: Dublin, Singapore, Oregon, and Sydney.
    - If you're in the *EU West* data processing region, Segment's EU instance only supports data ingestion from Dublin with the `events.eu1.segmentapis.com/` endpoint.

All regions are configured on a **per-source** basis. You’ll need to set the region for each source individually if you don’t want to rely on the default.

> info ""
> For workspaces that use the EU West Data Processing region, the Dublin Ingestion region is preselected for all sources.

### Server-side and project sources
When you send data from a server-side or project source, you can use the `host` configuration parameter to send data to the desired region:
1. Oregon (Default) — `https://events.segmentapis.com/v1`
2. Dublin — `https://events.eu1.segmentapis.com/`

> success ""
> If you are using the Segment EU endpoint with an Analytics-C# source, you must manually append `v1` to the URL. For instance, `events.eu1.segmentapis.com/v1`.

Here is an example of how to set the host:

```json
Analytics.Initialize("<YOUR WRITEKEY HERE>", new Config().SetHost("https://events.eu1.segmentapis.com (https://events.eu1.segmentapis.com/)"));
```

## Create a new workspace with a different region

> info ""
> Use [this form](https://segment.typeform.com/to/k5ADnN5e#user_id=xxxxx){:target="_blank"} if you need to transition from your existing US-based workspace to an EU workspace.

Segment workspaces use US data residency by default. If you need EU data residency, reach out to your Segment account executive to enable EU workspace creation. Once the feature is enabled, you can create a new EU workspace by following these steps:

1. Log in to your Segment account.
2. Click **New Workspace**.
3. Select your **Data processing region**. This determines where Segment collects, processes, and stores the data sent to and from your workspace. You can choose between US West and EU West.
4. Click **Create workspace**.

> info ""
> Once you create a workspace, you can't change its data processing region. You’ll need to create a new workspace if you want to switch regions.

Sources within EU workspaces deliver Segment data to EU-based AWS storage. Follow the instructions in that sections that follow to make sure your sources are configured correctly.

## EU Storage Updates
### Segment Data Lakes (AWS)
Regional Segment in the EU changes the way you [configure the Segment Data Lakes (AWS) environment](/docs/connections/storage/data-lakes/data-lakes-manual-setup/#iam-role)

### Warehouse Public IP Range
Use Segment's custom CIDR `3.251.148.96/29` while authorizing Segment to write in to your Redshift or Postgres port. [BigQuery](/docs/connections/storage/catalog/bigquery/#getting-started) doesn't require you to allow a custom IP address.

## Known Limitations
-   Regional Segment is currently limited to the EU. Future expansion of Regional Segment beyond the EU is under evaluation by Segment Product and R&D.

-   Edge proxies are deprecated. Customers using Regional Endpoints may see US-based IP addresses in event payloads, Segment recommends using the US-based endpoint (`api.segment.io`) to preserve client IP addresses. For EU customers, Segment recommends using a Regionalized EU workspace.

## Destination support and Regional endpoint availability

> info "Don't see a regional endpoint for a tool you're using?"
> As more of the partner tools you use (Sources, Destinations, and Warehouses) start to support a regional endpoint, Segment will update this list. Your contact for that tool should have a timeline for when they're hoping to support regional data ingestion. You can also visit Segment's [support page](https://segment.com/help/contact/){:target="_blank"} for any Segment-related questions.

The following integrations marked with a ![Supports EU regional endpoints](/docs/images/supported.svg){:class="inline"} (checkmark) support EU Regional endpoints.

> warning "Integrations available in EU workspaces do not guarantee data residency"
> Before you configure an integration, you should check directly with the integration partner to determine if they offer EU endpoints.

{% include content/regional-integrations-table.md %}

## Source Regional support

> info "Don't see regional support for a source you're using?"
> As more of the partner Sources start to support posting data to our regional endpoint, Segment will update this list. Your contact for that tool should have a timeline for when they're hoping to support regional data ingestion. You can also visit Segment's [support page](https://segment.com/help/contact/) for any Segment-related questions.

The following Sources marked with a ![Supports EU regional endpoints](/docs/images/supported.svg){:class="inline"} (checkmark) are supported in EU workspaces.

{% include content/regional-sources-table.md %}
