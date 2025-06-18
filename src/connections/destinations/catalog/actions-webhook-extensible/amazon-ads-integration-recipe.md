---
title: Amazon Ads Audience Sync Integration Recipe
---

This recipe will guide you through how to set up a custom destination for Amazon Ads using Twilio Segment's Extensible Webhooks feature and how to sync customer data into an Audience list. By following these steps, you can integrate your data source with Amazon Ads.

## Prerequisites

To integrate Amazon Ads with Segment, ensure you have the following:

- A Segment Account: an account with the Extensible Webhooks feature enabled (private beta access).
- An Amazon Ads Account: an active account or API access to Amazon Ads.
- Authentication Credentials: the necessary credentials for authentication. These are OAuth endpoints, Client ID, Secret, Scopes.
- Data mapping information: Knowledge of the data fields required by Amazon Ads.

## Getting started 

### 1. Set up the Extensible Webhook destination 

To set up your destination in Segment: 

1. In your Segment workspace go to **Catalog** > **Destinations**.
2. Search for Extensible Webhook and select **Add destination**.

### 2. Select the data source

1. Choose the source from which you want to send data to Amazon Ads.
2. Click **Next** to proceed.

### 3. Specify the instance details

1. Enter a recognizable name for your webhook instance (e.g., "Segment to Amazon Integration").
2. (Optional) Add a brief description of the integration.

### 4. Select the authentication type

An Amazon Client Application has to be created which requires approval. For steps on how to complete Amazon API onboarding, see the [Amazon documentation](https://advertising.amazon.com/API/docs/en-us/guides/onboarding/overview){:target="_blank"}.

The LwA (Login with Amazon) application that you create should have `advertising::audiences` as the scope. For Campaign management, like marking conversions, the scope should be `advertising::campaign_management`. 

Once a LwA app has been created, you will need to add the redirect URI “https://app.segment.com/oauth-service/webhook/callback” to the list of Allowed Return URLs. For more detail on this, see the [Amazon documentation](https://advertising.amazon.com/API/docs/en-us/guides/get-started/create-authorization-grant#allow-a-return-url){:target="_blank"}.

Note down the Client ID and Secret, available in the Login with Amazon section on the [Amazon Developer site](https://developer.amazon.com/){:target="_blank"}. These will be used to set up authentication with Segment.

#### Authentication

To set up authentication:
1. Select OAuth 2.0 from the list of options and select **Authorization Code**.
2. Enter the following credential details as listed below or given in the web app:
    - Client ID
    - Client secret
    - Authorize URL: https://www.amazon.com/ap/oa
    - Token URL: https://api.amazon.com/auth/o2/token
    - Refresh URL: https://api.amazon.com/auth/o2/token
    - Scope: `advertising::audiences`

    The authorization URL can be found [here](https://advertising.amazon.com/API/docs/en-us/guides/get-started/create-authorization-grant#determine-the-url-prefix-for-your-region){:target="_blank"} and the access/refresh token URL can be found [here](https://advertising.amazon.com/API/docs/en-us/guides/get-started/retrieve-access-token#call-the-authorization-url-to-request-access-and-refresh-tokens){:target="_blank"}, depending on your region.

3. Once you create the destination instance, you will then be redirected to the Settings section. Click **Connect** to set up the OAuth connection with Amazon Ads. 
4. You will be redirected to Amazon Ads. Log in and click **Allow** to complete the authentication flow.

Once done redirected back to the destination settings page, authentication is completed and you’re now ready to send events to Amazon Ads.

### 5. Perform Data Mapping

#### Data transformation

Amazon Ads expects data to be in a certain format with nested fields. This format cannot be mapped with the mappings functionality and will need to be transformed within an insert function.

You will need to write an insert function that appends a property, for example one called “body”, to the event which would then have nested fields. For the Amazon Ads Audience API, a sample expected payload is of the following structure:

```
{
 "records": [
   {
     "hashedPII": [
       {
         "firstname": "sdstdsdsaring",
         "address": "scdcadscstring",
         "phone": "sadtrdsaidng",
         "city": "ssatring",
         "state": "strccaing",
         "postal": "staccaring",
         "email": "stracaing",
         "lastname": "stacaddacring"
       }
     ],
     "externalUserId": "A12346sgd",
     "action": "CREATE"
   }
 ],
 "targetResource": {
   "connectionId": "",
   "targetTypes": [
     "DSP"
   ]
 },
 "audienceId": 371552318001631924
}
```

The Amazon Ads Audience API's expected fields are:
- `Records` is an array of objects. For the beta, Segment doesn’t support batching to iterate over this object yet. The required parameters are:
    - `hashedPII`: A list of SHA-256 hashed PII that will be matched with Amazon entities.
      - `firstname`
      - `lastname`
      - `address`
      - `phone`
      - `city`
      - `state`
      - `postal`
      - `email`
    - `externalUserId`: The id used by external systems to identify customers.
    - `action`: Can be “CREATE” or “DELETE” based on whether you want to add or remove the user from the list.
- `audienceID` is the ID of the Audience list to which the data should be either added or deleted. You can get the audienceID from within the Amazon Ads console or when creating an Audience from the API.

#### Data Mapping

1. Create a new Mapping in the Mappings tab and select the **Send** HTTP action.
2. Choose which events you want to send to Amazon Ads Audience API using the Event filters.
3. Fill out mapping fields:
    - Specify the URL:
      - The API endpoint is based on region.
      - Include the suffix with the Audience API Endpoint: /amc/audiences/records
    - Specify the headers:
      - `Amazon-Advertising-API-ClientId`: The Client ID from Login with Amazon Account. 
4. Use the mapping interface and search for the “body” parameter that was created in the insert function to select the transformed object that can be sent as the event body.
5. Turn off batching for this operation.

### 6. Test the output and connection

1. Click **Test Connection** to send a sample payload.
2. In Amazon Ads, verify that the test data has been received and processed correctly.

#### Troubleshooting

If the test fails:
- review the authentication details and data mappings.
- check for error messages in Segment and Amazon Ads.

### 7. Save and enable the destination

1. Once the test is successful, click **Save** to store your configuration.
2. Toggle the destination to Enable to start sending live data to Amazon Ads Audience API.
3. Monitor the data flow to ensure that events are being delivered as expected.
