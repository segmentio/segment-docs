---
title: Snowflake Setup
plan: unify
beta: true
---

> info "Linked Profiles is in private beta"
> Linked Profiles (Data Graph, Linked Events, and Linked Audiences) is in private beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. 


On this page, you'll learn how to connect your Snowflake data warehouse to Segment.

Be sure to log in with a user that has read and write permissions so that Segment can write to your database. 

> info ""
> Both Linked Events and Linked Profiles support Snowflake. 


## Getting started 

Use the following steps to set up Snowflake for Linked Profiles.

### Set up Snowflake Credentials and create internal Segment DB

Run the SQL below to provide Segment Linked Profiles with the necessary permissions and roles to access the databases, tables, and schemas. These steps involve:
- Creating a new role and user for Segment Linked Profiles.
- Granting read-only access to specific databases and schemas that you want to use for Linked Profiles.
- Granting write access to an internal database that Segment requires for bookkeeping purposes.
- [Optional] Creating a new warehouse if it does not exist yet. You can skip this step if a warehouse already exists.
- [Optional] As a best practice, Segment recommends that restrict access to specific databases and schemas.
- Running the script below to configure the Warehouse permissions.

```ts 
-- ********** SET UP THE FOLLOWING WAREHOUSE PERMISSIONS **********
-- Edit the following variables
SET segment_linked_username='SEGMENT_LINKED_USER';
SET segment_linked_password='my-safe-password';
SET segment_linked_default_warehouse='SEGMENT_LINKED_WH';
SET segment_linked_default_role='SEGMENT_LINKED_ROLE';

-- Use the same DB that has Profiles Sync configured. This DB is also used for Segment's internal bookkeeping. Note: Use this DB in the connection settings on the Segment app.
SET segment_internal_database = 'SEGMENT_INTERNAL_DB';

-- Use for each DB you want Linked Profiles to access
SET segment_linked_database='MARKETING_DB';


-- ********** [OPTIONAL] UNCOMMENT THE CODE BELOW IF YOU NEED TO CREATE A NEW WAREHOUSE **********
-- CREATE WAREHOUSE IF NOT EXISTS identifier($segment_linked_default_warehouse)
-- WITH WAREHOUSE_SIZE = 'XSMALL'
--   WAREHOUSE_TYPE = 'STANDARD'
--   AUTO_SUSPEND = 600 -- 5 minutes
--   AUTO_RESUME = TRUE;


-- ********** RUN THE COMMANDS BELOW TO FINISH SETTING UP THE WAREHOUSE PERMISSIONS **********

-- Use admin role for setting grants
USE ROLE ACCOUNTADMIN;

-- Create a role for Segment Linked Profiles
CREATE ROLE IF NOT EXISTS identifier($segment_linked_default_role)
COMMENT = 'Used for Segment Linked Profiles';

-- Create a user for Segment Linked Profiles
CREATE USER IF NOT EXISTS identifier($segment_linked_username)
MUST_CHANGE_PASSWORD = FALSE
DEFAULT_ROLE = $segment_linked_default_role
PASSWORD=$segment_linked_password
COMMENT='Segment Linked Profiles User';

-- Grant permission to the role to use the warehouse
GRANT USAGE ON WAREHOUSE identifier($segment_linked_default_warehouse) TO ROLE identifier($segment_linked_default_role);

-- Grant role to the user
GRANT ROLE identifier($segment_linked_default_role) TO USER identifier($segment_linked_username);

-- Grant access to Segment internal DB used for bookkeeping. This is the same DB that contains the Profiles Sync schema.
GRANT USAGE ON DATABASE identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);
GRANT USAGE ON ALL SCHEMAS IN DATABASE identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);
GRANT CREATE SCHEMA ON DATABASE  identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON ALL TABLES IN DATABASE identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON FUTURE TABLES IN DATABASE identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON ALL VIEWS IN DATABASE identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON FUTURE VIEWS IN DATABASE identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON ALL EXTERNAL TABLES IN DATABASE identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON FUTURE EXTERNAL TABLES IN DATABASE identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON ALL MATERIALIZED VIEWS IN DATABASE identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON FUTURE MATERIALIZED VIEWS IN DATABASE identifier($segment_internal_database) TO ROLE identifier($segment_linked_default_role);

-- Grant read-only access to all DBs
GRANT USAGE ON DATABASE identifier($segment_linked_database) TO ROLE identifier($segment_linked_default_role);
GRANT USAGE ON ALL SCHEMAS IN DATABASE identifier($segment_linked_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON ALL TABLES IN DATABASE identifier($segment_linked_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON FUTURE TABLES IN DATABASE identifier($segment_linked_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON ALL VIEWS IN DATABASE identifier($segment_linked_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON FUTURE VIEWS IN DATABASE identifier($segment_linked_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON ALL EXTERNAL TABLES IN DATABASE identifier($segment_linked_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON FUTURE EXTERNAL TABLES IN DATABASE identifier($segment_linked_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON ALL MATERIALIZED VIEWS IN DATABASE identifier($segment_linked_database) TO ROLE identifier($segment_linked_default_role);
GRANT SELECT ON FUTURE MATERIALIZED VIEWS IN DATABASE identifier($segment_linked_database) TO ROLE identifier($segment_linked_default_role);
```


(Optional) [Snowflake Schema Access](https://docs.snowflake.com/en/user-guide/security-access-control-privileges#table-privileges): If you want to restrict access to specific schemas or tables, then run the following command: 

```ts
-- [Optional] Further restrict access to only specific schemas and tables 
SET db='MY_DB';
SET schema='MY_DB.MY_SCHEMA_NAME';

-- View specific schemas in database
GRANT USAGE ON DATABASE identifier($db) TO ROLE identifier($segment_linked_default_role);

GRANT USAGE ON SCHEMA identifier($schema) TO ROLE identifier($segment_linked_default_role);

GRANT SELECT ON ALL TABLES IN SCHEMA identifier($schema) TO ROLE identifier($segment_linked_default_role);

GRANT SELECT ON FUTURE TABLES IN SCHEMA identifier($schema) TO ROLE identifier($segment_linked_default_role);
```

### (If applicable) Add table permissions if Reverse ETL has ever run in your database

If Reverse ETL has ever run in the database you are configuring as the Segment Internal DB, a Segment-managed schema is created and a new user is added. Add the Snowflake table permissions by running the following command.

```ts
-- If you want to use an existing database that already has Segment Reverse ETL schemas, you’ll need to run some additional steps below to grant the role access to the existing schemas.

SET retl_schema = concat($segment_internal_database,'.__segment_reverse_etl');

GRANT USAGE ON SCHEMA identifier($retl_schema) TO ROLE identifier($segment_linked_default_role);

GRANT CREATE TABLE ON SCHEMA identifier($retl_schema) TO ROLE identifier($segment_linked_default_role);

GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA identifier($retl_schema) TO ROLE identifier($segment_linked_default_role);
```

### Confirm permissions 

To verify you have set up the right permissions for a specific table, log in with the username and password you created for `SEGMENT_LINKED_USER` and run the following command to verify the role you created has the correct permissions. This command should succeed and you should be able to view the respective table.

```ts
set segment_linked_default_role='SEGMENT_LINKED_ROLE';
set segment_linked_database='YOUR_DB';
set table_name = 'YOUR_DB.SCHEMA.TABLE';

USE ROLE identifier($segment_linked_default_role);
USE DATABASE identifier($segment_linked_database) ;
SHOW SCHEMAS;
SELECT * FROM identifier($table) LIMIT 10;
```