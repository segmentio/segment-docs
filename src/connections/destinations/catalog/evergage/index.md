---
title: Evergage Destination
rewrite: true
---

[Evergage](https://www.evergage.com/) offers a cloud-based platform that empowers digital marketers to increase engagement and conversions through real-time 1:1 personalization. The `analytics.js` Evergage Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-evergage).

> warning "The Evergage destination has been deprecated"
> The Evergage Destination was deprecated on January 8, 2021 and is no longer supported or maintained. It is no longer available in the Segment catalog, but remains available to existing users.

## Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```

A `userId` is required on all `identify` calls sent to {{ integration.name}}. When you call `identify` Segment will call both `setUser` and `setUserField` in the [Evergage library](https://doc.evergage.com/display/EKB/Send+Data+to+Evergage+via+JavaScript) to insert both the `userId` and corresponding user traits into {{ integration.name}}.

## Group
If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```javascript
analytics.group('companyId123', {
  name: 'Segment'
});
```

A `groupId` is required on all `group` calls sent to {{ integration.name}}. When you call `group` Segment will call both `setCompany` and `setAccountField` in the [Evergage library](https://doc.evergage.com/display/EKB/Send+Data+to+Evergage+via+JavaScript) to insert both the `groupId` and corresponding group traits into {{ integration.name}}.

## Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track('Email Opened', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```

When you call `track` Segment triggers `trackAction` in Evergage and will pass any properties with the event.
