---
title: Replay
plan: replay
---

Replay takes an archived copy of your Segment data, and re-sends it to new or existing tools providing huge benefits to mature data systems. By archiving and replaying data, you can avoid vendor lock-in, and protect your system against data loss.

## Replays for tooling changes

With Replays, you can send your existing data to new tools.
This means you can send a limited sample of your data to a new tool to test it out, and run similar tools in parallel to verify the data format or accuracy of the output. Finally, when you're ready to switch to a new tool, you can replay a full set of your data to the new tool to backfill it with data that extends before you set up the tool - no warm-up time or operational gap to disrupt your work.

> info "Note"
> Any destinations which accept cloud-mode data (meaning data from Segment, and not directly from users' devices) can use replay, however they must also process timestamps on the data for replay to be useful.

<!-- TODO: insert a list of destinations which are replay-eligible, see REPLAYS-38-->

## Replays for resilience

With Replays, you're protected from outages and errors. If a destination which you rely on experiences an outage, or is temporarily unable to accept incoming data, you can use Replays to re-send data to that tool once the service recovers. You can also use Replays to recover from errors caused by misconfigurations in your Segment systems. For example, if you send data in the wrong format, or want to apply [destination filters](/docs/connections/destinations/destination-filters/). In this case, you can change your mapping using a destination filter, clear out the bad data, and replay it to that destination. You can also use this to update the schema in your data warehouse when it changes.

For more information, [contact Segment support](https://segment.com/help/contact/){:target="_blank"}.

## Replays considerations

Replays are currently only available for Business Tier customers, and due to their complex nature are not self-serve. [Contact Segment support](https://segment.com/help/contact/){:target="_blank"} to learn more, or to request a replay for your workspace. When requesting a replay, include the workspace, the source to replay from, the destination tool or tools, and the time period.

Replays can process unlimited data, but they're rate limited to respect limitations in downstream partner tools. If you're also sending data to the destination being replayed to in real time, then, when determining your replay's limit, you'll want to take into account the rate limit being used by real-time events. You should also account for a small margin of your rate limit to allow events to be retried. 

Replay time depends both on the tool Segment replays to and the amount of data included in the replay.

Replays do not affect your [MTU count](/docs/guides/usage-and-billing/mtus-and-throughput/), unless you are using a [Repeater destination](/docs/connections/destinations/catalog/repeater/). Notify your team before initiating a Replay if you're using a Repeater destination.

Once a replay starts, you will not see replayed events in the Event Delivery tab.

You can initiate replays for some or all events, but you can't apply conditional filters that exclude certain rows of data from being replayed. You can set up [destination filters](/docs/connections/destinations/destination-filters/) to conditionally filter replayed events.

The destination is not required to be enabled in order for a replay to be successful, including Destination Functions.
- The destination must be connected to the source, but can remain disabled while the replay is running.
- Destination filters are still considered when you run replays on disabled destinations.
- There are a few exceptions for destinations that must be enabled for the replay to be successful: Amazon S3 and Google Cloud Source (GCS).

### Replay-eligible destinations

Replays are available for any destinations which support cloud-mode data (meaning data routed through Segment) and which also process timestamps. Destinations that are only available in device-mode (meaning where data is sent directly from the users' devices to the destination tool) cannot receive Replays.

Not all destinations support data deduplication, so you may need to delete, archive, or remove any older versions of the data before initiating a replay. [Contact Segment support](https://segment.com/help/contact/){:target="_blank"} if you have questions or want help.

#### What happens to `integrations` and `consent` objects during a replay?

When Segment replays events, it does not retain the original `integrations` object flag, but it does preserve the `consent` object. 

During replays, Segment replaces the `integrations` object with a structure that includes `All:false` and `[integration name]:true`. As a result, Segment removes the original `integrations` flag during replay. The replay tool doesn't overwrite the original `consent` object. If an event was previously dropped for a specific destination due to the `consent` object, the event drops within Segment again during replay. 

### Replays & Destination Filters

Replays are subject to the [Destination Filters](/docs/connections/destinations/destination-filters/) you've configured on that destination. For example, if you request that Identify calls be included in the replay, but your destination has a Destination Filter that blocks Identify events, the filter then blocks all Identify events from making it to the destination. In this case, Segment recommends that you avoid including Identify events in the replay if you know they'll be blocked by the destination filter.

When you request a replay, Segment asks you to provide a list of the events (type and/or name) that you want included in the replay. If you specify a list of events, then Segment only includes those specified events in the replay. If you need to exclude events in your replay, [contact Segment support](https://segment.com/help/contact/){:target="_blank"}. The Segment team can help you handle filtering you're unable to do in the replay.

### Replays & Engage

There are two types of replays with Engage. 
1. Replay a Profile Source's data into Engage Space, (sending a standard source's data into an Engage Space), which can be configured to send over a specified timeframe as well as the ability to specify all or only a specific subset of events by type or name.

2. Replay from an Engage Space to its connected destination, (sending data from an Engage Output Source to its connected destination), which includes all the computational data (Audiences, Computed Traits, Journeys) that destination is currently configured to receive, which can be configured to send over a specified timeframe as well as the ability to specify all or only a specific subset of events by type or name. 

#### Nuances to Consider for Engage Replays

**1. Replay a Profile Source's data into Engage Space**
- When a new Profile Source is connected to an Engage Space, the default option to replay the source's data seen over the past 30 days can be selected. To request a source's additional historical data be replayed to the Engage Space, contact Segment Support at friends@segment.com or [create a ticket](https://segment.com/docs/engage/[url](https://app.segment.com/goto-my-workspace/home?period=last-24-hours&v2=enabled&help=create-ticket)). Please see [this documentation](https://segment.com/docs/engage/quickstart/#step-3-connect-production-sources:~:text=Step%203%3A%20Connect,production%20sources.) on further details of this process and what to include in your support request.

**2. Replay from an Engage Space to its connected destination**
- Since each instance of a destination is connected to its own Engage "Output" source, that source contains events for all of the computations that destination is connected to received data from, _the list of output sources can be found under Unify > Unify Settings > Debugger_. Because of this, it's not possible to replay only a specific computation's data to the destination, you should instead consider reaching out to [Segment support]([url](https://segment.com/help/contact/)) to request a resync of that computation to its destination instead. However, if you would like to replay all failed events seen by that destination, which will encompass all connected computations, that can be achieved with a replay. 
- Note: The replay will be sending historical data to the destination, potentially overwriting the destination with outdated data if more recent data has been sent from the computation to the destination. In this case, a resync of the computation might also be more advantageous to get the most up-to-date data resent to the destination.
- Rate limits for replays are configurable and can be increased or decreased upon request. However, there are some destinations which have strict rate limits and cannot be configured to send data at a higher rate than what's stated within the table on [Rate limits on Engage Event Destinations](https://segment.com/docs/engage/using-engage-data/#rate-limits-on-engage-event-destinations).

#### Engage : Replay versus Resync
- **Replay** : A replay resends all events, specific events by type or name, or failed events over a specified period of time to the destination.
- **Resync** : A resync sends events for a computation's (Audience, Computed Trait, Journey) entire current user base to its connected destination.
