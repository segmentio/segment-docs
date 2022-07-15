---
title: InMoment (formerly Wootric) Destination
rewrite: true
redirect_from:
  - '/connections/destinations/catalog/wootric/'
  - 'connections/destinations/catalog/inmoment-formerly-wootric'
hide-dossier: true
---

[InMoment (formerly Wootric)](https://www.wootric.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the modern customer feedback management platform that brands around the globe use to make experience their competitive advantage.

The InMoment Destination is open-source. You can browse the code [on GitHub](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations/wootric).

If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, [contact InMoment Support](mailto:support@wootric.com)!


## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "InMoment (Wootric)" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your InMoment "Account Token".
   You can retrieve this from your **InMoment Settings > Your unique Account Token**. It should look like `NPS-XXXXXXXX`.
4. If you're using Segment's client-side `analytics.js` library, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading InMoment's JavaScript library onto the page and begins sending data.

### Mobile

Mobile implementations require additional settings.

Navigate to your **InMoment Settings > API** to add your **Client ID** to the respective part of the Segment Settings UI.

**IMPORTANT:**  The incoming responses and surveys will not be tied to a user until you [identify](/docs/connections/destinations/catalog/wootric-by-inmoment/#identify) your user.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123', {
  email: 'hello@example.com',
  createdAt: '2018-08-03T15:28:46.493Z',
  language: 'EN'
});
```

When you call Identify, the user's information is passed to InMoment to check eligibility during survey responses. Segment's special traits recognized as InMoment's standard user profile fields (in parentheses) are:

| Segment Parameter  | InMoment Parameter                   | Description                          |
| ------------------ | ------------------------------------ | ------------------------------------ |
| `email`            | `wootricSettings.email`           | The email of this user.           |
| `createdAt`        | `wootricSettings.created_at` | ISO 8610 timestamp. InMoment requires the timestamp to be rounded to the nearest second so we will make this conversion for you. |
| `language`         | `wootricSettings.language`              | Language for Net Promoter Score (NPS). |


## Track

When you call Track, the user's information is passed along with the event name to InMoment to check eligibility during survey responses.
> note ""
> **Note**: this only works if you enable Targeted Sampling in your InMoment account. The event name must be exactly the same as the one used in the Track call.

## Page

If you aren't familiar with the Segment Spec, you should first read about what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to InMoment as a `pageview`.

When you call Page, InMoment tracks the URL, page name, and page path that you are currently on. You can use this information in the InMoment Settings to trigger surveys by using InMoment's Targeted Sampling feature.
InMoment recognizes the following Segment Page properties as the following page fields:

| Segment Parameter  | InMoment Parameter                   | Description                          |
| ------------------ | ------------------------------------ | ------------------------------------ |
| `name`            | `wootricSettings.email`           | The name assigned to this page.           |
| `path`            | `wootricSettings.page_info.path`           | The path portion of the URL of the page. Equivalent to the canonical path which defaults to `location.pathname` from the DOM API. |
