---
title: Redshift Data Graph Setup
beta: true
plan: unify
redirect_from:
  - '/unify/linked-profiles/setup-guides/redshift-setup'
---

> info "Linked Audiences is in public beta"
> Linked Audiences (with Data Graph, Linked Events) is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. This feature is governed by Segment’s [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}.

On this page, you'll learn how to connect your Redshift data warehouse to Segment. 

## Getting started 

To get started with Redshift:
1. Log in to Redshift and select the Redshift cluster you want to connect. 
2. Follow these [networking instructions](/docs/connections/storage/catalog/redshift/#networking) to configure network and security settings.

## Step 1: Create a User and Role for Segment

Segment recommends creating a new Redshift user and role with only the required permissions.

- Create a new role and user for the Segment Data Graph. This new role will only have access to the datasets you provide access to for the Data Graph.
- **Segment requires write access to this database in order to create a schema for internal bookkeeping and to store checkpoint tables for the queries that are executed. Therefore, Segment recommends creating a new database for this purpose.** This is also the database you'll be required to specify for the "Database Name" when connecting Redshift with the Segment app.

> info ""
> Segment recommends creating a new database for the Data Graph.
> If you choose to use an existing database that has also been used for [Segment Reverse ETL](/docs/connections/reverse-etl/), you must follow the [additional instructions](#update-user-access-for-segment-reverse-etl-schema) to update user access for the Segment Reverse ETL schema.

Run the following SQL commands in your Redshift cluster:

```sql
-- ********** SET UP THE FOLLOWING WAREHOUSE PERMISSIONS **********
  
-- Create a user with role for the Data Graph
CREATE ROLE SEGMENT_LINKED_ROLE;
CREATE USER SEGMENT_LINKED_USER PASSWORD = "your_password";
GRANT ROLE SEGMENT_LINKED_ROLE TO SEGMENT_LINKED_USER;

-- Create and Grant access to a Segment internal DB used for bookkeeping. This is the only DB that Segment requires write access to. This is also the DB you will use in the "Database Name" config while setting up the connection in the Segment app. 
CREATE DATABASE SEGMENT_LINKED_PROFILES_DB;
GRANT CREATE ON DATABASE TO ROLE SEGMENT_LINKED_ROLE;
```

## Step 2: Grant read-only access to additional databases for the Data Graph

Next, give the Segment role **read-only** access to additional schemas you want to use for Data Graph including the Profiles Sync database. Repeat the following SQL query for **each** schema you want to use for the Data Graph.

```sql
-- ********** REPEAT THE SQL QUERY BELOW FOR EACH SCHEMA YOU WANT TO USE FOR THE DATA GRAPH **********
GRANT USAGE ON SCHEMA "the_schema_name" TO ROLE SEGMENT_LINKED_ROLE;
GRANT SELECT ON ALL TABLES IN SCHEMA "the_schema_name" TO ROLE SEGMENT_LINKED_ROLE;
```


## Step 3: Confirm permissions

To verify you have set up the right permissions for a specific table, log in with the username and password you created for `SEGMENT_LINKED_USER` and run the following command to verify the role you created has the correct permissions. If this command succeeds, you should be able to view the respective table.

```sql
SHOW SCHEMAS FROM DATABASE "THE_READ_ONLY_DB";
SELECT * FROM "THE_READ_ONLY_DB.A_SCHEMA.SOME_TABLE" LIMIT 10;
```
## Step 4: Connect your warehouse to the Data Graph

To connect your warehouse to the Data Graph:

1. Navigate to **Unify > Data Graph**. This should be a Unify space with Profiles Sync already set up.
2. Click **Connect warehouse**.
3. Select Redshift as your warehouse type.
4. Enter your warehouse credentials. Segment requires the following settings to connect to your Redshift warehouse:
- **Host Name**: The Redshift url
- **Port**: The Redshift connection port
- **Database**: The only database that Segment requires write access to in order to create tables for internal bookkeeping. This database is referred to as `segment_linked_profiles_db` in the sql above
- **Username**: The Redshift user that Segment uses to run SQL in your warehouse. This user is referred to as `segment_linked_user` in the sql above
- **Password**: The password of the user above.
5. Test your connection, then click Save.

## Update user access for Segment Reverse ETL schema
If Segment Reverse ETL has ever run in the database you are configuring as the Segment connection database, a Segment-managed schema is already created and you need to provide the new Segment user access to the existing schema. Run the following SQL if you run into an error on the Segment app indicating that the user doesn't have sufficient privileges on an existing `_segment_reverse_etl` schema.

```sql
-- If you want to use an existing database that already has Segment Reverse ETL schemas, you’ll need to run some additional steps below to grant the role access to the existing schemas.

GRANT USAGE ON SCHEMA segment_connection_db.__segment_reverse_etl TO ROLE identifier($segment_connection_role);
GRANT CREATE TABLE ON SCHEMA identifier($retl_schema) TO ROLE SEGMENT_LINKED_ROLE;
GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA segment_connection_db.__segment_reverse_etl TO ROLE SEGMENT_LINKED_ROLE;
```
