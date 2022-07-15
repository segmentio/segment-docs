---
title: Snapchat Conversions API (Actions)
hide-boilerplate: true
hide-dossier: false
id: 6261a8b6cb4caa70e19116e8
---

The Snapchat Conversions API destination is a server-to-server integration with the [Snapchat Conversions API](https://marketingapi.snapchat.com/docs/conversion.html#conversions-api){:target="_blank"} that allows advertisers to pass web, app, and offline events from Segment directly to Snap. Data shared through the Snapchat Conversions API is processed similarly to events passed through the Snap Pixel or App Ads Kit (SDK). By passing events, advertisers can access post-view and post-swipe campaign reporting to measure performance and incrementality. Depending on the data shared and timeliness of integration, it’s also possible to use events passed through the Conversions API for solutions such as custom audience targeting, campaign optimization, Dynamic Ads, and more.

> info ""
> The Snapchat Conversions API destination is in beta and is in active development. Some functionality may change before it becomes generally available.

## Benefits of the Snapchat Conversions API
The Snapchat Conversions API destination provides the following benefits:
- **Clear mapping of data.** Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to Snap.
- **Prebuilt mappings.** Mappings for Snap event types, like `PURCHASE` and `ADD_CART`, are prebuilt with the prescribed parameters and available for customization.
- **Streamlined stability and security.** Integrate and iterate without client-side limitations, like network connectivity or ad blocker issues.
- **Privacy-focused.** Support compliance with rapidly evolving requirements with automatic PII hashing and flexible controls that let you adapt what data you share.
- **Data normalization.** Data is normalized before it is hashed to ensure the hashed value matches across sources and is in line with [Snap data requirements](https://marketingapi.snapchat.com/docs/conversion.html#conversions-api-concepts){:target="_blank"}.
- **Maximum event measurement.** Capture more events with improved accuracy across different browsers, apps, and devices to get a unified view of your customer’s journey from page view to purchase.

## Getting started
1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Snapchat Conversions API” in the Destinations Catalog, and select the destination.
3. Click **Configure Snapchat Conversions API** in the top-right corner of the screen.
4. Select the source that will send data to Snapchat Conversions API and follow the steps to name your destination.
5. On the **Settings** tab, authenticate with Snap using OAuth. Click **Connect to Snapchat Conversions API**. Follow the prompts to authenticate using OAuth, with a Snapchat login that is a member of the Snapchat Ads account you want to connect.
6. Add your [Snap Pixel ID](https://businesshelp.snapchat.com/s/article/pixel-website-install?language=en_US){:target="_blank"} *if you plan to send web or offline events*. *If you plan to send app events,* add your [Snap App ID](https://businesshelp.snapchat.com/s/article/snap-app-id?language=en_US​){:target="_blank"} and App ID.
7. Enable the destination and click **Save**.
8. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).

> warning ""
> To send events to Snap, you **must** add a Pixel ID for web and offline conversions or a Snap App ID and App ID for mobile conversions. If missing, events will fail.

{% include components/actions-fields.html %}

> warning ""
> By default, all mappings are sent as `WEB` conversions. If you want to send events as mobile or offline conversions, update the Event Conversion Type in each mapping to be `MOBILE_APP` or `OFFLINE`.

## FAQ and Troubleshooting

### Deduplication with the Snap Pixel or App Ads Kit (SDK)
There are many ways to send conversion data to Snap, including through the Snap Pixel, App Ads Kit or Conversions API. Snap recommends sending redundant data across sources to ensure the best optimization, targeting, and measurement capabilities. The Client Deduplication ID, Transaction ID, and Mobile Ad Identifier are used by Snap to deduplicate events across sources. Please see below for guidance on when to use each field for deduplication.
- **Web**: Snap Conversions API and PixeI
    - Use the Client Deduplication ID for unique events
    - Use Transaction ID and Price for `PURCHASE` events
- **Mobile**: Any combination of Snap Conversions API, MMP, or App Ads Kit
    - Use a Mobile Ad Identifier
    - Use Transaction ID for `PURCHASE` events
- **Offline**: Snap Conversions API and UI Upload
    - Use the Client Deduplication ID for unique events
    - Use Transaction ID and Price for `PURCHASE` events

The Client Deduplication ID allows for a 48-hour deduplication window. The Transaction ID is only eligible for `PURCHASE` events and allows for a 30-day deduplication window. See Snapchat’s [Marketing API documentation](https://marketingapi.snapchat.com/docs/conversion.html#deduplication){:target="_blank"} and [Business Help Center](https://businesshelp.snapchat.com/s/article/event-deduplication?language=en_US){:target="_blank"} for more information.

> info ""
> Segment does not have client-side destinations for the Snap Pixel or Snap App Ads Kit (SDK). If you choose to integrate client-side, these must be implemented natively. See Snapchat’s [Install Snap Pixel](https://businesshelp.snapchat.com/s/article/pixel-website-install?language=en_US){:target="_blank"} and [App Ads Kit](https://businesshelp.snapchat.com/s/article/app-ads-kit?language=en_US){:target="_blank"} for implementation details.

### Latency
It may take up to 1-hour for events to appear in the Snap [Events Manager](https://businesshelp.snapchat.com/s/article/events-manager?language=en_US){:target="_blank"}.

### Other events
If you want to send a Snap Event Type that Segment doesn’t have a prebuilt mapping for, you can use the Report Conversion Event action to send the event. For example, if you want to send a `START_TRIAL` event:
1. Create a mapping for Report Conversion Event.
2. Set up your Event Trigger criteria for trial starts.
3. Input a literal string of “START_TRIAL” as the Event Type.

The Snapchat Conversions API only supports sending Event Types that are in the [predefined `event_type` list](https://marketingapi.snapchat.com/docs/conversion.html#conversion-parameters){:target="_blank"}. This includes custom events. You must use `CUSTOM_EVENT_1`, `CUSTOM_EVENT_2`, `CUSTOM_EVENT_3`, `CUSTOM_EVENT_4`, or `CUSTOM_EVENT_5` as the Event Type. Events sent with an invalid event type will fail with an `Unrecognized event type` error.

### Required parameters and hashing
To match visitor events with Snapchat ads, Snap requires that one or a combination of the following parameters are sent to the Conversions API:
- Email
- Phone Number
- Mobile Ad Identifier
- IP Address and User Agent

When possible, Snap also recommends passing other parameters to improve performance. Please see Snapchat’s [Marketing API documentation](https://marketingapi.snapchat.com/docs/conversion.html#parameters-for-event-type-platform){:target="_blank"} for more details. These parameters can be configured under each Mapping.

In addition, Segment creates a SHA-256 hash of the following fields before sending to Snap:
- Email
- Mobile Ad Identifier (IDFA or AAID)
- Identifier for Vendor (IDFV)
- Phone Number
- IP Address

