---
title: Replacing Legacy Segment Plugins
hidden: true
---

Everyone has to grow up some time. Early on at Segment, we supported several "plugin sources" to feed data into Segment. These were not actual libraries, but tutorials, explaining how to install Analytics.js (or other analytics libraries) into an application's source. However, this process was manual and never covered all possible use cases, leading to unsatisfying support outcomes for everyone.

In 2018 we fully deprecated and stopped supporting the following Segment source "plugins":

- [Amazon Webstore](#amazon-webstore)
- [Chrome Extension](#chrome-extension)
- [Ghost](#ghost)
- [Goodsie](#goodsie)
- [Magento](#magento)
- [Shopify](#shopify)
- [WooCommerce](#woocommerce)
- [Wordpress](#wordpress)
- [WP eCommerce](#wp-ecommerce)

This means that they are no longer supported, and Segment cannot be responsible for answering questions about their continued use and maintenance. This page exists to help you find a replacement if you previously used one of these "plugin" methods.

---

## Amazon Webstore

Amazon Webstore was deprecated by Amazon, and no replacement is available.

<!--
## Bigcommerce

A Bigcommerce native integration is
-->

## Chrome Extension

To add tracking to a Chrome browser extension, you can add the [analytics-node](/docs/connections/sources/catalog/libraries/server/node/) library, and call your Segment events following the [Segment Spec](/docs/connections/spec/), as usual.

## Ghost

The Ghost blogging system, maintains their own [instructions on how to inject Segment code](https://ghost.org/integrations/segment/).

## Goodsie

Goodsie ceased operations in 2017. If you are using [Shopify](/docs/connections/sources/catalog/libraries/website/shopify-littledata/) Segment offers a website source for that platform. For other platforms, you should integrate using the appropriate [Segment Server library](/docs/connections/sources/catalog/#server) for your implementation.

## Magento

If you are using Magento, use the [Segment PHP library source](/docs/connections/sources/catalog/libraries/server/php/), and implement your Segment events following the [Segment Spec](/docs/connections/spec/), as usual.

## Shopify

If you are using Shopify, you can use our recommended third-party [Segment for Shopify by Littledata Source](/docs/connections/sources/catalog/cloud-apps/shopify-littledata/).

<!--
## Tumblr

Tumblr customization is limited based on which theme your site uses. You may still be able to add Segment tracking using [Segment's JavaScript source](/docs/connections/sources/catalog/libraries/website/javascript/) as part of [your theme's Custom HTML](https://tumblr.zendesk.com/hc/en-us/articles/230778847-Custom-HTML) if available. -->

## Woocommerce

WooCommerce offers a [paid Segment plugin](https://docs.woocommerce.com/document/segment-io-connector/) to replace prior implementations.

## Wordpress

If you are using Wordpress, you have two options.

The best option is to use the [Segment PHP library source](/docs/connections/sources/catalog/libraries/server/php/). However, you can also use the device-mode [Segment Analytics.js library source](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/) if you are more comfortable with JavaScript. We recommend using the PHP library where possible, because the server library's Cloud mode connection is more reliable, and not subject to issues from ad blockers.

Regardless of the library you choose, implement your Segment events following the [Segment Spec](/docs/connections/spec/), as usual.

## WP eCommerce

If you are using Wordpress eCommerce, use the [Segment PHP library source](/docs/connections/sources/catalog/libraries/server/php/), and implement your Segment events following the [Segment Spec](/docs/connections/spec/), as usual.
