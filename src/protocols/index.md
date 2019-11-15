---
title: Protocols and Schema Controls
---

Segment helps customers collect and integrate customer data across a wide range of tools and Destinations. To do so reliably, the data Segment receives must be clean, consistent and adhere to a well thought out tracking plan.

You don't need anything fancy to build a tracking plan! Many customers use our [Google Sheets templates](https://docs.google.com/spreadsheets/d/1ZHGfNrCxBQbEyevmVxNoU0DGjb8cJMro1iwIRZLWjPw/view) and internal processes to define and maintain this plan.

However, these processes can have shortcomings (especially if you're a large company with many business units to coordinate), and the results can be bad data. When you send bad data to your Destinations, it makes it hard for the people and teams who use that data to analyze and act on it.

Protocols provides a suite of tools focused on helping you improve the quality and consistency of the data you send to Segment. Doing so improves trust in your data. It also reduces time spent by your engineering and business teams navigating and validating data, leaving more time to create value for your business.

Our [Schema Controls](schema/) offering offers a more reactive, and limited version of the Protocols blocking features, and is included as a part of our Business plan.

Customers looking for additional data governance features should use Protocols to protect the integrity of their data and the decisions they make with it. Protocols is centered around four pillars:

* [**Align:**](/docs/protocols/tracking-plan/#create-a-tracking-plan) Good data quality starts with a well thought out Tracking Plan. With Protocols, you can define your events and corresponding properties in a Tracking Plan in Segment. This tracking plan becomes a central source of truth for product, engineering, analytics, and business teams.
* [**Validate:**](/docs/protocols/tracking-plan/#tracking-plan-event-violations) With your tracking plan living in Segment, you can apply it to 1 or more data sources. Any event or property that does not match the tracking plan will generate a violation. Violations are displayed in aggregated form to spot trends, and detailed form to help you quickly find and resolve discrepancies.
* [**Enforce:**](/docs/protocols/tracking-plan/#schema-configuration) To maintain a high degree of quality over time, we offer strict controls to block non-conforming events. Blocked events can be forwarded to a separate quarantined Segment source for analysis and review.
* [**Transform:**](/docs/protocols/transformations/) Even the most exacting data collection processes are subject to human error and organizational complexity. Transformations can be applied from within Protocols to change event and property names without touching code.
