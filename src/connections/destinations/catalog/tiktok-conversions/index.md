---
title: TikTok Conversions
hide-boilerplate: true
hide-dossier: true
---

<!-- In the section above, edit the `title` field. For example, Slack (Actions) Destination -->

{% include content/plan-grid.md name="actions" %}

<!-- Include a brief description of the destination here, along with a link to your website. -->

The TikTok Conversions Destination enables advertisers to send Segment events to report events directly to TikTok. Data shared can power TikTok solutions like dynamic product ads, custom targeting, campaign optimization and attribution.

Reporting web events allows advertisers to send user data directly to TikTok for downstream targeting and optimization. Advertisers will be able to see their event data in TikTok Events Manager.

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available

<!-- In the section below, add your destination name where indicated. If you have a classic version of the destination, ensure that its documentation is linked as well. If you don't have a classic version of the destination, remove the second and third sentences. -->

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) TikTok Conversions Segment destination.

<!-- In the section below, explain the value of this actions-based destination over the classic version, if applicable. If you don't have a classic version of the destination, remove this section. -->

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

### TikTok Requirements

1. [Create a TikTok For Business account](https://ads.tiktok.com/marketing_api/docs?id=1702715936951297).
2. [Register as a developer](https://ads.tiktok.com/marketing_api/docs?id=1702716323359809).
3. [Create a developer application](https://ads.tiktok.com/marketing_api/docs?id=1702716474845185).
4. Follow instructions for [Authorization](https://ads.tiktok.com/marketing_api/docs?id=1701890912382977) and generate a long term  access token.

### Configuring TikTok Conversions in Segment

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure TikTok Conversions**.
4. Select an existing Source to connect to TikTok Conversions (Actions).
5. On the next page enter your TikTok API key and Secret key and click Verify credentials.


<!-- The line below renders a table of connection settings (if applicable) from your destinations data file. The Segment Docs team will assist with this. -->

{% include components/actions-fields.html name="TikTok Conversions" connection="true" %}

<!-- The section below provides an overview of the prebuilt subscriptions that ship with your destination. If there are no prebuilt subscriptions, remove this section. -->

## Pre-built subscriptions

By default a new TikTok (Actions) destination comes with the following subscriptions.

You can select these subscriptions by choosing "Quick Setup" when you first configure the destination. You can enable, edit, and disable them from the screen that appears.

All the pre-built TikTok Conversions Subscriptions trigger the same action, **Report Web Event**, however they are configured to map events that follow Segment's Spec to TikTok's spec. However, you are able to create new subscriptions and map events anyway you like.

The following table shows how we map Segment’s semantic ecommerce or custom event names to TikTok’s semantic conversion event names in the pre-built subscriptions:

| Segment Event Name  | TikTok Semantic Conversion Event Name
| ------------------ | -----------------------------------------
| Checkout Started | InitiateCheckout |
| Products Searched | Search |
| Payment Info Entered | AddPaymentInfo |
| Order Completed | PlaceOrder |

| Segment Event Type| TikTok Semantic Conversion Event Name
| ------------------ | -----------------------------------------
|All **Segment Page Calls** | ViewContent |

<!-- The section below provides reference tables for the actions defined in your destination. Create the unordered list. The Segment Docs team will assist with populating the data file referenced by this include. -->

## Available TikTok Converstion actions

Combine the supported [triggers](/docs/connections/destinations/actions/#components-of-a-destination-action) with the following TikTok-supported actions:

- [Report Web Event](#report-web-event)

### Report Web Event

All the TikTok Conversions subscriptions trigger the Report Web Event action.

This action sends a request from Segment to the [TikTok Events Web API](https://ads.tiktok.com/marketing_api/docs?id=1701890979375106).

Ensure you've created your TikTok Pixel within Events Manager before sending events. Instructions to create a pixel can be found [here] (https://ads.tiktok.com/help/article?aid=10021).

## **Notes**

The TikTok Events API support QPS =< 1k per app（TikTok Marketing API app）per endpoint. If more is required, please contact your TikTok account representative.
A request only reports events to one pixel ID. This restriction is mostly because authorization will be done at user/pixel level. See the Authorization section for details.

Data that is shared to the Events API is processed similar to information shared via other TikTok data integration business tools, like the TikTok pixel and TikTok SDK.

## Benefits

1. **Streamlined stability and security**: Integrate and iterate without client-side limitations, like network connectivity or ad blocker issues.
2. **Configurable privacy controls**: Stay compliant with rapidly evolving requirements with flexible privacy controls that let you adapt what data you share and when you share it.
3. **Maximum event measurement**: Capture more events with improved accuracy across different browsers, apps and devices to get a unified view of your customer's journey from page view to purchase.

{% include components/actions-fields.html name="TikTok Conversions" %}

<!-- Add information about steps needed to migrate from a classic version of your destination here. The Segment Docs team will assist you with populating the data file referenced by this include. The table at the bottom maps classic settings to the new destination.-->

