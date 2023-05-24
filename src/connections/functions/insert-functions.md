---
title: Destination Insert Functions

---

Use Destination Insert Functions to compute, transform, and enrich your data before it reaches downstream destinations.

**Implement advanced data computation**: Write custom computation, operations, and business logic on streaming data that you send to downstream destinations.

**Enrich your data**: Use insert functions with Segment's Profile API or third party sources to add additional context to your data and create personalized customer experiences.

**Support data compliance**: Use insert functions to support data masking, encryption, decryption, improved PII data handling, and tokenization.

**Customize filtration for your destinations**: Create custom logic with nested if-else statements, regex, custom business rules, and more to filter event data.

> info "Destination Insert Functions in Beta"
> Destination Insert Functions is in beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.


## Create and manage insert functions

There are two ways you can access Destination Insert Functions from your Segment space:
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

You can also use this page to [enable insert functions](#enable-the-insert-function) in your workspace.

## Code the insert function

Segment invokes a separate part of the function (called a "handler") for each event type that you send to your destination function.

> info ""
> Your function isn't invoked for an event if you've configured a [destination filter](/docs/connections/destinations/destination-filters/), and the event doesn't pass the filter.

The default source code template includes handlers for all event types. You don't need to implement all of them - just use the ones you need, and skip the ones you don't.

Destination functions can define handlers for each message type in the [Segment spec](/docs/connections/spec/):

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

To change which event type the handler listens to, you can rename it to the name of the message type. For example, if you rename this function `onIdentify`, it listens for "Identify" events instead.

> info ""
> Functions' runtime includes a `fetch()` polyfill using a `node-fetch` package. Check out the [node-fetch documentation](https://www.npmjs.com/package/node-fetch){:target="_blank"} for usage examples.



## Testing the insert function

You can test your code directly from the editor in two ways:

Use a sample event:
1. From the **Test** tab click **Use sample event**. 
2. Select a destination or source to use events from. Then, select a sample event to use.
2. Click **Use event**, and select **Run** from the **Test** tab. 

Test using manual input:
1. From the **Test** tab, click **customize the event yourself** and manually input your own JSON payload. 
2. If your test fails, you can check the error details and logs in the Output section.
- Error messages display errors surfaced from your function.
- Logs display any messages to console.log() from the function.

## Save and deploy the insert function

Once you finish building your insert function, click **Next: Configure and deploy** to name it, then click **Create function** to save it.

Once you do that, you'll see the insert function from the Functions page in your catalog. 

If you're editing an existing function, you can save changes without updating the instances of the function that are already deployed and running. 

You can also choose to **Save & Deploy** to save the changes, then choose which already-deployed functions to update with your changes. 

> info ""
> You may need additional permissions to update existing functions. 

## Enable the insert function

You need to enable your insert function for it to process your data. 

To enable your insert function:

1. Navigate to **Connections > Destinations > Functions**.
2. Select the **Enable Function** toggle, and click **Enable** on the pop-out window. 

To prevent your insert function from processing data, toggle Enable Function off.

## Batching the insert function

Insert functions support batching with the `onBatch` handler. 

Batch handlers are an extension of insert functions. When you define an `onBatch` handler alongside the handler functions for single events (for example, `onTrack` or `onIdentity`), you're telling Segment that the insert function can accept and handle batches of events. 

Note the following limitations for batching with insert functions:
- The batch request and response size is limited to 6mb.
- Max count begins with 100 and goes up to 1,000.

> info ""
> Batching is available for insert and destination functions only. Read more about batching [here](/docs/connections/functions/destination-functions/#batching-the-destination-function). 


## Managing insert functions

### Functions permissions

{% include content/functions/perms.md%}


### Editing and deleting functions

If you are a **Workspace Owner** or **Functions Admin**, you can manage your function from the [Functions](https://app.segment.com/goto-my-workspace/functions/catalog){:target="_blank"} page.

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