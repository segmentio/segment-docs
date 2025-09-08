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

When you start working with Unify, begin by creating a "Developer" space. This is your experimental and test environment while you learn more about how Unify works. 

Here, you can validate that identity resolution is working correctly and then apply those changes to your Production space once you're sure everything is working as expected. This two-space method prevents you from making untested configuration changes that immediately affect production data.

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

If a source doesn't appear in the list:
- Check if it is enabled in the source's settings. 
- If the source is enabled, verify that you have set up a connection policy which only allows you to add sources with labels specific to the space. See the [Segment's connection policy](/docs/unify/identity-resolution/space-setup/#step-three-set-up-a-connection-policy) docs for details.

> success ""
> Connecting a production source to a developer space may seem counter-intuitive, but production sources contain rich user data required to build and validate user profiles.

Once you select sources, Segment replays one month of historical data from these sources into your Unify space. This ensures that there is user data available for you to build initial profiles. 

- The replay usually takes several hours, depending on how much data you have sent through these sources in the past month. 
- Data replays start with the earliest (oldest) chronological events in the one month window, and finish with the most recent.
- When the replay finishes, you are notified in the Sources tab under Settings.

> warning ""
> **Don't** move on to the next step until **all** replays are marked complete. Moving forward early can result in stale data.

Once the source(s) finish replaying, data from your connected sources flows into Unify in near real time, just as it does for sources in your Segment workspace.


## Step 4: Check your profile data

Once the replay is complete, Unify displays the data in the Profile explorer. Profiles should include information from multiple sources and multiple sessions, all resolved into a single profile per user.

### Valiate your profile data 
Before you continue, check a few user profiles to make sure they show an accurate and recent snapshot of your users. Take a look at your own user profile and, maybe, some colleagues' profiles. 

1. Go to the Profile explorer.
2. Review your event history, custom traits, and identifiers.

If these identifiers look correct across a few different profile, you're ready to create an audience.

If your user profiles look wrong, or you aren't confident users are being accurately defined and merged, stop here and troubleshoot. It's important to have accurate identity resolution before you continue. See the [detailed Identity Resolution documentation](/docs/unify/identity-resolution/) to better understand how it works and why you may be running into problems. If you still need help [contact Segment](https://segment.com/help/contact/){:target="_blank"} for assistance.

> info ""
> Identify events triggered by a user don't appear in the Events tab of their profile. However, the traits from these events are still assigned to the profile. You can view them under the Traits tab.


## Step 5: Create your production space

Once you validate that your data is flowing through Unify, you're ready to create a Production space. 

Follow the same steps used to [create a developer space](#step-1-create-a-new-developer-space), but apply them to your production use cases and data sources.

- If you're using Engage, see the [Engage Foundations Onboarding Guide](/docs/engage/quickstart) for additional setup steps.

> warning "The Segment workspace slug and URL can't be renamed"
> You can rename the Segment workspace UI name, but can't modify the space slug. As a result, you can't change the URL of a space.
