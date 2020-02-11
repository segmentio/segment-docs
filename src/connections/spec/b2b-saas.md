---
title: 'Spec: B2B SaaS'
---

This guide explains how B2B SaaS companies should send core user and account lifecycle data to Segment.

## Overview

Most B2B SaaS companies have a few common, core lifecycle events for users and accounts. We understand that account hierarchies can be unique and complex, but by following this spec you can take advantage of account-based tools on Segment platform, and B2B SaaS data products by Segment.


## Events

The B2B SaaS category has the following semantic events:

* [Account Created](#account-created)
* [Account Deleted](#account-deleted)
* [Signed Up](#signed-up)
* [Signed In](#signed-in)
* [Signed Out](#signed-out)
* [Invite Sent](#invite-sent)
* [Account Added User](#account-added-user)
* [Account Removed User](#account-removed-user)
* [Trial Started](#trial-started)
* [Trial Ended](#trial-ended)


### Account Created

This event should be sent when a new account is created.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`account_name`          | String | The name of the account being created.
`context.groupId`       | String | The id of the account being created.


#### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Account Created",
  "properties": {
    "account_name": "Initech"
  },
  "context": {
      "groupId": "acct_123"
      }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Account Created",
  "properties": {
    "account_name": "Initech"
  },
  "context": {
      "groupId": "acct_123"
      }
}
```

### Account Deleted

This event should be sent when an account is deleted.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`account_name`          | String | The name of the account being deleted.
`context.groupId`       | String | The id of the account being deleted.

#### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Account Deleted",
  "properties": {
    "account_name": "Initech"
  },
  "context": {
      "groupId": "acct_123"
      }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Account Deleted",
  "properties": {
    "account_name": "Initech"
  },
  "context": {
      "groupId": "acct_123"
      }
}
```

### Signed Up

This event should be sent when a user signs up for your service.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`type`                  | String | The type of signup, e.g. invited, organic.
`first_name`            | String | The first name of the user.
`last_name`             | String | The last name of the user.
`email`                 | String | The email of the user.
`phone`                 | String | The phone number of the user.
`username`              | String | The username of the user.
`title`                 | String | The title of the user.
`context.groupId`       | String | The id of the account the user is joining.

#### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Signed Up",
  "properties": {
    "type": "organic",
    "first_name": "Peter",
    "last_name": "Gibbons",
    "email": "pgibbons@initech.com",
    "phone": "410-555-9412",
    "username": "pgibbons",
    "title": "Mr"
  },
  "context": {
      "groupId": "acct_123"
      }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Signed Up",
  "properties": {
    "type": "organic",
    "first_name": "Peter",
    "last_name": "Gibbons",
    "email": "pgibbons@initech.com",
    "phone": "410-555-9412",
    "username": "pgibbons",
    "title": "Mr"
  },
  "context": {
      "groupId": "acct_123"
      }
}
```

### Signed In

This event should be sent when a user signs in to your service.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`username`              | String | The username of the user logging in.
`context.groupId`       | String | The id of the account being created.

#### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Signed In",
  "properties": {
    "username": "pgibbons"
  },
  "context": {
      "groupId": "acct_123"
      }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Signed In",
  "properties": {
    "username": "pgibbons"
  },
  "context": {
      "groupId": "acct_123"
      }
}
```

### Signed Out

This event should be sent when a user signs out for your service. You should also call [`analytics.reset()`](/docs/connections/sources/catalog/libraries/website/javascript/#reset-logout) to refresh the cookie when a Signed Out event occurs.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`username`              | String | The username of the user logging in.
`context.groupId`       | String | The id of the account being created.

#### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Signed Out",
  "properties": {
    "username": "pgibbons"
  },
  "context": {
      "groupId": "acct_123"
      }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Signed Out",
  "properties": {
    "username": "pgibbons"
  },
  "context": {
      "groupId": "acct_123"
      }
}
```

### Invite Sent

This event should be sent when a user invites another user.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`invitee_email`         | String | The email address of the person receiving the invite.
`invitee_first_name`    | String | The first name of the person receiving the invite.
`invitee_last_name`     | String | The last name of the person receiving the invite.
`invitee_role`          | String | The permission group for the person receiving the invite.

#### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Invite Sent",
  "properties": {
    "invitee_email": "pgibbons@example.com",
    "invitee_first_name": "Peter",
    "invitee_last_name": "Gibbons",
    "invitee_role": "Owner"
  },
  "context": {
      "groupId": "acct_123"
      }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Invite Sent",
  "properties": {
    "invitee_email": "pgibbons@example.com",
    "invitee_first_name": "Peter",
    "invitee_last_name": "Gibbons",
    "invitee_role": "Owner"
  },
  "context": {
      "groupId": "acct_123"
      }
}
```

### Account Added User

This event should be sent when a user is added to a group.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`role`                  | String | The permission group for this user in this account.
`context.groupId`       | String | The id of the account being created.

#### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Account Added User",
  "properties": {
    "role": "Owner"
  },
  "context": {
      "groupId": "acct_123"
      }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Account Added User",
  "properties": {
    "role": "Owner"
  },
  "context": {
      "groupId": "acct_123"
      }
}
```

### Account Removed User

This event should be sent when a user is removed from a group or account.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`context.groupId`       | String | The id of the account being created.

#### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Account Removed User",
  "properties": {},
  "context": {
      "groupId": "acct_123"
      }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Account Removed User",
  "properties": {},
  "context": {
      "groupId": "acct_123"
      }
}
```

### Trial Started

This event should be sent when a trial is started.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`trial_start_date`      | Date   | The date when the trial starts. It is an ISO-8601 date string.
`trial_end_date`        | Date   | The date when the trial ends. It is an ISO-8601 date string.
`trial_plan_name`       | String | The name of the plan being trialed.
`context.groupId`       | String | The id of the account being created.

#### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Trial Started",
  "properties": {
      "trial_start_date": "2018-08-28T04:09:47Z",
      "trial_end_date": "2018-09-20T04:09:47Z",
      "trial_plan_name": "Business"
  },
  "context": {
      "groupId": "acct_123"
      }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Trial Started",
  "properties": {
      "trial_start_date": "2018-08-28T04:09:47Z",
      "trial_end_date": "2018-09-20T04:09:47Z",
      "trial_plan_name": "Business"
  },
  "context": {
      "groupId": "acct_123"
      }
}
```

### Trial Ended

This event should be sent when a trial ends.

#### Properties

This event supports the following semantic properties:

Property                | Type   | Description
--------                | ----   | -----------
`trial_start_date`      | Date   | The date when the trial starts. It is an ISO-8601 date string.
`trial_end_date`        | Date   | The date when the trial ends. It is an ISO-8601 date string.
`trial_plan_name`       | String | The name of the plan being trialed.
`context.groupId`       | String | The id of the account being created.

#### Example

{% comment %} api-example '{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Trial Ended",
  "properties": {
      "trial_start_date": "2018-08-28T04:09:47Z",
      "trial_end_date": "2018-09-20T04:09:47Z",
      "trial_plan_name": "Business"
  },
  "context": {
      "groupId": "acct_123"
      }
}'}}} {% endcomment %}

```js
{
  "userId": "019mr8mf4r",
  "action": "track",
  "event": "Trial Ended",
  "properties": {
      "trial_start_date": "2018-08-28T04:09:47Z",
      "trial_end_date": "2018-09-20T04:09:47Z",
      "trial_plan_name": "Business"
  },
  "context": {
      "groupId": "acct_123"
      }
}
```
