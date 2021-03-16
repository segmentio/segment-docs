---
title: Roles
---

A role is used to give a user access to resources within a workspace. Roles are additive, and can be combined to configure a custom policy for a Team Member or a Group. A policy is at least one role plus one resource applied to an individual user or group.

## Global Roles

All Segment workspaces have the following roles, regardless of account type.

- **Workspace Owner**
  Owners have full read and edit access to everything in the workspace, including sources, destinations, add-on products, and settings. Owners have full edit access to all team permissions.

- **Workspace Member**
Members inherit custom permissions based on [individual roles](/docs/segment-app/iam/roles/##business-tier-roles) assigned.

- **Source admin**
  Source admins have edit access to assigned source(s), to the settings for that source, to any connected streaming destinations, schema, and live data from the source in the [debugger](/docs/connections/sources/debugger/). A user with the Source Admin role can be granted access to either all current and future Sources, or a specific list of Sources, or (if you are on a Business plan) to Sources with a specific Label.


## Business Tier Roles

The following roles are only available to Segment Business Tier accounts.

#### Source Admin

Edit access to assigned source(s), source settings, connected streaming destinations, schema, transformations, and live data in the debugger.

**Scope:** Can be granted access to either: all current and future Sources, or  only specific Sources, or Sources with a specific Label (BT only).

#### Source Read-only

Read access to assigned source(s), source settings, connected streaming destinations, schema, transformations, and live data in the debugger.

**Scope:** Can be granted access to either: all current and future Sources, or  only specific Sources, or Sources with a specific Label (BT only).

#### Warehouse Admin

Edit access to all warehouses and warehouse settings.

**Scope:** Grants access to **all** warehouses.

##### Warehouse Read-only

Read access to all warehouses and warehouse settings.

**Scope:** Grants access to **all** warehouses.

#### Functions Admin

Create, edit and delete access to assigned function(s).

**Scope:** Can be granted access to either all current and future functions, or to a specific list of functions.

#### Functions Read-only

Read access to assigned function(s).

**Scope:** Can be granted access to either all current and future functions, or to a specific list of functions.

#### Tracking Plan Admin

Edit access to all Tracking Plans in Protocols.

**Scope:** Grants access to **all** Tracking Plans.

#### Tracking Plan Read-only

Read access to all Tracking Plans in Protocols.

**Scope:** Grants access to **all** Tracking Plans.

#### Personas Admin

Edit access to assigned Personas Space(s), including all audiences and computed traits. Personas admins can update settings from the Personas screens of the Segment App.

**Scope:** Can be granted access to either: all current and future Spaces, or a specific list of Spaces, or Spaces with a specific Label (BT only).

#### Personas User
Edit access to all traits and audiences within assigned Personas Space(s). Cannot change settings in Personas.

**Scope:** Can be granted access to either: all current and future Spaces, or a specific list of Spaces, or Spaces with a specific Label (BT only).

#### Personas Read-only
Read-only access to assigned Personas Space(s), including all audiences and computed traits.

**Scope:** Can be granted access to either: all current and future Spaces, or a specific list of Spaces, or Spaces with a specific Label (BT only).

#### Identity Admin

Edit access to Identity settings in Personas.

**Scope:** Grants access to **all** Identity settings.

#### End User Privacy Admin

Edit access to [End User Privacy Settings](/docs/privacy/user-deletion-and-suppression). Includes access to Data Privacy Agreement, and user suppression and deletion workflows.

**Scope:** Grants access to only End User Privacy Settings in the App.

## PII Access

The Segment App does not show detected Personally Identifiable Information (PII) to workspace members if the information matches specific expected formats for PII. When PII Access is turned “off”, detected PII is masked based on [red or yellow default matchers](/docs/privacy/portal/#default-pii-matchers) and any [custom matchers](/docs/privacy/portal/#custom-pii-matchers) defined in the Privacy Portal.

Workspace Owners can grant specific individuals or groups access to PII from their Access Management settings. PII Access only applies to the resources a user or user group has access to; it does not expand a user's access beyond the original scope. All Workspace Owners have PII access by default.


## Roles for managing Personas destinations

Personas destinations are not included in the Personas roles by default. Users with Personas roles (including Personas Admin) need additional permissions for each Personas space they work with in order to manage that Personas space's destinations.

Grant these users `Source Admin` on the source named `Personas (personas space name)` to grant them access to the Personas destinations for that Personas space.

## Roles for connecting resources

To connect two resource instances, you must have access to both. This access can either be granted to all resources, or to the specific resources you want to connect.

**To connect a source to warehouse** you must have `Source Admin` and `Warehouse Admin` access for the source and the warehouse.

**To connect source to tracking plan** requires `Source Admin` and `Tracking Plan Admin` access for the source and the tracking plan.


## Roles for Protocols Transformations

To **view** transformations, you only need `Source Read-only`, either for all Sources or the specific Sources using Protocols.

To **create or edit** transformations you must have either `Source Admin` for all Sources, or for the specific Sources used with Protocols.
