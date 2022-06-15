---
title: Breyta Destination
id: 6241e78214aad278a6322f52
---

[Breyta](https://breyta.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}, CRM as it should be. Breyta is designed to work for you, so you can spend more time closing deals. Get actionable and automatic insights throughout your customer lifecycle.

This destination is maintained by Breyta. For any issues with the destination, [contact the Breyta Support team](mailto:hello@breyta.io).

## Getting started

{% include content/connection-modes.md %} 

1. Login to your [Breyta account](https://app.breyta.io){:target="_blank"}.
2. Go to the Integrations page and click **Add New**.
3. Select the Segment Integration and sign in to your Segment account to grant Breyta access.

## Supported methods

Breyta supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Segment sends Page calls to Breyta as page events. They can be used in Breyta as event sources. You can filter and score users based on which pages they have visited.
```js
analytics.page()
```

### Screen

Segment sends Screen calls to Breyta as screen events. They can be used in Breyta as event sources. You can filter and score users based on which screens they have visited.
```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

### Identify

Segment sends Identify calls to Breyta as an identify event. When you identify a new user, Breyta creates a new User record. If the User already exists, Breyta updates the User’s properties.
```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

### Group

Segment sends Group calls to Breyta as an group event. A group event can create a Group or associate a User to a Group within Breyta.
```js
analytics.group('accountId123', {
	account_id: '12345678',
	name: "ABC Group"
});
```

### Track

Segment sends Track calls to Breyta as a track event. They can be used in Breyta as event sources. You can filter and score users based on which events they have triggered in your app.
```js
analytics.track('Login Button Clicked')
```
