---
title: Zapier (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[Zapier](https://zapier.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="\_blank"} unlocks transformative AI to safely scale workflows, agents, and MCP with the world's most connected ecosystem of 8,000+ integrations.

This destination is maintained by Zapier. For any issues with the destination, [contact their Support team](https://zapier.com/app/get-help){:target="\_blank"}.

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="\_blank"} search for "Zapier".
2. Select **Zapier (Actions)** and click **Add Destination**. Alternatively, you can create the Zapier (Actions) destination from Zapier using the Create Destination Zapier Action.
3. Select an existing Source to connect to Zapier (Actions).
4. In your Zapier account, create a new Zap with the Twilio Segment - New Event trigger.
5. Configure the Zap as needed and provide a sample event payload that represents what you expect to receive from the source.
6. To be able to easily identify the mapping, you can provide a Zap Identifier.
7. When you test the Zap, you will see this event payload being returned. When you publish the Zap, a mapping will be created in the Zapier Actions destination.
8. Your Zap will now start receiving events from Segment. Please note that if you make any changes to the mappings within Segment, these will not automatically be updated in Zapier, however, the events will be filtered accordingly.

{% include components/actions-fields.html %}

## How it works

The Zapier (Actions) destination sends Segment events to Zapier, allowing you to automate workflows based on your event data. When an event matches your configured filter, Segment sends the event data to your Zap.

### Event filtering

You can use Filter Query Language (FQL) to control which events are sent to your Zap in Zapier. You can use the default options that Zapier provides or you can write your own FQL statement. Common FQL examples include:

- `type = "track"` - Only send track events
- `event = "Order Completed"` - Only send events with a specific name
- `type = "track" and event = "Button Clicked"` - Combine conditions with `and`
- `type != "identify"` - Exclude specific event types

For more information on FQL syntax and examples, see the [FQL documentation](/docs/api/public-api/fql).

### Zap Identifier

The Zap Identifier is a unique string that helps you identify this mapping in Segment. This is useful when you have multiple Zaps connected to the same destination and need to distinguish between them.
