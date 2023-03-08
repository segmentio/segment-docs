---
title: Segment Connections Destination
hide-boilerplate: true
hide-dossier: false
id: 6371eee1ae5e324869aa8b1b
---

The Segment Connections destination enables you to mold data extracted from your warehouse into [Segment Spec](/docs/connections/spec/) API calls that can be processed by Segment's Tracking API.

**You can only connect the Segment Connections destination to Reverse ETL warehouse sources.**

## Getting started

### Create a source
1. From the Segment web app, navigate to **Sources** and select **Add Source**.
2. Search for **HTTP API** in the Sources Catalog, select the [HTTP API source](/docs/connections/sources/catalog/libraries/server/http-api/), and click **Add Source**.
3. Follow the steps to name your source. This is the source that will receive API calls from the Segment Connections destination.
4. Copy the Write Key on the **Overview** tab. You will need this when you set up the Segment Connections destination.

### Connect and configure the Segment Connections destination
1. From the Segment web app, navigate to **Reverse ETL > Destinations**.
2. Click **Add Destination**.
3. Select the Segment Connections destination, click **Next**, and select the warehouse source that will send data to the Segment Connections destination. If you have not set up a warehouse source, follow the steps in the Reverse ETL documentation on [Getting started](/docs/reverse-etl/#getting-started).
4. On the **Settings** tab, name your destination, input the Write Key from the source created above, select an endpoint region, and click **Save Changes**. It is recommended to configure and enable all mappings before enabling the Segment Connections destination.
5. On the **Mappings** tab, click **Add Mapping**. Select a data model and the API call type you want to map. Fill in the fields on screen to create the desired mappings, and click **Create Mapping** to complete the configuration. Repeat this step to configure multiple mappings. 
6. Enable the configured mapping(s).
7. On the **Settings** tab, click the **Enable Destination** toggle, and then click **Save Changes** to enable the Segment Connections destination.

{% include components/actions-fields.html settings="true"%}

## FAQ & Troubleshooting

### API Calls and MTUs
The Segment Connections destination sends data to Segment's Tracking API, which has cost implications. New users will count as new MTUs and each call will count as an API call. For information on how Segment calculates MTUs and API calls, please see [MTUs, Throughput and Billing](/docs/guides/usage-and-billing/mtus-and-throughput/).
