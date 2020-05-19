---
title: 'Destination Functions'
redirect_from:
  - '/connections/destinations/custom/'
  - '/connections/destinations/custom-destinations/'
  - '/connections/destinations/destination-functions/'
---

Destination Functions allow you to transform and annotate your Segment events and send them to any external tool or API without worrying about setting up or maintaining any infrastructure. 

Your function is a small piece of JavaScript code in your workspace that you send Segment your events to any public API endpoints. 

**[VISUAL SHOWING DATA FLOW FROM SEGMENT SOURCE TO FN TO DESTINATION]**

## Getting started

### Creating your Destination Function

1. From your Segment workspace, go to the Catalog, and click the [Functions tab](https://app.segment.com/goto-my-workspace/functions/catalog).
2. Click **New Function**.
3. Select **Destination Function** and click **Build**.

### Writing your function

> info ""
> **Tip:** Get started easily by referencing the templates available in the UI or in this open-sourced [Functions Library](https://github.com/segmentio/functions-library) - you're welcome to contribute too!

When you click the **Build** button, a code editor opens so you can configure your destination logic to send data to a public API endpoint. 

Start by replacing the generic endpoint provided with the API endpoint (URL) for your tool or internal service.

![Functions Editor](images/editor.png)

For each event sent to your Destination Function, Segment invokes your function based on the event type. (Unless prevented by [Destination Filters](https://segment.com/docs/connections/destinations/destination-filters/)).

You can define and export functions for each type in the [Segment Spec](https://segment.com/docs/connections/spec/) that you want to handle:

- `onIdentify`
- `onTrack`
- `onPage`
- `onScreen`
- `onGroup`
- `onAlias`
- `onDelete`

Two arguments are provided to the function: the `event` payload and the `settings` object.

- The **event** argument to the function is the [Segment event data]
(https://segment.com/docs/connections/spec/common/#structure) payload.
  
> note ""
> **Note:** Only Event sources are supported at this time. Object source data is not supported.

- The `settings` argument contains user settings like `apiKey` and any [custom settings and secrets](#settings-and-secrets) that you add.

Functions use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) in the pre-loaded `fetch` package for external requests. This ensures seamless integration with the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tab in the Segment dashboard for your destination.

Here's a basic example of a function that POSTs the event to a "request bin" for introspection. You can go to [RequestBin](https://requestbin.com/) to create your own `endpoint` to experiment with.

The JavaScript below builds a query string for the URL, sets a basic authentication header, and sends a JSON body:

```js
const endpoint = "https://mywebsite.com/api"

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

  return await res.json() // or res.text() to avoid parsing response as JSON
}
```

The function returns data to indicate a success. In the example above we simply return the request body.

You can also `throw` an error to indicate a failure. In the above example, try changing the endpoint to `https://foo` and you'll see it throws a `FetchError` with the message `request to https://foo/ failed, reason: getaddrinfo ENOTFOUND foo foo:443`.

There are three pre-defined error types that you can `throw` to indicate that the function ran as expected, but data could not be delivered:

- `EventNotSupported`
- `InvalidEventPayload`
- `ValidationError`

Here are basic examples using these error types:

```js
async function onGroup(event, settings) {
  if (!event.company) {
    throw new InvalidEventPayload("Company is required")
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

You can [read more about error handling](#errors) below.

### Runtime and dependencies

Destination Functions are run using Node.js 10.x. The following dependencies are pre-installed in the function environment. We don't currently support importing your own dependencies but please reach out to [our support team](https://segment.com/help/contact/) if you would like to request one to be added:

#### lodash v4.17.11

A modern JavaScript utility library delivering modularity, performance & extras. Learn more in the [lodash docs](https://lodash.com/docs/4.17.11).

#### AWS v2.488.0

The official Amazon Web Services SDK. Learn more in the [AWS docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/).

#### `fetch()` v2.6.0

The `fetch()` method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available. Learn more in the [docs](https://www.npmjs.com/package/node-fetch).

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

#### `atob()` v2.1.2

The [`atob()` function](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob) decodes a string of data which has been encoded using base-64 encoding.

#### `btoa()` v1.2.1

The [`btoa()` method](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa) creates a base-64 encoded ASCII string from a binary string.

### ️Settings and Secrets

Settings allow you to pass different variables to your function so that you can use it across multiple sources which might have different configurations.

![Custom Settings](images/settings.gif)

For example, if we include a `settingKey` setting, you can access this from your code using dot notation on the `settings` object as follows:

```js
async function onRequest(request, settings) {
  let settingValue = settings.settingKey;
}
```

You can include multiple setting types including strings, booleans, string arrays and string objects to support your use case. You can also mark a particular setting as being required and/or sensitive (encrypted), if needed.

Common use cases for using multiple settings include:

- **Configuration and dynamic mappings for user-configurable flow control in your Destination Function**. Create a Destination Function once and allow your users to configure instances of that function multiple times with custom settings.
- **Additional secrets**. This is for use cases like client credentials authentication models, or for when calling multiple external APIs, for example in enrichment workflows or when looking up stored user traits and identifiers by any `externalId` from Segment's Personas [Profile API](/docs/personas/profile-api).

Once your Destination Function is deployed as an instance within your workspace, settings can be filled out on the destination configuration page.

![Destination Function Settings](images/dest-settings.png)

## Testing

You can test your code directly from the Functions Editor in two ways:

### Use Sample Events

Start by clicking on **Use Sample Event** and selecting the source you'd like to use events from.

![Capture events to test your function](images/autofill-events.gif)

Click **Run** to test your function with the event you've selected.

### Manual Input

You can also manually include your own JSON payload of a Segment event, instead of fetching a sample from one of your workspace sources.

![Functions Editor Event Tester](images/editor-test.gif)

If your function has failed to run, you can check the error details and logs in the **Output** section.

- **Error Message** - This shows the error surfaced from your function.
- **Logs** - Any messages to `console.log()` from the function appear here.

## Creation and Deployment

Once you've finished writing your function, click **Configure** to give your function a name. Then, click **Create Function** to finish and make this function available in your workspace.

If you're editing an existing function, you can **Save** changes without changing the behavior of your deployed function. You can also choose to **Save & Deploy** to push changes to all or specific functions in your workspace that are already deployed.


## Logs and Errors

Your function can throw errors or Segment may encounter errors while attempting to invoke your function. You can view these errors in the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tab for your Destination:

![Destination Function Event Delivery tab](images/event-delivery.png)

### Error Types
* "Bad Request" is any error thrown by your code not covered by the other errors.
* "Invalid Settings": A configuration error prevented Segment from executing your code. If this error persists for more than an hour, [contact us for help](https://segment.com/help/contact/).
* "Message Rejected": Your code threw `InvalidEventPayload` or `ValidationError` due to invalid input.
* "Unsupported Event Type": Your code does not implement a specific event type (`onTrack()`, etc.) or threw a `EventNotSupported` error.

These errors are not retried.

### Error Logs

If your function throws an error, Segment captures the event, any outgoing requests/responses, any console logs you may have printed, as well as the error itself. 

Segment then displays the captured error information in the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tab of your destination. You can use this tab to find and fix unexpected errors.

![Destination Function error logs](images/error-logs.png)

You can throw [an Error or custom Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) and you can also add additional helpful context in logs using the [`console` API](https://developer.mozilla.org/en-US/docs/Web/API/console). For example:

```js
async function onTrack(event, settings) {
  const userId = event.userId

  console.log("userId:", userId)

  if (typeof userId != 'string' || userId.length < 8) {
    throw new Error("Input user ID is invalid")
  }

  console.log("valid userId:", userId)

  // ...
}
```

> warning ""
> **Warning:** Do not log sensitive data, such as personally-identifying information (PII), authentication tokens, or other secrets. You should especially avoid logging entire request/response payloads. The **Function Logs** tab may be visible to other workspace members if they have the necessary permissions.


## Management

### Permissions

Functions have specific roles which can be leveraged for [access management](https://segment.com/docs/segment-app/iam/) within your Segment workspace.

The ability to create, edit and delete a function is dictated by two permission roles:

- **Functions Admin:** Create, edit and delete all functions or a subset of specified functions.
- **Functions Read-only:** View all functions or a subset of specified functions.

The permissions required to enable your destination function on a source or deploy changes to functions already connected to a source require additional **Source Admin** permissions in addition to the role selected above.


### Editing and deleting

If you are a **Workspace Owner** or **Functions Admin**, you can manage your function from the [Functions tab](https://app.segment.com/goto-my-workspace/functions/catalog). From here you can view and manage your functions.

![Editing or deleting your Destination Function](images/function-sidesheet.gif)


### Monitoring

You can use [Destination Event Delivery](https://segment.com/docs/guides/destinations/how-do-i-check-if-data-is-successfully-being-delivered-to-my-destination/) to understand if Segment encounters any issues delivering your source data to destinations. Errors that the Function throws appear here.

If any of your deployed function instances are failing consistently, they will also appear in [Connection Health](https://segment.com/docs/segment-app/#sts=Health).

### Data Control

You can use [Destination Filters](https://segment.com/docs/connections/destinations/destination-filters/) or Privacy Controls to manage what events and, of those events, which event properties are sent to your Destination Function.

## FAQs

**Can I see who made changes to a function?**

Yes, Functions is compatible with [Audit Trail](https://segment.com/docs/segment-app/iam/audit-trail/) and will display user activity relating to Functions.

**Does Segment retry events?**

Segment retries nine times over the course of four hours. This increases the number of attempts for messages, so we try to re-deliver them another 4 times after some backoff. Segment doesn't retry if your function returns a permanent error.

**Are the events guaranteed to send in order?**

No. Segment cannot guarantee the order in which the events are delivered to an endpoint.

**Can I create a device-mode Destination?**

Functions enable you to write and deploy cloud-mode destinations. We're in the early phases of exploration and discovery for supporting customer "web plugins" for custom device-mode destinations and other use cases, but this is unsupported today.

**How do I publish a destination to the Segment catalog instead of my own workspace?**

If you are a partner, looking to publish your destination and distribute your app through Segment catalog, visit the [Developer Center](https://segment.com/partners/developer-center/) and check out our [partner docs](/docs/partners).
