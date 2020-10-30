---
title: Subscription Overview
---

Subscriptions enable you to receive incoming data for our mutual customers to your service's HTTPS endpoint in realtime.

A Subscription gives you complete control over how you want to store, transform and process the data. It means that our mutual customers can immediately start sending you data from any one of Segment's [sources](/docs/connections/sources/), including a web browser, mobile apps, or from our mutual customer's servers — with no added work. Segment Business Tier customers can also [replay historical data](/docs/guides/what-is-replay/), which means you can demonstrate the value of your tool rapidly.

## Getting Started

Review the steps outlined in the [Developer Center Overview](/docs/partners). This document outlines specific details for Step 4 as it relates to building a subscription.

1. Understand Segment's [Conceptual Model](/docs/partners/conceptual-model) and [Spec](https://segment.com/docs/connections/spec).
2. Follow Segment's security guidance.
3. Request [access to the Segment Developer Center](https://segment.com/partners/developer-center/).
4. Create an App.
5. Build and test your Component(s).
6. Publish documentation.
7. Submit your App for review.
8. Launch into _Public Beta_!

## Build & Test

You can subscribe to customer data in two ways:

1. **[Webhook](/docs/partners/subscriptions/build-webhook)**: Build a new HTTP service that receives Webhook POSTs from Segment.
2. **[Functions](/docs/partners/subscriptions/build-functions)**: Write JavaScript functions that run on Segment to translate and send data to your existing API. [Get started...](/docs/partners/subscriptions/build-functions)

See the [Webhook](/docs/partners/subscriptions/build-webhook) and [Functions](/docs/partners/build-functions/) docs in-depth technical details about building.
