---
title: The Trade Desk CRM Destination
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: false
id: 6440068936c4fb9f699b0645
---


The [Trade Desk](https://www.thetradedesk.com/us){:target="_blank"} gives companies and their partners the power to activate data into their robust data market, making it easy to discover, create and reach valuable audiences. Our integration with the Trade Desk enables you to push first party user data from audiences created in [Twilio Engage](https://www.twilio.com/en-us/engage){:target="_blank"} to The Trade Desk platform to target brand’s first-party audiences more effectively. 

Our integration will allow users to connect their Engage Audiences to The Trade Desk and send PII including email and hashed email. Users will be able to configure their delivery preferences within Segment.

The [Trade Desk](https://www.thetradedesk.com/us){:target="_blank"} destination can be connected to **Twilio Engage sources only**.

## Getting Started

### Credentials from The Trade Desk 

*Before you can activate audiences to The Trade Desk, you must contact your The Trade Desk account manager to sign the UID POC contract. The Trade Desk will then give permission, share your advertiser ID, and secret key to configure your destination.*

Before connecting to The Trade Desk CRM destination, you must have a [Trade Desk Developer Portal](https://api.thetradedesk.com/v3/tokens){:target="_blank"} account and an Advertiser ID.

To add the The Trade Desk CRM destination:

1. Generate a [long lived token](https://partner.thetradedesk.com/v3/portal/api/doc/Authentication#ui-method-create) {:target="_blank"} on [The Trade Desk's Developer Portal](https://api.thetradedesk.com/v3/tokens){:target="_blank"}.

2. From the Segment web app, navigate to **Engage > Audiences**. Ensure you are in the Engage space you plan to use with The Trade Desk. Either choose an existing Engage Audience or create a new one. This is the Audience you plan to send to The Trade Desk.

3. Within the Audience, click **Settings** and copy the Audience Key. You'll need this key later.

4. Navigate to **Engage > Engage Settings** and click **Destinations**. Please ensure you are still in the correct Engage space.

5. Search for “The Trade Desk CRM” and select the destination.

6. Click **Configure The Trade Desk CRM**.

7. On the Select Source screen, your Engage space should already be selected as the source. Click **Confirm Source**.

8. Once authenticated, input your Authentication Token and Advertiser ID from your [The Trade Desk's CRM Data Platform API](https://api.thetradedesk.com/v3/portal/data/doc/DataIntegrateCRMData){:target="_blank"} account. Toggle “Enable Destination” on and click  **Save Changes**.

9. Navigate to the **Mappings** tab, click **New Mapping**, and select **Sync Audience to CRM Data Segment**.

10. Under Select mappings, input the name of the Trade Desk Data Segment you want to sync to. If you do not have a Segment with that name in your Trade Desk Account then Segment will create one for you. Input the Region and PII Type and do not change any other defaults. Click **Save** and toggle to enable the mapping.
     * **Note:** Please only create one mapping for every destination. 

11. Navigate back to **Engage > Audiences** and click on the Audience from Step 1. 

12. Click **Add Destinations** and select The Trade Desk CRM destination you just created. In the settings that appear in the side panel, toggle the **Send Track** option on and do **not** change the Audience Entered/Audience Exited event names. Click **Save Settings**.

The setup is complete and the Audience will start syncing to The Trade Desk.

To sync additional Audiences from your Engage space, create a separate mapping in The Trade Desk destination. Navigate to **Connections > Destinations**, search and select The Trade Desk destination, and follow Steps 9-11 above.

{% include components/actions-fields.html settings="true"%}

## Troubleshooting

### Limitations

1. The Trade Desk requires a minimum of 1500 distinct ids with each batch upload so audiences must have at least 1500 unique users.

2. Segment will do full audience syncs to The Trade Desk every 24 hours.

3. The Trade Desk allows you to have multiple CRM Data Segments with the same name. If you are trying to sync to a Trade Desk Data Segment that is a duplicate, your Segment events will fail.


