---
title: Spec
sidebar: Overview
redirect_from:
- '/advanced/spec/'
- '/advanced/spec/car-rentals/'
- '/advanced/spec/hotels/'
- '/spec/car-rentals/'
- '/spec/flights/'
- '/spec/hotels/'
- '/spec/local/'
---

The Segment Spec has three components.

First, it **outlines the semantic definition of the customer data we capture across all of our libraries and APIs**.  There are six API calls in the Spec. They each represent a distinct type of semantic information about a customer. Every call shares the same [common fields](/docs/spec/common/).
- APIs
  - [Identify](/docs/spec/identify/): who is the customer?
  - [Track](/docs/spec/track/): what are they doing?
  - [Page](/docs/spec/page/): what web page are they on?
  - [Screen](/docs/spec/screen/): what app screen are they on?
  - [Group](/docs/spec/group/): what account or organization are they part of?
  - [Alias](/docs/spec/alias/): what was their past identity?

Second, it **details the event data we capture across some of our cloud sources and destinations**.
- Cloud Sources and Destinations
  - [Email](/docs/spec/email/)
  - [Live Chat](/docs/spec/live-chat/)
  - [A/B Testing](/docs/spec/ab-testing/)

Third, it **shares the events we recommend you track for a particular industry based on our experience working with thousands of customers**. When you respect these specs, we can map these events to particular features within end destinations like Google Analytics and Facebook Ads.
- Industry Specs
 - [Mobile](/docs/spec/mobile/)
 - [E-Commerce](/docs/spec/ecommerce/v2/)
 - [Video](/docs/spec/video/)
 - [B2B SaaS](/docs/spec/b2b-saas/)
