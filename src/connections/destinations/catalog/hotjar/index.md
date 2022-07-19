---
title: Hotjar Destination
rewrite: true
id: 5913371070a3e552b9561a4e
---
[Hotjar](https://hotjar.com){:target="_blank"} enables you to understand your users in a fast and visual way. Hotjar offers a full set of tools such as analytics, page heatmaps, session recordings, feedback tools, and more. Hotjar provides you with everything your team needs to uncover user insights and make the right product changes.

The Segment Hotjar Destination allows you to get started with Hotjar and its core APIs. You can:
1. Automatically install the [Hotjar Tracking Code](https://help.hotjar.com/hc/en-us/articles/115011639927){:target="_blank"}.
2. Automatically send [user attributes](https://help.hotjar.com/hc/en-us/articles/360033640653-Identify-API-Reference){:target="_blank"} to Hotjar by connecting your Segment `identify` calls with Hotjar's own Identify API.
3. Automatically send [custom events](https://help.hotjar.com/hc/en-us/articles/4405109971095-Events-API-Reference){:target="_blank"} to Hotjar by connecting your Segment `track` calls with Hotjar's own Events API.

Knowing who your users are and what they're doing unlocks more advanced filtering and targeting capabilities across all of Hotjar's tools, helping you find meaningful insights faster.

## Getting Started

{% include content/connection-modes.md %}

1. Navigate to **Connections** and click **Add Destination** From the Segment web app.

2. Search for *Hotjar* in the Catalog, select it, and choose the JavaScript source you want to connect the destination to.

3. Add your **Hotjar Site ID** to your Destination settings. You can find this ID in Account settings > Sites & Organizations.

Your changes will appear in the Segment CDN after 45 minutes, and then Analytics.js will start to asynchronously load Hotjar's tracking snippet and send data. If you're already using Hotjar, remove Hotjar's snippet from your code.

## Identify

The Hotjar destination will automatically ingest a User ID and any values sent over your Identify spec as [traits](/docs/connections/spec/identify/#traits), as long as session capture is enabled in Hotjar.

Identify calls that do not have a User ID value will not be sent to Hotjar.

### Nested values or lists

Currently, the Hotjar Identify API **does not** support ingesting values passed as nested objects or lists over your identify Spec:

```js
"traits": {
    "name": "Peter Gibbons",
    "email": "peter@example.com",
    "plan": "premium",
    "logins": 5,
    "address": {
      "street": "6th St",
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94103",
      "country": "USA"
    }
```

In the example above, Hotjar rejects all the values in the `address` field.

## Track

The Hotjar destination automatically ingests any user actions tracked over your Track spec as [events](/docs/connections/spec/track/), as long as session capture is enabled in Hotjar.

### Event properties

Currently, the Hotjar Events API **does not** support ingesting event properties:

```js
analytics.track("Experiment Viewed", {
  experiment_id: "1234",
  experiment_name: "new_upsell_UX"
  variation_id: "1234b"
  variation_name: "variant"
});
```

In the example above, Hotjar only ingests the event name, `Experiment Viewed`. All of its event properties are rejected.
