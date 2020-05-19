---
title: Functions Overview
---

Functions lets you create your own sources and destinations directly within your workspace to bring new types of data into Segment and send data to new tools with just a few lines of JavaScript - no additional infrastructure required. 

**[VISUAL SHOWING DATA FLOW FOR FUNCTIONS GENERALLY]**
![](images/functions-overview.png)

> info ""
> Functions are scoped to your specific workspace. If you're a technology partner looking to build a new integration to be published on Segment's catalog, please read our [Developer Center documentation](https://segment.com/docs/partners/).


## What can you do with Functions?
There are two types of Functions which allow you to send data into Segment or to forward data out.

#### Source Functions
Source Functions allow you to collect and transform any stream of first-party customer data by leveraging a webhook and sending it through to your Segment workspace.

{% include components/button-fill.html size="medium" text="Build A Source Function ->" href="https://segment.com/docs/connections/functions/source-functions/" %}

#### Destination Functions
Destination Functions enables you to transform and map events collected by Segment and send them out to tools and services with a public API endpoint. 

{% include components/button-fill.html size="medium" text="Build A Destination Function ->" href="https://segment.com/docs/connections/functions/destination-functions/" %}
