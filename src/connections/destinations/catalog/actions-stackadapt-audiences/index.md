---
title: StackAdapt Audiences Destination
hide-boilerplate: true
hide-dossier: true
beta: true
id: 66e96b9f4ee97f41caa06487
redirect_from: "/connections/destinations/catalog/actions-stackadapt/"
---

{% include content/plan-grid.md name="actions" %}

[StackAdapt](https://www.stackadapt.com/){:target="\_blank"} is a leading programmatic advertising platform designed to maximize audience engagement. It enables marketers to run high-performing, cross-channel campaigns through real-time bidding, advanced audience targeting, and powerful data-driven insights.

With the [Engage](/docs/engage/) integration, you can seamlessly sync your Engage Audiences and user data with StackAdapt to refine targeting precision and drive stronger campaign performance.

This destination is maintained by StackAdapt. For any issues with the destination, submit a ticket to [StackAdapt's support team](https://support.stackadapt.com/hc/en-us/requests/new?ticket_form_id=360006572593){:target="\_blank"}.

## Getting started

> info "Getting your StackAdapt GraphQL token"
> If you do not have an existing StackAdapt read and write API key, contact the [StackAdapt team](https://support.stackadapt.com/hc/en-us/requests/new?ticket_form_id=360006572593){:target="\_blank"}.

### Setting up the StackAdapt Audiences destination in Engage

1. In your Segment workspace, navigate to **Connections > Catalog > Destinations**.
2. Search for and select "StackAdapt Audiences".
3. Click **Add Destination**.
4. Select an existing Engage space source to connect to the StackAdapt Audience destination.
5. On the Settings screen, enter a name for your destination.
6. Provide your StackAdapt GraphQL API token.
7. Input the ID of the advertiser you want to sync the audience with. You can [find the advertiser ID in StackAdapt](#finding-the-advertiser-id-in-stackadapt).
8. Toggle the destination on using **Enable Destination**.
9. Click **Save Changes**.

#### Finding the advertiser ID in StackAdapt

In StackAdapt, go to **Execute** (or **Overview**) and click **Advertiser**.
From the **Filter** section, select the advertiser. The advertiser ID appears in the URL after `advertiser=`.

### Sync an Engage Audience

To sync an Engage audience with StackAdapt:

Each Engage audience should only contain profiles that have a valid email address. Profiles missing an email address are not valid on StackAdapt's platform.

1. Go to **Engage > Audiences** and select the audience you would like to sync.
2. Scroll to the destinations section and add the **StackAdapt Audience** destination.
3. Under the **Connection settings** section, enable **Send Identify**.
4. Under **Event settings**, select **Customized Setup** to choose the list of profile traits you want to sync.
   - Add **email** as an identifier.
   - Add traits as needed. Note that you should set up corresponding mappings for the fields in step 9 for the traits selected here if you want them to be imported.
5. Click **Save**.
6. Click on the **StackAdapt Audience** destination under the **Destinations** section.
7. Under the **Matching Mappings** tab, click **Add mapping** and then select **Sync Audience**.
   - **Note**: You don't have to set up both mappings. The mappings will be shared across all audiences that have sync enabled to this destination. You should create a new destination if you wish to use different mappings for different audiences.
8. Define the event trigger: Ensure the Event Type is `Track` or `Identify`.
9. Map fields:
   - (**Required**:) Select a default value for `Marketing Status`.
   - (**Required**:) Confirm that you have a valid source field for `Email`.
   - Select the source field for `Standard User Properties`. Ensure the source field matches the profile traits selected in step 4. You can learn more about the field format by hovering over the info icon of the field.
   - Follow the Destinations Actions documentation to [customize mappings](/docs/connections/destinations/actions/#customize-mappings).

> note "Trait synchronization"
> Both Custom, Computed, and Consent Traits are mapped and included in the initial data synchronization. However, for ongoing updates, please be aware that only Computed Traits will be updated within StackAdapt's Data Hub.

To verify that your audience syncs with StackAdapt, open StackAdapt and navigate to **Audience & Attribution > Customer Data > Profiles**. On the Profiles tab, you should be able to see a list of profiles being synced to the StackAdapt platform.

> info "Syncs can take up to 4 hours"
> It can take up to 4 hours from the time you initiate a sync for profiles to show up in StackAdapt.

To create a StackAdapt audience from your Engage audience:

1. Open StackAdapt and navigate to **Audience & Attribution > Customer Data > Segments**, then click **Create Segment**.
2. Select the advertiser you have synced your audience to.
3. Choose **Profile Properties > Segment** and select **External Audience Name** as the rule.
4. Select a condition and enter the audience name as the filter.
5. Click **Submit** to create the segment.

> info "Audience name format"
> Use the _snake_case_ name of the Segment Engage audience which can be found in **Settings**, shown in the following screenshot.
> ![Image showing sample audience settings tab](./images/audience-example.png)

## Data and privacy

Review [StackAdapt's Data Processing Agreement](https://www.stackadapt.com/data-processing-agreement){:target="\_blank"} to learn more about StackAdapt's privacy and data terms.
