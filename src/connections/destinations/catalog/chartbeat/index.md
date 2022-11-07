---
title: Chartbeat Destination
id: 54521fd525e721e32a72ee9d
---
Our Chartbeat destination code is open-source on GitHub if you want to [check it out](https://github.com/segment-integrations/analytics.js-integration-chartbeat).

## Getting Started

When you enable Chartbeat in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading `chartbeat.js` onto your page. This means you should remove Chartbeat's snippet from your page.
+ Your Chartbeat real-time dashboard will start showing live concurrent visitors.

Chartbeat is only supported on the client-side.

- - -


## Page

The [`page`](/docs/connections/spec/page/) method in Analytics.js will call Chartbeat's `virtualPage` function with either the Url you provide or the current window's pathname. Use the [`page`](/docs/connections/spec/page/) method if you have a one-page app that doesn't reload the browser page between views.

You can also set a section and author for each page. For example, `analytics.page('putSectionHere', 'putNameOfPageHere', { author: 'putAuthorNameHere' }`.
