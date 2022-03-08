---
title: Moesif API Analytics Source
id: tmy2gJdz77
---
{% include content/source-region-unsupported.md %}

[Moesif API Analytics](https://www.moesif.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps you drive API adoption, usage, and retention. With Moesif, track your customer journey from initial ad click to first API call while identifying at-risk customers struggling to integrate with your APIs.

The [Moesif SDKs and API gateway plugins](https://www.moesif.com/implementation?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) are open-source and support REST, GraphQL, and other APIs.

This source is maintained by Moesif. For any issues with the source, [contact the Moesif team](mailto:support@moesif.com).

## Getting Started

1. From your Segment UI's Sources page click on "Add Source".
2. Select Moesif API Analytics within the Source Catalog and confirm adding the source.
3. Give the Source a nickname and follow the set up flow to "Add Source".
3. Copy the Write Key from the added source. You'll need this later in Moesif.
4. Log into your [Moesif account](https://www.moesif.com/wrap/), go to the _Settings_ menu and click _Extensions_.
5. Select the Segment Extension within the extensions gallery and add your write key under _Add Partner Key_.

## Identify Message

Moesif sends an `identify()` message to Segment which consists of the `userId` and the user traits.

<table>
  <tr>
   <td>Field(s)</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`userId`</td>
   <td>String</td>
   <td>Unique identifier for the user in Moesif</td>
  </tr>
  <tr>
   <td>`context`</td>
   <td>Object</td>
   <td>User <a href="https://segment.com/docs/connections/spec/common/#context">context</a> like IP address and location.</td>
  </tr>
  <tr>
   <td>`traits`</td>
   <td>Object</td>
   <td>Custom <a href="https://segment.com/docs/connections/spec/identify/#traits">traits</a> of the user (See Traits Object)</td>
  </tr>
</table>

## Traits Object
The integration maps user metadata in Moesif to the Segment trait called `metadata`.
If the user is linked to a company in Moesif, the integration maps the associated company to a Segment object called `company`.

<table>
  <tr>
   <td>Field</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`id`</td>
   <td>String</td>
   <td>User Id (Same as `userId` in parent object)</td>
  </tr>
  <tr>
   <td>`createdAt`</td>
   <td>Date</td>
   <td>Time when user was created in Moesif</td>
  </tr>
  <tr>
   <td>`modifiedTime`</td>
   <td>Date</td>
   <td>Time when user was last modified</td>
  </tr>
  <tr>
   <td>`firstSeenTime`</td>
   <td>Date</td>
   <td>Time user was first seen on the API</td>
  </tr>
  <tr>
   <td>`lastSeenTime`</td>
   <td>Date</td>
   <td>Time user was last seen on the API</td>
  </tr>
  <tr>
   <td>`name`</td>
   <td>String</td>
   <td>User's Full Name</td>
  </tr>
  <tr>
   <td>`email`</td>
   <td>String</td>
   <td>User's email</td>
  </tr>
  <tr>
   <td>`username`</td>
   <td>String</td>
   <td>Username such as a Twitter handle</td>
  </tr>
  <tr>
   <td>`company`</td>
   <td>Object</td>
   <td>Company in Moesif (See Company Object)</td>
  </tr>
  <tr>
   <td>`campaign`</td>
   <td>Object</td>
   <td>Marketing campaign attribution like UTM parameters</td>
  </tr>
  <tr>
   <td>`clearbit`</td>
   <td>Object</td>
   <td>Clearbit lookup results for the user</td>
  </tr>
  <tr>
   <td>`company`</td>
   <td>Object</td>
   <td>Associated company in Moesif (See Company Object)</td>
  </tr>
  <tr>
   <td>`last24HourAggResults`</td>
   <td>Object</td>
   <td>Rollup of user's API activity from last 24 hours</td>
  </tr>
  <tr>
   <td>`metadata`</td>
   <td>Object</td>
   <td>Your user metadata</td>
  </tr>
  <tr>
   <td>`userAgent`</td>
   <td>Object</td>
   <td>Last user agent details</td>
  </tr>
</table>

## Company Object

Contains info for the associated company. Any company metadata set in Moesif is mapped to the Segment trait `company.metadata`

<table>
  <tr>
   <td>Field</td>
   <td>Type</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`id`</td>
   <td>String</td>
   <td>Unique identifier for the company in Moesif</td>
  </tr>
  <tr>
   <td>`created`</td>
   <td>Date</td>
   <td>Time when company was created in Moesif</td>
  </tr>
  <tr>
   <td>`modifiedTime`</td>
   <td>Date</td>
   <td>Time when company was last modified</td>
  </tr>
  <tr>
   <td>`firstSeenTime`</td>
   <td>Date</td>
   <td>Time user was first seen on the API</td>
  </tr>
  <tr>
   <td>`lastSeenTime`</td>
   <td>Date</td>
   <td>Time user was last seen on the API</td>
  </tr>
  <tr>
   <td>`ipAddress`</td>
   <td>String</td>
   <td>Company's last IP address</td>
  </tr>
  <tr>
   <td>`companyDomain`</td>
   <td>String</td>
   <td>Company's website domain</td>
  </tr>
  <tr>
   <td>`ttfhw_s`</td>
   <td>Integer</td>
   <td>Time to First Hello World in seconds</td>
  </tr>
  <tr>
   <td>`metadata`</td>
   <td>Object</td>
   <td>Your company metadata</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events are populating and they contains all the properties you expect. If all your events and properties are not showing up, refer to the Destination docs for troubleshooting.

If you experience any issues with how the events arrive in Segment, [contact the Moesif team](mailto:support@moesif.com).
