---
title: Elastic Path Source
---

[Elastic Path](https://www.elasticpath.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a SaaS based headless commerce platform that provides core commerce with a focus on catalog & product data management and modern merchandising capabilities so that brands can power their complex commerce experiences across multiple geographies, touchpoints, brands, and business models.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources){:target="_blank"} which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Elastic Path. For any issues with the source, contact the [Elastic Path's Support team](https://support.elasticpath.com/hc/en-us){:target="_blank"}.

## Getting started

1. Navigate to **Connections > Catalog** and make sure you're on the **Sources** tab of the catalog.
2. Search for **Elastic Path** in the Sources Catalog, select **Elastic Path**, and click **Add Source**.
3. Give the Source a name and configure any other settings.
    - The name identifies this source within your workspace, and typically reflects the name of the application. The name can be anything, but Segment recommends that you use something that reflects the source itself and distinguishes amongst your environments (for example, `SourceName_Prod`, `SourceName_Staging`, or `SourceName_Dev`).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to the Elastic Path Commerce Manager.  
6. Navigate to Integrations Hub > Select Segment integration > [configure integration](https://elasticpath.dev/docs/composer/integration-hub/customer-management/segment){:target="_blank"} where you need to use Segment key.

This integration is uses JSONata templates to provide flexibility to send your custom fields to Segment.
You can configure how you want to associate an Elastic Path event with Segment event for streaming data. For example, send the `Order Completed` event to Segment when the Elastic Path order event is `order.paid` or `order.authorized` or if order is fulfilled, for example, `order.fulfilled`.


## Events

The table below lists events that Elastic Path sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

| Event Name                       | Description                                                            |
| -------------------------------- | ---------------------------------------------------------------------- |
| `Customer Created`               | Creating identity in Segment.                                          |
| `Customer Updated`               | Updating identity in Segment                                           |
| `Checkout Started`               | When a user started the checkout process. For example, when a user creates an order.                     |
| `Order Completed`                | Tracks when a user completes their order. For example, when an order is paid or authorized.            |
| `Order Updated`                  | When an order is updated. For example, when the user updates the shipping address.              |
| `Order Cancelled`                | When a user cancels an order.                                                  |
| `Order Refunded`                 | Order refunded event                                                   |

## Event properties

The tables below list the properties included in the events listed above.

### Identity events

The following payload contains the properties for the following events:

- `Customer Created`
- `Customer Updated`

| Property Name           | Description                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `userId`                | The customer ID of Elastic Path Composable Commerce.                               |
| `traits`                | The free-form dictionary of traits of the user, like email.                     |
| `traits.name`           | The customer name.                                                                 |
| `traits.email`          | The customer email.                                                                |

**Note**: You can add any custom fields as well as part of the traits e.g. age, gender, title, phone etc.

### Order events

The following payload contains the properties for the following events:

- `Checkout Started`
- `Order Completed`
- `Order Updated`
- `Order Cancelled`
- `Order Refunded`

| Property Name                                       | Description                                                                                                                                           |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `userId`                                | If the registered user places an order, then the value of the userId is the Customer ID. Otherwise, it will be the order ID. You can change this as per your requirement.                                                                                                       |
| `event`                                 | The event name, for example,  `Checkout Started`, `Order Completed`.             |
| `properties`                            | This holds information about the order.                             |
| `properties.order_id`                   | The Elastic Path Order ID.                                                  |
| `properties.value`                      | The revenue ($) with discounts and coupons added in. For better flexibility and total control over tracking, Elastic Path lets you decide how to calculate how coupons and discounts are applied. This is usually required for the `Checkout Started` event.                                                                              |
| `properties.total`                      | The revenue ($) with discounts and coupons added in. For better flexibility and total control over tracking, Elastic Path lets you decide how to calculate how coupons and discounts are applied. This is usually required for all the events apart from the `Checkout Started` event.                                                    |
| `properties.revenue`                    | The revenue ($) associated with the transaction (excluding shipping and tax). This is usually required for all the events apart from the `Checkout Started` event.                                    |
| `properties.tax`                        | The total tax associated with the transaction.                              |
| `properties.discount`                   | The total discount associated with the transaction.                         |
| `properties.shipping`                   | The shipping cost associated with the transaction.                          |
| `properties.currency`                   | The currency code associated with the transaction. For example, GBP, USD.       |
| `properties.products`                   | The list of products in order.                                          |
| `properties.products.$.product_id`      | The product ID.                                                             |
| `properties.products.$.name`            | The product name.                                                           |
| `properties.products.$.sku`             | The product SKU.                                                            |
| `properties.products.$.price`           | The product unit price.                                                     |
| `properties.products.$.quantity`        | The quantity of a product.                                                  |

Note: Elastic path is using properties of these events from the [eCommerce Spec](https://segment-docs.netlify.app/docs/connections/spec/ecommerce/v2){:target="_blank"} defined by the Segment doc. Add more properties as per this documentation based on your business requirement.

## Add destinations

Now that you've configured your source, you can connect it with destinations. Log in to your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the Event Delivery tool, and refer to the Destination docs for each tool for troubleshooting. If there are any issues with how the events arrive to Segment, contact the [Elastic Path Support team](https://support.elasticpath.com/hc/en-us){:target="_blank"}.
