---
title: Branch Destination
rewrite: true
hide-personas-partial: true
---

[Branch](https://branch.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) empowers you to increase mobile revenue with enterprise-grade links built to acquire, engage, and measure across all devices, channels, and platforms. An industry-leading mobile measurement and deep linking platform, trusted by the most top ranking apps to increase efficiency and revenue.

---

**As of November 2019, the Branch mobile SDKs for Segment are in maintenance mode, and will be refreshed in the second half of 2020.**

Existing users of the Branch SDKs are unaffected, however new installations must implement the Branch native SDK separately. They can then enable Branch's [data export integration](https://docs.branch.io/integrations/segment-export/) to push additional data to Segment, and [data import integration](https://docs.branch.io/integrations/segment-import/) to pull additional Segment data into the Branch dashboard.

The legacy instructions for implementing the Branch mobile SDKs for Segment have been removed from this documentation. If you need access to the removed sections, you can view them [here](https://web.archive.org/web/20191113225102/https://segment.com/docs/connections/destinations/catalog/branch-metrics/).

---

This destination is maintained by Branch. For any issues with the destination, [contact the Branch support team](https://support.branch.io/support/home).

This document was last updated on November 13, 2019. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

  1. From the Segment web app, click **Catalog**.
  2. Search for "Branch Metrics" in the Catalog, select it, and choose which of your sources to connect the destination to.
  3. On Branch side you will need to [sign up for a free Branch account](http://branch.io/signup?bmp=segment) and follow the steps on their Dashboard to complete set up.
  4. Copy your `Branch Key` from the Settings page of your [Branch dashboard](https://dashboard.branch.io/#/settings).
  5. Paste the Branch Key in the destination settings and click **Save**.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example iOS call would look like:
```swift
[[SEGAnalytics sharedAnalytics] identify:@"12091906-01011992"
                                traits:@{ @"email": @"john.doe@example.com" }];
```

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example iOS call would look like:

```swift
[[SEGAnalytics sharedAnalytics] track:@"Article Completed"
                           properties:@{ @"title": @"How to Create a Tracking Plan", @"course": @"Intro to Analytics" }];
```
