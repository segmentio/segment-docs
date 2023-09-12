---
title: Analytics-CSharp (C#) Migration Guide
strat: csharp
---

If you’re using a different library, follow the steps below to migrate to the [Analytics-CSharp library](/docs/connections/sources/catalog/libraries/server/csharp/).  


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

## Optional Changes

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

2. Review your anonymous ID settings. 

    <br> Before:
    ```c#                  
    Analytics.Initialize("YOUR_WRITE_KEY", new Config().SetAsync(false));
    ```

    The new SDK by default, generates an Anonymous ID for you if you never call `analytics.Identify`. If you've called `Identify` and want to go back to anonymous, try:

    <br> After:
    ```c#                  
    analytics.Reset();
    ```

3. Change your nested properties settings. 

    <br> Before:
    ```c#                  
    Analytics.Client.Identify("hj2kf92ds212", new Traits() {
        { "email", "tom@example.com" },
        { "name", "Tom Smykowski" },
        { "address", new Dict() {
            { "street", "123 Fake Street" },
            { "city", "Boston" }
        }}
     });
    ```
    
    <br> After:
    ```c#                  
    // compatbile with the old way
    analytics.Identify("hj2kf92ds212", new JsonObject()
    {
        { "email", "tom@example.com" },
        { "name", "Tom Smykowski" },
        { "address", new JsonObject() {
            { "street", "123 Fake Street" },
            { "city", "Boston" }
        }}
    });
    ```
    
    The new SDK internally implements a flexible JSON builder (Serialization.NET), that allows you build a complex JSON payload:
        
    ```c#
    var jsonObject = new JsonObject
    {
        ["int"] = 1,
        ["float"] = 1f,
        ["long"] = 1L,
        ["double"] = 1.0,
        ["string"] = "1",
        ["bool"] = true,
        ["object"] = new JsonObject
        {
            ["another object"] = "obj"
        },
        ["array"] = new JsonArray
        {
            1, 1f, 1L, 1.0, "1", true, new JsonObject
            {
                ["object in array"] = "obj"
            }
        }
    };
    ```

4. Review your Flush settings.
     
     <br> Before:
    ```c#                  
     Analytics.Client.Flush();
    ```
    
    <br> After:
    ```c#                  
    analytics.Flush();
    ```

