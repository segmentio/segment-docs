---
title: 'Destination Functions'
redirect_from:
  - '/connections/destinations/custom/'
  - '/connections/destinations/custom-destinations/'
  - '/connections/destinations/destination-functions/'
---

Destination functions allow you to transform and annotate your Segment events and send them to any external tool or API without worrying about setting up or maintaining any infrastructure.

All functions are scoped to your workspace, so members of other workspaces won't be able to view and use them.

> info ""
> Functions are scoped to your specific workspace. If you’re a technology partner and want to build a new integration and publish it in Segment’s catalog, see the [Developer Center documentation](/docs/partners/).

![](images/destination_functions_overview.png)


> note ""
> Destination functions can't currently accept data from [Object Cloud sources](/docs/connections/sources/#object-cloud-sources).

## Create a destination function

1. From your workspace, go to the Catalog and click the [Functions tab](https://app.segment.com/goto-my-workspace/functions/catalog).
2. Click **New Function**.
3. Select **Destination Function** and click **Build**.

> success ""
> **Tip:** Want to see some example functions? Check out the templates available in the Functions UI, or in the open-source [Segment Functions Library](https://github.com/segmentio/functions-library). (Contributions welcome!)

When you click **Build**, a code editor appears. Use the editor to write the code for your function, configure settings, and test the function's behavior.

![Functions Editor](images/editor-dest.png)

## Code the destination function

Segment invokes a separate part of the function (called a "handler") for each event type that you send to your destination function.

> info ""
> Your function is not invoked for an event if a [destination filter](/docs/connections/destinations/destination-filters/) is set up, and the event doesn't pass the filter.

The default source code template includes handlers for all event types. However, you do not need to implement all of them - just use the ones you need, and skip the ones you don't.

Destination functions can define handlers for each message type in the [Segment spec](/docs/connections/spec/):

- `onIdentify`
- `onTrack`
- `onPage`
- `onScreen`
- `onGroup`
- `onAlias`
- `onDelete`

Each of the functions above accepts two arguments:

- **event** - Segment event object, where fields and values depend on the type of event. For example, for "Identify" events, the object is formatted to match the [Identify spec](/docs/connections/spec/identify/).
- **settings** - Set of [settings](#create-settings-and-secrets) for this function.

We'll learn more about settings later, let's see how we can process Segment events with destination function first.

The example below shows a destination function that listens for "Track" events, and sends some details about them to an external service.

```js
async function onTrack(event) {
  await fetch('https://example-service.com/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      event_name: event.event,
      event_properties: event.properties,
      timestamp: event.timestamp
    })
  })
}
```

To change which type of event the handler listens to, you can rename it to the name of the message type. For example, if you rename this function `onIdentify`, it listens for "Identify" events instead.

> info ""
> Functions' runtime includes a `fetch()` polyfill using a `node-fetch` package. Check out the [node-fetch documentation](https://www.npmjs.com/package/node-fetch) for usage examples.

### Errors and error handling

A function's execution is considered successful if it finishes without any errors. You can also `throw` an error to indicate a failure on purpose. You can use these errors to validate event data before processing it, to ensure your function works as expected.

There are three pre-defined error types that you can `throw` to indicate that the function ran as expected, but that data could not be delivered:

- `EventNotSupported`
- `InvalidEventPayload`
- `ValidationError`

The examples show basic uses of these error types.

```js
async function onGroup(event) {
  if (!event.company) {
    throw new InvalidEventPayload('Company name is required')
  }
}

async function onPage(event) {
  if (!event.pageName) {
    throw new ValidationError('Page name is required')
  }
}

async function onAlias(event) {
  throw new EventNotSupported('Alias event is not supported')
}
```
If you do not supply a function for an event type, Segment throws an `EventNotSupported` error by default.

You can read more about [error handling](#destination-functions-logs-and-errors) below.

### Runtime and Dependencies

{% include content/functions/runtime.md %}


## Create ️settings and secrets

{% include content/functions/settings.md %}

Next, fill out this setting's value in the **Test** tab, so you can run the function and verify that the correct setting value is passed. (This value is only for testing your function.)

![Test Value For Setting](images/setting-in-test-tab.jpg){:width="500"}

Now that you've configured a setting and entered a test value, you can add code to read its value and run the function, as in the example below:

```js
async function onTrack(request, settings) {
  const apiKey = settings.apiKey
  //=> "super_secret_string"
}
```

When you deploy your destination function in your workspace, you fill out the settings on the destination configuration page, similar to how you would configure a normal destination.

![Destination Function Settings](images/dest-settings.png)

## Test the destination function

You can test your code directly from the editor in two ways:

### Use sample events for testing

Click **Use Sample Event** and select the source to use events from.

![Capture events to test your function](images/autofill-events.gif)

Click **Run** to test your function with the event you selected.

### Test using manual input

You can also manually include your own JSON payload of a Segment event, instead of fetching a sample from one of your workspace sources.

![Functions Editor Event Tester](images/editor-test.gif)

If your function fails, you can check the error details and logs in the **Output** section.

- **Error Message** - This shows the error surfaced from your function.
- **Logs** - This section displays any messages to `console.log()` from the function.

## Save and deploy the destination function

Once you finish writing your function, click **Configure** to give it a name. Then, click **Create Function** to finish and make this function available in your workspace.

If you're editing an existing function, you can **Save** changes without changing the behavior of your deployed function. You can also choose to **Save & Deploy** to push changes to all, or specific functions in your workspace that are already deployed.

## Destination functions logs and errors

A function can throw errors, or Segment might encounter errors while invoking your function. You can view these errors in the [Event Delivery](/docs/connections/event-delivery/) tab for your Destination as in the example below.

![Destination Function Event Delivery tab](images/event-delivery.png)

### Destination functions error types

- **Bad Request** - Any error thrown by the function code that is not covered by the other errors.
- **Invalid Settings** - A configuration error prevented Segment from executing your code. If this error persists for more than an hour, [contact Segment Support](https://segment.com/help/contact/).
- **Message Rejected** - Your code threw `InvalidEventPayload` or `ValidationError` due to invalid input.
- **Unsupported Event Type** - Your code does not implement a specific event type (`onTrack()`, etc.) or threw a `EventNotSupported` error.

When these errors occur, Segment does not attempt to send that event to your destination function again.

### Destination functions logs

If your function throws an error, execution halts immediately. Segment captures the event, any outgoing requests/responses, any logs the function might have printed, as well as the error itself.

Segment then displays the captured error information in the [Event Delivery](/docs/connections/event-delivery/) page for your destination function. You can use this information to find and fix unexpected errors.

![Destination Function error logs](images/error-logs-dest.png)

You can throw [an error or a custom error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) and you can also add helpful context in logs using the [`console` API](https://developer.mozilla.org/en-US/docs/Web/API/console). For example:

```js
async function onTrack(event, settings) {
  const userId = event.userId

  console.log('User ID is', userId)

  if (typeof userId !== 'string' || userId.length < 8) {
    throw new ValidationError('User ID is invalid')
  }

  console.log('User ID is valid')
}
```

> warning ""
> **Warning:** Do not log sensitive data, such as personally-identifying information (PII), authentication tokens, or other secrets. You should especially avoid logging entire request/response payloads. The **Function Logs** tab may be visible to other workspace members if they have the necessary permissions.


## Managing destination functions

### Functions permissions

{% include content/functions/perms.md%}


### Editing and deleting functions

If you are a **Workspace Owner** or **Functions Admin**, you can manage your function from the [Functions](https://app.segment.com/goto-my-workspace/functions/catalog) page.

![Editing or deleting your Destination Function](images/function-sidesheet-dest.gif)

### Monitoring destination functions

You can use [Destination Event Delivery](/docs/guides/destinations/how-do-i-check-if-data-is-successfully-being-delivered-to-my-destination/) to understand if Segment encounters any issues delivering your source data to destinations. Errors that the Function throws appear here.

If any of your deployed function instances are failing consistently, they will also appear in [Connection Health](/docs/segment-app/#sts=Health).

### Data Control

You can use [Destination Filters](/docs/connections/destinations/destination-filters/) or Privacy Controls to manage what events and, of those events, which event properties are sent to your Destination Function.

## Destination functions FAQs

##### Can I see who made changes to a function?

Yes, Functions access is logged in the [Audit Trail](/docs/segment-app/iam/audit-trail/), so user activity related to functions appears in the logs.

##### Does Segment retry failed function invocations?

Segment retries 9 times over the course of 4 hours. This increases the number of attempts for messages, so we try to re-deliver them another 4 times after some backoff. Segment doesn't retry if your function throws a [non-recoverable error](#functions-error-types).

##### Are events guaranteed to send data in order?

No, Segment can't guarantee the order in which the events are delivered to an endpoint.

##### Can I create a device-mode destination?

No, destination functions are currently available as cloud-mode destinations only. We're in the early phases of exploration and discovery for supporting customer "web plugins" for custom device-mode destinations and other use cases, but this is unsupported today.

##### How do I publish a destination to the public Segment catalog?

If you are a partner, looking to publish your destination and distribute your app through Segment catalog, visit the [Developer Center](https://segment.com/partners/developer-center/) and check out our [partner docs](/docs/partners/).
