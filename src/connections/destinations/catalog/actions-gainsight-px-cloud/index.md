---
title: Gainsight PX Cloud (Actions) Destination
id: 61f83101210c42a28a88d240
---


{% include content/plan-grid.md name="actions" %}

[<integration_name>](https://www.gainsight.com/product-experience/analytics/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners)
Gainsight PX provides a personalized product experience platform to help companies acquire, retain, and grow customers by creating real-time, personalized engagements driven by product usage data. With Gainsight PX, companies can implement an effective product-led go-to-market strategy that will increase product adoption and customer lifetime value.
This destination is maintained by Gainsight PX. For any issues with the destination, [contact their Support team](mailto:pxsupport@gainsight.com).

> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/actions-gainsight-px-cloud) Gainsight PX Cloud Segment destination. There's also a page about the [non-Actions Gainsight PX Cloud destination](/docs/connections/destinations/catalog/gainsight-px-cloud-server). Both of these destinations receives data from Segment.

{% include content/ajs-upgrade.md %}

## Benefits of Gainsight PX Cloud (Actions) vs Gainsight PX Cloud Classic

Gainsight PX Cloud (Actions) provides the following benefits over the classic Gainsight PX Cloud destination:

- **Data Center Support**. The new Actions-based integration allows for the selection of the PX datacenter.  This is required for any PX customers based in any data center other than the main US datacenter (accessed via app.aptrinsic.com). 

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure Gainsight PX Cloud (Actions)**.
4. Select an existing Source to connect to Gainsight PX Cloud (Actions).
5. To find your Gainsight PX key, log into Gainsight PX and navigate to Settings > Products > Web App. If you have not already entered the URL for your web application, do that and click the Generate button. The Tag Key is the value that begins with "AP-" to the right of the URL value. Use the “Copy” button to copy the value to your clipboard.
6. Paste the Gainsight PX Tag Key into the Segment connection settings API Key field.
7. Choose the appropriate data center value in the "Other Settings" Data Center dropdown.  If the PX instance is accessed via app.aptrinsic.com, select 'United States', otherwise choose the appropriate selection based on the suffix after "app-" in the application's URL.

{% include components/actions-fields.html %}
