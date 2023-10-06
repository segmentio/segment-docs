## CDP Resolution (Browser) Destination

{% include content/plan-grid.md name="actions" %}

[CDP Resolution](https://cdpresolution.com?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) helps customers instantly match visitor website traffic to full profiles. It turns your anonymous web traffic into full company and buyer profiles — complete with PII and firmographics data, and much more. You can find a list of the different attributes you can collect with CDP Resolution [here](https://cdpresolution.com/theattributes?utm_source=segmentio&utm_medium=docs&utm_campaign=partners).

This destination is maintained by CDP Resolution. For any issues with the destination, [contact their Support team](mailto:support@cdpresolution.com).

{% include content/ajs-upgrade.md %}

## Getting started

Setup within Segment:
1.	From the Segment web app, click **Catalog**.
2.	Search for “CDP Resolution” in the Catalog, select it, and choose which of your sources to connect the destination to.
3.	In your Segment Settings UI, enter your CDP Resolution API key. You can find this in the CDP Connector Setting section of your [CDP Resolution Dashboard Connection Settings](https://app.cdpresolution.com/administration/cdp-connections/segment-io-f4241?utm_source=segmentio&utm_medium=docs&utm_campaign=partners).

Setup within CDP Resolution:
1.	From your [CDP Resolution Connectors](https://app.cdpresolution.com/administration/cdp-connections?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) page click on the Segment IO connector.
2.	Paste your CDP Resolution API key in Segment to generate your Write key.
3.	Paste your Write Key into CDP Resolution's connection configuration.
4.	Click ‘Upload Key’.

To verify that the destination has been set up correctly, check the Debugger section of your Segment Source. Assuming everything is as it should be, you should start seeing resolution data populate in the `identify` and `group` events – click on the specific event you’re interested in to see CDP Resolutions traits. These traits will now be available to other Segment destinations in your account. Notice that all CDP Resolution traits are prefixed with `cdpresolution_` to ensure they don’t conflict with existing traits.

When you make requests to CDP Resolution, CDP Resolution sends events with its own data back to your Segment source server-side using Segment's Node JS Library. If you see unexpected traffic from curl in your Debugger, that traffic represents the events that CDP Resolution sends back.

{% include components/actions-fields.html %}

