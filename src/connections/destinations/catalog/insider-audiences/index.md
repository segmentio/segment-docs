## Insider Audiences Destination

{% include content/plan-grid.md name="actions" %}

[Insider](https://useinsider.com/integration/segment/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) Growth Management Platform (GMP) helps digital marketers drive growth across the funnel. Insider GMP helps marketers deliver personalized journeys across the web, mobile web, mobile apps, messaging, email, and ad channels using the unified data.

This destination is maintained by Insider. For any issues with the destination, contact the [Insider Support team.](mailto:insiderhelp@useinsider.com)

success "" Good to know: This page is about the [Actions-framework](https://segment.com/docs/connections/destinations/actions/) Insider Segment Audiences destination. There's also a page about the [non-Actions Insider destination](https://segment.com/docs/connections/destinations/catalog/insider/). Both of these destinations receive data from Segment.

{% include content/ajs-upgrade.md %}


## Getting started

**Prerequisites:**

Before connecting to the Insider Audiences (Actions) destination, you must have an Insider Account, Account Name and a [Unified Customer Database API Key](https://academy.useinsider.com/docs/api-authentication-tokens).

**To Add the Criteo Audiences Destination:**

1. From your Segment workspace, go to **Connections > Catalog** and click **Destinations**.

2. Search for **Insider Audiences** in the **Destinations Catalog** and select the destination.

3. Click **Configure** Insider Audiences.

4. Select the space in Engage to use as the Source as this destination only supports sending Engage Audiences to Insider.

5. On the Settings tab, name your destination.

6. Add the following settings to your Insider Destinations

   1. **Account Name:** Your Insider Account (Partner) Name.
   2. **API Key:** Your Unified Customer Database API Key, see how you can generate API key from [here](https://academy.useinsider.com/docs/api-authentication-tokens#generate-api-key).

7. Click **Save** Changes.

8. In the Mappings tab, click **New Mapping** and select **Sync Engage Audience to Insider**. 

9. Go to the Settings tab and **Enable the destination.**

10. Select your space, and navigate to Engage > Audiences. Select the source audience that you want to send to your Insider Audiences destination.

11. Click Add Destinations and select the Insider Audiences destination you created. In the settings that appear on the right-hand side, toggle

    1. Send Identify → Identify add users to a segment in Insider with the same name as Segment Audiences name.
    2. Send Track → Tracks the Audience changes and records events on Insider User Profile

Your Insider destination is now ready to receive audiences, and your segment will start to populate over at Insider Audiences. To use the segment, select Segment Audience Name from your segmentation over at the Insider InOne panel. If you enable track option, Insider will also receive the events defined on Segment Panel with the same name. 

Be aware that, populating all user information might take a while to process.

{% include components/actions-fields.html %}


## Migration from the classic Insider destination

If you’re already using Insider (Classic) Destination, you’re not expected to have breaking changes when upgrading to the Insider (Actions) destination. You can configure the new Actions mode destination and connect it to the same source(s) as the Classic destination and manually verify it before fully switching over.
