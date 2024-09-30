---
title: Linked Audiences Limits
plan: engage-foundations
---

> info ""
> Linked Audiences is an add-on to Twilio Engage. To use [Linked Audiences](/docs/engage/audiences/linked-audiences), you must have access to Engage.

To provide consistent performance and reliability at scale, Segment enforces default use limits for Linked Audiences.

## Usage limits
The Linked Audiences module provides you the flexibility to create and publish unlimited Linked Audiences within each billing cycle. This means you won't encounter any limitations or pauses in service related to the number of Linked Audiences you generate.

Linked Audience limits are measured based on Activation Events, which is the number of times profiles are processed to each destination, including audience entered, audience exited, and entity change events. This includes both successful and failed attempts. For example, if you processed an audience of 50k to Braze and Google Ads Conversions, then your total Activation Event usage is 100k records.

Your plan includes a high limit of Activation Events, which ensures that the vast majority of users can use Linked Audiences freely without needing to worry about the limit. 

 To see how many Activation Events you’ve processed using Linked Audiences, navigate to **Settings > Usage & billing** and select the **Linked Audiences** tab. If your limit is reached before the end of your billing period, your syncs won't automatically pause to avoid disruptions to your business. You may be billed for overages in cases of significant excess usage. If you consistently require a higher limit, contact your sales representative to upgrade your plan with a custom limit.

 Plan | Linked Audiences Limit | How to increase your limit
 ---- | ---------------------- | ---------------------------
 Free | Not available for purchase | N/A
 Team | Not available for purchase | N/A
 Business | 40 x the number of MTUs or .25 x the number of monthly API calls | Contact your sales rep to upgrade your plan  

If you have a non-standard or high volume usage plan, you have unique Linked Audiences limits or custom pricing.

## Product limits

Name | Limit | Details 
---- | ----- | --------
RETL row limit | 30 million | The audience compute fails if the total output exceeds the limit. 
RETL column limit | 500 columns | The audience compute fails if the number of columns exceeds the limit. 
Global concurrent audience computation executions | 5 total within any given space | New audience computations are delayed once the limit is reached. 
TAPI Event Size | 32 KB | Segment drops events at the ingest and doesn't emit messages for profiles whose total related entities and enrichments exceed the limit. This limit is not enforced by RETL. Check the size of your downstream destination as they are also limited.  
Data Graph depth | 6 | You can't save a Data Graph if you exceed the limit. 
Preview size | 1K rows | The maximum number of rows you can have to generate a preview. The preview fails if you bring back too many entities. 
Entity value type ahead cache | Up to 100 unique values | The number of entity values you can store in your cache. 
Entity columns | Up to 200 unique values | The number of entity columns you can have. 
Entity context relationship sizes | Unlimited | The size of the entity relationship. 
Run frequency | 15 minutes (this is the fastest time) | You can’t configure more frequency syncs. You can select **Compute Now** to trigger runs, but you’re limited by Profiles Sync for when new data syncs back to the data warehouse. 

