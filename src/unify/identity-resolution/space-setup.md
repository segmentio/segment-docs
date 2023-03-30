---
title: Space Setup
plan: unify
redirect_from:
  - "/personas/identity-resolution/personas-space-setup"
---
## Step one: Create a new Dev space

When starting with Unify, begin by creating a *Dev* space. This will be your sandbox instance of Unify to test new Identity settings, audiences, and traits before applying the same changes to a *Prod* space that would immediately affect production data flowing to downstream destinations.

## Step two: Configure Identity settings

Before you connect any source to the Dev space, Segment recommends that you first start by reviewing and configuring your Identity settings, as changes to the Identity rules will only be applied to new events received following any updates. Read more on those settings [here](/docs/unify/identity-resolution/identity-resolution-settings/).

## Step three: Set up a connection policy

If you haven't already, Segment highly recommends labeling all your sources with *Dev* or *Prod* [environments](/docs/segment-app/iam/labels/). Once your sources have been labeled, visit the **Connection Policy** page by navigating to **Unify > Unify settings > Space management**. Here, you can enforce that only sources labeled *Dev* can be connected to your *Dev* Unify instance.

[](images/connection-policy.png)

> note ""
> **Note:** The Identity Resolution table can only be edited by workspace owners and users with the Identity Admin role.

## Step four: Connect sources and create test audiences

Once your connection policy is in place, select the **Profile sources** tab in **Unify settings**. Now you can connect a few sources that will automatically begin to replay.

Once the sources have finished replaying, check user profiles to ensure that profiles are merging as expected. This would also be an ideal time to create test audiences and confirm that these populate the expected number of users.

## Step five: Connect audiences to a Dev instance of a downstream destination

Connect test audiences or traits to a dev instance of your downstream destination. Confirm that users are appearing as expected.

## Step six: Apply changes to Prod sources

Once everything looks good to go, create a new *Prod* space, following all the same steps above, and connect a live instance of your downstream destination to your *Prod* space.
