---
title: GWEN (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 6411f979382d3759292d739f
redirect_from:
  - "/connections/destinations/catalog/actions-cloud-gwen"
---

{% include content/plan-grid.md name="actions" %}

[GWEN](https://gwenplatform.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} offers powerful gamification tools and insights to convert, engage, and retain users. With GWEN it has never been easier to understand your users behavior patterns and build better performing products with both speed and accuracy.

This destination is maintained by Insert Coin AB. For any issues with the destination, [contact their Support team](mailto:support@gwenplatform.com).

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for "GWEN" and select **GWEN (Actions)**
3. Find the Destinations item in the left navigation, and click it.
4. Click **Configure GWEN (Actions)** and select an existing Source to connect to GWEN (Actions).
5. Enter the following Basic Settings:

- **Name**: A name to help you identify this destination in Segment.
- **API Key**: Created under ["IAM & Billing" > "API Tokens"](https://app.gwenplatform.com/iam/api-token){:target="_blank"} in the GWEN Admin App

## Send events to GWEN

A GWEN event consists of two properties, a `type` and a `data` attribute.

By Default, this destination maps the Segment event type (for example, track or identify) to the `type` of the GWEN event being sent, and the Segment `properties` object to the GWEN `data` attribute. You can modify this configuration to futher customize the events you send to GWEN.

You can read more about [Event Reporting here](https://app.gwenplatform.com/docs/event-reporting){:target="_blank"}.

{% include components/actions-fields.html %}
