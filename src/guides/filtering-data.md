---
title: Filtering your Segment Data
---

There are many ways you can use Segment to filter event and object based data to control which destinations it reaches. This document lists the most commonly used ways you can filter data in Segment, and explains when you'd use each.

![](/docs/images/segment-diagram.png)


## Filtering with the Integrations Object

The Integrations object is the only filtering method that cannot be edited using the Segment web app. As such, it is both the most reliable, and the most complicated filtering option to change. The integrations object is available to all customers regardless of Segment plan.

Use this option when you absolutely, for sure, 100% know that you *always*, or *never* want this data in a specific destination or set of destinations. You can also build logic in your app or site to conditionally enable or disable destinations by rewriting this object, however this is not recommended as it is time consuming to change, especially for mobile apps.

The Integrations object filters track, page, group, identify, and screen events from both client and cloud based sources, and routes or prevents them from getting to the listed destinations. Data from these calls still enters into and is stored in the Segment systems, and is passed downstream to your warehouse(s) if you have them.

You can use the `integrations` JSON object as part of your Segment payloads to control how Segment routes your data to specific destinations. An example payload is below:

```json
{
  "anonymousId": "507f191e810c19729de860ea",
  "context": {
    "locale": "en-US",
    "page": {
      "title": "Analytics Academy",
      "url": "https://segment.com/academy/"
    }
  },
  "integrations": {
    "All": true,
    "Mixpanel": false,
    "Salesforce": false
  }
}
```

By *default*, the `integrations` object is set to `'All': true`. You do not need to include this flag in the object to use this behavior, but if you'll be using the integrations object frequently to control destination filtering, you might want to do this to make it explicit for later readers. Change this to `'All': false` to prevent both Segment and any downstream destinations from receiving data. You can also add destinations to the object by key, and provide a `true` or `false` value to allow or disallow data to flow to them on an individual basis.

