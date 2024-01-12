---
title: Snowflake Setup
plan: unify
beta: true
---

> info "Linked Events is in private beta"
> Linked Events is in private beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. [Contact Segment](https://segment.com/help/contact/){:target="_blank"} with any feedback or questions.

On this page, you'll learn how to connect your Snowflake data warehouse to Segment.

Be sure to log in with a user that has read and write permissions so that Segment can write to your database. 


## Getting started 

To get started with Snowflake:

1. Log in to your Snowflake account.
2. Navigate to *Worksheets*.

Segment recommends you use the `ACCOUNTADMIN` role to execute the commands below.

## Create a new warehouse

> info ""
> This step is optional, and you can use an existing Snowflake warehouse if you'd like. 

Enter and run the code below to create a virtual warehouse. Linked Events needs to execute queries on your Snowflake account, which requires a Virtual Warehouse to handle the compute. 

   ```sql
   CREATE WAREHOUSE segment_entities
    WITH WAREHOUSE_SIZE = 'XSMALL'
      WAREHOUSE_TYPE = 'STANDARD'
      AUTO_SUSPEND = 600 -- 5 minutes
      AUTO_RESUME = TRUE;
   ```
   
## Create a new role 

Enter and run the code below to create specific roles for Linked Events. All Snowflake access is specified through roles, which are then assigned to the user you’ll create later.

   ```ts
   -- create role
   GRANT ROLE segment_entities;

   -- warehouse access
   GRANT USAGE ON WAREHOUSE segment_entities TO ROLE segment_entities;

   -- database access
   GRANT USAGE ON DATABASE segment_entities TO ROLE segment_entities;
   GRANT CREATE SCHEMA ON DATABASE segment_entities TO ROLE segment_entities;
   ```

## Create a new user 

Enter and run the code below to create the username and password combination that will be used to execute queries. Make sure to enter your password where it says `<my_strong_password>`.

   ```sql
   -- create user
   CREATE USER segment_entities_user
    MUST_CHANGE_PASSWORD = FALSE
    DEFAULT_ROLE = segment_entities
    PASSWORD = 'my_strong_password'; -- Do not use this password

   -- role access
   GRANT ROLE segment_entities TO USER segment_entities_user;
   ```

## Grant access to tables

To use Linked Events, you'll need to grant access to `segment_entities_user` for the schemas and tables you'd like to read from to perform enrichments. 

These tables need to live in the same database as the one used for storing sync deltas. You can give as broad or narrow of access as you require. If you give broad access to multiple schemas, you can sort through the schemas in Segment to select the appropriate tables to create models from.

> info ""
> Segment only supports tables, materialized views, views, and external tables as data sources.

> success ""
> Visit Snowflake's docs to learn more about [schema priveleges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#schema-privileges){:target="_blank"} and [table priveleges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#table-privileges){:target="_blank"}. 

### Schema access

Run the following command to give access to specific schemas you want to use for enrichment.

```ts
-- view specific schemas in database
GRANT USAGE ON SCHEMA <schema-name-1> TO ROLE segment_entities;
GRANT USAGE ON SCHEMA <schema-name-2> TO ROLE segment_entities;

-- query data from all tables in a schema
GRANT SELECT ON ALL TABLES IN SCHEMA <schema-name-1> TO ROLE segment_entities;
GRANT SELECT ON ALL TABLES IN SCHEMA <schema-name-2> TO ROLE segment_entities;

-- query data from future tables in a schema
GRANT SELECT ON FUTURE TABLES IN SCHEMA <schema-name-1> TO ROLE segment_entities;
GRANT SELECT ON FUTURE TABLES IN SCHEMA <schema-name-2> TO ROLE segment_entities;
```

### Table access

If you'd like to restrict access to specific tables, use the following command:

```ts
-- query data from a specific table in a schema 
GRANT SELECT ON TABLE <schema-name>.<table_name> TO ROLE segment_entities;
```

### RETL table permissions

If you've ever run Reverse ETL in your database, you'll need to add the following [table permissions](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#table-privileges){:target="_blank"}:

```sql
GRANT USAGE ON SCHEMA __segment_reverse_etl TO ROLE segment_entities;

GRANT CREATE TABLE ON SCHEMA __segment_reverse_etl TO ROLE segment_entities;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA __segment_reverse_etl TO ROLE segment_entities;
```

### Confirm table permissions

To confirm table permissions:
1. Log in as the user you've created (`segment_entities_user`).
2. Verify the role created has the correct permissions with the commands below.

```ts
USE ROLE segment_entities;
USE DATABASE <your_database>;
SHOW SCHEMAS;
SELECT * FROM <your_database>.<schema-name>.<table-name> LIMIT 10;
```

The output should match the permissions you've given in previous steps.
