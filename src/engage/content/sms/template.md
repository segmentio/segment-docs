---
title: SMS Template
layout: engage
engage: true
---
Use Twilio Engage to build SMS message templates to include throughout your marketing campaigns.

You can build an SMS template and include personalized content in messages based on user profile traits. Once you build the SMS, Twilio Engage saves the template for you to preview, maintain, and reuse.

Use personalized SMS messages to connect with users in real-time, as they reach a specific step in a journey.

## Build an SMS message template

> info ""
> You must first configure your SMS service with Twilio to build an SMS template in Engage. Visit the [onboarding steps](/docs/engage/overview/onboarding/) for more on how to connect a Twilio account.

To build an SMS template, navigate to **Personas > Content** and click **New Template**.

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
2. Enter recipient phone numbers for the test message.
3. Select a profile to test the SMS with and click  **Use as Test Profile**. To ensure merge tags work as expected, use test profiles with traits that apply to your campaign.
4. Click **Send Test SMS**.

If a recipient replies "Stop" to the test SMS, Twilio unsubscribes their phone number and sends an opt-out confirmation.

> success ""
> You can also test SMS templates [directly within Journeys](/docs/engage/journeys/build-journey/#send-an-sms) before you send them.

## Personalize with merge tags

Personalize SMS content in Engage using profile traits as merge tags in your messages.

To personalize an SMS, click **Merge Tags** in the SMS builder and select the profile traits to include in your message.

Engage inserts the selected traits inside merge tags based on cursor placement in the message. This allows you to personalize each SMS you send to recipients.  

> info ""
> To learn more about profile traits, visit Segment's [Computed Traits](/docs/personas/computed-traits/) and [SQL Traits](/docs/personas/sql-traits/) documentation.

## SMS best practices and limitations

### Include an SMS opt-out message

When you build an SMS, it's important to include an opt-out message in the body of your text that informs recipients they can unsubscribe from a message channel.

When an SMS recipient replies "Stop" to an SMS, they'll receive an opt-out confirmation, and Engage updates their phone number subscription status. Visit the [User Subscription States](/docs/engage/profiles/user-subscriptions/subscription-states/) documentation to learn more about user subscriptions in Engage.

### SMS character limit

Note that there's a 1,600 character count limit for SMS messages.
Visit Twilio's [SMS Character Limit](https://www.twilio.com/docs/glossary/what-sms-character-limit ){:target="blank"} documentation for more information.

## Next steps

Use the Templates screen in Twilio Engage to [build personalized email templates](/docs/engage/content/email/template/).
