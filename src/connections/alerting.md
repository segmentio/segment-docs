---
title: Connections Alerting
beta: true
---

Connections Alerting allows Segment users to receive in-app, email, and Slack notifications related to the performance and throughput of a event-streaming connection. 

> info "Connections Alerting is currently in beta"
> This means that the Connections Alerting feature is in active development, and some functionality may change before it becomes generally available. During the beta, Connections Alerting supports event-streaming connections: [event streaming sources](/docs/connections/sources/#event-streams-sources) and [cloud-mode destinations](/docs/connections/destinations/#event-streams-destinations).

To access Connections Alerting, select an event-streaming connection (like a web library source or cloud mode destination) and click the **Alerts** tab. 

On the Alerts tab, you can create alerts and view all active alerts for this connection. You can only edit or delete the alerts that you've created.

## Source volume alerts

You can create an alert that notifies you when the volume of events received by your source in the last 24 hours changes beyond a percentage you set. For example, if you set a change percentage of 4%, you would be notified when your source ingests less than 96% or more than 104% of the typical event volume. 

To receive a source volume alert in a Slack channel, you must create a Slack webhook first. For more information about Slack webhooks, see the [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks){:target="_blank”} documentation.

To create a source volume alert: 
1. Open your workspace and navigate to the [event streaming source](/docs/connections/sources/#event-streams-sources) you'd like to configure alerts for. 
2. Select the Alerts tab and click **Create alert**. 
3. On the Create alert sidesheet, enter a percentage of source volume change that you'd like to be notified for. 
4. Select one or more channels you'd like to receive alerts in. 
  - **Email**: Select this to receive notifications at the provided email address. 
  - **Slack**: Select this to send alerts to one or more channels in your workspace. 
  - **In-app**: Select this to receive notifications in the Segment app. To view your notifications, select the bell next to your user icon in the Segment app. 
5. Click **Save**.

To make changes to a source alert that you created, select the icon in the Actions column for the alert and click **Edit**. 

## Successful delivery rate alerts

You can create an alert that notifies you when the volume of events successfully received by your destination in the last 24 hours falls below a percentage you set. For example, if you set a percentage of 99%, you would be notified if you source had a successful delivery rate of 98% or below. 

To receive a successful delivery rate alert in a Slack channel, you must create a Slack webhook first. For more information about Slack webhooks, see the [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks){:target="_blank”} documentation.

To create a successful delivery rate alert: 
1. Open your workspace and navigate to the [cloud-mode destinations](/docs/connections/destinations/#event-streams-destinations) you'd like to configure alerts for. 
2. Select the Alerts tab and click **Create alert**. 
3. On the Create alert sidesheet, enter a percentage. You will receive events if your successful delivery rate falls below this percentage. 
4. Select one or more channels you'd like to receive alerts in. 
  - **Email**: Select this to receive notifications at either the email address associated with your account or another email address that you enter into this field. 
  - **Slack**: Select this and enter a Slack webhook URL and channel name to send alerts to a channel in your Slack workspace.
  - **In-app**: Select this to receive notifications in the Segment app. To view your notifications, select the bell next to your user icon in the Segment app. 
5. Click **Save**.

To make changes to a source alert that you created, select the icon in the Actions column for the alert and click **Edit**. 

To delete a successful delivery rate alert that you created, select the icon in the Actions column for the alert and click **Delete**. 