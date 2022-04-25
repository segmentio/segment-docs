---
rewrite: true
title: Moesif API Analytics Destination
id: 5ce828fe272bf500019d9dbc
---
[Moesif API Analytics](https://www.moesif.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps you drive API adoption, usage, and retention. With Moesif, track your customer journey from initial ad click to first API call while identifying at-risk customers struggling to integrate with your APIs.

The [Moesif SDKs and API gateway plugins](https://www.moesif.com/implementation?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) are open-source and support REST, GraphQL, and other APIs.

This destination is maintained by Moesif. For any issues with the destination, [contact the Moesif team](mailto:support@moesif.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Moesif" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the Moesif "API Key" into the destinations settings in the Segment App. You can find these by going to 
 your [Moesif account](https://www.moesif.com) and navigating to the extensions settings.
4. Once integrated, Segment data shows up in Moesif in a few seconds.

> tip ""
> **Tip**: You can use Segment's [Replay feature](/docs/guides/what-is-replay/) to sync historical events sent through Segment into your Moesif app.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('userId123', {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      company: {
          id: '67890',
          plan: 'Free'
      }
});
```

Segment sends `identify()` calls to Moesif as [user updates](https://www.moesif.com/docs/getting-started/users/#the-update-user-endpoint?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) which you can see in the _Users_ section in Moesif. If you set `traits.company.id` on the user, Moesif associates them with a company. The integration maps user fields as follows:

|Segment Field|Moesif Field|
|-------------|------------|
|`userId`|`user_id`|
|`traits`|`metadata`|
|`traits.company.id`|`company_id`|

The integration handles Segment [reserved traits](/docs/connections/spec/identify/#traits) like `email` and `firstName`. It maps [automatically-collected fields](/docs/connections/spec/common/#context-fields-automatically-collected) like campaign information and IP address.

## Track
If you haven't had a chance to review our spec, take a look tounderstand what the [Track](/docs/connections/spec/track/) method does. An example call would look like:

```
analytics.track('Login Button Clicked')
```

Segment sends `track()` calls to Moesif as [user actions](https://www.moesif.com/docs/getting-started/user-actions/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) which you can see in the _Events_ section in Moesif. The integration maps event fields as follows:

|Segment Field|Moesif Field|
|-------------|------------|
|`event`|`action_name`|
|`properties`|`metadata`|
