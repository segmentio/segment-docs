---
title: SendGrid Destination
hide-boilerplate: true
hide-dossier: true
redirect_from:
  - "/connections/destinations/catalog/sendgrid-marketing-campaigns/"
id: 631a6f32946dd8197e9cab66
---


[SendGrid](https://sendgrid.com/solutions/email-marketing/){:target="_blank”} provides email marketing automation for businesses. With Segment you can add contacts and lists to SendGrid.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure SendGrid**.
4. Select an existing Source to connect to SendGrid.
5. In the destination settings, enter your SendGrid “API key” into the connection settings. You should create a new API key for the Segment destination. You can read more about API keys on [Marketing Campaigns’s docs.](https://docs.sendgrid.com/ui/account-and-settings/api-keys){:target="_blank"}


{% include components/actions-fields.html %}

## Additional details for the Send Email With Dynamic Template Action 

### Usage
The [Send Email With Dynamic Template](#send-email-with-dynamic-template) Action can be used to send emails through SendGrid using [SendGrid Dynamic Templates](https://www.twilio.com/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates){:target="_blank”}. The Dynamic Template you use must already exist in SendGrid. Use the Action field [Dynamic Template Data](#dynamic-template-data) to populate values in the Dynamic Template. 

### Contacts
SendGrid sends emails to the email addresses you specify, even if they are not listed as Contacts in SendGrid.

### SendGrid API Key
Segment and SendGrid recommend that you define the SendGrid API key within a subuser account and the domain is authenticated under that same subuser account. The Send Email With Dynamic Template Action requires that the SendGrid API Key has the following scopes assigned:   
- Category Management: full
- IP Management: full
- Template Engine: full

## Additional details for the Upsert Contact Action 

### Recording Custom User Traits
If you want to view any other custom user traits in the Marketing Campaigns list dashboard, you must create a [Custom Field inside Marketing Campaigns’s UI](https://docs.sendgrid.com/ui/managing-contacts/custom-fields#creating-custom-fields){:target="_blank"} of the traits in your identify calls. Note that you do not need to map all user.traits you are sending inside Marketing Campaigns. You only need to create Custom Fields of the traits you want to see in your list view.

### Custom Fields
To send custom fields/user traits to Marketing Campaigns you need to create the field first in Marketing Campaigns for each trait you want sent to Marketing Campaigns. Then when you call identify with keys that match those traits they will appear in your Marketing Campaigns list.

For any other custom traits just add a Custom Field inside of SendGrid with a tag that matches the key you are using in your identify call.

### Recording userId
To record a Segment userId in SendGrid, you must pass the userID as a trait on your identify() calls. SendGrid does not automatically map the Segment userID to any Marketing Campaigns properties.

### SendGrid API Key
The Upsert Contact Action requires the SendGrid API Key to have the following scopes:
- Marketing: full
