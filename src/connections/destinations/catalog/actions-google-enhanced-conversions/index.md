---
title: Google Ads Conversions Destination
strat: google
hide-boilerplate: true
hide-dossier: false
id: 60ae8b97dcb6cc52d5d0d5ab
hide_action:
  - id: 3daKK91WWi3VqaWhjQGJpY
    name: "Customer Match User List"
  - id: 7vmdP8TJSYA31eRZZoDqN7
    name: "Click Conversion"
  - id: ndcXYK6HoSX6ydB8JdMgaT
    name: "Call Conversion"
  - id: mFUPoRTLRXhZ3sGbM8H3Qo
    name: "Conversion Adjustment"
  - id: h8sh7d7TUJYR1uv6RKZTGQ
    name: 'Upload Enhanced Conversion (Legacy)'
---

The Google Ads destination allows users to upload [conversions](https://developers.google.com/google-ads/api/docs/conversions/upload-clicks){:target="_blank"}, [conversion adjustments](https://developers.google.com/google-ads/api/docs/conversions/upload-adjustments){:target="_blank"}, and [customer match lists](https://developers.google.com/google-ads/api/docs/remarketing/audience-segments/customer-match/get-started){:target="_blank"} in a privacy-safe manner. Marketers can use this integration to re-engage users across Search, Shopping, Gmail, YouTube, and Display by combining conversion data with customer match lists for more effective targeting.

> info "Consent mode"
> Google enforced consent on March 6, 2024 for European Economic Area (EEA) users. Learn more about [consent mode](/docs/connections/destinations/catalog/actions-google-enhanced-conversions/#consent-mode) and how to set it up.

## Getting started

> info ""
> You can connect the Google Ads Conversions Destination to an event source, Reverse ETL source, or Engage space. 

### Prerequisites
* A Google Ads account and the account ID of your Google Ads Account. This should be 10-digits and in XXX-XXX-XXXX format.  
* For sending data to a Google [Customer Match list](https://developers.google.com/google-ads/api/docs/remarketing/audience-segments/customer-match/get-started){:target="_blank"}, you will either need   
  * An [Engage Audience](/docs/engage/audiences/) configured which you can connect to this destination  
  * A Reverse ETL source already set up. If you don’t yet have a Reverse ETL source, follow the instructions in Segment’s [Reverse ETL documentation](/docs/connections/reverse-etl/setup/).

### Connect to Google Ads
1. From the Segment web app, navigate to **Catalog > Destinations**.
2. Search for “Google Ads Conversions” in the Destinations Catalog and select the destination.
3. Click **Add destination**.
4. Select the source that will send data to Google Ads Conversions. 
  * If you select an Engage space, you'll be redirected to Engage to complete the following steps.
  * If you select a Reverse ETL source, you must enter a name for your destination and click **Create destination**.
5. On the **Settings** tab for your Google Ads Conversions destination:
  * Enter your account-level Conversion ID and/or Customer ID and click **Save**.
  * Click **Connect to Google Ads Conversions** to authenticate with Google. Follow the prompts to authenticate using OAuth, with a Google account that is a member of your Google Ads account.
7. Follow the steps in the Destinations Actions documentation to [customize your mappings](/docs/connections/destinations/actions/#customize-mappings).


### Connect to Google Ads Customer Match lists

Segment users can send data to [Google Ads Customer Match](https://developers.google.com/google-ads/api/docs/remarketing/audience-types/customer-match){:target="_blank"} lists using [Engage Audiences](#connect-engage-audiences-to-google-ads-customer-match) or [Reverse ETL](#connect-reverse-etl-to-google-ads-customer-match). 

#### Connect Engage Audiences to Google Ads Customer Match

1. Navigate to the Engage Audience you'd like to connect to Google Ads and click **Add destination**.  
2. Select the instance of Google Ads you added to your Engage space.  
3. Complete your Audience settings.  
4. Disable **Send Identify** and enable **Send Track**.  
    _Optional_: Configure your event settings and opt in to [Trait Enrichment](/docs/engage/trait-activation/trait-enrichment/).  
6. Click **Save**.  
7. Navigate to the destination’s mappings tab and click **View all destination settings**.  
8. Navigate to the Mappings tab.  
9. Click **+ New Mapping**.  
10. Configure your mappings and use the **Show test record** preview toggle to verify your mappings.  
11. Click **Save** and enable your mapping.

#### Connect Reverse ETL to Google Ads Customer Match

After you’ve connected your Google Ads destination to Segment, set up [Reverse ETL mappings](/docs/connections/reverse-etl/setup/#step-4-create-mappings) to sync to a Google Customer Match List.

##### Add users to your Google Customer Match User List  
1. From your Segment workspace, navigate to your Reverse ETL source.
2. Select the Reverse ETL model you'd like to sync with Google Ads.
3. Click **Add Mapping**.
4. Select the Google Ads Conversions destination and click **Next**.
5. Select the **Customer Match User List** action and the **Adds users to the connected Google Customer Match User List** sync mode.
6. Select an existing List ID or provide a name for the list that Segment creates for you.
7. Select an External ID Type, configure your mappings, and click **Next**. 
8. Enter a name for your mapping, set your sync schedule, and click **Save**.  
9. On the mapping's overview page, set the Status toggle to **Enabled**.  

##### Remove users from the connected Google Customer Match User List  
1. From your Segment workspace, navigate to your Reverse ETL source.
2. Select the Reverse ETL model you'd like to sync with Google Ads.
3. Click **Add Mapping**.
4. Select the Google Ads Conversions destination and click **Next**.
4. Select the **Customer Match User List** action and the **Remove users from the connected Google Customer Match User List** sync mode. 
5. Select the List ID that you configured when you set up the [Add users to your Google Customer Match User List](#add-users-to-your-google-customer-match-user-list) mapping.
6. Select an External ID Type, configure your mappings, and click **Next**. 
9. Enter a name for your mapping, set your sync schedule, and click **Save**.  
10. On the mapping's overview page, set the Status toggle to **Enabled**.  

## Data normalization

To improve match rates, Segment built in normalization and hashing for common fields to align with Google's best practices outlined in Google's [Prepare data for upload](https://developers.google.com/google-ads/api/docs/conversions/enhanced-conversions/leads#prepare-data){:target="_blank"} and [Add customer data](https://developers.google.com/google-ads/api/docs/remarketing/audience-segments/customer-match/get-started#add-user){:target="_blank"} documentation.

### Normalization 

Segment automatically strips whitespace and converts the following fields to lowercase:
  * Email
  * First name
  * Last name

Segment normalizes the Phone field by removing any non-numeric symbols. Segment also converts each phone number to [E.164](https://en.wikipedia.org/wiki/E.164){:target="_blank"} format before hashing. E.164 format represents a phone number as a number up to fifteen digits in length starting with a + sign.

### Hashing

Google requires you to hash all PII before sending it to the Google API. 

Segment automatically hashes any of the following fields that are not already hashed at egress:
 * Email
 * Phone number
 * First name
 * Last name

## Actions v2

Segment’s v2 Actions, [Call Conversion v2](#call-conversion-v2), [Conversion Adjustment v2](#conversion-adjustment-v2), and [Click Conversion v2](#click-conversion-v2), support the following features:

- **Sync modes**: Control how Segment updates your downstream destination by selecting a sync mode, or a strategy for updating your downstream data. 
- **Dynamic dropdowns**: When creating or updating a mapping in the Segment app, the dropdown auto-populates all of the available properties directly from Google Ads.
- **Create and modify data**: Use Sync modes to create objects in your downstream destination without having to leave the Segment app.

> warning ""
> You might need to reauthorize your Google Ads account to use all of the features associated with v2 Actions.

### Sync modes

Sync modes allow users to define how Segment should update the data in your destination.

Sync modes available for v2 Actions include:
- **Add**: Add records to a list, segment, or journey.

{% include components/actions-fields.html settings="true"%}

## Consent mode
[Consent mode](https://support.google.com/analytics/answer/9976101?hl=en){:target="_blank"} is a feature provided by Google in the context of its products, particularly the Gtag library and Google Analytics. As of March 6, 2024, Google announced that consent mode must function for European Economic Area (EEA) users, otherwise data from EEA users won't process. 

Consent mode in the Gtag library and Google Analytics is designed to help website owners comply with privacy regulations, such as the General Data Protection Regulation (GDPR) in the European Union. It allows website owners to adjust how these tools use and collect data based on user consent.

With consent mode, you can configure your website to dynamically adjust the tracking behavior of the Gtag library and Google Analytics based on the user's consent status. If a user provides consent to data processing, both the Gtag library and Google Analytics can collect and use that data for analysis. If a user doesn't provide consent, both tools limit data collection to essential functions, helping businesses respect user privacy preferences.

Consent mode may involve updates to your sources outside of Segment, such as incorporating a consent management system for consent functionality.

### Set up consent mode

To enable consent mode for your Google Ads Conversions destination, you must update the **Ad User Data Consent State** and **Ad Personalization Consent State** for all of your Upload Call Conversion and Upload Click Conversion actions. You can do this in 1 of 2 ways: 

* **Option 1:** 
    1. Navigate to **Connections > Destinations** and select your Google Ads Conversion destination. 
    2. Go to the **Mappings** tab of the destination.
    3. Select the mapping you want to edit. 
    4. In the **Select mappings** section, select `GRANTED` from the dropdown menu for **Ad User Data Consent State** and **Ad Personalization Consent State**.

* **Option 2:** 
    1. Navigate to **Connections > Destinations** and select your Google Ads Conversion destination. 
    2. Go to the **Mappings** tab of the destination.
    3. Select the mapping you want to edit. 
    4. In the **Select mappings** section, for **Ad User Data Consent State** and **Ad Personalization Consent State**, select the **Event Variables** tab and create an event variable to directly grab the value from the payload. Ensure it translates to `GRANTED`, `DENIED`, or `UNSPECIFIED`. You can use an insert or [replace function](/docs/connections/destinations/actions/#replace-function) to translate other values to `GRANTED`, `DENIED`, or `UNSPECIFIED`.

If you send `DENIED` for any of the two consent states, it results in an error and the data won't send to Google. For more information, see [FAQ about the EU user consent policy for Customer Match upload partners](https://support.google.com/google-ads/answer/14310715?hl=en){:target="_blank"}. 

If you have any questions setting up consent mode, reach out to [friends@segment.com](mailto:friends@segment.com).


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

[Enhanced conversions for leads](https://developers.google.com/google-ads/api/docs/conversions/upload-identifiers){:target="_blank"} allows you to use hashed, first-party user-provided data from your website lead forms for offline lead measurement. When you upload your leads, the provided hashed information is used to attribute back to the Google Ad campaign. In order to send enhanced conversions for leads, you can use the "Upload Click Conversion" action. According to Google, if you do not have GCLID at your source payload, you have to pass user identifiers, at least email or phone number in your mappings, for Google to make the match. A conversion must be addressed to an existing profile. If there's not a match, Google responds with a failure.

### Refreshing access tokens

When you use OAuth to authenticate into the Google Ads Conversions destination, Segment stores an access token and refresh token. Access tokens for Google Ads Conversions expire after one hour. Once expired, Segment receives an error and then uses the refresh token to fetch a new access token. This results in two API requests to Google Ads Conversions, one failure and one success.

Because of the duplicate API requests, you may see a warning in Google for unprocessed conversions due to incorrect or missing OAuth credentials. This warning is expected and does not indicate data loss. Google has confirmed that conversions are being processed, and OAuth retry behavior will not cause any issues for your web conversions. Whenever possible, Segment caches access tokens to reduce the total number of requests made to Google Ads Conversions.

### Resolving an invalid_conversion_action_type error

This error indicates that the conversion action specified in the upload request has not been set up for conversion uploads, as outlined in [Google's Ads documentation](https://developers.google.com/google-ads/api/reference/rpc/v15/ConversionUploadErrorEnum.ConversionUploadError#invalid_conversion_action_type){:target="_blank”}.

To resolve this, ensure that the ConversionActionType value in Google Ads is correctly configured.

### Conversion upload error 

You may encounter this error if you use more than one identifier to update a conversion. You must only use one identifier (GCLID, GBRAID, or WBRAID) for each ClickConversion entry.

### `The required field was not present., at conversions[0].gclid` Error

Events going to Google for this integration require a `GCLID` field, an `email`, or a `phone_number`. If one of those identifiers isn't being sent properly, then you may see the `The required field was not present., at conversions[0].gclid` error. To fix this, double check that at least one of those fields is being passed to Google on each payload.

