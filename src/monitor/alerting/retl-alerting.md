--- 
title: Reverse ETL Alerting
---

You can opt in to receive email, Slack, and in-app alerts about Reverse ETL sync failures and fluctuations in the volume of events successfully delivered to your mapping.

The notification channels that you select for one alert will apply to all alerts in your workspace.

> info "Deleting alerts created by other users requires Workspace Owner role" 
> All users can delete alerts that they created, but only those with [Workspace Owner role](http:///docs/segment-app/iam/roles/) can delete alerts created by other users.

### Failed or partially successful syncs

To subscribe to alerts for a failed or partially successful sync:

1. Navigate to **Settings \> User Preferences**.  
2. Select **Reverse ETL** in the **Activity Notifications** section.  
3. Click the Reverse ETL sync status that you'd like to receive notifications for. You can select one or more of the following sync statuses:  
   - **Reverse ETL sync failed**: Receive a notification when your Reverse ETL sync fails.  
   - **Reverse ETL sync partial success**: Receive a notification when your Reverse ETL sync is partially successful.  
4. Select one or more of the following alert options:  
   - **Enable email notifications**: Enter an email address or alias that should receive alerts.  
   - **Enable Slack notifications**: Enter a webhook URL and Slack channel name.  
   - **Enable in-app notifications**: Select this option to see an in-app notification.  
5. Click **Create alert**.

success "" If you opted to receive notifications by email, you can click **View active email addresses** to see the email addresses that are currently signed up to receive notifications.

### Mapping-level successful delivery rate fluctuations

You can create an alert that notifies you when the volume of events successfully received by your mapping in the last 24 hours falls below a percentage you set. For example, if you set a percentage of 99%, Segment notifies you if your destination had a successful delivery rate of 98% or below.

To receive a successful delivery rate fluctuation alert in a Slack channel, you must first create a Slack webhook. For more information about Slack webhooks, see Slack's [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks){:target="\_blank”} documentation.

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