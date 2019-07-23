---
rewrite: true
---

[Vitally](https://vitally.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is a customer success platform for B2B SaaS companies that wraps your unified customer data with powerful analytics, alerts, and workflows to help you build successful customers.

This destination is maintained by Vitally. For any issues with the destination, please [reach out to their team](mailto:support@vitally.io).

_**NOTE:** Vitally is currently in beta, and this doc was last updated on February 7, 2019. This means that there may still be some bugs for us to iron out and we're excited to hear your thoughts. If you are interested in joining or have any feedback to help us improve the Vitally destination and its documentation, please [let us know](mailto:support@vitally.io)!_


## Getting Started

{{>connection-modes}} 

Enabling Vitally as a destination in Segment can be done in one click from your Vitally account. These instructions are also detailed in the [Vitally help center](http://docs.vitally.io/en/articles/3-sending-segment-data-to-vitally).

1. Navigate to the Segment integration page within your Vitally account. This can be found in your **Account Settings** in Vitally by navigating to the **Product Data** integrations list.

  ![](https://i.imgur.com/6fztyvS.png)

2. In a separate tab/window, make sure you are logged into your Segment account
3. Configure the Segment integration via the one-click "Enable with Segment" button. Choose the primary source of product usage data in Segment and Segment will automatically create a destination for Vitally: 

  ![](https://i.imgur.com/uGHrIvX.gif)

4. You'll now be able to see and manage your Vitally Destination directly from your Segment workspace

  ![](https://i.imgur.com/2JQwIBK.png)

5. That's it! Once we receive at least 1 event from Segment, you'll be able to proceed with the setup process and configure how to [create accounts from Segment](http://docs.vitally.io/en/articles/4)

## Identify

If you haven't had a chance to review the spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  name: 'John Doe',
  email: 'john.doe@yourcustomer.com',
  avatar: 'https://yourdomain.com/avatars/johndoe.png',
  role: 'CEO'
});
```

Identify calls are used by Vitally to maintain a picture of a single [user](http://docs.vitally.io/en/articles/17). The traits you pass to the Identify call will be displayed on the user's dashboard and can be used for sorting and filtering users within an account and across all of your users.

Passing along the following traits will correspond to what is displayed in Vitally:
  * `name` is used to set the name of the user in Vitally
  * `email` sets the user's email in Vitally
  * `avatar` is used to display an avatar for the user

## Track

If you haven't had a chance to review the spec, please take a look to understand what the [Track method](https://segment.com/docs/spec/track/) does. An example call would look like:

```
analytics.track('enabled-slack-integration', {
   channel: '#support'
})
```

Track calls are used in Vitally to [track and analyze](http://docs.vitally.io/en/articles/8) your accounts' engagement with your product. Vitally provides out-of-the box analysis on your events, plus the ability to define your own custom metrics on top of those events, like [Success Metrics](http://docs.vitally.io/en/articles/12-what-are-success-metrics) and [Elements](http://docs.vitally.io/en/articles/9).


## Group

If you haven't had a chance to review the spec, please take a look to understand what the [Group method](https://segment.com/docs/spec/group/) does. An example call would look like:

```
analytics.group("accountId123", {
  name: "Initech", 
  industry: "Technology", 
  plan: "enterprise", 
  mrr: 2000
});
```

Group calls are used by Vitally to maintain a picture of an [account](http://docs.vitally.io/en/articles/17). Any traits you pass to the Group call are [added to the account in Vitally](http://docs.vitally.io/en/articles/48-customer-traits) and can be used to analyze your customer base as a whole. You can view a customer's traits on their dashboard, use them for sorting and filtering, configure [rules](http://docs.vitally.io/en/articles/61-using-rules-to-automate-cs-needs) to automate your customer success process, and even create [segments](http://docs.vitally.io/en/articles/62) of your accounts.

Passing along the following traits will correspond to what is displayed in Vitally:
  * `name` is used to set the name of the account in Vitally
