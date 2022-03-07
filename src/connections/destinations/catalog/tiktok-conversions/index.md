---
title: TikTok Conversions
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

The TikTok Conversions Destination enables advertisers to send Segment events directly to TikTok. Data shared can power TikTok solutions like dynamic product ads, custom targeting, campaign optimization and attribution. Advertisers can see their event data in TikTok Events Manager.

## Benefits of TikTok Conversions
The TikTok Conversions destination provides the following benefits:

1. **Clear mapping of data.** Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to TikTok.
2. **Prebuilt mappings.** Mappings for TikTok Standard Events, like `PlaceAnOrder`, are prebuilt with the prescribed parameters and available for customization.
3. **Streamlined stability and security.** Integrate and iterate without client-side limitations, like network connectivity or ad blocker issues.
4. **Privacy-focused**: Stay compliant with rapidly evolving requirements with automatic PII hashing and flexible controls that let you adapt what data you share.
5. **Maximum event measurement**: Capture more events with improved accuracy across different browsers, apps and devices to get a unified view of your customer's journey from page view to purchase.

## Getting started

Follow the instructions below to enable your TikTok ads account, and add the TikTok Conversions destination to your Segment workspace.

### TikTok Requirements

The TikTok Conversions destination is configured to use the TikTok Events API. To generate a TikTok Access Token and Pixel Code:

1. [Create a TikTok For Business account](https://ads.tiktok.com/marketing_api/docs?id=1702715936951297){:target="_blank"}.
2. Follow instructions for [Authorization](https://ads.tiktok.com/marketing_api/docs?rid=959icq5stjr&id=1701890979375106){:target="_blank"} and generate a long term access token.

### Connect TikTok Conversions to your workspace

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “TikTok Conversions” in the Destinations Catalog, and select the destination.
3. Click **Configure TikTok Conversions**.
4. Select the source that will send data to TikTok Conversions and follow the steps to name your destination.
5. On the Settings tab, enter in your TikTok Access Token and Pixel Code and click **Save**.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).

{% include components/actions-fields.html %}

## FAQ & Troubleshooting

### Other Standard Events

If you want to send a [TikTok standard event](https://ads.tiktok.com/marketing_api/docs?id=1701890979375106){:target="_blank"} that Segment does not have a prebuilt mapping for, you can use the [Report Web Event action](/docs/connections/destinations/catalog/tiktok-conversions/#report-web-event) to send the standard event. For example, if you want to send a `CompleteRegistration` event, create a mapping for Report Web Event, set up your Event Trigger criteria for completed registrations, and input a literal string of "CompleteRegistration" as the Event Name.

### PII Hashing

Segment creates a SHA-256 hash of the following fields before sending to TikTok:
- External ID
- Email
- Phone Number
