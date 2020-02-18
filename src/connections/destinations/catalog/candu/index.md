---
title: Candu Destination
rewrite: true
beta: true
---

[Candu](https://www.candu.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the first Editor for your app. Instead of overlaying an experience layer, Candu’s embedded components inherit your style guide, so they look like a native part of your interface. Candu helps you build, iterate, and personalize native onboarding experiences that guide your end-users from basic to expert-level fluency.

This destination is maintained by Candu Labs. For any issues with the destination, please [reach out to their team](mailto:support@candu.ai).

_**NOTE:** The Candu Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on February 18th, 2020. If you are interested in joining their beta program or have any feedback to help improve the YOURINTEGRATION Destination and its documentation, please [let  their team know](mailto:support@candu.ai)!_

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Candu" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Candu Settings page](https://app.candu.ai/settings/workplace).

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does.

An example call would look like:
```js
analytics.page()
```

Page calls will be sent to Candu as a `page` event. You will be able to use `page` events to ensure content is displayed in the right context.

## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/connections/spec/page/) does.

An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```
Screen calls will be sent to Candu as a `screen` event.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does.

An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```
`identify` calls will be sent to Candu as an `identify` event. The `identify` call is used to record the identity of an end-user, which enables you to send them the most relevant content.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does.

An example call would look like:

```js
analytics.track('Clicked Login Button')
```
`track` calls will be sent to Candu as a track event. You will be able to measure how well your content is performing by measuring uplift with any `track` events.
