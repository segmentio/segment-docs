---
rewrite: true
title: Amazon EventBridge Destination
id: 5d1994fb320116000112aa12
---
[Amazon EventBridge](https://aws.amazon.com/eventbridge/){:target="_blank”} is the easiest way to onboard your Segment data into the AWS ecosystem.

In addition to already supported destinations like Kinesis, S3, and Redshift, you can use EventBridge to selectively route streaming data into Amazon SQS, SNS, and any service supported by [AWS CloudWatch Events](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html){:target="_blank”}.


## Getting Started



  1. Provide Segment your AWS Account ID and the region you'd like us to configure the Segment Partner Event Source in. Ensure you've provided the same region in Segment where you'd like to configure your Event Bus.
  2. Once you send an event through with the destination enabled, we'll create a Partner Event Source in Amazon EventBridge, which you can activate in the AWS Console.
  3. Use the [AWS Console](http://console.aws.amazon.com/events/){:target="_blank”} to configure rules and destinations for the events in your Segment Partner Event Source.

The Event Source will be denoted by your Segment Source ID, which you can find in your Source Settings page under API Keys.

We'll forward all the messages in the source (pending any Destination Filters you've enabled) to the Segment Partner Event Source we create for you in EventBridge.

> info "Create a separate Segment source for testing"
> Segment recommends that you create a separate Segment source for testing if you use a test Account ID, because you cannot change the test Account ID to a production Account ID at a later date. 

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

## FAQs

### Can I change my AWS Account ID?
You are only able to configure one AWS Account ID per source. Once you've configured your Amazon EventBridge destination with an AWS Account ID, it is not possible to modify it. If you do need to change the AWS Account ID for any reason, you will need to create a new Segment source and configure a new destination.

As an alternative, you can use a [Repeater destination](/docs/connections/destinations/catalog/repeater/) to your existing source, which repeats the events through the new source you create. This new source can then be connected to a new EventBridge destination which can be configured with a new Account ID in the settings. 
