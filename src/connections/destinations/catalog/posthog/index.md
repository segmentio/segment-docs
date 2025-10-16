---
title: PostHog Destination
rewrite: true
id: 5ece242d61055a0b1bb2e103
---
[PostHog](https://posthog.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is an open-source suite of product and data tools including product analytics, session replays, feature flags, A/B testing, surveys, and more.

You can find out more about the destination in [PostHog's Segment documentation](https://posthog.com/docs/libraries/segment){:target="_blank"}.

This destination is maintained by PostHog. For any issues with the destination, ask a question in the [PostHog community](https://posthog.com/questions){:target="_blank"} or [contact the PostHog support team in-app](https://us.posthog.com/#panel=support).

## Getting started

1. From the destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "PostHog" in the Destinations Catalog, and select the PostHog destination.
3. Choose which source should send data to the PostHog destination.
4. Go to your [PostHog project settings](https://us.posthog.com/settings/project#variables){:target="_blank"}, and copy the **project API key**.
5. Enter the project API Key that you copied in the PostHog destination settings in Segment.
6. Enter your PostHog instance address **without any trailing slash**, for example:
    - `https://us.i.posthog.com` if you use PostHog US Cloud.
    - `https://eu.i.posthog.com` if you use PostHog EU Cloud.
    - Your self-hosted URL if you self-host.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to PostHog as a `$pageview`.


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```objc
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to PostHog as a `$screen` event.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to PostHog as an `$identify` event. Data from Identify calls appears in PostHog under the **People** tab.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to PostHog using the event name you provide.

## Alias

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias('507f191e81')
```

Segment sends Alias calls to PostHog as a `$create_alias` event.

## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
});
```

Segment sends Group calls to PostHog as a `$groupidentify` event. This creates or updates a group with the group type `segment_group` in PostHog. To create or update a group with a different group type, call `track` with a `$group` property.

```js
analytics.track('user_signed_up', {
    $groups: { company: 'Initech' }
})
```

## Adding custom session IDs
Segment doesn't include a Session ID with events. This means that events don't have session properties and won't work with PostHog web analytics. As an alternative, you can provide your own `$session_id`. For more information on formatting the session ID, see [PostHog's custom session IDs](https://posthog.com/docs/data/sessions#custom-session-ids){:target="_blank"} documentation.
