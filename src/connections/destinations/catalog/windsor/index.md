---
rewrite: true
title: Windsor Destination
---

[Windsor](https://windsor.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides startups a unified dashboard for all SaaS data. It pulls analytics and email events, customer support tickets, credit card transactions, and more to give a complete view of customers.

This destination is maintained by Windsor. For any issues with the destination, [contact the Windsor Support team](mailto:support@windsor.io).

You can find more information on Windsor on [the Windsor docs site](https://docs.windsor.io).

> note "Note:"
> The Windsor Destination is currently in beta, which means that they are still actively developing the destination. To join the Windsor beta program, or if you have any feedback to help improve the Windsor Destination and its documentation, [contact the Windsor support team](mailto:support@windsor.com)!


## Getting Started


{% include content/connection-modes.md %} 

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Windsor" in the Destinations Catalog, and select the Windsor destination.
3. Choose which Source should send data to the Windsor destination.
4. Go to the [Windsor app Sources page](https://app.windsor.io/sources)
5. Select **Segment** and click **Generate Token**. Copy the token provided.
6. Enter the "Token" in the "Windsor" destination settings in Segment.



## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls as tracked events for each [user](https://app.windsor.io/people, and also to the Windsor [feed](https://app.windsor.io/feed). Page events are hidden on Windsor by default, but can be enabled using the **Show Hidden Events** button at the top of the feed.


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](https://segment.com/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Windsor as events can find on the Windsor [feed](https://app.windsor.io/feed) and the tracked events for each [user](https://app.windsor.io/people).


## Identify

If you aren't familiar with the Segment Spec,  take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify("user-123", {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://avatar.windsor.io/user-123",
  phone: "+1 (415) 123-4567",
});
```

Windsor **requires** a **`userId`** and **`email`** for most integrations to work correctly. Additionally, a value for `phone` will let Windsor track any text messages you send. The `avatar` property lets you identify users easily on Windsor.

Segment sends Identify calls to Windsor in order to populate new users and their properties. You can find all your users on the [Users Page](https://app.windsor.io/people)

### Best Practices

We recommend calling the `identify()` method as often as possible from your app. As a general guide, call `identify()` -

- On Sign up
- On Every Login (preferably on the client and server)
- Every time a core user property changes (name, email, avatar or phone number)
- Upon Loading any pages that are accessible by a logged in user

You can find [additional documentation here](https://docs.windsor.io/docs/analytics#identify) on how to best use `identify()` with Windsor.


## Track

If you aren't familiar with the Segment Spec,  take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Windsor as events can find on the Windsor [feed](https://app.windsor.io/feed) and the tracked events for each [user](https://app.windsor.io/people).

We recommend following Segment's guide for your industry/application to get the best experience with Windsor.

- [Mobile App](https://segment.com/docs/connections/spec/mobile/)
- [E-Commerce](https://segment.com/docs/connections/spec/ecommerce/v2/)
- [B2B SaaS](https://segment.com/docs/connections/spec/b2b-saas/)
- [Video](https://segment.com/docs/connections/spec/video/)

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](https://segment.com/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("group-id");
```

Segment sends Groups calls to Windsor to help correctly match users behind the scenes. It attaches an internal property to users belonging to the same group. Windsor does not support a user belonging to multiple groups. If you call `group()` with a new ID for the same user, it simply updates which group the user belongs to.

## Alias

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](https://segment.com/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias("new-user-id");
```

Segment sends Alias calls to Windsor to help correctly match users behind the scenes. It merges any user previously identified using the old `userID` with a user identified with the new `userID`. If a user does not exist with the new `userID`, once will be created.

This is an advanced method and will irreversibly merge users on Windsor (and possibly other destinations too). Make sure to [read the Segment docs](https://segment.com/docs/connections/spec/alias/) when implementing Alias.
