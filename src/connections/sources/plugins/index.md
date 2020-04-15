---
title: Replacing Legacy Segment Plugins
hidden: true
---

Everyone has to grow up some time. Early on at Segment, we supported several "plugin sources" to feed data into Segment. These were not actual libraries, but tutorials, explaining how to install Analytics.js (or other analytics libraries) into an application's source. However, this process was manual and never covered all possible use cases, leading to unsatisfying support outcomes for everyone.

In 2018 we fully deprecated and stopped supporting the following Segment source "plugins":

- [Amazon Webstore](#amazon-webstore)
- [BigCommerce]()
- [Chrome Extension]()
- [Cloudflare]()
- [Ghost]()
- [Goodsie]()
- [Magento]()
- [Shopify]()
- [Tumblr]()
- [WooCommerce]()
- [Wordpress]()
- [WP eCommerce]()

This means that they are no longer supported, and Segment cannot be responsible for answering questions about their continued use and maintenance. This page exists to help you find a replacement if you previously used one of these "plugin" methods.

---



## Amazon Webstore

- Amazon Webstore - suspect they don't want you running an out-of-ecosystem analytics tool. Can anyone confirm?

## Bigcommerce

- Bigcommerce - (??)


## Chrome Extension

To add tracking to a Chrome browser extension, you can add the [analytics-node](/docs/connections/sources/catalog/libraries/node/) library, and call your Segment events following the [Segment Spec](/docs/connections/spec/), as usual.

## Cloudflare

?????

## Ghost

The Ghost blogging system, maintains their own [instructions on how to inject Segment code](https://ghost.org/integrations/segment/).

## Goodsie

Goodsie ceased operations in 2017. If you are using [Shopify](/docs/connections/sources/catalog/libraries/website/shopify-littledata/) Segment offers a website source for that platform. For other platforms, you should integrate using the appropriate [Segment Server library](/docs/connections/sources/catalog/#server) for your implementation.


## Magento

If you are using Magento, use the [Segment PHP library source](/docs/connections/sources/catalog/libraries/php/), and implement your Segment events following the [Segment Spec](/docs/connections/spec/), as usual.

## Shopify

If you are using Shopify, you can use our recommended third-party [Segment for Shopify by Littledata Source](/docs/connections/sources/catalog/cloud-apps/shopify-littledata/).


## Tumblr

insert ajs as part of site customization ??


## Woocommerce

WooCommerce offers a [paid Segment plugin](https://docs.woocommerce.com/document/segment-io-connector/), or you can use the [Segment PHP library source](/docs/connections/sources/catalog/libraries/php/), and implement your Segment events following the [Segment Spec](/docs/connections/spec/), as usual.

## Wordpress

If you are using Wordpress, use the [Segment PHP library source](/docs/connections/sources/catalog/libraries/php/), and implement your Segment events following the [Segment Spec](/docs/connections/spec/), as usual.

# WP eCommerce

If you are using Wordpress eCommerce, use the [Segment PHP library source](/docs/connections/sources/catalog/libraries/php/), and implement your Segment events following the [Segment Spec](/docs/connections/spec/), as usual.
