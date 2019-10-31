---
title: "Chrome Extension [Deprecated]"
hidden: true
---

You can easily load our browserify'd `analytics-node` package into a Chrome Extension and send your analytics data to [any of our server-side destinations](/integrations).

This allows you to collect information about your users, like how they interact with and use your extension.

{% include content/deprecated.md %}

## Getting Started

1) Add this [file](https://github.com/segmentio/analytics-node/blob/master/analytics-node.js) to your Chrome extension source.

2) Setup the library with your write key:

`var analytics = new Analytics('YOUR_WRITE_KEY');`

That's it, you're done! You can now start identifying users and record their actions as they use your extension!

Now just turn on any of our destinations in Segment on your destinations page and we'll start sending your data to them for you!

## Methods

Here are a few examples of methods you might want to fire in your extension:

```javascript
analytics.identify({
  version: chrome.app.getDetails().version,
  languages: window.navigator.languages
});
```

```javascript
analytics.track('Clicked Icon', {
  start: true,
  stop: false,
  background: true
});
```

## Example

Check out [daydream](https://github.com/segmentio/daydream), a chrome extension we wrote that uses `analytics-node` to track user events.
