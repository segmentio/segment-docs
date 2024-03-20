---
title: How do we set up event-triggered notifications or alerts?
---

Below you'll find a bunch of ways to set up notifications for yourself based on the data you're sending through Segment. 

### Google Analytics custom alerts

You can use Google Analytics Custom Alerts to send yourself emails whenever a specific traffic segment drops below (or above) a threshold you set. 

[Learn how to set up email alerts here](https://support.google.com/analytics/answer/1033021?hl=en){:target="_blank"}.

### Analytics email summaries

With tools like Amplitude, Kissmetrics, and Mixpanel, you can set up email reports delivered to you on a daily basis. They are completely customizable, so you can keep an eye on as many events or other metrics you'd like. 

*   [Mixpanel email reports](https://mixpanel.com/blog/2011/04/14/email-reports/)
*   [Amplitude email alerts (scroll down a bit)](https://amplitude.com/blog/2015/03/20/new-features-stickiness-team-access-controls-email-alerts-redshift-playbook/)

### Realtime traffic monitoring

Chartbeat and GoSquared both offer awesome real-time dashboards to see what's happening right now on your site. They both include the option to get notified when your traffic hits a certain threshold. For example, if your on-site visitors is less than 100 people, or more than 1,000.

*   [Chartbeat Spike Alerts](http://blog.chartbeat.com/2011/08/11/newsbeat-introducing-spike-alerts/){:target="_blank"}
*   [GoSquared Traffic Spike Alerts](https://www.gosquared.com/customer/portal/articles/1036771-traffic-spike-alerts){:target="_blank"}

> info ""
> GoSquared also offers in-depth historical and user analysis. Chartbeat sticks to realtime anonymous traffic, but offers some sweet features for publishers.

### Webhook-based alerts

The last option Segment recommends is to use a monitoring tool like [PagerDuty](https://www.pagerduty.com/){:target="_blank"} or [Data Dog](https://www.datadoghq.com/){:target="_blank"} and point Segment's [webhooks](/docs/connections/destinations/catalog/webhooks/) destination at them. That way you can set up custom alerts in their system.

### Event-triggered emails

The last option for alerting based off of Segment events is to use one of the email tools available on the Segment platform that offers event-triggered emails. Your options there are Customer.io, Vero, Autopilot, Outbound, Klaviyo, or Threads.
