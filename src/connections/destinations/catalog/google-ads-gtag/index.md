---
title: 'Google Ads (Gtag) Destination'
beta: true
redirect_from: '/connections/destinations/catalog/google-adwords-new/'
strat: google
name-override: true
id: 5a03bfe73156760001ab34ec
---
## Before you begin

If you're using the [new Google Ads (Gtag) experience](https://support.google.com/adwords/answer/6095821?hl=en&ref_topic=3165803), you can enable the **Google Ads (Gtag)** Destination (previously called "Google Adwords New") in the Segment catalog. The new Google Ads uses a Global Site Tag (Gtag) and event snippets.

> info "Info message."
> **IMPORTANT**: Only use this destination if your Google Ads account is using the _New_ (Gtag) Experience. If you're using Google Tag Manager (a separate product) as well, don't add the global site tag again in your GTM containers. You should also disable any [Google Ads (Classic)](/docs/connections/destinations/catalog/adwords/) destinations within the same source, since **Google Ads (Classic)** can't load at the same times as **Google Ads (Gtag)**.

## Getting Started

You can use this destination to map your `.page()` calls to **Page Load Conversions** or `.track()` calls to **Click Conversions**.

Currently this is only supported on the browser.

## Page

If you want to map all your unnamed `.page()` calls to a default Page Load Conversion, you can enter the AdWords Conversion ID in **Settings > Default Page Conversion**. However, if you created specific Page Load Conversions in Google Ads that you'd like to map your named `.page()` calls in Segment, you can map the events in **Settings > Page Load Conversions**.

Segment forwards all the `properties` of the page call, such as `path`, `title`, `url`, because by default, Google Ads (Gtag) makes these available in your remarketing campaigns.

You can send Google's semantic properties, such as `value`, `currency`, or `transaction_id`, as integration specific options. However, Segment recommends you to  create a **Click Conversion** instead, and map them to `.track()` calls. The example below shows these properties as integration-specific options:

```javascript
analytics.page({}, {
  'Google Adwords New': {
    value: 25,
    currency: 'USD',
    order_id: 'order123'
  }
});
```

> note ""
> **NOTE:** The `'Google Adwords New'` is case sensitive. Segment prefers you to use `order_id` rather than  `transaction_id` to stay more consistent with the [ecommerce spec](/docs/connections/spec/ecommerce/v2). However, Segment will send it as `transaction_id` in the request itself to satisfy Google's specifications.

## Track

You can map your custom `.track()` events to any **Click Conversions** you created inside Google Ads. Segment passes any `properties` so you can use them during your remarketing campaigns.

If you pass `properties.value`, `properties.currency`, or `properties.order_id`, Segment maps them to Google's semantic `value`, `currency`, or `transaction_id` respectively.

The only exception is that for `Order Completed` events, Segment will map Google's semantic `value` field to your `properties.revenue`.

## Troubleshooting AdWords Conversions
To figure out if an event is flagged for Conversion by the AdWords SDK, follow these steps:
1. Confirm that the events mapped to Google Ads Conversion are being sent in device-mode while using the Segment Analytics.js library. To do this:
    1. Go to **Connections > Sources** in your workspace and choose your Source.
    2. Go to the **Debugger** tab.
    3. Click on an event and look at the **Raw** view to make sure the events have a library name of `analytics.js`. There should be a snippet of code that looks like this:

      ```js
        "library": {
          "name": "analytics.js",
      ``` 

2. Verify that the [Google Conversion ID](/docs/connections/destinations/catalog/google-ads-gtag/#google-conversion-id) in your Segment workspace is correct.
3. Find your ad online and click on it. This will redirect you to your website.
4. Open the Network tab in your browser and make sure the **Preserve log** checkbox is checked and **All** is selected. Keep this Network tab and webpage open.

      ![Network tab](../../images/network-tab.png)

5. Go to the **Settings** tab for your Gtag destination in Segment on a new webpage and choose **Click Conversions** to look at the mapped `track()` events and make sure the events are mapped to the correct **Adwords Conversion Label**.

      ![Edit Settings](../../images/conversion-settings.png)

6. Go back to your website and trigger the event mapped to the conversion. For example, as shown in the image above, it would be `Order Completed`.
7. Go to the Network tab in your browser and enter the **Adwords Conversion Label** linked to the event you triggered in the **Filter** field.

      ![Network tab](../../images/network-tab-search.png)

8. See if the value for the `ct_cookie_present` changed to `true`. If `true`, it means that Adwords counts the event as a conversion.  

## Multiple Google Ads Accounts

If you are an enterprise that uses multiple Google Ads Gtag accounts (usually managed by various third party agencies) you can override the top level default Google Conversion ID at the event level by entering it into the settings.
