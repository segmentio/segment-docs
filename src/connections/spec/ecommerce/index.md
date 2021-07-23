---
title: 'Spec: V1 Ecommerce Events'
hidden: true
---

This guide maps out the standard data Segment expects to see from ecommerce companies. The semantic events detailed below represent the ideal for ecommerce events; not every ecommerce store will take advantage of every event or all of their properties.

## V2

Segment now supports a fully **backwards compatible** V2 of our Ecommerce Spec. You can still use V1 but we recommend upgrading to V2 as it includes many more spec'd ecommerce events!

Refer to our V2 docs [here](/docs/connections/spec/ecommerce/v2/).

## V1 Overview

One of the core components of the Segment [Spec](/docs/connections/spec/) is the [`track`](/docs/connections/spec/track) method. It records any arbitrary event that the user has triggered. For Ecommerce tracking, you will be sending **specific event names** that we recognize semantically. That way we can transform them before sending them off to each different tool.

The `properties` listed in the sections below are **required** for some destinations to function. You can always add your own custom properties (product color, size, etc.) in addition to the required ones.


## Events

The ecommerce category includes the following semantic events:

- [V2](#v2)
- [V1 Overview](#v1-overview)
- [Events](#events)
- [Viewed Product Category](#viewed-product-category)
  - [Properties](#properties)
  - [Example](#example)
- [Viewed Product](#viewed-product)
  - [Properties](#properties-1)
  - [Example](#example-1)
- [Added / Removed Product](#added--removed-product)
  - [Properties](#properties-2)
  - [Example](#example-2)
- [Completing an Order](#completing-an-order)
- [Google Analytics Enhanced Ecommerce](#google-analytics-enhanced-ecommerce)


## Viewed Product Category

Category pages are a staple of Ecommerce. They let the user browse all of the products in a specific category. You'll want to track all of your product category pages so you can quickly see which categories are most popular.

To do that, you'll want to record a specially recognized event called `Viewed Product Category` using a `track call. This event fires when a visitor views a product category. That view might happen on a page, screen, or modal.

### Properties

This event supports the following semantic property:

Property        | Type   | Description
--------        | ----   | -----------
`category`      | String | The product category being viewed.


### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Viewed Product Category",
  "properties": {
    "category": "Games"
  }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Viewed Product Category",
  "properties": {
    "category": "Games"
  }
}
```


## Viewed Product

The second special event to record for an Ecommerce installation is 'Viewed Product'. To record that you'll use a `track` call.This event fires when a visitor views a product. That view might happen on a page, screen, or preview modal.

Note that the properties are required to tell individual tools, like Google Analytics, about the specific product that was viewed. You can always add your own custom properties as well.

### Properties

This event supports the following semantic properties:

Property   | Type   | Description
--------   | ----   | -----------
`id`       | String | The database id of the product being viewed.
`sku`      | String | The sku of the product being viewed.
`name`     | String | The name of the product being viewed.
`price`    | Number | The price ($) of the product being viewed.
`category` | String | The product category being viewed.

_Note: The `sku` and `id` do not have to be different. If they are different, typically the `id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `SEG-02`._

### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Viewed Product",
  "properties": {
    "id": "507f1f77bcf86cd799439011",
    "sku": "G-32",
    "name": "Monopoly: 3rd Edition",
    "price": 18.99,
    "category": "Games"
  }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Viewed Product",
  "properties": {
    "id": "507f1f77bcf86cd799439011",
    "sku": "G-32",
    "name": "Monopoly: 3rd Edition",
    "price": 18.99,
    "category": "Games"
  }
}
```


## Added / Removed Product

Next up are two events that are critical to figuring out how your customers are interacting with your products: 'Added Product' and 'Removed Product'. Fire the `Added Product` event when a visitor adds a product to their shopping cart and the `Removed Product` event when a visitor removes a product from their shopping cart.

The properties to record for each of these are the same as the ones for the'Viewed Product' event above (of course you can always add more properties of your own too!).

### Properties

This event supports the following semantic properties:

Property   | Type   | Description
--------   | ----   | -----------
`id`       | String | The database id of the product being added or removed.
`sku`      | String | The sku of the product being added or removed.
`name`     | String | The name of the product being added or removed.
`price`    | Number | The price ($) of the product being added or removed.
`quantity` | Number | The quantity of product being added or removed.
`category` | String | The category of the product being added or removed.

### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Added Product",
  "properties": {
    "id": "507f1f77bcf86cd799439011",
    "sku": "45790-32",
    "name": "Monopoly: 3rd Edition",
    "price": 18.99,
    "quantity": 3,
    "category": "Games"
  }
}'}}} {% endcomment %}
```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Added Product",
  "properties": {
    "id": "507f1f77bcf86cd799439011",
    "sku": "45790-32",
    "name": "Monopoly: 3rd Edition",
    "price": 18.99,
    "quantity": 3,
    "category": "Games"
  }
}
```


{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Removed Product",
  "properties": {
    "id": "507f1f77bcf86cd799439011",
    "sku": "45790-32",
    "name": "Monopoly: 3rd Edition",
    "price": 18.99,
    "quantity": 2,
    "category": "Games"
  }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Removed Product",
  "properties": {
    "id": "507f1f77bcf86cd799439011",
    "sku": "45790-32",
    "name": "Monopoly: 3rd Edition",
    "price": 18.99,
    "quantity": 2,
    "category": "Games"
  }
}
```


## Completing an Order

The final step is to record a `Order Completed` event when people complete your checkout process. It's the most important event to record, since you'll use it for A/B tests, sales dashboards, conversion pixels and pretty much everything you can think of!

Be sure to **include all items in the cart as event properties**, with the same properties from the previous calls, like so:

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Order Completed",
  "properties": {
    "orderId": "50314b8e9bcf000000000000",
    "revenue": 25.00,
    "shipping": 3.00,
    "tax": 2.00,
    "discount": 2.50,
    "coupon": "hasbros",
    "currency": "USD",
    "products": [{
      "id": "507f1f77bcf86cd799439011",
      "sku": "45790-32",
      "name": "Monopoly: 3rd Edition",
      "price": 19.00,
      "quantity": 1,
      "category": "Games"
    }, {
      "id": "505bd76785ebb509fc183733",
      "sku": "46493-32",
      "name": "Uno Card Game",
      "price": 3.00,
      "quantity": 2,
      "category": "Games"
    }]
  }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Order Completed",
  "properties": {
    "orderId": "50314b8e9bcf000000000000",
    "revenue": 25.00,
    "shipping": 3.00,
    "tax": 2.00,
    "discount": 2.50,
    "coupon": "hasbros",
    "currency": "USD",
    "products": [{
      "id": "507f1f77bcf86cd799439011",
      "sku": "45790-32",
      "name": "Monopoly: 3rd Edition",
      "price": 19.00,
      "quantity": 1,
      "category": "Games"
    }, {
      "id": "505bd76785ebb509fc183733",
      "sku": "46493-32",
      "name": "Uno Card Game",
      "price": 3.00,
      "quantity": 2,
      "category": "Games"
    }]
  }
}
```

**Note**: Some destinations require `total` in place of `revenue`. Specific requirements will be outlined in each destination's documentation.

## Google Analytics Enhanced Ecommerce

If you're using Google Analytics enhanced ecommerce there are some special events you might also want to add. Details in [our GA docs](/docs/connections/destinations/catalog/google-analytics/#enabling-enhanced-e-commerce-tracking).
