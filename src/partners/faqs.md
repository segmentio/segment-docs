---
title: Partner FAQs
---

If you cannot find the answer to your question within the documentation or the below FAQs, contact our team at [partner-support@segment.com](mailto:partner-support@segment.com).

### How do customers collect data?

A mutual customer will use `analytics.js` (our client-side JavaScript library), a server-side library, or one of our mobile SDK's to implement our [API methods](https://segment.com/docs/connections/spec/). For more information on Segment libraries, you can refer to our [source documentation](https://segment.com/docs/connections/sources/#website).

### Does Segment automatically collect any data?

Only our `analytics.js` and mobile SDK's collect contextual information from the device. Our server-side libraries do not collect contextual information, and a user is responsible for sending additional context themselves.

For more info on our automatically collected fields, refer to [this document](https://segment.com/docs/connections/spec/common/).

### How does Segment handle unique users?

For known users, a Segment customer will implement an `identify` method to collect info on the user. This can be a moment in the user flow where a user logs in, registers, updates their info, or provides any type of identifiable information. A known user will have a `userId`, which is up to the customer to create and send.

For unknown users, Segment will handle generating a unique `anonymousId` using our client-side libraries: analytics.js, analytics-android and analytics-ios, and pass this in through all of Segment's api calls. This value is determined by the client cookie on our analytics.js library, and using the deviceId in our mobile SDKs.

Segment handles cacheing these values on our mobile SDKs and client-side analytics.js library and sending the values on subsequent calls. Our server-side libraries rely on the customer creating either the `anonymousId` or `userId` and passing this in on each call.

Read more about our unique ID's [here](https://segment.com/blog/a-brief-history-of-the-uuid/).

### Do you have semantic events?

Yes!

To start, a Segment customer will track their user actions using our `track` method. Segment has [industry specs](https://segment.com/docs/connections/spec/semantic/) to define semantic naming to follow, so when sending events in for a particular event flow, such as Ecommerce, Live Chat, Video and Email events, Segment can translate these semantic event names into other downstream tools.

It is essential that the destination follows the relevant industry specs when translating a Segment event into how the destination tool understands the event. That way, customers can enable any new integration and specced events, such as "Order Completed", and it will automatically work with the new downstream destination.

### Are the events guaranteed to send in order?

No. Since Segment queues events, Segment cannot guarantee the order in which the event is delivered to your endpoint.

### Does Segment de-dupe messages?

Yes! Segment de-dupes messages by `messageId`.

Segment maintains a sliding window of all `messageId`s received for each source, only allowing `messageId`s through that do not already appear within the window.

Segment guarantees this window to be at least 24 hours of messages (meaning any message sent twice within 24 hours will be de-duped), but in practice, this window is significantly larger(currently sitting at around 170 days).

You can read more [here](https://segment.com/blog/exactly-once-delivery/).

### What is a replay?

Segment supports [replaying historical data](/docs/guides/what-is-replay/) to new tools for Business Tier customers. This can greatly increase your activation and lower time to our customers getting value out of your tool.

Generally, the conditions required to replay data are:

1. The partner API respects the `timestamp` field for event time ordering.
2. Order of events does not matter.
3. The API has reasonably high rate-limit events.

Be sure to let us know if you are able to accept replays and what your rate limits look like.

### What are Segment's delivery guarantees?

Segment provides excellent data deliverability by employing API layer scalability and durability, data backup and replay, partner API monitoring, and library and integration cloud retries. Segment's API processes 170B+ billion calls per month across over a billion of monthly tracked users, is rate performant (avg. load 100,000 msg/sec), fully automated and scalable, can tolerate massive data spikes.

Segment monitors hundreds of partner APIs for 500s, success rate, and end-to-end latency to help our customers proactively achieve the best data deliverability possible.

You can subscribe to updates [here](https://status.segment.com/).

### Does Segment retry data?

Segment retries nine times over the course of four hours. This will increase the number of attempts for messages, so we'll try and re-deliver them another 4 times after some backoff.

We don't retry anywhere which is the sign of an expired API key or failed payment. However, if we push bad code that results in a malformed payload and a 400 or 422 response from an endpoint, we also won't retry given that the call would not ever succeed.
