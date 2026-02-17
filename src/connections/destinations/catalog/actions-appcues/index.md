---
title: Appcues (Actions) Destination
id: 699409fe37dec8f849615779
---

{% include content/plan-grid.md name="actions" %}

[Appcues](https://www.appcues.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} adds an experience layer to your product so you can build user onboarding, NPS surveys, or feature announcements in minutes instead of weeks.

This destination is maintained by Appcues. For any issues with the destination, [contact their Support team](mailto:support@appcues.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "Appcues".
2. Select **Appcues (Actions)** and click **Add Destination**.
3. Select an existing Source to connect to Appcues (Actions).
4. Go to the [Appcues Settings page](https://studio.appcues.com/settings/account){:target="_blank"} to obtain your credentials:
   - Copy your **Account ID**
   - Generate or copy your **API Key**
   - Generate or copy your **API Secret**
   - Note your **Region** (US or EU)
5. Enter your **Account ID**, **API Key**, **API Secret**, and **Region** in the Appcues (Actions) destination settings in Segment.

{% include components/actions-fields.html %}

## Migration from the classic Appcues destination

If you're currently using the classic Appcues destination to send events server side to Appcues, you can migrate to the Appcues (Actions) destination to take advantage of improved functionality and easier configuration. The Actions destination provides:

- Server-side event delivery with improved reliability
- Support for track, identify, page, screen, and group events through a unified action
- Better control over which events are sent to Appcues
- Consistent behavior across all event types

To migrate:
1. Set up the Appcues (Actions) destination following the steps above
2. Configure the Send action with your desired event mappings
3. Test the integration to ensure events are flowing correctly
4. Once validated, you can disable the classic Appcues destination

## Regional data residency

Appcues supports regional data residency for customers who need to store their data in specific geographic locations. When configuring the destination, select the appropriate region:

- **US**: Data is stored in US-based infrastructure
- **EU**: Data is stored in EU-based infrastructure

Ensure you select the region that matches your Appcues account configuration.
