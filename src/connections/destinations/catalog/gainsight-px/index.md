---
title: 'Gainsight PX Destination'
rewrite: true
redirect_from: 'docs/connections/destinations/catalog/aptrinsic'
---

[Gainsight PX](https://www.gainsight.com/product-experience/) (formerly known as Aptrinsic) provides a personalized product experience platform to help companies acquire, retain, and grow customers by creating real-time, personalized engagements driven by product usage data. With Gainsight PX, companies can implement an effective product-led go-to-market strategy that will increase product adoption and customer lifetime value.

Our Gainsight PX destination code is open sourced on Github, feel free to check it out: [Gainsight PX integration code](https://github.com/segment-integrations/analytics.js-integration-aptrinsic).

This document was last updated on Aug 2, 2019. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI's Destinations page click on "Add Destination".
2. Search for "Gainsight PX" within the Destinations Catalog and confirm the Source you'd like to connect to.
3. To find your Gainsight PX key, log into Gainsight PX and navigate to Settings > Products > Web App. If you have not already entered the URL for your web application, do that and click the Generate button. The Tag Key is the value to the right of the URL value. Use the "Copy" button to copy the value to your clipboard.

![](images/TagKey.png)

4. Paste the Gainsight PX Tag Key into the Segment connection settings API Key field.
5. We will automatically initialize Gainsight PX with your API key upon loading Analytics.js. In about 5-10 minutes the CDN will be updated and Gainsight PX snippet will be initialized onto your page. Note: By using this integration, you will not need to include the Gainsight PX tag on your page, it will be loaded automatically by Segment..

Don't miss out the [The Configuration Checklist - Segment.com](https://www.gainsight.com/product-experience/) in Gainsight PX!

## Identify
If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does.

An example identify call is shown below:

```js
analytics.identify('97980cfea0085', {
  email: 'gibbons@example.com',
  name: 'Monica Gibbons'
});
```

When you identify a user, we will pass that user's information to Gainsight PX with
userId as the Gainsight PX's user identifier. User traits are mapped to visitor
metadata in Gainsight PX. Any matching custom attributes will also be mapped into
Gainsight PX. You'll be able to find all users and traits in the "Audience explorer" in Gainsight PX.

Segment must be running on all of pages of your web application or site that you wish to use Gainsight PX on.
Your Segment integration must include use of the identify call (identifies the user & group/account).

## Track
If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does.

An example track call is shown below:

```js
analytics.track("Form submitted", {
  product: "book",
  title: "The Name of the Wind"
});
```

When you track an event, we will send the event name together with the properties included in the track call. In Gainsight PX you will be able to create new funnels based on the custom events and properties received from Segment. You can also add "custom events" in the features created in the "Product Mapper" view.

## Group
If you haven't had a chance to review our spec, please take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does.

An example group call is shown below:

```js
analytics.group("0e8c78ea9d9dsasahjg", {
  name: "group_name",
  employees: 3,
  plan: "enterprise",
  industry: "Technology"
});
```

When you call group, we will send groupId as the account id to Gainsight PX. Group
traits are mapped to account metadata in Gainsight PX.
