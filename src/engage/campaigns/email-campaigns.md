---
title: Email Campaigns
plan: engage-premier
---
> info ""
> Engage Premier entered an End of Sale (EOS) period effective June 10, 2024. Existing Segment customers will continue to have access and support to Engage Premier until an end-of-life (EOL) date is announced. Segment recommends exploring the following pages in preparation of a migration or future MCM needs:
> 
>[Twilio Marketing Campaigns](https://www.twilio.com/en-us/sendgrid/marketing-campaigns)
>
>Preferred ISV Partners:
>
>[Airship Blog](https://www.twilio.com/en-us/blog/airship-integrated-customer-experience){:target="_blank"} <br>
>[Bloomreach Blog](https://www.twilio.com/en-us/blog/bloomreach-ecommerce-personalization){:target="_blank"} <br>
>[Braze Blog](https://www.twilio.com/en-us/blog/braze-conversational-marketing-campaigns){:target="_blank"} <br>
>[Insider Blog](https://www.twilio.com/en-us/blog/insider-cross-channel-customer-experience){:target="_blank"} <br>
>[Klaviyo Blog](https://www.twilio.com/en-us/blog/klaviyo-powering-smarter-digital-relationships){:target="_blank"} <br>
>[Twilio Engage Foundations Documentation](/docs/engage/quickstart/) <br>

With Twilio Engage, you can send email and SMS campaigns to users who have opted in to receive your marketing materials. On this page, you’ll learn how to create and send an email campaign.

Some knowledge of the Journeys product will benefit you as you read through this guide. If you’re new to Journeys, the [Journeys documentation](/docs/personas/journeys/) will bring you up to speed.

## How Engage campaigns work

Twilio Engage uses Journeys to send email and SMS campaigns.  With Journeys, you add conditions and steps that trigger actions like sending an email or an SMS.

You’ll build and then send your campaign in three stages:
 
1. Create a Journey.
2. Add a Journey condition.
3. Create, test, and send your email campaign.

### Create a Journey

Because Engage campaigns exist within Journeys, begin by creating a Journey:

1. In Engage, select **Journeys**, then click **New Journey**.
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
5. Fill out all **Send Email** fields relevant to your campaign, select the [subscription states or groups](/docs/engage/user-subscriptions/subscription-groups/) that you want to receive your email, (optionally) [select an IP pool](#working-with-ip-pools), then click **Save**.

Some email campaign fields, like **Sender email** and **Subject**, are required.  The Send Email window indicates required fields with an asterisk.  Refer to the [email campaign fields](/docs/engage/campaigns/email-campaigns/#email-campaign-fields) table for a full description of available email fields.

> info "Editing Templates"
> If you use a template for your email, Engage creates an editable copy of the original.  Editing the template within the Journey won’t alter the original template.


### Send an email to all users

As you create your email campaign, you can set an email to send to all users regardless of their [subscription state](/docs/engage/user-subscriptions/#the-four-subscription-states). This may be useful, for example, when you need to send a marketing transactional email to a user who hasn't subscribed to your marketing emails.

To send an email to all users:

1. In the email builder, navigate to the **Which subscription states should receive this message?** field.
2. From the dropdown menu, select **All subscription states including unsubscribed**.

When you bypass subscription states, be sure to follow local laws and comply with [CAN-SPAM guidance](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business){:target="_blank"}. 

For more, view SendGrid's [email deliverability best practices](https://support.sendgrid.com/hc/en-us/articles/360041790453-Best-Practices-for-ensuring-Email-Deliverability){:target="_blank"}. 

### Test your email campaign

At this point, you can send a test email before publishing your campaign. Test emails confirm that your design, unsubscribe links, and merge tags appear as expected.

As part of the test send, you can enter custom values to populate the profile traits in your message.

Follow these steps to test your campaign:

1. In the **Send an email** pane, navigate to Body, then click **Test email**.
2. If your template has profile traits, enter a trait value for the test email. This ensures that your merge tags work as expected.
- To test a default value, leave the profile traits field blank. Default values must be assigned in your merge tags. For example, `loyal customer` would be the default for the following merge tag: {% raw %}```{{profile.traits.first_name | default: "loyal customer"}}```{% endraw %}.
3. In the **Recipients** field, enter the email address(es) that will receive your test email.
4. Click **Send test email**.

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
| Which subscription states should receive this message?     |  The [subscription state](/docs/engage/user-subscriptions/#the-four-subscription-states) that Engage will send email campaigns to. Defaults to `subscribed` users only. Select **All subscription states including unsubscribed** to send emails to all users regardless of subscription state.  |

## Working with IP pools

When you create an email, you have the option to select an IP pool. An IP pool is a group of IP addresses available to you in SendGrid. You can create and view your IP pools in your Engage-linked SendGrid subuser account by navigating to **Settings > IP Addresses > IP Pools**.

Your sending reputation is based on a combination of your domain and the IP address you use to send emails. Emails that end up in your recipients' spam folders could harm your sending reputation. As a result, you may want to keep your marketing and transactional emails on different IP addresses. 

Keep the following in mind as you use IP pools:

- If you don't select an IP pool, Segment will choose one of your SendGrid IP addresses at random.
- If you select an IP pool during email setup but then delete the IP pool in SendGrid, emails will begin to fail after IP pool deletion. 
- SendGrid lets you assign the same IP address to multiple IP pools. If you want to use different IP addresses for different Engage emails, verify within SendGrid that the pools you created have different IP addresses. 
- You can change an IP pool for an email in a live journey by [editing the journey](/docs/engage/journeys/journeys-edits/), creating a new draft, changing the email's IP pool, then publishing the new journey version.

For more information, see [SendGrid's IP pools documentation](https://docs.sendgrid.com/ui/account-and-settings/ip-pools){:target="_blank"}.

## Next steps

Using Journeys, you can create multi-channel customer engagement with both email and SMS campaigns. Having published an email, learn how [Engage SMS campaigns](/docs/engage/campaigns/sms-campaigns/) can help you market to customers through text messages.
