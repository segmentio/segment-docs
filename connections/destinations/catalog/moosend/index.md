## Getting Started

### Creating a Website Id

Integrating with Segment requires creating a Website Id. Once you login to your Moosend account, navigate to the tracked websites tab in the account submenu. There you will be able to fill in the field with the url of your website.

## Page

You can track [Page](https://segment.com/docs/spec/page/) events via Segment's `analytics.page` method. It is highly recommended that, if possible, you add this event to the header of your website, after the library initialization and before you close your script tag.

## Identify

An [Identify](https://segment.com/docs/spec/identify/) event lets you tie a user in Moosend to their actions and record traits about them. It includes a unique email and any optional traits you know about them like their name, etc. 

Our recommendation is to call `identify` after a user registers, after a user logs in and after a user provides their email as part of your newsletter subscription form (if applicable).

## Track

Although you can track any custom event, Moosend has some known events that implement advanced behavior (listed below)

## Product Viewed  

A [Product Viewed](https://segment.com/docs/spec/ecommerce/v2/#product-viewed) event should be used to track when a user views a product (before adding to cart or purchasing). This event helps to implement advanced retargeting strategies in Moosend like browse abandonment and engage with customers that view, but do not purchase, a product.

Please adhere to the specd property defintions outlined in the documentation linked above.

## Order Completed

An [Order Completed](https://segment.com/docs/spec/ecommerce/v2/#order-completed) event should be used to track when a user succesfully completes their order.

Please adhere to the specd property defintions outlined in the documentation linked above.

## Added To Cart

A [Product Added](https://segment.com/docs/spec/ecommerce/v2/#product-added) event should be used to track when a user adds an item to their cart. These events can be then used to implement cart abandonment emails. 

Please adhere to the specd property defintions outlined in the documentation linked above.