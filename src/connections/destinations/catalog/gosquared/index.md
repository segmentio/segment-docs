---
title: GoSquared Destination
---

## Getting Started

When you toggle on GoSquared in Segment, this is what happens:

- Our CDN is updated within 45 minutes. Then our snippet will start asynchronously loading GoSquared's Tracker onto your page. This means you should remove any manual integration of GoSquared.
- Your GoSquared Now dashboard will instantly start showing the number of visitors online, and if you're using `identify`, users will start appearing in People Analytics.

GoSquared supports mobile, webpage and server-side tracking.

- - -

## Website Tracking

When you enter your GoSquared site token into Segment, website tracking will automatically start.

## Mobile and Server-Side Tracking

To track data via Segment's mobile and server-side sources, you will need to enter a GoSquared API Key, which can be created in your [GoSquared account](https://www.gosquared.com/settings/api). The API Key must have "Write Tracking" access. All functionality is supported by mobile and server-side tracking.

- - -

## Page

When you call [`page`](/docs/spec/page/), we call GoSquared's [`track`](https://www.gosquared.com/docs/tracking/api/js#pageviews) to track a pageview. By default the Segment JavaScript snippet includes a call to [`page`](/docs/spec/page/) so you don't need to add it manually.

Page calls will be tracked from any Segment library, but GoSquared's real-time analytics will be most accurate using front-end website tracking.


## Identify

When you call [`identify`](/docs/spec/identify/), we call GoSquared's [`identify`](https://www.gosquared.com/docs/tracking/api/js#identify). Once identified with a `userId`, that person (along with historical browsing information from before they were identified) will be visible and queryable in [GoSquared People Analytics](https://www.gosquared.com/software/people).

GoSquared expects a slightly different set of traits from us, so we start by transforming the traits to match their format.

| Our trait   | GoSquared property |
|-------------|--------------------|
| `firstName` | `first_name`       |
| `lastName`  | `last_name`        |
| `createdAt` | `created_at`       |
| `title`     | `company_position` |
| `industry`  | `company_industry` |

GoSquared recognises certain traits as "special" and requires all other traits to be sent under a namespace of `custom`. The Segment code handles all of this, sending recognised [special properties](https://www.gosquared.com/docs/tracking/api/js#properties) and custom properties in the correct places.

## Track

When you call [`track`](/docs/spec/track/), we call GoSquared's [`event`](https://www.gosquared.com/docs/tracking/api/js#events) with the same arguments.


## Screen

GoSquared supports the [`screen`](/docs/spec/screen/) method by converting it into an event, with an event name of `"Screen: " + name`.

## Group

GoSquared converts the [`group`](/docs/spec/group/) method into an identify call, to set the company details for a user. Only one company/group is supported per user.

## Ecommerce

GoSquared supports our [Ecommerce tracking API](/docs/spec/ecommerce/v2/#order-completed), so the `Order Completed` event will be tracked as a [GoSquared Transaction](https://www.gosquared.com/docs/tracking/api/js#transactions).
