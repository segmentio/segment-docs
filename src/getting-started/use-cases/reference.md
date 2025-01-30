---
title: Use Cases Reference
---

This reference guide provides detailed information on the suggested events, sources, and destinations for each Segment use case. Use this guide to ensure you're tracking the right events and connecting the best sources and destinations for your specific needs.

## Use Cases by business goal

The business goal you select during onboarding determines the use cases that Segment shows you.

This table lists each business goal and each of its corresponding use cases:

| Business Goal                                      | Use Cases                                                                                                                                                                                                         |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Optimize advertising                               | Build high-value lookalikes<br>Build lookalikes for app install<br>Increase signups with lookalikes<br>Mitigate cart abandonment<br>Mitigate high value churn<br>Suppress based on time<br>Suppress with purchase |
| Personalize first conversion                       | Accelerate app install<br>Accelerate onboarding<br>Accelerate signup<br>Acquire paid subscriptions<br>Convert trials to paid subscriptions<br>Mitigate cart abandonment<br>                                       |
| Boost retention, upsell, and cross-sell            | Build high value lookalikes<br>Increase repeat purchases<br>Mitigate high value churn<br>Nurture with content<br>Personalize upsell content<br>Personalize winback<br>                                            |
| Personalize communications and product experiences | Accelerate onboarding<br>Increase repeat purchases<br>Mitigate high value churn<br>Nurture with content<br>Personalize upsell content<br>Personalize winback<br>                                                  |

## Suggested events, sources, and destinations

This section contains tables for the different events, sources, and destinations that Segment recommends for each use case. 

### Optimize advertising

Click on each use case in this section to view Segment's recommendations for the Optimize advertising business goal, which helps you improve return on ad spend.

{% faq %}
{% faqitem Build high value lookalikes %}

This table shows the event and properties Segment recommends you track for the Build high value lookalikes use case, which helps you build from high-value purchasers through specific channels:
<br />
<br />

| Event           | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Build high-value lookalikes use case:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Analytics           |
| Reverse ETL     | Advertising         |
| Advertising     |                     |

{% endfaqitem %}
{% faqitem Build lookalikes for app install %}

This table shows the events and properties Segment recommends you track for the Build lookalikes for app install use case, which helps you build lookalikes from app installers in specific channels:
<br />
<br />

| Events                | Properties                                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Application Installed | `screen_id`, `screen_type`, `screen_title`, `version`, `build`, `from_background`, `referring_application` |
| Install Attributed    |                                                                                                            |
| Application Opened    | `screen_id`, `screen_type`, `screen_title`, `version`, `build`, `from_background`, `referring_application` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Build lookalikes for app install use case:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Analytics           |
| Reverse ETL     | Advertising         |
| Advertising     |                     |

{% endfaqitem %}
{% faqitem Increase signups with lookalikes %}

This table shows the events and properties Segment recommends you track for the Increase signups with lookalikes use case, which helps you build lookalikes from signups through specific channels.:
<br />
<br />

| Events      | Properties                            |
| ----------- | ------------------------------------- |
| Signed Up   | `first_name`, `last_name`, `username` |
| Page Viewed | `page_category`, `page_name`          |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Increase signups with lookalikes use case:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Analytics           |
| Reverse ETL     | Advertising         |
| Advertising     |                     |

{% endfaqitem %}
{% faqitem Mitigate cart abandonment %}

This table shows the events and properties Segment recommends you track for the Mitigate cart abandonment use case, which helps you win back users to drive purchases and understand funnel:
<br />
<br />

| Events          | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Checkout Started | `num_items`, `order_id`, `coupon`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `discount`      |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Mitigate cart abandonment use case, which helps you win back users to drive purchases and understand funnel:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Analytics           |
| Reverse ETL     | Advertising         |

{% endfaqitem %}
{% faqitem Mitigate high value churn %}

This table shows the event and properties Segment recommends you track for the Mitigate high value churn use case, which helps you anticipate churn for your highest value users and prevent them from churning:
<br />
<br />

