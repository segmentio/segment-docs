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

- Amazon Webstore - suspect they don't want you running an out-of-ecosystem analytics tool.

## Bigcommerce

- Bigcommerce - (??)


## Chrome Extension

add the analytics-node library and call as usual

## Cloudflare

## Ghost

- Ghost - use their injection instructions here: https://ghost.org/integrations/segment/

## Goodsie

- Goodsie - no known replacement. company is gone.


## Magento

use the php library https://github.com/segmentio/analytics-php


## Shopify

- Shopify -> use the [Shopify Source](/docs/connections/sources/catalog/cloud-apps/shopify-littledata/)


## Tumblr

insert ajs as part of site customization


## Woocommerce

- WooCommerce - has a paid plugin, https://docs.woocommerce.com/document/segment-io-connector/ otherwise you can probably use PHP


## Wordpress

use the php library https://github.com/segmentio/analytics-php


# WP eCommerce

use the php library https://github.com/segmentio/analytics-php
