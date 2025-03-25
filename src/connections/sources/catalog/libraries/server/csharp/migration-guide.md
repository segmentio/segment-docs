---
title: Analytics-CSharp (C#) Migration Guide
strat: csharp
---

If you’re currently using Analytics.NET or Analytics.Xamarin to send data to Segment, please follow the steps below to migrate to the [Analytics-CSharp library](/docs/connections/sources/catalog/libraries/server/csharp/).  

> success ""
> Analytics-C# does not include `v1` as part of the `url` address. If you are using the Segment EU endpoint, you will have to pass it manually. For instance, `events.eu1.segmentapis.com/v1`

You can update to Analytics-CSharp in 3 steps:
1. Bundle Analytics-CSharp into your app and remove your previous SDK.
2. Change the namespaces.
3. *(Optional)* Use `Reset` to stay anonymous.


## Migration steps

1. Add the Analytics-CSharp dependency to your project. 

    <br> Before:
    ```js
    dotnet add package Analytics --version <VERSION>
    ```

     <br> Before *(for Xamarin users only)*:
    ```js
    git clone https://github.com/segmentio/Analytics.Xamarin.git
    ```

    <br>After:
    ```js
    dotnet add package Segment.Analytics.CSharp --version <VERSION>
    ```

2. Replace namespaces. 

      <br> Before:
      ```c#    
        using Segment;
        using Segment.Flush;
        using Segment.Model;
        using Segment.Request;
      ```

      <br> After:
      ```c#    
        using Segment.Analytics;
        using Segment.Analytics.Compat;
      ```

3. *(Required for .NET users)* Add `UserIdPlugin` to Analytics.
   
   Analytics-CSharp, by default, attaches an internal state `userId` to each event. The `UserIdPlugin`, instead, attaches the `userId` provided in analytics calls directly to the event.  
   
      <br> After:
      ```c#    
      analytics.Add(new UserIdPlugin());
      ```

4. *(Optional)* Update calls that resets the anonymous ID. 
   
    The old SDK requires you to provide the anonymous ID. The new SDK generates an Anonymous ID for you if you never call `analytics.Identify`. If you call `Identify` and want to go back to anonymous, the new SDK provides a `Reset` function to achieve that.

      <br> Before:
      ```c#                  
      Analytics.Client.Page(null, "Login", new Properties(), new Options()
      .SetAnonymousId("some-id"));
      ```

      <br> After:
      ```c#                  
      analytics.Reset();
      ```

## Optional changes for unit tests

Change your development settings if you would like to make analytics run synchronously for testing purposes.

<br> Before:
  ```c#                  
  Analytics.Initialize("YOUR_WRITE_KEY", new Config().SetAsync(false));
  ```

<br> After:
  ```c#                  
  var configuration = new Configuration("YOUR WRITE KEY",
    useSynchronizeDispatcher: true,
    // provide a defaultSettings in case the SDK failed to fetch settings in test environment
    defaultSettings: new Settings   
    {
        Integrations = new JsonObject
        {
            ["Segment.io"] = new JsonObject
            {
                ["apiKey"] = "YOUR WRITE KEY"
            }
        }
    }
  );
  var analytics = new Analytics(configuration);
  ```

## FAQs

### Should I make Analytics a singleton or scoped in .NET? 

The SDK supports both, but be aware of the implications of choosing one over the other:

| Feature | Singleton | Scoped |
|--|--|--|
| **Fetch Settings** | Settings are fetched only once at application startup. | Settings are fetched on every request. |
| **Flush** | Supports both async and sync flush. | Requires sync flush. Should flush per event or on page redirect/close to avoid data loss. |
| **Internal State** | The internal state (`userId`, `anonId`, etc.) is shared across sessions and cannot be used. (*This is an overhead we are working to minimize*.) | The internal state is safe to use since a new instance is created per request. |
| **UserId for Events** | Requires adding `UserIdPlugin` and calling analytics APIs with `userId` to associate the correct `userId` with events. | No need for `UserIdPlugin` or passing `userId` in API calls. Instead, call `analytics.Identify()` to update the internal state with the `userId`. Successive events are auto-stamped with that `userId`. |
| **Storage** | Supports both local storage and in-memory storage. | Requires in-memory storage. (*Support for local storage is in progress*.) |


In a nutshell, to register Analytics as singleton:

```c#
var configuration = new Configuration(
    writeKey: "YOUR_WRITE_KEY",
    // Use in-memory storage to keep the SDK stateless.
    // The default storage also works if you want to persist events.
    storageProvider: new InMemoryStorageProvider(),
    // Use a synchronous pipeline to make manual flush operations synchronized.
    eventPipelineProvider: new SyncEventPipelineProvider()
);

var analytics = new Analytics(configuration);

// Add UserIdPlugin to associate events with the provided userId.
analytics.Add(new UserIdPlugin());

// Call analytics APIs with a userId. The UserIdPlugin will update the event with the provided userId.
analytics.Track("user123", "foo", properties);

// This is a blocking call due to SyncEventPipelineProvider.
// Use the default EventPipelineProvider for asynchronous flush.
analytics.Flush();

// Register Analytics as a singleton.
```

To register Analytics as scoped:

```c#
var configuration = new Configuration(
    writeKey: "YOUR_WRITE_KEY",
    // Requires in-memory storage.
    storageProvider: new InMemoryStorageProvider(),
    // Flush per event to prevent data loss in case of a page close.
    // Alternatively, manually flush on page close.
    flushAt: 1,
    // Requires a synchronous flush.
    eventPipelineProvider: new SyncEventPipelineProvider()
);

var analytics = new Analytics(configuration);

// Update the internal state with a userId.
analytics.Identify("user123");

// Subsequent events are auto-stamped with the userId from the internal state.
analytics.Track("foo", properties);

// This is a blocking call due to SyncEventPipelineProvider.
analytics.Flush();

// Register Analytics as scoped.
```

### Which JSON library does this SDK use?

The SDK supports `.netstandard 1.3` and `.netstandard 2.0` and automatically selects the internal JSON library based on the target framework:

* In `.netstandard 1.3`, the SDK uses `Newtonsoft Json.NET`
* In `.netstandard 2.0`, the SDK uses `System.Text.Json`

Be ware that both Analytics.NET and Analytics.Xamarin use `Newtonsoft Json.NET`.  If you encounter issues where JSON dictionary values are turned into empty arrays, it is likely that:

1. You are targeting `.netstandard 2.0`.
2. Your properties use`Newtonsoft Json.NET` objects or arrays.

To resolve this, you can:
* Option 1: Target `.netstandard 1.3`
* Option 2: Upgrade your JSON library to `System.Text.Json`