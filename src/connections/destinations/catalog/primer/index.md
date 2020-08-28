---
beta: true
title: Primer Destination
---

## Getting Started

First you will need to register an account with [Primer](https://goprimer.com) to get a Primer token.

Once the Segment iOS SDK and the Segment-Primer CocoaPod is integrated with your app, toggle Primer on in your Segment destinations, and add your Primer token, which you can find on the Primer Dashboard under Project Settings. Refer to the [Primer Documentation](http://docs.goprimer.com) for more details on how to set up Primer.

Since Primer needs to be initialized as early as possible, you need to supply the token when you initialize the factory that is registered with the analytics client.

```
[config use:[SEGPrimerIntegrationFactory instanceWithToken:@"PRIMER_TOKEN"]];
```

This will initialize the Primer SDK under the hood and begin collecting events and initializing the Primer Flow.

- - -

Primer supports the `identify` and `track` methods.

## Identify

When you `identify` a user, we'll pass that user's information to Primer with `userId` as Primer's User ID.
Segment's special traits are attached on to the Primer User's user properties.


## Track

When you `track` an event, we will send that event to Primer as a custom event.
