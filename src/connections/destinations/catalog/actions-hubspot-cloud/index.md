---
title: HubSpot Cloud Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 632b1116e0cb83902f3fd717
versions:
  - name: 'HubSpot Web (Actions)'
    link: '/docs/connections/destinations/catalog/actions-hubspot-web'
  - name: 'HubSpot (Classic)'
    link: '/docs/connections/destinations/catalog/hubspot'
---

{% include content/plan-grid.md name="actions" %}

HubSpot is an all-in-one marketing tool that helps attract new leads and converts them into paying customers, with features like landing page creation and email automation. 

When you use the HubSpot Cloud Mode (Actions) destination, Segment sends your data to [HubSpot's REST API](https://developers.hubspot.com/docs/api/overview){:target="_blank"}.

> warning ""
> The **Upsert Company** action is not compatible with the Mapping Tester on the mappings page if Associate Contact is set to **Yes**. As a result, Segment recommends using the Event Tester or other tools to test and troubleshoot creating and updating companies in HubSpot. Please note, for the company to contact association to work, you are required to trigger an Upsert Contact action before triggering an Upsert Company action.

> warning ""
> **Behavioral Events (Legacy)** are only supported with [Hubspot Classic Destination](/docs/connections/destinations/catalog/hubspot/).


## Benefits of HubSpot Cloud Mode (Actions) vs HubSpot Classic
HubSpot Cloud Mode (Actions) provides the following benefits over the classic HubSpot destination:

- **Fewer settings.** Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data.** Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to the destination.
- **Granular control over data sent.** You can customize the conditions under which the events are sent to HubSpot.
- **OAuth 2.0 support**. Authentication with HubSpot uses OAuth 2.0 instead of an API key.
- **Sandbox support**. Test with a HubSpot sandbox account before implementing in your main production account to feel confident in your configuration.
- **Support for custom behavioral events**. Send [custom behavioral events](https://developers.hubspot.com/docs/api/analytics/events){:target="_blank"} and event properties to HubSpot.
- **Create records in custom objects**. Use your Segment events to create records in any standard or custom object in your HubSpot account.


## Getting started

> info ""
> Before you begin, you need to generate a Private App in HubSpot. To generate a Private App from the HubSpot dashboard, navigate to **Integrations > Private Apps**. 
>
> Segment requires the following scopes: `business-intelligence`, `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.schemas.contacts.read`, `crm.objects.companies.read`, `crm.objects.companies.write`, and `crm.schemas.companies.read`. For more information, see HubSpot's [Private Apps](https://developers.hubspot.com/docs/api/private-apps){:target="_blank"} article.

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for **HubSpot Cloud Mode (Actions)** in the Destinations Catalog, and select the destination.
3. Click **Configure HubSpot Cloud Mode (Actions)**.
4. Select the source that will send data to HubSpot Cloud Mode (Actions) and follow the steps to name your destination.
5. On the **Settings** tab, authenticate with HubSpot using OAuth. Your user must be a [super admin](https://knowledge.hubspot.com/settings/hubspot-user-permissions-guide#super-admin){:target="_blank"} in the HubSpot account to authenticate the connection. Click **Connect app**.
![Hubspot Scope Approval Screen](images/scopeApproval.png)
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings).
7. Enable the destination and configured mappings.

> info ""
> To ensure that data is sent downstream, configure and enable at least one mapping to handle a connected sources event(s).

{% include components/actions-fields.html %}


## Support for association between two custom object records in upsert custom object records
To associate two records, it's mandatory to have these three fields: **Search Fields to associate** , **ObjectType to associate**, and **Association Label**. If any of these three fields aren't configured, the association skips.

Field | Details
----- | --------
Search Fields to associate |  This finds a unique record of custom object based on key-value search properties so that records can be associated together. <br> * An association record fails if there is more than one record returned from the search association object. <br> * An association skips if no record is found with the data provided in key:value format. 
ObjectType to associate | To associate the newly created and updated custom object record with another object type, select the object type you want it to be associated with.
Association Label | Select an association label between both the object types. From the HubSpot Dashboard, you can create associations between any type of object. To create an association label: <br>1. Log in to the [HubSpot Dashboard](https://app.hubspot.com/){:target="_blank"}. <br>2. Go to **Data Management > Objects > Custom Objects**. <br>3. Go to the **Associations** tab and click **Create association label**. 

## FAQ and troubleshooting

### How do I send other standard objects to HubSpot?
Segment provides prebuilt mappings for contacts and companies. If there are other standard objects you would like to create records in, please use the **Create Custom Object Record** action. For example, to create a deal in HubSpot, add a mapping for Create Custom Object Record, set up your Event Trigger criteria, and input a literal string of "deals" as the Object Type. You can use the Properties object to add fields that are in the [deals object](https://developers.hubspot.com/docs/api/crm/deals){:target="_blank"}, such as `dealname` and `dealstage`. The same can be done with other object types (for example, tickets, quotes, etc). Ending fields that are to go to HubSpot outside of the properties object isn't supported. This includes sending [associations](https://developers.hubspot.com/docs/api/crm/associations){:target="_blank"}.  Please note, Segment only supports creating new records in these cases; updates to existing records are only supported for contacts and companies. 

### How do I send `Page` events to HubSpot?
The [Track Page View action](/docs/connections/destinations/catalog/actions-hubspot-web/#track-page-view) is only available in [HubSpot Web (Actions) destination](/docs/connections/destinations/catalog/actions-hubspot-web/). As a workaround, with HubSpot Cloud Mode (Actions) destination, you can use the [Custom Behavioral Event](/docs/connections/destinations/catalog/actions-hubspot-cloud/#send-custom-behavioral-event) to send Page events to Hubspot. You'll need to [follow Hubspot's instructions](https://knowledge.hubspot.com/analytics-tools/create-custom-behavioral-events-with-the-code-wizard){:target="_blank"} to create a custom behavioral event for `Page Viewed` in HubSpot.


### Why aren't my custom behavioral events appearing in HubSpot?
HubSpot has several limits for custom behavioral events, including a limit on the number of event properties per event. Each event can contain data for up to 50 properties. If this limit is exceeded, the request will fail. See [HubSpot documentation](https://knowledge.hubspot.com/analytics-tools/create-custom-behavioral-events#define-the-api-call){:target="_blank"} for other limits.

> note ""
> A HubSpot Enterprise Marketing Hub account is required to send Custom Behavioral Events.

### Why can't I set an entire object for the Other properties field?

This destination doesn't allow selecting an entire object for the Other properties field. HubSpot rejects API calls if a property name doesn't match with HubSpot's internal name. When working with a large object of key/value pairs, map each key/value pair to prevent rejection. This ensures that every key matches the pre-created property names in HubSpot.

### Does the HubSpot Cloud Mode (Actions) destination support EU data residency?
Yes. HubSpot will automatically redirect API requests directly to an EU data center if your HubSpot instance is on an EU data center. See more in HubSpot's [Routing API Traffic](https://product.hubspot.com/blog/routing-api-traffic){:target="_blank"} article.

### How can I disable or delete a destination from Segment?
Follow the instructions in the docs to [disable](/docs/connections/destinations/actions/#disable-a-destination-action) or [delete](/docs/connections/destinations/actions/#delete-a-destination-action) a destination action from Segment.

### How can I uninstall an app from my HubSpot account?
Follow the steps mentioned [here](https://knowledge.hubspot.com/integrations/connect-apps-to-hubspot#uninstall-an-app){:target="_blank"} to uninstall or disconnect an app from your HubSpot account.

### How does disconnecting and uninstalling affect a user's data and HubSpot account?
Segment immediately stops sending data to HubSpot after you disconnect and uninstall a HubSpot account.
