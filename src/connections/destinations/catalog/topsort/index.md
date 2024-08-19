---
title: Topsort Events Destination
id: 66ba237845b93b71bca2713e
beta: true
---

<!-- Include a brief description of the destination here, along with a link to your website. -->

This is a destination for eCommerce sites that want to use Segment, or are already using it, to Track actions on their site. It helps you seamlessly integrate Topsort events for sponsored listings.

[Topsort](https://www.topsort.com){:target="_blank"} is an AI-powered retail media platform enabling retailers and marketplaces to build their own high-performing ad networks, rivaling Google and Amazon. With its advanced auto-bidding algorithm and fast integration, Topsort provides an advertising solution that delivers exceptional returns on ad spend (ROAS) while respecting users privacy by being cookie-less.

Events integration is one of the 3 steps to integrate with Topsort (see [Integration Overview](https://docs.topsort.com/reference/integration-overview){:target="_blank"} for more details). It allows marketplaces to have a full metrics report available through Topsort's Reporting API or directly in the [Topsort Manager Platform](https://app.topsort.com){:target="_blank"} dashboards. It also provides the necessary information for the Topsort team to display relevant ads, optimize budget consumption, attribute purchases and accomplish sellers conversion goals.

This destination is maintained by Topsort. For any issues with the destination, [contact the Topsort Support team](mailto:support@topsort.com){:target="_blank"}.

<!-- The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination. -->

## Getting started

### Intro to Topsort Events

This destination will help you track the 3 main events Topsort needs to serve the most relevant ads and accomplish attribution for sponsored listings: `impressions`, `clicks` and `purchases`. Here is an explanation of what each one of these means to Topsort:

1. **Impression**: Every time a user sees a promoted product in a listing page (PLP) or section.
2. **Click**: If the user then clicks or adds the promoted product to a cart, then a `click` should be triggered.
3. **Purchase**: Finally, when an order is completed and confirmed to be successful, a `purchase` event should be reported to Topsort. You can report a purchase whether it has promoted products or not. We will take care of filtering relevant promoted products inside the completed order given the information about promoted clicks.

This destination has 3 default presets that map the Track events `'Product Viewed'`, `'Product Clicked'` and `'Order Completed'` to Topsort's `impression`, `click` and `purchase` events respectively. If you’re not familiar with the Segment Spec, take a look to understand what the [Track method](/docs/connections/spec/track/) does. The mappings in the Topsort destination are built based on the Segment [Ecommerce Spec](/docs/connections/spec/ecommerce/v2/). If you have different Segment Track events mapped to these action definitions then we can adapt this destination to your case. Once the destination is configured make sure to activate only the mappings relevant to your site, see point 5 of the [set up](#set-up-your-topsort-destination).

You don't need to change anything about the way you report Track events to segment. The only extra field you need to provide, only for the `impression` and `click` events, is the `resolvedBidId` given in the winner promoted product (whether it is from the [Auctions API](https://docs.topsort.com/reference/createauctions){:target="_blank"} or the [proxy](https://docs.topsort.com/reference/listings-low-code){:target="_blank"} response). Please find below an example call to track a product listing page (PLP) click event with the `resolvedBidId` included:

```js
analytics.track("Product Clicked", {
  product_id: product.id,
  name: product.name,
  resolvedBidId: product.resolvedBidId
});
```

### Set up your Topsort destination

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for "Topsort" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. In the [Topsort Manager Platform](https://app.topsort.com){:target="_blank"}, go to [Settings > API Integration](https://app.topsort.com/new/es/marketplace/account-settings/api-integration){:target="_blank"} find or create your **Marketplace API Key** for auctions and events.
4. Go back to the Topsort destination on the segment app and enter the value for your **Marketplace API Key**.
5. Make sure to enable only the Track events relevant to your site and so that the events do not get duplicated with a single user action. For example: If you always trigger a `Product Clicked` event together with the `Product Added` event when a user makes a click in the "Add to cart" button, then you should enable only the `Product Clicked` event for the Topsort Destination.

### Identify

Topsort strongly recommends that you identify your logged-in users using Segment's [Identify method](/docs/connections/spec/identify/) and that you hash the user ID before sending it to Topsort.

Please find an example Identify call below:

```js
analytics.identify('361b1fdfbeaa9d64a13c033eb9f970dc6740f6bc', {
  email: 'john.doe@example.com'
});
```

Once a user is identified, each call to Segment's [Track method](/docs/connections/spec/track/) automatically records the user ID.
Users that are not logged in can be tracked using an [anonymousID](/docs/connections/spec/identify/#anonymous-id).
