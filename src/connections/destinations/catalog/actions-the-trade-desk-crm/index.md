---
title: The Trade Desk CRM Destination
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: false
beta: true
id: 6440068936c4fb9f699b0645
---

[The Trade Desk](https://www.thetradedesk.com/us){:target="_blank"} empowers companies and their partners to leverage data in their expansive data marketplace, facilitating seamless discovery, creation, and engagement with valuable audiences. Segment's integration with The Trade Desk allows you to push first-party user data from audiences created in [Twilio Engage](https://www.twilio.com/en-us/engage){:target="_blank"} to The Trade Desk platform, enhancing targeted reach to brand's first-party audiences.

This integration enables users to effortlessly link their Engage Audiences to The Trade Desk and transmit Personally Identifiable Information (PII), including email addresses and hashed emails. Users have the flexibility to configure their delivery preferences within Segment.

> info ""
> The Trade Desk destination can only be connected to Twilio Engage sources.

## Getting Started

### Obtaining Credentials from The Trade Desk

> info "" 
> Before activating audiences on The Trade Desk, contact your The Trade Desk account manager to sign the UID POC contract. Following this, The Trade Desk will grant permission and share your advertiser ID and secret key for configuring your destination.

Generate a [long-lived token](https://partner.thetradedesk.com/v3/portal/api/doc/Authentication#ui-method-create){:target="_blank"} on [The Trade Desk's Developer Portal](https://api.thetradedesk.com/v3/tokens){:target="_blank"}.

### Connecting The Trade Desk CRM

1. Go to the Segment web app and navigate to **Engage > Audiences**. Ensure you are in the Engage space you intend to use with The Trade Desk. Choose an existing Engage Audience or create a new one. This is the audience you plan to send to The Trade Desk.
2. Access **Engage > Engage Settings** and click on **Destinations**. Confirm that you are in the correct Engage space.
3. Search for **The Trade Desk CRM** and select the destination.
4. Click on **Configure The Trade Desk CRM**.
5. On the **Select Source** screen, your Engage space should already be selected as the source. Click on **Confirm Source**.
6. Once authenticated, enter your Authentication Token and Advertiser ID from your [The Trade Desk's CRM Data Platform API](https://api.thetradedesk.com/v3/portal/data/doc/DataIntegrateCRMData){:target="_blank"} account. Enable the destination by toggling **Enable Destination** and click **Save Changes**.
7. Navigate to the **Mappings** tab, click **New Mapping**, and choose **Sync Audience to CRM Data Segment**.
8. In the **Select mappings** section, input the PII Type and maintain other defaults. Click **Save** and toggle to enable the mapping.
   - If you see a field labeled "Segment Name," please input the same name as the audience you have connected the destination to. Ensure that there is no existing segment in TTD with the identical name.  Additionally, fill out the "Region" field with the geographical region of the CRM data segment, based on the origin of the PII.
   - _**Create only one mapping for every instance.**_
9. Return to **Engage > Audiences** and select the Audience from Step 1.
10. Click **Add Destinations** and choose The Trade Desk CRM destination you just created. In the settings that appear in the side panel, enable the **Send Track** option and **do not** alter the Audience Entered/Audience Exited event names. If you missed providing the Segment Name and Region in step 8, please complete the Audience Settings, specifically the region field, with the geographical region of the CRM data segment based on the origin of the PII. Please note that the Public Beta only supports `US`. Click **Save Settings**.

Setup is now complete, and the audience starts syncing to The Trade Desk.

For syncing additional Audiences from your Engage space, create a separate instance of The Trade Desk CRM Destination.

{% include components/actions-fields.html settings="true"%}

## Public Beta Instructions

* The Segment team needs to enable the feature for your Engage spaces.
* Once you agree to join the public beta, Segment enables all Engage spaces that are part of your Segment workspace.
* New Engage spaces you create won't be automatically enrolled. Contact your Account Team/CSM to get these spaces enrolled.

## Limitations

* An audience must have at least 1500 unique members; otherwise, the destination fails, and the data won't sync.
* Audience sync occurs once per day.
* Audience sync is a full sync.

## FAQs

#### How is the CRM Segment Created?

When connecting your audience from your Engage source to an enabled TTD destination, there's no need to manually create CRM Segments. Segment automatically generates a CRM Segment in your TTD account, mirroring the name of the audience linked to the TTD instance.

#### How does TTD handle emails that don't already exist?

The CRM endpoint maps email addresses into UID2s. If it's a valid email address, TTD generates a UID2 for it. However, if there are no bid requests coming in from the SSP with the specific UID2, then the ID would exist in the segment until it hits the TTL and won't be used when purchasing an impression.

#### What PII format should I send?

The Trade Desk recommends transmitting personally identifiable information (PII) in its original, non-hashed format. TTD's preference is to handle the hashing of the data on their end.
