---
title: 'Protocols: Schema Controls'
sidebar: Schema
---

Segment Business plan customers can use Schema Controls to manage which events are allowed to pass through Segment and on to Destinations. These filters are a first-line defense to help you protect the integrity of your data, and the decisions made with it.

## Event filters

If you no longer want to track a specific event, you can either remove it from your code or, if you’re on the Business plan, you can block track calls right from the Segment UI. To do so, click on the Schema tab in a Source and toggle the event to enable or block an event.


![](../images/asset_ZCRZqdO9.gif)


Once you block an event in Segment, we’ll stop forwarding it to all of your Cloud and Device mode Destinations, including your warehouses. You can remove the events from your code at your leisure. In addition to blocking track calls, Business plan customers can block all Page and Screen calls, as well as Identify traits and Group properties.

When an event is blocked, the name of the event or property will be added to your Schema page with a counter to show how many events have been blocked. By default, data from blocked events and properties is not recoverable. You can always re-enable the event to continue sending it to downstream Destinations.

In most cases, blocking an event will immediately stop that event from sending to Destinations. In rare cases, it can take **up to 6 hours** to fully block an event from delivering to all Destinations.


## Identify and Group Trait Filters

If you no longer want to capture specific traits within `.identify()` and `.group()` calls, you can either remove those traits from your code, or if you’re on the Business plan, you can block specific traits right from the Segment UI. To do so, click on the Schema tab in a Source and navigate to the Identify or Group events where you can block specific traits.


![](https://d2mxuefqeaa7sj.cloudfront.net/s_FA6EB207727C5CFB69E79F40240F32D015A49D53680882C1E7FD4D0BB999A0E7_1536610913565_disable+trait.gif)

**IMPORTANT: Blocked traits will not be omitted from calls to device mode Destinations.**

## Destination filters

All customers can filter specific events from being sent to specific Destinations (except for warehouses) by updating their tracking code. Here is an example showing how to send a single message only to Intercom and Google Analytics:

```
    analytics.identify('025pikachu025', {
      email: 'peekAtMe@email.poke',
      name: 'Pikachu'
    }, {
      integrations: {
        'All': false,
        'Intercom': true,
        'Google Analytics': true
      }
    });
```

Destination flags are case sensitive and match the [Destination’s name in the docs](https://segment.com/docs/destinations/) (i.e. “AdLearn Open Platform”, “awe.sm”, “MailChimp”, etc.).

Segment Business tier customers can block track calls from delivering to specific Destinations in the Segment UI. Visit a Source Schema page and click on the “Integrations” column to view specific Destination filters. Toggle the filter to block or enable an event to a Destination.


![](../images/asset_d3SRmkWy.gif)

## Schema Defaults

If you’ve solidified your tracking plan and don’t want any rogue events finding their way to your warehouses and end tools, we recommend activating Schema Defaults. When you lock your schema, or set your Schema Defaults to “Block,” Segment will automatically prevent new calls from being sent downstream. You can activate this for new events—including `track`, `page`, and `screen` calls—or for new `identify` traits and `group` properties.

Locking your schema only takes a few seconds and prevents new rogue events from polluting your Destinations. To configure Schema Defaults, go to your source Schema page, and select “General” from the left-hand navigation.


![](../images/asset_A8jUVuph.gif)


### Overview of Schema Default Settings

| Setting              | Allow                                                                | Block                             |
| -------------------- | -------------------------------------------------------------------- | --------------------------------- |
| New Events           | All new events will be allowed in Segment and sent to all Destinations.| No new events will be allowed in Segment or sent to your cloud and device mode Destinations. Any event that is already being tracked and part of your Schema will not be impacted. |
| New Group Properties | All new group properties will be allowed in Segment and sent to all Destinations. | No new group properties will be allowed in Segment or sent to your cloud mode Destinations. Device mode destinations **will** receive blocked traits. |
| New Identify Traits  | All new identify traits will be allowed in Segment and sent to all Destinations.  | No new identify traits will be allowed in Segment or sent to your cloud mode Destinations. Device mode destinations **will** receive blocked traits.|


### Schema Default Blocking support across connection modes

Track events blocked by Schema filters will be blocked from delivering to both device mode and cloud mode Destinations. That means if you send a blocked event from a client side library like analytics.js, it will not be delivered to any device mode Destinations.

Identify and group call traits blocked by Schema filters will **only** be blocked from delivering to cloud mode Destinations. Device mode destinations will receive all traits regardless of whether they are blocked in Schema.


## Blocked Track Event forwarding

If you’re concerned about permanently discarding blocked track events, you can forward blocked track events to a new Segment Source. To enable, go to Source Settings > Schema Configuration and select which Source you want to forward track events to from the drop down. We recommend [creating a new Source](https://segment.com/docs/guides/general/what-is-a-source/) for forwarded events to avoid contaminating production data.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_FA6EB207727C5CFB69E79F40240F32D015A49D53680882C1E7FD4D0BB999A0E7_1536449582364_Screen+Shot+2018-09-08+at+4.32.41+PM.png)

**NOTE: Only blocked `.track()` events will be forwarded to the source. `.identify()` and `.group()` events will not be forwarded.**

**BILLING NOTE: Events forwarded to a Segment Source will count towards your MTU counts. Blocking and discarding events will not contribute to your MTU counts.**
