---
title: Bluedot Source
id: lglFhNcZ9z
---

[Bluedot](https://bluedot.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a location platform that provides an accurate and simple geofencing platform for apps. After integrating the Bluedot SDK and setting geofences, customer’s can create personalised location-based experiences for their users.

Bluedot provides self-serve predictive analytics for growth marketers, using machine learning to automate audience insights and recommendations.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources){:target="_blank"} which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Bluedot. For any issues with the source, [contact Bluedot's Support team](mailto:help@bluedot.io).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"} click **Add Source**.
2. Search for **Bluedot** in the Sources Catalog, select **Bluedot**, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.

  The name identifies this source within your workspace, and typically reflects the name of the application. The name can be anything, but Segment recommends that you use something that reflects the source itself and distinguishes amongst your environments (for example, `SourceName_Prod`, `SourceName_Staging`, or `SourceName_Dev`).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to Bluedot Canvas - navigate to Integrations > Select the Project you want link > Segment Integration and paste the key to connect.

### Send events to Segment

To send events to Segment, include the `userId` in the [Custom Event Metadata](https://docs.bluedot.io/custom-event-metadata/){:target="_blank"} of the event. Make sure to name the property `segment_userId`.

For example:

```json
"segment_userId": "<YOUR SEGMENT USER ID>"
```

The [Custom Event Metadata](https://docs.bluedot.io/custom-event-metadata/){:target="_blank"} is not persisted across SDK sessions. If the SDK is reset the Custom Event Metadata is cleared by the SDK. Segment suggests that you set the custom data every time the SDK is initiated in the app.

## Events

The table below lists events that Bluedot sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

| Event Name                       | Description                                                            |
| -------------------------------- | ---------------------------------------------------------------------- |
| `Entry Geofence`                 | Device breaches a geofence.                                            |
| `Exit Geofence`                  | Device exits a geofence                                                |
| `Tempo ETA Update`               | Tempo ETA update                                                       |
| `Tempo Stop`                     | Tempo stops tracking ETA                                               |
| `Order Registered`               | Wave register order                                                    |
| `Customer On The Way (Web)`      | Wave event type `onTheWay`                                             |
| `Customer Arrived (Web)`         | Wave event type `arrival`                                              |
| `Custom Web Event: {event type}` | Wave custom event types. (for example, `eventType: "pickedComplete"`). |

## Event properties

The table below list the properties included in the events listed above.

### Geo-trigger

The following payload contains the properties for the following events:

- `Entry Geofence`
- `Exit Geofence`

| Property Name           | Description                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `accountId`             | The ID of the Bluedot Account that the project was associated with                                                 |
| `appBuildVersion`       | Current version of the App of the triggered event                                                                  |
| `customEventMetaData`   | Custom information sent with triggered event                                                                       |
| `customerApplicationId` | Application ID of triggered event                                                                                  |
| `sdkVersion`            | SDK version of the application                                                                                     |
| `altitude`              | Altitude in metres if supplied by device sensors                                                                   |
| `altitudeAccuracy`      | Accuracy of supplied altitude                                                                                      |
| `bearing`               | The direction of motion of the device at the time of trigger event, if available                                   |
| `horizontalAccuracy`    | Accuracy in metres if supplied by device sensors                                                                   |
| `latitude`              | Latitude of triggered event                                                                                        |
| `longitude`             | Longitude of triggered event                                                                                       |
| `verticalAccuracy`      | Accuracy in metres if supplied by device sensors                                                                   |
| `time`                  | Time of the event                                                                                                  |
| `submissionTime`        | The time of event sent                                                                                             |
| `receivedAt`            | Time of event received in Bluedot’s backend                                                                        |
| `triggerChainId`        | Unique ID for triggered event                                                                                      |
| `eventTime`             | The time of the trigger event                                                                                      |
| `eventType`             | type of triggered event                                                                                            |
| `fenceId`               | Only available if trigger caused by geofence or GeoLine                                                            |
| `fenceName`             | Only available if trigger caused by geofence or GeoLine                                                            |
| `id`                    | The unique ID of the trigger                                                                                       |
| `projectId`             | The ID of the Bluedot project that the SDK was running against                                                     |
| `sdkVersion`            | The version of the Bluedot SDK                                                                                     |
| `speed`                 | The speed of the device at the time of trigger event, if available                                                 |
| `triggerId`             | The chain ID of the trigger, which can be used to associate entry and exit events                                  |
| `zoneId`                | The ID of the Bluedot Zone that the trigger was associated with                                                    |
| `zoneName`              | The name of the Bluedot Zone that the trigger was associated with                                                  |
| `deviceType`            | The type and model of device that triggered                                                                        |
| `os`                    | `iOS` or `android`                                                                                                 |
| `osVersion`             | The version of the operating system on the device that triggered                                                   |
| `installRef`            | A randomly issued installation reference, not tied to any personally identifiable data (PID) on the user’s device. |
| `notificationType`      | Type of notification event from Bluedot (Entry/Exit/Tempo/Wave)                                                    |
| `batteryLevel`          | Battery level of device at the moment of the event                                                                 |
| `lastRuleUpdate`        | Last time of the SDK updated the rules from Bluedot’s backend                                                      |
| `locationPermission`    | Location permissions granted to the App at the moment of the event                                                 |
| `viewState`             | State of the application (foreground/background)                                                                   |
| `destinationId`         | Destination ID of zone                                                                                             |
| `triggerEngine`         | Geofencing engine that triggered event. It could be either triggered by Bluedot SDK or native.                     |
| `ulid`                  | Event’s unique identifier in Bluedot’s systems                                                                     |
| `zoneInfo`              | Information of the Bluedot Zone triggered                                                                          |
| `id`                    | The ID of the Bluedot Zone that the trigger was associated with                                                    |
| `name`                  | The name of the Bluedot Zone that the trigger was associated with                                                  |
| `distance`              | Distance between entry and exit events (Only applies to exit events)                                               |
| `distanceRequired`      | Minimum distance required from Bluedot zone to trigger exit event (Only applies to exit events)                    |
| `dwellTime`             | Amount of time between entry and exits events of a Bluedot zone (Only applies to exit events)                      |

### Tempo

The following payload contains the properties for the following events:

- `Tempo ETA Update`
- `Tempo Stop`

| Property Name                                       | Description                                                                                                                                           |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accountId`                                         | The ID of the Bluedot Account that the project was associated with                                                                                    |
| `appInfo.appBuildVersion`                           | Current version of the App of the triggered event                                                                                                     |
| `appInfo.customEventMetaData`                       | Custom information sent with triggered event                                                                                                          |
| `appInfo.customerApplicationId`                     | Application ID of triggered event                                                                                                                     |
| `appInfo.sdkVersion`                                | SDK version of the application                                                                                                                        |
| `deviceInfo.deviceType`                             | The type and model of device that triggered                                                                                                           |
| `deviceInfo.os`                                     | `iOS` or `android`                                                                                                                                    |
| `deviceInfo.osVersion`                              | The version of the operating system on the device that triggered the event                                                                            |
| `eta`                                               | User’s estimated time of arrival to the destination in seconds                                                                                        |
| `etaDirection`                                      | The direction of estimation – whether the device is more than or less than the number of seconds provided.<br><br><br>- `greaterThan`<br>- `lessThan` |
| `installRef`                                        | A randomly issued installation reference, not tied to any personally identifiable data (PID) on the user’s device.                                    |
| `notificationType`                                  | This field denotes the type of notification being relayed from Bluedot's servers to yours. For a Tempo event the type will be “tempo”.                |
| `projectId`                                         | The ID of the Bluedot project that the SDK was running against                                                                                        |
| `receivedAt`                                        | Time of event received in Bluedot’s backend                                                                                                           |
| `submissionTime`                                    | The time of event sent                                                                                                                                |
| `triggerChainId`                                    | Unique identifier that can be used to connect the ETA updates coming through for one set of start to finish.                                          |
| `triggerEvents.applicationState.batteryLevel`       | Battery level of device at the moment of the event                                                                                                    |
| `triggerEvents.applicationState.lastRuleUpdate`     | Last time of the SDK updated the rules from Bluedot’s backend                                                                                         |
| `triggerEvents.applicationState.locationPermission` | Location permissions granted to the App at the moment of the event                                                                                    |
| `triggerEvents.applicationState.viewState`          | State of the application (foreground/background)                                                                                                      |
| `triggerEvents.destinationId`                       | The ID associated with the location the SDK is used to calculate the ETA                                                                              |
| `triggerEvents.eventTime`                           | The time of the trigger event                                                                                                                         |
| `triggerEvents.eventType`                           | `tempoUpdate` o `tempoStop`                                                                                                                           |
| `locations.altitude`                                | Altitude in metres if supplied by device sensors                                                                                                      |
| `locations.bearing`                                 | The direction of motion of the device at the time of trigger event, if available                                                                      |
| `locations.horizontalAccuracy`                      | Accuracy in metres if supplied by device sensors                                                                                                      |
| `locations.latitude`                                | Latitude of triggered event                                                                                                                           |
| `locations.longitude`                               | Longitude of triggered event                                                                                                                          |
| `locations.speed`                                   | The speed of the device at the time of trigger event, if available                                                                                    |
| `locations.time`                                    | Time of the event                                                                                                                                     |
| `locations.verticalAccuracy`                        | Accuracy in metres if supplied by device sensors                                                                                                      |
| `triggerEvents.triggerEngine`                       | Geofencing engine that triggered event. It could be either triggered by Bluedot SDK or native.                                                        |
| `ulid`                                              | Event’s unique identifier in Bluedot’s systems                                                                                                        |
| `zoneId`                                            | The ID of the Bluedot Zone that the trigger was associated with                                                                                       |
| `zoneName`                                          | The name of the Bluedot Zone that the trigger was associated with                                                                                     |




### Wave

The following payload contains the properties for the following events:

-  `Order Registered`
-  `Customer On The Way (Web)`
-  `Customer Arrived (Web)`
-  `Custom Web Event: {event type}`

| Property Name         | Description                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `event`               | The event type associated with the event                                                                           |
| `accountId`           | The ID of the Bluedot Account that the project was associated with                                                 |
| `customEventMetaData` | Custom information sent with triggered event                                                                       |
| `eventType`           | Type of triggered event                                                                                            |
| `os`                  | `iOS` or `Android`                                                                                                 |
| `installRef`          | A randomly issued installation reference, not tied to any personally identifiable data (PID) on the user’s device. |
| `notificationId`      | A randomly issued notification ID, not tied to any personally identifiable data (PID) on the user’s device.        |
| `notificationType`    | Type of notification event from Bluedot (Entry/Exit/Tempo/Wave)                                                    |
| `projectId`           | The ID of the Bluedot project that the SDK was running against                                                     |
| `receivedAt`          | Time of event received in Bluedot’s backend                                                                        |
| `destinationId`       | Destination ID of zone                                                                                             |
| `eventTime`           | The time of the trigger event                                                                                      |



## Add destinations

Now that your Source is configured, you can connect it with Destinations. Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the Event Delivery tool, and refer to the Destination docs for each tool for troubleshooting. If there are any issues with how the events are arriving to Segment, contact the [Bluedot support team](mailto:help@bluedot.io).
