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
4. Grant the `segment` user the following permissions: 
    * Read permissions for any resources (databases, schemas, tables) the query needs to access. 
    * Write permissions for the Segment managed schema (`__segment_reverse_etl`), which keeps track of changes to the query results.  
5. Return to the Segment app and add the account information for your source.
5. Click **Test Connection** to test to see if the connection works.
6. Click **Add source** if the test connection is successful.

After adding your data warehouse as a Reverse ETL source, create a model, or a SQL query that defines sets of data you want to synchronize to your Reverse ETL destinations. 

<div class="double">
  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/source-setup-catalog" newtab="false" icon="symbols/arrow-left.svg" title="Reverse ETL source catalog" description="Select a guide to set up your warehouse used for Reverse ETL." variant="related" subtitle="back" %}

  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/create-a-model/" newtab="false" icon="symbols/arrow-right.svg" title="Create a model" description="After adding your warehouse as a source, create a SQL query that defines sets of data you want to synchronize to your Reverse ETL destinations." variant="related" subtitle="next" %}
</div>

## Troubleshooting
### Extraction failures: relation does not exist
If you are able to run the query in the Query Builder, but the sync fails with the `relation does not exist` error, please make sure the schema name is included before the database table name, and check that the schema name is correct:
```ts
SELECT id FROM <schema_name>.<table_name>
```