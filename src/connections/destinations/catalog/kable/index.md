---
title: Kable Destination
id: 622786bfebadaf74178dfebe
beta: true
---

[Kable](https://kable.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} helps API companies launch and grow their business with easy-to-use billing infrastructure and analytics tools that work at any scale. 

The fastest-growing API companies trust Kable to automate their revenue operations, improve their developer experience, and empower their product leaders to iterate on pricing and packaging without limitations or bottlenecks. 

This Segment destination is maintained by Kable. For any questions or issues, please [contact Kable Support](mailto:contact@kable.io).

## Getting Started

 

1. From the Segment web app, click **Catalog** then **Destinations**. 
2. Search for **Kable** in the Destinations Catalog, and select **Kable**.
3. Click **Configure Kable**.
4. Choose which Source(s) should send data to Kable, and add a name for your Kable Segment Destination.
5. Configure your Segment Connection Settings: 
    * Add your **Kable Client ID** and **Kable API Key**. (You can find your Kable Client ID and API Keys in the [Company tab](https://dashboard.kable.io/company){:target="_blank"} of your Kable dashboard.)
    * Specify which Segment event field corresponds to your customer's **Client ID** on Kable.
    * Map any other Segment event `properties` to Kable event fields. 


| Setting             | Description                                                                                                        | Example                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| API Key             | Your Kable API Key                                                                                                 | `sk_test.h6kVNO3I...`                          |
| Kable Client ID     | Your Kable Client ID                                                                                               | `kci_3c90e9ac92c6...`                          |
| Client ID Field     | The field from your Segment events that corresponds to your customer's `clientId` on Kable.                        | `userId`                                       |
| Properties Mappings | Map fields from Segment event `properties` to fields in Kable event `data`. Use dot notation to map nested fields. | `segmentX : kableX` `nested.field : dimension` |


## Supported methods

Kable supports Segment [Track](/docs/connections/spec/track) calls to capture usage metrics from your API. Learn more about Segment Track calls in the [Segment Spec](/docs/connections/spec). 


### Track

Send [Track](/docs/connections/spec/track) calls to Segment to record [usage events](https://docs.kable.io/docs/usage-events){:target="_blank"} in Kable. For example:

```js
analytics.track({
  event: "your_event_type",
  userId: "yourcompanyuser_1234567890",
  properties: {
    segmentX: "important data point",
    messageId: "msg_ABC123XYZ456", 
    objectCount: 12, 
    bankAccountBalance: 399.99,
  }
});
```

The Segment Track event above would be transformed and transmitted to Kable as:

```curl
curl --request POST \
     --url https://live.kable.io/api/v1/events/create \
     --header 'Accept: application/json' \
     --header 'Content-Type: application/json' \
     --header 'Kable-Client-ID: <YOUR_KABLE_CLIENT_ID>' \
     --header 'Kable-Client-Secret: <YOUR_KABLE_CLIENT_SECRET>' \
     --data '
{
  "clientId": "messageId",
  "timestamp": "2022-01-09T09:32:01Z", # Segment timestamp
  "transactionId": "022bb90c-bbac-11e4-8dfc-aa07a5b093db", # Segment messageId
  "data": {
    "kableX": "important data point", # notice the property mapping here from the example above
    "messageId": "msg_ABC123XYZ456", 
    "objectCount": 12, 
    "bankAccountBalance": 399.99
  }
}
```