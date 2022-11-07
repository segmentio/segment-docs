---
title: Convertro Destination
id: 54521fd525e721e32a72eea4
---
## Getting Started

Our Convertro destination lets you track customer data from either your website data or your mobile data. When you send data using `analytics.js` Segment uses Convertro's JS library to send `.identify()` and `.track()` data.

If you are sending data using our mobile libraries, Segment uses their server to server API to send `.identify()` and `.track()` data.

## Using `analytics.js` Library

### Identify

When you call our identify call we'll call Convertro's `trackUser` method with the `traits` object. If you don't include the first argument in your `identify` call (the `userId`) nothing will be sent to Convertro.


#### Ecommerce

Ecommerce events are sent to Convertro as long as they include an `orderId`.


#### Amount

To record the transaction amount to Convertro we'll pass the `total` from your **Order Completed** event and fall back to `revenue` if there's no `total`.

#### Repeat Purchases

You can also include `properties.repeat` as a boolean if you need to specify between repeat and new purchasers.

With a value of `true` Segment passes `sale.repeat` to Convertro.

If you record `repeat: false` Segment passes `sale.new` to Convertro.

#### Attribution Model

Convertro has two main attribution models.

1. You don't know which users are new or repeat, so you'll just send through **Order Completed** without a `repeat` property and it will get counted as a `sale` event in Convertro.
2. You know which users are new or repeat, and when you pass through the **Order Completed** event with a `repeat` property set to `true` or `false` we'll send through a `sale.repeat` or `sale.new` event to Convertro.

If over the course of your using Convertro, you switch between the first and second attribution model, Segment provide the ability to take advantage of a **hybrid attribution model** that will send both `sale` and `sale.new` or `sale.repeat` when you have a valid `repeat` property on the **Order Completed** event. This is necessary to combine the models and data from your old `sale` event with the new `sale.new` and `sale.repeat` events.

## Using Mobile Libraries

In order for your mobile data to flow to Convertro, you want to first insert your Convertro **Client Name**, **Site ID**, and **Domain** into your destination settings.

**Important**: Convertro requires your **Device ID** for all API calls. Our mobile libraries automatically collect this value from your device so you do not need to worry about it. Just don't overwrite your `context.device.id` property!

## Identify

Convertro only accepts user data that includes a `userId`. Thus Segment rejects any anonymous `.identify()` calls that does not include the `userId`.

Convertro does not accept any user traits -- meaning that `.identify()` calls will be used to tie your **Device ID** to the **userId**.

## Track

When you call `.track()`, Segment sends that event to Convertro by setting the `event_type` as the name of your event. If you send a `revenue` property, Segment sends that as the `event_value` (`Order Completed` events will use the `total`). The `event_value` will be sent as `1` if no revenue value is provided.

## Application Installed

We will send this automatically collected [`Application Installed` event](/docs/connections/spec/mobile/) to Convertro's `Installs` endpoint.
