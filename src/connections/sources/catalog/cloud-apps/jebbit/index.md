---
title: 'Jebbit Source'
id: V2kq0X7vYy
---

[Jebbit](https://jebbit.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps build and design fun, engaging quizzes and customer experiences with speed and control, all while capturing customer preferences as zero-party data. 

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Jebbit. For any issues with the source, [contact their Support team](mailto:support@jebbit.com).

## Getting Started

1. From the Segment UI's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "Jebbit" in the Sources Catalog, select click Jebbit, and click **Add Source**.
4. On the next screen, give the Source a nickname and configure any other settings. 

   The name identifies this source within your workspace, and typically reflects the name of the application. The name can be anything, but should be something that reflects the source itself and distinguishes amongst your environments (for example, Jebbit_Prod, Jebbit_Staging, Jebbit_Dev).
5. Click **Add Source** to save your settings.
6. Send an email to [Jebbit's Support team](mailto:support@jebbit.com) after gathering the required credentials to start the integration process.


## Events

The table below lists events that Jebbit sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. 

| Event Name       | Description               |
|------------------|---------------------------|
| Survey Completed | Experience was completed  |


## Event properties

The table below list the properties included in the events listed above.

| Property Name             | Description                                                                                                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email`                     | The email address provided by the user.                                                                                                                                                      |
| `client_user_id`  | Optional. An ID the Client passes in the Jebbit Experience URL that Jebbit can then pass back with the data for that user.                                                                             |
| `experience_date`           | Timestamp representing the date the user engaged with the Jebbit Experience (UTC).Default is YYYY-MM-DD HH:MM:SS                                                                             |
| `campaign_name`             | Client generated name of the campaign                                                                                                                                                        |
| `opt_in`                    | User opt-in if Client chooses to use the opt_in feature in their Jebbit Experience.                                                                                                          |
| `outcome`                   | The outcome tied to the user session. Outcomes offer a way to collect a data point based on multiple questions/input. For more information on outcomes, please contact your Account Manager. |
| `url_param`                 | Any URL parameters attached to the Jebbit Experience URL.                                                                                                                                    |
| favorite_color* (example) | Client defined attribute mapped to the experience.                                                                                                                                           |
| age_group* (example)      | Client defined attribute mapped to the experience.                                                                                                                                           |


## How Jebbit sends data to Segment

Jebbit sends user data to Segment by triggering an identify call for each user completing an experience to be created, for example:

```json
{
  "context": {
    "externalIds": [
      {
        "collection": "users",
        "encoding": "none",
        "id": "",
        "type": "emailSha256Hash"
      }
    ]
  },
  "timestamp": "", //EXPERIENCE_DATE
  "traits": {
    "email": "", //USER EMAIL ADDRESS
    "emailSha256Hash": "",
    "attribute_1": "" //ALL MAPPED ATTRIBUTES
  },
  "type": "identify",
  "userId": ""
  }
```

In order to record actions that a user has completed, Jebbit triggers a Track Call for each user to completes an experience.

```json
{
  "context": {
    "externalIds": [
      {
        "collection": "users",
        "encoding": "none",
        "id": "",
        "type": "emailSha256Hash"
      }
    ]
  },
  "event": "Survey Completed",
  "timestamp": "", //EXPERIENCE_DATE
  "properties": {
    "questions":{
    "attribute_1": "" //ALL MAPPED ATTRIBUTES
    },
    "surveyId": "", //CAMPAIGN ID
    "surveySessionId": "", //SESSION ID
    "surveyTitle": "", //CAMPAIGN NAME
    "trafficSource": "" //SOURCE 
  },
  "type": "track",
  "userId": ""
}
```

Now that the Source is configured, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Jebbit support team](mailto:support@jebbit.com).
