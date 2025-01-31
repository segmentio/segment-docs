---
title: 'Listrak Source'
id: L9XPA9n2Mc
---
{% include content/source-region-unsupported.md %}

[Listrak](https://www.listrak.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is the retail industry’s leading customer engagement platform. Listrak delivers results for more than 1,000 retailers by providing best-in-class email, text message marketing, identity resolution marketing and push notifications through seamless cross-channel orchestration. Listrak’s data-first approach delivers 1:1 personalization at scale so you can send messages at precisely the right time across the right combination of channels and devices to maximize customer engagement, revenue, and lifetime value.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Listrak. For any issues with the source, [contact their Support team](mailto:support@listrak.com).

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"} click **Add Source**.
2. Search for "Listrak" in the Sources Catalog, select Listrak, and click **Add Source**.
3. On the next screen, give the Source a nickname and configure any other settings.

   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. Listrak_Prod, Listrak_Staging, Listrak_Dev).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. If using Unify and Engage Audiences:
    1. Go to Unify > Unify settings > Profile sources
    2. Click **Connect source**
    3. Select the new Listrak source
    4. Click **Connect source**
7.  Log in to your [Listrak account](https://admin.listrak.com){:target="_blank"}, and navigate to Integrations > Integrations Management.
8. Click **New Integration**.
9. Click the Segment card
10. Click Setup Integration
11. Paste the Write key you copied from Segment and click **Save**.
12. Add at least one email list that you want to sync with Segment and click **Save**.

## Stream

Listrak uses Segment's stream Source component to send Segment event data. It uses the server-side `identify` and `track` methods to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

Listrak sets the `anonymousId` and the `email` trait to the email address of the contact.

If you entered a profile field when the email list was added to the integration and the email address has a value for that profile field, the `userId` is set to that value when you send identify events. Otherwise, Listrak won't send the `userId`. The `userId` won't be set for any `track` events.
Listrak maintains a trait for each email list you add to the integration using `identify` events. The trait is named `listrak_list_{listId}`, where `{listId}` is the ID of the list (eg. `listrak_list_12345`). The trait will be set to true if the email address is subscribed to the list. The trait will be removed if the email address is not subscribed to the list. This trait can be used to create Engage audiences that only contain profiles that are subscribed to a Listrak list.

## Events

The table below lists events that Listrak sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

Event Name | Description
------------ | -------------
Email Bounced | The email servers rejected the email. 
Email Converted | The recipient placed an order after clicking on the email. 
Email Link Clicked | The recipient clicked on a link in the email's body. 
Email Marked As Spam | The recipient marked an email as spam.
Email Opened | The recipient opened the email.
Email Sent | An email was sent to the recipient.
Unsubscribed | The recipient unsubscribed from the email list.

## Event Properties

The table below lists the properties included in the events listed above.

Property Name | Description
--------------- | ------------
`email_id`| An ID used to identify the email.
`email_subject`| The email’s subject line.
`campaign_name`| A name used to identify a Listrak campaign.
`link_id` | An ID used to identify a link.
`link_url` | The URL the link points to.
`google_analytics_campaign_name` | A name used to identify a Google Analytics campaign.
`list_id` | An ID used to identify a list.
`list_name` | A name used to identify a list.
`order_total` | The order total associated with the conversion.
`unsubscribe_type` | The method by which the contact was removed from the list. See the [Unsubscribed Contacts Report Help Article](https://help.listrak.com/en/articles/1550570-unsubscribed-contacts-report#unsubscribe-method-definitions){:target="_blank"}.
`context.ip` | The opening computer’s public IP address.
`context.traits.email` | The intended recipient’s email address.
`context.user_agent` | The opening browser’s user agent.

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool and refer to the docs for each Destination.

If there are any issues with how the events are arriving to Segment, [contact the Listrak support team](mailto:support@listrak.com).
