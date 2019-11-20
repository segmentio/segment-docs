---
title: 'Spec: Semantic Events'
---

One of the core components of the Segment [Spec](/docs/spec) is the [`track`](/docs/spec/track) call. It describes any arbitrary event that the user has triggered. For some industry verticals and applications, we've standardized event names. For Ecommerce tracking, for example, there are **specific event names and properties** that we recognize semantically. This semantic meaning allows us to specially recognize and transform key events before sending them off to each different tool.

There are a few places where we've standardized event names and properties already:

- [Mobile](/docs/spec/mobile)
- [A/B Testing](/docs/spec/ab-testing)
- [Ecommerce](/docs/spec/ecommerce/v2/)
- [Email](/docs/spec/email)
- [Live Chat](/docs/spec/live-chat)
- [Video](/docs/spec/video)

In the future we plan to standardize event names from other data sources as well.
