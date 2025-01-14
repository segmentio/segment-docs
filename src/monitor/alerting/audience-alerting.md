---
title: Audience Alerting
---

Create alerts related to the performance and throughput of Audience syncs and receive in-app, email, and Slack notifications when event volume fluctuations occur. 

To access Audience alerting, navigate to **Engage > Audiences**, select an Audience, and click the Alerts tab.

On the Alerts tab, you can create new alerts and view all active alerts for this connection. You can only edit or delete the alerts that you create, unless you have the [Workspace Owner role](/docs/segment-app/iam/roles/).

info "Generate a Slack webhook to receive Slack notifications" To receive an alert in a Slack channel, you must first create a Slack webhook. For more information about Slack webhooks, see Slack's [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks){:target="_blank”} documentation.

To access Audience alerting, navigate to **Engage \> Audiences**, select an Audience, and click the Alerts tab.

On the Alerts tab, you can create new alerts and view all active alerts for this connection. You can only edit or delete the alerts that you create, unless you have the [Workspace Owner role](/docs/segment-app/iam/roles/).

## Activation event health spikes or drops

You can create an Activation event health spikes or drops alert that notifies you when events sent from your audience to a downstream destination have failures to a destination above a certain threshold. For example, if you set a change percentage of 4% and your destination received 100 events from your Audience over the first 24 hours, Segment would notify you the following day if your destination ingested fewer than 96 or more than 104 events.

To create an Activation event health spikes or drops alert:

1. From your Segment workspace's home page, navigate to **Engage \> Audiences**.  
2. Select the Audience you want to create an alert for, select the Alerts tab, and click **Create alert**.  
3. On the Create alert sidesheet, select the destination for which you'd like to monitor event health.  
4. Enter a percentage of activation event health that you'd like to be notified for.  
5. Select one or more of the following alert channels:  
- **Email**: Select this to receive notifications at the provided email address.  
- **Slack**: Select this to send alerts to one or more channels in your workspace.  
- **In-app**: Select this to receive notifications in the Segment app. To view your notifications, select the bell next to your user icon in the Segment app.  
6. Click **Save**.

To make changes to an Activation Activation event health spikes or drops alert, select the icon in the Actions column for the alert and click **Edit**.

To delete an Activation Activation event health spikes or drops alert, select the icon in the Actions column for the alert and click **Delete**.