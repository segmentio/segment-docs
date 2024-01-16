---
title: 'Quickstart: Analytics.js'
hidden: true
strat: ajs
---

This tutorial gets you started sending data from your website to Segment and any of Segment's destinations, using Segment's Analytics.js library. 

Want to learn more? Check out the [Analytics.js reference](/docs/connections/sources/catalog/libraries/website/javascript/).

## Step 1: Create a source in the Segment app

Before you begin, you need a Workspace (which is a container that holds all of the Sources and Destinations that are billed together for an organization). You can sign up for a free Segment account and create a workspace.

To create an Analytics.js source source in the Segment app: 
1. Click **Add Source**.
2. From the source catalog page, click **JavaScript**.
3. Click **Add Source** again from the informational panel that appears to the right.
4. Give the source a display name, and enter the URL the source will collect data from.

When you create a source in the Segment web app, it tells the Segment servers that you'll be sending data from a specific source type. When you create (or change) a source in the Segment app, Segment generates a new write key for that source. You use the write key in your website code to tell Segment servers where the data is coming from, so Segment can route it to your Destinations and other tools.


## Step 2: Install Segment to your site

You can choose to install Segment to your site in 1 of 2 ways:

[a. Install Segment as a NPM package](#step-2a-install-segment-as-a-npm-package)

[b. Add the Segment snippet to your app](#step-2b-add-the-segment-snippet)

### Step 2a: Install Segment as a npm package

To install Segment as a npm package: 

1. Install the analytics package.

    ```sh
    # npm
    npm install @segment/analytics-next

    # yarn
    yarn add @segment/analytics-next

    # pnpm
    pnpm add @segment/analytics-next
    ```

2. Import and initialize the analytics.

    ```js
    import { AnalyticsBrowser } from '@segment/analytics-next'

    export const analytics = AnalyticsBrowser.load({ writeKey: 'YOUR_WRITE_KEY' })

    // or 

    export const analytics = new AnalyticsBrowser()
    analytics.load({ writeKey: 'YOUR_WRITE_KEY' })
    ```

For more initialization patterns and general information on `@segment/analytics-next`, see the repository's [README](https://github.com/segmentio/analytics-next/tree/master/packages/browser){:target="_blank"}.

### Step 2b: Add the Segment Snippet

To add the Segment snippet to your app: 

Paste the snippet into the `<head>` tag of your site to install Segment.

  {% include content/snippet-helper.md %}

Replace `YOUR_WRITE_KEY` in the snippet you pasted with your Segment project's **Write Key**. [Find the write key](/docs/connections/find-writekey/) in your project set up guide or in the source's settings.

> info ""
> When you use Analytics.js in device-mode, the source's Write Key is public, because it runs in a user's browser and can be accessed using the browser's developer tools. If this is not acceptable to your organization, you can explore [other Segment Sources](/docs/connections/sources/catalog/) which collect data from a server-based installation, and which are not accessible to the user.

That snippet loads Analytics.js onto the page _asynchronously_, so it won't affect your page load speed. Once the snippet is running on your site, you can turn on destinations from the destinations page in your workspace and they start loading on your site automatically.

Note that you should remove other native third-party destination code that you might have on your site. For example, if you're using Segment to send data to Google Analytics, make sure you remove the Google Analytics snippet from your site source code to prevent sending the data twice.

> info ""
> If you only want the most basic Google Analytics setup, there's no need to continue with the setup. Just toggle on Google Analytics in the Segment interface.

A lot of analytics and marketing tools need to record who each user is on your site. If you want to use any tool that deals with the identity of your users, read on about the Identify method.

## Step 3: Identify users

> info ""
> For any of the different methods described in this quickstart, you can replace the properties and traits in the code samples with variables that represent the data collected.

The Identify method is how you tell Segment who the current user is. It includes a unique User ID, and any optional traits you know about them. You can read more about it in the [identify method reference](/docs/connections/sources/catalog/libraries/website/javascript#identify).

You don't need to call Identify for anonymous visitors to your site. Segment automatically assigns them an `anonymousId`, so just calling `page` and `track` works just fine without Identify.

Here's what a basic call to Identify might look like:

```js
analytics.identify('f4ca124298', {
  name: 'Michael Brown',
  email: 'mbrown@example.com'
});
```
This identifies Michael by his unique User ID (in this case, `f4ca124298`, which is what you know him by in your database) and labels him with `name` and `email` traits.

When you actually put that code on your site, you need to replace those hard-coded trait values with the variables that represent the details of the currently logged-in user.

To do that, Segment recommends that you use a backend template to inject an Identify call into the footer of every page of your site where the user is logged in. That way, no matter what page the user first lands on, they will always be identified. You don't need to call Identify if your unique identifier (`userId`) is not known.

Depending on your templating language, your actual Identify call might look something like this:

```js
{% raw %}
analytics.identify(' {{user.id}} ', {
  name: '{{user.fullname}}',
  email: '{{user.email}}'
});
{% endraw %}
```

With that call in your page footer, you successfully identify every user that visits your site.

If you only want to use a basic CRM setup, you can stop here. Just enable Salesforce, Intercom, or any other CRM system from your Segment workspace, and Segment starts sending all of your user data to it.

A lot of analytics tools record more than just _identities_ as they record the actions each user performs too. If you're looking for a complete event tracking analytics setup, keep reading...


## Step 4: Track actions

The Track method is how you tell Segment about the actions your users are performing on your site. Every action triggers what's called an "event", which can also have associated properties. You can read more about Track in the [track method reference](/docs/connections/sources/catalog/libraries/website/javascript#track).

Here's what a call to a Track call might look like when a user signs up:

```js
analytics.track('Signed Up', {
  plan: 'Enterprise'
});
```

That tells Segment that your user triggered the `Signed Up` event, and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

```js
analytics.track('Article Bookmarked', {
  title: 'Snow Fall',
  subtitle: 'The Avalanche at Tunnel Creek',
  author: 'John Branch'
});
```

If you're just getting started, some of the events you should track are events that indicate the success of your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, Segment recommends that you track just a few important events. You can always add more later.

After you add a few Track calls, you successfully installed Analytics.js tracking. Now you're ready to turn on any destination you like from the Segment interface.

## What's next?

You might want to check out the full [Analytics.js reference](/docs/connections/sources/catalog/libraries/website/javascript) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http/) to get a sense for the bigger picture.

If you're running an ecommerce site or app you should also check out Segment's [ecommerce API reference](/docs/connections/spec/ecommerce/v2/) to make sure your products and checkout experience are instrumented properly.
