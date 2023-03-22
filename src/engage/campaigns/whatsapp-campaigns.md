---
title: WhatsApp Campaigns
plan: engage-premier
---

> info "WhatsApp Public Beta"
> WhatsApp as an Engage channel is in public beta.

## How Engage campaigns work

Twilio Engage uses Journeys to send WhatsApp, email, and SMS campaigns.  With Journeys, you add conditions and steps that trigger actions like sending a WhatsApp message.

You’ll build and send your WhatsApp campaign in three stages:

1. Create a Journey.
2. Add a Journey condition.
3. Add a WhatsApp step and publish your campaign.

> warning "WhatsApp Templates"
> To send a WhatsApp campaign, you'll first need an approved WhatsApp template. For instructions on building a template, view [WhatsApp Templates](/docs/engage/content/whatsapp).

### Create a Journey

Because Engage campaigns exist within Journeys, begin by creating a Journey:

1. In Engage, select **Journeys**, then click **Create journey**.
2. Name your Journey and select its entry settings.
3. Click **Build Journey** to create the Journey.

Segment then opens the Journey Builder.

### Add a Journey condition

With your Journey created, you’ll now set a condition to trigger your WhatsApp campaign:

1. Within the Journey builder, click **+ Add Entry Condition**.
2. In the **Add entry condition** pane, give the step a name.
3. Click **+ Add Condition**, select your desired condition, then click **Save**.

With your entry condition added, you’re ready to add an approved WhatsApp template to build a campaign.

### Add a WhatsApp step and publish your Journey

1. Within the Journey builder, click the **+** node below your new condition.
2. From the **Add step** window, click **Send a WhatsApp**.
3. Pick an approved template from the template list, then choose **Select**.
4. Give the WhatsApp message step a name.
5. In the **Sender** field, choose **WhatsApp**, then click **Save**.
6. Segment returns you to the Journey builder. Select **Publish**, then select **Publish journey** in the popup.

Your Journey and WhatsApp campaign are now live. Users who trigger the WhatsApp step’s parent Journey condition will receive your SMS campaign.

## Messaging limits

WhatsApp limits the number of unique recipients that can receive your campaigns. If your Meta Business Account isn't verified, you'll begin with a messaging limit of 250 unique recipients every 24 hours.

Once your Meta Business Account is verified, the number of unique recipients increases, depending on your messaging limit tier. For more information, view Meta's [messaging limits documentation](https://developers.facebook.com/docs/whatsapp/messaging-limits/){:target="_blank"}.
