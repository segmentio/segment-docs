---
title: Voucherify Destination
rewrite: true
beta: true
---

[Voucherify](https://voucherify.io?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps developers integrate digital promotions across any marketing channel or customer touchpoint - eventually giving full control over campaigns back to the marketing team.

This destination is maintained by Voucherify. For any issues with the destination, please [reach out to their team](mailto:support@voucherify.io).

> note "Note:"
> The Voucherify Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on February 27, 2020. If you are interested in joining their beta program or have any feedback to help improve the Voucherify Destination and its documentation, please [let  their team know](mailto:support@voucherify.io)!


## Getting Started

{% include content/connection-modes.md %} 

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Voucherify" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" and "API Token" into your Segment Settings UI which you can find from your [Voucherify dashboard](https://voucherify.io/dashboard).

#### Getting API Key and API Token
On the Voucherify Dashboard page:
- Open the "Project settings" from the user context menu on the top right.
- Find the "Application Keys" section on the project page.
- Create a new key pair if needed.
- Use "Application ID" and "Secret Key" respectively as "API Key" and "API Token".

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('cust_9032_re_3234', {
  email: 'john.doe@segment.com'
});
```

Received events will be carried to Voucherify.io as a Customer Create request unless the setting _Identify Disabled_ is `true`.

The Customer is created, with a *source_id* equal to the event *userId* or *anonymousId*. When exists, an existing Customer is updated.

With setting _Identify Mapping_ you can customize the conversion from the event payload to Voucherify `Customer` payload.

```
# Default identify event mapping (src : dest)
#
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

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Registration Completed', {
  name: 'Customer Name'
});
```

Received events will be carried to Voucherify.io as Custom Events related to the Customer, with an event name equal to segment `event` value, unless the setting _Track Disabled_ is `true`.

The Custom Event is attached to a Customer, with a *source_id* equal to the event *userId* or *anonymousId*. The *userId* field is a field which persists from when you first make an identify call on a JavaScript source. The *anonymousId* field is a randomly generated field that will be generated when you call a track event. The *userId* will take priority if *anonymousId* exists. If *userId* doesn't exist, the *anonymousId* will be used.

With setting _Track Events Filter_ you can define the list of allowed events that will be transferred.

With setting _Track Mapping_ you can customize the conversion from the event payload to Voucherify `Custom Event` payload.

```
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