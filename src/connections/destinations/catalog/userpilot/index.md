---
rewrite: true
title: Userpilot
id: 5ca9d0c1b7119500014381d3
---
[Userpilot](https://userpilot.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps product teams increase user adoption by allowing them to trigger highly personalized onboarding experiences across the user journey. The Segment integration will help you install and send data to Userpilot without added development time.

This destination is maintained by Userpilot. For any issues with the destination, [contact the Userpilot Support team](mailto:support@userpilot.io).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Userpilot" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "App Token" into your Segment Settings UI which you can find from your [Userpilot dashboard](https://app.userpilot.io/settings/setup) within the code snippet that looks like this `<script src = "https://deploy.userpilot.io/73fe57o8.js"></script>` where `73fe57o8` is the value you want to use.

## Page
If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Calling the `page` from `analytics.js` triggers the `userpilot.reload` method that will check for any current running experiences on that page and fetch any new experiences that satisfy the specifed page settings.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Calling `identify` from `analytics.js` will trigger the `userpilot.identify`. We recommend passing as much data as possible to get the most out of Userpilot.

Data passed in the `identify` can be organized under different categories.
* Properties about the user such as `plan` or `userRole` to help targetting a specifc segment.
* Properties to personlize the content of the Userpilot experiences such as `name` or `company`
* Properties to target users based on their lifecycle such as `createdAt`. This will allow you to target newly created accounts or accounts that have yet to achieve a certain feature in the user lifecyle.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Clicked Login Button')
```

Calling `track` from `analytics.js` will trigger `userpilot.track`. This will send events data to Userpilot where it can be used for content triggering.
