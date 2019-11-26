In Segment, you create a source (or more than one!) for each website or app you want to track. We **highly recommend** creating a Source for each unique source of data (each site, app, or server), though this isn't required.

Sources belong to a workspace, and the URL for a source looks something like this:
`https://segment.com/<my-workspace>/sources/<my-source-name>/`

You can create new sources using the button in the workspace view. Each source you create has a write key, which is used to send data to that source. For example, to load [`analytics.js`, the Segment JavaScript library](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/) on your page, the snippet on the [Quickstart Guide](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) includes:

```js
analytics.load("YOUR_WRITE_KEY");
```
