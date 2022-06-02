---
title: Crossing Minds Destination
id: 602c595c1cdf37acb79bb5d5
---

[Crossing Minds](https://crossingminds.com/){:target="blank"} is a recommendation platform for businesses using next-gen AI that instantly anticipates customers' wants and needs using only anonymized user data.

Crossing Minds maintains this destination. For any issues with the destination, [contact the Crossing Minds Support team](mailto:support@crossingminds.com).

{% include content/beta-note.md %}


## Getting Started

1. Contact your Crossing Minds Account Manager and request your integration API Key, API Password, and Database ID.
2. From the Destinations catalog page in the Segment App, click **Add Destination**.
3. In the Destinations Catalog, search for "Crossing Minds" and select the "Crossing Minds" destination.
4. Choose which source should send data to the Crossing Minds destination.
5. In the Crossing Minds destination settings in Segment, enter the Service Account Name as the **API Key**, Service Account Password as the **API Password**, and the **Database ID**.


## Supported methods

Crossing Minds supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).


### Identify

Send [Identify](/docs/connections/spec/identify) calls to create or update a **Crossing Minds User** for any identified user on your site.

For example:
```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Crossing Minds as an `identify` event.


### Track

Send [Track](/docs/connections/spec/track) calls to record User Interactions as:

* All actions listed under [Browsing overview](/docs/connections/spec/ecommerce/v2/#browsing-overview)
* All actions listed under [Core Ordering Overview](/docs/connections/spec/ecommerce/v2/#core-ordering-overview)
* All actions listed under [Wishlisting overview](/docs/connections/spec/ecommerce/v2/#wishlisting-overview)
* All actions listed under [Sharing overview](/docs/connections/spec/ecommerce/v2/#sharing-overview)
* All actions listed under [Reviewing overview](/docs/connections/spec/ecommerce/v2/#reviewing-overview)


For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Crossing Minds as a `track` event.
Any events that are not listed in the mentioned categories will be rejected.
