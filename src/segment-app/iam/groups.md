---
title: Groups
---

> note ""
> **Note**: Group Permissions are only available to Business Tier accounts and above.

Segment's access control model includes both individual user permissions and group permissions. Users are managed on the Users tab of Segment's "Access Management" tab in workspace settings, while groups are managed on the Groups tab.

![](/docs/segment-app/images/groups-page.png)

Workspace owners can use groups to assign the same permissions to users within the same team in your organization who require the same levels of access to Segment. Workspace owners no longer have to manually assign permissions to these users one at a time.

Users can belong to any number of groups, and can also still be assigned individual permissions from the Users tab. User permissions are "additive", which means they have the sum of their group _and_ individual permissions.

For example, if a user is individually granted "Source Admin" on all sources but is granted "Workspace Owner" from a group they belong to, this user will be a workspace owner. On the flip side, if a user is personally granted "Source Admin" on all sources but is granted "Source Admin" on only Source A from a group they belong to, this user will have "Source Admin" access to all sources.

![](/docs/segment-app/images/individual-view-of-groups.png)

## SSO Default Group
When users log in to Segment for the first time using SSO, they are automatically be added to a default group with Minimal Workspace Access. With this role, they do not have access to edit the workspace or its resources. This ensures that users logging in using SSO are only given the basic level of permissions any new user should have access to.

Workspace owners can edit the default group's permissions, or can edit these users' individual permissions to add them to the appropriate access groups, from the **Users** tab once they've been added to the workspace.
