---
title: Radar Source
---

[Radar](https://radar.com) is the leading geofencing and location tracking platform. You can use Radar SDKs and APIs to build a wide range of location-based product and service experiences, including pickup and delivery tracking, location-triggered notifications, location verification, store locators, address autocomplete, and more.

The Radar Segment Source is a Cloud-mode event source. Instead of packaging Radar's SDK using Segment as a wrapper, you include, configure, and initialize their SDK separately. Radar then sends all events that it detects and infers to Segment using its servers. As a result, only destinations that allow Cloud-mode are compatible with the Radar source.

The Radar platform has three products: *Geofencing and Place Detection*, *Trip Tracking*, and *APIs for Geocoding and Search*.

- **[Geofencing and Place Detection](https://radar.com/product/geofencing)**: Radar geofencing is more powerful than native iOS or Android geofencing, with cross-platform support for unlimited geofences, polygon and isochrone geofences, stop detection, and accuracy down to 10 meters. Radar's Places feature allows you to instantly configure geofencing around thousands of chains (ie: Starbucks, Walmart) and categories (ie: airports, restaurants) with the click of a button. Radar will generate a real time event on entry or exit of a custom or Places geofence to trigger messaging, drive behavioral insgihts, inform audience segmentation, and more.

- **[Trip Tracking](https://radar.com/product/trip-tracking)**: Radar has a powerful trip tracking product that allows a brand to personalize the pickup and delivery experience for brick and mortar brands and logistics use cases.
  - **Curbside Pickup and BOPIS** - When a user places an order for pickup, offer them the option to share location to reduce wait times and, for restaurants, increase food freshness. Radar will track the user’s location while en route, provide staff with a real time ETA, and produce an arrival event which can trigger an Iterable notification to the user and/or staff. These features optimize operation efficiencies at the store and lead to a much stronger customer experience.
  - **Delivery and Fleet Tracking** - Track your in-house delivery team via a driver app to be able to send ETA updates and real time arrival notifications to the end user who is expecting the delivery.

- **[Search and Geocoding APIs](https://radar.com/product/api)**: Import and search your own location data, or tap into Radar's best-in-class address and POI datasets. Leverage these APIs to power store finders, address autocomplete, forward and reverse geocoding, IP geocoding, and more.

When you enable Radar as a Segment Source, you can forward Geofences, Places, Regions, and Trip Tracking data to your warehouse or destinations.

## Getting Started

The Radar source is currently in beta. Contact Radar to configure this source.

## Radar Events

Radar will send the following events to your Segment warehouses and destinations, depending on what products you enable in Radar.

- Geofence Entered
- Geofence Exited
- Place Entered
- Place Exited
- Region Entered
- Region Exited
- Started Trip
- Updated Trip
- Approaching Trip Destination
- Arrived at Trip Destination
- Stopped Trip

## Radar Event Properties

Below are popular examples of events passed into Segment from Radar. For a complete view of the events that Radar passes into Segment, visit [Radar's Segment Events Mapping documentation](https://radar.com/documentation/integrations/segment#event-mapping)

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
    <td>List of the [categories of the place](https://www.radar.com/documentation/places/categories). </td>
  </tr>
  <tr>
    <td>place_chain_name</td>
    <td>string</td>
    <td>The name of the [chain of the place](https://www.radar.com/documentation/places/chains).</td>
  </tr>
  <tr>
    <td>place_chain_slug</td>
    <td>string</td>
    <td>A human-readable unique ID for the [chain of the place](https://www.radar.com/documentation/places/chains).</td>
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
    <td>List of the [categories of the place](https://www.radar.com/documentation/places/categories).</td>
  </tr>
  <tr>
    <td>place_chain_name</td>
    <td>string</td>
    <td>The name of the [chain of the place](https://www.radar.com/documentation/places/chains).</td>
  </tr>
  <tr>
    <td>place_chain_slug</td>
    <td>string</td>
    <td>A human-readable unique ID for the [chain of the place](https://www.radar.com/documentation/places/chains).</td>
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

Radar will also send the following user traits to Segment, depending on Radar user state when Radar events are sent to Segment. For a complete view of the user attributes that Radar passes into Segment, visit [Radar's Segment User Mapping documentation](https://radar.com/documentation/integrations/segment#user-mapping)

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
    <td>List of the [categories of the place](https://www.radar.com/documentation/places/categories).</td>
  </tr>
  <tr>
    <td>radar_place_chain_name</td>
    <td>string</td>
    <td>The name of the [chain of the user's last known place](https://www.radar.com/documentation/places/chains).</td>
  </tr>
  <tr>
    <td>radar_place_chain_slug</td>
    <td>string</td>
    <td>A human-readable unique ID for the [chain of the user's last known place](https://www.radar.com/documentation/places/chains).</td>
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
