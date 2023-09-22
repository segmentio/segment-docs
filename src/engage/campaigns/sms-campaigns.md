---
title: SMS Campaigns
plan: engage-premier
---

With Twilio Engage, you can send email and SMS campaigns to users who have opted in to receive your marketing materials. On this page, you’ll learn how to create and send an SMS campaign.

Some knowledge of the Journeys product will benefit you as you read through this guide. If you’re new to Journeys, the [Journeys documentation](/docs/personas/journeys/) will bring you up to speed.

## How Engage campaigns work

Twilio Engage uses Journeys to send email and SMS campaigns.  With Journeys, you add conditions and steps that trigger actions like sending an email or an SMS.

You’ll build and then send your campaign in three stages:

1. Create a Journey.
2. Add a Journey condition.
3. Create, test, and send your SMS campaign.

### Create a Journey

Because Engage campaigns exist within Journeys, begin by creating a Journey:

1. In Engage, select **Journeys**, then click **New Journey**.
2. Name your Journey and select its entry settings.
3. Click **Build Journey** to create the Journey.

### Add a Journey condition

With your Journey created, you’ll now create a [condition](docs/personas/journeys/build-journey/#available-step-types) that will trigger your SMS campaign:

1. Within the Journey builder, click **+ Add Entry Condition**.
2. In the Add Entry Condition pane, give the step a name.
3. Click **+ Add Condition**, select your desired condition, then click **Save**.

With your entry condition added, you’re now ready to create your SMS campaign.

### Create, test, and publish your SMS campaign

Follow these steps to create an SMS campaign:

1. Within the Journey builder, click the **+ node** below your new condition.
2. From the **Select a Step** window, click **Send an SMS**.
3. In the **Send SMS** window, select **Build a new SMS** or [Use a template](/docs/engage/content/sms/template/) to choose an existing SMS template.
4. Enter your campaign content into the **Body** field.
5. Add a STOP/unsubscribe line to the end of your SMS.

> success "Engage content validation"
> For all Engage content editors, you'll see alerts for any issues in your template, such as invalid profile traits or incorrect liquid syntax. Engage flags the template issues that require your attention before proceeding, and displays recommended steps to fix the issue.

> warning ""
> Unsubscribe options are required by law.  Your SMS campaign must contain “Reply STOP to unsubscribe.”

### Test your SMS campaign

At this point, you can send a test SMS before publishing your campaign. Testing the SMS confirms that your content and merge tags appear as expected.

As part of your test send, you can enter custom values to populate the profile traits in your SMS message.

Follow these steps to test your campaign:

1. In the **Send an SMS** pane, click **Test SMS**.
2. If your template has profile traits, enter a trait value for the test SMS. This ensures that your merge tags work as expected.
- To test a default value, leave the profile traits field blank. Default values must be assigned in your merge tags. For example, `loyal customer` would be the default for the following merge tag: {% raw %}```{{profile.traits.first_name | default: "loyal customer"}}```{% endraw %}.
3. In the **Recipients** field, enter the phone number(s) that will receive your test SMS.
4. Click **Send test SMS**.

### Publish your SMS campaign

With your SMS created and tested, you’re now ready to save the campaign and publish your Journey with the following steps:

1. Verify that all **Send SMS** fields are correct.
2. Click **Save**.
3. In the Journey builder, click **Publish**.

Your SMS campaign is now live. Users who trigger the SMS step’s parent Journey condition will receive your SMS campaign.

## SMS campaign fields

The following table contains descriptions of the three fields in the Journeys Send SMS builder.  All SMS fields are required.

| Field         | Description                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Step name     | The name for the SMS campaign’s parent Journey step. SMS recipients won’t see this field.                                                                  |
| Sender number | The phone number from which you’ll send the SMS campaign. Format the number with a + followed by the country code. Do not use hyphens, spaces, or periods. |
| Body          | The SMS message content.  Engage SMS campaigns are limited to 1600 characters.                                                                             |

## Next steps

Using Journeys, you can create multi-channel customer engagement with both email and SMS campaigns.  Having published an SMS, learn how [Engage email campaigns](/docs/engage/campaigns/email-campaigns/) can help you market to customers through email.
