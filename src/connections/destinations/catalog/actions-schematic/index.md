---
title: Schematic (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[Schematic](https://schematichq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} enables you to launch, package, meter, and monitor features with ease, so you can manage it all in one place as your business grows.

Segment is the easiest way to send events from your application to Schematic. If you already have Segment up and running in your applicaiton, Schematic recommends this approach so you don't have to implement any additional code.

Schematic maintains this destination. For any issues with the destination, [contact the Schematic Support team](mailto:hi@schematichq.com).

## Getting started

1. From your Segment web app, navigate to **Connections > Catalog > Destinations**.
2. Search for *Schematic* and select **Add Destination**
3. Select the source that will send data to Schematic and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/)
4. On the Settings tab, input your API Key which can be found in your Schematic workspace settings under **Settings > API Keys**.
5. Once connected, you can configure how you want to send data to Schematic in the **Mappings** tab.

{% include components/actions-fields.html %}

## Additional Context

For track events, Schematic only accepts event names that contain alphanumeric characters, dashes, and underscores. If Segment event names have, for instance, spaces, the Schematic destination will automatically snake case the event name before passing to Schematic. Additionally, the raw event name will always be passed as an event trait.