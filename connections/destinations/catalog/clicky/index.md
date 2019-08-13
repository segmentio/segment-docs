---
title: Clicky
---

[Clicky](https://clicky.com/) is a web analytics tool that enables you to monitor, analyze, and react to your blog or web site's traffic in real time. Clicky supports user segmentation, so marketers can define and track customers based on unique constraints like user action, traffic source, location, or device. Additionally, it allows on-site analytics in order to track total visitors on site, pages currently viewed, and user actions like pageviews, downloads, sign ups, and session duration.

Our Clicky destination code is open-source on GitHub. You can check out the code [here](https://github.com/segment-integrations/analytics.js-integration-clicky).

This document was last updated on July 30th, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!


## Getting Started

{% include content/connection-modes.md %}


1. From your Segment UI’s Destinations page click on "Add Destination".
2. Search for "Clicky" within the Destinations Catalog and confirm the Source you’d like to connect to.
3. Drop in your Site ID in the settings. You can find your Site ID under the Preferences of your account: ![Clicky Preferences](images/clicky-settings.png)
4. We’ll automatically initialize Clicky's script with your Site ID upon loading analytics.js.

- - -

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like this:

```javascript
analytics.page("Home",{
  path: "http://www.example.com/home"
});
```

When you call [`page`](/docs/spec/page/), we call Clicky's `log` function with the current URL path and the `name` of the page. Clicky does not support event `properties` for page calls.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like this:

```javascript
analytics.identify('ze8rt1u89', {
  name: 'Zaphod Beeblebrox',
  gender: 'Male',
  email: 'Zaphod@hotmail.com',
  phone: '1-401-826-4421',
  address: {
    city: 'San Francisco',
    state: 'Ca',
    postalCode: '94107'
  }
});
```

When you make an Identify call with Segment, we will create a Clicky custom session and we will map the traits of your event. We set the `username` of the user that is being identified based on the `traits.username` value that's included in the event. If the username value is not provided, then we default to the `email` trait and if, that is not included either, we default to the `name` included in the traits of the event.

## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```javascript
analytics.track("My Custom Event", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

When you use our [`track`](/docs/spec/track/) method, a goal is created in Clicky. Only the event name and the revenue of the event (if it exists) will be included in the call. Clicky doesn't support any other event properties.

- - -

## Troubleshooting

### My visits aren't showing up in Clicky

When you login to Clicky, it automatically sets a cookie on your browser to ignore your visits to your website. If you need to test something, such as a goal or campaign, you'll want to use a different web browser or switch your browser to private/incognito mode.
