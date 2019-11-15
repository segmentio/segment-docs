---
rewrite: true
title: UserIQ Destination
---

[UserIQ](http://useriq.com) empowers companies to deliver what each user needs to be successful in every moment, starting with adoption. Our platform collects user engagement data from your product and allows you to communicate to your users when they are most engaged: within the product itself.

This destination is maintained by UserIQ. For any issues with the destination, please [reach out to their team](mailto:support@useriq.com).

_**NOTE:** The UserIQ Destination is currently in beta, which means that they are still actively developing the destination. This doc was last updated on March 0, 2019. If you are interested in joining their beta program or have any feedback to help improve the UserIQ Destination and its documentation, please [let  their team know](mailto:support@useriq.com)!_

## Getting Started

{{>connection-modes}}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "UserIQ" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. Drop in the "API Key" into your Segment Settings UI which you can find from your [UserIQ dashboard](https://app.useriq.com/) [Site Settings -> API Key].

## Page

If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
analytics.page("pageName")
```

Page calls will be sent to UserIQ as a `pageview`.


## Screen

If you haven't had a chance to review our spec, please take a look to understand what the [Screen method](https://segment.com/docs/spec/page/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Screen calls will be sent to UserIQ as a `screenview`.


## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@segment.com'
});
```

Identify calls will be sent to UserIQ as an `identify` event.


## Track

If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to UserIQ as a `track` event.
