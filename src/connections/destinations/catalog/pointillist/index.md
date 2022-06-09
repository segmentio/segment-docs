---
title: Pointillist Destination
id: 56b17633e954a874ca44d3df
---
## Getting Started

Once the Segment library is integrated with your server code, site or app, toggle Pointillist ON in the Segment dashboard, and add your Pointillist API key.

To set up your Pointillist account and receive your API key, click on this link and follow the instructions on the screen. For any additional questions, get in touch with a Pointillist customer representative at customer-success@pointillist.com.


*Note: Pointillist accepts server-side, client-side as well as mobile app-data, so you can use either or all of Segment's libraries ([browser](/docs/connections/sources/catalog/libraries/website/javascript), [mobile](/docs/connections/sources/catalog/libraries/mobile/android) and [server](/docs/connections/sources/catalog/libraries/server/java/)) to send data to Pointillist.*

## Identify

When you call [identify](/docs/connections/spec/identify), we'll log an `identify` event with Pointillist and set `userId` and `anonymousId` as Actor Identifiers. Pointillist will then automatically associate all events tagged previously with the *anonymousId* to the provided *userId*. We will also associate any special traits that you provide such as name, email, and other custom traits with Labels and Numbers so that you can filter or create metrics.

## Track

When you call [track](/docs/connections/spec/track/), we'll log an event with Pointillist with `userId` and / or `anonymousId` as Actor Identifier and set `event` as Event Type. The table below shows mappings for other attributes. You'll pass the key on the left into Segment and we will transform it to the key on the right in Pointillist.

| Segment Parameter | Pointillist Parameter |
| ----------------- | --------------------- |
| `anonymousID`       | Actor Identifier      |
| `userId`            | Actor Identifier      |
| `timestamp`         | Event Time            |
| `event`             | Event Type            |
| `location`          | Attributes Labels     |
| `campaign`          | Attributes Labels     |
| user traits       | Labels                |
| device attributes | Labels                |


## API Key

To get your API key, contact the [Pointillist customer success team](mailto:customer-success@pointillist.com)
