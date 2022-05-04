---
title: Cordial (Actions) Destination
hide-boilerplate: true
hide-dossier: true
---

{% include content/plan-grid.md name="actions" %}

[Cordial](https://cordial.com/) is an all-in-one marketing platform that enables brands to collect, normalize, and activate real-time data from anywhere in your technology stack to create and deliver tailored messages that flex and adapt to changing customer signals.

> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Cordial Segment destination. There's also a page about the [non-Actions Cordial destination](/docs/connections/destinations/catalog/cordialio/). Both of these destinations receives data from Segment.

## Benefits of Cordial (Actions) vs Cordial Classic

Cordial (Actions) provides the following benefits over the classic Cordial destination:

- **Transparent data mapping**. Classic Cordial destination receives data from Segment as is. Cordial backend then converts those Segment events to Cordial's format and clients have limited control over this conversion. Cordial (Actions) destination allows clients to fully define their own mappings of Segment events, making sure they receive data structured specifically for their needs. 
- **Sending only the data you need**. With Cordial (Actions) you can define only those destination actions and mappings that make sense for your use cases while Cordial Classic always sends four predefined API calls: identify, track, group, and page. 
- **Sending Personas components to Cordial**. With Cordial (Actions) it is possible to define action mappings that will send audiences and user computed traits defined in Segment Personas platform to Cordial.

## Getting started

1. To enable destination actions to connect to Cordial, you will need a Cordial API Key. API keys can be created on the API keys page page the Account Settings menu. [Learn more](https://support.cordial.com/hc/en-us/articles/115005365087)
2. From the Segment web app, click **Catalog**, then click **Destinations**.
3. Find the Destinations Actions item in the left navigation, and click it.
4. Click **Configure Cordial**.
5. Select an existing Source to connect to Cordial (Actions).

<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}

## Migration from the classic Cordial destination

### User Identities Mappings

Every Cordial destination action needs to be invoked with a data identifying a Cordial contact. To identify a contact every destination action has `User Identities` field, which maps Segment event fields to Cordial contact identifiers. Each entry in the list represents a contact identifier and how it maps from a Segment event. For example, `channels.email.address <- userId` or `customerId <- traits.customerId`. At least one identifier should be valid otherwise the contact will not be identified and the request will be ignored.

Typically `User Identities` field will map Segment event's  `userId` field to Cordial secondary identifier field. For example, if Segment's `userId` field is known to be an email, the mapping will be `channels.email.address <- userId`, meaning the value of `userId` will be sent as `channels.email.address` to Cordial.

### Updating contacts

If you plan to create and update contacts in Cordial, define `upsertContact` destination action. In addition to `User Identities` field, the action defines `Contact Attributes` field. This field defines an exclusive set of attributes that will be updated in a contact. Typically you map them from Segment traits, for example, `customerId <- traits.customerId`. For Cordial Classic destination these mappings are stored in Cordial's database, for Cordial (Actions) destination they become explicit in the `upsertContact` destination action mappings.

### Sending events

To send events define `createContactactivity` destination action. In addition to `User Identities` field, it defines additional fields such as `Event name`, `Event timestamp`, and `Event properties`. Refer to documentation for each field when defining the destination action.

### Adding users to and removing from lists

If you plan segmenting users in Cordial, make sure you define `addContactToList` and `removeContactFromList` destination actions. Both actions require Segment group ID. `addContactToList` optionally accepts a list name. 

Although optional, list name should be considered a must have, because it will drastically simplify segmenting contacts in Cordial based on lists. Lists without a name are called following the `segment_[groupId]` pattern.