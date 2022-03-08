---
title: Emarsys Destination
rewrite: true
id: 5a8e1add366cd2000115dfe7
---
[The Emarsys Marketing Platform](https://www.emarsys.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) allows consumer-facing companies of any industry to convert, grow and retain their clients by enabling automated and personalized interactions across the customer lifecycle and across channels and devices.

This destination is maintained by Emarsys. For any issues with the destination, [contact the Emarsys Support team](mailto:help@support.emarsys.com).

{% include content/beta-note.md %}

## Getting Started

{% include content/connection-modes.md %}

1. From the Segment web app, click **Catalog**.
2. Search for "Emarsys" in the Catalog, select it, and choose which of your sources to connect the destination to.
3. Enter the "API Key" into your Segment Settings UI which you obtain from your Emarsys Account Manager.
4. Work with your Emarsys Account Manager to establish the initial processing rules required within the Emarsys platform.

### Configuration

Once enabled you will have a new item in the Add-Ons menu: "segment.com". This will
open the configuration page to set up data maps and rules. An Emarsys integration consultant will assist you with setting up your first data maps and rules.


## Page, Screen, Identify, Track


Identify, Track, Screen and Page requests have identical
behavior for the Emarsys Destination.

Emarsys maintains an intermediate users table which stores three different identification properties: `anonymousId`, `userId`, `primarykey`. While a`anonymousId` and `userId` will be used from Segment's standard properties you can define which property in
the JSON from Segment has to be used as the primary key
(e.g. traits -> email). Each incoming request will update this intermediate users table.

The Emarsys Destination allows you to map any data property to fields in the Emarsys platform. With the integrated rule builder you can define sequences of events which will trigger marketing automation programs in the Emarsys platform.
