---
title: "WP eCommerce Plugin [Deprecated]"
hidden: true
---

{% include content/deprecated.md %}

Installing Segment in a WP eCommerce store is extremely simple and doesn't require any code! All you have to do is install the Segment WordPress plugin and add your Segment **Write Key**.


## Step 1: Install the Plugin

The first thing you need to do is install the Segment plugin on your WordPress site. You can find it in the WordPress plugin directory by searching for "Segment Analytics". Or download the `.zip` [file from GitHub](https://github.com/segmentio/analytics-wordpress).


## Step 2: Segment Account

Next you need to create a Segment account. We recommend creating an organization as well so you can invite teammates.

Once your account is created, create a new source for your store. Once you see the Setup page, copy your **Write Key** and paste it into your analytics settings by going to **Settings > Analytics** in your WP admin.

Segment is now loading on your WP eCommerce Site! We also collect your most important events automatically, see a full list [below](#automatic-events).


## Step 3: Try Out Tools

The last step is to have some fun. Explore the Segment destinations page to find interesting new tools and sign up for a few free trials to see what works for your business. The WP eCommerce plugin allows you to use any destinations that we support in the browser.


## Automatic Events

The Segment WordPress plugin automatically collects some important WP eCommerce events. No code is needed for it to work!

Here's a list of events we collect automatically:

- Viewed Category Page
- Viewed Product (with product details as properties)
- Added Product (with product details as properties)
- Removed Product (with product details as properties)
- Viewed Cart Page
- Completed Order (with order and product details as properties)

We'll also record all the default events that all WordPress users get! Check out the [docs for the standard plugin](/docs/sources/website/guides/wordpress) for more information.
