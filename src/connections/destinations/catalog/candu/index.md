---
title: Candu Destination
rewrite: true
beta: true
id: 5c7df2eafeed45000121a49e
---
[Candu](https://www.candu.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the first Editor for your app. Instead of overlaying an experience layer, Candu's embedded components inherit your style guide, so they look like a native part of your interface. Candu helps you build, iterate, and personalize native onboarding experiences that guide your end-users from basic to expert-level fluency.

This destination is maintained by Candu Labs. For any issues with the destination, [contact the Candu Support team](mailto:support@candu.ai).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Candu" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [Candu Settings page](https://app.candu.ai/settings/workplace).

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does.

An example call would look like:
```js
analytics.page()
```

Page calls will be sent to Candu as a `page` event. You will be able to use `page` events to ensure content is displayed in the right context.

## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does.

An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```
Screen calls will be sent to Candu as a `screen` event.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does.

An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```
`identify` calls will be sent to Candu as an `identify` event. The `identify` call is used to record the identity of an end-user, which enables you to send them the most relevant content.

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does.

An example call would look like:

```js
analytics.track('Clicked Login Button')
```
`track` calls will be sent to Candu as a track event. You will be able to measure how well your content is performing by measuring uplift with any `track` events.
