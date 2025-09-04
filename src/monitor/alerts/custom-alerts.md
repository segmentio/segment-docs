---
title: Custom Alerts
---

Segment's custom alerts allow you to customize the sensitivity of the trigger that activates an alert so you can more accurately detect event volume fluctuations in your integrations.

> info "Public beta"
> The Monitor hub is in Public Beta. Some functionality may change before it becomes generally available.

![A screenshot of the custom alerts tab for a Segment workspace depicting three different source volume alerts with different integrations and thresholds.](/docs/monitor/images/custom-alerting.png)

You can create alerts for the following product areas: 
- [Sources](#source-volume-alert)
- [Destinations](#successful-delivery-rate-alert)
- [Reverse ETL](#mapping-level-successful-delivery-rate-fluctuations)
- [Twilio Engage](#activation-event-health-spikes-or-drops)

## Source volume alert
You can create an alert that notifies you when the volume of events received by your source in the last 24 hours changes beyond a threshold you set. For example, if you set a threshold of 4% and your source received 100 events over the first 24 hours, Segment would notify you the following day if your source ingested fewer than 96 or more than 104 events.

To receive a source volume alert in a Slack channel, you must first create a Slack webhook. For more information about Slack webhooks, see the [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks){:target="_blank”} documentation.

<img src="/docs/connections/images/alerting-source-alert.png" alt="A screenshot of the Source Volume alert creation sidesheet." width="470px" height="540px">

To create a source volume alert: 
1. In your workspace, navigate to Connections, select Sources, and select the Event streams tab. 
2. Select the [event streams source](/docs/connections/sources/#event-streams-sources) you'd like to configure alerts for. 
2. Select the Alerts tab and click **Create alert**. 
3. On the Create alert sidesheet, enter a percentage of source volume change that you'd like to be notified for. 
4. Select one or more of the following alert channels:
  - **Email**: Select this to receive notifications at the provided email address. 
  - **Slack**: Select this to send alerts to one or more channels in your workspace. 
  - **In-app**: Select this to receive notifications in the Segment app. To view your notifications, select the bell next to your user icon in the Segment app. 
5. Click **Save**.

To make changes to a source volume alert, select the icon in the Actions column for the alert and click **Edit**. 

To delete a source volume alert, select the icon in the Actions column for the alert and click **Delete**.

> info "Deleting alerts created by other users requires Workspace Owner permissions"
> All users can delete source volume alerts that they created, but only those with Workspace Owner permissions can delete alerts created by other users. 

## Successful delivery rate alert

You can create an alert that notifies you when the volume of events successfully received by your destination in the last 24 hours falls below a threshold you set. For example, if you set a threshold of 99%, Segment notifies you if your destination had a successful delivery rate of 98% or below. 

To receive a successful delivery rate alert in a Slack channel, you must first create a Slack webhook. For more information about Slack webhooks, see the [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks){:target="_blank”} documentation.

To create a successful delivery rate alert: 
1. Navigate to the [cloud-mode destinations](/docs/connections/destinations/#:~:text=Cloud%2Dmode%3A%20The%20sources%20send%20data%20directly%20to%20the%20Segment%20servers%2C%20which%20then%20translate%20it%20for%20each%20connected%20downstream%20destination%2C%20and%20send%20it%20on.) you'd like to configure alerts for. 
2. Select the Alerts tab and click **Create alert**. 
3. On the Create alert sidesheet, enter a percentage. You will receive events if your successful delivery rate falls below this threshold. 
4. Select one of the following alert channels:
  - **Email**: Select this to receive notifications at either the email address associated with your account or another email address that you enter into this field. 
  - **Slack**: Select this and enter a Slack webhook URL and channel name to send alerts to a channel in your Slack workspace.
  - **In-app**: Select this to receive notifications in the Segment app. To view your notifications, select the bell next to your user icon in the Segment app. 
5. Click **Save**.

To make changes to a successful delivery rate alert, select the icon in the Actions column for the alert and click **Edit**. 

To delete a successful delivery rate alert, select the icon in the Actions column for the alert and click **Delete**. 

## Mapping-level successful delivery rate fluctuations

You can create an alert that notifies you when the volume of events successfully received by your mapping in the last 24 hours falls below a threshold you set. For example, if you set a threshold of 99%, Segment notifies you if your destination had a successful delivery rate of 98% or below. 

To receive a successful delivery rate fluctuation alert in a Slack channel, you must first create a Slack webhook. For more information about Slack webhooks, see Slack's [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks){:target="_blank”} documentation.

![A screenshot of the Alerts tab for a Mapping, with the new mapping sidesheet partially filled out.](/docs/connections/reverse-etl/images/mapping-alerting.jpeg)

To subscribe to alerts for successful delivery fluctuations at the mapping level: 
1. Navigate to your intended mapping and select the **Alerts** tab. 
2. Click **Create alert**. 
3. Set an *alert threshold*, or the percentage of successfully delivered events that would prompt an alert. 
4. Select one or more of the following notification channels: 
    - **Email**: Enter an email address or alias that should receive alerts.
    - **Slack notification**: Enter a Webhook URL and a Slack channel name to receive alerts in a Slack channel. 
    - **In-app notifications**: Select this to receive notifications in the Segment app. To view your notifications, select the bell next to your user icon in the Segment app.
5. Toggle the **Enable alert** setting on and click **Create**. 

To edit or disable your alert, navigate to your mapping's Alerts tab and select the Actions menu for the alert you'd like to edit.  

## Activation event health spikes or drops

You can create an Activation event health spikes or drops alert that notifies you when events sent from your audience to a downstream destination have failures to a destination above a certain threshold. For example, if you set a threshold of 4% and your destination received 100 events from your Audience over the first 24 hours, Segment would notify you the following day if your destination ingested fewer than 96 or more than 104 events.

To create an Activation event health spikes or drops alert: 
1. From your Segment workspace's home page, navigate to **Engage > Audiences**. 
2. Select the Audience you want to create an alert for, select the Alerts tab, and click **Create alert**. 
3. On the Create alert sidesheet, select the destination for which you'd like to monitor event health. 
4. Enter a percentage threshold to trigger activation event health notifications. 
5. Select one or more of the following alert channels:
  - **Email**: Select this to receive notifications at the provided email address. 
  - **Slack**: Select this to send alerts to one or more channels in your workspace. 
  - **In-app**: Select this to receive notifications in the Segment app. To view your notifications, select the bell next to your user icon in the Segment app. 
6. Click **Save**.

To make changes to an Activation event health spikes or drops alert, select the icon in the Actions column for the alert and click **Edit**. 

To delete a Activation event health spikes or drops alert, select the icon in the Actions column for the alert and click **Delete**.

## Audience size change
You can create an Audience size change alert that notifies you when your audience increases or decreases by a certain threshold. For example, if you set a change percentage of 4% and your destination had 100 members over the first 24 hours, Segment would notify you the following day if your audience had fewer than 96 or more than 104 members.

> info "Audience size change alerts currently only support Linked Audiences"
> Audience size change alerts are in public beta, and Segment is actively working on this feature. During the public beta, Audience size change alerts only support Linked Audiences. Some functionality may change before it becomes generally available.

To create an Audience size change alert:

1. From your Segment workspace’s home page, navigate to **Engage > Audiences**.
2. Select the Linked Audience you want to create an alert for, select the Alerts tab, and click **Create alert**.
3. On the Create alert sidesheet, select the Audience size change alert and pick a destination for which you’d like to monitor event health.
4. Enter a percentage threshold to trigger audience size change notifications.
5. Select one or more of the following alert channels:
  - **Email**: Select this to receive notifications at the provided email address.
  - **Slack**: Select this to send alerts to one or more channels in your workspace. You can post messages to your channel with either a webhook or a workflow.
  - **In-app**: Select this to receive notifications in the Segment app. To view your notifications, select the bell next to your user icon in the Segment app.
6. Click **Save**.

To make changes to an Audience size change alert, select the icon in the Actions column for the alert and click **Edit**.

To delete a Audience size change alert, select the icon in the Actions column for the alert and click **Delete.**