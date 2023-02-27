---
title: Spec Overview
redirect_from: '/docs/partners/spec/'
---

The Segment Spec provides guidance on meaningful data to capture, and the best format for it, across all of Segment's libraries and APIs. If you implement Segment using these formats, it's simple to translate your data to downstream tools.

{% include components/reference-button.html href="https://university.segment.com/introduction-to-segment/324252?reg=1&referrer=docs" icon="media/academy.svg" title="Segment University: The Segment Methods" description="Check out our high-level overview of these APIs in Segment University. (Must be logged in to access.)" %}

> warning "Event and Product Limits"
> Events ingested by Segment are subject to defined [Product Limits](/docs/connections/rate-limits).

The Segment Spec has three components.

First, it **outlines the semantic definition of the customer data Segment captures across all libraries and APIs**.  There are six API calls in the Spec. They each represent a distinct type of semantic information about a customer. Every call shares the same [common fields](/docs/connections/spec/common/).
- APIs
  - [Identify](/docs/connections/spec/identify/): who is the customer?
  - [Track](/docs/connections/spec/track/): what are they doing?
  - [Page](/docs/connections/spec/page/): what web page are they on?
  - [Screen](/docs/connections/spec/screen/): what app screen are they on?
  - [Group](/docs/connections/spec/group/): what account or organization are they part of?
  - [Alias](/docs/connections/spec/alias/): what was their past identity?

Second, it **details the event data Segment captures across some cloud sources and destinations**.
- Cloud Sources and Destinations
  - [Email](/docs/connections/spec/email/)
  - [Live Chat](/docs/connections/spec/live-chat/)
  - [A/B Testing](/docs/connections/spec/ab-testing/)

Third, it **shares the events Segment recommends you track for a particular industry based on experience working with thousands of customers**. When you respect these specs, Segment maps these events to particular features within end destinations like Google Analytics and Facebook Ads.
- Industry Specs
  - [Mobile](/docs/connections/spec/mobile/)
  - [E-Commerce](/docs/connections/spec/ecommerce/v2/)
  - [Video](/docs/connections/spec/video/)
  - [B2B SaaS](/docs/connections/spec/b2b-saas/)
