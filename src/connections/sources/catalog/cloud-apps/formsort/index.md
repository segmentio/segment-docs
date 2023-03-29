---
title: "Formsort Source"
id: f02zgzAWMG
hidden: true
---

[Formsort](https://formsort.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a low code form builder empowering product and growth teams to build and optimize highly complex, customizable flows. Increase form conversion by over 20% - without the dev time.


This source is maintained by Formsort. For any issues with the source, [contact the Formsort support team](mailto:support@formsort.com).

## Getting Started

1. From your Segment UI’s Sources page click on “Add Source”.
2. Search for “Formsort” within the Sources Catalog and confirm by clicking “Connect”.
3. Give the source a nickname and follow the set up flow to “Add Source”. The nickname is a label used in the Segment interface, and Segment creates a related schema name which you query against in your warehouse. The nickname can be whatever you like, but Segment recommends sticking to something that reflects the source itself and distinguishes amongst your environments (Eg. formsort-prod or formsort-dev).
4. Copy the Write key from the Segment UI and log in to your Formsort workspace - navigate to **Flows** > **Integrations** > **Segment** and paste the key.
5. You can choose what events will be emitted by responders and change other settings.
6. Press **Save** to connect.

## Events

The table below lists events that Formsort sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. The default behavior is for Formsort to pass the `responderUuid` associated with the user as the `userId`. This can be changed in the Formsort integration.

| Property Name  | Description                                                                                                                |
| -------------  | -------------------------------------------------------------------------------------------------------------------------- |
| EmailCollected | Responder's email was collected successfully, and the email has the data classification of "responder_email"               |
| FlowClosed     | Responder clicked the exit button to leave the flow                                                                        |
| FlowFinalized  | Responder has finished the flow and they are redirected or shown the completion screen                                     |
| FlowLoaded     | Flow has finished loading                                                                                                  |
| PhoneCollected | Responder's phone number was collected successfully, and the phone number has the data classification of "responder_phone" |
| StepCompleted  | Responder completed the step                                                                                               |
| StepLoaded     | Step was loaded                                                                                                            |
| UrlOpened      | Responder clicked a link and was redirected to a new URL                                                                   |

## Event Properties

The following table lists event properties included with all events Segment receives from Formsort.

| Property Name   | Description                      |
| --------------  | -------------------------------- |
| `event`         | Flow event type                  |
| `flowLabel`     | Label of the flow                |
| `variantLabel`  | Label of the variant             |
| `variantUuid`   | UUID of the variant              |
| `responderUuid` | UUID of the responder            |
| `userId`        | Identifying id for the responder | 

This table lists event-specific properties Formsort sends to Segment:

| Property Name | Description                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| stepId        | For step events, the name of the step                                               |
| stepIndex     | For step events, the index of the step in the flow.                                 |
| msSpentOnStep | For StepCompleted events, the time in milliseconds the responder spent on the step. |

Optionally, form answers submitted by responders can also be included in events sent to Segment. If enabled, responder answers will appear in an `answers` object for each event.

## Adding Destinations

Now that your source is set up, you can connect it to destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Formsort support team](mailto:support@formsort.com).
