---
title: Gauges Destination
id: 54521fd625e721e32a72eeb7
---
## Getting Started

When you enable Gauges in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Gauges' `track.js` onto your page.

This means you should remove Gauges' snippet from your page.

Gauges starts automatically collecting data on your site.

- - -


## Page

When you call [`page`](/docs/connections/spec/page/), we call Gauges' `track` method with no arguments.

- - -


## Troubleshooting


### My visits aren't showing up in Gauges

Gauges doesn't record data from any browser where you've signed into Gauges. That way your data doesn't get polluted by your own actions. If you want your browsing to show up in Gauges - open an incognito/private window in your browser.
