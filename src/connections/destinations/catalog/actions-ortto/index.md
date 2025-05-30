---
title: Ortto (Actions) Destination
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[Ortto](https://ortto.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} helps thousands of organizations worldwide automate their communications — including email newsletters, abandoned cart emails, SMS messages, and more — to accelerate marketing and business growth.

Once Segment is connected to Ortto, you can take advantage of Ortto's powerful [campaign](https://help.ortto.com/user/latest/campaigns/){:target="_blank"} features on your Segment customer data.

This destination is maintained by Ortto. For support or questions, [contact the Ortto Support team](mailto:help@ortto.com).


> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Ortto Segment destination. There's also a page about the [non-Actions Ortto destination](/docs/connections/destinations/catalog/autopilotapp/). Both of these destinations receives data from Segment. Ortto (Actions) and Ortto Classic are subject to the same [rate limits](https://help.ortto.com/segment-integration#Rate-limits){:target="_blank"}. Profile upserts, audience entry requests, and activity tracking events that include contact traits are all treated as identify events.



## Ortto (Actions) provides the following benefits over the classic Ortto destination:

- **Granular control and flexibility**: Map any Segment event type to specific Ortto actions with full control over field mappings. This lets you tailor how and when customer data is sent to Ortto, ensuring more accurate and relevant automations.
- **Improved transparency and debugging**: Because Ortto (Actions) uses direct API calls to Ortto’s endpoints, it provides clearer delivery status and error messages to help teams troubleshoot faster and ensure data integrity. It also supports HTTP [multi-status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/207){:target="_blank"} responses, allowing multiple outcomes to be returned in a single response—this means partial successes or failures can be clearly identified, reducing the risk of silent data loss and making debugging more efficient.
- **Future-proofed**: Built on Segment’s modern Destination Actions framework, Ortto (Actions) will receive ongoing updates and support for new features, while the classic destination remains static.


## Getting started

1. In the Segment web app, go to **Connections > Catalog**, then open the **Destinations** tab.
2. Search for **Ortto (Actions)**, select it, and then add the destination.
3. Choose the existing Source you want to connect to **Ortto (Actions)**.
4. Name your destination. You can either configure the settings manually or copy them from an existing instance, then create a new destination.
5. [Log in](https://ortto.app/login){:target="_blank"} to your Ortto account and add a new **Segment (Actions)** data source, or use an existing one.
6. Copy the API key from the data source and paste it into the destination **Settings** in Segment.

{% include components/actions-fields.html %}

> warning "All events must contain an identifier"
> All events sent through the supported actions must include either the `User ID` or `Anonymous ID` fields, regardless of whether these are set as [Unique Identifiers](https://help.ortto.com/a-55-unique-identifiers){:target="_blank"} in Ortto.

> [!IMPORTANT]

## Audience Membership

**Ortto (Actions)** allows you to sync your Segment users with an Ortto Audience, enabling precise activation of rich, behavior-based segments—perfect for lifecycle marketing, retargeting, and large-scale personalization. You can manually create new audiences or use existing ones in Ortto, and dynamically add or remove contacts through profile upserts or activity tracking. This gives you real-time control over audience membership.

To prevent excessive churn, audience membership in Ortto is protected from frequent updates. When too many enter/exit events are received from Segment, Ortto aggregates these changes and updates the contact’s final audience state once per day.

> info "Ortto audience names must be unique"
> Segment audience names in Ortto are case-sensitive and must be unique. If you enter the name of an existing audience during action setup, contacts will be synced to the existing audience in Ortto.


