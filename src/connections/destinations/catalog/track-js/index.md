---
rewrite: true
title: trackJs Destination
id: 54521fdb25e721e32a72eef9
---
[Track JS](https://trackjs.com/) monitors your web applications for JavaScript errors, alerting you with amazing context about how the user, application, and network got into trouble. The `analytics.js` trackJs Destination is open-source. You can browse the code [on GitHub](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations/trackjs).

## Getting Started

{% include content/connection-modes.md %}

  1. From the Segment web app, click **Catalog**.
  2. Search for "Track JS" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. Enter your Token as retrieved from your Track JS [set up page](https://my.trackjs.com/customer/login?returnUrl=%2fcustomer%2fsetup#install-locally).
  4. Your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Track JS onto your page. This means you should remove Track JS' snippet from your page.
  5. The Track JS Destination doesn't use any Segment API calls (e.g. identify, track, etc) so, once it's loaded, it will automatically start recording error data.

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