| Event           | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Mitigate high value churn use case:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Analytics           |
| Reverse ETL     | Advertising         |

{% endfaqitem %}
{% faqitem Suppress based on time %}

This table shows the event and properties Segment recommends you track for the Suppress based on time use case, which helps you suppress users after a few days to keep campaigns fresh:
<br />
<br />

| Event           | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Suppress based on time use case:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Analytics           |
| Reverse ETL     | Advertising         |

{% endfaqitem %}
{% faqitem Suppress with purchase %}

This table shows the events and properties Segment recommends you track for the Suppress with purchase use case, which helps you suppress converted users immediately after a conversion:
<br />
<br />

| Events          | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |
| Page Viewed     | `page_category`, `page_name`                                                                             |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Suppress with purchase use case:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Analytics           |
| Reverse ETL     | Advertising         |

{% endfaqitem %}
{% endfaq %}

### Personalize first conversion

Click on each use case in this section to view Segment's recommendations for the Personalize first conversion business goal, which helps you convert prospective or free customers.

{% faq %}
{% faqitem Accelerate app install %}

This table shows the events and properties Segment recommends you track for the Accelerate app install use case, which helps you encourage app install with personalized messaging:
<br />
<br />

| Events        | Properties                      |
| ------------- | ------------------------------- |
| Page Scrolled | `pct_scrolled`, `page_category` |
| Page Viewed   | `page_category`, `page_name`    |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Accelerate app install use case:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Advertising         |
| Mobile          | Reverse ETL         |
| Reverse ETL     | Analytics           |
| Advertising     | Personalization     |

{% endfaqitem %}
{% faqitem Accelerate onboarding %}

This table shows the events and properties Segment recommends you track for the Accelerate onboarding use case, which helps you optimize new user activation based on real-time behavior:
<br />
<br />

| Events                    | Properties                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| Onboarding Step Completed | `step_name`, `step_number`, `total_steps`, `pct_completed`, `flow_name`, `screen_id`, `screen_type` |
| Onboarding Completed      | `checkout_id`, `order_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`                     |
| Signed In                 | `first_name`, `last_name`, `username`, `email`                                                      |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Accelerate onboarding use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Advertising              |
| Mobile      | Reverse ETL              |
| Reverse ETL | Analytics                |
|             | Personalization          |
|             | Email Marketing          |
|             | SMS & Push Notifications |

{% endfaqitem %}
{% faqitem Accelerate signup %}

This table shows the events and properties Segment recommends you track for the Accelerate signup use case, which helps you encourage anonymous users to sign up with messaging:
<br />
<br />

| Events        | Properties                            |
| ------------- | ------------------------------------- |
| Page Viewed   | `page_category`, `page_name`          |
| Page Scrolled | `pct_scrolled`, `page_category`       |
| Signed Up     | `first_name`, `last_name`, `username` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Accelerate signup use case:
<br />
<br />

| Sources     | Destinations    |
| ----------- | --------------- |
| Website     | Advertising     |
| Mobile      | Reverse ETL     |
| Reverse ETL | Analytics       |
| Advertising | Personalization |

{% endfaqitem %}
{% faqitem Acquire paid subscriptions %}

This table shows the events and properties Segment recommends you track for the Acquire paid subscriptions use case, which helps you engage customers at the right time to drive conversions:
<br />
<br />

| Events               | Properties |
| -------------------- | ---------- |
| Trial Started        | `category` |
| Subscription Started |            |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Acquire paid subscriptions use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Advertising              |
| Mobile      | Reverse ETL              |
| Reverse ETL | Analytics                |
| Advertising | SMS & Push Notifications |
|             | Email Marketing          |

{% endfaqitem %}
{% faqitem Convert trials to paid subscriptions %}

This table shows the events and properties Segment recommends you track for the Convert trials to paid subscriptions use case, which helps you get customers to upgrade through personalized messaging:
<br />
<br />

| Events               | Properties |
| -------------------- | ---------- |
| Subscription Started |            |
| Trial Started        | `category` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Convert trials to paid subscriptions use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Advertising              |
| Mobile      | Reverse ETL              |
| Reverse ETL | Analytics                |
| Advertising | SMS & Push Notifications |
|             | Email Marketing          |

