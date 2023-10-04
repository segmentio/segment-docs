---
title: Analytics-CSharp (C#) Migration Guide
strat: csharp
---

If you’re currently using Analytics.NET or Analytics.Xamarin to send data to Segment, please follow the steps below to migrate to the [Analytics-CSharp library](/docs/connections/sources/catalog/libraries/server/csharp/).  

You can update to Analytics-CSharp in 3 steps:
1. Bundle Analytics-CSharp into your app and remove your previous SDK.
2. Change the namespaces.
3. *(Optional)* Use `Reset` to stay anonymous.


## Start the Migration

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

3. *(Optional)* Update calls that resets the anonymous ID. 
   
The old SDK requires you to provide the anonymous ID. In the new SDK, it generates an Anonymous ID for you if you never call `analytics.Identify`. If you call `Identify` and want to go back to anonymous, the new SDK provides a `Reset` function to achieve that.

    <br> Before:
    ```c#                  
    Analytics.Client.Page(null, "Login", new Properties(), new Options()
    .SetAnonymousId("some-id"));
    ```

    <br> After:
    ```c#                  
    analytics.Reset();
    ```

## Optional Changes for Unit Tests

1. Change your development settings if you would like to make analytics run synchronously for testing purposes. 

    <br> Before:
    ```c#                  
    Analytics.Initialize("YOUR_WRITE_KEY", new Config().SetAsync(false));
    ```

    <br> After:
    ```c#                  
    var configuration = new Configuration("YOUR WRITE KEY",
        useSynchronizeDispatcher: true);
    var analytics = new Analytics(configuration);
    ```