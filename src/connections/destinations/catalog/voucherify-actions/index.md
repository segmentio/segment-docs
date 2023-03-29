## title: Voucherify (Actions) Destination

{% include content/plan-grid.md name="actions" %}

> (delete after reading) Include a 1-2 sentence introduction to your company and the value it provides to customers - updating the name and hyperlink. Please leave the utm string unchanged.

[Voucherify](https://voucherify.io/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) an API-first Promotion Engine for growth teams. With Voucherify, marketers can run dynamic and personalized promotions and loyalty programs without the involvement of the development team. Run CDP-powered coupons, discounts, referrals, loyalty programs, gift cards, cashback, bundles, and more. The Destination integration provides a continuous flow of customer data from Segment to Voucherify to create custom events, create or update customers, and build audiences.

This destination is maintained by Voucherify. For any issues with the destination, [contact their Support team](mailto:support@voucherify.io).

> (delete after reading) The section below explains how to enable and configure the destination. Include any configuration steps not captured below. For example, obtaining an API key from your platform and any configuration steps required to connect to the destination.

## Getting started

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it. 
3. Select Voucherify (Actions) and then **Configure Actions Voucherify**.
4. Select an existing Source to connect to Voucherify (Actions).
5. Enter the **API Key** and **API Token** into your Segment Settings UI, which you can find from your [Voucherify dashboard](https://voucherify.io/dashboard){:target="_blank"}.
6. Enter the **Custom URL**. Check your API region in Voucherify dashboard -> Project settings -> API endpoint. For example: https://us1.api.voucherify.io -> https://us1.segmentio.voucherify.io. It also works for dedicated URLs.
7. Select **Quick Setup** to start with pre-populated subscriptions, or **Customized Setup** to configure each action from scratch. Click **Configure Actions**.

#### Getting API Key and API Token
On the Voucherify Dashboard page:
1. Open the "Project settings" from the user context menu on the top right.
2. Find the "Application Keys" section on the project page.
3. Use "Application ID" and "Secret Key" respectively as "API Key" and "API Token".

{% include components/actions-fields.html %}

> (delete after reading) Additional Context
>
> Include additional information that you think will be useful to the user here. For information that is specific to an individual mapping, please add that as a comment so that the Segment docs team can include it in the auto-generated content for that mapping.

## Benefits of Voucherify (Actions) vs Voucherify (Classic)

The integration works in outbound and inbound models, allowing brands to use Voucherify as both the Destination and Source of customer data. 
Previously developed Segment.io -> Voucherify integration uses Subscription Functions. To enable a simplified build experience and a more straightforward configuration, Segment launched a new type of Destination, which is called Destination Actions. The Destination Actions framework improves on classic destinations by enabling you to see and control how Segment sends the event data it receives from your sources to actions-based destinations. Each Action in a destination lists the event data it requires and the event data that is optional. You can also choose which event types, event names, or event property values trigger an Action. These Triggers and mappings make it possible to send different versions of the Action, depending on the context from which it is triggered.
