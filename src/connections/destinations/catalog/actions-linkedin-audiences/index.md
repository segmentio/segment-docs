---
title: LinkedIn Audiences Destination
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: false
id: 62f435d1d311567bd5bf0e8d
---


LinkedIn Audiences enables advertisers to send Segment Engage Audiences to LinkedIn as Matched Audiences using [LinkedIn's API](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/matched-audiences/matched-audiences){:target="_blank"}.

By using Segment's Engage Audiences with LinkedIn, you can increase traffic and drive conversions with hyper-relevant ads that promote product discovery.

## Getting Started

Before connecting to the LinkedIn Audiences destination, you must have a [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager){:target="_blank"} account and an Ad Account ID. In addition, the user authenticating with LinkedIn must have one of the following LinkedIn ad account roles: `ACCOUNT_BILLING_ADMIN`, `ACCOUNT_MANAGER`, `CAMPAIGN_MANAGER`, or `CREATIVE_MANAGER`.

To add the LinkedIn Audiences destination:

1. From the Segment web app, navigate to **Engage > Audiences**. Ensure you are in the Engage space you plan to use with LinkedIn Audiences. Either choose an existing Engage Audience or create a new one. This is the Audience you plan to send to LinkedIn.

2. Within the Audience, click **Settings** and copy the Audience Key. You'll need this key later.

3. Navigate to **Engage > Engage Settings** and click **Destinations**. Please ensure you are still in the correct Engage space.

4. Search for “LinkedIn Audiences” and select the destination.

5. Click **Configure LinkedIn Audiences**.

6. On the Select Source screen, your Engage space should already be selected as the source. Click **Confirm Source**.

7. On the Destination **Settings** tab, name your destination and authenticate with LinkedIn using OAuth.

8. Once authenticated, input your LinkedIn Ad Account ID from your [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager){:target="_blank"} account. Toggle “Enable Destination” on and click  **Save Changes**.

9. Navigate to the **Mappings** tab, click **New Mapping**, and select **Sync To LinkedIn DMP Segment**.
     * **Note:** Please configure the trigger condition as ("Event Property" "audience_key" "is" "<Audience Key you copied in Step 2>") under **Select events to map and send** column of the mapping.

10. Under Select mappings, input the Audience Key you copied in Step 2 as the “Segment Engage Audience Key.” Do not change any other defaults. Click **Save** and toggle to enable the mapping.
     * **Note:** The Audience Key must be manually entered to ensure users in the Engage Audience are sent to the correct DMP Segment in LinkedIn. For every Engage Audience you want to send to your LinkedIn Ads Account, a separate **Sync To LinkedIn DMP Segment** mapping must be created. You can create up to 50 mappings within an instance of the LinkedIn Audiences destination.

11. Navigate back to **Engage > Audiences** and click on the Audience from Step 1. 

12. Click **Add Destinations** and select the LinkedIn Audiences destination you just created. In the settings that appear in the side panel, toggle the **Send Track** option on and do **not** change the Audience Entered/Audience Exited event names. Click **Save Settings**.

The setup is complete and the Audience will start syncing to LinkedIn. Segment automatically creates a new DMP Segment in LinkedIn and will add or remove users accordingly. The Audience appears in your [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager){:target="_blank"}, account under **Plan > Audiences > Matched**.

To sync additional Audiences from your Engage space, create a separate mapping in the LinkedIn Audiences destination. Navigate to **Connections > Destinations**, search and select the LinkedIn Audiences destination, and follow Steps 9-11 above.

{% include components/actions-fields.html settings="true"%}

## Troubleshooting

### Access & Refresh Tokens
LinkedIn's OAuth access tokens have a time to live (TTL) of 60 days; refresh tokens have a TTL of one year. Segment automatically updates your access token as long as your refresh token is valid. You won't see any errors or interruptions in data delivery if your access token expires while your refresh token is valid.

Upon expiry or revocation of a refresh token, you'll see `Refresh Token Expired` errors in the Delivery Issues section of your LinkedIn Audiences destination **Event Delivery** tab.

Unknown errors from LinkedIn related to OAuth appear as `Oauth Refresh Failed`.

To remedy either error, please navigate to the **Settings** tab of your LinkedIn Audiences destination and select **Reauthorize** under the Connection heading and complete the OAuth flow.
