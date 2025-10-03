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

[Google Analytics 4](https://support.google.com/analytics/answer/10089681){:target="_blank"} is Google's Analytics property that you can use for both websites and applications. Google Analytics 4 has machine learning at its core to help surface insights and give you a more complete understanding of your customers across devices and platforms.

When you have Segment installed, you can use your existing Analytics 2.0 tracking implementation to fulfill your data collection needs with Google Analytics 4. When you enable the Google Analytics 4 Web destination, Segment loads the [gtag.js library](https://support.google.com/analytics/answer/9310895?hl=en#zippy=%2Cin-this-article){:target="_blank"} for you. To avoid duplicate data, remove the native gtag.js script from your page.

> info "Consent mode"
> Google enforced consent on March 6, 2024 for European Economic Area (EEA) users. Learn more about [consent mode](/docs/connections/destinations/catalog/actions-google-analytics-4-web/#consent-mode) and how to set it up. 

## Getting started

Before you connect Segment to Google Analytics 4, configure a Google Analytics 4 property in your Analytics account and enable any Custom Definitions in your GA4 Admin Panel. For more information, see Google's article [Set up Analytics for a website and/or app](https://support.google.com/analytics/answer/9304153){:target="_blank"}.

To connect the Google Analytics 4 Web destination:

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Google Analytics 4 Web” in the Destinations Catalog, and select the destination.
3. Click **Configure Google Analytics 4 Web**.
4. Select the web source that will send data to Google Analytics 4 and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/). For mobile source tracking, view the [Firebase Destination](/docs/connections/destinations/catalog/firebase/).
5. On the **Settings** tab, under **Basic Settings**, enter in the [Measurement ID](https://support.google.com/analytics/answer/9539598){:target="_blank"} associated with your GA4 web stream.
6. Set up your event mappings by following the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings).
7. Analytics.js requires an initial Page call to send data to Google Analytics 4 Web. The [Segment snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-add-the-segment-snippet) includes this initial call by default.
8. For GA4 to accept events on page, enable Set Configuration Mapping triggered by the first Segment event called after analytics.load(). Set Configuration Mapping calls the gtag(‘config’) command to enable tracking to your GA4 Measurement ID. 

After you've set up and enabled the Set Configuration Mapping, enable at least one event in your **Mappings** tab. From there, view your events and parameters using the Google [Realtime](https://support.google.com/analytics/answer/9271392){:target="_blank"} or[DebugView](https://support.google.com/analytics/answer/7201382){:target="_blank"} reports. These two reports show you the events users trigger on your website as they occur. The DebugView report requires additional configuration before you can use it. Additional tools for debugging are to view all your Google enabled tracking via https://tagassistant.google.com(https://tagassistant.google.com){:target=”_blank”} or in your browser’s Dev Tools, view GA4 collect requests by filtering by /collect.

Google Analytics automatically populates some events and parameters. For example, there are [Automatically Collected](https://support.google.com/analytics/answer/9234069){:target=”_blank”} events collected by triggering the Set Configuration Mapping. Calling gtag(‘config’) and enabling [Enhanced Measurement events](https://support.google.com/analytics/answer/9216061){:target=”_blank”}, which are controlled by toggling “on” in your GA4 Admin panel, use event listeners to send events. All events tracked via GA4 Web populate some commonly used parameters like `page_location` without additional configuration. Review the [Google Analytics event parameters](https://support.google.com/analytics/table/13594742){:target=”_blank” documentation for more information.

### Recommended events

Google recommends that you use their [Recommended events](https://support.google.com/analytics/answer/9267735){:target="_blank"} and properties to power certain built-in reports in Google Analytics 4. Segment’s Google Analytics 4 Web destination provides prebuilt mappings to automatically map your Segment spec events to the corresponding Google Analytics 4 events and properties. If your Segment events don’t follow the Segment spec exactly, you can modify the mappings. For example, Segment maps an `Order Completed` event to the Google Analytics 4 `Purchase` event, but if your company uses `Products Purchase` to indicate a purchase, you can map it in the Purchase action’s Event Trigger instead.

Segment recommends using the prebuilt mappings when possible. However, the Segment spec doesn’t have an equivalent event for every Google Analytics 4 Recommended event. If there are other recommended events you'd like to send, use the [Custom Event action](/docs/connections/destinations/catalog/actions-google-analytics-4-web/#custom-event). For example, to send a `spend_virtual_currency` event, create a mapping for Custom Event, set up your Event Trigger criteria, and input a literal string of `spend_virtual_currency` as the Event Name. You can use the Event Parameters object to add fields that are in the `spend_virtual_currency` event such as `value` and `virtual_currency_name`. Remember to define custom parameters as [custom dimensions and metrics](/docs/connections/destinations/catalog/actions-google-analytics-4-web/#custom-dimensions-and-metrics) within the GA4 Admin panel first.

### Custom events and event naming

Before you create a custom event, make sure the event you want to create isn't already collected through an [Automatically Collected event](https://support.google.com/analytics/answer/9234069?sjid=7831609405656395105-NA){:target="_blank"} or recommended as a [Recommended event](https://support.google.com/analytics/answer/9267735?sjid=7831609405656395105-NA){:target="_blank"}. 
Google Analytics 4 does not accept custom event names that include spaces. Segment replaces spaces in the Event Name in the Custom Event action with an underscore. As a result, you see custom events as snake_case in Google Analytics 4.

Event names are case-sensitive in Google Analytics 4. If you would like all event names to be lowercase, use the **Lowercase Event Name** setting when you create a Custom Event mapping and select `Yes` from the dropdown. If this setting is disabled, Google treats event names with different casing as distinct events.

Custom Events don't appear in some of Google's standard reports; you must set up custom reports for meaningful analysis.

> info "Custom Events with Item Parameters"
> To pass item parameters, you must use Google Recommended Event names that accept the items array, in other words, Ecommerce Events. Item parameters do not pass to GA4 with a Custom Event name or any other Event name if the items array is not specified as a parameter.

### Custom dimensions and metrics

With Google Analytics 4, you must create custom dimensions and metrics, also known as Custom Definitions, within the Google Analytics 4 Admin interface to link event parameters to the corresponding custom dimensions or metrics. When creating the dimension or metric, you can either select a parameter from the list of already collected fields or enter the name of the parameter you plan to collect in the future. For more information, see [Google Analytics 4 Custom dimensions and metrics](https://support.google.com/analytics/answer/10075209?hl=en){:target="_blank"}.

### Understanding event parameters

Similar to how properties relate to Segment events, parameters provide additional information about the ways users interact with your website. For example, when someone views a product you sell, you can include parameters that describe the product they viewed, like `product_name`, `category`, and `price`.

Automatically Collected and Enhanced Measurement events include a defined set of parameters by default. Google also provides a set of required and optional parameters to include with each Recommended event, and you can add more event parameters when you need them. Segment recommends that you review GA4’s list of defined event parameters, as anything beyond that list is a custom event parameter. The [Event collection limits](https://https://support.google.com/analytics/answer/9267744){:target=_blank”} also impact how many Custom Definitions your GA4 instance allows and how many parameters you can send with each event.

### Conversion events

Some of Segment's prebuilt [Available Actions](/docs/connections/destinations/catalog/actions-google-analytics-4-web/#available-actions) that map to Google's recommended events are automatically marked as a conversion in your Analytics dashboard. For example, when you add an "Order Completed" event, it will show up in your Analytics dashboard as "purchase" with the **Mark as conversion** toggle toggled on by default. However, for other events, such as "Add to Cart", you must manually toggle the **Mark as conversion** setting on in your Analytics dashboard. If you don't mark the event as a conversion, it will not show up as a conversion in your built-in reports. You can read more [about conversion events](https://support.google.com/analytics/answer/9267568?sjid=1275909514202748631-NA){:target="_blank"} in Google's documentation.

## Consent mode
[Consent mode](https://support.google.com/analytics/answer/9976101?hl=en){:target="_blank"} is a feature provided by Google in the context of its products, particularly the Gtag library and Google Analytics. As of March 6, 2024, Google announced that consent mode must function for European Economic Area (EEA) users, otherwise data from EEA users won't process. 

Consent mode in the Gtag library and Google Analytics is designed to help website owners comply with privacy regulations, such as the General Data Protection Regulation (GDPR) in the European Union. It allows website owners to adjust how these tools use and collect data based on user consent.

With consent mode, you can configure your website to dynamically adjust the tracking behavior of the Gtag library and Google Analytics based on the user's consent status. If a user provides consent to data processing, both the Gtag library and Google Analytics can collect and use that data for analysis. If a user doesn't provide consent, both tools limit data collection to essential functions, helping businesses respect user privacy preferences. 

Consent mode may involve updates to your sources outside of Segment, such as incorporating a consent management system for consent functionality.

See [set up consent mode on websites](https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced#update_consent_state){:target="_blank"} for more information. 

### Set up consent mode

To enable consent mode for your Google Analytics 4 Web destination: 
1. Navigate to **Connections > Destinations** and select your Google Analytics 4 Web** destination. 
2. Go to the **Settings** tab of the destination.
3. Click the toggle on for **Enable Consent Mode**, this calls gtag(‘consent’,’default’) with the defined parameters when the gtag library loads.
4. Set the following fields with your organization’s determination of granted or denied:

    Field | Value
    ----- | ------
    Default Ad Storage Consent State | Granted or Denied
    Default Analytics Storage Consent State | Granted or Denied
    Ad User Data Consent State | Granted or Denied
    Ad Personalization Consent State | Granted or Denied

5. Use your consent management platform to prompt the visitor. Ask the visitor to grant or deny consent for the applicable types.
6. Pass the updated state as properties in the `page()` event after the next page load if you decide to change the consent defaults. For example,

    ```
    analytics.page('Consent Update', {
        'Ads Storage Consent State': 'false',
        'Analytics Storage Consent State': 'false'
    });
    ```
7. As soon as the page loads and the set configuration fires to the Google Analytics SDK, Segment issues a consent mode update command. Map the properties you defined to collect consent state changes to the Set Configurations Fields mapping. You can choose to do this from 1 of 2 options in steps 4 and 5.
        1. Navigate to **Connections > Destinations** and select your Google Analytics 4 Web destination. 
        2. Go to the **mappings** tab of the destination. 
        3. Select the mapping you want to edit.'
        4. *(Option 1)* Under the **Select mappings** section, select `Granted` for these fields:
            * Ads Storage Consent State
            * Analytics Storage Consent State
            * Ad User Data Consent State
            * Ad Personalization Consent State
            You can manually select `Granted` or `Denied` from the dropdown menu for Advanced consent mode settings, and type in `granted` or `denied` for basic consent mode settings.
        5. *(Option 2)* Under the **Select mappings** section, create an event variable to directly grab the value from the payload (for example, `properties.adStorageConsentState`). Ensure it translates to `granted` or `denied`. You can use an insert or [replace function](/docs/connections/destinations/actions/#replace-function) to translate other values to `granted` or `denied`. Do this for these fields:
            * Ads Storage Consent State
            * Analytics Storage Consent State
            * Ad User Data Consent State
            * Ad Personalization Consent State

When these properties are available, they send to the `update` command.

If you have any questions setting up consent mode, reach out to [friends@segment.com](mailto:friends@segment.com).

{% include components/actions-fields.html settings="true"%}

## FAQ and troubleshooting

### Debug mode

The Google Analytics 4 debug mode, [DebugView](https://support.google.com/analytics/answer/7201382?hl=en){:target="_blank"} is supported with the Google Analytics 4 Web destination. DebugView displays the events and user properties that Analytics collects from a user in real-time. This can be helpful when troubleshooting your implementation.

### Send events from both the browser and the server 

With Google Analytics 4 Web, events are sent from the browser to GA4. If you use Segment’s [Google Analytics 4 Cloud destination](/docs/connections/destinations/catalog/actions-google-analytics-4/#benefits-of-google-analytics-4-cloud) to send events through the API and tie data between client-side and server-side, you need to pass the same Client ID from the browser and the server. To do this, fetch the Gtag-generated **clientId** on the web client and pass it to Segment as a property. For more information, see [Google Analytics 4 destination: User Identification](/docs/connections/destinations/catalog/actions-google-analytics-4/#user-identification) on the next steps. Additionally, when using Gtag, Google generates a session_id and session_number when a session begins. The session_id and session_number generated on the client can be passed as Event Parameters to stitch events sent through the API with the same session that was collected client-side, see [Using Gtagjs and Google Analytics 4 Cloud Destination](/docs/connections/destinations/catalog/actions-google-analytics-4/#using-gtagjs-and-google-analytics-4-cloud-destination) for more information and an example. 

The client_id and the session_id are both cookies stored in the user browser. You can use [Google gtag get commands](https://developers.google.com/tag-platform/gtagjs/reference#get){:target=”_blank”} or other cookie methods to parse these values from the _ga cookie and _ga_measurementId cookie:
- If your _ga cookie is GA1.1.1783165678.1701112990 then 1783165678.1701112990 is your client_id
- If your _ga_M12454XDR cookie is GS1.1.1710342977.347.1.1710343074.0.0.0 then 1710342977 is your session_id

You are not required to send a session number for server-side hits. Session metrics come from the client-side data after GA4 stitches server-side event data to the client-side session.

> success ""
> Segment recommends that you enable the GA4 Web destination first then incorporate GA4 Cloud destination to augment your client-side tracking, as a hybrid GA4 application is an advanced implementation. Segment also recommends that you have deep knowledge of GA4 session-stitching, troubleshooting, and known caveats of the GA4 Measurement Protocol prior to implementing the Google Analytics 4 destination.

### Additional (unmapped) events are sent to GA4

Google Analytics 4 collects events triggered by basic interactions with your site. For more information about which interactions are automatically collected, see [Google Analytics 4 Automatically Collected events](https://support.google.com/analytics/answer/9234069?hl=en){:target="_blank"}.

### Data takes a long time to appear in Google's reports

Google may take [24-48 hours](https://support.google.com/analytics/answer/9333790){:target="_blank"} to process data sent to Google Analytics. As a result, the Google Analytics user interface may not reflect the most current data. The Google Analytics [Realtime report](https://support.google.com/analytics/answer/9271392){:target="_blank"} displays activity on your site as it happens; however, events seen in Realtime reports do not always equate to how the data is processed in the standard reports. This disconnect between events seen in Realtime reports and Standard reports happens when a Custom Definition is not defined in the GA4 Admin panel.

### Data is not sent to Google

For event data to be sent downstream to Google Analytics:

1. Configure and enable the  **Set Configuration Fields** mapping. This mapping is required for data to be sent downstream because it sets configuration to the GA4 Measurement ID indicated in the Settings and establishes data flow using the `config` command.
2. Confirm you call `analytics.page()` on page load. Analytics.js requires an initial Page call to send data to Google Analytics 4 Web. _The Segment snippet includes this initial call by default._
3. Send data with an event: typically this is a `page_view` as your first event.

Google has introduced a feature for collecting [user-provided data](https://support.google.com/analytics/answer/14077171?hl=en&utm_id=ad){:target="_blank"}, which Segment doesn't support. If you’ve enabled this feature in your Google Analytics 4 account, it is irreversible and may cause issues with receiving data. If everything else is set up correctly but data is still not appearing, check if this feature is enabled. If it is, you’ll need to create a new GA4 space to resolve the issue.

 > info "If you toggled Page Views in your Settings to “On”, the page_view event automatically sends when the Set Configuration Mapping is triggered"
 > If you need to override this setting for your particular use case, see [Can I override my send_page_view selection that I declared in Settings?](#can-i-override-my-send_page_view-selection-that-i-declared-in-settings)

If no events are flowing to your GA4 instance, use one of the Debugging Tools to check the sequence of GA4 events.

### Duplicate `page_view` events in GA4

If you are sending multiple `gtag(‘config’)` commands called from Set Configuration mapping on one page before a new DOM has loaded, and you have defined `send_page_view: true` with each ‘Config’ event, you may see duplicate `page_view` events sent to your GA4 measurement id. If this is the case, see Google's documentation on [Ignoring duplicate instances of on-page configuration](https://support.google.com/analytics/answer/9973999?hl=en#:~:text=as%20described%20below.-,Ignore%20duplicate%20instances%20of%20on%2Dpage%20configuration,Click%20Save.,-Give%20feedback%20about){:target="_blank"}. 

If your site is a Single Page Application (SPA), you may want to leave the **Ignore duplicate instances of on-page configuration** toggle disabled in the Google Tag Admin as a new DOM is not called on each new page path. If you have a SPA, disabled the **Ignore duplicate instances of on-page configuration** toggle, and have multiple Set Configuration mappings, use Segment's new **Send Page Views** field mapping to override the `send_page_view` parameter in your Settings. This selection takes precedence over what is defined in the Segment Settings. If you leave the selection for your destination undefined, it will fall back to what you selected in the Segment Settings.

If you enabled Enhanced Measurement, you might see additional `page_view` events. This happens when you enable the **Page changes based on browser history events** feature in the Advanced settings section of the **pageviews** settings. To avoid double counting page views on history state changes, disable the **Page changes based on browser history events** feature. See Google's [Manual pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag#manual_pageviews){:target="_blank"} documentation for more information.

### Manually send `page_view` events

If you prefer to keep the **Page Views** setting disabled and manually send `page_view` events, see Google's documentation, [Manually send `page_view` events](https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag#manually_send_page_view_events).

With Google Analytics 4 Web, you must configure a [Custom Event](/docs/connections/destinations/catalog/actions-google-analytics-4-web/#custom-event) mapping to manually send `page_view` events. When mapping the events, set the Event Name to `page_view`.

You can now override the send_page_view value defined in the Segment Settings for the GA4 destination. To override the `send_page_view` value, navigate to your Set Configuration Mapping, click “Show More Fields” to expose the field mapping, and select either True or False. This selection takes precedence over what is defined in the Segment Settings. If you leave this selection undefined, Segment uses the selection you made in the Segment Settings.

#### Tracking UTM Parameters

Segment automatically tracks UTM parameters when they are present in the URL and sends them to Google. For example, with the following URL, Segment would send `email_variation1&utm_medium=email&utm_source=email_promo&utm_campaign=summer_sale&utm_id=abcd` to Google:
`https://www.example.com/?utm_content=email_variation1&utm_medium=email&utm_source=email_promo&utm_campaign=summer_sale&utm_id=abcd`

By default, if the UTM values are found in the `page_location` parameter, GA4 automatically maps the campaign parameters to their appropriate value. There is no additional configuration required, unless you want to override what GA4 defines. This is true for both Event mappings and the Set Configuration mapping. If you modify the output of the `page_location` and the UTM parameters are not included, this might result in erroneous acquisition and attribution mapping. 

To observe this feature, trigger a `Page` call with UTM parameters present in the URL and navigate to the **Realtime overview** report in GA4 to see the resulting `page_view` event under the _Event count by Event name_ card. The Acquisition card in the Realtime overview report reflects First User acquisition, but may not reflect the parameters of the event if this was a second session event. 

### Pass Custom Event parameters to all events and Custom Item parameters to all recommended Ecommerce events

To pass custom event parameters to all events on the page, navigate to your Set Configuration Mapping, click **Show All Fields**, and enter any custom Event Parameters, including page_view. Any event parameters that have the same parameter key as your other event mappings will take precedence over what is set in the Set Configuration Mapping. 

To send custom item parameters, add the custom item parameter name in mappings where there is a Products array. Register your custom item parameter in the GA4 Admin panel if you would like this value processed in the GA4 UI. You can ONLY add custom item parameters in the Products array. If you add custom item parameters as an Event Parameter, they will be registered as an Event Parameter.

### My Events Send to the wrong Google ID

In each Event Mapping, there is a “Send To” parameter. Set this to “True” if you would like to include the send_to parameter and only send the event to the measurement_id configured in your settings. If you select “False” or do not enter a selection, GA4 Events will broadcast to all measurement IDs, including Google Ads IDs, on the page. These measurement IDs may be set outside of Segment. For more info on how the send_to parameter works, see Google's documentation on [Group and Route Data](https://developers.google.com/tag-platform/gtagjs/routing){:target="_blank"}.

### Can I override my send_page_view selection that I declared in the Settings?

Yes. In the Set Configuration Mapping, click Show All Fields and scroll to Send Page Views. Your selection overrides what is set within the Settings. This is helpful if you are updating the user_id or user_properties for all events on the page where you want to call the config command but do not want to send a page_view.

### Differences between the Google Analytics 4 Cloud and Google Analytics 4 Web destinations 

Segment's [Google Analytics 4 Cloud](/docs/connections/destinations/catalog/actions-google-analytics-4/) server-side destination uses Google's Measurement Protocol API to send event data server to server, whereas Segment's [Google Analytics 4 Web](/docs/connections/destinations/catalog/actions-google-analytics-4-web/) device-mode destination loads the gtag.js library client-side and uses Segment's event data to map to gtag.js events directly. Each destination has its own advantages and disadvantages. Your choice between the two depends on your specific use case, technical expertise, and the platforms from which you want to track data.

### User-provided data collection

Google has introduced a beta feature for collecting data provided by users, [User-provided data collection](https://support.google.com/analytics/answer/14077171?hl=en&utm_id=ad){:target="_blank"}. Note that this feature is currently not supported by Segment, and, acknowledging this feature policy in your Google Analytics 4 Account has irreversible effects.
