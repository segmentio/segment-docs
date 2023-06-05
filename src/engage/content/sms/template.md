---
title: SMS Template
plan: engage-premier
---
Use Twilio Engage to build SMS message templates to include throughout your marketing campaigns.

You can build an SMS template and include personalized content in messages based on user profile traits. Once you build the SMS, Twilio Engage saves the template for you to preview, maintain, and reuse.

Use personalized SMS messages to connect with users in real-time, as they reach a specific step in a journey.

## Build an SMS message template

> info ""
> You must first configure your SMS service with Twilio to build an SMS template in Engage. Visit the [onboarding steps](/docs/engage/onboarding/) for more on how to connect a Twilio account.

To build an SMS template, navigate to **Engage > Content** and click **Create Template**.

1. Select **SMS**, then click **Configure**.
2. Add a template name and description.
3. Select a [Twilio Engage messaging service](https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services){:target="blank"} to use.  
4. Add the body of your text message. To personalize your message based on user profile traits, include [merge tags](#personalize-with-merge-tags).
  1. Include an opt-out message in the body of your text. For example, "Reply STOP to unsubscribe." See [SMS Best Practices](#sms-best-practices-and-limitations) for more information.
5. [Test your personalized SMS](#test-your-sms-template) with relevant user profiles.
6. Click **Create SMS Template**.

Use the SMS Templates screen to preview and update existing SMS message templates.

## Test your SMS template

Send a test SMS message before you include it as a step in your Journey.

1. After you build your SMS template, click **Test SMS**.
2. If your template has profile traits, enter a trait value for the test SMS. This ensures that your merge tags work as expected.
- Empty fields show the default value that you've assigned. For example, `loyal customer` would be the default for the following merge tag: {% raw %}```{{profile.traits.first_name | default: "loyal customer"}}```{% endraw %}. If there's no default value, the field will be blank.
3. Enter recipient phone numbers for the test message.
- Profiles that you send test messages to must have a userId in Segment.
4. Click **Send test SMS**.


> success ""
> You can also test SMS templates [directly within Journeys](/docs/engage/journeys/build-journey/#send-an-sms) before you send them.

## Personalize with merge tags

Personalize SMS content in Engage using profile traits as merge tags in your messages.

To personalize an SMS, click **Merge Tags** in the SMS builder and select the profile traits to include in your message.

Engage inserts the selected traits inside merge tags based on cursor placement in the message. This allows you to personalize each SMS you send to recipients. You can also use [liquid templating](https://liquidjs.com/tags/if.html){:target="blank"} to create dynamic content in the SMS editor. 

> info ""
> To learn more about profile traits, visit Segment's [Computed Traits](/docs/engage/audiences/computed-traits/) and [SQL Traits](/docs/engage/audiences/sql-traits/) documentation.

## Configure Link Shortening

Use Link Shortening to send shorter, more manageable link URLs in your Engage SMS campaigns.

Configure Link Shortening in your [Twilio Console](https://www.twilio.com/docs/messaging/how-to-configure-link-shortening){:target="blank"} in six steps:


1. [Set up an Organization](https://www.twilio.com/docs/messaging/how-to-configure-link-shortening#step-1-setting-up-an-organization){:target="blank"}
2. [Register Domains](https://www.twilio.com/docs/messaging/how-to-configure-link-shortening#step-2-registering-domains){:target="blank"}
3. [Add Domain Name System (DNS) records](https://www.twilio.com/docs/messaging/how-to-configure-link-shortening#step-3-adding-dns-records){:target="blank"}
4. [Generate a TLS certificate](https://www.twilio.com/docs/messaging/how-to-configure-link-shortening#step-4-generating-a-tls-certificate){:target="blank"}
5. [Upload your TLS certificate](https://www.twilio.com/docs/messaging/how-to-configure-link-shortening#step-5-uploading-tls-certificate){:target="blank"}
6. [Configure fallback and callback URLs](https://www.twilio.com/docs/messaging/how-to-configure-link-shortening#step-5-uploading-tls-certificate){:target="blank"} (Optional)

Once you've configured Link Shortening, Twilio automatically shortens the link URLs for recipients of your SMS messages. Link shortening occurs during the message sending process, so shortened links don't appear in the message editor.

> info ""
> Link Shortening is only available for SMS messages.

## Clone an SMS message template

You can clone existing SMS templates to edit and use in your message campaigns.

To clone a template, navigate to the Templates page (**Engage > Content**). You can also clone from the Overview page of an individual template.

1. Click the **...** icon.
2. Select **Clone**.
3. Enter a template name.
4. Click **Clone** to save the template.

After you clone a template, you can edit it from the Templates page.

## SMS best practices and limitations

### Include an SMS opt-out message

When you build an SMS, it's important to include an opt-out message in the body of your text that informs recipients they can unsubscribe from a message channel.

When an SMS recipient replies "Stop" to an SMS, they'll receive an opt-out confirmation, and Engage updates their phone number subscription status. Visit the [User Subscription States](/docs/engage/user-subscriptions/subscription-states/) documentation to learn more about user subscriptions in Engage.

### SMS character limit

Note that there's a 1,600 character count limit for SMS messages.
Visit Twilio's [SMS Character Limit](https://www.twilio.com/docs/glossary/what-sms-character-limit ){:target="blank"} documentation for more information.

## Next steps

Use the Templates screen in Twilio Engage to [build personalized email templates](/docs/engage/content/email/template/).
