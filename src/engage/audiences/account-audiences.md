---
title: Account-level Audiences
layout: engage
engage: true
---



Account-level audiences are Personas audiences for businesses that sell to other businesses. They return the set of accounts which match a combination of account-level traits, user-level traits, and user events. You can sync these accounts and associated users with downstream destinations.

> info ""
> Account-level audiences are available to workspaces on a **Personas Advanced** plan. If you're an existing Segment customer on a Personas Advanced plan, contact your Customer Success Manager for access to Account-level audiences. If you're a new customer, or do not have a CSM, [request a demo](https://segment.com/demo/).

You can use account-level audiences to accomplish the following use cases:
- Identify a set of at-risk accounts based on associated users' log in patterns, and flag them in your customer service application
- Identify a set of trial accounts which would benefit from a paid plan based on their use, and flag those in your CRM application
- Create an email list of all users in accounts showing high adoption of a specific feature to aid in recruiting for user research

| Use case                                                                                                                              | Required features                                                                                                                                           | Detailed description                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create a list of accounts based on account-level traits, and/or the traits and behaviors of individual users associated with accounts | 1. Account-level audiences                                                                                                                                  | [Account-level audience conditions](#account-level-audience-conditions)                                                                                             |
| Create a list of accounts based on the collective behavior of all users associated with accounts                                      | 1. Account-level computed trait or SQL trait <br /> 2. Account-level audience (using computed trait as a condition)                                         | [Using account-level computed and SQL traits as account-level audience conditions](#use-account-level-computed-and-sql-traits-as-account-level-audience-conditions) |
| Create a list of users based on a combination of user-level traits and events, and account-level traits                               | 1. Account-level audience (using account-level trait as a condition) <br /> 2. User-level audience (using account-level audience membership as a condition) | [Using account-level traits in user-level audiences](#use-account-level-traits-in-user-level-audiences)                                                             |

## Enable account-level audiences

1. Contact [friends@segment.com](mailto:friends@segment.com) and provide your workspace ID to have account-level audiences enabled for your workspace. Navigate to **Settings > Workspace Settings > General Settings** to view your workspace ID.
2. Ensure that `group_id` is configured as an identifier in Personas Identity Resolution settings. For more information, see [Identity Resolution Settings](/docs/personas/identity-resolution/identity-resolution-settings/).
3. Instrument [group](/docs/connections/spec/group/) calls to send account information to Segment.

## Account-level audience conditions

A single account-level audience can incorporate any combination of the following condition types:
- User-level events (sent through [track](/docs/connections/spec/track/), [page](/docs/connections/spec/page/), and [screen](/docs/connections/spec/screen/) calls)
- User-level computed and SQL traits
- User-level audience membership
- User-level custom traits (set through an [identify](/docs/connections/spec/identify) call)
- Account-level computed traits and SQL traits
- Account-level audience membership
- Account-level custom traits (set through a [group](/docs/connections/spec/group) call)


Use this control to access account-level audience conditions:

![Use this control to access account level audience conditions](/docs/personas/images/new-audience-type.png)

The three types of user-level conditions are:
- **Any User** (default): Returns all accounts where *at least one user* associated with the account satisfies the specified condition
- **All users**: Returns all accounts where *all users* associated with the account satisfy the specified condition
- **None of the users**: Returns all accounts where *no users* associated with the account satisfy the specified condition

> info ""
> You can create conditions which operate on the set of events collectively triggered by all users associated with an account with [account-level computed and SQL traits](#account-level-computed-and-sql-traits).

## Account-level computed and SQL traits

Workspaces with access to account-level audiences can create account-level [computed](/docs/personas/computed-traits/) and [SQL](/docs/personas/sql-traits/) traits. All user-level computed trait types are supported (see [here](/docs/personas/computed-traits/#types-of-computed-traits) for a full list). Account-level computed traits operate on the set of events triggered by all users associated with a given account.

Use-cases for account-level computed traits include:
- Calculate the number of times users associated with an account logged in during the past month
- Calculate the average NPS survey score across all NPS surveys submitted by users associated with an account
- Identify the first marketing landing page viewed by any user associated with an account

> info ""
> Use SQL traits for complex calculations not supported by computed traits. For example, you would use SQL traits to calculate the number of unique users associated with an account who have logged in during the past month.

### Use account-level computed and SQL traits as account-level audience conditions

Once created, you can connect account-level computed and SQL traits to downstream destinations. You can also use them as conditions in account-level audiences, enabling you to build audiences based on the set of events triggered by all users associated with a given account.

For example, you can create an audience which selects all accounts where users associated with the account have collectively logged in fewer than 10 times in the past 30 days. To accomplish this, you would:

1. Create an account-level event counter computed trait, selecting the “Logged In” event and specifying a time window of the past 30 days.

    This computed trait will count all “Logged In” events collectively triggered by users associated with each account over the past 30 days, and append the resulting counts to each Account profile.
2. Create an account-level audience, containing a single condition using the new computed trait (for example, `logins_past_30_days<10`).

## Connect account-level audiences, computed traits, and SQL traits to destinations

When you connect an account-level audience or trait to a destination, you select which events to send to the destination when the audience or trait is calculated. Each destination supports a subset of the following events:

- **Group**: Segment emits one group call per account that matches the conditions. Audience names are included as a boolean [trait](/docs/connections/spec/group/#traits) (for example `audience_name:true`), while computed and SQL trait values are included directly (for example `trait_name:trait_value`). An additional group call is emitted when an account no longer matches audience conditions (`audience_name:false`).
- **Identify**: Segment emits Identify calls for each user who is associated with any accounts matching the conditions. Audience name is included as a boolean [trait](/docs/connections/spec/identify/#traits) (for example `audience_name:true`), while computed and SQL trait values are included directly (for example `trait_name:trait_value`). An additional identify call is emitted for each user who is associated with an account which no longer matches audiences conditions (`audience_name:false`).
- **Track**: Track calls are an alternative to Identify calls to send events for each user who is associated with any accounts that match the conditions. While `identify` typically updates a profile, a track event will record an event. The audience name is included as an event [property](/docs/connections/spec/track/#properties) (for example `audience_name:true`), and the default track name is `Audience Entered` or `Trait Computed` for audiences and computed traits, respectively. The event names can be customized. When a user associated with an account which no longer matches audiences conditions, an `Audience Exited` event is sent with an event property where `audience_name:false`.

> info ""
> Enable group calls when you want to update a destination's account records based on audience membership. Enable identify calls when you want to update a destination's user records based on audience membership.

## Use account-level traits in user-level audiences

Account-level audiences make it possible to target all users associated with accounts that match your audience criteria. However, you may need to target a subset of users based on the traits of their associated accounts.

Account-level traits are not available in the user-level audience builder. However, account-level audience membership is available in user-level audiences through the “Part of an audience” condition. This enables you to use account-level audiences as a “passthrough” for account-level traits.

For example, you may wish to create an audience which selects all admin-level users associated with accounts in the software industry (for example, `user.role=Admin AND account.industry=Software`). To accomplish this, you would:

1. Create an account-level audience containing a single account-level custom trait condition that references the account's industry(`industry=Software`).
2. Create a user-level audience with two conditions:
    1. A custom trait condition referencing the user's role (`role=Admin`)
    2. An audience membership condition referencing the account-level audience you just created (`software_industry_audience=True`)


## Known limitations of account-level audiences

- Unlike user-level audiences, which are [computed in real time](/docs/personas/audiences#realtime-compute-vs-batch), account-level audiences are computed on a batched basis. Segment computes account-level audiences roughly every hour, but it's important to note that compute times can fluctuate based on the load on the system.
- Account-level audiences do not respect the `context.groupId` property on track calls. If users are associated with multiple accounts (through multiple group calls), the entire collection of a user's events is considered when evaluating user-level event conditions (not just those events which are tagged with a matching `groupId`). This can lead to unexpected results where a user's events triggered in the context of one account lead to another account incorrectly matching an account-level audience.
- The identity breakdown report (displayed in the audience builder for user-level audiences) is not available for account-level audiences.

If you find that these limitations impede your ability to use account-level audiences, contact [friends@segment.com](mailto:friends@segment.com) with details about your use-case.
