---
title: Destination Insert Functions
beta: true
 
---

Use Destination Insert Functions to enrich, transform, or filter your data before it reaches downstream destinations.

**Implement advanced data computation**: Write custom computation, operations, and business logic on streaming data that you send to downstream destinations.

**Enrich your data**: Use destination insert functions with Segment's Profile API or third party sources to add additional context to your data and create personalized customer experiences.

**Support data compliance**: Use destination insert functions to support data masking, encryption, decryption, improved PII data handling, and tokenization.

**Customize filtration for your destinations**: Create custom logic with nested if-else statements, regex, custom business rules, and more to filter event data.

> info "Destination Insert Functions in Private Beta"
> Destination Insert Functions is in Private Beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.


## Create destination insert functions

There are two ways you can access destination insert functions from your Segment space:
- From the Connections [catalog](#using-the-catalog).
- From the [Destinations](#using-the-destinations-tab) tab.

### Using the catalog

To create an insert function from Segment's catalog:

1. Navigate to **Connections > Catalog > Functions** and click **Create function**.
2. From the Select Type screen, select **Insert Functions** and click **Next: Build function**.
3. Write your function code, then click **Use Sample Event** to test it. Create a sample event, then click **Run** to test.
4. Click **Next: Configure and Deploy** to add a function name, description, and logo.
5. Click **Create function** to create your insert function. You'll see the function displayed in the Insert functions tab.

For data to flow to your downstream destinations, you'll need to connect your insert function to a destination:

1. Select the insert function you'd like to connect. From the side pane, you can edit, delete, and connect the insert function.
2. Click **Connect to a destination**.
3. Select the destination you'd like to connect to and click **Connect to destination**.

### Using the Destinations tab

To access insert functions through the Destinations tab, navigate to **Connections > Destinations > Functions** and select your insert function. Use this page to edit and manage insert functions in your workspace. 

You can also use this page to [enable destination insert functions](#enable-the-insert-function) in your workspace.

## Code the destination insert function

Segment invokes a separate part of the function (called a "handler") for each event type that you send to your destination insert function.

> info ""
> Your function isn't invoked for an event if you've configured a [destination filter](/docs/connections/destinations/destination-filters/), and the event doesn't pass the filter.

The default source code template includes handlers for all event types. You don't need to implement all of them - just use the ones you need, and skip the ones you don't.

Insert functions can define handlers for each message type in the [Segment spec](/docs/connections/spec/):

- `onIdentify`
- `onTrack`
- `onPage`
- `onScreen`
- `onGroup`
- `onAlias`
- `onDelete`
- `onBatch`

Each of the functions above accepts two arguments:

- **event** - Segment event object, where fields and values depend on the event type. For example, in "Identify" events, Segment formats the object to match the [Identify spec](/docs/connections/spec/identify/).
- **settings** - Set of [settings](#create-settings-and-secrets) for this function.

The example below shows a function that listens for "Track" events, and sends some details about them to an external service.

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

To change which event type the handler listens to, you can rename it to the name of the message type. For example, if you rename this function `onIdentify`, it listens for "Identify" events instead.

> info ""
> Functions' runtime includes a `fetch()` polyfill using a `node-fetch` package. Check out the [node-fetch documentation](https://www.npmjs.com/package/node-fetch){:target="_blank"} for usage examples.

### Errors and error handling

Segment considers a function's execution successful if it finishes without error. You can also `throw` an error to create a failure on purpose. Use these errors to validate event data before processing it, to ensure the function works as expected.

You can `throw` the following pre-defined error types to indicate that the function ran as expected, but that data was deliverable:

- `EventNotSupported`
- `InvalidEventPayload`
- `ValidationError`
- `RetryError`

The examples show basic uses of these error types.

```js
async function onGroup(event) {
  if (!event.traits.company) {
    throw new InvalidEventPayload('Company name is required')
  }
}

async function onPage(event) {
  if (!event.properties.pageName) {
    throw new ValidationError('Page name is required')
  }
}

async function onAlias(event) {
  throw new EventNotSupported('Alias event is not supported')
}

async function onTrack(event) {
  let res
  try {
    res = await fetch('http://example-service.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event })
    })
  } catch (err) {
    // Retry on connection error
    throw new RetryError(err.message)
  }
  if (res.status >= 500 || res.status === 429) {
    // Retry on 5xx and 429s (ratelimits)
    throw new RetryError(`HTTP Status ${res.status}`)
  }
}

```
If you don't supply a function for an event type, Segment throws an `EventNotSupported` error by default.

You can read more about [error handling](#destination-functions-logs-and-errors) below.

## Create settings and secrets

{% include content/functions/settings.md %}

Next, fill out this setting's value in the **Test** tab, so you can run the function and verify that the correct setting value is passed. (This value is only for testing your function.)

Now that you've configured a setting and entered a test value, you can add code to read its value and run the function, as in the example below:

```js
async function onTrack(request, settings) {
  const apiKey = settings.apiKey
  //=> "super_secret_string"
}
```

When you deploy your destination insert function in your workspace, you fill out the settings on the destination configuration page, similar to how you would configure a normal destination.


## Test the destination insert function

{% comment %}
You can test your code directly from the editor in two ways:

Use a sample event:
1. From the **Test** tab click **Use sample event**. 
2. Select a destination or source to use events from. Then, select a sample event to use.
2. Click **Use event**, and select **Run** from the **Test** tab. 
{% endcomment %}

You can manually test your code from the functions editor:
1. From the **Test** tab, click **customize the event yourself** and manually input your own JSON payload. 
2. If your test fails, you can check the error details and logs in the Output section.
- Error messages display errors surfaced from your function.
- Logs display any messages to console.log() from the function.

## Save and deploy the destination insert function

Once you finish building your insert function, click **Next: Configure and deploy** to name it, then click **Create function** to save it.

Once you do that, you'll see the insert function from the Functions page in your catalog. 

If you're editing an existing function, you can save changes without updating the instances of the function that are already deployed and running. 

You can also choose to **Save & Deploy** to save the changes, then choose which already-deployed functions to update with your changes. 

> info ""
> You may need additional permissions to update existing functions. 

## Enable the destination insert function

You need to enable your insert function for it to process your data. 

To enable your insert function:

1. Navigate to **Connections > Destinations > Functions**.
2. Select the **Enable Function** toggle, and click **Enable** on the pop-out window. 

To prevent your insert function from processing data, toggle Enable Function off.

{% comment %}
## Batching the insert function

Insert functions support batching with the `onBatch` handler. 

Batch handlers are an extension of insert functions. When you define an `onBatch` handler alongside the handler functions for single events (for example, `onTrack` or `onIdentity`), you're telling Segment that the insert function can accept and handle batches of events. 

Note the following limitations for batching with insert functions:
- The batch request and response size is limited to 6mb.
- Max count begins with 100 and goes up to 1,000.

> info ""
> Batching is available for insert and destination functions only. Read more about batching [here](/docs/connections/functions/destination-functions/#batching-the-destination-function). 

{% endcomment %}

## Destination Insert Functions logs and errors

A function can throw errors, or Segment might encounter errors while invoking your function. You can view these errors in the [Event Delivery](/docs/connections/event-delivery/) tab for your Destination as in the example below.

![A screenshot of the event delivery tab, showing 519 failed events broken into categories explaining why they failed](images/event-delivery.png)

### Destination functions error types

- **Bad Request** - Any error thrown by the function code that is not covered by the other errors.
- **Invalid Settings** - A configuration error prevented Segment from executing your code. If this error persists for more than an hour, [contact Segment Support](https://segment.com/help/contact/){:target="_blank"}.
- **Message Rejected** - Your code threw `InvalidEventPayload` or `ValidationError` due to invalid input.
- **Unsupported Event Type** - Your code doesn't implement a specific event type (for example, `onTrack()`) or threw an `EventNotSupported` error.
- **Retry** - Your code threw `RetryError` indicating that the function should be retried.

Segment only attempts to send the event to your destination function again if a **Retry** error occurs.

You can view Segment's list of [Integration Error Codes](/docs/connections/integration_error_codes/) for more information about what might cause an error.

### Destination functions logs

If your function throws an error, execution halts immediately. Segment captures the event, any outgoing requests/responses, any logs the function might have printed, as well as the error itself.

Segment then displays the captured error information in the [Event Delivery](/docs/connections/event-delivery/) page for your destination insert function. You can use this information to find and fix unexpected errors.

You can throw [an error or a custom error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error){:target="_blank"} and you can also add helpful context in logs using the [`console` API](https://developer.mozilla.org/en-US/docs/Web/API/console){:target="_blank"}. For example:

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
> Don't log sensitive data, such as personally-identifying information (PII), authentication tokens, or other secrets. Avoid logging entire request/response payloads. The **Function Logs** tab may be visible to other workspace members if they have the necessary permissions.

## Caching in Destination Insert Functions

Functions execute only in response to incoming data, but the environments that functions run in are generally long-running. Because of this, you can use global variables to cache small amounts of information between invocations. For example, you can reduce the number of access tokens you generate by caching a token, and regenerating it only after it expires. Segment cannot make any guarantees about the longevity of environments, but by using this strategy, you can improve the performance and reliability of your Functions by reducing the need for redundant API requests.

This example code fetches an access token from an external API and refreshes it every hour:

```js
const TOKEN_EXPIRE_MS = 60 * 60 * 1000 // 1 hour
let token = null
async function getAccessToken () {
  const now = new Date().getTime()
  if (!token || now - token.ts > TOKEN_EXPIRE_MS) {
    const resp = await fetch('https://example.com/tokens', {
      method: 'POST'
    }).then(resp => resp.json())
    token = {
      ts: now,
      value: resp.token
    }
  }
  return token.value
}
```

## Managing insert functions

### Functions permissions

{% include content/functions/perms.md%}


### Editing and deleting functions

If you are a **Workspace Owner** or **Functions Admin**, you can manage your function from the [Functions](https://app.segment.com/goto-my-workspace/functions/catalog){:target="_blank"} page.

## Destination Insert Functions FAQs

##### Can I see who made changes to a function?

Yes, Functions access is logged in the [Audit Trail](/docs/segment-app/iam/audit-trail/), so user activity related to functions appears in the logs.

##### Does Segment retry failed function invocations?

Yes, Segment retries invocations that throw RetryError or Timeout errors (temporary errors only). Segment's internal system retries failed functions API calls for four hours with a randomized exponential backoff after each attempt. This substantially improves delivery rates.

[Retries](/docs/connections/destinations/#retries-between-segment-and-destinations) work the same for both functions and cloud-mode destinations in Segment.

##### Are events guaranteed to send data in order?

No, Segment can't guarantee the order in which the events are delivered to an endpoint.

##### Can I create a device-mode destination?

No, destination insert functions are currently available as cloud-mode destinations only. Segment is in the early phases of exploration and discovery for supporting customer "web plugins" for custom device-mode destinations and other use cases, but this is unsupported today.

##### How do I publish a destination to the public Segment catalog?

If you are a partner, looking to publish your destination and distribute your app through Segment catalog, visit the [Developer Center](https://segment.com/partners/developer-center/){:target="_blank"} and check out the Segment [partner docs](/docs/partners/).


{% comment %}

## Using Segment's Public API

You can also use Segment's Public API to manage destination insert functions. 

Use the following endpoints to create and connect insert functions to Segment destinations. 

- Create an insert function.
```
POST createInsertFunction(Function)
{
    // Responds with a function class_id
}
```

- Map an insert function to a destination configID.
```
POST connectInsertFunction(fn_id, destination_config_id)
{
    // create a new insert function instance
    // connect the function instance with the given destination
    // responds with the instance insert_fn_config_id
}
```

- Update an insert function. 
```
PATCH updateInsertFunction(fn_id, Function)
{
    // update insert function class details like code, settings, and more. 
}
```

- Delete an insert function instance. 
```
DELETE InsertFunctionInstance(insert_fn_config_id)
{
    // deletes an insert function instance 
}
```

- Delete an insert function class.
```
DELETE deleteInsertFunction(fn_id)
{
    //deletes an insert function class
}
```

For more information, visit Segment's [Public API docs](https://docs.segmentapis.com/tag/Functions){:target="_blank"}.

{% endcomment %}