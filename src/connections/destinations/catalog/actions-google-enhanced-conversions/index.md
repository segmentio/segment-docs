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
> Google plans to sunset the legacy API, leading to the discontinuation of the Upload Enhanced Conversions (Legacy) Action. New subscriptions using the sunsetting Upload Enhanced Conversion (Legacy) Action are **no longer possible**, but existing subscriptions will remain functional. 
>
> Segment recommends users to transition to the "Upload Click Conversion," "Upload Call Conversion," and "Upload Conversion Adjustment" actions, to send data through the new Google Ads API. 
>
> [Use these steps](#migrate-your-upload-enhanced-conversion-legacy-action) to migrate your Upload Enhanced Conversion (Legacy) Action subscriptions. 

{% include components/actions-fields.html settings="true"%}

## Migrate your Upload Enhanced Conversion (Legacy) Action

To migrate from Upload Enhanced Conversion (Legacy) Action to the Upload Conversion Adjustment Action: 

1. Fill out your Conversion ID and Customer ID settings.
2. Fill out the required fields for the Upload Conversion Adjustment Action: 
- Conversion Action ID
- Adjustment Type
3. Replicate as many fields from your original mapping as possible using the table below for reference. Look at the [Upload Conversion Adjustment Action](/docs/connections/destinations/catalog/actions-google-enhanced-conversions/#upload-conversion-adjustment) for more details about each field. 

| Upload Enhanced Conversion (Legacy)| Upload Conversion Adjustment | Default Mapping                      |
|------------------------|----------------------------|--------------------------------------|
| conversion_label       | NOT AVAILABLE          | `$.properties.conversion_label`        |
| email                  |  email_address             | `$.properties.email or $.traits.email or $.context.traits.email` |
| transaction_id         | order_id                    | `$.properties.orderId`                 |
| user_agent             | user_agent                  | `$.context.userAgent`                 |
| conversion_time        | conversion_timestamp      | `$.timestamp `                        |
| value                  | NOT AVAILABLE              |` $.properties.total `                  |
| currency_code          | NOT AVAILABLE              | `$.properties.currency   `             |
| is_app_incrementality  | NOT AVAILABLE              |` false   `                           |
| pcc_game               | NOT AVAILABLE              | `false `                             |
| phone_number           | phone_number                | `$.properties.phone or $.traits.phone` |
| first_name             | first_name                  | `$.properties.firstName or $.traits.firstName` |
| last_name              | last_name                   | `$.properties.lastName or $.traits.lastName` |
| street_address         | street_address              | `$.properties.address.street or $.traits.address.street` |
| city                   | city                       | `$.properties.address.city or ​​$.traits.address.city` |
| region                 | state                      | `$.properties.address.state or $.traits.address.state` |
| post_code              | postal_code                 | `$.properties.address.postalCode or $.traits.address.postalCode` |
| country                | country                     | `$.properties.address.country or $.traits.address.countr`y |
| | gclid                  | Default Not Available        | 
| | adjustment_timestamp   | Default Not Available        | 
| | restatement_value      | Default Not Available        | 
| | restatement_currency_code | Default Not Available     |



## FAQ and troubleshooting

### Conversion ID, Customer ID, and Conversion Action ID should always be different values

Conversion ID and Customer ID are global settings because it’s an account-level ID that’s the same for all conversion actions in your Google Ads account.

The Conversion Action ID is unique to each conversion action and is configured per mapping. The Conversion Action ID can only be found in the browser URL of your given conversion action under the `ctId` parameter. For example, if the URL is `https://ads.google.com/aw/conversions/detail?ocid=00000000&ctId=576882000`, your Conversion Action ID is `576882000`.

### Enhanced conversions

[Enhanced conversions](https://support.google.com/google-ads/answer/11062876){:target="_blank"} is a feature that can improve the accuracy of your conversion measurement and unlock more powerful bidding. It supplements your existing conversion tags by sending hashed, first-party conversion data from your website to Google in a privacy safe way. You can use the "Upload Conversion Adjustment" action to send enhancements to the Google Ads API. In order to send enhanced conversions, you must record first conversions using the standard Google Ads Conversion tag (Gtag). Segment offers a [Google Ads (Gtag) destination](/docs/connections/destinations/catalog/google-ads-gtag/) so you can use your existing Segment implementation to activate Gtag. Enhancements can be sent to web conversion actions that have **Turn on enhanced conversions** by API enabled.

Conversions tracked by other means, such as importing goals from Google Analytics, are not eligible for enhancement.

> info ""
> To send enhancements for conversions that are initially tracked with Gtag, an Order ID (Transaction ID) must be implemented in the Gtag **and** the same Order IDs must be sent with the corresponding enhancement data. This is required for Google to successfully process your enhancement data.

### Enhanced conversions for leads

[Enhanced conversions for leads](https://developers.google.com/google-ads/api/docs/conversions/upload-identifiers){:target="_blank"} allows you to use hashed, first-party user-provided data from your website lead forms for offline lead measurement. When you upload your leads, the provided hashed information is used to attribute back to the Google Ad campaign. In order to send enhanced conversions for leads, you can use the "Upload Click Conversion" action. If possible please inlcude both GCLID and send an email address and/or phone number of the user for Segment to hash and send to Google Ads. 

### Refreshing access tokens

When you use OAuth to authenticate into the Google Ads Conversions destination, Segment stores an access token and refresh token. Access tokens for Google Ads Conversions expire after one hour. Once expired, Segment receives an error and then uses the refresh token to fetch a new access token. This results in two API requests to Google Ads Conversions, one failure and one success.

Because of the duplicate API requests, you may see a warning in Google for unprocessed conversions due to incorrect or missing OAuth credentials. This warning is expected and does not indicate data loss. Google has confirmed that conversions are being processed, and OAuth retry behavior will not cause any issues for your web conversions. Whenever possible, Segment caches access tokens to reduce the total number of requests made to Google Ads Conversions.

