---
title: Track JS
---

## Getting Started

When you toggle on Track JS as a destination in Segment, this is what happens:

+ Our CDN is updated within 5-10 minutes. Then our snippet will start asynchronously loading Track JS onto your page. This means you should remove Track JS' snippet from your page.
+ Track JS will automatically start recording error data.

Since Track JS only records data about errors, it does not collect any of the data represented by our API.

## Non-supported options

We do not currently support Track JS' ```onError``` and ```serialize``` options because they pose a [XSS vulnerability](http://en.wikipedia.org/wiki/Cross-site_scripting).

To work around this issue, however, you can directly set these options in the ```window._trackJs``` object on your page. These options will be merged with the settings you have configured in the interface once the Track JS script is loaded.

We also do not support `version`, or `sessionId`. These can either be set prior to initialization as described above, or can be set after the snippet has been loaded with the `ready` callback

```javascript
analytics.ready(function(){
  window.trackJs.configure({ sessionId: '123456', version: '1.0' });
});
```

Note that the `userId` parameter is automatically determined.
