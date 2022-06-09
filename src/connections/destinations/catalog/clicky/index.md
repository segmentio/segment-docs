---
title: Clicky Destination
rewrite: true
id: 54521fd525e721e32a72eea2
---
[Clicky](https://clicky.com/) is a web analytics tool that enables you to monitor, analyze, and react to your blog or web site's traffic in real time. Clicky supports user segmentation, so marketers can define and track customers based on unique constraints like user action, traffic source, location, or device. Additionally, it allows on-site analytics in order to track total visitors on site, pages currently viewed, and user actions like pageviews, downloads, sign ups, and session duration.

Our Clicky destination code is open-source on GitHub. You can check out the code [here](https://github.com/segment-integrations/analytics.js-integration-clicky).


## Getting Started

{% include content/connection-modes.md %}


1. From the Segment web app, click **Catalog**.
2. Search for "Clicky" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the destination settings, enter your Site ID in the settings. You can find your Site ID under the Preferences of your account.
4. Segment automatically initializes Clicky's script with your Site ID upon loading analytics.js.

- - -

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like this:

```javascript
analytics.page("Home",{
  path: "http://www.example.com/home"
});
```

When you call [`page`](/docs/connections/spec/page/), we call Clicky's `log` function with the current URL path and the `name` of the page. Clicky does not support event `properties` for page calls.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like this:

```javascript
analytics.identify('ze8rt1u89', {
  name: 'Zaphod Kim',
  gender: 'Male',
  email: 'jane.kim@example.com',
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

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```javascript
analytics.track("My Custom Event", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

When you use our [`track`](/docs/connections/spec/track/) method, a goal is created in Clicky. Only the event name and the revenue of the event (if it exists) will be included in the call. Clicky doesn't support any other event properties.

- - -

## Troubleshooting

### My visits aren't showing up in Clicky

When you login to Clicky, it automatically sets a cookie on your browser to ignore your visits to your website. If you need to test something, such as a goal or campaign, you'll want to use a different web browser or switch your browser to private/incognito mode.
