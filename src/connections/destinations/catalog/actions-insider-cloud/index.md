---
title: Insider Cloud Mode (Actions)
id: 643697f531f98a978f414453
versions:
  - name: Insider Destination
    link: /docs/connections/destinations/catalog/insider/
---

{% include content/plan-grid.md name="actions" %}

[Insider](https://useinsider.com/integration/segment/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} Growth Management Platform (GMP) helps digital marketers drive growth across the funnel. Insider GMP helps marketers deliver personalized journeys across the web, mobile web, mobile apps, messaging, email, and ad channels using unified data.

This destination is maintained by Insider. For any issues with the destination, contact the [Insider Support team.](mailto:insiderhelp@useinsider.com){:target="_blank”}

{% include content/ajs-upgrade.md %}

## Benefits of Insider (Actions) vs Insider Classic

Insider (Actions) provides the following benefits over the classic Insider destination:

- **Adjustable Mappings**: By using Insider (Actions), you can map your events and attributes to Insider events and attributes, and easily adjust as needed.
- **Data Consistency**: Pre-Built Mappings can help you to integrate Insider faster and ensure data consistency between Insider and Segment.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.

2. Find the Destinations Actions item in the left navigation, and click it.

3. Click Configure Insider.

4. Select an existing Source to connect to Insider Cloud Mode (Actions) and click **Next**.

5. Give your destination a name and click \*_Create destination_.

6. On the settings page for your destination, add the following settings:

   - **Account Name**: Your Insider Account (Partner) Name.
   - **API Key**: Your Unified Customer Database API Key, see how you can generate API key in the [Insider Academy API Authentication Tokens](https://academy.useinsider.com/docs/api-authentication-tokens#generate-api-key){:target="_blank”} documentation.\*\*

7. Enable your destination and click **Save**.

{% include components/actions-fields.html %}

## Migration from the classic Insider destination

If you’re already using Insider (Classic) Destination, you’re not expected to have breaking changes when upgrading to the Insider (Actions) destination. You can configure the new Actions mode destination and connect it to the same source(s) as the Classic destination and manually verify it before fully switching over.
