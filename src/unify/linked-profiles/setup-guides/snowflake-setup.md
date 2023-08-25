---
title: Snowflake Setup

---

On this page, you'll learn how to set up Snowflake as your warehouse destination. 

Make sure that you log in with a user that has read and write permissions so that Segment can write to your database. 


## Getting started 

Follow the instructions below to set up the Segment Snowflake connector. Segment recommends you use the `ACCOUNTADMIN` role to execute all the commands below.

1. Log in to your Snowflake account.
2. Navigate to *Worksheets*.
3. Enter and run the code below to create a database.
   Segment uses the database specified in your connection settings to create a schema called `__segment_reverse_etl` to avoid collision with your data. The schema is used for tracking changes to your model query results between syncs.
   An existing database can be reused, if desired. Segment recommends you to use the same database across all your models attached to this source to keep all the state tracking tables in one place.

   ```sql
   -- not required if another database is being reused
   CREATE DATABASE segment_entities;
   ```

   4. Enter and run the code below to create a virtual warehouse.
   Segment Reverse ETL needs to execute queries on your Snowflake account, which requires a Virtual Warehouse to handle the compute. You can also reuse an existing warehouse.

   ```sql
   -- not required if reusing another warehouse
   CREATE WAREHOUSE segment_entities
    WITH WAREHOUSE_SIZE = 'XSMALL'
      WAREHOUSE_TYPE = 'STANDARD'
      AUTO_SUSPEND = 600 -- 5 minutes
      AUTO_RESUME = TRUE;
   ```
5. Enter and run the code below to create specific roles for Reverse ETL.
   All Snowflake access is specified through roles, which are then assigned to the user you’ll create later.

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

7. Navigate to **<enter here>** and paste...
8. Click **Test Connection** to see if the connection is working as expected. 
- If the connection fails, double check that you have the right permissions and credentials and try again. 
9. If the test is successful, click **Save**.

## Using an existing database

If you're using an existing database, follow the steps below to get started.

### View schemas

Grant permission based on user needs. Visit [Snowflake's docs](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#schema-privileges) to learn more about schema priveledges. 

```sql 
-- view all schemas in database
GRANT USAGE ON ALL SCHEMAS IN DATABASE segment_entities TO ROLE 
segment_entities;

-- view future schemas in database
GRANT USAGE ON FUTURE SCHEMAS IN DATABASE segment_entities TO ROLE segment_entities;

-- view specific schemas in database
GRANT USAGE ON SCHEMA <schema_name> TO ROLE segment_entities;
``` 

### View tables and columns

Grant permission based on user needs. Visit [Snowflake's docs](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#table-privileges) to learn more about table priveleges. 

```sql
-- view all tables/columns in a database
GRANT REFERENCES ON ALL TABLES IN DATABASE segment_entities TO ROLE 
segment_entities;

-- view future tables/columns in a database
GRANT REFERENCES ON FUTURE TABLES IN DATABASE segment_entities TO ROLE segment_entities;

-- view all tables/columns in a schema
GRANT REFERENCES ON ALL TABLES IN SCHEMA <schema-name> TO ROLE 
segment_entities;

-- view future tables/columns in a schema
GRANT REFERENCES ON FUTURE TABLES IN SCHEMA <schema-name> TO ROLE
segment_entities;

-- view a specfic table/column in a schema 
GRANT REFERENCES ON TABLE <schema-name>.<table_name> TO ROLE segment_entities;
```

If Reverse ETL has ever run in the database (Segment managed schema is created)

```sql 
GRANT USAGE ON SCHEMA __segment_reverse_etl TO ROLE segment_entities;

GRANT CREATE TABLE ON SCHEMA __segment_reverse_etl TO ROLE segment_entities;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA __segment_reverse_etl TO ROLE segment_entities;

-- ?
--GRANT SELECT, INSERT, UPDATE, DELETE ON FUTURE TABLES IN SCHEMA
__segment_reverse_etl TO ROLE segment_entities;