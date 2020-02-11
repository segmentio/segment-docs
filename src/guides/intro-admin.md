---
title: Segment for Workspace Administrators
published: false
---


## What is Segment?

> info ""
> If you read the [detailed explanation of Segment](/docs/guides/) on the previous page, you can skip ahead!

Segment is a system for sending messages from your websites, mobile apps, and servers. These messages contain data about events on, or users of those systems, and these messages can sent on to other tools, and gathered together in a warehouse for later analysis. Segment can also bring in information about your users from external systems, such as helpdesks or CRM systems, and collate that information to help you analyze your data, build audiences of users, and personalize your users' experiences.

## What's a Workspace?

{% include content/whats-a-workspace.md %}


## The Workspace Administrator's Role

You don't have to be a developer to be a Workspace administrator for an organization, and this guide only covers tasks specifically related to managing a Workspace in the [Segment App](/docs/segment-app/).

However, many Workspace admins are also involved in the Segment implementation process as there are usually some tasks that must be performed in the Workspace to complete an implementation. If you think you might be developing a Segment implementation or helping out other developers, it's a good idea to [read the Segment developer intro](/docs/guides/intro-impl/)!

> note ""
> **Note**: Workspace roles are only available to Business Tier customers. If you're on a Developer or Team plan, all workspace members are granted workspace administrator access.

In addition, Workspace administrators set up and maintain the organization's [workspace settings](), which include:
- Billing information and billing contacts
- Incident contacts - the people who get notified in the event of an outage or incident
- the Workspace name and slug - the display name and namespace of the workspace in the Segment system

> info ""
> Changing the workspace name and slug do not have any effect on any sources or destinations already set up and configured. (These use a combination of an internal ID, and `writeKey` to connect.)

Workspace administrators might also maintain:
- The organization authentication settings: login settings, multi-factor authentication enforcement, Identity provider (IDP) settings (including SAML and OAuth), and other related settings.
- Access Management settings - Object-based access management settings, Segment workspace "environments" and labels, roles and groups, and the general permissions model.
- environments and labels
- Security settings


## Tasks in Connections

set up destinations
troubleshooting, error codes, tester, event delivery
system health
warehouses, sync, replay

## Premium feature tasks

personas spaces, workspaces
protocols setup and maintenance
Privacy monitoring
