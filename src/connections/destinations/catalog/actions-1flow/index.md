---
title: 1Flow Web (Actions) Destination
id: 656773f0bd79a3676ab2733d
hidden: true
beta: true
---

{% include content/plan-grid.md name="actions" %}

[1Flow](https://1flow.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a leading in-app user survey and messaging platform for Mobile app and SaaS businesses.


1Flow is an easy-to-use, yet powerful in-app survey and messaging software. Using 1Flow, you can reach users in-the-moment while they are interacting with your website or mobile app, to collect highly contextual user insights that help you improve your product offering and customer experience.

When you use the 1Flow Web (Actions) Destination, Segment loads the [1Flow SDK](https://1flow.ai/docs/install-sdk/javascript){:target="_blank"} for you. The 1Flow library enables you to track and identify user events on your website and interact with the 1Flow messenger window.

{% include content/ajs-upgrade.md %}

## Getting started

1. From Segment, navigate to  **Connections > Catalog**, then select **Destinations**.
2. Search for and select **1Flow  Web (Actions) Destination**.
3. Select the web source that will send data to 1Flow web (Actions) and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/source/catalog/libraries/website/javascript).
4. On the **Settings** tab, input your 1Flow **PROJECT API KEY** and other destinations settings.
5. Follow the step in the Destinations Actions docs to [customizing mappings](/docs/connections/destinations/action/#customizing-mappings).
6. Enable the destination and configured mappings.

{% include components/actions-fields.html %}

## Supported methods

### Identify

The 1Flow destination will automatically ingest a User ID and any values sent over your Identify spec as [traits](https://docs.1flow.ai/install-sdk/javascript#de21ec0a453d443b88ca4bc1b12dc6bf){:target="_blank"}, as long as session capture is enabled in 1Flow.

When you call Segment's Identify method, it will be equivalent to `logUser` of 1Flow. Identify calls that do not have a User ID value are not sent to 1Flow.
- Segment's `userId` is `userID` in 1Flow 
- Segment's `traits` is `userDetails` in 1Flow

### Track

The 1Flow destination automatically ingests any user actions tracked over your Track spec as [events](https://docs.1flow.ai/install-sdk/javascript#d19201d97efa4ea4b81be6a351709332){:target="_blank"}, as long as session capture is enabled in 1Flow.


## Troubleshooting

### Requests to 1Flow return a 404 response

If you are seeing 404 responses in your browser's network tab, you've likely encountered one of two issues:

- You set the wrong App ID on the 1Flow Actions (Web) destination settings page.
- You set the wrong Regional Data Hosting value on the 1Flow Actions (Web) destination settings page. 1Flow gates regional endpoints by plan level, so you may not have access to EU data hosting.