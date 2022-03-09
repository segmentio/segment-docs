---
rewrite: true
title: UserIQ Destination
id: 5c742629088b680001eb30bb
---
[UserIQ](http://useriq.com) empowers companies to deliver what each user needs to be successful in every moment, starting with adoption. Our platform collects user engagement data from your product and allows you to communicate to your users when they are most engaged: within the product itself.

This destination is maintained by UserIQ. For any issues with the destination, [contact the UserIQ Support team](mailto:support@useriq.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "UserIQ" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you can find from your [UserIQ dashboard](https://app.useriq.com/) [Site Settings -> API Key].

## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page("pageName")
```

Page calls will be sent to UserIQ as a `pageview`.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to UserIQ as a `screenview`.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to UserIQ as an `identify` event.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to UserIQ as a `track` event.
