---
title: 'Engage Events Source'
id: RPrXXW7nws
redirect_from:
  - '/engage/user-subscriptions/engage-source'
---

> info "Engage Premier"
> The Engage Events Source is only available for use with [Engage Premier](/docs/engage/#market-to-customers-with-engage-premier-and-channels).

Use the Engage Events Source to sync Engage subscription states and messaging events to downstream Destinations.

## Update downstream subscription states

With Twilio Engage, you can [set and update user subscription states](/docs/engage/user-subscriptions/set-user-subscriptions/) with a [CSV file upload](/docs/engage/profiles/csv-upload/) or, programmatically, [using Segment APIs](/docs/engage/user-subscriptions/set-user-subscriptions/#manage-user-subscriptions-with-segment-apis).

As part of Engage, Segment creates an Engage Events Source that lets you sync subscription states and marketing analytics events [to connected Destinations](/docs/connections/destinations/). When a subscription state changes, Segment sends an update to the Destination. As a result, the subscription states stored in your Destination(s) can serve as a single source of truth for managing user consent in other tools that you may have connected to the Destination.

## Working with Engage Events Sources

Segment generates Engage Sources automatically. To find your Engage Events Sources in your workspace, navigate to **Connections > Sources** and select **Engage Events**.

If you have Engage messaging services set up, you can also find Engage sources in two ways:

- Navigate to **Engage > Audiences** and click **Add a destination** from the Audiences overview page.
- Navigate to **Engage > Channels Settings** and add your Engage source from the **Engage Events source** section.

Segment sets a `Generated` status to Engage Sources in the **Statuses** column of the **My Sources** table. 

From the **My Sources** table, you can select the Engage Source to add a Destination and configure the Source's settings. If you have more than one Engage space, Segment creates a separate Source for each space.

## Tracked events 

The tables in this section list the events that the Engage Events Source tracks.

{% faq %}
{% faqitem SMS events %}

| Event           | Definition                                                                  |
| --------------- | --------------------------------------------------------------------------- |
| SMS Processed   | An SMS was processed.                                                       |
| SMS Queued      | An SMS has been queued for delivery.                                        |
| SMS Sending     | An SMS is being sent.                                                       |
| SMS Sent        | An SMS was successfully sent, but delivery information isn't yet available. |
| SMS Failed      | The SMS couldn't be sent.                                                   |
| SMS Delivered   | The carrier confirmed that SMS delivery was successful.                     |
| SMS Undelivered | The carrier confirmed that SMS delivery was unsuccessful.                   |
| SMS Receiving   | Engage is receiving an incoming message.                                    |
| SMS Received    | Engage received an incoming message.                                        |
| SMS Read        | An SMS was read.                                                            |

<br>

Twilio powers Engage SMS delivery. For more information, view [Twilio's documentation on SMS message statuses](https://support.twilio.com/hc/en-us/articles/223134347-What-are-the-Possible-SMS-and-MMS-Message-Statuses-and-What-do-They-Mean-){:target="_blank"}.


{% endfaqitem %}

{% faqitem Email events %}

| Event                    | Definition                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------- |
| Email Processed          | An email was processed and is ready to be delivered.                                  |
| Email Deferred           | The receiving server temporarily rejected the email.                                  |
| Email Delivered          | An email was successfully delivered to the receiving server.                          |
| Email Opened             | The recipient opened the email.                                                       |
| Email Link Clicked       | The recipient clicked a link within the email.                                        |
| Email Bounced            | The receiving server permanently rejected the email.                                  |
| Email Dropped            | The email was dropped before delivery.                                                |
| Email Marked as Spam     | The recipient marked the email as spam.                                               |
| Email Machine Opened     | The email was [machine opened](/docs/engage/analytics/#understanding-machine-opens). |
| Email Unsubscribed       | The recipient unsubscribed from all emails.                                           |
| Email Group Unsusbcribed | The recipient unsubscribed from a specific group.                                     |
| Email Subscribed         | The recipient subscribed to all emails.                                               |
| Email Group Subscribed   | The recipient subscribed to a specific group.                                         |

<br>

SendGrid powers Engage email delivery. For more information, view [SendGrid's Event Webhook Documentation](https://docs.sendgrid.com/for-developers/tracking-events/event){:target="_blank"}.


{% endfaqitem %}

{% faqitem WhatsApp events %}

| Event                        | Definition                                            |
| ---------------------------- | ----------------------------------------------------- |
| WhatsApp Message Queued      | The WhatsApp message creation requested was recieved. |
| WhatsApp Message Accepted    | The WhatsApp message creation request was accepted.   |
| WhatsApp Message Sending     | The WhatsApp message is being sent.                   |
| WhatsApp Message Sent        | The WhatsApp message was successfully sent.           |
| WhatsApp Message Failed      | The WhatsApp message couldn't be sent.                |
| WhatsApp Message Delivered   | WhatsApp message delivery was successful.             |
| WhatsApp Message Undelivered | The WhatsApp message wasn't delivered.                |
| WhatsApp Message Receiving   | Engage is receiving an incoming WhatsApp message.     |
| WhatsApp Message Received    | Engage received an incoming WhatsApp message.         |
| WhatsApp Message Read        | The recipient read the WhatsApp message.              |

{% endfaqitem %}

{% faqitem Subscription events %}

| Event                        | Definition                                             |
| ---------------------------- | ------------------------------------------------------ |
| Channel Subscription Updated | A user updated their channel subscription.             |
| Group Subscription Updated   | A user updated their subscription to a specific group. |

{% endfaqitem %}
{% endfaq %}