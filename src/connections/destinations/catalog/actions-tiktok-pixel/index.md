---
title: [integration_name] Destination
---

{% include content/plan-grid.md name="actions" %}

[TikTok Pixel](https://ads.tiktok.com/marketing_api/docs?id=1739583652957185) is a piece of code that you can place on your website that allows you to share website events with TikTok. With any of our TikTok for Business Tools, the pixel can help you measure traffic on your website, measure ad campaign performance, optimize your campaigns and find new customers.

**Benefits**
- **Build marketing audiences**: Create Custom Audiences based on website visitor events, like viewing a product page or making a purchase. Audiences can be used to re-engage previous site visitors or model lookalikes to find new customers. 
- **Optimize ad delivery**: Target audiences that are more likely to initiate a website event by setting an optimization goal on visitor events like add to cart, view page or purchase. 
- **Measure campaign performance**: Measure your ad performance and return on ad spend (ROAS) based on a series of conversion events you define.

This destination is maintained by Tiktok. For any issues with the destination, [contact their Support team](mailto:segmenteng@bytedance.com).

{% include content/ajs-upgrade.md %}

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure TikTok Pixel**.
4. Select an existing Source to connect to TikTok Pixel.
5. Give Destination a name.
6. On the Settings screen, provide Pixel Code and toggle "Use Existin Pixel" to use existing Pixel that is already installed on your website.
7. Toggle on the Destination.
8. Hit the Save Change button.

**Mappings Enabled by Default**

After setting up the Destination, seven mappings will be enabled by default. You can click on the mappings tab to view and edit these mappings.

- **View Content**: When a page is viewed
- **Search**: When a search is made
- **Add to Wishlist**: When an item is added to a wishlist
- **Add to Cart**: When an item is added to the shopping cart
- **Initiate Checkout**: When the checkout process is started
- **Add Payment Info**: When payment information is added in the checkout flow
- **Place an Order**: When an order is placed

{% include components/actions-fields.html %}

## Getting Started with Pixel & Obtaining Pixel Code
Please refer to the [TikTok Help Center documentation](https://ads.tiktok.com/help/article/get-started-pixel?redirected=2) to learn more about how to get started with TikTok Pixel. Once the Pixel is created, please retrieve the Pixel Code from TikTok Events Manager (TTEM).

## PII Requirement & Validation
The email addresses and phone numbers need to be hashed using SHA-256 before they are sent to TikTok. Please normalize and hash the PIIs before sending them to Segment. In addition, TikTok Pixel Destination will validate all web events before forwarding them to TikTok.

**Important notes for passing PIIs**

**Emails**
- Must reduce all letters into lowercase prior to hashing.
- Leading/Trailing spaces need to be trimmed before hashing.
- Do not perform any other types of normalization on emails prior to hashing.
- Only sha-256 is accepted. Here is the [recommended package](https://github.com/emn178/js-sha256).

**Phone Numbers**
- Normalize your phone numbers to E164 format, a combination of+{country code}{phone number}.
- Recommend using [this package](https://github.com/catamphetamine/libphonenumber-js) for E164 parsing.
- Only sha-256 is accepted. Here is the [recommended package](https://github.com/emn178/js-sha256).

**External IDs**

- Leading/Trailing spaces need to be trimmed before hashing.

Please refer to the [TikTok Pixel Advanced Matching documentation](https://ads.tiktok.com/marketing_api/docs?id=1739585700402178) for additional information regarding sharing cusomter information with TikTok.

## Data and Privacy Considerations

Please refer [here](https://ads.tiktok.com/i18n/official/policy/business-products-terms) for TikTok Business Products (Data) Terms.

---
