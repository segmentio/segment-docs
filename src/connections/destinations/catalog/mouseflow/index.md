---
rewrite: true
title: Mouseflow Destination
id: 54521fd925e721e32a72eeda
---
[Mouseflow](https://mouseflow.com/) is a session replay and heatmap tool that shows how visitors click, move, scroll, browse, and pay attention on websites. It helps clients simplify their analytics to make decisions that matter. The `analytics.js` Mouseflow Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-mouseflow).

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Mouseflow" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Site ID within the Segment Settings UI. You can find this in [your Mouseflow UI](http://help.mouseflow.com/knowledge_base/topics/how-do-i-find-my-mouseflow-site-id).

Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading the Mouseflow snippet on your page and sending data.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:
```
analytics.page()
```
An initial `page` call is required for data to be sent to Mouseflow using Analytics.js and sends a page view. This is included by default in your [Segment snippet](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet).

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:
```
analytics.identify('user1234', {
  email: 'petergibbon@email.com',
  firstname: 'Peter',
  lastname: 'Gibbon'
})
```
When you call Identify, the `traits` you set will be sent as custom variables to Mouseflow.
