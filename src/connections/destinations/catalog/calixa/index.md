---
title: Calixa Destination
rewrite: true
id: 5df41c5d2f4a8cd2b74b5725
---
[Calixa](https://www.calixa.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) makes it easy to manage all your customers in one place. No more jumping around from tool to tool, learning SQL, or maintaining internal tools. Calixa connects to the third party SaaS tools you use (like Stripe, Zendesk, and Intercom) so that you can see everything about your customers and take action in one place.

This destination is maintained by Calixa. For any issues with the destination, [contact the Calixa support team](mailto:team@calixa.io).

## Getting Started

{% include content/connection-modes.md %}

1. Login to your [Calixa account](https://console.calixa.io/login).
2. Go to the [Integrations page](https://console.calixa.io/integrations) and click **Add Integration**.
3. Select the Segment Integration and sign in to your Segment account to grant Calixa access.

## Track
If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```json
{
  'userId': '019mr8mf4r',
  'action': 'track',
  'event': 'Account Created',
  'properties': {
    'account_name': 'Initech'
  },
  'context': {
      'groupId': 'acct_123'
      }
}
```

Calixa supports the following Track calls from Segment's [B2B Spec](/docs/connections/spec/b2b-saas/):

* [Signed Up](/docs/connections/spec/b2b-saas/#signed-up) - Creates a user in Calixa
* [Account Created](/docs/connections/spec/b2b-saas/#account-created) - Creates an account in Calixa
* [Account Deleted](/docs/connections/spec/b2b-saas/#account-deleted) - Deletes an account in Calixa
* [Account Added User](/docs/connections/spec/b2b-saas/#account-added-user) - Adds  a user to an account
* [Account Removed User](/docs/connections/spec/b2b-saas/#account-removed-user) - Removes a user from an account

## Identify
If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```
Segment sends Identify calls to Calixa as an `identify` event. When you identify a new user, Calixa creates a new User record. If the User already exists, Calixa updates the User's properties.

## Group
If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:
```json
{
  'type': 'group',
  'groupId': '0e8c78ea9d97a7b8185e8632',
  'traits': {
    'name': 'Initech',
    'industry': 'Technology',
    'employees': 329,
    'plan': 'enterprise',
    'total billed': 830
  }
}
```
Segment sends Group calls to Calixa as an `group` event. A `group` event can create an Account or associate a User to an Account within Calixa.
