---
title: Statsig Source
id: 3x07B5Dn5h
---

[Statsig](https://www.statsig.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} helps companies safely A/B test features in production before rolling them out, avoiding product debates and costly mistakes when shipping out new features. Statsig serves all your experimentation needs with a unified platform that connects what you build with the impact you deliver. Statsig powers A/B tests and experiments on any device, in any part of the application stack, at any scale. Statsig gives you a comprehensive 360° view of how your product is performing.

The Statsig integration enables custom events and exposure events to be forwarded from Statsig to Segment without any additional work on the client — this is a pure server-to-server integration.

This is an [Event Cloud Source](/docs/sources/#event-cloud-sources) which can not only forward data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Statsig. For any issues with the source, [contact their Support team](mailto:support@statsig.com).

## Getting Started

1. From the Segment dashboard, navigate to **Catalog** and search for `Statsig` on the **Sources** tab.
2. Click the Statsig tile, and then click on the blue **Add Source** button.
3. Name the instance of this source click **Add Source**.
4. Locate your Write Key on the Source Overview page and copy it.
5. Log into the Statsig console and navigate to the [Integrations](https://console.statsig.com/integrations) page. Click the Segment card.
6. Click the **Outgoing** tab. Paste the `Write Key` captured on step #4" and click "Enable". 
7. Now, configure how data should be mapped and which events to include. The "Event Filtering" screen allows you to select which events & event types Statsig sends to Segment. The "Map Identifiers" configuration will map Statsig identifiers to a corresponding Segment allocation of your choice. Press "Confirm" and you will see an "Integration Updated" dialogue ✅
8. Within a few minutes, you can observe your statsig events being ingested in Segment within the "Debugger" panel as shown below.


## Events

The table below lists events that Statsig sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Statsig will include the `userId` if available.

> info ""
> More details on event payloads can be found in [Statsig's documentation](https://docs.statsig.com/integrations/data-connectors/segment#configuring-outbound-events){:target="_blank"}.


| Event                        | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| statsig::config_exposure     | User was exposed to a set of configuration values |
| statsig::experiment_exposure | User was exposed to an experiment                 |
| statsig::gate_exposure       | User was exposed to a gate                        |
| custom_event               | Any custom event name tracked                     |


## Event Properties

The table below lists the properties included in the events listed above.

> info ""
>  More details on event payloads can be found in [Statsig's documentation](https://docs.statsig.com/integrations/data-connectors/segment#configuring-outbound-events){:target="_blank"}.


| Property Name       | Description                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| event               | Name of the event                                                                                                                         |
| userId              | ID of the user (may not always be present)                                                                                                |
| email               | Email of the user                                                                                                                         |
| anonymousId         | An anonymous identifier, typically the Statsig `stableID`. This can be controlled in the Statsig mapping settings shown in step #7 above. |
| properties.metadata | Any other contextual event metadata                                                                                                       |
| properties.value    | Value associated with the event                                                                                                           |
| originalTimestamp   | Timestamp the event was triggered                                                                                                         |
| receivedAt          | Timestamp the event was received                                                                                                          |

## Add Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Statsig support team](mailto:support@statsig.com).

