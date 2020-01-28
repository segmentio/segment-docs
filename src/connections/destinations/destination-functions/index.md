---
title: 'Destination Functions'
---

> note ""
> **NOTE:** Functions are currently in developer preview. If you are interested in joining the developer preview, navigate to the Build page in your catalog [here](https://app.segment.com/goto-my-workspace/build/catalog). The use is governed by [(1) Segment First Access](https://segment.com/docs/legal/first-access-beta-preview/) and Beta Terms and Conditions and [(2) Segment Acceptable Use Policy](https://segment.com/docs/legal/acceptable-use-policy/).

Destination Functions allows you to transform your Segment events and send them to other APIs by just writing a few lines of (serverless) code. Send your data into tools outside the Segment catalog, or to your own internal services.

Here are some examples of how early adopters are building Destination Functions:

- **Microsoft Teams Destination** : trigger notifications/messages on a Teams workspace on important events like `Signed Up` or `Order Placed`.
- **ChargeBee Integration** : sync subscription information by sending events like `Subscription Started`, `Subscription Updated`, `Subscription Removed` etc.
- **Typeform Surveys** : trigger a user dissatisfaction survey on Typeform when a user uninstalls your app, for example when an `App Uninstalled` event is fired.

The illustration below explains how you might utilize a Destination Function.

![When a page call is sent to Segment, Destination Functions transform the Segment event payload to match the destination's spec. The transformed Event is sent to the destination tool.](images/visual.png)

## Getting Started

### Creating your Destination Function

To create a Destination Function:
1. Go to [Functions tab](https://app.segment.com/goto-my-workspace/functions/catalog) in the Segment App Catalog.
2. Click the `+ New Function` button.
3. Select `Destination Function` and click the `Build` button.

![Create a Destination Function](images/create.png)

### Writing your Function

The Code Editor page appears after you click `Build` button. Here, you can take full control of your destination logic. Segment provides templates that make it simple to send data to the API Endpoint and offer example code to help you get started.

Start by replacing the generic endpoint provided with the API Endpoint for your tool or internal service.

![Functions Editor](images/editor.png)

Segment invokes your function once for every event it receives from configured sources (unless altered by [Destination Filters](https://segment.com/docs/connections/destinations/destination-filters/)). For each event, it invokes a handler corresponding to the Segment message type. You can define and export functions for every type in the [Segment Spec](https://segment.com/docs/connections/spec/) that you want to handle:

- `onIdentify`
- `onTrack`
- `onPage`
- `onScreen`
- `onGroup`
- `onAlias`
- `onDelete`

Two arguments are provided to the function: the **event payload** and the **settings**. All subscriptions have an **apiKey** setting by default.

- The **Event** argument to the function is the [Segment Event Data](https://segment.com/docs/connections/spec/common/#structure).
   > **Note** Only Event Sources are supported at this time. Object Source data is not supported.
- The **Settings** argument to the function contains user settings like **apiKey** and any custom settings and secrets that you added (coming soon!).

The Functions are ["async/await" style JavaScript](https://javascript.info/async-await), and should use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) in the pre-loaded `fetch` package for any network requests. This ensures seamless integration with Event Delivery.

Here's a basic example of a function that POSTs the event to a "request bin" for introspection. You can go to [RequestBin](https://requestbin.com/) to create your own `endpoint` to experiment with.

The JavaScript below builds a query string for the URL, sets a basic auth header, and sends a JSON body.

```js
const endpoint = "https://REDACTED.x.pipedream.net"

async function onTrack(event, settings) {
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

The function should return data to indicate a success. In the example above we simply return the request body.

You can also `throw` an error to indicate a failure. In the above example, try changing the endpoint to `https://foo` and you'll see it throws a `FetchError` with the message `request to https://foo/ failed, reason: getaddrinfo ENOTFOUND foo foo:443`

There are three pre-defined error types that you can `throw` to indicate that the function ran as expected, but data could not be delivered:

- `EventNotSupported`
- `InvalidEventPayload`
- `ValidationError`

Here are basic examples using these error types:

```js
async function onGroup(event, settings) {
  if (!event.company) {
    throw new InvalidEventPayload("company is required")
  }
}

async function onPage(event, settings) {
  if (!settings.accountId) {
    throw new ValidationError("Account ID is required")
  }
}

async function onAlias(event, settings) {
  throw new EventNotSupported("alias is not supported")
}
```

If you do not supply a function for an event type, Segment throws an implicit `EventNotSupported` error.


### Built-in Dependencies

#### lodash

A modern JavaScript utility library delivering modularity, performance & extras. [See the lodash docs](https://lodash.com/docs/4.17.11).

#### AWS

The official Amazon Web Services SDK. [See the AWS docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/).

#### Crypto

The crypto module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify Functions. [See Crypto docs](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html).

#### Fetch API

The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global `fetch()` method that provides an easy, logical way to fetch resources asynchronously across the network. [See the Fetch API docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

##### `fetch()`

The `fetch()` method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available. [See docs](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).

##### `Request`

The [`Request` interface](https://developer.mozilla.org/en-US/docs/Web/API/Request) of the Fetch API represents a resource request.

##### `Response`

The [`Response` interface](https://developer.mozilla.org/en-US/docs/Web/API/Response) of the Fetch API represents the response to a request.

##### `Headers`

The [`Headers` interface](https://developer.mozilla.org/en-US/docs/Web/API/Headers) of the Fetch API allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.

##### `URL`

The [`URL` interface](https://developer.mozilla.org/en-US/docs/Web/API/URL) is used to parse, construct, normalize, and encode URLs. It works by providing properties which allow you to easily read and modify the components of a URL.

##### `URLSearchParams`

The [`URLSearchParams` interface](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) defines utility methods to work with the query string of a URL.

##### `atob()`

The [`atob()` function](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob) decodes a string of data which has been encoded using base-64 encoding.

##### `btoa()`

The [`btoa()` method](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa) creates a base-64 encoded ASCII string from a binary string.

### ️Settings and Secrets

Settings allow you to parameterize the Destination Function so that you can use it across multiple sources which may have different configurations.

By default, we include an `apiKey` string setting which can be accessed in your code as `settings.apiKey` as an example. You can replace this with any number of multiple setting types including string, boolean, array and text maps to support your use case. As needed, you also have the ability to mark a particular setting as required or encrypted. 

Common use cases for leveraging multiple settings include:
- Configuration and dynamic mappings for user-configurable flow control in your Destination Function. Create a Destination Function once and allow your users to configure instances of that function multiple times with custom settings.

- Additional secrets. This is for use cases like client credentials authentication models, or for when calling multiple external APIs, for example in enrichment workflows or when looking up stored user traits and identifiers by any `externalId` from Segment's Personas [Profile API](/docs/personas/profile-api).

## Logging & Testing

### ️Logging

Segment captures and displays logs emitted by the `console.log()` method. You can use this for debugging, and to get an understanding of flow control during the function's execution.

> warning ""
> **NOTE:** Do _not_ log sensitive data, such as personally-identifying information (PII), authentication tokens, HTTP headers, and similar data. Segment stores these logs, and they may be available to workspace members in the Segment dashboard. Be especially careful about logging PII and Secrets. Never leave log statements that print entire events or settings payloads.

### Testing

Test your code directly from the Functions editor. Use the `Run` button and review the test event to make sure the function works as expected.

In the debugger panel, check the two outputs. The **Callback Return** and the **Log Output**.

![Testing your Destination Function](images/save-and-test.png)

- **Callback Return** - This shows what data the function returned, or the error it threw.
- **Log Output** - The raw log. Any messages to `console.log()` from the function appear here.

## Creation & Deployment

Once you're satisfied with your Destination Function, you can deploy your code by clicking the `Configure` button on the bottom right of the editor. This brings you to a screen to name your function and optionally add additional details that will be displayed in your workspace. Hit `Create Function` and your Destination Function will be ready to be used within your workspace.

If you're editing an existing function, you will have the option to `Save` changes without impacting your deployed function. Alternatively, you can choose to `Save & Deploy` to push changes to your existing function.


## Management

### Permissions

The permissions required to create and manage a Destination Function are separate from those required to enable it on a source.

Currently, permissions required for creation and editing of Destination Functions are strict.

1. You must be a **Workspace Owner** in order to create a function.
2. You must be a **Workspace Owner** in order to edit/delete a function.

Once the Destination Function has been created, the ability to enable it on a source is the same as a normal destination. You need to be a `Workspace Owner` OR `Source Admin`.

### Editing & Deleting

If you are a **Workspace Owner**, you can manage your Destination Function under the [Functions tab](https://app.segment.com/goto-my-workspace/functions/catalog). Click on the function you wish to manage and the sidesheet menu will allow you to _Connect, Edit or Delete_ your function.

![Editing or deleting your Destination Function](images/edit-or-delete.gif)


### Monitoring your Destination Function.

You can use [Destination Event Delivery](https://segment.com/docs/guides/destinations/how-do-i-check-if-data-is-successfully-being-delivered-to-my-destination/) to understand if Segment encounters any issues delivering your source data to destinations. Errors that the Function throws appear here.

### Controlling what gets passed to your Destination Function.

You can use [Destination Filters](https://segment.com/docs/connections/destinations/destination-filters/) or Privacy Controls to manage what events and, of those events, which event properties are sent to your Destination Function.

## Delivery Guarantees
Segment provides excellent data deliverability by employing API layer scalability and durability, data backup and replay, partner API monitoring, and library and cloud-mode destination retries. Segment's API processes 170B+ billion calls per month across over a billion of monthly tracked users, is rate performant (avg. load 100,000 msg/sec), fully automated and scalable, and can tolerate massive data spikes.

Segment monitors hundreds of partner APIs for 500s, success rate, and end-to-end latency to help our customers proactively achieve the best data deliverability possible.

You can subscribe to updates [here](https://status.segment.com/).

#### Does Segment retry data?
Segment retries nine times over the course of four hours. This increase the number of attempts for messages, so we'll try and re-deliver them another 4 times after some backoff.

We don't retry where there are signs of an expired API key or failed payment. However, if we push bad code that results in a malformed payload and a 400 or 422 response from an endpoint, we also won't retry given that the call would not ever succeed.

#### Are the events guaranteed to send in order?

No. Segment cannot guarantee the order in which the events are delivered to an endpoint.

## FAQs

**Can I create a device-mode Destination?**

Functions enable you to write and deploy Cloud-mode Destinations. We're in the early phases of exploration and discovery for supporting customer "web plugins" for custom device-mode destinations and other use cases, but this is unsupported today.

**How do I publish a destination to the Segment catalog instead of my own workspace?**

If you are a Partner, looking to publish your destination and distribute your App through Segment Catalog, visit the [Developer Center](https://segment.com/partners/developer-center/) and check out our [partner docs](/docs/partners).
