---
rewrite: true
title: Appcues Destination
hide-cmodes: true
---
[Appcues](https://www.appcues.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) adds an experience layer to your product, so you can build user onboarding, NPS surveys, or feature announcements in minutes instead of in weeks. The Appcues JavaScript Destination is open-source. You can browse the code [on GitHub](https://github.com/appcues/analytics.js-integration-appcues).

f you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!


## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Appcues" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your `Appcues Id` (for client-side integration functionality) and/or your `API Key` (for server-side integration functionality) from the [Appcues account page](https://my.appcues.com/account).

### Server

Although our JavaScript destination is the traditional way to use Appcues as part of the Segment platform, Appcues also offers a server-side destination with Segment, which is useful if you'd like to send user profile or event data to Appcues from another Segment partner service. The server-side destination may be used simultaneously with the JS destination. In many cases, this is preferable to routing all data through the JS destination.

The user profile and event data received through Appcues' server-side Segment destination can be used to segment
and target Appcues flows, just like data received from the JS destination.

For example, using the server-side destination, customer profile and event data could be directed from a CRM tool into the Appcues platform. This data could then be used for content targeting and user segmentation in the Appcues content editor, alongside data from our `analytics.js` destination.

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```javascript
analytics.page();
```

Appcues will check to see if a user qualifies for an experience every time the page changes. When you first call `page` using `analytics.js`, `Appcues.start` checks if there are any current flows for the user and loads them if necessary.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('12091906-01011992', {
  name: 'John Joe',
  email: 'john.doe@example.com'
});
```

When you `identify` on `analytics.js`, we call `Appcues.identify`. This is the preferred method of using and targeting on user properties.

To get the most out of Appcues, you should send as much user data as possible in the `identify` call. Properties are used to target experiences to specific users and personalize content. Most Appcues customers send properties that fall into a few groups:
  * Properties to target based on broad classifications such as `role` or `userType`
  * Properties to personalize Appcues content such as `name`, `firstName` or `company`
  * Properties to target based on user lifecycle such as `createdAt` (date) or usage metrics such as `numTasksComplete`

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track("step_activated", {
  property: "test"
});
```

Calls to `analytics.track` invoke `Appcues.track` as well. This will send event data to the Appcues platform, where it can be used for future content triggering.

### Sending Appcues events to other Segment partner services

Want to read Appcues events in your 3rd party analytics or marketing automation tool? Appcues supports sending events to other tools on the Segment platform. These events will be sent as track calls to the other destinations you've turned on. A partial list of Appcues content lifecycle events that can be tracked:
  * `flow_shown`
  * `flow_skipped`
  * `flow_finished`
  * `flow_form_submission`
  * `form_field_submission`
  * `step_activated`
  * `hotspots_shown`
  * `hotspots_skipped`
  * `hotspots_completed`
  * `hotspot_activated`
  * `coachmarks_shown`
  * `coachmarks_completed`

To enable this feature, go to the Integrations Settings in Appcues and click "Activate" under the Segment integration.

### Whitelisted Domains

By default, Appcues will target based on the path of the URL. So if we created an Appcues experience and targeted it to `/integrations`, it would appear wherever the embed script is installed with that URL path, like appcues.com/integrations and my.appcues.com/integrations. If your `analytics.js` script is installed on multiple domains (e.g. your marketing site and your web app), you should use Appcues whitelisted domains when targeting your experience.


## Delete

When you trigger a user deletion using our [Privacy features](/docs/privacy/user-deletion-and-suppression/), we will forward a delete notification to Appcues, who will act on the notification. You can read more about how Appcues handles deletion requests [in their docs here.](https://docs.appcues.com/article/443-gdpr-deletion-api)
