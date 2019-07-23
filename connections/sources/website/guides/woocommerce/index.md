---
title: "WooCommerce Plugin [Deprecated]"
hidden: true
---

Installing Segment in a Woo Commerce store is extremely simple and doesn't require any code! All you have to do is install the Segment WordPress plugin and add your Segment **Write Key**.

<div align="center">![ghost logo](/docs/sources/website/guides/woocommerce/images/logo.png)</div>

{{>deprecated}}

We recommend using third party guides or destinations such as the [guide from WooCommerce](https://woocommerce.com/products/segment-io-integration/) or [ExtensionWorks](http://www.extensionworks.com/product/woocommerce-segment-io/).

## Step 1: Install the Plugin

The first thing you need to do is install the Segment plugin on your WordPress site. You can find it in the WordPress plugin directory by searching for "Segment Analytics". Or download the `.zip` [file from GitHub](https://github.com/segmentio/analytics-wordpress).


## Step 2: Segment Account

Next you need to create a Segment account. We recommend creating an organization as well so you can invite teammates.

Once your account is created, create a new source for your store. Once you see the Setup page, copy your **Write Key** and paste it into your analytics settings by going to **Settings > Analytics** in your WP admin.

Segment is now loading on your WooCommerce Site! We also collect your most important events automatically via our client-side javascript library Analytics.js, see a full list [below](#automatic-events).


## Step 3: Try Out Tools

The last step is to have some fun. Explore the Segment destinations page to find interesting new tools and sign up for a few free trials to see what works for your business. The WooCommerce plugin allows you to use any destinations that we support in the browser.


## Automatic Events

The Segment WordPress plugin automatically collects some important Woo Commerce events. No code is needed for it to work!

Here's a list of events we collect automatically:

- Viewed Category Page
- Viewed Product (with product details as properties)
- Added Product (with product details as properties)
- Removed Product (with product details as properties)
- Viewed Cart Page
- Completed Order (with order and product details as properties)

We'll also record all the default events that all WordPress users get! Check out the [docs for the standard plugin](/docs/sources/website/guides/wordpress) for more information.
