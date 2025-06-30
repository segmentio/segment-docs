---
title: Twilio Messaging Destination
id: 674f23ece330374dc1ecc874
hidden: true
beta: true
---

Twilio Messaging gives businesses a way to reach customers on SMS, MMS, and WhatsApp for transactional notifications and personalized campaigns.

The Twilio Messaging destination connects Segment to Twilio, so teams can send messages automatically based on real-time events, audience segments, or journeys without managing complex integrations.

With the Twilio Messaging destination, you can:

- Confirm orders or appointments
- Send shipping updates or reminders
- Deliver personalized marketing messages
- Support onboarding and reactivation campaigns

This destination supports two ways to send messages:

- **Content templates**: Messages pre-built and managed in Twilio.
- **Inline messages**: Messages created directly in Segment, with dynamic fields and variables.

Twilio Messaging integrates tightly with Segment's data and audience tools, so you can deliver timely, personalized messages without building custom integrations.

## Getting started

To start sending messages through Twilio Messaging, you'll set up your Twilio account credentials and connect the destination in Segment.

At a high level, you will:

1. Create a Twilio API Key and Secret.
2. Add the Twilio Messaging destination in Segment.
3. Configure message mappings to define what messages to send and when.

The following sections walk through each step in detail.

## Authentication and setup

Before adding the Twilio Messaging to Segment, create an API Key and Secret in your Twilio account.

To create your API Key and Secret:

1. Sign in to your [Twilio Console](https://console.twilio.com/){:target="_blank"}.
2. From your Account Dashboard, copy and save your **Account SID**. You'll this in Segment later.
3. In the **Account Info** tab, click **Go to API keys**.
4. On the **API keys & tokens** page, click **Create API Key**.
5. Enter a name for your API key, select the **Standard** key type, then click **Create**.
6. On the **Copy secret key** page, copy the **SID** and **Secret** values. Store them securely. You'll enter both in Segment later.
7. Click **Done** to finish creating the API Key.

You now have your **Account SID**, **API Key SID**, and **API Key Secret**, which are required to connect Twilio Messaging in Segment.
