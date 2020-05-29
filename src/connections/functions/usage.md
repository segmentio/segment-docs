---
title: Functions usage limits
---

This document outlines the pricing and packaging for the *Functions* product as well as any frequently asked questions highlighted below. Specifically, this introduces a new metric known as *total execution time* which is measured per month, per customer and is based on the accumulated time it takes for the customers’ function(s) to process events - more details below! If you have any additional clarifications, please reach out to #questions-functions.



## What is execution time?

Execution time is the wall-clock time it takes for a Function to process an event. This time includes mapping, transformations, and requests to external APIs. Generally, requests to external APIs will take up the vast majority of your total execution time.


## What is total execution time?

This is execution time totaled across all active functions running for a customer accumulated over the course of a month.


## Where is execution time exposed for customers?

There is now a *Functions* tab within the [Usage page](https://app.segment.com/goto-my-workspace/settings/usage?metric=functions&period=current) of each customer workspace.


## How much execution time is made available to each customer?

Please see the slides above.


## What happens when a customer reaches their execution time limit?

Please see the slides above.


## How is execution time measured?

We measure execution time from when your Function receives an event to the time your Function either returns successfully or throws an error. If we retry your Function due to, for example, timeouts, those retries count as billable execution time, as well.

Functions are billed in 100ms increments, rounded up. For example, a Function that takes 80ms to complete will be billed as 100ms. A function that takes 105ms to complete will be billed as 200ms.


## Why is my function slow?

In the vast majority of cases, slow Functions are slow due to external requests made using the `fetch()` call. The external API may be under heavy load or it may simply take a long time to process your request.

If you’re making many requests that could be done in parallel, ensure that you’re not doing them sequentially. If the external API takes 400ms to respond and you issue 10 requests, it would take 4 seconds to do them sequentially versus 400ms to do them in parallel. For example, if you’re waiting for requests to complete inside of a loop you’re making your requests sequentially:

```js
for (const objectId of event.properties.objects) {
   const resp = await fetch('https://example.com/?id=' + objectId, {
       body: event.properties
   })
   console.log(resp.json())
}

return "Done!"
```

Instead, consider making an array of async requests that are running in parallel and then using `Promise.all()` to wait for all of them to complete:

```js
const requests = event.properties.objects.map((objectId) => {
    fetch('https://example.com/?id=' + objectId, {
        body: event.properties
    })
})

const responses = await Promise.all(requests)
responses.forEach((resp) => console.log(resp.json()))
```

If you’re only issuing a single request in your Function and it is slow, you may want to reach out to the external API owner for support.


## What’s the best way to estimate how much execution time a customer will need to use if they’re new to Functions?

This can vary widely between customers and use cases so it is extremely difficult to predict. The best way is to look at their Function’s actual execution time and multiply it by their event volume.

If you absolutely need a rough guess before they’ve implemented the actual Function, you can estimate expected Source Function time at 100ms per invocation and Destination Function time at 200ms per invocation:


- A Source Function receiving 1M requests and taking an average of 100 milliseconds will use 27.8 hours of execution time: `1,000,000 events * 100ms = 100,000,000ms = 28 hours`
- A Destination Function receiving 1B requests and taking an average of 200 milliseconds will use 42,222 hours: `1,000,000,000 * 200ms = 200,000,000,000ms = 27,778 hours`


> **Note:** Test runs are going to be slower than the time it takes for the function to run once it’s deployed. Estimates should be based off sending data into their production function and not timing the test runs.

Customers can (and should!) use Destination Filters to reduce the volume of events reaching their Function. It’s *much* cheaper to filter out events with a Destination Filter because it prevents the Function from being invoked for that event entirely.


## If a customer has been using Functions for a while, how can they predict or forecast their subsequent usage?

(See previous question. Multiple observed average function time by expected event volume.)


## What is the total execution time limit for a function invocation currently?

This is currently set to a max timeout of 5 seconds. If your Function takes longer than 5 seconds, it will be cancelled and retried periodically for up to 4 hours.


## Why are we charging for Functions this way but not charging for integrations this way?

Charging based on compute time is an industry standard for serverless product offerings so we felt it best to align here and not introduce a Segment-specific metric. Functions is, unlike Segment or Partner built integrations, more versatile and it’s not possible to scale Functions usage specifically in alignment with MTUs/APIs.


## Is there an estimate of how many sources or destinations a customer can build which would stay within their account limit for a month?

We recommend not offering a ballpark or generalization given the versatility of the Functions product. Instead, understand a specific use case that the customer is looking to build an integration for and providing an estimation based on [the above](https://paper.dropbox.com/doc/Internal-Functions-Pricing-Packaging--A0WFyLiaw~JqMdYGBtOf22SEAg-dVeDkUu3RFomakOxmgRZ8#:uid=855334482835834626812969&h2=What%E2%80%99s-the-best-way-to-estimat) outlined upon volume. It’s likely not helpful to say that a PayPal Source Function takes XX time as the implementation of that function will vary vastly from function to function.


## Why do I have to pay for Functions if I’m not using them?

The use of Functions is optional, if a customer doesn’t send any data through a given function, they will not be using any of their monthly allocated execution time and thus, not be charged as they won’t hit or exceed their limit.


## Why are overages more expensive for COMM vs ENT?

Given the large amount of volume our average ENT customers buy, they expect a volume discount. This is also reflected in our list pricing for MTUs. COMM customers tend to buy in smaller volumes and therefore do not have the same economies of scale. ENT customers are also buying a slightly more advanced package (protocols included), which this Functions package will also be part of it.


# Additional Questions from GTM teams

If the above FAQ doesn’t answer your questions around pricing and packaging, please include them below and we will work to get answers for them.


- How are we supposed to talk about this limit, in addition to MTU limits, in addition to throughput limits? it’s already confusing to explain MTUs and throughput to customers - and this adds another layer of complexity/confusion
- How does geographic region impact the execution time? We’re seeing massive amounts of execution time for a couple APAC customers (8+ YEARS for Domain, 3+ Years for SEEK)
