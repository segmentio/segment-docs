---
title: MTUs, Throughput and Billing
---

## What is an MTU?

MTU stands for "monthly tracked user".

## What is an API call?

When use Segment to collect your data, you use the Segment Methods (Track, Page, Screen, Identify, Group, and Alias) which collect the data in a structured way, and then send it to `api.segment.io`. If you are using the Segment HTTP API, or sending batched data using a cloud-source, this data also goes through this Segment API endpoint.

Each data blob (with its properties or traits) goes through this endpoint, and is considered an "API call".

## What is throughput?

## How does Segment calculate MTUs?

Segment counts the number of **unique** `userID`s, and then adds the number of **unique** `anonymousId`s that are never associated with a `userID`. Segment counts these IDs over all calls made from all sources in your workspace, over a billing month. Segment only counts each user once per month, even if they perform more than one action or are active across more than one source.

For example, a user might visit your website, and use your mobile app. At first, they would have two `anonymousID`s, one for each platform. However, if they log in during the course of the month, that `anonymousID` is attached to a `userID`.
If the user logs in on _just_ the app, you would still see two MTUs: one `anonymousID` for the website source, and one `anonymousID` with an attached `userID` from the app source.
If the user logs in on _both_ the app and website, they would count as one MTU: two different `anonymousID`s attached to one `userID`.

## How do I see my usage data?

If you have questions about your data usage or how it relates to your bill, log into your Segment workspace, click **Settings > Usage and Billing > Usage**.

The Usage page shows what plan the workspace is on, what data volume that plan includes, and how much data you have already used in the current billing period. If you have used more data volume than your plan includes, the page shows information about how much data is in overage, and what your overage rate is.

Click the billing period dropdown at the top of the page to see a cumulative, daily report of data volumes by source for the current and last five billing periods, and an overview of the last twelve months of data volumes.

## What is the difference between an event and an object?

We know this sounds like a non-sequitur, but understanding events and objects will help you understand how MTUs are calculated.

An event is a data collection triggered in response to a user action: a [Track call](/docs/connections/spec/track/), or a [Page](/docs/connections/spec/page/) or [Screen](/docs/connections/spec/screen/) call if the action was to navigate to a new page. Events take place in a single moment in time, and include a name and **properties**. When an event happens more than once, it creates a new Event record rather than updating an existing one. For example, a user browsing a product catalog might generate several "Product Viewed" events, which might include the product name, price, and category.

This is in contrast to "Objects" which represent a single thing that persists over time and can be updated. Objects have "traits" (instead of properties) which record information about that object, and which can change over time. For example a "user" object could have a trait of "email" which doesn't change often, but could also have a [computed trait](#computed-trait) like `logged_in_last_7_days`.

## MTUs and Cloud sources

If you use [Cloud sources](/docs/connections/sources/about-cloud-sources/) to pull in data from your third party services (in addition to tracking your users with Segment library sources), the data from these cloud apps _might_ increase your MTU counts.

There are two types of cloud sources: **object sources**, and **event sources**. Object sources bring in information about entities, such as a person or company, which can change and have their properties updated over time. Events happen once in time, so while their properties don't change, they can also happen more than once over time.

**Object sources do not increase your MTU count** because the data included doesn't usually contain an IDs. (Object sources _do_ affect your total object count for storage destinations. More on this later.) Some examples of object-sources are [Salesforce](/docs/connections/sources/catalog/cloud-apps/salesforce/), [Zendesk](/docs/connections/sources/catalog/cloud-apps/zendesk/), and [Stripe](/docs/connections/sources/catalog/cloud-apps/stripe/).

**Event sources _can_ create new MTUs** because each event coming from this source includes either a userID or an anonID associated with the event. Some examples of event sources are [Vero](/docs/connections/sources/catalog/cloud-apps/vero/), [Drip](/docs/connections/sources/catalog/cloud-apps/drip/), and [Youbora](/docs/connections/sources/catalog/cloud-apps/youbora/).

> success ""
> **Tip!** You can check the **Collections** section of a cloud-source's Segment documentation to see what type of data it sends. The Collections table lists each data type sent from the cloud source, and if that data is an Object or an Event.


### How does my event and object volume impact my pricing?

Segment allows each workspace to send up to 250 API calls and 250 objects per MTU in your plan. This means that on a plan with a standard 10,000 MTU limit, you can send up to 2.5M API calls + objects per month.

