---
title: Migrating Repeater destinations to multi-instance destinations
hidden: true
---

[Multi-instance destination capabilities](/docs/connections/destinations/add-destination#connecting-one-source-to-multiple-instances-of-a-destination) can replace a Repeater destination that is used to forward data from a single Segment source to multiple instances of a destination. Compared to using a Repeater, multi-instance destination configurations simplify setup, provide better observability into event delivery, and reduce event volume, which reduces your costs. However, multi-instance destination do not replace the Repeater in all situations. If you're using a Repeater for data transformations or to filter Personas events, you will need to continue using the Repeater.

> success ""
> Segment recommends that you test the migration process in a staging environment to check your changes, **before** you change any production configurations.

> warning ""
> Before you begin, check that the Repeater destination you want to replace does not perform any data transformation, or filter Personas events. If a Repeater instance uses these, you cannot migrate to multi-instance, and must continue using Repeater.



## Step 1. Identify

**Identify the Repeater instances that you can replace by connecting new instances of a destination to a single source.**

To understand the function of a Repeater, go to its Settings page, and look at Write Keys. These tell you which sources it sends data to.

If the Repeater has filters, but does not filter out Personas events specifically, you can you can re-create these filters in the multi-instance configuration using [destination filters](/docs/connections/destinations/destination-filters/).

## Step 2. Create a replacement

**Create the new destination instances in your workspace and configure settings.**

1. **Settings:**
   When you first create a new destination instance, you can simplify the set up process by copying settings from an existing destination instance. Segment recommends that you use this feature when you migrate off a Repeater, to minimize typos and missed configuration fields.
2. **Authentication:**
   Enter the correct authentication information. Make sure it's for the correct destination instance!
3. **Destination Filters:**
   Each destination instance can have unique destination filters. If you want the destination filters to be the same as the previous instance, you must configure them either using the Segment web app, or using the [Segment ConfigAPI](https://reference.segmentapis.com/#6c12fbe8-9f84-4a6c-848e-76a2325cb3c5).
4. **Do not enable the destination instances yet**, as this will send duplicate data to your destinations.

## Step 3. Test

**Test that your new destination instances are configured correctly, and that data arrives in the expected way.**

You can create a QA instance of your destination to verify that it is configured correctly and is reporting data. Then create a production instance of the destination, and copy the settings from the QA instance. Be sure the authentication settings point to the production instance of your destination!

## Step 4. Disable the repeater

**Disable the repeater and enable the new destination instance.**

1. If you created a QA instance of the Repeater and you created a QA destination instance, you can test this process before you use production data.


2. You can disable the repeater and enable the new destination instance manually in the Segment web app, or by using the [Segment Config API](/docs/config-api/).

   - **If the destination can de-duplicate events**, enable the new instance of the destination, and _then_ disable the Repeater.
   - **If the destination does not de-duplicate events**, you can disable the Repeater and then enable the new instance of the destination.
   This could result in minor data loss during the few seconds between the Repeater being disabled and the new destination instance being enabled. You can use the Segment Config API [Update Destination endpoint](https://reference.segmentapis.com/#f25d9ac1-3e20-4635-8687-26ed4153086d) to disable and enable destinations quickly, which can minimize the time between these two actions. However, we cannot guarantee that no data will be lost.
   If your workspace is on the Business Tier, and the destination supports [Replay](/docs/guides/what-is-replay/), you can replay the data from that period into the new destination instance. Replays are available for any destinations that support cloud-mode data (meaning data routed through Segment) and that also process timestamps. Contact your CSM for more information about replays. If the destination does not de-duplicate events and replays are not available, you can manually delete duplicate events in the destination.
