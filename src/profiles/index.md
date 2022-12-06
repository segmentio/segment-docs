---
title: Profiles Overview
plan: profiles
redirect_from:
  - '/engage/profiles/'
---

Use Segment Profiles for a complete view of your customers.

With [Identity Resolution](#identity-resolution), track every interaction across the entire user journey to create unified, real-time customer identities. View user profiles in one place through the [Profile Explorer](#profile-explorer) in the Segment app. Use the [Profile API](#profile-api) to programmatically query user profiles, traits, and events.

You can then use this interaction data with customer engagement tools, such as Engage, to deliver personalized, omnichannel experiences.

## Getting started

> info ""
> Profiles is an add-on to Segment Connections Business Tier. It's also a required add-on for Twilio Engage.
> To use [Computed Traits](/docs/engage/audiences/computed-traits/) and [Audiences](/docs/engage/audiences/) with profiles, you must have access to Engage.

To set up and get data flowing through Profiles, visit Segment's [Onboarding Guide](/docs/profiles/quickstart).

## Identity Resolution

Set [Identity Resolution](/docs/profiles/identity-resolution/identity-resolution-settings/#identity-resolution-rules) rules to take event data from across devices and channels and intelligently merge it into complete user- or account-level profiles. This enables you to understand customer behavior as it evolves in real-time across multiple touchpoints.

With Identity Resolution:

- Understand behaviors that lead a user from an anonymous window shopper to a loyal customer.
- Track customer activity across multiple devices and apps.
- Learn how a user interacts with your brand through different channels and departments.

Visit Segment's [Identity Resolution docs](/docs/profiles/identity-resolution/) to learn more.

## Profile Explorer

Use the Profile Explorer to view all user data, including their event history, traits, and identifiers.

With the Explorer, you have a complete view of your customers.

- **Visualize unified profiles**: Explore profiles from a single location in Segment to understand who's using your product.
- **Ensure quality data**: Be sure that the data you receive is the data you expect.
- **Provide sales and support context**: Look up a user profile to understand where they are on their journey with your business or product.

> info ""
> If you're using Engage, use the Profile Explorer to view audiences, traits, journey membership, and [subscription states](/docs/engage/user-subscriptions/) for email and phone numbers.

## Profile API

Use Segment's Profile API to programmatically access all traits stored for a user. This includes the `external_ids`, `traits`, and `events` that make up a customer's journey with your product.

Use the Profile API to help your organization:

- Build in-app recommendations.
- Empower your sales and support teams with complete customer context.
- Create personalized marketing campaigns.
- Qualify leads faster.

Visit Segment's [Profile API doc](/docs/profiles/profile-api/) for more information.

## Next steps: activate your profiles with Engage

For Engage users, after you set up your identity rules and have data flowing through Profiles, you can activate Profiles to deliver personalized engagement experiences. Visit the [Engage docs](/docs/engage/) to learn more.
