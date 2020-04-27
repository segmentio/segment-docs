---
title: Developer Center Overview
---

> note ""
> **NOTE:** Developer Center is currently in _Developer Preview_. If you are interested in joining the Developer Preview, request access [here](https://segment.com/partners/developer-center/). The use is governed by [(1) Segment First Access](https://segment.com/legal/first-access-beta-preview/) and Beta Terms and Conditions and [(2) Segment Acceptable Use Policy](https://segment.com/legal/acceptable-use-policy/). By starting or continuing this process, you also agree to the [Segment Platform Partners Agreement](https://segment.com/legal/partnersagreement/).


## Building on Segment

Over 19,000 companies use Segment as their central hub for collecting and synthesizing first-party customer data. Customers use Segment [Sources](/docs/connections/sources/) to collect data across all their properties (web, mobile, CRMs, email etc.) and send this data into [Destinations](/docs/connections/destinations/) (SaaS tools, internal databases or queues, or a data warehouse) to perform analytics, run marketing campaigns and much more.

Below is a sample screenshot of a customer's Segment dashboard, showing all their sources of data on the left, and destinations for their data on the right.

![](images/overview.png)

Segment's core feature is our Connections Catalog:

![](images/catalog.gif)

Customers discover your Sources and Destinations via the Connections Catalog and can enable them from there.

The development process is simple:

1. Understand Segment's [Conceptual Model](/docs/partners/conceptual-model) and [Spec](https://segment.com/docs/connections/spec).
2. Request [access to the Segment Developer Center](https://segment.com/partners/developer-center/).
3. Create an App.
4. Build and test your Component(s).
5. Publish documentation.
6. Submit your App for review.
7. Launch into _Public Beta_!

### 1. Understand Segment's Conceptual Model

It's important to understand Segment's [Conceptual Model](/docs/partners/conceptual-model) to begin planning your integration. This will help you understand how data will flow from or into your integration.

### 2. Request Access 

During _Developer Preview_, you will need to [request access to Developer Center](https://segment.com/partners/developer-center/). A Segment account is required for this step.

We receive a large volume of requests so we encourage you to include a valid company website and email address, answer all questions with details about integration's use case as well as highlighting specific customer requests to expedite the approval process.

### 3. Create your App

Once approved, you can create your first [App](/docs/partners/conceptual-model/#apps). This represents a tile in the [Segment catalog](https://segment.com/catalog/) irrespective of which [Component](/docs/partners/conceptual-model/#components) type you choose to build so it should reflect your tool's name (eg. Zendesk Chat, Zendesk Sell).

> info ""
> The Developer Center currently only supports new Partner integrations (ie. Currently does not exist on the [Segment catalog](https://segment.com/catalog/)) in _Developer Preview_. If you're an existing Partner looking to build a new Component or make changes to your existing integration, please fill in [your details here](https://airtable.com/shrSweuRx5jspwsw7) and we will reach out once this is made available!

### 4. Build & Test

Now you can start building! Depending on your use case you can build a:

- [Subscription](/docs/partners/subscriptions)
- [Plugin](/docs/partners/plugins)
- [Stream](/docs/partners/streams)

> info ""
> The Developer Center currently only supports the [Subscription](/docs/partners/subscriptions) component in _Developer Preview_. If you're looking to build a [Web Plugin](https://airtable.com/shrT3b4C7agUEBKVS) or [Stream](https://airtable.com/shrj3BkHMhdeaPYWt) please fill out the respective form and we will reach out once this is made available!

No matter which Component you decide to build, make it aligns with the [Segment Spec](https://segment.com/docs/connections/spec). This is a critical component in preserving logical continuity between disparate writers and readers of data. If you encourage customers to break the spec, you are breaking the promise of Segment, and is grounds for removal from the catalog.

It's important that we provide a great experience for our mutual customers so we ask that you also conduct thorough testing of your integration using the tooling provided to you through the Developer Center. We also encourage you to use your Segment sandbox in the shoes of a user to polish the experience of implementing and using your integration.

### 5. Document

Finally, make sure you prepare documentation and relevant marketing material for easy discovery and reference. We ask that you provide the following documentation about your integration by making a copy of the below templates:

1. Documentation [hosted by Segment](https://segment.com/docs/) for [Subscription / Plugin](https://hackmd.io/t7amLXluS7-39rg7ARZgSA) or [Stream](https://hackmd.io/TV8cZR6tRnKwGtkvSexeag)
2. Documentation for [the Segment catalog](https://segment.com/catalog/) using [this template](https://docs.google.com/document/d/1kvAvAHLyM3pOq-lBcZJhP_X_KivHlk1eiFy-5ERWDXc/edit))
3. Documentation hosted on your own website about your new Segment integration
4. Draft blog post announcing your new integration


### 6. Submission

You can submit your Component in the Developer Center for review. We strive to respond to your submission within 2 business days to kickstart the review process.

Our team will test your integration and review your documentation and marketing material. In order to keep this review feedback loop short, please make sure that your integration:

- Adheres to the [Segment Spec](/docs/partners/spec/)
- Adheres to your published documentation
- Supports high data volumes
- Meets all [launch requirements](/docs/partners/#launch-requirements)

## Launch Requirements

See the [Public Beta Checklist](/docs/partners/checklist) for a detailed checklist used by the Segment team to review and approve the launch of your integration.

In a nutshell you need:

1. A working integration tested end-to-end. We encourage you to follow your own documentation and run through the experience as one of our mutual customers.

2. Complete the fields under the _App Info_ tab with your App including both _Basic Info_ and _Launch Info_. This includes:

  - **Segment Documentation:** Using these templates ([subscription](https://hackmd.io/t7amLXluS7-39rg7ARZgSA?both=)/[stream](https://hackmd.io/TV8cZR6tRnKwGtkvSexeag), document how our mutual customers can utilize your integration.
  - **Your Documentation:** Similar to the above but hosted on your own website.
  - **Catalog Details:** Details for our [catalog](https://segment.com/catalog) material including screenshots by making a copy of [this template](https://docs.google.com/document/d/1kvAvAHLyM3pOq-lBcZJhP_X_KivHlk1eiFy-5ERWDXc/copy).
  - **Integrations / Partners Page:** Add your Segment integration to your integrations or partners page, like [this](https://success.clearbrain.com/connections/import-connections/connect-to-your-data-in-segment).
  - **Blog Post:** Publish a launch blog post about your integration, like [this](https://www.kustomer.com/blog/kustomer-segment-integration/). Make sure you share it on Twitter and LinkedIn too! (If you don't have a blog, an email is okay)

Please be sure to use our [brand kit](https://brandfolder.com/segment/press-kit) for logos, and our [UTM guide](https://docs.google.com/document/d/1L0MHYdF2SYaMMiodQCYlZELF7pN0TXiZbD22nnlGhEk/copy) any time you link to a Segment page.

You can reach out to us at [partner-support@segment.com](mailto:partner-support@segment.com) once you have all these elements ready for review. Once we approve them, your Destination goes live on Catalog in Public Beta 🎉

## Post Launch

Congratulations on launching your integration in Public Beta - welcome aboard! Here are the next steps to move out from Public Beta to Public:

1. Implement the [Enable with Segment OAuth](/docs/partners/enable-with-segment) button - this makes it much easier for our mutual customers to get started with your integration!
2. Onboard at least 3 customers to actively utilize your integration

Bonus points if you join the [Segment Select](/docs/partners/#segment-select) Partner Program!

## Segment Select

Our focus when working with partners is to ensure we are always providing an exceptional experience to our joint customers.

From there, you can start taking advantage of our available partner opportunities by [joining the Segment Select Partner Program](https://segment.com/partners/integration/#module-5-benefits).

By becoming a Segment Select partner, you have access to sales support, technical training, and personalized co-marketing opportunities. [Learn more about the program details here.](https://assets.ctfassets.net/9u2t3ap6pctb/3NPVQDweiX0l8Z2edugwIr/d09ea71f04913f3189514b7d2df57d36/Segment_Select_Partner_Program_One_Pager.pdf)
