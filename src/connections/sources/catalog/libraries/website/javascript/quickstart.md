---
title: 'Quickstart: Analytics.js'
hidden: true
sourceTitle: 'JavaScript'
sourceCategory: 'Website'
---


This tutorial will help you start sending data from your website to Segment and any of our destinations, using our Analytics.js library. As soon as you're setup you'll be able to turn on any new destinations with the flip of a switch!

If you want to dive deeper at any point, check out the [Analytics.js reference](/docs/connections/sources/catalog/libraries/website/javascript).


## Step 1: Copy the Snippet

Installing Segment is easy, just paste this snippet into the head of your site:

{% include content/snippet-helper.md %}

When you paste it, you'll need to replace `YOUR_WRITE_KEY` with your Segment project's **Write Key**, which you can find in your project setup guide or settings.

That snippet will load Analytics.js onto the page _asynchronously_, so it won't affect your page load speed. As soon as that snippet is running on your site, you can start turning on any destinations on your Segment destinations page and they will start loading on your site automatically!

Note that you'll want to remove other native 3rd party destination code that you have on your site since it may cause issues if you turn on those same destinations (e.g. Google Analytics, Mixpanel, Customer.io, etc.) via Segment.

**Fun fact:** if you only want the most basic Google Analytics setup you can stop reading right now. You're done! Just switch on Google Analytics in our interface.

However, lots of analytics and marketing tools will need to record _who_ each user is on your site. If you're looking to use any tool that deals with the identity of your users, read on about the `identify` method...


## Step 2: Identify Users

The `identify` method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits you know about them. You can read more about it in the [identify reference](/docs/connections/sources/catalog/libraries/website/javascript#identify).

**Note:** You won't need to call `identify` for anonymous visitors to your site. We'll automatically assign them an `anonymousId`, so just calling `page` and `track` will still work just fine without `identify`.

Here's what a basic call to `identify` might look like:

```js
analytics.identify('f4ca124298', {
  name: 'Michael Bolton',
  email: 'mbolton@initech.com'
});
```

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

**Hold up though!** When you actually put that code on your site, you'll need to replace all those hard-coded strings with details about the currently logged-in user.

To do that, we recommend using a backend template to inject an `identify` call straight into the footer of **every page** of your site where the user is logged in. That way, no matter what page the user first lands on, they will always be identified. You don't need to call `identify` if your unique identifier (`userId`) is not known.

Depending on your templating language, that would look something like this:

```js
analytics.identify('\{{ user.id }}', {
  name: '\{{ user.fullname }}',
  email: '\{{ user.email }}'
});
```

With that call on your page, you're now successfully identifying every user that visits your site.

**Second fun fact:** if you only want to use a basic CRM setup, you can call it a day right now. Just switch on Salesforce, Intercom, or any other CRM you'd like to use from our interface and we'll start sending all of your user data to it!

Of course, lots of analytics tools record more than just _identities_... they record the actions each user performs too! If you're looking for a complete event tracking analytics setup, keep reading...


## Step 3: Track Actions

The `track` method is how you tell Segment about which actions your users are performing on your site. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track reference](/docs/connections/sources/catalog/libraries/website/javascript#track).

Here's what a call to `track` might look like when a user signs up:

```js
analytics.track('Signed Up', {
  plan: 'Enterprise'
});
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

```js
analytics.track('Article Bookmarked', {
  title: 'Snow Fall',
  subtitle: 'The Avalanche at Tunnel Creek',
  author: 'John Branch'
});
```

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

Once you've added a few `track` calls, **you're done!** You successfully installed Analytics.js tracking. Now you're ready to turn on any destination you fancy from our interface, margarita in hand.


---


## What's Next?

We just walked through the quickest way to get started with Segment using Analytics.js. You might also want to check out our full [Analytics.js reference](/docs/connections/sources/catalog/libraries/website/javascript) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http) to get a sense for the bigger picture.

If you're running an **Ecommerce** site or app you should also check out our [Ecommerce API reference](/docs/connections/spec/ecommerce/v2/) to make sure your products and checkout experience are instrumented properly!
