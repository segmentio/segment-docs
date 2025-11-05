---
title: Snowflake Reverse ETL Setup
beta: true
redirect_from:
  - '/reverse-etl/snowflake-setup/'
---

Set up Snowflake as your Reverse ETL source. 

At a high level, when you set up Snowflake for Reverse ETL, the configured user/role needs read permissions for any resources (databases, schemas, tables) the query needs to access. Segment keeps track of changes to your query results with a managed schema <br>(`__SEGMENT_REVERSE_ETL`), which requires the configured user to allow write permissions for that schema.


> info "Snowflake Reverse ETL sources support Segment's dbt extension"
> If you have an existing dbt account with a Git repository, you can use [Segment's dbt extension](/docs/segment-app/extensions/dbt/) to centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes.

## Set up guide
Follow the instructions below to set up the Segment Snowflake connector. Segment recommends you use the `ACCOUNTADMIN` role to execute all the commands below, and that you create a user that authenticates with an encrypted key pair. Snowflake plans to deprecate password-only authentication starting August 2026. Learn more in the [Snowflake docs](https://docs.snowflake.com/en/user-guide/security-mfa-rollout){:target="_blank"}.

> info ""
> Segment has a Terraform provider, powered by the Public API, that you can use to create a Snowflake Reverse ETL source. See the [segment_source (Resource)](https://registry.terraform.io/providers/segmentio/segment/latest/docs/resources/source){:target="_blank”} documentation for more information.

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
   GRANT CREATE TABLE ON SCHEMA __segment_reverse_etl TO ROLE segment_reverse_etl;
   ```
6. Enter and run one of the following code snippets below to create the user Segment uses to run queries. 

   1. To create a user that authenticates with a key pair, you need to first create the user and assign it a key pair following the instructions in the [Snowflake docs](https://docs.snowflake.com/en/user-guide/key-pair-auth){:target="_blank”}. 

   2. Execute the following SQL commands: 

   ``` sql
   -- create user (key-pair authentication)
   CREATE USER segment_reverse_etl_user
   DEFAULT_ROLE = segment_reverse_etl
   RSA_PUBLIC_KEY = 'enter your public key';

   -- role access
   GRANT ROLE segment_reverse_etl TO USER segment_reverse_etl_user;
   ```
7. Add the account information for your source.  
8. Click **Test Connection** to test to see if the connection works.
9. Click **Add source** if the test connection is successful.


Learn more about the Snowflake Account ID in Snowflake's [Account identifiers](https://docs.snowflake.com/en/user-guide/admin-account-identifier.html){:target="_blank"} documentation.

After you've successfully added your Snowflake source, [add a model](/docs/connections/reverse-etl/setup/#step-2-add-a-model) and follow the rest of the steps in the Reverse ETL setup guide.

## Security
### Allowlisting IPs
If you create a network policy with Snowflake and are located in the US, add  `52.25.130.38/32` and `34.223.203.0/28` to the "Allowed IP Addresses" list.

If you create a network policy with Snowflake and are located in the EU, add `3.251.148.96/29` to your "Allowed IP Addresses" list.
