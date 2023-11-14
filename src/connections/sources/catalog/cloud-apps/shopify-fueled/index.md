title: Shopify - Powered by Fueled
---

[Fueled](https://fueled.io){:target="_blank"} is a 1st-party Attribution Suite, designed specifically for eCommerce. Fueled collects all of the first-party and zero-party events that fire on a Shopify website, and sends them to Segment. Fueled leverages a combination of "client-side" and "server-side" event tracking to provide reliable, accurate event tracking in Segment. Fueled tracks "offline purchase events, such as point-of-sale orders and subscription rebilling events triggered by apps like ReCharge Payments, Smartrr, Bold Subscritions, and Skio.

With Fueled, Shopify merchants can implement Segment event tracking in minutes — without writing any code.

This integration is maintained by[Fueled](https://fueled.io){:target="_blank"}. [Contact the Fueled Support team](mailto:support@fueled.io) with any questions.

## Getting started

Installing Fueled's Shopify integration for Segment is a 2-step process:

### Adding the "Shopify - Powered by Fueled" Source in Segment

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "Shopify - Powered by Fueled" in the Sources Catalog, select "Shopify - Powered by Fueled", and click **Add Source**.
3. On the next screen, give the Source a nickname.
4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.

### Enabling the "Fueled Attribution Suite" in Shopify

1. **Log in** to your Shopify Store account.
2. Go the [Shopify app store listing](https://apps.shopify.com/fueled-attribution-suite){:target="_blank”} for ***Fueled Attribution Suite***.
3. Click **Add app** to install the Fueled Attribution Suite.
4. Within the Fueled App in the Shopify Admin UI, click into the **Plans** tab and choose the **Fueled Advanced Plan**.
5. Once you have confirmed your Fueled Advanced Plan, go to the **Segment** tab and add 
6. Add the Segment Write key for the source that is going to send data in the **Segment Writekey** field form.
7. Configure client-side and server side tracking settings in the **Tracking Setup** tab.

## Stream

> (delete after reading) Clarify the type of Segment events your integration will send. 

<integration_name> uses our stream Source component to send Segment event data. It uses a server-side (select from `track`, `identify`, `page`, `group`) method(s) to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

> (delete after reading) Clarify how your integration includes user identifiers in your event payloads, the example below is from Klaviyo:

The default behavior is for Klaviyo to pass the userId associated with the email recipient as the userId. There are cases in which Klaviyo does not have an associated userId, in which case the email address will be passed in as the anonymousId.

> (delete after reading) For each of the below sections, populate the event and properties that a customer would expect to receive in their downstream tools from your Event Source.

## Events

The table below lists events that <integration_name> sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. <integration_name> includes the `userId` if available.

| Event Name         | Description                           |
| ------------------ | ------------------------------------- |
| Email Sent         | Email was sent successfully           |
| Email Opened       | Prospect opened the email             | 
| Link Clicked       | Prospect clicked the tracking link    | 
| Email Replied      | Prospect replied to email sent        | 
| Email Bounced      | Email servers rejected the email      | 
| Email Unsubscribed | Prospect clicked the unsubscribe link | 


## Event Properties

The table below list the properties included in the events listed above.

| Property Name   | Description               |
| --------------- | ------------------------- |
| `event`         | Email event type          |
| `userId`        | Prospect user ID          |
| `email_id`      | ID of the email           |
| `from_id`        | Sender email ID           |
| `email_subject` | Subject line of the email |
| `link`          | URL of the link clicked   |
 

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Fueled support team](mailto:support@fueled.io).
