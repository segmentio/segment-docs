---
title: Herow
beta: true
id: xJSb170s6B
---
{% include content/source-region-unsupported.md %}

[HEROW](https://www.herow.io) is a contextual platform for mobile application. Built around everyday behaviors and powered by location intelligence, its one-stop solution allows apps to maximize mobile engagement with their users.

This is an [Enrichment Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by HEROW. For any issues with the source, [contact the HEROW Support team](mailto:support@herow.io).

{% include content/beta-note.md %}


## Getting Started

1. From your Segment UI's Sources page click on “Add Source”.
2. Search for "HEROW" within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the set up flow to "Add Source". The nickname will be used to designate the source in the Segment interface, and Segment will create a related schema name. The schema name is the namespace you'll be querying against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (eg. HEROW_Prod, HEROW_Staging, HEROW_Dev).
4. Copy the Write key from the Segment UI and log in to your HEROW account - navigate to Settings > Integrations > Segment Integration and paste the key to connect.

## Events

Below is a table of events that HEROW sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations.

| Event Name | Description | Details|
| -------- | -------- | -------- |
|Zone Entered| User enters a geofence zone| A zone is a geofence monitored by our HEROW SDK. Geofence zones are created and activated in HEROW platform.|
|Zone Exited|User leaves a geofence zone|A zone is a geofence monitored by our HEROW SDK. Geofence zones are created and activated in HEROW platform.|
|Home Entered|User enters "Home" location|HEROW's proprietary algorithms can automatically detect a users home location after a few days.|
|Home Exited|User leaves "Home" location|HEROW's proprietary algorithms can automatically detect a users home location after a few days.|
|Office Entered|User enters "Office" location|HEROW's proprietary algorithms can automatically detect a users work/office location after a few days.|
|Office Exited|User exits "Office" location|HEROW's proprietary algorithms can automatically detect a users work/office location after a few days.|
|Commute Started (Coming soon)|User Starts Commute|Once the HEROW platform has defined "Home" and "Work" locations for a user, our SDK will be able to track their commute.|
|Commute Stopped (Coming soon)|User ends his commute|Once the HEROW platform has defined "Home" and "Work" locations for a user, our SDK will be able to track their commute.|

## Event Properties

Below is a table of events that HEROW sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations.

**Important note on the user id:** for each of the following events, the user id will be the custom user id integrated with our HEROW SDK if applicable, or the device's id. We recommend using the Custom user Id to match with your own user database.


### Zone Entered (Geofence) Events

|Property Name|Type|Description|
| -------- | -------- | -------- |
|latitude|float|The latitude of the user's location at the time of the event.|
|longitude|float|The longitude of the user's location at the time of the event.|
|accuracy|float|The accuracy of the user's location at the time of the event in meters.|
|geofence_id|string|The ID of the geofence, provided by HEROW.|
|geofence_name|string|The description of the geofence.|
|geofence_categories|array of strings (comma separated)| The category of the geofence.|
|geofence_external_id|string|The external ID of the geofence.|




### Zone Exited (Geofence)

|Property Name|Type|Description|
| -------- | -------- | -------- |
|latitude|float|The latitude of the user's location at the time of the event.|
|longitude|float|The longitude of the user's location at the time of the event.|
|accuracy|float|The accuracy of the user's location at the time of the event in meters.|
|geofence_id|string|The ID of the geofence, provided by HEROW.|
|geofence_name|string|The description of the geofence.|
|geofence_categories|array of strings (comma separated)|The category of the geofence.|
|geofence_external_id|string|The external ID of the geofence.|
|duration|long|The duration between Geofence Entered and Geofence Exited events, in minutes.|


### Home Entered

|Property Name|Type|Description|
| -------- | -------- | -------- |
|latitude|float|The latitude of the user's location at the time of the event.|
|longitude|float|The longitude of the user at the time of the event.|
|accuracy|float|The accuracy of the user's location at the time of the event in meters.|




### Home Exited

|Property Name|Type|Description|
| -------- | -------- | -------- |
|latitude|float|The latitude of the user's location at the time of the event.|
|longitude|float|The longitude of the user at the time of the event.|
|accuracy|float|The accuracy of the user's location at the time of the event in meters.|


### Office Entered

|Property Name|Type|Description|
| -------- | -------- | -------- |
|latitude|float|The latitude of the user's location at the time of the event.|
|longitude|float|The longitude of the user at the time of the event.|
|accuracy|float|The accuracy of the user's location at the time of the event in meters.|

### Office Exited

|Property Name|Type|Description|
| -------- | -------- | -------- |
|latitude|float|The latitude of the user's location at the time of the event.|
|longitude|float|The longitude of the user at the time of the event.|
|accuracy|float|The accuracy of the user's location at the time of the event in meters.|


### Commute Started (Coming soon)

|Property Name|Type|Description|
| -------- | -------- | -------- |
|latitude|float|The latitude of the user's location at the time of the event.|
|longitude|float|The longitude of the user at the time of the event.|
|accuracy|float|The accuracy of the user's location at the time of the event in meters.|

### Commute Ended (Coming soon)

|Property Name|Type|Description|
| -------- | -------- | -------- |
|latitude|float|The latitude of the user's location at the time of the event.|
|longitude|float|The longitude of the user at the time of the event.|
|accuracy|float|The accuracy of the user's location at the time of the event in meters.|

### User Traits

|Attribute Name|Type|Description|
| -------- | -------- | -------- |
|herow_home_postal_code|string|The postal code of the user's "Home" location|
|herow_home_country|string|The country of the user's "Home" location|
|herow_work_postal_code|string|The postal code of the user's "Office" location|
|herow_work_country|string|The country of the user's "Office" location|



## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the HEROW team](mailto:support@HEROW.io).
