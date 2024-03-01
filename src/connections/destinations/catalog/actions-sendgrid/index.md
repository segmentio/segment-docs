---
title: SendGrid Marketing Campaigns Destination
hide-boilerplate: true
hide-dossier: true
redirect_from:
  - "/connections/destinations/catalog/sendgrid-marketing-campaigns/"
id: 631a6f32946dd8197e9cab66
---


[SendGrid Marketing Campaigns](https://sendgrid.com/solutions/email-marketing/){:target="_blank”} provides email marketing automation for businesses. With Segment you can add contacts and lists to SendGrid Marketing Campaigns.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure SendGrid Marketing Campaigns**.
4. Select an existing Source to connect to SendGrid Marketing Campaigns (Actions).
5. In the destination settings, enter your SendGrid Marketing Campaigns “API key” into the connection settings. You should create a new API key for the Segment destination. You can read more about API keys on [Marketing Campaigns’s docs.](https://docs.sendgrid.com/ui/account-and-settings/api-keys){:target="_blank"}


{% include components/actions-fields.html %}


## Recording Custom User Traits
If you want to view any other custom user traits in the Marketing Campaigns list dashboard, you must create a [Custom Field inside Marketing Campaigns’s UI](https://docs.sendgrid.com/ui/managing-contacts/custom-fields#creating-custom-fields){:target="_blank"} of the traits in your identify calls. Note that you do not need to map all user.traits you are sending inside Marketing Campaigns. You only need to create Custom Fields of the traits you want to see in your list view.

## Custom Fields
To send custom fields/user traits to Marketing Campaigns you need to create the field first in Marketing Campaigns for each trait you want sent to Marketing Campaigns. Then when you call identify with keys that match those traits they will appear in your Marketing Campaigns list.

For any other custom traits just add a Custom Field inside of SendGrid Marketing Campaigns with a tag that matches the key you are using in your identify call.


## Recording userId
To record a Segment userId in SendGrid Marketing Campaigns, you must pass the userID as a trait on your identify() calls. SendGrid does not automatically map the Segment userID to any Marketing Campaigns properties.