Most customers never hit this limit; business tier plans are eligible for custom limits.


### What is the throughput limit?

Your customer data comes in the form of API Calls (to the Segment tracking methods) and Objects.

- Free and Team plans include up to **250 API Calls and Objects per MTU**.
- **Business plans** are eligible for custom limits.

- The vast majority of Segment customers use well under these limits.


## Why is my MTU count different from what I see in my destinations/other tools?

Comparing numbers between any two end-tools (or between Segment and an end tool) is rarely going to produce identical numbers. Each tool accepts and defines incoming data slightly differently, and they don't always match 100% depending on what types of data the tool accepts.

Contact [Segment Product Support](https://segment.com/help/contact/) for further inquiries about a specific tool you have questions about to ensure there isn't an implementation error.

For example, consider these instances with some of our most popular destinations:

#### Google Analytics

- Google Analytics requires that you include a `url` in any Page calls from a Segment server library. If you don't include a `url`, Google Analytics silently rejects the call, which can reduce the number of users you see in GA.

- Segment does not pass data from [Identify calls](https://segment.com/docs/connections/spec/identify) to Google because it is against Google's terms of service to pass Personally Identifiable Information (PII) to the Google Analytics reporting interface. If you need to pass data from an Identify call, you can set up a [Custom Dimension mapping](/docs/connections/destinations/catalog/google-analytics/#custom-dimensions) to override this.

- To pass the `userID` from your [Identify calls](https://segment.com/docs/connections/spec/identify/) to Google Analytics, go to the Google Analytics destination settings in the Segment web app, locate the **Advanced Google Analytics settings**, and enable **Send User-ID to GA**.

#### Amplitude

By default, Segment doesn't send standard [Page calls](https://segment.com/docs/connections/spec/page/) or [Screen calls](https://segment.com/docs/connections/spec/screen/) to Amplitude, which might reduce the number of unique users Amplitude sees.

To send Page and Screen calls to Amplitude, go to the Amplitude destination settings in the Segment web app, and locate the **Advanced Options** tab.

- Amplitude can only automatically link an anonymous user to their logged-in `userID` if the events or traits come from a device-mode source (such as Analytics.js or a mobile library). If you use a server library or the Segment HTTP API, Amplitude can't _automatically_ connect the anonymous user to their logged-in identity. To work around this so Amplitude can connect the anonymous and identified user, make your Identify call when the user logs in, and include both the `anonymousID` from before the user logged in _and_ the `userID` the user provided at log-in.

- For Amplitude to associate both client-side and server-side activity with the same user, you must pass the same `deviceId` to Amplitude. Otherwise, Amplitude creates two users - one associated with the user's `deviceId` and another user associated with the user's Segment `anonymousId`.


## What might cause a spike in my MTU count?

MTU counts usually increase when you have an increase in users or visitors on instrumented parts of your site or application. Sometimes you'll see a spike when you post a big press release or marketing campaign that leads to an influx of visitors. Another potential cause of big increases is adding tracking to new parts of your site or app, for example a marketing page that didn't have tracking before.

Another possibility is an increase in the number of interactions you have with your users outside your app (emails, help desk, push notifications, etc) that are being imported by cloud sources. Since you are now tracking users you weren't tracking before, your MTU count will go up. If you're already tracking those users elsewhere with Segment, we won't double-count them.

There are also some scenarios in which MTU numbers might be higher than expected because you are (unexpectedly) generating a new `anonymousId` or `userId` for a single user.

- If you are calling `analytics.reset()` more than you did previously. (This generates a new `anonymousID` each time it is called, and detaches any association from a known `userID`. To resolve this with the main user record you need to make an Identify call again.)
- If the user already had a `userId` (meaning `user_id` is NOT `null`), and you then call `identify(xxx)` to overwrite this with a different `userId` value.
- If the `anonymousId` is changed manually, using `analytics.user().anonymousId(xxx)`
- If the user goes from one page to another, and each page has a different domain - in this case the second page will have a different `anonymousId`.
- If the user goes from one page to another and the second page exists within an iFrame
- If the user visits the website from a different browser - each browser generates a different `anonymousId`
- If the user visits the page incognito
- If the user clears their cookies

If you think there might be an implementation error causing your MTU number to rise, contact [Segment Product Support](https://segment.com/help/contact/) as soon as possible so we can help you troubleshoot and resolve the issue.
