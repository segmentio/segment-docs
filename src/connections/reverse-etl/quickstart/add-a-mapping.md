---
title: Add a Mapping
strat: retl-quickstart
---

After you’ve added a destination, you can create mappings from your warehouse to the destination. Mappings enable you to map the data you extract from your warehouse to the fields in your destination.

To create a mapping:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Select the destination that you want to create a mapping for.  
3. Click **Add Mapping**.
4. Select the model to sync from.
5. Select the **Action** you want to sync and click **Next**.
      * Actions determine the information sent to the destination. The list of Actions will be unique to each destination.
6. In the **Select record to map and send** section, select which records to send to your destination after Segment completes extracting data based on your model. You can choose from:
      * Added records
      * Updated records
      * Added or updated records
      * Deleted records
7. Select a test record to preview the fields that you can map to your destination in the **Add test record** field.
8. Select the Schedule type for the times you want the model’s data to be extracted from your warehouse. You can choose from:
    * **Interval**: Extractions perform based on a selected time cycle.
    * **Day and time**: Extractions perform at specific times on selected days of the week.
9. Select how often you want the schedule to sync in **Schedule configuration**.
    * For an **Interval** schedule type, you can choose from: 15 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 6 hours, 8 hours, 12 hours, 1 day.
        * 15 minutes is considered real-time for warehouse syncs
    * For a **Day and time** schedule type, you can choose the day(s) you’d like the schedule to sync as well as the time.
        * You can only choose to start the extraction at the top of the hour.
        * Scheduling multiple extractions to start at the same time inside the same data warehouse causes extraction errors.
10. Define how to map the record columns from your model to your destination in the **Select Mappings** section.
    * You map the fields that come from your source, to fields that the destination expects to find. Fields on the destination side depend on the type of action selected.
    * If you're setting up a destination action, depending on the destination, some mapping fields may require data to be in the form of an object or array. See the [supported objects and arrays for mapping](#supported-object-and-arrays).
11. *(Optional)* Send a test record to verify the mappings correctly send to your destination.
12. Click **Create Mapping**.
13. Select the destination you’d like to enable on the **My Destinations** page under **Reverse ETL > Destinations**.
14. Turn the toggle on for the **Mapping Status**. Events that match the trigger condition in the mapping will be sent to the destination.
    * If you disable the mapping state to the destination, events that match the trigger condition in the mapping won’t be sent to the destination.

> success ""
> To add multiple mappings from your warehouse to your destination, repeat steps 1-13 above.

<div class="double">
  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/add-a-destination/" newtab="false" icon="symbols/arrow-left.svg" title="Add a destination" description="After adding your warehouse as a source, create a SQL query that defines sets of data you want to synchronize to your Reverse ETL destinations." variant="related" subtitle="back" %}

  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/complete/" newtab="false" icon="symbols/arrow-right.svg" title="Congrats!" description="Now that you've successfully set up Reverse ETL, learn more about how it works." variant="related" subtitle="next" %}
</div>
