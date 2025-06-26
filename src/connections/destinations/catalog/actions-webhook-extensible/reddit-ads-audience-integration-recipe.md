---
title: Reddit Ads (Audience) Integration Recipe
---

This recipe will guide you through setting up a custom destination for Reddit Ads (Audiences) using Twilio Segment's Extensible Webhooks feature. By following these steps, you will be able to integrate your data source with Reddit Ads (Audiences).

## Prerequisites 

To integrate Reddit Ads with Segment, ensure you have the following:

A Segment account: an account with the Extensible Webhooks feature enabled (private beta access).
A Reddit Ads (Audiences) account: an active account or API access to Reddit Ads (Audiences).
Authentication credentials: necessary credentials for authentication, for example, API keys and tokens. 
Data mapping information: knowledge of the data fields required by Reddit Ads (Audiences).

## Getting started 

### 1. Configure Extensible Webhook as a destination 

1. In your Segment workspace, navigate to **Connections** > **Catalog** > **Destinations**.
2. Use the search bar to search for **Extensible Webhook**  and select **Add destination**.

### 2. Select the data source

1. Choose the source that you want to send data from to Reddit Ads (Audiences).
2. Click **Next** to proceed.
3. Give your destination a name and create your destination.

### 3. Specify the instance details

In Reddit Ads, create an app. For steps on how to do this, see the [Reddit documentation](https://ads-api.reddit.com/docs/v3/#create-a-developer-application){:target="_blank"}. 

When creating your app, specify the following details:

- Name: Give your webhook instance a recognizable name.
- Description (optional): Add a brief description of the integration.
- Endpoint URL: Provide the webhook URL or endpoint provided by Reddit Ads (Audiences).

> info: Redirect URI 
The redirect URI used when creating a Reddit web app is “https://app.segment.com/oauth-service/webhook/callback”.

### 4. Select the authentication type

Reddit provides developers with an option to create a web application to set up OAuth 2.0 for the Ads API to be authenticated. Once a web app has been created, you will need to note down the Client ID and Secret provided by Reddit. These will be used to set up authentication on Segment.

To set up OAuth:

1. Go to **Authentication Method** and select **OAuth 2.0**.
2. Enter the following credentials as required:
    - Client ID: provided by the Reddit web app
    - Secret: provided by the Reddit web app
    - Authorize URL: https://www.reddit.com/api/v1/authorize
    - Token URL: https://www.reddit.com/api/v1/access_token 
    - Refresh URL: https://www.reddit.com/api/v1/access_token
    - Scope: To update Audiences, you will need to add ‘adsedit’ as a scope. To add multiple scopes, separate the values by commas. 

You can also find the Authorize URL, Token URL, and Refresh URL in the [Reddit documentation](https://ads-api.reddit.com/docs/v3/operations/Update%20Custom%20Audience%20Users){:target="_blank"}.

3. Once you create the destination instance, you will be redirected to Settings. Click on **Connect** to set up the OAuth connection with Reddit and you’ll be redirected to reddit. Click on “Allow” to complete the authentication flow.
4. Once you’re redirected back to the destination settings page, this means that authentication is completed and you’re now ready to send events to Reddit.

### 5. Perform data mapping

#### Data transformation

The Reddit Custom Audience API expects data in a nested format. To format the payload correctly, you will have to write an insert function that appends a new property called “body” (for example). 

This will have the following structure:

```
{
  "data": {
    "action_type": "ADD",
    "column_order": [
      "EMAIL_SHA256",
      "MAID_SHA256"
    ],
    "user_data": [
      [
        "d7ef2e7b2a3663c25284a3d6d13b1ca727fc8c659474b81afe0cec997a4737d2",
        "510870d7b3e47a28a2b2f3aef27a4c81aab0b2eefda27dea50bc4c991d9e5435"
      ]
    ]
  }
}
```

The required parameters are:

- `action_type` which can take values “ADD” or “REMOVE” depending on whether a customer has to be added or removed from the list. 
- `column_order` which can take two values, “EMAIL_SHA256” and “MAID_SHA256”. The order indicates the column order of the data being synced inside `user_data`
- `user_data` is an array of values which has hashed email id or MAID id or both. For the beta, Segment doesn’t support batching to iterate just over this array yet.

#### Data mapping

In this recipe, as an example, users are added to the existing audience but you can use one or multiple mappings to perform any `PUT`, `PATCH` or `POST` action types.

1. Create a new mapping from the **Mappings** tab, click on **Add Mapping** and select the “Send” HTTP action.
2. Select events to send. Define the event triggers to send to Reddit Ads (Audiences) using the event filters.
3. Fill out mapping fields:
    1. Specify the URL and method.
    - For example, using the following URL: https://ads-api.reddit.com/api/v3/custom_audiences/{audience_id}/users
      1. Replace `audience_id` with the actual audience ID you want to edit. You can find the iID below the name of the Audience List to be modified on Audience Manager.
      2. Select `PATCH` as the HTTP method. The API expects a Patch operation on the endpoint.
4. Use the mapping interface and search for the “body” parameter that was created in the insert function to select the transformed object that can be sent as the event body.
5. Turn off batching for this operation.

Reddit supports three types of actions that can be performed via Extensible Webhook.

- Audiences
  - Manage Audiences: Create a new audience or manage existing ones.
  - Manage Audience Users: PATCH users in existing audiences or create a new audience and add users to it.
- Campaigns
  - Manage Campaigns: Create a new campaign or manage existing ones.

### 6. Test the output and connection

1. Click **Test Connection** to send a sample payload.
2. Verify in Reddit Ads (Audiences) that the test data has been received and processed correctly.

Troubleshooting:

- If the test fails, review the authentication details and data mappings.
- Check for error messages in Segment and Reddit Ads (Audiences).

### 7. Save and enable the destination

1. Once the test is successful, click **Save** to store your configuration.
2. Toggle the destination to Enabled to start sending live data.
3. Monitor the data flow to ensure events are being delivered as expected.
