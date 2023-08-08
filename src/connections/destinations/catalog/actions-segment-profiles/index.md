---
title: Segment Profiles Destination
hide-boilerplate: true
hide-dossier: false
id: 639c2dbb1309fdcad13951b6
---
The Segment Profiles destination allows you to send your warehouse data back to Segment to create and update [Profiles](/docs/profiles/) that can then be accessed through [Profile API](/docs/profiles/profile-api/) and activated within [Twilio Engage](/docs/engage). 

> success "Source compatibility"
> This destination supports connections from Reverse ETL warehouse sources, and is not compatible with other source types.

## Getting started

### Create a Profile space

To use this destination, you must have an active Segment Profile space. If you have not yet created a Segment Profile space, please follow the steps in the [Profiles Onboarding Guide](/docs/profiles/quickstart/).

### Create a Public API token

To enable the Segment Profiles destination to send data to an existing Profile space, provide an authentication token for the Segment Public API. See [Segment's Public API documentation](https://docs.segmentapis.com/tag/Getting-Started#section/Get-an-API-token){:target="_blank"} for information on how to create a token. The token must include Source Admin permissions. You will need this token in the below steps.

### Connect and configure the Segment Profiles destination

1. From the Segment web app, navigate to **Reverse ETL > Destinations**.
2. Click **Add Destination**.
3. Select the Segment Profiles destination, click **Next**, and select the warehouse source that will send data to the Segment Profiles destination. If you have not set up a warehouse source, follow the steps in the Reverse ETL documentation on [Getting started](/docs/reverse-etl/#getting-started).
4. On the **Settings** tab, name your destination, input the Public API token created above, select an endpoint region, and click **Save Changes**. It is recommended to configure and enable all mappings before enabling the Segment Profiles destination.
5. On the **Mappings** tab, click **Add Mapping**. Select a data model and the API call type you want to map. Identify calls will create and update user profiles and Group calls will create and update account profiles. Fill in the fields on screen to create the desired mappings, and click **Create Mapping** to complete the configuration. Repeat this step to configure multiple mappings. 
6. Enable the configured mapping(s).
7. On the **Settings** tab, click the **Enable Destination** toggle, and then click **Save Changes** to enable the Segment Profiles destination.

{% include components/actions-fields.html settings="true"%}

## FAQ & Troubleshooting

### API Calls and MTUs
The Segment Profiles destination is not subject to API call or MTU costs. Any users or accounts created and updated by the Segment Profiles destination will not count towards your API call or MTU usage.

### Error loading options from Segment Profiles
Make sure you have a Public API token in your settings. If the Segment Profiles Destination doesn’t have a Public API token in the settings, the **Select Mappings** section fails to find any Profile (Engage) Spaces, which means you can't set your mappings. 

### Succesful syncs but no changes on profiles
Make sure that the Endpoint Region setting matches the region of your workspace. If the region is properly set, and changes are still not applied, [contact Segment](https://segment.com/help/contact/){:target="_blank"}.
