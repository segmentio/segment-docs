---
title: 'Quickstart: Analytics.js'
hidden: true
strat: ajs
---

<!-- LR 4/21/2020: TODO: none of the quickstarts actually walk you through creating the source in the workspace -->


This tutorial gets you started sending data from your website to Segment and any of our destinations, using Segment's Analytics.js library. As soon as you're set up you can turn on new destinations with the flip of a switch!

Want to learn more? Check out the [Analytics.js reference](/docs/connections/sources/catalog/libraries/website/javascript/).


## Step 1: Copy the Snippet

Installing Segment is easy, just paste this snippet into the `<head>` tag of your site.

{% include content/snippet-helper.md %}

Next, replace `YOUR_WRITE_KEY` in the snippet you pasted with your Segment project's **Write Key**, which you can find in your project set up guide or settings.

**Note:** Analytics.js runs client-side on the user's browser, so your Write Key will be public and accessible.  If you are concerned with this, you can explore our collection of sources that run server-side.

That snippet loads Analytics.js onto the page _asynchronously_, so it won't affect your page load speed. Once the snippet is running on your site, you can turn on destinations from the destinations page in your workspace and they start loading on your site automatically!

Note that you should remove other native third-party destination code that you might have on your site. For example, if you're using Segment to send data to Google Analytics, make sure you remove the Google Analytics snippet from your site source code to prevent sending the data twice.

**Fun fact:** if you only want the most basic Google Analytics set up you can stop reading right now. You're done! Just switch on Google Analytics in our interface.

However, lots of analytics and marketing tools need to record _who_ each user is on your site. If you want to use any tool that deals with the identity of your users, read on about the `identify` method.

## Step 2: Identify Users

The `identify` method is how you tell Segment who the current user is. It includes a unique User ID, and any optional traits you know about them. You can read more about it in the [identify method reference](/docs/connections/sources/catalog/libraries/website/javascript#identify).

**Note:** You don't need to call `identify` for anonymous visitors to your site. Segment automatically assigns them an `anonymousId`, so just calling `page` and `track` works just fine without `identify`.

Here's what a basic call to `identify` might look like:

```js
analytics.identify('f4ca124298', {
  name: 'Michael Brown',
  email: 'mbrown@example.com'
});
```
That identifies Michael by his unique User ID (in this case, `f4ca124298`, which is what you know him by in your database) and labels him with `name` and `email` traits.

**Hold up though!** When you actually put that code on your site,you need to replace those hard-coded trait values with the variables that represent the details of the currently logged-in user.

To do that, we recommend that you use a backend template to inject an `identify` call into the footer of **every page** of your site where the user is logged in. That way, no matter what page the user first lands on, they will always be identified. You don't need to call `identify` if your unique identifier (`userId`) is not known.

Depending on your templating language, your actual identify call might look something like this:

```js
{% raw %}
analytics.identify(' {{user.id}} ', {
  name: '{{user.fullname}}',
  email: '{{user.email}}'
});
{% endraw %}
```

With that call in your page footer, you successfully identify every user that visits your site.

**Second fun fact:** if you only want to use a basic CRM set up, you can stop here. Just enable Salesforce, Intercom, or any other CRM system from your Segment workspace, and Segment starts sending all of your user data to it!

Of course, lots of analytics tools record more than just _identities_... they record the actions each user performs too! If you're looking for a complete event tracking analytics setup, keep reading...


## Step 3: Track Actions

The `track` method is how you tell Segment about the actions your users are performing on your site. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track method reference](/docs/connections/sources/catalog/libraries/website/javascript#track).

Here's what a call to `track` call might look like when a user signs up:

```js
analytics.track('Signed Up', {
  plan: 'Enterprise'
});
```

That tells us that your user triggered the **Signed Up** event, and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

```js
analytics.track('Article Bookmarked', {
  title: 'Snow Fall',
  subtitle: 'The Avalanche at Tunnel Creek',
  author: 'John Branch'
});
```

If you're just getting started, some of the events you should track are events that indicate the success of your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend that you track just a few important events. You can always add more later!

Once you add a few `track` calls, **you're done with this tutorial!** You successfully installed Analytics.js tracking. Now you're ready to turn on any destination you like from our interface, margarita in hand.


---


## What's Next?

We just walked through the quickest way to get started with Segment using Analytics.js. You might also want to check out our full [Analytics.js reference](/docs/connections/sources/catalog/libraries/website/javascript) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http/) to get a sense for the bigger picture.

If you're running an **Ecommerce** site or app you should also check out our [Ecommerce API reference](/docs/connections/spec/ecommerce/v2/) to make sure your products and checkout experience are instrumented properly!
