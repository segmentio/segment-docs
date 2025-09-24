# 💥 Segment Partner Actions Destination Documentation Template
---
title: Amazon EventBridge (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

> (delete after reading) Include a 1-2 sentence introduction to your company and the value it provides to customers - updating the name and hyperlink. Please leave the utm string unchanged.

[Amazon EventBridge (Actions)](https://yourintegration.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is a serverless event bus that routes real-time data between applications, AWS services, and SaaS tools — making it easy to build scalable, event-driven systems without custom integration code.

This destination is maintained by Segment. For any issues with the destination, [contact the Segment Support team](mailto:friends@segment.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Amazon EventBridge (Actions)".
2. Select Amazon EventBridge (Actions) and click **Add Destination**.
3. Choose the Source you want to connect to Amazon EventBridge (Actions).
4. In your AWS account, find the EventBridge event bus. Copy your AWS Account ID, then paste it into the AWS Account ID field in Segment.
5. In Segment, select the appropriate **AWS Region** for your EventBridge destination.
6. Go to the Mappings tab, click New Mapping, then choose the **Send** mapping type. Configure your trigger and field mappings as needed.
7. Before saving your mapping, click the **Create Partner Source** button. This step is required. Without it, data will not flow to EventBridge.
8. Save and enable your Mapping. 
9. Enable the Destination

{% include components/actions-fields.html %}