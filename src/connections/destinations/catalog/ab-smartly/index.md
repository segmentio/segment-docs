---
rewrite: true
title: AB Smartly Destination
---


[A/B Smartly](https://absmartly.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides an on-premise, full-stack experimentation platform for engineering and product teams that do continuous experimentation embedded into their development process. A/B Smartly's real-time analytics helps engineering and product teams ensure that new features will improve the customer experience without breaking or degrading performance and/or business metrics.

This destination is maintained by A/B Smartly. For any issues with the destination, [contact A/B Smartly's Support](mailto:support@absmartly.com).

> note "Note:"
> The A/B Smartly Destination is in beta as the team is actively developing the destination. To join the beta program or to provide feedback to help improve A/B Smartly's Destination and documentation, [contact A/B Smartly's support team](mailto:support@absmartly.com).


## Implementation Prerequisite

A/B Smartly works differently than other Segment destinations. Because A/B Smartly SDKs are used to modify and deliver experiences to users, you must be implement them at a point in your website or app that allows them to make visual modifications for users.

A/B Smartly requires you to integrate the A/B Smartly SDKs natively, before the Segment snippet or implementation.

Even though Segment maps `track`, and in some cases `page` and `screen` events to A/B Smartly’s `track` events, you must implement the snippet on your site to ensure that experiments run.

Segment provides specific implementation details for the A/B Smartly product in the sections below, in addition to details of the out-of-the-box mappings that Segment’s A/B Smartly integration handles transparently.

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "A/B Smartly" in the Destinations Catalog, and select the "A/B Smartly" destination.
3. Choose which Source should send data to the "A/B Smartly" destination.
4. Go to the A/B Smartly dashboard(https://your-org-name.absmartly.com/apikey/list), find and copy the "API key" that you created for segment.
5. Enter the "API Key" in the "A/B Smartly" destination settings in Segment.
6. If the integration requests for an Application name go to your [A/B Smartly dashboard](https://segment.absmartly.com/application/create) and create an Application named "Segment", or whatever you would like to call it. Use that name in the Application field of the integration settings.
7. Add also your A/B Smartly Collector endpoint. It's the same endpoint that you are using in all your A/B Smartly SDKs.
8. Enter the enviroment from your [Environment list](https://segment.absmartly.com/environment/list) that should receive your Segment data. Most likely it will be the production one.
9. And finally a mapping of Segment Identities to [A/B Smartly Units](https://segment.absmartly.com/unit/list). You should map all your Segment indenties that you would like to use in your A/B tests to the units that you already have in A/B Smartly. Check your [unit list on A/B Smartly](https://segment.absmartly.com/unit/list).
10. Optionally go to "Goal Mapping" and start adding the track calls that you would like to see showing up on A/B Smartly as goals. You only need to create a name mapping if the name of the goal on A/B Smartly's platform is different from the name of the track call in Segment.



## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to A/B Smartly as a `pageview` goal. The goal name is`<page_name>_pageview`. The page name is lower-cased and any spaces or special characters are replaced with underscores. For example, a view of the "Home" page triggers the `home_pageview` goal. If the goal doesn't exist in the A/B Smartly web console, it is ignored. 


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to A/B Smartly as a `screenview` goal. The goal name is `<screen_name>_screenview`. The screen name is lower-cased and any spaces or special characters are replaced with underscores. For example, a view of the "Home" screen triggers the `home_screenview` goal. If the goal doesn't exist in the A/B Smartly web console, it is ignored.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to A/B Smartly as a `track` event. A/B Smartly's track calls are the way to track goals. `analytics.track('booking')` is equivalent to an A/B Smartly SDK track call `context.track('booking')`.
