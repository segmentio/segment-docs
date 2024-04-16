---
title: Create a Model
strat: retl-quickstart
---

Now that you've added your warehouse as a RETL source, you can create a model, or a SQL query that define sets of data you want to synchronize to your Reverse ETL destinations. 

To add your first model:
1. Navigate to **Connections > Sources** and select the **Reverse ETL** tab. Select your source and click **Add Model**.
2. Click **SQL Editor** as your modeling method. (Segment will add more modeling methods in the future.)
3. Enter the SQL query that’ll define your model. Your model is used to map data to your Reverse ETL destinations.
4. Choose a column to use as the unique identifier for each record in the **Unique Identifier column** field.
    * The Unique Identifier should be a column with unique values per record to ensure checkpointing works as expected. It can potentially be a primary key. This column is used to detect new, updated, and deleted records.
5. Click **Preview** to see a preview of the results of your SQL query. The data from the preview is extracted from the first 10 records of your warehouse.
6. Click **Next**.
7. Enter your **Model Name**.
8. Click **Create Model**.

> success ""
> To add multiple models to your source, repeat steps 1-8 above.

<div class="double">
  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/segment-app-setup/" newtab="false" icon="symbols/arrow-left.svg" title="Complete in-app source setup" description="After adding your warehouse as a source and configuring permissions for the Segment user, finish the in-app setup process in Segment." variant="related" subtitle="back" %}

  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/add-a-destination/" newtab="false" icon="symbols/arrow-right.svg" title="Add a destination" description="After adding your warehouse as a source, create a SQL query that defines sets of data you want to synchronize to your Reverse ETL destinations." variant="related" subtitle="next" %}
</div>