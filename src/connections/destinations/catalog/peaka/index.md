---
title: Peaka Destination
id: 651ea97b7982672f1d66b93c
---

[Peaka](https://peaka.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a Zero-ETL platform that connects to any source. With Peak you can ingest high-volume event and streaming data, and replace batch with real-time access.

By integrating Peaka with their Segment workspace, users can designate Peaka as one of their destinations. This means that events such as pages, screens, tracks,
and more send directly to Peaka's Segment data catalog. With this integration, Peaka users can begin querying their product events.

Peaka maintains this destination. For any issues with the destination, [contact the Peaka Support team](mailto:info@peaka.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for **Peaka**
2. Select **Peaka** and click **Add destination**.
3. Choose which source should send data to the Peaka destination.
4. Log in to [Peaka](https://peaka.studio/){:target="_blank"}.
5. Follow the steps in the [Peaka documentation](https://www.peaka.com/docs/integrations/segment/){:target="_blank"} to create your Segment catalog and obtain your **API key**.
6. Enter the **API Key** in the **Peaka** destination settings in the Segment UI.

## Supported methods

Peaka supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Segment sends [Page](/docs/connections/spec/page) calls to Peaka. For example:

```js
analytics.page("Retail Page", "Home");
```

You can see Page event data in your Peaka Catalog under the pages table.

### Screen

Segment sends [Screen](/docs/connections/spec/screen) calls to Peaka. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"
                            properties:@{ @"Feed Type": @"private" }];
```

You can see Screen event data in your Peaka Catalog under the screens table.

### Identify

Segment sends [Identify](/docs/connections/spec/identify) calls to Peaka. For example:

```js
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons",
  email: "peter@example.com",
  plan: "premium",
  logins: 5,
});
```

You can see Identify event data in your Peaka Catalog under the identifies table.

### Track

Segment sends[Track](/docs/connections/spec/track) calls to Peaka. For example:

```js
analytics.track("User Registered", {
  plan: "Pro Annual",
  accountType: "Facebook",
});
```

You can see Track event data in your Peaka Catalog under the tracks table.

### Group

Segment sends [Group](/docs/connections/spec/group) calls to Peaka. For example:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830,
});
```

You can see Group event data in your Peaka Catalog under the groups table.

### Alias

Segment sends [Group](/docs/connections/spec/alias) calls to Peaka. For example:

```js
analytics.alias("507f191e81");
```

You can see Alias event data in your Peaka Catalog under the aliases table.
