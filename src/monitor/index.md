---
title: Monitor
---

With Segment’s observability, auditing, and alerting capabilities, you can monitor the health of your integrations, diagnose issues that might be present in your data pipeline, and view a record of all user and system activity that happened in Segment over the past 90 days. 

Use [Delivery Overview](/docs/monitor/delivery-overview/), Segment’s observability framework, to verify events and profiles are flowing as expected to your downstream destinations and diagnose issues that might be present at each step of your data pipeline. 

Receive alerts for the performance and throughput of your Sources and Destinations, fluctuations in events delivered to your Reverse ETL mappings, and the performance and throughput of Audience syncs with [Alerting](/docs/monitor/alerting/). 

Segment’s [Audit Trail](/docs/monitor/audit-trail) provides a high-level view of all changes made in your workspace over the last 90 days. Use [Audit Forwarding](/docs/monitor/audit-trail#audit-forwarding) to quickly revert unintentional actions made in Segment to prevent downstream data loss. 

Select a product below to learn about its capabilities, supported destinations, and more.

<div class="flex flex--wrap gutter gutter--large">
  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/monitor/alerting"
      title="Alerting"
      description="Receive in-app, email, or Slack notifications related to the performance and throughput of a Segment connection."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/monitor/delivery-overview"
      title="Delivery Overview"
      description="Segment's observability framework and the accompanying visual pipeline view support cloud-streaming destinations."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/monitor/audit-trail"
      title="Audit Trail"
      description="View, filter, and export the last 90 days of user and system activity."
    %}
  </div>
</div>