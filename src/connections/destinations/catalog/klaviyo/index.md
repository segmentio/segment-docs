---
title: Klaviyo Destination
rewrite: true
---

[Klaviyo](https://www.klaviyo.com/features/overview) is a powerful email platform focused on ecommerce that helps companies make more money. It supports segmentation based on category and event triggers like product bought, page viewed, email engagement, or amount spent.

It measures opens, clicks, revenue generated, breakdown of generated revenue based on custom attributes (like type of campaign or amount gained per recipient), and provides trend reports, cohort analysis, and subscriber growth

Ultimately, Klaviyo lets you send personalized newsletters, automates triggered emails, product recommendations, welcome campaigns, order announcements, push notifications and sync your data to facebook custom audiences.

Are you trying to set up Klaviyo as an Event Source to get data into your warehouse or other downstream tools? Go [here](https://segment.com/docs/connections/sources/catalog/cloud-apps/klaviyo/).

This document was last updated on September 6, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Klaviyo" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Navigate to your [Account > Settings > API Keys](https://www.klaviyo.com/account#api-keys-tab) in the Klaviyo's UI and copy your "API Key" into the Segment Settings UI.
5. **Note:** Private API Key is required to use the List API. You can find this by going to Klaviyo's UI and clicking [Account > Settings > API Keys > Create API Key](https://www.klaviyo.com/account#api-keys-tab) in order to generate a Private API Key and copy it into the Segment Settings UI.


## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page();
```

**NOTE**: `page` calls are only supported client-side on analytics.js.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify({
  userId: 'user123',
  traits: {
    name: 'Serena Williams',
    gender: 'female'
  }
})
```

### Client side Identify

When you call `identify` on analytics.js, we call Klaviyo's `identify` with the `traits` object. We augment the `traits` object to have `traits.$id` be the `userId` since Klaviyo takes the user ID on the `traits` object itself.

**Note:** When sending data to Klaviyo using `analytics.js`, an initial `page` call is required. By default, this is already added in your [Segment snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-1-copy-the-snippet).

We will map the following Segment spec'd traits to Klaviyo [special people properties](http://www.klaviyo.com/docs):

| **Segment Traits | Klaviyo Traits** |
|  ------ | ------- |
| `userId` | `$id` |
| `email` | `$email` |
| `phoneNumber` | `$phone_number` |
| `firstName` | `$first_name` |
| `lastName` | `$last_name` |
| `title` | `$title` |

### Server side Identify

When you call `identify` from one of our mobile or server-side libraries, we will create/update a Klaviyo person with the `traits` you provide in the `identify`.

If your `userId` is an email, or you provide an email in `traits.email`, we'll send it as the `$email` property to Klaviyo. We will map the following Segment spec'd traits to Klaviyo [special people properties](http://www.klaviyo.com/docs):

| **Segment Traits | Klaviyo Properties** |
|  ------ | ------- |
| `userId` | `$id` |
| `email` | `$email` |
| `phoneNumber` | `$phone_number` |
| `organization` | `$organization` |
| `firstName` | `$first_name` |
| `lastName` | `$last_name` |
| `title` | `$title` |
| `city` | `$city` |
| `region` or `state` | `$region` |
| `country` | `$country` |
| `timezone` | `$timezone` |
| `zip` | `$zip` |

#### Enforce Email as Primary Identifier

If this option is enabled, we will never set `$id` field to your `userId` when you call ``.identify()`` or ``.track()``. Instead, we will only set a custom attribute `id` and only set `$email` as the primary identifier with your `traits.email` or `properties.email`. You should be careful when enabling this option and understand its full implications. This should only be enabled if you are experiencing an issue with duplicate profiles being created inside Klaviyo.

#### Fallback on Anonymous ID

Server side `identify` calls require a `userId` unless you enable sending anonymous data. Enable this option to fallback on `anonymousId` if `userId` is not available when sending server side events. Note that this option may result in superfluous user profiles in Klaviyo and is generally not recommended.

#### Adding users to a list

When you call `identify` using a **server side** library, you can optionally send list data in order to add that person to a specific List in Klaviyo. We will use their [List API](https://www.klaviyo.com/docs/api/lists).

In order for this to work, you must add the **Private Key** inside the Klaviyo settings in Segment. You can generate a private key by clicking `Account > Settings > API Keys > Create API Key` inside Klaviyo.

You can choose to provide a default `listId` that we can fallback on when adding users to a list. If you'd like to override this default `listId`, you can also do so by sending it manually using code in `destinations.Klaviyo.listId`.

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

#### Confirm Optin

You can also choose whether you want to force users to confirm the optin to your list. This flag determines whether someone is sent an email with a confirmation link before they are added to the list. The default settings will be `true`. However, you can uncheck this option in the Klaviyo settings inside Segment or override it per `identify` call using code in the `integration.Klaviyo.confirmOptin` parameter.

**Note:** This setting should only be set to `false` or unchecked if you have already received explicit permission from that person to add them to this list. Inappropriately setting `Klaviyo.confirmOptin` to `false` without explicit permission of the people added can result in your Klaviyo account being suspended and/or terminated by Klaviyo.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
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

### Client side Track

When you call `track` on `analytics.js`, we call Klaviyo's `track` with the same parameters.

### Server side Track

When you call `Track` from one of our mobile or server-side libraries, we will key the user using the `userId`, but we will also provide the Klaviyo `$email` `customer_property` if your `userId` is an email, or you provide `email` as one of your event `properties`.

We will also map the following Segment spec'd properties to Klaviyo's [special people properties](http://www.klaviyo.com/docs):

### Ecommerce

The below table shows the out of the box mappings in our integration between our e-commerce spec and Klaviyo's spec:

| **Segment Ecommerce Spec | Klaviyo Standard Event** |
|  ------ | ------- |
| `Order Completed` | `Ordered Product` |

The below table shows the parameter mappings in our integration between Order Completed properties and and Klaviyo's standard properties:

| **Segment Properties | Klaviyo Properties** |
|  ------ | ------- |
| `revenue` | `$value` |
| `eventId` or `orderId` | `$event_id` |

#### Order Completed

Klaviyo supports the `Order Completed` event that is outlined in our [specs](/docs/connections/spec/ecommerce/v2/#order-completed). If you send us a `Order Completed` event, we will send Klaviyo a `Placed Order` event and a `Ordered Product` event for each item listed in the `properties.products` array. We will also attach `customer_properties` with the `userId` set as `$id` for each of those Klaviyo events.

While it is not included in our spec for a `Order Completed` event, you can optionally include a `productUrl` and or `imageUrl` as a property of an item inside the `products` array. We will pass those along to Klaviyo as `Product URL` and `Image URL` respectively.

Each auto-generated `Ordered Product` event requires a unique `$event_id`, which Segment automatically generates based on a combination of the `orderId` of the parent `Order Completed` event, and the `productId`, `id` or `sku` of the product itself (in this order). In other words, you must pass either a `productId`, `id` or `sku` to Segment, or Klaviyo will reject your `Ordered Product` events.

An example `Order Completed` event may look like this using the [node.js library](/docs/connections/sources/catalog/libraries/server/node/):

```
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

##### Send Placed Order Events as Order Completed

Enable this setting if you'd like to send `Order Completed` events as is rather than changing the event name to `Placed Order` on the server side (client side always sends Order Completed). It is recommended that you keep this setting enabled so that both client and server side Klaviyo integration sends the same event for `Order Completed`. Klaviyo does not treat the event names differently in their backend feature wise. This option was introduced to bridge the existing disparity between our client and server side integration regarding how this event name is sent without forcibly breaking the current behavior.
