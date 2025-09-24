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
 Business | 40 x the number of MTUs or 0.4 x the number of monthly API calls | Contact your sales rep to upgrade your plan  

If you have a non-standard or high volume usage plan, you have unique Linked Audiences limits or custom pricing.

## Product limits

Name | Limit | Details 
---- | ----- | --------
RETL row limit | 150 million | The audience compute fails if the total output exceeds the limit. This limit is the sum of the total linked audience profile membership count and the total number of entity relationships for the profiles in the audience.
RETL column limit | 500 columns | The audience compute fails if the number of columns exceeds the limit. 
Audience event throughout | 500 RPS per audience | At an individual audience-level, Linked Audiences emit profile change events at 500 RPS. If you need a higher limit, contact [friends@segment.com](mailto:friends@segment.com){:target="_blank"}.
Global audience event throughout | 1.5K RPS within any given space | At the global space-level (across all the audiences in your space), Linked Audiences emit profile change events at 1.5K RPS. If you need a higher global limit, contact [friends@segment.com](mailto:friends@segment.com){:target="_blank"}.
Global concurrent audience runs | 5 total within any given space | New audience runs are queued once the limit is reached and will start execution once prior audience runs complete. If you need a higher global concurrent audience runs limit, contact [friends@segment.com](mailto:friends@segment.com){:target="_blank"}.
Event Size | 32 KB | Segment doesn’t emit messages for profiles whose total related entities and enrichments exceed the limit.
Data Graph depth | 6 | You can't save a Data Graph if you exceed the limit. 
Preview size | 3K rows | The maximum number of rows you can have to generate a preview. The preview fails if you bring back too many entities. 
Entity value type ahead cache | Up to 100 unique values | The maximum number of entity values Segment stores in cache. 
Entity columns | Up to 1000 unique values | The maximum number of entity property columns Segment surfaces in the condition builder.
Run frequency | 15 minutes (this is the fastest time) | You can’t configure more frequency syncs. You can select **Run Now** to trigger runs, but you’re limited by Profiles Sync for when new data syncs back to the data warehouse.
Destination Mappings | Up to 100 mappings | You can set up to 100 action destination mappings per destination instance.

## Warehouse setup and performance guidance

To get the best performance from Linked Audiences at scale, Segment recommends setting up a dedicated warehouse cluster. This helps avoid resource contention and makes query performance more predictable, especially when running frequent or complex audience syncs.

Most workloads running on a dedicated cluster should complete within 60 minutes per sync cycle. Staying under this threshold helps keep audiences fresh and aligned with downstream activation schedules.

Segment has tested Linked Audiences at enterprise scale with over 30 audiences running concurrently, each targeting millions of entities. However, actual performance and cost varies based on how your Data Graph is structured, how many audiences you run at once, and how frequently they sync. Complex joins, deep relationships, and high concurrency can all increase query time and warehouse usage.

To improve performance and manage compute costs, follow these best practices:

- Use materialized views when configuring Data Graph to reduce compute overhead.
- Keep your Data Graph focused by avoiding unused entities or overly deep relationship chains.
- Simplify audience conditions and avoid high-cardinality joins when possible.
- Run on a dedicated warehouse cluster if you're operating at enterprise scale.
- Stagger audience sync schedules to reduce concurrency and avoid bottlenecks.

Following these guidances help you keep audience syncs running efficiently even as your scale grows.
