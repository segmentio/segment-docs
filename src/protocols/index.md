---
title: Protocols
sidebar: Overview
---


## Overview

Segment helps customers collect and integrate customer data across a wide range of tools and Destinations. To do so reliably, the data Segment receives must be clean, consistent and adhere to a well thought out spec. Many customers use Google Sheets templates and internal processes to define and maintain this spec. These processes however have shortcomings, and result in bad data making it into Segment. When bad data is sent to your Destinations, it makes it hard for consumers of the data to analyze and act on it.

Protocols provides a suite of tools focused on helping you improve the quality and consistency of the data you send to Segment. Doing so improves trust in your data. It also reduces time spent by your engineering and business teams navigating and validating data, leaving more time to create value for your business.

Our schema controls offering is included as a part of our Business plan.

Customers looking for additional data governance functionality should use Protocols to protect the integrity of their data and the decisions they make with it. Protocols is centered around three pillars:

* [**Align:**](/docs/protocols/tracking-plan) Good data quality starts with a well thought out Tracking Plan. With Protocols, you can define your events and corresponding properties within a Tracking Plan in Segment. This tracking plan becomes a central source of truth for product, engineering, analytics, and business teams.
* [**Validate:**](/docs/protocols/tracking-plan) With your tracking plan living in Segment, you can apply it to 1 or more data sources. Any event or property that does not match the tracking plan will generate a violation. Violations are displayed in aggregated form to spot trends, and detailed form to help you quickly find and resolve discrepancies.
* [**Enforce:**](/docs/protocols/tracking-plan) To maintain a high degree of quality over time, we offer strict controls to block non-conforming events. Blocked events can be forwarded to a separate quarantined Segment source for analysis and review.
