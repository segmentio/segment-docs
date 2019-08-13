---
title: Google Adwords New Experience
---


## Getting Started

If you are using the [New AdWords experience](https://support.google.com/adwords/answer/6095821?hl=en&ref_topic=3165803), you can enable the **Google AdWords New** Destination in the Segment catalog. The new AdWords now uses a Global Site Tag and uses event snippets.

**IMPORTANT**: Only use this destination if your AdWords account is using the _New_ Experience. If you are using Google Tag Manager as well, you should not add the global site tag again in your GTM containers. You should also disable any [Google AdWords](https://segment.com/docs/destinations/adwords/) destinations within the same source, since **Google AdWords** cannot load in conjunction with **Google AdWords New**.

How do I know which experience I'm using? [Here](https://support.google.com/google-ads/answer/6398605?hl=en) is how to find out.

You can use this destination to map your `.page()` calls to **Page Load Conversions** or `.track()` calls to **Click Conversions**.

Currently this is only supported on the browser.

## Page

If you want to map all your unnamed `.page()` calls to a default Page Load Conversion, you can enter it in our settings. However, if you created specific Page Load Conversions in AdWords that you'd like to map your named `.page()` calls in Segment, you can also do that by mapping the events in **Page Load Conversions** setting.

We will pass along all the `properties` of the page call such as `path`, `title`, `url`, etc. since the New AdWords will by default make these available in your remarketing campaigns.

If you want to send Google's semantic `value`, `currency`, or `transaction_id`, you can send these as integration specific options (however, we recommend just creating a Click Conversion instead and mapping them to `.track()` calls):

```javascript
analytics.page({}, {
  'Google AdWords New': {
    value: 25,
    currency: 'USD',
    order_id: 'order123'
  }
});
```

**NOTE**: The `'Google AdWords New'` is case sensitive. We ask for `order_id` rather than  `transaction_id` to stay more consistent with our own [ecommerce spec](https://segment.com/docs/spec/ecommerce/v2). However, we will send it as `transaction_id` in the request itself to satisfy Google's specifications.

## Track

You can map your custom `.track()` events to any **Click Conversions** you created inside AdWords. We will pass any `properties` so you can use them during your remarketing campaigns.

If you pass `properties.value`, `properties.currency`, or `properties.order_id`, we will map them to Google's semantic `value`, `currency`, or `transaction_id` respectively.

The only exception is that for `Order Completed` events, we will map Google's semantic `value` field to your `properties.revenue`.

## Multiple AdWords Account

If you are an enterprise that uses multiple AdWords accounts (usually managed by various third party agencies) you can override the top level default Google Conversion ID at the event level by entering it into the settings.

{% include content/integration-foot.md %} 
