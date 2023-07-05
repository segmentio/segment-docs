---
title: 'Listrak Source'
hidden: true
private: true
---
{% include content/source-region-unsupported.md %}

> info ""
> The Listrak Source is in beta, and Listrak is still developing the source. To join Listrak's beta program or to give any feedback to help improve the Listrak Source and its documentation, [let Listrak know](mailto:support@listrak.com).

Listrak is the retail industry’s leading customer engagement platform. Listrak delivers results for more than 1,000 retailers by providing best-in-class email, text message marketing, identity resolution marketing and push notifications through seamless cross-channel orchestration. Listrak’s data-first approach delivers 1:1 personalization at scale so you can send messages at precisely the right time across the right combination of channels and devices to maximize customer engagement, revenue, and lifetime value.

The Listrak as an Event Cloud Source integration enables marketers to utilize behavioral activities such as sending, opening, clicking, converting, bouncing, abuse complaints, and unsubscribing events within the Segment platform. This capability empowers marketers to perform downstream analysis by leveraging additional platform integrations set up as Segment destinations.

[Listrak](https://listrak.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} provides self-serve predictive analytics for growth marketers, using machine learning to automate audience insights and recommendations.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources){:target="_blank"} can export data into your Segment warehouse and federate the exported data into your other enabled Segment Destinations.

Listrak as an Event Cloud Source enables marketers to align contacts in Listrak’s lists to audiences in Segment.

Listrak maintains this Source. For any issues with the source, [contact Listrak's Support team](mailto:support@listrak.com).

## Getting Started

1.	From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"} click **Add Source**.

1.  Search for **Listrak** in the Sources Catalog, select **Listrak**, and click **Add Source**.

1.	On the next screen, give the Source a nickname configure any other settings.
    - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example, `Listrak_Prod`, `Listrak_Staging`, `Listrak_Dev`).

1.	Click **Add Source** to save your settings.

1.	Copy the Write key from the Segment UI and log in to your Listrak account - navigate to **Integrations > Integrations Manager > New Integration > Segment Integration**.
    - You should see the Information tab for the Segment Integration.
    - Click the Setup tab, where you'll find input fields that allow you to enter the write key as well as other relevant information.

## Components

**Stream**

Listrak uses Segment's Source component to send Segment event data. It uses server-side Track and Identify methods to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

The default behavior is for Listrak to pass the `userId` associated with the email recipient as the `userId`. The Listrak Segment integration maps a Listrak `Segmentation Field` to Segment's `userId`. If no value for the `Segmentation Field` exists, Listrak won't pass a `userId`. Listrak always uses the contact’s email address as the `anonymousId` and always adds a trait called `email` with the user's email. Listrak also provides a trait that contains the Listrak `listId` with the name `Listrak_list_{listId}`, where `{listId}` is the id of the list, for example, `Listrak_list_12345`.


**Events**

The following table lists events that Listrak sends to Segment. These events appear as tables in your warehouse and as regular events in other Destinations. Listrak includes the `userId` if available.

The following events will be available in a future release.

| Event Name			| Description |
| -----------			| ----------- |
| `Email Sent`			| Email was sent successfully |
| `Email Opened`			| Prospect opened the email |
| `Link Clicked`			| Prospect clicked the tracking link |
| `Email Replied`			| Prospect replied to the email sent |
| `Email Bounced`			| Email servers rejected the email |
| `Email Unsubscribed`	| Prospect clicked the unsubscribe link |


**Event Properties**

The following table lists the properties included in the events table:

|Property Name	|Description |
| -----------	| ----------- |
|`event`		|Email event type |
|`userId`		|Prospect email ID |
|`email_id`		|ID of the email |
|`fromId`		|Sender email ID |
|`email_subject`|Subject line of the email |
|`link`			|URL of the link clicked |



## Adding Destinations

Now that your Source is set up, you can connect it with Destinations. 

The Listrak Source works better when you also connect Listrak as a Destination Action. With the Listrak Destination Action, you can use Segment to send Listrak user and event data, enabling you to trigger email campaigns. Listrak is developing the Destination Action features, enabling you to send website or mobile data to Listrak. 

Log into your downstream tools and check to see that your events appear as expected and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/){:target="_blank"} tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Listrak support team](mailto:support@listrak.com).
