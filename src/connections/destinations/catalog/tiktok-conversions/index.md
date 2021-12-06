---
title: TikTok Conversions
hide-boilerplate: true
hide-dossier: true
hidden: true
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
2. Follow instructions for [Authorization](https://ads.tiktok.com/marketing_api/docs?id=1701890979375106){:target="_blank"} and generate a long term  access token.

### Configuring TikTok Conversions in Segment

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure TikTok Conversions**.
4. Select an existing Source to connect to TikTok Conversions.
5. On the next page enter your TikTok Access Token, and Pixel Code. Click Verify credentials.


{% include components/actions-fields.html name="tiktok" connection="true" %}

## Pre-built subscriptions

By default a new TikTok Conversions Destination comes with the following subscriptions.

| Subscription Name | Trigger                                             | TikTok Conversions Action |
| ----------------- | --------------------------------------------------- | ------------------------- |
| Products Searched | All events where the name is `Products Searched`    | Report Web Event          |
| Add Payment Info  | All events where the name is `Payment Info Entered` | Report Web Event          |
| Initiate Checkout | All events where the name is `Checkout Started`     | Report Web Event          |
| Order Completed   | All events where the name is `Order Completed`      | Report Web Event          |
| View Content      | All **Page** events                                 | Report Web Event          |

Choose **Quick Setup** during configuration to select these subscriptions. You can enable, edit, and disable them from the Actions tab of the destination.

The pre-built TikTok Conversions Subscriptions trigger the same action, **Report Web Event**. The default subscriptions map events that follow Segment's Spec to the TikTok spec. You can create new subscriptions and map events that best suit your configuration.

The table below shows the mapping of the Segment semantic [ecommerce](/docs/connections/spec/ecommerce/v2/) or custom event names to the TikTok semantic conversion event names in the pre-built subscriptions.

| Segment Event Name   | TikTok Semantic Conversion Event Name |
| -------------------- | ------------------------------------- |
| Checkout Started     | InitiateCheckout                      |
| Products Searched    | Search                                |
| Payment Info Entered | AddPaymentInfo                        |
| Order Completed      | PlaceOrder                            |

| Segment Event Type         | TikTok Semantic Conversion Event Name |
| -------------------------- | ------------------------------------- |
| All **Segment Page Calls** | ViewContent                           |

<!-- The section below provides reference tables for the actions defined in your destination. Create the unordered list. The Segment Docs team will assist with populating the data file referenced by this include. -->

## Available TikTok Conversion actions

Combine the supported [triggers](/docs/connections/destinations/actions/#components-of-a-destination-action) with the following TikTok-supported actions:

- [Report Web Event](#report-web-event)

{% include components/actions-fields.html name="tiktok" %}

All TikTok Conversions subscriptions trigger the Report Web Event action.

This action sends a request from Segment to the [TikTok Events Web API](https://ads.tiktok.com/marketing_api/docs?id=1701890979375106){:target="_blank"}.

Ensure you've created your TikTok Pixel within Events Manager before sending events. Instructions to create a pixel can be found [here](https://ads.tiktok.com/help/article?aid=10021){:target="_blank"}.

## Notes

- The TikTok Events API supports QPS =< 1k per app（TikTok Marketing API app）per endpoint. If more is required, please contact your TikTok account representative.
- Requests report events to one pixel ID. This restriction is because authorization is done at user/pixel level. See the [Authorization](https://ads.tiktok.com/marketing_api/docs?id=1701890912382977){:target="_blank"} section for details.
- Data that is shared to the Events API is processed similar to information shared through other TikTok data integration business tools, like the TikTok pixel and TikTok SDK.



<!-- Add information about steps needed to migrate from a classic version of your destination here. The Segment Docs team will assist you with populating the data file referenced by this include. The table at the bottom maps classic settings to the new destination.-->

