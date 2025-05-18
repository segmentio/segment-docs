---
title: ChartMogul (Actions) Destination
id: 65f9888628c310646331738a
---


{% include content/plan-grid.md name="actions" %}

[ChartMogul](https://chartmogul.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is a subscription analytics platform and CRM used by thousands of businesses to measure, understand, and grow their recurring revenue businesses.

This destination is maintained by ChartMogul. For any issues with the destination, [contact their Support team](https://help.chartmogul.com/hc/en-us/requests/new){:target="_blank"}.

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "ChartMogul".
2. Select ChartMogul and click **Add Destination**.
3. Select an existing Source to connect to ChartMogul (Actions).
4. [Create a source](https://app.chartmogul.com/#/data-platform/sources/add-source){:target="_blank"} in ChartMogul.
5. Make sure the **Account / Contact / Enrichment data** tab is selected and click **Twilio Segment**.
6. Enter the **Name** for your source.
7. Under **Create a company in ChartMogul when** select:
   - **the email or UserID is created** — if you recognize any individual who interacts with your organization as a lead and want to create a [customer record](https://help.chartmogul.com/hc/en-us/articles/214085765){:target="_blank"} for them
   - **user is added to a company** — if you recognize an individual who interacts with your organization as a lead only if they're part of an organization
8. Copy the **Webhook URL**.
9. Click **SAVE AND CONTINUE CONFIGURATION IN SEGMENT**.
10. Paste the **Webhook URL** in the ChartMogul destination settings in Segment.

{% include components/actions-fields.html %}

## Supported event calls
ChartMogul (Actions) accepts two types of event calls:
- [Identify](https://segment.com/docs/connections/spec/identify/){:target="_blank"} — used for contact details
- [Group](https://segment.com/docs/connections/spec/group/){:target="_blank"} — used for customer details
  
ChartMogul uses attributes from these calls to create new or update existing [custom attributes](https://help.chartmogul.com/hc/en-us/articles/206120219){:target="_blank"} for contacts or customers, or to update customers' select [standard attributes](https://help.chartmogul.com/hc/en-us/articles/5321255006364#standard-attributes){:target="_blank"}.
