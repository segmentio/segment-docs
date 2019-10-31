---
title: Roles
---

Roles are assigned to each member of a team.

## Global roles

All Segment workspaces have the following roles, regardless of account type.

  - **Workspace Owner**
    Owners have full read and edit access to everything in the workspace, including sources, destinations, add-on products, and settings. Owners have full edit access to all team permissions.

  - **Source admin**
    Source admins have edit access to assigned source(s), the source settings, connected streaming destinations, schema, live data in the debugger, and connected tracking plan(s). Source admins can be granted access to either all sources (current and future sources, with the ability to create new sources), or to specific sources.


## Business Tier roles

The following roles are only available to Segment Business Tier accounts.

### Connections
<table>
  <tr>
    <td>Role</td>
    <td>Description</td>
    <td>Scope</td>
  </tr>
  <tr>
    <td>Source read-only</td>
    <td>Read-only access to assigned source(s), source settings, connected streaming destinations, schema, live data in the debugger, and connected tracking plan(s).</td>
    <td>Can be granted admin access to either:
<ul><li>All current and future sources, or
<li>Specific sources</li></ul></td>
  </tr>
  <tr>
    <td>Warehouse admin</td>
    <td>Edit access to assigned warehouse(s) and warehouse settings.</td>
    <td>Can be granted to all current and future warehouses (including the ability to create new sources</td>
  </tr>
  <tr>
    <td>Warehouse read-only</td>
    <td>Read-only access to assigned warehouse(s) and warehouse settings.</td>
    <td>Can be granted to all current and future warehouses</td>
  </tr>
</table>

### Protocols

<table>
  <tr>
    <td>Role</td>
    <td>Description</td>
    <td>Scope</td>
  </tr>
  <tr>
    <td>Protocols admin</td>
    <td>Edit access to tracking plans in Protocols.</td>
    <td>Can be granted to either all current and future tracking plans (including the ability to create new sources</td>
  </tr>
  <tr>
    <td>Protocols read-only</td>
    <td>Read-only access to tracking plans in Protocols.</td>
    <td>Can be granted to all current and future tracking plans</td>
  </tr>
</table>

### Personas
<table>
  <tr>
    <td>Role</td>
    <td>Description</td>
    <td>Scope</td>
  </tr>
  <tr>
    <td>Personas admin</td>
    <td>Edit access to Personas, including all audiences and computed traits. Personas admin can also view PII and change settings.</td>
    <td>All audiences, computed traits,</td>
  </tr>
  <tr>
    <td>Personas user</td>
    <td>Edit access to traits and audiences. Cannot view PII or change settings in Personas.</td>
    <td>The entire workspace</td>
  </tr>
  <tr>
    <td>Personas read-only</td>
    <td>Read-only access to Personas,  including all audiences and computed traits.</td>
    <td>The entire workspace</td>
  </tr>
</table>

---

## Connecting resources

Connecting two resource instances requires access to both:

<table>
  <tr>
    <td>Connect source to warehouse</td>
    <td>Requires Source Admin and Warehouse Admin. Either granted on the specific resources being connected or granted for all resources.</td>
  </tr>
  <tr>
    <td>Connect source to tracking plan</td>
    <td>Requires Source Admin and Tracking Plan Admin. Either granted on the specific resources being connected or granted for all resources. </td>
  </tr>
</table>

---

## Personas Destinations

Personas destinations are not included in the Personas roles, instead managing these destinations require `Source Admin` on the source named `Personas Default`.
