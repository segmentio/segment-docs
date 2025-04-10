---
title: Ortto (Actions) Destination
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[Ortto](https://ortto.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} helps thousands of organizations worldwide automate their communications — including email newsletters, abandoned cart emails, SMS messages, and more — to accelerate marketing and business growth.

Once Segment is connected to Ortto, you can take advantage of Ortto's powerful [campaign](https://help.ortto.com/user/latest/campaigns/){:target="_blank"} features on your Segment customer data.

This destination is maintained by Ortto. For support or questions, [contact](mailto:help@ortto.com) the Ortto Support team.


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Ortto Segment destination. There's also a page about the [non-Actions Ortto destination](/docs/connections/destinations/catalog/autopilotapp/). Both of these destinations receives data from Segment.



## Ortto (Actions) provides the following benefits over the classic Ortto destination:

- **Granular control and flexibility**. Map any Segment event type to specific Ortto actions with full control over field mappings. This lets you tailor how and when customer data is sent to Ortto, ensuring more accurate and relevant automations.
- **Audience syncing**. Ortto (Actions) lets you sync computed audiences from Segment Engage directly into Ortto, enabling precise activation of rich, behavior-based audiences—ideal for lifecycle marketing, retargeting, and personalization at scale. You can also manually create or select existing audiences in Ortto and dynamically add or remove contacts as part of profile upserts or activity tracking, giving you full control over audience membership in real time.
- **Improved transparency and debugging**. Because Ortto (Actions) uses direct API calls to Ortto’s endpoints, it provides clearer delivery status and error messages to help teams troubleshoot faster and ensure data integrity.
- **Future-proofed**. Built on Segment’s modern Destination Actions framework, Ortto (Actions) will receive ongoing updates and support for new features, while the classic destination remains static.


## Getting started

1. In the Segment web app, go to **Connections > Catalog**, then open the **Destinations** tab.
2. Search for **Ortto (Actions)**, select it, and then add the destination.
3. Choose the existing Source you want to connect to **Ortto (Actions)**.
4. Name your destination. You can either configure the settings manually or copy them from an existing instance, then create a new destination.
5. [Log in](https://ortto.app/login){:target="_blank"} to your Ortto account and add a new **Segment (Actions)** data source, or use an existing one.
6. Copy the API key from the data source and paste it into the destination **Settings** in Segment.


{% include components/actions-fields.html %}

## Notes

- All events sent through the supported actions must include either the `User ID` or `Anonymous ID` fields, regardless of whether these are set as [Unique Identifiers](https://help.ortto.com/a-55-unique-identifiers){:target="_blank"} in Ortto.
- Ortto (Actions) and Ortto Classic are subject to the same [rate limits](https://help.ortto.com/segment-integration#Rate-limits){:target="_blank"}. Profile upserts, audience entry requests, and activity tracking events that include contact traits are all treated as identify events.