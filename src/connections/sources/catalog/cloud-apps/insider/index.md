---
title: Insider Source
id: pNvQ9udVMy
---

[Insider](https://useinsider.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners){:target="_blank”} Growth Management Platform (GMP) helps digital marketers drive growth across the funnel. Insider GMP helps marketers deliver personalized journeys across the web, mobile web, mobile apps, messaging, email, and ad channels using the unified data.

Take your company’s marketing analysis to the next level by adding Insider as a Source to Segment. Insider will automatically collect cross-channel messaging channel events like `Email Clicked`, `App Push Opened` and `SMS Clicked`, forward them to your destinations and load them into your data warehouse.

This source is maintained by Insider. For any issues with the source,[contact Insider Support team](mailto:pst@useinsider.com).

## Getting Started

1. From the [Source catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank"} click **Add Source**.
2. Search for **Insider** in the Sources Catalog, select click Insider, and click **Add Source**.
3. On the next screen, give the Source a name and add any labels to help you organize and filter your sources. You can give the source any name, but Segment recommends a name that reflects the source itself, as this name auto-populates the schema name. For example, the source name `Insider` creates the schema `insider`.
4. Click **Add Source** to save your settings.
5. After configuring settings, contact your Insider Customer Success Manager to set up the Segment Source Integration using your writekey.

## Components

**Stream**

Insider uses a server-side track method to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

The default behavior is for Insider to pass the `uuid` (unique user ID) associated with the user as the `userId`. This is the same `userId` that Insider originally receives from the downstream destination with Segment. You can easily change the identity attribute to `email`, `phone number`, `uuid`, or any _custom attribute_. If the selected identifier is not present or you want to pass additional identifier under `anonymousID`, Insider is capable of sending a secondary selected identifier as `anonymousID`.

## Events

The table below lists events that Insider sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations.


| Event Name                   | Event Description                                                         |
| ---------------------------- | ------------------------------------------------------------------------- |
| Email Delivered              | An email was successfully delivered to user.                              |
| Email Open                   | User opened the email campaign.                                           |
| Email Clicked                | User clicked a link in the email campaign.                                |
| Email Bounced                | User’s receiving mail server did not accept it.                           |
| Email Unsubscribe            | User no longer wants to receive marketing emails.                         |
| WhatsApp Reply               | User clicked any button in WhatsApp Message.                              |
| WhatsApp Reply First Button  | User clicked the first quick reply button.                                |
| WhatsApp Reply Second Button | User clicked the second quick reply button.                               |
| WhatsApp Reply Third Button  | User clicked the third quick reply button.                                |
| WhatsApp Reply Auto Reply    | User replied to WhatsApp message in a template that includes quick reply. |
| WhatsApp Reply Other Reply   | User replied to WhatsApp message in any template.                         |
| WhatsApp Opt Out             | User no longer wants to receive marketing WhatsApp marketing messages.    |
| SMS Click                    | User clicked a link in the SMS message.                                   |
| SMS Delivered                | An SMS was successfully delivered to user.                                |
| SMS Unsubscribe              | User no longer wants to receive marketing SMS marketing messages.         |
| Journey Enter                | User entered a Journey.                                                   |
| Journey Exited               | User exited from a Journey.                                               |
| InApp Seen                   | User has seen the InApp campaign.                                         |
| Push Delivered               | App Push message delivered to user.                                       |
| Push Session                 | User clicked an App Push.                                                 |
| Session Start From Push      | App is opened by clicking an App Push                                     |
| Session Start                | Every time App is opened                                                  |
| Lead Collected               | A new lead has been collected.                                            |


> info ""
> Insider sends any custom events you define to Segment for use in downstream tools.

## Event Properties

The table below list the properties included in the events listed above.

| Parameter Name  | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `campaign_id`   | ID of the campaign                                                              |
| `campaign_name` | Name of the campaign                                                            |
| `ip_address`    | IP address of the user                                                          |
| `user_agent`    | The user agent responsible for the event. This is usually a web browser.        |
| `variation_id`  | Variation ID of a campaign                                                      |
| `journey_id`    | ID of the journey users entered. Used in the Events segment, and Exit Criteria. |
| `variant_id`    | Variant ID of a campaign.                                                       |
| `name`          | Name of the journey users entered.                                              |
| `reason`        | The reason of the Journey Enter event.                                          |

> info ""
> Insider sends any custom event parameters you define to Segment for use in downstream tools.

## Traits

Insider is capable of sending traits associated with a user in a `track` call to Segment. The `traits` will be passed along in the [context object](docs/connections/spec/common/#context).

```json
{
  "anonymousId": "c1da3de8-b4b7-4cf2-b496-6a271890ff40",
  "context": {
    "library": {
      "name": "Insider",
      "version": "1.0.0"
    },
    "traits": {
      "email": "f***.p***@h***.c***",
      "phone": "6***"
    }
  },
  "event": "Email Open",
  "integrations": {},
  "messageId": "api-2HgvQRYmsMWNlgqEuOKQmMWt5Wb",
  "originalTimestamp": "2022-11-17T21:12:00.335Z",
  "properties": {
    "campaign_id": "10305",
    "campaign_name": "20221117_midmonthsalethe1_cdsonp... Copy",
    "email": "f***.p***@h***.c***",
    "ip_address": "1***.2***.7***.1***",
    "user_agent": "Mozilla/5.0",
    "variation_id": "10305"
  },
  "receivedAt": "2022-11-17T21:12:03.554Z",
  "timestamp": "2022-11-17T21:12:00.335Z",
  "type": "track"
}
```

The table below list the traits that can be included in the events listed above.

| Attribute Name | Description                |
|----------------|----------------------------|
| Email          | User's email address       |
| Phone          | User's phone number        |
| Name           | User's name                |
| Surname        | User's surname             |
| Age            | User's age                 |
| Country        | User's country information |
| City           | User's city information    |

:::info
Insider can send any _default or custom user attributes_ as traits defined by user to be utilized in Segment.
:::

## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Insider support team](mailto:pst@useinsider.com).
