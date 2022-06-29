---
rewrite: true
title: Variance Destination
id: 6099bbbc3d51136d7d293b0c
---
[Variance](https://variance.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) hooks into your customer data and makes it easy to access growth signals across product, marketing, and sales. The platform provides your growth team with clear, intent-based signals, from all stages of a customer's journey.

This destination is maintained by Variance. For any issues with the destination, [contact the Variance Support team](mailto:support@variance.com).

## Getting Started


1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Variance" in the Destinations Catalog, and select the Variance destination.
3. Choose which Source should send data to the Variance destination.
4. Go to the [Variance Integrations page](http://app.variance.com/integrations){:target="_blank"} (you'll see it in the main nav under your company name).
5. Click **Add Connection**.
6. Give your connection a name. If you use a descriptive name, you can use it as an event filter in Variance.
7. Choose a method for account matching. You can read more about these methods in the [Account Mapping](#account-mapping) section.
8. Find and copy the "Secret" and "Webhook URL" fields associated with this project.
9. Back in the Segment App, enter these as the **API Key** and **Webhook URL** fields in the Variance Destination settings.

## Supported methods

Variance supports the following methods of the [Segment Spec](/docs/connections/spec).

### Page

If you aren't familiar with the Segment Spec, take a look at the [Page method documentation](/docs/connections/spec/page/) to learn about what it does. An example call would look like:

```js
analytics.page()
```

Segment sends Page calls to Variance as a `Page` Event Type. 


### Screen

If you aren't familiar with the Segment Spec, take a look at the [Screen method documentation](/docs/connections/spec/screen/) to learn about what it does. An example call would look like:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"];
```

Segment sends Screen calls to Variance as a `Screen` Event Type. 


### Identify

If you aren't familiar with the Segment Spec, take a look at the [Identify method documentation](/docs/connections/spec/identify/) to learn about what it does. An example call would look like:

```js
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Segment sends Identify calls to Variance as a `Contact`.


### Track

If you aren't familiar with the Segment Spec, take a look at the [Track method documentation](/docs/connections/spec/track/) to learn about what it does. An example call would look like:

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

### Alias

If you're not familiar with the Segment Spec, take a look at the [Alias method documentation](/docs/connections/spec/alias/) to learn about what it does. An example call would look like this:

```js
analytics.alias('123456')
```

If there is an existing user with that `userId` in Variance that matches the `previousId` passed with the alias, that user will be merged into the "123456" user identified in the alias. If there is only one user with the `previousId` and no user with the `userId`, that user will have their Variance `externalId` updated to match the current `userId` passed in the alias.

## Account Mapping

Variance offers several ways to map your users to accounts or companies, including the following.

 - **Group**: If you already use the Group call to indicate the Account, then you don't need to change anything as Segment automatically extracts the Account name.
 - **Identify with custom traits** (for example `company.id` and `company.name`): Choose this option if you include some information about the Account, Company, or Organization as a trait in each Identify call. When you choose this option, add the name of the trait you use. For example, if you configure the call with the data `{'company':{'id':1,'name':'Awesome Inc.'}}`, add `company.id` as the Account ID trait and `company.name` as the Account Name trait.
 - **Identify email trait domain extraction** (Fallback option): If you don't use the methods above, Segment extracts the domain name from the `email` trait, and uses that value as the Account name.

> info ""
> If none of these methods work for your configuration, [contact Variance support](mailto:support@variance.com) to discuss alternatives.
