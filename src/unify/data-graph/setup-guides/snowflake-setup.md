---
title: Snowflake Data Graph Setup
plan: unify
redirect_from:
  - '/unify/linked-profiles/setup-guides/snowflake-setup'
---
> warning ""
> Data Graph, Reverse ETL, and Profiles Sync require different warehouse permissions.

On this page, you'll learn how to connect your Snowflake data warehouse to Segment for the [Data Graph](/docs/unify/data-graph/data-graph/). 

## Snowflake credentials

Segment assumes that you already have a warehouse that includes the datasets you'd like to use for the Data Graph. Log in to Snowflake with admin privileges to provide the Data Graph with the necessary permissions below. 

## Step 1: Create a user and internal database for Segment to store checkpoint tables

Segment recommends setting up a new Snowflake user and only giving this user permissions to access the required databases and schemas. Run the SQL code block below in your SQL worksheet in Snowflake to execute the following tasks:

- Create a new role and user for the Segment Data Graph. This new role will only have access to the datasets you provide access to for the Data Graph.
- Grant the Segment user access to the warehouse of your choice. If you'd like to create a new warehouse, uncomment the SQL below.
- **Segment requires write access to this database in order to create a schema for internal bookkeeping and to store checkpoint tables for the queries that are executed. Therefore, Segment recommends creating a new database for this purpose.** This is also the database you'll be required to specify for the "Database Name" when connecting Snowflake with the Segment app.

