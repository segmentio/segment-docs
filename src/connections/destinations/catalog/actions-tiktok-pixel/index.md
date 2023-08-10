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
4. Select an existing Javascript Source to connect to TikTok Pixel.
5. Give Destination a name.
6. On the Settings screen, provide Pixel Code and toggle "Use Existing Pixel" to use existing Pixel that is already installed on your website.
    - If you want to re-use the exsiting Pixel that has been installed separately, please toggle the "Use Existing Pixel" to prevent the Segment library from installing a new Pixel on your website.
    - Segment TikTok Pixel browser destination provides built-in presets for available web events that can be easily mapped to send web events via Pixel without any additional configuration.
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

## Advanced Matching

Advanced Matching helps you optimize your TikTok ads and drive performance by matching customer information with people on TikTok. Hashed customer information can be shared with any TikTok event to attribute more conversions, build bigger audiences and improve campaign optimization.

There are two ways to enable Advanced Matching: manual or automatic.

- **Manual Advanced Matching** is the passing of customer information to TikTok from your website. This can be implemented using code for each event on your website or if you're using a partner integration, you can enable Manual Advanced Matching in the data sharing settings of the partner platform. With this option, you have the flexibility to configure what information and for which event you want to pass to TikTok.
- **Automatic Advanced Matching** is when advertisers instruct TikTok to automatically identify form fields on pages where Pixel is installed and to hash and collect email and phone numbers entered on those pages for ad measurement and attribution purposes.

We recommend advertisers use both Manual and Automatic Advanced Matching at the same time, as this setting maximizes Advanced Matching's full performance.

Learn more about Automatic Advanced Matching and how to turn it on in our [help center](https://ads.tiktok.com/help/article/advanced-matching-web?lang=en).

## PII Hashing
TikTok will automatically hash value with sha256 before value enters TikTok's system.

- Normalize your phone numbers to E.164 format, a combination of +［country code]［phone number]. An example of a US number in the E.164 format: +12133734253
Recommend using [this library](https://github.com/catamphetamine/libphonenumber-js) for E.164 parsing.

## Data and Privacy Considerations

Please refer [here](https://ads.tiktok.com/i18n/official/policy/business-products-terms) for TikTok Business Products (Data) Terms.

---
