---
title: Braze Cloud-Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 60f9d0d048950c356be2e4da
redirect_from: 
  - '/connections/destinations/catalog/braze-cloud-mode-actions/'
versions:
  - name: 'Braze Web-Mode (Actions)'
    link: '/docs/connections/destinations/catalog/actions-braze-web/'
  - name: 'Braze (Classic)'
    link: '/docs/connections/destinations/catalog/braze'
---
{% include content/plan-grid.md name="actions" %}

[Braze](https://www.braze.com/){:target="_blank"}, formerly Appboy, is an engagement platform that empowers growth by helping marketing teams to build customer loyalty through mobile, omni-channel customer experiences.

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Braze Segment destination. There's also a page about the [non-Actions Braze destination](/docs/connections/destinations/catalog/braze/). Both of these destinations receives data _from_ Segment. There's also the [Braze source](/docs/connections/sources/catalog/cloud-apps/braze//), which sends data _to_ Segment!

## Benefits of Braze Cloud-Mode (Actions) vs Braze (Classic)

Braze cloud-mode (Actions) provides the following benefit over Braze (Classic):

- **E-commerce mappings**. Segment implementations that don't follow the e-commerce spec due to incompatible event names (for example, Trip Booked vs Order Completed) can use Event Triggers to log purchases in Braze cloud-mode (Actions).

## Getting started

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for "Braze" in the Catalog in the Destinations Catalog and select **Braze**.
3. Choose which of your sources to connect the destination to and follow the steps to create your destination.
4. In the **Settings** tab, add the following Connection Settings:
   - **API Key**: Created under Developer Console in the Braze Dashboard.
   - **App ID**: The app identifier used to reference specific Apps in requests made to the Braze API. Created under Developer Console in the Braze Dashboard.
   - **REST Endpoint**: Your Braze REST Endpoint. For more information, see [API Overview](https://www.braze.com/docs/api/basics/){:target="_blank"} in the Braze documentation.

> info ""
> Braze now supports sending `email` as an identifier. Braze requires that you include `userId`, `braze_id`, or `email` for all calls made in cloud-mode. Segment sends a `braze_id` if the `userId` is missing. When you use a device-mode connection, Braze automatically tracks anonymous activity using the `braze_id` if a `userId` is missing.

## Actions v2

Segment’s introduced the following v2 Actions to add functionality to the Braze cloud-mode (Actions) destination:
- [Update User Profile v2](#update-user-profile-v2)
- [Track Event v2](#track-event-v2)
- [Identify User v2](#identify-user-v2)
- [Create Alias v2](#create-alias-v2)
- [Track Purchase v2](#track-purchase-v2)

These Actions support the following features:
- **Sync modes**: Control how Segment updates your downstream destination by selecting a sync mode, or a strategy for updating your downstream data. 
- **Dynamic dropdowns**: When creating or updating a mapping in the Segment app, the dropdown auto-populates all of the available properties directly from Braze.
- **Create and modify data**: Use Sync modes to create objects in your downstream destination without having to leave the Segment app.

> warning ""
> You might need to reauthorize your Braze account to use all of the features associated with v2 Actions.

### Sync modes

Sync modes allow users to define how Segment should update the data in your destination.

Sync modes available for v2 Actions include:
- **Upsert**: Update existing records and add new ones, if necessary.
- **Add**: Add records to a list, segment, or journey.

{% include components/actions-fields.html settings="true"%}

## Migration from Braze Classic

Keep the following in mind if you plan to move to Braze (Actions) from the classic Braze destination.
{% include components/actions-map-table.html name="braze-cloud" %}

## Troubleshooting

##### Missing required fields
Braze requires one of either `external_id`, `user_alias`, or `braze_id` to be present in all events sent. If events are failing to send, check your event mappings to make sure these fields are resolving to valid values.

#### Missing events
When an event is sent under an alias, it might appear to be missing if the alias cannot be found in Braze. This might be due to an incorrect search for the alias in Braze. 

To search for an alias in Braze, use the format `Alias Label:Alias Name`. For example, if the "Alias Label" field is set as email and "Alias Name" field is set as email address, for example: "test@email.com", you should search for the alias using "email:test@email.com".
