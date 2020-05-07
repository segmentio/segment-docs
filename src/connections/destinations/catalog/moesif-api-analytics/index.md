---
rewrite: true
title: Moesif API Analytics Destination
---

[Moesif API Analytics](https://www.moesif.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps you drive API adoption, usage, and retention. With Moesif, track your customer journey from initial ad click to first API call while identifying at-risk customers struggling to integrate with your APIs.

The [Moesif SDKs and API gateway plugins](https://www.moesif.com/implementation?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) are open-source and support REST, GraphQL, and other APIs.

This destination is maintained by Moesif. For any issues with the destination, please [reach out to their team](mailto:support@moesif.com).

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Moesif" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [Moesif account](https://www.moesif.com) and go to the extensions settings.
4. Once integrated, Segment data shows up in Moesif in a few seconds.

> info ""
> If you would like to sync your past events which were sent through Segment into your Moesif app, you have the option of leveraging Segment's [Replay feature](https://segment.com/docs/guides/what-is-replay/).

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@gmail.com',
      company: {
          id: '67890',
          plan: 'Free'
      }
});
```
Segment `identify()` calls are sent to Moesif as [user updates](https://www.moesif.com/docs/getting-started/users/#the-update-user-endpoint?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) and can be seen under the _Users_ section in Moesif. If `traits.company.id` is set, Moesif associates the user to a company. The integration maps user fields as follows:

|Segment Field|Moesif Field|
|-------------|------------|
|`userId`|`user_id`|
|`traits`|`metadata`|
|`traits.company.id`|`company_id`|

The integration handles Segment [reserved traits](https://segment.com/docs/connections/spec/identify/#traits) like `email` and `firstName`. It maps autocollected fields like campaign information and IP address.

## Track
If you haven’t had a chance to review our spec, please take a look to understand what the [Track](https://segment.com/docs/connections/spec/track/) method does. An example call would look like:

```
analytics.track('Login Button Clicked')
```

Segment `track()` calls are sent to Moesif as [user actions](https://www.moesif.com/docs/getting-started/user-actions/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) and can be seen under the _Events_ section in Moesif. The integration maps event fields as follows:

|Segment Field|Moesif Field|
|-------------|------------|
|`event`|`action_name`|
|`properties`|`metadata`|
