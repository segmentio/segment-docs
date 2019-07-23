---
title: Moesif API Analytics
---
[Moesif API Analytics](https://www.moesif.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps you make data-driven product decisions that grows your API platform. Using API analytics, understand how your customers and partners use your APIs and what drives long term engagement and retention.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Moesif. For any issues with the source, please [reach out to their team](mailto:support@moesif.com).

_**NOTE:** The Moesif API Analytics Source is currently in beta, which means that they are still actively developing the source. This doc was last updated on June 19, 2019. If you are interested in joining their beta program or have any feedback to help improve the Moesif API Analytics Source and its documentation, please [let  their team know](mailto:support@moesif.com)!_


## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Select Moesif API Analytics within the Source Catalog and confirm adding the source.
3. Give the Source a nickname and follow the setup flow to "Add Source".
3. Copy the Write Key from the added source. You'll need this later in Moesif.
4. Log into your [Moesif account](https://www.moesif.com/wrap/), go to the _Settings_ menu and click _Extensions_.
5. Select the Segment Extension within the extensions gallery and add your write key under _Add Partner Key_.


## User Properties

Below are tables outlining the properties included in the events listed above. Moesif will include the user's most recent context as the context object.

### Identify User
<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`userId`</td>
   <td>User Id</td>
  </tr>
  <tr>
   <td>`traits`</td>
   <td>Traits of the user</td>
  </tr>
  <tr>
   <td>`context`</td>
   <td>Context related to the user</td>
  </tr>
</table>

### User Traits
<table>
  <tr>
   <td>`company`</td>
   <td>Company Id</td>
  </tr>
  <tr>
   <td>`createdAt`</td>
   <td>Time when user was created in Moesif</td>
  <tr>
   <td>`name`</td>
   <td>User's Name</td>
  </tr>
  <tr>
   <td>`email`</td>
   <td>User's email</td>
  </tr>
  <tr>
   <td>`id`</td>
   <td>User's unique identifer</td>
  </tr>
  <tr>
   <td>`username`</td>
   <td>Username such as Twitter or Github handle</td>
  </tr>
  <tr>
   <td>`firstSeenTime`</td>
   <td>Time user was first seen on the API</td>
  </tr>
  <tr>
   <td>`lastSeenTime`</td>
   <td>Time user was last seen on the API</td>
  </tr>
  <tr>
   <td>`modifiedTime`</td>
   <td>Time when user metadata was last modified</td>
  </tr>
  <tr>
   <td>`dailyAggregation`</td>
   <td>Rollup of User's API activity</td>
  </tr>
</table>


## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If there are any issues with how the events are arriving to Segment, please [contact the Moesif team](mailto:support@moesif.com).
