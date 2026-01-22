---
title: Zapier Source
---

[Zapier](https://zapier.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank"} lets teams automate workflows across apps without code. The Zapier Source lets you send Segment events directly from Zaps.

This source is maintained by Zapier. For any issues with the source, [contact the Zapier Support team](mailto:support@zapier.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"} click **Add Source**.
2. Search for "Zapier" in the Sources Catalog, select Zapier, and click **Add Source**. Alternatively, you can create a source from a Zap using the "Create Source" action in Zapier.
3. On the next screen, give the Source a name and configure any other settings.
4. Click **Add Source** to save your settings.
5. You can now send events to the source from your Zaps. You will need to use the "Send Event" action in Zapier.
6. In Zapier, create or open a Zap that uses the Segment app, then select your Source. In the backend, Zapier uses the Source write key to send events using the HTTP API.

## Stream

Zapier sends events to Segment using the HTTP API. You can send `track`, `identify`, `page`, `screen`, `group`, or `alias` events. These events are available in downstream destinations that are configured with your source.

Zapier includes `userId` when provided. If a known user ID is not available, Zapier can send `anonymousId` to support pre-login activity tracking.

## Events

The table below lists events that Zapier can send to Segment.

| Event name | Description |
| --- | --- |
| Track | Records a user action with properties. |
| Identify | Associates traits with a known user. |
| Page | Records a page view. |
| Screen | Records a screen view. |
| Group | Associates a user with a group. |
| Alias | Links two user identifiers. |

## Event properties

The table below lists common fields that can be included with Zapier events. You can also send a raw JSON object as the event payload by selecting the "Use raw JSON" option in the "Payload mode" dropdown.

| Property name | Description |
| --- | --- |
| `userId` | Known identifier for the user. |
| `anonymousId` | Identifier for an unknown user. |
| `event` | Track event name. |
| `properties` | Key-value properties for track, page, or screen. |
| `traits` | Key-value traits for identify or group. |
| `name` | Page or screen name. |
| `category` | Page or screen category. |
| `groupId` | Group identifier. |
| `previousId` | Previous identifier for alias. |
| `context` | Context object such as ip or locale. |
| `timestamp` | ISO 8601 timestamp. |
| `messageId` | Unique ID used for deduplication. |

## Adding destinations

After the Source is set up, connect it with Destinations.

Log into your downstream tools and confirm events appear as expected with the properties you use. If events and properties do not appear, check the [Event Delivery](/docs/connections/event-delivery/) tool and refer to the destination documentation for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Zapier Support team](https://help.zapier.com/hc/en-us/requests/new).
