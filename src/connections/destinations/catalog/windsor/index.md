---
rewrite: true
title: Windsor Destination
id: 5dca74a6907ce1604b781476
---
[Windsor](https://windsor.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides startups a unified dashboard for all SaaS data. It pulls analytics and email events, customer support tickets, credit card transactions, and more to give a complete view of customers.

This destination is maintained by Windsor. For any issues with the destination, [contact the Windsor Support team](mailto:support@windsor.io).

You can find more information on Windsor on [the Windsor docs site](https://docs.windsor.io).

{% include content/beta-note.md %}


## Getting Started


{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Windsor" in the Destinations Catalog, and select the Windsor destination.
3. Choose which Source should send data to the Windsor destination.
4. Go to the [Windsor app Sources page](https://app.windsor.io/sources)
5. Select **Segment** and click **Generate Token**. Copy the token provided.
6. Enter the token in the Windsor destination settings in the Segment app.



## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls as tracked events for each [user](https://app.windsor.io/people, and also to the Windsor [feed](https://app.windsor.io/feed). Page events are hidden on Windsor by default, but can be enabled using the **Show Hidden Events** button at the top of the feed.


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Windsor to the tracked events for each [user](https://app.windsor.io/people), and also as events that appear in the Windsor [feed](https://app.windsor.io/feed).


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify("user-123", {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://avatar.windsor.io/user-123",
  phone: "+1 (415) 555-1234",
});
```

Windsor **requires** a **`userId`** and **`email`** for most integrations to work correctly. Additionally, if you include a value for `phone`, Windsor can track any text messages you send. The `avatar` property lets you add an image to identify users easily on Windsor.

Segment sends Identify calls to Windsor to create new users and their properties. You can find all your users on the [Users Page](https://app.windsor.io/people)

### Best practices

Segment recommends that you make an Identify call frequently from your app. As a general guide, call `identify`:

- On sign up
- On every login (preferably on the device and server)
- Every time a core user property changes (name, email, avatar or phone number)
- On loading any pages that are only accessible by a logged in user


## Track

If you aren't familiar with the Segment Spec,  take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Windsor as tracked events for each [user](https://app.windsor.io/people), and as events that appear on the Windsor [feed](https://app.windsor.io/feed).

To get the best experience with Windsor, Segment recommends that you follow the Segment's specs for your industry or application .

- [Mobile App](/docs/connections/spec/mobile/)
- [E-Commerce](/docs/connections/spec/ecommerce/v2/)
- [B2B SaaS](/docs/connections/spec/b2b-saas/)
- [Video](/docs/connections/spec/video/)

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("group-id");
```

You can use group calls to attach an internal property to users who belonging to the same group, which Segment sends to Windsor to help correctly match users behind the scenes. Windsor does not support users belonging to multiple groups. If you call `group()` with a new group ID for the same user, it updates which group the user belongs to.

## Alias

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias("new-user-id");
```

Segment sends Alias calls to Windsor to help correctly match users behind the scenes. It merges any user previously identified using the old `userID` with a user identified with the new `userID`. If a user does not exist with the new `userID`, Windsor will create a new user with the newly entered `userID`

This is an advanced method and will irreversibly merge users on Windsor (and possibly other destinations too). Make sure to [read the Segment docs](/docs/connections/spec/alias/) when implementing Alias.
