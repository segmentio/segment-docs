---
title: Eagle Eye (Actions) Destination
id: 682db61f6c600fdb90251392
redirect_from: /connections/destinations/catalog/eagle-eye/
---

{% include content/plan-grid.md name="actions" %}

[Eagle Eye](https://eagleeye.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} delivers real-time loyalty and promotions solutions for enterprise brands, enabling seamless integration with leading customer data platforms and marketing activation tools. The platform connects digital and in-store experiences, accelerating personalization and campaign delivery through extensible APIs and pre-built connectors.

This integration requires both an Eagle Eye Source and Destination. The source sends events into Segment, and the destination processes those events to trigger specific behavioral actions in Eagle Eye.

> warning "Required Source Integration"
> This destination must be used in tandem with a corresponding Eagle Eye Source to trigger behavioral actions in Eagle Eye.

This destination is maintained by Eagle Eye. For any issues with the destination, [contact their Support team](mailto:support@eagleeye.com){:target="_blank"}.

## Getting started

To set up the Eagle Eye (Actions) destination in Segment:

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "Eagle Eye".
2. Select "Eagle Eye (Actions)" and click **Add Destination**.
3. Select an existing Source to connect to Eagle Eye (Actions).
4. Set up your EE Connector for Segment by following the [CDP and MAP Connectors guide](https://developer.eagleeye.com/eagleeye-developer/docs/eagle-eye-connect-cdp-map){:target="_blank"}. You'll also need to refer to the [Segment-specific page](https://developer.eagleeye.com/docs/segment){:target="_blank"} for additional information required during setup.
5. Go to the Eagle Eye (Actions) destination settings in Segment and enter the **Connector URL** and **Connector External Key** obtained in the previous step.

{% include components/actions-fields.html %}

### Define mappings to trigger Behavioral Actions

This guide assumes you're using the Eagle Eye Connector for Segment to send events. Any event is considered valid as long as it includes the properties "User identity value" and (optionally) "Wallet transaction reference". 

To set this up, you must first configure [Social Behavioral Action Triggers](https://developer.eagleeye.com/eagleeye-developer/docs/segment#set-up-social-behavioural-action-triggers){:target="_blank"} within the Eagle Eye AIR dashboard. You can find this under **Triggers > Search** / **Create Behavioral Action**.

To map incoming event data and trigger behavioral actions in the Eagle Eye AIR dashboard, follow these steps:

1. In the Eagle Eye (Actions) destination, go to the Mappings tab and click **New Mapping**.
2. From the action list, select **Trigger Behavioral Action**.
3. Define your event trigger conditions. For example, if you want to trigger an action only for customers who just joined the program, select "Event Type is Track" and "Event Name is EE Loyalty Program Joined" (or any other event that contains the information you need).
4. Under **Map fields**, ensure that at least "User identity value" and "Behavioral Action trigger reference" are mapped. The trigger reference will be the same as the one set within the Eagle Eye AIR dashboard when creating the behavioral action. 
5. (Optional) If your behavioral action requires a "Wallet transaction reference", you can pull it from one of the event fields. For example, an event property that may contain the transaction reference, such as `properties.order_id`.
6. Click **Next**, give the mapping a name and hit **Save** or **Save and enable**.

For more information on events sent through the Eagle Eye Connector for Segment and their properties, refer to the [Data Model](https://developer.eagleeye.com/eagleeye-developer/docs/segment#data-model){:target="_blank"} documentation.
