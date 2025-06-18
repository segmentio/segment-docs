---
title: Eagle Eye (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[Eagle Eye](https://eagleeye.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} delivers real-time loyalty and promotions solutions for enterprise brands, enabling seamless integration with leading customer data platforms and marketing activation tools. Their platform connects digital and in-store experiences, accelerating personalization and campaign delivery through extensible APIs and pre-built connectors.

This destination is maintained by Eagle Eye. For any issues with the destination, [contact their Support team](mailto:platform-integrations@eagleeye.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank”} search for "Eagle Eye".
2. Select "Eagle Eye (Actions)" and click **Add Destination**.
3. Select an existing Source to connect to Eagle Eye (Actions).
4. Set up your EE Connector for Segment by following the [CDP and MAP Connectors](https://developer.eagleeye.com/eagleeye-developer/docs/eagle-eye-connect-cdp-map) guide, along with the [Segment](https://developer.eagleeye.com/docs/segment) specific page for information that needs to be provided.
5. Enter the **Connector URL** and **Connector External Key** from the previous step in the "Eagle Eye (Actions)" destination settings in Segment.

{% include components/actions-fields.html %}

### Define mappings to trigger Behavioral Actions

> This guide makes the assumption you're taking advantage of the Eagle Eye Connector for Segment as well to send events into Segment. Still, any event is valid as long as it contains properties to be used "User identity value" and (optionally, when needed) "Wallet transaction reference".

> To set this up you must first [Set up Social Behavioral Action Triggers](https://developer.eagleeye.com/eagleeye-developer/docs/segment#set-up-social-behavioural-action-triggers) within the Eagle Eye AIR dashboard. You can find this under **Triggers** > **Search** / **Create Behavioral Action**.

1. Within your new Eagle Eye (Actions) destination, head to the Mappings tab and click **New Mapping**.
2. From the action list, select **Trigger Behavioral Action**.
3. Define your event trigger conditions. E.g.: if a behavioral action should only trigger for customers who just joined the program, you could set "Event Type is Track" and "Event Name is EE Loyalty Program Joined" (or any other event that contains the information you need).
4. Under **Map fields**, ensure at least "User identity value" and "Behavioral Action trigger reference" are set. The trigger reference will be the same you set within the Eagle Eye AIR dashboard when creating your Behavioral Action.
5. (Optional) If your Behavioral Action requires a "Wallet transaction reference", populate it from one of the event fields as well. E.g.: an event property that may contain the transaction reference, such as `properties.order_id`.
6. Click on **Next**, type a name for your new mapping and hit **Save** or **Save and enable**.

For more information on events sent through the Eagle Eye Connector for Segment and their properties, refer to the [Data Model](https://developer.eagleeye.com/eagleeye-developer/docs/segment#data-model) documentation.