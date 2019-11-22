---
title: Errorception Destination
---

## Getting Started

When you enable Errorception in Segment, this is what happens:

- The Segment CDN updates within 45 minutes. The Segment snippet starts asynchronously loading Errorception's `beacon.js` library on to your page. This means you should remove the original Errorception's snippet from your page.
- Your Errorception dashboard starts showing any javascript errors that occur on your site.

Errorception is only supported on the client-side.

## Identify

This is only active if you set the `meta` setting to be true. When you call [`identify`](/docs/connections/spec/identify/) we set Errorception's `_errs.meta` to be the `traits` you passed in.
