---
title: Set User Subscriptions
layout: engage
engage: true
---

Segment associates a [user subscription state](/docs/engage/profiles/user-subscriptions/subscription-states/) with each email address and phone number in your Engage audiences. Subscription states give you insight into the level of consent a user has given you to receive your Engage campaigns.

You can set a user’s subscription state using a CSV file or, programmatically, using Segment’s APIs. On this page, you’ll learn how and when to use both processes.

## Setting user subscriptions with a CSV file upload

Setting user subscriptions by uploading a CSV file proves useful when you’re importing batch contacts to Segment for the first time or when you need to change a specific user’s subscription status.

For example, you may want to add contacts to Segment using an audience list sourced from a third-party tool, or you may have gathered a large number of contacts from an in-person event.

### Subscription state CSV fields

To learn how to upload a CSV file to Segment, view the [Engage CSV Uploader page](/docs/engage/profiles/csv-upload/).

To change the subscription status of an email or phone number with a CSV file, include at least one of the following user subscription columns next to the contact column:

- `email_subscription_status`
- `sms_subscription_status`

These columns take the following values:

- `subscribed`; for users who opted in to your marketing campaigns
- `unsubscribed`; for users who have unsubscribed from your marketing campaigns
- `did-not-subscribe`; for users who have neither subscribed nor unsubscribed from your marketing campaigns
- Blank; for email addresses or phone numbers that Segment collected without the user explicitly providing them

Refer to the [User Subscription States documentation](/docs/engage/profiles/user-subscriptions/subscription-states/) for detailed explanations of each subscription state.

<!--

### Overriding a subscription state with a CSV upload

Because contact information from a CSV upload takes precedence over any existing contact vector details, you can use a CSV file upload to make manual changes to a user’s subscription status.

When you upload a CSV file, Segment creates new profiles for users not already in your audience. If the user already exists within an audience, Segment updates the contact’s profile to match the contact vector information provided within the CSV.

For example, a user might reach out to you after accidentally unsubscribing to your campaigns. If the user asks you to resubscribe them, you can upload a CSV file with the user’s contact vector next to a value of `subscribed` in the `email_subscription_status` field.  The subscription status then updates to subscribed.

> info "Resubscribing a user"
> As a best practice, encourage users to resubscribe themselves. Refer to [Troubleshooting Subscription States](/docs/engage/profiles/user-subscriptions/subscription-states/#troubleshooting-subscription-states) for case-by-case solutions to resolving subscription state issues.

-->

## Manage user subscriptions with Segment APIs

With Segment's APIs, you can manage user subscriptions programmatically on a real-time basis. Use the APIs for ongoing subscription status updates, like when users subscribe to your marketing campaigns on a website form or modify their subscription from within a notification center.

### Choosing between the Identify call and the Public API

To update Engage user subscriptions with Segment's APIs, first choose between [the Identify call](/docs/connections/spec/identify/), for non-critical subscription updates, or the [Public API](https://api.segmentapis.com/docs/spaces/#replace-messaging-subscriptions-in-spaces){:target="_blank"}, for critical updates that require immediate confirmation, like unsubscribes.

When you use the Identify call, Segment replies with a standard HTTP `200 OK` status response code if it successfully received the request. Because the Identify call updates user traits asynchronously, though, the `200 OK` code indicates that Segment has received, but not yet processed, the request. As a result, use the Identify call for non-critical subscription updates, like form signups on your website or adding a subscription from within the user's notification center.

When you update user subscriptions with Segment's Public API, however, you'll get an immediate response that confirms that Segment both received and processed the request. Use the Public API, then, for unsubscribes, so users immediately find out if their subscription updated.

### Format the Identify call payload

For Segment to process the subscription status request, your Identify call payload must include at least one object that contains an email address or phone number, its subscription type, and its subscription status.

The following example payload shows an Identify call with a `context` object, which you'll add to the Identify call to update user subscriptions. The `context` object contains a `messaging_subscriptions` array with two objects that update both SMS and email subscription statuses:

```json
{
  "userId": "12aBCDeFg4hIjKlM5OPq67RS8Tu",
  "context": {
    "messaging_subscriptions": [
      {
        "key": "(123) 555-5555",
        "type": "SMS",
        "status": “SUBSCRIBED” | “UNSUBSCRIBED”| “DID_NOT_SUBSCRIBE”
      },
      {
        "key": "test@example.com",
        "type": "EMAIL",
        "status": “SUBSCRIBED” | “UNSUBSCRIBED”| “DID_NOT_SUBSCRIBE”
      }
    ],
    "externalIds": [
      {
        "id": "(123) 555-5555",
        "type": "phone",
        "collection": "users",
        "encoding": "none"
      }
    ],
    "traits": {
       "email": "test@example.com"
    }
  },
  "integrations": {},
  "traits": {}
}
```

For successful requests, Segment instantly updates subscription states in your workspace. You can then display successful updates or error messages with users in your notification center.
