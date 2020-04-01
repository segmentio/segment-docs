---
title: Best Practices for Event Calls
---

Sometimes customers reach out asking why they should make a Page call when they could instead just call Track or Identify.

In the end, it is up to our customers. Segment gives customers flexibility in following our spec or making only the calls that fit their needs. We should encourage our customers to follow the spec where possible.

* Each call represents a distinct type of semantic information about a customer and was created to ingest specific information.
* Our spec matches the tracking methodology of a lot of downstream tools and our integrations are built on them. Using the methods ensures maximum compatibility with these tools.
* In theory, customers could use only track events and infer things like page data from those as long as we include all necessary event properties. Using the semantic methods removes the need to include a ton of information and properties in a single call, especially when certain calls like page() automatically include some of this information.
* The different methods allow you to separate out “types” of information in your downstream tools and warehouses.
* Some destinations were built around a specific call type and Segment maps to those specific methods. This ensures the highest level of compatibility with the end tool.
* Some downstream tools do not accept page() and screen() calls. Even ones that do will expect certain data in a page() call and may not properly receive data that is typically reserved for track() calls.
* `track()` and `page()` / `screen()` are inherently treated very differently by our downstream tools, and how you can use that data is different.
* The properties for `page()` and `screen()` calls are intended to describe the page, not the user or their discrete actions.
* `page()` in particularly is important for UTM campaign capture.

In the end customers need to evaluate what is best for them and closely review the documentation of the destination to be familiar with what methods are supported and how they map to that destination.
