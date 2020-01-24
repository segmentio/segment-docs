<h1>HEROW</h1>


[HEROW](https://www.herow.io) is a contextual platform for mobile application. Built around everyday behaviors and powered by location intelligence, its one-stop solution allows apps to maximize mobile engagement with their users.

With HEROW simple, straightforward SaaS platform, mobile marketers and developers can:
<ul>
    <li> better understand how, when and where their app is         being used</li>
    <li>create user segments based on real-world behaviors and     moments</li>
    <li>significantly improve engagement through contextual         notifications and in-app actions</li>
</ul>

Its SaaS platform uses hyper-precise location technology and machine-learning algorithms to provide mobile applications with true user context - a combination of location, behavior, and surroundings. 

The technology benefits all app categories - gaming, social, dating, mobility, music, news, shopping, etc. - and allows HEROW's clients to create better mobile experiences and to build long-lasting relationships with their users.

This is an [Enrichment Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by HEROW. For any issues with the source, please [reach out to their team](mailto:support@herow.io).

_**NOTE:** The HEROW Source is currently in beta, which means that they are still actively developing the source. This doc was last updated on January 24, 2020. If you are interested in joining their beta program or have any feedback to help improve the YOURINTEGRATION Source and its documentation, please [let  their team know](mailto:support@HEROW.io)!_


## Getting Started

1. From your Segment UI’s Sources page click on “Add Source”.
2. Search for "HEROW" within the Sources Catalog and confirm by clicking "Connect".
3. Give the Source a nickname and follow the setup flow to "Add Source". The nickname will be used to designate the source in the Segment interface, and Segment will create a related schema name. The schema name is the namespace you'll be querying against in your warehouse. The nickname can be whatever you like, but we recommend sticking to something that reflects the source itself and distinguishes amongst your environments (eg. HEROW_Prod, HEROW_Staging, HEROW_Dev).
4. Copy the Write key from the Segment UI and log in to your HEROW account - navigate to Settings > Integrations > Segment Integration and paste the key to connect. 

## Events

Below is a table of events that HEROW sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
   <td>Details</td>
  </tr>
  <tr>
   <td>Zone Entered</td>
   <td>User enters a geofence zone</td>
   <td>A zone is a geofence monitored by our HEROW SDK. Geofence zones are created and activated in HEROW platform.</td>
  </tr>
  <tr>
   <td>Zone Exited</td>
  <td>User leaves a geofence zone</td>
  <td>A zone is a geofence monitored by our HEROW SDK. Geofence zones are created and activated in HEROW platform.</td>
  </tr>
  <tr>
   <td>Home Entered</td>
   <td>User enters "Home" location</td>
   <td>HEROW's proprietary algorithms can automatically detect a users home location after a few days.</td>
  </tr>
  <tr>
   <td>Home Exited</td>
   <td>User leaves "Home" location</td>
   <td>HEROW's proprietary algorithms can automatically detect a users home location after a few days.</td>
  </tr>
  <tr>
   <td>Office Entered</td>
   <td>User enters "Office" location</td>
   <td>HEROW's proprietary algorithms can automatically detect a users work/office location after a few days.</td>
  </tr>
  <tr>
   <td>Office Exited</td>
   <td>User exits "Office" location</td>
   <td>HEROW's proprietary algorithms can automatically detect a users work/office location after a few days.</td>
  </tr>
   <tr>
   <td>Commute Started (Coming soon)</td>
   <td>User Starts Commute</td>
   <td>Once the HEROW platform has defined "Home" and "Work" locations for a user, our SDK will be able to track their commute.</td>
  </tr>
  <tr>
   <td>Commute Stopped (Coming soon)</td>
   <td>User ends his commute</td>
   <td>Once the HEROW platform has defined "Home" and "Work" locations for a user, our SDK will be able to track their commute.</td>
  </tr>
</table>


<h2>
Event Properties
</h2>

<p>
Below is a table of events that HEROW sends to Segment. These events will show up as tables in your warehouse, and as regular events in your other Destinations.
</p>
<p>
<b>Important note on the user id:</b> for each of the following events, the user id will be the custom user id integrated with our HEROW SDK if applicable, or the device’s id. We recommend using the Custom user Id to match with your own user database.
</p>

<h3>
Zone Entered (Geofence) Events
</h3>
<table>
    <tr>
       <td>Property Name</td>
       <td>Type</td>
       <td>Description</td>
    </tr>
    <tr>
        <td>latitude</td>
        <td>float</td>
        <td>The latitude of the user’s location at the time of the event.</td>
    <tr>
      <td>longitude</td>
      <td>float</td>
      <td>The longitude of the user’s location at the time of the event.</td>
    </tr>
    <tr>
        <td>accuracy</td>
        <td>float</td>
        <td>The accuracy of the user’s location at the time of the event in meters.</td>
    </tr>
    <tr>
        <td>geofence_id</td>
        <td>string</td>
        <td>The ID of the geofence, provided by HEROW.</td>
    </tr>
    <tr>
        <td>geofence_name</td>
        <td>string</td>
        <td>The description of the geofence.</td>
    </tr>
    <tr>
        <td>geofence_categories</td>
        <td>array of strings (comma separated)</td>
        <td>The category of the geofence.</td>
    </tr>
    <tr>
        <td>geofence_external_id</td>
        <td>string</td>
        <td>The external ID of the geofence.</td>
    </tr>
</table>
<h3>
Zone Exited (Geofence)
</h3>
<table>
    <tr>
       <td>Property Name</td>
       <td>Type</td>
       <td>Description</td>
    </tr>
    <tr>
        <td>latitude</td>
        <td>float</td>
        <td>The latitude of the user’s location at the time of the event.</td>
    <tr>
      <td>longitude</td>
      <td>float</td>
      <td>The longitude of the user’s location at the time of the event.</td>
    </tr>
    <tr>
        <td>accuracy</td>
        <td>float</td>
        <td>The accuracy of the user’s location at the time of the event in meters.</td>
    </tr>
    <tr>
        <td>geofence_id</td>
        <td>string</td>
        <td>The ID of the geofence, provided by HEROW.</td>
    </tr>
    <tr>
        <td>geofence_name</td>
        <td>string</td>
        <td>The description of the geofence.</td>
    </tr>
    <tr>
        <td>geofence_categories</td>
        <td>array of strings (comma separated)</td>
        <td>The category of the geofence.</td>
    </tr>
    <tr>
        <td>geofence_external_id</td>
        <td>string</td>
        <td>The external ID of the geofence.</td>
    </tr>
    <tr>
        <td>duration</td>
        <td>long</td>
        <td>The duration between Geofence Entered and Geofence Exited events, in minutes.</td>
    </tr>
</table>

<h3>
Home Entered
</h3>

<table>
  <tr>
   <td>Property Name</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>latitude</td>
   <td>float</td>
   <td>The latitude of the user’s location at the time of the event.</td>
  </tr>
  <tr>
   <td>longitude</td>
   <td>float</td>
   <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
   <td>accuracy</td>
   <td>float</td>
   <td>The accuracy of the user’s location at the time of the event in meters.</td>
  </tr>
</table>
<h3>
Home Exited
</h3>

<table>
  <tr>
   <td>Property Name</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>latitude</td>
   <td>float</td>
   <td>The latitude of the user’s location at the time of the event.</td>
  </tr>
  <tr>
   <td>longitude</td>
   <td>float</td>
   <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
   <td>accuracy</td>
   <td>float</td>
   <td>The accuracy of the user’s location at the time of the event in meters.</td>
  </tr>
</table>
<h3>
Office Entered
</h3>

<table>
  <tr>
   <td>Property Name</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>latitude</td>
   <td>float</td>
   <td>The latitude of the user’s location at the time of the event.</td>
  </tr>
  <tr>
   <td>longitude</td>
   <td>float</td>
   <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
   <td>accuracy</td>
   <td>float</td>
   <td>The accuracy of the user’s location at the time of the event in meters.</td>
  </tr>
</table>
<h3>
Office Exited
</h3>

<table>
  <tr>
   <td>Property Name</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>latitude</td>
   <td>float</td>
   <td>The latitude of the user’s location at the time of the event.</td>
  </tr>
  <tr>
   <td>longitude</td>
   <td>float</td>
   <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
   <td>accuracy</td>
   <td>float</td>
   <td>The accuracy of the user’s location at the time of the event in meters.</td>
  </tr>
</table>

<h3>
Commute Started (Coming soon)
</h3>

<table>
  <tr>
   <td>Property Name</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>latitude</td>
   <td>float</td>
   <td>The latitude of the user’s location at the time of the event.</td>
  </tr>
  <tr>
   <td>longitude</td>
   <td>float</td>
   <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
   <td>accuracy</td>
   <td>float</td>
   <td>The accuracy of the user’s location at the time of the event in meters.</td>
  </tr>
</table>

<h3>
Commute Ended (Coming soon)
</h3>

<table>
  <tr>
   <td>Property Name</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>latitude</td>
   <td>float</td>
   <td>The latitude of the user’s location at the time of the event.</td>
  </tr>
  <tr>
   <td>longitude</td>
   <td>float</td>
   <td>The longitude of the user at the time of the event.</td>
  </tr>
  <tr>
   <td>accuracy</td>
   <td>float</td>
   <td>The accuracy of the user’s location at the time of the event in meters.</td>
  </tr>
</table>

<h3>
User Traits
</h3>

<table>
    <tr>
        <td>Attribute Name</td>
        <td>Type</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>herow_home_postal_code</td>
        <td>string</td>
        <td>The postal code of the user's "Home" location</td>
    </tr>
    <tr>
        <td>herow_home_country</td>
        <td>string</td>
        <td>The country of the user's "Home" location</td>
    </tr>
    <tr>
        <td>herow_work_postal_code</td>
        <td>string</td>
        <td>The postal code of the user's "Office" location</td>
    </tr>
    <tr>
        <td>herow_work_country</td>
        <td>string</td>
        <td>The country of the user's "Office" location</td>
    </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If there are any issues with how the events are arriving to Segment, please [contact the HEROW team](mailto:support@HEROW.io).

