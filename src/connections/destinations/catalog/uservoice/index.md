---
rewrite: true
title: UserVoice Destination
id: 54521fdc25e721e32a72ef00
---
[Uservoice](https://www.uservoice.com/) is a customer support and feedback tool that lets your users submit feedback right from your site, and helps you manage all the incoming requests.

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "UserVoice" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Add your JavaScript API Key (Your API Key appears in the JavaScript snippet URL as widget.uservoice.com/APIKEY.js.) and enable the destination in Segment.
4. Segment automatically starts sending data from the source you selected

When you enable UserVoice from the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Uservoice's JavaScript onto your page.

Remember to remove UserVoice's native snippet from your page.

## Identify


If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
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

When you call `identify` the `userId` and `traits` included in the call will be set to the current user in UserVoice. For more details on identifying users on UserVoice, check [their documentation](https://developer.uservoice.com).

## Group

If you're not familiar with the Segment Specs, take a look to understand what the [Group method](/docs/connections/spec/group/) does. An example call would look like:

```
analytics.group("0e8c78ea9d97a7b8185e8632", {
  name: "Initech",
  industry: "Technology",
  employees: 329,
  plan: "enterprise",
  "total billed": 830
});
```

When you call `group` the `traits` included in the call will be set to the current user's **Account** in UserVoice. For more details on grouping users on UserVoice, check [their documentation](https://developer.uservoice.com/).

## Alias

If you're not familiar with the Segment Specs, take a look to understand what the [Alias method](/docs/connections/spec/alias/) does. An example call would look like:

```
analytics.alias("507f191e81");
```
For your implementation, make sure to replace "507f191e81" with your user's previous ID.

Calling `alias` connects anonymous visitors to identified users.
