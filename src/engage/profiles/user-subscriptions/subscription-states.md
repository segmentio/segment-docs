---
title: User Subscription States
layout: engage
engage: true
---

Customer profiles in your Segment audiences contain **contact vectors**. A contact vector is a piece of unique, specific contact information associated with a customer, like the customer's email address or phone number.

Segment associates one of four **user subscription states** with each contact vector in a customer profile. These subscription states indicate the level of consent customers give you to send them your marketing materials.

A customer profile, then, may have contact vectors with different subscription states. For example, a customer may consent to receive email campaigns but not SMS campaigns. Subscription states, then, describe permissions at the contact vector level, not at the customer level.

Understanding the four user subscription states helps you improve campaign deliverability and comply with sending guidelines and legislation. This page explains the four subscription states and how each impacts your sending ability.

## Subscription states overview

The following table displays the four subscription states:

| subscription states    | description                                                                                                 | example                                                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `subscribed`             | A user has given you their contact information and consented to receive marketing campaigns.                | Users that have signed up for a weekly newsletter                                                                                 |
| `unsubscribed`           | A user has given you their contact information but doesn't want to receive campaigns.                       | Users that subscribed, then unsubscribed, from a weekly newsletter                                                                |
| `did-not-subscribe`      | A user gave you their contact information but made no decision about receiving marketing campaigns.         | A user provided their email address or phone number in an online transaction, but didn't sign up to receive your weekly newsletter. |
| No subscription status | A user did not give you their contact information and made no decision about receiving marketing campaigns. | Segment collected an email or phone number through identity resolution. No user actively provided the email or phone number.               |

> warning "Sending Permissions"
> You can only send Engage campaigns to contacts with a subscribed user state.

## Understanding subscription states

You can gain insight into your audience profiles by learning how and why each subscription state is associated with a user’s profile.  Below, you’ll find the four states described in detail, along with common scenarios that produce those states.

### Subscribed

A **subscribed** user has, at some point, given you explicit permission to send them your marketing materials.

Subscribed users have intentionally requested to receive your marketing materials and have taken voluntary action to confirm that choice. You may have received this consent from a number of sources, including the following:

- A user who opted in to receive marketing campaigns during online checkout
- A user who signed up for your marketing campaigns on your website’s signup form
- A user who signed up for marketing campaigns at an in-person event, like a conference

**You may only send Engage campaigns to subscribed users. User subscriptions help you understand a user's preference to receive or not receive your marketing content.**

It's your responsibility to ensure that Segment correctly reflects your users' subscription choices. Failure to do so may put you in violation of legislation like [CAN-SPAM](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business){:target="_blank"}, [TCPA](https://www.twilio.com/docs/glossary/what-is-telephone-consumer-protection-act-tcpa){:target="_blank"}, or [GDPR](https://gdpr-info.eu/){:target="_blank"}.

### Unsubscribed

An **unsubscribed** user has intentionally opted out of receiving your marketing materials. You cannot send Engage campaigns to unsubscribed users.

Users commonly unsubscribe in the following ways:

- By clicking an unsubscribe link in an email campaign
- By replying with STOP to an SMS campaign
- By contacting you in writing to request that you unsubscribe them

You must include an unsubscribe option in all Engage email and SMS campaigns.

### Did not subscribe

Users with the `did-not-subscribe` state associated with their email address or phone number gave you their contact information without explicitly agreeing to receive your marketing materials.

The following scenarios often lead to an email or phone number with the `did-not-subscribe` subscription state:

- A user provides their email or phone number during an online transaction but doesn’t opt in to your marketing materials.
- The user’s email address was obtained from a support request.

Emails or phone numbers with a `did-not-subscribe` status won't receive your marketing campaigns.

### No subscription status

Profiles with **no subscription status**, or a blank status, indicate that Segment has created a profile for the user, but that the user never actually provided their contact information. Some situations that lead to the `no subscription status` state include the following:

- Publicly available email addresses or phone numbers
- Email addresses or phone numbers you acquired through other audience lists
- Segment collected the email address or phone number through standard platform tracking methods.

Some contacts within your Segment space may fall into the no subscription status category. [Identity resolution](/docs/personas/identity-resolution/), for example, may result in a user profile created from connecting an email address with an anonymous ID. In this case, the profile would exist within your audience despite the fact that the user never had the option to subscribe or unsubscribe.


## Setting user subscriptions

You can set subscription states by either CSV file upload or, programmatically, with the [Public API](https://api.segmentapis.com/docs/){:target="_blank"}.

Uploading contacts with a CSV file works best for initial batches of contacts you’d like to bring into Engage. Syncing programmatically with the Public API is best suited for real-time and ongoing subscription maintenance, like when a user signs up for a form on your site or unsubscribes from your marketing campaigns within their notification center or account settings.

To learn more about both options, reference the Engage documentation on using the [CSV uploader](/docs/engage/profiles/csv-upload/) and setting user subscriptions.

### Troubleshooting subscription states

On occasion, a user’s subscription state may not be up-to-date. For example, a user may have unsuccessfully attempted to unsubscribe from your marketing campaigns.

The Public API will resolve most subscribe and unsubscribe requests in real time. In some circumstances, however, you’ll need to take action to update a user’s subscription state.  The following table lists some situations in which you may find a manual update useful:

| issue                                               | cause                                                               | resolution                                                                                                                                                  |
| --------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unsubscribed user still getting marketing campaigns | Potential API call failure when updating the subscription state     | Ask the user to attempt to unsubscribe again; [upload a CSV file](/docs/engage/profiles/csv-upload/) with the user’s profile and a state of `unsubscribed`. |
| User no longer receives desired email campaigns     | User may have accidentally clicked unsubscribe on an email campaign | The user must resubscribe to your campaigns, or you can upload a CSV file with the contact and their corrected state.                                       |
| User no longer receives desired SMS campaigns       | User may have replied STOP to an SMS campaign                       | You cannot change the state on your own; the user must send START, YES, or UNSTOP to the original campaign number from their own device.                    |

[Reach out to support](/docs/engage/contact/) with questions you may have about resolving a user’s subscription state.
