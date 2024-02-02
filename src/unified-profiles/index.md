---
title: Unified Profiles Overview
---

Unified Profiles, available with Twilio's Agent Copilot product, provides your Flex agents with real-time customer data from multiple enterprise systems within Flex. Agents can view each customer's details and a historical timeline that shows a customer's previous activities, enabling agents to provide personalized support based on a customer's history.

Unified Profiles integrates with Segment to connect your Flex contact center to customer data in [Salesforce Cloud](/docs/connections/sources/catalog/cloud-apps/salesforce/#salesforce-source) or a [data warehouse](/docs/connections/storage/warehouses/).

<!-- todo: build out data warehouse catalog the dw page. keep similar format to source/dest/storage catalogs--->


For more information, see Twilio's Agent Copilot documentation. 

## 


## Entitlements and limitations

Segment workspaces provisioned during the Flex Unify setup process have the following entitlements and limitations:

### Sources

In addition to one source for Flex events that is auto-created during setup, you can create an additional 5 sources.

These sources are limited to the following types:
  - Salesforce CRM
  - Storage (RETL) 
  - Mobile 
  - Website (Support only Javascript) 
  - Twilio Event Streams
  - Server (Support only HTTP or Java) - needed to support Flex as a source

### Destinations

With a Flex Unify workspace, you can create up to 3 destinations.

These destinations are limited to the following types:
- Storage connection type (needed for RETL in the middle for Salesforce CRM) 
- Analytics
- Event Streams
- Segment Profiles only
- Segment Connections only 


### Entitlements

The workspace that you provision during the Flex Unify setup process has the following entitlements:

- 2 [Unify Spaces](/docs/unify/quickstart/)
- 2 [computed traits](/docs/unify/Traits/computed-traits/)
- 2 [predictive traits](/docs/unify/traits/predictions/suggested-predictive-audiences/)
