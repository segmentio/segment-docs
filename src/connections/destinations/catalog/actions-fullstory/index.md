---
title: FullStory Device Mode (Actions)
hide-boilerplate: true
hide-dossier: false
id: 6141153ee7500f15d3838703
redirect_from:
  - '/connections/destinations/catalog/vendor-fullstory'
versions:
  - name: FullStory (Classic)
    link: /docs/connections/destinations/catalog/fullstory
  - name: FullStory Cloud Mode (Actions)
    link: /docs/connections/destinations/catalog/actions-fullstory-cloud
---
{% include content/plan-grid.md name="actions" %}

[FullStory](https://www.fullstory.com/){:target="_blank"} lets product and support teams easily understand everything about the customer experience. The Segment integration for FullStory helps accurately identify your customers within the FullStory dashboard.

FullStory's device mode Segment integration auto-captures high-fidelity user sessions and allows you to enrich FullStory data by sending user properties, page properties, and custom events from your website so you can apply it to your analysis throughout FullStory. For example, you could build a funnel to analyze drop-off of users who engaged with a certain marketing campaign.

## Benefits of FullStory Device Mode (Actions) vs FullStory Classic

- Greater control over the page properties you send.
- Send events specific to individual pages.
- Select by name the specific user properties or custom events to send.

### Overview

The FullStory device mode destination sends information about your users, pages, and related events to FullStory. It uses the [FullStory Browser API](https://developer.fullstory.com/browser/getting-started/){:target="_blank"}. The recommended presets, ending in "V2", use the most up-to-date version of the [FullStory Browser API](https://developer.fullstory.com/browser/getting-started/){:target="_blank"}. The corresponding non-versioned presets use the [legacy FullStory Browser API](https://developer.fullstory.com/browser/v1/getting-started/){:target="_blank"}.

#### Identify user V2
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like the following:

```javascript
analytics.identify('userId123');
```

When you use an Identify call, Segment calls FullStory's [Set Identity API](https://developer.fullstory.com/browser/identification/identify-users/){:target="_blank"}. Use this to identify a user and set custom attributes which can then be used to search and segment within FullStory.

If an Identify call contains a `userId`, it will be applied to the identifying `uid` in FullStory. All `traits` will be passed along as custom user properties with the exception of `traits.name` which is mapped to `displayName`. If you set an `anonymousId` in Segment, you can search for it under `segmentAnonymousId` in FullStory.

#### Track custom event V2
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like the following:

```javascript
analytics.track('Clicked Button');
```

When you use a Track call, Segment calls FullStory's [Track Event API](https://developer.fullstory.com/browser/capture-events/analytics-events/){:target="_blank"}. Use this to capture more context about your user’s experience on your site.

#### Viewed Page V2
If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/track/) does. An example call would look like the following:

```javascript
analytics.page('Retail Page');
```

When you use a Page call, Segment calls FullStory's [Set Page Properties API](https://developer.fullstory.com/browser/set-page-properties/){:target="_blank"}. Use this to set custom page names and properties about pages your users visit. Either `category` or `name` with be mapped to FullStory's `pageName` property.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Select FullStory Device Mode (Actions), then click **Configure FullStory Device Mode (Actions)**.
4. Select an existing Source to connect to FullStory Device Mode (Actions).
5. Click Customized Setup to start from a blank mapping.

{% include components/actions-fields.html %}

## Migration from the classic FullStory destination

Follow the table below to map your existing FullStory destination configuration to FullStory Device Mode (Actions).

{% include components/actions-map-table.html name="fullstory" %}
