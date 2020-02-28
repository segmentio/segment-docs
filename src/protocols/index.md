---
title: Protocols Overview
---

Segment helps customers collect and integrate customer data across a wide range of tools and Destinations. To do so reliably, the data Segment receives must be clean, consistent and adhere to a well thought out tracking plan.

> info ""
> Protocols is a premium add-on feature available to Business Tier customers. If your plan includes Protocols, you can access it [from the `protocols` path in your workspace](https://app.segment.com/goto-my-workspace/protocols). If your plan doesn't include Protocols, contact your Segment account executive.

Many customers today use our [Google Sheets templates](https://docs.google.com/spreadsheets/d/1ZHGfNrCxBQbEyevmVxNoU0DGjb8cJMro1iwIRZLWjPw/view){:target="_blank"}, [schema controls](/docs/connections/destination-data-control/) and internal processes to maintain data quality. However, these solutions have shortcomings which make them hard to scale as your team grows.

Protocols was built to automate and scale the [data quality best practices](/docs/protocols/data-quality) developed over years of helping customers implement Segment. Investing in data quality will improve trust in your data, reduce time spent by your engineering and business teams navigating and validating data, and ultimately allow your business to grow faster.

We highly recommend spending time reviewing the [data quality best practices docs](/docs/protocols/data-quality/)!

Protocols has four main themes:

* [**Align:**](/docs/protocols/tracking-plan/#create-a-tracking-plan) Good data quality starts with a well thought out Tracking Plan. With Protocols, you can define your events and corresponding properties in a Tracking Plan. This tracking plan becomes a central source of truth for product, engineering, analytics, and business teams.
* [**Validate:**](/docs/protocols/tracking-plan/#tracking-plan-event-violations) With your tracking plan living in Segment, you can apply it to 1 or more data sources. Any event or property that does not match the tracking plan will generate a violation. Violations are displayed in aggregated form to spot trends, and detailed form to help you quickly find and resolve discrepancies.
* [**Enforce:**](/docs/protocols/tracking-plan/#schema-configuration) To maintain a high degree of quality over time, we offer strict controls to block non-conforming events. Blocked events can be forwarded to a separate quarantined Segment source for analysis and review.
* [**Transform:**](/docs/protocols/transformations/) Even the most exacting data collection processes are subject to human error and organizational complexity. Transformations can be applied from within Protocols to change event and property names without touching code.

{% include components/button-fill.html size="large" text="Get Started: Learn more about Tracking Plans ->" href="https://segment.com/docs/protocols/tracking-plan/" %}

**Related Info:**
* [Data Quality Best Practices](/docs/protocols/data-quality/) - Learn more about tracking plans and why you need them
* [Protocols Tracking Plan](/docs/protocols/tracking-plan/) - Create a Protocols Tracking Plan to standardize your collected data
* [Protocols Transformations](/docs/protocols/transformations/) - Fix data quality issues without writing code
* [Protocols FAQ](/docs/protocols/faq/)
