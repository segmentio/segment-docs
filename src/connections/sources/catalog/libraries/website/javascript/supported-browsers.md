---
title: Analytics.js Browser Support
redirect_from: '/guides/intelligent-tracking-prevention/'
strat: ajs
---

[The Segment JavaScript library, Analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/), loads a snippet on your webpage that supports existing user consent APIs and native browser controls. Segment regularly tests Analytics.js against the following browsers on all major platforms, and updates the library accordingly.

The library is regularly tested and is functional with the following browsers:

- Internet Explorer
- Apple Safari
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Brave

> warning "Deprecation of Analytics.js Classic"
> Analytics.js Classic was deprecated on February 28, 2023. At this time, Segment is upgrading all sources not yet upgraded to [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/). The upgrade process will complete for all users by the end of March 2023.
> <br><br>Learn how to [upgrade to Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/upgrade-to-ajs2).

### Internet Explorer Support

Segment guarantees support for Internet Explorer 11 and later for Analytics.js. Remember that different bundled (device-mode) destinations might have different compatibility guarantees for their own products. Refer to the vendor's documentation to confirm browser compatibility.

If you need to support older versions of Internet Explorer or Opera, Segment encourages you to either load a polyfill script in the head (https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.7.0/polyfill.min.js) or use the analytics-next npm package and bundle/polyfill themselves. For example, https://babeljs.io/docs/babel-preset-env. 

> info ""
> Classic destinations and Analytics.js support Internet Explorer 11, but some Actions destinations are not yet supported.

## Tracking Protection (ITP, ETP)

Segment is a customer data platform (CDP) that helps companies harness first-party customer data. The recent browser changes fully align with Segment's privacy stance.

Browser manufacturers have enhanced their privacy features by adding third-party tracking protection mechanisms for end-users. These browser changes target third-party trackers and their cookies, and each platform takes a different approach.

For example, [Firefox Enhanced Tracking Protection (ETP)](https://blog.mozilla.org/blog/2020/08/04/latest-firefox-rolls-out-enhanced-tracking-protection-2-0-blocking-redirect-trackers-by-default/) relies on a dynamic list of known trackers to decide what to block. Browsers that use [Apple's WebKit engine](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/), like Safari and Chrome for iOS, use Intelligent Tracking Protection (ITP) which actively prevents the browser from loading cookies from a third-party domain.

> info ""
> **Note:** Segment cookies expire after seven days of user inactivity, like all other application cookies under the WebKit engine ITP policy.

## Proxies and Analytics.js

Because of regulatory, environmental, or security concerns, some customers prefer to [set up proxy infrastructure for Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy/).

You can also use the `apihost` configuration option in the Analytics object to route traffic to different API endpoints.
