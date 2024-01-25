---
title: SurveySparrow (Actions) Destination
hidden: true
beta: true
---
{% include content/plan-grid.md name="actions" %}

[SurveySparrow](https://surveysparrow.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is an end-to-end omnichannel experience management platform that bundles Customer Experience and Employee Experience tools such as NPS, Offline, Chat, Classic, and 360 Surveys which are mobile-first, highly engaging, and user-friendly. 

This destination is maintained by SurveySparrow. For any issues with the destination, [contact their Support team](mailto:support@surveysparrow.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "SurveySparrow"
2. Select SurveySparrow and click **Add Destination**
3. Select an existing Source to connect to SurveySparrow (Actions).
4. Log in to your [SurveySparrow](https://app.surveysparrow.com/) account, then navigate to **Settings > Apps and Integrations > Create a Custom app**.
5. Fill in the details for the custom app and choose **Select all** under Scope. Later, you can remove any scopes that are not required.
6. Click **Save** and copy the **Access Token**.
7. Enter the **Access Token** in the SurveySparrow destination settings in Segment.

## Action destination for Survey trigger event

| Property Name          | Type          | Description                           |
| ------------- |:-------------:| :-----                                      |
| `email`         | string        | Email of the contact to be created          |
| `phone`         | string        | Phone number of the contact to be created   |
| `share_type`    | string        | Share channel type (SMS, Email, Whatsapp    |
| `channel_id`    | integer       | Share Channel Id created in survey sparrow  |
| `survey_id`     | integer       | ID of the survey created                    |
| `variables`     | object        | Can hold extra payload if necessary         |


## Action destination for Contact creation event

| Property Name    | Type          | Description                    |
| ------------- |:-------------:| :-----                         |
| `full_name`     | string        | Full Name of contact           |
| `phone`         | string        | Phone number of the contact    |
| `mobile`        | string        | Mobile number of the contact   |
| `email         | string        | Email of contact               |
| `job_title`     | string        | Job Title of the contact       |
| `contact_type`  | string        | Type of contact [contact,employee] |



{% include components/actions-fields.html %}