---
title: Sendgrid Source
---

{% include content/source-region-unsupported.md %}

SendGrid is a trusted platform for transactional email and email marketing. [Visit Website](http://sendgrid.com)

Take your company's analysis to the next level by **adding Sendgrid as a Source to Segment.** Segment automatically  collects events like `Click` or `Delivered` and objects such as `Recipients` or `Campaigns` and load them into your data warehouse. 

## Getting Started

1. From the [Source catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) in your Segment workspace, enter "Sendgrid" and select the Sendgrid source that appears.
2. From the Sendgrid information panel that appears, click **Add source**.

3. Give the Source a name and add any labels to help you organize and filter your sources. 
   You can give the source any name, but Segment recommends a name that reflects the source itself, as this name autopopulates the schema name. For example, the source name  `Sendgrid` creates the schema `sendgrid`. You can add multiple instances if you have multiple SendGrid accounts.

4. Provide your API Key.  In order to pull information about your contacts, we'll make requests to SendGrid's API with our [sync component](#sync).  You can create an API Key by navigating to **Settings > API Keys**, clicking **General API Key**.

  You will then be prompted to name that key and given the option to adjust the settings.  We recommend providing read permissions for **Email Activity** and **Marketing Activity**.

6. Finally, copy the resulting API Key into the Segment interface, taking care to trim any errant trailing spaces from copying and pasting, and press connect.

  ![](images/601347_Key.png)

7. Copy the auto-generated Webhook URL and paste it into SendGrid's Event Notification settings pane under **Settings > Mail Settings**.

  ![](images/694785_Webhook.png)

8. Once you enable the Event Notification, you're good to go! Press **Next**, and then **Finish** to wrap up the set up flow.

### Event URL

SendGrid has a single Event URL location. By using the SendGrid source, you will be using your only Event URL location. If you remove a pre-existing URL, then that location will no longer receive events.

## Components

### Sync

SendGrid has a sync component, which means we'll make requests to their API on your behalf on a 3 hour interval to pull the latest data into Segment. In the initial sync, we'll grab all the SendGrid objects (and their corresponding properties) according to the [Collections Table](#collections) below. **Note**: If you don't use Sendgrid's marketing campaigns features, these collections will be empty in Sendgrid and you'll see "Zero data synced" in your runs. The webhook will still be processing activity data (but only activity data) for you though!

Our sync component gets resources from SendGrid and forwards them to Segment using an upsert API, so the dimensional data in your warehouse loaded will reflect the latest state of the corresponding resource in SendGrid.  For example, if `lists.recipient_count` goes from `100` to `200` between syncs, on its next flush to your warehouse, that tickets status will be  `200`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources will sync with Segment every 3 hours. Depending on your Warehouses plan, we will push the Source data to your warehouse on the interval associated with your billing plan.

At the moment, we don't support filtering which objects or properties get synced. If you're interested in this feature, [let us know](https://segment.com/help/contact/)!


### Streaming

The SendGrid source also has a streaming component which listens in real time for inbound webhooks from SendGrid's Event Notifications and batches the events to be uploaded on your next warehouse flush. **These events only append to your warehouse.**

> note ""
> **NOTE:** If you don't use SendGrid's marketing features, this will be the only data that Segment receives from SendGrid. There isn't a way to retrieve email event history from SendGrid, so you will only have access to data that Segment collected after you successfully enable this component of the source destination.


## Collections

Collections are the groupings of resources we pull from your source. In your warehouse, each collection gets its own table.

**Object** collections are updated with each sync. These are pulled using Segment's sync component.

**Event** collections are append only, represent a user action or activity, and may be likened to fact tables in a traditional data warehouse. **Note:** Unlike traditional events captured by Segment, you can't forward these events to Destinations you've configured in your Segment workspace. You can only sync these events to a supported data warehouse.


|  Collection | Type | Description |
|  ------ | ------ | ------ |
|  activity | Event | The union of all SendGrid **event** tables. Useful for creating funnels |
|  _open | Event | Recipient has opened the HTML message. You need to enable Open Tracking for getting this type of event. |
|  click | Event | Recipient clicked on a link within the message. You need to enable Click Tracking for getting this type of event. |
|  bounce | Event | Receiving server could not or would not accept message. |
|  delivered | Event | Message has been successfully delivered to the receiving server. |
|  processed | Event | Triggered when the email is processed |
|  dropped | Event | You may see the following drop reasons: Invalid SMTPAPI header, Spam Content (if spam checker app enabled), Unsubscribed Address, Bounced Address, Spam Reporting Address, Invalid, Recipient List over Package Quota |
|  deferred | Event | Recipient's email server temporarily rejected message. |
|  unsubscribe | Event | Recipient clicked on message's subscription management link. You need to enable Subscription Tracking for getting this type of event. |
|  spam_report | Event | Recipient marked message as spam. |
|  lists | Object | [Groups of contacts](https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/contactdb.html). **Will only return data if you're using Marketing Campaign features of SendGrid.** |
|  segments | Object | [Slices of lists](https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/contactdb.html). **Will only return data if you're using Marketing Campaign features of SendGrid.** |
|  recipients | Object | All contacts who have received an email, with information about their last activities and custom activities. [More Info](https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/contactdb.html).  **Will only return data if you're using Marketing Campaign features of SendGrid.** |
|  campaigns | Object | All campaigns you've created in Sendgrid. [More Info](https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/campaigns.html).  **Will only return data if you're using Marketing Campaign features of SendGrid.** |

## Troubleshooting 

If you're getting an "Invalid Credentials" error when setting up the SendGrid source, send a direct ping to the [SendGrid Marketing Campaigns API](https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/campaigns.html) to test if you're using the correct credentials.

Make sure you whitelist the Segment IP addresses on Sendgrid. [Contact Segment](https://segment.com/help/contact/) for the list of IP addresses to whitelist.
