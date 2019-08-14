In Segment, you create a source (or more than one!) for each website or app you want to track. While it's not required that you have a single Source for each server, site or app, we **highly recommend** creating a Source for each unique source of data.

Sources belong to a workspace, and the URL for a source look something like this:
`https://segment.com/<my-workspace>/sources/<my-source-name>/`

You can create new sources using the button in the workspace view. Each source you create has a write key, which is used to send data to that source. For example, to load [`analytics.js`, the Segment JavaScript library](https://segment.com/docs/sources/website/analytics.js/) on your page, the snippet on the [Quickstart Guide](https://segment.com/docs/sources/website/analytics.js/quickstart/) includes:

```js
analytics.load("YOUR_WRITE_KEY");
```
