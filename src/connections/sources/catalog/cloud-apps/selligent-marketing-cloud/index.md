---
title: Selligent Marketing Cloud Source
source-type: event
id: xn9YEaDaNS
---
{% include content/source-region-unsupported.md %}

[Selligent Marketing Cloud](https://selligent.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a highly integrated, AI-powered omnichannel marketing automation platform which enables ambitious B2C marketers to maximize every moment of interaction with today's connected consumers. Deliver ultra-personalized, highly relevant customer experiences across channels and devices, providing value swiftly and at scale.

This source is maintained by Selligent Marketing Cloud. For any issues with the source, [contact the Selligent Marketing Cloud Support team](mailto:scrum-redwood@selligent.com).

> success ""
> **Good to know**: This page is about the Selligent Marketing Cloud Segment source, which sends data _into_ Segment. There's also a page about the [Selligent Marketing Cloud Segment destination](/docs/connections/destinations/catalog/selligent-marketing-cloud/), which receives data from Segment!

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "Selligent Marketing Cloud" in the Sources Catalog, select click Selligent Marketing Cloud, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings.

   The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse.  The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).
4. Click **Add Source** to save your settings.
5. Contact your Selligent Customer Success Manager or Technical Project Manager to request that Selligent enable the Segment Source on your Selligent Marketing Cloud account.

## Events

The table below lists events that Selligent Marketing Cloud sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Selligent Marketing Cloud includes the `userId` if available.

<table>
  <tr>
   <td>Event Name</td>
   <td>Description</td>
  </tr>
  <tr>
   <td>Email Delivered</td>
   <td>Email was successfully accepted by email server</td>
  </tr>
  <tr>
   <td>Email Opened</td>
   <td>Prospect opened the email</td>
  </tr>
  <tr>
   <td>Email Link Clicked</td>
   <td>Prospect clicked a tracked email link</td>
  </tr>
  <tr>
   <td>Email Marked as Spam</td>
   <td>Prospect marked the email as Spam in their ISP</td>
  </tr>
  <tr>
   <td>Email Bounced</td>
   <td>Email server rejected the email</td>
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
   <td>`user_id`</td>
   <td>An ID used to identify the email.</td>
  </tr>
  <tr>
   <td>`event`</td>
   <td>The Event that occurred.</td>
  </tr>
  <tr>
   <td>`email_id`</td>
   <td>ID of the email.</td>
  </tr>
  <tr>
   <td>`email_subject`</td>
   <td>The email's subject line.</td>
  </tr>
  <tr>
   <td>`campaign_id`</td>
   <td>An ID used to identify a campaign.</td>
  </tr>
  <tr>
   <td>`campaign_name`</td>
   <td>A name used to identify a campaign.</td>
  </tr>
  <tr>
   <td>`link_id`</td>
   <td>ID of URL. Only for click event type.</td>
  </tr>
  <tr>
   <td>`link_name`</td>
   <td>Name of URL. Only for click event.</td>
  </tr>
  <tr>
   <td>`list_id`</td>
   <td>ID of List. Only for unsubscribe event type.</td>
  </tr>
  <tr>
   <td>`list_name`</td>
   <td>Name of List. Only for unsubscribe event type.</td>
  </tr>
  <tr>
   <td>`timestamp`</td>
   <td>Date and time the event occurred.</td>
  </tr>
  <tr>
   <td>`sentAt`</td>
   <td>Date and time of event processing to Segment from Selligent Marketing Cloud.</td>
  </tr>
</table>

## Send data to Selligent Marketing Cloud

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don't appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Selligent Marketing Cloud support team](mailto:scrum-redwood@selligent.com).
