---
title: Reddit Ads Conversion API Integration Recipe
---

This recipe will guide you through setting up a custom destination for [Reddit Ads Conversion API](https://ads.reddit.com/){:target="_blank"} using Segment’s [Extensible Webhooks](https://segment.com/docs/connections/destinations/catalog/actions-webhook-extensible/){:target="_blank"} feature. By following these steps, you can integrate your data source with Reddit Ads Conversion API without writing any code. 

##  Prerequisites

To integrate Reddit Ads Conversion with Segment, ensure you have the following:

- A Segment account: an account with the Extensible Webhooks feature enabled.
- Reddit Ads Conversion API account: an active account or API access to Reddit Ads Conversion API.
- Authentication credentials: necessary credentials for authentication, for example, API keys and tokens. 
- Data mapping information: knowledge of the data fields required by Reddit Ads Conversion API. 

## Getting started 

### 1. Configure Extensible Webhook as a destination

1. In your Segment workspace, go to **Catalog** > **Destinations**.
2. Use the search bar to search for "Extensible Webhook" and select **Add destination**.

### 2. Select the data source

1. Choose the source that you want to send data from to Reddit Ads Conversion API.
2. Click **Next** to proceed.
3. Give your destination a name and create your destination.

### 3. Specify the instance details

In Reddit Ads, create an app. For steps on how to do this, see the [Reddit documentation](https://business.reddithelp.com/s/article/Create-a-Reddit-Application){:target="_blank"}. 

When creating your app, specify the following details:

- Name: Give your webhook instance a recognizable name.
- Description (optional): Add a brief description of the integration.
- Endpoint URL: Provide the webhook URL or endpoint provided by Reddit Ads Conversion API. 

### 4. Select the authentication type 

Reddit provides two methods for authentication:
- Creating an app.
- Using the conversion access token.

The conversion access token provides a bearer token that can be added to the header. To get the conversion access token from Reddit Ads:

1. In your Reddit Ads account and navigate to **Events Manager**.
2. Select **Conversions API**.
3. Click **Generate Access Token** to generate your token. Copy and make a note of it. 

Once you have the conversion token, go back to your destination in your Segment workspace. In Settings, go to **Authorization Settings** and select **No Auth** as the authentication method.

### 5. Perform data mapping

#### Data transformation 

The Reddit Conversion API expects data in a nested format. To format the payload correctly, you will need to write an insert function that appends a new property, for example "body".

This will have the following structure: 

```
{
  "events": [
    {
      "click_id": "3184742045291813272",
      "event_at": "2018-01-01T00:00:00Z",
      "event_at_ms": 1514764800000,
      "event_type": {
        "tracking_type": "Purchase",
        "custom_event_name": "string"
      },
      "event_metadata": {
        "item_count": 5,
        "currency": "USD",
        "value": 1099,
        "value_decimal": 10.99,
        "conversion_id": "H72B9A4YXQ",
        "products": [
          {
            "id": "item-213",
            "name": "Carne Asada Burrito",
            "category": "Food Items"
          }
        ]
      },
      "user": {
        "email": "snoo@example.com",
        "external_id": "7c73f2ae-a433-4d7b-9838-f467da98f48e",
        "uuid": "1684189007728.7c73f2ae-a433-4d7b-9838-f467da98f48e",
        "ip_address": "192.0.2.1",
        "user_agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
        "idfa": "EA7583CD-A667-48BC-B806-42ECB2B48606",
        "aaid": "cdda802e-fb9c-47ad-9866-0794d394c912",
        "opt_out": true,
        "screen_dimensions": {
          "width": 3440,
          "height": 1440
        },
        "data_processing_options": {
          "modes": [
            "LDU"
          ],
          "country": "US",
          "region": "US-CA"
        }
      }
    }
  ]
}
```

The conversions payload consists of three core components:

- `event_type`: This classifies the conversion event used for aggregating data in reporting.
- `event_metadata`: This contains information associated with specific actions or conversion events shared to Reddit. 
- `user`: This includes attribution and advanced matching signals that improve conversion measurement.

These components are separated into various parameters, some of which are required:
- `event_at`
- `tracking_type`
- `conversion_id`

It’s also recommended that you include the `email`, `ip_address`, `uuid`, and `click_id` parameters.

### Data mapping 

To map data from your destination to Reddit Ads:

1. Create a new mapping in the Mappings tab, select the **Send** action. 
2. Define the event trigger by selecting the events you want to send to Reddit Ads Conversion API using the Event name filters. 
3. (Optional) Add enrichment entities as needed.
4. Fill out mapping fields:
    1. To specify the URL, go to your Reddit Ads account, navigate to **Pixel configuration** to find your Pixel ID. The format of the URL should be `https://ads-api.reddit.com/api/v2.0/conversions/events/{{YOURPIXEL_ID}}`, with your pixel ID being at the end of the URL. 
    2. Specify the headers: 
        - Set up Authorization using the bearer token generated in the previous step.
        - Specify the content type that the Conversion API expects.
5. Use the mapping interface and search for the “body” parameter that was created in the insert function to select the transformed object that can be sent as the event body.
6. Turn off batching for this operation.

### 6. Test the output and connection 

1. Click **Test Connection** to send a sample payload.
2. In the Reddit Ads Conversion API, verify that the test data has been received and processed correctly.

#### Troubleshooting

If the test fails:
- Review the authentication details and data mappings.
- Check for error messages in Segment and the Reddit Ads Conversion API.

### 7. Save and enable the destination

1. Once the test is successful, click **Save** to store your configuration.
2. Toggle the destination to Enable to start sending live data to Reddit Ads Conversion API.
3. Monitor the data flow to ensure that events are being delivered as expected.
