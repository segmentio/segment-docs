---
title: Personas Space Set Up
---

{% include content/plan-grid.md name="personas-id" %}


## Step One: Create a New Dev Space

When starting with Personas, begin by creating a *Dev* space. This will be your sandbox instance of Personas to test new Identity settings, audiences and traits before applying the same changes to a *Prod* space that would immediately affect production data flowing to downstream destinations.

## Step Two: Configure Identity Settings

Before you connect any source to the Dev space, we recommend that you first start by reviewing and configuring your Identity settings, as changes to the Identity rules will only be applied to new events received following any updates. Read more on those settings [here](/docs/personas/identity-resolution/identity-resolution-settings/).

## Step Three: Set Up a Connection Policy

If you haven't already, we highly recommend labeling all your sources with *Dev* or *Prod* [environments](/docs/segment-app/iam/labels/). Once your sources have been labeled, navigate to the Connection Policy page in the Personas space settings. Here, you can enforce that only sources labeled *Dev* can be connected to your *Dev* Personas instance.

[](images/connection-policy.png)

> note ""
> **Note:** The Identity Resolution table can only be edited by workspace owners and users with the Identity Admin role.

## Step Four: Connect Sources and Create Test Audiences

Once your Connection Policy is in place, click on the Sources tab in space settings. Now you can connect a few Sources that will automatically begin to replay.

Once the Sources have finished replaying, check user profiles to ensure that profiles are merging as expected. This would also be an ideal time to create test audiences and confirm that these populate the expected number of users.

## Step Five: Connect Audiences to a Dev Instance of a Downstream Destination

Connect test audiences or traits to a dev instance of your downstream destination. Confirm that users are appearing as expected.

## Step Six: Apply Changes to Prod sources

Once everything looks good to go, create a new *Prod* space, following all the same steps above, and connect a live instance of your downstream destination to your *Prod* space.
