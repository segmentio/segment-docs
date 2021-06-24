---
rewrite: true
title: Variance Destination
beta: true
---

[Variance](https://variance.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) hooks into your customer data and makes it easy to access growth signals across product, marketing, and sales. The platform provides your growth team with clear, intent-based signals, from all stages of a customer's journey.

This destination is maintained by Variance. For any issues with the destination, [contact the Variance Support team](mailto:support@variance.com).

> note "Note:"
> The Variance Destination is currently in beta, which means that they are still actively developing the destination. To join their beta program, or if you have any feedback to help improve the Variance Destination and its documentation, [contact the Variance support team](mailto:support@variance.com)!


## Getting Started

> Do not remove this line. It will auto-populate the following information for your integration: https://cl.ly/23e637f055f7

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Variance" in the Destinations Catalog, and select the "Variance" destination.
3. Choose which Source should send data to the "Variance" destination.
4. Go to the [Variance Integrations page](http://app.variance.com/integrations) (you'll see it in the main nav under your company name).
5. Click **Add Connection**.
6. Give your connection a name (descriptive is better as it can be used as an event filter in Variance).
7. Choose a method for account matching. Details on these methods can be found in the [Account Mapping](#Account-Mapping) section at the bottom of this doc.
8. Find and copy the "Secret" and "Webhook URL" fields associated with this project.
9. Back in the Segment App, enter these as the "API Key" and "Webhook URL" fields in the "Variance" Destination settings.

## Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](https://segment.com/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Variance as a `Page` Event Type.


## Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](https://segment.com/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Variance as a `Screen` Event Type.


## Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](https://segment.com/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Variance as a `Contact`.


## Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](https://segment.com/docs/connections/spec/track/) to learn about what it does. An example call would look like:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Variance as an `Action` Event Type.


## Group

If you aren't familiar with the Segment Spec, take a look at the [Group method documentation](https://segment.com/docs/connections/spec/group/) to learn about what it does. An example call would look like:

```js
analytics.group("groupId123", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise"
});
```

Segment sends Group calls to Variance as an `Account` if you've chosen the "Group" Account Mapping method during setup.

## Account Mapping

As mentioned in the setup instructions, Variance offers a few different ways of mapping your users to accounts/companies. Here's an overview:

1. Group: if you already use the Group call to indicate the Account, then you don’t need to fill in anything. We will extract the Account automatically, and you’re good to go.
1. Identify with custom traits (ex. `company.id` and `company.name`): choose this option if you include some information about the Account/Company/Organization as a trait in each Identify call. When you choose this option you'll need to let us know the name of the trait you use. For instance, if you do something like `{'company':{'id':1,'name':'Awesome Inc.'}}` you could add `company.id` as the Account ID trait and `company.name` as the Account Name trait.
1. (Fallback) Identify email trait domain extraction: if you don't use either of the methods above, we can extract the domain from the `email` trait and use that as the Account name.

Note: if none of these work for your setup, [reach out to Variance support](mailto:support@variance.com) and we can discuss alternatives.
