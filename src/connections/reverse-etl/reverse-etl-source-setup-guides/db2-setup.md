---
title: Db2 Reverse ETL Setup
---

Set up Db2 as your Reverse ETL source.

At a high level, when you set up Db2 for Reverse ETL, the configured database user must have read permissions on any tables involved in the query and write permissions on a managed schema (`SEGMENT_REVERSE_ETL`) that Segment uses to track sync progress. Segment authenticates with your Db2 instance through a username and password. 



## Required permissions

In order to run a Reverse ETL sync in your Db2 warehouse, you'll create a user with the following permissions:

* **Permission to read from all tables used in the model**: The user must be able to access all tables included in your SELECT query.
* **Permission to create and manage a schema**: Segment creates and manages a schema in your warehouse to track sync metadata.
* **Permission to create tables in the database**: Segment creates metadata tables in your warehouse. 


> info "Create a dedicated user for Segment's Reverse ETL connection"
> Segment recommends that you create a dedicated Db2 user for when setting up Reverse ETL. This user should only have access to the relevant schemas and tables you'll need to access during syncs between Segment and your warehouse. 

1. In IBM Cloud, go to your Db2 instance and navigate to **Administration > User management**.
2. Click **Add**.
3. Create a new user with *user* privileges. Make sure to save the username and password—these are needed to configure the Segment
   source connection later.


> info ""
> The `SEGMENT_REVERSE_ETL` schema will be created and managed by Segment to track the status of each sync. 
> You can also choose to create this schema yourself by running: 
> `CREATE SCHEMA SEGMENT_REVERSE_ETL` 
> Then grant Segment the appropriate privileges.



Run the following SQL commands to grant Segment the required permissions:

```sql
-- Grant permissions to create and manage objects within the SEGMENT_REVERSE_ETL schema
GRANT CREATEIN, DROPIN ON SCHEMA SEGMENT_REVERSE_ETL TO USER <username>;

-- Grant permission to create tables in the database
GRANT CREATETAB ON DATABASE TO USER <username>;

-- Grant read access on each table used in the model
GRANT SELECT ON TABLE <schema_name>.<table_name> TO USER <username>;
-- Repeat the above command for all tables involved in your model
```


## Set Up Guide

To set up DB2 as your Reverse ETL source:

1. Make sure your DB2 database is network-accessible from [Segment's IPs](/docs/connections/storage/warehouses/faq/#which-ips-should-i-allowlist).
2. Open [your Segment workspace](https://app.segment.com/workspaces){:target="_blank"}.
3. Navigate to **Connections > Sources** then select the **Reverse ETL** tab.
4. Click **+ Add Reverse ETL source**.
5. Select **DB2** and click **Add Source**.
6. Fill in the DB2 connection settings:
  * Hostname: `<hostname>`
  * Port: `<port>`
  * Database: `<db_name>`
  * Username: `<segment_db2_user>`
  * Password: `<password>`
7. Click **Test Connection** to validate the setup.
8. If the connection is successful, click **Add source**.

After successfully adding your DB2 source, [add a model](/docs/connections/reverse-etl/setup/#step-2-add-a-model) and follow the rest of the steps in the Reverse ETL setup guide.
