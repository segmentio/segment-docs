---
title: Google Analytics 4 Destination
hide-boilerplate: true
hide-dossier: true
hidden: true
---

[Google Analytics 4](https://support.google.com/analytics/answer/10089681){:target="_blank"} is Google's new Analytics property, which you can use for both websites and applications. Google Analytics 4 has machine learning at its core to help surface insights and give you a more complete understanding of your customers across devices and platforms. When you have Segment installed, you can use your existing tracking implementation to fulfill your data collection needs with Google Analytics 4.

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Google Analytics destination. There's also a page about the [non-Actions Google Analytics destination](/docs/connections/destinations/catalog/google-analytics/). Both of these destinations receives data _from_ Segment.

## Benefits of Google Analytics 4

The Google Analytics 4 destination provides the following benefits:

- **Fewer settings**. Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to Google Analytics 4.
- **Support for multi-product arrays**. Products nested within arrays, like the products array in the [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) event, can be sent to Google Analytics 4.
- **Multi-platform support**. You can use a Google Analytics 4 property for a website, an app, or both a website and app together.

## Getting started

Before you connect Segment to Google Analytics 4, configure a Google Analytics 4 property in your Analytics account. For more information, see Google's article: [Set up Analytics for a website and/or app](https://support.google.com/analytics/answer/9304153){:target='_blank'}.

The Google Analytics 4 destination is in Private Beta, and does not appear in the Destinations catalog.

1. To access the destination, navigate to this URL: `https://app.segment.com/<workspace_slug>/destinations/catalog/actions-google-analytics-4`. Replace `<workspace_slug>` with your workspace slug.
2. Click **Configure Google Analytics 4** in the top-right corner of the screen.
3. Choose which of your sources to connect the destination to. (You can connect more sources to the destination later.)
4. Click **Configure Actions** and follow the set up steps to** Create Destination**.
5. On the Settings tab, enter in the [Measurement ID](https://support.google.com/analytics/answer/9539598){:target='_blank'} and API Secret associated with your GA4 stream and click **Save**._ Note: to create a new API Secret, navigate in the Google Analytics UI to Admin > Data Streams > choose your stream > Measurement Protocol > Create. _
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).

## Available Google Analytics 4 actions

Combine the supported [triggers](docs/connections/destinations/actions/#components-of-a-destination-action) with the following Google Analytics 4-supported actions:

* Page View
* Search
* Select Item
* View Item
* View Item List
* Add to Wishlist
* Add to Cart
* Remove from Cart
* View Cart
* Select Promotion
* View Promotion
* Begin Checkout
* Add Payment Info
* Purchase
* Refund
* Generate Lead
* Sign Up
* Login
* Custom Event