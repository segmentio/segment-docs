---
title: 'Quickstart: Analytics.js'
hidden: true
strat: ajs
---

This tutorial gets you started sending data from your website to Segment and any of our destinations, using Segment's Analytics.js library. As soon as you're set up you can turn on new destinations with the flip of a switch!

Want to learn more? Check out the [Analytics.js reference](/docs/connections/sources/catalog/libraries/website/javascript/).

## Step 1: Create a Source in the Segment app

Before you begin, you need a Workspace (which is a container that holds all of the Sources and Destinations that are billed together for an organization). If you already created one, great! If not, you can sign up for a free Segment account and create one.

Next create an Analytics.js source from your Workspace:

1. Click **Add Source**.
2. From the source catalog page, click **JavaScript**.
3. Click **Add Source** again from the informational panel that appears to the right.
4. Give the source a display name, and enter the URL the source will collect data from.

When you create a Source in the Segment web app, it tells the Segment servers that you'll be sending data from a specific source type. When you create (or change!) a Source in the Segment app, Segment generates a new Write Key for that source. You use the write key in your website code to tell Segment servers where the data is coming from, so Segment can route it to your Destinations and other tools.


## Step 2: Add the Segment Snippet

> success "Install Segment as an NPM package"
> You can add Segment to your project as an [NPM package](https://www.npmjs.com/package/@segment/snippet){:target="_blank"}. For more information, see the instructions on [GitHub](https://github.com/segmentio/analytics-next#-using-as-an-npm-package){:target="_blank"}.

Paste this snippet into the `<head>` tag of your site to install Segment.

{% include content/snippet-helper.md %}

Next, replace `YOUR_WRITE_KEY` in the snippet you pasted with your Segment project's **Write Key**. You can [find the write key](/docs/connections/find-writekey/) in your project set up guide or in the source's settings.

> note ""
> **Note:** When you use Analytics.js in device-mode the source's Write Key is public, because it runs in a user's browser and can be accessed using the browser's developer tools. If this is not acceptable to your organization, you can explore [other Segment Sources](/docs/connections/sources/catalog/) which collect data from a server-based installation, and which are not accessible to the user.

That snippet loads Analytics.js onto the page _asynchronously_, so it won't affect your page load speed. Once the snippet is running on your site, you can turn on Destinations from the Destinations page in your workspace and they start loading on your site automatically.

Note that you should remove other native third-party destination code that you might have on your site. For example, if you're using Segment to send data to Google Analytics, make sure you remove the Google Analytics snippet from your site source code to prevent sending the data twice.

**Fun fact:** if you only want the most basic Google Analytics set up you can stop reading right now. You're done! Just switch on Google Analytics in our interface.

However, lots of analytics and marketing tools need to record _who_ each user is on your site. If you want to use any tool that deals with the identity of your users, read on about the `identify` method.

## Step 3: Identify Users

> note ""
> **Good to know**: For any of the different methods described in this quickstart, you can replace the properties and traits in the code samples with variables that represent the data collected.

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

**Hold up though!** When you actually put that code on your site, you need to replace those hard-coded trait values with the variables that represent the details of the currently logged-in user.

To do that, we recommend that you use a backend template to inject an `identify` call into the footer of **every page** of your site where the user is logged in. That way, no matter what page the user first lands on, they will always be identified. You don't need to call `identify` if your unique identifier (`userId`) is not known.

Depending on your templating language, your actual `identify` call might look something like this:

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


## Step 4: Track Actions

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

Once you add a few `track` calls, **you're done with this tutorial!** You successfully installed Analytics.js tracking. Now you're ready to turn on any Destination you like from our interface, margarita in hand.


---


## What's Next?

We just walked through the quickest way to get started with Segment using Analytics.js. You might also want to check out our full [Analytics.js reference](/docs/connections/sources/catalog/libraries/website/javascript) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http/) to get a sense for the bigger picture.

If you're running an **Ecommerce** site or app you should also check out our [Ecommerce API reference](/docs/connections/spec/ecommerce/v2/) to make sure your products and checkout experience are instrumented properly!
