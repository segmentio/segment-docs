---
title: "Building a Subscription Function"
---

Subscription Functions allow you to write custom JavaScript code that sends Segment Event Data to existing APIs. This guides explains how to write custom functions.

## Getting Started

Please review the steps outlined in the [Developer Center Overview](/docs/partners). This document outlines specific details for Step 4 as it relates to building a Subscription Function. 

1. Understand Segment's [Conceptual Model](/docs/partners/conceptual-model).
2. Request [access to the Segment Developer Center](https://segment.com/partners/developer-center/).
3. Create an App.
4. Build and test your Component(s).
5. Publish documentation.
6. Submit your App for review.
7. Launch into _Public Beta_!


## Build

Begin by selecting the _Subscription_ card in your Developer Center UI after creating an App and selecting _I want Segment to run functions I write_. Next, you will see the code editor where you can take full control of your Subscriptions's logic. Segment provides boilerplate functions that make it simple to send data to your API Endpoint. You can delete the example code and implement your own functions.

![](images/developer_center_customcode_page.png)

For every event you send to Segment, Segment invokes a function you provide for the event type. So you must define functions named after every type in the [Segment Spec](https://segment.com/docs/connections/spec/) that you support:

* identify
* track
* page
* screen
* group
* alias

The two items passed into the functions are the _event payload_ and the _settings_. All subscriptions have an _apiKey_ setting by default. To add more custom settings, go to the `Settings Builder` page under `App Info`. Use your custom setting _key_ (which is generated for you from your custom setting label) to access your custom setting from the _settings_ argument.

* The _Event_ argument to the function is the [Segment Event Data](https://segment.com/docs/connections/spec/common/#structure)
* The _Settings_ argument to the function contains user settings like _apiKey_ and any custom settings you have added.

The functions are ["async/await" style JavaScript](https://javascript.info/async-await), and should use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) via the pre-loaded `fetch` package.

Here's a basic example of a function that POSTs the event to a "request bin" for introspection. You can go to [RequestBin](https://requestbin.com/) to create your own `endpoint` to experiment with. This builds a query string for the URL, sets a basic auth header, and sends a JSON body:

```js
const endpoint = "https://REDACTED.x.pipedream.net"

async function track(event, settings) {
  const url = new URL(endpoint);
  url.searchParams.set("ts", event.timestamp);

  const res = await fetch(url.toString(), {
    body: JSON.stringify(event),
    headers: new Headers({
      "Authentication": 'Basic ' + btoa(`${settings.apiKey}:`),
      "Content-Type": "application/json",
    }),
    method: "post",
  })

  return await res.text() // or res.json() for JSON APIs
}
```

The function should return data to indicates a success. In the above example we simply return the request body.

You can also `throw` an error to indicate a failure.

In the above example, try changing the endpoint to `https://foo` and you'll see it throws a `FetchError` with the message `request to https://foo/ failed, reason: getaddrinfo ENOTFOUND foo foo:443`

There are 3 pre-defined error types that you can `throw` to indicate the function ran as expected, but data could not be delivered:

* EventNotSupported
* InvalidEventPayload
* ValidationError

Here are basic examples using these error types:

```js
async function group(event, settings) {
  if (!event.company) {
    throw new InvalidEventPayload("company is required")
  }
}

async function page(event, settings) {
  if (!settings.accountId) {
    throw new ValidationError("Account ID is required")
  }
}

async function alias(event, settings) {
  throw new EventNotSupported("alias is not supported")
}
```

If you do not supply a function for an event type, Segment will throw an implicit `EventNotSupported` error.

### Built-in Dependencies

#### lodash

A modern JavaScript utility library delivering modularity, performance & extras.

[See Docs](https://lodash.com/docs/4.17.11)

#### AWS

The official Amazon Web Services SDK.

[See Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/)

#### Crypto

The crypto module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.

[See Docs](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html)

#### Fetch API

The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global `fetch()` method that provides an easy, logical way to fetch resources asynchronously across the network.

[See Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

##### `fetch()`

The `fetch()` method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available.

[See Docs](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

##### `Request`

The `Request` interface of the Fetch API represents a resource request.

[See Docs](https://developer.mozilla.org/en-US/docs/Web/API/Request)

##### `Response`

The `Response` interface of the Fetch API represents the response to a request.

[See Docs](https://developer.mozilla.org/en-US/docs/Web/API/Response)

##### `Headers`

The `Headers` interface of the Fetch API allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.

[See Docs](https://developer.mozilla.org/en-US/docs/Web/API/Headers)

##### `URL`

The `URL` interface is used to parse, construct, normalize, and encode URLs. It works by providing properties which allow you to easily read and modify the components of a URL.

[See Docs](https://developer.mozilla.org/en-US/docs/Web/API/URL)

##### `URLSearchParams`

The `URLSearchParams` interface defines utility methods to work with the query string of a URL.

[See Docs](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

#### `atob()`

The `atob()` function decodes a string of data which has been encoded using base-64 encoding.

[See Docs](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob)

#### `btoa()`

The `btoa()` method creates a base-64 encoded ASCII string from a binary string.

[See Docs](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa)

## Test

Test your code directly from the Developer Center UI. Use the `Send Test Event` button and review the test event to make sure your function works as expected.

![](images/developer_center_customcode_test.png)

In the debugger panel, check the two outputs. The **Callback Return** and the **Log Output**.

* **Callback Return** - What data your function returned or error it threw.
* **Log Output** - The raw log. Any messages to `console.log()` from your function appear here.

When your code is working with one event you can test it with a suite of more Segment events. Click `Save and Next: Test`, fill in an `API Key` and click `Test`. You will see the results of additional types of Segment data.

![](images/developer_center_test_suite.png)

## Next Steps

Complete the remaining steps as outlined in the [Developer Center Overview](/docs/partners/#5-document)