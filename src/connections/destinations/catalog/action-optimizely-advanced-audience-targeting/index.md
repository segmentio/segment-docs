---
Optimizely Advanced Audience Targeting Destination
---

{% include content/plan-grid.md name="actions" %}

[Optimizely Advanced Audience Targeting](https://optimizely.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows you to sync your Segment Engage audiences to Optimizely for targeting with Web Experimentation audiences, Feature Experimentation audiences, and CMS Visitor Groups.

This destination is maintained by Optimizely. For any issues with the destination, [contact their Support team](mailto:support@optimizely.com).

{% include content/ajs-upgrade.md %}

## Getting started

**Within your Optimizely Data Platform Account**
1. Navigate to the **App Directory** in the top right (small boxes with + sign icon)
2. Use the autocomplete to find the **Twilio Segment** App
3. Click into the app and click the blue **INSTALL** button in the top left
4. Click the **SETTINGS** tab -> Click **GENERATE** -> and copy the resulting token to your clipboard

**Within your Twilio Segment Account**

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure Optimizely Advanced Audience Targeting**.
4. Select your **Personas** source as the source (The app will not work with any other source)
5. Click **Confirm Source**
6. Within the **Settings** tab paste your ODP token into the **API Key** field, select your region, enable the integration and click **Save**
7. Click into the **Mappings** section and click **New Mapping**
8. In section 3 **Select Mappings** ensure the user identifier you are targeting with your Advanced Audience Targeting integration is mapped to the Optimizely User ID field.

{% include components/actions-fields.html %}

### **Notes for Using the Destination**

- Ensure the Advanced Audience Targeting integration is configured in your Optimizely Products so that you can access your connected audiences from Twilio Segment in your Optimizely Product (Web Experimentation, Feature Experimentation, and CMS Visitor Groups). Documentation:

[Web Experimentation Advanced Audience Targeting](https://docs.developers.optimizely.com/web-experimentation/docs/configure-odp-audience-targeting#integrate-with-other-cdps)

[Feature Experimentation Advanced Audience Targeting](https://docs.developers.optimizely.com/feature-experimentation/docs/optimizely-data-platform-advanced-audience-targeting)

[CMS Visitor Groups Advanced Audience Targeting](https://github.com/unrvld/ODP.VisitorGroups)

- If connecting audiences to **Optimizely Web Experimentation** ensure the user id you map to the Optimizely User ID in the destination mappings area is an identifier available on the browser (client side)
