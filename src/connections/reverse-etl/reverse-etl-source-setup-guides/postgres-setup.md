---
title: Postgres Reverse ETL Setup
---

Set up Postgres as your Reverse ETL source.

At a high level, when you set up Postgres for Reverse ETL, the configured user/role needs read permissions for any resources (databases, schemas, tables) the query needs to access. Segment keeps track of changes to your query results with a managed schema (`__SEGMENT_REVERSE_ETL`), which requires the configured user to allow write permissions for that schema.

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
    ```
4. Make sure the user has correct access permissions to the database.
5. Follow the steps listed in the [Add a source](/docs/connections/reverse-etl/#step-1-add-a-source) section to finish adding Postgres as a source. 

## Extra permissions
* Give the `segment` user read permissions for any resources (databases, schemas, tables) the query needs to access. 

* Give the `segment` user write permissions for the Segment managed schema (`__segment_reverse_etl`), which keeps track of changes to the query results.  