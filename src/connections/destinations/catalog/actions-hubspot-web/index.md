---
title: HubSpot Web (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 631a1c2bfdce36a23f0a14ec
versions:
  - name: 'HubSpot Cloud Mode (Actions)'
    link: '/docs/connections/destinations/catalog/actions-hubspot-cloud'
  - name: 'HubSpot (Classic)'
    link: '/docs/connections/destinations/catalog/hubspot'
---

{% include content/plan-grid.md name="actions" %}

HubSpot is an all-in-one marketing tool that helps attract new leads and converts them into paying customers, with features like landing page creation and email automation.

When you use the HubSpot Web (Actions) destination, Segment loads the [HubSpot tracking code](https://developers.hubspot.com/docs/api/events/tracking-code){:target="_blank"} for you. In addition to tracking page views, the HubSpot tracking code allows you to identify visitors, track events, and manually track page views without reloading the page. The tracking code API allows you to dynamically create events and track event data in HubSpot.

## Benefits of HubSpot Web (Actions) vs HubSpot Classic
HubSpot Web (Actions) provides the following benefits over the classic HubSpot destination:

- **Fewer settings.** Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data.** Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to the destination.
- **Granular control over data sent.** You can customize the conditions under which the events are sent to HubSpot.
- **Support for custom behavioral events**. Send [custom behavioral events](https://developers.hubspot.com/docs/api/events/tracking-code#tracking-custom-behavioral-events-marketing-hub-enterprise-only-){:target="_blank"} and event properties to HubSpot.
- **Improved tracking for single-page apps**. Keep track of page views in a single-page application without reloading the tracking code.

## Getting Started

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for **HubSpot Web (Actions)** in the Destinations Catalog, and select the destination.
3. Click **Configure HubSpot Web (Actions)**.
4. Select the web source that will send data to HubSpot Web (Actions) and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/).
5. On the **Settings** tab, input your HubSpot Hub ID and configure the other destination settings.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).
7. Enable the destination and configured mappings.

{% include components/actions-fields.html settings="true"%}

## FAQ & Troubleshooting

### Why aren't my custom behavioral events appearing in HubSpot?
HubSpot has several limits for custom behavioral events, including a limit on the number of event properties per event. Each event can contain data for up to 50 properties. If this limit is exceeded, HubSpot will truncate to only update 50 properties per event completion. See [HubSpot documentation](https://knowledge.hubspot.com/analytics-tools/create-custom-behavioral-events#define-the-api-call){:target="_blank"} for other limits.

> note ""
> A HubSpot Enterprise Marketing Hub account is required to send Custom Behavioral Events.