If you are using [multiple instances of a destination](/docs/connections/destinations/add-destination/#connecting-one-source-to-multiple-instances-of-a-destination), any settings you set in the integrations object are applied to all instances of the destination. You cannot specify an instance of a destination to apply Integrations object settings to. 

Note that destination flags are **case sensitive** and match the destination's name in the docs (for example, "AdLearn Open Platform", "awe.sm", "MailChimp", etc.).

Your data is sent to your warehouse (if you have one) and into the Segment backend systems regardless of what is in the integrations object.

## Destination filters

[Destination filters](https://segment.com/docs/connections/destinations/destination-filters/) allow you to control the data flowing into each specific destination, by examining event payloads, and conditionally preventing data from being sent to destinations. You can filter out entire events, or just specific fields in the properties, in the traits, or in the context of your events. Destination filters support cloud-based (server-side), actions-based, and mobile and web device-mode destinations.  Destination filters aren't available for, and don't prevent data from reaching your warehouse(s) or S3 destinations.

> info ""
> Destination filters are only available in workspaces that are on a Business Tier plan.
>
> Destination filters for mobile device-mode destinations are in beta and only supports [Swift](/docs/connections/sources/catalog/libraries/mobile/swift-ios#destination-filters), [Kotlin (Android)](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/#destination-filters), and [React Native 2.0](/docs/connections/sources/catalog/libraries/mobile/react-native/#destination-filters) libraries.

> warning ""
> Keep [these limitations](/docs/connections/destinations/destination-filters/#limitations) in mind when using destination filters.

![](images/destination-filter-create.png)

To set up destination filters from the Segment web app for the destination from which you want to exclude data:
1. *(For web device-mode destinations only)* Enable device mode destination filters for your Analytics.js source. To do this, go to your Javascript source and navigate to **Settings > Analytics.js** and turn the toggle on for **Destination Filters**.
    * **NOTE:** Destination filters for web device-mode only supports the Analytics.js 2.0 source. 
2. Navigate to **Connections > Destinations** and select the destination you want to set up filters for.
3. Go to the **Filters** tab and click **+ New Filter** to create a destination filter.
See the [Destination Filters documentation](/docs/connections/destinations/destination-filters/) for more details.

You can set up destination filters using the options presented in the Segment web app, or using Segment's Filter Query Logic (FQL). If you use FQL, your query syntax is limited to 5kb per query.

## Per-Source schema integrations filters

Integration filters allow you to quickly change which destinations receive specific Track, Identify, or Group events. Access this tool in any Source that is receiving data by navigating to the Schema tab. Schema integration filters are available to workspaces that are on a Business Tier plan only.

You can apply Integrations filters to specific events regardless of whether the source is connected to a Tracking Plan. To update which destination an event can be sent to, click the **Integrations** dropdown menu to see a list of the destinations each call is sent to. You can turn those destinations on or off from within the dropdown menu.

![](images/schema-integration-filters.png)

The events filtered out of individual destinations using this method still arrive in your data warehouse(s). Warehouses do not appear in the integration filters dropdown, and you cannot prevent data from flowing to Warehouses using this feature - to do that use [Warehouse Selective Sync](#warehouse-selective-sync).

**Integration filters are all-or-nothing for each event.** If you require more detailed control over which events are sent to specific destinations, you can use Destination Filters to inspect the event payload, and conditionally drop the data or forward it to the destination.

## Schema event filters

You can use Schema Event Filters to discard and permanently remove Page, Screen and Track events from event-based sources, preventing them from reaching any destinations or warehouses. Use this if you know that you'll never want to access this data again. This functionality is similar to filtering with the Integrations object, however it can be changed from within the Segment app without touching any code.

When you enable these filters, Segment stops forwarding the data to all of your Cloud- and device-mode destinations, including warehouses, and your data is no longer stored in Segment's warehouses for later replay.

Use this when you need to disable an event immediately, but may need more time to remove it from your code, or when you want to temporarily disable an event for testing. In addition to blocking track calls, you can block all page and screen calls, as well as omit identify traits and group properties.

If the Source is not connected to a tracking plan, you'll find event filter toggles next to the Integration filters in the source's schema tab. When an event is set to block, the entire event is blocked. This means no destinations receive it, including data warehouses.

![](images/schema-event-filters.png)

When an event is blocked, the name of the event or property appears on your Schema page with a counter which shows how many times it has been blocked. By default, data from blocked events and properties is not recoverable. You can always re-enable the event to continue sending it to downstream destinations.

In most cases, blocking an event immediately stops that event from sending to destinations. In rare cases, it can take **up to 6 hours** for an event to completely stop arriving in all Destinations.

This feature is only available if the Source is not connected to a Tracking Plan, and is only available in workspaces that are on a Business Tier plan.


## Protocols Tracking Plan blocking and property omission

If you're using Protocols, and you're confident that your tracking plan includes exactly the events and properties you want to record, you can tell Segment to [block unplanned events or malformed JSON](/docs/protocols/enforce/schema-configuration/). When you do this, Segment discards any data coming from the Source that doesn't conform to the tracking plan.

By default, the blocked events are permanently discarded: they do not flow to Destinations, and cannot be Replayed (similar to Schema Controls). However, you can opt to send data in violation of the tracking plan to a new Segment Source so you can monitor it. (This source can affect your MTU count.)

If you have Protocols in your workspace, **and** have a tracking plan associated with the Source, you'll see additional options in the Schema Configuration section of the Source's Settings page. From this page you can choose how to handle data violations across different types of calls and properties, whether that be blocking events entirely or omitting violating properties.

![](images/protocols-unplanned.png)


## Warehouse Selective Sync

Warehouse Selective Sync allows you to stop sending specific data to specific warehouses. You can use this to stop syncing specific events or properties that aren't relevant, and could be slowing down your warehouse syncs. See the [Warehouse Selective Sync documentation](/docs/connections/storage/warehouses/warehouse-syncs/#warehouse-selective-sync) to learn more.

> info ""
> This feature is only available to Business Tier customers, and you must be a Workspace Owner to change Selective Sync settings.

## Privacy Portal filtering

The [Privacy Portal](/docs/privacy/portal/) is available to all Segment customers, because Segment believes that data privacy is a right, and that anyone collecting data should have tools to help ensure their users' privacy. More enhancements are available to BT customers who may need tools for managing complex implementations.

The Privacy Portal tools allow you to inspect your incoming calls and their payloads, detect potential Personally Identifiable Information (PII) in properties using matchers, classify the information by different categories of risk, and use those categories to determine which Destinations may or may not receive the data. Learn more about these features in the [Privacy Portal documentation](/docs/privacy/portal/).

![](/docs/privacy/images/privacy-add-new-matcher.gif)
