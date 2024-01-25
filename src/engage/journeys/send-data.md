---
title: Send Journeys data to a Destination
plan: engage-foundations
redirect_from:
  - '/personas/journeys/send-data'
---

When you send data to destinations, you send a series of events or user lists, depending on the destination type.

## Before you begin

Ensure you have connected and enabled destinations in your Space.

## Send data to destinations

1. Add a **Send to destinations** step to the journey.
2. Enter a **Step name**. This name should be descriptive of the users you send to the destination. For example, `New subscribed users`. Journeys generates a key based on the step name you enter. Destinations use this key to references the users that Journeys sends to it. For track events, the property name uses this key. For Identify events, the trait name uses the key.
3. Click **Connect destinations** to select the destination you'll send the data to.
4. Click **Save**.

## Test event payloads

With the Engage event tester, you can send a test event payload to a Destination. As a result, you can confirm that you've correctly configured Journey Audiences before you publish your Journey.

Follow these steps to send a test event:

1. From the **Send to destinations** window, select **+ Add destination**.
2. Choose the Destination that you want to connect.
3. In the Destination pane, select **Event tester**. This is only available for [Event Destinations](/docs/engage/using-engage-data/#engage-destination-types-event-vs-list).
4. From the **Event Type** drop-down, select the event you want to test. Segment generates a test user ID.
5. Select **Send Event**, then view the test event results in the **Event lifecycle** section.

If your Destination successfully handled the event, Segment displays a `200 OK` HTTP status code along with the full response. If an error occurred, Segment displays any available details in the Event lifecyle section.

## What do I send to destinations?

The data type you send to a destination depends on whether the destination is an Event destination, or a List destination.

### Event destination

The format in which the destination receives updates depends on the call type.

#### Track calls

When the user enters the step:

```json
{
  "type": "track",
  "event": "Audience Entered",
  "properties": {
    "j_o_first_purchase__opened_email_dje83h": "true"
  }
}
```

#### Identify calls

When the user enters the step:

```json
{
  "type": "identify",
  "traits": {
    "j_o_first_purchase__opened_email_dje83h": "true"
  }
}
```

### List destination

The destination receives a list of users who qualify for the associated journey step. Unlike lists associated with Engage Audiences, users who are added to a journey list cannot be subsequently removed. See [best practices](/docs/engage/journeys/faq-best-practices#suppress-targeting-with-journey-lists) for techniques to suppress targeting with journey lists. List destinations do not have access to the Event Tester.

For more information, see [Using Engage Data](/docs/engage/using-engage-data/).
