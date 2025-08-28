---
title: Drip (Actions) Destination
id: 673b62169b3342fbe0fc28da
redirect_from: /connections/destinations/catalog/drip-actions/
---

{% include content/plan-grid.md name="actions" %}

[Drip](https://www.getdrip.com){:target="_blank”} is a nurture marketing platform Empowering B2C SMBs to convert long-sales cycle prospects into lifelong buyers with sophisticated and personalized marketing automation.

This destination is maintained by Drip. For any issues with the destination, [contact their Support team](mailto:support@drip.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Drip (Actions)".
2. Select Drip (Actions) and click **Add Destination**.
3. Select an existing Source to connect to Drip (Actions).
4. Go to the [Drip dashboard](https://www.getdrip.com/dashboard){:target="_blank"}
5. In the Settings tab, select the User Settings, find and copy the **API key** at the bottom of the page.
6. In a terminal, run `echo <your-api-key>: | base64` to encode the API key.
7. Enter the encoded **API Key** in the Drip destination settings in Segment.
8. Your account ID is a seven digit number that can be found in the address bar of your browser when you are logged into Drip. It is the number after `https://www.getdrip.com/`.
9. Enter the **Account ID** in the Drip destination settings in Segment.

{% include components/actions-fields.html %}

For more information about developing with Drip, check out their [documentation](https://developer.drip.com/){:target="_blank”}.
