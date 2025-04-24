---
title: Postgres Reverse ETL Setup
---

Set up Postgres as your Reverse ETL source.

At a high level, when you set up Postgres for Reverse ETL, the configured user/role needs read permissions for any resources (databases, schemas, tables) the query needs to access. Segment keeps track of changes to your query results with a managed schema (`__SEGMENT_REVERSE_ETL`), which requires the configured user to allow write permissions for that schema.

> info "Postgres Reverse ETL sources support Segment's dbt extension"
> If you have an existing dbt account with a Git repository, you can use [Segment's dbt extension](/docs/segment-app/extensions/dbt/) to centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes.

Segment supports the following Postgres database providers:
- Heroku
- RDS

> warning ""
> Segment only supports these Postgres database providers. Postgres databases from other providers aren't guaranteed to work. For questions or concerns about Segment-supported Postgres providers, [contact Segment Support](https://segment.com/help/contact){:target="_blank"}.

## Set up guide
To set up Postgres with Reverse ETL:

1. Log in to your Postgres account.
2. Configure the correction network and security settings for your Postgres database. 
    * If you're using RDS Postgres, follow [this guide](/docs/connections/storage/catalog/postgres/#network-permissions-for-segment-to-rds). 
    * Make sure [the following IP addresses](/docs/connections/storage/warehouses/faq/#which-ips-should-i-allowlist) can access the database. 
3. Run the SQL commands below to create a user named `segment`.

    ```sql
    -- create a user named "segment" that Segment will use when connecting to your Postgres cluster.
    CREATE USER segment PASSWORD '<enter password here>';

    -- allows the "segment" user to create new schemas on the specified database. (this is the name you chose when provisioning your cluster) 
    GRANT CREATE ON DATABASE "<enter database name here>" TO "segment";
   
    -- create Segment schema
    CREATE SCHEMA __segment_reverse_etl;
   
    -- Allow user to use the Segment schema
    GRANT USAGE ON SCHEMA __segment_reverse_etl TO segment;

    -- Grant all privileges on all existing tables in the Segment schema
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA __segment_reverse_etl TO segment;
    ```
4. Make sure the user has correct access permissions to the database.
5. Follow the steps listed in the [Add a source](/docs/connections/reverse-etl/setup/#step-1-add-a-source) section to finish adding Postgres as a source. 

## Extra permissions
* Give the `segment` user read permissions for any resources (databases, schemas, tables) the query needs to access. 

* Give the `segment` user write permissions for the Segment managed schema (`__SEGMENT_REVERSE_ETL`), which keeps track of changes to the query results.  

After you've successfully added your Postgres source, [add a model](/docs/connections/reverse-etl/setup/#step-2-add-a-model) and follow the rest of the steps in the Reverse ETL setup guide.

### How to use the same user for a Postgres destination and Reverse ETL source
If you’re using the same database user for both a Segment [Postgres warehouse destination](/docs/connections/storage/catalog/postgres/) (where Segment writes data into Postgres) and Reverse ETL source (where Segment reads data from Postgres), make sure the user has:
- SELECT or READ access on all source tables for Reverse ETL
- CREATE SCHEMA `__SEGMENT_REVERSE_ETL` permission (or ability to use an existing schema)
- INSERT, UPDATE, and DELETE permissions on tables within `__SEGMENT_REVERSE_ETL`
