---
title: Radar Source
---

Radar is the location platform for mobile apps. You can use Radar to add location context and tracking to your apps in less than ten lines of code. The Radar Segment Source is a Cloud-mode event source. Instead of packaging Radar's SDK using Segment as a wrapper, you include, configure, and initialize their SDK separately. Radar then sends all events that it detects and infers to Segment using its servers. As a result, only destinations that allow Cloud-mode are compatible with the Radar source.

The Radar platform has three products: *Geofences*, *Insights*, and *Places*.

- **[Geofences](https://www.onradar.com/documentation/geofences)**:  Radar geofencing is more powerful than native iOS or Android geofencing, with cross-platform support for unlimited geofences, polygon geofences, stop detection, and accuracy down to 30 meters. Create geofences to receive the following events: Geofence Entered, Geofence Exited

- **[Insights](https://www.onradar.com/documentation/insights)**: Radar can learn a user's approximate home and work locations and tell you when a user is at home, at work, or traveling. Turn on Insights to receive the following events: Home Entered, Home Exited, Office Entered, Office Exited, Traveling Started, Traveling Stopped

- **[Places](https://www.onradar.com/documentation/places)**: Radar can tell you when a user visits a place, even if you haven't set up a geofence for that place. Places have category and chain information. Radar is integrated with Facebook Places, the same place database that powers Facebook and Instagram, with over 140M places worldwide. Turn on Places to receive the following events: Place Entered, Place Exited

When you enable Radar as a Segment Source, you can forward Geofences, Insights, and Places data to your warehouse or destinations.

## Getting Started

The Radar source is currently in beta. Contact Radar to configure this source.

## Radar Events

Radar will send the following events to your Segment warehouses and destinations, depending on what products you enable in Radar.

- Geofence Entered
- Geofence Exited
- Home Entered
- Home Exited
- Office Entered
- Office Exited
- Traveling Started
- Traveling Stopped
- Place Entered
- Place Exited

## Radar Event Properties

### Geofence Entered

<table>
  <tr>
    <td>Property Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>latitude</td>
    <td>float</td>
    <td>The latitude of the user's location at the time of the event.</td>
  </tr>
  <tr>
    <td>longitude</td>
    <td>float</td>
    <td>The longitude of the user's location at the time of the event.</td>
  </tr>
  <tr>
    <td>accuracy</td>
    <td>float</td>
    <td>The accuracy of the user's location at the time of the event in meters.</td>
  </tr>
  <tr>
    <td>geofence_id</td>
    <td>string</td>
    <td>The ID of the geofence, provided by Radar.</td>
  </tr>
  <tr>
    <td>geofence_description</td>
    <td>string</td>
    <td>The description of the geofence.</td>
  </tr>
  <tr>
    <td>geofence_tag</td>
    <td>string</td>
    <td>The tag of the geofence.</td>
  </tr>
  <tr>
    <td>geofence_external_id</td>
    <td>string</td>
    <td>The external ID of the geofence.</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>string</td>
    <td>The confidence level of the event, one of low, medium, or high.</td>
  </tr>
</table>


### Geofence Exited

<table>
  <tr>
    <td>Property Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>latitude</td>
    <td>float</td>
    <td>The latitude of the user's location at the time of the event.</td>
  </tr>
  <tr>
    <td>longitude</td>
    <td>float</td>
    <td>The longitude of the user's location at the time of the event.</td>
  </tr>
  <tr>
    <td>accuracy</td>
    <td>float</td>
    <td>The accuracy of the user's location at the time of the event in meters.</td>
  </tr>
  <tr>
    <td>geofence_id</td>
    <td>string</td>
    <td>The ID of the geofence, provided by Radar.</td>
  </tr>
  <tr>
    <td>geofence_description</td>
    <td>string</td>
    <td>The description of the geofence.</td>
  </tr>
  <tr>
    <td>geofence_tag</td>
    <td>string</td>
    <td>The tag of the geofence.</td>
  </tr>
  <tr>
    <td>geofence_external_id</td>
    <td>string</td>
    <td>The external ID of the geofence.</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>string</td>
    <td>The confidence level of the event, one of low, medium, or high.</td>
  </tr>
  <tr>
    <td>duration</td>
    <td>float</td>
    <td>The duration between Geofence Entered and Geofence Exited events, in minutes.</td>
  </tr>
</table>


### Home Entered

<table>
  <tr>
    <td>Property Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>latitude</td>
    <td>float</td>
    <td>The latitude of the user's location at the time of the event.</td>
  </tr>
  <tr>
    <td>longitude</td>
    <td>float</td>
    <td>The longitude of the user's location at the time of the event.</td>
  </tr>
  <tr>
    <td>accuracy</td>
    <td>float</td>
    <td>The accuracy of the user's location at the time of the event in meters.</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>string</td>
    <td>The confidence level of the event, one of low, medium, or high.</td>
  </tr>
</table>


### Home Exited

<table>
  <tr>
    <td>Property Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>latitude</td>
    <td>float</td>
    <td>The latitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>longitude</td>
    <td>float</td>
    <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>accuracy</td>
    <td>float</td>
    <td>The accuracy of the user's location at the time of the event in meters.</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>string</td>
    <td>The confidence level of the event, one of low, medium, or high.</td>
  </tr>
</table>


### Office Entered

<table>
  <tr>
    <td>Property Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>latitude</td>
    <td>float</td>
    <td>The latitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>longitude</td>
    <td>float</td>
    <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>accuracy</td>
    <td>float</td>
    <td>The accuracy of the user's location at the time of the event in meters.</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>string</td>
    <td>The confidence level of the event, one of low, medium, or high.</td>
  </tr>
</table>


### Office Exited

<table>
  <tr>
    <td>Property Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>latitude</td>
    <td>float</td>
    <td>The latitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>longitude</td>
    <td>float</td>
    <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>accuracy</td>
    <td>float</td>
    <td>The accuracy of the user's location at the time of the event in meters.</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>string</td>
    <td>The confidence level of the event, one of low, medium, or high.</td>
  </tr>
</table>


### Traveling Started

<table>
  <tr>
    <td>Property Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>latitude</td>
    <td>float</td>
    <td>The latitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>longitude</td>
    <td>float</td>
    <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>accuracy</td>
    <td>float</td>
    <td>The accuracy of the user's location at the time of the event in meters.</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>string</td>
    <td>The confidence level of the event, one of low, medium, or high.</td>
  </tr>
</table>


### Traveling Stopped

<table>
  <tr>
    <td>Property Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>latitude</td>
    <td>float</td>
    <td>The latitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>longitude</td>
    <td>float</td>
    <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>accuracy</td>
    <td>float</td>
    <td>The accuracy of the user's location at the time of the event in meters.</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>string</td>
    <td>The confidence level of the event, one of low, medium, or high.</td>
  </tr>
</table>


### Place Entered

<table>
  <tr>
    <td>Property Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>latitude</td>
    <td>float</td>
    <td>The latitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>longitude</td>
    <td>float</td>
    <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>accuracy</td>
    <td>float</td>
    <td>The accuracy of the user's location at the time of the event in meters.</td>
  </tr>
  <tr>
    <td>place_id</td>
    <td>string</td>
    <td>The ID of the place, provided by Radar.</td>
  </tr>
  <tr>
    <td>place_name</td>
    <td>string</td>
    <td>The name of the place.</td>
  </tr>
  <tr>
    <td>place_facebook_id</td>
    <td>string</td>
    <td>The Facebook ID of the place.</td>
  </tr>
  <tr>
    <td>place_categories</td>
    <td>array <string></td>
    <td>List of the [categories of the place](https://www.onradar.com/documentation/places/categories). </td>
  </tr>
  <tr>
    <td>place_chain_name</td>
    <td>string</td>
    <td>The name of the [chain of the place](https://www.onradar.com/documentation/places/chains).</td>
  </tr>
  <tr>
    <td>place_chain_slug</td>
    <td>string</td>
    <td>A human-readable unique ID for the [chain of the place](https://www.onradar.com/documentation/places/chains).</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>string</td>
    <td>The confidence level of the event, one of low, medium, or high.</td>
  </tr>
</table>


### Place Exited

<table>
  <tr>
    <td>Property Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>latitude</td>
    <td>float</td>
    <td>The latitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>longitude</td>
    <td>float</td>
    <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
    <td>accuracy</td>
    <td>float</td>
    <td>The accuracy of the user's location at the time of the event in meters.</td>
  </tr>
  <tr>
    <td>placeId</td>
    <td>string</td>
    <td>The ID of the place, provided by Radar.</td>
  </tr>
  <tr>
    <td>place_name</td>
    <td>string</td>
    <td>The name of the place.</td>
  </tr>
  <tr>
    <td>place_facebook_id</td>
    <td>string</td>
    <td>The Facebook ID of the place.</td>
  </tr>
  <tr>
    <td>place_categories</td>
    <td>array <string></td>
    <td>List of the [categories of the place](https://www.onradar.com/documentation/places/categories).</td>
  </tr>
  <tr>
    <td>place_chain_name</td>
    <td>string</td>
    <td>The name of the [chain of the place](https://www.onradar.com/documentation/places/chains).</td>
  </tr>
  <tr>
    <td>place_chain_slug</td>
    <td>string</td>
    <td>A human-readable unique ID for the [chain of the place](https://www.onradar.com/documentation/places/chains).</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>string</td>
    <td>The confidence level of the event, one of low, medium, or high.</td>
  </tr>
  <tr>
    <td>duration</td>
    <td>float</td>
    <td>The duration between Place Entered and Place Exited events, in minutes.</td>
  </tr>
</table>


## Radar User Traits

Radar will also send the following user traits to Segment, depending on Radar user state when Radar events are sent to Segment:

<table>
  <tr>
    <td>Trait</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>radar_id</td>
    <td>string</td>
    <td>The ID of the user, provided by Radar.</td>
  </tr>
  <tr>
    <td>radar_location_latitude</td>
    <td>float</td>
    <td>The latitude of the user user's last known location.</td>
  </tr>
  <tr>
    <td>radar_location_longitude</td>
    <td>float</td>
    <td>The longitude of the user's last known location.</td>
  </tr>
  <tr>
    <td>radar_updated_at</td>
    <td>string</td>
    <td>The datetime when the user's location was last updated. ISO string in UTC.</td>
  </tr>
  <tr>
    <td>radar_geofence_ids</td>
    <td>array <string></td>
    <td>An array of IDs of the user's last known geofences.</td>
  </tr>
  <tr>
    <td>radar_geofence_description</td>
    <td>array <string></td>
    <td>An array of descriptions of the user's last known geofences.</td>
  </tr>
  <tr>
    <td>radar_geofence_tags</td>
    <td>array <string></td>
    <td>An array of tags of the user's last known geofences.</td>
  </tr>
  <tr>
    <td>radar_geofence_external_ids</td>
    <td>array <string></td>
    <td>An array of external IDs of the user's last known geofences.</td>
  </tr>
  <tr>
    <td>radar_place_id</td>
    <td>string</td>
    <td>The ID of the user's last known place, provided by Radar.</td>
  </tr>
  <tr>
    <td>radar_place_name</td>
    <td>string</td>
    <td>The name of the user's last known place.</td>
  </tr>
  <tr>
    <td>radar_place_facebook_id</td>
    <td>string</td>
    <td>The Facebook ID of the user's last known place.</td>
  </tr>
  <tr>
    <td>radar_place_categories</td>
    <td>array <string></td>
    <td>List of the [categories of the place](https://www.onradar.com/documentation/places/categories).</td>
  </tr>
  <tr>
    <td>radar_place_chain_name</td>
    <td>string</td>
    <td>The name of the [chain of the user's last known place](https://www.onradar.com/documentation/places/chains).</td>
  </tr>
  <tr>
    <td>radar_place_chain_slug</td>
    <td>string</td>
    <td>A human-readable unique ID for the [chain of the user's last known place](https://www.onradar.com/documentation/places/chains).</td>
  </tr>
  <tr>
    <td>radar_insights_state_home</td>
    <td>boolean</td>
    <td>A boolean indicating whether the user is at home, based on learned home location.</td>
  </tr>
  <tr>
    <td>radar_insights_state_office</td>
    <td>boolean</td>
    <td>A boolean indicating whether the user is at the office, based on learned office location.</td>
  </tr>
  <tr>
    <td>radar_insights_state_traveling</td>
    <td>boolean</td>
    <td>A boolean indicating whether the user is traveling, based on learned home location.</td>
  </tr>
</table>
