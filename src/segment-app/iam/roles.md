---
title: Roles
---

A role gives a user access to resources within a workspace. Roles are additive, and can combine to configure a custom policy for a Team Member or a Group. A policy is at least one role plus one resource applied to an individual user or group.

## Global Roles

All Segment workspaces have the following roles, regardless of account type.

| Role                | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Workspace Owner     | Owners have full read and edit access to everything in the workspace, including sources, destinations, add-on products, and settings. Owners have full edit access to all team permissions.                                                                                                                                                                                                                                                                                                                         |
| Workspace Member    | Members inherit custom permissions based on [individual roles](#business-tier-roles) assigned.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Source Admin        | Source admins have edit access to:<br>- assigned source(s) <br>- the settings for that source <br>- any connected streaming destinations <br>- Schema <br>- live data from the source in the [debugger](/docs/connections/sources/debugger/) <br>- the source's [write key](/docs/connections/find-writekey/) <br><br>A user with the Source Admin role can get access to either all current and future sources, or a specific list of sources, or (if you're on a Business plan) to sources with a specific Label. Source Admins can create new sources when the “All sources in Workspace including future sources” option is selected.  |
| Function Admin     | Function admins can create, edit and delete access to assigned function(s). When you assign a user the Functions Admin role, you can grant them access to either _all current and future_ functions, or to a _specific list_ of functions.                                                                                                                                                                                                                                                                         |
| Function Read-only | The Function read-only role grants users the ability to read an assigned function(s). When you assign a user the Functions Read-only role, you can grant them access to either _all current and future_ functions, or to a _specific list_ of functions.                                                                                                                                                                                                                                                           |

## Business Tier Roles

The following roles are only available to Segment Business Tier accounts.

#### End User Privacy Admin
* Edit access to [End User Privacy Settings](/docs/privacy/user-deletion-and-suppression). Includes access to Data Privacy Agreement, and user suppression and deletion workflows.
* **Scope:** Grants access to only End User Privacy Settings in the App.

#### Identity Admin
* Edit access to Identity settings in Unify.
* **Scope:** Grants access to *all* Identity settings.

#### Source Read-only
* Read access to assigned source(s), source settings, connected streaming destinations, schema, transformations, and live data in the debugger.
* **Scope:** Grants access to either: all current and future Sources, or only specific Sources, or Sources with a specific Label (BT only).


#### Source Admin
* Edit access to assigned source(s), source settings, connected streaming destinations, schema, transformations, the source's [write key](/docs/connections/find-writekey/) and live data in the debugger.
* **Scope:** Grants access to either: all current and future Sources, or only specific Sources, or Sources with a specific Label (BT only).

#### Unify and Engage Admin
* Edit access to Unify settings and if purchased, Engage Audiences, Traits, Journeys, Content, and settings.
* **Scope:** Grants access to either: all current and future Spaces, or a specific list of Spaces, or Spaces with a specific Label (BT only).


#### Unify and Engage Read-only
* Read-only access to Unify settings and if purchased, Engage audiences, traits, journeys, and content. Cannot download PII or edit settings in Unify or Engage.
* **Scope:** Grants access to either: all current and future Spaces, or a specific list of Spaces, or Spaces with a specific Label (BT only).

#### Unify Read-only, Engage User
* Read-only access to Unify settings and if purchased, edit access to Engage audiences, traits, journeys, and content. Cannot download PII or edit settings in Unify or Engage.
* **Scope:** Grants access to either: all current and future Spaces, or a specific list of Spaces, or Spaces with a specific Label (BT only).

#### Tracking Plan Admin
* Edit access to all Tracking Plans in Protocols.
* **Scope:** Grants access to *all* Tracking Plans.

#### Tracking Plan Read-only
* Read access to all Tracking Plans in Protocols.
* **Scope:** Grants access to *all* Tracking Plans.

#### Warehouse Destination Admin
* Edit access to warehouse destinations and warehouse destination settings. *(For example, Redshift, Postgres, BigQuery)*  
* **Scope:** Grants access to *all* warehouses.

#### Warehouse Destination Read-only
* Read-only access warehouse destination and warehouse destination settings. *(For example, Redshift, Postgres, BigQuery)*
* **Scope:** Grants access to *all* warehouses.


## PII Access

The Segment App doesn't show detected Personally Identifiable Information (PII) to workspace members if the information matches specific expected formats for PII. When PII Access turns *off*, detected PII is masked based on [red or yellow default matchers](/docs/privacy/portal/#default-pii-matchers) and any [custom matchers](/docs/privacy/portal/#custom-pii-matchers) defined in the Privacy Portal.

Workspace Owners can grant specific individuals or groups access to PII from their Access Management settings. PII Access only applies to the resources a user or user group has access to; it doesn't expand a user's access beyond the original scope. All Workspace Owners have PII access by default.


## Roles for managing Engage destinations

Engage destinations aren't included in the Engage roles by default. Users with Engage roles (including the Engage Admin) need additional permissions for each Engage space they work with to manage that Engage space's destinations.

Grant these users `Source Admin` on the source named `Engage (space name)` to grant them access to the Engage destinations for that Engage space.

## Roles for connecting resources

To connect two resource instances, you must have access to both. You can either grant this access to all resources, or to the specific resources you want to connect.

**To connect a source to warehouse** you must have `Source Admin` and `Warehouse Admin` access for the source and the warehouse.

**To connect source to tracking plan** requires `Source Admin` and `Tracking Plan Admin` access for the source and the tracking plan.

## Roles for Protocols Transformations

To **view** transformations, you need `Source Read-only`, either for all Sources or the specific Sources using Protocols.

To **create or edit** transformations you must have either `Source Admin` for all Sources, or for the specific Sources used with Protocols.

## Roles for Privacy Portal

The Privacy Portal is only accessible by `Workspace owners`. To **view, create or edit** any section of the Privacy Portal, you need to have the `Workspace Owner` role.
