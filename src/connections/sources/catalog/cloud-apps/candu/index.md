---
title: Candu Source
beta: true
source-type: event
id: nmb56PunPc
---
{% include content/source-region-unsupported.md %}

[Candu](https://candu.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the first UI editor for enterprise applications that allows you to drag and drop your own UI components to build product experiences — no coding required.
 
Candu's Source integration automatically returns user interaction data to Segment, where you can join it with production data. This allows you to understand how a user's interactions with Candu content drive downstream behaviors, such as feature adoption and renewal. 

This source is maintained by Candu. For any issues with the source, [contact the Candu support team](mailto:support@candu.ai).

> success ""
> **Good to know**: This page is about the Candu Segment source, which sends data _into_ Segment. There's also a page about the [Candu Segment destination](https://segment.com/docs/connections/destinations/catalog/candu/), which receives data from Segment!


## Getting Started

1. From the Sources catalog page in your workspace click **Add Source**.
2. Search for "Candu" in the Sources Catalog and click on the Candu tile. Click **Add source**.
3. Give the Source a label or nickname and follow the set up flow to "Add Source". 

   The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (e.g., Candu_Prod, Candu_Staging, Candu_Dev).The nickname is used to designate the source in the Segment app, and Segment creates a schema using this name. The schema name is the namespace you query against if you want to see this data in your warehouse. 
4. Copy the Write key from the Segment UI and log in to your Candu account - navigate to Settings > Integrations > Segment Source and paste the key to connect. 

Congratulations! The integration is up and running!


## Events
Below is a list of events Candu sends to Segment

| Collection                | Type  | Description                                    |
|:------------------------- |:----- |:---------------------------------------------- |
| tutorial.view            | Event | Fires when a user sees content (screen event)      |
| tutorial.interaction           | Event | Fires when a user clicks an element (track event)         |

## Event properties

The tables below list the properties included in the events listed above.

#### tutorial.view

| Property        | Type   | Description                                                            |
| --------------- | ------ |:---------------------------------------------------------------------- |
| tutorialId        | Integer | ID of the Tutorial the user viewed                         |
| segmentId   | String | ID of the user segment                                |
| portalId     | Integer | ID of the portal the user accessed   |
| versionId   | String | ID of the user |

#### tutorial.interaction

| Property        | Type   | Description                                                            |
| --------------- | ------ |:---------------------------------------------------------------------- |
| tutorialId        | Integer | ID of the Tutorial the user viewed                         |
| segmentId   | String | ID of the user segment                                |
| portalId     | Integer | ID of the portal the user accessed   |
| versionId   | String | ID of the version |
| eventName   | String | The type of interaction being tracked |


## Adding Destinations

The Candu Source works best when you also connect Candu as a Destination. With the [Candu Destination](https://segment.com/docs/connections/destinations/catalog/candu/), you can use Segment to send Candu user and event data, which you can use to personalize product experiences for different users. 

If you experience issues with how Candu events arrive to Segment, [contact the Candu support team](mailto:support@candu.ai).
