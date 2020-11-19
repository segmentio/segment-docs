---
title: How do I import historical data?
---

When transitioning over to Segment, customers commonly want to import historical data into tools they are migrating to or evaluating.

**Note:** Historical imports can only be done into destinations that can accept historical timestamped data. Most analytics tools like Mixpanel, Amplitude, Kissmetrics, etc. can handle that type of data just fine. One common destination that does not accept historical data is Google Analytics, since their API cannot accept historical data.

Use any [server-side library](https://segment.com/docs/connections/sources/#server), which sends requests in batches to improve performance. Once you have data to import, follow the steps below:

1.  Export or collect the data to be imported.

    Include timestamp data in your export if the data needs to appear in end tools in a historical reference. For instance if you are importing emails and it is relevant when they joined your email list, you may need to export the timestamp. **If no timestamp is specified when importing, the data will show a timestamp from the time the data was received**.

2.  Decide which destinations need to receive the data.

    **By default, data coming into Segment will be relayed to all destinations linked to a given source.** To limit data to specific destinations, the `integrations` object must be modified. With historical data, you often only want to send the data to a specific destination or into your data warehouse. For example, in [Node.js](https://segment.com/docs/connections/sources/catalog/libraries/server/node/#integrations) set the `integrations` object as follows.
    ```js
    analytics.track({
        event: 'Upgraded Membership',
        userId: '97234974',
        integrations: { 'All': false, 'Vero': true, 'Google Analytics': false }
     })
    ```

3.  Once you've done that, you'll need to write an application or worker to send the data to Segment.

You will need to cycle through each set of data and map it to a Segment server-side library method or build an array matching the [HTTP Import API format](https://segment.com/docs/connections/sources/catalog/libraries/server/http/#import). **Note**, we recommend using a Segment library for this process, as they will set contextual message fields like `message_id` (used for deduping) and `sent_at` (used for correctly client clock skew) that our API will use to ensure correct behavior upon ingestion. The server-side libraries will automatically batch requests to optimize for performance and prevent linear request volume. This batching behavior is modifiable. Some of the libraries implement a configurable max queue size that may discard messages if you enqueue requests much faster than the client can flush them. We recommend overriding the max queue size parameter for the library to a high value you're comfortable you can remain under in your batch job.

One of our Success Engineers wrote an alpha prototype Node.js app for importing data utilizing the HTTP API, which we've included below:

[Example Node.js import application](https://github.com/lambtron/segment-import)

If a server-side library doesn't meet your needs, use the Segment [bulk import HTTP API](https://segment.com/docs/connections/sources/catalog/libraries/server/http/#import). **Note**, if you're using the HTTP API directly to replay data you've exported from Segment, we recommend removing the original `sent_at`, `message_id`, and `project_id` fields from the archived message before forwarding them to Segment.

Our friends at [MarketLytics](http://marketlytics.com/) have written up their experience using the alpha prototype importer and offer some [helpful visuals and tips](http://marketlytics.com/blog/import-historic-data-to-segment).
