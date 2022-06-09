---
title: Subscription Overview
---

{% include content/dev-center-note.md %}


Subscriptions enable you to receive incoming data for mutual customers to your service's HTTPS endpoint in real-time.

A Subscription gives you complete control over how you want to store, transform and process the data. It means that mutual customers can immediately start sending you data from any one of Segment's [sources](/docs/connections/sources/), including a web browser, mobile apps, or from mutual customer's servers — with no added work. Segment Business Tier customers can also [replay historical data](/docs/guides/what-is-replay/), which means you can demonstrate the value of your tool rapidly.

## Getting Started

Review the steps outlined in the [Developer Center Overview](/docs/partners). This document outlines specific details for Step four as it relates to building a subscription.

1. Understand Segment's [Conceptual Model](/docs/partners/conceptual-model) and [Spec](/docs/connections/spec).
2. Follow Segment's security guidance.
3. Request [access to the Segment Developer Center](https://segment.com/partners/developer-center/).
4. Create an App.
5. Build and test your Component(s).
6. Publish documentation.
7. Submit your App for review.
8. Launch into _Public Beta_!

## Build & Test

> note ""
> **NOTE:** On July 31, 2021 support for building Subscription Functions was removed from Developer Center. You may continue building [Subscription Webhooks](/docs/partners/subscriptions/build-webhook) in place of Subscription Functions. Work has begun on Developer Center 2.0 which will offer a more holistic approach to building on Segment. If you're interested in joining the beta in the coming months, please fill out [this form](https://airtable.com/shrvZzQ6NTTwsc6rQ){:target="_blank"}!

[Subscription Webhooks](/docs/partners/subscriptions/build-webhook) allow you to build a new HTTP service that receives Webhook POSTs from Segment. Read more in-depth technical details about building webhooks [here](/docs/partners/subscriptions/build-webhook).
