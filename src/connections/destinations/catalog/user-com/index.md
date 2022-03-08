---
title: 'User.com Destination'
beta: true
redirect_from: '/connections/destinations/catalog/userengage/'
id: 59c93d8a3c0414000129bcb5
---
This integration is maintained by contact@userengage.com.

## Getting Started

To enable sending data to User.com you need to provide API key. You can generate and revoke keys for your app by going to **App settings > Advanced > Segment API keys** at [app.user.com](https://user.com/en/).

Note that **all available** methods will try to select user base on `userId`, falling back to `anonymousId` if `userId` is not provided. If user with given identifier does not exist in your app it will be **created automatically**. That means you do not have to worry about request that return `404` for unknown user.

## Identify
Calling `.identify()` causes User.com to automatically map the call's traits and context data to appropriate fields in the user profile.

Traits that are mapped are:
 - `email`
 - `first_name`
 - `last_name`
 - `phone`
 - `gender`
 - `address` is mapped to `country`, `region` and `city` fields if possible.
 - If possible following data is extracted from context and mapped to user profile's fields: `user_agent`, `os`, `device_name`, `device_type`, `language`, `resolution`, `ip_address`, `browser_family`, `browser_version`, `timezone`, `current_url`.

Other custom fields present in `traits` are added as custom attributes. **NOTE**: if a given trait has no respective custom attribute already defined in in User.com, it will be created with the type `string`! However, if a custom attribute already exists, we'll try to convert given data to defined type, ignoring values that cannot be converted, e.g.:

Let's assume you have created custom attribute `custom_integer` with type `number` and send following data:

```js
analytics.identify({
  custom_integer: '123',
  custom_integer_new: 999
})
```

Such request results in:

* `custom_integer` attribute will be set to `123` in user's profile because `custom_integer` is already defined in User.com with type `number`
* `custom_integer_new` attribute will be created and set to `'999'` in user profile, because it did not exists before we use default `string` type for attribute

To define custom attributes for application, visit **App settings > User data & events > Client attributes** at [app.user.com](https://user.com/en/).

## Page
Sending a `.page()` request increments `page_views` counter and updates `last_seen` timestamp if it is newer than the existing timestamp on a user's profile. It also records a new 'Page view' that can be used for filtering and aggregation.

## Track
Sending a `.track()` request records a new 'Event occurrence' that can be used to filter and bucket users. **NOTE**: if an event with a given name is not defined in User.com, it will be created automatically, as will its properties. This mechanism works exactly the same as custom traits that have been explained in `Identify` section. To make sure type of data recorded in database reflects your expectations, visit **App settings > User data & events > Events** or **App settings > User data & events > Event attributes** at [app.user.com](https://user.com/en/).

## Group
Sending a `.group()` request allows to create or update a company profile and associate a user with it. We will use the `groupId`. If a company is not found, we will automatically create new company instance and set its `groupId` to that that identifier.

The user that owns the `userId` on this event will be associated with this company.

Any custom traits of the `.group()` call will follow same logic as `Identify` method. Semantic traits that are mapped are: `address`, `description`, `email`, `employees`, `name`, `phone`. **NOTE**: to make sure types of custom traits defined in database reflect your expectations, visit **App settings > Companies > Company attributes** at [app.user.com](https://user.com/en/).

## Troubleshooting

### `403 Forbidden` HTTP code
Verify that API key your using in Segment is not revoked by going to **App settings > Advanced > Segment API keys** at [app.user.com](https://user.com/en/).

If problem still persist verify that domain the request from is trusted. You can edit domains you trust by going to **App settings > Advanced > Domains** at [app.user.com](https://user.com/en/).
