---
title: Magellan AI (Actions) Destination
id: 661eca176680eee35d82c955
hidden: true
---

{% include content/plan-grid.md name="actions" %}

[Magellan AI](https://www.magellan.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} is the all-in-one platform for audio advertising intelligence, media planning, and measurement.

This destination is maintained by Magellan AI. For any issues with the destination, [contact their Measurement team](mailto:measurement@magellan.ai).

## Getting started

1. From your Segment workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Magellan AI".
2. Select "Magellan AI" and click **Add Destination**.
3. Select an existing Source to connect to Magellan AI (Actions), give your destination a name and click **Create destination**. 
4. Enter the campaign's **pixel token** in the destination settings in Segment. You can obtain this token either from the [Magellan AI pixel management dashboard](https://app.magellan.ai/navigator/measurement/pixels){:target="_blank"} or provided by your Magellan AI Measurement Success Manager. 
5. Configure which actions you want to send to Magellan AI.

(Optional) If you need Magellan AI to process GDPR deletion requests:
1. Contact your Magellan AI Measurement Success Manager to enable API access for your account.
2. Go to the [Magellan AI API access token page](https://app.magellan.ai/api_access_tokens){:target="_blank"} and generate a new API token.
3. Find and copy the new **API token**.
4. Enter the **API token** in the destination settings for your Magellan AI (Actions) destination.

{% include components/actions-fields.html %}

## Limitations

* Magellan AI only supports Segment's Replay feature for mobile events.

### Lead

Magellan AI's `Lead` action is semantically closest to Segment's [B2B SaaS `Signed Up` event](/docs/connections/spec/b2b-saas/#signed-up) and uses it as the default Trigger. However, Magellan AI's API spec considers `Lead` an e-commerce event, requiring a value and a currency. You may:
* Configure your sources sending `Signed Up` events to include the additional e-commerce-style fields
* Consider mapping an alternative event to the `Lead` action, like `Promotion Clicked` or `Product Added to Wishlist`, depending on your use case
* Map `Signed Up` events to the `Lead` action, providing dummy values in the mapping like `0` for the value and `USD` for the currency

### Install, Third-Party Event

Magellan AI's API spec requires a user agent, but Segment's [Analytics-Swift](/docs/connections/sources/catalog/libraries/mobile/apple/) library does not provide user agent information in the event context. In order to use this action with Segment's Swift library, you can provide either a static user agent string or a placeholder value in the mapping.
