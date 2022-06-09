---
title: Extole Destination
rewrite: true
beta: true
redirect_from: '/connections/destinations/catalog/extole/'
id: 5e79ef31929aef3bdfbc53a5
---
Brands use Extole to turn customers into advocates. Our enterprise platform and team of experts create beautiful referral and customer engagement programs, so brands can harness the power of sharing to the benefit of their bottom line. Extole enables marketers to engage thousands of advocates, scaling word-of-mouth to acquire new customers and increase loyalty using their greatest competitive advantage: their customers.


This destination is maintained by Extole. For any issues with the destination, [contact Extole Support](mailto:support@extole.com).



## Getting Started

{% include content/connection-modes.md %}

1. Go to your [Extole Tech Center](https://my.extole.com/tech-center#access-token) page and generate an API Key. Copy that key. If you encounter any problems, check this [Extole Help Page on access tokens](https://success.extole.com/hc/en-us/articles/360001616668-Generating-Long-Lived-Access-Tokens).
2. From the Segment Destinations page, click **Add Destination**.
3. Search for "Extole Platform" in the Destinations Catalog, and select it.
4. Confirm which Source to connect to Extole.
5. Enter the Extole "API Key" in your Segment Settings UI.



## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. Identify calls are sent to Extole as an `identify` event.
Segment sends Identify calls to Extole as an `identify` event. Extole creates a new profile or updates an existing one. The table below lists how the basic traits are mapped:

| Segment Traits | Extole Properties |
| -------------- | ----------------- |
| `userId`       | `partner_user_id` |
| `email`        | `email`           |
| `firstName`    | `first_name`      |
| `lastName`     | `last_name`       |

> info ""
> **Note:** All non-standard traits will be added to Extole user profile as PUBLIC parameters.

An example of `.identify()` call:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  age: 25,
  existingCustomer: true
});
```


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Track calls are sent to Extole as a `track` event.

### Track Registrations

Track when a user creates a new account. The example below shows a track event with an event name of  `registration`.

```js
analytics.track('registration', {
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    partner_user_id: 'userId123'
})
```
Extole recommends that you send the `partner_user_id` with every call. If an event is fired multiple times for the same user, Extole de-duplicates it.




### Track Conversions

Track when a user performs a purchase.

```js
analytics.track('conversion', {
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    partner_conversion_id: 'purchaseId123',
    cart_value: '99.99'
})
```

Extole recommends that you send the `partner_conversion_id` with every call. If an event is fired multiple times for the same user, Extole de-duplicates it.


## Event Names

If you do not use the event names `registration` and `conversion` in your implementation, contact [Extole Support](mailto:support@extole.com) and Extole can re-map these events to any other event names.


## Delete

To make consumer data deletion requests more seamless, Extole handles deletion requests.

Example of expected `delete` request body:
```json=
{
    "userId": "056tf9eqw24"
}
```

Upon receiving a deletion request, Extole removes all data associated with that user.
