---
title: Twilio Messaging Destination
id: 674f23ece330374dc1ecc874
hidden: true
beta: true
---

Twilio Messaging gives businesses a way to reach customers on SMS, MMS, and WhatsApp for transactional notifications and personalized campaigns.

The Twilio Messaging destination connects Segment to Twilio, letting you send messages automatically based on real-time events, audience segments, or journeys without managing complex integrations.

With the Twilio Messaging destination, you can:

- Confirm orders or appointments
- Send shipping updates or reminders
- Deliver personalized marketing messages
- Support onboarding and reactivation campaigns

This destination supports two ways to send messages:

- **Content templates**: Messages pre-built and managed in Twilio.
- **Inline messages**: Messages created directly in Segment, with dynamic fields and variables.

Twilio Messaging integrates tightly with Segment's data and audience tools, so you can deliver timely, personalized messages without building custom integrations.

> info "Twilio Messaging Destination Private Beta"
> Bidirectional sync is in Private Beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

## Getting started

To start sending messages through Twilio Messaging, you'll set up your Twilio account credentials and connect the destination in Segment.

You'll set up the Twilio Messaging destination in three stages:

1. Create a Twilio API Key and Secret.
2. Add the Twilio Messaging destination in Segment.
3. Configure message mappings to define what messages to send and when.

The following sections walk through each step in detail.

## Authentication and setup

Before you add the Twilio Messaging destination to Segment, you'll first need to create an API Key and Secret in your Twilio account.

To create your API Key and Secret:

1. Sign in to your [Twilio Console](https://console.twilio.com/){:target="_blank"}.
2. From your Account Dashboard, copy and save your **Account SID**. You'll enter it in Segment later.
3. In the **Account Info** tab, click **Go to API keys**.
4. On the **API keys & tokens** page, click **Create API Key**.
5. Enter a name for your API key, select the **Standard** key type, then click **Create**.
6. On the **Copy secret key** page, copy the **SID** and **Secret** values. Store them securely. You'll enter both in Segment later.
7. Click **Done** to finish creating the API Key.

You now have your Account SID, API Key SID, and API Key Secret, which are required to connect Twilio Messaging in Segment.

## Add the Twilio Messaging destination

After setting up your Twilio credentials, add the Twilio Messaging destination to your Segment workspace.

To add the destination:

1. From the Twilio Messaging destination page, click **Add destination**.
2. On the Setup screen, give the destination a name and select **Fill in settings manually**.
3. On your new destination page, click the **Settings** tab.
4. On the Settings tab, enter your **Twilio Account SID**, **Twilio API Key SID**, and **Twilio API Key Secret**.
6. To finish setting up the destination, click **Save Changes**.

The destination is now connected and ready to configure message mappings.

<!-- PW, 6/29/25; during private beta, there's no way to search for the destination in the catalog. 
Users can only access the destination through the specific URL. I'll update these instructions once
it's publicly available and searchable in the workspace catalog. -->

