---
title: SendGrid Marketing Campaigns Source
id: GCeG0vmcDW
---

[SendGrid Marketing Campaigns](http://twilio.com/docs/sendgrid/ui/integrations/segment?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} lets you automatically stream your email events directly into Segment for use inside your warehouse or other downstream destinations.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) that can not only export data into your Segment warehouse but also federate the exported data into your other enabled Segment destinations.

This source is maintained by SendGrid Marketing Campaigns. For any issues with the source, [contact their Support team](mailto:support@sendgrid.com).

## Getting started
1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "SendGrid Marketing Campaigns" in the Sources Catalog, select SendGrid Marketing Campaigns, and click **Add Source**.
3. On the next screen, give the source a name configure any other settings.
   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example, `Sendgrid_Prod`, `Sendgrid_Staging`, `Sendgrid_Dev`).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your SendGrid Marketing Campaigns account - navigate to **Integrations > Segment -> Connect** and paste the key. Select the matching region and any email events you want to receive.

## Stream

SendGrid Marketing Campaigns uses Segment's stream Source component to send Segment event data. It uses a server-side Track method to send data to Segment. These events are then available in any destination that accepts server-side events and available in a schema in your data warehouse so you can query using SQL.

SendGrid Marketing Campaigns passes a SHA256 hash of the recipient's email address as `anonymousId`. The raw email address is passed in `context.traits.email`.

## Events

The following table lists events that SendGrid Marketing Campaigns sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.

| Event Name              | Description                                                                                                                 |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Email Processed         | Email was sent successfully                                                                                                 |
| Email Delivered         | Email delivered successfully                                                                                                |
| Email Opened            | Recipient opened the email                                                                                                  |
| Email Machine Opened    | Email was [opened anonymously](https://www.twilio.com/docs/sendgrid/for-developers/tracking-events/understanding-apple-mail-privacy-protection-and-open-events){:target="_blank”} |
| Email Link Clicked      | Recipient clicked the [tracking link](https://www.twilio.com/docs/sendgrid/ui/account-and-settings/tracking#click-tracking){:target="_blank”} |
| Email Dropped           | Email was [dropped by Sendgrid](https://www.twilio.com/docs/sendgrid/glossary/drops){:target="_blank”}                                        |
| Email Bounced           | Email servers [rejected the email](https://www.twilio.com/docs/sendgrid/ui/sending-email/bounces){:target="_blank”}                           |
| Unsubscribed            | Recipient [unsubscribed globally](https://www.twilio.com/docs/sendgrid/ui/sending-email/global-unsubscribes){:target="_blank”}                |
| Unsubscribed From Group | Recipient [unsubscribed from a group](https://www.twilio.com/docs/sendgrid/ui/sending-email/group-unsubscribes){:target="_blank”}             |
| Resubscribed To Group   | Recipient resubscribed to a group                                                                                           |
| Email Marked as Spam    | Recipient [reported the email as spam](https://www.twilio.com/docs/sendgrid/ui/analytics-and-reporting/spam-reports){:target="_blank”}        |

## Event Properties
The table below list the properties included in the events listed above. Some properties are only available for Single Sends or Automations.

| Property Name               | Description                                                                                                                     |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `event`                     | Email event type                                                                                                                |
| `anonymousId`               | SHA256 hash of the recipient email                                                                                              |
| `email_type`                | "Singlesend" or "Automation"                                                                                                    |
| `template_id`               | Email template ID                                                                                                               |
| `email_subject`             | Subject line of the email, when available                                                                                       |
| `test_phase`                | `true` if the Single Send is an [A/B Test](https://www.twilio.com/docs/sendgrid/ui/sending-email/a-b-testing){:target="_blank”} in the test phase |
| `unsubscribe_group_id`      | ID of the unsubscribe group, when available                                                                                     |
| `link_url`                  | URL of the link clicked                                                                                                         |
| `categories`                | [Categories](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/categories){:target="_blank”} associated to the email              |
| `campaign_name`             | Name of the Single Send                                                                                                         |
| `campaign_id`               | ID of the Single Send                                                                                                           |
| `automation_name`           | Name of the Automation                                                                                                          |
| `automation_id`             | ID of the Automation                                                                                                            |
| `automation_step_id`        | ID of the Automation step                                                                                                       |
| `context.traits.email`      | The recipient's raw (unhashed) email address                                                                                    |
| `context.traits.ip`         | The opening computer's public IP address                                                                                        |
| `context.traits.user_agent` | The opening browser's user agent                                                                                                |

## Adding Destinations

Now that your source is set up, you can connect it with destinations.

Log into your downstream tools and check to see that your events appear as expected and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the SendGrid Marketing Campaigns support team](mailto:support@sendgrid.com).
