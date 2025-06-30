---
title: The Trade Desk CRM Destination
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: false
id: 6440068936c4fb9f699b0645
redirect_from: "/connections/destinations/catalog/the-trade-desk-crm/"
---

[The Trade Desk](https://www.thetradedesk.com/us){:target="_blank"} empowers companies and their partners to leverage data in their expansive data marketplace, facilitating seamless discovery, creation, and engagement with valuable audiences. Segment's integration with The Trade Desk allows you to push first-party user data from audiences created in [Twilio Engage](https://www.twilio.com/en-us/engage){:target="_blank"} to The Trade Desk platform, enhancing targeted reach to brand's first-party audiences.

This integration lets users link Engage audiences to The Trade Desk and transmit Personally Identifiable Information (PII), including email addresses and hashed emails. Users have the flexibility to configure their delivery preferences within Segment.

The Trade Desk destination can only be connected to Twilio Engage sources.

> info "The Trade Desk CRM is not compatible with IP Allowlisting"
> For more information, see the [IP Allowlisting](/docs/connections/destinations/#ip-allowlisting) documentation. 

## Getting started

### Obtaining credentials from The Trade Desk

> info ""
> Contact your The Trade Desk account manager to sign the UID POC contract before you activate audiences on The Trade Desk. Afterwards, The Trade Desk will grant permission and share your advertiser ID and secret key for configuring your destination.

Before you begin, generate a [long-lived token](https://partner.thetradedesk.com/v3/portal/api/doc/Authentication#ui-method-create){:target="_blank"} on [The Trade Desk's Developer Portal](https://api.thetradedesk.com/v3/tokens){:target="_blank"}.

### Connecting The Trade Desk CRM

1. Go to the Segment web app and navigate to **Engage > Audiences**. Ensure you are in the Engage space you intend to use with The Trade Desk. Choose an existing Engage Audience or create a new one. This is the audience you plan to send to The Trade Desk.
2. Access **Engage > Engage Settings** and click on **Destinations**. Confirm that you are in the correct Engage space.
3. Search for **The Trade Desk CRM** and select the destination.
4. Click on **Configure The Trade Desk CRM**.
5. On the **Select Source** screen, your Engage space should already be selected as the source. Click on **Confirm Source**.
6. Generate a [long-lived token](https://partner.thetradedesk.com/v3/portal/api/doc/Authentication#ui-method-create){:target="_blank"} on [The Trade Desk's Developer Portal](https://auth.thetradedesk.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dttd-dev-portal%26redirect_uri%3Dhttps%253A%252F%252Fpartner.thetradedesk.com%252Fv3%252Fsignin-oidc%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520email%2520ttdui_refresh%2520offline_access%2520applications%26code_challenge%3DG5xIiN4NLQYS_L9kqCGZyWg678USH1pV6D2Iqu1e1Q8%26code_challenge_method%3DS256%26response_mode%3Dform_post%26nonce%3D638441362885322803.NWFjOTk2NTMtMzkyOS00NmJmLWE3N2YtODZlYzZjNGQxZWQ1M2E3OGI1ZmUtOThmNC00MDA5LWFiNzQtZmZiZGI2OTUzMzMy%26state%3DCfDJ8BBsgv10-z9IvE3EffVp_QCSKM7pxVdw3rv-shU-_OG4utdVslWzvw8nfZ0D8TKi75uKGCMPp2hiM-IBxjjwToGR-ryK13SXlVMOGMxXj_FUEV8nQfnRR1oQN6YZED0-48NhERsQr96xbaz6a_pVR_z5OZWgQ6RR9MBMUkHYF5tFp651wtbno-7ES1-zsje7hCqzFMTAVV_qAoNur-f8MGkMdw7oSAOQmoYOW4zV2w6SIMLSIOkUvariDC9EAAVPYTjonQdieo2V0rYscC-aVG6U8ASV3yqJc6RmnGRUEVnKHPt-ZZcvy9PHA2-Et04QlGwz6b-buRbNXd3v1E6zuMC5F7dxcT3otr5TQ4yMuC1JA5VRxT4c1tFON2lY4jtxKuyQIQs5N3a59eFc1wGdUSo%26x-client-SKU%3DID_NETSTANDARD2_0%26x-client-ver%3D6.10.0.0){:target="_blank"}. 
7. After authenticating, enter your Authentication Token and Advertiser ID from your [The Trade Desk's CRM Data Platform API](https://api.thetradedesk.com/v3/portal/data/doc/DataIntegrateCRMData){:target="_blank"} account. Enable the destination by toggling **Enable Destination** and click **Save Changes**.
8. Navigate to the **Mappings** tab, click **New Mapping**, and choose **Sync Audience to CRM Data Segment**.
9. In the **Select mappings** section, input the PII Type and maintain other defaults. Click **Save** and toggle to enable the mapping.
   - **Create only one mapping for every instance.**
   - If any of the emails stored in your Engage audience are already in a hashed format, please specify the [PII type](#what-pii-format-should-i-send) as `Hashed Email.` Failure to do so results in The Trade Desk categorizing the hashed records as invalid during the ingestion process. 
10. Return to **Engage > Audiences** and select the audience from Step 1.
11. Click **Add Destinations** and choose The Trade Desk CRM destination you just created. In the settings that appear in the side panel, enable the **Send Track** option and **do not** alter the Audience Entered/Audience Exited event names. Fill out the audience settings, specifically the region field, with the geographical region of the CRM data segment based on the origin of the PII (US, EU, or APAC). Click **Save Settings**.

Setup is now complete, and the audience starts syncing to The Trade Desk.

To sync additional Audiences from your Engage space, create a separate instance of The Trade Desk CRM Destination.

> info "Mapping tester availability"
> The Mapping Tester isn't available for this destination. Since this destination requires batched events for activation, testing can only be performed end-to-end with a connected source.

{% include components/actions-fields.html settings="true"%}


## Limitations

* An audience must have at least 1500 unique members; otherwise, the destination fails, and the data won't sync. 
* Audience attempts to sync once per day.
* Audience sync is a full sync.

## FAQs

#### How is the CRM Segment Created?

When connecting your audience from your Engage source to an enabled TTD destination, there's no need to manually create CRM Segments. Segment automatically generates a CRM Segment in your TTD account, mirroring the name of the audience linked to the TTD instance.

#### How does TTD handle emails that don't already exist?

The CRM endpoint maps email addresses into UID2s. If it's a valid email address, TTD generates a UID2 for it. However, if there are no bid requests coming in from the SSP with the specific UID2, then the ID would exist in the segment until it hits the TTL and won't be used when purchasing an impression.

#### What PII format should I send?

The Trade Desk recommends transferring Personally Identifiable Information (PII), like email addresses, in their original, non-hashed format, as The Trade Desk normalizes and hashes any PII in their program. 

If you store your emails in plain text, select a "PII Type" of `Email`.

If your data contains hashed email addresses, select a "PII Type" of `Hashed Email`. 

When you select `Hashed Email` as your PII Type, Segment completes the following steps on your behalf: 
- Plain text email addresses are normalized and hashed as needed for The Trade Desk.
- SHA256 hashed email addresses are hex base64 encoded. 
- Base64 encoded emails are sent directly to The Trade Desk without additional processing.

For more information about The Trade Desk's recommendations for PII, see the [PII Normalization and Hash Encoding](https://partner.thetradedesk.com/v3/portal/data/doc/DataPiiNormalization){:target="_blank”} documentation.
