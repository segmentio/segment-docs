---
title: Email Template
layout: engage
engage: true
---
Use Twilio Engage to build personalized email templates to store and use throughout marketing campaigns.  

Build an email template from scratch using a [visual editor](/docs/engage/content/email/editor/) or with an HTML code editor. Include [personalized content](#personalize-with-merge-tags) in the subject line, preview text, and email body to engage with users based on their profile traits and actions.


## Build an Email template

Navigate to **Personas > Content** and use the Email Templates page to preview and edit existing templates.

To configure an email template, click **New Template**.

1. Select **Email**, and click **Configure**.

> note ""
> You must first connect a [SendGrid subuser account](https://docs.sendgrid.com/ui/account-and-settings/subusers#create-a-subuser){:target="blank"} to your Segment Personas space to build email templates in Engage. Visit the [onboarding steps](/docs/engage/overview/onboarding/) for more information.

2. Configure the email template.
    1. Add a template name for internal reference.
    2. Add an internal description.
    3. Enter the sender email address.
        - Emails can only be sent from verified domains.
    4. Enter the sender name.
    4. Indicate if you want replies sent back to the initial sender. If not, add a "reply to" email and name.
    5. Add email addresses to receive a blind carbon copy of your email.
    6. Add preview text and the subject line. Use [merge tags](#personalize-with-merge-tags) to personalize the email template with real-time profile traits.
3. Select the design method to build your email template:
  - [**Visual Editor**](/docs/engage/content/email/editor/) is an easy to use, drag and drop WYSIWYG tool with customizable content blocks.
  - **HTML Editor** is an HTML editor with a side-by-side preview screen. This editor provides complete HTML editing access with error flagging.
4. Design the email template, then click **Create Email Template**.

## Test the Email template
You can send test emails before you include a template in marketing campaigns

1. Select the email template you want to test on the Templates screen.
2. From the Template Settings page, click **Test Email**.
3. Enter email addresses that will receive the test email.
4. Choose a test profile with traits that apply to your marketing campaign and click **Use as Test Profile**.
5. Select **Send Test Email**.

> success ""
> You can also test email templates directly from a [Send an Email step](/docs/engage/journeys/build-journey/#send-an-email) in Journeys.

## Personalize with Merge Tags
Personalize email content in Twilio Engage with real-time profile traits in your email subject line, preview text, and message body.


As you configure the template, click **Merge Tags** and select the profile traits to include. Engage inserts the merge tags based on cursor placement.

You can also add merge tags in heading and body text as you design an email with the [visual editor](/docs/engage/content/email/editor/).

> info ""
> To learn more about profile traits, visit [Segment's Compute Traits](/docs/personas/computed-traits) and [SQL Traits](/docs/personas/sql-traits/) documentation.

## Include unsubscribe links

When you build email templates, it's your responsibility to include an unsubscribe link in your message. Add unsubscribe links to an email template from the [visual](/docs/engage/content/email/editor/) or HTML editor.

When a recipient clicks on an unsubscribe link, they'll see a confirmation page and the recipient's subscription state is updated.

Only send messages to subscribed users. Learn more about [User Subscriptions](/docs/engage/profiles/user-subscriptions/) in Twilio Engage.

## Next Steps

View some [email deliverability tips and tricks](https://docs.sendgrid.com/ui/sending-email/deliverability){:target="blank"} from SendGrid.

You can also use the Templates screen in Engage to [build SMS templates](/docs/engage/content/sms/template/).
