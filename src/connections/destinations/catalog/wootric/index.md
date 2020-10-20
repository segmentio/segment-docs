---
rewrite: true
title: Wootric Destination
---

[Wootric](https://www.wootric.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the modern customer feedback management platform that brands around the globe use to make experience their competitive advantage.

The Wootric Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-wootric).

This document was last updated on January 23, 2020. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, [contact Wootric Support](mailto:support@wootric.com)!


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Wootric" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Wootric "Account Token".
   You can retrieve this from your **Wootric Settings > Your unique Account Token**. It should look like `NPS-XXXXXXXX`.
4. If you're using Segment's client-side `analytics.js` library, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Wootric's Javascript library onto the page and begins sending data.

### Mobile

1. For mobile implementations additional settings are required. Navigate to your Wootric Settings > API to add in your "Client ID" and "Client Secret" to the respective parts of the Segment Settings UI.

**IMPORTANT:**  The incoming responses and surveys will not be tied to a user until you [identify](https://segment.com/docs/connections/destinations/catalog/wootric/#identify) your user.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123', {
  email: 'hello@example.com',
  createdAt: '2018-08-03T15:28:46.493Z',
  language: 'EN'
});
```

When you call Identify, the user's information is passed to Wootric to check eligibility during survey responses. Segment's special traits recognized as Wootric's standard user profile fields (in parentheses) are:

| Segment Parameter  | Wootric Parameter                   | Description                          |
| ------------------ | ------------------------------------ | ------------------------------------ |
| `email`            | `wootricSettings.email`           | The email of this user.           |
| `createdAt`        | `wootricSettings.created_at` | ISO 8610 timestamp. Wootric requires the timestamp to be rounded to the nearest second so we will make this conversion for you. |
| `language`         | `wootricSettings.language`              | Language for Wootric's Net Promoter Score (NPS). |


## Track

When you call Track, the user’s information is passed along with the event name to Wootric to check eligibility during survey responses.
> note ""
> **Note**: this only works if you enable Targeted Sampling in your Wootric account. The event name must be exactly the same as the one used in the Track call.

## Page

If you aren't familiar with the Segment Spec, you should first read about what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Wootric as a `pageview`.

When you call Page, Wootric tracks the URL, page name, and page path that you are currently on. You can use this information in the Wootric Settings to trigger surveys by using Wootric's Targeted Sampling feature.
Wootric recognizes the following Segment Page properties as the following page fields:

| Segment Parameter  | Wootric Parameter                   | Description                          |
| ------------------ | ------------------------------------ | ------------------------------------ |
| `name`            | `wootricSettings.email`           | The name assigned to this page.           |
| `path`            | `wootricSettings.page_info.path`           | The path portion of the URL of the page. Equivalent to the canonical path which defaults to `location.pathname` from the DOM API. |
