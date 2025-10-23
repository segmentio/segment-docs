---
title: Twilio Messaging Destination
id: 674f23ece330374dc1ecc874
hidden: false
hide-dossier: true
beta: true
redirect_from: '/connections/destinations/catalog/twilio-messaging/'
---

[Twilio Messaging](https://www.twilio.com/en-us/messaging/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} gives businesses a way to reach customers on SMS, MMS, and WhatsApp for transactional notifications and personalized campaigns.

The Twilio Messaging destination connects Segment to Twilio, letting you send messages automatically based on real-time events, audience segments, or journeys without managing complex integrations.

With the Twilio Messaging destination, you can:

- Confirm orders or appointments.
- Send shipping updates or reminders.
- Deliver personalized marketing messages.
- Support onboarding and reactivation campaigns.

This destination supports two ways to send messages:

- **Content templates**: Messages pre-built and managed in Twilio.
- **Inline messages**: Messages created directly in Segment, with dynamic fields and variables.

Twilio Messaging works with Segment's data and audience tools to send timely, personalized messages without extra integration work.

> info "Twilio Messaging destination public beta"
> The Twilio Messaging destination is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

## Getting started

To start sending messages through Twilio Messaging, set up your Twilio account credentials and connect the destination in Segment.

There are three stages to setting up the Twilio Messaging destination:

1. [Create a Twilio API Key and Secret](#authentication-and-setup).
2. [Add the Twilio Messaging destination in Segment](#add-the-twilio-messaging-destination).
3. [Configure message mappings](#configuring-message-mappings) to define what messages to send and when.

The following sections walk through each step in detail.

## 1. Authentication and setup

Before you add the Twilio Messaging destination to Segment, you first need to create an API Key and Secret in your Twilio account.

To create your API Key and Secret:

1. Sign in to your [Twilio Console](https://console.twilio.com/){:target="_blank"}.
2. From your Account Dashboard, copy and save your **Account SID**. You'll enter it in Segment later.
3. In the **Account Info** tab, click **Go to API keys**.
4. On the **API keys & tokens** page, click **Create API Key**.
5. Enter a name for your API key, select the **Standard** key type, then click **Create**.
6. On the **Copy secret key** page, copy the **SID** and **Secret** values. Store them securely. You'll enter both in Segment later.
7. Click **Done** to finish creating the API Key.

You now have your Account SID, API Key SID, and API Key Secret, which are required to connect Twilio Messaging in Segment.

## 2. Add the Twilio Messaging destination

After setting up your Twilio credentials, add the Twilio Messaging destination to your Segment workspace.

To add the destination:

1. From your workspace’s [Destination Catalog](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"}, search for **Twilio Messaging.**
2. Select **Twilio Messaging**, then click **Add destination**.
3. Select an existing source to connect to the destination, then click **Next**.
4. On your new destination page, click the **Settings** tab.
5. On the Settings tab, enter your **Twilio Account SID**, **Twilio API Key SID**, and **Twilio API Key Secret**.
6. To finish setting up the destination, click **Save Changes**.

The destination is now connected and ready to configure message mappings.

## 3. Configuring message mappings

The Twilio Messaging destination supports one mapping action: **Send message**. Use this to set up when messages should be sent and what content they include.

### Set up the Send message mapping

To configure the mapping:

1. In the Twilio Messaging destination settings, go to **Mappings**.
2. Click **New Mapping**.
3. Select the **Send message** action.
4. Choose the trigger event for when the message should send.
5. Fill out the required fields.
6. Click **Save** to create the mapping.
7. Enable the mapping to start sending messages.

### Mapping fields reference

| Field                     | Description                                                                 | Notes                                                                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Channel**               | Choose which channel to send the message on.                                | Options: SMS, MMS, WhatsApp, RCS, and Facebook Messenger. If selecting RCS, ensure that RCS is enabled in your Twilio account. Facebook Messenger is a Beta feature.     |
| **Sender Type**           | Pick how you want to send the message.                                      | Options: Phone number or Messaging Service. Phone numbers must be approved in Twilio.                                                                                   |
| **Content Template Type** | Select the type of content template.                                        | Options include Inline or templates you’ve built in Twilio. Segment only shows templates that match your selected Channel and Template Type.                            |
| **To Phone Number**       | Enter the recipient’s phone number.                                         | Must be in [E.164 format](https://www.twilio.com/docs/glossary/what-e164){:target="_blank"}.                                                                            |
| **From Phone Number**     | Choose the phone number to send from.                                       | Must be approved in Twilio and support the channel you’re using.                                                                                                        |
| **To Messenger User ID**  | Enter the Facebook Messenger User ID to sent to.                            | Required if Sender Type is Facebook Messenger                                                                                                                           |
| **From Facebook Page ID** | Enger your Facebook Page ID. Messages will be sent from this Page.          | Required if Sender Type is Facebook Messenger                                                                                                                           |
| **Messaging Service SID** | Enter the messaging service SID if you’re using a messaging service.        | Required if Sender Type is Messaging Service.                                                                                                                           |
| **Content Template SID**  | Choose which content template to use.                                       | Required unless you’re using Inline.                                                                                                                                    |
| **Content Variables**     | Map variables used in your content template.                                | These variables need to be defined in Twilio first.                                                                                                                     |
| **Inline Template**       | Write your message body if you’re using Inline.                             | Supports variables. Shown only if Content Template Type is Inline.                                                                                                      |
| **Inline Media URLs**     | Add any media URLs for your inline message.                                 | URLs must be publicly accessible. Shown only if Content Template Type is Inline.                                                                                        |
| **Validity Period**       | Set how long Twilio should keep trying to deliver the message (in seconds). | Optional. Default is 14400 seconds (4 hours). Can be between 1 and 14400.                                                                                               |
| **Send At**               | Schedule when Twilio should send the message.                               | Optional. Must be in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601){:target="_blank"}. Messages won’t send before this time and will expire after it passes. |


## Message composition options

The Twilio Messaging destination gives you two ways to create and send messages.

**Content templates** are [templates you’ve already set up in Twilio](https://www.twilio.com/docs/content/create-templates-with-the-content-template-builder){:target="_blank”}. They can include text, media, buttons, and other elements, depending on what you’ve built. When you choose a Channel and Content Template Type in Segment, you’ll only see templates that are compatible with those choices. If you’re sending messages to WhatsApp, you need to use Content Templates, since WhatsApp requires pre-approved templates. For most use cases, templates are the way to go because they support richer formatting and keep you compliant.

**Inline messages** let you write your message directly in Segment mappings. You can include [dynamic variables](#using-variables) to personalize messages. Inline messages also support adding media URLs if you’re sending MMS or WhatsApp messages. They’re useful for quick tests or simple notifications, but they don’t support all the advanced features that Content Templates do.

In Segment, map each variable to the event property it should pull from. For example, if your template says {% raw %}`Hello {{first_name}}`{% endraw %}, map `first_name` to the user’s first name property.

Choose the option that fits what you’re trying to send. For most customer-facing messages, Content Templates will give you the most reliable and feature-rich experience.

## Message setup options

There are key settings to choose from when configuring message mappings.

### Content template types

The template types you can use depend on the channel you select. Segment only shows templates that are compatible with your chosen channel.

| Template type | Available channels | Description                                            |
| ------------- | ------------------ | ------------------------------------------------------ |
| Text          | SMS, WhatsApp      | Standard text-only templates.                          |
| Media         | MMS, WhatsApp      | Templates that include images, videos, or other media. |
| Quick reply   | WhatsApp           | Messages with quick reply buttons for users to tap.    |

If you’re sending messages on WhatsApp, all messages must use approved Content Templates.

### Sender types

The **Sender Type** field is used to specify if the message should be sent from a **phone number**, **messaging service** or **Facebook Page ID**. Available Sender Types depend on the selected Channel. 

- For **phone number**, Twilio sends the message from a specific number you own. The number must be approved in your Twilio account and support the channel you’re using.
- For **messaging service**, Twilio uses a Messaging Service SID to send the message. Messaging Services group multiple senders under one ID, and Twilio decides which sender to use based on your setup. This option is helpful if you’re sending high volumes or managing multiple numbers.
- For **Facebook Page ID**, Twilio uses the Facebook Page ID to send the message. The [Facebook Page must first be authorized](https://www.twilio.com/docs/messaging/channels/facebook-messenger){:target="_blank"} to send messages in Twilio console.  


### Using variables

Variables let you personalize messages with details from your event data or user traits.

If you’re using a **Content Template**:
- Variables must be defined in Twilio when you create the template.
- In Segment, map each variable to the event property it should pull from. For example, if your template says {% raw %}`Hello {{first_name}}`{% endraw %}, map `first_name` to the user’s first name property.

If you’re writing an **inline message**:
- Add variables directly in your message body using Handlebars.
- Define each variable in your mapping so Segment knows what value to insert.

You can also use variables in Inline Media URLs to dynamically include different media based on event data.

Make sure all variables you reference in your message are included in your mapping configuration.

## Additional features

Twilio Messaging also supports a few optional settings that you can use in your mappings.

### Validity period

The **Validity Period** controls how long Twilio keeps trying to deliver your message. It’s set in seconds, with a minimum of 1 and a maximum of 14400 seconds (4 hours). If the message isn’t delivered within this time, it won’t be sent. The default is 14400 seconds.

### Send At

The **Send At** field lets you schedule a message to be sent at a specific time. Enter the time in ISO 8601 format. Messages won’t send before this time, and if the scheduled time passes, new messages triggered after that time won’t send either. Also, keep in mind that Twilio processes scheduled messages as they come in, so delivery might not be exactly at the time you set.

Use these settings if you need to control delivery timing for things like appointment reminders or time-sensitive notifications.

## Important considerations

Here are a few things to keep in mind when using the Twilio Messaging destination:

- **Content Templates must be created in Twilio**. You can’t create or edit Content Templates directly in Segment. Make sure your templates are built and approved in your Twilio account before selecting them in your mappings.
- **WhatsApp messages require approved templates**. WhatsApp doesn’t allow freeform messages unless it’s part of an active conversation window. For outbound messages, you’ll need to use approved Content Templates.
- **Phone numbers must be approved**. Any phone number you use to send messages must be approved in your Twilio account and support the channel you’re sending on.
- **Message logs and errors**. If a message fails to send, you can view details in your Twilio Console message logs. Common issues include invalid phone number formats or missing required template fields.

Understanding these details will help you set up your messaging flows smoothly and avoid unexpected errors.
