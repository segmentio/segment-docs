---
title: 'Destination Functions'
redirect_from:
  - '/connections/destinations/custom/'
  - '/connections/destinations/custom-destinations/'
  - '/connections/destinations/destination-functions/'
---

Destination functions allow you to transform and annotate your Segment events and send them to any external tool or API without worrying about setting up or maintaining any infrastructure. 

Destination functions are written using JavaScript and can have settings associated with them.
All functions are scoped to your workspace, so members of other workspaces won't be able to view and use them.

**[VISUAL SHOWING DATA FLOW FROM SEGMENT SOURCE TO FN TO DESTINATION]**

## Getting started

### Creating your Destination Function

1. Open your workspace in Segment.
2. Go to Catalog and click the [Functions](https://app.segment.com/goto-my-workspace/functions/catalog) tab.
3. Click **New Function**.
4. Select **Destination Function** and click **Build**

> info ""
> **Tip:** Get started easily by referencing the templates available in the UI or in this open-sourced [Functions Library](https://github.com/segmentio/functions-library) - you're welcome to contribute too!

After you click the **Build** button, a code editor will show up, where you can write the code for your function, configure settings and test its behavior.

![Functions Editor](images/editor.png)

For each event sent to your destination function, Segment invokes a separate function based on the event type.

> info ""
> When [destination filters](/docs/connections/destinations/destination-filters/) are configured and an event doesn't pass the filter, your function won't be invoked.

Default source code template includes all of them, but feel free to use only functions you need and skip the ones you don't.
Destination function can define handlers for each message type in the [Segment spec](/docs/connections/spec/):

- `onIdentify`
- `onTrack`
- `onPage`
- `onScreen`
- `onGroup`
- `onAlias`
- `onDelete`

Note, that destination functions don't currently support data from [object sources](/docs/connections/sources/catalog/#object-cloud-sources) yet.

Each of the functions above accepts two arguments:

- **event** - Segment event object, where fields and values depend on the type of event. For example, for "Identify" events it's formatted according to [Identify spec](/docs/connections/spec/identify/) and so on.
- **settings** - Set of settings for this function.

We'll learn more about settings later, let's see how we can process Segment events with destination function first.
Here's an example of a destination function that listens to "Track" events and sends some details about them to an external service:

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

If you rename this function to `onIdentify`, it will listen to "Identify" events instead and so on.

> info ""
> Function's runtime includes a `fetch()` polyfill via a [`node-fetch`](https://www.npmjs.com/package/node-fetch) package. Check out its documentation for usage examples.


Function's execution is considered successful if it finishes without any errors.
You can also `throw` an error to indicate a failure on purpose.
This is useful for validating event data before starting to process it to ensure your function works as expected.
There are three pre-defined error types that you can `throw` to indicate that the function ran as expected, but data could not be delivered:

- `EventNotSupported`
- `InvalidEventPayload`
- `ValidationError`

Here are basic examples using these error types:

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

You can read more about [error handling](#errors) below.

### Runtime and Dependencies

Destination functions are powered by Node.js 10.x.
We don't currently support importing your own dependencies but please reach out to [our support team](https://segment.com/help/contact/) if you would like to request one to be added.
The following dependencies are pre-installed in the function environment.

- [`atob`](https://www.npmjs.com/package/atob) *— version 2.1.2*
- [`aws-sdk`](https://www.npmjs.com/package/aws-sdk) *— version 2.488.0*
- [`btoa`](https://www.npmjs.com/package/btoa) *— version 1.2.1*
- [`form-data`](https://www.npmjs.com/package/form-data) *— version 2.4.0*
- [`lodash`](https://www.npmjs.com/package/lodash) *— version 4.17.15*
- [`node-fetch`](https://www.npmjs.com/package/node-fetch) *— version 2.6.0*
- [`oauth`](https://www.npmjs.com/package/oauth) *— version 0.9.15*
- [`xml`](https://www.npmjs.com/package/lodash) *— version 1.0.1*

Use `require()` to import a dependency:

```js
const _ = require('lodash');
```

### ️Settings and Secrets

Settings allow you to pass configurable variables to your function.
A common pattern is to add settings for an API endpoint and API key, so that you can use the same code with different settings for different purposes.

First, add a setting in **Settings** tab in the code editor:

![Settings Tab](images/settings-tab-empty.jpg){:width="500"}

Click the **Add Setting** button to add your new setting:

![Add Setting Dialog](images/add-setting-dialog.jpg)

You can configure various details about this setting, which will affect how it's displayed to users of your function:

- **Label** - Name of your setting, which users will see when configuring this function.
- **Name** - Auto-generated name of this setting to use in function's source code.
- **Type** - Type of setting's value.
- **Description** - Optional description, which will be displayed below setting name.
- **Required** - Enable to ensure this setting is always filled out.
- **Encrypted** - Enable to encrypt value of this setting. Useful for sensitive data, like API keys.

As you change the values, you can see a preview of how your setting will look and work on the right.

After setting is added, it will appear in the **Settings** tab, where you can edit or delete it afterwards.

![Settings Tab](images/settings-tab-non-empty.jpg){:width="500"}

Next, fill out this setting's value in **Test** tab, so that we can run our function and verify correct setting value is being passed.
Note, this value is only for testing your function.

![Test Value For Setting](images/setting-in-test-tab.jpg){:width="500"}

Now that we have our setting set up and test value filled in, we can add code to read its value and run our function:

```js
async function onTrack(request, settings) {
  const apiKey = settings.apiKey
  //=> "super_secret_string"
}
```

Once your destination function is deployed as an instance within your workspace, settings can be filled out on the destination configuration page.

![Destination Function Settings](images/dest-settings.png)

## Testing

You can test your code directly from the editor in two ways:

### Use Sample Events

Click on **Use Sample Event** and select the source you'd like to use events from.

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

Your function can throw errors or Segment may encounter errors while attempting to invoke your function. You can view these errors in the [Event Delivery](/docs/connections/event-delivery/) tab for your Destination:

![Destination Function Event Delivery tab](images/event-delivery.png)

### Error Types

- **Bad Request** - Any error thrown by your code not covered by the other errors.
- **Invalid Settings** - A configuration error prevented Segment from executing your code. If this error persists for more than an hour, [contact us](https://segment.com/help/contact/).
- **Message Rejected** - Your code threw `InvalidEventPayload` or `ValidationError` due to invalid input.
- **Unsupported Event Type** - Your code does not implement a specific event type (`onTrack()`, etc.) or threw a `EventNotSupported` error.

When these errors happen, Segment is not going to retry sending that event to your destination function.

### Logs

If your function throws an error, execution is halted immediately. Segment captures the event, any outgoing requests/responses, any logs function may have printed, as well as the error itself. 
Segment then displays the captured error information in the [Event Delivery](/docs/connections/event-delivery/) page of your destination. You can use this information to find and fix unexpected errors.

![Destination Function error logs](images/error-logs.png)

You can throw [an Error or a custom Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) and you can also add additional helpful context in logs using the [`console` API](https://developer.mozilla.org/en-US/docs/Web/API/console). For example:

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


## Management

### Permissions

Functions have specific roles which can be leveraged for [access management](/docs/segment-app/iam/) within your Segment workspace.

The ability to create, edit and delete a function is dictated by two permission roles:

- **Functions Admin:** Create, edit and delete all functions or a subset of specified functions.
- **Functions Read-only:** View all functions or a subset of specified functions.

The permissions required to enable your destination function on a source or deploy changes to functions already connected to a source require additional **Source Admin** permissions in addition to the role selected above.


### Editing and deleting

If you are a **Workspace Owner** or **Functions Admin**, you can manage your function from the [Functions](https://app.segment.com/goto-my-workspace/functions/catalog) page.

![Editing or deleting your Destination Function](images/function-sidesheet.gif)


### Monitoring

You can use [Destination Event Delivery](/docs/guides/destinations/how-do-i-check-if-data-is-successfully-being-delivered-to-my-destination/) to understand if Segment encounters any issues delivering your source data to destinations. Errors that the Function throws appear here.

If any of your deployed function instances are failing consistently, they will also appear in [Connection Health](/docs/segment-app/#sts=Health).

### Data Control

You can use [Destination Filters](/docs/connections/destinations/destination-filters/) or Privacy Controls to manage what events and, of those events, which event properties are sent to your Destination Function.

## FAQs

**Can I see who made changes to a function?**

Yes, functions are compatible with [Audit Trail](/docs/segment-app/iam/audit-trail/) and will display user activity relating to functions.

**Does Segment retry failed function invocations?**

Segment retries 9 times over the course of 4 hours. This increases the number of attempts for messages, so we try to re-deliver them another 4 times after some backoff. Segment doesn't retry if your function throws a [non-recoverable error](#error-types).

**Are events guaranteed to send in order?**

No, Segment can't guarantee the order in which the events are delivered to an endpoint.

**Can I create a device-mode destination?**

No, for now destination functions enable you to write and deploy cloud-mode destinations. We're in the early phases of exploration and discovery for supporting customer "web plugins" for custom device-mode destinations and other use cases, but this is unsupported today.

**How do I publish a destination to the Segment catalog instead of my own workspace?**

If you are a partner, looking to publish your destination and distribute your app through Segment catalog, visit the [Developer Center](https://segment.com/partners/developer-center/) and check out our [partner docs](/docs/partners).
