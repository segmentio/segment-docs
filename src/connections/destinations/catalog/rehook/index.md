---
title: Rehook Destination
rewrite: true
id: 64c02312ff0ce798cc8d1a7e
---

[Rehook](https://rehook.ai/){:target="_blank"} is a powerful and dedicated user-incentivization solution that enables businesses to reward and engage users without any dependency on tech. With an elegant, easy-to-use interface, Rehook is designed to help you run user-promotion campaigns that are flexible, customizable, and scalable.


Rehook maintains this destination; for any issues with the destination, [contact the Rehook Support team](mailto:services@rehook.ai).


## Getting Started



1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **Rehook** in the Destinations Catalog, and select the **Rehook** destination.
3. Choose which Source should send data to the Rehook destination.
4. Go to the [Rehook Dashboard](https://dashboard.rehook.ai/){:target="_blank"} and navigate to **Settings > API Keys & Secret Key**, and copy it.
5. Enter the **API Key & Secret Key** in the Rehook destination settings in Segment.


## Supported methods

Rehook supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

Take a look at the [Identify method documentation](/docs/connections/spec/identify) to learn about what it does.

```js
analytics.identify('userId12345', {
  firstName: 'Bob',
  lastName: 'Dole',
  email: 'bob.dole@example.com',
  company: 'Initech',
  employees: 234
});
```

Every time you make an identify call with userId included:
1.	Rehook verifies that the userId exists.
2.	If the userId doesn’t exist, Rehook adds the user as a Customer to the Rehook database and matches user properties with the Segment `traits` sent in the identify call payload.
3.	If the userId exists, Rehook updates the user properties for the Customer against the Segment `traits` sent in the identify call payload.

All the [special traits](/docs/connections/spec/identify#traits) recognized by Segment are translated and matched with the Rehook user properties for a Customer. These fields are automatically created or mapped for a Customer in Rehook and are available for personalization and advance segmentation.

### Track

Take a look at the [Track method documentation](/docs/connections/spec/track) to learn about what it does. An example call looks like:

```js
analytics.track('Product Viewed', {
  userId: "97980cfea0067",
  product_id: '507f1f77bcf86cd799439011',
  name: 'Monopoly: 3rd Edition',
  price: 18.99,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg'
});
```
Segment sends `Track` calls to Rehook as a Custom Event. When you call the track, Segment sends the event to Rehook with the event name and all properties that you specified.

Be sure if you send an Identify or Track call without userId, the call will be dropped.
