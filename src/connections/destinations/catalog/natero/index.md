---
title: 'Natero Destination'
hidden: false
id: 54bee265db31d978f14a7e21
---
[Natero, also known as Freshdesk Customer Success](https://urldefense.com/v3/__https://freshsuccess.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners__;!!NCc8flgU!JByOjJz8hK4AJQxY6Rqzqe0ZcUCB3UJBtbn1bQrxTh6SxjM-uHPST7abmfD3cRc$){:target="_blank"} helps customer success managers better understand their customers by integrating all of your customer data in one place and leveraging it to help with prioritization and context.  By reaching out to customers in the right way at the right time, CSMs can reduce churn, increase upsell and create advocates for your business.  For more details on how the segment integration for Natero works, visit the [Natero developer site](https://urldefense.com/v3/__https://developer.freshsuccess.com/api/segmentapi.html__;!!NCc8flgU!JByOjJz8hK4AJQxY6Rqzqe0ZcUCB3UJBtbn1bQrxTh6SxjM-uHPST7abnKQ8GJ4$){:target="_blank"}.

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Natero" in the Destinations Catalog, and select the "Natero" destination.
3. Choose which Source should send data to the "Natero" destination.
4. Within Natero, navigate to IT Administration from the cogwheel in the left navigation bar.
5. Go to the tab labeled "Source Overview" and retrieve the "Event API / Send key" and the "Event auth key".
6. Enter those keys in the "Natero" destination settings in Segment.


## Supported methods

Natero supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Group

Send [Group](/docs/connections/spec/group) calls to provide updated metadata about the account that a user is associated with. For example:

```js
analytics.group('accountId123', {
  name: 'Example Inc.',
  description: 'Description of Example Inc.'
});
```

Segment sends Group calls to Natero as a `group` event.


### Identify

Send [Identify](/docs/connections/spec/identify) calls to update detail about a user. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Natero as an `identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to capture user actions within your application as features within Natero. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Natero as a `track` events.

