---
title: Button Destination
rewrite: true
id: 5f99f7f79cecdd08a8e22c4f
---
[Button](https://usebutton.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the mobile commerce technology company that is powering a commerce-driven internet. The Button platform powers mobile business growth for the world's largest brands and publishers, while offering consumers more seamless, enjoyable experiences.

This destination is maintained by Button. For any issues with the destination, [contact the Button Support team](mailto:support@usebutton.com).

## Getting Started

{% include content/connection-modes.md %}

> info ""
> Contact your Button representative for your Button API Key.

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Button" in the Destinations Catalog, and select the Button destination.
3. Choose which Source should send data to the Button destination.
4. Enter the "API Key" in the Button destination settings in Segment.

## Track
If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Deep Link Opened')
```

Segment sends Track calls to Button as a `track` event.

### Deep links
To track deep links from your app or website, use Segment's [Deep Link Opened](/docs/connections/spec/mobile/#deep-link-opened) and [Application Opened](/docs/connections/spec/mobile/#application-opened) events.

Make sure you pass the referring URL. An example would look like:

```js
analytics.track('Application Opened' { someProperty: true }, {
  userId: '1234567890',
  properties: {
    url: 'brand-app://?btn_ref=srctok-XXX'
  }
  ...
})
```

> success ""
> **Tip!** Make sure you record any different names for `Deep Link Opened` Track events across your sources so you know which are sent where.

### Installs
To track mobile app installs, use Segment's [Application Installed](/docs/connections/spec/mobile/#application-installed) event.

Capture the referring URL when possible. An example would look like:

```js
analytics.track('Application Installed' { someProperty: true }, {
  userId: '1234567890',
  properties: {
    url: 'https://brand-homepage.com?btn_ref=srctok-XXX'
  },
  context {
    app: { version: '4.15.0' },
    device: {
      adTrackingEnabled: false,
      advertisingId: 'XXXXXXXX-YYYY-ZZZZ-1111-222222222222'
    },
    ip: '127.0.0.1',
    locale: 'en-US',
    os: {
      name: 'iOS',
      version: '14.2'
    }
  }
  ...
})
```
> success ""
> **Tip!** Make sure you record any different names for `Application Installed` Track events across your sources so you know which are sent where.

### Orders
To track `order` events from your app or website, use Segment's [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed) event.

An example call would look like:

```js
analytics.track('Order Completed' { someProperty: true }, {
  userId: '1234567890',
  properties: {
    subtotal: 7500,
    products: [
      {
         sku: 'sku-123',
         description: 'T-Shirt',
         size: 'L',
         price: 2500,
         quantity: 1,
         category: 'Clothing',
      },
      {
         sku: 'sku-456',
         description: 'Joggers',
         size: 'M',
         price: 5000,
         quantity: 1,
         category: 'Clothing',
      }
    ]
  }
})
```
> success ""
> **Tip!** Make sure you record any different names for `Order Completed` Track events across your sources so you know which are sent where.

## Setting up a Destination Filter

If you are a Business Tier customer, you can set up a [Destination Filter](/docs/connections/destinations/destination-filters/) to only send your `Deep link` and `Order` events to Button.


Read [Button's Destination Filter documentation](https://developer.usebutton.com/docs/segment-integration-guide) to learn more.
