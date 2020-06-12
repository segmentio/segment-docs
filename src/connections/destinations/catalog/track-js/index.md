---
rewrite: true
title: trackJs Destination
---
[Track JS](https://trackjs.com/) monitors your web applications for JavaScript errors, alerting you with amazing context about how the user, application, and network got into trouble. The `analytics.js` trackJs Destination is open-source. You can browse the code [on GitHub](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations/trackjs).

This document was last updated on November 26, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

  1. From your Segment UI's Destinations page click on "Add Destination".
  2. Search for "Track JS" within the Destinations Catalog and confirm the Source you'd like to connect to.
  3. Drop in your Token as retrieved from your Track JS [set up page](https://my.trackjs.com/customer/login?returnUrl=%2fcustomer%2fsetup#install-locally).
  4. Our CDN is updated within 45 minutes. Then our snippet will start asynchronously loading Track JS onto your page. This means you should remove Track JS' snippet from your page.
  5. The Track JS Destination doesn't utilize any Segment API calls (e.g. identify, track, etc) so, once it's loaded, it will automatically start recording error data.

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
