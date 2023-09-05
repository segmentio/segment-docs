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
4. Select the web source that will send data to Google Analytics 4 and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/){:target='_blank'}.
5. On the **Settings** tab, under **Basic Settings**, enter in the [Measurement ID](https://support.google.com/analytics/answer/9539598){:target='_blank'} associated with your GA4 web stream.
6. Set up your event mappings by following the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).

After you've set up at least one event in your **Mappings** tab, you can see your events and parameters using the Google [Realtime](https://support.google.com/analytics/answer/9271392){:target="_blank"} and [DebugView](https://support.google.com/analytics/answer/7201382){:target="_blank"} reports. These two reports show you the events users trigger on your website as they occur. The DebugView report requires additional configuration before you can use it. 

Some parameters automatically populate prebuilt [dimensions and metrics](https://support.google.com/analytics/answer/9143382){:target="_blank"} in Google Analytics. For example, the parameters on the automatically collected and enhanced measurement events and the required and optional parameters you send with the recommended events both populate pre-built dimensions and metrics.

With custom parameters, you must create [custom dimensions and metrics](https://support.google.com/analytics/answer/10075209){:target="_blank"} so you can see the parameter values in Google Analytics. 

### Understanding Event Parameters 

Parameters provide additional information about the ways users interact with your website. For example, when someone views a product you sell, you can include parameters that describe the product they viewed, like `product_name`, `category`, and `price`.

The automatically collected and enhanced measurement events include parameters by default. Google also provides a set of required and optional parameters to include with each recommended event. Additionally, you can add more event parameters when you need them.

{% include components/actions-fields.html settings="true"%}

## FAQ & Troubleshooting

### Resolving Duplicate Page Views

When enabled, the **Page Views** advanced setting sends the `page_view` event from Google's gtag.js snippet. It does not prevent sending Segment's `analytics.page()` event. If you enable this setting, once the page loads, Segment sends two `page_view` events to the GA4 SDK, one from the Segment snippet and one from the gtag.js snippet. If you see duplicate `page_view` events in your GA4 dashboard, you need to either:

1. Disable the **Page Views** advanced setting (set it to *False*) so only Segment's `analytics.page()` sends to the GA4 SDK.
2.  Edit or disable the preset **Set Configuration Fields** mapping so only the `page_view` included in the gtag.js snippet sends to the GA4 SDK.

The GA4 SDK also tracks a native `page_view` event if you have the [following setting enabled](https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag#measure_virtual_pageviews){:target='_blank'} in your GA4 account. To avoid the native GA4 `page_view` event, disable **Page changes based on browser history events** under the advanced settings of the **Page views** section.


### Custom Event Naming

Google Analytics 4 does not accept custom event names that include spaces. Segment replaces spaces in the Event Name in the Custom Event action with an underscore. As a result, you will see custom events snake cased in Google Analytics 4.

Google Analytics 4 is also case sensitive. If you would like all event names to be lowercase, use the `Lowercase Event Name` setting in the Custom Event action. If this setting is disabled, Google will treat event names with different casing as distinct events. For more information, see [Google Analytics 4 Event name rules](https://support.google.com/analytics/answer/13316687?hl=en&ref_topic=13367860&sjid=2167389739796023681-NA#zippy=%2Cweb){:target="_blank"}.

### Custom Dimensions and Metrics

With Google Analytics 4, you must create custom dimensions and metrics within the Google Analytics 4 interface to link event parameters to the corresponding custom dimensions or metrics. When creating the dimension or metric, you can either select a parameter from the list of already collected fields or enter the name of the parameter you plan to collect in the future. For more information, see [Google Analytics 4 Custom dimensions and metrics](https://support.google.com/analytics/answer/10075209?hl=en){:target="_blank"}.

### Debug Mode

The Google Analytics 4 [debug mode](https://support.google.com/analytics/answer/7201382?hl=en){:target="_blank"} is supported with the Google Analytics 4 Web destination. DebugView displays the events and user properties that Analytics collects from a user in real-time. This can be helpful in troubleshooting your implementation.

### Send events from both the browser and the server 

With Google Analytics 4 Web, events are sent from the browser to GA4. If you use Segment’s [Google Analytics 4 Cloud destination](/docs/connections/destinations/catalog/actions-google-analytics-4/#benefits-of-google-analytics-4-cloud) to send events through the API and tie data between client-side and server-side, you need to pass the same Client ID from the browser and the server. To do this, fetch the Gtag-generated **clientId** on the web client and pass it to Segment as a property. For more information, see [Google Analytics 4 destination: User Identification](/docs/connections/destinations/catalog/actions-google-analytics-4/#user-identification) on the next steps.

### Additional (unmapped) events are sent to GA4

Google Analytics 4 collects events triggered by basic interactions with your site. For more information, see [Google Analytics 4 Automatically collected events](https://support.google.com/analytics/answer/9234069?hl=en){:target="_blank"}

### Data takes a long time to appear in Google's reports

Google may take [24-48 hours](https://support.google.com/analytics/answer/9333790){:target="_blank"} to process data sent to Google Analytics. As a result, the Google Analytics user interface may not reflect the most current data. The Google Analytics [Realtime report](https://support.google.com/analytics/answer/9271392){:target="_blank"} displays activity on your site as it happens.

### Data is not sent to Google

Ensure that at least one mapping has been configured and enabled in the destination mappings for an event you want to send to Google Analytics. If no mappings are enabled, the destination does not send events.

1. Disable the **Page Views** advanced setting (set it to *False*) so only Segment's `analytics.page()` sends to the GA4 SDK. Or,
2. Edit or disable the preset **Set Configuration Fields** mapping so only the `page_view` included in the gtag.js snippet sends to the GA4 SDK.

### Tracking UTM Parameters

UTM Parameters are automatically tracked and sent to Google when they are present in the URL. For example, with the following URL:
`https://www.example.com/?utm_content=email_variation1&utm_medium=email&utm_source=email_promo&utm_campaign=summer_sale&utm_id=abcd`

Without any further configuration, traffic-source data for `campaign`, `campaign_id`, `content`, `medium`, and `source` will populate in GA4. This can be observed on Google's side by triggering a `Page` call with UTM parameters present in the URL and navigating to the **Realtime overview** report in GA4 to see the resulting `page_view` event under the _Event count by Event name_ card. 

### Differences between Google Analytics 4 Cloud and Google Analytics 4 Web destinations 

Segment's [Google Analytics 4 Cloud](/docs/connections/destinations/catalog/actions-google-analytics-4/) server-side destination uses Google's Measurement Protocol API to send event data server to server, whereas Segment's [Google Analytics 4 Web](/docs/connections/destinations/catalog/actions-google-analytics-4-web/) device-mode destination loads the gtag.js library client-side and uses Segment's event data to map to gtag.js events directly. Each destination has its own advantages and disadvantages. Your choice between the two will depend on your specific use case, technical expertise, and the platforms from which you want to track data.