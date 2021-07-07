---
title: Account Management
---

## What is the difference between an account and a workspace?

An account is associated to a single user, and is attached to the email address you sign up with. A workspace houses all of your sources, and can have one or several user accounts as owners and/or read-only members.

## What if I change my domain name?

You don't need to do anything if you change your domain – for example, if you change your domain from www.mysite.com to www.mysuperawesomesite.com. If you want the new domain to be used as the same Segment source, just make sure you use the same Segment write key that you used with the old domain.

You may claim ownership of your domain for the purposes of Single Sign On login association, but it currently has no bearing on data collection.

## I'm on a Legacy API plan, why can't I add the integration I want?

Only users on our legacy API based plans will run into integration limits. Some of our older plans placed limitations on the integrations you could use. If you would like to add an integration that is not available on your current plan  move to a new Team plan where all integrations are included along with several other additional features.

## Will deleting my account cancel my subscription?

No, deleting your account will only stop you from accessing workspaces through your login. The workspace is where the subscription is managed, and it will not be deleted. Data will still flow into Segment and your Destinations and you will still be charged if you delete your account but don't delete your workspace.

## How do I delete my workspace entirely?

To delete your workspace, go your [Workspace's Settings](https://app.segment.com/goto-my-workspace/settings/basic), click the "General" tab, and click **Delete Workspace**.

You should also change your write keys for each source and remove all Segment snippets from your codebase.

## Can I recover a source or workspace after I delete it?

No, once a source or workspace is deleted it cannot be recovered.

## Can I move a source from one workspace to another?

Segment doesn't have the ability to "merge" workspaces, however you can achieve the same effect by moving your existing sources to a single workspace. You might do this to unify all of your data across your team(s) to better track your customer data as a complete picture.

You can move sources between workspaces going to the Settings for the source, clicking Transfer to Workspace in the left navigation. Choose the workspace you want to move the source to, and click **Transfer Source**.

> info ""
> **Note**: The person who transfers the source must be a [workspace owner](/docs/segment-app/iam/) for both the origin and recipient workspaces, otherwise the recipient workspace won't appear in the dropdown list.

![](images/transfer-source.png)

When you transfer the source, all destination configurations are removed. Be sure to set up the destinations you want after the transfer.
