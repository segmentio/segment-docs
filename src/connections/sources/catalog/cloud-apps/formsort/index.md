---
title: "Formsort Source"
id: f02zgzAWMG
hidden: true
---

[Formsort](https://formsort.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a low code form builder empowering product and growth teams to build and optimize highly complex, customizable flows. Increase form conversion by over 20% - without the dev time.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Formsort. For any issues with the source, [contact their Support team](mailto:support@formsort.com).

## Getting Started

1. From your Segment UI’s Sources page click on “Add Source”.
2. Search for “Formsort” within the Sources Catalog and confirm by clicking “Connect”.
3. Give the Source a nickname and follow the set up flow to “Add Source”. The nickname is a label used in the Segment interface, and Segment creates a related schema name which you query against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (Eg. formsort-prod or formsort-dev).
4. Copy the Write key from the Segment UI and log in to your Formsort workspace - navigate to **Flows** > **Integrations** > **Segment** and paste the key.
5. You can choose what events will be emitted by responders and change other settings.
6. Press **Save** to connect.

## Events

The table below lists events that Formsort sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. The default behavior is for Formsort to pass the `responderUuid` associated with the user as the `userId`. This can be changed in the Formsort integration.

<table>
  <tr>
  </tr>
  <tr>
   <td>EmailCollected</td>
   <td>Responder's email was collected successfully, and the email has the data classification of "responder_email"</td>
  </tr>
  <tr>
   <td>FlowClosed</td>
   <td>Responder clicked the exit button to leave the flow</td>
  </tr>
  <tr>
   <td>FlowFinalized</td>
   <td>Responder has finished the flow and they are redirected or shown the completion screen</td>
  </tr>
  <tr>
   <td>FlowLoaded</td>
   <td>Flow has finished loading</td>
  </tr>
  <tr>
   <td>PhoneCollected</td>
   <td>Responder's phone number was collected successfully, and the phone number has the data classification of "responder_phone"</td>
  </tr>
  <tr>
   <td>StepCompleted</td>
   <td>Responder completed the step</td>
  </tr>
   <tr>
   <td>StepLoaded</td>
   <td>Step was loaded</td>
  </tr>
  <tr>
   <td>UrlOpened</td>
   <td>Responder clicked a link and was redirected to a new URL</td>
  </tr>  
</table>

## Event Properties

The following table lists event properties included with all events Segment receives from Formsort.

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`event`</td>
   <td>Flow event type</td>
  </tr>
  <tr>
   <td>`flowLabel`</td>
   <td>Label of the flow</td>
  </tr>
  <tr>
   <td>`variantLabel`</td>
   <td>Label of the variant</td>
  </tr>
  <tr>
   <td>`variantUuid`</td>
   <td>UUID of the variant</td>
  </tr>
  <tr>
   <td>`responderUuid"</td>
   <td>UUID of the responder</td>
  </tr>
  <tr>
   <td>`userId`</td>
   <td>Identifying id for the responder</td>
  </tr>  
</table>

This table lists event-specific properties Formsort sends to Segment:

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>stepId</td>
   <td>For step events, the named id of the step</td>
  </tr>
  <tr>
   <td>stepIndex</td>
   <td>For step events, the index of the step in the flow.</td>
  </tr>
  <tr>
   <td>msSpentOnStep</td>
   <td>For StepCompleted events, the time in millesconds the responder spent on the step.</td>
  </tr>
</table>

Optionally, form answers submitted by responders can also be included in events sent to Segment. If enabled, responder answers will appear in an `answers` object for each event.

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Formsort support team](mailto:support@formsort.com).
