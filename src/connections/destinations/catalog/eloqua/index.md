---
title: Eloqua Destination
id: 54521fd525e721e32a72eeac
---
## Page

Client-side page-view tracking is achieved using an integration with the [Eloqua
Asynchronous Visitor Tracking
Script](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAA/pdf/AsynchronousVisitorTrackingScripts.pdf).

Page tracking with Eloqua is, by default, achieved with a third party cookie.
This cookie is generated upon successful completion of an Eloqua form. Once a
user submits one of these forms, Segment `page` events will start populating
as Website Visits in their Eloqua Contact profile.

## Identify

Segment integrates with Eloqua's REST API to support creating or
updating Contacts in Eloqua following events that do not use an Eloqua form.

Upon invocation of a server-side `identify`, Segment will by default map the
Segment `identify` trait on the left to the Eloqua field on the right:

| Segment trait | Eloqua field |
|---|---|
| email | Email |
| firstName | First Name |
| lastName | Last Name |
| street _or_ address.street | Address |
| city _or_ address.city | City |
| country _or_ address.country | Country |
| title | Title |

Follow the Segment spec to ensure proper mapping of these fields from Segment
`identify` traits: /docs/connections/spec/identify/#traits.

In addition, Segment supports mapping custom `identify` traits to Eloqua custom
object fields. To do so, you can set up mappings in the settings for your
Eloqua destination in the Segment UI.

## Group

Segment integrates with Eloqua's REST API to support creating or updating
Accounts in Eloqua. By default, Segment does not send `group` events downstream
to Eloqua, so to get started, enable "Create or Update Account on Group"
in your destination settings.

Upon invocation of a server-side `group` event, Segment will by default map the
Segment `group` trait on the left to the Eloqua field on the right:

| Segment trait | Eloqua field |
|---|---|
| name + groupId | Company Name |
| street _or_ address.street | Address 1 |
| city _or_ address.city | City|
| country _or_ address.country | Country |
| city _or_ address.city | City |
| country _or_ address.country | Country |
| phone | Business Phone |

Segment concatenates `traits.name` and `groupId` to Company Name to ensure
uniqueness. Therefore, in order to successfully create or update an Account,
the Segment `group` event needs to include the Account's name and groupId. If
you set up a custom Account field called Company in Eloqua, Segment will
automatically map the name of the Account to that field.

Follow [Segment's group spec](/docs/connections/spec/group/#traits) to ensure proper mapping of these fields from Segment
`group` traits.

In addition, Segment supports mapping custom `group` traits to Eloqua custom
object fields. To do so, you can set up mappings in the settings for your
Eloqua destination in the Segment UI.

## Mapping custom traits to Eloqua Accounts and Contacts

First, configure the custom Account fields or custom Contact fields in your
Eloqua dashboard. Read how to set those up for [Contacts
here](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAA/Help/ContactFields/Tasks/CreatingContactFields.htm)
and for [Accounts
here](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAA/Help/AccountFields/Tasks/CreatingAccountFields.htm).

Once you are set up in Eloqua, you are ready to map custom traits to your
Contacts and Accounts. Next, provide a mapping in your destination settings
that specifies the Segment trait names and the corresponding custom Account or
Contact fields to associate them with in Eloqua.

Segment's custom trait mapping will match exactly what you input into your
Segment settings. For example, if you have a field called `Account Rating` in
Eloqua, and a property called `AccountRating` in your Segment events, you
should enter `AccountRating: Account Rating` as the mapping in the "Map Custom
Traits to Accounts" setting in the Segment UI.

If a match between a custom Account or Contact field has
incompatible data types, Eloqua will return an error for the entire request.

## Track

Segment `track` events trigger the creation of [Eloqua Custom
Object](http://docs.oracle.com/cloud/latest/marketingcs_gs/OMCAA/Help/CustomObjects/CustomObjects.htm)
records and associate them with a specific Contact.

To get started, provide a mapping in your destination settings
specifying the Segment event names with the corresponding Custom Object you
would like to associate it with in Eloqua.

Segment will also map the properties of `track` events with Custom Object
fields of the same name. Our integration does an automatic case- and
formatting-insensitive match so that if you have a field called `Account Type`
in Eloqua and a property called `AccountType` in your Segment event, the
mapping will get handled.

For `track` event properties you intend to send to Eloqua as Custom Object
fields, make sure the value of the data type sent to Segment matches the
data type specified in your Eloqua dashboard. If a Custom Object field data
type does not match the data type specified in Eloqua, Eloqua will not create a
Custom Object, and will return an error for the request.

Segment identifies Eloqua Custom Object Fields with `date` data types, and
converts date objects to Unix date strings in seconds, before sending the
payload to Eloqua.

| **Eloqua Data Type** | **Common Data Type** | **Example Value** |
|---|---|---|
| Number | Integer | 31415 |
| Text | String (max 250 characters) | '31415' |
| Large Text | String (max 32000 characters) | '31415' |
| Date/Time | String (Unix date string in seconds) | '1543861960' |
| Numeric | Float (up to 4 decimal places) | 3.1415 |

### User Email

By default, Eloqua uses email address as a Contact ID. Therefore, in order to
successfully associate a Contact with a Custom Object, the Segment `track`
event needs to include the user's email as a trait or integration-specific
property:

```js
analytics.track({
  event: 'Account Created',
  context: {
    traits: {
      email: 'billbrasky@segment.com'
    }
  }
})
```

```js
analytics.track({
  event: 'Account Created',
  integrations: {
    Eloqua: {
      email: 'billbrasky@segment.com'
    }
  }
})
```

### Creating an Eloqua Contact on `track`

By default, Segment creates an Eloqua Contact on `identify` and only
associates Contacts with Custom Objects on Segment `track`.

Enable the `Create Contact on Track` Segment setting to both create Eloqua
Contacts and associate the Contact with an Eloqua Custom Object when you invoke
a Segment `track` event.

**Note** that, to help reduce the number of API calls Segment sends to Eloqua,
enabling this setting will prevent `identify` events from flowing to
Eloqua, so user traits should be included as `context.traits` in `track`
events.

As an example, the following event would create or update Contact
`billbrasky@segment.com` with the values passed in `context.traits`, then
associate the Bill with Eloqua Custom Object `Account Created`.

```js
analytics.track({
  event: 'Account Created',
  properties: {
    referrer: 'Google Ad'
  },
  integrations: {
    Eloqua: {
      email: 'billbrasky@segment.com'
    }
  },
  context: {
    traits: {
      address: '123 Market Street',
      city: 'San Francisco'
    }
  }
})
```

### Creating an Eloqua Account on `track`

If you've enabled the "Create or Update Account on Group" setting, Segment
`track` events will by default create an Eloqua Account if you provide a `name`
and `groupId` in the `context.traits` field. Both fields must be present to
create or update an Account downstream in Eloqua.

```js
analytics.track({
  event: 'Account Created',
  integrations: {
    Eloqua: {
      email: 'billbrasky@segment.com'
    }
  },
  context: {
    traits: {
      name: "Segment.com",
      groupId: "1234567"
  }
})
```
