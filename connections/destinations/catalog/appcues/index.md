---
title: Appcues
redirect_from: '/integrations/appcues'
---
Our Appcues destination code is [open-source on
GitHub](https://github.com/appcues/analytics.js-integration-appcues)
if you want to check it out.

**Use Cases**

* [Send in-app notifications based on topics of interest with Appcues](https://segment.com/recipes/in-app-notifications-topic-interest-appcues/)
* [Trigger in-app notifications based on user intent to upgrade with Appcues and ClearBrain](https://segment.com/recipes/trigger-upgrade-notifications-appcues-clearbrain/)

## Getting Started

To install Appcues via Segment, add your Appcues ID and API key
(found on your [Appcues account page](https://my.appcues.com/account))
to your Segment destinations settings.


## JS and Server-side Destinations

Appcues provides two Segment destinations.

The first, our JavaScript destination with Segment's `analytics.js`,
is the traditional way to use Appcues as part of the Segment platform.
Calls to `analytics.identify` are used to indicate user properties,
and `analytics.page` or `analytics.track` will send events to the
Appcues API.

Separately, Appcues offers a server-side destination with Segment,
which is useful if you'd like to send user profile or event data to
Appcues from another Segment partner service.  (Note that this is
different from [Segment Sources](/sources/), which
allows you to bring multiple sources of Segment data together in your
own data warehouse.)

The server-side destination may be used simultaneously with the JS
destination.  In many cases, this is preferable to routing all data
through the JS destination.

The user profile and event data received through Appcues'
server-side Segment destination can be used to segment
and target Appcues flows, just like data received from the JS
destination.

For example, using the server-side destination, customer profile and
event data could be directed from a CRM tool into the Appcues platform.
This data could then be used for content targeting and user
segmentation in the Appcues content editor, alongside data from
our `analytics.js` destination.

## JavaScript API

## Identify

When you `identify` on `analytics.js`, we call `Appcues.identify`.  This
is the preferred method of using and targeting on user properties.

To get the most out of Appcues, you’ll want to send as much user data
as possible in the identify call. Properties are used to target experiences
to specific users and personalize content. Most Appcues customers send
properties that fall into a few groups:

* Properties to target based on broad classifications such as `role`
  or `userType`
* Properties to personalize Appcues content such as `name`, `firstName`
  or `company`
* Properties to target based on user lifecycle such as `createdAt` (date)
  or usage metrics such as `numTasksComplete`

## Track

Calls to `analytics.track` invoke `Appcues.track` as well.  This will
send event data to the Appcues platform, where it can be used for future
content triggering.

## Page

Appcues will check to see if a user qualifies for an experience every time
the page changes. When you first call `page` using `analytics.js`,
`Appcues.start` checks if there are any current flows for the user and
loads them if necessary.

## Appcues Features

### Whitelisted Domains

By default, Appcues will target based on the path of the URL. So if we
created an Appcues experience and targeted it to `/integrations`,
it would appear wherever the embed script is installed with that URL path,
like appcues.com/integrations and my.appcues.com/integrations. If your
analytics.js script is installed on multiple domains (e.g. your marketing
site and your web app), you’ll want to use Appcues whitelisted domains when
targeting your experience.

### Sending Appcues events to other Segment partner services

Want to read Appcues events in your 3rd party analytics or marketing
automation tool? Appcues supports sending events to other tools on the
Segment platform. These events will be sent as track calls to the other
destinations you’ve turned on.  A partial list of Appcues content
lifecycle events that can be tracked:

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

To enable this feature, go to the Integrations Settings in Appcues and
click “Activate” under the Segment integration.

{% include content/integration-foot.md %}
