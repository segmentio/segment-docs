---
title: Replay
plan: replay
---

Replay takes an archived copy of your Segment data, and re-sends it to new or existing tools.

On the surface this doesn't sound like much, but this can grant huge benefits to mature data systems: By archiving and replaying data, you can avoid vendor lock-in, and protect your system against data loss.

## Replays for tooling changes

With Replays, you can send your existing data to new tools.
This means you can send a limited sample of your data to a new tool to test it out, and run similar tools in parallel to verify the data format or accuracy of the output. Finally, when you're ready to switch to a new tool, you can replay a full set of your data to the new tool to backfill it with data that extends before you set up the tool - no warm-up time or operational gap to disrupt your work.

> info "Note"
> Any destinations which accept cloud-mode data (meaning data from Segment, and not directly from users' devices) can use replay, however they must also process timestamps on the data for replay to be useful.

<!-- TODO: insert a list of destinations which are replay-eligible, see REPLAYS-38-->

## Replays for resilience

With Replays, you're protected from outages and errors. If a destination which you rely on experiences an outage, or is temporarily unable to accept incoming data, you can use Replays to re-send data to that tool once the service recovers. You can also use Replays to recover from errors caused by misconfigurations in your Segment systems. For example, if you send data in the wrong format, or want to apply [destination filters](/docs/connections/destinations/destination-filters/). In this case, you can change your mapping using a destination filter, clear out the bad data, and replay it to that destination. You can also use this to update the schema in your data warehouse when it changes.

For more information, [Contact us](https://segment.com/help/contact/) and our Success Engineers will walk you through the process.

## Replays considerations

Replays are currently only available for Business Tier customers, and due to their complex nature are not self-serve. [Contact us](https://segment.com/help/contact/) to learn more, or to request a replay for your workspace. When requesting a replay, include the workspace, the source to replay from, the destination tool or tools, and the time period. Note that the source and its destination should be connected within the same workspace for a replay.

Replays can process unlimited data, but they're rate limited to respect limitations in downstream partner tools. If you're also sending data to the destination being replayed to in real time, then, when determining your replay's limit, you'll want to take into account the rate limit being used by real-time events. You should also account for a small margin of your rate limit to allow events to be retried. 

Replay time depends both on the tool Segment replays to and the amount of data included in the replay.

Replays do not affect your [MTU count](/docs/guides/usage-and-billing/mtus-and-throughput/), unless you are using a [Repeater destination](/docs/connections/destinations/catalog/repeater/). Notify your team before initiating a Replay if you're using a Repeater destination.

Once a replay starts, you will not see replayed events in the Event Delivery tab.

You can initiate replays for some or all events, but you can't apply conditional filters that exclude certain rows of data from being replayed. You can set up [destination filters](/docs/connections/destinations/destination-filters/) to conditionally filter replayed events.

### Replay-eligible destinations

Replays are available for any destinations which support cloud-mode data (meaning data routed through Segment) and which also process timestamps. Destinations that are only available in device-mode (meaning where data is sent directly from the users' devices to the destination tool) cannot receive Replays.

Not all destinations support data deduplication, so you may need to delete, archive, or otherwise remove any old versions of the data before initiating a replay. [Contact us](https://segment.com/help/contact/) if you have questions or would like help.

### Replays & Destination Filters

Replays are subject to the [Destination Filters](/docs/connections/destinations/destination-filters/) you've configured on that destination. For example, if you request that Identify calls be included in the replay, but your destination has a Destination Filter that blocks Identify events, the filter would block all Identify events from making it to the destination. In this case, Segment would recommend that you avoid including Identify events in the replay if you know they'll be blocked by the destination filter.

When you request a replay, Segment asks you to provide a list of the events (type and/or name) that you want included in the replay. If you specify a list of events, then Segment only includes those specified events in the replay. If you need to exclude events in your replay, [reach out to Segment support](https://segment.com/help/contact/){:target="_blank"}. The Segment team can help you handle filtering you're unable to do in the replay.
