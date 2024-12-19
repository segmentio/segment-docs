---
title: Destination Insert Functions
 
---

Use Destination Insert Functions to enrich, transform, or filter your data before it reaches downstream destinations.

**Implement advanced data computation**: Write custom computation, operations, and business logic on streaming data that you send to downstream destinations.

**Enrich your data**: Use destination insert functions with Segment's Profile API or third party sources to add additional context to your data and create personalized customer experiences.

**Support data compliance**: Use destination insert functions to support data masking, encryption, decryption, improved PII data handling, and tokenization.

**Customize filtration for your destinations**: Create custom logic with nested if-else statements, regex, custom business rules, and more to filter event data.

> info "Destination Insert Functions are not compatible with IP Allowlisting"
> For more information, see the [IP Allowlisting](/docs/connections/destinations/#ip-allowlisting) documentation. 

## Create destination insert functions

There are two ways you can access destination insert functions from your Segment space:
- From the Connections [catalog](#using-the-catalog).
- From the [Destinations](#using-the-destinations-tab) tab.

### Using the catalog

To create an insert function from Segment's catalog:

1. Navigate to **Connections > Catalog > Functions** and click **New Function**.
2. From the Select Type screen, select **Insert** and click **Next: Build Function**.
3. Write and test your function code. Manually enter a sample event and click **Run** to test.
4. Click **Next: Configure & Create** to add a function name, description, and logo.
5. Click **Create Function** to create your insert function. You'll see the insert function displayed in the Functions tab.

For data to flow to your downstream destinations, you'll need to connect your insert function to a destination:

1. Select the insert function you'd like to connect. From the side pane, you can edit, delete, and connect the insert function.
2. Click **Connect a destination**.
3. Select the destination you'd like to connect to and click **Connect to destination**.

> warning "Storage destinations are not compatible with Destination Insert Functions"
> You cannot connect an Insert Function to a storage destination at this time.

### Using the Destinations tab

To access insert functions through the Destinations tab: 
1. Navigate to **Connections > Destinations**. 
2. Select your destination.
3. Select **Functions** and then select your insert function. 

Use this page to edit and manage insert functions in your workspace. 

You can also use this page to [enable destination insert functions](#enable-the-insert-function) in your workspace.

## Code the destination insert function

> info ""
> To prevent "Unsupported Event Type" errors, ensure your insert function handles all event types (page, track, identify, alias, group) that are expected to be sent to the destination. It is highly recommended to [test the function](https://segment.com/docs/connections/functions/insert-functions/#test-the-destination-insert-function) with each event type to confirm they are being handled as expected.

Segment invokes a separate part of the function (called a "handler") for each event type that you send to your destination insert function.

> info ""
> If you’ve configured a [destination filter](/docs/connections/destinations/destination-filters/) and the event doesn’t pass the filter, then your function isn’t invoked for that event as Segment applies destination filters before insert functions. The same is true for the [integrations object](/docs/guides/filtering-data/#filtering-with-the-integrations-object)). If an event is configured with the integrations object not to go to a particular destination, then the insert function connected to that destination won't be invoked. 

The default source code template includes handlers for all event types. You don't need to implement all of them - just use the ones you need, and skip the ones you don't. For event types that you want to send through the destination, return the event in the respective event handlers.

> info ""
> Removing the handler for a specific event type results in blocking the events of that type from arriving at their destination. To keep an event type as is but still send it downstream, add a `return event` inside the event type handler statement.

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

  return event;
  
}
```

To change which event type the handler listens to, you can rename it to the name of the message type. For example, if you rename this function `onIdentify`, it listens for "Identify" events instead.

To ensure the Destination processes an event payload modified by the function, return the `event` object at the handler's end.

> info ""
> Functions' runtime includes a `fetch()` polyfill using a `node-fetch` package. Check out the [node-fetch documentation](https://www.npmjs.com/package/node-fetch){:target="_blank"} for usage examples.

### Errors and error handling

Segment considers a function's execution successful if it finishes without error. You can `throw` an error to create a failure on purpose. Use these errors to validate event data before processing it to ensure the function works as expected.

You can `throw` the following pre-defined error types to indicate that the function ran as expected, but the data was not deliverable:

- `EventNotSupported`
- `InvalidEventPayload`
- `ValidationError`
- `RetryError`
- `DropEvent`

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

    return event;
    
  } catch (err) {
    // Retry on connection error
    throw new RetryError(err.message)
  }
  if (res.status >= 500 || res.status === 429) {
    // Retry on 5xx and 429s (ratelimits)
    throw new RetryError(`HTTP Status ${res.status}`)
  }
}

async function onIdentify(event) {
  if (event.traits.companyName) {
    // Drop Event | Do NOT forward event to destination
    throw new DropEvent('Company name is required')
  }
  return event;
}

```
If you don't supply a function for an event type, Segment throws an `EventNotSupported` error by default.


You can read more about [error handling](#destination-insert-functions-logs-and-errors) below.

## Runtime and dependencies

{% include content/functions/runtime.md %}


## Insert Functions and Actions destinations

A payload must come into the pipeline with the attributes that allow it to match your mapping triggers. You can't use an Insert Function to change the event to match your mapping triggers. If an event comes into an Actions destination and already matches a mapping trigger, that mapping subscription will fire. If a payload doesn't come to the Actions destination matching a mapping trigger, even if an Insert Function is meant to alter the event to allow it to match a trigger, it won't fire that mapping subscription. Segment sees the mapping trigger first in the pipeline, so a payload won't make it to the Insert Function at all if it doesn't come into the pipeline matching a mapping trigger. 

Unlike Source Functions and Destination Functions, which return multiple events, an Insert Function only returns one event. When the Insert Function receives an event, it sends the event to be handled by its configured mappings.

If you would like [multiple mappings triggered by the same event](/docs/connections/destinations/actions/#:~:text=Multiple%20mappings%20triggered,Subscription%20Updated%20event.):
1. Create different types of mappings (Identify, Track, Page, etc) or multiple mappings of the same type.
2. Configure the mapping's [trigger conditions](/docs/connections/destinations/actions/#conditions) to look for that event name/type or other available field within the payload.
3. Configure the mapped fields to send different data. 

You can also configure the Insert Function to add additional data to the event's payload before it's handled by the mappings and configure the mapping's available fields to reference the payload's available fields. 

You may want to consider the [context object's](/docs/connections/spec/common/#context) available fields when adding new data to the event's payload.

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

> warning ""
> The Event Tester won't make use of an Insert Function, show how an Insert Function impacts your data, or send data downstream through the Insert Function pipeline. The Event Tester is not impacted by an Insert Function at all. Use the Function tester rather than the Event Tester to see how your Insert Function impacts your data.

## Save and deploy the destination insert function

Once you finish building your insert function, click **Next: Configure & Create** to name it, then click **Create Function** to save it.

Once you do that, you'll see the insert function from the Functions page in your catalog. 

If you're editing an existing function, you can save changes without updating the instances of the function that are already deployed and running. 

You can also choose to **Save & Deploy** to save the changes, then choose which already-deployed functions to update with your changes. 

> info ""
> You may need additional permissions to update existing functions. 

## Enable the destination insert function

You need to enable your insert function for it to process your data. 

To enable your insert function:

1. Navigate to **Connections > Destinations**.
2. Select your destination, then select the **Functions** tab.
2. Select the **Enable Function** toggle, and click **Enable** on the pop-out window. 

To prevent your insert function from processing data, toggle Enable Function off.

## Batching the destination insert function

Batch handlers are an extension of insert functions. When you define an `onBatch` handler alongside the handler functions for single events (for example, `onTrack` or `onIdentity`), you're telling Segment that the insert function can accept and handle batches of events. 

> info ""
> Batching is available for destination and destination insert functions only. 

### When to use batching

Consider creating a batch handler if:

- **You have a high-throughput function and want to reduce cost.** When you define a batch handler, Segment invokes the function once per *batch*, rather than once per event. As long as the function’s execution time isn’t adversely affected, the reduction in invocations should lead to a reduction in cost.

- **Your destination supports batching**. When your downstream destination supports sending data downstream in batches you can define a batch handler to avoid throttling. Batching for functions is independent of batch size supported by the destination. Segment automatically handles batch formation for destinations.

> info ""
> If a batched function receives too low a volume of events (under one event per second) to be worth batching, Segment may not invoke the batch handler.

### Define the batch handler

Segment collects the events over a short period of time and combines them into a batch. The system flushes them when the batch reaches a certain number of events, or when the batch has been waiting for a specified wait time.

To create a batch handler, define an `onBatch` function within your destination insert function. You can also use the "Default Batch" template found in the Functions editor to get started quickly.

```js
async function onBatch(events, settings){
  // handle the batch of events
  return events
}
```

> info ""
> The `onBatch` handler is an optional extension. Destination insert functions must still contain single event handlers as a fallback, in cases where Segment doesn't receive enough events to execute the batch.

The handler function receives an array of events. The events can be of any supported type and a single batch may contain more than one event type. Handler functions can also receive function settings. Here is an example of what a batch can look like:

```json
[
    {
      "type": "identify",
      "userId": "019mr8mf4r",
      "traits": {
        "email": "jake@yahoo.com",
        "name": "Jake Peterson",
        "age": 26
      }
    },
    {
      "type": "track",
      "userId": "019mr8mf4r",
      "event": "Song Played",
      "properties": {
        "name": "Fallin for You",
        "artist": "Dierks Bentley"
      }
    },
    {
      "type": "track",
      "userId": "971mj8mk7p",
      "event": "Song Played",
      "properties": {
        "name": "Get Right",
        "artist": "Jennifer Lopez"
      }
    }
]
```

### Configure the event types within a batch

Segment batches together any event _of any type_ that it sees over a short period of time to increase batching efficiency and give you the flexibility to decide how batches are created. If you want to split batches by event type, you can implement this in your functions code by writing a handler.

```js
async function onBatch(events, settings) {
  // group events by type
  const eventsByType = {}
  for (const event of events) {
    if (!(event.type in eventsByType)) {
      eventsByType[event.type] = []
    }
    eventsByType[event.type].push(event)
  }

  // concurrently process sub-batches of a specific event type
  const promises = Object.entries(eventsByType).map(([type, events]) => {
    switch (type) {
    case 'track':
      return onTrackBatch(events, settings)
    case 'identify':
      return onIdentifyBatch(events, settings)
    // ...handle other event types here...
    }
  })
  try {
    const results = await Promise.all(promises);
    const batchResult = [].concat(...results); // Combine arrays into a single array
    return batchResult;
  } catch (error) {
    throw new RetryError(error.message);
  }
}

async function onTrackBatch(events, settings) {
  // handle a batch of track events
  return events
}

async function onIdentifyBatch(events, settings) {
  // handle a batch of identify events
  return events
}
```

### Configure your batch parameters
 
By default, Functions waits up to 10 seconds to form a batch of 20 events. You can increase the number of events included in each batch (up to 400 events per batch) by contacting [Segment support](https://segment.com/help/contact/){:target="_blank"}. Segment recommends users who wish to include fewer than 20 events per batch use destination insert functions without the `onBatch` handler.

### Test the batch handler

The [Functions editing environment](/docs/connections/functions/environment/) supports testing batch handlers.

To test the batch handler:
1. In the right panel of the Functions editor, click **customize the event yourself** to enter Manual Mode.
2. Add events as a JSON array, with one event per element.
3. Click **Run** to preview the batch handler with the specified events.

> info ""
> The Sample Event option tests single events only. You must use Manual Mode to add more than one event so you can test batch handlers.

The editor displays logs and request traces from the batch handler.

The [Public API](/docs/api/public-api) Functions/Preview endpoint also supports testing batch handlers. The payload must be a batch of events as a JSON array.

### Handling filtering in a batch
Events in a batch can be filtered out using custom logic. The filtered events will be surfaced in the [Event Delivery](/docs/connections/event-delivery/) page with reason as `Filtered at insert function`

```js
async function onBatch(events, settings) {
  let response = [];
  try {
    for (const event of events) {
      // some business logic to filter event. Here filtering out all the events with name `drop`
      if (event.properties.name === 'drop') {
        continue;
      }

      // some enrichments if needed
      event.properties.message = "Enriched from insert function";

      // Enriched events are pushed to response
      response.push(event);
    }
  } catch (error) {
    console.log(error)
    throw new RetryError('Failed function', error);
  }

  // return a subset of transformed event
  return response;
}
```


### Handling batching errors

Standard [function error types](/docs/connections/functions/destination-functions/#destination-functions-error-types) apply to batch handlers. Segment attempts to retry the batch in the case of Timeout or Retry errors. For all other error types, Segment discards the batch.

{% comment %}

## Destination insert functions logs and errors

A function can throw errors, or Segment might encounter errors while invoking your function. You can view these errors in the [Event Delivery](/docs/connections/event-delivery/) tab for your Destination as in the example below.

![A screenshot of the event delivery tab, showing 519 failed events broken into categories explaining why they failed](images/event-delivery.png)

{% endcomment %}

### Destination insert functions error types

- **Bad Request** - Any error thrown by the function code that is not covered by the other errors.
- **Invalid Settings** - A configuration error prevented Segment from executing your code. If this error persists for more than an hour, [contact Segment Support](https://segment.com/help/contact/){:target="_blank"}.
- **Message Rejected** - Your code threw `InvalidEventPayload` or `ValidationError` due to invalid input.
- **Unsupported Event Type** - Your code doesn't implement a specific event type (for example, `onTrack()`) or threw an `EventNotSupported` error.
- **Retry** - Your code threw `RetryError` indicating that the function should be retried.

Segment only attempts to send the event to your destination insert function again if a **Retry** error occurs.

You can view Segment's list of [Integration Error Codes](/docs/connections/integration_error_codes/) for more information about what might cause an error.

### Destination insert functions logs

{% include content/functions/logs.md %}

> warning ""
> Don't log sensitive data, such as personally-identifying information (PII), authentication tokens, or other secrets. Avoid logging entire request/response payloads. The **Function Logs** tab may be visible to other workspace members if they have the necessary permissions.

## Caching in destination insert functions

{% include content/functions/caching.md %}

## Managing destination insert functions

### Functions permissions

{% include content/functions/perms.md%}


### Editing and deleting functions

If you are a **Workspace Owner** or **Functions Admin**, you can manage your function from the [Functions](https://app.segment.com/goto-my-workspace/functions/catalog){:target="_blank"} page.

## Destination insert functions FAQs

##### Can I see who made changes to a function?

Yes, Functions access is logged in the [Audit Trail](/docs/segment-app/iam/audit-trail/), so user activity related to functions appears in the logs.

##### Does Segment retry failed function invocations?

Yes, Segment retries invocations that throw RetryError or Timeout errors (temporary errors only). Segment's internal system retries failed functions API calls for four hours with a randomized exponential backoff after each attempt. This substantially improves delivery rates.

[Retries](/docs/connections/destinations/#retries-between-segment-and-destinations) work the same for both functions and cloud-mode destinations in Segment.

##### Are events guaranteed to send data in order?

No, Segment can't guarantee the order in which the events are delivered to an endpoint.

##### Do I Need to specify an endpoint for my Insert function?

No, specifying an endpoint is not always required for insert functions. If your function is designed to transform or filter data internally—such as adding new properties to events or filtering based on existing properties—you won't need to specify an external endpoint.

However, if your function aims to enrich event data by fetching additional information from an external service, then you must specify the endpoint. This would be the URL of the external service's API where the enriched or captured data is sent.


##### Can I use Insert Functions with Device Mode destinations?

No, Destination Insert Functions are currently available for use with Cloud Mode (server-side) destinations only. Segment is in the early phases of exploration and discovery for supporting customer web plugins for custom Device Mode destinations and other use cases, but this is unsupported today.

##### Can I use Insert Functions with Storage destinations?

Insert Functions are only supported by Cloud Mode (server-side) destinations and aren't compatible with Storage destinations.

##### Can I connect an insert function to multiple destinations?

Yes, you can connect an insert function to multiple destinations.

##### Can I connect multiple insert functions to one destination?

No, you can only connect one insert function to a destination.

##### Can I have destination filters and a destination insert function in the same connection?

Yes, you can have both destination filters and destination insert functions in the same connection. 

##### Are insert functions invoked before or after Destination Filters are applied?

Segment's data pipeline applies Destination Filters before invoking Insert Functions. 

##### Why am I receiving a 500 Internal Error when saving the same of the destination insert function?

There is an 120-Character limit for the insert function display name.

##### Why does the Event Delivery tab show "Unsupported Event Type" errors for events supported by the destination after I enabled an insert function?

This error occurs because your insert function code might not be handling all event types (Page, Track, Identify, Alias, Group) that your destination supports. When these unlisted events pass through the function, they are rejected with the "Unsupported Event Type" error.

To resolve this, verify your insert function includes handlers for all expected event types and returns the event object for each. Here’s an example of how you can structure your insert function to handle all event types:

```
async function onTrack(event, settings) {
    //Return event to handle page event OR Your existing code for track event
    return event;
}

async function onPage(event, settings) {
    //Return event to handle page event OR Your existing code for track event
    return event;
}

async function onIdentify(event, settings) {
    //Return event to handle page event OR Your existing code for track event
    return event;
}

async function onAlias(event, settings) {
    //Return event to handle page event OR Your existing code for track event
    return event;
}

async function onGroup(event, settings) {
  //Return event to handle page event OR Your existing code for track event
    return event;
}

// Ensure that all expected event types are included in your function
```
By including handlers for all the major event types, you ensure that all supported events are processed correctly, preventing the "Unsupported Event Type" error. Always test your updated code before implementing it in production.

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

##### What is the maximum data size that can be displayed in console.logs() when testing a Function?

The test function interface has a 4KB console logging limit. Outputs surpassing this limit won't be visible in the user interface.
