---
title: Insider Audiences (Actions)
id: 643698ffee21b544f6aa756a
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[Insider](https://useinsider.com/integration/segment/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} Growth Management Platform (GMP) helps digital marketers drive growth across the funnel. Insider GMP helps marketers deliver personalized journeys across the web, mobile web, mobile apps, messaging, email, and ad channels using the unified data.

This destination is maintained by Insider. For any issues with the destination, contact the [Insider Support team.](mailto:insiderhelp@useinsider.com){:target="_blank"}

## Getting started

> info "Prerequisites"
> Before connecting to the Insider Audiences (Actions) destination, you must have an Insider Account, Account Name, and a [Unified Customer Database API Key](https://academy.useinsider.com/docs/api-authentication-tokens){:target="_blank"}.

To add the Insider Audiences Destination:

1. From your Segment workspace, navigate to **Connections > Catalog** and select the **Destinations** tab.

2. Search for **Insider Audiences** and select the destination.

3. Click **Add destination**.

4. Select the space in Engage to use as the Source as this destination only supports sending Engage Audiences to Insider.

5. Name your destination on the settings tab.

6. Add the following settings to your Insider Destinations:

   - **Account Name**: Your Insider Account (Partner) Name.
   - **API Key**: Your Unified Customer Database API Key. See how you can generate the API key in the [Insider Academy API Authentication Tokens](https://academy.useinsider.com/docs/api-authentication-tokens#generate-api-key){:target="_blank”} documentation.

7. Click **Save** Changes.

8. In the Mappings tab, click **New Mapping** and select **Sync Engage Audience to Insider**.

9. Go to the Settings tab and enable the destination.

Your Insider destination is now ready to receive audiences, and your segment will start to populate over at Insider Audiences. To use the segment, select Segment Audience Name from your segmentation over at the Insider InOne panel. If you enable track option, Insider also receives the events defined on Segment Panel with the same name.

Be aware that, populating all user information might take a while to process.

{% include components/actions-fields.html %}

## Migration from the classic Insider destination

If you’re already using the Insider (Classic) Destination, you’re not expected to have breaking changes when upgrading to the Insider (Actions) destination. You can configure the new Actions mode destination and connect it to the same source(s) as the Classic destination and manually verify it before fully switching over.
