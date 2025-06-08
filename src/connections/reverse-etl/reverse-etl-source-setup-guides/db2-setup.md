---
title: DB2 Reverse ETL Setup
---

Set up DB2 as your Reverse ETL source.

At a high level, when you set up DB2 for Reverse ETL, the configured database user must have read permissions on any tables involved in the query, and write permissions on a managed schema (`SEGMENT_REVERSE_ETL`) that Segment uses to track sync progress. Authentication is handled through username and password credentials configured in the Segment app.



## Required permissions

In order to run a Reverse-ETL sync in a DB2 warehouse, Segment needs the following permissions:

1. **Permission to read from all tables used in the model** (i.e., the tables included in your SELECT query).
2. **Permission to create and manage a schema** for tracking sync metadata.


> info "Use a dedicated user for Segment"
> It's recommended to create a dedicated DB2 user for Segment with access limited to only the relevant schemas and tables.

1. Open the Db2 warehouse and navigate to  **Administration > User management**.
2. Click **Add**.
3. Create a new user with *user* privileges. Make sure you save the username and password, as these are required to set up the Segment configuration in a later step.


> info ""
> The `SEGMENT_REVERSE_ETL` schema will be created and managed by Segment to track the status of each sync. 
> You can also choose to create this schema yourself by running: 
> `CREATE SCHEMA SEGMENT_REVERSE_ETL` 
> and explicitly grant Segment privileges on it.



Run the below SQL commands to grant Segment the required permissions:

```sql
-- Grant permissions to create manage objects within the SEGMENT_REVERSE_ETL schema
GRANT CREATEIN, DROPIN ON SCHEMA SEGMENT_REVERSE_ETL TO USER <username>;
GRANT CREATETAB ON DATABASE TO USER <username>;

-- Grant read access on each table used in the model
GRANT SELECT ON TABLE <schema_name>.<table_name> TO USER <username>;
```


## Set up guide

To set up DB2 as your Reverse ETL source:

1. Make sure your DB2 database is network-accessible from [Segment's IPs](/docs/connections/storage/warehouses/faq/#which-ips-should-i-allowlist).
2. Open [your Segment workspace](https://app.segment.com/workspaces){:target="_blank"}.
3. Navigate to **Connections > Sources** and select the **Reverse ETL** tab.
4. Click **+ Add Reverse ETL source**.
5. Select **DB2** and click **Add Source**.
6. Enter the configuration settings for your DB2 source:
  * Hostname: `<hostname>`
  * Port: `<port>`
  * Database: `<db_name>`
  * Username: `<segment_db2_user>`
  * Password: `<password>`
  * Schema [optional]: If not specified, Segment will use the user’s default schema
7. Click **Test Connection** to validate the setup.
8. If the connection is successful, click **Add source**.

After you've successfully added your DB2 source, [add a model](/docs/connections/reverse-etl/setup/#step-2-add-a-model) and follow the rest of the steps in the Reverse ETL setup guide.
