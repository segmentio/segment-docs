---
title: Use Cases Reference
hidden: true
---

This reference guide provides detailed information on the suggested events, sources, and destinations for each Segment Use Case. Use this guide to ensure you're tracking the right events and connecting the best sources and destinations for your specific needs.

## Use Cases by business goal

The business goal you select during onboarding determines the use cases that Segment shows you.

This table lists each business goal and each of its corresponding use cases:

| Business Goal                                      | Use Cases                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Optimize advertising                               | Build high-value lookalikes<br>Build lookalikes for app install<br>Increase signups with lookalikes<br>Mitigate cart abandonment<br>Mitigate high value churn<br>Suppress based on time<br>Suppress with purchase|
| Personalize first conversion                       | Accelerate onboarding<br>Increase repeat purchases<br>Mitigate high value churn<br>Nurture with content<br>Personalize upsell content<br>Personalize winback<br>                                                                                                                                                                                       |
| Boost retention, upsell, and cross-sell            | Build high value lookalikes<br>Increase repeat purchases<br>Mitigate high value churn<br>Nurture with content<br>Personalize upsell content<br>Personalize winback<br>                                                                                                                                                                                 |
| Personalize communications and product experiences | Accelerate app install<br>Accelerate onboarding<br>Accelerate signup<br>Acquire paid subscriptions<br>Convert trials to paid subscriptions<br>Mitigate cart abandonment<br>                                                                                                                                                                            |




## Suggested events, sources, and destinations

This section contains tables for the different events, sources, and destinations that Segment recommends each use case. 

### Optimize advertising

Here are....

{% faq %}
{% faqitem Build high value lookalikes %}

This table shows the events and properties Segment recommends you track for the Build high value lookalikes use case:
<br />
<br />

| Events          | Properties                                                                                               |
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
{% faqitem Build lookalikes for app install %}

This table shows the events and properties Segment recommends you track for the Build lookalikes for app install use case:
<br />
<br />

| Events                | Properties                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| Application Installed | `screen_id`, `screen_type`, `screen_title`, `version`, `build`, `from_background`, `referring_application` |
| Install Attributed    |                                                                                                          |
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

This table shows the events and properties Segment recommends you track for the Increase signups with lookalikes use case:
<br />
<br />

| Events      | Properties                     |
| ----------- | ------------------------------ |
| Signed Up   | `first_name`, `last_name`, `username` |
| Page Viewed | `page_category`, `page_name`   |

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

This table shows the events and properties Segment recommends you track for the Mitigate cart abandonment use case:
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

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Analytics           |
| Reverse ETL     | Advertising         |

{% endfaqitem %}
{% faqitem Mitigate high value churn %}

This table shows the events and properties Segment recommends you track for the Mitigate high value churn use case:
<br />
<br />

| Events          | Properties                                                                                               |
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

This table shows the events and properties Segment recommends you track for the Suppress based on time use case:
<br />
<br />

| Events          | Properties                                                                                               |
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

This table shows the events and properties Segment recommends you track for the Suppress with purchase use case:
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


<!-- -->

{% faq %}
{% faqitem Personalize winback %}

This table shows the events and properties Segment recommends you track for the Personalize winback use case:
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

| Sources         | Destinations        |
|-----------------|---------------------|
| Website         | Reverse ETL         |
| Mobile          | Personalization     |
| Reverse ETL     | Analytics           |

{% endfaqitem %}
{% endfaq %}