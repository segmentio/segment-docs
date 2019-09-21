---
title: "Is Segment impacted by Intelligent Tracking Prevention?"
---

Intelligent Tracking Prevention (ITP) is a new feature that was launched with Apple’s Safari 11 browser. ITP is a machine learning model used to identify and classify which top domains use cross-site tracking. If ITP classifies a website as having the ability to track users cross-site, the website is subject to stricter cookie policies. Specifically, any third-party cookies or cookies from sites classified by ITP will be automatically purged after 24 hours of inactivity. With Safari ITP 2.1, all client-side cookies will be automatically purged after 7 days of inactivity.

Finally, it is important to note that Intelligent Tracking Prevention only applies to the Safari browser (on desktop and mobile). For more information on how ITP works, check out [WebKit.org](https://webkit.org/blog/7675/intelligent-tracking-prevention/).

**Will Intelligent Tracking Prevention impact Segment’s analytics.js library?**

Safari ITP 2.1 will expire client-side, first-party cookies after 7 days. Analytics.js uses a combination of cookies and local storage to ensure that your data is as high fidelity as possible while still comforming to strict first-party standards.

We do this by setting the Segment ID in the cookie and local storage in the browser. When the cookie value does not exist, and it falls within the 365 day expiry time frame, we copy the Segment ID from the value in local storage onto the cookie.

It's best practice to make sure you call [identify](https://segment.com/docs/spec/identify/) upon loading any pages that are accessible by a logged in user. This will ensure the highest degree of accuracy for known users.

You can read more about the Analytics.js persistence strategy [here](https://segment.com/docs/sources/website/analytics.js/#segment-id-persistance).

The Segment, server-side libraries are not impacted by ITP.

**Can I change the Segment ID persistence to use the cookie only?**

Yes, in your website source settings, you can navigate to Analytics.js and disable "Use local storage for Segment ID". This will remove any persistence to local storage of the Segment ID and will use the cookie exclusively. This UI switch will be rolling out over the coming weeks.

**How is subdomain tracking impacted by Safari ITP?**

Safari ITP will impact subdomain tracking for users who do not return to any of your subdomains within 7 days. If a customer visits your site, or any of the subdomains within 7 days then the cookie value will be persisted.

If you choose to turn off the Segment ID cookie persistence in your website settings, then a new anonymous ID is assigned after 7 days. This will happen regardless of which subdomain the user visits.

**Will Intelligent Tracking Prevention impact any of Segment’s Destinations?**

ITP will impact Destinations that rely on third-party cookies, but because ITP uses a machine learning model to identify and classify domains, it is unclear which specific Destinations will be impacted.

Advertising and Retargeting Destinations are most likely to be affected, and we recommend evaluating each of your [Advertising and Retargeting Destinations](https://segment.com/docs/destinations/) on a case-by-case basis. 

Many tools have already issued guidance on how they will be impacted by ITP and steps you can take to respect your customers’ privacy. Here are resources to get you started:

*   [AdRoll](https://help.adroll.com/hc/en-us/articles/212675877-Retargeting-on-Safari)

*   [AdWords](https://support.google.com/adwords/answer/7521212?hl=en&utm_source=awfe&utm_medium=referral&utm_campaign=notifications&authuser=1)

*   [DoubleClick Floodlight ](https://support.google.com/ds/answer/7524055)

*   [Facebook](https://developers.facebook.com/blog/post/2017/10/05/intelligent-tracking-prevention/)
