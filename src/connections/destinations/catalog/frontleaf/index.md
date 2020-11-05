---
title: Frontleaf Destination
beta: true
---

### Browser Tracking
If you're using our client-side javascript library ([Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/)), we will begin loading Frontleaf on your page through your Segment snippet within minutes after you enable it on your project destinations page.

Frontleaf uses our `page`, `identify`, `track`, and `group` methods.


## Page

For Frontleaf to work effectively with Segment page calls, you will need to specify the _type of interaction_ that each call represents.

Frontleaf supports three options for categorizing page calls by interaction type:

* The optional `category` property. For more information on this property, see the [Ecommerce spec docs](/docs/connections/spec/ecommerce/v2/). In the following example, "Product" is the category and "Shoe" is the page name. Segment will transform this category to "Viewed Product Page" before sending it to Frontleaf.

```js
analytics.page('Product', 'Shoe');
```

* The optional `name` property. To get the maximium value out of using the name property, Frontleaf recommends that the name value maps to a type of interaction rather than a specific page, e.g. "Lesson" rather than "Lesson on Operating the Acme XT-1000". Segment will transform the name you pass in the same way it does for `category` above - "Lesson" will become "Viewed Lesson Page" before it gets sent on to Frontleaf. For more information on this property, see our [name docs](/docs/connections/spec/page/#name).

```js
analytics.page('Lesson');
```

* A custom URL filter (configured for you by Frontleaf) that interprets part of the page path (and/or query parameters) as the interaction type. This option can work well for "object-verb" types of URL schemes, e.g. `/lesson/123/view` and `/lesson/456/view` both get labeled as a `/lesson/view` action (which you can then relabel in the UI). [Contact Frontleaf support](https://www.frontleaf.com/contact/) for assistance with this option.
