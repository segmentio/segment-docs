---
title: 'Google Ads (Gtag) Destination'
beta: true
redirect_from: '/connections/destinations/catalog/google-adwords-new/'
strat: google
---

## Before you begin...

If you're using the [new Google Ads (Gtag) experience](https://support.google.com/adwords/answer/6095821?hl=en&ref_topic=3165803), you can enable the **Google Ads (Gtag)** Destination (previously called "Google Adwords New") in the Segment catalog. The new Google Ads uses a Global Site Tag (Gtag) and event snippets.

**IMPORTANT**: Only use this destination if your Google Ads account is using the _New_ (Gtag) Experience. If you are using Google Tag Manager (a separate product) as well, do not add the global site tag again in your GTM containers. You should also disable any [Google Ads (Classic)](https://segment.com/docs/connections/destinations/catalog/adwords/) destinations within the same source, since **Google Ads (Classic)** cannot load at the same times as **Google Ads (Gtag)**.

## Getting Started

You can use this destination to map your `.page()` calls to **Page Load Conversions** or `.track()` calls to **Click Conversions**.

Currently this is only supported on the browser.

## Page

If you want to map all your unnamed `.page()` calls to a default Page Load Conversion, you can enter it in our settings. However, if you created specific Page Load Conversions in Google Ads that you'd like to map your named `.page()` calls in Segment, you can also do that by mapping the events in **Page Load Conversions** setting.

Segment forwards all the `properties` of the page call, such as `path`, `title`, `url`, and so on, because by default Google Ads (Gtag) makes these available in your remarketing campaigns.

You can send Google's semantic properties, such as `value`, `currency`, or `transaction_id`, as integration specific options. However, we recommend just creating a Click Conversion instead and mapping them to `.track()` calls. The example below shows these properties as integration-specific options:

```javascript
analytics.page({}, {
  'Google Adwords New': {
    value: 25,
    currency: 'USD',
    order_id: 'order123'
  }
});
```

**NOTE**: The `'Google Ads (Gtag)'` is case sensitive. We ask for `order_id` rather than  `transaction_id` to stay more consistent with our own [ecommerce spec](https://segment.com/docs/connections/spec/ecommerce/v2). However, we will send it as `transaction_id` in the request itself to satisfy Google's specifications.

## Track

You can map your custom `.track()` events to any **Click Conversions** you created inside Google Ads. We will pass any `properties` so you can use them during your remarketing campaigns.

If you pass `properties.value`, `properties.currency`, or `properties.order_id`, we will map them to Google's semantic `value`, `currency`, or `transaction_id` respectively.

The only exception is that for `Order Completed` events, we will map Google's semantic `value` field to your `properties.revenue`.

## Multiple Google Ads Accounts

If you are an enterprise that uses multiple Google Ads Gtag accounts (usually managed by various third party agencies) you can override the top level default Google Conversion ID at the event level by entering it into the settings.
