---
title: Goedle.io Destination
rewrite: true
---

[goedle.io](https://goedle.io/) uses powerful AI and Machine Learning algorithms to predict user behavior. The more data you provide, the better its recommendations will be. This destination is maintained by Goedle. For any issues with the destination, please [reach out to their team](mailto:support@goedle.io).

This document was last updated on May 16, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!


## Getting Started

{% include content/connection-modes.md %}

1.  From your Segment UI's Destinations page click on "Add Destination".
2.  Search for "Goedle" within the Destinations Catalog and confirm the Source you'd like to connect to.
3.  In your Segment Settings UI, enter your goedle.io app key which you received upon [sign up](https://go.goedle.io/signup "Sign up at goedle.io").
4.  After activating, goedle.io will start automatically collecting data from your website, mobile app, or game. However, it will take up to 24 hours for goedle.io to process this data and predict future user behavior - you will receive an email from goedle.io when your data is available.


## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page();
```

goedle.io will track a pageview and log the `path` [property](https://segment.com/docs/connections/spec/page/#properties "Spec: Page - Properties") to distinguish different user behaviors.

## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.screen();
```

goedle.io will track a screenview on your mobile app and log the `name` [property](https://segment.com/docs/connections/spec/page/#properties "Spec: Page - Properties") to distinguish different user behaviors.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('ze8rt1u89', {
  firstName: 'Zaphod',
  lastName: 'Beeblebrox',
  email: 'Zaphod@hotmail.com'
});
```

goedle.io will set the `userId`, as well as specific user traits that are provided with the call.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Reached Level', {
  properties: {
    event_id: '60',
    event_value: '66.2'
  }
})
```

goedle.io will log the corresponding event using the `event` along with any additional properties passed in.


### Ecommerce

goedle.io supports some Ecommerce events as part of the Segment [V1](https://segment.com/docs/connections/spec/ecommerce/ "Spec: V1 Ecommerce") and [V2](https://segment.com/docs/connections/spec/ecommerce/v2/ "Spec: V2 Ecommerce") Ecommerce specs and they will be automatically merged if required. An example Ecommerce call would look like:
```
analytics.track('Product List Viewed', {
  properties: {
    product_id: 'A20',
    price: 66.2,
    quantity: 2
  }
})
```

The supported events are as follows:

* [Product List Viewed](https://segment.com/docs/connections/spec/ecommerce/v2/#product-list-viewed "Spec: V2 Ecommerce - Product List Viewed")
* [Product Added](https://segment.com/docs/connections/spec/ecommerce/v2/#product-added "Spec: V2 Ecommerce - Product Added")
* [Product Removed](https://segment.com/docs/connections/spec/ecommerce/v2/#product-removed "Spec: V2 Ecommerce - Product Removed")
* [Product Viewed](https://segment.com/docs/connections/spec/ecommerce/v2/#product-viewed "Spec: V2 Ecommerce - Product Viewed")
* [Order Completed](https://segment.com/docs/connections/spec/ecommerce/v2/#order-completed "Spec: V2 Ecommerce - Order Completed")

The following properties are supported as part of the above events:
* `product_id`
* `price`
* `quantity`
* `currency`

### A/B Testing
goedle.io supports the Segment [A/B Testing](https://segment.com/docs/connections/spec/ab-testing/ "Spec: A/B Testing") specs and builds an internal hierarchy used to enhance the prediction of the user behavior during an experiment.

These experiments can be sent as follows with a required `experiment_id` and an optional `variation_id`. If `experiment_id` is not included, [Experiment Viewed](https://segment.com/docs/connections/spec/ab-testing/#experiment-viewed "Spec: A/B Testing - Experiment Viewed") will be treated as a regular event.

```
analytics.track('Experiment Viewed', {
  experimentId: '7561662364',
  variationId: '7549901603'
});
```


## Group

When you trigger a [group](https://segment.com/docs/connections/spec/group/ "Spec: Group") event, we will log the [group_id](https://segment.com/docs/connections/spec/group/#group-id "Spec: Group - Group ID") for an individual user.
