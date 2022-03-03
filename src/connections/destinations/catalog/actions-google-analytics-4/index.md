---
title: Google Analytics 4 Destination
strat: google
hide-boilerplate: true
hide-dossier: false
id: 60ad61f9ff47a16b8fb7b5d9
---
[Google Analytics 4](https://support.google.com/analytics/answer/10089681){:target="_blank"} is Google's new Analytics property, which you can use for both websites and applications. Google Analytics 4 has machine learning at its core to help surface insights and give you a more complete understanding of your customers across devices and platforms. 

When you have Segment installed, you can use your existing tracking implementation to fulfill your data collection needs with Google Analytics 4. Segment will send your data server-side to [Google's Measurement Protocol API](https://developers.google.com/analytics/devguides/collection/protocol/ga4).

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Google Analytics 4 destination. There's also a page about the [non-Actions Google Universal Analytics destination](/docs/connections/destinations/catalog/google-analytics/). Both of these destinations receive data _from_ Segment.

## Benefits of Google Analytics 4

The Google Analytics 4 destination provides the following benefits:

- **Fewer settings**. Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to Google Analytics 4.
- **Prebuilt mappings**. Mappings for recommended Google Analytics 4 events, like `Purchase`, are prebuilt with the prescribed parameters and available for customization.
- **Support for multi-product arrays**. Products nested within arrays, like the `products` array in the [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) event, can be sent to Google Analytics 4.

## Getting started

Before you connect Segment to Google Analytics 4, configure a Google Analytics 4 property in your Analytics account. For more information, see Google's article: [Set up Analytics for a website and/or app](https://support.google.com/analytics/answer/9304153){:target='_blank'}.

To add the Google Analytics 4 destination: 

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Google Analytics 4” in the Destinations Catalog, and select the destination.
3. Click **Configure Google Analytics 4** in the top-right corner of the screen.
4. Select the source that will send data to Google Analytics 4 and follow the steps to name your destination.
5. On the **Settings** tab, enter in the [Measurement ID](https://support.google.com/analytics/answer/9539598){:target='_blank'} and API Secret associated with your GA4 stream and click **Save**. _Note: To create a new API Secret, navigate in the Google Analytics UI to Admin > Data Streams > choose your stream > Measurement Protocol > Create._
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).

{% include components/actions-fields.html %}

## FAQ & Troubleshooting

### Custom Event Naming

Google Analytics 4 does not accept custom event names that include spaces. Segment replaces spaces in the Event Name in the Custom Event action with an underscore. As a result, you will see custom events snakecased in Google Analytics 4.

Google Analytics 4 is also case sensitive. If you would like all event names lowercased, use the `Lowercase Event Name` setting in the Custom Event action. If this setting is disabled, Google will treat event names with different casing as distinct events. For more information, see [Google Analytics 4 Event name rules](https://support.google.com/analytics/answer/10085872?hl=en&ref_topic=9756175#event-name-rules&zippy=%2Cin-this-article.%2Cin-this-article){:target="_blank"}.

### Custom Dimensions & Metrics

With Google Analytics 4, you must create custom dimensions and metrics within the Google Analytics 4 interface and link event parameters to the corresponding dimension or metric. When creating the dimension or metric, you can either select a parameter from the list of already collected fields or enter the name of the parameter you plan to collect in the future. For more information, see [Google Analytics 4 Custom dimensions and metrics](https://support.google.com/analytics/answer/10075209?hl=en){:target="_blank"}.

### Debug Mode

The Google Analytics 4 [debug mode](https://support.google.com/analytics/answer/7201382?hl=en){:target="_blank"} only works with a client-side implementation through gtag.js, Google Tag Manager, or Firebase. Because Segment’s Google Analytics 4 integration is server-side and uses the Measurement Protocol API, debug mode is not supported.

### Mobile Data

The Google Analytics 4 Measurement Protocol API is only compatible with web streams. Google requires use of their Firebase SDKs to send mobile data to Google Analytics 4. For more information on linking Google Analytics 4 properties to Firebase, see [Google Analytics 4 Firebase integration](https://support.google.com/analytics/answer/9289234?hl=en){:target="_blank"}.

### User Metrics & Sessions

Segment sends a Google `clientId` in requests to the Measurement Protocol API, alongside other required API fields. However, user sessions are [not currently supported by the Measurement Protocol API](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/limitations){:target="_blank"}, so user metrics might not appear on the Google Analytics 4 Realtime report or several other reports. 

To validate your implementation, check users and events on the Events report and User Explorer.


