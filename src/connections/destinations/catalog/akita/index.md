---
beta: true
title: Akita Destination
published: false
hidden: true
---

*This destination is maintained by Akita*

## Getting Started

Once you have integrated one of the Segment libraries (such as `analytics.js`) into your website or application, toggle Akita to "On" setting in your Segment destinations list.

You will need to provide your Akita API Token value. To find your API Token, sign in to your Akita account and then click on the following link:

[https://app.akitaapp.com/#int/account/tracking](https://app.akitaapp.com/#int/account/tracking)

You will see your API Token under the "Segment.com Users" heading.

Once you have completed this setup, we will immediately begin sending user data to Akita. Akita supports the Segment `identify`, `group`, `page`, and `track` methods.

## Identify

Akita needs to know which of your users is being tracked. You provide this information with the `identify` method. `identify` requires the users unique identifier and any traits you know about them. For best results, also include the `groupId` of the user. These users will appear in Akita as "People". Any traits provided in addition to name will be stored with the Person.

An example call would look like:

```js
analytics.identify('user_unique_id', {
  email: 'first.last@example.com',
  name: 'John Doe',
  age: 42
});
```

## Group

When you call `group`, Segment will send the group's information to Akita with `groupId` as the id and `name` as the group's name. These `groups` will appear in Akita as "Organizations". Any `traits` provided in addition to `name` will be stored with the Organization.

An example call would look like:

```js
analytics.identify('unique_group_id', {
  name: 'MegaCorp'
});
```

## Page

When you call `page`, Segment will send that event to Akita as a `Page View`.

## Track

When you call `track`, Segment will send that event to Akita as an `Event`.
