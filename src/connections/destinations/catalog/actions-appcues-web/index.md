---
title: Appcues Web (Actions) Destination
id: 698aff47f133996889ade37e
---

{% include content/plan-grid.md name="actions" %}

[Appcues](https://www.appcues.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} adds an experience layer to your product so you can build user onboarding, NPS surveys, or feature announcements in minutes instead of weeks.

When you use the Appcues Web (Actions) destination, Segment loads the Appcues JavaScript library for you. The Appcues library enables you to track your user's events on your website and deliver personalized experiences based on user behavior and properties.

## Benefits of Appcues Web (Actions) vs Appcues Classic

Appcues Web (Actions) provides the following benefits over the classic Appcues destination:

- **Clearer mapping of data.** Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to Appcues.
- **Granular control over data sent.** You can customize the conditions under which the events are sent to Appcues.
- **Full region support.** Setup allows the destination to be configured for US or EU regions.
- **URL detection control.** Configure whether Appcues should automatically detect URL changes or rely solely on Segment page events.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Appcues Web (Actions)**.
4. Click **Add destination**.
5. Select an existing Source to connect to Appcues Web (Actions). The source must use [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/).
6. In the destination settings, enter your **Account ID** from the [Appcues account page](https://my.appcues.com/account){:target="_blank"}.
7. Select the correct **Region** for your Appcues subscription (US or EU).

{% include components/actions-fields.html settings="true" %}

## Additional Information

### Regional Data Hosting

Appcues supports regional data hosting in both US and EU regions. Make sure to select the correct region in your destination settings to match your Appcues subscription.

### URL Detection

The **Enable URL Detection** setting controls how Appcues tracks page changes:

- When disabled (default), Appcues relies on Segment page events to trigger experience checks.
- When enabled, Appcues automatically detects URL changes without requiring explicit page calls.

For most implementations, keep this setting disabled and use Segment's page calls for better control over when experiences are triggered.