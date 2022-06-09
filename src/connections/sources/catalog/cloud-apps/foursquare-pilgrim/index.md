---
title: Foursquare Pilgrim
beta: true
id: Eek5OnuA7e
---
{% include content/source-region-unsupported.md %}

[Foursquare's Pilgrim SDK](https://developer.foursquare.com/pilgrimsdk) provides real-time event triggering based upon your users' location in the physical world, allowing you to harness our powerful geotargeting capabilities to send those events to other services using Segment.

This destination is maintained by Foursquare. For any issues with the destination, [contact the Foursquare Developer Support team](mailto:developers@foursquare.com).

{% include content/beta-note.md %}


## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Foursquare Pilgrim" in the Catalog, select it, and choose which of your sources to connect the it to.
3. Once you save Foursquare Pilgrim as a source, copy your "Write Key".
4. Go to your [Foursquare Developer Console](https://foursquare.com/developers/apps/) and create a new Segment integration in your Foursquare app's Pilgrim SDK console. There you can enter the Segment "Write Key" into the Segment Integration Configuration screen.

## Events

Below is a table of events that Foursquare's Pilgrim SDK sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations. Foursquare will send through the `userId` if available.

| Event Name | Description |
| -------- | -------- |
| placeArrival | Device has arrived at a venue. Usually occurs after 3-7 minutes. |
| placeDeparture | Device has left a visited venue. |
| placeHistorical | Device previously arrived or departed a venue, but the device didn't have network connectivity at the time, but we're letting you know as soon as we have connectivity again. |
| geofenceEnter | Device has entered a venue, polygon or lat/lng geofence. |
| geofenceDwell | Device has remained within geofence for pre-determined time. |
| geofenceVenueConfirmed | Device has dwelled within geofence AND Foursquare thinks this is actually the venue the device is at. |
| geofenceExit | Device has left geofence. |


### Event Properties

Below are tables outlining the properties included in the events listed above.

#### Place Visit Event Properties
Note: all fields are presented as strings.

| Property Name         | Description                                                                                 | Values                         |
| --------------------- | ------------------------------------------------------------------------------------------- | ------------------------------ |
| address             | Address of visit venue                                                                      | String                         |
| city                | City of visit venue                                                                         | String                         |
| confidence          | How likely Foursquare thinks it's correct                                                   | low, medium, high              |
| country             | Country of visit venue                                                                      | String                         |
| crossStreet         | Cross street of visit venue                                                                 | String                         |
| lat                 | Latitude of event                                                                           | Double                         |
| lng                 | Longitude of event                                                                          | Double                         |
| locationType        | Indicates if Foursquare thinks this location is device's home or work, otherwise uses venue | work, home, venue              |
| primaryCategoryId   | Foursquare Category ID of visit venue                                                       | String                         |
| primaryCategoryName | Human readable category name of visit venue                                                 | String                         |
| state               | Abbreviation of state or province of visit venue                                            | String                         |
| timestamp           | ISO 8601 timestamp of when event happened                                                   | Timestamp                      |
| venueId             | Foursquare ID of visit venue                                                                | String                |
| venueName           | Name of visit venue                                                                         | String                         |
| visitType           | Visit type                                                                                  | arrival, departure, historical |
| zipCode             | Zip or postal code for visit venue                                                          | String                         |

Example:
```js
"address": "225 W Ohio St",
"city": "Chicago",
"confidence": "high",
"country": "US",
"crossStreet": "",
"lat": "41.892114",
"lng": "-87.635638",
"locationType": "work",
"primaryCategoryId": "4bf58dd8d48988d130941735",
"primaryCategoryName": "Building",
"probability": "0.5112834298670852",
"state": "IL",
"timestamp": "2020-01-22T15:04:55.000Z",
"venueId": "4d21e2ffdd6a236a9c514338",
"venueName": "225 West Ohio",
"visitId": "5e286497d6d764000801604d",
"visitType": "arrival",
"zipCode": "60654"
```

#### Geofence Event Properties

| Property Name | Description | Values |
| -------- | -------- | -------- |
| categoryIds | Comma separated string of Foursquare category IDs | String |
| geofenceEventType | Geofence event type | venueEnter, venueDwell, venueConfirmed, venueExit |
| geofenceId | Foursquare Geofence ID | String |
| geofenceLat | Latitude of triggered geofence center | Double |
| geofenceLng | Longitude of triggered geofence center | Double |
| geofenceName | Name of triggered geofence | String |
| geofenceProperties | Custom properties of triggered geofence | Key/value Pair |
| radius | Minimum 50m, radius of triggered geofence | Int |
| venueChainIds | Comma separated string of Foursquare chain IDs | String |
| venueId | Foursquare ID of geofenced venue | String |


Example:
```js
"categoryIds": "",
"geofenceEventType": "venueEnter",
"geofenceId": "5dae122e0444bf0008d7f550",
"geofenceLat": "41.89213",
"geofenceLng": "-87.63534",
"geofenceName": "Foursquare Chicago",
"geofenceProperties": {},
"radius": "100.0",
"venueChainIds": "",
"venueId": "52af211911d2aa9d4a1f0e0a"
```

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check that your events appear and contain all the expected properties. If events and properties do not appear, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the Foursquare team](mailto:developers@foursquare.com).
