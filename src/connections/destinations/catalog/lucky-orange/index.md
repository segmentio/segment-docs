---
title: Lucky Orange Destination
rewrite: true
id: 54521fd925e721e32a72eed1
---

> warning ""
> The Lucky Orange Destination supports [Lucky Orange Classic](https://classic.luckyorange.com/){:target="_blank"} only. Support for the new [Lucky Orange](https://www.luckyorange.com/){:target="_blank"} is not available at this time.


[Lucky Orange](https://www.luckyorange.com/) lets you quickly see who is on your site and interact with them in many ways. With Lucky Orange, you can chat with visitors on your site, actually watch their mouse move around the screen and click in real time, play them back as recording, generate beautiful heat maps of clicks, mouse movements (eye tracking), and scroll depth, create quick insightful polls, and more. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-lucky-orange).

## Getting Started


1. From the Segment web app, click **Catalog**.
2. Search for "Lucky Orange" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Site ID from the Lucky Orange.
4. Segment automatically initializes Lucky Orange's library upon loading analytics.js.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@example.com",
});
```

Calling `identify` will create and update visitors in Lucky Orange. All traits to Lucky Orange and each trait will create a new column in the visitor view. If `name` and `email` are set in an `identify` call, Lucky Orange will also try to find an  Gravatar associated with the user.
