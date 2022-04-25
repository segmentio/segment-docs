---
title: Functions usage limits
---

Functions are billed to your account using the total execution time per month.

An **individual function's execution time** is the total time it takes for the function to process events, including mapping, transformations, and requests to external APIs. Generally, requests to external APIs can greatly add to your total execution time.

Your **total execution time** is the execution time for all of your active functions accumulated over the course of a month. You can see your current execution time on the [Functions tab of the Usage page](https://app.segment.com/goto-my-workspace/settings/usage?metric=functions&period=current) in each workspace. You will receive notifications of your usage when you've reached 75%, 90% and 100% of your allotted execution time.

The amount of time you are allotted changes depending on your [Segment pricing plan](http://segment.com/pricing).

## Measuring execution time

We measure execution time from when the function first receives an event to the time the function either returns successfully or throws an error. If Segment retries your function (for example, if there was a timeout), those retries also count as billable execution time.

Starting on April 8, 2021 Functions usage is measured in millisecond increments. This makes your usage and billing much more precise. Prior to this change, Functions was measured in 100ms increments, and then rounded up. For example, a function that took 80ms to complete was previously billed as 100ms. Using the new usage calculation, it is billed as 80ms. 

## Execution timeouts

Functions have a timeout of 5 seconds. If a function takes longer than 5 seconds, execution halts and the function is retried periodically for up to 4 hours.



## Estimating execution time

Execution time can vary widely between use cases, so it is extremely difficult to predict. The best way is to look at the function's actual execution time and multiply it by the event volume.

Another way to provide a rough estimate is to use an expected source function time of 100ms per invocation, and expected destination function time at 200ms per invocation:

- A source function receiving 1M requests and taking an average of 100 milliseconds will use 27.8 hours of execution time: `1,000,000 events * 100ms = 100,000,000ms = 28 hours`
- A destination function receiving 1B requests and taking an average of 200 milliseconds will use 55,556 hours: `1,000,000,000 * 200ms = 200,000,000,000ms = 55,556 hours`

> note ""
> **Note:** Test runs are generally slower than the time it takes a function to run once it's deployed. For more accurate estimates, base your estimates on sending data into a production function, and not on timing the test runs.

You can (and should!) use [Destination Filters](/docs/connections/destinations/destination-filters/) to reduce the volume of events reaching your function. Filtering events with a Destination Filter prevents the Function from being invoked for that event entirely.

## Improving speed of external requests

In the most cases, functions are slow due to external requests using the `fetch()` call. The external API may be under heavy load or it may simply take a long time to process your request.

If you're making many requests that could be done in parallel, ensure that you're not doing them sequentially. If the external API takes 400ms to respond and you issue 10 requests, it would take 4 seconds to do them sequentially versus 400ms to do them in parallel. For example, if you're waiting for requests to complete inside of a loop you're making your requests sequentially:

```js
for (const objectId of event.properties.objects) {
   const response = await fetch('https://example.com/?id=' + objectId, {
       method: 'POST',
       body: event.properties
   })
   
   console.log(response.json())
}
```

Instead, consider making an array of async requests that are running in parallel and then using `Promise.all()` to wait for all of them to complete:

```js
const requests = event.properties.objects.map(objectId => {
    return fetch('https://example.com/?id=' + objectId, {
        body: event.properties
    })
})

const responses = await Promise.all(requests)
for (const response of responses) {
    console.log(response.json())
}
```

If you're only issuing a single request in your function and it is slow, you might want to contact the owner of the external API for support.
