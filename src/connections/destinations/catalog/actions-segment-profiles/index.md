---
title: Segment Profiles Destination
hide-boilerplate: true
hide-dossier: false
id: 639c2dbb1309fdcad13951b6
---
The Segment Profiles destination allows you to send your warehouse data back to Segment to create and update [Profiles](/docs/unify/) that can then be accessed through [Profile API](/docs/profiles/profile-api/) and activated within [Twilio Engage](/docs/engage). 

> success "Source compatibility"
> This destination supports connections from Reverse ETL warehouse sources, [HubSpot](/docs/connections/destinations/catalog/actions-segment-profiles/hubspot-source), and [Salesforce](/docs/connections/destinations/catalog/actions-segment-profiles/salesforce-source), and is not compatible with other sources.

## Getting started

### Create a Profile space

To use this destination, you must have an active Segment Unify space. If you have not yet created a Segment Unify space, please follow the steps in the [Unify Onboarding Guide](/docs/profiles/quickstart/).

### Connect and configure the Segment Profiles destination

1. From the Segment web app, navigate to **Reverse ETL > Destinations**.
2. Click **Add Destination**.
3. Select the Segment Profiles destination, click **Next**, and select the warehouse source that will send data to the Segment Profiles destination. If you have not set up a warehouse source, follow the steps in the Reverse ETL documentation on [Getting started](/docs/reverse-etl/#getting-started). For information on how to set up HubSpot or Salesforce, see the [Hubspot](/docs/connections/destinations/catalog/actions-segment-profiles/hubspot-source) and [Salesforce](/docs/connections/destinations/catalog/actions-segment-profiles/salesforce-source) direct integration documentation. 
4. On the **Settings** tab, name your destination, select an endpoint region, and click **Save Changes**. It is recommended to configure and enable all mappings before enabling the Segment Profiles destination.
5. On the **Mappings** tab, click **Add Mapping**. Select a data model and the API call type you want to map. Identify calls will create and update user profiles and Group calls will create and update account profiles. Fill in the fields on screen to create the desired mappings, and click **Create Mapping** to complete the configuration. Repeat this step to configure multiple mappings. 
6. Enable the configured mapping(s).
7. On the **Settings** tab, click the **Enable Destination** toggle, and then click **Save Changes** to enable the Segment Profiles destination.

{% include components/actions-fields.html settings="true"%}

## FAQ & Troubleshooting

### API Calls and MTUs
The Segment Profiles destination is not subject to API call or MTU costs. Any users or accounts created and updated by the Segment Profiles destination do not count towards your API call or MTU usage.

### Successful syncs but no changes on profiles
Make sure that the Endpoint Region setting matches the region of your workspace. If the region is correct and you don't see any profile changes, [contact Segment](https://segment.com/help/contact/){:target="_blank"}.

### Can I view samples of events received in Engage by the Segment Profiles Destination?

Records sent to the Segment Profiles Destination are managed through a Unify Spaces' Profile Sources. Samples of these events may be reviewed in a [Profile Source Debugger](/docs/unify/debugger/). For a more comprehensive analysis of the events received in Unify & Engage, consider using [Profiles Sync](/docs/unify/profiles-sync/overview/) connected to your Data Warehouse.
