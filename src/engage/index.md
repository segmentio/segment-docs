---
title: Engage Introduction
plan: engage-foundations
redirect_from:
  - '/personas/'
---

Powered by real-time data, Twilio Engage is a customizable personalization platform with which you can build, enrich, and activate Audiences.

Engage Channels builds on top of these Audiences, helping you connect with and market to your customers through email, SMS, and WhatsApp campaigns.

## What can you do with Engage?

#### Create unified customer profiles
Engage uses [Segment Identity Resolution](/docs/unify/identity-resolution/) to take event data from across devices and channels and intelligently merge it into complete user- or account-level profiles. This gives your organization a single view of your customer base. To learn more, read the [Identity Resolution documentation](/docs/unify/identity-resolution/).

{% include components/reference-button.html href="https://segment.com/customers/frame-io/" icon="personas.svg" title="Personalizing customer interactions" description="Support teams rely on Segment's unified profiles to make real-time and informed decisions about customers when answering tickets or taking support calls. Read about how the support team at Frame.io reduced ticket response time by 80%." %}

#### Enrich profiles with new traits
Add detail to user profiles with new traits and use them to power personalized marketing campaigns. You can add new traits to your user or account profiles in Engage using:

- [**Computed Traits:**](/docs/engage/audiences/computed-traits/) Use the Engage drag-and-drop interface to build per-user (B2C) or per-account (B2B) metrics on user profiles (for example, “lifetime value” or “lead score”).
- [**SQL Traits:**](/docs/engage/audiences/sql-traits/) Run custom queries on your data warehouse using the Engage SQL editor, and import the results into Segment. With SQL Traits, you can pull rich, uncaptured user data back into Segment.

#### Build Audiences
Create lists of users or accounts that match specific criteria. For example, after creating an `inactive accounts` audience that lists paid accounts with no logins in 60 days, you can push the audience to your analytics tools or send an SMS, email, or WhatsApp campaign with Engage Channels. Learn more about [Engage audiences](/docs/engage/audiences/).

#### Sync audiences to downstream tools
Once you create your Computed Traits and Audiences, Engage sends them to your Segment Destinations in just a few clicks. You can use these Traits and Audiences to personalize messages across channels, optimize ad spend, and improve targeting. You can also use the [Profile API](/docs/unify/profile-api) to build in-app and onsite personalization. Learn more about [using Engage data](/docs/engage/using-engage-data/) and the [Profile API](/docs/unify/profile-api).

{% include components/reference-button.html href="https://segment.com/customers/drift/" icon="personas.svg" title="Personalizing marketing campaigns" description="Marketing teams use Engage to run real-time multi-channel marketing campaigns based off specific user attributes they've computed in Engage. Read about how Drift used Engage to increase prospect engagement by 150% in two months." %}

## Market to customers with Engage Premier and Channels

To send email, SMS, and WhatsApp campaigns with Engage Channels, you'll connect a [Twilio messaging service](https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services){:target="blank"}, [SendGrid subuser account](https://docs.sendgrid.com/ui/account-and-settings/subusers#create-a-subuser){:target="blank"}, and [WhatsApp messaging service](https://www.twilio.com/docs/whatsapp/self-sign-up){:target="blank"} to your Segment Engage space. Use existing accounts, or create new ones.

View the [onboarding steps](/docs/engage/onboarding/) for more on how to connect Twilio and SendGrid accounts.

#### Send email, SMS, and WhatsApp messages in Journeys

Use Engage to build email, SMS, and WhatsApp campaigns within [Journeys](/docs/engage/journeys/). Send campaigns to [subscribed users](#user-subscriptions) based on event behavior and profile traits. With [message analytics](#message-analytics), you can track the performance of your campaigns.

- **Send Email**: [Build email campaigns](/docs/engage/campaigns/email-campaigns/) with existing templates, or create a new email template within Journeys. Before you send the email, test the template and set [conversion goals](#conversion-goals).

- **Send SMS messages**: [Build SMS campaigns](/docs/engage/campaigns/sms-campaigns/) to message users in real-time as a step in a Journey. For example, create an abandoned cart campaign that texts users a reminder to complete their purchase, along with a promo code. Add [merge tags](#personalize-with-merge-tags) and set conversion goals.

- **Send WhatsApp messages**: [Build WhatsApp campaigns](/docs/engage/campaigns/whatsapp-campaigns) that deliver messages to your customers on the world's most used messaging app. 

To learn more, visit the [CSV Uploader](/docs/engage/profiles/csv-upload/) documentation.

#### Build Email, SMS, and WhatsApp message templates

Build personalized [email](/docs/engage/content/email/template/), [SMS](/docs/engage/content/sms/template), and [WhatsApp](/docs/engage/content/whatsapp) templates in Twilio Engage for use in your campaigns. Design email templates with a WYSIWYG [visual editor](/docs/engage/content/email/editor/) or a code editor. Engage saves the templates for you to preview, edit, and reuse throughout Journeys.

#### Personalize with merge tags
Insert real-time user profile traits from merge tags to personalize each message. For example, address recipients by name or highlight new products from a user's favorite brand.

#### CSV Uploader
Use the CSV uploader to add or update user profiles and [subscription states](/docs/engage/user-subscriptions/). To learn more, visit the [CSV Uploader](/docs/engage/profiles/csv-upload/) documentation.

#### User subscriptions

Set user subscription states in two ways:
- [Upload a CSV file](/docs/engage/profiles/csv-upload/) with lists of users along with their phone, email, and WhatsApp subscription states.
- Programmatically with Segment's [Public API](https://api.segmentapis.com/docs/spaces/#replace-messaging-subscriptions-in-spaces){:target="blank"}

Use Engage to add subscription states to user email addresses and phone numbers. Subscription states help determine which users you can send campaigns to in Engage. You can set user subscription states with a [CSV file upload](/docs/engage/profiles/csv-upload/), or programmatically with Segment's [Public API](https://api.segmentapis.com/docs/spaces/#replace-messaging-subscriptions-in-spaces){:target="blank"}.

#### Message Analytics
With analytics in Engage, you can monitor real-time conversion data. Track message performance and customer interaction beyond clicks and opens. Use campaign dashboards to view events such as `Email Delivered`, `Unsubscribed`, `Spam Reported`, and more.

#### Conversion Goals

For each message step in a Journey, you can set conversion conditions with events and properties in your Segment space. Then, define a duration after message delivery to track goals.

For example, track users who perform the event **Order Completed** with a promo code that you send them.

Visit [Message Analytics](/docs/engage/analytics/) to learn more.
