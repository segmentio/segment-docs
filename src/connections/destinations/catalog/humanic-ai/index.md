---
title: Humanic AI Destination
id: 64b0e177091331e4a2a00c83
___

[Humanic AI](https://humanic.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is revolutionizing the CRM space to make it easier than ever for growing companies to maximize revenue from their existing users. Humanic is the industry's first PLG CRM for today’s modern revenue teams. With support from top industry veterans at DoorDash, Notion, Miro, Canvas, MailChimp and more - there's no better time explore what Humanic can offer your business!

Managing upwards of 1000+ active users can be an overwhelming task, and many CRMs struggle to keep up with the influx. If you need a reliable system that allows for user sorting based on payment or user activity, it's time to consider more robust solutions than traditional customer relationship management software. Read on for details on how the Humanic PLG CRM can help unlock revenue from your existing user base. To Sign up and explore right away [click here](https://humanic.ai/signup?utm_source=segmentio&utm_medium=docs&utm_campaign=partners).

This destination is maintained by Humanic. For any issues with the destination, [contact the Humanic Support team](mailto:support@humanic.ai).

## Getting Started

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Humanic AI" in the Destinations Catalog, and select the "Humanic AI" destination.
3. Choose which Source should send data to the "Humanic" destination.
4. Go to the [Humanic dashboard](https://dashboard.humanic.ai/dashboard/profile/){:target="_blank"}, Go to the API Keys tab and generate an API key and copy it. 
5. Enter the "API Key" in the "Humanic AI" destination settings in Segment.


## Supported methods

Humanic AI supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to record which web pages users have visited. For example:

```js
analytics.page("Pricing", {
  title: "Segment Pricing",
  url: "https://segment.com/pricing",
  path: "/pricing",
  referrer: "https://segment.com/warehouses",
});
```

Segment sends Page calls to Humanic AI as a `pageview`.

### Screen

Send [Screen](/docs/connections/spec/screen) calls to ecord which mobile app screens users have viewed. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"
                            properties:@{ @"Feed Type": @"private" }];
```

Segment sends Screen calls to Humanic AI as a `screenview`.

### Identify

Send [Identify](/docs/connections/spec/identify) calls to create new users or update existing users with new values. For example:

```js
analytics.identify('userId123', {
    email: 'john.doe@example.com',
});
```

Segment sends Identify calls to Humanic AI as an `identify` event.

### Track

Send [Track](/docs/connections/spec/track) calls to record user behavior in your app. For example:

```js
analytics.track('Login Button Clicked');
```

Segment sends Track calls to Humanic AI as a `track` event.

