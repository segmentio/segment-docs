---
title: What is Replay?
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

Replays are currently only available for Business Tier customers, and due to their complex nature are not self-serve. [Contact us](https://segment.com/help/contact/) to learn more, or to request a replay for your workspace. When requesting a replay, include the workspace, the source to replay from, the destination tool or tools, and the time period.

Replays can process an unlimited amount of data, however they are rate limited to respect the limitations in downstream partner tools. The replay time depends on the tool we're replaying to, and the amount of data included in the replay.

Replays do not affect your [MTU count](/docs/guides/usage-and-billing/mtus-and-throughput/), unless you are using a [Repeater destination](/docs/connections/destinations/catalog/repeater/). Notify your team before initiating a Replay if you're using a Repeater destination.

### Replay-eligible destinations

Replays are available for any destinations which support cloud-mode data (meaning data routed through Segment) and which also process timestamps. Destinations that are only available in device-mode (meaning where data is sent directly from the users' devices to the destination tool) cannot receive Replays.

Not all destinations support data deduplication, so you may need to delete, archive, or otherwise remove any old versions of the data before initiating a replay. [Contact us](https://segment.com/help/contact/) if you have questions or would like help.
