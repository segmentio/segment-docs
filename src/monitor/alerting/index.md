---
title: Alerting
beta: true
---

Segment’s alerting capabilities allow you to receive in-app, email, or Slack notifications related to the performance and throughput of a Segment connection. The notification channels that you select for one alert will apply to all alerts in your workspace.

> info "Deleting alerts created by other users requires Workspace Owner role"
> All users can delete alerts that they created, but only those with [Workspace Owner role](/docs/segment-app/iam/roles/) can delete alerts created by other users.

<br>Segment currently supports the following alerting products: 
<div class="flex flex--wrap gutter gutter--large">
  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/reverse-etl/system"
      title="Connections Alerting"
      description="Monitor fluctuations in the quantity of events Segment ingests into your Sources and verify that Segment is sending an expected volume of events to your Destinations"
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/reverse-etl/reverse-etl-catalog"
      title="Reverse ETL Alerting"
      description="Receive notifications for failed or partially successful syncs and verify your mappings are producing an expected level of events"
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/reverse-etl/faq"
      title="Audience Alerting"
      description="Monitor fluctuations in event volume sent from your Audiences downstream to your destinations"
    %}
  </div>
</div>