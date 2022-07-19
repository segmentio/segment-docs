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

### Internet Explorer Support

Segment guarantees support for Internet Explorer 11 and later for Analytics.js. Remember that different bundled (device-mode) destinations might have different compatibility guarantees for their own products. Refer to the vendor's documentation to confirm browser compatibility.


## Tracking Protection (ITP, ETP)

Segment is a customer data platform (CDP) that helps companies harness first-party customer data. The recent browser changes fully align with Segment's privacy stance.

Browser manufacturers have enhanced their privacy features by adding third-party tracking protection mechanisms for end-users. These browser changes target third-party trackers and their cookies, and each platform takes a different approach.

For example, [Firefox Enhanced Tracking Protection (ETP)](https://blog.mozilla.org/blog/2020/08/04/latest-firefox-rolls-out-enhanced-tracking-protection-2-0-blocking-redirect-trackers-by-default/) relies on a dynamic list of known trackers to decide what to block. Browsers that use [Apple's WebKit engine](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/), like Safari and Chrome for iOS, use Intelligent Tracking Protection (ITP) which actively prevents the browser from loading cookies from a third-party domain.

> info ""
> **Note:** Segment cookies expire after seven days of user inactivity, like all other application cookies under the WebKit engine ITP policy.

## Proxyies and Analytics.js

Because of regulatory, environmental, or security concerns, some customers prefer to [set up proxy infrastructure for Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy/).

You can also use the `apihost` configuration option in the Analytics object to route traffic to different API endpoints.
