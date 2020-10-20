---
title: MTUs, Throughput and Billing
---

## What is an MTU?

MTU stands for "monthly tracked user".

## How does Segment calculate MTUs?

Segment calculates Monthly tracked users by counting the number of **unique** `user_ids` and **unique** `anonymous_ids` that appear in any call to Segment in a given month. Object-based sources do not count towards your MTU count.

Segment only counts each user once per month, even if they perform more than one action across your sources.

**What about object-based sources?**

Object-based Sources (like Salesforce, Zendesk, and Stripe) _don't impact your MTU counts_ because there are no IDs. However they do impact your overall object count.

![](images/asset_D2CxVx1I.png)

**And event based cloud-app sources?**

Event based (mostly email sources like Klaviyo, Vero, Drip, etc.) _do create MTUs_ because they have IDs associated.

![](images/asset_otFE2fhI.png)


## How do I see my usage data?

If you have questions about your data usage or how it relates to your bill, we recommend logging into your Segment workspace, navigating to the “Usage” page in the “Usage and Billing” section under “Settings”.
On the “Usage” page, you will see what plan you’re on, what data volumes your plan includes, and how much data you’ve used during a billing period. If you have used data volumes past what your bill includes, the page will provide information about what volume of data was in overage and what your overage rate is.

You’ll also be able to see a cumulative, daily breakdown of data volumes by source for that billing period. You can access the cumulative, daily breakdown from the previous five billing periods or an overview of the last 12 months of data volumes by adjusting the billing period dropdown at the top of the page.

## What is the difference between an event and an object?

Events append only data streams, akin to "facts" in data warehousing parlance, and objects are dimensional values that may be updated based on changes in state upstream. Each source will note if it is object-based or event-based in its documentation.

## How does my event and object volume impact my pricing?

We allow for each workspace to send up to 250 API calls + objects per MTU. This means that on a plan with a 10,000 MTU limit you can send up to 2.5M API calls + objects per month. Most customers will never hit this limit; business plans are eligible for custom limits.


## What does throughput limit stand for?

*   Your customer data comes in the form of API Calls and Objects. Free and Team plans include up to **250 API Calls and Objects per MTU**.

*   **Business plans** are eligible for custom limits.

*   The vast majority of Segment customers use well under these limits.


## Why is my MTU count different from what I see in my destinations/other tools?

Comparing numbers between any two end-tools (or between Segment and an end tool) is rarely going to produce identical numbers. Each tool accepts and defines incoming data slightly differently, and they will not always match 100% depending on what types of data the tool accepts.

For example, consider these instances with some of our most popular destinations:

### Google Analytics:

*   When sending `page` views from one of Segment's server-side libraries, a `url` property is required. Otherwise, Google Analytics will silently reject your `page` event.

*   It is against Google's terms of service to pass Personally Identifiable Information (PII) to your Google Analytics reporting interface. For that reason Segment will never pass anything from an [`identify`](https://segment.com/docs/connections/spec/identify) call to Google unless you specifically tell us to.

*   If you want to pass the `id` from your [`identify`](https://segment.com/docs/connections/spec/identify) calls to Google Analytics - enable **Send User-ID to GA** in your Advanced Google Analytics settings on the Segment destinations catalog.

### Amplitude

*   By default, Segment won't send standard [`page`](https://segment.com/docs/connections/spec/page/) or [`screen`](https://segment.com/docs/connections/spec/screen/) calls to Amplitude. However, you can enable sending `page` and `screen` calls with the following destination settings, which you can find under the "Advanced Options" tab.

*   If you're using a server-side library or the Segment HTTP API to send events or traits about anonymous visitors, Amplitude won't automatically be able to identify that anonymous user as being the same person when they log in. To have Amplitude connect the dots, when you call `.identify()` on user log-in, you should include both the `anonymousId` you were using before the user logged in, as well as their `userId`.

*   For Amplitude to associate both client-side and server-side activity with the same user, you will need to pass the same `deviceId` to Amplitude. Otherwise, Amplitude will create two users - one associated with your `deviceId` and another user associated with your Segment `anonymousId`.


contact our [support team](https://segment.com/help/contact/) for further inquiries about a specific tool you have questions about to ensure there isn't an implementation error.

## What caused an unexpected spike in my MTU count?

Typically, MTU counts increase when you have an increase in users or visitors on instrumented parts of your application. Occasionally, a big press release or marketing campaign can lead to an influx of visitors.

The other potential cause of big increases is that you added tracking to new parts of your site or workflow, maybe it's a marketing site that didn't have tracking before, or ramp-up in the number of interactions you have with your users outside your app (emails, help desk, push notifications, etc). Since you are now tracking users you weren't tracking before, your MTU count will go up. If you're already tracking those users elsewhere with Segment, we won't double-count them.

There are also some scenarios in which MTU numbers may be higher than expected because a new anonymousId or userId may be generated for a single user.

- `Analytics.reset()` was called
- If the user already had a userId assigned (meaning `user_id` was NOT `null`), and then `identify(xxx)` was called with a different `userId` value
- If the `anonymousId` is changed manually, using `analytics.user().anonymousId(xxx)`
- If the user goes from one page to another, and each page has a different domain - in this case the second page will have a different `anonymousId`
- If the user goes from one page to another and the second page exists within an iFrame
- If the user visits the website from a different browser - each browser generates a different `anonymousId`
- If the user visits the page incognito
- If the user clears their cookies

If you suspect there is an implementation error causing your MTU number to rise contact us immediately and we are happy to help you resolve the issue.
