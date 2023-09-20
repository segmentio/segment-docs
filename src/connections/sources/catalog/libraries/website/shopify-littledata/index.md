---
title: Shopify by Littledata Source
redirect_from:
  - "/connections/sources/catalog/cloud-apps/shopify-littledata/"
id: V8ji9rWzoS
---

<!-- LR Note: the working copy of the source catalog YML we built on showed this in the `website` source though as of Nov 18 it's labeled cloud-source -->

Littledata's [Shopify to Segment connection](https://help.littledata.io/posts/segment-overview/){:target="\_blank"} uses a combination of client-side (browser) and server-side tracking to ensure 100% accurate data about your Shopify store in Segment. Littledata automatically integrates with Shopify and Shopify Plus sites to capture every customer touch point, including sales, marketing, customer and product performance data.

Littledata is available as an independent [Shopify App](https://apps.shopify.com/segment-com-by-littledata){:target="\_blank"}.

#### Client-side (device mode) tracking

After the [installation process](https://help.littledata.io/posts/segment-installation-guide/){:target="\_blank"}:

- Segment's Analytics.js 2.0 library loads on all pages, except for the checkout.
- All pages include a LittledataLayer data layer.
- Pages Load a minified tracking script, hosted on a content delivery network (CDN)
- Device-mode e-commerce events can send to all Segment destinations
- Segment's anonymous ID and Google Analytics' client ID passes to Littledata's servers to ensure consistent user journey tracking

#### Server-side (cloud mode) tracking

During the Segment connection setup, Littledata also adds a set of webhooks to your Shopify store. When a customer interacts with your store these changes are relayed server-side from Shopify to Littledata to Segment. The advantages to this approach are:

- 100% event capture for adds to cart, checkout steps, sales and refunds/returns
- Customer data (for example, email) securely relayed server-side
- No extra scripts on the sensitive and secure checkout pages
- Accurate marketing attribution, even when customers use ad-blockers or cookie opt-outs
- Supports cloud-mode destinations such as [Facebook Conversions API](/docs/connections/destinations/catalog/actions-facebook-conversions-api/)

Here's an architecture diagram that shows how the Littledata app mediates data flow between Shopify and Segment.

![Diagram showing how data is processed between Littledata, Shopify, and Segment.](images/littledata_arch.png)

> warning "Note"
> This integration is maintained by Littledata _and isn't supported by Segment directly_. The Littledata app has been reviewed by the Segment team for conformance with Segment's [E-Commerce Spec](/docs/connections/spec/ecommerce/v2/), and is the recommended way of using Segment with Shopify. However, it does require a paid subscription with Littledata, who mediates the connection between Shopify and Segment. [Contact the Littledata Support team](mailto:help@littledata.io) with any questions.

## Getting Started

1. **Log in** to your Shopify Store account.
2. Go the [Shopify app store listing](https://apps.shopify.com/segment-com-by-littledata){:target="\_blank"} for **Segment.com by Littledata**.
   ![Screenshot of the Segment listing in the Shopify app store.](images/Nd5L0C6.png)
3. Click **Add app** to begin the installation process.
4. **Choose a Littledata subscription** suitable for your store's volume of monthly orders.
5. Add the [**Segment write key**](/docs/connections/find-writekey/) for the source that is going to send data in the **input field**.
   ![Screenshot of the Configure Segment step in the Shopify Littedata setup flow.](images/eLUh6GF.png)
6. Choose either an **Automatic**, a **Manual**, or a **Headless** install. _Automatic installs work in most instances, but if you choose to do a manual install, just follow [this guide](https://help.littledata.io/posts/segment-installation-guide/){:target="\_blank"}._
   ![Screenshot of the Add code automatically? step in the Shopify Littedata setup flow.](images/iYM76VI.png)
7. Segment's **Analytics.js** library, Littledata **tracking script** and **webhooks** automatically apply to the store and the installation process will then be complete.
   ![Screenshot of the Add tracking code step in the Shopify Littedata setup flow.](images/kvjNx4M.png)

## Event schema

This source has a full [tracking plan and event schema](https://docs.google.com/spreadsheets/d/1aljowRhMU9_7uGXmcipbP1Y14S4cOSdXGQA2Vx7BHko/edit){:target="\_blank"} in Google Sheets, which is ready to [upload into Protocols](/docs/protocols/apis-and-extensions/#google-sheets-tracking-plan-uploader).

## Device-mode events

Below is a table of events that **Shopify by Littledata** sends to Segment through the analytics.js library. These events will show up as tables in your warehouse, and as regular events in your other Destinations supporting device-mode.

| Event Name            | Description                                                         |
| --------------------- | ------------------------------------------------------------------- |
| Cart Viewed           | A user has viewed the /cart page                                    |
| Page Viewed           | A user has viewed any page                                          |
| Product Clicked       | A user has clicked a product within a product list                  |
| Product Image Clicked | A user has clicked a product image                                  |
| Product List Viewed   | A user has viewed a product as they scroll down the collection page |
| Product Shared        | A user has shared a product through social links                    |
| Product Viewed        | A user has viewed a product page                                    |
| Products Searched     | A user has searched for products (with search `query`)              |
| Registration Viewed   | A user has viewed the /account/register page                        |
| Thank you Page Viewed | A user has viewed the thank you page after completing an order\*    |

> note ""
> \*This is less reliable than the de-duplicated `Order Completed` event sent from the Littledata servers, but you can use it in device-mode destinations to trigger a conversion. The `payment_method` and `shipping_method` properties are not available with this event.

You can _opt out_ of device-mode pageviews or events by setting `disableClientSideEvents: true` or `disablePageviews: true` in the `LittledataLayer` settings.

The source also respects [GDPR-compliant cookie](https://blog.littledata.io/2021/06/18/shopify-cookie-banner-gdpr-compliance/) consent through Shopify's cookie banner, or popular consent management platforms such as [OneTrust](https://help.littledata.io/help/integrating-onetrust-with-shopify/) and [TrustArc](https://help.littledata.io/posts/integrating-trustarc-with-shopify/).

## Cloud-mode events

Below is a table of events that **Shopify by Littledata** sends to Segment from Littledata's servers. These events appear as tables in your warehouse, and as regular events in your other Destinations that support cloud-mode. They include the `anonymousId` that links them to the device-mode events where the event was part of a previous user session, or associated with a `userId` that was previously linked with an `anonymousId`. See Littledata's [troubleshooting guide on attribution](https://help.littledata.io/posts/troubleshooting-marketing-attribution-for-shopify/) for more details.

| Event Name               | Description                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Checkout Started         | A user has started checkout                                                                                                                                                                 |
| Checkout Step Completed  | A user has completed a step in the checkout                                                                                                                                                 |
| Coupon Applied           | Sent with Checkout Step Completed or Order Completed when user has applied a coupon                                                                                                         |
| Customer Created         | User added as a customer                                                                                                                                                                    |
| Customer Enabled (v2)    | A user has confirmed their email address and created a Shopify customer account with verified_email set as true                                                                             |
| Fulfillment Created (v2) | An order fulfillment status has changed (including status, tracking_numbers and tracking_urls where the shipping integration allows)                                                        |
| Fulfillment Updated (v2) | An order fulfillment status has changed (including status, tracking_numbers and tracking_urls where the shipping integration allows)                                                        |
| Order Cancelled (v2)     | An admin has cancelled an order (including the cancel_reason)                                                                                                                               |
| Order Completed          | A prospect has completed an order                                                                                                                                                           |
| Order Refunded           | An order has been refunded                                                                                                                                                                  |
| POS Order Placed (v2)    | A user has placed an order through Shopify POS                                                                                                                                              |
| Payment Failure (v2)     | A user completed checkout step 3 but the payment method failed (for example, the card details were valid but the [charge did not succeed](https://stripe.com/docs/testing#cards-responses)) |
| Payment Info Entered     | A user has entered payment info                                                                                                                                                             |
| Product Added            | A user has added a product to the cart, and left it in the cart for more than 10 seconds                                                                                                    |
| Product Removed          | A user has removed a product from the cart                                                                                                                                                  |

## User identity

In the Littledata application you can choose which of the following fields you want to send as the `userId` for known customers:

- **Shopify customer ID** (default) - Recommended if you have a simple Shopify setup with minimal integrations.
- **Hashed email** - The MD5 email hash is useful if you have other marketing platforms sending traffic where you know the email of the visitor (for example, email marketing like Bronto or Marketo), but not their Shopify customer ID. Littledata uses an unsalted MD5 hash (\`createHash\` method) to match your other sources.
- **Email** - The email identifier is recommended when other platforms use the email and can't hash it, and you are comfortable with the privacy implications.
- **Shopify customer metafield** - If you have your own customer identifier, and can add it to the Shopify customer record as a metafield, you can send this to Segment.
- **None** (no identifier) - Choose “none” if user identity is already handled by your Segment implementation and you only need the extra events powered by Littledata's Shopify source.

For [Engage](/docs/engage/), Littledata also sends `shopify_customer_id` as an [externalID](/docs/unify/identity-resolution/externalids/) for advanced matching.

## Identify calls

For every event where there is an identifiable Shopify customer (from both the device-mode and cloud-mode) Littledata also sends an Identify call. This happens when the customer logs into the storefront, on the last step of the checkout, with the order, and also after purchase with any customer update in Shopify admin.

The following traits are included with an Identify call:

|  Property Name          |  Description                                                                                                                                            |  Property Type  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| userId                     | The chosen user identifier. This defaults to the Shopify Customer ID.                                                                                                 | Double            |
| createdAt                  | The date the customer record was created.                                                                                                                          | Date              |
| customerLifetimeValue      | Total spend of customer on the Shopify store                                                                                                              | Double            |
| default_address.street     | The customer's default street address                                                                                                                     | String            |
| default.address.postalCode | The customer's ZIP / post code                                                                                                                            | String            |
| default_address.state      | The customer's state address                                                                                                                              | String            |
| default_address.country    | The customer's country                                                                                                                                    | String            |
| description                | Customer notes                                                                                                                                            | String            |
| email                      | Customer's email address                                                                                                                                  | String            |
| email_consent_state        | If the user has consented to email marketing (mapping to [EmailMarketingState](https://shopify.dev/docs/api/customer/unstable/enums/EmailMarketingState)) | String, Null      |
| email_opt_in_level         | Level of user's opt in email marketing (mapping to [MarketingOptInLevel](https://shopify.dev/docs/api/customer/unstable/enums/MarketingOptInLevel))       | String, Null      |
| firstName                  | Customer's first name                                                                                                                                     | String            |
| lastName                   | Customer's last name                                                                                                                                      | String            |
| phone                      | Customer's phone number                                                                                                                                   | String            |
| purchaseCount              | Number of orders by this customer                                                                                                                         | Integer           |
| sms_consent_state          | If the user has consented to SMS marketing (mapping to [SmsMarketingState](https://shopify.dev/docs/api/customer/unstable/enums/SmsMarketingState))       | String, Null      |
| sms_opt_in_level           | Level of user's opt in to SMS marketing (mapping to [MarketingOptInLevel](https://shopify.dev/docs/api/customer/unstable/enums/MarketingOptInLevel))      | String, Null      |
| state                      | Shopify customer state - enabled, disabled, invited to create an account or customer declined                                                             | String            |
| tags                       | Custom tags applied to the customer                                                                                                                       | String            |
| verified_email             | Whether the customer has verified their email                                                                                                             | Boolean           |

## Support for Google Analytics destination

All events (device-mode and cloud-mode) contain the Google Analytics `clientId` field where known. This allows the [Google Analytics destination](/docs/connections/destinations/catalog/google-analytics/#supported-sources-and-connection-modes) to be configured in cloud-mode only, so all client side events are relayed through Segment's servers - reducing the scripts needed on your website.

## Support for email marketing destinations

Email marketing platforms such as [Klaviyo](/docs/connections/destinations/catalog/klaviyo/#server-side-track), [Iterable](/docs/connections/destinations/catalog/iterable/#track) and [Hubspot](/docs/connections/destinations/catalog/hubspot/#server) require an email property with any server-side event in order to associate events with a customer (they cannot use an `anonymousId`). Littledata adds that `email` property whenever an email address is set in the user `traits()` object (in device-mode) or from the Shopify customer record (in cloud-mode). Iterable can also [receive cookie values](#cookiesToTrack) with the Order Completed event.

## Alias calls

To support seamless customer tracking the [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias), [Vero](/docs/connections/destinations/catalog/vero/#alias) and [KISSMetrics](/docs/connections/destinations/catalog/kissmetrics/#alias) destinations, Littledata ensures the pre-checkout `anonymousId` is added as an alias of the `userId` (used from checkout step 2 onwards).

## Subscription events

All [recurring orders in the Shopify checkout](https://help.littledata.io/posts/tracking-subscription-orders-in-the-shopify-checkout/){:target="\_blank"}, from any subscription app, are tracked as Order Completed events.

Additional subscription lifecycle events through Littledata's [ReCharge connection](https://www.littledata.io/connections/recharge){:target="\_blank"} are available in cloud-mode destinations. See the [Track (custom)](https://docs.google.com/spreadsheets/d/1aljowRhMU9_7uGXmcipbP1Y14S4cOSdXGQA2Vx7BHko/edit#gid=1155311093){:target="\_blank"} tab of the event schema.

| Event Name               | Description                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Charge Failed            | A recurring charge failed (with `error_type`)                                                               |
| Charge Max Tries Reached | The maximum tries to charge customer is reached                                                             |
| Order Processed          | A recurring order is processed                                                                              |
| Payment Method Updated   | A customer has updated the payment method                                                                   |
| Subscription Cancelled   | A customer has cancelled a subscription (with `cancellation_reason` and `cancellation_reason_comments`)     |
| Subscription Created     | A customer has created a subscription (with `status`, `order_interval_frequency` and `order_interval_unit`) |
| Subscription Updated     | A customer has updated a subscription (with `status`, `order_interval_frequency` and `order_interval_unit`) |

## Event properties

The list below outlines the properties included in most events. See the 'Track (eCommerce)' tab of the [event schema](https://docs.google.com/spreadsheets/d/1aljowRhMU9_7uGXmcipbP1Y14S4cOSdXGQA2Vx7BHko/edit){:target="\_blank"} for exactly which properties are sent with which events.

|  Property                             |  Description                                                                         |  Property Type  |
| --------------------------------------- | -------------------------------------------------------------------------------------- | ----------------- |
| `affiliation`                           | A comma-separated list of order tags. Untagged orders use `Shopify`                    | String            |
| `cart_id`                               | The ID of the Shopify cart                                                             | String            |
| `checkout_id`                           | The ID of the checkout session                                                         | String            |
| `context\['Google Analytics'].clientId` | The user's Google Analytics Client ID                                                  | String            |
| `context.ip`                            | The user's IP address                                                                  | String            |
| `coupon`                                | Comma-separated string of discount coupons used, if applicable                         | String            |
| `currency`                              | The currency of the order                                                              | String            |
| `discount`                              | The discounted amount                                                                  | Float             |
| `email`                                 | Shopify email address (after checkout step 2), or email submitted on a storefront form | String            |
| `lifetime_revenue_littledata`           | Lifetime revenue of the customer in Shopify                                            | String            |
| `location_id`                           | Location ID of the Point of Sale                                                       | Integer           |
| `order_id`                              | The ID of the order is by default the Shopify order name                               | String            |
| `payment_gateway_littledata`            | The payment gateway used by the customer                                               | String            |
| `payment_method`                        | The payment method chosen for checkout                                                 | String            |
| `presentment_currency`                  | The user's local currency                                                              | String            |
| `presentment_total`                     | The order total in local currency                                                      | String            |
| `products`                              | A list of all the product at that step of the funnel                                   | Array             |
| `purchase_count_littledata`             | Total purchase count for the customer                                                  | Integer           |
| `revenue`                               | Product revenue (excluding discounts, shipping and tax) \*                             | Float             |
| `sent_from`                             | Unique property to identify events sent by Littledata                                  | String            |
| `shipping`                              | Shipping cost                                                                          | Float             |
| `shipping_method`                       | Shipping method chosen for checkout                                                    | String            |
| `shopify_customer_id_littledata`        | Shopify’s identifier for the customer                                                  | Integer           |
| `source_name`                           | The source of the order (e.g. `web`, `android`, `pos`)                                 | String            |
| `step`                                  | Checkout step                                                                          | Integer           |
| `subscription_revenue`                  | The revenue associated with a Subscription Event                                       | Float             |
| `subtotal`                              | Total after discounts but before taxes and shipping                                    | Float             |
| `tax`                                   | The amount of tax on the order                                                         | Float             |
| `total`                                 | Total value of the order                                                               | Float             |
| `userId`                                | Chosen user identifier, defaulting to Shopify Customer ID                              | String            |

> note "" \*`revenue` is available only with the Order Completed event, and only if the store opts in through the Littledata application. Revenue is a reserved property in many Segment destinations. Opting in overrides the `total` property sent to Google Analytics.

## Product properties

Each item in the `products` array, or Product Viewed and Product Added events, will have the following properties

|  Property         |  Description                                                    |  Property Type  |
| -------------------- | ------------------------------------------------------------------ | ----------------- |
| `brand`              | The brand of the product (Shopify `vendor`).                        | String            |
| `category`           | The category of the product (defaults to `all`).                    | String            |
| `compare_at_price`   | The product price before any discount.                              | String            |
| `coupon`             | Coupon code associated with the product.                            | String            |
| `image_url`          | The URL of the first product image.                                 | String            |
| `list_id`            | The ID of the product collection (for List Views and Clicks).       | String            |
| `list_position`      | The product position in the collection (for List Views and Clicks). | Integer           |
| `name`               | Product name.                                                       | String            |
| `price`              | The product price.                                                  | Float             |
| `product_id`         | Shopify product ID.                                                 | String            |
| `quantity`           | The quantity of this product.                                       | Integer           |
| `product_properties` | Custom properties of purchased products.                            | Array             |
| `shopify_product_id` | Also Shopify product ID.                                            | String            |
| `shopify_variant_id` | The Shopify variant ID.                                             | String            |
| `sku`                | The product SKU.                                                    | String            |
| `url`                | The URL of the product page.                                        | String            |
| `variant`            | The product variant name.                                           | String            |

## Import all orders

With an [annual Littledata Plus plan](https://www.littledata.io/app/enterprise){:target="\_blank"} you can import all Shopify orders and refunds from before you started using Segment, to sync with destinations that support timestamped events (for example, a data warehouse). This enables you to build a complete customer history in your chosen destination.

This data import includes all the [event properties](#event-properties) usually sent with an `Order Completed` event, including the [customer traits](#identify-calls).

## Advanced settings

You can customize Littledata's Shopify source from the [data pipeline settings](https://help.littledata.io/posts/data-pipeline-settings/){:target="\_blank"} in the Littledata admin. The general settings affect how Littledata handles details such as orders, products and pageviews. The more advanced settings include: `cookiesToTrack` and `CDNForAnalyticsJS`.

### cookiesToTrack

You can send any cookie set on a landing page (for example, a session identifier or marketing campaign name) to Segment with an Identify call. A common use is to set the array as `['iterableEmailCampaignId', 'iterableTemplateId']` to pass Iterable `campaignId` and `templateId` through to the [Order Completed event](https://support.iterable.com/hc/en-us/articles/204795719-Sending-Data-from-Segment-to-Iterable-#order-completed){:target="\_blank"}.

### CDNForAnalyticsJS

If you have a [proxy CDN setup](/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy/) to load Segment's AnalyticsJS library from your own domain, you can specify it here.
