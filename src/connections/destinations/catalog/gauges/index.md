---
title: Gauges Destination
---

## Getting Started

{% include content/connection-modes.md %}

When you toggle on Gauges in Segment, our snippet will start asynchronously loading Gauges' track.js onto your page. This means you should remove Gauges' snippet from your page.

Gauges will start automatically collecting data on your site.

- - -


## Page

When you call [`page`](/docs/spec/page/), we call Gauges' `track` method with no arguments.

- - -


## Troubleshooting


### My visits aren't showing up in Gauges

Gauges doesn't record data from any browser where you've signed into Gauges. That way your data doesn't get polluted by your own actions. If you want your browsing to show up in Gauges - open an incognito/private window in your browser.
