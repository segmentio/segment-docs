---
title: Using Label-Based Access Control
plan: iam
---

Labels let workspace owners assign permissions to users by organizing resources into groups. Groups can represent collections of [sources](/docs/connections/sources/) or Spaces.


To create or configure labels in your Segment workspace, go to **Settings > Admin**, then click the Label Management tab. Only Workspace Owners can manage labels for the entire workspace.

> info ""
> All workspaces include labels for `Dev` (development) and `Prod` (production) environments. Business Tier customers can create an unlimited number of labels.

## Custom environments

By default, all workspaces include labels for `Dev` (development) and `Prod` (production) environments. Workspace Owners can configure what these labels are applied to, and can create up to 5 custom environments.

Labels must use the `key:value` format. Both the key and value must begin with a letter, and they can only contain letters, numbers, hyphens, or dashes.

To apply labels to sources and spaces, click the **Assign Labels** tab from the Manage Labels screen. In the screen that appears, select the sources and spaces to apply the label to.

Once a label is in use (either assigned to a resource or used to restrict permissions on a user), the label cannot be deleted. You must first manually remove the label from any resources and permissions before you can delete it.

> info ""
> While only Workspace Owners can bulk-edit labels, source and space admins can edit the labels on the sources and spaces they have access to. To do this, go to the **Settings** tab for each item.

Workspace Owners can also grant specific [role access](/docs/segment-app/iam/roles/) to specific labels. For example, you might give a Source Admin access to only sources that have the `Prod` label.

Permissions can then be assigned to users in Access Management by label, on the Source Admin, Source Read-Only, Engage Admin, Engage User and Engage Read-Only users.

![Screenshot of the Select Sources popup, with the Assign Source Admin to: All Sources in Workspace including future Sources option selected.](images/labels-access-mgmt.png)

## Custom labels

> info ""
> All Segment workspaces can create up to 5 custom labels. Additional label types (in addition to environment labels) are available to Segment Business Tier accounts.

To create additional custom labels, a Workspace Owner can create new key types in the Manage Labels screen. The Workspace Owner can customize any combination of labels to mirror how resources should be partitioned in their organization. 

For example, some organizations may prefer to restrict access on their sources and spaces by brand or product area, while other organizations may find it more useful to restrict their resources by tech stack or engineering department.

When you create a new key, it becomes available in the S    ources page as a column type that can be used to organize sources.

## FAQ

##### Where can I create labels?
You can create labels for sources and spaces from Segment workspace by going to **Settings -> Admin** and then clicking the **Label Management** tab.

##### What resources can I assign a label to?

You can apply labels to sources and spaces.

##### Where can I assign labels?

You can assign labels to sources and spaces using the **Assign Labels** tab in the **Manage Labels** screen. Source Admins and Space Admins can edit the labels on their individual resources in the **Settings** tab.

##### Where can labels be used?

Once a label has been created and has been assigned to resources within the workspace, workspace owners can use these labels to restrict permissions on user access, restrict which sources can be connected to a space through a Connection Policy, and organize sources by viewing these labels as columns in the Sources page.

##### Can I delete a label?

Workspace owners can delete a label only if it’s not in use. See [Custom Environments](#custom-environments) for details on removing labels.

##### Can I rename a label?

No. If you need to rename a label, first create a new label, assign it to all resources using the old label, and then delete the old label.

##### Can I assign multiple values from the same category to a resource?

No, you can assign only one value per category. This prevents confusion about permissions. For example, if a user has access to `brand:A`, it’s unclear whether they should also access sources labeled both `brand:A` and `brand:B`. To avoid this, each resource can have just one value per label category.

##### How does assigning permissions based on labels work?

Labels are additive, meaning they can only further restrict a user's permissions. For example, if a user has access to everything labeled `environment:production`, then they're not restricted by other label categories. This results in broader permissions compared to a user with access to both `environment:production` AND `region:apac`.

For example, if the following sources had these set of labels:

| Source | Labels                              |
| ------ | ----------------------------------- |
| A      | `environment:prod`, `product:car`   |
| B      | `environment:prod`, `product:truck` |
| C      | `environment:dev, product: car`     |

Then the following users with Source Admin restricted with labels will only have access to the following sources:

| User  | Source Admin with labels            | Access to sources |
| ----- | ----------------------------------- | ----------------- |
| Sally | `environment:prod`                  | A, B              |
| Bob   | `environment:prod`, `product:truck` | B                 |
| Jane  | `product: car`                      | A, C              |

##### Can I grant a user permissions with `OR` statements?
You can only assign one set of additive labels on a per-user basis. However, to give a user who needs access to all sources labeled `brand:a` or `brand:b`, we recommend that you use Group permissions and assign this user to two separate groups, where one group has Source Admin access to `brand:a` and the other has Source Admin access to `brand:b`.
