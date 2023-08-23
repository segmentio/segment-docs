---
title: Elastic Path Source
---

[Elastic Path](https://www.elasticpath.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a SaaS based headless commerce platform that provides core commerce with a focus on catalog & product data management and modern merchandising capabilities so that brands can power their complex commerce experiences across multiple geographies, touchpoints, brands, and business models.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources){:target="_blank"} which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Elastic Path. For any issues with the source, contact the [Elastic Path's Support team](https://support.elasticpath.com/hc/en-us){:target="_blank"}.

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"} click **Add Source**.
2. Search for **Elastic Path** in the Sources Catalog, select **Elastic Path**, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.
    - The name identifies this source within your workspace, and typically reflects the name of the application. The name can be anything, but Segment recommends that you use something that reflects the source itself and distinguishes amongst your environments (for example, `SourceName_Prod`, `SourceName_Staging`, or `SourceName_Dev`).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to Elastic Path Commerce Manager - navigate to Integrations Hub > Select Segment integration > [configure integration](https://elasticpath.dev/docs/composer/integration-hub/customer-management/segment){:target="_blank"} where you need to use Segment key
6. This integration is using JSONata templates to provide flexibility to send your custom fields as well to Segment.
7. In this integration, you can configure that how you want to associate Elastic Path event with Segment event for streaming data e.g. send `Order Completed` event to Segment when Elastic Path order event is `order.paid` or `order.authorized` or if order is fulfilled i.e. `order.fulfilled`.


## Events

The table below lists events that Elastic Path sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

| Event Name                       | Description                                                            |
| -------------------------------- | ---------------------------------------------------------------------- |
| `Customer Created`               | Creating identity in Segment.                                          |
| `Customer Updated`               | Updating identity in Segment                                           |
| `Checkout Started`               | Checkout started event e.g. when order is created                      |
| `Order Completed`                | Order completed event e.g. when order is paid or authorized            |
| `Order Updated`                  | Order updated event e.g. when shipping address is updated              |
| `Order Cancelled`                | Order cancelled event                                                  |
| `Order Refunded`                 | Order refunded event                                                   |

## Event properties

The table below list the properties included in the events listed above.

### Identity events

The following payload contains the properties for the following events:

- `Customer Created`
- `Customer Updated`

| Property Name           | Description                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `userId`                | Customer ID of Elastic Path Composable Commerce                               |
| `traits`                | Free-form dictionary of traits of the user, like email or                     |
| `traits.name`           | Customer name                                                                 |
| `traits.email`          | Customer email                                                                |

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
| `userId`                                | If registered user place order then the value of userId will be the Customer ID otherwise it will be order ID. You can change this as per your requirement.                                                                                                       |
| `event`                                 | Event name e.g. `Checkout Started`, `Order Completed` etc.             |
| `properties`                            | This will hold information about the order                             |
| `properties.order_id`                   | Elastic Path Order ID                                                  |
| `properties.value`                      | Revenue ($) with discounts and coupons added in. For better flexibility and total control over tracking, we let you decide how to calculate how coupons and discounts are applied. Usually this is required for `Checkout Started` event                                                                              |
| `properties.total`                      | Revenue ($) with discounts and coupons added in. For better flexibility and total control over tracking, we let you decide how to calculate how coupons and discounts are applied. Usually this is required for all the events apart from `Checkout Started` event                                                    |
| `properties.revenue`                    | Revenue ($) associated with the transaction (excluding shipping and tax). Usually this is required for all the events apart from `Checkout Started` event                                    |
| `properties.tax`                        | Total tax associated with the transaction                              |
| `properties.discount`                   | Total discount associated with the transaction                         |
| `properties.shipping`                   | Shipping cost associated with the transaction                          |
| `properties.currency`                   | Currency code associated with the transaction e.g. GBP, USD etc.       |
| `properties.products`                   | List of products in the order                                          |
| `properties.products.$.product_id`      | Product ID                                                             |
| `properties.products.$.name`            | Product Name                                                           |
| `properties.products.$.sku`             | Product SKU                                                            |
| `properties.products.$.price`           | Product Unit Price                                                     |
| `properties.products.$.quantity`        | Quantity of a product                                                  |

Note: We are using properties of these events from [eCommerce Spec](https://segment-docs.netlify.app/docs/connections/spec/ecommerce/v2){:target="_blank"} defined by Segment doc. Add more properties as per this documentation based on your business requirement.

## Add destinations

Now that your Source is configured, you can connect it with Destinations. Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the Event Delivery tool, and refer to the Destination docs for each tool for troubleshooting. If there are any issues with how the events are arriving to Segment, contact the [Elastic Path's Support team](https://support.elasticpath.com/hc/en-us){:target="_blank"}.
