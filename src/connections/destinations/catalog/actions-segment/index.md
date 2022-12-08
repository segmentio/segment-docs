---
title: Segment Destination
hide-boilerplate: true
hide-dossier: false
id: 6371eee1ae5e324869aa8b1bvr
---

The Segment destination enables you to mold data extracted from your warehouse into [Segment Spec](/docs/connections/spec/) API calls that can be processed by Segment's Tracking API.

**The Segment destination can be connected to Reverse ETL warehouse sources only.**

> info ""
> The Segment (Actions) destination is in beta and is in active development. Some functionality may change before it becomes generally available.

## Getting started

### Create a source
1. From the Segment web app, navigate to **Sources** and select **Add Source**.
2. Search for **HTTP API** in the Sources Catalog, select the HTTP API source, and click **Add Source**.
3. Follow the steps to name your source. This is the source that will receive API calls from the Segment destination.
4. Copy the Write Key on the **Overview** tab. You will need this when you set up the Segment destination.

### Connect the Segment destination
1. From the Segment web app, navigate to **Reverse ETL > Destinations**.
2. Click **Add Destination** in top-right corner.
3. Select the Segment destination, click **Next**, and select the warehouse source that will send data to the Segment destination. If you have not set up a warehouse source, follow the steps in the Reverse ETL documentation on [Getting started](/docs/reverse-etl/#getting-started).
4. On the **Settings** tab, name your destination, input the Write Key from the source created above, select an endpoint region, and click **Save Changes**.
5. On the **Mappings** tab, click **Add Mapping**. Select a data model and the API call type you want to map. You can configure multiple mappings.
6. Enable the destination and configured mappings.

{% include components/actions-fields.html settings="true"%}

## FAQ & Troubleshooting

### API Calls and MTUs
The Segment destination sends data to Segment's Tracking API, which has cost implications. New users will count as new MTUs and each call will count as an API call. For information on how Segment calculates MTUs and API calls, please see [MTUs, Throughput and Billing](/docs/guides/usage-and-billing/mtus-and-throughput).
