---
title: Astrolabe Destination
---

[Astrolabe](https://astrolabe.so/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a Revenue Operations Platform built for go-to-market teams to generate pipelines, prioritize, close, and grow accounts. It's a no-code AI-based platform that empowers teams to easily access data, build advanced predictive machine learning models, create efficient workflows, and drive better results without technical expertise.

This destination is maintained by Astrolabe. For any issues with the destination, [contact the Astrolabe Support team](mailto:team@astrolabe.so).

## Getting Started

{% include content/connection-modes.md %}

1. Login to your [Astrolabe workspace](https://console.astrolabe.so/login).
2. Go to the [Connectors page](https://console.astrolabe.so/connectors) and click **Add Connector**.
3. Select the Segment.com Connector and sign in to your Segment account to grant Astrolabe access.

## Supported methods

Astrolabe supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify("userId123", {
  email: "john.doe@example.com",
});
```

Segment sends Identify calls to Astrolabe as an `identify` event. When you identify a new user, Astrolabe creates a new User record. If the User already exists, Astrolabe updates the User's properties.

### Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830,
});
```

Segment sends Group calls to Astrolabe as an `group` event. A `group` event can create an Account, If the Account already exists, Astrolabe updates the Account's properties. A `group` event can also associate a User to an Account within Astrolabe.

### Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track("User Registered", {
  plan: "Pro Annual",
  accountType: "Facebook",
});
```

Segment sends Track calls to Astrolabe as a `track` event.
