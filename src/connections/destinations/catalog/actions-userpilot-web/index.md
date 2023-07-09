
---
title: Userpilot Web (Actions) Destination
id: <integration_id>
---

{% include content/plan-grid.md name="actions" %}

Userpilot helps product teams deliver personalized in-app experiences to increase growth metrics at every stage of the user journey. When you integrate Userpilot with Segment, you can send your Segment events to Userpilot, which allows you to create more personalized experiences for your users.


This destination is maintained by Userpilot. For any issues with the destination, [contact their Support team](mailto:support@userpilot.co).

{% include content/ajs-upgrade.md %}


## Getting Started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure Userpilot Web (Actions)**.
4. Select an existing Source to connect to Userpilot Web (Actions).
5. Find your Userpilot App Token in the [installation dashboard](https://run.userpilot.io/installation){:target="_blank"}.


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
* Properties to personalize the content of the Userpilot experiences such as `name` or `company`.
* Properties to target users based on their lifecycle such as `createdAt`. This will allow you to target newly created accounts or accounts that have yet to achieve a certain feature in the user lifecyle.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Clicked Login Button')
```

Calling `track` from `analytics.js` will trigger `userpilot.track`. This sends event data to Userpilot where it can be used for content triggering.
