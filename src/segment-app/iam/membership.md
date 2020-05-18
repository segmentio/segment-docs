---
title: Manage Workspace Access
---

This page explains how to add [Team Members](/docs/segment-app/iam/concepts/#team-members) and [User Groups](/docs/segment-app/iam/concepts/#user-groups/) to your team's workspace, how to assign them [roles](/docs/segment-app/iam/concepts/#roles/), and how to remove them.
*Note: Only Workspace Owners can make updates to a workspace's Access Management*

## Invite a new team member

1. Navigate to the **Workspace settings** then to **Access management**. (Only Workspace owners can access this section.)
2. Click **Invite Team Member**.
3. Enter the user's email address and choose their roles OR assign them to a user group.
4.
   _Note: If you are on a Free or Team plan, only the `workspace owner` and `source admin` roles are available._

4. Select desired roles, and choose the specific resources to grant access to. See our Roles documentation for details.

## Change a team member's access

1. Navigate to THE **Users** tab within **Access Management**. Search by name or email to locate the member.
2. Review the current permissions in the table.
3. Click the member to see details.
4. Select or deselect roles, and choose the specific resources to grant access to.

  _Note: you can also grant the role for all current and future resources. For admin roles, this includes the ability to create new resources._

## Create a new User Group

When multiple team members should have similar access, Workspace Owners can manage their permission in bulk with user groups.

1. Navigate to the **Groups** tab within **Access Management**.
2. Click **Create User Group**
3. Name your group, and select or deselect roles, and choose the specific resources to grant access to
4. Add team members to the group. Search by name or email to locate the team member(s).
5. Review the group permissions in the panel on the right of the screen and click **Create User Group**

## Add a team member to a User Group

![](/images/user-group-overview.png)

_From the Edit Team Member Page:_
1. Navigate to the **Members** tab within **Access Management**
2. Select the team member you would like to add
3. Click **Add User Group**
4. Select the user group(s) you would like to add the team member to
5. **Save**

*Note: This method is best when adding a* *single* *team member to one or more user groups.*

![](/images/user-group-members.png)

_From the Edit User Group page:_
1. Navigate to the **Groups** tab within **Access Management**.
2. Select the User Group you would like to add one or more new Team Members to.
3. Click **Edit User Group** in the panel on the right of the screen
4. Navigate to the **Members** tab and click **+ Add**  at the top of the list of Team Members.
5. Add team members to the group. Search by name or email to locate the team member(s).
6. **Save**.

*Note: this method is best when adding multiple users to a user group*

## Remove a team member from a User Group
1. Navigate to the **Groups** tab within **Access Management**.
2. Select the User Group you would like to remove one or more new Team Members from.
3. Click **Edit User Group** in the panel on the right of the screen.
4. Navigate to the **Members** tab and select the team members you would like to remove.

5. **Save**

## Remove a team member from your workspace

Open the member details and click **Remove Team Member** at the top.

## Team Management with Single Sign On

If you are on a Business plan and elect to use Single Sign On, by assigning team members access to Segment in your identity provider, you are granting them implicit access to your workspace with **minimal workspace access**.

Segment supports "Just-In-Time" user provisioning via SSO. Any users with access to the application as defined in your IDP will be able to seamlessly create an account the very first time they log in. All auto-provisioned users are created as Workspace Members with Minimal Workspace Access.

Workspace Owners may update these users' access within **Access Management** in the Segment App.

Segment does not support programmatic de-provisioning at this time, but if your workspace has SSO enabled, any user that cannot authenticate via your IDP will not be granted authorization to view or edit your workspace or the Sources, Destinations, etc. within it.
