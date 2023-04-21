---
title: Analytics for CSharp (C#) Migration Guide
strat: csharp
---

If you’re using a different library such as Analytics .Net, follow the steps below to migrate to the Analytics-CSharp library.  

1. Create a source in Segment. If you want to reuse your current source, skip to step 2. 
    1. Go to Connections > Sources > Add Source.
    2. Search for Xamarin or Unity or .NET and click Add source.
2. Add the Analytics CSharp dependency to your project. 

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

3. Modify your tracking methods. 
    - Identify

      <br> Before:
      ```c#    
        Analytics.Client.Identify("019mr8mf4r", new Traits() {
            { "name", "#{ user.name }" },
            { "email", "#{ user.email }" },
            { "friends", 29 }
        });
      ```

      <br> After:
      ```c#    
        // compatbile with the old way
        analytics.Identify("019mr8mf4r", new JsonObject()
        {
            { "name", "#{ user.name }" },
            { "email", "#{ user.email }" },
            { "friends", 29 }
        });

        // below is the new way
        analytics.Identify("019mr8mf4r", new JsonObject
        {
            ["name"] = "#{user.name}",
            ["email"] = "#{user.email}",
            ["friends"] = 29
        });
      ```

    - Track
        <br> Before:
        ```c#    
            Analytics.Client.Track("019mr8mf4r", "Item Purchased", new Properties() {
                { "revenue", 39.95 },
                { "shipping", "2-day" }
            });
        ```

        <br> After:
        ```c#
        // compatbile with the old way
        analytics.Track("Item Purchased", new JsonObject()
        {
            { "revenue", 39.95 },
            { "shipping", "2-day" }
        });

        // below is the new way
        analytics.Track("Item Purchased", new JsonObject
        {
            ["revenue"] = 39.95,
            ["shipping"] = "2-days"
        });
        ```
        **Note:** The Analytics-CSharp SDK remembers the identity info from the last identify call, so you don’t have to pass an identity every time. If you still want to identify on every track call, you can achieve it with Segment's plugin system.

    - Page 
        <br> Before:
        ```c#               
        Analytics.Client.Page("019mr8mf4r", "Login", new Properties() {
            { "path", "/login" },
            { "title", "Initech Login" }
        });
        ```

        <br> After:
        ```c#
        // compatbile with the old way
        analytics.Page("Login", new JsonObject()
        {
            { "path", "/login" },
            { "title", "Initech Login" }
        });

        // below is the new way
        analytics.Page("Login", new JsonObject
        {
            ["path"] = "/login",
            ["title"] = "Initech Login"
        });
        ```

    - Screen
        <br> Before:
        ```c#               
        Analytics.Client.Screen("019mr8mf4r", "Register", new Properties() {
            { "type", "facebook" }
        });
        ```

        <br> After:
        ```c#               
        // compatbile with the old way
        analytics.Screen("Register", new JsonObject()
        {
            { "type", "facebook" }
        });

        // below is the new way
        analytics.Screen("Register", new JsonObject
        {
            ["type"] = "facebook"
        });
        ```

    - Group
        <br> Before:
        ```c#               
        Analytics.Client.Group("userId", "groupId", new Traits() {
            { "name", "Initech, Inc." },
            { "website", "http://www.example.com" }
        });
        ```

        <br> After:
        ```c#               
        // compatbile with the old way
        analytics.Group("groupId", new JsonObject()
        {
            { "name", "Initech, Inc." },
            { "website", "http://www.example.com" }
        });

        // below is the new way
        analytics.Group("groupId", new JsonObject
        {
            ["name"] = "Initech, Inc.",
            ["website"] = "http://www.example.com"
        });
        ```
    
    - Alias
        <br> Before:
        ```c#                  
        Analytics.Client.Alias("previousId", "userId")
        ```

        <br> After:
        ```c#                  
        analytics.Alias("newId");
        ```

4. Change your development settings if you would like to make analytics run synchronously for testing purposes. 

    <br> Before:
    ```c#                  
    Analytics.Initialize("YOUR_WRITE_KEY", new Config().SetAsync(false));
    ```

    <br> After:
    ```c#                  
    var configuration = new Configuration("YOUR WRITE KEY",
        userSynchronizeDispatcher: true);
    var analytics = new Analytics(configuration);
    ```

5. Review your anonymous ID settings. 

    <br> Before:
    ```c#                  
    Analytics.Initialize("YOUR_WRITE_KEY", new Config().SetAsync(false));
    ```

    The new SDK by default, generates an Anonymous ID for you if you never all `analytics.Identify`. If you've called `Identify` and want to go back to anonymous, try:

    <br> After:
    ```c#                  
    analytics.Reset();
    ```

6. Change your nested properties settings. 

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

    // below is the new way
    analytics.Identify("hj2kf92ds212", new JsonObject
    {
        ["email"] = "tom@example.com",
        ["name"] = "Tom Smykowski",
        ["address"] = new JsonObject {
            ["street"] = "123 Fake Street",
            ["city"] =  "Boston"
        }
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

7. Review your Flush settings.
     
     <br> Before:
    ```c#                  
     Analytics.Client.Flush();
    ```
    
    <br> After:
    ```c#                  
    analytics.Flush();
    ```

