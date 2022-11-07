---
title: Best Practices for Identifying Users
redirect_from: '/guides/how-to-guides/best-practices-identify/'
---

The most important calls you make with Segment are the Track and Identify calls. With the Track call, you can attribute actions on your site or app to individuals, and gain a better understanding of their activities, identity, and use patterns over time.

When you use the Segment Identify call with the Track call, you can start to build a complete picture of a user's interactions with your systems, and help [reduce the number of Monthly Tracked Users](/docs/guides/usage-and-billing/mtus-and-throughput/) you are billed for.


## AnonymousId generation

The Segment libraries generate an `anonymousId` for each user, even before you Identify them.

An `anonymousId` is a randomly generated 36 character string automatically assigned to a user on their first visit to your website or mobile application. You can use the `anonymousId` to link events performed by the user as they navigate around your website. When you track the `anonymousId`, you can attribute activities over multiple days to the same user by collecting all of the activities with that ID. If a user chooses to register for your site, or log in to your app, you can Identify them, and still include their `anonymousId` in the event payload along with the new `userId`.

> success ""
> **Tip!** Only the Segment mobile and website libraries automatically generate an `anonymousId`. If you use Segment's Server libraries, you must generate an `anonymousId` manually. It can be any pseudo-unique identifier, for example you might use a `sessionId` from a backend server.

## Identifying users

Segment's Identify method lets you link a user to their actions and record traits about them. It includes a unique User ID, and records any traits you know about them, such as their email address, and name.

Segment recommends that you use a unique user identifier that won't change for your `userId`, for example a database ID from your organization's internal systems. (See below)

When you make an [Identify call](/docs/connections/spec/identify) using Analytics.js, Segment saves the `userId` to the browser cookie, and writes all the user traits in local storage. If you're using one of the Segment mobile libraries, the `userId` and traits are stored in the device's memory. This makes it possible to append the user's data to all subsequent [Page calls](/docs/connections/sources/catalog/libraries/website/javascript#page) or [Track calls](/docs/connections/sources/catalog/libraries/website/javascript#track) for the user, so you can properly attribute those actions.

