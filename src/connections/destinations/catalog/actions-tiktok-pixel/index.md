---
title: [integration_name] Destination
---

{% include content/plan-grid.md name="actions" %}

[TikTok Pixel](https://ads.tiktok.com/marketing_api/docs?id=1739583652957185) is a piece of code that you can place on your website that allows you to share website events with TikTok. With any of our TikTok for Business Tools, the pixel can help you measure traffic on your website, measure ad campaign performance, optimize your campaigns and find new customers.

**Benefits**

Use data collected from TikTok Pixel to:
- **Build marketing audiences**: Create Custom Audiences based on website visitor events, like viewing a product page or making a purchase. Audiences can be used to re-engage previous site visitors or model lookalikes to find new customers. 
- **Optimize ad delivery**: Target audiences that are more likely to initiate a website event by setting an optimization goal on visitor events like add to cart, view page or purchase. 
- **Measure campaign performance**: Measure your ad performance and return on ad spend (ROAS) based on a series of conversion events you define.

This destination is maintained by Tiktok. For any issues with the destination, [contact their Support team](mailto:segmenteng@bytedance.com).

{% include content/ajs-upgrade.md %}

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for the 'TikTok Pixel' in the search bar, and then click on the Destination named 'TikTok Pixel'.
3. Click **Add Destination**.
4. Select an existing JavaScript Source to connect to TikTok Pixel.
5. Give the Destination a name.
6. On the Settings screen, provide the Pixel Code. This can be found in the TikTok Events Manager (TTEM).
    - Ensure that the "Use Existing Pixel" field is 'off' if you want Segment to load the TikTok Pixel JavaScript code onto your website.
    - Ensure that the "Use Existing Pixel" field is 'on' if you want Segment to detect and keep using the exsiting TikTok Pixel JavaScript snippet which has already been loaded on your website.
7. Toggle on the Destination using the 'Enable Destination' toggle.
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

Advanced Matching helps you optimize your TikTok ads and drive performance by matching customer information with TikTok users. Hashed customer information can be shared with any TikTok event to attribute more conversions, build bigger audiences and improve campaign optimization.

There are two types of Advanced Matching: manual or automatic.

**Manual Advanced Matching** is the passing of customer information to TikTok from your website. With this option, you have the flexibility to configure what information and for which event you want to pass to TikTok. This will be enabled automatically if PIIs are included in the Pixel events sent from TikTok Pixel Destination.

When email and/or phone number values are sent to TikTok, TikTok will try to match TikTok users using the PIIs that were sent to TikTok. If both email and phone number values are not sent to TikTok, TikTok will try to match TikTok users using IP and user-agent values that are included in the Pixel event payload.

**Automatic Advanced Matching** is when advertisers instruct TikTok to automatically identify form fields on pages where Pixel is installed and to hash and collect email and phone numbers entered on those pages for ad measurement and attribution purposes. Learn more about Automatic Advanced Matching and how to turn it on in [TikTok help center](https://ads.tiktok.com/help/article/advanced-matching-web?lang=en).

TikTok recommends advertisers use both Manual and Automatic Advanced Matching at the same time, as this setting maximizes Advanced Matching's full performance. 

## PII Hashing
TikTok will automatically hash value with sha256 before value enters TikTok's system.

- Phone number sent to TikTok should be normalized to the E.164 format. This format is a combination of +［country code]［phone number]. An example of a US number in the E.164 format: +12133734253

## Data and Privacy Considerations

Please refer [here](https://ads.tiktok.com/i18n/official/policy/business-products-terms) for TikTok Business Products (Data) Terms.

---
