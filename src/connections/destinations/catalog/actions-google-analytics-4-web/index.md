---
title: Google Analytics 4 Web Destination
strat: google
hide-boilerplate: true
hide-dossier: false
id: 63ed446fe60a1b56c5e6f130
versions:
  - name: "Google Analytics 4 Cloud"
    link: '/docs/connections/destinations/catalog/actions-google-analytics-4/'
---

{% include content/plan-grid.md name="actions" %}

[Google Analytics 4](https://support.google.com/analytics/answer/10089681){:target="_blank"} is Google's new Analytics property, which you can use for both websites and applications. Google Analytics 4 has machine learning at its core to help surface insights and give you a more complete understanding of your customers across devices and platforms. 

When you have Segment installed, you can use your existing tracking implementation to fulfill your data collection needs with Google Analytics 4. When you enable the Google Analytics 4 Web destination, Segment loads the [gtag.js library](https://support.google.com/analytics/answer/9310895?hl=en#zippy=%2Cin-this-article){:target="_blank"} for you. Remove the native gtag.js script from your page to avoid duplicate data.

## Getting started

Before you connect Segment to Google Analytics 4, configure a Google Analytics 4 property in your Analytics account. For more information, see Google's article [Set up Analytics for a website and/or app](https://support.google.com/analytics/answer/9304153){:target='_blank'}.

To connect the Google Analytics 4 Web destination: 

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Google Analytics 4 Web” in the Destinations Catalog, and select the destination.
3. Click **Configure Google Analytics 4 Web**.
4. Select the web source that will send data to Google Analytics 4 and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/).
5. On the **Settings** tab, under **Basic Settings**, enter in the [Measurement ID](https://support.google.com/analytics/answer/9539598){:target='_blank'} associated with your GA4 web stream.
6. Set up your event mappings by following the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).
7. Analytics.js requires an initial Page call to send data to Google Analytics 4 Web. The [Segment snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-add-the-segment-snippet) includes this initial call by default.

After you've set up at least one event in your **Mappings** tab, you can see your events and parameters using the Google [Realtime](https://support.google.com/analytics/answer/9271392){:target="_blank"} and [DebugView](https://support.google.com/analytics/answer/7201382){:target="_blank"} reports. These two reports show you the events users trigger on your website as they occur. The DebugView report requires additional configuration before you can use it. 

Some parameters automatically populate prebuilt [dimensions and metrics](https://support.google.com/analytics/answer/9143382){:target="_blank"} in Google Analytics. For example, the parameters on the automatically collected and enhanced measurement events and the required and optional parameters you send with the recommended events both populate pre-built dimensions and metrics.

### Recommended Events

Google Analytics 4 requires the use of [recommended events](https://support.google.com/analytics/answer/9267735){:target="_blank"} and properties to power certain built-in reports. Segment’s Google Analytics 4 Web destination provides prebuilt mappings to automatically map your Segment spec events to the corresponding Google Analytics 4 events and properties. If your Segment events don’t follow the Segment spec exactly, you can modify the mappings. For example, Segment maps `Order Completed` events to the Google Analytics 4 `Purchase` event by default. If your company uses `Products Purchase` to indicate a purchase, you can map it in the Purchase action’s Event Trigger instead.

Segment recommends using the prebuilt mappings when possible. However, the Segment spec doesn’t have an equivalent event for every Google Analytics 4 recommended event. If there are other recommended events you'd like to send, use the [Custom Event action](/docs/connections/destinations/catalog/actions-google-analytics-4-web/#custom-event). For example, to send a `spend_virtual_currency` event, create a mapping for Custom Event, set up your Event Trigger criteria, and input a literal string of `spend_virtual_currency` as the Event Name. You can use the Event Parameters object to add fields that are in the `spend_virtual_currency` event such as `value` and `virtual_currency_name`. You'll need to define custom parameteres as [custom dimensions and metrics](/docs/connections/destinations/catalog/actions-google-analytics-4-web/#custom-dimensions-and-metrics) in your GA4 workspace first. 

### Custom events

Before you create a custom event, make sure the event you want to create isn't already collected through an [automatically collected event](https://support.google.com/analytics/answer/9234069?sjid=7831609405656395105-NA){:target="_blank"} or recommended as a [recommended event](https://support.google.com/analytics/answer/9267735?sjid=7831609405656395105-NA){:target="_blank"}. Segment recommends using an existing event, because these events automatically populate dimensions and metrics that are used in your reports.

Google Analytics 4 does not accept custom event names that include spaces. Segment replaces spaces in the Event Name in the Custom Event action with an underscore. As a result, you will see custom events snake cased in Google Analytics 4.

Event names are case-sensitive in Google Analytics 4. If you would like all event names to be lowercase, use the **Lowercase Event Name** setting when you create a Custom Event mapping and select `Yes` from the dropdown. If this setting is disabled, Google will treat event names with different casing as distinct events. 

Keep in mind that custom events will not appear in Google's standard reports; you will need to set up custom reports for meaningful analysis. 

### Custom dimensions and metrics

With Google Analytics 4, you must create custom dimensions and metrics within the Google Analytics 4 interface to link event parameters to the corresponding custom dimensions or metrics. When creating the dimension or metric, you can either select a parameter from the list of already collected fields or enter the name of the parameter you plan to collect in the future. For more information, see [Google Analytics 4 Custom dimensions and metrics](https://support.google.com/analytics/answer/10075209?hl=en){:target="_blank"}.

### Understanding event parameters 

Parameters provide additional information about the ways users interact with your website. For example, when someone views a product you sell, you can include parameters that describe the product they viewed, like `product_name`, `category`, and `price`.

The automatically collected and enhanced measurement events include parameters by default. Google also provides a set of required and optional parameters to include with each recommended event. Additionally, you can add more event parameters when you need them.

### Conversion events

Some of Segment's prebuilt [Available Actions](https://segment-docs.netlify.app/docs/connections/destinations/catalog/actions-google-analytics-4-web/#available-actions) which map to Google's recommended events are automatically marked as a conversion in your Analytics dashboard. For example, when you add a "Order Completed" event, it will show up in your Analytics dashboard as "purchase" with the **Mark as conversion** toggle toggled on by default. However, for other events, such as "Add to Cart", you will need to manually toggle the **Mark as conversion** setting on in your Analytics dashboard. If you don't mark the event as a conversion, it will not show up as a conversion in your built-in reports. You can read more [about conversion events](https://support.google.com/analytics/answer/9267568?sjid=1275909514202748631-NA){:target="_blank"} in Google's docs. 

{% include components/actions-fields.html settings="true"%}

## FAQ and Troubleshooting

### Debug mode

The Google Analytics 4 [debug mode](https://support.google.com/analytics/answer/7201382?hl=en){:target="_blank"} is supported with the Google Analytics 4 Web destination. DebugView displays the events and user properties that Analytics collects from a user in real-time. This can be helpful in troubleshooting your implementation.

### Send events from both the browser and the server 

With Google Analytics 4 Web, events are sent from the browser to GA4. If you use Segment’s [Google Analytics 4 Cloud destination](/docs/connections/destinations/catalog/actions-google-analytics-4/#benefits-of-google-analytics-4-cloud) to send events through the API and tie data between client-side and server-side, you need to pass the same Client ID from the browser and the server. To do this, fetch the Gtag-generated **clientId** on the web client and pass it to Segment as a property. For more information, see [Google Analytics 4 destination: User Identification](/docs/connections/destinations/catalog/actions-google-analytics-4/#user-identification) on the next steps.

### Additional (unmapped) events are sent to GA4

Google Analytics 4 collects events triggered by basic interactions with your site. For more information, see [Google Analytics 4 Automatically collected events](https://support.google.com/analytics/answer/9234069?hl=en){:target="_blank"}

### Data takes a long time to appear in Google's reports

Google may take [24-48 hours](https://support.google.com/analytics/answer/9333790){:target="_blank"} to process data sent to Google Analytics. As a result, the Google Analytics user interface may not reflect the most current data. The Google Analytics [Realtime report](https://support.google.com/analytics/answer/9271392){:target="_blank"} displays activity on your site as it happens.

### Data is not sent to Google

In order for data to be sent downstream to Google Analytics, check your mappings to ensure that:
1. The **Set Configuration Fields** mapping is enabled in your mappings.
2. You've added at least one other event mapping for an event you want to send to Google Analytics.

The **Set Configuration Fields** mapping is required for data to be sent downstream because it sets configuration to Measurement ID and establishes data flow using the `config` command. If you have no enabled mappings other than **Set Configuration Fields**, the GA4 destination does not send events downstream. 

### Duplicate `page_view` events in GA4

If you are sending multiple `config` commands that your Google Tag has to account for, you may see duplicate `page_view` events in your Analytics workspace. If this is the case, please refer to Google's documentation on [Ignoring duplicate instances of on-page configuration](https://support.google.com/analytics/answer/9973999?hl=en#:~:text=as%20described%20below.-,Ignore%20duplicate%20instances%20of%20on%2Dpage%20configuration,Click%20Save.,-Give%20feedback%20about){:target="_blank"}.

### Manually send `page_view` events

If you prefer to keep the **Page Views** setting disabled and manually send a `page_view`, please see this Google Doc for more on [Manual Pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag#manually_send_page_view_events).

With Google Analytics 4 Web, you will need to configure a [Custom Event](/docs/connections/destinations/catalog/actions-google-analytics-4-web/#custom-event) mapping for manually sending `page_view` events. When mapping the events, please make sure to set the Event Name to `page_view`.

### Tracking UTM Parameters

UTM Parameters are automatically tracked and sent to Google when they are present in the URL. For example, with the following URL:
`https://www.example.com/?utm_content=email_variation1&utm_medium=email&utm_source=email_promo&utm_campaign=summer_sale&utm_id=abcd`

Without any further configuration, traffic-source data for `campaign`, `campaign_id`, `content`, `medium`, and `source` will populate in GA4. This can be observed on Google's side by triggering a `Page` call with UTM parameters present in the URL and navigating to the **Realtime overview** report in GA4 to see the resulting `page_view` event under the _Event count by Event name_ card. 

### Differences between Google Analytics 4 Cloud and Google Analytics 4 Web destinations 

Segment's [Google Analytics 4 Cloud](/docs/connections/destinations/catalog/actions-google-analytics-4/) server-side destination uses Google's Measurement Protocol API to send event data server to server, whereas Segment's [Google Analytics 4 Web](/docs/connections/destinations/catalog/actions-google-analytics-4-web/) device-mode destination loads the gtag.js library client-side and uses Segment's event data to map to gtag.js events directly. Each destination has its own advantages and disadvantages. Your choice between the two will depend on your specific use case, technical expertise, and the platforms from which you want to track data.


