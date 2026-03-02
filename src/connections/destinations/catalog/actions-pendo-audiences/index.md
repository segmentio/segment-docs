---
title: Pendo Audiences Destination
slug: actions-pendo-audiences
---

The Pendo Audiences destination allows you to sync Segment Engage audiences to Pendo Segments. For more information, visit [Pendo's documentation](https://support.pendo.io/hc/en-us/articles/360031862532-Segments){:target="_blank"}.

## How it works

When you create an audience in Engage and connect it to the Pendo Audiences destination, Segment automatically:

1. Creates a new Segment in Pendo using the audience name.
2. Adds visitors to the Pendo Segment when they enter the audience.
3. Removes visitors from the Pendo Segment when they exit the audience.

{% include content/sync-frequency-note.md %}

## Getting started

### Prerequisites

Before you begin, make sure you have:

* A Pendo **Integration Key**, which you can find in Pendo under **Settings > Integrations > Integration Keys**.
* An [Engage Audience](/docs/engage/audiences/) that you want to connect to this destination.

### Connect Pendo Audiences to Segment Engage

1. In Segment, go to **Engage > Engage Settings**.
2. Click **Destinations**, then click **Add Destination**.
3. Search for **Pendo Audiences** and click on it.
4. Click **Add destination**, then click **Confirm Source**.
5. Under **Basic Settings**, enter:
    - A name for your destination (for example, "Pendo Audiences Prod").
    - Your Pendo **Integration Key**.
6. Enable the destination and click **Save**.

### Set up the Sync Audience Action

7. Navigate to **Connections > Destinations**, search for the **Pendo Audiences** destination you created, and click on it.
8. Navigate to **Mappings > New Mapping** and click the **Sync Audience** tile.
9. Review the default field mappings. The **Visitor ID** field maps to `$.userId` by default. Update this if your Pendo visitors are identified by a different field.
10. Click **Save**.
11. On the Mappings tab, enable the **Sync Audience** action.

### Connect Pendo Audiences to your Audience

12. Navigate to **Engage > Audiences** and select the Audience you want to sync to Pendo.
13. Click **Add Destination** and select the **Pendo Audiences** destination you created.
14. Configure the per-audience settings:
    - **Pendo Segment Name** (optional): Override the name used when creating the Pendo Segment. By default, the Segment audience name is used.
15. Click **Save**, then click **Add 1 Destination**. Your audience will begin syncing to Pendo.

## FAQs

### Which Segment event types does this destination support?

This destination processes `identify` and `track` calls emitted by Engage. Both are handled the same way — the payload is inspected to determine whether the visitor should be added to or removed from the Pendo Segment. If using `track`, the event name is ignored.

### Which field is used to identify visitors in Pendo?

The **Visitor ID** field maps to `$.userId` by default. This must match the visitor ID used in your Pendo installation. You can update the mapping in the **Sync Audience** action if your Pendo visitors are identified by a different field.

### Can I override the Pendo Segment name per audience?

Yes. By default the Segment audience name is used when creating the Pendo Segment. You can override this on a per-audience basis using the **Pendo Segment Name** field in the audience destination settings.

### Does this destination support batching?

Yes. By default, events are batched and synced to Pendo using the batch PATCH endpoint, with up to 1000 visitors per request. Batching is enabled by default and can be configured in the **Sync Audience** action mapping.