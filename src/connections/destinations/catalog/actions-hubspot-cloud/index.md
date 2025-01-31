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
> The **Upsert Company** action is not compatible with the Mapping Tester on the mappings page if Associate Contact is set to **Yes**. As a result, Segment recommends using the Event Tester or other tools to test and troubleshoot creating and updating companies in HubSpot. 
>
> Note that for the company to contact association to work, you are required to trigger an Upsert Contact action before triggering an Upsert Company action. Contacts created with batch endpoint can not be associated to a Company from the Upsert Company Action.

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

> note ""
> A HubSpot Enterprise Marketing Hub account is required to send Custom Behavioral Events.

## Getting started

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

## Actions v2

> info "You can use the Custom Object v2 Action to send Sensitive Data to HubSpot"
> If you are participating in HubSpot's [Sensitive Data in HubSpot CRM beta](https://developers.hubspot.com/sensitive-data){:target="_blank"}, use the Custom Object v2 Action to send sensitive data to HubSpot.

Segment's v2 Actions, [Custom Object v2](/docs/connections/destinations/catalog/actions-hubspot-cloud/#custom-object-v2) and [Custom Event v2](/docs/connections/destinations/catalog/actions-hubspot-cloud/#custom-event-v2), support the following features:

- **Sync modes**: Control how Segment updates your downstream destination by selecting a sync mode, or a strategy for updating your downstream data
- **Dynamic dropdowns**: When creating or updating a mapping in the Segment app, the dropdown auto-populates all of the available properties directly from HubSpot.
- **Create and modify data**: Use Sync modes to create objects in your downstream destination without having to leave the Segment app. 

> warning ""
> You might need to reauthorize your HubSpot account to use all of the features associated with v2 Actions.

### Sync modes
Sync modes allow users to define how Segment should update the data in your destination.

Available sync modes for the Custom Object v2 and Custom Event v2 Actions include: 
- **Update**: Modify existing records in the destination without adding new ones.
- **Upsert**: Update existing records and add new ones, if necessary.
- **Add**: Add records to a list, segment, or journey.

{% include components/actions-fields.html %}

## Rate limits
HubSpot's [API rate limit](https://developers.hubspot.com/docs/api/usage-details#rate-limits){:target="_blank"} is 100 API calls per 10 seconds. While Segment implements retries for temporary issues, large data volumes sent simultaneously might exceed this limit and result in incomplete data transmission.

For customers with substantial data volumes, Segment recommends segmenting the data into smaller batches and scheduling transfers over an extended period of time. This approach ensures successful data transmission to HubSpot without encountering rate limits.

