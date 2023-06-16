---
title: Insider Cloud Mode (Actions)
private: true
hidden: true
id: 643697f531f98a978f414453
versions:
  - name: Insider Destination
    link: /docs/connections/destinations/catalog/insider/
---

{% include content/plan-grid.md name="actions" %}

[Insider](https://useinsider.com/integration/segment/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) Growth Management Platform (GMP) helps digital marketers drive growth across the funnel. Insider GMP helps marketers deliver personalized journeys across the web, mobile web, mobile apps, messaging, email, and ad channels using the unified data.

This destination is maintained by Insider. For any issues with the destination, contact the [Insider Support team.](mailto:insiderhelp@useinsider.com)

{% include content/ajs-upgrade.md %}


## Benefits of Insider (Actions) vs Insider Classic

Insider (Actions) provides the following benefits over the classic Insider destination:

- **Adjustable Mappings**: By using Insider (Actions), you can easily adjust mapping of your events and attributes and map them to Insider events and attributes.
- **Data Consistency: Pre-Built Mappings can help you to integrate Insider faster and ensure data consistency between Insider and Segment platform.**


## Getting started

1. From the Segment web app, click Catalog, then click Destinations.

2. Find the Destinations Actions item in the left navigation, and click it.

3. Click Configure Insider.

4. Select an existing Source to connect to Insider(Actions).

5. Add the following settings to your Insider Destinations

   1. **Account Name:** Your Insider Account (Partner) Name.
   2. **API Key: Your Unified Customer Database API Key, see how you can generate API key from [here](https://academy.useinsider.com/docs/api-authentication-tokens#generate-api-key).**

(delete after reading) The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions.

{% include components/actions-fields.html %}

(delete after reading) Additional Context

Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.


## Migration from the classic Insider destination

If you’re already using Insider (Classic) Destination, you’re not expected to have breaking changes when upgrading to the Insider (Actions) destination. You can configure the new Actions mode destination and connect it to the same source(s) as the Classic destination and manually verify it before fully switching over.
