---
title: Lucky Orange Destination
rewrite: true
---

[Lucky Orange](https://www.luckyorange.com/) lets you quickly see who is on your site and interact with them in many ways. With Lucky Orange, you can chat with visitors on your site, actually watch their mouse move around the screen and click in real time, play them back as recording, generate beautiful heat maps of clicks, mouse movements (eye tracking), and scroll depth, create quick insightful polls, and more. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-lucky-orange).

This document was last updated on October 16, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{{>connection-modes}}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Lucky Orange" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in your Site ID from the Lucky Orange.
4. We'll automatically initialize Lucky Orange's library upon loading analytics.js.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@initech.com",
});
```

Calling `identify` will create and update visitors in Lucky Orange. All traits to Lucky Orange and each trait will create a new column in the visitor view. If `name` and `email` are set in an `identify` call, Lucky Orange will also try to find an  Gravatar associated with the user.
