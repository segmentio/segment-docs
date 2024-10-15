---
title: Linked Events Limits
plan: unify
hidden: false
---

To provide consistent performance and reliability at scale, Segment enforces default use limits for Linked Events.

## Usage limits
Linked Events provides you with the flexibility to enrich unlimited events in downstream destinations. This means you won't encounter any limitations or pauses in service related to the number of Linked Events enrichments.

Segment measures Linked Events limits based on entities and entity rows. 
* **Entities:** The warehouse tables that are declared in the Data Graph with the `enrichment_enabled = true` property. 
* **Entity rows**: The total number of rows synced to Segment cache across all enrichment entities at any given time.

To see how many entities and entity rows you’re using with Linked Events, navigate to **Settings > Usage & billing** and select the **Linked Events** tab.

Plan | Linked Events Limits | How to increase your limit
---- | -------------------- | --------------------------
Free |  Not available | N/A
Teams | Not available | N/A
Business | If you use Unify and Engage, you'll receive a trial version with: <br>* 1 Entity for every Unify space <br>* 1 million Entity rows per workspace | Contact your sales rep to upgrade to the full paid version of Linked Events to unlock: <br>* Unlimited Entities <br>* Additional Entity Rows (10 x the number of MTUs or 0.1 x the number of monthly API calls up to a maximum of 100 million, to be used across your workspaces) <br><br>Note: You must already be on a Unify or Engage plan to be eligible for upgrade. 

### Special cases
* If you have a non-standard or high volume usage plan, you may have unique Linked Events limits or custom pricing.
* If you're on the trial version of Linked Events, you won't be able to add more than 1 million entity row syncs. Reach out to your Customer Success representative to upgrade to the Linked Events paid tier.
* If you're using the paid version of Linked Events, and you reach your entity row limit before the end of your billing period, your syncs won't automatically pause to avoid disruptions to your business. You may be billed for overages in cases of significant excess usage. If you consistently require a higher limit, contact your sales representative to upgrade your plan with a custom limit. 

> info ""
> There is a hard limit of 100 million entity rows that causes syncs to pause. 