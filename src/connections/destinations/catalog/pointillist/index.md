---
title: Pointillist Destination
---

## Getting Started

{% include content/connection-modes.md %}

Once the Segment library is integrated with your server code, site or app, toggle Pointillist ON in the Segment dashboard, and add your Pointillist API key.

To set up your Pointillist account and receive your API key, please click on this link and follow the instructions on the screen. For any additional questions, get in touch with a Pointillist customer representative at customer-success@pointillist.com.


*Note: Pointillist accepts server-side, client-side as well as mobile app-data, so you can use either or all of our libraries ([browser](/docs/sources/website/analytics.js), [mobile](/docs/sources/mobile/android) and [server](/docs/sources/server/java/)) to send data to Pointillist.*

## Identify

When you call [identify](/docs/spec/identify), we'll log an `identify` event with Pointillist and set `userId` and `anonymousId` as Actor Identifiers. Pointillist will then automatically associate all events tagged previously with the *anonymousId* to the provided *userId*. We will also associate any special traits that you provide such as name, email, and other custom traits with Labels and Numbers so that you can filter or create metrics.

## Track

When you call [track](/docs/spec/track), we'll log an event with Pointillist with `userId` and / or `anonymousId` as Actor Identifier and set `event` as Event Type. The table below shows mappings for other attributes. You'll pass the key on the left into Segment and we will transform it to the key on the right in Pointillist.

Segment Parameter | Pointillist Parameter
------------ | -------------
anonymousID	| Actor Identifier
userId	| Actor Identifier
timestamp	| Event Time
event	| Event Type
location | Attributes	Labels
campaign | Attributes	Labels
user traits	| Labels
device attributes	| Labels

Below is an  example of how your track events will start appearing instantly in Pointillist.

![Pointillist Screen Image](/images/pointillist_snapshot.png)

## API Key

To get your API key please get in touch with a Pointillist customer representative via customer-success@pointillist.com
