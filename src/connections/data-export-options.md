---
title: "What are my data export options?"
---

There are a few ways to export your Segment data. Segment [Business customers](https://segment.com/business) have the most data flexibility, but our self-service customers also have options.

### Business plan customers

Customers on our [business plan](https://segment.com/business) can take advantage of Replay when they change vendors or add a vendor to their marketing and analytics stack.

#### [Replay](https://segment.com/business)

When you want to trial or start using a new vendor, Segment can replay your timestamped, historical data so it's like you've been using that app all along.

*   Eliminate vendor lock-in
*   Take your data to new tools
*   Increase leverage in vendor negotiations

Replay works for all server-side destinations that have or accept timestamps, including our Amazon S3 destination, so you can get all your data history since the first event you sent to Segment.

### Free, Team, and Business plan customers

If you are on any of our plans, there are multiple options available to you to gain access to your raw data.

#### [Warehouses](https://segment.com/warehouses)

All customers can connect a data warehouse to Segment – Free and Team customers can connect one, while Business customers can connect as many as they need. We translate and load your raw data logs into your warehouse for more powerful analysis in SQL.

#### [S3 Logs](/docs/connections/warehouses/catalog/amazon-s3/)

We store all your API calls as line-separated JSON objects in Amazon S3. If you enable Amazon S3 in your destinations catalog, we will copy the same data to your own S3 bucket. The data copied will only include data sent to Segment after you turn on the destination. Read our [Amazon S3 docs](/docs/connections/warehouses/catalog/amazon-s3/) to learn more about how we structure that data.

#### [Webhooks](/docs/connections/destinations/catalog/webhooks/)

You can use our webhooks destination to fire off requests in realtime to an endpoint that you would need to spin up and manage on your side. This is basically re-creating how our business system works but takes a bit of work on your side. If your event volume is high it can be difficult to keep a server up to receive those messages in realtime.

#### [Iron.io](https://segment.com/docs/connections/destinations/catalog/iron.io/)

Another one of our destinations similar to webhooks, but they will manage the message queue and allow you to run scripts on your data before routing it to another end point. Again this is similar to what Segment does for our business customers, but will require a decent amount of work from your team, however it will be much more reliable if your event volume gets high.

#### 3rd Party Reporting APIs

This option is the most restrictive but might be the easiest if you need only basic basic data to be exported. A few examples would be to use the reporting APIs [Clicky](/docs/connections/destinations/catalog/clicky) or [Google Analytics](/docs/connections/destinations/catalog/google-analytics) provide (after turning those tools on in Segment and sending them data). Those APIs aren't super flexible and you won't see all the data from Segment, but for basic metrics they should work. One tool that's a bit more flexible when it comes to a reporting API is [Keen.io](/docs/connections/destinations/catalog/keen-io), which is also available on the Segment platform.
