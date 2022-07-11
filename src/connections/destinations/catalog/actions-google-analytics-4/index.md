---
title: Google Analytics 4 Destination
strat: google
hide-boilerplate: true
hide-dossier: false
id: 60ad61f9ff47a16b8fb7b5d9
---
[Google Analytics 4](https://support.google.com/analytics/answer/10089681){:target="_blank"} is Google's new Analytics property, which you can use for both websites and applications. Google Analytics 4 has machine learning at its core to help surface insights and give you a more complete understanding of your customers across devices and platforms.

When you have Segment installed, you can use your existing tracking implementation to fulfill your data collection needs with Google Analytics 4. Segment will send your data server-side to [Google's Measurement Protocol API](https://developers.google.com/analytics/devguides/collection/protocol/ga4){:target='_blank'}.

> warning ""
> Google Analytics 4 doesn't officially support a pure server-to-server integration. However, Segment monitors the capabilities of the Measurement Protocol API and updates accordingly to achieve a reasonable level of reporting for mutual customers. Segment doesn't plan to build a device-mode integration with Gtag for Google Analytics 4.

> success "Good to know"
> This page is about the [Actions-framework](/docs/connections/destinations/actions/) Google Analytics 4 destination. There's also a page about the [non-Actions Google Universal Analytics destination](/docs/connections/destinations/catalog/google-analytics/). Both of these destinations receive data _from_ Segment.

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

## Universal Analytics & Google Analytics 4

### Differences between Universal Analytics and Google Analytics 4

Google Analytics 4 uses an event-based data model similar to Segment, with the principle that any interaction can be captured as an event. Universal Analytics, on the other hand, is based on hits and is primarily pageview-based. Because the data collection models are different, data cannot be migrated from Universal Analytics to Google Analytics 4 and Google recommends recreating your existing Universal Analytics tracking in Google Analytics 4. For more information on the different data models, see Google’s [Events in Google Analytics 4 vs Universal Analytics](https://support.google.com/analytics/answer/11091422?hl=en&ref_topic=11091421){:target='_blank'} and [Universal Analytics versus Google Analytics 4 data](https://support.google.com/analytics/answer/9964640?hl=en&ref_topic=11192706){:target='_blank'}.

Google Analytics 4 has different out-of-the-box reports. Google Analytics 4’s reporting is much more configurable and supports new reporting metrics like churn probability and predictive revenue estimates. In addition, goals defined in Universal Analytics have been replaced with the concept of conversions in Google Analytics 4. Reports and conversions will need to be rebuilt in Google Analytics 4.

> info ""
> To determine whether you have a Universal Analytics property or a Google Analytics 4 property, look at your property ID. Universal Analytics property IDs start with UA and end with a number (UA-XXXXXXXXX-1). Google Analytics 4 property IDs have only numbers (XXXXXXXXX).

### Migrating from Universal Analytics to Google Analytics 4
> warning ""
> Google announced that all standard Universal Analytics properties will stop processing new hits on July 1, 2023. 360 Universal Analytics properties will stop processing new hits on October 1, 2023.

Segment’s Google Analytics 4 integration is a server-side integration with the GA4 Measurement Protocol API. This is similar to Segment’s Google Universal Analytics cloud-mode integration in that all data is sent directly to Google’s servers. Please note that this means client-side functionality, such as [Enhanced Measurement](https://support.google.com/analytics/answer/9216061){:target='_blank'}, may not be available through Segment. In addition, as Google continues to develop the GA4 Measurement Protocol API ahead of general availability of the API, there may be limitations that impact what can be seen in the Google Analytics 4 reports.

#### Recommended Events
Google Analytics 4 requires the use of [recommended events and properties](https://support.google.com/analytics/answer/9267735){:target='_blank'} to power certain built-in reports. Segment’s Google Analytics 4 destination provides prebuilt mappings to automatically map your [Segment spec](/docs/connections/spec/ecommerce/v2) events to the corresponding Google Analytics 4 events and properties. If your Segment events don't follow the Segment spec exactly, you can modify the mappings. For example, Segment maps "Order Completed" events to the Google Analytics 4 “Purchase” event by default. If your company uses “Products Purchase” to indicate a purchase, this can be mapped in the Purchase action’s Event Trigger instead.

Segment recommends using the prebuilt mappings when possible, however the Segment spec doesn't have an equivalent event for every Google Analytics 4 recommended event. If there are other recommended events you would like to send, please use the [Custom Event action](/docs/connections/destinations/catalog/actions-google-analytics-4/#custom-event). For example, to send a `spend_virtual_currency` event, create a mapping for Custom Event, set up your Event Trigger criteria, and input a literal string of "spend_virtual_currency" as the Event Name. You can use the Event Parameters object to add fields that are in the `spend_virtual_currency` event such as `value` and `virtual_currency_name`.

#### Custom Events
In addition to recommended events, you can also send custom events using the [Custom Event action](/docs/connections/destinations/catalog/actions-google-analytics-4/#custom-event). Custom events are events that you name. Custom events don't appear in most standard reports; you need to set up custom reports for meaningful analysis. To create custom events in the Google Analytics 4 web interface, see Google’s [Modify and create events through the user interface](https://support.google.com/analytics/answer/10085872){:target='_blank'}.

> info "Event naming limitations"
> Google Analytics 4 requires that all event names contain only alpha-numeric characters and underscores, must start with an alphabetic character, and support a maximum of 40 characters. Segment replaces spaces in Event Names with an underscore, so that these events are accepted by GA4. For example, Segment renames an event named `Home Profile` to `Home_Profile`. In some cases, GA4 may reject an event outright, due to unsupported characters. For example, an event named `Home | Profile` will be silently rejected due to the pipe character.

In all cases, event names in GA4 are case sensitive and require values in all properties. The Custom Event action includes a **Lowercase Event Name** option, to ensure consistency of all events sent to Google. For more information, see Google's articles [Google Analytics 4 event name rules](https://support.google.com/analytics/answer/10085872?hl=en&ref_topic=9756175#event-name-rules){:target='_blank'} and [Event name limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase){:target="_blank"}.

#### Custom Dimensions and Metrics
With Google Analytics 4, you must create custom dimensions and metrics within the Google Analytics 4 interface and link parameters to the corresponding dimension or metric. When you create the dimension or metric, you can either select a parameter from the list of already collected fields or enter the name of the parameter you plan to collect in the future. Custom dimensions can be either event-scoped or user-scoped, and custom metrics must be event-scoped.

To send parameters to Google Analytics 4, use the Event Parameters or User Properties object available on every action. Only pass flat key-value pairs in the Event Parameters and User Properties objects. Keep in mind that Google silently drops any events that include nested parameters.

To achieve parity with Universal Analytics, you should create the same custom dimensions that you defined in Universal Analytics. Additionally, in Google Analytics 4, you should recreate many of the values that you tracked as event dimensions in Universal Analytics, particularly event category and event label.  For more information, see [Google Analytics 4 Custom dimensions and metrics](https://support.google.com/analytics/answer/10075209){:target='_blank'}.

#### Tracking Active Users and Sessions
The Google Analytics 4 reports only display active users who engage with your site for a non-zero amount of time. To ensure users are rendered in reports, Segment sets the `engagement_time_msec` parameter to 1 by default. If you track engagement time on your Segment events, you can use the **Engagement Time in Milliseconds** field mapping to set `engagement_time_msec` to a different value.

If you choose to integrate with Google Analytics 4 client-side (using Gtag outside of Segment) _and_ also use Segment's Google Analytics 4 destination to send events through the API, you can track sessions server-side. When using Gtag, [Google generates a `session_id` and `session_number` when a session begins](https://support.google.com/analytics/answer/9191807?hl=en){:target='_blank'}. The `session_id` and `session_number` generated on the client can be passed as Event Parameters to stitch events sent through the API with the same session that was collected client-side.

You can check your `session_id` and `session_number` with the [Google Site Tag function](https://developers.google.com/tag-platform/gtagjs/reference){:target='_blank'} or by running this script in your JavaScript console and replacing `G-xxxxxxxxxx` with your Google Analytics 4 Measurement ID:

```java
const sessionIdPromise = new Promise(resolve => {
  gtag('get', 'G-xxxxxxxxxx', 'session_id', resolve)
});
const sessionNumPromise = new Promise(resolve => {
  gtag('get', 'G-xxxxxxxxxx', 'session_number', resolve)
});

Promise.all([sessionIdPromise, sessionNumPromise]).then(function(session_data) {
  console.log("session ID: "+session_data[0]);
  console.log("session Number: "+session_data[1]);
});
```

> info "Session tracking limitations"
> Session tracking server-side only works if you're also sending data to Google Analytics 4 client-side. This is because the `session_id` must match a value that was previously collected on the client. For events to stitch properly, they must arrive within a 48 hour window of when the client-side events arrived.
>
> Google doesn't currently support passing other reserved fields, such as [predefined user dimensions](https://support.google.com/analytics/answer/9268042?hl=en&ref_topic=11151952){:target='_blank'} or device-specific information, to the Measurement Protocol API.

#### User Identification
Segment requires a Client ID to send data to Google Analytics 4. The Client ID is the web equivalent of a device identifier and uniquely identifies a given user instance of a web client. By default, Segment sets Client ID to the Segment `userId`, falling back on `anonymousId`. This mapping can be changed within each action if you prefer to map a different field to Client ID.

Segment also allows you to send a User-ID with your events. The User-ID feature lets you associate your own identifiers with individual users so you can connect their behavior across different sessions and on various devices and platforms. For more information on User-ID, see Google’s [Measure activity across platforms](https://support.google.com/analytics/answer/9213390){:target='_blank'} and [Reporting: deduplicate user counts](https://support.google.com/analytics/answer/9355949){:target='_blank'}.

There are certain scenarios where sending a User-ID can be helpful. For example, if you choose to integrate with Google Analytics 4 client-side (using Gtag outside of Segment) _and_ also use Segment's Google Analytics 4 destination to send events through the API, you may consider taking the following approach:
- **Use the Gtag-generated Client ID.** Gtag will set a Client ID automatically. The Client ID is stored in a cookie and can be fetched on the web client. To tie data between client-side and server-side, pass the Gtag-generated Client ID to Segment as a property and use that value as the Client ID in the Google Analytics 4 destination mappings.
- **Use the Segment `userId` for User-ID.** The Segment `userId` should be your company’s canonical user identifier. By setting Google's User-ID to the same value as `userId` on client-side and server-side, you can benefit from cross-platform analytics.
In addition, if you use [Firebase to send mobile data to Google Analytics 4](/docs/connections/destinations/catalog/actions-google-analytics-4/#mobile-data), using the same User-ID across web and mobile will ensure users are stitched together across devices.

#### Validating and Comparing Data
Google recommends a period of dual-collection with both Universal Analytics and Google Analytics 4. This dual-collection approach lets you build a historical record in Google Analytics 4 while continuing to depend on Universal Analytics until you're ready to fully switch over.

During this period, you may find it hard to perfectly compare between the two properties because reports and configuration settings vary between Universal Analytics and Google Analytics 4 properties. Google provides guidance on the [conditions that must be met](https://support.google.com/analytics/answer/9964640?hl=en&ref_topic=11192706#comparing){:target="_blank"} in order to compare data in the Realtime reports, as well as [which metrics are comparable versus not](https://support.google.com/analytics/answer/11986666?hl=en&ref_topic=10737980){:target="_blank"}.

For a complete map of Universal Analytics functionality to corresponding Google Analytics 4 functionality, please see Google’s [Migration Reference](https://support.google.com/analytics/answer/10607999?hl=en&ref_topic=10737980){:target="_blank"}.

## FAQ & Troubleshooting

### Attribution Reporting

Google doesn't currently support passing certain reserved fields to the Google Analytics 4 Measurement Protocol API. This includes attribution data, like UTM parameters. If you rely on attribution reporting, you can either send this data as [custom dimensions](/docs/connections/destinations/catalog/actions-google-analytics-4/#custom-dimensions-and-metrics) or implement a parallel client-side integration to collect this data with gtag.js.

### Debug Mode

The Google Analytics 4 [debug mode](https://support.google.com/analytics/answer/7201382?hl=en){:target="_blank"} only works with a client-side implementation through gtag.js, Google Tag Manager, or Firebase. Because Segment's Google Analytics 4 integration is server-side and uses the Measurement Protocol API, debug mode is not supported.

### Mobile Data

Google recommends use of their Firebase SDKs to send mobile data to Google Analytics 4. To assist in your implementation, Segment has a [Firebase destination](/docs/connections/destinations/catalog/firebase) available for mobile analytics. For more information on linking Google Analytics 4 properties to Firebase, see [Google Analytics 4 Firebase integration](https://support.google.com/analytics/answer/9289234?hl=en){:target="_blank"}. Segment's Google Analytics 4 destination is currently only compatible with web streams.

### Reserved Names

Google reserves certain event names, parameters, and user properties. Google silently drops any events that include [these reserved names](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#reserved_names){:target="_blank"}. If you notice that your data isn't appearing in Google, please check that you're not using a reserved name.
