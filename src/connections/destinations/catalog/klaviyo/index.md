---
title: Klaviyo Destination
rewrite: true
cmode-override: true
hide-personas-partial: true
id: 54521fd825e721e32a72eec8
---
[Klaviyo](https://www.klaviyo.com){:target="_blank"} is a powerful email platform focused on ecommerce that helps companies make more money. It supports segmentation based on category and event triggers like product bought, page viewed, email engagement, or amount spent.

It measures opens, clicks, revenue generated, breakdown of generated revenue based on custom attributes (like campaign type or amount gained per recipient), and provides trend reports, cohort analysis, and subscriber growth

Klaviyo lets you send personalized newsletters, automates triggered emails, product recommendations, welcome campaigns, order announcements, push notifications and sync your data to Facebook custom audiences.

To configure Klaviyo as an Event Source to get data into your warehouse or other downstream tools, see the [Klaviyo Source](/docs/connections/sources/catalog/cloud-apps/klaviyo/) documentation.

## Getting started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Klaviyo" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Navigate to [Account > Settings > API Keys](https://www.klaviyo.com/account#api-keys-tab){:target="_blank"} in Klaviyo's UI and copy your API Key into the Segment Settings UI.
> info ""
> Klaviyo requires the Private API Key to use the List API. You can find this by going to Klaviyo's UI and clicking [Account > Settings > API Keys > Create API Key](https://www.klaviyo.com/account#api-keys-tab){:target="_blank"}  to generate a Private API Key and copy it into the Segment Settings UI.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify({
  userId: 'user123',
  traits: {
    name: 'Serena Williams',
    gender: 'female'
  }
})
```

### Client-side Identify

When you call `identify` on analytics.js, Segment calls Klaviyo's `identify` with the `traits` object. Segment then augments the `traits` object to have `traits.$id` be the `userId` since Klaviyo takes the user ID on the `traits` object itself.

> info ""
> When you send data to Klaviyo using `analytics.js`, an initial `page` call is required. By default, this is already added in your [Segment snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet).

The following Segment spec'd traits map to Klaviyo [special people properties](http://www.klaviyo.com/docs){:target="_blank"}:

| Segment Traits | Klaviyo Traits  |
| -------------- | --------------- |
| `userId`       | `$id`           |
| `email`        | `$email`        |
| `phoneNumber`  | `$phone_number` |
| `firstName`    | `$first_name`   |
| `lastName`     | `$last_name`    |
| `title`        | `$title`        |

### Server-side Identify

When you call `identify` from a mobile or server-side library, Segment creates or updates a Klaviyo person with the `traits` you provide in the `identify`.

If your `userId` is an email, or you provide an email in `traits.email`, Segment sends it as the `$email` property to Klaviyo. The following Segment spec'd traits map to Klaviyo [special people properties](http://www.klaviyo.com/docs){:target="_blank"}:

| Segment Traits      | Klaviyo Properties |
| ------------------- | ------------------ |
| `userId`            | `$id`              |
| `email`             | `$email`           |
| `phoneNumber`       | `$phone_number`    |
| `organization`      | `$organization`    |
| `firstName`         | `$first_name`      |
| `lastName`          | `$last_name`       |
| `title`             | `$title`           |
| `city`              | `$city`            |
| `region` or `state` | `$region`          |
| `country`           | `$country`         |
| `timezone`          | `$timezone`        |
| `zip`               | `$zip`             |

#### Enforce email as primary identifier

If this option is enabled, Segment won't set the `$id` field to your `userId` when you call ``.identify()`` or ``.track()``. Instead, Segment will set a custom attribute `id` and only set `$email` as the primary identifier with your `traits.email` or `properties.email`. You should be careful when enabling this option and understand its full implications. This should only be enabled if you are experiencing an issue with duplicate profiles being created inside Klaviyo.

#### Fallback on Anonymous ID

Server side `identify` calls require a `userId` unless you enable sending anonymous data. Enable this option to fallback on `anonymousId` if `userId` is not available when sending server side events. Note that this option may result in superfluous user profiles in Klaviyo and is generally not recommended.

#### Adding users to a list

When you call `identify` using a **server side** library, you can optionally send list data in order to add that person to a specific Klaviyo List. Segment will use [Klaviyo's List API](https://www.klaviyo.com/docs/api/lists){:target="_blank"}.

For this to work, you must add the **Private Key** inside the Klaviyo settings in Segment. You can generate a private key by clicking `Account > Settings > API Keys > Create API Key` inside Klaviyo.

You can choose to provide a default `listId` that Segment can fall back on when adding users to a list. If you'd like to override this default `listId`, you can also do so by sending it manually using code in `integrations.Klaviyo.listId`.

**Important**: You must provide an `email` in your `traits` or send `email` as the `userId`. Be sure to provide the `Private Key` in the Klaviyo settings for this to work.

`node` example:

```js
analytics.identify({
  userId: '019mr8mf4r',
  traits: {
    name: 'Serena Williams',
    email: 'swilliams@sportstech.com',
    plan: 'Enterprise',
    friends: 42
  },
  integrations: {
    Klaviyo: {
      listId: 'baV129', // will override whatever it is in the UI setting
      confirmOptin: false // optional
    }
  }
});
```

#### Confirm opt in

You can also choose whether you want to force users to confirm the opt in to your list. This flag determines whether someone is sent an email with a confirmation link before they are added to the list. The default settings will be `true`. However, you can uncheck this option in the Klaviyo settings inside Segment or override it per Identify call using code in the `integration.Klaviyo.confirmOptin` parameter.

> warning ""
> This setting should only be set to `false` or unchecked if you have already received explicit permission to add a user to the list. Setting `Klaviyo.confirmOptin` to `false` without explicit user permission can result in your Klaviyo account being suspended and/or terminated by Klaviyo.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track({
  userId: 'user123',
  event: 'Item Added',
  properties: {
    price: 39.95,
    type: 'Dress',
    colour: 'Red',
    shippingMethod: '2-day'
  }
})
```

