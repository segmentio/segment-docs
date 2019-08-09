---

---

[Wootric](https://www.wootric.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the AI-powered platform, based on the Net Promoter Score℠ system, for measuring and boosting customer happiness. The {{integration.name}} Destination is open-source. You can browse the code [on GitHub](https://github.com/segment-integrations/analytics.js-integration-wootric).

This document was last updated on October 15, 2018. If you notice any gaps, out-dated information or simply want to leave some feedback to help us improve our documentation, please let us know!


## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for “{{integration.name}}” within the Destinations Catalog and confirm the Source you’d like to connect to.
3. Drop in your {{integration.name}} "Account Token" in Segment's Settings UI. You can retrieve this from your {{integration.name}} Settings > Your unique Account Token is. It should look like "NPS-XXXXXXXX".
4. If you're using Segment's client-side `analytics.js` library, we asynchronously load {{integration.name}}'s Javascript library onto the page and the CDN will be updated in 5-10 minutes.

### Mobile

1. For mobile implementations additional settings are required. Navigate to your {{integration.name}} Settings > API to add in your "Client ID" and "Client Secret" to the respective parts of the Segment Settings UI.

**IMPORTANT:**  The incoming responses and surveys will not be tied to a user until you [identify](https://segment.com/docs/destinations/wootric/#identify) your user.

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```javascript
analytics.page();
```

When you call `page` in the Javascript API, Wootric will log the page visit.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123', {
  email: 'hello@gmail.com',
  createdAt: '2018-08-03T15:28:46.493Z',
  language: 'EN'
});
```

When you call Identify, the user's information is passed to Wootric to check eligibility during survey responses. Segment's special traits recognized as Wootric’s standard user profile fields (in parentheses) are:

| Segment Parameter  | Wootric Parameter                   | Description                          |
| ------------------ | ------------------------------------ | ------------------------------------ |
| `email`            | `wootricSettings.email`           | The email of this user.           |
| `createdAt`        | `wootricSettings.created_at` | ISO 8610 timestamp. Wootric requires the timestamp to be rounded to the nearest second so we will make this conversion for you. |
| `language`         | `wootricSettings.language`              | Language for Wootric's Net Promoter Score (NPS). |
