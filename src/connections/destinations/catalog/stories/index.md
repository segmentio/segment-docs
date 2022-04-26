---
title: Stories Destination
rewrite: true
beta: true
id: 5e31eed10689db7d78002b54
---
[Stories](https://www.getstories.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) gathers all the user events that matter on a timeline, so your teams can understand what is going on and take action in the right direction.

This destination is maintained by Stories. For any issues with the destination, [contact the Stories Support team](mailto:support@getstories.io).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Stories" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Settings UI which you can retrieve from your [Stories Account](https://app.getstories.io/settings#/api).
4. You can choose whether to Sync Users or not with Stories. If you enable this setting, identified users will be automatically added and/or merged with your Stories users. Read more about [Merging Users](#merging-users) below.

## Identify

[`identify`](/docs/connections/spec/identify/) calls are sent to Stories as a new event on a user's timeline. This call is mainly used to keep track of changes to users' profile and maintain user properties called _traits_ in Segment. If you want to track specific user actions we recommend using the [`track` call](#track).

Only `identify` calls update the Profile traits and Attributes on the left-hand side of user profiles. `track`, `page`, and `screen` calls create users but don't populate user Attributes.

`userId` is a **required** property to assign the call to a specific user. Stories does not support anonymous user tracking.
An example call would look like with a server-side call:

```text
POST api.getstories.io/v1/events/
Params: {
  user_id: "some_user_id", //Segment's userId
  name: "Identify", //Segment's call type
  data: {
      traits: { //Segment's traits for the user
          first_name: "Jacob"
      }
  }
}
```

## Page & Screen

[`page`](/docs/connections/spec/page/) and [`screen`](/docs/connections/spec/screen/) calls are sent to Stories as a new event on a user's timeline as a visited Page or opened Screen.
`userId` is a **required** property to assign the call to a specific user. `name` is a recommended field that helps identify the event characteristics but is not required.
An example server-side call:

```text
POST api.getstories.io/v1/events/
Params: {
  user_id: "some_user_id", //Segment's userId
  name: "Page", //Segment's call type
  data: {
      content: "FAQ - Help" //Segment's name
  }
}

POST api.getstories.io/v1/events/
Params: {
  user_id: "some_user_id", //Segment's userId
  name: "Screen", //Segment's call type
  data: {
      content: "App went Foreground" //Segment's name
  }
}
```

## Track

[`track`](/docs/connections/spec/track/) calls are sent to Stories as a new event on a user's timeline to keep a track of user actions.
`userId` is a **required** property to assign the call to a specific user. `name` is a recommended field that helps identify the event characteristics but is not required.
An example server-side call:

```text
POST api.getstories.io/v1/events/
Params: {
  user_id: "some_user_id", //Segment's userId
  name: "Track", //Segment's call type
  data: {
      content: "Remote Log session started" //Segment's name
  }
}
```

## Known & Anonymous Users

**Stories does not support anonymous users at the moment.**
To have Stories recognize a user, you must include `userId` when calling `identify`. Otherwise, Stories won't automatically be able to log the call under the correct user.

### Merging Users

Stories automatically merges identified Users in Segment with their corresponding Stories User and creates a new User in Stories if it does not exist already. When an [`identify`](/docs/connections/spec/identify/) fires, it merges/updates User attributes with the `identify` call's traits.

An example server-side call:

```text
POST api.getstories.io/v1/users
Params: {
    "user_id": "some_user_id", //Segment's userId
    "name": "Han Solo", //Segment's username
    "email": "han.solo@millenium.fa", //Segment's email
    "phone": "+14155552671", //Segment's phone
    "attributes": { //Segment's Traits
        "vehicle": "Millennium Falcon",
        "latest_action": "Marry Leia"
    },
}
```

## Sync Users

When you set up your Stories Destination in Segment, your users automatically sync to Stories.
Note that only Users who have a `userId` in Segment are synced, Stories does not support anonymous users yet. Users are updated by `identify` events from Segment.
