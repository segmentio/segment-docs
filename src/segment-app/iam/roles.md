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

| Role                | Description                                                                                                                                                   | Scope                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Source read-only    | Read-only access to assigned source(s), source settings, connected streaming destinations, schema, live data in the debugger, and connected tracking plan(s). | Can be granted admin access to either 1) All current and future sources, or 2) Specific sources  |
| Warehouse admin     | Edit access to assigned warehouse(s) and warehouse settings.                                                                                                  | Can be granted to all current and future warehouses (including the ability to create new sources |
| Warehouse read-only | Read-only access to assigned warehouse(s) and warehouse settings.                                                                                             | Can be granted to all current and future warehouses                                              |


### Protocols


| Role                | Description                                      | Scope                                                                                                       |
| ------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Protocols admin     | Edit access to tracking plans in Protocols.      | Can be granted to either all current and future tracking plans (including the ability to create new sources |
| Protocols read-only | Read-only access to tracking plans in Protocols. | Can be granted to all current and future tracking plans                                                     |

### Personas

| Role               | Description                                                                                                                 | Scope                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Personas admin     | Edit access to Personas, including all audiences and computed traits. Personas admin can also view PII and change settings. | All audiences, computed traits |
| Personas user      | Edit access to traits and audiences. Cannot change settings in Personas.                                        | The entire workspace           |
| Personas read-only | Read-only access to Personas,  including all audiences and computed traits.                                                 | The entire workspace           |



### Minimal Workspace Access

Administrators can grant users "Minimal Workspace Access". Users with minimal workspace access can only view the workspace. They do not have access to any sub-resources and cannot edit the workspace.


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


## Personas Destinations

Personas destinations are not included in the Personas roles, instead managing these destinations require `Source Admin` on the source named `Personas Default`.
