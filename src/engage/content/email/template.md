---
title: Email Template
plan: engage-premier
---
Use Twilio Engage to build personalized email templates to store and use throughout marketing campaigns.  

Build an email template from scratch using a [visual editor](/docs/engage/content/email/editor/) or with an HTML code editor. Include [personalized content](#personalize-with-merge-tags) in the subject line, preview text, and email body to engage with users based on their profile traits and actions.


## Build an Email template

Navigate to **Engage > Content** and use the Email Templates page to preview and edit existing templates.

To configure an email template, click **Create Template**.

1. Select **Email**, and click **Configure**.

> note ""
> You must first connect a [SendGrid subuser account](https://docs.sendgrid.com/ui/account-and-settings/subusers#create-a-subuser){:target="blank"} to your Segment space to build email templates in Engage. Visit the [onboarding steps](/docs/engage/onboarding/) for more information.

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
2. From the Template Settings page, click **Test email**.
3. If your template has profile traits, enter a trait value for the test email. This ensures that your merge tags work as expected.
- To test a default value, leave the profile traits field blank. Default values must be assigned in your merge tags. For example, `loyal customer` would be the default for the following merge tag: {% raw %}```{{profile.traits.first_name | default: "loyal customer"}}```{% endraw %}.
4. Enter recipient email addresses for the test message.
- Profiles that you send test messages to must have a userId in Segment.
5. Select **Send test email**.

> success ""
> You can also test email templates directly from a [Send an Email step](/docs/engage/journeys/build-journey/#send-an-email) in Journeys.

## Personalize with merge tags
Personalize email content in Twilio Engage with real-time profile traits in your email subject line, preview text, and message body.


As you configure the template, click **Merge Tags** and select the profile traits to include. Engage inserts the merge tags based on cursor placement.

You can also add merge tags in heading and body text as you design an email with the [visual editor](/docs/engage/content/email/editor/). Engage supports [liquid templating](https://liquidjs.com/tags/if.html){:target="blank"} to create dynamic content in the email design editor.

> info ""
> To learn more about profile traits, visit Segment's [Computed Traits](/docs/engage/audiences/computed-traits) and [SQL Traits](/docs/engage/audiences/sql-traits/) documentation.

## Include unsubscribe links

When you build email templates, it's your responsibility to include an unsubscribe link in your message. Add unsubscribe links to an email template from the [visual](/docs/engage/content/email/editor/) or HTML editor.

When a recipient clicks on an unsubscribe link, they'll see a confirmation page and the recipient's subscription state is updated.

Only send messages to subscribed users. Learn more about [User Subscriptions](/docs/engage/user-subscriptions/) in Twilio Engage.

## Clone an Email template

You can clone existing Email templates to edit and use in your message campaigns.

To clone a template, navigate to the Templates page (**Engage > Content**). You can also clone from the Overview page of an individual template.

1. Click the **...** icon.
2. Select **Clone**.
3. Enter a template name.
4. Click **Clone** to save the template.

After you clone a template, you can edit it from the Templates page.

## Next steps

View some [email deliverability tips and tricks](https://docs.sendgrid.com/ui/sending-email/deliverability){:target="blank"} from SendGrid.

You can also use the Templates screen in Engage to [build SMS templates](/docs/engage/content/sms/template/).
