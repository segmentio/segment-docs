---
title: Google Enhanced Conversions Destination
strat: google
hide-boilerplate: true
hide-dossier: false
id: 60ae8b97dcb6cc52d5d0d5ab
---

The Google Enhanced Conversions destination enables you to improve the accuracy of your conversion measurement. You can supplement existing conversion tags by sending first-party customer conversion data from your website, such as email address, to Google Ads. Segment hashes this data and sends it in a privacy-safe way. Google matches hashed data with signed-in Google accounts to attribute the conversion to ad events, such as clicks or views. To learn more about Google Enhanced Conversions, see Google's documentation [About enhanced conversions](https://support.google.com/google-ads/answer/9888656?hl=en-GB){:target="_blank"}.

> warning "Before you begin"
> Enable Enhanced Conversions in your Google Ads account. For each Conversion, specify in the settings that you will use the Enhanced Conversions API:
> 1.  When you log in to Google Ads, make sure you are in [Expert Mode](https://support.google.com/google-ads/answer/9520605?hl=en){:target="_blank"}.
> 2. Click **Tools & Settings** in the top bar, and select **Conversions** from the dropdown. Select the website **Conversion Action** you want Segment to log to.
> 3. Expand the tab for **Enhanced conversions**. Enable **Turn on enhanced conversions**. Under "To start, select how you want to set up enhanced conversions", select **API**.
> 
> When you authenticate your Segment workspace with your Google Account, use a Google Account that is a member of your Google Ads account.

## Getting started
1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Google Enhanced Conversions” in the Destinations Catalog, and select the destination.
3. Click **Configure Google Enhanced Conversions** in the top-right corner of the screen.
4. Select the source that will send data to Google Enhanced Conversions and follow the steps to name your destination.
5. On the **Settings** tab, enter the Conversion ID and click **Save**. Find the Conversion ID in your Google Ads account using the instructions in the article [Google Ads conversions](https://support.google.com/tagmanager/answer/6105160?hl=en){:target="_blank"}. You'll follow these same instructions to get the Conversion Label, which you'll need when you set up your first Mapping.
6. On the **Settings** tab, authenticate with Google using OAuth. Click **Connect to Google Enhanced Conversions**. Follow the prompts to authenticate using OAuth, with a Google login that is a member of the Google Ads account with Enhanced Conversions enabled.
7. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).

> info ""
> The Conversion ID is a global setting because it's an account-level ID that's the same for all conversion actions in your Google Ads account. The Conversion Label is unique to each conversion action and is therefore configured per Mapping.

{% include components/actions-fields.html content1=conv_label section1="postConversion" content2=test_mapping section2="postConversion" %}

## FAQ & Troubleshooting

### Conversion Tracking with Gtag

To use Google Enhanced Conversions, you must record conversions using the standard Google Ads Conversion tag (Gtag). After a conversion is recorded, you can send hashed first-party data through Segment's Google Enhanced Conversions destination for up to 24 hours after the conversion. Segment offers a [Google Ads (Gtag) destination](/docs/connections/destinations/catalog/google-ads-gtag/) so you can use your existing Segment implementation to activate Gtag.

Conversions tracked by other means, such as importing goals from Google Analytics, are not eligible for Google Enhanced Conversions.

### Refreshing Access Tokens

When you use OAuth to authenticate into the Google Enhanced Conversions destination, Segment stores an access token and refresh token. Access tokens for Google Enhanced Conversions expire after one hour. Once expired, Segment receives an error and then uses the refresh token to fetch a new access token. This results in two API requests to Google Enhanced Conversions, one failure and one success.

Because of the duplicate API requests, you may see a warning in Google for unprocessed conversions due to incorrect or missing OAuth credentials. This warning is expected and does not indicate data loss. Google has confirmed that conversions are being processed, and OAuth retry behavior will not cause any issues for your web conversions. Whenever possible, Segment caches access tokens to reduce the total number of requests we make to Google Enhanced Conversions.

### Sending App Conversions for Incrementality Studies

The Google Enhanced Conversions API does not offer standard reporting for app conversions at this point. As such, Google requires that you set up a new web conversion action specifically for the purposes of app incrementality studies. To send app conversions in your incrementality study, be sure to input the Conversion Label associated with your incrementality study **and** set the App Conversion for Incrementality Study field to `true`. You should create separate web conversion actions in Google Ads for each app event you want to send data for.
