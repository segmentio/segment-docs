---
title: Braze Cloud Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 60f9d0d048950c356be2e4da
versions:
  - name: 'Braze Web Mode (Actions)'
    link: '/docs/connections/destinations/catalog/braze-web-device-mode-actions/'
  - name: 'Braze (Classic)'
    link: '/docs/connections/destinations/catalog/braze'
---
{% include content/plan-grid.md name="actions" %}

[Braze](https://www.braze.com/){:target="_blank"}, formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Braze Segment destination. There's also a page about the [non-Actions Braze destination](/docs/connections/destinations/catalog/braze/). Both of these destinations receives data _from_ Segment. There's also the [Braze source](/docs/connections/sources/catalog/cloud-apps/braze//), which sends data _to_ Segment!

## Benefits of Braze Cloud Mode (Actions) vs Braze Classic

Braze Cloud Mode (Actions) provides the following benefit over Braze Classic:

- **E-commerce mappings**. Segment implementations that don't follow the e-commerce spec due to incompatible event names (for example, Trip Booked vs Order Completed) can use Event Triggers to log purchases in Braze Cloud Mode (Actions).

## Getting Started

1. From the Segment web app, click **Catalog**.
2. Search for "Braze" in the Catalog, select **Braze Cloud Mode (Actions)**, and choose which of your sources to connect the destination to.
3. Add the following Connection Settings:
   - **API Key**: Created under Developer Console in the Braze Dashboard.
   - **App ID**: The app identifier used to reference specific Apps in requests made to the Braze API. Created under Developer Console in the Braze Dashboard.
   - **REST Endpoint**: Your Braze REST Endpoint. For more information, see [API Overview](https://www.braze.com/docs/api/basics/){:target="_blank"} in the Braze documentation.

> info ""
> Braze requires that you include a `userId` or `braze_id` for all calls made in cloud-mode. Segment sends a `braze_id` if the `userId` is missing. When you use a device-mode connection, Braze automatically tracks anonymous activity using the `braze_id` if a `userId` is missing.

> info "V2 Actions"
> The V2 versions of each action include improved sync mode support. Only valid sync modes for each action will be available. Because of this the `_update_existing_only` parameter is now tied to the sync mode you select for the mapping. If you select the `update` sync mode, we will always pass `_update_existing_only: true` to Braze, and if you choose the `add` sync mode, we will always pass `_update_existing_only: false` to Braze.

{% include components/actions-fields.html settings="true"%}

## Migration from Braze Classic

Keep the following in mind if you plan to move to Braze (Actions) from the classic Braze destination.
{% include components/actions-map-table.html name="braze-cloud" %}

## Troubleshooting

### Missing required fields
Braze requires one of either `external_id`, `user_alias`, or `braze_id` to be present in all events sent. If events are failing to send, please check your event mappings to make sure these fields are resolving to valid values.

### Missing events
When an event is sent under an alias, the event may seem to be missing when the alias cannot be found in Braze. This may be due to incorrect search for the alias in Braze. To search for an alias in Braze, use the format "Alias Label:Alias Name". For example, if the "Alias Label" field is set as email and "Alias Name" field is set as email address (for example: "test@email.com"), use "email:test@email.com" to search for the alias in Braze.
