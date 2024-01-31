---
title: Route Destination
---

[Our Route destination code](https://github.com/segment-integrations/analytics.js-integration-route){:target="_blank"} is all open-source on GitHub if you want to check it out.

## Getting Started

Once the Segment library is integrated with your server, toggle Route `on` in your Segment destinations setting the `organizationId`.

Route supports the `identify` and `track` methods.

---

## Identify

When you `identify` a contact, we'll pass that contact's information to Route with `email` as Route's Contact ID. The traits recognized as Route's contact profile fields are:

- `email` (**required** as Segment's `userId`)
- `name`
- `phone` in the International format like `'+1 23 456-7890-1234'`
- `company`

## Track

When you `track` an event, we will send that event to Route using the following data:

- `eventName` [`string`]
