---
title: Cordial (Actions) Destination
hidden: true
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[Cordial](https://cordial.com/) is an all-in-one marketing platform that enables brands to collect, normalize, and activate real-time data from anywhere in your technology stack to create and deliver tailored messages that flex and adapt to changing customer signals.

> info "Good to know"
> This page is about the [Actions-framework](/docs/connections/destinations/actions/) Cordial Segment destination. There's also a page about the [non-Actions Cordial destination](/docs/connections/destinations/catalog/cordialio/). Both of these destinations receive data from Segment.

## Benefits of Cordial (Actions) vs Cordial Classic

Cordial (Actions) provides the following benefits over the classic Cordial destination:

- **Transparent data mapping**. The Classic Cordial destination receives data from Segment as is. The Cordial backend then converts those Segment events to Cordial's format and clients have limited control over this conversion. The Cordial (Actions) destination allows clients to fully define their own mappings of Segment events, making sure they receive data structured specifically for their needs. 
- **Only sends the data you need**. With Cordial (Actions) you can define only those destination actions and mappings that make sense for your use cases, while Cordial Classic always sends four predefined API calls: identify, track, group, and page. 
- **Sends Personas components to Cordial**. With Cordial (Actions) it's possible to define action mappings that will send audiences and user computed traits defined in the Segment Personas platform to Cordial.

## Getting started

To enable destination actions to connect to Cordial: 
1. Make sure you have your Cordial API Key. To create a new API key, navigate to the account settings menu and select **API Keys**. [Learn more](https://support.cordial.com/hc/en-us/articles/115005365087){:target="_blank"}.
2. From the Segment web app, click **Connections > Catalog**.
3. Search for the **Cordial (Actions)** destination item in the left navigation, and click it.
4. Click **Configure Cordial**.
5. Select the Source you want to connect to Cordial (Actions).

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

## Migration from the classic Cordial destination

### User Identities Mappings

Every Cordial destination action needs to be invoked with data identifying a Cordial contact. To identify a contact every destination action has a `User Identities` field, which maps Segment event fields to Cordial contact identifiers. Each entry in the list represents a contact identifier and how it maps from a Segment event. For example, `channels.email.address <- userId` or `customerId <- traits.customerId`. At least one identifier should be valid, otherwise the contact won't be identified and the request will be ignored.

Typically, the `User Identities` field maps the Segment events `userId` field to the Cordial secondary identifier field. For example, if Segment's `userId` field is known to be an email, the mapping will be `channels.email.address <- userId`, meaning the value of `userId` will be sent as `channels.email.address` to Cordial.

### Updating contacts

If you plan to create and update contacts in Cordial, define the `upsertContact` destination action. In addition to the `User Identities` field, the action defines the `Contact Attributes` field. This field defines an exclusive set of attributes that will be updated in a contact. Typically, you map them from Segment traits. For example, `customerId <- traits.customerId`. For the Cordial Classic destination, these mappings are stored in Cordial's database. In the Cordial (Actions) destination, they become explicit in the `upsertContact` destination action mappings.

### Sending events

To send events, define the `createContactactivity` destination action. In addition to the `User Identities` field, additional fields such as `Event name`, `Event timestamp`, and `Event properties` may be defined. Refer to documentation for each field when defining the destination action.

### Adding users to and removing from lists

If you plan to segment users in Cordial, make sure you define the `addContactToList` and `removeContactFromList` destination actions. Both actions require the Segment group ID. `addContactToList` optionally accepts a list name. 

Although optional, you should consider the list name as a required option, because it simplifies segmenting contacts in Cordial based on lists. Lists without a name are called following the `segment_[groupId]` pattern.
