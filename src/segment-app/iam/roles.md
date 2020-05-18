---
title: Roles
---

## Global Roles

All Segment workspaces have the following roles, regardless of account type.

  - **Workspace Owner**
    Owners have full read and edit access to everything in the workspace, including sources, destinations, add-on products, and settings. Owners have full edit access to all team permissions.

  - **Source admin**
    Source admins have edit access to assigned source(s), the source settings, connected streaming destinations, schema, and live data in the debugger. A user with the Source Admins role can be granted access to 1) all current and future Sources, 2) specific Sources, 3) Sources with a particular Label (BT only).


## Business Tier Roles

The following roles are only available to Segment Business Tier accounts.

#### Source Admin
Edit access to assigned source(s), source settings, connected streaming destinations, schema, transformations, and live data in the debugger.

**Scope:** Can be granted access to 1) all current and future Sources, 2) specific Sources, 3) Sources with a particular Label (BT only)

#### Source Read-only
Read access to assigned source(s), source settings, connected streaming destinations, schema, transformations, and live data in the debugger.

**Scope:** Can be granted access to 1) all current and future Sources, 2) specific Sources, 3) Sources with a particular Label (BT only)

#### Warehouse Admin
Edit access to all warehouses and warehouse settings.

**Scope:** Grant access to **all** warehouses.

##### Warehouse Read-only
Read access to all warehouses and warehouse settings.

**Scope:** Grant access to **all** warehouses.

#### Tracking Plan Admin
Edit access to all Tracking Plans in Protocols.

**Scope:** Grant access to **all** Tracking Plans.

#### Tracking Plan Read-only
Read access to all Tracking Plans in Protocols.

**Scope:** Grant access to **all** Tracking Plans.

#### Personas Admin
Edit access to assigned Personas Space(s), including all audiences and computed traits. Can update settings within the Personas product.

**Scope:** Can be granted access to 1) all current and future Spaces, 2) specific Spaces, 3) Spaces with a particular Label (BT only).

#### Personas User
Edit access to all traits and audiences within assigned Personas Space(s). Cannot change settings in Personas.

**Scope:** Can be granted access to 1) all current and future Spaces, 2) specific Spaces, 3) Spaces with a particular Label (BT only).

#### Personas Read-only
Read-only access to assigned Personas Space(s), including all audiences and computed traits.

**Scope:** Can be granted access to 1) all current and future Spaces, 2) specific Spaces, 3) Spaces with a particular Label (BT only).

#### Identity Admin
Edit access to Identity settings in Personas.

**Scope:** Grant access to **all** Identity settings.

#### Minimal Workspace Access
Access to only log into a workspace. Cannot view any resources or settings.


## Privacy Mode

By default, Workspace Members do not have access to detected Personally Identifiable Information (PII) within the Segment App. To enable PII Access for a Team Member or Group, Workspace Owners can toggle on PII Access when editing Access Management for a particular individual user or group. PII Access only applies to the resources a user or user group has access to. All Workspace Owners have PII access by default.

PII Access masks deteted PII based on red/yellow default matchers and any custom matchers defined in the [Privacy Portal](/docs/privacy/portal/)

## Role Assignment - Best Practices
### Personas Destinations

Personas destinations are not included in the Personas roles, instead managing these destinations require `Source Admin` on the source named `Personas Default`.

### Connecting resources

Connecting two resource instances requires access to both:

<table>
  <tr>
    <td>Connect source to warehouse</td>
    <td>Requires Source Admin and Warehouse Admin. Either granted on the specific resources being connected or granted for all Sources.</td>
  </tr>
  <tr>
    <td>Connect source to tracking plan</td>
    <td>Requires Source Admin and Tracking Plan Admin. Either granted on the specific resources being connected or granted for all resources. </td>
  </tr>
</table>

### Protocols Transformations

Create, view and edit Protocols Transformations
Creating and editing transformations requires either Source Admin for all Sources or specific Sources. Viewing transformations requires Source Read-only for all Sources or specific Sources.
