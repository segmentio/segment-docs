---
title: Email Campaigns
layout: engage
engage: true
---

With Twilio Engage, you can send email and SMS campaigns to users who have opted in to receive your marketing materials. On this page, you’ll learn how to create and send an email campaign.

Some knowledge of the Journeys product will benefit you as you read through this guide. If you’re new to Journeys, the [Journeys documentation](/docs/personas/journeys/) will bring you up to speed.

## How Engage campaign works

Twilio Engage uses Journeys to send email and SMS campaigns.  With Journeys, you add conditions and steps that trigger actions like sending an email or an SMS.

You’ll build and then send your campaign in three stages:

1. Create a Journey.
2. Add a Journey condition.
3. Create, test, and send your email campaign.

### Create a Journey

Because Engage campaigns exist within Journeys, begin by creating a Journey:

1. Within your Personas space, select **Journeys**, then click **New Journey**.
2. Name your Journey and select its entry settings.
3. Click **Build Journey** to create the Journey.

### Add a Journey condition

With your Journey created, you’ll now create a [condition](docs/personas/journeys/build-journey/#available-step-types) that will trigger your email campaign:

1. Within the Journey builder, click **+ Add Entry Condition**.
2. In the Add Entry Condition pane, give the step a name.
3. Click **+ Add Condition**, select your desired condition, then click **Save**.

With your entry condition added, you’re now ready to create your email.

### Create, test, and publish your email campaign

Follow these steps to create an email campaign:

1. Within the Journey builder, click the + node below your new condition.
2. From the **Select a Step** window, click **Send an email**.
3. In the **Send Email** window, select **Build a new email** or [Use a template](/docs/engage/content/email/template/) to choose an existing email template.
4. Build or edit your design, then click **Save Email**.
5. Fill out all **Send Email** fields relevant to your campaign, then click **Save**.

Some email campaign fields, like **Sender email** and **Subject**, are required.  The Send Email window indicates required fields with an asterisk.  Refer to the [email campaign fields](/docs/engage/campaigns/email-campaigns/#email-campaign-fields) table for a full description of available email fields.

> info "Editing Templates"
> If you use a template for your email, Engage creates an editable copy of the original.  Editing the template within the Journey won’t alter the original template.

### Test your email campaign

At this point, you can send a test email before publishing your campaign. Test emails confirm that your design, unsubscribe links, and merge tags appear as expected.

As part of the test send, you can select a test profile. The test profile populates the test email and replaces merge tags with personalized content, but doesn't send a test email to the test address.

Follow these steps to test your campaign:

1. In the **Send Email** pane, navigate to Body, then click **Test Email**.
2. In the **Recipients** field, enter the email address(es) that will receive your test email.
3. Search for and select a test profile.
4. Click **Send Test Email**.

### Publish your email campaign

With your email designed and tested, you’re now ready to save the campaign and publish your Journey, with the following steps:

1. Verify that all **Send Email** fields are correct.
2. Click **Save**.
3. In the Journey builder, click **Publish**.

Your email campaign is now live. When users trigger the email’s parent Journey condition, they will receive your email campaign.

## Email campaign fields

The following table contains descriptions of all available fields in the Journeys Send Email builder. Asterisks indicate required fields.

| Field            | Description                                                                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Step name *      | Required; the name for the email campaign’s parent Journey step.  Email recipients won’t see this field.                                                                                        |
| Sender email *   | The email address users will see in the from field of the email campaign.                                                                                                                       |
| Sender name *    | The name users will see next to the sender email.                                                                                                                                               |
| Reply to email * | The email address that will receive any replies users send.  You can use different Sender and reply-to email addresses.  Email recipients will see this address if they reply to your campaign. |
| Reply to name *  | The name users will see next to the reply-to email address.                                                                                                                                     |
| BCC              | Email address that will receive a blind carbon copy of your email campaign.                                                                                                                     |
| Preview text     | A brief message that displays next to the email subject.                                                                                                                                        |
| Subject *        | The email subject.                                                                                                                                                                              |
| Body *           | The email’s content.  Select Build Email Content to create a new campaign, or Use a template to choose an existing template.                                                                    |


## Next steps

Using Journeys, you can create multi-channel customer engagement with both email and SMS campaigns. Having published an email, learn how [Engage SMS campaigns](/docs/engage/campaigns/sms-campaigns/) can help you market to customers through text messages.
