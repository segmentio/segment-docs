---
title: Filtering your Segment Data
---

There are many ways you can use Segment to filter event and object based data to control which destinations it reaches. This document lists the most commonly used ways you can filter data in Segment, and explains when you'd use each.

![Use Segment to filter event and object based data](/docs/images/segment-diagram.png)


## Filtering with the Integrations Object

The Integrations object is the only filtering method that can’t be edited in the Segment web app. It's both the most reliable and the most complicated filtering option to change. The Integrations object is available to all customers, regardless of Segment plan.

Use this option only when you know you always or never want data in a specific destination or set of destinations. You can also build logic in your app or site to conditionally turn destinations on or off by rewriting this object. However, Segment doesn't recommended this approach because it's time-consuming to change, especially for mobile apps.

The Integrations object filters `track`, `page`, `group`, `identify`, and `screen` events from both client- and cloud-based sources, and routes or blocks them from reaching the listed destinations.

You can use the `integrations` JSON object as part of your Segment payloads to control how Segment routes your data to specific destinations. Here's an example payload:

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
    "Salesforce": false,
    "My Destination Function (My Workspace)": true
  }
}
```

By default the `integrations` object is set to `'All': true`. You don’t need to include this flag in the object, but if you’ll be using the Integrations object frequently, you might want to include it for clarity. Change this to `'All': false` to block data from all downstream destinations, except data warehouses. 

If you set `'Segment.io': false` in the `integrations` object, Analytics.js 2.0 drops the event before it reaches your [Source Debugger](/docs/connections/sources/debugger/). You can also add destinations by key and set their value to `true` or `false` to allow or block data on an individual basis. The Destination Info box on each destination page shows the exact name to use in the object. 

If you’re using [multiple instances of a destination](/docs/connections/destinations/add-destination/#connecting-one-source-to-multiple-instances-of-a-destination), any settings in the Integrations object apply to all instances. You can’t configure them separately.  

Destination flags are case sensitive and must match the destination’s name in the docs (for example, “AdLearn Open Platform,” “awe.sm,” or “MailChimp”).  

Filtering data for warehouses uses a different syntax. See the [Warehouse FAQs](/docs/connections/storage/warehouses/faq/#can-i-selectively-filter-dataevents-sent-to-my-warehouse-based-on-a-property) for details.

## Destination filters

[Destination filters](/docs/connections/destinations/destination-filters/) let you control the data flowing into each specific destination. They work by examining event payloads and conditionally blocking data from being sent. You can filter out entire events or just specific fields in event properties, traits, or context.

Destination filters support cloud-based (server-side), actions-based, and mobile- and web-device-mode destinations. They don’t apply to warehouses or S3 destinations.

> info ""
> Destination filters are only available in workspaces that are on a Business Tier plan.
<!-- >
> Destination filters for mobile device-mode destinations are in beta and only supports [Swift](/docs/connections/sources/catalog/libraries/mobile/swift-ios#destination-filters), [Kotlin (Android)](/docs/connections/sources/catalog/libraries/mobile/kotlin-android/#destination-filters), and [React Native 2.0](/docs/connections/sources/catalog/libraries/mobile/react-native/#destination-filters) libraries. -->

> warning ""
> Keep [these limitations](/docs/connections/destinations/destination-filters/#limitations) in mind when using destination filters.

![Configuring a destination filter](images/destination-filter-create.png)

To set up destination filters in the Segment web app for a destination where you want to exclude data:

1. *(For web device-mode destinations only)* Turn on destination filters for your Analytics.js source. Go to your JavaScript source, navigate to **Settings > Analytics.js**, and turn on **Destination Filters**. Destination filters for web device-mode only supports the Analytics.js 2.0 source.
2. Navigate to **Connections > Destinations** and select the destination you want to set up filters for.
3. Go to the **Filters** tab and click **+ New Filter** to create a destination filter.

See the [Destination Filters documentation](/docs/connections/destinations/destination-filters/) for more details.

You can create destination filters using the options in the Segment web app or by writing queries in Segment’s [Filter Query Logic (FQL)](/docs/api/public-api/fql/). FQL queries are limited to 5 KB each.

## Per-source schema integration filters

Integration filters let you quickly change which destinations receive specific Track, Identify, or Group events. Access this tool in any source that’s receiving data by navigating to the **Schema** tab. Schema integration filters are available only on Business Tier workspaces.

You can apply Integration filters to specific events whether or not the source is connected to a Tracking Plan. To update which destinations an event can be sent to, open the **Integrations** dropdown menu to see the list of destinations for each call. You can toggle destinations on or off from within the menu.

![The Integrations dropdown menu displays a list of destinations each call is sent to](images/schema-integration-filters.png)

Events filtered out of individual destinations using this method still arrive in your data warehouse(s). Warehouses don’t appear in the integration filters dropdown, and you can’t block data from flowing to them with this feature. To filter warehouse data, use [Warehouse Selective Sync](#warehouse-selective-sync).

**Integration filters are all-or-nothing for each event.** If you need more detailed control over which events go to specific destinations, use Destination filters to inspect the event payload and conditionally drop or forward data.

**Integration filters won’t override values in the `integrations` object.** If the `integrations` object already sets a value for a destination, per-source schema integration filters won’t override it. For example, if you’re sending events to Appsflyer with the `appsflyerId` passed into the `integrations` object:

```javascript
integrations: {
  Appsflyer: {
    appsflyerId: 'xxxxxx'
  }
}
```

For the same event, if you turn off Appsflyer with a per-source schema integration filter, the `integrations` object setting still takes priority and the event goes downstream. In this scenario, use [destination filters](#destination-filters) to drop the event before it’s sent downstream.

## Schema event filters

Schema event filters let you discard and permanently remove Page, Screen, and Track events from event-based sources. This prevents them from reaching any destinations or warehouses. You can also use these filters to omit identify traits and group properties. Use this option if you know you’ll never want to access the data again. Schema event filters work like the Integrations object, but you can change them from within the Segment app without touching code.

When you turn on these filters, Segment stops forwarding data to all cloud- and device-mode destinations, including warehouses. The data is no longer stored in Segment’s warehouses for later replay.

Use this feature when you need to turn off an event immediately but need more time to remove it from your code, or when you want to temporarily turn off an event for testing. In addition to blocking track calls, you can block page and screen calls, as well as omit identify traits and group properties.

If the source isn’t connected to a tracking plan, you’ll find event filter toggles next to the Integration filters in the source’s Schema tab. When an event is set to block, the entire event is blocked. This means no destinations receive it, including warehouses.

Blocked events don’t count toward MTUs unless blocked event forwarding is turned on.

![Event filter toggles](images/schema-event-filters.png)

When an event is blocked, the event or property name appears on your Schema page with a counter that shows how many times it’s been blocked. By default, data from blocked events and properties isn’t recoverable. You can always turn the event back on to continue sending it to downstream destinations.

In most cases, blocking an event immediately stops it from sending to destinations. In rare cases, it can take **up to 6 hours** for an event to stop arriving in all destinations.

This feature is available only if the source isn’t connected to a tracking plan and the workspace is on a Business Tier plan.

## Protocols tracking plan filters

If you’re using Protocols and you’re confident that your tracking plan includes only the events and properties you want to record, you can tell Segment to [block unplanned events or malformed JSON](/docs/protocols/enforce/schema-configuration/). When you do this, Segment discards data from any source that doesn’t conform to the tracking plan.

By default, blocked events are permanently discarded: they don’t flow to destinations and can’t be replayed (similar to schema controls). You can also choose to send data that violates the tracking plan to a new Segment source so you can monitor it. This source can affect your MTU count.

If you have Protocols in your workspace and a tracking plan associated with the source, you’ll see additional options in the **Schema Configuration** section of the source’s **Settings** page. From this page, you can choose how to handle data violations, such as blocking events entirely or omitting violating properties.

![Schema Configuration section of a source's Settings page](images/protocols-unplanned.png)

## Destination Insert Functions

Use [Insert Functions](/docs/connections/functions/insert-functions/) to filter or alter data from a source before it reaches a cloud-mode destination. This feature lets you receive data from your Segment source, write custom code to alter or block it, and then pass the modified payload to a downstream cloud-mode destination.

## Warehouse Selective Sync

Warehouse Selective Sync lets you stop sending specific data to specific warehouses. You can use this to stop syncing events or properties that aren’t relevant and might slow down your warehouse syncs. See the [Warehouse Selective Sync documentation](/docs/connections/storage/warehouses/warehouse-syncs/#warehouse-selective-sync) to learn more.

> info ""
> Warehouse Selective Sync is available only to Business Tier customers, and you must be a workspace owner to change Selective Sync settings.

## Privacy Portal filtering

The [Privacy Portal](/docs/privacy/portal/) is available to all Segment customers and helps ensure user privacy. More enhancements are available to Business Tier customers who need tools for managing complex implementations.

Privacy Portal tools let you inspect incoming calls and their payloads, detect potential Personally Identifiable Information (PII) in properties using matchers, classify the information by risk category, and decide which destinations should or shouldn’t receive the data. Learn more in the [Privacy Portal documentation](/docs/privacy/portal/).

![Add a new matcher with the Privacy Portal tools](/docs/privacy/images/privacy-add-new-matcher.gif)