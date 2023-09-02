---
title: Snowflake Setup
plan: unify
beta: true
---

On this page, you'll learn how to connect your Snowflake data warehouse to Segment.

Be sure to log in with a user that has read and write permissions so that Segment can write to your database. 


## Getting started 

Follow the instructions below to set up the Segment Snowflake connector. Segment recommends you use the `ACCOUNTADMIN` role to execute the commands below.

> info ""
> Use the following steps if you haven't used the Segment Reverse ETL before, or don't want to use the same database as where Reverse ETL deltas are stored. 

1. Log in to your Snowflake account.
2. Navigate to *Worksheets*.
3. Enter and run the following code to create a database. 
- Segment requires you to use the same database across all your models attached to this Unify space to keep the state tracking tables in one place. 

   ```sql
   CREATE DATABASE segment_entities;
   ```
   Segment uses the database specified in your connection settings to create a schema called `__segment_reverse_etl` to avoid collision with your data. The schema is used for tracking changes to your model query results between syncs.
   An existing database can be reused, if desired. 

4. Enter and run the code below to create a virtual warehouse.
   Linked Events needs to execute queries on your Snowflake account, which requires a Virtual Warehouse to handle the compute. You can also reuse an existing warehouse.

   ```sql
   CREATE WAREHOUSE segment_entities
    WITH WAREHOUSE_SIZE = 'XSMALL'
      WAREHOUSE_TYPE = 'STANDARD'
      AUTO_SUSPEND = 600 -- 5 minutes
      AUTO_RESUME = TRUE;
   ```
5. Enter and run the code below to create specific roles for Linked Events. All Snowflake access is specified through roles, which are then assigned to the user you’ll create later.

    ```sql
   -- create role
   CREATE ROLE segment_entities;

   -- warehouse access
   GRANT USAGE ON WAREHOUSE segment_entities TO ROLE segment_entities;

   -- database access
   GRANT USAGE ON DATABASE segment_entities TO ROLE segment_entities;
   GRANT CREATE SCHEMA ON DATABASE segment_entities TO ROLE segment_entities;
   ```

6. Enter and run the code below to create the username and password combination that will be used to execute queries. Make sure to enter your password where it says `my_strong_password`.

   ```sql
   -- create user
   CREATE USER segment_entities_user
    MUST_CHANGE_PASSWORD = FALSE
    DEFAULT_ROLE = segment_entities
    PASSWORD = 'my_strong_password'; -- Do not use this password

   -- role access
   GRANT ROLE segment_entities TO USER segment_entities_user;
   ```

7. Click **Test Connection** to see if the connection is working as expected. If the test is successful, click **Save**.
- If the connection fails, double check that your permissions and credentials and try again. 


## Using an existing database

If you're using an existing database, follow the steps below to get started.

### Grant Access to Tables 

To use Linked Events, you'll need to grant access to `segment_entities_user` for the schemas and tables you'd like to read from to perform enrichments. 

These tables don't need to live in the same database as the one used for storing sync deltas. You can give as broad or narrow of access as you require. If you give broad access to multiple schemas, you can sort through the schemas in the Segment UI to select the appropriate tables to create models from.

> success ""
> Visit Snowflake's docs to learn more about [Snowflake schema priveleges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#schema-privileges) and [Snowflake table priveleges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#table-privileges). 

To give Segment access to all current and future schemas in a database, use the following two commands:

```sql 
-- view all schemas in database
GRANT USAGE ON ALL SCHEMAS IN DATABASE segment_entities TO ROLE 
segment_entities;

-- view future schemas in database
GRANT USAGE ON FUTURE SCHEMAS IN DATABASE segment_entities TO ROLE segment_entities;
```

To lock down access to a specific schema, use the following command:

```sql
-- view specific schemas in database
GRANT USAGE ON SCHEMA <schema_name> TO ROLE segment_entities;
``` 

Use the following commands to open up table-level access to Segment based on your comfort level:

```sql
-- query data from all tables in a database
GRANT SELECT ON ALL TABLES IN DATABASE segment_entities TO ROLE 
segment_entities;

-- query data from future tables in a database
GRANT SELECT ON FUTURE TABLES IN DATABASE segment_entities TO ROLE segment_entities;

-- query data from all tables in a schema
GRANT SELECT ON ALL TABLES IN SCHEMA <schema-name> TO ROLE 
segment_entities;

-- query data from future tables in a schema
GRANT SELECT ON FUTURE TABLES IN SCHEMA <schema-name> TO ROLE
segment_entities;

-- query data from a specific table in a schema 
GRANT SELECT ON TABLE <schema-name>.<table_name> TO ROLE segment_entities;
```
