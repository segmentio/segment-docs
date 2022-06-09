---
title: Voucherify Destination
rewrite: true
beta: true
id: 5e42baaecf559c535c8cbe97
---
[Voucherify](https://voucherify.io?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps developers integrate digital promotions across any marketing channel or customer touchpoint - eventually giving full control over campaigns back to the marketing team.

This destination is maintained by Voucherify. For any issues with the destination, [contact the Voucherify Support team](mailto:support@voucherify.io).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Voucherify" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" and "API Token" into your Segment Settings UI which you can find from your [Voucherify dashboard](https://voucherify.io/dashboard).

#### Getting API Key and API Token
On the Voucherify Dashboard page:
- Open the "Project settings" from the user context menu on the top right.
- Find the "Application Keys" section on the project page.
- Create a new key pair if needed.
- Use "Application ID" and "Secret Key" respectively as "API Key" and "API Token".

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```js
analytics.identify('cust_9032_re_3234', {
  email: 'john.doe@example.com'
});
```

Received events will be carried to Voucherify.io as a Customer Create request unless the setting _Identify Disabled_ is `true`.

The Customer is created, with a *source_id* equal to the event *userId* or *anonymousId*. When exists, an existing Customer is updated.

With setting _Identify Mapping_ you can customize the conversion from the event payload to Voucherify `Customer` payload.

```js
# Default identify event mapping (src : dest)
{
  "traits.name"              : "customer.name",
  "traits.firstName"         : "customer.firstName",
  "traits.lastName"          : "customer.lastName",
  "traits.email"             : "customer.email",
  "traits.description"       : "customer.description",
  "traits.address.city"      : "customer.address.city",
  "traits.address.state"     : "customer.address.state",
  "traits.address.street"    : "customer.address.line_1",
  "traits.address.country"   : "customer.address.country",
  "traits.address.postalCode": "customer.address.postal_code",
  "traits.phone"             : "customer.phone",
  "traits.metadata"          : "customer.metadata"
}
```

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track('Registration Completed', {
  name: 'Customer Name'
});
```

Received events will be carried to Voucherify.io as Custom Events related to the Customer, with an event name equal to segment `event` value, unless the setting _Track Disabled_ is `true`.

The Custom Event is attached to a Customer, with a *source_id* equal to the event *userId* or *anonymousId*. The *userId* field is a field which persists from when you first make an identify call on a JavaScript source. The *anonymousId* field is a randomly generated field that will be generated when you call a track event. The *userId* will take priority if *anonymousId* exists. If *userId* doesn't exist, the *anonymousId* will be used.

With setting _Track Events Filter_ you can define the list of allowed events that will be transferred.

With setting _Track Mapping_ you can customize the conversion from the event payload to Voucherify `Custom Event` payload.

```js
# Default track event mapping (src : dest)
{
  "properties.name"              : "customer.name",
  "properties.firstName"         : "customer.firstName",
  "properties.lastName"          : "customer.lastName",
  "properties.email"             : "customer.email",
  "properties.description"       : "customer.description",
  "properties.address.city"      : "customer.address.city",
  "properties.address.state"     : "customer.address.state",
  "properties.address.street"    : "customer.address.line_1",
  "properties.address.country"   : "customer.address.country",
  "properties.address.postalCode": "customer.address.postal_code",
  "properties.phone"             : "customer.phone",
  "properties.metadata"          : "customer.metadata"
}
```

## Voucherify Custom Event

#### Payload mapping
The received event payload is translated, with the specific event mapping (track or identify), to a Custom Event payload.

Regardless of the provided mapping, some fields have a fallback mapping logic:
- `event` when not defined, using the `event` property from the event, if not defined then the event `type`.
- `customer.source_id` when not defined, using `userId` or `anonymousId` from the event.
- `customer.name` when not defined, trying to build one from `firstName` and `lastName`.
