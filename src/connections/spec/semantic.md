---
title: 'Spec: Semantic Events'
---

One of the core components of the Segment [Spec](/docs/connections/spec) is the [`track`](/docs/connections/spec/track) call. It describes any arbitrary event that the user has triggered. For some industry verticals and applications, Segment has standardized event names. For Ecommerce tracking, for example, there are **specific event names and properties** that we recognize semantically. This semantic meaning allows Segment to specially recognize and transform key events before sending them off to each different tool.

There are a few places where Segment has standardized event names and properties already:

- [Mobile](/docs/connections/spec/mobile)
- [A/B Testing](/docs/connections/spec/ab-testing)
- [Ecommerce](/docs/connections/spec/ecommerce/v2/)
- [Email](/docs/connections/spec/email)
- [Live Chat](/docs/connections/spec/live-chat)
- [Video](/docs/connections/spec/video)

In the future Segment plans to standardize event names from other data sources as well.
