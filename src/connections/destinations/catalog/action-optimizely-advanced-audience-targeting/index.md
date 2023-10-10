---
title: Optimizely Advanced Audience Targeting Destination
id: 64edeb2bee24614fe52ede34
beta: true
---

{% include content/plan-grid.md name="actions" %}

[Optimizely Advanced Audience Targeting](https://optimizely.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target=”blank”} allows you to sync your Segment Engage audiences to Optimizely for targeting with Web Experimentation audiences, Feature Experimentation audiences, and CMS Visitor Groups.

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
2. Click on the Destinations Actions tab and search for **Optimizely Advanced Audience Targeting**.
3. Click on the **Configure Optimizely Advanced Audience Targeting** tile.
4. Select your **Engage Space** as a source. Note that this destination will only work when an Engage Space is configured as a Source.
5. Click **Confirm Source**
6. Within the **Settings** tab paste your ODP token into the **API Key** field, select your region, enable the integration and click **Save Changes**
7. Click into the **Mappings** section, then click **New Mapping**, then click on the **Sync Audience** tile.
8. In section 3 **Select Mappings** ensure the user identifier you are targeting with your Advanced Audience Targeting integration is mapped to the Optimizely User ID field.
9. Click the Save button to save the Action.
10. Enable the Action by toggling the Status to **Enabled**
11. Click back to the **Settings** tab and enabled the Destination by Toggling the **Enable Destination** toggle to “On”, then click “Save Changes”.

{% include components/actions-fields.html %}

**Notes for Using the Destination**

- Ensure the Advanced Audience Targeting integration is configured in your Optimizely Products so that you can access your connected audiences from Segment Engage. Documentation:

- If connecting your Segment Engage audiences to **Optimizely Web Experimentation** ensure the user id mapped to the Optimizely User ID in the Destination mappings area is an identifier available on the browser (client side). This will allow Optimizely web to properly check audience membership for visitors included in connected Segment Engage audiences.