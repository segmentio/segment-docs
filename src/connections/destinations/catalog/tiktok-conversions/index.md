---
title: TikTok Conversions
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

The TikTok Conversions Destination enables advertisers to send Segment events to report events directly to TikTok. Data shared can power TikTok solutions like dynamic product ads, custom targeting, campaign optimization and attribution.

Reporting web events allows advertisers to send user data directly to TikTok for downstream targeting and optimization. Advertisers will be able to see their event data in TikTok Events Manager.

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) TikTok Conversions Segment Destination.

## Benefits

1. **Streamlined stability and security**: Integrate and iterate without client-side limitations, like network connectivity or ad blocker issues.
2. **Configurable privacy controls**: Stay compliant with rapidly evolving requirements with flexible privacy controls that let you adapt what data you share and when you share it.
3. **Maximum event measurement**: Capture more events with improved accuracy across different browsers, apps and devices to get a unified view of your customer's journey from page view to purchase.

## Getting started

Follow the instructions below to enable your TikTok ads account, and add the TikTok Conversions Destination to your Segment workspace.

### TikTok Requirements

1. [Create a TikTok For Business account](https://ads.tiktok.com/marketing_api/docs?id=1702715936951297){:target="_blank"}.
2. Follow instructions for [Authorization](https://ads.tiktok.com/marketing_api/docs?rid=959icq5stjr&id=1701890979375106){:target="_blank"} and generate a long term  access token.

### Configuring TikTok Conversions in Segment

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure TikTok Conversions**.
4. Select an existing Source to connect to TikTok Conversions.
5. On the next page enter your TikTok Access Token, and Pixel Code. Click Verify credentials.


{% include components/actions-fields.html %}





## Segment event names to TikTok events
The table below shows the mapping of the Segment semantic [ecommerce](/docs/connections/spec/ecommerce/v2/) or custom event names to the TikTok semantic conversion event names in the pre-built mappings.

| Segment Event Name   | TikTok Semantic Conversion Event Name |
| -------------------- | ------------------------------------- |
| Checkout Started     | InitiateCheckout                      |
| Products Searched    | Search                                |
| Payment Info Entered | AddPaymentInfo                        |
| Order Completed      | PlaceAnOrder                            |

| Segment Event Type         | TikTok Semantic Conversion Event Name |
| -------------------------- | ------------------------------------- |
| All **Segment Page Calls** | ViewContent                           |

<!-- The section below provides reference tables for the actions defined in your destination. Create the unordered list. The Segment Docs team will assist with populating the data file referenced by this include. -->



