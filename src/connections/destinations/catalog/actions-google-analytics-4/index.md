---
title: Google Analytics 4 Destination
strat: google
hide-boilerplate: true
hide-dossier: true
---

[Google Analytics 4](https://support.google.com/analytics/answer/10089681){:target="_blank"} is Google's new Analytics property, which you can use for both websites and applications. Google Analytics 4 has machine learning at its core to help surface insights and give you a more complete understanding of your customers across devices and platforms. 

When you have Segment installed, you can use your existing tracking implementation to fulfill your data collection needs with Google Analytics 4. Segment will send your data server-side to Google's [Measurement Protocol API](https://developers.google.com/analytics/devguides/collection/protocol/ga4).

> info ""
> This document is about a feature which is in beta. This means that the Destination Actions are in active development, and some functionality may change before it becomes generally available


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Google Analytics 4 destination. There's also a page about the [non-Actions Google Universal Analytics destination](/docs/connections/destinations/catalog/google-analytics/). Both of these destinations receive data _from_ Segment.

## Benefits of Google Analytics 4

The Google Analytics 4 destination provides the following benefits:

- **Fewer settings**. Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data**. Actions-based destinations enable you to define the mapping between the data Segment receives from your source and the data Segment sends to Google Analytics 4.
- **Prebuilt mappings**. Mappings for recommended Google Analytics 4 events, like `Purchase`, are prebuilt with the prescribed parameters and available for customization.
- **Support for multi-product arrays**. Products nested within arrays, like the `products` array in the [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) event, can be sent to Google Analytics 4.

## Getting started

Before you connect Segment to Google Analytics 4, configure a Google Analytics 4 property in your Analytics account. For more information, see Google's article: [Set up Analytics for a website and/or app](https://support.google.com/analytics/answer/9304153){:target='_blank'}.

### Connect Google Analytics 4 to your workspace

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Google Analytics 4” in the Destinations Catalog, and select the destination.
3. Click **Configure Google Analytics 4** in the top-right corner of the screen.
4. Select the source that will send data to Google Analytics 4 and follow the steps to name your destination.
5. On the **Settings** tab tab, enter in the [Measurement ID](https://support.google.com/analytics/answer/9539598){:target='_blank'} and API Secret associated with your GA4 stream and click **Save**. _Note: To create a new API Secret, navigate in the Google Analytics UI to Admin > Data Streams > choose your stream > Measurement Protocol > Create._
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).

### Create your first Mapping

Mappings define which events Segment sends to Google Analytics 4, and the data that they carry. To create a Mapping:

1. Navigate to the **Mappings** tab on the destination.
2. Click **Add Mapping**, and select one of the prebuilt actions.
3. Configure the **Event Trigger**. For example, you can trigger the action whenever the source sends an event named `Order Completed`. 
4. Click **Continue** to choose a test event and configure the action fields. 
5. When you're finished editing the action fields, click **Continue**. 
6. To test your mapping, expand the **Send a test event** section, and click **Test Action**. This section displays the test result and the payload that Google Analytics 4 returns to Segment.
7. Click **Save**.
8. Enable the Mapping with the toggle under the **Status** column.

## Available Google Analytics 4 Actions

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
