---
title: Source Insert Functions

---

> info "Source Insert Function is in Public Beta"
> Source Insert Function is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

## Create source insert functions 

There are two ways you can access source insert functions from your Segment workspace:
- From the [Connections catalog](#using-the-catalog).
- From the [Sources tab](#using-the-sources-tab). 

### Using the catalog

To create a source insert function from Segment’s catalog:

1. Navigate to **Connections** > **Catalog** > **Functions** and click **New Function**.

2. In the Select Function Type screen, select **Source Insert** and click **Next: Build Function**.

3. Write and test your function code. Enter a sample event and click **Run** to test the function. 

4. Click **Next: Configure & Create** to add a function name, description (optional), and function logo (optional).

5. Click **Create Function** to save your insert function. The new source insert function will be displayed in the Functions tab. 

#### Coding the source insert function

Insert functions can define handlers for the following message types:
- `onIdentity`
- `onTrack`
- `onPage`
- `onScreen`
- `onGroup`
- `onAlias`
- `onDelete`

The default source code template includes handlers for all event types. Just implement the types you need and skip the ones you don’t. For event types you want to send through, return the event in the respective event handler.

### Using the Sources tab

You can also create a source insert function from Sources.

1. Navigate to **Connections** > **Sources**.
2. Select your source and go to the **Functions** tab.
3. Click **Create insert function** to create your insert function from scratch. 

### Connecting a source insert function to a source

For data to flow downstream after transformation, you need to connect your source insert function to a source. To do this, follow the steps below:

1. Select the insert function you want to connect to the source. You can edit, delete, and connect the insert function in the side pane. 
2. Click *Connect a source**.
3. Select the source you want to connect from the dropdown and click **Connect to Source** to connect. 

### Errors and error handling

Segment considers a function’s execution successful if it completes without error. You can `throw` an error to create a failure on purpose. Use these errors to validate event data before processing to make sure the function works as expected. 

You can `throw` the following pre-defined error types to indicate that the function ran successfully, but the data was not deliverable:

- `EventNotSupported`
- `InvalidEventPayload`
- `ValidationError`
- `RetryError`
- `DropEvent`

This is similar to Source, Destination, and Insert Functions. 

The errors listed are all permanent errors, except `RetryError`. When a `RetryError` is thrown, Segment will reattempt to run the function a set number of times before permanently erroring out.

### Source insert functions FAQs

**The Delivery Overview tab does not display any errors that occur within the source insert function.**

If errors arise or events are dropped, they will appear as if the events never flowed from the source.

**Can I test the function with different event types?**

You can test the function with different event types from the **Test** tab in the code editor, similar to other functions.

**Can I use source insert functions for all types of Source?**

Source insert functions only work for event sources, not object sources or rETL.

**What is the expected latency for a source insert function?**

Typically, it takes a source insert function between 200 milliseconds to 5 seconds to complete, based on the complexity of the function. The default timeout is 5 seconds but can be increased to 60 seconds. 

**What is the runtime environment?**

Segment supports Node.js V18. The dependencies listed [here](https://segment.com/docs/connections/functions/insert-functions/#runtime-and-dependencies){:target=”_blank”} are installed in the function. The following dependencies are also installed: 
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