{% endfaqitem %}
{% faqitem Mitigate cart abandonment %}

This table shows the events and properties Segment recommends you track for the Mitigate cart abandonment use case, which helps you win back users to drive purchases and understand funnel:
<br />
<br />

| Events          | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Checkout Started| `num_items`, `order_id`, `coupon`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `discount`      |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Mitigate cart abandonment use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Personalization          |
| Mobile      | Reverse ETL              |
| Reverse ETL | Analytics                |
|             | SMS & Push Notifications |
|             | Email Marketing          |

{% endfaqitem %}
{% endfaq %}

### Boost retention, upsell, and cross-sell

Click on each use case in this section to view Segment's recommendations for the Boost retention, upsell, and cross-sell business goal, which helps you increase repeat visits or purchases.

{% faq %}

{% faqitem Build high value lookalikes %}

This table shows the event and properties Segment recommends you track for the Build high value lookalikes use case, which helps you build from high-value purchasers through specific channels:
<br />
<br />

| Event           | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Build high value lookalikes use case:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Analytics           |
| Reverse ETL     | Advertising         |
| Advertising     |                     |

{% endfaqitem %}
{% faqitem Increase repeat purchases %}

This table shows the events and properties Segment recommends you track for the Increase repeat purchases use case, which helps you convert single-purchase buyers with personalized communications:
<br />
<br />

| Events          | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Page Viewed     | `page_category`, `page_name`                                                                             |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Increase repeat purchases use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Reverse ETL              |
| Mobile      | Personalization          |
| Reverse ETL | Analytics                |
|             | Email Marketing          |
|             | SMS & Push Notifications |
| Advertising |                          |

{% endfaqitem %}
{% faqitem Mitigate high value churn %}

This table shows the event and properties Segment recommends you track for the Mitigate high value churn use case, which helps you anticipate churn for your highest-value users and prevent them from churning:
<br />
<br />

| Event           | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Mitigate high value churn use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Reverse ETL              |
| Mobile      | Analytics                |
| Reverse ETL | Advertising              |
|             | SMS & Push Notifications |
|             | Email Marketing          |

{% endfaqitem %}
{% faqitem Nurture with content %}

This table shows the events and properties Segment recommends you track for the Nurture with content use case, which helps you use content personalized by interest to nurture leads or customers:
<br />
<br />

| Events        | Properties                                 |
| ------------- | ------------------------------------------ |
| Page Viewed   | `page_category`, `page_name`               |
| Screen Viewed | `screen_id`, `screen_type`, `screen_title` |
| Page Scrolled | `pct_scrolled`, `page_category`            |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Nurture with content use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Reverse ETL              |
| Mobile      | Analytics                |
| Reverse ETL | Email Marketing          |
|             | SMS & Push Notifications |

{% endfaqitem %}
{% faqitem Personalize upsell content %}

This table shows the events and properties Segment recommends you track for the Personalize upsell content use case, which helps you personalize upsell and cross-sell messaging while understanding behavior:
<br />
<br />

| Events                | Properties                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| Product Added to Cart | `product_id`, `product_name`, `product_brand`, `product_price`, `product_category`                       |
| Order Completed       | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Personalize upsell content use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Reverse ETL              |
| Mobile      | Personalization          |
| Reverse ETL | Analytics                |
|             | Email Marketing          |
|             | SMS & Push Notifications |

{% endfaqitem %}
{% faqitem Personalize winback %}

This table shows the events and properties Segment recommends you track for the Personalize winback use case, which helps you design personalized messaging based on user behavior:
<br />
<br />

| Events          | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Page Viewed     | `page_category`, `page_name`                                                                             |
| Page Scrolled   | `pct_scrolled`, `page_category`                                                                          |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Personalize winback use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Reverse ETL              |
| Mobile      | Personalization          |
| Reverse ETL | Analytics                |
|             | Email Marketing          |
|             | SMS & Push Notifications |

