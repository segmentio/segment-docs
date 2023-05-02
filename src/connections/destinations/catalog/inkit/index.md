---
title: Inkit Destination
rewrite: true
id: 5f0746ced1c79b49ddee49fd
---
[Inkit](https://inkit.com){:target="_blank"} empowers organizations to securely generate and distribute documents - both digitally as well as through direct mail. 
For example, automatically create and send electronic documents like invoices, reports, notices, and more using a magic link or e-delivery. Or generate and send documents for e-signature, storage, postcards, letters, and more, all powered by the Inkit integration for Segment.

> note ""
> Inkit maintains this destination. For any issues with the destination, [email the Inkit support team](mailto:support@inkit.com).

## Getting Started

Add the destination:

1. From the Destinations catalog page in your Segment workspace, click **Add Destination**.
2. Search for "Inkit" in the Destinations Catalog, and select the "Inkit" destination.
3. Choose which Source should send data to the "Inkit" destination.

Get the Inkit API Key:

1. [Sign up](https://app.inkit.com/auth-init){:target="_blank"} and create an Inkit account.
2. Follow [the instructions to create an API key](https://docs.inkit.com/docs/add-an-api-key-to-your-account){:target="_blank"}.
3.	Enter the “API Key” in the “Inkit” destination settings in Segment.


To use a Template ID:

1.	From the Destinations catalog page in your Segment workspace, click Add Destination.
2.	Search for “Inkit” in the Destinations Catalog, and select the “Inkit” destination.
3.	Choose which Source should send data to the “Inkit” destination.
4.	[Create a template](https://docs.inkit.com/docs/create-a-template) in Word, PDF, HTML, Excel, or PowerPoint.
5.	Copy the Template ID to the “Templates” tab in the Inkit web app.
6.	Paste the id into the “template_id” field when setting up the Destination in Segment.


For more information, see the Inkit [documentation](https://docs.inkit.com/docs/welcome-to-inkit){:target="_blank"}.

## Expected Data

| Field | Type | Description |
| -------- | -------- | -------- |
| template_id     | string     | ID of the template from the Inkit UI (required)     |
| first_name     | string     | The first name of the contact (optional but either first_name or last_name is required)     |
| last_name     | string     | The last name of the contact (optional but either first_name or last_name is required)     |
| email     | string     | The email address of the contact (optional)     |
| company     | string     | The company name that the contact belongs to (optional)     |
| phone     | string     | The phone number of the contact (optional)     |
| address_line_1     | string     | The primary line, or street address of the contact (64-character limit) (required)     |
| address_line_2     | string     | The apartment or suite number (optional)     |
| address_city     | string     | The city of the contact's address (required) |
| address_state     | string     | The two-letter (2) state code of the contact's address (required) |
| address_zip     | string     | The ZIP Code of the contact's address (required)
| address_country     | string | The two-letter (2) ISO alpha-2 country code of the contact's address (required) |


## Identify

If you aren't familiar with the Segment Spec, see the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call with Inkit would look like:


> note""
> All address elements should be satisified within the segment's user identity
(exception of address_line_2 which is a custom entry)
Expected Requirements

```js
analytics.identify('userId123', {
    template_id:"<template_id>", (required)
    first_name: "Nick", (required)
    last_name: "Fury", (optional)
    address_line_1: "1 Rocket Road", (required)
    address_line_2: "Suite 1", (optional)
    address_city: "Hawthorne", (required)
    address_state: "CA", (required)
    address_zip: "90250", (required)
    address_country: "US", (required)
});
```
Call Including Address Line 2 (apt number)

```js
analytics.identify('userId123', {
    template_id:"<template_id>",
    address_line_2: "Suite 1"
});
```

Bare Minimum Call

```js
analytics.identify('userId123', {
    template_id:"<template_id>"
});
```

Custom Fields Call

```js
analytics.identify('userId123', {
    template_id:"<template_id>",
    email:"n.fury@shield.com",
    company:"SHIELD",
    phone:"3107099497",
    subscription: "premium",
    custom_field_example: "content"
});
```

All other fields are then added to the user's profile as custom fields within Inkit's dashboard.

Segment sends Identify calls to Inkit as an `identify` event.