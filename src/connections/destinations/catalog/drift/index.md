---
title: Drift Destination
rewrite: true
---
[Drift](http://www.drift.com/segment/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the world's first and only conversational marketing platform. Instead of traditional marketing and sales platforms that rely on forms and follow ups, Drift connects your business with the best leads in real-time.

The `analytics.js` device-mode destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-drift).

The cloud-mode destination is maintained by Drift. For any issues with the destination, [contact the Drift support team](https://www.drift.com/help/).


## Getting Started

{% include content/connection-modes.md %}

  1. From the Segment web app, click **Catalog**.
  2. Search for "Drift" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. In the destination settings, enter your `API Key` and `Embed ID` as obtained from your Drift account (if Drift account not accessible yet, [email the team](mailto:team@drift.com) to get a link for the Drift account creation).
  4. If you're using analytics.js and 'identify' users by default, Drift will work automatically. If you don't have analytics.js setup, after enabling the Drift destination in Segment, you must 'identify' users in order for Drift to display in your product.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page();
```

When you send a `page` or `screen` event, we will send that event to Drift as a custom event with the name `Page - NAME` where name is the `name` field from Segment.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

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

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track('Product Purchased', {
    product_name: 'sample2b',
    price: 99.95,
    currency: 'EUR'
});
```

When you `track` an event, we will send that event to Drift as a custom event.

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

```javascript
analytics.group('companyId123', {
  name: 'Segment'
});
```

When you send a `group` event, we will send that event to Drift as two `identify` calls. One `identify` call where the `companyId` is set to the `groupId` and the traits are set to the attributes, and another to map the user to that company.
