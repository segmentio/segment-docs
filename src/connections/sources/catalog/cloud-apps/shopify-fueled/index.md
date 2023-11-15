title: Shopify - Powered by Fueled
---

[Fueled](https://fueled.io){:target="_blank"} is a 1st-party event collector, designed specifically for eCommerce. Fueled captures the first-party and zero-party events that fire on a Shopify website, and sends them to various destinations - most notably, Segment. Fueled leverages a combination of client-side and server-side event collection technologies to provide reliable, accurate event tracking. In addition to tracking website events in the browser, Fueled tracks offline purchase events, such as point-of-sale orders and subscription rebilling events triggered by Shopify apps like ReCharge Payments, Smartrr, Bold Subscriptions, and Skio.

With Fueled, Shopify merchants can implement Segment event tracking in minutes — without writing any code.

**Shopify merchants can try our Segment integration for free for 15 days.**

This integration is maintained by[Fueled](https://fueled.io){:target="_blank"}. [Contact the Fueled Support team](mailto:support@fueled.io) with any questions.

## Getting started

Installing Fueled's Shopify Source integration for Segment is a two-step process where you need to:
1. [Add the **Shopify - Powered by Fueled** source in Segment](#adding-the-shopify---powered-by-fueled-source-in-segment).
2. [Enable the **Fueled Attribution Suite** in Shopify](#enable-the-fueled-attribution-suite-in-shopify). 

### Add the "Shopify - Powered by Fueled" source in Segment

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Find *Shopify - Powered by Fueled* in the source Catalog, and click **Add Source**.
3. Give your Shopify Source a "nickname" and click **Save**.
4. Copy the Write key from the Segment UI.

### Enabling the "Fueled Attribution Suite" in Shopify

1. **Log in** to your Shopify Store account.
2. Go the [Shopify app store listing](https://apps.shopify.com/fueled-attribution-suite){:target="_blank”} for ***Fueled Attribution Suite***.
3. Click **Add app** to install the Fueled Attribution Suite.
4. Within the Fueled App in the Shopify Admin UI, click into the **Plans** tab and choose the **Fueled Advanced Plan**.
5. Once you have confirmed your Fueled Advanced Plan, go to the **Segment** tab.
6. Add the Segment Write key for the Segment Source that is going to send data in the **Segment Writekey** field form.
7. Configure client-side and server side tracking settings in the **Tracking Setup** tab.

## Stream

Fueled's Shopify Source streams events into Segment. It uses server-side methods to send `track` , `identify` , and `page` events to Segment. These events are then available in any Segment Destination that accepts server-side events, and are available in a schema in your data warehouse, so you can query using SQL.

The default behavior is for Fueled to pass the email address of identified users as the Segment `userId` , when it's available.

## Events

The table below lists events that Fueled's Shopify Source automatically sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Fueled's Shopify Source includes the `userId` (the Shoper customer's email address) if available.

Fueled's Shopify Source also supports *custom events* captured client-side by our javascript library and sent to Segment. To learn more about sending custom events to Segment, visit this [Learning Center article](https://learn.fueled.io/apps/shopify/shopify-event-tracking/customizing-client-side-shopify-events){:target="_blank”}.

### Fueled Standard Events

Fueled's Shopify Source integration follows Segment's [eCommerce event specification](https://segment.com/docs/connections/spec/ecommerce/v2/){:target="_blank”}.

Automatically tracked events are listed below:

| Event Name           | Description                                      |
| -------------------- | ------------------------------------------------ |
| Page                 | User viewed a page on the website                |
| Identify             | User identified themselves via log-in, account creation, or email signup |
| Account Created      | User created an account                          |
| Account Updated      | User updated their account                       |
| Cart Viewed          | User viewed their shopping cart                  |
| Checkout Started     | User initiated the order process                 |
| Order Completed      | User completed the order                         |
| Order Updated        | User updated the order                           |
| Product Added        | User added a product to their shopping cart      |
| Product Removed      | User removed a product from their shopping cart  |
| Product List Viewed  | User viewed a product list or collection         |
| Product Viewed       | User viewed a product details                    |
| Products Searched    | User searched for products                       |

## Event Properties

For a complete list of all event properties and how they map to specific Shopify Storefront APIs and objects, visit: [Fueled's Shopify-to-Segment Mapping Documentation](https://learn.fueled.io/integrations/destinations/segment.com/segment-event-specifications){:target="_blank”}.

## Headless Shopify Integrations

Fueled can be implemented on "headless" or "composable" Shopify sites. Fueled provides out-of-the-box integrations for:

* Pack Digital composable Shopify sites
* Headless Shopify sites running on TakeShape.io
* Composable Shopify sites running on Next Commerce

Contact [Fueled](mailto:support@fueled.io) for more information on these composable integrations.

## Additional Shopify App Source Integrations for Segment

Fueled offers Segment source integrations for a number of Shopify Marketplace apps. These integrations are available by contacting Fueled's customer support team at: [support@fueled.io](mailto:support@fueled.io).

Additional Segment integrations powered by Fueled include:

* ReCharge Payments subscription events (`subscription_created`, `subscription_paused`, `subscription_canceled`)
* Yotpo Reviews (`product_review_created`, `product_review_updated`, `site_review_created`, `site_review_updated`)
* Gorgias customer support events (`ticket_created`, `ticket_updated`)
* Loop Returns webhook events

## Add destinations

Now that your Shopify Source is set up, you can connect it with destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Fueled support team](mailto:support@fueled.io).
