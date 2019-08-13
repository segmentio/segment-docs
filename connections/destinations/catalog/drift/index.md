---
title: Drift
---
[Drift](http://www.drift.com/segment/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the world’s first and only conversational marketing platform. Instead of traditional marketing and sales platforms that rely on forms and follow ups, Drift connects your business with the best leads in real-time.

The `analytics.js` device mode destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-drift).

The cloud mode destination is maintained by Drift. For any issues with the destination, please [reach out to their team](https://www.drift.com/help/).

This document was last updated on January 25, 2019. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

**Use Cases**

* [Personalize Drift live chat messages based on a visitor’s matched industry](https://segment.com/recipes/personalize-drift-live-chat-industry/)
* [Deliver hyper-relevant Drift messages based on a visitor’s job role](https://segment.com/recipes/personalize-drift-live-chat-role/)
* [Use Drift messages and email to nudge users to the Aha moment](https://segment.com/recipes/drift-message-aha-moment/)
* [Personalize Drift welcome messages by including a visitor's company name](https://segment.com/recipes/personalize-drift-live-chat-with-company-name/)

## Getting Started

{% include content/connection-modes.md %}

  1. From your Segment UI’s Destinations page click on "Add Destination".
  2. Search for "Drift" within the Destinations Catalog and confirm the Source you’d like to connect to.
  3. Drop in your `API Key` and `Embed ID` as obtained from your Drift account (if Drift account not accessible yet, please [email the team](mailto:team@drift.com) to get a link for the Drift account creation).
  4. If you're using analytics.js and 'identify' users by default, Drift will work automatically. If you don’t have analytics.js setup, after enabling the Drift destination in Segment, you must 'identify' users in order for Drift to display in your product.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page();
```

When you send a `page` or `screen` event, we will send that event to Drift as a custom event with the name `Page - NAME` where name is the `name` field from Segment.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('ksc2303', {
  name: 'Tak',
  email: 'test@forestry.com'
});
```

When you `identify` a user, we'll transform it into a Drift identify call. Segment's special traits that are renamed as Drift attributes are (Drift attributes in parentheses):
* `createdAt` (`startDate`)
* `title` (`employmentTitle`)
* `description` (`bio`)

We will also flatten the `address` field. All other attributes are passed through as Drift Attributes.

If you do not pass a `userId`, we will try to fill it in with the `id` or `username` special traits.

Keep in mind, we _strongly_ suggest to ensure that the `email` field is passed in the `identify` call.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```javascript
analytics.track('Product Purchased', {
    product_name: 'sample2b',
    price: 99.95,
    currency: 'EUR'
});
```

When you `track` an event, we will send that event to Drift as a custom event.

## Group

If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/spec/group/) does. An example call would look like:

```javascript
analytics.group('companyId123', {
  name: 'Segment'
});
```

When you send a `group` event, we will send that event to Drift as two `identify` calls. One `identify` call where the `companyId` is set to the `groupId` and the traits are set to the attributes, and another to map the user to that company.
