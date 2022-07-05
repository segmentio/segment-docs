---
title: Engage Introduction
layout: engage
engage: true
---
With Twilio Engage, you can use data, tools, and analytics to build personalized marketing campaigns.

Powered by real-time data, Engage combines Segment's [Personas](/docs/personas/) platform with SMS and email messaging from Twilio and SendGrid. Use unified customer profiles to create personalized experiences right from Engage. Reach users through email and SMS channels and build campaigns for acquisition, conversion, and retention.

## Get started

To use email and SMS message tools in Engage, you must connect a [Twilio messaging service](https://support.twilio.com/hc/en-us/articles/223181308-Getting-started-with-Messaging-Services){:target="blank"} and [SendGrid subuser account](https://docs.sendgrid.com/ui/account-and-settings/subusers#create-a-subuser){:target="blank"} to your Segment Personas space. Use existing accounts, or create new ones.

View the [onboarding steps](/docs/engage/overview/onboarding/) for more on how to connect Twilio and SendGrid accounts.

## Send Email and SMS messages in Journeys

Use Engage to build email and SMS campaigns within [Journeys](/docs/engage/journeys/). Send email or SMS to [subscribed users](#user-subscriptions) based on event behavior and profile traits. With [message analytics](#message-analytics), you can track the performance of your campaigns.

- **Send Email**: [Build email campaigns](/docs/engage/campaigns/email-campaigns/) with existing templates, or create a new email template within Journeys. Before you send the email, test the template and set [conversion goals](#conversion-goals).

- **Send SMS messages**: [Build SMS campaigns](/docs/engage/campaigns/sms-campaigns/) to message users in real-time as a step in a Journey. For example, create an "abandoned cart" campaign that texts users a reminder to complete their purchase, along with a promo code. Add [merge tags](#personalize-with-merge-tags) and set conversion goals.

## Build Email and SMS message templates  

Build personalized [email](/docs/engage/content/email/template/) and [SMS](/docs/engage/content/sms/template) templates in Twilio Engage to use in your campaigns. Design email templates with a WYSIWYG [visual editor](/docs/engage/content/email/editor/) or a code editor. Engage saves the templates for you to preview, edit, and reuse throughout Journeys.


### Personalize with merge tags
Insert real-time user profile traits from merge tags to personalize each message. For example, address recipients by name or highlight new products from a user's favorite brand.

### Test email or SMS messages

Test your email and SMS messages with Engage before you send them in campaigns. Use test profiles with similar traits to see how merge tags and content appear.

### Include unsubscribe options
As you build message templates, include a way for recipients to unsubscribe from your marketing. Use message templates in Engage to:
- Add unsubscribe links to email.
- Inform SMS recipients they can "Reply STOP to unsubscribe."

Learn more about [user subscriptions](/docs/engage/profiles/user-subscriptions/) in Engage.

## CSV Uploader
Use the CSV uploader to add or update user profiles and subscription states.

- CSV rows map to user profiles and columns to identifier traits from your [identity resolution configuration](/docs/personas/identity-resolution/identity-resolution-settings/).
- Download a template with identifier columns from your Segment space.
- Add email and SMS columns from your Segment space.
- Add email and SMS [subscription states](/docs/engage/profiles/user-subscriptions/subscription-states/).
- Add a custom trait to users in the CSV. Custom traits help you [create audiences](/docs/engage/audiences/#building-an-audience), send messages, or add users to an existing group in your Segment space.
- Use error reports to quickly fix errors and re-upload unprocessed data.

To learn more, visit the [CSV Uploader](/docs/engage/profiles/csv-upload/) documentation.

## User Subscriptions

Use Engage to add subscription states to user email addresses and phone numbers.
Subscription states help determine which users you can send campaigns to in Engage.

There are four subscription states: `subscribed`, `unsubscribed`, `did-not-subscribe`, and **no subscription status (blank value)**.

> success ""
> Only send Engage campaigns to `subscribed` email addresses and phone numbers. Learn more about user [subscription states](/docs/engage/profiles/user-subscriptions/subscription-states/) in Engage.

Set user subscription states in two ways:
- [Upload a CSV](/docs/engage/profiles/csv-upload/) with lists of users along with their phone and email subscription states.
- Programmatically with Segment's [Public API](https://api.segmentapis.com/docs/spaces/#replace-messaging-subscriptions-in-spaces){:target="blank"}.

Verify that users you message in Engage have given explicit permission to do so. Only send messages to `subscribed` users to avoid:
- Penalties for violating regulations.
- Increased spam reports or bounce rates.
- Loss of customer trust.

## Message Analytics
With analytics in Engage, you can monitor real-time conversion data. Track message performance and customer interaction beyond clicks and opens. Use campaign dashboards to view events such as `Email Delivered`, `Unsubscribed`, `Spam Reported`, and more.

### Conversion Goals

For each message step in a Journey, set conversion conditions with events and properties in your Segment space. Then, define a duration after message delivery to track goals.

For example, track users who perform the event **Order Completed** with a promo code that you send them.

Visit [Message Analytics](/docs/engage/analytics/) to learn more.
