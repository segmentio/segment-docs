---
title: Source Insert Functions
---

Use Source Insert Functions to enrich, transform, or filter your data before it flows downstream to destinations.

> info "Source Insert Function is in public beta"
> Source Insert Function is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

There are two ways you can access source insert functions from your Segment workspace:
- From the Connections catalog.
- From the Sources tab. 

## Creating a Source Insert Function

To create a source insert function from Segment’s catalog:

1. Navigate to **Connections** > **Catalog** > **Functions** and click **New Function**.

2. In the Select Function Type screen, select **Source Insert** and click **Next: Build Function**.

3. Write and test your function code. Enter a sample event and click **Run** to test the function. 

4. Click **Next: Configure & Create** to add a function name, description (optional), and function logo (optional).

5. Click **Create Function** to save your insert function. The new source insert function displays in the Functions tab.

You can also go to **Conections** > **Sources** to create a source insert function.

### Coding the source insert function

Insert functions can define handlers for the following message types:
- `onIdentity`
- `onTrack`
- `onPage`
- `onScreen`
- `onGroup`
- `onAlias`
- `onDelete`

The default source code template includes handlers for all event types. Implement the types you need. For event types you want to send through, return the event in the respective event handler. 

### Connecting a source insert function to a source

For data to flow downstream after transformation, connect your source insert function to a source. To do this:

1. Select the insert function you want to connect to the source. You can edit, delete, and connect the insert function on the side pane. 
2. Click *Connect a source**.
3. Select the source you want to connect to and click **Connect to Source**. 

### Errors and error handling

Segment considers a function’s execution successful if it completes without error. You can `throw` an error to create a failure on purpose. Use these errors to validate event data before processing to make sure the function works as expected. 

You can `throw` the following pre-defined error types to indicate that the function ran successfully, but the data was not deliverable:

- `EventNotSupported`
- `InvalidEventPayload`
- `ValidationError`
- `RetryError`
- `DropEvent`

This is similar to Source, Destination, and Insert Functions. 

The errors listed are all permanent errors, except `RetryError`. When a `RetryError` is thrown, Segment reattempts to run the function a set number of times before permanently erroring out.

## FAQs

##### Why does the Delivery Overview tab not display any errors that occur within the source insert function?

If errors arise or events are dropped, they appear as if the events never flowed from the source.

##### Can I test the function with different event types?

You can test the function with different event types from the **Test** tab in the code editor, similar to other functions.

##### Can I use source insert functions for all types of sources?

Source insert functions only work for event sources, not object sources or rETL.

##### What is the expected latency for a source insert function?

The source insert function typically completes in 200 milliseconds to 5 seconds, depending on its complexity. The default timeout is 5 seconds but can be increased to 60 seconds. 

##### What is the runtime environment?

Segment supports Node.js V18 and installs the dependencies listed [here](https://segment.com/docs/connections/functions/insert-functions/#runtime-and-dependencies){:target=”_blank”} in the function.  Segment also installs the following dependencies: 
- `@azure/identity` exposed as `azure.identity`
- `@azure/event-hubs` exposed as `azure.eventHubs`
- `@azure/synapse` exposed as `azure.synapse`  
- `jsftp` exposed as `jsftp`  
- `crypto-js` exposed as `cryptojslib.cryptojs`  
- `akeyless` exposed as `akeylessLabs.akeyless`  
- `akeyless-cloud-id` exposed as `akeylessLabs.akeylessCloudId`  
- `@onesignal/node-onesignal` exposed as `oneSignal.oneSignal`  
- `pg` exposed as `pg.pg`  
- `snowflake-sdk` exposed as `snowflakesdk.snowflakesdk`  
- `@clickhouse/client` exposed as `clickHouseClient.clickHouseClient`  
- `aws4` exposed as `aws4.aws4`  
- `@sentry/node` exposed as `sentrylib.sentry` 

