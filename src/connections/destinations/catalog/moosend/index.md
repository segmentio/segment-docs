---
title: Moosend Destination
id: 5ac4ee052dc77f7e54322e3f
---
### Creating a Website Id

Integrating with Segment requires creating a Website Id. Once you login to your Moosend account, navigate to the tracked websites tab in the account submenu. There you can fill enter the url of your website.

## Page

You can track [Page](/docs/connections/spec/page/) events using Segment's `analytics.page` method. It is highly recommended that, if possible, you add this event to the header of your website, after the library initialization and before you close your script tag.

## Identify

An [Identify](/docs/connections/spec/identify/) event lets you tie a user in Moosend to actions they've completed and other recorded traits about that user. It includes a unique email and their name.

Our recommendation is to call `identify` after a user registers, after a user logs in and after a user provides their email as part of your newsletter subscription form (if applicable).

## Track

Although you can track any custom event, Moosend has some known events that implement advanced behavior (listed below)

## Product Viewed

A [Product Viewed](/docs/connections/spec/ecommerce/v2/#product-viewed) event should be used to track when a user views a product (before adding to cart or purchasing). This event helps to implement advanced retargeting strategies in Moosend like browse abandonment and engage with customers that view, but do not purchase, a product.

Make sure you follow the spec format explained in the documentation linked above.

## Order Completed

An [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) event should be used to track when a user succesfully completes their order.

Make sure you follow the spec format explained in the documentation linked above.

## Added To Cart

A [Product Added](/docs/connections/spec/ecommerce/v2/#product-added) event should be used to track when a user adds an item to their cart. These events can be then used to implement cart abandonment emails.

Make sure you follow the spec format explained in the documentation linked above.
