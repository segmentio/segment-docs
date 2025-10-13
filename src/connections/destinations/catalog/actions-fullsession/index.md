---
title: FullSession (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[FullSession](https://fullsession.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides user behavior analytics software that helps you visualize all user interactions, analyze trends and patterns with laser precision, and optimize your website for peak performance. The Segment integration for FullSession helps accurately identify your customers and track their behavior within the FullSession dashboard.

This destination is maintained by FullSession. For any issues with the destination, [contact their Support team](mailto:support@fullsession.com).

## Getting started

1. From your workspace’s [Destination Catalog](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"}, search for **“FullSession.”**  
2. Select **FullSession**, then click **Add Destination**.  
3. Choose an existing **JavaScript Source** to connect with FullSession (Actions).  
4. Navigate to the [FullSession Setup](https://app.fullsession.io/settings/setup){:target="_blank"} page and copy your **Customer ID** (it begins with `cus_`).  
5. Paste the **Customer ID** into the **FullSession Destination settings** in Segment.  
6. Before enabling the destination, open the **Mappings** tab and configure the mappings to ensure the correct data is captured.  
7. Once your mappings are configured and enabled, go to the **Settings** tab and enable the Destination. Segment will then automatically load the **FullSession recording snippet** in the user’s browser.


## Identify User

If you're not familiar with the Segment Specs, take a look to understand what the [identify method](/docs/connections/spec/identify/) does. Identify calls sent to Segment will be transformed and sent to FullSession's identify method to help you track and segment users in your session recordings.

An example call which does not include a `userId` will send FullSession the value of the `anonymousId` and would look like:

```javascript
analytics.identify();
```

If an `identify` call does contain a `userId`, that will be the ID sent along to FullSession.

```javascript
analytics.identify("userId");
```

In addition, Segment will send over along any traits included in the `identify` call. The example call below would send over both `plan` and `logins`.

```javascript
analytics.identify("userId123", {
  plan: "premium",
  logins: 5
});
```

### Specifying user name and email

Both `email` and `name` are special traits that will be passed to FullSession to be used in their interface for better user identification. These traits are optional.

```javascript
analytics.identify("userId123", {
  email: "john.doe@example.com",
  name: "John Doe"
});
```

## Record Event

If you're not familiar with the Segment Specs, take a look to understand what the [track method](/docs/connections/spec/track/) does. Track calls sent to Segment will be automatically passed directly to FullSession using their event tracking method, including all the properties passed in the event.

An example call would look like:

```javascript
analytics.track('Product Purchased', {
  order_ID: '2969302398',
  category: 'boots',
  product_name: 'yellow_cowboy_boots',
  price: 99.95,
  currency: 'EUR'
});
```

This allows you to correlate specific user actions with session recordings, making it easier to analyze user behavior patterns and identify conversion bottlenecks.

## Visit Page

If you're not familiar with the Segment Specs, take a look to understand what the [page method](/docs/connections/spec/page/) does. Page calls sent to Segment will be automatically passed to FullSession to set page-specific attributes and properties.

An example call would look like:

```javascript
analytics.page('Product Page', {
  category: 'Electronics',
  name: 'iPhone 15',
  price: 999
});
```

This helps you understand how users navigate through your site and which pages are most important in their journey.

{% include components/actions-fields.html %}