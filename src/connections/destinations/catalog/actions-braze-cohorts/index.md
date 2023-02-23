---
title: 'Braze Cohorts Destination'
id: 63872c01c0c112b9b4d75412
published: true
beta: true
---

{% include content/plan-grid.md name="actions" %}

[Braze](https://www.braze.com/), formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.The Braze Partner Cohort API is a multi-channel marketing interface that allows advertisers to send over cohorts of users that were generated within the partner’s application. These cohorts are then used to build better campaigns with the most accurate and recent customer data.

This feature will allow the customer to sync Engage audiences quicker and will provide as a great alternative to storing audience subscription into user-level attributes in Braze.

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Braze Segment destination. There's also a page about the [non-Actions Braze destination](/docs/connections/destinations/catalog/braze/). Both of these destinations receives data _from_ Segment. There's also the [Braze source](/docs/connections/sources/catalog/cloud-apps/braze//), which sends data _to_ Segment

## Benefits of Braze Cohorts Destination

Actually there is a lag in syncing large Engage audiences to Braze, when using existing Braze Classic and Actions destinations. This impacts their ability to move quickly with a modern data stack, as well as make quick adjustments to their Braze campaigns to better target users. By building this new destination, It can enable end users to upload audience data to Braze— as a “list” — all in one go, instead of in an event method.

This Destination will help Segment and Braze customers sync Audiences built in Segment Engage to Braze. This will enable customers to sync audiences quicker and help customers manage their rate limits better (100 RPS in Braze Action Destination)


## Getting Started

Before connecting to the Braze Cohorts Destination, you must have a [Braze Dashboard](https://dashboard-01.braze.com/sign_in){:target="_blank"} account and an Ad Account ID.

To add the Braze Cohorts destination:

1. From the Segment web app, navigate to **Engage > Audiences**. Ensure you are in the Engage space you plan to use with Braze Cohorts. Either choose an existing Engage Audience or create a new one. This is the Audience you plan to send to Braze Cohorts.

2. Within the Audience, click **Settings** and copy the Audience Key. You'll need this key later.

3. Navigate to **Engage > Engage Settings** and click **Destinations**. Please ensure you are still in the correct Engage space.

4. Search for “Braze Cohorts” and select the destination.

5. Click **Configure Braze Cohorts**.

6. On the Select Source screen, your Engage space should already be selected as the source. Click **Confirm Source**.

7. On the Destination **Settings** tab, name your destination and authenticate with Braze Cohorts using OAuth.

8. Once authenticated, input your Client Secret key from your [Braze Dashboard](https://dashboard-01.braze.com/sign_in){:target="_blank"} account. Toggle “Enable Destination” on and click  **Save Changes**.

9. Navigate to the **Mappings** tab, click **New Mapping**, and select **Sync Audience**.

10. Under Select mappings, input the Audience Key you copied in Step 2 as the “Segment Engage Audience Key.” Do not change any other defaults. Click **Save** and toggle to enable the mapping.
     * **Note:** User Can be added or removed from Braze Cohorts through ExternalId,DeviceId and User Alias and the priority goes as externalId, deviceId and then userAlias object if all are given.
     * The Audience Key must be manually entered to ensure users in the Engage Audience are sent to the correct Segment in Braze Cohorts. For every Engage Audience you want to send to your Braze Account, a separate **Sync Audience** mapping must be created. You can create up to 50 mappings within an instance of the Braze Cohorts Destination.
     
11. Navigate back to **Engage > Audiences** and click on the Audience from Step 1. 

12. Click **Add Destinations** and select the Braze Cohorts destination you just created. In the settings that appear in the side panel, toggle the **Send Track** option on and do **not** change the Audience Entered/Audience Exited event names. Click **Save Settings**.

The setup is complete and the Audience will start syncing to Braze Cohorts.It will create new cohort(if it's not available) and will add/remove users to/from cohorts accordingly. The Audience appears in your [Braze Cohorts](https://dashboard-01.braze.com/sign_in){:target="_blank"}, account under **Engagement > Segments**.

To sync additional Audiences from your Engage space, create a separate mapping in the Braze Cohorts destination. Navigate to **Connections > Destinations**, search and select the Braze Cohorts destination, and follow Steps 9-11 above.

> info ""
> A user can be added to a Cohort only if the user already exists in Braze. This means that Cohort Destination can work complementary to Braze Action Destination which has features to create users, aliases in Braze.

{% include components/actions-fields.html settings="true"%}

