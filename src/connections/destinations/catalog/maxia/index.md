---
title: Maxia Destination
rewrite: true
---

[Maxia](https://www.maxia.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is an AI service that helps businesses with sales and marketing. With Maxia, you can build models that predict conversion, churn, and more - and get those predictions inside of the tools your company is already using: CRMs, Marketing Automation, Customer Success Software, and more.

This destination is maintained by Maxia. For any issues with the destination, [contact their support team](mailto:support@maxia.ai).

> note ""
> The Maxia Destination is currently in beta, which means that they are still actively developing the destination. To join their beta program, or if you have any feedback to help improve the Maxia Destination and its documentation, [contact the Maxia support team](mailto:support@maxia.ai)!


## Getting Started

{% include content/connection-modes.md %}

1. Login to [Segment](https://app.segment.com/) and navigate to the Destinations catalog page.
2. Search for and select "Maxia" in the Destinations Catalog.
3. Choose which Source should send data to the "Maxia" destination.
4. Login to [Maxia](https://app.maxia.ai/), and create a Warehouse for your Segment Data.
5. Complete an onboarding call with the Maxia team to discuss your AI model and unlock your API key.
6. Copy the "API key" from [Maxia](https://app.maxia.ai/) and enter it in the "Maxia" destination settings in [Segment](https://app.segment.com/).


## Segment Data

Maxia ingests `identify`, `track`, `page`, `group`, and `alias` events from the [Segment Spec](https://segment.com/docs/connections/spec/), and uses the data, including all event and user properties, to build AI models. Here's how each of the Segment calls help build your AI model:

## Identify
Maxia uses this data to understand: Who is the user? What are all the properties that make users different? How are the properties changing?

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

## Track
Maxia uses this data to understand: What is the user doing? How often are they doing it? What are all the actions the user could be doing? How are their actions changing?

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

## Page
Maxia uses this data to understand: What web pages is the user viewing? How often are they viewing it?

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

## Screen
Also, take a look at the [Screen method documentation](https://segment.com/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

## Group
Maxia uses this data to understand: What accounts/organizations/groups does the user belong to? Do your AI models need to make predictions at the group level instead of user level?

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](https://segment.com/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group('Blue Team')
```

## Alias
Maxia uses this data to understand: What was the user's past identity?

If you aren't familiar with the Segment Spec, take a look at the [Alias method documentation](https://segment.com/docs/connections/spec/alias/) to learn about what it does. An example call would look like:

```js
analytics.alias('old-user-id','new-user-id')
```
