---
title: Alerts
---
Segment's alerting features allow you to receive in-app, email, and Slack notifications related to the status, performance, and throughput of your Segment integrations. 

Segment has two kinds of alerts: 
- **Default alerts**: Alerts that have a preset threshold and are often used to detect changes users make to the integrations in your workspace. For example, a _Source created_ alert is a default alert. 
- **Custom alerts**: Alerts that allow you to customize the sensitivity of the trigger that activates an alert so you can more accurately detect event volume fluctuations in your sources and destinations. For example, a _Source volume fluctuation_ alert would be a custom alert, as you could select a percentage of fluctuation that would work for your business needs.  

<div class="double">
{% include components/reference-button.html
  href="/monitor/alerts/default-alerts"
  variant="related"
  icon="segment-app.svg"
  title="Default alerts"
  description="Default alerts are often used to detect changes users made in your workspace."
%}

{% include components/reference-button.html
    href="/docs/monitor/alerts/custom-alerts"
    icon="book.svg"
    title="Custom alerts"
    description="Custom alerts allow you detect fluctuations in event volumes."
  %}
</div>
