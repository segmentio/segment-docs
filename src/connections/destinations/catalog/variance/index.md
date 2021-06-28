---
rewrite: true
title: Variance Destination
---

[Variance](https://variance.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) hooks into your customer data and makes it easy to access growth signals across product, marketing, and sales. The platform provides your growth team with clear, intent-based signals, from all stages of a customer's journey.

This destination is maintained by Variance. For any issues with the destination, [contact the Variance Support team](mailto:support@variance.com).

## Getting Started

{% include content/connection-modes.md %}

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Variance" in the Destinations Catalog, and select the Variance destination.
3. Choose which Source should send data to the Variance destination.
4. Go to the [Variance Integrations page](http://app.variance.com/integrations){:target="_blank"} (you'll see it in the main nav under your company name).
5. Click **Add Connection**.
6. Give your connection a name. If you use a descriptive name, you can use it as an event filter in Variance.
7. Choose a method for account matching. Details on these methods can be found in the [Account Mapping](#Account-Mapping) section at the bottom of this doc.
8. Find and copy the "Secret" and "Webhook URL" fields associated with this project.
9. Back in the Segment App, enter these as the "API Key" and "Webhook URL" fields in the "Variance" Destination settings.

## Supported methods

Variance supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to *ADD WHAT PAGE CALLS ARE USED FOR HERE*. For example:

```js
analytics.page()
```

Segment sends Page calls to Variance as a `Page` Event Type.


### Screen

Send [Screen](/docs/connections/spec/screen) calls to *ADD WHAT SCREEN CALLS ARE USED FOR HERE*. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Variance as a `Screen` Event Type.


### Identify

Send [Identify](/docs/connections/spec/identify) calls to *ADD WHAT IDENTIFY CALLS ARE USED FOR HERE*. For example:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Variance as a `Contact`.


### Track

Send [Track](/docs/connections/spec/track) calls to *ADD WHAT Track CALLS ARE USED FOR HERE*. For example:

```js
analytics.track('Login Button Clicked')
```

Segment sends Track calls to Variance as an `Action` Event Type.


### Group

Send [Group](/docs/connections/spec/group) to Variance. For example:

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

As mentioned in the setup instructions, Variance offers multiple ways to map your users to accounts or companies. Here's an overview:

1. Group: if you already use the Group call to indicate the Account, then you don’t need to fill in anything. Segment extracts the Account name automatically.
2. Identify with custom traits (for example `company.id` and `company.name`): choose this option if you include some information about the Account, Company, or Organization as a trait in each Identify call. When you choose this option you'll need to add the name of the trait you use. For instance, if you configure the call with the data `{'company':{'id':1,'name':'Awesome Inc.'}}`, add `company.id` as the Account ID trait and `company.name` as the Account Name trait.
3. (Fallback) Identify email trait domain extraction: if you don't use either of the methods above, Segment extracts the domain from the `email` trait and uses that value as the Account name.

> info ""
> If none of the above work for your setup, [contact Variance support](mailto:support@variance.com) to discuss alternative configurations.
