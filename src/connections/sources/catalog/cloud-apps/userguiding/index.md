---
title: UserGuiding Source
---

[UserGuiding](https://userguiding.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a product adoption platform that helps product teams automate in-app experiences that turn new users into champions..

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by UserGuiding. For any issues with the source, [contact their Support team](mailto:assist@userguiding.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "UserGuiding" in the Sources Catalog, select UserGuiding, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.

   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your UserGuiding account - navigate to Settings > Integrations > Segment Integration and paste the key in the API Key textbox in the *Userguiding as a source* section to connect.

## Stream

UserGuiding uses our stream Source component to send Segment event data. It uses a server-side `track` method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

UserGuiding sends user identifiers in the `user_id` attribute in the event payload. This is the same identifier that is used in the `identify` call to UserGuiding.

## Events

The table below lists events that UserGuiding sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. UserGuiding includes the `userId` if available.

| Event Name                                             | Description                                                                                                                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |  |
| Guide started (userguiding)                            | It means that a user previews the first step of a Guide                                                                                                |
| Guide completed (userguiding)                          | It means that the user has completed all steps of a Guide                                                                                              |
| Hotspot interacted (userguiding)                       | It means that the user interacted with a Hotspot group and saw a Hotspot as content. (remember, Hotspot groups can have multiple Hotspots as contents) |
| Checklist item trigger (userguiding                    | It means that the user triggers a Checklist Guide                                                                                                      |
| Checklist item url click (userguiding)                 | It means that the user clicks a URL item on a Checklist                                                                                                |
| Checklist completed (userguiding)                      | It means that the user completed a Checklist                                                                                                           |
| Resource center guide trigger (userguiding)            | It means that the user triggered a Resource Center Guide                                                                                               |
| Resource center checklist guide trigger (userguiding)  | It means that a Guide in a Checklist put in a Resource Center as a module is triggered by a user                                                       |
| Resource center checklist item url click (userguiding) | It means that a URL item in a Checklist put in a Resource Center as a module is clicked by a user                                                      |
| Resource center external URL click (userguiding)       | It means that a user clicks an external URL in a Resource Center                                                                                       |
| Resource center article link click (userguiding)       | It means that a user clicks a search article in a Resource Center                                                                                      |
| Resource center survey trigger (userguiding)           | It means that a user has triggered a survey in a Resource Center                                                                                       |
| Survey shown (userguiding)                             | It means a survey was shown to a user                                                                                                                  |
| Survey question answer (userguiding)                   | It means a survey question was answered by a user                                                                                                      |


## Event Properties

The table below list the properties included in the events listed above.

| Property Name        | Description               | Type |
| -------------------- | ------------------------- | ---- |
| `user_id`            | User identifier           | str  |
| `guideId`            | Email event type          | int  |
| `guideName`          | Prospect user ID          | str  |
| `pageUrl`            | ID of the email           | str  |
| `hotspotGroupId`     | Sender email ID           | int  |
| `hotspotGroupName`   | Subject line of the email | str  |
| `hotspotId`          | Subject line of the email | int  |
| `hotspotTitle`       | Subject line of the email | str  |
| `checklistName`      | URL of the link clicked   | str  |
| `checklistId`        | URL of the link clicked   | int  |
| `checklistItemUrl`   | URL of the link clicked   | str  |
| `resourceCenterName` | URL of the link clicked   | str  |
| `resourceCenterID`   | URL of the link clicked   | int  |
| `resourceCenterId`   | URL of the link clicked   | int  |
| `externalUrl`        | URL of the link clicked   | str  |
| `articleLink`        | URL of the link clicked   | str  |
| `surveyId`           | URL of the link clicked   | int  |
| `surveyName`         | URL of the link clicked   | str  |
| `questionId`         | URL of the link clicked   | str  |
| `questionName`       | URL of the link clicked   | str  |
| `score`              | URL of the link clicked   | int  |
| `surveyQuestion`     | URL of the link clicked   | str  |
| `emojiScore`         | URL of the link clicked   | str  |
| `choices`            | URL of the link clicked   | str  |
| `feedback`           | URL of the link clicked   | str  |
 

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the UserGuiding support team](mailto:assist@userguiding.com).
