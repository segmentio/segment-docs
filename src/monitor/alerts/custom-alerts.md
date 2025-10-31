---
title: Custom Alerts
---

Segment's custom alerts allow you to customize the sensitivity of the trigger that activates an alert so you can more accurately detect event volume fluctuations in your integrations.

![A screenshot of the custom alerts tab for a Segment workspace depicting three different source volume alerts with different integrations and thresholds.](/docs/monitor/images/custom-alerting.png)

You can create alerts for the following product areas: 
- [Sources](#source-volume-alert)
- [Destinations](#successful-delivery-rate-alert)
- [Reverse ETL](#mapping-level-successful-delivery-rate-fluctuations)
- [Twilio Engage](#activation-event-health-spikes-or-drops)

The Alerting table includes the following information about each alert: 
- **Alert name**: The type of alert; for example, "Source volume" or "Successful delivery rate".
- **Threshold**: The volume of event fluctuation, represented as a change percentage, at which point you'd like to be notified.  
- **Source**: The source that's sending your data downstream.
- **Destination**: The destination receiving your data. 
- **Created by**: The name of the user that created the alert and the date the alert was created.
- **Status**: Either **enabled**, if the alert is currently configured in your workspace, or **disabled**, if you're not configured to receive alerts for an event.
- **Notification channels**: Icons describing what notification channels you'll receive the alerts on - through a Slack webhook, Slack workflow, email, or in-app notification.
- **Actions**: By selecting the menu icon for an individual alert, you can edit or delete it from the Alerting page. Only users with the Workspace Owner role can delete alerts created by other users.

## Alert prerequisites

First, create webhooks or notification services in the tools you use as notification channels, then return to the Segment app to set up your alert.

### Set up your notification tools

The following tools require prerequisite setup before you can use them as notification channels: 

- **Slack**: You must create a Slack webhook before setting up an alert in the Segment app. For more information, see Slack's [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks){:target="_blank”} documentation.
- **Email (optional)**: While you can only enter one email address at a time when signing up for email alerts, you can send the alert to multiple users by entering the email address of a mailing list. To create a mailing list, refer to the documentation for your email provider, like Google's [Create a group & choose group settings](https://support.google.com/groups/answer/2464926?hl=en){:target="_blank”} for Gmail or Microsoft's [Create and manage distribution groups](https://support.microsoft.com/en-us/office/distribution-groups-e8ba58a8-fab2-4aaf-8aa1-2a304052d2de#bkmk_create){:target="_blank”} for Outlook. 
- **PagerDuty**: You must create an integration key in PagerDuty before setting up an alert in the Segment app. 

To create a PagerDuty integration key: 

1. Open PagerDuty and navigate to **Services > Service Directory**.
2. Select the service that you'd like to send incidents to. 
3. Under Integrations, select **Add Integration**.
4. Select **Events API v2**.
5. PagerDuty displays a 32-character integration key.

## Create alerts

Once you've set up your notification services, return to the Segment app to create an alert. 

### Source volume alert
You can create an alert that notifies you when the volume of events received by your source in the last 24 hours changes beyond a threshold you set. For example, if you set a threshold of 4% and your source received 100 events over the first 24 hours, Segment would notify you the following day if your source ingested fewer than 96 or more than 104 events.

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

### Successful delivery rate alert

You can create an alert that notifies you when the volume of events successfully received by your destination in the last 24 hours falls below a threshold you set. For example, if you set a threshold of 99%, Segment notifies you if your destination had a successful delivery rate of 98% or below. 

To create a successful delivery rate alert: 
1. Navigate to the [cloud-mode destinations](/docs/connections/destinations/#:~:text=Cloud%2Dmode%3A%20The%20sources%20send%20data%20directly%20to%20the%20Segment%20servers%2C%20which%20then%20translate%20it%20for%20each%20connected%20downstream%20destination%2C%20and%20send%20it%20on.) you'd like to configure alerts for. 
2. Select the Alerts tab and click **Create alert**. 
3. On the Create alert sidesheet, enter a percentage. You will receive events if your successful delivery rate falls below this threshold. 
4. Select one of the following alert channels:
  - **Email**: Select this to receive notifications at one email address. 
  - **Slack**: Select this and enter a Slack webhook URL and channel name to send alerts to a channel in your Slack workspace.
  - **In-app**: Select this to receive notifications in the Segment app. To view your notifications, select the bell next to your user icon in the Segment app. 
5. Click **Save**.


### Mapping-level successful delivery rate fluctuations

You can create an alert that notifies you when the volume of events successfully received by your mapping in the last 24 hours falls below a threshold you set. For example, if you set a threshold of 99%, Segment notifies you if your destination had a successful delivery rate of 98% or below. 

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

### Activation event health spikes or drops

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

### Audience size change
You can create an Audience size change alert that notifies you when your audience increases or decreases by a certain threshold. For example, if you set a change percentage of 4% and your destination had 100 members over the first 24 hours, Segment would notify you the following day if your audience had fewer than 96 or more than 104 members.

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