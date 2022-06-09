---
rewrite: true
title: Userlist Destination
id: 5c75396a02254a0001da2a55
---
[Userlist](https://userlist.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows you to send behavior-based messages to your SaaS users. It's great for onboarding users as well as nurturing them throughout their journey.

This destination is maintained by Userlist. For any issues with the destination, [contact the Userlist Support team](mailto:support@userlist.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1.  From the Segment web app, click **Catalog**.
2.  Search for "Userlist" in the Catalog, select it, and choose which of your sources to connect the destination to.
3.  In the Userlist Segment destination settings, enter your Userlist "Push API Key". You can find this key in your [Userlist Push API settings](https://app.userlist.com/settings/push).

> info""
> **NOTE:** The Userlist Destination does not support tracking anonymous users, and returns a 400 error if you send `track` or `group` call for unidentified users. To prevent this, make sure you make an Identify call before you make Track or Group calls. You can also disregard this error if you sent calls you do not intend Userlist to process.

## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```javascript
analytics.identify('userId123', {
  email: 'john.doe@example.com',
  name: 'John Doe',
  role: 'Owner',
  createdAt: '2019-03-21T12:12:54.735+01:00'
});
```

Identify calls will be sent to Userlist as user records. If the `userId` is already known, it'll update the user record, otherwise it'll create a new one.

Here's how Segment fields map to Userlist users:

| Segment field      | Userlist field | Description                                |
| ------------------ | -------------- | ------------------------------------------ |
| `userId`           | `identifier`   | The unique identifier for this user.       |
| `traits`           | `properties`   | Additional properties describing the user. |
| `traits.email`     | `email`        | The user's email address.                  |
| `traits.createdAt` | `signed_up_at` | The time when the user was created.        |

## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track('Project created', {
  projectName: 'Party Planning'
});
```

Track calls will be sent to Userlist as a new event. You may send additional properties to describe the event in more detail. Both the event name and additional properties will be stored with the event and normalized to snake case (`project_created` and `project_name`) automatically within Userlist.

To associate an event with both a user and a company, please include the company's identifier as `context.groupId` on the Track call:

```javascript
analytics.track(
  'Project created',
  {
    projectName: 'Party Planning'
  },
  {
    context: {
      groupId: 'companyId123'
    }
  }
);
```

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```javascript
analytics.group('companyId123', {
  name: 'Segment'
});
```

| Segment field      | Userlist field | Description                                |
| ------------------ | -------------- | ------------------------------------------ |
| `groupId`          | `identifier`   | The unique identifier for this company.    |
| `traits`           | `properties`   | Additional properties describing the user. |
| `traits.name`      | `name`         | The company's name.                        |
| `traits.createdAt` | `signed_up_at` | The time when the user was created.        |

Group calls will be sent to Userlist as company records. If the `groupId` is already known, it'll update the company record, otherwise it'll create a new one.

Userlist supports custom properties to describe the relationship between users and groups (such as the user's role in a company). You can pass relationship properties in a Group call by using Userlist specific extensions.

```javascript
analytics.group(
  'companyId123',
  {
    name: 'Segment'
  },
  {
    integrations: {
      Userlist: {
        extensions: {
          relationship: {
            properties: {
              role: 'owner'
            }
          }
        }
      }
    }
  }
);
```
