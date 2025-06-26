---
title: Google Search Ads 360 Conversion API Integration Recipe
---

This recipe will guide you through how to set up a custom destination for [Google Search Ads 360](https://marketingplatform.google.com/intl/en_uk/about/search-ads-360/){:target="_blank"} conversions using Twilio Segment’s [Extensible Webhooks](https://segment.com/docs/connections/destinations/catalog/actions-webhook-extensible/){:target="_blank"} feature.

## Prerequisites 

To integrate Search Ads 360 with Twilio Segment, ensure you have the following:

- A Segment account: an account with the Extensible Webhooks feature enabled (private beta access).
- A Search Ads account: an active account and API access to Google Search Ads 360.
- Authentication credentials: necessary credentials for authentication, for example, API keys and tokens. 
- Data mapping information: knowledge of the data fields required by Search Ads 360.

## Getting started 

### 1. Configure Extensible Webhook as a destination 

1. In your Segment workspace, navigate to **Connections** > **Catalog** > **Destinations**.
2. Use the search bar to search for "Extensible Webhook"  and select **Add destination**.

### 2. Select the data source

1. Choose the source that you want to send data from to Google Search Ads 360.
2. Click **Next** to proceed.
3. Give your destination a name and create your destination.

### 3. Specify the instance details

1. Enter a recognizable name for your webhook instance, for example, Segment to Search Ads Integration.
2. (Optional) Add a brief description of the integration.

### 4. Select the authentication type

As a prerequisite to authenticate APIs, you need to create OAuth credentials. Once generated, note down the Client ID and Secret. They are required to set up authentication between Segment and Google Search Ads.

You will also need to add the following redirect URI to the list of allowed return URLs: `https://app.segment.com/oauth-service/webhook/callback`. 

#### Authentication 

1. Select OAuth 2.0 and select Authorization Code.
2. Enter the following credentials details from your project:
    - Client ID
    - Client secret
    - Authorize URL: `https://accounts.google.com/o/oauth2/v2/auth`
    - Token URL: `https://oauth2.googleapis.com/token`
    - Refresh URL: `https://oauth2.googleapis.com/token`
    - Scope: `https://www.googleapis.com/auth/doubleclicksearch`
3. Once you have created the destination instance, you will be redirected to the Settings section. Click **Connect** to set up the OAuth connection with Google Search Ads 360.
4. Log in to your Google Search Ads account and click **Allow** to complete authentication.

If authentication is completed successfully, you will be redirected to the destination settings page. At this point, you are ready to send events to Google Search Ads.

### 5. Data mapping

#### Data transformation

Google Search Ads 360 expects data to be in a certain format with nested fields. This format cannot be mapped with the mappings functionality and will need to be transformed within an insert function.

You will need to write an insert function that appends a property, for example one called “body”, to the event which would then have nested fields. For the Google Search Ads 360 Conversion API, an expected sample payload is of the following structure:

```
{
 "kind": "doubleclicksearch#conversionList",
  "conversion" : [{
    "clickId" : "COiYmPDTv7kCFcP0KgodOzQAAA", // Replace with a click ID from your site
    "conversionId" : "test_20130906_04",
    "conversionTimestamp" : "1378710000000",
    "segmentationType" : "FLOODLIGHT",
    "segmentationName" : "Test",
    "type": "TRANSACTION",
    "revenueMicros": "10000000", // 10 million revenueMicros is equivalent to $10 of revenue
    "currencyCode": "USD"
    }]
  }
```

The Google Search Ads 360 Conversion API's required fields are:
- `kind` which is `doubleclicksearch#conversionList`. Conversion is an array. While in beta, Segment doesn’t support batching to iterate over this.
- `clickId` which is the ID of a specific click on an ad that the customer clicked on.
- `conversionId` is a unique ID that tracks the particular conversion.
- `conversionTimestamp` is date and time in epoch milliseconds on when the conversion took place.
- `segmentationType` should be `FLOODLIGHT`.
- `segmentationName` is the floodlight activity to report this conversion to.
- `type` which can be `action` or `transaction` to indicate whether the conversion had a monetary value or not.

#### Data mapping

1. Create a new Mapping in the Mappings tab and select the **Send** HTTP action.
2. Choose which events you want to send to Google Search Ads 360 API using the Event filters.
3. Fill out mapping fields:
    - Specify the URL: `https://www.googleapis.com/doubleclicksearch/v2/conversion`
4. Use the mapping interface and search for the “body” parameter that was created in the insert function to select the transformed object that can be sent as the event body.
5. Turn off batching for this operation.

### 6. Test the output and connection

1. Click **Test Connection** to send a sample payload.
2. In Google Search Ads 360 Conversion, verify that the test data has been received and processed correctly.

#### Troubleshooting

If the test fails:
- Review the authentication details and data mappings.
- Check for error messages in Segment and Search Ads.

### 7. Save and enable the destination

1. Once the test is successful, click **Save** to store your configuration.
2. Toggle the destination to Enable to start sending live data to Google Search Ads 360 Conversion API.
3. Monitor the data flow to ensure that events are being delivered as expected.

