---
title: Microsoft Dynamics 365 (Sales Hub) Integration Recipe
---

This recipe will guide you through how to set up a custom destination for [Microsoft Dynamics 365 (Sales)](https://www.microsoft.com/en-us/dynamics-365/products/sales){:target="_blank"} using Twilio Segment’s [Extensible Webhooks](https://segment.com/docs/connections/destinations/catalog/actions-webhook-extensible/){:target="_blank"} feature.

## Prerequisites

To integrate Microsoft Dynamics 365 with Twilio Segment, ensure you have the following:

- A Segment account: an account with the Extensible Webhooks feature enabled (private beta access).
- An Azure application: an Azure application is required for authentication.
- Authentication credentials: necessary credentials for authentication, for example, endpoints and scopes.
- Data mapping information: knowledge of the data fields required by Microsoft Dynamics 365.

## Getting started 

### 1. Configure Extensible Webhook as a destination 

1. In your Segment workspace, navigate to **Connections** > **Catalog** > **Destinations**.
2. Use the search bar to search for "Extensible Webhook"  and select **Add destination**.

### 2. Select the data source

1. Choose the source that you want to send data from to Microsoft Dynamics 365..
2. Click **Next** to proceed.
3. Give your destination a name and create your destination.

### 3. Specify the instance details

1. Enter a recognizable name for your webhook instance, for example, Segment to Microsoft Dynamics Integration.
2. (Optional) Add a brief description of the integration.

### 4. Select the authentication type

For authentication, you need to first create an Azure application that can authenticate users to provide access to Microsoft Dynamics API. See [Microsoft's documentation](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=client-secret){:target="_blank"} for details on how to create an application and how to get the client secret that will later be used for authentication.

The redirect URI for your application is `https://app.segment.com/oauth-service/webhook/callback`.

To connect the Azure app with the Dynamics instance, go to the Power Platform Admin Center. Here you will need to create new app users associated with a business unit, and provide security roles.

Once you have successfully created an Azure web application and associated it with a Dynamics environment, you can proceed to authentication in Segment.

1. Navigate to the settings page of the webhook destination in Segment.
2. Select **OAuth 2.0** and select **Authorization Code**.
3. Enter the following credential details from your web app or as listed below:
    - Client ID
    - Client secret
    - Access Token URL: `https://login.microsoftonline.com/<directory_id>/oauth2/v2.0/token`. Replace `<directory_id>` with your Azure AD tenant ID. You can be find this in the Entra admin center. For detailed steps, see [Microsoft's guide](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-find-tenant){:target="_blank"}.
      - Example URL with a sample directory UUID: `https://login.microsoftonline.com/861e4762-e528-4faf-ad95-70847a9efbe7/oauth2/v2.0/token`
    - Scope: `https://<dynamics>/.default`. Replace `<dynamics>` with the domain of your Dynamics 365 instance. This appears in your web browser's address bar when using your app.
      - Example URL for a Dynamics 365 instance: `https://org2fd4b414.crm.dynamics.com/.default`.
4. Click **Connect** to set up the OAuth connection with Microsoft.

Authentication will take place if the configurations are correct and the access token will automatically be generated without the need for user login.

### 5. Data mapping

#### Data transformation (optional)

Microsoft Dynamics 365 can create and update multiple entities all at once with a nested object structure. For example, with a single API call to the `accounts` entity, you can create a new account, contact and a related opportunity in a single shot. 

You will need to write an insert function that appends a property, for example one called “body”, to the event which would then have nested fields. For the Create New Account API, an expected sample payload is of the following structure:

```
{
 "name": "Sample Account",
 "primarycontactid":
 {
     "firstname": "John",
     "lastname": "Smith"
 },
 "opportunity_customer_accounts":
 [
  {
      "name": "Opportunity associated to Sample Account",
      "Opportunity_Tasks":
      [
       { "subject": "Task associated to opportunity" }
      ]
  }
 ]
}
```

The Create New Account API’s expected fields are listed in [Microsoft's documentation](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/account?view=dataverse-latest){:target="_blank"}. 

To create or update the Account entity only, you can skip this step and directly use mappings to map properties and keys.

#### Data mapping

1. Create a new mapping in the Mappings tab and select the **Send** HTTP action.
2. Choose which events you want to send to Google Search Ads 360 API using the Event filters.
3. Fill out mapping fields:
    - Specify the URL:  `[Organization URI]/api/data/v9.2/accounts` (this is for creating new accounts)
4. Use the mapping interface and search for the “body” parameter that was created in the insert function to select the transformed object that can be sent as the event body.
5. Turn off batching for this operation.

### 6. Test the output and connection

1. Click **Test Connection** to send a sample payload.
2. In Microsoft Dynamics 365, verify that the test data has been received and processed correctly.

#### Troubleshooting

If the test fails:
- Review the authentication details and data mappings.
- Check for error messages in Segment and Search Ads.

### 7. Save and enable the destination

1. Once the test is successful, click **Save** to store your configuration.
2. Toggle the destination to Enable to start sending live data to Microsoft Dynamics 365. 
3. Monitor the data flow to ensure that events are being delivered as expected.
