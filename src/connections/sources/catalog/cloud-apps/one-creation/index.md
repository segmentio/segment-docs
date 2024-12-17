---
title: 'One Creation Source'
id: IB9M67ZWaA
---

[One Creation](https://www.one-creation.com/){:target="_blank”} provides brands with a Digital Preference Wallet to collect, digitize, and refresh consumer preference data. By seamlessly integrating into every customer touchpoint, the platform enhances services while enforcing consent (including Time-Based Consent) and data sharing rules. 

This is an Event Cloud Source that can not only export data into your Segment warehouse but also federate the exported data into your other enabled Segment Destinations.

This source is maintained by One Creation. For any issues with the source, [contact their Support team](mailto:support@one-creation.com).

## Getting started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog){:target="_blank”} click **Add Source**.
2. Search for "One Creation" in the Sources Catalog, select One Creation, and click **Add Source**.
3. On the next screen, give the source a name configure any other settings.

- The name is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The name can be anything, but Segment recommends using something that reflects the source itself and distinguishes amongst your environments (for example `OneCreation_Prod`, `OneCreation_Staging`, `OneCreation_Dev`).

4. Click **Add Source** to save your settings.
5. Copy the Write key from the Segment UI.
6. Log in to your [One Creation account](https://app.one-creation.com/admin/integrations?app=segment){:target="_blank”} - navigate to **Settings > Integrations > Segment** and paste the key to connect.

## Stream

One Creation uses the Stream Source component to send Segment event data. It uses a server-side (select from `track`, `identify`) method(s) to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

One Creation assigns a unique ID to each user. This ID is passed to Segment as the `userId`. The user's email address is included as a trait.

## Events

The following table lists events that One Creation sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. One Creation always includes the userId.

| Event Name       | Description               |
|------------------|---------------------------|
| Submitted Preferences | User responded to a data request campaign  |
| Expired Data | Data associated with a campaign has expired |
| Extended Preferences | User agrees to extending the data associated with a campaign |

1. When a user responds to an One Creation data request campaign, One Creation sends the user's response to Segment. This is achieved by triggering an Identify call to create the traits and a Track call to record the **Submitted Preferences** event.
2. When a user agrees to extend data usage through an One Creation extension campaign, One Creation triggers an Identify call to update the user's extended traits with the latest values. Additionally, a Track call is triggered to record the **Extended Preferences** event. 
3. When data associated with a campaign expires, One Creation triggers an Identify call to update traits with the value **Expired** and a Track call to record the **Expired Data** event.

## Event properties

All One Creation events contain the associated One Creation campaign name, campaign ID, user ID of the individual who responded to the campaign, and the list of traits or properties that the user provided through this campaign. Here's a sample payload:

    {
        "properties": {
            "fav_color": "blue",
            "fav_pet": "dog",
            "response_at": "2024-09-10T14:38:57.524122374Z[GMT]"
        },
        "context": {
            "integration": {
                "name": "one-creation",
                "version": "1.0.0"
            },
            "campaign": {
                "name": "One Creation Demo Campaign",
                "id": "e17a2a8e-4b0c-46f6-a193-77d72108edf4"
            }
        },
        "integrations": {
            "All": true
        },
        "event": "Submitted Preferences",
        "userId": "75720996-3c82-4cc4-b0e5-67bd441fa9f3",
        "type": "track"
    }

## Adding destinations

Now that your source is set up, you can connect it with destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the Event Delivery tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, contact the [One Creation support team](mailto:support@one-creation.com).
