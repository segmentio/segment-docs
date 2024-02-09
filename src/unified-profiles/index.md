---
title: Unified Profiles Overview
hidden: true
---

Unified Profiles, available with Twilio's Agent Copilot product, provides your Flex agents with real-time customer data from multiple enterprise systems within Flex. Agents can view each customer's details and a historical timeline that shows a customer's previous activities, enabling agents to provide personalized support based on a customer's history.

Unified Profiles integrates with Segment to connect your Flex contact center to customer data in [Salesforce Cloud](/docs/connections/sources/catalog/cloud-apps/salesforce/#salesforce-source), a [data warehouse](/docs/connections/storage/warehouses/), or an.

For more information, see Twilio's [Agent Copilot](add a link here!) documentation. 

## Entitlements and limitations

Segment for Flex workspaces created during the Flex Unify setup process have the following entitlements and limitations:

### Sources

In addition to 1 source for Flex events that is auto-created during setup, you can create an additional 5 sources.

These sources are limited to the following types:
  - [Salesforce CRM](/docs/connections/sources/catalog/cloud-apps/salesforce/)
  - [Storage (RETL)](/docs/connections/reverse-etl/#step-1-add-a-source)
  - [Mobile](/docs/connections/sources/catalog/#mobile) 
  - [Javascript](/docs/connections/sources/catalog/libraries/website/javascript/)
  - [Twilio Event Streams](/docs/connections/sources/catalog/cloud-apps/twilio/) <!---- this is an obj cloud source and not event streams, am I missing something??--->
  - Server 
    - [HTTP](/docs/connections/sources/catalog/libraries/server/http-api/)
    - [Java](/docs/connections/sources/catalog/libraries/server/java/)

### Destinations

With a Segment for Flex workspace, you can create up to 3 destinations.

These destinations are limited to the following types:
- [Storage connections](/docs/connections/storage/catalog/)
- [Analytics destinations](/docs/connections/destinations/catalog/#analytics)
- [Event Streams](/docs/connections/destinations/#event-streams-destinations)
- [Segment Profiles](/docs/connections/destinations/catalog/actions-segment-profiles/)
- [Segment Connections](/docs/connections/destinations/catalog/actions-segment/)


### Entitlements

Your Segment for Flex workspace has the following entitlements:

- 2 [Unify Spaces](/docs/unify/quickstart/)
- 2 [computed traits](/docs/unify/Traits/computed-traits/)
- 2 [predictive traits](/docs/unify/traits/predictions/)
