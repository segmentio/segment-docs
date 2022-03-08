---
rewrite: true
title: Amazon EventBridge Destination
id: 5d1994fb320116000112aa12
---
[Amazon EventBridge](https://aws.amazon.com/eventbridge/) is the easiest way to onboard your Segment data into the AWS ecosystem.

In addition to already supported destinations like Kinesis, S3, and Redshift, you can use EventBridge to selectively route streaming data into Amazon SQS, SNS, and any service supported by [AWS CloudWatch Events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html).


## Getting Started

{% include content/connection-modes.md %}

  1. Provide Segment your AWS Account ID and the region you'd like us to configure the Segment Partner Event Source in. Ensure you've provided the same region in Segment where you'd like to configure your Event Bus.
  2. Once you send an event through with the destination enabled, we'll create a Partner Event Source in Amazon EventBridge, which you can activate in the AWS Console.
  3. Use the [AWS Console](http://console.aws.amazon.com/events/) to configure rules and destinations for the events in your Segment Partner Event Source.

The Event Source will be denoted by your Segment Source ID, which you can find in your Source Settings page under API Keys.

We'll forward all the messages in the source (pending any Destination Filters you've enabled) to the Segment Partner Event Source we create for you in EventBridge.

## Page
If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:
```javascript
  analytics.page();
```

## Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example identify call is shown below:
```javascript
analytics.identify('97980cfea0085', {
  email: 'gibbons@example.com',
  name: 'John Gibbons'
});
```

## Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example identify call is shown below:

```javascript
analytics.track("User Registered", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

## FAQ

### Can I change my Account ID?
Currently you can only set up one Account ID per source, and once it is set it cannot be changed. 

We recommend that you create a separate Segment source for testing if you use a test Account ID, because you cannot change it to a production Account ID at a later date. 