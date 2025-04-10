---
title: Reddit Conversions API
id: 66cc766ef4b1c152177239a0
---

{% include content/plan-grid.md name="actions" %}

The [Reddit Conversions API](https://business.reddithelp.com/s/article/Conversions-API?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} allows advertisers to send conversion events from Segment directly to Reddit, without needing website code. By building a sustainable server-side connection more resilient to signal loss, you can gain stronger campaign performance with improved measurement, targeting, and optimization. 

### Benefits of Reddit Conversions API

- **Clear mapping of data**: Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to Reddit.
- **Prebuilt mappings**: Mappings for Reddit Standard Events, like Purchase and AddToCart, are prebuilt with the prescribed parameters and is available for customization.
- **Streamlined stability and security**: Integrate and iterate without client-side limitations, like network connectivity or ad blocker issues.
- **Privacy-focused**: Stay compliant with rapidly evolving requirements with automatic PII hashing and flexible controls that let you adapt what data you share.
- **Maximum event measurement**: Capture more events with improved accuracy across different browsers, apps, and devices to get a unified view of your customer’s journey from page view to purchase.
- **Data normalization**: Data is normalized before hashing to ensure the hashed value matches across sources and is in line with [Reddit data requirements](https://business.reddithelp.com/helpcenter/s/article/advanced-matching-for-developers){:target="_blank"}.

This destination is maintained by Reddit. For any issues with the destination, [contact their Support team](mailto:adsapi-partner-support@reddit.com).


## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Reddit Conversions API” in the Destinations Catalog, and select the destination.
3. Select the source that will send data to the Reddit Conversions API and follow the steps to name your destination.
4. On the Settings tab, enter in your [Reddit Conversion Token](https://business.reddithelp.com/helpcenter/s/article/conversion-access-token){:target="_blank"} and Pixel ID (You can find your pixel ID in the [Events Manager](https://ads.reddit.com/events-manager){:target="_blank"}, and it should match the business account's pixel ID found in [Accounts](https://ads.reddit.com/accounts){:target="_blank"}) and click **Save**.
5. Follow the steps in the Destinations Actions documentation on [Customizing mappings](https://segment.com/docs/connections/destinations/actions/#customize-mappings){:target="_blank"}.


{% include components/actions-fields.html %}

## Attribution Signal Matching

At least one attribution signal is required with each conversion event. Send as many signals as possible to improve attribution accuracy and performance.

- **Recommended Signals**:
    - Reddit Click ID
    - Reddit UUID
    - IP Address
    - Email
    - User Agent
    - Screen Dimensions

- **Additional Signals**:
    - Mobile Advertising ID
    - External ID

## PII Hashing

Segment creates a SHA-256 hash of the following fields before sending to Reddit. If you hash the values before sending it to Segment, it must follow the hashing format described in the [Reddit Advanced Matching documentation](https://business.reddithelp.com/helpcenter/s/article/advanced-matching-for-developers){:target="_blank"} to properly match.

- Email
- Mobile Advertising ID
- IP Address
- External ID
 
## Deduplication with the Reddit Pixel

If you implement both the [Reddit Pixel](https://business.reddithelp.com/helpcenter/s/article/reddit-pixel){:target="_blank"} and [Conversions API (CAPI)](https://business.reddithelp.com/helpcenter/s/article/Conversions-API){:target="_blank"} and the same events are shared across both sources, deduplication is necessary to ensure those events aren’t double-counted.

You can pass a unique conversion ID for every distinct event to its corresponding Reddit Pixel and CAPI event. Reddit will determine which events are duplicates based on the conversion ID and the conversion event name. This is the best and most accurate way to ensure proper deduplication, and Reddit recommends this method since there’s less risk of incorrect integration, which can impact attribution accuracy.

To ensure your events are deduplicated:
- Create a unique conversion ID for every distinct event. You can set this as a random number or ID. Similarly, you could set this to the order number when tracking purchase events.
- Include the event in the Reddit Pixel and CAPI.
- Ensure the conversion event name and conversion ID for its corresponding events match.

For more information on deduplication, see the [Reddit Event Deduplication documentation](https://business.reddithelp.com/helpcenter/s/article/event-deduplication){:target="_blank"}.

## Verify Events in the Reddit Events Manager

After you start sending events, you can navigate to the Reddit Events Manager to see if the events are being received in near real-time. For more information, see the [Reddit Events Manager documentation](https://business.reddithelp.com/helpcenter/s/article/Events-Manager){:target="_blank"}.
