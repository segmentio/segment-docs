---
title: Alerts
---
Segment's alerting features allow you to receive in-app, email, and Slack notifications related to the status, performance, and throughput of your Segment integrations. 

> info "Public beta"
> The Monitor hub is in Public Beta. Some functionality may change before it becomes generally available. During the public beta, only default alerts are located in the Monitor tab. 

Segment has two kinds of alerts: 
- **Default alerts**: Alerts that have a preset threshold and are often used to detect changes users make to the integrations in your workspace. For example, a _Source created_ alert is a default alert. 
- **Custom alerts**: Alerts that allow you to customize the sensitivity of the trigger that activates an alert so you can more accurately detect event volume fluctuations in your sources and destinations. For example, a _Source volume fluctuation_ alert would be a custom alert, as you could select a percentage of fluctuation that would work for your business needs.  

{% include components/reference-button.html
  href="/monitor/alerts/default-alerts"
  variant="related"
  icon="monitor.svg"
  title="Default alerts"
  description="Learn more about Segment's default alerts."
%}