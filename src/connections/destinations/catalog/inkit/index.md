---
title: Inkit Destination
rewrite: true
id: 5f0746ced1c79b49ddee49fd
---
[Inkit](https://inkit.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) connects to hundreds of printers with complete visibility. Instantly use global print infrastructure with Inkit's developer friendly APIs, dashboards, and reporting. Connect, track, and manage critical business communications faster than ever before.

The Inkit Destination is in beta, which indicates ongoing development. To join the Inkit beta program, or if you have any feedback to help improve the Inkit Destination and its documentation, [contact the Inkit support team](mailto:support@inkit.com).

> note ""
> Inkit maintains this destination. For any issues with the destination, [contact the Inkit support team](mailto:support@inkit.com).


## Getting Started

Add the destination:

1. From the Destinations catalog page in your Segment workspace, click **Add Destination**.
2. Search for "INKIT" in the Destinations Catalog, and select the "INKIT" destination.
3. Choose which Source should send data to the "INKIT" destination.

Get the Inkit API Key:

1. Go to the [INKIT Integrations](https://app.inkit.io/#/account/integrations), find and copy the "API key".
2. Enter the "API Key" in the "INKIT" destination settings in Segment.

To use a Template ID:

1. From the Destinations catalog page in your Segment workspace, click **Add Destination**.
2. Search for "INKIT" in the Destinations Catalog, and select the "INKIT" destination.
3. Choose which Source should send data to the "INKIT" destination.
4. Go to the [INKIT Templates](https://app.inkit.io/#/templates), find the desired template.
5. Click the three dots on the far right side and select "Copy Id".
6. Paste the id into the "template_id" field when setting up the destination.

For more information, see INKIT [documentation](https://docs.inkit.com/docs/inkit-postcards-api).

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
    first_name: "Elon", (required)
    last_name: "Musk", (optional)
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
    email:"elon@spacex.com",
    company:"SpaceX",
    phone:"3107099497",
    subscription: "premium",
    custom_field_example: "content"
});
```

All other fields are then added to the user's profile as custom fields within Inkit's dashboard.

Segment sends Identify calls to INKIT as an `identify` event.
