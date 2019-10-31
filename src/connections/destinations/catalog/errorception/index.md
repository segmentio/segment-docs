---
title: Errorception
---

## Getting Started

When you toggle on Errorception in Segment, this is what happens:

+ Our CDN is updated within 5-10 minutes. Then our snippet will start asynchronously loading Errorception's beacon.js onto your page. This means you should remove Errorception's snippet from your page.
+ Your Errorception dashboard will start showing any javascript errors that are occurring on your site.

Errorception is only supported on the client-side.


## Identify

This is only active if you set the `meta` setting to be true. When you call [`identify`](/docs/spec/identify/) we set Errorception's `_errs.meta` to be the `traits` you passed in.

{% include content/integration-foot.md %}
