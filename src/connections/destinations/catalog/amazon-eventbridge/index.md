---
rewrite: true
title: Amazon EventBridge Destination
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
If you haven't had a chance to review our spec, please take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:
```javascript
  analytics.page();
```

## Identify
If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does. An example identify call is shown below:
```javascript
analytics.identify('97980cfea0085', {
  email: 'gibbons@initech.com',
  name: 'John Gibbons'
});
```

## Track
If you haven't had a chance to review our spec, please take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example identify call is shown below:

```javascript
analytics.track("User Registered", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

## FAQ

### Can I change my Account ID?
Currently you can only set up one Account ID per source, and once it is set it cannot be changed. We recommend only using a test Account ID on a test Segment source, as you would not be able to change it to a production Account ID at a later date. 
