---
title: Segment Profiles
hide-boilerplate: true
hide-dossier: false
id: 639c2dbb1309fdcad13951b6
---
The Segment Profiles destination allows you to send your warehouse data back to Segment to create and update Profiles that can then be accessed through Profile API and activated within [Twilio Engage](/docs/engage). This destination is only compatible with Reverse ETL warehouse sources.

**The Segment destination can be connected to Reverse ETL warehouse sources only.**

> info ""
> The Segment Profiles (Actions) destination is in beta and is in active development. Some functionality may change before it becomes generally available.

## Getting started

### Pre-requisites
To use this destination you should have an active Segment Profiles Space.
If you have not yet created a Segment Profiles Space, follow the steps in the Segment Profiles on [Getting started](/docs/profiles/#getting-started).

### Connect and configure the Segment Profiles destination
1. From the Segment web app, navigate to **Reverse ETL > Destinations**.
2. Click **Add Destination** in top-right corner.
3. Select the Segment Profiles destination, click **Next**, and select the warehouse source that will send data to the Segment destination. If you have not set up a warehouse source, follow the steps in the Reverse ETL documentation on [Getting started](/docs/reverse-etl/#getting-started).
4. On the **Settings** tab, name your destination, input the Write Key from the source created above, select an endpoint region, and click **Save Changes**. It is recommended to configure and enable all mappings before enabling the Segment destination.
5. On the **Mappings** tab, click **Add Mapping**. Select a data model and the API call type you want to map. Fill in the fields on screen to create the desired mappings, and click **Create Mapping** to complete the configuration. Repeat this step to configure multiple mappings. 
6. Enable the configured mapping(s).
7. On the **Settings** tab, click the **Enable Destination** toggle, and then click **Save Changes** to enable the Segment destination.

{% include components/actions-fields.html settings="true"%}

## FAQ & Troubleshooting

### API Calls and MTUs
WIP
