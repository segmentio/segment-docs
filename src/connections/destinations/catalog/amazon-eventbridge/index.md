---
rewrite: true
title: Amazon EventBridge Destination
id: 5d1994fb320116000112aa12
---
[Amazon EventBridge](https://aws.amazon.com/eventbridge/){:target="_blank”} is the easiest way to onboard your Segment data into the AWS ecosystem.

In addition to already supported destinations like Kinesis, S3, and Redshift, you can use EventBridge to selectively route streaming data into Amazon SQS, SNS, and any service supported by [AWS CloudWatch Events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html){:target="_blank”}.


## Getting started

To set up:

  1. In Segment, provide your AWS Account ID and the region you'd like to configure the Segment Partner Event Source in. Ensure the same region is selected in both Segment and AWS.
  2. Once you send an event through with the destination enabled, Segment creates a Partner Event Source in Amazon EventBridge. You can then activate this source in the AWS Console.
  3. Use the [AWS Console](http://console.aws.amazon.com/events/){:target="_blank”} to configure rules and destinations for the events in your Segment Partner Event Source.

The Event Source will be denoted by your Segment Source ID, which you can find in Source Settings under API Keys.

All messages in the source (pending any Destination Filters you've enabled) are fowarded to the Segment Partner Event Source, created in EventBridge.

> info "Create a separate Segment source for testing"
> Segment recommends that you create a separate Segment source for testing if you use a test Account ID. You **cannot change** the test Account ID to a production Account ID later. 

## Page
If you're not familiar with the Segment Specs, review the [Page method](/docs/connections/spec/page/) docs for more detail. An example Page call is as follows:
```javascript
  analytics.page();
```

## Identify
If you're not familiar with the Segment Specs, review the [Identify method](/docs/connections/spec/identify/) docs for more detail. An example Identify call is as follows:
```javascript
analytics.identify('97980cfea0085', {
  email: 'gibbons@example.com',
  name: 'John Gibbons'
});
```

## Track
If you're not familiar with the Segment Specs, review the [Track method](/docs/connections/spec/track/) docs for more detail. An example Track call is as follows:

```javascript
analytics.track("User Registered", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

## FAQs

#### Can I change my AWS Account ID?
You can only configure one AWS Account ID per source. Once you've configured your Amazon EventBridge destination with an AWS Account ID, you cannot modify it. If you need to change the AWS Account ID, you need to create a new Segment source and configure a new destination.

Alternatively, you can sync a [Repeater destination](/docs/connections/destinations/catalog/repeater/) to your existing source. It repeats the events through the new source you've created. This new source can then be connected to a new EventBridge destination which can be configured with a new Account ID in the settings. 
