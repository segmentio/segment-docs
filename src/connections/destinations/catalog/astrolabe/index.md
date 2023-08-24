---
title: Astrolabe Destination
id: 64d2643196f4937712e54198
---

[Astrolabe](https://astrolabe.so/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a Revenue Operations Platform built for go-to-market teams to generate pipelines, prioritize, close, and grow accounts. It's a no-code AI-based platform that empowers teams to easily access data, build advanced predictive machine learning models, create efficient workflows, and drive better results without technical expertise.

This destination is maintained by Astrolabe. For any issues with the destination, [contact the Astrolabe Support team](mailto:team@astrolabe.so).

## Getting started

### Obtain your Astrolabe API Key

1. Log in to your [Astrolabe workspace](https://console.astrolabe.so/login){:target="_blank"}.
2. Navigate to the [Connectors page](https://console.astrolabe.so/connectors){:target="_blank"} and click **Add Connector**.
3. Choose the **Segment.com Connector**.
4. Name the Connector and click **Continue**.
5. Decide whether to allow or block users with free email providers, then click **Finish**.
6. Copy the **API key** displayed in the dialog window.

### Add Astrolabe Destination to your Segment Workspace

1. In the Segment web app, go to **Connections > Catalog** and then click on the **Destinations** tab.
2. Search for **Astrolabe** and select it.
3. Click **Add destination**.
4. Choose an existing data Source to connect to **Astrolabe**.
5. Give the destination a name that is recognizable.
6. Paste the **Astrolabe API key** (copied earlier).
7. Enable the destination by changing the bottom **Enable Destination** toggle to active.
8. Click **Save Changes**.

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