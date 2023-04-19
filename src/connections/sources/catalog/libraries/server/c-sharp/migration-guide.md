---
title: Analytics for CSharp (C#)
strat: csharp
---

If you’re using a different library such as Analytics .Net, follow these steps to migrate to the Analytics-CSharp library: 

1. Create a source in Segment. If you want to reuse your current source, skip to step 2. 
    1. Go to Connections > Sources > Add Source.
    2. Search for Xamarin or Unity or .NET and click Add source.
2. Add the Analytics CSharp dependency to your project. 

    <br> Before:
    ```js
    dotnet add package Analytics --version <VERSION>
    ```

    <br>After
    ```js
    dotnet add package Segment.Analytics.CSharp --version <VERSION>
    ```

3. Modify your tracking methods. 
    - Identify

      <br> Before example
      ```c#    
        Analytics.Client.Identify("019mr8mf4r", new Traits() {
            { "name", "#{ user.name }" },
            { "email", "#{ user.email }" },
            { "friends", 29 }
        });
      ```

      <br> After example
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
        <br> Before example
        ```c#    
            Analytics.Client.Track("019mr8mf4r", "Item Purchased", new Properties() {
                { "revenue", 39.95 },
                { "shipping", "2-day" }
            });
        ```

        <br> After example
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
        **Note:** 
        
