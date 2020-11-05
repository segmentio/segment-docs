---
title: SendwithUs Destination
---

[Our SendwithUs destination code](https://github.com/segmentio/integration-sendwithus) is all open-source on GitHub if you want to check it out.

## Identify

When you call [`identify`](/docs/connections/spec/identify) from one of our libraries, this will create a customer in Sendwithus. If you'd like to associate an email to a `userId`, you can send it using the [`identify`](/docs/connections/spec/identify) call by sending `traits.email`:

```js
analytics.identify('userId12345', { email: 'teemo@segment.com' });
```

**NOTE**: `userId` is **required**. Customers are only created when you use a Production API Key.

When you call identify from one of our libraries, this will create a customer in Sendwithus. An identify call is required once per email address to associate that customer with a userId. Note that customers are only created when you use a Production API Key.

## Track

To see your [`track`](/docs/connections/spec/track) events in Sendwithus, ensure that you have first created a Segment.com integration under Automation > Triggers. If you select 'Add Trigger' and select the Segment Event Name dropdown, you'll see a list of event names that you have sent through.
