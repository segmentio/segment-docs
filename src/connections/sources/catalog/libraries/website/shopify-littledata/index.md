---
title: Shopify by Littledata Source
redirect_from:
  - "/connections/sources/catalog/cloud-apps/shopify-littledata/"
---

<!-- LR Note: the working copy of the source catalog YML we built on showed this in the `website` source though as of Nov 18 it's labeled cloud-source -->

Littledata is a smart analytics app that automates ecommerce tracking. Littledata's [Shopify-to-Segment connection](https://blog.littledata.io/help/posts/segment-overview/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) automatically tracks key ecommerce events on a Shopify or Shopify Plus store, so you can use Shopify as a source in your Segment workspace.

Littledata is available as an independent [Shopify App](https://apps.shopify.com/segment-com-by-littledata). When you install the Littledata app on your store, Littledata does two things:

1. It inserts a smart tracking script to your store's front end. You can use this script with any custom Shopify site, and uses analytics.js under the hood to send data in a spec-compliant manner to Segment.

2. The app also sets up server-side webhook forwarding to ensure 100% accuracy of important Customer and Order data.

Here's an architecture diagram that shows how the Littledata app mediates data flow between Shopify and Segment.

![](images/littledata_arch.png)

> warning "Note"
> This integration is maintained by Littledata _and is not supported by Segment directly_. The Littledata app has been reviewed by the Segment team for conformance with the [E-Commerce Spec](/docs/connections/spec/ecommerce/v2/), and is the recommended way of using Segment with Shopify. However, it does require a paid subscription with Littledata, who mediates the connection between Shopify and Segment. [Contact the Littledata Support team](mailto:support@littledata.io) with any questions.

## Getting Started

1. **Login** to your Shopify Store account.
2. Go the [Shopify app store listing](https://apps.shopify.com/segment-com-by-littledata) for **_Segment.com by Littledata_**.
   ![](images/Nd5L0C6.png)
3. Click **Add app** to begin the installation process.
4. **Sign up** for a Littledata account using an email address, Google login or Facebook login. _More team members can be added to the subscription after completing the installation process._
5. Add the [**Segment write key**](/docs/connections/find-writekey/) for the source that is going to send data in the **input field**.
   ![](images/eLUh6GF.png)
6. Choose either an **Automatic** or a **Manual** install. _Automatic installs work in most instances, but if you choose to do a manual install, just follow [this guide](https://blog.littledata.io/help/posts/segment-installation-guide/)._
   ![](images/iYM76VI.png)
7. Segment's **analytics.js** library, Littledata **tracking script** and **webhooks** will be automatically applied to the store and the installation proccess will then be complete.
   ![](images/kvjNx4M.png)

## Device-mode Events

Below is a table of events that **Shopify by Littledata** sends to Segment through the analytics.js libary. These events will show up as tables in your warehouse, and as regular events in your other Destinations supporting device-mode.

| Event Name            | Description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| Page Viewed           | The user has viewed a page                                            |
| Product List Viewed   | The user has viewed a product as they scroll down the collection page |
| Product Clicked       | The user has clicked a product within a product list                  |
| Product Viewed        | The user has viewed a product page                                    |
| Product Image Clicked | The user has clicked a product image                                  |
| Product Shared        | User has shared a product via social links                            |
| Thank you page        | User has viewed the thank you page after completing an order \*       |

\* This is less reliable than the de-duplicated `Order Completed` event sent from our servers, but it can be used in device-mode destinations to trigger a conversion. `payment_method` and `shipping_method` properties are not available with this event.

In addition to the events tracked as standard, the following hits can be tracked based on page path:

| Event Name             | Description                                 |
| ---------------------- | ------------------------------------------- |
| Registration Viewed    | A prospect has viewed the registration page |
| Cart Viewed            | A prospect has viewed the cart              |
| Blog Viewed            | A prospect has viewed the blog              |
| Registration Completed | A prospect has completed registration       |

## Cloud-mode Events

Below is a table of events that **Shopify by Littledata** sends to Segment from Littledata's servers. These events appear as tables in your warehouse, and as regular events in your other Destinations that support cloud-mode. They include the `anonymousId` that links them to the device-mode events where the event was part of a previous user session, or associated with a `userId` that was previously linked with an `anonymousId`. See Littledata's [troubleshooting guide on attribution](https://blog.littledata.io/help/posts/troubleshooting-marketing-attribution-for-shopify/) for more details.

| Event Name              | Description                                                                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product Added           | A user has added a product to the cart, and left it in the cart for more than 10 seconds                                                                                                    |
| Product Removed         | A user has removed a product from the cart                                                                                                                                                  |
| Checkout Started        | A user has started checkout                                                                                                                                                                 |
| Checkout Step Completed | A user has completed a step in the checkout                                                                                                                                                 |
| Payment Info Entered    | A user has entered payment info                                                                                                                                                             |
| Order Completed         | A prospect has completed an order                                                                                                                                                           |
| Order Refunded          | An order has been refunded                                                                                                                                                                  |
| Order Cancelled (v2)    | An admin has cancelled an order (including the cancel_reason)                                                                                                                               |
| POS Order Placed (v2)   | A user has placed an order through Shopify POS                                                                                                                                              |
| Payment Failure (v2)    | A user completed checkout step 3 but the payment method failed (for example, the card details were valid but the [charge did not succeed(https://stripe.com/docs/testing#cards-responses)]) |
| Customer Enabled (v2)   | A user has confirmed their email address and created a Shopify customer account with verified_email set as true                                                                             |
| Fulfilment Update (v2)  | An order fulfilment status has changed (including status, tracking_numbers and tracking_urls where the shipping integration allows)                                                         |

## Identify Calls

For every event where there is an identifiable Shopify customer (from both the device-mode and cloud-mode) Littledata also sends an Identify call. This happens when the customer logs into the storefront, on the last step of the checkout, with the order, and also after purchase with any customer update in Shopify admin.

The following traits are included with an Identify call:

| Property Name           | Description                                                                                                                                     | Property Type |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `userId`                | The Shopify Customer ID                                                                                                                         | Double        |
| `firstName`             | The customer's first name                                                                                                                       | String        |
| `lastName`              | The customer's email                                                                                                                            | String        |
| `email`                 | The customer's email address                                                                                                                    | String        |
| `phone`                 | The customer's phone number                                                                                                                     | String        |
| `createdAt`             | The date customer record was created                                                                                                            | Date          |
| `description`           | The customer notes                                                                                                                              | String        |
| `address`               | The customer's primary address                                                                                                                  | String        |
| `customerLifetimeValue` | The total spend of customer on the Shopify store                                                                                                | Double        |
| `purchaseCount`         | The bumber of orders by this customer                                                                                                           | Integer       |
| `marketingOptIn`        | The `marketing_opt_in` field from [Shopify customer](https://shopify.dev/docs/admin-api/rest/reference/customers/customer?api[version]=2020-04) | String        |
| `tags`                  | The custom tags [applied to the customer](https://shopify.dev/docs/admin-api/rest/reference/customers/customer?api[version]=2020-04)            | String        |
| `state`                 | Whether the customer account is enabled or disabled                                                                                             | String        |
| `verified_email` (v2)   | Whether the customer has verified their email                                                                                                   | Boolean       |

## Support for email marketing destinations

Email marketing platforms such as [Klaviyo](/docs/connections/destinations/catalog/klaviyo/#server-side-track), [Iterable](/docs/connections/destinations/catalog/iterable/#track) and [Hubspot](/docs/connections/destinations/catalog/hubspot/#server) require an email property with any server-side event in order to associate events with a customer (they cannot use an `anonymousId`). Littledata adds that `email` property whenever an email address is set in the user `traits()` object (in device-mode) or from the Shopify customer record (in cloud-mode).

## Alias Calls

To support seamless customer tracking the [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias), [Vero](/docs/connections/destinations/catalog/vero/#alias) and [KISSMetrics](docs/connections/destinations/catalog/kissmetrics/#alias) destinations, Littledata ensures the pre-checkout `anonymousId` is added as an alias of the `userId` (used from checkout step 2 onwards).

## Subscription Ecommerce Events

Additional events available through Littledata's [ReCharge connection](https://www.littledata.io/connections/recharge), and available in cloud-mode destinations.

| Event Name               | Description                                     |
| ------------------------ | ----------------------------------------------- |
| Subscription Created     | A customer has created a subscription           |
| Subscription Updated     | A customer has updated a subscription           |
| Subscription Cancelled   | A customer has cancelled a subscription         |
| Order Processed          | A recurring order is processed                  |
| Charge Failed            | A failed to charge customer                     |
| Charge Max Tries Reached | The maximum tries to charge customer is reached |
| Payment Method Updated   | A customer has updated the payment method       |
| Customer Update          | A customer information updated                  |

## Event Properties

The list below outlines the properties included in the events listed above.

| Property                               | Description                                                    | Property Type |
| -------------------------------------- | -------------------------------------------------------------- | ------------- |
| `userId`                               | A Shopify Customer ID (after checkout step 2)                  | Double        |
| `email`                                | Shopify email address, or email submitted on a storefront form | String        |
| `order_id`                             | The ID of the order                                            | String        |
| `checkoutId`                           | The ID of the checkout session                                 | String        |
| `shipping`                             | The shipping cost                                              | Float         |
| `tax`                                  | The amount of tax on the order                                 | Float         |
| `total`                                | The total value of the order                                   | Float         |
| `affiliation`                          | The affiliation of the order                                   | String        |
| `coupon`                               | A discount coupon, if applicable                               | String        |
| `currency`                             | The currency of the order                                      | String        |
| `discount`                             | The discounted amount                                          | Float         |
| `products`                             | A list of all the product at that step of the funnel           | Array         |
| `step`                                 | The checkout step                                              | Integer       |
| `payment_method`                       | The payment method chosen for checkout                         | String        |
| `shipping_method`                      | The shipping method chosen for checkout                        | String        |
| `context['Google Analytics'].clientId` | The user's Google Analytics Client ID                          | String        |
| `context['Google Analytics'].geoid`    | The user's location                                            | String        |
| `context.uip`                          | The user's IP address                                          | String        |
| `sent_from`                            | A unique property to identify events sent by Littledata        | String        |
| `presentment_currency`                 | The user's local currency                                      | String        |
| `presentment_total`                    | The order total in local currency                              | String        |

## Product Properties

Each item in the `products` array may have the following properties:

| Property             | Description                                      | Property Type |
| -------------------- | ------------------------------------------------ | ------------- |
| `product_id`         | The Shopify product ID                           | String        |
| `shopify_product_id` | Also Shopify product ID, with device-mode events | String        |
| `sku`                | The product SKU                                  | String        |
| `variant`            | The product variant name                         | String        |
| `shopify_variant_id` | The Shopify variant ID                           | String        |
| `category`           | The category of the product (defaults to `all`)  | String        |
| `brand`              | The brand of the product                         | String        |
| `list_id`            | The ID of the product collection                 | String        |
| `list_name`          | The name of the product collection               | String        |
| `list_position`      | The product position in the collection           | Integer       |
| `name`               | The product name                                 | String        |
| `price`              | The product price                                | Float         |
| `quantity`           | The quantity of products                         | Integer       |
