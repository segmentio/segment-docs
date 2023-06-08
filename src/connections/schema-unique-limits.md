---
title: Segment Schema Limits
---

**How many unique events can be logged in my Segment Schema table?**

While you can technically track unlimited events with Segment, only the first 4,000 events will be visible on the Schema page for a given Source. After you hit the 4,000 event limit, all future events will still be tracked and sent to your Destinations. They will not, however, be logged in the Segment Schema table.

**How many unique event properties and traits can be logged on the event details page?**

While you can track unlimited event properties and traits with Segment, the Schema page has the following default limits:

* Properties: The event details page for a specific event can only show the first 300 properties by default. 

* Traits: The Identify page can only show the first 300 traits by default.

After you hit the limit for both properties or traits, future properties and traits are still tracked and sent to your Destinations, but they won’t appear on the event details page. This limit includes nested properties in an event’s properties object.

These limits can also affect the traits and properties that you can see in the Computed Trait and Audience builder tools in Engage. If expected traits or properties do not appear in these tools, contact the [Segment Support team](https://segment.com/help/contact/){:target="blank"}.

**How can I clear the Schema if I have hit the limits?**

If you hit any of the limits or would like to clear out old events or properties, you can clear the Schema data from your Source Settings. In your Source, navigate to Settings, then Schema Configuration. Scroll down to the **Clear Schema History** setting.

![Clear your Schema data with Clear Schema History](images/schema_config_clear_schema.png)


**How can I clear/archive properties in my source schema?**

At this time, you cannot clear or archive old event properties individually. An alternative for this is to archive the event itself, and then clear the archive. After you clear the archive, the event will re-populate in the schema with only the current properties.