> info ""
> Segment recommends creating a new database for the Data Graph.
> If you choose to use an existing database that has also been used for [Segment Reverse ETL](/docs/connections/reverse-etl/), you must follow the [additional instructions](#update-user-access-for-segment-reverse-etl-schema) to update user access for the Segment Reverse ETL schema.


```sql
-- ********** SET UP THE FOLLOWING WAREHOUSE PERMISSIONS **********

-- Update the following variables 
SET segment_connection_username = 'SEGMENT_LINKED_USER';
SET segment_connection_password = 'my-safe-password';
SET segment_connection_warehouse = 'SEGMENT_LINKED_WH';
SET segment_connection_role = 'SEGMENT_LINKED_ROLE';

-- The DB  used for Segment's internal bookkeeping.
-- Note: Use this DB in the connection settings on the Segment app. This is the only DB that Segment requires write access to.
SET segment_connection_db = 'SEGMENT_LINKED_PROFILES_DB';

-- ********** [OPTIONAL] UNCOMMENT THE CODE BELOW IF YOU NEED TO CREATE A NEW WAREHOUSE **********

-- CREATE WAREHOUSE IF NOT EXISTS identifier($segment_connection_warehouse)
-- WITH WAREHOUSE_SIZE = 'XSMALL'
--   WAREHOUSE_TYPE = 'STANDARD'
--   AUTO_SUSPEND = 600 -- 5 minutes
--   AUTO_RESUME = TRUE;

-- ********** RUN THE COMMANDS BELOW TO FINISH SETTING UP THE WAREHOUSE PERMISSIONS **********

-- Use admin role for setting grants
USE ROLE ACCOUNTADMIN;

-- Create a role for the Data Graph
CREATE ROLE IF NOT EXISTS identifier($segment_connection_role)
COMMENT = 'Used for Segment Data Graph';

-- Create a user for the Data Graph
CREATE USER IF NOT EXISTS identifier($segment_connection_username)
MUST_CHANGE_PASSWORD = FALSE
DEFAULT_ROLE = $segment_connection_role
PASSWORD = $segment_connection_password
COMMENT = 'Segment Data Graph User'
TIMEZONE = 'UTC';

-- Grant permission to the role to use the warehouse
GRANT USAGE ON WAREHOUSE identifier($segment_connection_warehouse) TO ROLE identifier($segment_connection_role);

-- Grant role to the user
GRANT ROLE identifier($segment_connection_role) TO USER identifier($segment_connection_username);

-- Create and Grant access to a Segment internal DB used for bookkeeping. This is the only DB that Segment requires write access to. This is also the DB you will use in the "Database Name" config while setting up the connection in the Segment app. 
CREATE DATABASE IF NOT EXISTS identifier($segment_connection_db);
GRANT USAGE ON DATABASE identifier($segment_connection_db) TO ROLE identifier($segment_connection_role);
GRANT USAGE ON ALL SCHEMAS IN DATABASE identifier($segment_connection_db) TO ROLE identifier($segment_connection_role);
GRANT CREATE SCHEMA ON DATABASE  identifier($segment_connection_db) TO ROLE identifier($segment_connection_role);

```

## Step 2: Grant read-only access to additional databases for the Data Graph

Next, give the Segment role **read-only** access to additional databases you want to use for Data Graph including the Profiles Sync database. Repeat the following SQL query for **each** database you want to use for the Data Graph.

```sql

SET segment_connection_role = 'SEGMENT_LINKED_ROLE';

-- ********** REPEAT THE SQL QUERY BELOW FOR EACH DATABASE YOU WANT TO USE FOR THE DATA GRAPH **********
-- Change this for each DB you want to grant the Data Graph read-only access to
SET linked_read_only_database = 'MARKETING_DB';

GRANT USAGE ON DATABASE identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT USAGE ON ALL SCHEMAS IN DATABASE identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON ALL TABLES IN DATABASE identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON FUTURE TABLES IN DATABASE identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON ALL VIEWS IN DATABASE identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON FUTURE VIEWS IN DATABASE identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON ALL EXTERNAL TABLES IN DATABASE identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON FUTURE EXTERNAL TABLES IN DATABASE identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON ALL MATERIALIZED VIEWS IN DATABASE identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON FUTURE MATERIALIZED VIEWS IN DATABASE identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);

```

## (Optional) Step 3: Restrict read-only access to schemas

If you want to restrict access to specific [Snowflake schemas and tables](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#table-privileges){:target="_blank"}, then run the following commands: 

```sql
-- [Optional] Further restrict access to only specific schemas and tables 
SET db = 'MY_DB';
SET schema = 'MY_DB.MY_SCHEMA_NAME';
SET segment_connection_role = 'SEGMENT_LINKED_ROLE';

-- View specific schemas in database
GRANT USAGE ON DATABASE identifier($db) TO ROLE identifier($segment_connection_role);
GRANT USAGE ON SCHEMA identifier($schema) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON ALL TABLES IN SCHEMA identifier($schema) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON FUTURE TABLES IN SCHEMA identifier($schema) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON ALL VIEWS IN SCHEMA identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON FUTURE VIEWS IN SCHEMA identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON ALL EXTERNAL TABLES IN SCHEMA identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON FUTURE EXTERNAL TABLES IN SCHEMA identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON ALL MATERIALIZED VIEWS IN SCHEMA identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);
GRANT SELECT ON FUTURE MATERIALIZED VIEWS IN SCHEMA identifier($linked_read_only_database) TO ROLE identifier($segment_connection_role);

```

## Step 4: Confirm permissions 

To verify you have set up the right permissions for a specific table, log in with the username and password you created for `SEGMENT_CONNECTION_USERNAME` and run the following command to verify the role you created has the correct permissions. If this command succeeds, you should be able to view the respective table.

```sql
set segment_connection_role = 'SEGMENT_LINKED_ROLE';
set linked_read_only_database = 'YOUR_DB';
set table_name = 'YOUR_DB.SCHEMA.TABLE';

USE ROLE identifier($segment_connection_role);
USE DATABASE identifier($linked_read_only_database) ;
SHOW SCHEMAS;
SELECT * FROM identifier($table_name) LIMIT 10;

```
## Step 5: Connect your warehouse to the Data Graph

To connect your warehouse to the Data Graph:

1. Navigate to **Unify > Data Graph**. This should be a Unify space with Profiles Sync already set up.
2. Click **Connect warehouse**.
3. Select Snowflake as your warehouse type. 
4. Enter your warehouse credentials. Segment requires the following settings to connect to your Snowflake warehouse:
- **Account ID**: The Snowflake account ID that uniquely identifies your organization account.
- **Database**: The only database that Segment requires write access to in order to create tables for internal bookkeeping. This database is referred to as `segment_connection_db` in the script below.
- **Warehouse**: The [warehouse](https://docs.snowflake.com/en/user-guide/warehouses){:target="_blank”} in your Snowflake account that you want to use for Segment to run the SQL queries. This warehouse is referred to as `segment_connection_warehouse` in the script below.
- **Username**: The Snowflake user that Segment uses to run SQL in your warehouse. This user is referred to as `segment_connection_username` in the script below.
- **Authentication**: Snowflake only supports authentication using a key pair as Snowflake plans to deprecate password-only authentication starting August 2026. Learn more in the [Snowflake docs](https://docs.snowflake.com/en/user-guide/security-mfa-rollout){:target="_blank"}.
  - **Key Pair**: You need to first create the user and assign it a key pair following the instructions in the [Snowflake docs](https://docs.snowflake.com/en/user-guide/key-pair-auth){:target="_blank"}. Then, set the `segment_connections_username` variable in the SQL script to the user you just created.

 
5. Test your connection, then click Save.

## Update user access for Segment Reverse ETL schema 
If Segment Reverse ETL has ever run in the database you are configuring as the Segment connection database, a Segment-managed schema is already created and you need to provide the new Segment user access to the existing schema. Run the following SQL if you run into an error on the Segment app indicating that the user doesn't have sufficient privileges on an existing `_segment_reverse_etl` schema.

```sql
-- If you want to use an existing database that already has Segment Reverse ETL schemas, you’ll need to run some additional steps below to grant the role access to the existing schemas.

SET retl_schema = concat($segment_connection_db,'.__segment_reverse_etl');
GRANT USAGE ON SCHEMA identifier($retl_schema) TO ROLE identifier($segment_connection_role);
GRANT CREATE TABLE ON SCHEMA identifier($retl_schema) TO ROLE identifier($segment_connection_role);
GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA identifier($retl_schema) TO ROLE identifier($segment_connection_role);
```
