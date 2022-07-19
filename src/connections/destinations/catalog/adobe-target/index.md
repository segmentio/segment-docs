---
title: Adobe Target Destination
strat: adobe
rewrite: true
beta: true
hidden: true
published: false
---
[Adobe Target](https://www.adobe.com/marketing-cloud/target.html) removes the
coding and set up hassles of A/B testing to help you quickly discover which
offers, experiences and messages truly engage your visitors.

_**NOTE:** Adobe Target is currently in beta. This means that there may still be some bugs for us to
iron out, and we're excited to hear your thoughts. If you are interested in
joining or have any feedback to help us improve the Adobe Target
Destination and its documentation, [let us know](https://segment.com/help/contact)!_

## Getting Started

{% include content/connection-modes.md %}

1. Download the `at.js` file from Adobe and include it in the `head` of your
   website above the Segment snippet. Because Adobe Target is an A/B testing
   tool, their JavaScript must be loaded as soon as possible.
2. Search for "Adobe Target" in the Catalog, select it, and choose which of your sources to connect the destination to. Note
   that no integration settings are listed in this tab because you must manage
   integration options using Adobe's UI or their `targetGlobalSettings` object.
5. Start sending data!

## Track

When a user clicks on an Adobe Target experiment, you can fire a `track` event
to collect relevant information. All track events *must* include an `mboxName`
as an integration-specific option for the event to be forwarded to Adobe:

```javascript
analytics.track('Clicked Experiment', {
  color: 'red',
}, {
  integrations: {
    'Adobe Target': {
      mboxName: 'productExperiment'
    }
  }
});
```

We map track events to Adobe's `trackEvent` method. The event mapping for the
above event would look like this:

```javascript
window.adobe.target.trackEvent({
  mbox: 'productExperiment',
  params: {
    color: 'red'
  }
});
```

We handle special mapping for "Order Completed" events, so an event sent to
Segment like this:

```javascript
analytics.track('Order Completed', {
  orderId: 'abc-123',
  revenue: 100,
  products: [
    {
      productId: '123'
    },
    {
      productId: '99555'
    }
  ]
}, {
  integrations: {
    'Adobe Target': {
      mboxName: 'orderCompleted'
    }
  }
});
```

Would be mapped like this to Adobe:

```javascript
window.adobe.target.trackEvent({
  mbox: 'orderCompleted',
  params: {
    orderId: 'abc-123',
    orderTotal: 100,
    productPurchaseId: '123,99555' // comma-delimited string of productIds
  }
});
```

Note that Adobe does not specify that revenue events use a specific mbox name.
You can use any name you like.

### Experiment Viewed Events

Because Adobe doesn't programmatically provide experiment information on the
page, Segment doesn't automatically fire "Experiment Viewed" events like we do
for other A/B testing destinations. Instead, you can hook into either Adobe's
`adobe.target.event.REQUEST_SUCCEEDED` or
`adobe.target.event.CONTENT_RENDERING_SUCCEEDED` event and fire an `Experiment
Viewed` event with the experiment values you choose:

```javascript
document.addEventListener(adobe.target.event.REQUEST_SUCCEEDED, function() {
  analytics.track('Experiment Viewed', {
    "experiment_id": "<user-defined value>",
    "experiment_name": "<user-defined value>",
    "variation_id" : "<user-defined value>",
    "variation_name": "<user-defined value>"
  });
});
```

## Troubleshooting

### Preventing Page Flicker

Page flicker may occur when default content momentarily displays to a visitor
prior to the A/B "activity" content replacing it. One approach to preventing
page flicker in conjunction with Segment would be to create a global mbox. Adobe
will automatically set the HTML body style opacity to 0, which keeps the page
content hidden while allowing the browser to still execute page load. After a
response from Target is received, `at.js` resets the HTML body opacity to 1. You
can read more about preventing page flicker in Adobe's [documentation here](https://marketing.adobe.com/resources/help/en_US/target/ov2/c_target-atjs-faq.html).

### Console Errors

#### Error: Adobe Target content delivery is disabled

Settings for Adobe Target can be specified in their dashboard, or in a
`window.targetGlobalSettings` object on your website. Note this object must be
defined and populated *before* `at.js`.

If you're seeing the console error "AT: Adobe Target content delivery is
disabled. Ensure that you can save cookies to your current domain, there is no
'mboxDisable' cookie and there is no 'mboxDisable' parameter in the query
string," make sure that you've either specified the proper `cookieDomain` in
your Adobe Target UI, or that you include a `window.targetGlobalSettings` object
with the `cookieDomain` specified *before* you include `at.js`:

```javascript
window.targetGlobalSettings = {
  cookieDomain: 'mydomain.github.io'
}
```

#### Error: Adobe Target actions with missing selectors

These errors are not typically related to `at.js` functionality, but are fairly
common, most frequently resulting from defining actions with no corresponding
HTML elements on your page. You can read more about these errors in Adobe's
[documentation here](https://marketing.adobe.com/resources/help/en_US/target/ov2/c_target-atjs-faq.html).
