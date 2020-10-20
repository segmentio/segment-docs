---
title: Evergage Destination
rewrite: true
---

[Evergage](https://www.evergage.com/) offers a cloud-based platform that empowers digital marketers to increase engagement and conversions through real-time 1:1 personalization. The `analytics.js` Evergage Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-evergage).

This document was last updated on October 29, 2018. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Evergage" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter your Evergage Account Key (this is the subdomain you use to login to Evergage with; if your account is "testaccount.evergage.com", then use "testaccount");
4. Finally, enter the name of the Evergage Dataset you want data to flow to (by default this is "engage");

## Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```

A `userId` is required on all `identify` calls sent to {{ integration.name}}. When you call `identify` Segment will call both `setUser` and `setUserField` in the [Evergage library](https://doc.evergage.com/display/EKB/Send+Data+to+Evergage) to insert both the `userId` and corresponding user traits into {{ integration.name}}.

## Group
If you're not familiar with the Segment Specs, take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does. An example call would look like:

```javascript
analytics.group('companyId123', {
  name: 'Segment'
});
```

A `groupId` is required on all `group` calls sent to {{ integration.name}}. When you call `group` Segment will call both `setCompany` and `setAccountField` in the [Evergage library](https://doc.evergage.com/display/EKB/Send+Data+to+Evergage) to insert both the `groupId` and corresponding group traits into {{ integration.name}}.

## Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track('Email Opened', {
  name: 'John Doe',
  email: 'john.doe@example.com'
});
```

When you call `track` Segment triggers `trackAction` in Evergage and will pass any properties with the event.
