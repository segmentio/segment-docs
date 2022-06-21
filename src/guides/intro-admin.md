---
title: Segment for Workspace Administrators
---

If your job is to set up or maintain a Segment Workspace for your organization, or assist other people using the Segment Web App, this guide is for you. If you're more interested in Segment implementation details, see the [developer intro guide](/docs/guides/intro-impl/).

## What is Segment?

> info ""
> If you've already read [an Introduction to Segment](/docs/guides/), you can skip ahead.

Segment is a system for sending messages from your websites, mobile apps, and servers. These messages contain event and user data that you can send to other tools or collect in warehouses for further analysis. Segment also gathers information about your users from external systems, like help desk software or CRMs. You can use this collated information to analyze data, build user audiences, and personalize your users' experiences.

## What's a Workspace?

{% include content/whats-a-workspace.md %}


## The Workspace Administrator's Role

You don't have to be a developer to be a Workspace administrator for an organization, and this guide only covers tasks specifically related to managing a Workspace in the [Segment App](/docs/segment-app/).

However, many Workspace admins are also involved in the Segment implementation process as there are usually some tasks that must be performed in the Workspace to complete an implementation. If you think you might develop a Segment implementation or help out other developers, first read [Segment for developers](/docs/guides/intro-impl/).

> note ""
> **Note**: Workspace roles are only available to Business Tier customers. If you're on a Free or Team plan, all workspace members are granted workspace administrator access.

In addition, Workspace administrators set up and maintain the organization's [workspace settings](https://app.segment.com/goto-my-workspace/settings/), which include:
- Billing information and billing contacts
- Incident contacts - the people who get notified in the event of an outage or incident
- The Workspace name and slug - the display name and namespace of the workspace in the Segment system

> info ""
> Changing a workspace name and slug won't impact configured sources or destinations, which connect using an internal ID and `writeKey`.

Workspace administrators might also maintain:
- **The organization's authentication settings**. This can include login settings, multi-factor authentication enforcement, Identity provider (IDP) settings (including SAML and OAuth), and other related settings.
- **Access Management settings**. Business-tier plans include object-, group-, and role-based [access management settings](/docs/segment-app/iam/), Segment workspace "environments" and labels, roles and groups, and the general permissions model.
- **Billing information**. If your Workspace is on a Team plan, you might have access to a billing page, where you can update the credit card on file or change other billing details.


## Tasks in Connections

As an administrator, you might be asked to help other members of your organization with tasks related to setting up and troubleshooting your Segment implementation.

### Setting up destinations

Destinations are the endpoints to which Segment sends data flowing from your Sources. Destinations can be third-party external tools, like Google Analytics or Mixpanel, or bulk-storage resources, like warehouses.

You can set up a Destination from within the Segment App by navigating to the [Destination Catalog](https://app.segment.com/goto-my-workspace/destinations/catalog) and selecting the tool you want to set up. In most cases, you'll need an existing API key or token so that Segment can send the data to the correct account. If you're setting up a Warehouse or other storage destination, more steps might be required; see the [Warehouses documentation](/docs/connections/storage/warehouses/) for more details.

### Troubleshooting

Use these Segment features to keep tabs on your Workspace:

- **[Workspace Health](https://app.segment.com/goto-my-workspace/integration-health/)** - if there are any problems with sources or destinations in your workspace, they'll show up here.
- **[Event Tester](/docs/connections/test-connections/)** - The Event tester allows you to troubleshoot your Sources, their configuration, and their downstream destinations. The Event Tester shows a sample of the data available, so you can check that it's being sent, and that it's in the correct format.
- **[Event Delivery](/docs/connections/event-delivery/)** - Event Delivery is a bit like the Event Tester, but specifically for determining if [rules or filters](/docs/guides/filtering-data/) within Segment are preventing data from getting to a destination.
- Check out Segment's list of [integration error codes](/docs/connections/integration_error_codes/) for insight into what might cause an error.

> info ""
> Still stumped? [Contact support](https://segment.com/help/contact/) for more help troubleshooting.


<!-- TODO
warehouses, sync, replay

## Premium feature tasks

personas spaces, workspaces
protocols set up and maintenance
Privacy monitoring
-->
> success ""
> Have suggestions for this guide? [Reach out with your feedback](mailto:docs-feedback@segment.com?subject=Segment%20Admin%20guide%20Suggestion).
