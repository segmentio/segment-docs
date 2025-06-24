---
title: Journeys (V2) Product Limits
plan: engage-foundations
---

This page outlines product limitations for Event-Triggered (V2) Journeys.

## General limits

| Name                | Limit                                   | Description                                                                                                                |
| ------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Steps               | 25                                      | Maximum number of steps per journey.                                                                                       |
| Journey name        | 73 characters                           | Maximum length for Journey names. Names must be unique.                                                                    |
| Step name           | 73 characters                           | Maximum length for step names.                                                                                             |
| Branch name         | 73 characters                           | Maximum length for branch names within a split step. Branch names must be unique across the journey.                       |
| Additional branches | 5                                       | Maximum number of branches supported in a split or Hold Until step.                                                        |
| Delay duration      | Minimum: 5 minutes<br>Maximum: 182 days | Allowed time range for Delay and Hold Until steps.                                                                         |
| Unique identifier   | 500 characters                          | For “Re-enter every time event occurs” rules, you must define a unique identifier. The value is limited to 500 characters. |


## Throughput

| Name                      | Limit                   | Description                                                                                                                     |
| ------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Requests per second (RPS) | 25 events/sec/profile   | Maximum events per second per Segment ID. Timer events are excluded. Excess events get dropped.                                 |
| Instances per profile     | 25 concurrent instances | Maximum concurrent Journey instances per profile.                                                                               |
| Send profiles back branch | 100 instances           | Maximum count a single journey instance can pass through a Wait Until Send profiles back to the beginning of this step' branch. |

## Journey context

| Name                      | Limit                              | Description                                                                                                                 |
| ------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Journey context object    | No limit (subject to payload size) | No object limit in Journey context, but must remain within the 32 KB payload limit.                                         |
| Event name conflicts      | Must be unique unless aliased      | Duplicate event names in the Journey context will overwrite each other unless aliased using `[event_name] + [branch_name]`. |

## Send to destination

| Name                   | Limit                                                               | Description                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Supported destinations | [Action destinations only](/docs/connections/destinations/actions/) | Segment only supports Action Destinations, Action List destinations, and Destination Functions in Journeys 2.0.                                        |
| Activations            | 5 per destination step                                              | Maximum number of Activations supported per destination step.                                                                                          |
| Destination key        | 31 characters                                                       | Segment auto-generates destination keys; they're not editable.                                                                                         |
| Destination event name | 73 characters                                                       | Can be customized. Defaults to the destination step name. Event names do not need to be unique. Use the Sync Key (Computation Key) for disambiguation. |
| Payload size           | 32 KB (~700 lines)                                                  | Maximum allowed size of the payload sent to destinations.                                                                                              |
| Parameter mappings     | 100 mappings                                                        | Maximum number of field mappings per destination step.                                                                                                 |


## Data retention

| Name                                            | Limit                           | Description                                                                                                                              |
| ----------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Journey instance data (while in progress)       | 365 days                        | Maximum duration an instance can remain active before expiring.                                                                          |
| Journey instance data (after completed or exit) | 90 days                         | Data retention period after a profile completes or exits the journey.                                                                    |
| Analytics data                                  | 3 years                         | Retention period for metrics data.                                                                                                       |
| Observability data                              | 3 years                         | Retention period for step activity and timeline data.                                                                                    |

## Analytics

| Name           | Limit                           | Description                                                                                                                                      |
| -------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Date range     | 180 days                        | Maximum date range allowed for analytics queries.                                                                                                |
| Timeout limit  | 10 seconds                      | Maximum time an analytics query will run.                                                                                                        |
| Metric latency | 10 seconds                      | Expected delay before metrics update. Can increase with large volumes; 95% of events are targeted to appear in your workspace within 30 minutes. |
| Update metrics | Manual browser refresh required | Analytics don't update dynamically. You'll need to refresh to see updates.                                                                       |


## Privacy and compliance

| Topic             | Details                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| PII access        | See [PII access](docs/segment-app/iam/roles/#pii-access) for more information.                                                                   |
| HIPAA eligibility | [HIPAA-Eligible Services](https://www.twilio.com/content/dam/twilio-com/global/en/other/hipaa/pdf/HIPAA-Eligible-Services.pdf){:target="_blank"} |
| GDPR & BCR        | See [Complying with the GDPR](/docs/privacy/complying-with-the-gdpr/) for more information.                                   |

Segment complies with GDPR through Binding Corporate Rules (BCR). When a customer churns, BCR-initiated deletion removes the customer’s workspace and data. To request access to, correction of, or deletion of personal data, reach out to [Segment support](mailto:friends@segment.com).