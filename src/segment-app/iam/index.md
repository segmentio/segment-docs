---
title: Identity & Access Management Overview
---

Segment's access management tools let workspace owners manage which users can access different parts of their Segment workspaces.



The Access Management page has three tabs: [Users (team members)](/docs/segment-app/iam/concepts/#team-members), [User Groups](/docs/segment-app/iam/concepts/#user-groups), and [Tokens](/docs/segment-app/iam/concepts/#tokens). You can select a user in the table to see their [roles](/docs/segment-app/iam/roles).

## Quick Links
- [Invite a team member to your workspace](/docs/segment-app/iam/membership/#invite-a-new-team-member)
- [Create a User Group](/docs/segment-app/iam/membership/#create-a-new-user-group)
- [Update a team member's access](/docs/segment-app/iam/membership#change-a-team-members-access)
- [Remove a team member from a workspace](/docs/segment-app/iam/membership/#remove-a-team-member-from-your-workspace)
- [Add a new user with Single Sign On](/docs/segment-app/iam/membership/#team-management-with-single-sign-on)

{% include components/reference-button.html href="/segment-app/iam/membership/" icon="media/icon-academy.svg" title="Invite and manage workspace members" content="Learn how to add members to your workspace, and manage their permissions." variant="related" %}

{% include components/reference-button.html href="/segment-app/iam/membership/" icon="media/icon-academy.svg" title="Organize Users with User Groups" content="Learn manage workspace memebers in bulk." variant="related" %}

# Access Management Overview

Access settings are applied at the workspace level. A Segment user can be have access to one or more workspaces, either as an `owner` or `member` of each.
Users access their Segment account with either email/password credentials, or by using Single Sign On.

`Owners` manage all aspects of the workspace, and `members` can have access to specific products and resource types.

> info ""
> **Note**: If you are on a Free or Team plan, only the `workspace owner` and `source admin` roles are available._

Check out the [Roles documentation](/docs/segment-app/iam/roles/) for more details.

## Exporting a workspace's user list

*Workspace Owners* can download a .csv list of users who have access to a specific workspace (including their roles) from the Access Management page in the Segment App.
