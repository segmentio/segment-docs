---
title: Journeys Product Limits
plan: engage-foundations
---

This page outlines the current limitations for Event-Triggered (V2) Journeys.

## General limits

| Name                | Limit                                   | Description                                                                                                                |
| ------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Steps               | 25                                      | Maximum number of steps per journey.                                                                                       |
| Journey name        | 73 characters                           | Maximum length for Journey names. Names must be unique.                                                                    |
| Step name           | 73 characters                           | Maximum length for step names.                                                                                             |
| Branch name         | 73 characters                           | Maximum length for branch names within a split step. Branch names must be unique across the journey.                       |
| Additional branches | 5                                       | Maximum number of branches supported in a split or Hold Until step.                                                        |
| Delay duration      | Minimum: 5 minutes<br>Maximum: 6 months | Allowed time range for Delay and Hold Until steps.                                                                         |
| Unique identifier   | 500 characters                          | For “Re-enter every time event occurs” rules, you must define a unique identifier. The value is limited to 500 characters. |


## Throughput

| Name                      | Limit                              | Description                                                                                                                 |
| ------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Requests per second (RPS) | 25 events/sec/profile              | Maximum events per second per Segment ID. Timer events are excluded. Excess events get dropped.                             |
| Instances per profile     | 25 concurrent instances            | Maximum concurrent Journey instances per profile.                                                                           |
| Loop back branch          | 100 instances                      | Maximum instances that can pass through a Wait Until loop-back.                                                             |

## Journey context

| Name                      | Limit                              | Description                                                                                                                 |
| ------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Journey context object    | No limit (subject to payload size) | No object limit in Journey context, but must remain within the 32 KB payload limit.                                         |
| Event name conflicts      | Must be unique unless aliased      | Duplicate event names in the Journey context will overwrite each other unless aliased using `[event_name] + [branch_name]`. |

## Send to destination

| Name | Limit | Description |
|------|-------|-------------|
| Supported destinations | [Action Destinations only](https://segment.com/docs/connections/destinations/actions/) | Only Action Destinations are supported in Journeys 2.0. |
| Activations | 5 per Destination step | Maximum number of Activations supported per Destination step. |
| Destination key | 31 characters | Auto-generated and not editable. Based on `{Journey_Name} + {Destination_Step_Name} + {Unique_Step_State_Key}`. |
| Destination event name | 73 characters | Can be customized. Defaults to the destination step name. Event names do not need to be unique. Use the Sync Key for disambiguation. |
| Payload size | 32 KB (~700 lines) | Maximum allowed size of the payload sent to destinations. |
| Parameter mappings | 100 mappings | Maximum number of field mappings per Destination step. For more info, see [FAQs & Best Practices for Journeys 2.0](https://twilio-productivity.atlassian.net/wiki/spaces/MSRND/pages/772571588/FAQs+Best+Practices+for+Journeys+2.0#How-do-Journeys-affect-Destination-mapping-limits%3F). |

---

## Analytics

| Name | Limit | Description |
|------|-------|-------------|
| Journey instance data (in progress) | 365 days | Maximum duration an instance can remain active before expiring. |
| Journey instance data (completed) | 90 days | Data retention period after a profile completes or exits the Journey. |
| Analytics data | 3 years | Retention period for metrics data. |
| Observability data | 3 years | Retention period for step activity and timeline data. |
| Date range | 180 days | Maximum date range allowed for analytics queries. |
| Timeout limit | 10 seconds | Maximum time an analytics query will run. |
| Metric latency | 10 seconds | Expected delay before metrics update. Can increase with large volumes. 95% of events are targeted to appear in the UI within 30 minutes. |
| Update metrics | Manual browser refresh required | Analytics do not update dynamically. Refresh required to see updates. |

---

## Privacy and compliance

| Topic | Details |
|-------|---------|
| PII access | [Learn more](https://segment.com/docs/segment-app/iam/roles/#pii-access) |
| HIPAA eligibility | [HIPAA-Eligible Services](https://www.twilio.com/content/dam/twilio-com/global/en/other/hipaa/pdf/HIPAA-Eligible-Services.pdf) |
| GDPR & BCR | [Complying with the GDPR](https://segment.com/docs/privacy/complying-with-the-gdpr/) |

Segment complies with GDPR through Binding Corporate Rules (BCR). When a customer churns, BCR-initiated deletion removes the customer’s workspace and data. Customers can request access to, correction of, or deletion of personal data.

---
