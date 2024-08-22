---
title: Facebook Pixel Destination
rewrite: true
strat: facebook
id: 5661eb58e954a874ca44cc07
---
[Facebook Pixel](https://developers.facebook.com/docs/facebook-pixel){:target="_blank"} lets you measure and optimize the performance of your Facebook Ads, making conversion tracking, optimization and remarketing easier than ever. The Facebook Pixel Destination is open-source. You can browse the code on [GitHub](https://github.com/segment-integrations/analytics.js-integration-facebook-pixel){:target="_blank"}.

> warning ""
> Facebook deprecated the modular Ads For Websites suite, which previously comprised Facebook Custom Audiences and Facebook Conversion Tracking. Segment consolidated those two destinations into this new and improved Facebook Pixel destination.



**Use cases**

* [Increase conversions by retargeting shopping cart abandoners on Facebook](https://segment.com/recipes/abandon-cart-retargeting-facebook/){:target="_blank"}


## Other Facebook Destinations supported by Segment
This page is about the **Facebook Pixel** destination. For documentation on other Facebook destinations, see the pages linked below.

| **Facebook Destination**                                                                                                      | Supported by Engage |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **[Facebook App Events](/docs/connections/destinations/catalog/facebook-app-events/){:target="_blank"}**                      | Yes                 |
| **[Facebook Offline Conversions](/docs/connections/destinations/catalog/facebook-offline-conversions/){:target="_blank"}**    | Yes                 |
| **[Facebook Pixel](/docs/connections/destinations/catalog/facebook-pixel/){:target="_blank"}**                                | No                  |
| **[Facebook Custom Audiences](/docs/connections/destinations/catalog/personas-facebook-custom-audiences/){:target="_blank"}** | Yes                 |
| **[Facebook Conversions API](/docs/connections/destinations/catalog/actions-facebook-conversions-api/){:target="_blank"}**    | Yes                 |


## Getting started

1. From the Segment web app, click **Catalog**.
2. Search for "Facebook Pixel" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your `pixelId` from the [Pixels tab in Facebook Ads Manager](https://www.facebook.com/ads/manager/pixel/facebook_pixel){:target="_blank"}.

When you enable Facebook Pixel as a destination in your Segment workspace, Segment automatically initializes Facebook's pixel with your `pixelId` upon loading `analytics.js`. This means you should remove the native Facebook script from your page. 

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```javascript
analytics.page();
```

Segment maps `analytics.page()` to Facebook's `fbq('track', "PageView")` method and will forward all page views accordingly. The integration will ignore any parameters you pass to `analytics.page()`.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('ze8rt1u89', {
  name: 'Zaphod Kim',
  gender: 'Male',
  email: 'jane.kim@example.com',
  phone: '1-401-555-4421',
  address: {
    city: 'San Francisco',
    state: 'Ca',
    postalCode: '94107'
  }
});
```

When you make an Identify call with Segment, it will update Facebook Pixel the next time the user loads a page on your website. Facebook Pixel does not support immediately updating user properties using Identify. When you perform an Identify call in Segment, it will update in Facebook Pixel using their Advanced Matching feature.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track("My Custom Event", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

Segment's analytics.js client-side integration supports all three [documented](https://developers.facebook.com/docs/facebook-pixel/api-reference#events){:target="_blank"} methods of sending events to Facebook.

At any time, you can define a custom `contentType` on the integration options. If the value is present, it takes
precedence over any other setting or default value.

```javascript
analytics.track('Checkout Started', {
    revenue: 2,
    products: [{
      id: "FB_product_1234",
      currency: "USD",
      category: "tshirts",
      quantity: 1,
      price: 2
    }]
  },
  { 'Facebook Pixel': { contentType: 'mycustomtype' } }
);
```

### Standard events

To send *Standard* events, use the Segment destination setting labeled "Map Your Events to Standard FB Events". Then, any time Segment receives one of the events in that mapping, it will be sent to Facebook as the standard event you specified. All properties you included in the event will be sent as event properties. For more information, view [Meta's conversion tracking documentation](https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking/#standard-events){:target="_blank"}.

In addition, Segment sends the following event types as Standard events:

- `Order Completed`, which Segment sends as `Purchase`
- `Product Added`, which Segment sends as `AddToCart`
- `Product List Viewed`, which Segment sends as `ViewContent`
- `Product Viewed`, which Segment sends as `ViewContent`
- `Products Searched`, which Segment sends as `Search`
- `Checkout Started`, which Segment sends as `InitiateCheckout`

Facebook requires a currency for `Purchase` events. If you leave it out a currency, Segment will set a default value of `USD`.

You can set custom properties for the events listed above. Use the setting "Standard Events custom properties" to list all the properties you want to send.

Here is how you'd specify standard events in the settings view:

![event mapping](images/event-mapping.png)

You can map more than one Track event to the same Facebook standard event.

### Legacy events

To send *Legacy Conversion* events, use the Segment setting called "Legacy Conversion Pixel IDs". Any events that appear in that mapping will be sent to Facebook with the specified Pixel ID used as the Facebook Pixel `eventName`. Conversion events only support `currency` and `value` as event properties, so only these will be associated with the event. `currency` will default to `USD` if left out.

### Custom events

To send *Custom* events, send any event that does not appear in either mapping. All properties you include in the event are included as event properties. Segment sends any events you don't add to the "Map Your Events to Standard FB Events" setting to Facebook as a custom event. There is no setting to add custom events in the Facebook Pixel Destination configuration.

### Timestamps

Facebook Pixel uses a custom timestamp format: an ISO 8601 timestamp without timezone information. For the following event fields, if you pass in a JavaScript `Date` object, it will be converted to this custom format. If you pass in a string, Segment assumes that the string is already formatted as Facebook expects:

- `checkinDate`
- `checkoutDate`
- `departingArrivalDate`
- `departingDepartureDate`
- `returningArrivalDate`
- `returningDepartureDate`
- `travelEnd`
- `travelStart`

### Advanced matching

The Segment Facebook Pixel integration supports [Advanced Matching](https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching){:target="_blank"}, which enables you to send your customer data through the pixel to match more website actions with Facebook users. With this additional data, you can report and optimize your ads for more conversions and build larger re-marketing audiences. When the page loads, and before Segment fires off the pixels, Segment checks for traits that the user has been previously identified with and sends that along with each call.

Facebook accepts the following properties:

- First name
- Last name
- Email
- Phone number
- Gender
- Birthday
- City
- State
- Zip code

If you follow Segment's [spec](/docs/connections/spec/identify/#traits), these properties send in the correct format.

When you use Advanced Matching, Facebook also accepts an `external_id`. This can be any unique ID from the advertiser, like loyalty membership IDs, user IDs, and external cookie IDs. To send an `external_id` to Facebook you can either:

- Send the Segment `userId` or `anonymousId` as `external_id` using the **Use User ID or Anonymous ID as External ID** setting
- Indicate which user trait you would like Segment to map to `external_id` using the **Advanced Match Trait Key for External ID** setting

## Limited data use

{% include content/facebook-ldu-intro.md %}

> info ""
> The **Use Limited Data Use** destination setting is disabled by default for all Facebook destinations except for Facebook Pixel. You must enable the setting manually from the destination settings if you're using other Facebook destinations.

{% include content/facebook-ldu-params.md %}

Facebook uses `context.ip` to determine event geolocation.

You can manually change the Data Processing parameters by adding settings to the `integrations` object. For Facebook Pixel, you must store these settings in the [Load object](/docs/connections/sources/catalog/libraries/website/javascript/#load-options) so that Segment can set them *before* it calls `init`. The following example shows how you might set custom Data Processing parameters in Analytics.js.

```javascript
analytics.load("replace_with_your_write_key", {
  integrations: {
    'Facebook Pixel': {
      dataProcessingOptions: [['LDU'], 1, 1000]
    }
  }
});
```

## Map categories to Facebook content types

If you're using real estate, travel, or automotive [Dynamic Ads](https://www.facebook.com/business/learn/facebook-create-ad-dynamic-ads){:target="_blank"} you can map `category` values to `content_type` values. For example, you might map the category "cars" to the "vehicle" content type so Facebook promotes relevant vehicles from your catalog. To understand which content types you can map to, consult the [Facebook Dynamic Ads documentation](https://developers.facebook.com/docs/marketing-api/dynamic-ad){:target="_blank"}.

For most implementations, Segment recommends leaving these mappings blank. By default, Segment sets `content_type` to "product".

The same mapping can be used to change the `content_id` from the default value (product_id or the sku) to anything specific for Meta Pixel. For more information about required Meta Pixel events, see Meta's [Required Meta Pixel events and parameters for Advantage+ catalog ads](https://www.facebook.com/business/help/606577526529702?id=1205376682832142){:target="_blank”} documentation.

## Troubleshooting

### PII blocklisting

Facebook enforces strict guidelines around sending Personally Identifiable Information (PII) as properties of Pixel events. To adhere to these guidelines, Segment automatically scans `track` event properties for PII and removes any that get flagged from the event to Facebook. The following keys are currently filtered:

- email
- firstName
- lastName
- gender
- city
- country
- phone
- state
- zip
- birthday

Any `track` events with properties containing those keys will be sent to Facebook with those properties omitted.

If you have events that use any of those keys for non-PII properties, you can manually allowlist them using the **Allowlist PII Properties** setting. You may also add to this list and/or optionally hash blocklisted properties with the **Blocklist PII Properties** setting.

### Inconsistent or missing conversions

Facebook conversion pixels can fire inconsistently due to page redirects or reloads before the pixel has finished loading on the page. Make sure your page doesn't redirect or reload for at least 300ms after the conversion event happens. In some cases a delay of 500ms is necessary.

Segment recommends using the `trackLink` or `trackForm` helpers to delay the page redirect. For more on these methods, view [the track link documentation](/docs/connections/sources/catalog/libraries/website/javascript#track-link). You can extend the delay by [setting the timeout to 500ms](/docs/connections/sources/catalog/libraries/website/javascript#extending-timeout).

### Extra or duplicate conversions

This may be due to conversion events being sent from your development, staging, or testing environments. Segment recommends setting up separate sources for each environment, which will let you either point events to test conversion pixels in Facebook Conversion Tracking or turn off Facebook Conversion Tracking completely in non-production environments.

Double check that your mapped conversion events aren't happening anywhere else on your site. If the user reloads the conversion page or re-triggers the tracked event, they may be double counted.

Facebook's conversion reports count view-through conversions as well as click-through conversions by default. You can change that setting inside Facebook Conversion Tracking in the report attribution settings.

### Facebook conversions not matching Google Analytics

Facebook counts conversions per person, as opposed to Google Analytics which counts per browser cookie session (unless you're using [Google Analytics User-ID](/docs/connections/destinations/catalog/google-analytics/#user-id)).

If someone saw or clicked on your ad on a mobile phone then later came back directly to purchase on a desktop machine, Google Analytics wouldn't know that this was the same person, but Facebook would. In that scenario, Google Analytics would count two unique visits with a conversion last attributed to a direct visit on desktop. Facebook would count one conversion with the conversion properly attributed to the last ad click/view on mobile.

### Are Facebook Pixel events reflected in Facebook Ads Manager in real-time?


Facebook Pixel events typically don't display in real-time within the Facebook Ads Manager or other reporting interfaces. While Facebook Pixel events are tracked in near real-time, there might be some delay before you see them in your reporting. Visit [Facebook's documentation](https://www.facebook.com/business/help/147965221941551){:target="_blank"} to learn more. 

### Blocklisting nested properties 

Segment does not handle nested properties that need to be blocklisted, including the standard PII properties. If you have properties you would like to blocklist, you can use [destination filters](/docs/connections/destinations/destination-filters/) to drop those properties before they are sent downstream. 


{% include content/client-side-script-unverified.md %}
