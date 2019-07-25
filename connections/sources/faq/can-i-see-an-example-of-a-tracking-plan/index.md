---
title: "Can I see an example of a tracking plan?"
---

Here at Segment we have made our own tracking plans available for download to help get you started planning out and documenting your own tracking plan.

**Basic Tracking Plan**

This is a simplified version of our tracking plan to help get you started. We strongly recommend starting with a plan like this before digging into more complicated tracking.

[View in Google Sheets](https://docs.google.com/spreadsheets/d/111LLWxdf_zQE5a_AajKeB8WpCgFaWKEo-sGMc95HYq0/edit?usp=sharing&__hstc=222691652.f2c5ed50a3a9703ac3be5283918044ad.1436399176206.1437082421955.1437085712408.17&__hssc=222691652.23.1437085712408&__hsfp=2203243415)

**Full Tracking Plan**

This plan is the actual plan we use to organize all of our own Segment tracking. Some of the event properties have been trimmed to keep things clean, but everything is here.

[View in Google Sheets](https://docs.google.com/spreadsheets/d/1CCx7VU1ioHdWsRmMjywOKhoioh_ObR_V6Cp2RZmbA1Y/edit?usp=sharing&__hstc=222691652.f2c5ed50a3a9703ac3be5283918044ad.1436399176206.1437082421955.1437085712408.17&__hssc=222691652.23.1437085712408&__hsfp=2203243415)

**Segment Tracking Outline**

**User Tracking**

CORE LIFECYCLE

Our core user lifecycle is:

1.  Signed Up
2.  Created Source
3.  Sent Source Data
4.  Enabled Destination
5.  Started Subscription
6.  Upgraded Subscription
7.  Downgraded Subscription

SIGNED UP

With signups we want to be able to differentiate paid signups, organic signups, and invitation signups. We’ll use automatically recorded utm parameters to analyze paid, and then a type to differentiate organic and invitation signups (and in the future maybe referral program stuff, etc.)

```
analytics.track('Signed Up',{
    userLogin:'reinpk',
    type:'invite',
    organizationId:'aef6d5f6e'});
```

This is currently recorded with the legacy name ‘Signup’, but we’d like to migrate to ‘Signed Up’.

CREATED SOURCE

With source creation we want to be able to differentiate sources created for a workspace vs. for a user account.

```
analytics.track('Created Source',{
    ownerId:'aef6d5f6e',
    sourceId:'b6c6281',
    sourceSlug:'segment',
    sourceUrl: 'https://segment.com'});
```

This is currently recorded with the legacy name `Created a Source`, but we’d like to migrate to `Created Source`.

SENT SOURCE DATA

The tricky thing with this event is that it’s unique per source, but everything else is tracked per user. So we’ll want to record a “Sent Source Data” event: once a day, for each user, for every source they’re connected with that had data sent. So a user might be an owner/collaborator on 3 sources that sent data today, in which case we’ll send 3 “Sent Source Data” events, one for each of those sources. We still want to differentiate workspace stuff from user account stuff.

```
analytics.track(userId,'Sent Source Data',{// source
    sourceId:'bce5fad577',
    sourceSlug:'rein.pk',
    sourceCollaborators:1,// owner
    ownerId:'aef6d5f6e',
    ownerOwners:12,// usage
    callsMonthly:134811,
    callsWeekly:22,// methods
    methodIdentify:14811,
    methodAlias:1320,
    methodTrack:2861,
    methodPage:115819,
    methodScreen:0,
    methodGroup:0,// libraries
    libraryIos:13289,
    libraryAnalyticsjs:121582,// destination
    destinations:3,
    destinationMixpanel:true,
    destinationGoogleAnalytics:true,
    destinationVero:true});
```

ENABLED DESTINATION

Here we’re interested in differentiating workspace/user account as usual, but also what their current plan tier is vs. destination tier.

```
analytics.track('Enabled destination',{
    ownerId:'aef6d5f6e',
    ownerTier:4,
    destinationSlug:'google-analytics',
    destinationTier:1});
```

STARTED SUBSCRIPTION

With subscriptions again we want to be able to differentiate between subscriptions for a workspace vs. for a user account.

```
analytics.track('Started Subscription',{
    ownerId:'aef6d5f6e',
    ownerLogin:'segment',
    ownerEmail:'finance@segment.com',
    planName:'Startup',
    planId:'startup-$79-1-month',});
```

This event should only be triggered when we will absolutely start billing them: credit card, plan, everything is set up.

UPGRADED SUBSCRIPTION

Again differentiating workspace/user account is the critical piece.

```
analytics.track('Upgraded Subscription',{
    ownerId:'aef6d5f6e',
    ownerLogin:'segment',
    ownerEmail:'finance@segment.com',
    previousPlanName:'Startup',
    previousPlanId:'startup-$79-1-month',
    planName:'Growth',
    planId:'growth-$349-1-month'});
```

DOWNGRADED SUBSCRIPTION

Again differentiating workspace/user account is the critical piece.

```
analytics.track('Downgraded Subscription',{
    ownerId:'aef6d5f6e',
    ownerLogin:'segment',
    ownerEmail:'finance@segment.com',
    previousPlanName:'Startup',
    previousPlanId:'startup-$79-1-month',
    planName:'Developer',
    planId:'developer-$0-1-month'});
```

Other Events

There are other events that are also interesting for non-core-funnel analysis:

*   Created Organization
*   Invited User
*   Edited destination
*   Disabled destination
*   Debugger Call Expanded

CREATED ORGANIZATION

```
analytics.track('Created an Organization',{
    organizationId:'fdbe51276dc',
    organizationLogin:'segment',
    organizationEmail:'finance@segment.com'});
```

This is currently being recorded as `Created an Organization`, ideally we’d drop the `an`.

INVITED USER

This event can happen in multiple places, so we need some differentiation between workspace creation and workspace settings, source settings or future referral flows.

```
analytics.track('Invited User',{
    inviteeEmail:'raphael@segment.com',
    inviteType:'organization',// source, organization, referral
    pageName:'New Organization',
    sourceId:null,
    sourceSlug:null,
    organizationId:'fdbe51276dc',
    organizationLogin:'segment'});
```

VIEWED DESTINATION

Here we’re interested in differentiating workspace/user account as usual, but also what their current plan tier is vs. destination tier.

```
analytics.track('Viewed Destination',{
    ownerId:'aef6d5f6e',
    ownerTier:4,
    destinationSlug:'google-analytics',
    destinationTier:1,
    destinationEnabled:true});
```

DISABLED DESTINATION

Here we’re interested in differentiating workspace/user account as usual, but also what their current plan tier is vs. destination tier.

```
analytics.track('Disabled Destination',{
    ownerId:'aef6d5f6e',
    ownerTier:4,
    destinationSlug:'google-analytics',
    destinationTier:1});
```
