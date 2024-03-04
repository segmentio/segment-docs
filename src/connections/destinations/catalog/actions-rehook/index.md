---
title: Rehook Destination
id: 64c02312ff0ce798cc8d1a7e
---

{% include content/plan-grid.md name="actions" %}

[Rehook](https://rehook.ai/){:target="_blank"} is a powerful and dedicated user-incentivization solution that enables businesses to reward and engage users without depending on tech teams. With an elegant and easy-to-use interface, Rehook is designed to help you run user-promotion campaigns that are flexible, customizable and scalable.

This destination is maintained by Rehook. For any issues with the destination, [contact the Rehook Support team](mailto:services@rehook.ai).


## Getting started

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for **Rehook** in the Destinations Catalog, and select the **Rehook** destination.
3. Select which Source should send data to the Rehook destination.
4. Open the [Rehook Dashboard](https://dashboard.rehook.ai/){:target="_blank"} and navigate to **Settings > API Keys & Secret Key**. Copy your key. 
5. Open the Segment app and paste the **API Key & Secret Key** in the Rehook destination settings page.


## Supported methods

Rehook's destination is designed to support the following [Segment Spec](/docs/connections/spec) methods. Because this is an Actions Destination, you can also map other Segment methods.

### Identify

If you're not familiar with the Segment Spec, take a moment to understand what the [Identify method](/docs/connections/spec/identify/) does.
An example call looks like this:

#### Example 1:
```js
analytics.identify('userId12345', {
  firstName: 'Bob',
  lastName: 'Dole',
  email: 'bob.dole@example.com',
  company: 'Initech',
  employees: 234
});
```

#### Example 2:
```js
analytics.identify('userId12345', {
  firstName: 'Bob',
  lastName: 'Dole',
  email: 'bob.dole@example.com',
  company: 'Initech',
  employees: 234,
  referral_code: "ERTYUS"
});
```

Every time you make an Identify call with an included `userId`:

1.	Rehook verifies that the `userId` exists.
2.	If the `userId` does not exist, Rehook adds the user as a Customer to the Rehook database and matches user properties with the Segment `traits` sent in the Identify call payload.
3.	If the `userId` exists, Rehook updates the user properties for the Customer against the Segment `traits` sent in the Identify call payload.
4.  If `referral_code` is unique, Rehook updates the user properties in its database.

All of the [traits](/docs/connections/spec/identify#traits) recognized by Segment are translated and matched with the Rehook Customer user properties. These fields are automatically created or mapped for a Customer in Rehook and are available for personalization and advanced segmentation.

> info "How Rehook handles incoming userId and referral_code in Identify calls:"
> * The `userId` field is required. Rehook drops Identify calls without a userId.
> * If a call is made with `anonymousID`, Rehook drops the Identify call.
> * If `referral_code` matches with another `userId`, Rehook drops the Identify call.

### Track

If you're not familiar with the Segment Spec, take a moment to understand what the [Track method](/docs/connections/spec/track/) does.

An example call looks like this: 

#### Example 1:
```js
analytics.track('Product Viewed', {
  userId: "userId12345",
  product_id: '507f1f779439011',
  name: 'Monopoly: 3rd Edition',
  price: 18.99,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg'
});
```

#### Example 2:
```js
analytics.track('signup', {
  userId: "userId12345",
  referral_code: 'ERTYUS'
});
```

Segment sends Track calls to Rehook as a Custom Event. When you make a Track call, Segment sends the event to Rehook with the event name and all properties that you specified.

> info "How Rehook handles incoming userId and referral_code in Track calls:"
> * The `userId` field is required. Rehook drops Track calls without a `userId`.
> * If a call is made with `anonymousId`, Rehook drops the Track call.
> * The `referral_code` field is required if event name is set as a conversion event in Rehook. 

{% include components/actions-fields.html %}