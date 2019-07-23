---
rewrite: true
---
[Refersion](https://refersion.com/?utm_source=segment&utm_medium=partner) is a fully-loaded affiliate and influencer marketing platform that you can launch in minutes; they handle the heavy lifting so you can focus on building partnerships with your affiliates. By connecting Refersion with Segment you will easily be able to create new affiliate accounts.

This destination is maintained by Refersion. For any issues with the destination, please [reach out to their team](mailto:helpme@refersion.com).

_**NOTE:** The Refersion Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on May 13, 2019. If you are interested in joining their beta program or have any feedback to help improve the Refersion Destination and its documentation, please [let  their team know](mailto:helpme@refersion.com)!_

## Getting Started

{{>connection-modes}}

You have two options to connect - either automatically within your Refersion dashboard, or manually by copying and pasting an API key into the Segment dashboard.

### Option 1 - Refersion UI
1. In Refersion, find "Segment" in the Integrations section of the Account > Settings page. 
2.  After pressing "Enable with Segment Integration" you will choose the first data source from the pop-up screen. 
3. When the initial connection is established you will be able to connect additional sources to your Refersion destination.

### Option 2 - Segment UI

1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for “Refersion” within the Destinations Catalog and confirm the Source you’d like to connect to.
3. Once connected, you will be asked to input an API key - which can be found in your [Refersion dashboard](https://www.refersion.com/base/settings/integrations/api) - which is formatted as `publickey.secretkey`. You will need to click "Show" to obtain the "Secret Key" portion.

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
{
  "messageId": "test-message-txsmji",
  "timestamp": "2019-05-02T14:14:40.519Z",
  "type": "identify",
  "email": "test@example.org",
  "traits": {
    "name": "Peter Gibbons",
    "email": "peter@initech.com",
    "plan": "premium",
    "logins": 5,
    "address": {
      "street": "6th St",
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94103",
      "country": "USA"
    }
  },
  "userId": "test-user-t0zpx"
}
```

Identify calls will be sent to Refersion as an `identify` event.

All `identify` requests made to the Refersion destination must contain the following traits in order for a new affiliate to be created:

| Trait | Type | Description |
| -------- | -------- | -------- |
| `name`     | `String` | Name of the affiliate you would like to add |
| `firstName` or `first_name` | `String`| First name of the affiliate you would like to add |
| `lastName` or `last_name` | `String`| Last name of the affiliate you would like to add |
| `email` | `String`| Email address of the affiliate you would like to add |
| `address`     | `Object`     | Street address of a user optionally containing: `city`, `country`, `postalCode` or `postal_code`, `state` or `street` |

If you plan on using `camelCase` or `snake_case` please use it consistently for all your traits to keep the request uniform.

Your request can also only contain the `name` instead of `firstName`/`lastName` or `first_name`/`last_name`.

## Delete

You can use a `delete` request to remove a certain affiliate from our system.

```
{
    "type": "delete",
    "channel": "server",
    "messageId": "delete-022bb90c-bbac-11e4-8dfc-aa07a5b093db",
    "projectId": "abcd123",
    "userId": "5678",
    "context": [],
    "integrations": [],
    "email": "peter@initech.com",
    "receivedAt": "2019-02-19T23:58:54.387Z",
    "sentAt": "2019-02-19T21:58:54.387Z",
    "originalTimestamp": "2019-02-19T23:58:54.387Z",
    "timestamp": "2019-02-19T23:58:54.387Z"
}
```
