---
title: Regional Segment
plan: regional
redirect_from:
  - '/connections/regional-segment/'
  - '/docs/connections/regional-segment-eu/'
  - '/docs/connections/data-residency/'
---

On July 10, 2023, the European Commission adopted the Adequacy Decision for the EU-US Data Privacy Framework ([DPF](https://commission.europa.eu/document/fa09cbad-dd7d-4684-ae60-be03fcb0fddf_en){:target="_blank"}). This concludes that EU personal data transferred to the United States under the DPF is adequately protected when compared to the protection in the EU. With this adequacy decision in place, personal data can safely flow from the EU to US companies participating in the DPF without additional safeguards in place.

Twilio is certified under the DPF and relies on it as the primary mechanism for EU–US personal data transfers. Twilio will also rely on the DPF for Swiss–US transfers once a corresponding Swiss adequacy decision is in place. Twilio understands that interpretations of data residency are multi-faceted and some customers might still want their data to reside in the EU.

While the DPF enables compliant transfers, some customers may still require that their data remain within the EU. For those cases, Twilio Segment offers a data residency solution outside of the DPF.

Segment provides regional infrastructure in both the United States and Europe. By default, new workspaces use U.S. infrastructure (based in Oregon). 

If you need EU data residency, you must either create a workspace in the EU or request a migration for an existing workspace. Only EU workspaces store data exclusively in the EU.

## Ingestion behavior and failover

Regional Data Ingestion enables you to send data to Segment from both Device-mode and Cloud-mode sources through regionally hosted API ingest points. The regional infrastructure can fail-over across locations within a region, but never across regions.

## Set up your sources for EU or US workspaces

Some Segment SDKs require specific endpoint configuration to send data to the correct regional infrastructure. This section provides setup details for mobile SDKs, server-side SDKs, custom integrations, and supported cloud sources.

> info "Using Analytics.js?"
> Segment's Analytics.js SDK automatically uses the latest source settings, including the correct ingestion endpoint. You don't need to configure a regional endpoint manually for this SDK.

### SDK configuration summary

Use this table as a quick reference to determine how to configure your source or SDK to send data to the correct endpoint:

| Integration                       | Endpoint configuration                                                          | Notes                                                                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| iOS / Android / Flutter / Xamarin | `apiHost: "events.eu1.segmentapis.com/v1"`                                      | Set directly in SDK config                                                                                                                                   |
| React Native                      | `proxy: "https://events.eu1.segmentapis.com/v1"`<br>`useSegmentEndpoints: true` | Both values are required for proper routing                                                                                                                  |
| Node.js / Python / Java           | `host: "https://events.eu1.segmentapis.com"`                                    | Do **not** include `/v1` in host for these SDKs                                                                                                              |
| C# SDK                            | `host: "https://events.eu1.segmentapis.com/v1"`                                 | Manually append `/v1` to the host URL                                                                                                                        |
| Custom HTTP requests              | `https://events.eu1.segmentapis.com/v1`                                         | Write key must belong to an EU workspace                                                                                                                     |
| Cloud sources                     | No configuration required                                                       | Only [Amazon S3](/docs/connections/sources/catalog/cloud-apps/amazon-s3) and [Iterable](/docs/connections/sources/catalog/cloud-apps/iterable) are supported |

### Configuring Segment sources for mobile SDKs

To send data from mobile apps to the correct region, you have to update your SDK configuration to use the right endpoint. You must do this even if your source settings are already configured in Segment itself.

> warning "Use the correct endpoint"
> Beginning April 3, 2025, Segment will reject data sent to the wrong region. Make sure your mobile SDK is configured to send data to the correct endpoint for your workspace region.

Segment's EU instance only accepts data through its Dublin-based endpoint:

```
https://events.eu1.segmentapis.com/v1
```

#### Mobile SDK configuration examples

Use the examples in this section to configure mobile SDKs to point to the EU endpoint. These examples use JavaScript-style syntax for clarity. Refer to your platform's documentation for exact implementation.

{% codeexample %}
{% codeexampletab iOS/Android/Xamarin/Flutter etc %}
```js
const analytics = new Analytics({
  writeKey: '<YOUR_WRITE_KEY>', // Required: your source's write key from Segment
  apiHost: "events.eu1.segmentapis.com/v1", // Routes data through EU endpoint
  // You can also configure options like flushInterval, debug, or storage providers
})
```
{% endcodeexampletab %}

{% codeexampletab React Native %}
```js
const analytics = new Analytics({
  writeKey: '<YOUR_WRITE_KEY>', // Required: must belong to an EU workspace
  proxy: "https://events.eu1.segmentapis.com/v1", // Required for EU data routing
  useSegmentEndpoints: true, // Ensures proxy is used instead of default US host
  // You can also set options like flushInterval or trackAppLifecycleEvents
})
```
{% endcodeexampletab %}
{% endcodeexample %}

If you're using the Segment EU endpoint with the [Analytics-C# source](/docs/connections/sources/catalog/libraries/server/csharp/), you must manually append `/v1` to the URL (like `events.eu1.segmentapis.com/v1`).

For workspaces using the `EU WEST` data processing region, the Dublin ingestion region is preselected for all sources.

Once you finish updating your SDK(s), make sure your [source settings in Segment](#updating-source-settings-in-segment) also reflect the correct region. 

### Configure server-side and custom Segment sources 

If you're using Segment’s server-side SDKs (like Node.js, Python, and Java) or making direct HTTP API requests, you’ll need to update the endpoint your data is sent to. This is required to match your workspace’s region and avoid rejected traffic.

> warning "Use the correct endpoint"
> Beginning April 3, 2025, Segment will reject data sent to the wrong region. Make sure your server-side SDKs and custom integrations are configured to send data to the correct endpoint for your workspace region.

#### Server-side SDK configuration examples

Use this example to configure server-side SDKs like Node.js, Python, and Java:

```js
// Example configuration — adjust for your SDK's syntax
const analytics = new Analytics({
  writeKey: '<YOUR_WRITE_KEY>', // Required: must belong to an EU workspace
  host: "https://events.eu1.segmentapis.com", // EU endpoint — do not include /v1 for these SDKs
  // You can configure other options like flushInterval or request retries
})
```

> info "Endpoint format for server-side SDKs"
> Most SDKs handle the `/v1` path internally. However, only the C# SDK and custom HTTP requests require you to add `/v1` manually, like `https://events.eu1.segmentapis.com/v1`.

#### Custom HTTP requests

If you're sending data using custom HTTP requests or through a proxy and you’ve reused a write key originally issued for a US-based workspace, you’ll need to do the following:

- Update your request target to: `https://events.eu1.segmentapis.com/v1`.
- Make sure the write key belongs to an EU workspace.

**Data sent to the EU endpoint using a US-region write key will get rejected**.

### Cloud-event sources

{% include content/eu-cloud-event-sources.html %}

Segment maintains and hosts these sources, and they don't require SDK-level configuration. 

If you're using other cloud sources not listed here, they may only be available in US-based workspaces. Reach out to Segment Support if you're unsure whether a cloud source is supported in the EU.

## Updating source settings in Segment

After you’ve configured your SDKs or custom integrations, double-check that your source settings in Segment are using the correct regional endpoint.

To set your data ingestion region:

1. Go to your source's **Settings** tab.
2. Click **Regional Settings**.
3. Choose your **Data Ingestion Region**.
    - If your workspace is in the *US West* data processing region, you can select from: Dublin, Singapore, Oregon, or Sydney.
    - If your workspace is in the *EU West* data processing region, Segment only supports ingestion from Dublin, using the `events.eu1.segmentapis.com/` endpoint.
4. Save your changes.

All regions are configured on a **per-source** basis. You'll need to configure the region for each source separately if you don't want to use the default region.

Segment’s client-side SDKs automatically fetch this setting and update themselves the next time the app reloads. However, for mobile apps and critical regional routing, Segment recommends also [setting the endpoint manually in your SDK configuration](#set-up-your-sources-for-eu-or-us-workspaces.

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

Sources within EU workspaces deliver Segment data to EU-based AWS storage. 

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
