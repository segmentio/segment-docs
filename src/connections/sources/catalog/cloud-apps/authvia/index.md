---
title: Authvia Source
id: E5Y3BqhAg2
beta: true
---

TXT2PAY from [Authvia](https://www.authvia.com/){:target="_blank”} is the easiest way to engage your customers for bills, invoices, donations, disbursement and any other payment use cases you may have. Get paid faster without having to worry about PCI compliance.

This source is maintained by Authvia. For any issues with the source, [contact the Authvia Support team](mailto:support@authvia.com).

## Getting started

1. From your workspace's [Sources catalog page,](https://app.segment.com/authvia/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Authvia" in the Sources Catalog, select Authvia, and click **Add Source**.
3. On the next screen, give the Source a name configure any other settings.
   - The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. Authvia_Prod, Authvia_Staging, Authvia_Dev).
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Go to [Connect your Segment account](https://www.authvia.com/forms/setup-twilio-segment-and-authvia/){:target="_blank”} and enter your Authvia Client ID, Secret, and Segment Write Key. You will also pick your region and choose which events you would like to subscribe to. If you do not have an Authvia Client ID and Secret, request access from [the Authvia Technical Support team](https://authvia.atlassian.net/servicedesk/customer/portal/1/group/1/create/31){:target="_blank”}.

## Stream

Authvia uses the Authvia stream source component to send Segment event data. It uses a server-side Track or Identify method to send data to Segment. These events are then available in any destination that accepts server-side events and available in a schema in your data warehouse that you can query using SQL.

The default behavior is for Authvia to pass the customer reference associated with the payer as the userId.

## Events

The table below lists events that Authvia sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Authvia includes the `userId`.

| Event Name               | Description                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Actions Created          | An action was created for a customer to complete. An Action could be a payment, signature, data collection and more.                  |
| Actions Updated          | A customer completed the action. An Action could be a payment, signature, data collection and more.                                   |
| Customer Created         | A new customer was created in Authvia.                                                                                                 |
| Customer Updated         | An existing customer was updated.                                                                                                      |
| Customer Deleted         | An existing Customer was Deleted from Authvia.                                                                                         |
| Business Process Created | A new Business Process (Conversation) was created for a customer.                                                                      |
| Business Process Updated | A customer has completed some, or all Actions in a business process. Alternatively, the Business Process was cancelled or it expired. |

## Event Properties

For a list of properties included in the event payloads, refer to [Authvia's Webhook Documentation](https://developer.authvia.com/v3.3/reference/create-webhook-subscription){:target="_blank”}.
