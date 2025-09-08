---
title: Unify Onboarding Guide
plan: unify
---

This guide walks you through the setup process for a simple Unify space, which you can use if your Segment implementation is simple. If your implementation is complex, you can use this to demonstrate and test Unify before working on a more complex configuration.

> success ""
> If you're using Engage, visit the [Engage Foundations Onboarding Guide](/docs/engage/quickstart) for additional steps to create audiences, connect to destinations, and more.

## Unify configuration requirements

To configure and use Unify, you need the following:

1. **A Segment account and Workspace.**
2. **Events flowing into Connections** from your digital properties where most of your valuable user behavior occurs.
3. **Unify or Engage identity admin access.** You must have edit access to identity resolution rules. You can check your permissions by navigating to [Access Management](https://app.segment.com/goto-my-workspace/settings/access-management){:target="_blank"} in your workspace settings. See the [Segment Access Management documentation](/docs/segment-app/iam/) for more details.

## Step 1: Create a new developer space

When you start working with Unify, begin by creating a "Developer" space. This is your experimental and test environment while you learn more about how Unify works. You can validate that identity resolution is working correctly in the Developer space and then apply those changes to your Production space once you're sure everything is working as expected.

This two-space method prevents you from making untested configuration changes that immediately affect production data.

To create a Engage space:

1. In your Segment workspace, click **Engage**.
2. Click **+ Create Space** and set up your space. Select **Dev space** to create a developer space.
3. Follow the instructions to set identity rules, connect sources, and sync Profiles to your warehouse. 

## Step 2: Invite teammates to your Segment space

You can grant teammates access to your Segment workspace so they can access and set up data as you need. To invite them to your Unify dev space: 

1. Navigate to **Settings > [Access Management](https://app.segment.com/goto-my-workspace/settings/access-management){:target="_blank"}**.
2. Click **+ Invite Team Member** and enter the email addresses of the teammates you want to invite to your workspace.
3. Choose the type of access and roles you want to assign them.
4. Click **Invite** to send the invitation. 

## Step 3: Connect production sources

Add production sources to your Unify space:

1. From your Segment workspace, navigate to **Unify > Unify settings**, and click **Profile sources**.
2. Click **+ Connect source** and choose one or two production sources from your Connections workspace. We recommend connecting your production website or App source as a starting point.

> info ""
> If the source you want to add doesn't appear on the list, then check if the source is enabled in the source's settings. 
> 
> If the source is enabled, verify that you have set up a connection policy which enforces that you can only add sources with specific labels to this space. Read more about Segment's connection policy in the [Space Setup](/docs/unify/identity-resolution/space-setup/#step-three-set-up-a-connection-policy) docs.

> success ""
> Although connecting a production source to a developer space may seem counter-intuitive, production sources contain rich user data required to build and validate user profiles.

Once you select sources, Segment starts a replay of one month of historical data from these sources into your Unify space. Segment does this step first so you have some user data to build your first profiles.

The replay usually takes several hours, but the duration will vary depending on how much data you have sent through these sources in the past month. When the replay finishes, you are notified in the Sources tab under Settings.

> warning ""
> Data replays start with the earliest (oldest) chronological events in the one month window, and finish with the most recent. Don't continue to the next step until all replays are marked complete. If you do, the data in your Unify data will be stale.

Once the Source(s) finish replaying, data from your connected Sources flows into Unify in near real time, just like it does for sources in your Segment workspace.


## Step 4: Check your profile data

Once the replay finishes, you can see the data replayed into Unify using the Profile explorer. The data should include information from multiple sources and multiple sessions, all resolved into a single profile per user.

Before you continue, check a few user profiles to make sure they show an accurate and recent snapshot of your users.

To test this, look at _your own_ user profile, and maybe some colleagues' profiles. Look in the Profile explorer for your Profile, and look at your event history, custom traits and identifiers. If these identifiers look correct across a few different profiles (and you can verify that they are all correct), then you're ready to create an audience.

If your user profiles look wrong, or you aren't confident users are being accurately defined and merged, stop here and troubleshoot. It's important to have accurate identity resolution before you continue. See the [detailed Identity Resolution documentation](/docs/unify/identity-resolution/) to better understand how it works, and why you may be running into problems. If you still need help [contact Segment](https://segment.com/help/contact/){:target="_blank"} for assistance.

> info ""
> Identify events triggered by a user don't appear in the Events tab of their profile. However, the traits from these events are still assigned to the profile. You can view them under the Traits tab.


## Step 5: Create your production space

Once you validate that your data is flowing through Unify, you're ready to create a Production space. We recommend that you repeat the same steps for [creating a developer space](#step-1-create-a-new-developer-space), with a focus on your production use cases and data sources.

> success ""
> If you're using Engage, view additional steps to complete your space set up in the [Engage Foundations Onboarding Guide](/docs/engage/quickstart).

> info ""
> You can rename the Segment space UI name, but can't modify the space slug. As a result, you can't change the URL of a space.
