---
title: Email Template
plan: engage-premier
---
Use Twilio Engage to build personalized email templates to store and use throughout marketing campaigns.  

Build an email template from scratch using the [Drag and Drop Editor](/docs/engage/content/email/editor/) or the [HTML Editor](/docs/engage/content/email/html-editor/). Include [personalized content](#personalize-with-merge-tags) in the subject line, preview text, and email body to engage with users based on their profile traits and actions.


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
  - [**Drag and Drop Editor**](/docs/engage/content/email/editor/) is a drag and drop WYSIWYG tool with customizable content blocks.
  - [**HTML Editor**](/docs/engage/content/email/html-editor/) contains both a code and visual editor from a single view. This editor provides complete HTML editing access with error flagging.
4. Design the email template, then click **Create Email Template**.

> info "Engage content validation"
> For all content editors in Engage, you'll see alerts for any issues in your template, such as invalid profile traits or incorrect liquid syntax. Engage both flags template issue(s), and displays recommended next steps. While you can save these templates, you must fix any issues before using them in Engage campaigns. 

## Test the Email template
You can send test emails before you include a template in marketing campaigns.

1. Select the email template you want to test on the Templates screen.
2. From the Template Settings page, click **Test email**.
3. If your template has profile traits, enter a trait value for the test email. This ensures that your merge tags work as expected.
- To test a default value, leave the profile traits field blank. Default values must be assigned in your merge tags. For example, `loyal customer` would be the default for the following merge tag: {% raw %}```{{profile.traits.first_name | default: "loyal customer"}}```{% endraw %}.
- To test traits with arrays, you must input the array in JSON format. For example, `[“item1”, “item2”]` or `[{“itemName”: “shoes”}]`. If you don't use JSON format for arrays in the test message side sheet, your template might not render as expected. 
4. Enter recipient email addresses for the test message.
- Profiles that you send test messages to must have a userId in Segment.
5. Select **Send test email**.

> success ""
> When you send a test message, the trait must be valid for the field it's being used in. For example:
> - If you use `profile.traits.first_name` in the **From sender** field, it must be a valid username. 
> - If you use `profile.traits.email` in the **Reply to email** field, it must be a valid email address.

> info ""
> You can also test email templates directly from a [Send an Email step](/docs/engage/journeys/build-journey/#send-an-email) in Journeys.

## Personalize with merge tags
Personalize email content in Twilio Engage with real-time profile traits in your email subject line, preview text, and message body.


As you configure the template, click **Merge Tags** and select the profile traits to include. Engage inserts the merge tags based on cursor placement.
 
You can also add merge tags in the heading or body text as you design an email with the [Drag and Drop](/docs/engage/content/email/editor/) or [HTML](/docs/engage/content/email/html-editor/) editors. Engage supports [liquid templating](https://liquidjs.com/tags/if.html){:target="blank"} to create dynamic content in the email design editor.

> info ""
> To learn more about profile traits, visit Segment's [Computed Traits](/docs/engage/audiences/computed-traits) and [SQL Traits](/docs/engage/audiences/sql-traits/) documentation.

## Include unsubscribe and manage preference links

When you build an email template, you'll need to include links that your customers can access to unsubscribe and manage their email preferences. You'll find both in the **Special Links** dropdown menu of the **Insert/Edit link** window.

### Unsubscribe links

When you build email templates, it's your responsibility to include an unsubscribe link in your message. Add unsubscribe links to an email template from the Drag and Drop or HTML editors.

When a recipient clicks on an unsubscribe link, they'll see a confirmation page and the recipient's subscription state is updated.

Learn more about [User Subscriptions](/docs/engage/user-subscriptions/) in Twilio Engage.

### Manage preference links

The manage preference link lets your customers opt in and out of email groups on an individual basis instead of unsubscribing from all your campaigns.

For more information, see [subscription groups](/docs/engage/user-subscriptions/subscription-groups/).

## Clone an Email template

You can clone existing Email templates to edit and use in your message campaigns.

To clone a template, navigate to the Templates page (**Engage > Content**). You can also clone from the Overview page of an individual template.

1. Click the **...** icon.
2. Select **Clone**.
3. Enter a template name.
4. Click **Clone** to save the template.

After you clone a template, you can edit it from the Templates page.

## Organize with template folders

<!-- Removed: Use folders to group and organize your Email, SMS/MMS, Push, and Whatsapp content templates.-->

Use folders to organize your Email, SMS/MMS, Push, and Whatsapp content templates. With folders, you can group related content together to better help you manage and find your marketing resources.
 

Use the Templates overview page to create, update, view, and delete template folders

To create a folder:

1. Navigate to **Engage > Content**.
2. Select the tab for the template type (Email, SMS, WhatsApp, or Push) you'd like to create the folder for. 
3. Click **Create**, then select **Folder**.
4. Add a folder name, then click **Create**. 

Use the Templates overview page to rename, add templates, or disband your folder. Disbanding a folder returns all templates from the folder to the main template list, without deleting any of the templates.

### Move templates to your folders

From the Templates overview page, you can select individual template(s) to move to your folders. 

After you select the templates you'd like to move:
1. Click **Actions**, and select **Move Templates**.
2. Select the destination folder, then click **Move templates to folder**.

From within your folders, you can also use the **Actions** button to remove templates or move them to a different folder. 

## Next steps

- View some [email deliverability tips and tricks](https://docs.sendgrid.com/ui/sending-email/deliverability){:target="blank"} from SendGrid.

- You can also use the Templates screen in Engage to [build SMS templates](/docs/engage/content/sms/template/).
