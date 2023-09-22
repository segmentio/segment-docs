---
title: Broadcasts
plan: engage-premier
redirect_from:
  - "/engage/campaigns/broadcasts"
---

Broadcasts are one-time email or SMS campaigns that you can send with Twilio Engage. Use broadcasts for single, one-off occasions like the following:

- **Special events**, like webinars or conferences
- **Offers**, like product discount codes
- **Newsletters** that you want to send on a specific date

For more on the different types of Engage campaigns, read [Audiences, Journeys, and Broadcasts](/docs/guides/audiences-and-journeys/).

On this page, you'll find step by step instructions for how to create a broadcast, as well as information on broadcast best practices and analytics.

## Create and send an email broadcast

Follow these steps to create an email broadcast:

1. Navigate to **Engage > Broadcasts**, then click **+ Create broadcast**. 
2. From the **New broadcast** page, choose **Email**.
3. Add a name and description, then click **Choose recipients**.
4. Click **Add condition** to add users who will receive your campaign, then click **Build**.
    - To send a message to a pre-built audience, choose `Part of an Audience`, then select the audience.
    - To exclude users from the audience, click **Add condition** in the **And who** section. Click **And who**, then select **And not who**. Segment will exclude users from the audience you choose.
5. Click **Preview** to estimate the audience size.
6. Select the subscription group that you want to receive your broadcast.
    - Segment recommends only sending broadcasts to users with a subscribed status. 
7. Select **Build**, then choose either **Build a new email** or select a template.
8. Fill out the **Email settings** fields, choose your email editor, then click **Continue**.
9. Configure your email, then click **Continue**.
10. On the **Review and schedule** page, confirm your broadcast's settings.
11. Schedule your broadcast:
    - To send your broadcast immediately, select **Send now**, then click **Send now ->**. Confirm a final time by clicking **Send** in the popup.
    - To send your broadcast later, select **Schedule**, then enter the date, time, and time zone for your scheduled broadcast. Click **Schedule ->**, then confirm by clicking **Schedule** in the **Schedule message** popup.

> info ""
> Segment recommends sending email broadcasts to users with a `subscribed` status. However, if you need to send an email broadcast to someone who hasn't subscribed, you can configure an email to [send to all users](/docs/engage/campaigns/email-campaigns/#send-an-email-to-all-users/).

## Create and send an SMS broadcast

Follow these steps to create an email broadcast:

1. Navigate to **Engage > Broadcasts**, then click **+ Create broadcast**. 
2. From the **New broadcast** page, choose **SMS**.
3. Add a name and description, then click **Choose recipients**.
4. Click **Add condition** to add users who will receive your campaign, then click **Build**.
    - To send a message to a pre-built audience, choose `Part of an Audience`, then select the audience.
    - To exclude users from the audience, click **Add condition** in the **And who** section. Click **And who**, then select **And not who**. Segment will exclude users from the audience you choose.
5. Click **Preview** to estimate the audience size.
7. Select **Build**.
8. Choose a messaging service, enter your message into the body field, and add any merge tags. 
    - (Optional:) Test your SMS.
    - Include opt out instructions; your SMS broadcast must contain `Reply STOP to unsubscribe`.
9. Test your SMS, then select **Review and schedule**.
8. On the **Review and schedule** page, confirm your broadcast's settings.
9. Schedule your broadcast:
    - To send your broadcast immediately, select **Send now**, then click **Send now ->**. Confirm a final time by clicking **Send** in the popup.
    - To send your broadcast later, select **Schedule**, then enter the date, time, and time zone for your scheduled broadcast. Click **Schedule ->**, then confirm by clicking **Schedule** in the **Schedule message** popup.

### Cancel a scheduled broadcast

Follow these steps to cancel a scheduled broadcast:

1. Navigate to **Engage > Broadcasts > Scheduled**. 
2. Select the scheduled broadcast you want to cancel.
3. From the broadcast overview tab, click **Unschedule**.
4. In the popup, click **Unschedule** to confirm.

Unscheduled broadcasts revert to draft status and can be found under the Drafts tab of the Broadcasts page.
 
## Working with broadcasts

Keep the following information in mind as you work with broadcasts.

### SMS segments

SMS broadcasts longer than 160 characters are split into segments and then joined together by the recipient's device. As a result, you can send SMS broadcasts longer than 160 characters, but each 160-character segment is billed individually. 

For more on message segments, view [SMS character limits](https://www.twilio.com/docs/glossary/what-sms-character-limit){:target="_blank"}.

### Email template limits

The total size of your email, including attachments, must be less than 30MB.

To learn more, view SendGrid's [email limits](https://docs.sendgrid.com/api-reference/mail-send/limitations#:~:text=The%20total%20size%20of%20your,must%20no%20more%20than%201000.){:target="_blank"}.

### Scale and throughput

The following table lists geographic availability, scale, and speed details for email and SMS broadcasts:

| Broadcast type        | Availability   | Throughput            |
| --------------------- | -------------- | --------------------- |
| Email                 | US and EU      | 5 million per hour    |
| SMS short code        | US, Canada, UK | 360,000 per hour      |
| SMS long code (10DLC) | US, Canada     | Trust-score dependent |


Long-code message throughput depends on a number of factors, including your [10DLC trust score](https://support.twilio.com/hc/en-us/articles/1260803225669-Message-throughput-MPS-and-Trust-Scores-for-A2P-10DLC-in-the-US){:target="_blank"}. 

Segment recommends that you use short code phone numbers for SMS broadcasts sent to more than 5000 recipients.

## Broadcast analytics

Segment provides analytics for each broadcast. By selecting a sent broadcast from the broadcasts list, you can view both high-level performance metrics and granular insights on what actions individual recipients have taken on the Broadcast campaign.

Engage powers analytics for both email and SMS broadcasts. For more information on Engage analytics, view [Analytics Overview](/docs/engage/analytics/).

## Review sent broadcasts 

To view information for a sent broadcast, navigate to **Engage > Broadcasts**, and select a broadcast from the broadcasts list.

### Content tab

The content tab shows the message content and email or SMS settings that you configured for the broadcast.

### Recipients tab

Segment maintains a recipients list for broadcasts. The recipients list lets you filter through several analytics statuses. Selecting an individual profile from the recipients list opens a preview pane with that profile's details.

### Settings tab

The settings tab shows your broadcast's setup info, the recipient audience and its subscription status, as well as the broadcast's scheduled time.

On the settings tab, you can also find the broadcast's campaign key, which you can use to reference the broadcast. For example, you can use the campaign key to create an audience for future targeting or to create a suppression list of recipients you don't want to receive future broadcasts. 