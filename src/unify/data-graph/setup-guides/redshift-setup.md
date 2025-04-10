---
title: Redshift Data Graph Setup
beta: true
plan: unify
redirect_from:
  - '/unify/linked-profiles/setup-guides/redshift-setup'
---

Set up your Redshift data warehouse to Segment for the [Data Graph](/docs/unify/data-graph/).

## Prerequisite

If you're setting up Profiles Sync for the first time in the Unify space, go through the setup flow for Selective sync. If Profiles Sync is already set up for your Unify space, follow these steps to configure Profiles Sync for your Unify space:

1. Navigate to **Unify > Profile Sync**.
2. Select the **Settings** tab and select **Selective sync**. 
3. Select all the tables under **Profile raw tables**. These include, `external_id_mapping_updates`, `id_graph_updates`, `profile_traits_updates`. Linked Audiences require Profile Sync to be configured such that both the Profile raw tables and the Profile materialized tables are synchronized with your Redshift instance.
4. Select all of the tables under **Profile materialized tables**. These include `profile_merges`, `user_traits`, `user_identifiers`. This allows faster and more cost-efficient Linked Audiences computations in your data warehouse. 
5. Select **Sync all Track Call Tables** under **Track event tables** to enable filtering on event history for Linked Audiences conditions. 

## Getting started 

You need to be an AWS Redshift account admin to set up the Segment Redshift connector as well as write permissions for the `__segment_reverse_etl` dataset.

To get started with Redshift:
1. Log in to Redshift and select the Redshift cluster you want to connect. 
2. Follow the [networking instructions](/docs/connections/storage/catalog/redshift/#networking) to configure network and security settings.

## Step 1: Roles and permissions
Segment recommends you to create a new Redshift user and role with only the required permissions.

Create a new role and user for the Segment Data Graph. This new role will only have access to the datasets you provide access to for the Data Graph. Run the SQL commands in your Redshift cluster:

  ```sql
  -- Create a user with role for the Data Graph
  CREATE ROLE SEGMENT_LINKED_ROLE;
  CREATE USER SEGMENT_LINKED_USER PASSWORD "your_password";
  GRANT ROLE SEGMENT_LINKED_ROLE TO SEGMENT_LINKED_USER;
  ```

## Step 2: Create a database for Segment to store checkpoint tables

> info ""
> Segment recommends you to create a new database for the Data Graph. If you choose to use an existing database that has also been used for [Segment Reverse ETL](/docs/connections/reverse-etl/), you must follow the [additional instructions](#update-user-access-for-segment-reverse-etl-dataset) to update user access for the Segment Reverse ETL schema.

Provide write access to the database as Segment requires this in order to create a schema for internal bookkeeping and to store checkpoint tables for the queries that are executed. Segment recommends you to create a new database for this purpose. This is also the database you'll be required to specify for the **Database Name** when connecting Redshift with the Segment app.

Run the following SQL commands in your Redshift cluster:

```sql
-- Create and Grant access to a Segment internal DB used for bookkeeping 

CREATE DATABASE SEGMENT_LINKED_PROFILES_DB;
GRANT CREATE ON DATABASE SEGMENT_LINKED_PROFILES_DB TO ROLE SEGMENT_LINKED_ROLE;
```

## Step 3: Grant read-only access for the Data Graph
Grant the Segment role read-only access to additional schemas you want to use for the Data Graph including the Profiles Sync database. 

To locate the Profile Sync database, navigate to **Unify > Profiles Sync > Settings > Connection Settings**. You will see the database and schema name. 

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
-- query data from all tables in a schema
GRANT SELECT ON ALL TABLES IN SCHEMA "the_schema_name" TO ROLE SEGMENT_LINKED_ROLE;
```

Or in a more granular fashion if needed: 

```sql
-- query data from a specific table in a schema
GRANT SELECT ON TABLE <schema-name>.<table-name> TO ROLE segment_linked_role;
```

## Step 4: Validate permissions
To verify you have set up the right permissions for a specific table, log in with the username and password you created for `SEGMENT_LINKED_USER` and run the following command to verify the role you created has the correct permissions. If this command succeeds, you should be able to view the respective table.

```sql
SHOW SCHEMAS FROM DATABASE "THE_READ_ONLY_DB";
SELECT * FROM "THE_READ_ONLY_DB.A_SCHEMA.SOME_TABLE" LIMIT 10;
```

## Step 5: Connect your warehouse to Segment
To connect your warehouse to Segment:
1. Navigate to **Unify > Data Graph**. This should be a Unify space with Profiles Sync already set up.
2. Click **Connect warehouse**.
3. Select **Redshift** as your warehouse type.
4. Enter your warehouse credentials. Segment requires the following settings to connect to your Redshift warehouse:
   * **Host Name:** The Redshift URL
   * **Port:** The Redshift connection port
   * **Database:** The only database that Segment requires write access to in order to create tables for internal bookkeeping. This database is referred to as `segment_linked_profiles_db` in the SQL above.
   * **Username:** The Redshift user that Segment uses to run SQL in your warehouse. This user is referred to as `segment_linked_user` in the SQL above.
   * **Password:**  The password of the user above
5. Test your connection, then click **Save**.

## Update user access for Segment Reverse ETL dataset
If Segment Reverse ETL ran in the project you are configuring as the Segment connection project, a Segment-managed dataset is already created, and you need to provide the new Segment user access to the existing dataset. Run the following SQL if you run into an error on the Segment app indicating that the user doesn’t have sufficient privileges on an existing `__segment_reverse_etl`:

```sql
-- If you want to use an existing database that already has Segment Reverse ETL schemas, you’ll need to run some additional steps below to grant the role access to the existing schemas.

GRANT USAGE, CREATE, DROP ON SCHEMA segment_connection_db.__segment_reverse_etl TO ROLE SEGMENT_LINKED_ROLE;
GRANT SELECT,INSERT,UPDATE,DELETE,DROP ON ALL TABLES IN SCHEMA segment_connection_db.__segment_reverse_etl TO ROLE SEGMENT_LINKED_ROLE;
```
