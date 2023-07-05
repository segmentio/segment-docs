---
title: Redshift Reverse ETL Setup
beta: true
redirect_from:
  - '/reverse-etl/redshift-setup/'
---

Set up Redshift as your Reverse ETL source. 

To set up Redshift with Reverse ETL: 
1. Log in to Redshift and select the Redshift cluster you want to connect with Reverse ETL.
2. Follow the [networking instructions](/docs/connections/storage/catalog/redshift/#networking) to configure the correct network and security settings. 
3. Run the SQL commands below to create a user named `segment`. 

    ```ts
    -- create a user named "segment" that Segment will use when connecting to your Redshift cluster.
    CREATE USER segment PASSWORD '<enter password here>';

    -- allows the "segment" user to create new schemas on the specified database. (this is the name you chose when provisioning your cluster)
    GRANT CREATE ON DATABASE "<enter database name here>" TO "segment";
    ```
4. Follow the steps listed in the [Add a source](/docs/connections/reverse-etl#step-1-add-a-source) section to finish adding Redshift as your source.

## Extra Permissions
Give the `segment` user read permissions for any resources (databases, schemas, tables) the query needs to access. 

Give the `segment` user write permissions for the Segment managed schema (`__segment_reverse_etl`), which keeps track of changes to the query results.  

## Troubleshooting
#### Extraction failures: relation does not exist
If you are able to run the query in the Query Builder, but the sync fails with the `relation does not exist` error, please make sure the schema name is included before the database table name, and check that the schema name is correct:
```ts
SELECT id FROM <schema_name>.<table_name>
```
