---
title: Google Ads Conversions Destination
strat: google
hide-boilerplate: true
hide-dossier: false
id: 60ae8b97dcb6cc52d5d0d5ab
---

The Google Ads Conversions destination enables you to upload offline conversions and conversion adjustments to Google Ads in a privacy safe way. With this server-side destination, you can upload conversions to the [Google Ads API](https://developers.google.com/google-ads/api/docs/conversions/overview){:target="_blank"} and tie them to a user's online click or phone call. In addition, you can improve the accuracy of your conversion measurement by sending conversion enhancements, restatements, and retractions.

## Getting started
1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Google Ads Conversions” in the Destinations Catalog, and select the destination.
3. Click **Configure Google Ads Conversions** in the top-right corner of the screen.
4. Select the source that will send data to Google Ads Conversions and follow the steps to name your destination.
5. On the **Settings** tab, enter your account-level Conversion ID and/or Customer ID and click **Save**.
6. On the **Settings** tab, authenticate with Google using OAuth. Click **Connect to Google Ads Conversions**. Follow the prompts to authenticate using OAuth, with a Google account that is a member of your Google Ads account.
7. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).

> warning "Upload Enhanced Conversion (Legacy) Action Deprecation"
> Google plans to sunset the legacy API, so Segment will migrate your instance to the new API in the beginning of 2024. No action is required at this time, and Segment will reach out to communicate next steps prior to the migration. 
>
> With this change, the Upload Enhanced Conversions (Legacy) Action **will no longer be available**. Please use the "Upload Click Conversion", "Upload Call Conversion", and "Upload Conversion Adjustment" actions, which sends data to the new Google Ads API.

> info ""
> When you use the "Upload Enhanced Conversion (Legacy)" action, Segment sends data to the legacy Enhanced Conversions API. To authenticate into the legacy API and send enhancement data, Segment needs your Conversion ID and Conversion Label. 
> 
> The Conversion ID is a global setting because it's an account-level ID that's the same for all conversion actions in your Google Ads account. 
> 
> The Conversion Label is unique to each conversion action and is therefore configured per mapping. Find the Conversion ID and Conversion Label in your Google Ads account using the instructions in the article [Google Ads conversions](https://support.google.com/tagmanager/answer/6105160?hl=en){:target="_blank"}.

> info ""
> When you use the "Upload Click Conversion", "Upload Call Conversion", and "Upload Conversion Adjustment" actions, Segment sends data to the new Google Ads API. 
> 
> To authenticate into the Google Ads API, Segment needs your Customer ID and Conversion Action ID. The Customer ID is a global setting because it's an account-level ID that's the same for all conversion actions in your Google Ads account. The Conversion Action ID is unique to each conversion action and is  configured per mapping. The Conversion Action ID can only be found in the browser URL of your given conversion action under the `ctId` parameter. For example, if the URL is `https://ads.google.com/aw/conversions/detail?ocid=00000000&ctId=576882000`, your Conversion Action ID is `576882000`.


> info ""
> Conversion ID, Conversion Label, Customer ID, and Conversion Action ID should always be different values.

{% include components/actions-fields.html settings="true"%}

## FAQ and troubleshooting

### Enhanced conversions

[Enhanced conversions](https://support.google.com/google-ads/answer/11062876){:target="_blank"} is a feature that can improve the accuracy of your conversion measurement and unlock more powerful bidding. It supplements your existing conversion tags by sending hashed, first-party conversion data from your website to Google in a privacy safe way. You can use the "Upload Conversion Adjustment" action to send enhancements to the Google Ads API. In order to send enhanced conversions, you must record first conversions using the standard Google Ads Conversion tag (Gtag). Segment offers a [Google Ads (Gtag) destination](/docs/connections/destinations/catalog/google-ads-gtag/) so you can use your existing Segment implementation to activate Gtag. Enhancements can be sent to web conversion actions that have **Turn on enhanced conversions** by API enabled.

Conversions tracked by other means, such as importing goals from Google Analytics, are not eligible for enhancement.

> info ""
> To send enhancements for conversions that are initially tracked with Gtag, an Order ID (Transaction ID) must be implemented in the Gtag **and** the same Order IDs must be sent with the corresponding enhancement data. This is required for Google to successfully process your enhancement data.

### Enhanced conversions for leads

[Enhanced conversions for leads](https://developers.google.com/google-ads/api/docs/conversions/upload-identifiers){:target="_blank"} allows you to use hashed, first-party user-provided data from your website lead forms for offline lead measurement. When you upload your leads, the provided hashed information is used to attribute back to the Google Ad campaign. In order to send enhanced conversions for leads, you can use the "Upload Click Conversion" action. Instead of sending GCLID, send an email address or phone number of the user for Segment to hash and send to Google Ads. 

### Refreshing access tokens

When you use OAuth to authenticate into the Google Ads Conversions destination, Segment stores an access token and refresh token. Access tokens for Google Ads Conversions expire after one hour. Once expired, Segment receives an error and then uses the refresh token to fetch a new access token. This results in two API requests to Google Ads Conversions, one failure and one success.

Because of the duplicate API requests, you may see a warning in Google for unprocessed conversions due to incorrect or missing OAuth credentials. This warning is expected and does not indicate data loss. Google has confirmed that conversions are being processed, and OAuth retry behavior will not cause any issues for your web conversions. Whenever possible, Segment caches access tokens to reduce the total number of requests made to Google Ads Conversions.

### Sending app conversions for incrementality studies (legacy enhanced conversions API only)

The legacy Enhanced Conversions API does not offer standard reporting for app conversions. As such, Google requires that you set up a new web conversion action specifically for the purposes of app incrementality studies. To send app conversions in your incrementality study, use the "Upload Enhanced Conversion (Legacy)" action. Be sure to input the Conversion Label associated with your incrementality study **and** set the App Conversion for Incrementality Study field to `true`. You should create separate web conversion actions in Google Ads for each app event you want to send data for.