{% endfaqitem %}

{% endfaq %}

### Personalize communications and product experiences

Click on each use case in this section to view Segment's recommendations for the Personalize communications and product experiences business goal, which helps you engage your customers with relevant content.

{% faq %}
{% faqitem Accelerate onboarding %}

This table shows the events and properties Segment recommends you track for the Accelerate onboarding use case, which helps you optimize new user activation based on real-time behavior:
<br />
<br />

| Events                    | Properties                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| Onboarding Step Completed | `step_name`, `step_number`, `total_steps`, `pct_completed`, `flow_name`, `screen_id`, `screen_type` |
| Onboarding Completed      | `checkout_id`, `order_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`                     |
| Signed In                 | `first_name`, `last_name`, `username`, `email`                                                      |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Accelerate onboarding use case:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Personalization     |
| Mobile          | Reverse ETL         |
| Reverse ETL     | Analytics           |

{% endfaqitem %}
{% faqitem Increase repeat purchases %}

This table shows the events and properties Segment recommends you track for the Increase repeat purchases use case, which helps you convert single-purchase buyers with personalized communications:
<br />
<br />

| Events          | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Page Viewed     | `page_category`, `page_name`                                                                             |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Increase repeat purchases use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Reverse ETL              |
| Mobile      | Personalization          |
| Reverse ETL | Analytics                |
|             | Email Marketing          |
|             | SMS & Push Notifications |

{% endfaqitem %}
{% faqitem Mitigate high value churn %}

This table shows the event and properties Segment recommends you track for the Mitigate high value churn use case, which helps you anticipate churn for your highest-value users and prevent them from churning:
<br />
<br />

| Event           | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Mitigate high value churn use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Reverse ETL              |
| Mobile      | Analytics                |
| Reverse ETL | SMS & Push Notifications |
|             | Email Marketing          |

{% endfaqitem %}
{% faqitem Nurture with content %}

This table shows the events and properties Segment recommends you track for the Nurture with content use case, which helps you use content personalized by interest to nurture leads or customers:
<br />
<br />

| Events        | Properties                                 |
| ------------- | ------------------------------------------ |
| Page Viewed   | `page_category`, `page_name`               |
| Screen Viewed | `screen_id`, `screen_type`, `screen_title` |
| Page Scrolled | `pct_scrolled`, `page_category`            |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Nurture with content use case:
<br />
<br />

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Analytics           |
| Reverse ETL     | Email Marketing     |
|                 | SMS & Push Notifications |

{% endfaqitem %}
{% faqitem Personalize upsell content %}

This table shows the events and properties Segment recommends you track for the Personalize upsell content use case, which helps you personalize upsell and cross-sell messaging while understanding behavior:
<br />
<br />

| Events                | Properties                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| Product Added to Cart | `product_id`, `product_name`, `product_brand`, `product_price`, `product_category`                       |
| Order Completed       | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Personalize upsell content use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Reverse ETL              |
| Mobile      | Personalization          |
| Reverse ETL | Analytics                |
|             | Email Marketing          |
|             | SMS & Push Notifications |

{% endfaqitem %}
{% faqitem Personalize winback %}

This table shows the events and properties Segment recommends you track for the Personalize winback use case, which helps you design personalized messaging based on user behavior:
<br />
<br />

| Events          | Properties                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Page Viewed     | `page_category`, `page_name`                                                                             |
| Page Scrolled   | `pct_scrolled`, `page_category`                                                                          |
| Order Completed | `num_items`, `order_id`, `checkout_id`, `total`, `revenue`, `shipping`, `tax`, `affiliation`, `products` |

<br />
And this table shows the source and destination types that Segment recommends you set up for the Personalize winback use case:
<br />
<br />

| Sources     | Destinations             |
| ----------- | ------------------------ |
| Website     | Reverse ETL              |
| Mobile      | Personalization          |
| Reverse ETL | Analytics                |
|             | Email Marketing          |
|             | SMS & Push Notifications |

{% endfaqitem %}
{% endfaq %}