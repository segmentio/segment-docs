---
rewrite: true
title: Movable Ink Destination
id: 5a611c86c0ff800001f6c431
---
[Movable Ink](https://movableink.com/) lets email marketers deliver jaw-dropping customer experiences. Our cloud-based software activates any data to generate intelligent content at the moment of open.

This destination is maintained by [Movable Ink](https://movableink.com/). If you have any issues, contact Movable Ink at support@movableink.com.

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

Perform the following steps to get started with Segment's Movable Ink destination:
1. Ensure you have an active Movable Ink account.
2. Turn on the Movable Ink destination using the Segment dashboard.
3. Talk to your Movable Ink account manager to get your Movable Ink API key.
4. Enter the API key into the Movable Ink destination settings.
5. set up the Segment SDK to send `track` and `identify` events to Movable Ink.


## Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does.

When you send an `identify` event with one of Segments sources, this is passed to the Movable Ink API and includes the user `traits` you provide along with the previously used `anonymousId` as well as the `userId` that was given.

Once the Movable Ink API receives this `identify` event, it will associate the events made by the previous `anonymousId` to the provided `userId` or `traits.email` if one is provided. From that point on, the events will now appear in the user profile. This enables **Signals** features such as behavioral targeting, as well as content integrations like **Behavioral Apps**.

## Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does.

When you send a `track` event with one of Segment's sources, Movable Ink will normalize them into the same events that Movable Ink's API would normally receive. They will then be available to target against in behavioral marketing campaign content as well as being available in **Custom Apps** and **Behavioral Apps**.

Track events that are sent to Movable Ink will be attributed to the user identifier provided by any `identify` call. This user identifier may be an email or another unique identifier if one exists for that user.

If no `identify` call has been made, then the events will be attributed to an anonymous user using the `anonymousId`, until an `identify` call is made and the `userId` is set.

Events coming from Segment have a few required properties for them to work with **Signals**.

### Ecommerce Supported Events
Movable Ink currently supports the [Segment Ecommerce](/docs/connections/spec/ecommerce/v2/) event specification, and in the future Movable Ink may expand the supported events to work with additional client use cases.

#### Product Events
The `Product Viewed` and `Product Added` `track` events must include the following properties in order for them to be used in **Signals**:

* `sku` or `product_id`
* `url`

#### Conversion Events
The `track` event `Order Completed` is used to create conversion events in **Signals**. The required properties are:

* `total`
* `products` to list the products that were purchased. Each item in this list must contain the properties `sku` or `product_id` as well as `price`.

### Example Flow
1. Send a `track` event with no identity, it will attribute to an anonymous user.
2. Send an `identify` event to set the user identifier.
3. Send another `track` event. It will be attributed to the user set by the `identify` event.

## Troubleshooting/ FAQ

### No Events in Movable Ink associated with profiles
Remember, the `track` events `Product Viewed` and `Product Added` must include `sku` or `product_id` _and_ must include a `url`. These properties enable events to be associated with an user's profile.
