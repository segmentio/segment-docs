---
title: Extole Destination
rewrite: true
beta: true
---


Brands use Extole to turn customers into advocates. Our enterprise platform and team of experts create beautiful referral and customer engagement programs, so brands can harness the power of sharing to the benefit of their bottom line. Extole enables marketers to engage thousands of advocates, scaling word-of-mouth to acquire new customers and increase loyalty using their greatest competitive advantage: their customers.


This destination is maintained by Extole. For any issues with the destination, please [contact Extole Support](mailto:support@extole.com).



## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Extole Platform" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can generate in your [Extole Tech Center](https://my.extole.com/tech-center#access-token) page. If any issues please consult this [Help Page](https://success.extole.com/hc/en-us/articles/360001616668-Generating-Long-Lived-Access-Tokens). 




## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/screen/) does. Identify calls are sent to Extole as an `identify` event. Extole will create a new profile or update an existing one. Find below a list of basic traits mapping:

| Segment Traits | Extole Properties |
| -------------- | ----------------- |
| `userId`       | `partner_user_id` |
| `email`        | `email`           |
| `firstName`    | `first_name`      |
| `lastName`     | `last_name`       |

**Note:** All non-standard traits will be added to Extole user profile as PUBLIC parameters.

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

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Track calls are sent to Extole as a `track` event.

### Track Registrations

Track when somebody creates a new account. See below an example for track event with `registration` event name. 

```js
analytics.track('registration', {
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    partner_user_id: 'userId123'
})
```
Extole recommends sending `partner_user_id` every time. In case that this event is fired multiple times for the same person Extole de-duplicates it.




### Track Conversions

Track when somebody performs a purchase. 

```js
analytics.track('conversion', {
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    partner_conversion_id: 'purchaseId123',
    cart_value: '99.99'
})
```

Extole recommends sending `partner_conversion_id` every time. In case that this event is fired multiple times for the same person Extole de-duplicates it.


## Event Names

In case that event names does not match to above one just contact [Support](mailto:support@extole.com) and Extole can re-map Registration and Conversion events to any other event names.


## Delete

In order to make consumer data deletion requests more seemless, Extole handles deletion requests. 

Example of expected `delete` request body:
```json=
{
    "userId": "056tf9eqw24"
}
```

Upon deletion request Extole will remove all data associated with that user. 
