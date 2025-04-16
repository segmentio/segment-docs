---
title: Engage Introduction
plan: engage-foundations
redirect_from:
  - '/personas/'
---

Powered by real-time data, Twilio Engage is a customizable personalization platform with which you can build, enrich, and activate Audiences. 

## What can you do with Engage?

#### Create unified customer profiles
Engage uses [Segment Identity Resolution](/docs/unify/identity-resolution/) to take event data from across devices and channels and intelligently merge it into complete user- or account-level profiles. This gives your organization a single view of your customer base. To learn more, read the [Identity Resolution documentation](/docs/unify/identity-resolution/).

{% include components/reference-button.html href="https://segment.com/customers/frame-io/" icon="personas.svg" title="Personalizing customer interactions" description="Support teams rely on Segment's unified profiles to make real-time and informed decisions about customers when answering tickets or taking support calls. Read about how the support team at Frame.io reduced ticket response time by 80%." %}

#### Enrich profiles with new traits
Add detail to user profiles with new traits and use them to power personalized marketing campaigns. You can add new traits to your user or account profiles in Engage using:

- [**Computed Traits:**](/docs/engage/audiences/computed-traits/) Use the Engage drag-and-drop interface to build per-user (B2C) or per-account (B2B) metrics on user profiles (for example, “lifetime value” or “lead score”).
- [**SQL Traits:**](/docs/engage/audiences/sql-traits/) Run custom queries on your data warehouse using the Engage SQL editor, and import the results into Segment. With SQL Traits, you can pull rich, uncaptured user data back into Segment.
- [**Predictions**:](/docs/unify/traits/predictions/) Predict the likelihood that users will perform custom events tracked in Segment, like LTV, churn, and purchase.

#### Build Audiences
Create lists of users or accounts that match specific criteria. For example, after creating an `inactive accounts` audience that lists paid accounts with no logins in 60 days, you can push the audience to your analytics tools or send an SMS, email, or WhatsApp campaign with Engage Channels. Learn more about [Engage audiences](/docs/engage/audiences/). 

#### Sync audiences to downstream tools
Once you create your Computed Traits and Audiences, Engage sends them to your Segment Destinations in just a few clicks. You can use these Traits and Audiences to personalize messages across channels, optimize ad spend, and improve targeting. You can also use the [Profile API](/docs/unify/profile-api) to build in-app and onsite personalization. Learn more about [using Engage data](/docs/engage/using-engage-data/) and the [Profile API](/docs/unify/profile-api).

{% include components/reference-button.html href="https://segment.com/customers/drift/" icon="personas.svg" title="Personalizing marketing campaigns" description="Marketing teams use Engage to run real-time multi-channel marketing campaigns based off specific user attributes they've computed in Engage. Read about how Drift used Engage to increase prospect engagement by 150% in two months." %}