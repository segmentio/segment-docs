---
title: Ecommerce Tracking Plans
redirect_from:
  - '/protcols/data-quality/ecommerce-tracking-plans/'
  - '/protcols/ecommerce-tracking-plan/'
  - '/guides/sources/how-to-implement-an-ecommerce-tracking-plan/'
---

When tracking your data, it's important to set yourself up for success. E-commerce and retail companies want to use their data to understand why some customers fall out of their funnels or why customers become repeat buyers. They want to understand the important lifecycle events that lead up to the sale of a physical item, so they can, for example, test whether personalized shopping experiences yield higher conversions, or build a multi-channel cart abandonment campaign. But first, they need to make sure those lifecycle events are being captured in their datasets.

That's where a tracking plan comes in. A tracking plan is a living document that can be used across your organization to record what events and properties to track, where you'll be tracking them in your code base, and why you're tracking them.

[Learn more about the value and function of a tracking plan.](/docs/protocols/tracking-plan/create/)

In this guide, you'll learn the core events most relevant to e-commerce companies that can get you started immediately in understanding your customers and driving sales.

[Talk to a product specialist today](https://segment.com/contact/sales) about building a clean, high-quality data spec so you can focus on brand engagement and sales growth.

## Identifying your customers

Before diving into specific event tracking, you'll want to make sure you track who your users are with the the `.identify()` call. You should call `.identify()` whenever a visitor provides you with a piece of information, at which point they become "known users." The `.identify()` call creates or updates a record of your customer with a set of traits in your tools and warehouse. But how do you choose which traits about your user to include?

Traits are pieces of data that you track about a specific user. Read the guide about selecting traits to learn more.

Here are the most common user traits e-commerce companies include in their tracking:

- first name
- last name
- email


Here are a few examples of other helpful user traits:

- locale
- currency
- phone
- lifetime\_value
- order\_count


Here is a sample `.identify()` call for Segment:

In analytics.js:

```js
    analytics.identify({
      first_name: 'Andy',
      last_name: 'Jiang',
      email: 'andy@segment.com'
    });
```

In analytics-ios:

```objc
    [[SEGAnalytics sharedAnalytics] identify:nil
                                    traits:@{ @"email": @"andy@segment.com",
                                              @"first_name": @"Andy",
                                              @"last_name": @"Jiang",
                                              @"experiment_viewed": @"Coupon" }];
```

In analytics-android:

```java
    Analytics.with(context).identify(new Traits().putValue("first_name", "andy").putValue("last_name", "jiang").putValue("experiment_viewed", "Coupon").putValue("email", "andy@segment.com"), null);
```

The main benefits of using the traits listed above are:

- You can use the traits to personalize content in your email or push notification tools by inserting their information. For example:

- You can create cohorts based on the traits in any of your tools. For example, you could use `order_count` to determine how many of your users are first or repeat, or `experiments` to determine how many have seen this particular experiment variant


Given the power you have in your downstream tools to create cohorts based on these dimensions, you may be tempted to throw more contextual data into the `traits` , such as UTM params, IP addresses, and userAgents. But if you're using Segment's client-side analytics.js library, then all of these contextual pieces of data are automatically collected.

## Selecting key e-commerce and marketing events

Now that you are tracking who your users are, you can work on what they're doing on your website or in your app with a `.track()` call. Tracking customer events lets you learn about your customers, measure the impact of your marketing efforts and product decisions, and proactively engage your customers in a meaningful way that drives sales.

[Read the event tracking guide to learn more about tracking the right events.](/docs/protocols/tracking-plan/best-practices/)

E-commerce businesses, unlike SaaS or consumer apps that optimize for product engagement, focus on directing users down their funnels to a conversion goal, like purchasing a product. To best understand why customers convert, it's important to track and measure all key funnel events.

- Product Viewed
- Product Added
- Checkout Started
- Order Completed


There are also auxiliary actions to track to measure your customer's engagement with your site. These actions are good to track so you can better understand their intent on your website.

- Products Searched
- Product List Viewed
- Product List Filtered


Lastly, Segment has a set of semantic campaign events that are automatically collected so you can understand the conversions in these specific channels:

- Email Opened
- Email Link Clicked
- Push Notification Received
- Push Notification Tapped
- Deep Link Clicked
- Deep Link Opened


[Check out the full list of e-commerce events you should track.](/docs/connections/spec/ecommerce/v2)

You may notice a pattern in the event names. Segment selected the "Object Action" naming convention to ensure that all event data is clean and easily analyzable, while choosing "snake\_case" for the traits and properties. It doesn't matter what you choose, so long as it's consistent. Without a uniform and enforced naming framework to guide developers that add tracking code later, your data could get marred with conflicting naming structures. Learn more about the importance of naming conventions.

_Segment recommends tracking core checkout activity on the server-side. Learn more about_ [tracking on the client vs. server](/docs/guides/how-to-guides/collect-on-client-or-server/).

## Selecting your properties

Properties are similar to traits, but they're associated with specific actions, rather than with an individual user. Each `.track()` call can accept an optional dictionary of `properties`, which can contain any key-value pair you want. These `properties` act as dimensions that allow your end tool to group, filter, and analyze the events. They give you additional detail on broader events.

[Learn more about properties and what they mean for your downstream analysis.](https://segment.com/academy/collecting-data/the-anatomy-of-a-track-call/)

For e-commerce, since most events are customers choosing, browsing, and checking out products, all of the traits must contain key information about the products themselves:

- product\_id
- sku
- price
- quantity
- currency


These traits must be included because many tools rely on them for analysis. If there was one of them missing, the call would be ignored.

_Using a specific tool and want to see how Segment handles sending calls to it?_ [Check out the documentation.](/docs/connections/destinations/)

Here is an example `.track()` call:

In analytics-node:

```js
    analytics.track({
      userId: '019mr8mf4r',
      event: 'Order Completed',
      properties: {
        order_id: '50314b8e9bcf000000000000',
        total: 20,
        currency: 'USD',
        products: [
          {
            product_id: '507f1f77bcf86cd799439011',
            sku: '201',
            name: 'Folsom',
            price: 10,
            quantity: 1
          },
          {
            product_id: '505bd76785ebb509fc183733',
            sku: '204',
            name: 'Brennan',
            price: 10,
            quantity: 1
          }
        ]
      }
    });
```

In analytics-ios

```objc
    [[SEGAnalytics sharedAnalytics] track:@"Order Completed"
                          properties:@{ @"order_id": @"50314b8e9bcf000000000000",
                                           @"total": @"20",
                                        @"currency": @"USD",
                                        @"products": @"Coupon" }];
```

In analytics-android:

```java
    Analytics.with(context).track("Order Completed", new Properties().putValue("order_id", "50314b8e9bcf000000000000").putValue("total", 20).putValue("currency", "USD").putValue("products", "Coupon"));
```

It's important that these events contain particular properties, such as `sku` , otherwise the downstream tools won't be able to create out-of-the-box revenue and sales reports. Learn more about semantic properties in the e-commerce spec.

## Using data to understand why your customers don't convert

The most successful e-commerce businesses not only efficiently move their customers through the funnel towards conversion, but also have the infrastructure to collect and use customer data. Having a tracking plan focused on key funnel events can help e-commerce businesses get a sense of the health of their funnel.

Aside from funnel health, having these key pieces of customer data gives companies the ability to tailor and personalize each interaction, as well as build marketing campaigns around actions taken or omitted.

Without taking this critical step of mapping out key customer events, businesses often spend too much time revisiting their data model or analyzing impartial data sets. Instead they could spend that time understanding and addressing customers' needs.

[Talk to a product specialist today](https://segment.com/contact/sales) _about building a clean, high-quality data spec so you can focus on brand engagement and sales growth._
