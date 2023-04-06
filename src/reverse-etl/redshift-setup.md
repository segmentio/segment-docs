---
title: Redshift Reverse ETL Setup
beta: true
---

Set up Redshift as your Reverse ETL source. 

> info ""
> Redshift for Reverse ETL is in beta and Segment’s [First-Access and Beta terms](https://segment.com/legal/first-access-beta-preview/) govern this feature. If you’d like to learn more, reach out to your CSM, AE, or SE.

To set up Redshift with Reverse ETL: 
1. Log in to Redshift and select the Redshift cluster you want to connect with Reverse ETL.
2. Follow the [networking instructions](/docs/connections/storage/catalog/redshift/#networking) to configure the correct network and security settings. 
3. Run the SQL commands below to create a user named `segment`. 

    ```sql
    -- create a user named "segment" that Segment will use when connecting to your Redshift cluster.
    CREATE USER segment PASSWORD '<enter password here>';

    -- allows the "segment" user to create new schemas on the specified database. (this is the name you chose when provisioning your cluster)
    GRANT CREATE ON DATABASE "<enter database name here>" TO "segment";
    ```
4. Follow the steps listed in the [Add a source](/docs/reverse-etl#step-1-add-a-source) section to finish adding Redshift as your source.

### Extra Permissions
Give the `segment` user read permissions for any resources (databases, schemas, tables) the query needs to access. 

Give the `segment` user write permissions for the Segment managed schema (`__segment_reverse_etl`), which keeps track of changes to the query results.  