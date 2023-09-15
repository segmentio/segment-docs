---
title: Analytics-CSharp (C#)
strat: csharp
id: 
redirect_from:
   - '/connections/sources/catalog/libraries/mobile/unity'
   - '/connections/sources/catalog/libraries/mobile/csharp/'          
---

With Analytics-CSharp, you can add Segment analytics to your C# based app which includes Unity, Xamarin, .NET. Analytics-CSharp helps you measure your users, product, and business. It unlocks insights into your app's funnel, core business metrics, and whether you have product-market fit. The Analytics-CSharp library is open-source [on GitHub](https://github.com/segmentio/analytics-csharp){:target="_blank"}. 


### Supported platforms 
These platforms support Analytics-CSharp: 
* .NET/.NET core/.NET framework
* Mono
* Universal Windows platform 
* Xamarin 
   * iOS
   * Mac
   * Android
* Unity
   * iOS
   * Android
   * PC, Mac, Linux 

## Getting started

> info ""
> If you'd like to migrate to Analytics-CSharp from a different library, follow the steps in the [Analytics-CSharp migration guide](/docs/connections/sources/catalog/libraries/server/csharp/migration-guide/). 

To get started with the Analytics-CSharp library: 

1. Create a Source in Segment. 
   1. Go to **Connections > Sources > Add Source**.
   2. Search for *Xamarin, Unity, or .NET* (whichever source you want to use) and click **Add Source**.  **Note:** There is no CSharp source. To use Analytics-CSharp, use either Xamarin, Unity, or .NET as your source. 
2. Add the Analytics dependency to your project. Analytics-CSharp is distributed through NuGet. Check other installation options [here](https://www.nuget.org/packages/Segment.Analytics.CSharp/).

    ```
    dotnet add package Segment.Analytics.CSharp --version <LATEST_VERSION>
    ```
    For Unity, Analytics-CSharp is distributed through OpenUPM. Read more about [OpenUPM](https://openupm.com/packages/com.segment.analytics.csharp/?subPage=readme){:target="_blank"}.
    ```
   openupm add com.segment.analytics.csharp
   ``` 

3. Initialize and configure the client.

    ```c#
    // NOTE: to make Analytics stateless/in-memory,
    // add `InMemoryStorageProvider` to the configuration
    var configuration = new Configuration("<YOUR WRITE KEY>",
        flushAt: 20,
        flushInterval: 30);
    var analytics = new Analytics(configuration);
    ```

| Option Name                 | Description                                                                                                                                                                                                                                                                                                                                   |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 | `writeKey` *required*       | This is your Segment write key.                                                                                                                                                                                                                                                                                                               |
| `flushAt`                   | The default is set to `20`. <br> The count of events at which Segment flushes events.                                                                                                                                                                                                                                                                |
| `flushInterval`             | The default is set to `30` (seconds). <br> The interval in seconds at which Segment flushes events.                                                                                                                                                                                                                                                  |
| `defaultSettings`           | Default set to `{}`. <br> The settings object used as fallback in case of network failure.                                                                                                                                                                                                                                                    |
| `autoAddSegmentDestination` | Default set to `true`. <br> This automatically adds the Segment Destination plugin. You can set this to `false` if you want to manually add the Segment Destination plugin.                                                                                                                                                                   |
 | `apiHost`                   | Default set to `api.segment.io/v1`. <br> This sets a default API Host to which Segment sends events.                                                                                                                                                                                                                                          |
| `cdnHost`                   | Default set to `cdn-settings.segment.com/v1`. <br> This set a default cdnHost to which Segment fetches settings.                                                                                                                                                                                                                              |
| `analyticsErrorHandler`     | Default set to `null`. <br>This set an error handler to handle errors happened in analytics                                                                                                                                                                                                                                                   |
 | `storageProvider`           | Default set to `DefaultStorageProvider`. <br>This set how you want your data to be stored. <br> `DefaultStorageProvider` is used by default which stores data to local storage. `InMemoryStorageProvider` is also provided in the library. <br>You can also write your own storage solution by implementing `IStorageProvider` and `IStorage` |
| `httpClientProvider`        | Default set to `DefaultHTTPClientProvider`. <br>This set a http client provider for analytics use to do network activities. The default provider uses System.Net.Http for network activities.                                                                                                                                                 |
| `flushPolicies`             | Default set to `null`. <br>This set custom flush policies to tell analytics when and how to flush. By default, it converts `flushAt` and `flushInterval` to `CountFlushPolicy` and `FrequencyFlushPolicy`. If a value is given, it overwrites `flushAt` and `flushInterval`.                                                                  |

## Tracking Methods

Once you've installed the Analytics-CSharp library, you can start collecting data through Segment's tracking methods:
- [Identify](#identify)
- [Track](#track)
- [Screen](#screen)
- [Page](#page)
- [Group](#group)

> info ""
> For any of the different methods described, you can replace the properties and traits in the code samples with variables that represent the data collected.

### Identify
The [Identify](/docs/connections/spec/identify/) method lets you tie a user to their actions and record traits about them. This includes a unique user ID and any optional traits you know about them like their email, name, address. The traits option can include any information you want to tie to the user. When using any of the reserved traits, be sure the information reflects the name of the trait. For example, `email`  should always be a string of the user's email address.

```c#
analytics.Identify("user-123", new JsonObject {
    ["username"] = "MisterWhiskers",
    ["email"] = "hello@test.com",
    ["plan"] = "premium"
});
```

### Track
The [Track](/docs/connections/spec/track/) method lets you record the actions your users perform. Every action triggers an event, which also has associated properties that the track method records.

```c#
analytics.Track("View Product", new JsonObject {
    ["productId"] = 123,
    ["productName"] = "Striped trousers"
});
```

### Screen
The [Screen](/docs/connections/spec/screen/) method lets you record whenever a user sees a screen in your mobile app, along with optional extra information about the page being viewed.

You'll want to record a screen event whenever the user opens a screen in your app. This could be a view, fragment, dialog or activity depending on your app.

Not all integrations support screen. When it's not supported explicitly, the screen method tracks as an event with the same parameters.

```c#
analytics.Screen("ScreenName", new JsonObject {
    ["productSlug"] = "example-product-123"
});
```

### Page
The [Page](/docs/connections/spec/page/) method lets you record whenever a user sees a page in your web app, along with optional extra information about the page.

You'll want to record a page event whenever the user opens a page in your app. This could be a webpage, view, fragment, dialog or activity depending on your app.

Not all integrations support page. When it's not supported explicitly, the page method tracks as an event with the same parameters.

```c#
analytics.Page("PageName", new JsonObject {
    ["productSlug"] = "example-product-123"
});
```

### Group
The [Group](/docs/connections/spec/group/) method lets you associate an individual user with a group — whether it's a company, organization, account, project, or team. This includes a unique group identifier and any additional group traits you may have, like company name, industry, number of employees. You can include any information you want to associate with the group in the traits option. When using any of the reserved group traits, be sure the information reflects the name of the trait. For example, email should always be a string of the user's email address.

```c#
analytics.Group("user-123", new JsonObject {
    ["username"] = "MisterWhiskers",
    ["email"] = "hello@test.com",
    ["plan"] = "premium"
});
```
## Plugin Architecture
Segment's plugin architecture enables you to modify and augment how the analytics client works. From modifying event payloads to changing analytics functionality, plugins help to speed up the process of getting things done.

Plugins are run through a timeline, which executes in order of insertion based on their entry types. Segment has these 5 entry types:

| Type          | Details                                                                                        |
|---------------| ---------------------------------------------------------------------------------------------- |
| `Before`      | Executes before event processing begins.                                                       |
| `Enrichment`  | Executes as the first level of event processing.                                               |
| `Destination` | Executes as events begin to pass off to destinations.                                          |
| `After`       | Executes after all event processing completes. You can use this to perform cleanup operations. |
| `Utility`     | Executes only with manual calls such as Logging.                                               |

### Fundamentals
There are 3 basic types of plugins that you can use as a foundation for modifying functionality. They are: [`Plugin`](#plugin), [`EventPlugin`](#eventplugin), and [`DestinationPlugin`](#destinationplugin).

#### Plugin
`Plugin` acts on any event payload going through the timeline.

For example, if you want to add something to the context object of any event payload as an enrichment:

```c#
class SomePlugin : Plugin
{
    public override PluginType Type => PluginType.Enrichment;
    public override RawEvent Execute(RawEvent incomingEvent)
    {
        incomingEvent.Context["foo"] = "bar";
        return incomingEvent;
    }
}
```

#### EventPlugin
`EventPlugin` is a plugin interface that acts on specific event types. You can choose the event types by only overriding the event functions you want.

For example, if you only want to act on `track` & `identify` events:

```c#
class SomePlugin : EventPlugin
{
    public override PluginType Type => PluginType.Enrichment;
    public override IdentifyEvent Identify(IdentifyEvent identifyEvent)
    {
        // code to modify identify event
        return identifyEvent;
    }
    public override TrackEvent Track(TrackEvent trackEvent)
    {
        // code to modify track event
        return trackEvent;
    }
}
```

#### DestinationPlugin
The `DestinationPlugin` interface is commonly used for device-mode destinations. This plugin contains an internal timeline that follows the same process as the analytics timeline, enabling you to modify and augment how events reach a particular destination.

For example, if you want to implement a device-mode destination plugin for Amplitude, you can use this:

```c#
class AmplitudePlugin : DestinationPlugin
{
    public override string Key =>
        "Amplitude"; // This is the name of the destination plugin, it is used to retrieve settings internally
    private Amplitude amplitudeSDK: // This is an instance of the partner SDK
    public AmplitudePlugin()
    {
        amplitudeSDK = Amplitude.instance;
        amplitudeSDK.initialize(applicationContext, "API_KEY");
    }
    /*
    * Implementing this function allows this plugin to hook into any track events
    * coming into the analytics timeline
    */
    public override TrackEvent Track(TrackEvent trackEvent)
    {
        amplitudeSDK.logEvent(trackEvent.Event);
        return trackEvent;
    }
}
```

### Advanced concepts

- `configure(Analytics)`: Use this function to set up your plugin. This implicitly calls once the plugin registers.
- `update(Settings)`: Use this function to react to any settings updates. This implicitly calls when settings update. You can force a settings update by calling `analytics.checkSettings()`.
- `DestinationPlugin` timeline: The destination plugin contains an internal timeline that follows the same process as the analytics timeline, enabling you to modify/augment how events reach the particular destination. For example, if you only wanted to add a context key when sending an event to `Amplitude`:

```c#
class AmplitudeEnrichment : Plugin
{
    public override PluginType Type => PluginType.Enrichment;
    public override RawEvent Execute(RawEvent incomingEvent)
    {
        incomingEvent.Context["foo"] = "bar";
        return incomingEvent;
    }
}
var amplitudePlugin = new AmplitudePlugin(); // add amplitudePlugin to the analytics client
analytics.Add(amplitudePlugin);
amplitudePlugin.Add(new AmplitudeEnrichment()); // add enrichment plugin to amplitude timeline
```

## Adding a plugin
Adding plugins enable you to modify your analytics implementation to best fit your needs. You can add a plugin using this:

```c#
var yourPlugin = new SomePlugin()
analytics.Add(yourPlugin)
```

Though you can add plugins anywhere in your code, it's best to implement your plugin when you configure the client.

Here's an example of adding a plugin to the context object of any event payload as an enrichment:

```c#
class SomePlugin : Plugin
{
    public override PluginType Type => PluginType.Enrichment;
    public override RawEvent Execute(RawEvent incomingEvent)
    {
        incomingEvent.Context["foo"] = "bar";
        return incomingEvent;
    }
}
var yourPlugin = new SomePlugin()
analytics.Add(yourPlugin)
```

### Example projects using Analytics-CSharp
See how other platforms and languages use Analytics-CSharp in different [example projects](https://github.com/segmentio/Analytics-CSharp/tree/main/Samples){:target="_blank"}.

## Utility Methods
The Analytics-CSharp utility methods help you work with plugins from the analytics timeline. They include:
- [Add](#add)
- [Find](#find)
- [Remove](#remove)
- [Reset](#reset)

There's also the [Flush](#flush) method to help you manage the current queue of events.

### Add
The Add method lets you add a plugin to the analytics timeline.

```c#
class SomePlugin : Plugin
{
    public override PluginType Type => PluginType.Enrichment;
    public override RawEvent Execute(RawEvent incomingEvent)
    {
        incomingEvent.Context["foo"] = "bar";
        return incomingEvent;
    }
}
var somePlugin = new SomePlugin();
analytics.Add(somePlugin);
```

### Find
The Find method lets you find a registered plugin from the analytics timeline.

```c#
var plugin = analytics.Find<SomePlugin>();
```

### Remove
The Remove methods lets you remove a registered plugin from the analytics timeline.

```c#
analytics.remove(somePlugin);
```

### Flush
The Flush method lets you force flush the current queue of events regardless of what the `flushAt` and `flushInterval` is set to.

```c#
analytics.Flush();
```

### Reset
The `reset` method clears the SDK’s internal stores for the current user and group. This is useful for apps where users log in and out with different identities on the same device over time.

```c#
analytics.Reset()
```


## Controlling Upload With Flush Policies
To more granularly control when events are uploaded you can use `FlushPolicies`. **This will override any setting on `flushAt` and `flushInterval`, but you can use `CountFlushPolicy` and `FrequencyFlushPolicy` to have the same behaviour respectively.**

A Flush Policy defines the strategy for deciding when to flush, this can be on an interval, on a certain time of day, after receiving a certain number of events or even after receiving a particular event. This gives you even more flexibility on when to send event to Segment.

To make use of flush policies you can set them in the configuration of the client:
```csharp
    var configuration = new Configuration("<YOUR WRITE KEY>",
            flushPolicies: new List<IFlushPolicy>
            {
                new CountFlushPolicy(),
                new FrequencyFlushPolicy(),
                new StartupFlushPolicy()
            });
    var analytics = new Analytics(configuration);
```

That means only the first policy to reach `ShouldFlush` gets to trigger a flush at a time. In the example above either the event count gets to 5 or the timer reaches 500ms, whatever comes first will trigger a flush.

We have several standard FlushPolicies:
- `CountFlushPolicy` triggers whenever a certain number of events is reached
- `FrequencyFlushPolicy` triggers on an interval of milliseconds
- `StartupFlushPolicy` triggers on client startup only

### Adding or removing policies

One of the main advantages of FlushPolicies is that you can add and remove policies on the fly. This is very powerful when you want to reduce or increase the amount of flushes.

For example you might want to disable flushes if you detect the user has no network:
```csharp
    // listen to network changes
    if (noNetwork) {
        // remove all flush policies to avoid flushing
        analytics.ClearFlushPolicies();

        // or disable analytics completely (including store events)
        analytics.Enable = false
    }
    else {
        analytics.AddFlushPolicy(new CountFlushPolicy(), new FrequencyFlushPolicy());
    }
```

###  Creating your own flush policies

You can create a custom FlushPolicy special for your application needs by implementing the  `IFlushPolicy` interface. You can also extend the `FlushPolicyBase` class that already creates and handles the `shouldFlush` value reset.

A `FlushPolicy` only needs to implement 2 methods:
- `Schedule`: Executed when the flush policy is enabled and added to the client. This is a good place to start background operations, make async calls, configure things before execution
- `UpdateState`: Gets called on every event tracked by your client
- `Unschedule`: Called when policy should stop running any scheduled flushes
- `Reset`: Called after a flush is triggered (either by your policy, by another policy or manually)

Your `FlushPolicy` should also have a `ShouldFlush` observable boolean value. When this is set to true the client attempts to upload events. Each policy should reset this value to `false` according to its own logic.

```csharp
class FlushOnScreenEventsPolicy : IFlushPolicy
{
    private bool _screenEventsSeen = false;

    public bool ShouldFlush() => _screenEventsSeen;

    public void UpdateState(RawEvent @event)
    {
        // Only flush when at least a screen even happens
        if (@event is ScreenEvent)
        {
            _screenEventsSeen = true;
        }
    }

    public void Reset()
    {
        _screenEventsSeen = false;
    }

    public void Schedule(Analytics analytics) {}

    public void Unschedule() {}
}
```

## Handling Errors
You can handle analytics client errors through the `analyticsErrorHandler` option.

The error handler configuration requires an instance that implements `IAnalyticsErrorHandler` which will get called whenever an error happens on the analytics client. It will receive a general `Exception`, but you can check if the exception is a type of `AnalyticsError` and converts to get more info about the error. Checkout [here](https://github.com/segmentio/Analytics-CSharp/blob/main/Analytics-CSharp/Segment/Analytics/Errors.cs#L77) to see a full list of error types that analytics throws.

You can use this error handling to trigger different behaviours in the client when a problem occurs. For example if the client gets rate limited you could use the error handler to swap flush policies to be less aggressive:

```csharp
class NetworkErrorHandler : IAnalyticsErrorHandler
{
    private Analytics _analytics;

    public NetworkErrorHandler(Analytics analytics)
    {
        _analytics = analytics;
    }

    public void OnExceptionThrown(Exception e)
    {
        if (e is AnalyticsError error && error.ErrorType == AnalyticsErrorType.NetworkServerLimited)
        {
            _analytics.ClearFlushPolicies();
            // Add less persistent flush policies
            _analytics.AddFlushPolicy(new CountFlushPolicy(1000), new FrequencyFlushPolicy(60 * 60 * 1000));
        }
    }
}
```

### Reporting errors from plugins

Plugins can also report errors to the handler by using the [`.ReportInternalError`](https://github.com/segmentio/Analytics-CSharp/blob/main/Analytics-CSharp/Segment/Analytics/Errors.cs#L54) function of the analytics client, we recommend using the `AnalyticsErrorType.PluginError` for consistency, and attaching the `exception` with the actual exception that was hit:

```csharp
    try
    {
        // do something;
    }
    catch (Exception e)
    {
        this.Analytics.ReportInternalError(AnalyticsErrorType.PluginError, e, "Error from plugin");
        Analytics.Logger.Log(LogLevel.Error, e);
    }
```

### Listen to Analytics Logs

Besides error handling, you could also provide a static `ISegmentLogger` to help log and debug as well as error handling. The same log that is reported by `ReportInternalError` is also reported to this static logger. The static logger also receives more errors and exceptions because it does not require an `Analytics` instance available. Thus, it's also a good idea to use the logger as an addition to `IAnalyticsErrorHandler`.
```csharp
Analytics.Logger = new SegmentLogger();

class SegmentLogger : ISegmentLogger
{
    public void Log(LogLevel logLevel, Exception exception = null, string message = null)
    {
        switch (logLevel)
        {
            case LogLevel.Warning:
            case LogLevel.Information:
            case LogLevel.Debug:
                Console.Out.WriteLine("Message: " + message);
                break;
            case LogLevel.Critical:
            case LogLevel.Trace:
            case LogLevel.Error:
                Console.Error.WriteLine("Exception: " + exception?.StackTrace);
                Console.Error.WriteLine("Message: " + message);
                break;
            case LogLevel.None:
            default:
                break;
        }
    }
}
```

## Customize HTTP Client

The SDK allows you to have full control over the network components. You can easily swap out System.Net with your favorite network library by implementing `IHTTPClientProvider` and extending `HTTPClient`. Take a look at [this example](https://github.com/segmentio/Analytics-CSharp/blob/main/Samples/UnitySample/UnityHTTPClient.cs) where the default http client is fully replaced by Unity's `UnityWebRequest`.

### Proxying HTTP Calls

You can also redirect the HTTP calls to your own proxy server by implementing `IHTTPClientProvider` and extending `DefaultHTTPClient`:
```csharp
class ProxyHttpClient : DefaultHTTPClient
{
    public ProxyHttpClient(string apiKey, string apiHost = null, string cdnHost = null) : base(apiKey, apiHost, cdnHost)
    {
    }

    public override string SegmentURL(string host, string path)
    {
        if (host.Equals(_apiHost))
        {
            return "Your proxy api url";
        }
        else
        {
            return "Your proxy cdn url";
        }
    }
}

class ProxyHttpClientProvider : IHTTPClientProvider
{
    public HTTPClient CreateHTTPClient(string apiKey, string apiHost = null, string cdnHost = null)
    {
        return new ProxyHttpClient(apiKey, apiHost, cdnHost);
    }
}
```

## Customize Storage

The SDK also allows you to fully customize your storage strategy. It comes with two standard providers: `DefaultStorageProvider` that stores data to local disk and `InMemoryStorageProvider` that stores data all in memory. You can write up your own provider according to your needs, for example, store data to a database or to your own server directly, by implementing `IStorage` and `IStorageProvider`. Please refer to the implementation of [`Storage`](https://github.com/segmentio/Analytics-CSharp/blob/main/Analytics-CSharp/Segment/Analytics/Utilities/Storage.cs) as example.

## Json Library

The SDK supports `.netstandard 1.3` and `.netstandard 2.0` and auto assembles the internal Json library according to the target framework:
* on `.netstandard 1.3`, the SDK uses Newtonsoft Json.NET
* on `.netstandard 2.0`, the SDK uses System.Text.Json


### Arrays
To send an array as an event property, reference the [GitHub repo](https://github.com/segmentio/Serialization.NET/blob/main/Tests/JsonUtilityTest.cs#L24){:target="_blank"}. Below is an example of code you can implement to send an array of strings:

```c#
List<string> listOfStrings = new List<string> { "test1", "test2", "test3" };

JsonObject customerJsonObj = new JsonObject
{
    ["event_name"] = new JsonArray(listOfStrings.ConvertAll(o => (JsonElement)o))
}; 
```


## Samples

For sample usages of the SDK in specific platforms, checkout the following:

| Platform    | Sample                                                                                                                                 |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Asp.Net     | [Set up with dependency injection](https://github.com/segmentio/Analytics-CSharp/tree/main/Samples/AspNetSample){:target="_blank"}                        |
| Asp.Net MVC | [Set up with dependency injection](https://github.com/segmentio/Analytics-CSharp/blob/main/Samples/AspNetMvcSample){:target="_blank"}                     |
| Console     | [Basic setup](https://github.com/segmentio/Analytics-CSharp/tree/main/Samples/ConsoleSample/Program.cs){:target="_blank"}                               |
| Unity       | [Singleton Analytics](https://github.com/segmentio/Analytics-CSharp/blob/main/Samples/UnitySample/SingletonAnalytics.cs){:target="_blank"}               |
|             | [Lifecycle plugin](https://github.com/segmentio/Analytics-CSharp/blob/main/Samples/UnitySample/LifecyclePlugin.cs){:target="_blank"}                     |
|             | [Custom HTTPClient](https://github.com/segmentio/Analytics-CSharp/blob/main/Samples/UnitySample/UnityHTTPClient.cs){:target="_blank"}                    |
| Xamarin     | [Basic setup](https://github.com/segmentio/Analytics-CSharp/tree/main/Samples/XamarinSample){:target="_blank"}                                          |
| General     | [Custom HTTP client](https://github.com/segmentio/Analytics-CSharp/tree/main/Samples/ConsoleSample/ProxyHttpClient.cs){:target="_blank"}                 |
|             | [Custom Storage](https://github.com/segmentio/Analytics-CSharp/blob/main/Analytics-CSharp/Segment/Analytics/Utilities/Storage.cs#L200{:target="_blank"}) |
|             | [Flush Policy](https://github.com/segmentio/Analytics-CSharp/tree/main/Samples/ConsoleSample/FlushOnScreenEventsPolicy.cs){:target="_blank"}             |
|             | [Custom Logger](https://github.com/segmentio/Analytics-CSharp/tree/main/Samples/ConsoleSample/SegmentLogger.cs){:target="_blank"}                        |
|             | [Custom Error Handler](https://github.com/segmentio/Analytics-CSharp/tree/main/Samples/ConsoleSample/NetworkErrorHandler.cs){:target="_blank"}           |



## Compatibility
This library targets `.NET Standard 1.3` and `.NET Standard 2.0`. See the [list of compatible platforms](https://www.nuget.org/packages/Segment.Analytics.CSharp/#supportedframeworks-body-tab){:target="_blank"}.

## Changelog
[View the Analytics-CSharp changelog on GitHub](https://github.com/segmentio/analytics-csharp/releases){:target="_blank"}.


