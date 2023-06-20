---
## title: Inflection Source

[Inflection](https://inflection.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides a B2B marketing automation platform for product-led growth companies.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Inflection. For any issues with the source, [contact their Support team](mailto:support@inflection.io).

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "Inflection" in the Sources Catalog, select Inflection, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings.

   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI and log in to your Inflection account - navigate to Connections > Add a new connection > Segment Integration > Select Source > and paste the write key in the Segment as Destination Field.

## Stream 

Inflection uses our stream Source component to send Segment event data. It uses a server-side (select from `track`, `identify`, `page`, `group`) method(s) to send data to Segment. 

The default behavior is for Inflection to pass the userId associated with the email recipient as the userId. There are cases in which Inflection does not have an associated userId, in which case the Inflection's personId will be passed in as the anonymousId. Once Inflection receives the userId for the email (during a segment sync/edit contact etc), It will send an Identify call with both the anonymousId (Inflection personId) and userId to Segment.

## Events

The table below lists events that Inflection sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Inflection includes the `userId` if available.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Email Delivered</td>
   <td>Email was sent successfully</td>
  </tr>
  <tr>
   <td>Email Opened</td>
   <td>Prospect opened the email</td>
  </tr>
  <tr>
   <td>Email Unique Opens</td>
   <td>Unique email open by a prospect</td>
  </tr>
  <tr>
   <td>Email Bounced</td>
   <td>Email servers rejected the email</td>
  </tr>
  <tr>
   <td>Email Reported as Spam</td>
   <td>Prospect reported the email as spam</td>
  </tr>
  <tr>
   <td>Link Clicked</td>
   <td>Prospect clicked the tracking link</td>
  </tr>
  <tr>
   <td>Unique Link Click</td>
   <td>Unique tracking link click by a prospect</td>
  </tr>
  <tr>
   <td>Unique Link Click per Unique Open</td>
   <td>Unique tracking link click per unique open by a prospect</td>
  </tr>
  <tr>
   <td>Email Unsubscribed</td>
   <td>Prospect clicked the unsubscribe link</td>
  </tr>
</table>

## Event Properties

The table below list the properties included in the events listed above.

<table>
  <tr>
   <td>Property Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>`event`</td>
   <td>Email event type</td>
  </tr>
  <tr>
   <td>`userId`</td>
   <td>Prospect email ID</td>
  </tr>
  <tr>
   <td>`email_id`</td>
   <td>ID of the email</td>
  </tr>
  <tr>
   <td>`campaign_id`</td>
   <td>Campaign ID</td>
  </tr>
  <tr>
   <td>`campaign_run_id`</td>
   <td>Campaign Run ID</td>
  </tr>
  <tr>
   <td>`campaign_name`</td>
   <td>Campaign Name</td>
  </tr>
  <tr>
   <td>`email_subject`</td>
   <td>Subject line of the email</td>
  </tr>
  <tr>
   <td>`email_link_url`</td>
   <td>URL of the link clicked</td>
  </tr>
  <tr>
   <td>`is_unique_open`</td>
   <td>Unique email open by a prospect (true or false)</td>
  </tr>
  <tr>
   <td>`is_unique_click`</td>
   <td>Unique tracking link by a prospect (true or false)</td>
  </tr>
</table>

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Inflection support team](mailto:support@inflection.io).

---