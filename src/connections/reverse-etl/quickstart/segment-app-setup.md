---
title: Finish Setting Up Your Source in Segment
strat: retl-quickstart
---

After you set up your warehouse, return to the Segment app and complete the source setup. 

1. Return to the Segment app and add the account information for your source.  
    * For Snowflake users: Learn more about the Snowflake Account ID in Snowflake's [Account identifiers](https://docs.snowflake.com/en/user-guide/admin-account-identifier.html){:target="_blank"} documentation.
2. Click **Test Connection** to test to see if the connection works.
3. Click **Add source** if the test connection is successful.

After adding your data warehouse as a Reverse ETL source, create a model, or a SQL query that defines sets of data you want to synchronize to your Reverse ETL destinations. 

<div class="double">
  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/source-setup-catalog" newtab="false" icon="symbols/arrow-left.svg" title="Reverse ETL source catalog" description="Select a guide to set up your warehouse used for Reverse ETL." variant="related" subtitle="back" %}

  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/create-a-model/" newtab="false" icon="symbols/arrow-right.svg" title="Create a model" description="After adding your warehouse as a source, create a SQL query that defines sets of data you want to synchronize to your Reverse ETL destinations." variant="related" subtitle="next" %}
</div>