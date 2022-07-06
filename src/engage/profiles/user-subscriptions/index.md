---
title: User Subscriptions Overview
layout: engage
engage: true
---

Segment associates [subscription states](/docs/engage/profiles/user-subscriptions/set-user-subscriptions/) with each email address and phone number in your audiences. Subscription states indicate the level of consent end users have given to receive your marketing campaigns.

Knowledge of subscription states will help you understand which users can and cannot receive your campaigns. This page provides an overview of user subscriptions.

## The Four Subscription states

Email addresses and phone numbers in your audience have one of the four following user subscription states:

- `subscribed`; users who opted in to your marketing campaigns
- `unsubscribed`; users who unsubscribed from your marketing campaigns
- `did-not-subscribe`; users who are neither subscribed nor unsubscribed
- **No subscription status**; users who never gave Segment the email or phone number in your audience

> warning "User Consent"
> You can only send Engage campaigns to users with a `subscribed` status.

To learn how Segment determines user subscription states, read the [User Subscription State documentation](/docs/engage/profiles/user-subscriptions/subscription-states/).

## Setting User Subscriptions

You can set user subscriptions manually when you upload contacts [using Engage’s CSV uploader](/docs/engage/profiles/csv-upload/). You can also use a CSV upload to correct contacts with outdated subscription states.

Most user subscriptions update programmatically, using Segment APIs. The Public API and the Identify call handle subscription state changes made when users sign up to or change their subscription status to your marketing materials with online forms or within notification centers.

View the [Setting User Subscriptions](/docs/engage/profiles/user-subscriptions/set-user-subscriptions/) page to learn more about user subscription changes.
