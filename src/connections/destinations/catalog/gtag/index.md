---
title: 'Gtag Destination'
beta: true
hidden: true
strat: google
---

The Gtag Destination is currently in a closed Early Access Preview. If you are interested in joining this preview, please [contact us](https://segment.com/help/contact/) or your CSM if you are interested in testing this new destination. The use is governed by [(1) Segment First Access](https://segment.com/docs/legal/first-access-beta-preview/) and Beta Terms and Conditions and [(2) Segment Acceptable Use Policy](https://segment.com/docs/legal/acceptable-use-policy/).


## Getting Started

The Google Site Tag (Gtag) Device Mode destination allows you to unify tracking across the Google Suite using the gtag.js library. Our early Access Preview Gtag Destination currently only supports sending data to Google Analytics. All you have to do is drop in your **Google Measurement ID** into your settings. You can either choose to use a Web Measurement Id or a Web + App Measurement Id.


## Page calls

When you make a [Page call](/docs/spec/page), Segment send a pageview to Google Analytics. Pageviews can be sent from the browser.

The resulting `page` event name in Google Analytics corresponds to the `fullName` of your page event. The `fullName` is a combination of the `category` and `name` parameters. For example, `analytics.page('Home');` produces a `Home` Page event in GA's dashboard, but `analytics.page('Retail Page', 'Home');` produces an event called `Retail Page Home`.

### Virtual Pageviews

Virtual pageviews are when you send a pageview to Google Analytics when the page URL didn't actually change. You can do this through Segment by making a [Page call](/docs/spec/page) with optional properties, as in the example below.

```js
analytics.page({
  title: 'Signup Modal',
  url: 'https://segment.com/#signup',
  path: '/#signup',
  referrer: 'https://segment.com/'
});
```

### URL Query Strings

By default Segment only sends the domain and path to Google Analytics. For example, if someone views the page at on `http://domain.com/page/?xyz=123&r=5`, Segment sends `http://domain.com/page/` URL to Google Analytics.

In some cases, like using Google Analytics to track search queries, you might want to pass the whole URL including a query string to Google Analytics. To enable this, go to the Gtag destination settings, and check the **Include the Query String** option in the Advanced Options.

## UTM parameters

Segment highly recommends Analytics.js, the device-mode Javascript library, for collecting UTM parameter data since it all happens automatically.

Your UTM params must be passed in the `context` object in `context.campaign`. For Google Analytics `campaign.name`, `campaign.source` and `campaign.medium` all need to be sent together for things to show up in reports. The other two params (`campaign.term` and `campaign.content`) are both optional, but will be forwarded to GA if you send them to Segment.



## Identify

It is against Google's terms of service to pass Personally Identifiable Information (PII) to your Google Analytics reporting interface. For that reason Segment will never pass anything from an `[identify](/docs/spec/identify)` call to Google unless you specifically tell us to. You can read about Google's best practices for avoiding this [here](https://support.google.com/analytics/answer/6366371?hl=en).

**User ID**
Google Analytics Universal tracking method allows you to set a user ID for your identified visitors. [Read more here](https://support.google.com/analytics/answer/3123663).

To use this feature you must enable User-ID in your Google Analytics property and create a User-ID view, [read more here](https://support.google.com/analytics/answer/3123666).

If you want to pass the `id` from your `[identify](/docs/spec/identify)` calls to the Gtag destination settings and - enable

**Send User ID**.
Here's an example:

```js
analytics.identify('12345', {
  email: 'example@example.com',
  name: 'Jake Peterson'
});
```

In this example we will set the `User-ID` to `12345` for Google Analytics, but we won't share the `email` or `name` traits with Google.

If you are passing an **email**, **phone number**, **full name** or other PII as the `id` in `[identify](/docs/spec/identify)` do not use this feature. That is against the Google Analytics terms of service and your account could be suspended.

**Custom Dimensions**
Google Analytics has multiple scopes for each custom dimension: hit (synonymous with events), session, user, and product (required enhanced ecommerce to be enabled). Our device-mode Analytics.js library supports all of them.

**Configuring Custom Dimensions:**
First, configure the Custom Dimensions in your Google Analytics admin page. [Read how to set those up here](https://support.google.com/analytics/answer/2709829?hl=en).

Once you are set up in Google Analytics, you are ready to map traits and properties to your custom dimensions.

From your Segment Dashboard, open the destinations catalog and select the Gtag destination, then Settings. Locate Custom Dimensions and declare the mapping.

Here's an example of mapping "Gender" to dimension "1" and "User Type" to dimension "2":

On Segment:

![](https://paper-attachments.dropbox.com/s_AF65D4F30D648EA37CFEC034E6486291A172E55587ACD64222BC0CD5040E4CB4_1589909213469_Screen+Shot+2020-05-19+at+10.26.23+AM.png)


On Google:

![](https://paper-attachments.dropbox.com/s_AF65D4F30D648EA37CFEC034E6486291A172E55587ACD64222BC0CD5040E4CB4_1589909276093_Screen+Shot+2020-05-19+at+10.27.49+AM.png)


**Note:** A particular trait or property may only be mapped to a single Custom Dimension at a time.
Once all your dimensions have been mapped, we will check user traits and properties in `[identify](/docs/spec/identify)`, `[track](/docs/spec/track)` and `[page](/docs/spec/page)` calls to see if they are defined as a dimension. If they are defined in your mapping, we will send that dimension to Google Analytics.

**Note:** Traits in `[Identify](/docs/spec/identify)` calls that map to Custom Dimensions will only be recorded to Google Analytics when the next `[track](/docs/spec/track)` or `[page](/docs/spec/page)` call is fired from the browser.

Continuing the example above, we can set the **Gender** trait with the value of **Male**, which maps to `dimension9`, and it will be passed to Google Analytics **when we make the 'Viewed History'** `[**track**](/docs/spec/track)` **call**.

```js
analytics.identify({
  Gender: 'Male'
});
analytics.track('Viewed History');
```

## Track

We'll record a Google Analytics event whenever you make a `[track](/docs/spec/track)` call. You can see your events inside Google Analytics under **Behavior** -> **Events** -> **Overview**. Keep reading for more details about the Google Analytics event category, action, label, value and how to populate them.

Events can be sent from the browser. Here's a basic [track call](/docs/spec/track) example:

```js
analytics.track('Logged In');
```

For this example these event attributes are sent to Google Analytics:

| **Event Category** | All       |
| ------------------ | --------- |
| **Event Action**   | Logged In |

And another `[track](/docs/spec/track/)` example, this time with all Google Analytics event parameters:

```json
{
  "userId": "12345",
  "action": "track",
  "event": "Logged In",
  "properties": {
    "category": "Account",
    "label": "Premium",
    "value": 50
  }
}
```

That call will create a Google Analytics event with these attributes:

| **Event Category** | Account   |
| ------------------ | --------- |
| **Event Action**   | Logged In |
| **Event Label**    | Premium   |
| **Event Value**    | 50        |


**Non-interaction Events**
To create an event with the `nonInteraction` flag just pass us an event property labeled `nonInteraction` with the value of 1. You can also set all events to be non-interactive by default in the Advanced Options.

Here's an example:

```json
{
  "action": "track",
  "event": "Viewed Legal Info",
  "properties": {
    "nonInteraction": 1
  }
}
```

## E-Commerce

Segment supports Google Analytics basic e-commerce tracking across all our libraries. All you have to do is adhere to our [e-commerce tracking API](/docs/spec/ecommerce/v2/) and we'll record the appropriate data to Google Analytics.

### Required Steps**
All of our [e-commerce events](/docs/spec/ecommerce/v2/) are recommended, but not required. The only required event is `Order Completed`. For each order completed you must include an `orderId`, and for each product inside that order, you must include an `id` and `name` for each product. **All other properties are optional**.

The most important thing to remember in Google's Universal Analytics is to enable e-commerce tracking for the view you want to track transactions to. This can be done inside of Google Analytics by clicking:
**Admin > View Settings > Ecommerce Settings switch to ON**

Without this step transactions will not show up in your reports.


## Enhanced E-Commerce

Segment supports Google Analytics Enhanced E-Commerce tracking in our gtag destinations. Enhanced Ecommerce allows you to derive insights by combining impression data, product data, promotion data, and action data. This is required for product-scoped custom dimensions.
To get started, you need only enable enhanced ecommerce and adhere to our standard [e-commerce tracking API](/docs/spec/ecommerce/v2/), and we'll record the data to Google Analytics with their enhanced ecommerce API.

In order to see Enhanced E-Commerce data in your reports, you must be using Google Analytics Universal and enable Enhanced E-Commerce in your Google Analytics:
**Admin > View Settings > Enhanced Ecommerce Settings switch to ON**

**Required Steps (enhanced)**
Similar to regular e-commerce, the only required event is `Order Completed`. This call also must include an `orderId` and an array of products, each containing an `id` or `name`.

For all events that include product details you must pass either `name` or `product_id`. For `product_id` we default to `properties.product_id` and fallback to `properties.sku`.

**All other properties are optional**. The Refunded Order event also requires an `orderId`.

**Measuring Checkout Steps**
To take full advantage of all the features of Enhanced E-commerce, you'll want to take advantage of some specific events. The biggest differentiator between e-commerce and enhanced e-commerce is support for checkout steps. To take advantage of tracking your checkout funnel and measuring metrics like cart abandonment, etc, you'll first need to configure your checkout funnel in the Google Analytics admin interface, giving easily readable labels to the numeric checkout steps:

![](https://paper-attachments.dropbox.com/s_AF65D4F30D648EA37CFEC034E6486291A172E55587ACD64222BC0CD5040E4CB4_1589909326140_Screen+Shot+2020-05-19+at+10.28.39+AM.png)


Then you'll instrument your checkout flow with `Viewed Checkout Step` and `Completed Checkout Step` for each step of the funnel you configured in the Google Analytics admin interface, passing the step number and step-specific options through as a property of those events:

    //upon arrival at first checkout step ('Review Cart' per the screenshot example above)
    analytics.track('Viewed Checkout Step', {
      step: 1
    });

    //upon completion of first checkout step ('Review Cart')
    analytics.track('Completed Checkout Step', {
      step: 1
    });

    //upon arrival at second checkout step ('Collect Payment Info' per the screenshot example above)
    analytics.track('Viewed Checkout Step', {
      step: 2
    });

    //upon completion of this checkout step ('Collect Payment Info')
    analytics.track('Completed Checkout Step', {
      step: 2,
    //if this is the shipping step
      shippingMethod: 'FedEx',
    //if this is the payment step
      paymentMethod: 'Visa'
    });

    //upon arrival at third checkout step ('Confirm Purchase Details' per the screenshot example above)
    analytics.track('Viewed Checkout Step', {
      step: 3
    });

    //upon completion of third checkout step ('Confirm Purchase Details')
    analytics.track('Completed Checkout Step', {
      step: 3,
    //you will need to provide either an empty shippingMethod or paymentMethod for the event to send.
      shippingMethod: '' // or paymentMethod: ''
    });

    //upon arrival at fourth checkout step ('Receipt' per the screenshot example above)
    analytics.track('Viewed Checkout Step', {
      step: 4
    });

    //upon completion of fourth checkout step ('Receipt')
    analytics.track('Completed Checkout Step', {
      step: 4,
    //you will need to provide either an empty shippingMethod or paymentMethod for the event to send.
      shippingMethod: '' // or paymentMethod: ''
    });

*Note*: `shippingMethod` and `paymentMethod` are semantic properties so if you want to send that information, please do so in this exact spelling!

You can have as many or as few steps in the checkout funnel as you'd like. The 4 steps above merely serve as an example. Note that you'll still need to track the `Order Completed` event per our standard [e-commerce tracking API](/docs/spec/ecommerce/v2/) after you've tracked the checkout steps.

For client-side integrations, to leverage the ability to track Checkout Steps and Options, we use Google Analytics' ProductAction class. You can read their developer docs for information on specific methods:

- [Analytics.js - Enhanced E-Commerce](https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce)
- [Analytics.js - E-Commerce](https://developers.google.com/analytics/devguides/collection/gtagjs/ecommerce)

**Measuring Promotions**
Enhanced Ecommerce allows you to go beyond measuring product performance to measure the internal and external marketing efforts that support those products. To take advantage of enhance e-commerce's promotion reports, you can easily collect data about promotion impressions and promotion clicks with Analytics.js, like so:

    analytics.track('Viewed Promotion', {
      id: <id>,
      name: <name>,
      creative: <creative>, // optional
      position: <position> // optional
    });
    analytics.track('Clicked Promotion', {
      id: <id>,
      name: <name>,
      creative: <creative>, // optional
      position: <position> // optional
    });

For client-side integrations, to leverage the ability to measure promotions, we use Google Analytics' Promotions class. You can read their developer docs for information on specific methods:

- [Analytics.js - Enhanced E-Commerce](https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce)
- [Analytics.js - E-Commerce](https://developers.google.com/analytics/devguides/collection/gtagjs/ecommerce)

**Coupons**
If you want to send coupon data to your `Order Completed` event when using Enhanced E-commerce, you can simply add the `coupon` property on the order level or the product level or both. In the below example, note that our Gtag destination accepts `total` *or* `revenue`, but not both. We recommend using `revenue` because several other destinations use `revenue` too. For better flexibility and total control over tracking, we let you decide how to calculate how coupons and discounts are applied. For example:

    analytics.track({
      userId: '019mr8mf4r',
      event: 'Order Completed',
      properties: {
        orderId: '50314b8e9bcf000000000000',
        total: 27.5,
        shipping: 3,
        tax: 2,
        discount: 2.5,
        coupon: 'hasbros',
        currency: 'USD',
        repeat: true,
        products: [
          {
            id: '507f1f77bcf86cd799439011',
            sku: '45790-32',
            name: 'Monopoly: 3rd Edition',
            price: 19,
            quantity: 1,
            category: 'Games',
            coupon: '15%OFF'
          },
          {
            id: '505bd76785ebb509fc183733',
            sku: '46493-32',
            name: 'Uno Card Game',
            price: 3,
            quantity: 2,
            category: 'Games',
            coupon: '20%OFF'
          }
        ]
      }
    });

**Measuring Product Impressions**
Enhanced Ecommerce also allows you to collect impression information from users who have viewed or filtered through lists containing products. This allows you to collect information about which products have been viewed in a list, which filters/sorts have been applied to a list of search results, and the positions that each product had within that list.

Product impressions are mapped to our 'Product List Viewed' and 'Product List Filtered' analytics.js events. You can find more information about the parameters and requirements here in our [e-commerce tracking API](/docs/spec/ecommerce/v2/).

Analytics.js allows you to easily collect this data and send it forward, like such:

    analytics.track('Product List Viewed', {
      category: 'cat 1',
      list_id: '1234',
      products: [
        {
          product_id: '507f1f77bcf86cd799439011',
          sku: '45790-32',
          name: 'Monopoly: 3rd Edition',
          price: 19,
          category: 'Games'
        }
      ]
    });

**Refunds**
For refunds to work, you need to have enhanced e-commerce turned on.

For full refunds, fire this event whenever an order/transaction gets refunded:

    analytics.track('Order Refunded', {
        order_id: '50314b8e9bcf000000000000',
      });

For partial refunds, you must include the productId and quantity for the items you want refunded:

    analytics.track('Order Refunded', {
        order_id: '50314b8e9bcf000000000000',
        products: [
          {
          product_id: '123abc',
          quantity: 200
          }
        ]
      });
----------


## Features

We support all of the following Google Analytics features:

- [Client-side (Analytics.js) library methods](#)
- [Anonymize IP Address](#)
- [Cookie Domain Name](#)
- [Custom Dimensions](#)
- [Cross-domain Tracking](#)
- [Ecommerce Transactions](#)
- [Events](#)
- [Ignored Referrers](#)
- [Multiple Trackers](#)
- [Query strings in Pageview](#)
- [Remarketing](#) (Demographics & Interest Reports)
- [Site Search](#)
- [User-ID](#)
- [Virtual Pageviews](#)
- [Optimize](#)

**Client-Side Library Methods**
Because Segment's client-side snippet wraps the `gtag.js` Javascript SDK, all gtag.js library methods that don't map to Segment methods are available client side. Although invoking a native library method won't send data to Segment or other Segment-enabled destinations, the method *will* send data to Google.

To access gtag.js methods while using Segment, write these methods inside an `analytics.ready()` function, for example:

    analytics.ready(function(){
      window.gtag('config', 'GA_MEASUREMENT_ID');
    })

**Anonymize IP Address**
To anonymize the IP addresses of all hits sent to Google, enable the **Anonymize IP** setting in your destination settings.

**Remarketing**
Google's remarketing (The remarketing tag formerly known as Doubleclick) is used to tag visitors for remarketing campaigns. It is also used to identify demographic and interest data on visitors that is displayed in Demographic & Interest reports inside of Google Analytics.

Turn this feature on by checking the box in your Google Analytics destination settings.

Since remarketing is loaded through Segment Google Analytics will not be able to validate that the code is present on the page. Just click **Skip validation** and your data will start showing up within a few hours.

**Multiple Trackers**
Although Segment does not support loading multiple trackers of the same type (e.g.; multiple web measurement IDs) through the destinations settings page (you will probably run into Google Analytics's [rate limits](https://developers.google.com/analytics/devguides/collection/ios/v3/limits-quotas?hl=en)), you can load a 2nd tracker on the page manually.

Here's how you'd initialize configure the second tracker:

    analytics.ready(function(){
      window.gtag('config', 'GA_MEASUREMENT_ID_2');
    })

**Important**: Keep in mind you will need to do all the data translation/properties mapping inside this `.on()` function before you send the event to Google Analytics like you see in our [destination code](https://github.com/segment-integrations/analytics.js-integration-google-analytics/blob/master/lib/index.js#L161-L207).

To do this server side, you can create a separate [source](https://help.segment.com/hc/en-us/articles/204892239-What-are-sources-) in Segment, and within this source enter your GA credentials for the second tracker.

This source can be your server-side source. From there, its easy to send data to multiple projects server-side, as you can see in this [Node example](/docs/sources/server/node/#multiple-clients) you can initialize multiple instances of our library.

**Cookie Domain Name**
The **Cookie Domain Name** setting allows you to specify the domain that the `_ga` cookie will be set on. By default the cookie is placed on the top level domain: `domain.com`.

We default the **Cookie Domain Name** to `auto`, which automatically sets the cookie at the root domain level, which allows you to track across multiple sub-domains, but does not work on `localhost`. You can find this setting in your Gtag destination settings.

If you need to test on `localhost`, but don't need to track between multiple sub-domains, then you can set the domain to `none`.

If you only want the cookie to persist on a single sub-domain, enter that sub-domain in the **Cookie Domain Name** field, like this: `swingline.initech.com`. In this case visitors to `conclusions.initech.com` or `initech.com` will not be tracked.
For more information see Google's [cookie and user identification guide](https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id).

**Cross-Domain Tracking**
Segment supports Gtag tracking across multiple top level domains, but it requires a bit of work from you. There are two ways to track visitors across domains.

**Tracking Visitors with User-ID**
If you're identifying your users with a [User-ID](#) cross-domain tracking becomes simple. All you have to do is make sure you identify your users on each domain and Google will merge those users together as one.

The only problem with this approach is that it only works for identified users, anonymous visitor sessions will not be maintained across domains.

**Tracking Anonymous Visitors**
When a visitor comes to your website, `domain1.com`, Gtag sets a first-party cookie that represents that user. That cookie looks like `182119591.1441315536`, and is tied to `domain1.com` (making it a first party cookie).

When your visitor clicks a link to go another domain, let's say `domain2.com`, you'll need to tell the new site about the `domain1.com` cookie. This is done by rewriting your `domain2.com` links to include this `domain1.com` cookie, like so:

    http://company2.com?_ga=1.182119591.1441315536.1362115890410

Luckily, Gtag providers an auto-linking plugin to make this easier. To access the `gtag` methods while using Segment they must be inside an `analytics.ready()` function, which should appear after your basic Segment snippet, like this:

    analytics.ready(function () {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        'linker': {
          'domains': ['domain2.com']
        }
      });
    });

For more advanced cross-domain implementations we recommend you follow the Google's guide to [measure activity across domains](https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain).

**Site Search**
In order to populate the Site Search report in Google Analytics there are a few you need to do...

1. When someone searches on your site, the search term they used must be added to the URL query, like this: `domain.com?s=coconuts`. The key ("s" in this case) can be any letter or string of letters.
2. In your Segment source destinations catalog open the Gtag settings, scroll down to the Page Call settings and make sure the box is checked for **Include Query String**.
3. Inside Google Analytics, go to the **Admin** section, then click **View Settings** for the view you want to add Site Search to. Turn on **Site search Tracking** and enter the string from #1 into the Query parameter field. In this example it'd look like this:
![](https://paper-attachments.dropbox.com/s_AF65D4F30D648EA37CFEC034E6486291A172E55587ACD64222BC0CD5040E4CB4_1589909442054_Screen+Shot+2020-05-19+at+10.30.38+AM.png)


**Webmaster Tools**
When you use Segment to load Gtag, our script loads the gtag.js script. If you use [Google Analytics as the verification option](https://support.google.com/webmasters/answer/9008080?hl=en) in Google Webmaster Tools, you'll need to switch to the [Meta tags verification option](https://support.google.com/webmasters/answer/79812?hl=en) instead. This will require you to find the `<meta name=google-site-verification" ..>` tag in Webmaster Tools and place it in your master HTML template.

**Cannonical Urls**
We take care of tracking the canonical URL to Google Analytics for you automatically. As long as there is a `<meta rel="canonical">` tag on your page, we'll make sure Google Analytics gets the right canonical URL from it.

**Optimize**
If you'd like to integrate with Google Analytics' [Optimize plugin](https://support.google.com/360suite/optimize/answer/6262084#optimize-ga-plugin), all you have to do is insert your **Optimize Container ID** in your destination settings and we will require the plugin when we initialize GA!

You may, however, want to deploy Google's [anti-flickering snippet](https://support.google.com/optimize/answer/7100284) to prevent the page from flashing / flickering when the A/B test is loaded. This is recommended by Google. This code must be added manually by customers since it needs to load synchronously. Note that the Optimize container ID must be included in this snippet too.

----------
## Troubleshooting

**Metrics vs. Dimensions**
They both allow you to track custom data properties in Google Analytics. However, Metrics are for event properties with a numeric data type and Dimensions are for event properties with a string data type.

**Real-Time Reports**
Google Analytics doesn't process their data in real-time in most of their reports. The easiest way to see if the data is streaming in is to check the Real-Time reports inside Google Analytics.
If you see events in your real-time reports, but they never show up in other reports that is usually due to a filter you have applied. You can see your active filters inside Google Analytics by clicking on **Admin** then under your View on the right click on **Filters**.

**Self Referrals**
This article does a great job of explaining GA self referrals and how to fix them: https://threeventures.com/how-to-fix-self-referrals-in-google-analytics/

**Time Frame**
Google Analytics's default reporting time frame is a month ago to yesterday. You'll need to adjust it from a month ago to today's date to see today's already processed events.

**HTTPS**
If your site uses `https://`, please go to your Google Analytics property settings page and change your **Site URL** to use the `https://` protocol.

**Bounce Rates**
Using Segment won't affect your bounce rates in Google Analytics.
If you see your bounce rates drop after installing Segment make sure you don't have multiple copies of our snippet on your page. Also be sure you're not calling `page` more than once when the page loads.

If you call `track` on page load make sure to set `nonInteraction` to `1`. You can also set all events to be non-interactive by default in `Advanced Options`. Read more in our [non-interaction events](#) docs.
