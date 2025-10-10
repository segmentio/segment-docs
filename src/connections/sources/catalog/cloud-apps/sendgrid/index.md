---
title: SendGrid Source
id: jhr8dT2yHn
---

[SendGrid](http://sendgrid.com){:target="_blank”} is a trusted platform for transactional email and email marketing. 

Take your company's analysis to the next level by **adding SendGrid as a Source to Segment**. Segment automatically  collects events like `Click` or `Delivered` and objects such as `Recipients` or `Campaigns` and loads them into your data warehouse. 

## Getting started

### Sendgrid API key

Adding SendGrid as a Source in Segment requires a SendGrid API key. If you don't yet have a SendGrid API key, first follow these steps within your SendGrid account:

1.  Log in to your SendGrid account.
2.  Navigate to **Settings > API Keys**, then click **Create API Key**.
3.  Name the key, configure the key permissions, and click **Create & View**.
4.  Make note of the API key as it will not be shown again.

> info "SendGrid API Key settings"
> Segment recommends providing read permissions for **Email Activity** and **Marketing Activity**.

### Set up Sendgrid source 

To add the Sendgrid source to Segment, return to your Segment Workspace and follow these steps:

1. Navigate to **Connections > Catalog**, and search for "Sendgrid".
2. Click the "Sendgrid" source, and click **Add Source**. **Note**: This source only supports warehouses as a destination.
3. Give the source a meaningful name and (optional) add any labels to help you organize and filter your sources. Select all of the Warehouse destinations from the existing connections.
  > info ""
  > Segment recommends that you give your source a name that reflects the source itself as this name populates the schema name. For example, the source name `SendGrid` creates the schema `SendGrid`. You can add multiple instances if you have multiple SendGrid accounts.
4. Add the [SendGrid API Key](#sendgrid-api-key) to connect Sendgrid to Segment. Click **Connect**.
![Screenshot of the Settings page in the setup flow for the Sendgrid source.](images/601347_Key.png)
5. Copy the auto-generated Webhook URL from Segment and paste it in your Sendgrid account. Navigate to **Settings > Mail Settings > Event Webhooks** and create a new event webhook.
![Screenshot of the Webhook page in the setup flow for the Sendgrid source.](images/694785_Webhook.png)
6. Set up **Selective Sync**. You have the options to:
  > 1. **Configure the source sync schedule**. This is how often the data syncs. The default option is every three hours.
  > 2. **Select the start date**. This is the date from which the first sync happens. If left blank, a full sync is initiated.
  > 3. **Select the collections to sync**. The collections that you select will be synced from the start date.
7. Click **Finish** to complete connecting your Sendgrid source to Segment.
8. To set the date from which the sync should start, go to **Settings > Basic Settings**, and configure the start date.
  > info ""
  > Changing the start date after the first sync doesn't change anything unless a full manual sync is initiated.
  >
  > Changing the collections to be synced takes effect after the next sync. The previous data synced for any collection that has been unselected will be in the warehouse.
  >
  > The default value for Source Sync Schedule in 3 hours. To change the sync, schedule send a message to [friends@segment.com@](mailto:friends@segment.com){:target="_blank”}.
9. Toggle **Enable source** on to start syncing data.
10. The first sync begins after you successfully create the source. To review the collections and number of rows synced, go to the **Overview** tab.

### Event URL
SendGrid has a single Event URL location. By using the SendGrid source, you'll use your only Event URL location. If you remove a pre-existing URL, then that location will no longer receive events.

## Components

### Sync

Segment makes requests to the SendGrid API every three hours. In the initial sync, Segment pulls all SendGrid objects (and their corresponding properties) according to the [Collections table](#collections). If you don't use SendGrid's marketing campaigns features (Legacy or New), these collections will be empty in SendGrid and you'll see "Zero data synced" in your runs. The webhook still processes activity data. 

Segment's sync component pulls and forwards SendGrid resources to Segment using an upsert API. As a result, dimensional data loaded into your warehouse reflects the latest state of the corresponding resource in SendGrid.  For example, if `lists.recipient_count` goes from `100` to `200` between syncs, its status will be `200` on its next flush to your warehouse.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources sync with Segment every three hours. Depending on your Warehouses plan, Segment pushes the source data to your warehouse on the interval associated with your billing plan.

> info "SendGrid syncs"
> Segment syncs all objects and properties. [Reach out to support](https://segment.com/help/contact/){:target="_blank”} if you're interested in filtering objects or properties during syncs.

### Streaming

The SendGrid source's streaming component listens in real time for inbound webhooks from SendGrid's Event Notifications. The source batches these events for upload on your next warehouse flush. **These events only append to your warehouse.**

> info ""
> If you don't use SendGrid's marketing features, this will be the only data that Segment receives from SendGrid. There isn't a way to retrieve email event history from SendGrid, so you will only have access to data that Segment collected after you successfully enabled this integration.

## Collections

Collections are the groupings of resources Segment pulls from your source. In your warehouse, each collection gets its own table.

- **Object** collections are updated with each sync. These are pulled using Segment's sync component.
- **Event** collections are append-only, represent a user action or activity, and may be likened to fact tables in a traditional data warehouse. Unlike traditional events captured by Segment, you can't forward these events to destinations you've configured in your Segment workspace. You can only sync these events to a supported data warehouse.


|  Collection | Type | Description |
|  ------ | ------ | ------ |
|  activity | Event | The union of all SendGrid **event** tables. Useful for creating funnels. |
|  _open | Event | Recipient has opened the HTML message. Enable Open Tracking to get this type of event. |
|  click | Event | Recipient clicked on a link within the message. Enable Click Tracking to get this type of event. |
|  bounce | Event | Receiving server could not or would not accept message. |
|  delivered | Event | Message has been successfully delivered to the receiving server. |
|  processed | Event | Triggered when the email is processed. |
|  dropped | Event | You may see the following drop reasons: Invalid SMTPAPI header, Spam Content (if spam checker app enabled), Unsubscribed Address, Bounced Address, Spam Reporting Address, Invalid, Recipient List over Package Quota |
|  deferred | Event | Recipient's email server temporarily rejected message. |
|  unsubscribe | Event | Recipient clicked on message's subscription management link. You need to enable Subscription Tracking for getting this type of event. |
|  mc_contacts | Object | A sample of fifty latest contacts uploaded or linked from the list, returned from [Sendgrid](https://docs.sendgrid.com/api-reference/contacts/get-sample-contacts){:target="_blank"}. **Will only return data if you're using SendGrid's New Marketing Campaign features.** |
|  mc_lists | Object | Lists returned from [Sendgrid Lists endpoint](https://docs.sendgrid.com/api-reference/lists/get-all-lists){:target="_blank"}. **Will only return data if you're using SendGrid's New Marketing Campaign features.**  |
|  mc_single_sends | Object | Single Sends with condensed details about each from [Sendgrid Single Sends endpoint](https://docs.sendgrid.com/api-reference/single-sends/get-all-single-sends){:target="_blank"}. **Will only return data if you're using SendGrid's New Marketing Campaign features.** |
|  spam_report | Event | Recipient marked message as spam. |
|  lists  | Object |  [Groups of contacts](https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/contactdb.html){:target="_blank”}. **Will only return data if you had Legacy Marketing Campaigns data** |
|  segments | Object | [Slices of lists](https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/contactdb.html){:target="_blank”}. **Will only return data if you had Legacy Marketing Campaigns data** |
|  recipients | Object | All contacts who have received an email, with information about their last activities and custom activities. [More Info](https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/contactdb.html){:target="_blank”}.  **Will only return data if you had Legacy Marketing Campaigns data** |
|  campaigns | Object | All campaigns you've created in SendGrid. [More Info](https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/campaigns.html){:target="_blank”}.  **Will only return data if you had Legacy Marketing Campaigns data** |

## Troubleshooting

#### Invalid credentials error

If you're getting an "Invalid Credentials" error when setting up the SendGrid source, send a direct ping to the [SendGrid Marketing Campaigns API](https://sendgrid.com/docs/API_Reference/Web_API_v3/Marketing_Campaigns/campaigns.html){:target="_blank”} to test if you're using the correct credentials.

Make sure you allowlist Segment IP addresses on SendGrid. [Contact Segment](https://segment.com/help/contact/){:target="_blank”} for the list of IP addresses to allowlist.

#### Webhook configuration

When you disable your SendGrid source, you also need to disable the webhook portion of your configuration.

If you are only able to create one webhook, review your SendGrid [account plan details](https://sendgrid.com/en-us/pricing). On the Sendgrid free plan, you can only have one webhook.

#### Zero data or partial data syncs

If you haven't subscribed to SendGrid’s marketing campaign features, the object collections do not sync. As a result, you might see “Zero data synced” in your runs on Source Overview page. If you have only selected a few objects to be synced, then only those objects are synced and show up in the Source Overview. 

In both cases, the webhook still processes event data and syncs it to the warehouse. To view the data synced to the warehouse, navigate to **Connections > Destinations**, select the relevant warehouse destination, and then select the source schema.
