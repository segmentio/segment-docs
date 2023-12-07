---
title: 1Flow Web (Actions) Destination
id: 656773f0bd79a3676ab2733d
private: true
beta: true
---

[1Flow](https://1flow.ai){:target="_blank"} enables user survey and messaging platform for Mobile app and SaaS businesses. 1Flow is an easy-to-use, yet powerful in-app survey and messaging software.

Using 1Flow, you can reach users in-the-moment while they are interacting with your website or mobile app, to collect highly contextual user insights that help you improve your product offering and customer experience.

The Segment 1Flow Destination allows you to get started with 1Flow and its core APIs. You can:
1. Automatically install the [1Flow SDK](https://docs.1flow.ai/install-sdk/javascript){:target="_blank"}.
2. Automatically send [user attributes](https://docs.1flow.ai/install-sdk/javascript#de21ec0a453d443b88ca4bc1b12dc6bf){:target="_blank"} to 1Flow by connecting your Segment Identify calls with 1Flow's Identify API.
3. Automatically send [custom events](https://docs.1flow.ai/install-sdk/javascript#d19201d97efa4ea4b81be6a351709332){:target="_blank"} to 1Flow by connecting your Segment Track calls with 1Flow's Events API.

Knowing who your users are and what they're doing unlocks more advanced filtering and targeting capabilities across all of 1Flow's tools, helping you find meaningful insights faster.

This destination is maintained by 1Flow. For any issues with the destination, [contact the 1Flow Support team](mailto:support@1flow.app).

## Getting Started

1. From the Segment web app, navigate to **Connections** and click **Add Destination**.

2. Search for *1Flow Web (Actions)* in the catalog, select it, and select the source you want to connect to your 1Flow Web (Actions) destination.

3. Enter your 1Flow **PROJECT API KEY** in the 1Flow Web (Actions) destination settings page. You can find your **PROJECT API KEY**  in your 1Flow "Account settings" page.

Your changes appear in the Segment CDN after approximately 45 minutes, and then Analytics.js starts to asynchronously load 1Flow's tracking snippet and send data.

## Identify

The 1Flow destination will automatically ingest a User ID and any values sent over your Identify spec as [traits](https://docs.1flow.ai/install-sdk/javascript#de21ec0a453d443b88ca4bc1b12dc6bf){:target="_blank"}, as long as session capture is enabled in 1Flow.

Identify calls that do not have a User ID value are not sent to 1Flow.

## Track

The 1Flow destination automatically ingests any user actions tracked over your Track spec as [events](https://docs.1flow.ai/install-sdk/javascript#d19201d97efa4ea4b81be6a351709332){:target="_blank"}, as long as session capture is enabled in 1Flow.

