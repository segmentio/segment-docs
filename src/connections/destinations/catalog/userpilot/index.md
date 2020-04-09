---
rewrite: true
title: Userpilot
---
[Userpilot](https://userpilot.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps product teams increase user adoption by allowing them to trigger highly personalized onboarding experiences across the user journey. The Segment integration will help you install and send data to Userpilot without added development time.

This destination is maintained by Userpilot. For any issues with the destination, please [reach out to their team](mailto:support@userpilot.io).

_**NOTE:** The Userpilot Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on April 18, 2019. If you are interested in joining their beta program or have any feedback to help improve the Userpilot Destination and its documentation, please [let  their team know](mailto:support@userpilot.io)!_


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Userpilot" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "App Token" into your Segment Settings UI which you can find from your [Userpilot dashboard](https://app.userpilot.io/settings/setup) within the code snippet that looks like this `<script src = "https://deploy.userpilot.io/73fe57o8.js"></script>` where `73fe57o8` is the value you want to use.

## Page
If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Calling the `page` from `analytics.js` triggers the `userpilot.reload` method that will check for any current running experiences on that page and fetch any new experiences that satisfy the specifed page settings.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Calling `identify` from `analytics.js` will trigger the `userpilot.identify`. We recommend passing as much data as possible to get the most out of Userpilot.

Data passed in the `identify` can be organized under different categories.
* Properties about the user such as `plan` or `userRole` to help targetting a specifc segment.
* Properties to personlize the content of the Userplot experiences such as `name` or `company`
* Properties to target users based on their lifecycle such as `createdAt`. This will allow you to target newly created accounts or accounts that have yet to achieve a certain feature in the user lifecyle.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Calling `track` from `analytics.js` will trigger `userpilot.track`. This will send events data to Userpilot where it can be used for content triggering.
