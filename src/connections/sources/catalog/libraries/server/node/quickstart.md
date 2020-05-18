---
title: 'Quickstart: Node.js'
hidden: true
---

<!-- LR 4/21/2020: TODO: none of the quickstarts actually walk you through creating the source in the workspace -->

This tutorial will help you start sending data from your Node servers to Segment and any of our destinations, using our Node library. As soon as you're setup you'll be able to turn on any new destinations with the flip of a switch!

If you want to dive deeper at any point, check out the [Node library reference](/docs/connections/sources/catalog/libraries/server/node).


## Step 1: Install the Module

Installing Segment is easy, just run the following:

```
npm install --save analytics-node
```

That will add our Node library module to your `package.json`. The module exposes an `Analytics` constructor, which you need to initialize with your Segment project's **Write Key**, like so:

```javascript
var Analytics = require('analytics-node');
var analytics = new Analytics('YOUR_WRITE_KEY');
```

That will create an instance of `Analytics` that you can use to send data to Segment for your project. The default initialization settings are production-ready and queue 20 messages before sending any requests. In development you might want to use [development settings](/docs/connections/sources/catalog/libraries/server/node/#development).

Once you've got that, you're ready to...


## Step 2: Identify Users

The `identify` method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits you know about them. You can read more about it in the [identify reference](/docs/connections/sources/catalog/libraries/server/node#identify).

Here's what a basic call to `identify` might look like:

```js
analytics.identify({
  userId:'f4ca124298',
  traits: {
    name: 'Michael Bolton',
    email: 'mbolton@example.com',
    createdAt: new Date('2014-06-14T02:00:19.467Z')
  }
});
```

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

When you're using our Node library, you don't need to identify a user on every request they make to your servers. Instead, we recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits are change.

Once you've added an identify call, you can move on to...


## Step 3: Track Actions

The `track` method is how you tell Segment about which actions your users are performing. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track reference](/docs/connections/sources/catalog/libraries/server/node#track).

Here's what a call to `track` might look like when a user signs up:

```js
analytics.track({
  userId:'f4ca124298',
  event: 'Signed Up',
  properties: {
    plan: 'Enterprise'
  }
});
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

```js
analytics.track({
  userId:'f4ca124298',
  event: 'Bookmarked Article',
  properties: {
    title: 'Snow Fall',
    subtitle: 'The Avalanche at Tunnel Creek',
    author: 'John Branch'
  }
});
```

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Once you've added a few `track` calls, **you're done!** You successfully installed analytics tracking on your servers. Now you're ready to turn on any destination you fancy from our interface, margarita in hand.


---


## What's Next?

We just walked through the quickest way to get started with Segment using node. You might also want to check out our full [Node library reference](/docs/connections/sources/catalog/libraries/server/node) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http/) to get a sense for the bigger picture.

You might also want to consider installing [Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) so that you can use destinations that require being loaded in the browser, like live chat tools or user feedback systems.
