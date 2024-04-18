---
title: Snowflake Reverse ETL Setup
beta: true
redirect_from:
  - '/reverse-etl/snowflake-setup/'
---

Set up Snowflake as your Reverse ETL source. 

At a high level, when you set up Snowflake for Reverse ETL,  the configured user/role needs read permissions for any resources (databases, schemas, tables) the query needs to access. Segment keeps track of changes to your query results with a managed schema (`__SEGMENT_REVERSE_ETL`), which requires the configured user to allow write permissions for that schema.

## Set up guide
Follow the instructions below to set up the Segment Snowflake connector. Segment recommends you use the `ACCOUNTADMIN` role to execute all the commands below.

1. Log in to your Snowflake account.
2. Navigate to *Worksheets*.
3. Enter and run the code below to create a database.
   Segment uses the database specified in your connection settings to create a schema called `__segment_reverse_etl` to avoid collision with your data. The schema is used for tracking changes to your model query results between syncs.
   An existing database can be reused, if desired. Segment recommends you to use the same database across all your models attached to this source to keep all the state tracking tables in 1 place.

   ```sql
   -- not required if another database is being reused
   CREATE DATABASE segment_reverse_etl;
   ```
4. Enter and run the code below to create a virtual warehouse.
   Segment Reverse ETL needs to execute queries on your Snowflake account, which requires a Virtual Warehouse to handle the compute. You can also reuse an existing warehouse.

   ```sql
   -- not required if reusing another warehouse
   CREATE WAREHOUSE segment_reverse_etl
    WITH WAREHOUSE_SIZE = 'XSMALL'
      WAREHOUSE_TYPE = 'STANDARD'
      AUTO_SUSPEND = 600 -- 5 minutes
      AUTO_RESUME = TRUE;
   ```
5. Enter and run the code below to create specific roles for Reverse ETL.
   All Snowflake access is specified through roles, which are then assigned to the user you’ll create later.

   ```sql
   -- create role
   CREATE ROLE segment_reverse_etl;

   -- warehouse access
   GRANT USAGE ON WAREHOUSE segment_reverse_etl TO ROLE segment_reverse_etl;

   -- database access
   GRANT USAGE ON DATABASE segment_reverse_etl TO ROLE segment_reverse_etl;
   GRANT CREATE SCHEMA ON DATABASE segment_reverse_etl TO ROLE segment_reverse_etl;
   ```
6. Enter and run the code below to create the username and password combination that will be used to execute queries. Make sure to enter your password where it says `my_strong_password`.

   ```sql
   -- create user
   CREATE USER segment_reverse_etl_user
    MUST_CHANGE_PASSWORD = FALSE
    DEFAULT_ROLE = segment_reverse_etl
    PASSWORD = 'my_strong_password'; -- Do not use this password

   -- role access
   GRANT ROLE segment_reverse_etl TO USER segment_reverse_etl_user;
   ```
5. Return to the Segment app and add the account information for your source.
5. Click **Test Connection** to test to see if the connection works.
6. Click **Add source** if the test connection is successful.

After adding your data warehouse as a Reverse ETL source, create a model, or a SQL query that defines sets of data you want to synchronize to your Reverse ETL destinations. 

<div class="double">
  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/source-setup-catalog" newtab="false" icon="symbols/arrow-left.svg" title="Reverse ETL source catalog" description="Select a guide to set up your warehouse used for Reverse ETL." variant="related" subtitle="back" %}

  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/create-a-model/" newtab="false" icon="symbols/arrow-right.svg" title="Create a model" description="After adding your warehouse as a source, create a SQL query that defines sets of data you want to synchronize to your Reverse ETL destinations." variant="related" subtitle="next" %}
</div>