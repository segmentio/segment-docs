---
title: Redshift Data Graph Setup
beta: true
plan: unify
redirect_from:
  - '/unify/linked-profiles/setup-guides/redshift-setup'
---

> info ""
> Redshift for Data Graph is in beta and Segment is actively working on this feature. Some functionality may change before it becomes generally available. This feature is governed by Twilio Segment’s [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}.

Set up your Redshift data warehouse to Segment for the [Data Graph](/docs/unify/data-graph/).

## Getting started 

You need to be an account admin to set up the Segment Redshift connector as well as write permissions for the `__segment_reverse_etl` dataset.

To get started with Redshift:
1. Log in to Redshift and select the Redshift cluster you want to connect. 
2. Follow the [networking instructions](/docs/connections/storage/catalog/redshift/#networking) to configure network and security settings.

## Step 1: Roles and permissions
Segment recommends you to create a new Redshift user and role with only the required permissions.

1. Create a new role and user for the Segment Data Graph. This new role will only have access to the datasets you provide access to for the Data Graph.
2. Provide write access to the database as Segment requires this in order to create a schema for internal bookkeeping and to store checkpoint tables for the queries that are executed. Segment recommends you to create a new database for this purpose. This is also the database you'll be required to specify for the **Database Name** when connecting Redshift with the Segment app.

## Step 2: Create database for Segment to store checkpoint tables

> info ""
> Segment recommends you to create a new database for the Data Graph. If you choose to use an existing database that has also been used for [Segment Reverse ETL](/docs/connections/reverse-etl/), you must follow the [additional instructions](#update-user-access-for-segment-reverse-etl-schema) to update user access for the Segment Reverse ETL schema.

Run the following SQL commands in your Redshift cluster:

```sql
-- ******** SET UP THE FOLLOWING WAREHOUSE PERMISSIONS ********

-- Create a user with role for the Data Graph
CREATE ROLE SEGMENT_LINKED_ROLE;
CREATE USER SEGMENT_LINKED_USER PASSWORD "your_password";
GRANT ROLE SEGMENT_LINKED_ROLE TO SEGMENT_LINKED_USER;

-- Create and Grant access to a Segment internal DB used for bookkeeping. This is the only DB that Segment requires write access to. This is also the DB you will use in the "Database Name" config while setting up the connection in the Segment app.

CREATE DATABASE SEGMENT_LINKED_PROFILES_DB;
GRANT CREATE ON DATABASE SEGMENT_LINKED_PROFILES_DB TO ROLE SEGMENT_LINKED_ROLE;
```

## Step 3: Grant read-only access for the Data Graph
Give the Segment role read-only access to additional schemas you want to use for Data Graph including the Profiles Sync database. 

### Schemas
Grant schema permissions based on customer need. See Amazon’s docs to view [schema permissions](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT.html){:target="_blank"} and [example commands](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT-examples.html){:target="_blank"} that you can use to grant permissions. Repeat the following SQL query for each schema you want to use for the Data Graph.

```sql
-- ********** REPEAT THE SQL QUERY BELOW FOR EACH SCHEMA YOU WANT TO USE FOR THE DATA GRAPH **********

GRANT USAGE ON SCHEMA "the_schema_name" TO ROLE SEGMENT_LINKED_ROLE;
```

### Table
Grant table permissions based on your needs. Learn more about [Amazon’s table permissions](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT.html){:target="_blank"}.

Table permissions can either be handled in bulk:
```sql
-- query data from a all tables in a schema
GRANT SELECT ON ALL TABLES IN SCHEMA "the_schema_name" TO ROLE SEGMENT_LINKED_ROLE;
```

Or in a more granular fashion if needed: 
```sql
-- query data from a specific table in a schema
GRANT SELECT ON TABLE <schema-name>.<table-name> TO ROLE segment_linked_role;
```


## Create a new role and user

Run the SQL commands below to create a role (`segment_entities`) and user (`segment_entities_user`).

```sql
-- create role
CREATE ROLE segment_entities;

-- allow the role to create new schemas on specified database. (This is the name you chose when provisioning your cluster)
GRANT CREATE ON DATABASE "<enter database name here>" TO ROLE segment_entities;

-- create a user named "segment_entities_user" that Segment will use when connecting to your Redshift cluster. 
CREATE USER segment_entities_user PASSWORD '<enter password here>';

-- grant role permissions to the user
GRANT ROLE segment_entities TO segment_entities_user;
```

## Grant access to schemas and tables

You'll need to grant access to schemas and tables that you'd like to enrich with. This allows Segment to list schemas, tables, and columns, as well as create entities with data extracted and ingested to Segment.

### Schemas

Grant schema permissions based on customer need. Visit Amazon's docs to view [schema permissions](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT.html){:target="_blank"} and [example commands](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT-examples.html){:target="_blank"} that you can use to grant permissions.

```ts
-- view specific schemas in database
GRANT USAGE ON SCHEMA <schema-name> TO ROLE segment_entities;
```

### Tables

Grant table permissions based on customer need. Learn more about Amazon's [table permissions](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT.html){:target="_blank"}.

```ts
-- query data from a specific table in a schema
GRANT SELECT ON TABLE <schema-name>.<table-name> TO ROLE segment_entities;
```

### RETL table permissions

If you used RETL in your database, you'll need to add the following [table permissions](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT.html){:target="_blank"}:

```ts
GRANT USAGE, CREATE ON SCHEMA __segment_reverse_etl TO ROLE segment_entities;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA __segment_reverse_etl TO ROLE segment_entities;
```
