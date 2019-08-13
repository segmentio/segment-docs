---
title: "What is a source?"
---

Sources in Segment are created for each website you want to track. While not required to have a single Source for each server, site or app, **Segment recommendeds creating a Source for each unique source of data**.

Sources belong to a workspace and the URL will look something like this:

`https://segment.com/<my-workspace>/sources/<my-source-name>/`

You can create new sources using the button in the workspace view. Each source you create will have a write key which is used to send data to that source. For example, to load [`analytics.js`, the Segment JavaScript library](https://segment.com/docs/sources/website/analytics.js/) on your page, the snippet on the [Quickstart Guide](https://segment.com/docs/sources/website/analytics.js/quickstart/) includes:

```js
analytics.load("YOUR_WRITE_KEY");
```
