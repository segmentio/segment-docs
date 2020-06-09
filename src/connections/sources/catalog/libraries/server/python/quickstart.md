---
title: 'Quickstart: Python'
hidden: true
sourceTitle: 'Python'
sourceCategory: 'Server'
---

<!-- LR 4/21/2020: TODO: none of the quickstarts actually walk you through creating the source in the workspace -->

This tutorial will help you start sending data from your servers to Segment and any of our destinations, using our Python library. As soon as you're setup you'll be able to turn on any new destinations with the flip of a switch!

If you want to dive deeper at any point, check out the [Python library reference](/docs/connections/sources/catalog/libraries/server/python).


## Step 1: Install the library

You can install analytics-python via pip:

```bash
pip install analytics-python
```

If you're using a system for managing dependencies, you'll want to pin the library to `1.X` to avoid breaking changes when the library is updated

Then inside your app, you'll want to set your `write_key` before making any analytics calls:

```python
import analytics

analytics.write_key = 'YOUR_WRITE_KEY'
```

The default initialization settings are production-ready and will queue individual analytics calls. A separate background thread is responsible for making the requests to our API, so any calls to the library won't block your program's execution.

*Note*: If you need to send data to multiple Segment sources, you can initialize a new Client for each `write_key`!

Once you've got that, you're ready to...


## Step 2: Identify Users

The `identify` method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits you know about them. You can read more about it in the [identify reference](/docs/connections/sources/catalog/libraries/server/python#identify).

Here's what a basic call to `identify` might look like:

```python
analytics.identify('f4ca124298', {
    'name': 'Michael Bolton',
    'email': 'mbolton@example.com',
    'created_at': datetime.datetime.now()
})
```

That's identifying Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits.

When you're using our Python library, you don't need to identify a user on every request they make to your servers. Instead, we recommend calling `identify` a single time when the user's account is first created, and only identifying again later when their traits are changed.

Once you've added an identify call, you can move on to...


## Step 3: Track Actions

The `track` method is how you tell Segment about which actions your users are performing. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the [track reference](/docs/connections/sources/catalog/libraries/server/python/#track).

Here's what a call to `track` might look like when a user signs up:

```python
analytics.track('f4ca124298', 'Signed Up', {
  'plan': 'Enterprise'
})
```

That's just telling us that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

```python
analytics.track('f4ca124298', 'Article Bookmarked', {
    'title': 'Snow Fall',
    'subtitle': 'The Avalance at Tunnel Creek',
    'author': 'John Branch'
})
```

You'll want to track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

To get started, we recommend tracking just a few important events. You can always add more later!

And voila, **you're done!** You've just successfully installed analytics tracking on your servers. Now you're ready to turn on any destination you fancy from our interface, martini in hand.


---


## What's Next?

We just walked through the quickest way to get started with Segment using Python. You might also want to check out our full [Python library reference](/docs/connections/sources/catalog/libraries/server/python/) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http/) to get a sense for the bigger picture.

You might also want to consider installing [Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) so that you can use destinations that require being loaded in the browser, like live chat tools or user feedback systems.
