---
title: Braze Cohorts Destination
id: 63872c01c0c112b9b4d75412
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: false
---

[Braze](https://www.braze.com/){:target="_blank"} is an engagement platform that empowers growth by helping marketing teams build customer loyalty through omni-channel customer experiences. The Braze Cohort API is a multi-channel marketing interface that allows you to import cohorts of users into Braze. These cohorts can be used to build better campaigns with the most accurate customer data.

Segment's Braze Cohorts destination syncs Engage audiences to Braze as cohorts. This is a more scalable alternative to storing audience subscription in user-level attributes in Braze. It also is more efficient as audiences are uploaded as a list, as opposed to individual events.

## Getting started

Before connecting to the Braze Cohorts destination, you must have a [Braze](https://dashboard-01.braze.com/sign_in){:target="_blank"} account and an Ad Account ID. 

_(Optional)_: You can create a [cohort in Braze](https://www.braze.com/docs/partners/data_and_infrastructure_agility/customer_data_platform/segment/segment_engage/#step-4-create-a-braze-segment-from-the-engage-audience){:target="_blank"} before setting up the Braze Cohorts destination. If you don't create a cohort in advance, the Braze Cohorts destination creates one on your behalf. 

To connect the Braze Cohorts destination:

1. From the Segment web app, navigate to **Engage > Audiences**. Ensure you are in the Engage space you plan to use with the Braze Cohorts destination. Either choose an existing Engage Audience or create a new one. This is the Audience you plan to send to Braze as a cohort.

2. Within the Audience, click **Settings** and copy the Audience Key. You'll need this key later.

3. Navigate to **Engage > Engage Settings** and click **Destinations**. Please ensure you are still in the correct Engage space.

4. Search for “Braze Cohorts” and select the destination.

5. Click **Configure Braze Cohorts**.

6. On the Select Source screen, your Engage space should already be selected as the source. Click **Confirm Source**.

7. On the Destination **Settings** tab, name your destination and authenticate with Braze Cohorts using OAuth.

8. Once authenticated, input your Client Secret key from your [Braze Dashboard](https://dashboard-01.braze.com/sign_in){:target="_blank"} account. Toggle “Enable Destination” on and click  **Save Changes**.

9. Navigate to the **Mappings** tab, click **New Mapping**, and select **Sync Audience**.

10. Under Select mappings, input the Audience Key you copied in Step 2 as the “Segment Engage Audience Key.” Do not change any other defaults. Click **Save** and toggle to enable the mapping.
     * **Note:** Users can be added or removed from cohorts through `ExternalId`, `DeviceId`, or the `UserAlias` object. The priority is `ExternalId`, then `DeviceId`, and finally `UserAlias` if all are provided.
     * The Audience Key must be manually entered to ensure users in the Engage Audience are sent to the correct cohort in Braze. For every Engage Audience you want to send to Braze, a separate **Sync Audience** mapping must be created. You can create up to 50 mappings within an instance of the Braze Cohorts destination.
     * Create the mapping with trigger conditions: `Event Name` is `Audience Entered/Exited` and `Event Property` `audience_key` is `<audience_key>`. Hardcode the audience key in the "Segment Engage Audience Key" field of the mapping. 
     
11. Navigate back to **Engage > Audiences** and click on the Audience from Step 1. 

12. Click **Add Destinations** and select the Braze Cohorts destination you just created. In the settings that appear in the side panel, toggle the **Send Track** option on and do **not** change the Audience Entered/Audience Exited event names. Click **Save Settings**.

The setup is complete and the Audience will start syncing to Braze Cohorts. Segment will create a new cohort (if one does not already exist for the given Audience Key) and add/remove users to/from the cohort accordingly. The Audience appears in your [Braze account](https://dashboard-01.braze.com/sign_in){:target="_blank"}, account under **Engagement > Segments**.

To sync additional Audiences from your Engage space, create a separate mapping in the Braze Cohorts destination. Navigate to **Connections > Destinations**, search and select the Braze Cohorts destination, and follow Steps 9-11 above.

If you are creating multiple mappings in one Braze Cohorts destination, Segment recommends clearing the default subscription for all your mappings from `Event Name is Audience Entered or Event Name is Audience Exited` to `Event Property audience_key is <your_audience_key>`, replacing `<your_audience_key>` with the Audience Key copied as per step 2 above.

> info ""
> A user can only be added to a cohort if the user already exists in Braze. This means that the Braze Cohorts destination should be used in parallel with the [Braze Cloud Mode (Actions) destination](/docs/connections/destinations/catalog/braze-cloud-mode-actions/) or the [Braze Web Mode (Actions) destination](/docs/connections/destinations/catalog/braze-web-device-mode-actions/), both of which can create users in Braze.

{% include components/actions-fields.html settings="true"%}

### Supplementing audience payloads

Event payloads sent using Computed Traits and Audiences will only contain the computed trait or audience key in question, in addition to the user identities `userId`, `anonymousId` and `email`. If you need supplemental fields from user profiles to map to Braze, consider using an Insert Function with the Engage Profile API. Using the Profile API, you can pull a user's traits from your Engage space within your insert function code before the event hits the destination. You can then use these traits to enrich the event payload sent to the destination.

When dealing with event payloads transmitted through Computed Traits and Audiences, keep in mind that these payloads typically include only the specific computed trait or audience key in question in addition to user identities such as `userId` and `anonymousId`, as well as `email` if available. View [event destinations](/docs/engage/using-engage-data/#event-destinations) for more information.

If you need to include additional fields from user profiles into your mappings, you can achieve this by using an [insert function](/docs/connections/functions/insert-functions/) with the [Engage Profile API](/docs/unify/profile-api/). With the Profile API, you can retrieve the traits associated with a user from your Engage space within your insert function code, all before the event reaches the Braze Cohorts destination. 

### Braze Device ID

If you would like to use the `Device ID` mapping for the Cohort Destination you will need to ensure you have captured the Braze device_id, which is not the same as the Segment device_id. Braze has some methods (linked below) that customers can use to capture the Braze device_id for use in the above workaround:
- [Swift method](https://braze-inc.github.io/braze-swift-sdk/documentation/brazekit/braze/deviceid/)
- [Android method](https://braze-inc.github.io/braze-android-sdk/kdoc/braze-android-sdk/com.braze/-i-braze/device-id.html)
- [Web method](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html#getdeviceid)
