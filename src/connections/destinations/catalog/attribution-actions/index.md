---
title: Attribution (Actions)
---

[Attribution](https://www.attributionapp.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a multi-touch attribution platform that helps marketers measure and optimize the performance of their marketing campaigns across every channel. Attribution traces every visit, conversion, and revenue dollar back to its source, so marketers can understand what's working and where to invest.

This destination is maintained by Attribution. For any issues with the destination, [contact the Attribution Support team](https://docs.attributionapp.com/docs/segment?utm_source=segmentio&utm_medium=docs&utm_campaign=partners).

## Benefits of Attribution (Actions)

Attribution (Actions) provides the following benefits:

- **Flexible mapping**. Map any Segment event to Attribution and customize the conditions under which events are sent.
- **Full event coverage**. Track, Page, Screen, Identify, Group, and Alias are all supported through a single mapping, Attribution is fully Segment Spec compatible.
- **Simple setup**. Connect with just your Attribution Project ID — no SDK changes required.

## Getting started

1. From the Segment web app, navigate to **Connections > Catalog**, then click **Destinations**.
2. Search for **Attribution (Actions)** in the Destinations Catalog and select it.
3. Click **Configure Attribution (Actions)**.
4. Select the source that will send data to Attribution (Actions) and follow the steps to name your destination.
5. On the **Settings** tab, enter your **Project ID**, then save. Segment validates the Project ID with Attribution when you connect. You can find your Project ID in your [Attribution Settings](https://dashboard.attributionapp.com/goto/settings/project-settings){:target="_blank"}.
6. Enable the destination. The **Send Events** preset enables the **Send** mapping for all event types by default, so data starts flowing without additional mapping configuration.

### Connection modes

Attribution (Actions) is a cloud-mode destination and does not offer a device-mode connection. If you're using one of Segment's libraries like Analytics.js, you don't need a device-mode connection.

## Supported methods

Attribution supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to track pageviews on your website to track the source of your traffic. For example:

```js
analytics.page()
```

### Identify

Send [Identify](/docs/connections/spec/identify) calls to identify users in Attribution. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

### Track

Send [Track](/docs/connections/spec/track) calls to track custom events. Each event acts as a conversion in Attribution and can include important properties like `revenue`. For example:

```js
analytics.track('Order Completed', {
  orderId: 'orderId123',
  revenue: 19.50
});
```

### Group

Send [Group](/docs/connections/spec/group) calls to identify accounts or organizations in Attribution. For example:

```js
analytics.group('groupId123', {
  name: 'Initech'
});
```

### Alias

Send [Alias](/docs/connections/spec/alias) calls to tie a user's anonymous ID to their established user ID or merge two existing users. For example:

```js
analytics.alias('previousId', 'userId123')
```
