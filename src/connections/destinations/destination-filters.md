---
title: Destination Filters
rewrite: true
---

Destination Filters allow you to control the data flowing into each specific destination by conditionally preventing data from being sent to cloud-mode  destinations. You can filter out entire events, or just specific fields in the properties, traits, or in the context of your events.

With Destination Filters, you can:

- Control your event volume by sampling or dropping unnecessary events for
 specific destinations.
- Manage PII (personally identifiable information) by blocking fields from
 reaching certain destinations.
- Increase the relevance of the data in your destinations by removing unused or unwanted data.
- Prevent test or internally-generated events from reaching your production tools.

> note ""
> **Note**: Destination Filters are currently available to Business Tier customers only.

### Destination Filtering Limitations

- Destination Filters can only be applied to Cloud-mode ("server-side") streaming destinations. Device-mode destinations aren't supported.
- You can't apply Destination Filters to Warehouses or S3 destinations.
- Each filter can only apply to one source-destination pair.

If you have a compelling use case for these unsupported options, [contact Segment](https://segment.com/help/contact/).

## Create a Destination Filter
To create a Destination Filter:
1. Go to **Connections > Destinations** and select your destination.
2. Click on the **Filters** tab of your destination.
3. Click **+ New Filter**.
4. Configure the rules for your filter.
5. *(Optional)* Click **Load Sample Event** to test your filter to see if the event passes through your filter.
6. Click **Next Step**.
7. Name your filter and click the toggle to enable it.
6. Click **Save**.

## Destination Filters API

The Destination Filters API provides more power than the Destination
Filters settings in the Segment dashboard. You can create complex filters
that are conditionally applied using Segment's "Filter Query Language" (FQL).

The Destination Filters API offers these 4 different types of filters:

Filter | Details
------ | -------
`drop_event` | Don't send matched events to the destination.
`sample_event` | Send only a percentage of events through to the destination.
`whitelist_fields` | Only send whitelisted properties to the destination.
`blocklist_fields` | Don't send blocklisted properties to the destination.

Read more in the [Destination Filters API docs](https://reference.segmentapis.com/#6c12fbe8-9f84-4a6c-848e-76a2325cb3c5).

## Examples

### PII Management

Example: Remove email addresses from `context` and `properties`:

Property-level whitelisting is available using Segment's API. Use this to perform actions like only send certain traits you know have no PII to a destination, and block
all other traits in the context or property fields.

![](images/destination-filters/pii_example.png)

### Control Event Volume

Example: Only send user signed up and demo requested events:

![](images/destination-filters/drop_example.png)

### Cleaner Data

Example: Only send events - only send track calls to Google Analytics:

![](images/destination-filters/clean_example.png)

### Remove Internal and Test Events From Production Tools

Example: Don't send events when the email contains `@segment.com`:

![](images/destination-filters/internal_example.png)

Example: Don't send events when the `Order Completed` and `properties.email` contain `@segment.com`.

![](images/destination-filters/internal_example2.png)

### Sample a Percentage of Events

Example: Randomly sample video heartbeat events:

Note: Random sampling can currently only be created using Segment's API: [Full API
docs here](https://reference.segmentapis.com/#6c12fbe8-9f84-4a6c-848e-76a2325cb3c5)

### Drop Events

[This video](https://www.youtube.com/watch?v=47dhAF1Hoco) shows an example of
filtering events sent to a destination based on the name of the event.

## Important Notes

**Conflicting settings**

Some destinations offer settings that also allow you to filter data. For example, the Facebook App Events destination allows you to map `Screen` events to `Track` events. Because Destination Filters are evaluated and applied _before_ the Destination settings are applied, they can conflict with your settings.

In the example in the video above, if you have a Destination Filter that only allows Track events _and_ you have the **Use Screen Events as Track Events** setting enabled, `Track` events are drop, but `Screen` events still process, and the destination settings transform it into a `Track` event - *after* the filters.

**Error handling**

Segment makes effort to ensure that Destination Filters handle unexpected
situations. For example, if you use the `contains()` FQL function on
a field and that field is `null`, Segment returns `false` instead of returning an error. If Segment can't reasonably infer your intent, Segment logs an internal error, and drops the event. Segment defaults to this behavior to prevent sensitive information, for example from a PII filter, from getting through.

Errors aren't exposed in the Event Deliverability tab of your Destination. For help diagnosing unexpectedly missing events when using Destination Filters, [contact Segment](https://segment.com/help/contact/).

## FAQ

**Q: How does destination filters work with array properties?**

Destination Filters can filter properties out of objects nested in an array. For
example, you can filter out the `price` property of every object in an array at `properties.products`. You can also filter out an entire array from the payload. However, you can't drop nested objects in an array, or filter properties out of a single object in an array.

In order to block a specific property from all of the objects within a properties array, set the filter following the format: `<propertyType>.<arrayName>.<arrayElementLabel>​`.

For example, the `properties.products.newElement` filter blocks all `newElement` property fields from each `products` object of an array within the `properties` object of a Track event.

![](images/destination-filters/filter-array-properties.png)

If you want to block the Identify event trait `products.newElement`, select the option under the **User Traits** list instead. If you want to block a context object field `products.newElement`, select it from the **Context Fields** list.

**Q: How many filters can I create?**

You are limited to 10 filters per destination. If you need help
consolidating filters or would like to discuss your use case, [contact Segment](https://segment.com/help/contact/)!

**Q: When will you support warehouses?**

If you want to filter out events from warehouses, the best way to do that is with the existing Selective Sync feature.

**Q: I don't see a "name" property at the top level of my events to filter on "event name".**

Generally, only Track calls have "name" properties, which corresponds to the
"Event" field in an event.

**Q: How can I find out when new filters have been added or removed from a destination?**

The Activity Feed shows the action, date, and user who performed the action when a Destination Filter is created, modified, enabled, disabled, or deleted. You can also subscribe to notifications for any of these changes in the **Activity Feed** settings page.

**Q: Why am I getting a permissions denied error when trying to save a filter?**

Anyone with `read` access on the source can view and test filters, but only users with `write` access can edit filters.

**Q: How can I test that my filter is working?**

Use the Destination Filter tester (in the destination filter set up screens) to test if you are filtering out the right events. Filtered events still show up in the schema page, but aren't counted in the Event Deliverability graphs.