### Client-side Track

When you call `track` on `analytics.js`, Segment calls Klaviyo's `track` with the same parameters.

### Server-side Track

When you call make a Track call from one of Segment's mobile or server-side libraries, Segment keys the user with the `userId` and also provides the Klaviyo `$email` `customer_property` if your `userId` is an email, or you provide `email` as one of your event `properties`.

Segment also maps the following Segment spec'd properties to Klaviyo's [special people properties](http://www.klaviyo.com/docs){:target="_blank"}:

### Ecommerce

The following table shows the out of the box mappings in Segment's integration between the Segment e-commerce spec and Klaviyo's spec:

| Segment Ecommerce Spec | Klaviyo Standard Event |
| ---------------------- | ---------------------- |
| `Order Completed`      | `Ordered Product`      |

The following table shows the parameter mappings in Segment's integration between Order Completed properties and and Klaviyo's standard properties:

| Segment Properties     | Klaviyo Properties |
| ---------------------- | ------------------ |
| `revenue`              | `$value`           |
| `eventId` or `orderId` | `$event_id`        |

#### Order completed

Klaviyo supports the `Order Completed` event that is outlined in Segment's [specs](/docs/connections/spec/ecommerce/v2/#order-completed). If you send Segment an `Order Completed` event, Segment sends Klaviyo a `Placed Order` event and a `Ordered Product` event for each item listed in the `properties.products` array. Segment also attaches `customer_properties` with the `userId` set as `$id` for each of those Klaviyo events.

Though not included in the Segment spec for a `Order Completed` event, you can optionally include a `productUrl` and or `imageUrl` as a property of an item inside the `products` array. Segment will pass those along to Klaviyo as `Product URL` and `Image URL` respectively.

Each auto-generated `Ordered Product` event requires a unique `$event_id`, which Segment automatically generates based on a combination of the `orderId` of the parent `Order Completed` event, and the `productId`, `id` or `sku` of the product itself (in this order). In other words, you must pass either a `productId`, `id` or `sku` to Segment, or Klaviyo will reject your `Ordered Product` events.

The following example shows an `Order Completed` event that uses the [node.js library](/docs/connections/sources/catalog/libraries/server/node/):

```js
analytics.track({
  userId: '019mr8mf4r',
  event: 'Order Completed',
  properties: {
    orderId: '50314b8e9bcf000000000000',
    total: 30,
    revenue: 25,
    shipping: 3,
    tax: 2,
    discount: 2.5,
    coupon: 'hasbros',
    currency: 'USD',
    repeat: true,
    products: [
      {
        id: '507f1f77bcf86cd799439011',
        sku: '45790-32',
        name: 'Monopoly: 3rd Edition',
        price: 19,
        quantity: 1,
        category: 'Games',
        productUrl: 'http://www.example.com/path/to/product',
        imageUrl: 'http://www.example.com/path/to/product/image.png',
      },
      {
        id: '505bd76785ebb509fc183733',
        sku: '46493-32',
        name: 'Uno Card Game',
        price: 3,
        quantity: 2,
        category: 'Games'
      }
    ]
  }
});
```

##### Send placed order events as order completed

Enable this setting if you'd like to send `Order Completed` events as is rather than changing the event name to `Placed Order` on the server side (client side always sends `Order Completed`). Segment recommends that you keep this setting enabled so that both client- and server-side Klaviyo integrations send the same event for `Order Completed`. Klaviyo does not treat the event names differently in their backend feature wise. This option was introduced to bridge the existing disparity between Segment client- and server-side integrations regarding how this event name is sent without forcibly breaking the current behavior.

## Personas

You can send computed traits and audiences generated using [Segment Personas](/docs/personas) to this destination as a **user property**.

For user-property destinations, Segment sends an [Identify](/docs/connections/spec/identify/) call to the destination for each user added and removed. The property name is the snake_cased version of the audience name, with a true/false value to indicate membership. For example, when a user first completes an order in the last 30 days, Personas sends an Identify call with the property `order_completed_last_30days: true`. When the user no longer satisfies this condition (for example, it's been more than 30 days since their last order), Personas sets that value to `false`.

### Create user segments in Klaviyo

> warning ""
> For the Klaviyo Destination, avoid using a `list_id` in the Personas Destinations settings.

When you first create an audience, Personas sends an Identify call for every user in that audience. Later audience syncs send updates for users whose membership has changed since the last sync. These syncs allow you to create Klaviyo segments from properties Personas sends to Klaviyo as long as the property's value is `true`. Memberships update continuously as user profiles fall in and out of the eligibility criteria for the Personas audience.

If Segment detects a `list_id` in the Klaviyo Destination settings, however, it adds users to the Klaviyo list without removing them when they no longer qualify for list membership. As a result, Segment recommends leaving the `list_id` field empty when you set up the Klaviyo Destination. 
