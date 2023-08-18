---
title: Unify Overview
plan: unify
redirect_from:
  - '/engage/profiles/'
---

Use Segment Unify, formerly known as Profiles, for a complete view of your customers.

With [Identity Resolution](#identity-resolution), track every interaction across the entire user journey to create unified, real-time customer identities. View user profiles in one place through the [Profile explorer](#profile-explorer) in the Segment app. Use the [Profile API](#profile-api) to programmatically query user profiles, traits, and events.

You can then use this interaction data with customer engagement tools, such as Engage, to deliver personalized, omnichannel experiences.

## Getting started

> info ""
> Unify is an add-on to Segment Connections Business Tier. It's also a required add-on for Twilio Engage.
> To use [Computed Traits](/docs/engage/audiences/computed-traits/) and [Audiences](/docs/engage/audiences/) with Unify, you must have access to Engage.

To set up and get data flowing through Unify, visit Segment's [Onboarding Guide](/docs/unify/quickstart).

## Identity Resolution

Set [Identity Resolution](/docs/unify/identity-resolution/identity-resolution-settings/#identity-resolution-rules) rules to take event data from across devices and channels and intelligently merge it into complete user- or account-level profiles. This enables you to understand customer behavior as it evolves in real-time across multiple touchpoints.

With Identity Resolution:

- Understand behaviors that lead a user from an anonymous window shopper to a loyal customer.
- Track customer activity across multiple devices and apps.
- Learn how a user interacts with your brand through different channels and departments.

Visit Segment's [Identity Resolution docs](/docs/unify/identity-resolution/) to learn more.

## Profile explorer

Use the Profile explorer to view all user data, including their event history, traits, and identifiers.

With the Profile explorer, you have a complete view of your customers.

- **Visualize unified profiles**: Explore profiles from a single location in Segment to understand who's using your product.
- **Ensure quality data**: Be sure that the data you receive is the data you expect.
- **Provide sales and support context**: Look up a user profile to understand where they are on their journey with your business or product.

> info ""
> If you're using Engage, use the Profile explorer to view audiences, traits, journey membership, and [subscription states](/docs/engage/user-subscriptions/) for email and phone numbers.

## Enrich profiles with traits
Add detail to user profiles with new traits and use them to power personalized marketing campaigns. You can add new traits to your user or account profiles in Unify using:

- [**Computed Traits:**](/docs/unify/traits/computed-traits/) Use the Unify drag-and-drop interface to build per-user (B2C) or per-account (B2B) metrics on user profiles (for example, “lifetime value” or “lead score”).
- [**SQL Traits:**](/docs/unify/traits/sql-traits/) Run custom queries on your data warehouse using the Unify SQL editor, and import the results into Segment. With SQL Traits, you can pull rich, uncaptured user data back into Segment.
- [**Predictive Traits (Beta)**:](/docs/unify/traits/predictive-traits/) Predict the likelihood that users will perform custom events tracked in Segment, like LTV, churn, and purchase.

## Profile API

Use Segment's Profile API to programmatically access all traits stored for a user. This includes the `external_ids`, `traits`, and `events` that make up a customer's journey with your product.

Use the Profile API to help your organization:

- Build in-app recommendations.
- Empower your sales and support teams with complete customer context.
- Create personalized marketing campaigns.
- Qualify leads faster.

Visit Segment's [Profile API doc](/docs/unify/profile-api/) for more information.

## Next steps: activate your profiles with Engage

For Engage users, after you set up your identity rules and have data flowing through Unify, you can activate profiles to deliver personalized engagement experiences. Visit the [Engage docs](/docs/engage/) to learn more.
