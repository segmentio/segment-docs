---
title: Schematic (Actions) Destination
id: 65b8e9eca1b5903a031c6378
---

{% include content/plan-grid.md name="actions" %}

[Schematic](https://schematichq.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} enables you to launch, package, meter, and monitor features with ease, so you can manage it all in one place as your business grows.

Segment is the easiest way to send events from your application to Schematic. If you already have Segment up and running in your application, Schematic recommends this approach so you don't have to implement any additional code.

Schematic maintains this destination. For any issues with the destination, [contact the Schematic Support team](mailto:hi@schematichq.com).

## Getting started

1. From your Segment web app, navigate to **Connections > Catalog > Destinations**.
2. Search for *Schematic*, select the Schematic destination, and click **Add destination**.
3. Select the source that will send data to Schematic, give your destination a name, then click **Create destination**.
4. On the destination's Settings tab, input your Schematic API Key. To generate an API key, navigate to your Schematic workspace settings under **Settings > API Keys**.

Once you've connected Schematic to Segment, you can configure how you want to send data to Schematic in the Schematic destination's **Mappings** tab.

{% include components/actions-fields.html %}

## Additional Context

Schematic only accepts Track event names that contain alphanumeric characters, dashes, and underscores. If Segment event names have other characters, like spaces, the Schematic destination automatically snake_cases the event name before passing to Schematic. Segment passes the raw event name as an event trait.
