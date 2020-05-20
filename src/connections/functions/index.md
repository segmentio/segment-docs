---
title: Functions Overview
---

Functions let you create your own sources and destinations directly within your workspace to bring new types of data into Segment and send data to new tools with just a few lines of JavaScript - no additional infrastructure required. 

**[VISUAL SHOWING DATA FLOW FOR FUNCTIONS GENERALLY]**
![](images/functions-overview.png)

> info ""
> Functions are scoped to your specific workspace. If you're a technology partner looking to build a new integration to be published on Segment's catalog, please read our [Developer Center documentation](https://segment.com/docs/partners/).


## What can you do with Functions?
Functions can help you bring external data into Segment (Source Functions) and send data in Segment out to external destinations (Destination Functions).

#### Source Functions
Source Functions receive external data from a webhook and can create Segment events, objects, or both. Source Functions have access to the full power of JavaScript so you can validate and transform the incoming data and even make external API requests to annotate your data.

Use cases:
- Ingest data into Segment from a source that's unavailable in the catalog
- Transform or reject data before it's received by Segment
- Enrich incoming data using external APIs

{% include components/button-fill.html size="small" text="Learn more" href="https://segment.com/docs/connections/functions/source-functions/" %}

#### Destination Functions
Destination Functions can take events from a Segment source, transform the events, and deliver them to external APIs. Destination Functions can make arbitrary requests to annotate data, as well.

Use cases:
- Send data from Segment to a service that's unavailable in the catalog
- Transform data before sending it downstream
- Enrich outgoing data using external APIs

{% include components/button-fill.html size="small" text="Learn more" href="https://segment.com/docs/connections/functions/destination-functions/" %}
