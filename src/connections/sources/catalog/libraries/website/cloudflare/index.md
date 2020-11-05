---
title: Cloudflare Source
hidden: true
redirect_from: '/connections/sources/catalog/libraries/server/cloudflare/'
---

Cloudflare enables customers to mitigate website security attacks and speed up page load times. No technical knowledge required.

Segment makes it simple for Cloudflare customers to integrate analytics, email marketing, advertising and optimization tools. Rather than installing all your tools individually, you just install Segment once. We collect your data, translate it, and route it to any tool you want to use. Using Segment as the single platform to manage and install your third-party services will save you time and money.

The guide below explains how to install Segment on your Cloudflare-hosted website. All you need to get up and running is to create a Cloudflare source and turn on the Segment app for your website. The following guide will show you how, step by step.

don't have a Segment account? No problem, [sign up here](https://segment.com/signup?utm_source=cloudflare&utm_medium=docs&utm_campaign=partners).

## Getting Started

1. From your workspace's **segment.com/your-workspace/sources** page, then click [Add source](https://segment.com/workspaces?next=sources/catalog).
2. Choose Cloudflare.
3. Give the Source a nickname (usually the domain of your site, e.g. segment.com). The nickname is a label used in the Segment interface and in a data warehouse if you choose to use one. *You can edit the name later.*
4. The next page, **Overview**, will surface your Segment write key for Cloudflare. Copy this write key.
5. To finish the setup, you'll have to go into your Cloudflare account and enter this Segment write key in their app settings. [Install the app  here](https://cloudflare.com/apps/segment/install?source=segment-docs).

![Screenshot of Cloudflare Segment App](https://i.imgur.com/LX36x8R.png)

Turn on the "Automatically Track Page Views" option in Cloudflare to collect page view data. Now when you go back to Segment, click into your Cloudflare Source and you'll be able to add other downstream Destinations where you want to see your website's events.

For example, if you want to turn on [Google Analytics](https://google.com/analytics) or [Intercom](https://intercom.com) then you can just navigate to your source's "destinations" page (e.g. **segment.com/your-workspace/sources/your-site/integrations**) and connect new tools.

That's it! As visitors come on to your site, events will now be sent to your destinations and automatically loaded into any warehouses you have enabled.

## What Data Gets Sent

If you turned on the `Automatically Track Page Views` option in your Cloudflare app, then [`page`](/docs/connections/spec/page/) events should already be flowing into your Segment source. That data is being sent using [`analytics.js`](/docs/connections/sources/catalog/libraries/website/javascript) which has been loaded onto your site; you can now use it to send custom data to Segment and downstream to other tools.

Read more about [`page` calls here](/docs/connections/spec/page/).

## Custom Events and Properties

In order to track information other than pageviews, you can use [`analytics.js`](/docs/connections/sources/catalog/libraries/website/javascript) which is now loaded on your website. *Note: This will require editing code on your website.*

The two most common types of events are [`track`](/docs/connections/sources/catalog/libraries/website/javascript/#track) and [`identify`](/docs/connections/sources/catalog/libraries/website/javascript/#identify).

The `track` API call is how you record any actions your users perform, along with any properties that describe the action. Each action is known as an event. Each event has a name, like **Form Submitted**, and properties, for example a **Form Submitted** event might have properties like `plan` or `accountType`. Calling `track` in one of our sources is one of the first steps to getting started with Segment.

The `identify` API call lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about them like their email, name, etc...

Learn more about how to use [`analytics.js` here](/docs/connections/sources/catalog/libraries/website/javascript/).
