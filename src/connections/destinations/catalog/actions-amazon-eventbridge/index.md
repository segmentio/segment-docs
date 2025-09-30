---
title: Amazon EventBridge (Actions) Destination
id: 67be4b2aef865ee6e0484fe5
beta: true
hidden: false
---

{% include content/plan-grid.md name="actions" %}

[Amazon EventBridge (Actions)](https://yourintegration.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a serverless event bus that routes real-time data between applications, AWS services, and SaaS tools — making it easy to build scalable, event-driven systems without custom integration code.

Segment maintains this destination. For any issues with the destination, [contact the Segment Support team](mailto:friends@segment.com){:target="_blank”}.

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Amazon EventBridge (Actions)".
2. Select "Amazon EventBridge (Actions)" and click **Add destination**.
3. Choose the source you want to connect to Amazon EventBridge (Actions) and create the destination.
4. In your AWS account, find the EventBridge event bus. Copy your AWS Account ID, then paste it into the AWS Account ID field in the destination settings in Segment.
5. Select the appropriate **AWS Region** for your EventBridge destination and save the changes.
6. Go to the Mappings tab, click **+ New Mapping**, then choose the **Send** mapping type. Configure your event trigger and field mappings as needed.
7. (**Required**:) Before saving your mapping, create a Partner Source. This creates a new EventBridge Partner Event Source in your AWS account if it does not already exist. The source name is
`aws.partner/segment.com/SEGMENT_SOURCE_ID`. If you don't complete this step, data won't flow to EventBridge.
8. (Optional:) Once the EventBridge Partner Event Source is created in your AWS account, you can associate the source with the [EventBridge Event Bus](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html){:target="_blank”}.
9. Save and enable your mappings. 
10. Enable the destination in settings to send data to Amazon EventBridge.

{% include components/actions-fields.html %}