If a user returns to your site after the [cookie expires](#id-expiration-and-overwriting), Analytics.js looks for an old ID in the user's `localStorage`, and if one is found, sets it as the user's ID again in a new cookie. If the user clears their cookies *and* `localStorage`, all of the IDs are removed. The user gets a completely new `anonymousId` when they next visit the page.


## Best options for userIds

A User ID should be a robust, static, unique identifier that you recognize a user by in your own systems. Because these IDs are consistent across a customer's lifetime, you should include a User ID in Identify calls as often as you can.

Ideally, the User ID could be a database ID. For example, if you're using MongoDB it might be a row identifier and look something like `507f191e810c19729de860ea`. These can also be [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)s that you generate somewhere in your application. You can also use identifiers that you get from other tools - such as Shopify or Braze - however this approach can lead to extra complexity in your systems.

Segment does **not** recommend using simple email addresses or usernames as a User ID, as these can change over time. Segment recommends that you use static IDs instead, so the IDs *never* change. When you use a static ID, you can still recognize the user in your analytics tools, even if the user changes their email address. And even better, you can link your analytics data with your own internal database.

> success ""
> **Tip!** Even if you don't use an email address or a username as a User ID, you should still send them in the analytics payload as [traits](/docs/connections/spec/identify#traits).

## When to call Identify

You should make an Identify call in the following situations:

- when first you create a user (and so it is assigned a `userId`)
- when a user changes information in their profile
- when a user logs in
- Optionally, when you call Identify upon loading any pages that are accessible by a logged in user

## Merging Identified and Anonymous user profiles

The illustration below shows a timeline with a user's interactions on a website, including sample API calls above that show Segment calls, and the user's `anonymousId` and `userId`.

![](images/identify-bp-1.png)

<!-- https://www.figma.com/file/Gc53MamYsKZBg3IUduunc5/identity-best-practices?node-id=1%3A3 -->

When the user first visits a page, Analytics.js automatically assigns the user an `anonymousId` and saves it to the user's local storage. As the user interacts with the site, for example clicking around to different pages, Analytics.js includes this `anonymousId` and some [contextual information](/docs/connections/spec/common#context) with each Page and Track call. The contextual information might be the user's [IP address, browser, and more](/docs/connections/spec/common#context-fields-automatically-collected).

When a user signs up to create an account on the website, the `.identify(UID)` and `.track(“Signed Up”)` events fire, in that order. You pull the `userId` unique to the user from your systems, and send it to the Segment library so you can label that user's later events with their ID. The later Track call (“Signed Up”) contains both the `userId` *and* the automatically-collected `anonymousId` for the user, and any other information you capture about them -  such as their first name, last name, and email address.

The example below shows an Identify call including user traits. It uses a database ID (`97980cfea0067`) as the `userId`.

```js
analytics.identify("97980cfea0067", {
  name: "Peter Gibbons", //user trait
  email: "peter@example.com", //user trait
  plan: "premium" //user trait
});
```

For a Track call, information about this event is stored either in the `context` field or in the event [properties](/docs/connections/spec/track#properties). The example below shows a Track call including properties that tell you about the user.

```js
analytics.track("Signed Up", {
  userId: "97980cfea0067", //event property
  name: "Peter Gibbons", //event property
  email: "peter@example.com", //event property
  plan: "premium" //event property
});
```

Additionally, Analytics.js adds a `message_id` and [four timestamps](/docs/connections/spec/common#timestamp-overview) to the call.

Now, as the user interacts with your site and different buttons or links that you track using Segment, their `userId` and `anonymousId` are sent with each tracking API call.

### UserID merge examples

Let's go through some more scenarios to explain how an `anonymousId` is assigned and how it might be merged with a UID.

#### Scenario #1 - Multi-day, single device

If a user clicks on an ad and is directed to a webpage, they are assigned an `anonymousId`. While this user is anonymous they navigate to different pages and click around on the website. Say they come back two days later from the same device, sign up, and are assigned a `userId`.

![](images/identify-bp-2.png)

For simplicity, we're assuming that the user has _not_ cleared their cookies or `localStorage`, where the original `anonymousId` is stored. If they had, they'd be assigned a new `anonymousId` when they visited the website, and the `userId` they got when they register on the website would _not_ be attached to the activities tracked with the old `anonymousId`.

#### Scenario #2 - Multi-day, multi-device, single login

In this scenario, the person uses both a web browser, and a mobile application to interact with your site. In each case, they are assigned a different `anonymousId`. In this scenario, the user signs up on the web browser, so Segment assigns their _web_ session a `userId`. However, because they do not log in on the mobile application, Segment cannot tie the mobile activity to this specific user. Their mobile application activity remains anonymous unless they log in on the mobile application.

![](images/identify-bp-3.png)


#### Scenario #3 - Multi-day, multi-device, multiple logins

Similar to the previous scenario, the user accessed both your website and mobile application, and also logged in on both. In this case, both sessions on the web and mobile app receive the user's `userId`, so Segment can tie the anonymous activity on both web and mobile to this user.

![](images/identify-bp-4.png)


## User profiles in warehouses

Your data warehouse has a schema for each of your Segment sources. User information is stored in two tables in your source schemas - the `identifies` and `users` table.

The `identifies` table contains all of your identify events, and the timestamps for these events. Every time you make an Identify call, Segment adds the `userId`, `anonymousId`, any updated or added user traits from the call, as well as the timestamp of when the call was made. Your `identifies` table is your first stop when you have questions about users and their traits.

The `users` table contains only unique Identify method calls, and is a collation of the `identifies` table. The `users` table is the single source of truth for a user's most up-to-date traits.

These tables only contain information about a user *once they have been identified.* However, you can still find information about an _anonymous_ user on the `pages`, `screens`, and `tracks` tables, as well as the individual track event tables.

## ID expiration and overwriting

The Segment ID cookie is set with a one year expiration. However, there are some ways an ID can be reset or overwritten:

- If you call `reset` during a user's browser session, it removes both their `userId` and `anonymousId`, which means the user generates a new `anonymousId` on the next visit.
- If the user manually clears their cookies and local storage, they generate a new `anonymousId` on the next visit.
- If you invoke any call before you set an `anonymousId`, Segment automatically sets the `anonymousId` first. This means if you explicitly set an `anonymousId`, you might give the user two `anonymousId`s or overwrite an existing one.
- If you fetch the `anonymousId` using `analytics.user().anonymousId()` before one is set, Segment generates and sets an `anonymousId` rather than returning `null`.
- If you call `analytics.identify()` with a `userId` that is different from the currently cached `userId`, this can overwrite the existing one and cause attribution problems.
- If you generate a new `anonymousId` on a server library, and pass it from the server to the browser, this could overwrite the user's existing `anonymousId`.

> info ""
> Remember, if a user has multiple devices, they can have different `anonymousId`s on each different device.

## Linking server- and client- generated Ids

There are some advantages to sending details about your users directly from your server once the user registers. Server library [Identify calls](/docs/connections/spec/identify) are invisible to the end user, making them more secure, and much more reliable.

If you want to send user data that is sensitive or which you don't want to expose to the client, then you can make an Identify call from the server with all the traits you know about the user.


### Aliasing from a server library

If you plan to track anonymous visitors from the browser and only make [Identify calls](/docs/connections/spec/identify) from your server libraries, Kissmetrics and Mixpanel might require that you make an [Alias call](/docs/connections/spec/alias) to link the records. The Alias call links client-side anonymous visitors with server-identified users. This isn't recommended, but if you do this, read the [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#aliasing-new-users-server-side) and [Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias-using-cloud-mode) specific [alias](/docs/connections/spec/alias) docs.

### Common questions

There are a few things that might cause your numbers to be off.

#### Missing sign-ups

The most common problem people run into when tracking new user signups client-side is that only a portion of their new users are showing up in reports.

This is usually caused by the page redirecting or reloading before the tracking calls get a chance to run. Segment recommends that you make those calls from a welcome page after the user registers, rather than trying to squeeze in the tracking calls on the sign-up page itself.

#### Anonymous history is lost

This is usually only an issue in [Mixpanel](/docs/connections/destinations/catalog/mixpanel#alias), since it's the only destination that requires a call to [alias](/docs/connections/spec/alias) in the browser to link anonymous browsing history to a new identified user.

Remember that for destinations that require aliasing, you must make the [Alias call](/docs/connections/spec/alias) before you make the [Identify call](/docs/connections/spec/identify) for that user. Even if you make an [Identify call](/docs/connections/spec/identify) from a server library, it can't happen before the client-side [alias](/docs/connections/spec/alias).
