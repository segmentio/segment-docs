---
title: Voucherify (Actions) Destination
private: true
hidden: true
id: 63f529a8af3478b5a5363c53
---
{% include content/plan-grid.md name="actions" %}

[Voucherify](https://voucherify.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} is an API-first Promotion Engine for growth teams. With Voucherify, marketers can run dynamic and personalized promotions and loyalty programs without the involvement of the development team. Run CDP-powered coupons, discounts, referrals, loyalty programs, gift cards, cashback, bundles, and more. The Destination integration provides a continuous flow of customer data from Segment to Voucherify to create custom events, create or update customers, and build audiences.

Voucherify maintains this destination. For any issues with the destination, [contact the Voucherify Support team](mailto:support@voucherify.io).

## Benefits of Voucherify (Actions) vs Voucherify (Classic)

The Voucherify (Actions) destination is bidirectional, which means you can configure Voucherify as both the destination and source of your customer data. The Destination Actions framework improves on classic destinations by enabling you to see and control how Segment sends the event data it receives from your sources to actions-based destinations. Each Action in a destination lists the event data it requires and the event data that is optional. You can also choose which event types, event names, or event property values trigger an Action. These Triggers and mappings make it possible to send different versions of the Action, depending on the context from which it is triggered.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it. 
3. Select Voucherify (Actions) and then **Configure Voucherify (Actions)**.
4. Select an existing Source to connect to Voucherify (Actions).
5. Enter the **API Key** and **API Token** into your Segment Settings UI, which you can find from your [Voucherify dashboard](https://voucherify.io/dashboard){:target="_blank"}.
6. Enter **Custom URL**. Check your API region in Voucherify dashboard -> Project settings -> API endpoint. Then use one of [API Endpoints](https://docs.voucherify.io/docs/api-endpoints) and replace the **API** word with `segmentio` For example, if your default URL is: https://us1.api.voucherify.io, then use: https://us1.segmentio.voucherify.io. It also works for dedicated URLs.
7. Select **Quick Setup** to start with pre-populated subscriptions, or **Customized Setup** to configure each action from scratch. 
8. Click **Configure Actions**.

### Find your API Key and API Token

On the Voucherify Dashboard page:
1. Open the **Project settings** from the user context menu on the top right.
2. Find the **Application Keys** section on the project page.
3. Use **Application ID** and **Secret Key** respectively as the **API Key** and **API Token**.

{% include components/actions-fields.html %}


