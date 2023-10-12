---
title: CDP Resolution (Browser) Destination
id: 650c69e7f47d84b86c120b4c
beta: true
---


{% include content/plan-grid.md name="actions" %}

[CDP Resolution](https://cdpresolution.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} helps customers instantly match visitor website traffic to full profiles. It turns your anonymous web traffic into full company and buyer profiles — complete with PII and firmographics data, and much more. You can find a [list of the different attributes](https://cdpresolution.com/theattributes?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} you can collect with CDP Resolution.

This destination is maintained by CDP Resolution. For any issues with the destination, [contact their Support team](mailto:support@cdpresolution.com).

{% include content/ajs-upgrade.md %}

## Getting started

To set up the CDP Resolution destination:
1.	Navigate to **Connections > Catalog** in the Segment app and select the **Destinations** tab of the catalog. 
2.	Search for *CDP Resolution* and select it.
3. Choose which of your sources to connect the destination to.
4.	In the Settings, enter your CDP Resolution API key. You can find this in the CDP Connector Setting section of your [CDP Resolution Dashboard Connection Settings](https://app.cdpresolution.com/administration/cdp-connections/segment-io-f4241?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"}.
5. Go to the CDP Resolution UI. 
5. Go to the [CDP Resolution Connectors](https://app.cdpresolution.com/administration/cdp-connections?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} page and select the Segment IO connector.
2.	Paste your CDP Resolution API key in Segment to generate your Write Key.
3.	Paste your Write Key into CDP Resolution's connection configuration.
4.	Click **Upload Key**.


Setup within CDP Resolution:
1.	From your [CDP Resolution Connectors](https://app.cdpresolution.com/administration/cdp-connections?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) page click on the Segment IO connector.
2.	Paste your CDP Resolution API key in Segment to generate your Write key.
3.	Paste your Write Key into CDP Resolution's connection configuration.
4.	Click ‘Upload Key’.

To verify that the destination has been set up correctly, check the Debugger section of your Segment Source. Assuming everything is as it should be, you should start seeing resolution data populate in the `identify` and `group` events – click on the specific event you’re interested in to see CDP Resolutions traits. These traits will now be available to other Segment destinations in your account. Notice that all CDP Resolution traits are prefixed with `cdpresolution_` to ensure they don’t conflict with existing traits.

When you make requests to CDP Resolution, CDP Resolution sends events with its own data back to your Segment source server-side using Segment's Node JS Library. If you see unexpected traffic from curl in your Debugger, that traffic represents the events that CDP Resolution sends back.

{% include components/actions-fields.html %}

