---
title: Errorception Destination
id: 54521fd525e721e32a72eead
---
## Getting Started

When you enable Errorception in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Errorception's `beacon.js` library on to your page. This means you should remove the original Errorception's snippet from your page.
- Your Errorception dashboard starts showing any JavaScript errors that occur on your site.

Errorception is only supported on the client-side.

## Identify

This is only active if you set the `meta` setting to be true. When you call [`identify`](/docs/connections/spec/identify/) we set Errorception's `_errs.meta` to be the `traits` you passed in.
