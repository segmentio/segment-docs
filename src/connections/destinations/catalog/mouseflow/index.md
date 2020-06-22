---
rewrite: true
title: Mouseflow Destination
---

[Mouseflow](https://mouseflow.com/) is a session replay and heatmap tool that shows how visitors click, move, scroll, browse, and pay attention on websites. It helps clients simplify their analytics to make decisions that matter. The `analytics.js` Mouseflow Destination is open-source. You can browse the code [on GitHub](hhttps://github.com/segment-integrations/analytics.js-integration-mouseflow).

This document was last updated on April 28, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Mouseflow" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in your Site ID within the Segment Settings UI. You can find this in [your Mouseflow UI](http://help.mouseflow.com/knowledge_base/topics/how-do-i-find-my-mouseflow-site-id).
4. In about 45 minutes the CDN will be updated and Mouseflow snippet will be initialized onto your page.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:
```
analytics.page()
```
An initial `page` call is required for data to be sent to Mouseflow using Analytics.js and sends a page view. This is included by default in your [Segment snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-1-copy-the-snippet).

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:
```
analytics.identify('user1234', {
  email: 'petergibbon@email.com',
  firstname: 'Peter',
  lastname: 'Gibbon'
})
```
When you call Identify, the `traits` you set will be sent as custom variables to Mouseflow.
