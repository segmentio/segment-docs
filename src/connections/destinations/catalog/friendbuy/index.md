---
title: Friendbuy Destination
cmode-override: true
id: 59ce9468cf711e00014a9c12
---
Friendbuy is a referral marketing and campaign optimization platform.

## Getting Started

1. Log in to your Friendbuy account and go to **Integration Code**.
2. Copy the **Site ID** above the snippet box.
3. Log in to your Segment workspace, click **Catalog** and select the **Destinations** tab.
4. Search for "Friendbuy" and click it in the catalog, then click **Configure**.
5. Select the Segment data source you want to send to Friendbuy.
6. On the next page that appears, click the **Site ID** setting, and paste the Site ID you copied in step 2, and click **Save**.

This destination allows you to:

- Map your Page calls to enable [Widget Management](http://developers.friendbuy.com/#widget-management)
- Map your Identify calls to enable [Customer Tracking](http://developers.friendbuy.com/#customer-tracking)
- Map your Track calls to enable [Order Tracking](http://developers.friendbuy.com/#order-tracking) and [Product Tracking](http://developers.friendbuy.com/#product-tracking)


## Page

To load specific widgets on different web pages, you can configure your settings to map your _named_ Page call(s) to specific Friendbuy Widget(s). You can also configure a several optional [advanced widget configurations](http://developers.friendbuy.com/#widget-options) such as **auto delay** and **custom parameters**.


Friendbuy has two Widgets you can map to your Page calls:

**Site Wide Widgets**

Friendbuy recommends you to load these widgets on all your web pages. To use these widgets, you can add them under the *Side Wide Widgets* setting.

> info ""
> You don't need to map a site wide widget if the **Call To Action** type is a ribbon served by Friendbuy. This overlay widget loads when Segment loads the Friendbuy library.

**Other widgets**

All other widgets will fall under this category whereby you can map the `name` of a unique Segment `.page()` call to a widget ID.

> info ""
> If you have mapped a site wide overlay widget, it loads on every `.page()` call.

## Identify

When you call `.identify()`, Segment sends the following mapped traits:

| **Segment Traits**    | **Friendbuy Standard Fields** |
| --------------------- | ----------------------------- |
| `userId`              | `id` **REQUIRED**             |
| `email`               | `email`                       |
| `firstName`           | `first_name`                  |
| `lastName`            | `last_name`                   |

Here is a sample JavaScript  `.identify()` call with the all the standard traits:

```js
analytics.identify('2', {
  firstName: 'Buzz'
  lastName: 'Lightyear',
  email: 'captain.lightyear@toystory.com',
});
```

> info ""
> Friendbuy does not accept custom traits.
### Stripe and Chargebee Customer ID

If you integrate with Stripe or Chargebee and need send those IDs to Friendbuy, you can pass them as integration specific options:

```js
analytics.identify('2', {
  firstName: 'Buzz'
  lastName: 'Lightyear',
  email: 'captain.lightyear@toystory.com',
}, {
  integrations: {
    FriendBuy: {
      stripeCustomerId: <email@stripe.com>,
      chargebeeCustomerId: <email@chargebee.com>
    }
  }
});
```

## Track / Order Completed

This Destination accepts `Order Completed` events as described in the Segment [ecommerce spec](/docs/connections/spec/ecommerce/v2/#order-completed).

Friendbuy has a concept of [Order Tracking](http://developers.friendbuy.com/#order-tracking) and [Product Tracking](http://developers.friendbuy.com/#product-tracking) where the former describes how to send data about the top level order whereas the latter documents instructions on sending data about each of the product within that order.

When you send order details, Segment makes the following translation:

| **Segment Properties**    | **Friendbuy Standard Fields** |
| ------------------------- | ----------------------------- |
| `order_id`                | `id` **REQUIRED**             |
| `context.traits.email`    | `email`                       |
| `revenue`                 | `amount`                      |
| `coupon`                  | `coupon_code`                 |

Then Segment iterates over each item in your `properties.products` and send the following mapping:


| **Segment Properties**  | **Friendbuy Standard Fields** |
| ----------------------- | ----------------------------- |
| `sku`                   | `sku`                         |
| `price`                 | `price`                       |
| `quantity`              | `quantity`                    |

> info ""
> You can optionally specify if the customer who made the order is a new customer by passing `new_customer` under your integration specific options:
> ```js
>  integrations: {
>    FriendBuy: {
>      newCustomer: true,
>    }
>  }
>```
