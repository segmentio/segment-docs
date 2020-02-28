---
title: "Example Tracking Plans"
---

Here at Segment we have made our own tracking plans available for download to help get you started planning out and documenting your own tracking plan.

## Tracking Plan Template

This Tracking Plan template includes all of our specs including [eCommerce](/docs/connections/spec/ecommerce/v2/), [B2B SaaS](/docs/connections/spec/mobile/), [Mobile](/docs/connections/spec/mobile/) and [Video](/docs/connections/spec/video/).

[View the Plan in Google Sheets](https://docs.google.com/spreadsheets/d/1ZHGfNrCxBQbEyevmVxNoU0DGjb8cJMro1iwIRZLWjPw/view) and make a copy to edit the events.

## Example: Segment Tracking Outline

Our core user lifecycle is:

1.  User Signed Up
2.  Source Created
3.  Source Data Sent
4.  Destination Enabled
5.  Subscription Started
6.  Subscription Upgraded
7.  Subscription Downgraded

### User Signed Up

With sign-ups we want to be able to tell the difference between paid, organic, and invitation sign-ups. We use automatically recorded utm parameters to flag paid ones, and then a `type` to mark organic and invitation signups. In the future, we might also track referral program enrollments, and so on.

```js
analytics.track('User Signed Up',{
    userLogin:'reinpk',
    type:'invite',
    organizationId:'aef6d5f6e'});
```

This is currently recorded with the legacy name 'Signup', but we'd like to switch this to 'User Signed Up'.

### Source Created

With source creation we want to be able to differentiate sources created for a workspace vs. for a user account.

```js
analytics.track('Source Created',{
    ownerId:'aef6d5f6e',
    sourceId:'b6c6281',
    sourceSlug:'segment',
    sourceUrl: 'https://segment.com'});
```

This is currently recorded with the legacy name `Created a Source`, but we'd like to migrate to `Source Created`.

### Source Data Sent

The tricky thing with this event is that it's unique per source, but everything else is tracked per user. So we'll want to record a "Source Data Sent" event: once a day, for each user, for every source they're connected with that had data sent. So a user might be an owner/collaborator on 3 sources that sent data today, in which case we'll send 3 "Source Data Sent" events, one for each of those sources. We still want to differentiate workspace stuff from user account stuff.

```js
analytics.track(userId,'Source Data Sent',{// source
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

### Destination Enabled

Here we're interested in differentiating workspace/user account as usual, but also what their current plan tier is vs. destination tier.

```js
analytics.track('Destination Enabled',{
    ownerId:'aef6d5f6e',
    ownerTier:4,
    destinationSlug:'google-analytics',
    destinationTier:1});
```

### Subscription Started

With subscriptions again we want to be able to differentiate between subscriptions for a workspace vs. for a user account.

```js
analytics.track('Subscription Started',{
    ownerId:'aef6d5f6e',
    ownerLogin:'segment',
    ownerEmail:'finance@segment.com',
    planName:'Startup',
    planId:'startup-$79-1-month',});
```

This event should only be triggered when we will absolutely start billing them: credit card, plan, everything is set up.

### Subscription Upgraded

Again differentiating workspace/user account is the critical piece.

```js
analytics.track('Subscription Upgraded',{
    ownerId:'aef6d5f6e',
    ownerLogin:'segment',
    ownerEmail:'finance@segment.com',
    previousPlanName:'Startup',
    previousPlanId:'startup-$79-1-month',
    planName:'Growth',
    planId:'growth-$349-1-month'});
```

### Subscription Downgraded

Again differentiating workspace/user account is the critical piece.

```js
analytics.track('Subscription Downgraded',{
    ownerId:'aef6d5f6e',
    ownerLogin:'segment',
    ownerEmail:'finance@segment.com',
    previousPlanName:'Startup',
    previousPlanId:'startup-$79-1-month',
    planName:'Developer',
    planId:'developer-$0-1-month'});
```

Other Events

There are other events that are also interesting for non-core funnel analysis:

- Organization Created
- User Invited
- Destination Edited
- Destination Disabled

### Organization Created

```js
analytics.track('Organization Created',{
    organizationId:'fdbe51276dc',
    organizationLogin:'segment',
    organizationEmail:'finance@segment.com'});
```

### User Invited

This event can happen in multiple places, so we need some differentiation between workspace creation and workspace settings, source settings or future referral flows.

```js
analytics.track('User Invited',{
    inviteeEmail:'raphael@segment.com',
    inviteType:'organization',// source, organization, referral
    pageName:'New Organization',
    sourceId:null,
    sourceSlug:null,
    organizationId:'fdbe51276dc',
    organizationLogin:'segment'});
```

### Destination Edited

Here we're interested in differentiating workspace/user account as usual, but also what their current plan tier is vs. destination tier.

```js
analytics.track('Destination Edited',{
    ownerId:'aef6d5f6e',
    ownerTier:4,
    destinationSlug:'google-analytics',
    destinationTier:1,
    destinationEnabled:true});
```

### Destination Disabled

Here we're interested in differentiating workspace/user account as usual, but also what their current plan tier is vs. destination tier.

```js
analytics.track('Destination Disabled',{
    ownerId:'aef6d5f6e',
    ownerTier:4,
    destinationSlug:'google-analytics',
    destinationTier:1});
```
