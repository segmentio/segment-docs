---
title: Personas Default Limits
redirect_from: '/personas/rate-limits'
---

Segment Personas enforces a set of default use and rate limits to help ensure the performance and reliability of the Personas product. These limits are designed to provide consistent, reliable performance at scale. Most customers do not exceed these limits.

Contact your dedicated Customer Success Manager or [friends@segment.com](mailto:friends@segment.com) to learn more about custom limits.

## Default Limits

<table id="limit">
<thead>
<tr>
<th style="width:25%">Name</th>
<th style="width:25%">Limit</th>
<th style="width:50%">Details</th>
</tr>
</thead>
<tbody>
<tr>
<td>Inbound Data Throughput</td>
<td>1000 events per second</td>
<td>The total stream of events from the sources connected to Personas. Once the limit is reached, Segment reserves the right to slow the processing of requests. This limit also includes historical data replays into Segment.</td>
</tr>
<tr>
<td>Outbound Downstream Destination Rate Limits</td>
<td>Reduced retries when failures exceed 1000 events per second</td>
<td>Most destinations have their own rate limits that Segment cannot control. In some instances, Segment can ingest and attempt to deliver data faster than the downstream destination can accept data. Outbound requests to a destination may also fail for other reasons outside of Segment’s control. 
<br /><br />
When requests to downstream destinations fail, Segment makes additional attempts to deliver the data (retries). However, when more than 1,000 requests per second to a downstream destination fail or when the failure rate for a downstream destination exceeds 50% for more than 72 hours, Segment reserves the right to reduce the number of retries until the condition is resolved.</td>
</tr>
</tbody>
</table>

## Profile API

<table id="limit">
<thead>
<tr>
<th style="width:25%">Name</th>
<th style="width:25%">Limit</th>
<th style="width:50%">Details</th>
</tr>
</thead>
<tbody>
<tr>
<td>Profile API Throughput</td>
<td>100 requests per second</td>
<td>If requests exceed 100 per second, the Profile API returns HTTP Error 429.</td>
</tr>
<tr>
<td>Events Lookback History</td>
<td>14 days</td>
<td>The Profile API retrieves up to 14 days of a profile’s historical events within a collection. This applies to track events, not traits sent through identify calls.</td>
</tr>
</tbody>
</table>

## Identity

<table id="limit">
<thead>
<tr>
<th style="width:25%">Name</th>
<th style="width:25%">Limit</th>
<th style="width:50%">Details</th>
</tr>
</thead>
<tbody>
<tr>
<td>Identity Merges</td>
<td>100 merges</td>
<td>Personas supports up to 100 merges per profile in its identity graph. A merge occurs when two existing profiles are joined together by a common `external_id`. For example, if a user starts on mobile, and then signs in through a web application, those two user profiles are joined together by a common identifier like a `user_id`. Messages that attempt additional merges are usually a sign of a corrupt profile and are dropped.
<br /><br />
Once the limit is reached, Segment rejects additional events.</td>
</tr>
<tr>
<td>Identity Mappings</td>
<td>1000 mappings</td>
<td>Personas supports up to 1000 mappings per profile in its identity graph. Mappings are external identifier values like a user_id, email, mobile advertising id, or any custom identifier. 
<br /><br />
Messages that attempt to more than 1000 mappings are usually a sign of a corrupt profile and are dropped. This limit counts mappings across all merged profiles.</td>
</tr>
</tbody>
</table>

## Audiences and Computed Traits

<table id="limit">
<thead>
<tr>
<th style="width:25%">Name</th>
<th style="width:25%">Limit</th>
<th style="width:50%">Details</th>
</tr>
</thead>
<tbody>
<tr>
<td>Compute Concurrency</td>
<td>5 concurrent audiences</td>
<td>Segment computes five new audiences or computed traits at a time. Once the limit is reached, additional audience computations are queued until one of the 5 audiences finishes computing.</td>
</tr>
<tr>
<td>Compute Throughput</td>
<td>10000 computations per second</td>
<td>Computations are counted as any track or identify call that triggers an audience or computed trait re-computation.
<br /><br />
Once the limit is reached, Segment reserves the right to slow the processing of an audience.</td>
</tr>
<tr>
<td>Events Lookback History</td>
<td>Depends on your Personas service:
<br /><br />
- **Essentials**: 1 year
<br />
- **Advanced**: 3 years
</td>
<td>The period of time for which events stored for audience & computed trait computations. 
<br /><br />
This limit is based on your Personas service. Contact your account team to upgrade your Personas service.</td></tr>
</tbody>
</table>

## SQL Traits

<table id="limit">
<thead>
<tr>
<th style="width:25%">Name</th>
<th style="width:25%">Limit</th>
<th style="width:50%">Details</th>
</tr>
</thead>
<tbody>
<tr>
<td>SQL Traits</td>
<td>Depends on your Personas service:
<br /><br />
- Essentials: 5
<br />
- Advanced: 25

</td>
<td>The number of SQL traits you can sync to your Personas space.
<br /><br />
Contact your account team to upgrade your Personas service.</td>
</tr>
<tr>
<td>SQL Traits - Sync Frequency</td>
<td>Depends on your Personas service:
<br /><br />
- **Essentials**: Twice daily
<br />
- **Advanced**: Customizable, up to Hourly</td>
<td>The frequency with which Segment runs your SQL trait
<br /><br />
Contact your account team to customize your schedule.</td>
</tr>
<tr>
<td>SQL Traits - Rows</td>
<td>10 million</td>
<td>The number of rows each SQL trait can return.</td>
</tr>
<tr>
<td>SQL Traits - Columns</td>
<td>25</td>
<td>The number of columns each SQL trait can return.</td>
</tr>
</tbody>
</table>


## Journeys


In addition to the [Personas Default Limits](#default-limits), Journeys enforces a set of default limits to ensure the reliability and performance of the feature.

| Item          | Limit description                | Details                                                                                                                                                                                                                                                                               |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Journeys      | 10 Journeys per workspace        | This applies to active, concurrent Journeys. <br><br>Once the limit is reached, you cannot publish any additional Journeys. You will still be able to create draft Journeys.                                                                                               |
| Journey steps | 20 steps per Journey             | This applies to certain steps:<br><br>- Initial cohort: 1<br>- Wait for condition: 1<br>- True / False Split: 1<br>- Multi-Branch Split: Number of branches<br>- Send to Destinations: 1<br><br>Once the limit is reached, you will be unable to add additional steps to the Journey. |
| Journey Name  | Maximum length of 73 characters  | Once the limit is reached, you cannot add additional characters to the name.                                                                                                                                                                                               |
| Step Name     | Maximum length of 170 characters | Once the limit is reached, you cannot add additional characters to the name.                                                                                                                                                                                               |
| Key           | Maximum length of 255 characters | Once the limit is reached, you cannot add additional characters to the key.                                                                                                                                                                                                |