> info "HubSpot Associations might exacerbate rate limit issues"
> [HubSpot Associations](https://developers.hubspot.com/docs/api/crm/associations){:target="_blank"} often require additional API calls. When working with Associations, carefully plan your strategy and consider a more gradual approach to creating them, especially for large datasets, to avoid reaching your API call limit.


## Support for association between two custom object records in upsert custom object records
To associate two records, it's mandatory to have these three fields: **Search Fields to associate** , **ObjectType to associate**, and **Association Label**. If any of these three fields aren't configured, the association skips.

Field | Details
----- | --------
Search Fields to associate |  This finds a unique record of custom object based on key-value search properties so that records can be associated together. <br> * An association record fails if there is more than one record returned from the search association object. <br> * An association skips if no record is found with the data provided in key:value format. 
ObjectType to associate | To associate the newly created and updated custom object record with another object type, select the object type you want it to be associated with.
Association Label | Select an association label between both the object types. From the HubSpot Dashboard, you can create associations between any type of object. To create an association label: <br>1. Log in to the [HubSpot Dashboard](https://app.hubspot.com/){:target="_blank"}. <br>2. Go to **Data Management > Objects > Custom Objects**. <br>3. Go to the **Associations** tab and click **Create association label**. 

## FAQs and troubleshooting

### Why am I receiving a `Contact already exists` error?
This error only applies to integrations with 2 mappings that can create profiles in HubSpot. Initially, the Upsert Contact action seeks to update an existing contact. If no contact is found, a subsequent attempt is made to create a new contact, potentially leading to 3 separate HubSpot API requests. For example, an `Expired Authentication` error may occur if the token expires on the initial request, prompting a token refresh and a subsequent request. If the next error indicates `resource not found`, it means the contact wasn't located, leading to a second attempt to create the contact. However, this attempt might fail due to a `Conflict` error, suggesting the contact already exists. This situation can arise if you activate another mapping, which causes the contact to be created by the time the Upsert Contact Action attempts its final contact creation request, due to the Custom Behavioral Event Action being triggered as well.

### How do I send other standard objects to HubSpot?
Segment provides prebuilt mappings for contacts and companies. If there are other standard objects you would like to create records in, please use the **Create Custom Object Record** action. For example, to create a deal in HubSpot, add a mapping for Create Custom Object Record, set up your Event Trigger criteria, and input a literal string of "deals" as the Object Type. You can use the Properties object to add fields that are in the [deals object](https://developers.hubspot.com/docs/api/crm/deals){:target="_blank"}, such as `dealname` and `dealstage`. The same can be done with other object types (for example, tickets, quotes, etc). Ending fields that are to go to HubSpot outside of the properties object isn't supported. This includes sending [associations](https://developers.hubspot.com/docs/api/crm/associations){:target="_blank"}.  Please note, Segment only supports creating new records in these cases; updates to existing records are only supported for contacts and companies. 

### How do I send `Page` events to HubSpot?
The [Track Page View action](/docs/connections/destinations/catalog/actions-hubspot-web/#track-page-view) is only available in [HubSpot Web (Actions) destination](/docs/connections/destinations/catalog/actions-hubspot-web/). As a workaround, with HubSpot Cloud Mode (Actions) destination, you can use the [Custom Behavioral Event](/docs/connections/destinations/catalog/actions-hubspot-cloud/#send-custom-behavioral-event) to send Page events to Hubspot. You'll need to [follow Hubspot's instructions](https://knowledge.hubspot.com/analytics-tools/create-custom-behavioral-events-with-the-code-wizard){:target="_blank"} to create a custom behavioral event for `Page Viewed` in HubSpot.

### Why aren't my custom behavioral events appearing in HubSpot?
HubSpot has several limits for custom behavioral events, including a limit on the number of event properties per event. Each event can contain data for up to 50 properties. If this limit is exceeded, the request will fail. See [HubSpot documentation](https://knowledge.hubspot.com/analytics-tools/create-custom-behavioral-events#define-the-api-call){:target="_blank"} for other limits.

### How do I resolve a `403` error for custom behavioral events?
`403` errors indicate that Segment is unable to send your event to HubSpot because the account connected doesn't have sufficient permissions. If you're observing `403` errors for Custom Behavioral Events, ensure that your HubSpot account is a `HubSpot Enterprise Marketing Hub` account. After upgrading your account to `Enterprise Marketing Hub`, **Reauthorize** from the **Settings** page of your destination to resolve the `403` errors.

### Why can't I set an entire object for the Other properties field?

This destination doesn't allow selecting an entire object for the Other properties field. HubSpot rejects API calls if a property name doesn't match with HubSpot's internal name. When working with a large object of key/value pairs, map each key/value pair to prevent rejection. This ensures that every key matches the pre-created property names in HubSpot.

### Does the HubSpot Cloud Mode (Actions) destination support EU data residency?
Yes. HubSpot will automatically redirect API requests directly to an EU data center if your HubSpot instance is on an EU data center. See more in HubSpot's [Routing API Traffic](https://product.hubspot.com/blog/routing-api-traffic){:target="_blank"} article.

### How do I attribute a custom behavioral event with a user token instead of Email?
Event payloads should contain an email with either a valid format, empty string, or a `null` value. As a result, the user token takes precedence and is validated in a `Send custom behavioral event` mapping. Segment can't deliver the event to your destination if the email is invalid.

### How can I disable or delete a destination from Segment?
Follow the instructions in the docs to [disable](/docs/connections/destinations/actions/#disable-a-destination-action) or [delete](/docs/connections/destinations/actions/#delete-a-destination-action) a destination action from Segment.

### How can I uninstall an app from my HubSpot account?
Follow the steps outlined in HubSpot's [Uninstall an app](https://knowledge.hubspot.com/integrations/connect-apps-to-hubspot#uninstall-an-app){:target="_blank"} docs to uninstall or disconnect an app from your HubSpot account.

### How does disconnecting and uninstalling affect a user's data and HubSpot account?
Segment immediately stops sending data to HubSpot after you disconnect and uninstall a HubSpot account.

### What causes a 409 Conflict error?
A 409 Conflict error occurs because more than one mapping is triggered on the same call, such as a custom behavioral event and an Upsert Contact set for track events.

### Understanding HubSpot's `date` and dateTime` custom property types
If you plan on sending a _date_ value that includes time data to your mapped HubSpot custom properties, select HubSpot's `dateTime` property type in HubSpot. If you plan to send a _date_ value that does not contain time data, select the `date` property value in HubSpot. For more information about custom property types, see HubSpot's [Custom objects](https://developers.hubspot.com/docs/api/crm/crm-custom-objects#properties){:target="_blank”} documentation.

If you send a _date_ value that contains time data to a custom property in HubSpot with a `date` property type,  the event might fail due to an "**Invalid Date Error**."

Both of HubSpot's _date_ property types each accept ISO 8601 formatted values, but only the `dateTime` property type accepts values that include time data.

