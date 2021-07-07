---
title: Segment for workspace administrators
---

If your job is to set up or maintain a Segment Workspace for your organization, or assist other people using the Segment Web App, this guide is for you. If you're more interested in Segment implementation details, see the [developer intro guide](/docs/guides/intro-impl/).

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
> **Note**: Workspace roles are only available to Business Tier customers. If you're on a Free or Team plan, all workspace members are granted workspace administrator access.

In addition, Workspace administrators set up and maintain the organization's [workspace settings](https://app.segment.com/goto-my-workspace/settings/), which include:
- Billing information and billing contacts
- Incident contacts - the people who get notified in the event of an outage or incident
- the Workspace name and slug - the display name and namespace of the workspace in the Segment system

> info ""
> Changing the workspace name and slug do not have any effect on any sources or destinations already set up and configured. (These use a combination of an internal ID, and `writeKey` to connect.)

Workspace administrators might also maintain:
- **The organization's authentication settings**. This can include login settings, multi-factor authentication enforcement, Identity provider (IDP) settings (including SAML and OAuth), and other related settings.
- **Access Management settings**. Business-tier plans include object-, group-, and role-based [access management settings](/docs/segment-app/iam/), Segment workspace "environments" and labels, roles and groups, and the general permissions model.
- **Billing information**. If your Workspace is on a Team plan, you might have access to a billing page, where you can update the credit card on file, or change other billing details.


## Tasks in Connections

As an administrator, you might be asked to help other members of your organization with tasks related to setting up and troubleshooting your Segment implementation.

### Setting up destinations

Destinations are the endpoint to which Segment sends data flowing from your Sources, and represent external tools (such as Google Analytics, Mixpanel, etc) and sometimes bulk-storage destinations like warehouses. You can set up a Destination from within the Segment App, by navigating to the [Destination Catalog](https://app.segment.com/goto-my-workspace/destinations/catalog) and selecting the tool you want to set up. In most cases, you'll need an existing API key or token, so Segment can send the data to the correct account. If you're setting up a Warehouse or other storage destination, more steps might be required, so see the [Warehouses documentation](/docs/connections/storage/warehouses/) for more details.

### Troubleshooting

Segment contains several ways to see what's going on in your Workspace:

- **[Workspace Health](https://app.segment.com/goto-my-workspace/integration-health/)** - if there are any problems with sources or destinations in your workspace, they'll show up here.
- **[Event Tester](/docs/connections/test-connections/)** - The Event tester allows you to troubleshoot both your Sources and their configuration, and the destiantions they send to. The Event Tester shows a sample of the data available, so you can check that it's being sent, and that it's in the correct format.
- **[Event Delivery](/docs/connections/event-delivery/)** - Event Delivery is a bit like the Event Tester, but specifically for determining if [rules or filters](/docs/guides/filtering-data/) within Segment are preventing data from getting to a destination.
- Last but not least, check out our list of [integration error codes](/docs/connections/integration_error_codes/) for clues about what might be causing an error.

> info ""
> Still stumped? [Contact us](https://segment.com/help/contact/) for more help troubleshooting!


<!-- TODO
warehouses, sync, replay

## Premium feature tasks

personas spaces, workspaces
protocols set up and maintenance
Privacy monitoring
-->
> success ""
> Have suggestions for things to add to this guide? [Drop us a line](mailto:docs-feedback@segment.com?subject=Segment%20Admin%20guide%20Suggestion)!
