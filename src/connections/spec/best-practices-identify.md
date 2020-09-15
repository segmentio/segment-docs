---
title: What are best practices for identifying users?
redirect_from: '/guides/how-to-guides/best-practices-identify/'
---

Tracking sign ups correctly is a key step in your marketing funnels. The process of shifting from an anonymous visitor to an identified user requires some special tracking. This tutorial will help you track newly registered users the right way.

The best way to track new users is in client-side javascript on the welcome page after they signup. Below, we’ll explain why.

### Choosing a userId

Every identified user must be assigned a unique userId so they can be tracked consistently across different browsers or devices. You should assign new users their userId at the point that they register. Usually this userId is the same as the Id that identifies them in your database.

Read [our identify docs](https://segment.com/docs/connections/spec/identify/#user-id) for more information on choosing the best userId.

### Identify the new user

Once the userId exists for a new user, two calls need to be made: [identify](/docs/connections/spec/identify) and [track](/docs/connections/spec/track). The calls must be made in that order, but you have some flexibility about when and where that happens.

### Identify

[Identify](/docs/connections/spec/identify) tells Segment (and all your enabled destinations) that `12345` will be this user's identity.

### Track

[Track](/docs/connections/spec/track) tells Segment (and all your enabled destinations) which action identified that user.

**Note**: If you're using Mixpanel you'll also need to call [alias](/docs/connections/spec/alias) before [identify](/docs/connections/spec/identify). Read the [Mixpanel Alias docs](/docs/connections/destinations/catalog/mixpanel#alias) for details.

### Example

Let's look at Rdio as an example. When a new visitor goes to their site that visitor is anonymous. As soon as the visitor logs in and connects their Facebook account, Rdio knows who they are and creates a user record.

As part of that new user record the person is assigned a userId. Let's say the new userId is `12345`. Rdio will then need to fire the following calls on the welcome page:

```js
analytics.identify('12345',{  name:'Jake Peterson', email:'jake.peterson@example.com'});
analytics.track('Account Created',{  authentication:'Facebook'})
```

[Identify](https://segment.com/docs/connections/sources/catalog/libraries/server/http/#identify) signals that the user of this browser is user `12345`. And also sets name and email as traits of user `12345`.

[Track](/docs/connections/spec/track) records an event that says `12345` registered for an account using Facebook.

### Advanced

#### Sending user traits from your server

There are some advantages to sending details about your users directly from your server once the become a registered user. Server-side [identify](/docs/connections/spec/identify) calls are invisible to the end user, making it a more secure transaction. Making calls from your server also isolates your tracking away from the wild world of web browsers, which means your tracking becomes much more reliable.

If you want to send user data that is sensitive and which you don't want to expose to the client, then you can make an `identify` call server-side with all the traits.

Let's take the Rdio example from above. If they're going to send traits from their server the client-side sequence on the welcome screen would become:

```js
analytics.identify('12345');
analytics.track('Account Created', { authentication:'Facebook'})
```

So far the user is only identified by their userId. Later, all the user's traits can be filled in using Python (or any of our other server-side [sources](https://segment.com/docs/connections/sources/catalog/libraries/server)).

```js
analytics.identify('12345',{
  'email':'jake.peterson@example.com',
  'name':'Jake Peterson',
  'friends':372,'city':'San Francisco',
  'state':'CA',
  'gender':'Male',
  'age':25,
  'plan':'Free'
})
```

#### Aliasing server-side

If you plan on tracking anonymous visitors from the browser and only calling [identify](/docs/connections/spec/identify)from your servers you'll need to call [alias](/docs/connections/spec/alias) for Kissmetrics and Mixpanel. That call links client-side anonymous visitors with server-side identified users. This isn't recommended, but if you must go down this road, read the [Kissmetrics](/docs/connections/destinations/catalog/kissmetrics/#aliasing-new-users-server-side)and[Mixpanel](/docs/connections/destinations/catalog/mixpanel/#alias-using-cloud-mode) specific [alias](/docs/connections/spec/alias) docs.

### Common questions

There are a few things that might cause your numbers to be off.

#### Missing signups

The most common problem people run into when tracking new user signups client-side is that only a portion of their new users are showing up in reports.

Usually this is caused by the page redirecting or reloading before the tracking calls get the chance to leave the page. That's why we recommend making those calls when the welcome page loads after the new user registers rather than trying to squeeze in the tracking calls on the signup page itself.

#### Anonymous history is lost

This is usually only an issue in [Mixpanel](/docs/connections/destinations/catalog/mixpanel#alias), since it's the only destination that requires a call to [alias](/docs/connections/spec/alias) in the browser to link anonymous browsing history to a new identified user.

Remember that [alias](/docs/connections/spec/alias) must be called before [identify](/docs/connections/spec/identify) is called for that user. Even if you're calling [identify](/docs/connections/spec/identify) server-side, it can't happen before the client-side [alias](/docs/connections/spec/alias).

#### When and how often to call identify

One of the most important things when it comes to tracking analytics is to identify the user. This is because when you call [identify](/docs/connections/spec/identify) with analytics.js, we will cache the `userId` in the browser cookie and store all the user traits in local storage. We do this so that all your subsequent [page](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#page) or [track](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track) calls will have the user data appended and properly attributed.

Since `analytics.js` puts the `userId`, `anonymousId`, and traits in localStorage, you will want to be sure to call `identify` on the client if you are passing in the UUID value for the `userId` on the server. This way, subsequent `track` and `page` calls will stamp the `userId` value passed through the client-side `identify` call.

**Note**: The user data will remain cached until you explicitly clear the browser cache or call [reset](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#reset-or-logout).

So don't forget to call [reset](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#reset-or-logout) upon user log out!

Our recommendation for when and how often you should call [identify](/docs/connections/spec/identify) is as follows:

1.  After a user registers

2.  After a user logs in

3.  Upon loading any pages that are accessible by a logged in user


The first two examples are pretty self-explanatory, but many might ask: why you would call `identify`on every page load if we're storing the `userId`in the cookie?

Let's imagine this scenario:

I log into your app. `identify` is called. For whatever reason, I close the browser and don't return until later. There's no way of knowing where I will reenter your app from. I could start my session from anywhere. And because there are many tools out there that require an initial `identify` call for certain features (e.g. Intercom chat widget) it's important to tell your end tools who the user is when they first start their session. It's better to be safe than sorry!
