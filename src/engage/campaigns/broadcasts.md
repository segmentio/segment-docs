---
title: Broadcasts
plan: engage-premier
---

> info ""
> Broadcasts are in public beta.

Broadcasts are one-time email or SMS campaigns that you can send with Twilio Engage. Use broadcasts for single, one-off occasions like the following:

- **Special events**, like webinars or conferences
- **Offers**, like product discount codes
- **Newsletters** that you want to send on a specific date

For more on the different types of Engage campaigns, read [Audiences, Journeys, and Broadcasts](/docs/guides/audiences-and-journeys/).

On this page, you'll find step by step instructions for how to create a broadcast.

## Create and send an email broadcast

Follow these steps to create an email broadcast:

1. Navigate to **Engage > Broadcasts**, then click **+ Create broadcast**. 
2. From the **New broadcast** page, choose **Email**.
3. Add a name and description, then click **Choose recipients**.
4. Click **Add condition** to add users who will receive your campaign, then click **Build**.
    - To send a message to a pre-built audience, choose `Part of an Audience`, then select the audience.
5. Select **Build a new email** or use an email template, then click **Continue**.
6. Fill out the **Email settings** fields, choose your email editor, then click **Continue**.
7. Configure your email, then click **Continue**.
8. On the **Review and schedule** page, confirm your broadcast's settings.
9. Schedule your broadcast:
    - To send your broadcast immediately, select **Send now**, then click **Send now ->**. Confirm a final time by clicking **Send** in the popup.
    - To send your broadcast later, select **Schedule**, then enter the date, time, and time zone for your scheduled broadcast. Click **Schedule ->**, then confirm by clicking **Schedule** in the **Schedule message** popup.


## Create and send an SMS broadcast

Follow these steps to create an email broadcast:

1. Navigate to **Engage > Broadcasts**, then click **+ Create broadcast**. 
2. From the **New broadcast** page, choose **SMS**.
3. Add a name and description, then click **Choose recipients**.
4. Click **Add condition** to add users who will receive your campaign, then click **Build**.
    - To send a message to a pre-built audience, choose `Part of an Audience`, then select the audience.
5. Select **Build a new SMS** or use an SMS template, then click **Continue**.
6. Choose a messaging service, enter your message into the body field, and add any merge tags. 
7. Test your SMS, then select **Review and schedule**.
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

### Email Templates Limits

The total size of your email, including attachments, must be less than 30MB.

For more on email limits, view [Email Limits](https://docs.sendgrid.com/api-reference/mail-send/limitations#:~:text=The%20total%20size%20of%20your,must%20no%20more%20than%201000.){:target="_blank"}.

### Scale and throughput

The following table lists geographic availability, scale, and speed details for email broadcasts and [short code SMS](https://support.twilio.com/hc/en-us/articles/223182068-What-is-a-Messaging-Short-Code-){:target="_blank"} broadcasts:

| Broadcast type | Availability                            | Throughput                                                                 |
| -------------- | --------------------------------------- | -------------------------------------------------------------------------- |
| Email          | All countries where Engage is available | 1 million per hour                                                         |
| SMS short code | US, Canada, UK                          | 360,000 per hour                                                            |

Long-code message throughput depends on a number of factors, including your [10DLC trust score](https://support.twilio.com/hc/en-us/articles/1260803225669-Message-throughput-MPS-and-Trust-Scores-for-A2P-10DLC-in-the-US){:target="_blank"}. 

Segment recommends that you use short code phone numbers for SMS broadcasts sent to more than 5000 recipients.

## Broadcast analytics

Engage tracks analytics for both email and SMS broadcasts. For more information on Engage analytics, view [Analytics Overview](/docs/engage/analytics/).
