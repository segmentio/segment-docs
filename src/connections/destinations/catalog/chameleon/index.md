---
title: Chameleon Destination
---

Our Chameleon destination code is open-source on GitHub if you want to [check it out](https://github.com/segment-integrations/analytics.js-integration-chameleon).

## Getting started

When you enable the Segment direct destination on the [Chameleon dashboard](https://prehensile.trychameleon.com/integrations) we will immediately start receiving your app's user and event data collected by Segment.

## Identify

This helps you target product tours to specific (segments of) users. You can read more about how to segmentations work in [Chameleon's docs](https://docs.trychameleon.com/docs/user-identification)

At a minimum we suggest sending us:
 - `email`
 - `name`

We recommend sending us properties that you would like to use to segment users into a handful of groups. Some examples of the properties you may wish to use to segment users include:
 - `account role` (admin vs user)
 - `account value` (paid vs free)
 - `account status` (converted vs retained)

Examples of other specific properties you may also wish to send us include:
 - `credit` (# of dollars in account)
 - `respoitory_count` (# of authorized items)
 - `support_requests_count` (# of touchpoints generated)
 - `chats_count` (# of times user reached out for help)

When we know more about your user, we can help you target them more effectively. For example, you could show different tutorials to the account admin and other team members.


## Track
You can send us your app's events for two main reasons:

1. Signal a `conversion` from a product tour (a user successfully completing the action that they were prompted to take with the tour)
2. Trigger a specific product tour _(coming soon)_

Product tours should lead to user actions and so offer the option of tagging each Chameleon product tour with a 'conversion event' that helps you track how successful your tour is. We collect data about each tour (users starting, completing, conversions) and send this back to your preferred analytics provider. Read more about the [analytics Chameleon tracks](https://docs.trychameleon.com/docs/analytics).

## Help
For more information, please refer to [Chameleon's docs](https://docs.trychameleon.com) or [email them](mailto:support@trychameleon.com).
