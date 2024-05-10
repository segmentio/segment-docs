---
title: Snowflake Destination
rewrite: true
redirect_from:
  - '/connections/warehouses/catalog/snowflake/'
---

{% include content/warehouse-ip.html %}

[Snowflake](https://docs.snowflake.net/manuals/index.html){:target="_blank"} is a data warehouse, built for the cloud, that delivers performance, simplicity, concurrency and affordability.

## Getting started

There are six steps to get started using Snowflake with Segment. 

1. [Create a virtual warehouse](#step-1-create-a-virtual-warehouse)
2. [Create a database](#step-2-create-database)
3. [Create a role for Segment](#step-3-create-role-for-segment)
4. [Create a user for Segment](#step-4-create-user-for-segment)
5. [Test the user and credentials](#step-5-test-the-user-and-credentials)
6. [Connect Snowflake to Segment](#step-6-connect-snowflake-to-segment)

### Prerequisites 

To set up the virtual warehouse, database, role, and user in Snowflake for Segment's Snowflake destination, you must have the `ACCOUNTADMIN` role, or, a custom role with the following [Snowflake privileges](https://docs.snowflake.com/en/user-guide/security-access-control-overview#label-access-control-overview-privileges){:target="_blank"}: 

- [CREATE WAREHOUSE](https://docs.snowflake.com/en/sql-reference/sql/create-warehouse#access-control-requirements){:target="_blank"}: Used to create a Segment-specific virtual warehouses
- [CREATE DATABASE](https://docs.snowflake.com/en/sql-reference/sql/create-database#access-control-requirements){:target="_blank"}: Used to create a Segment-specific database
- [CREATE ROLE](https://docs.snowflake.com/en/sql-reference/sql/create-role#access-control-requirements){:target="_blank"}: Used to create the role that the Segment user assumes in your Snowflake instance
- [CREATE USER](https://docs.snowflake.com/en/sql-reference/sql/create-user#access-control-requirements){:target="_blank"}: Used to create the Segment user in your Snowflake instance

To set up the Snowflake storage destination in Segment, you must have either a [role in the Segment app](/docs/segment-app/iam/roles/) of _Workspace Owner_ or, for Business Tier users, _Warehouse Destination Admin_. 

### Step 1: Create a virtual warehouse

Segment's Snowflake destination requires you to first create a Snowflake [virtual warehouse](https://docs.snowflake.com/en/user-guide/warehouses){:target="_blank"}. 

To avoid conflicts with other operations in your cluster, Segment recommends that you create a new warehouse just for Segment loads, but this is not mandatory. An X-Small warehouse works for most Segment customers when they first create their Snowflake destination.

To create a new virtual warehouse, navigate to **Warehouses** > **Create** in Snowflake's Classic Console or execute the following SQL command:

```sql
CREATE WAREHOUSE "SEGMENT_WAREHOUSE"
  WITH WAREHOUSE_SIZE = 'XSMALL'
    WAREHOUSE_TYPE = 'STANDARD'
    AUTO_SUSPEND = 600
    AUTO_RESUME = TRUE;
```

> success ""
> Set `AUTO_SUSPEND` to ~10 minutes in the UI (or 600 if using SQL) and enable `AUTO_RESUME` to avoid extra costs, as Snowflake uses [per-second billing](https://docs.snowflake.com/en/user-guide/warehouses-considerations#automating-warehouse-suspension){:target="_blank"}. 

### Step 2: Create Database

Segment recommends creating a new database just for Segment information, as the Segment Snowflake destination creates its own schemas and tables and could create name conflicts with your existing data.

To create a new database, execute the following SQL command:

```sql
CREATE DATABASE "SEGMENT_EVENTS";
```

### Step 3: Create role for Segment

You need to run these SQL commands rather than creating a role with the "Create Role" dialog in the Classic Console UI.

This role gives Segment just enough permission to load data into your database. Segment recommends that you don't reuse this role for other operations.
1. Click on **Worksheets**
2. Select SEGMENT_EVENTS under database objects
3. Change role to `ACCOUNTADMIN`
4. Create a new role by executing the following command:
```sql
CREATE ROLE "SEGMENT";
```

5. Grant access to the virtual warehouse by executing the following SQL command:
```sql
GRANT USAGE ON WAREHOUSE "SEGMENT_WAREHOUSE" TO ROLE "SEGMENT";
```

6. Grant access to the database by executing the following SQL command:
```sql
GRANT USAGE ON DATABASE "SEGMENT_EVENTS" TO ROLE "SEGMENT";
GRANT CREATE SCHEMA ON DATABASE "SEGMENT_EVENTS" TO ROLE "SEGMENT";
```

### Step 4: Create user for Segment

You need to create the user that Segment uses to connect to your warehouse. Be sure to use a strong, unique password.

```sql
CREATE USER "SEGMENT_USER"
  MUST_CHANGE_PASSWORD = FALSE
  DEFAULT_ROLE = "SEGMENT"
  PASSWORD = "my_strong_password"; -- Do not use this password
GRANT ROLE "SEGMENT" TO USER "SEGMENT_USER";
```

### Step 5: Test the user and credentials

Before you continue, test and validate the new user and credentials. When you can run the following commands successfully, you can connect Snowflake to Segment.

Segment uses [SnowSQL](https://docs.snowflake.com/en/user-guide/snowsql){:target="_blank"} to run these verification steps.
To install SnowSQL and verify your accounts:

1. Download [SnowSQL](https://docs.snowflake.com/en/user-guide/snowsql){:target="_blank"}
2. Open the Installer and follow instructions
3. Once the installation is complete, run the following command, replacing "account" and "user" with your Snowflake Account ID and username:

```
snowsql -a <account>  -u <user>
```

For accounts outside the US, the account ID includes the region. You can find your account name from the browser address string.

For example, if your web address is `https://myaccountname.snowflakecomputing.com/console#/internal/worksheet`, your account name would be `myaccountname`.

You can also find part of your account name by running the following query on your worksheet in Snowflake:

```sql
SELECT CURRENT_ACCOUNT();
```
4. Enter password when prompted.

5. Run the following:

```
~$ snowsql --accountname myb10 --username SEGMENT_USER
Password:
* SnowSQL * v1.1.46
Type SQL statements or !help
SEGMENT_USER#(no warehouse)@(no database).(no schema)>SELECT 1;
+---+
| 1 |
|---|
| 1 |
+---+
1 Row(s) produced. Time Elapsed: 0.093s
SEGMENT_USER#(no warehouse)@(no database).(no schema)>USE WAREHOUSE "SEGMENT_WAREHOUSE";
+----------------------------------+
| status                           |
|----------------------------------|
| Statement executed successfully. |
+----------------------------------+
1 Row(s) produced. Time Elapsed: 0.118s
SEGMENT_USER#SEGMENT_WAREHOUSE@(no database).(no schema)>USE DATABASE "SEGMENT_EVENTS";
+----------------------------------+
| status                           |
|----------------------------------|
| Statement executed successfully. |
+----------------------------------+
1 Row(s) produced. Time Elapsed: 0.130s
SEGMENT_USER#SEGMENT_WAREHOUSE@SEGMENT_EVENTS.(no schema)>!exit
```

If you would like to use the web interface, switch to the new role for the Segment user, create a new Worksheet and execute:

```sql
SELECT 1;
USE WAREHOUSE "SEGMENT_WAREHOUSE";
USE DATABASE "SEGMENT_EVENTS";
```

### Step 6: Connect Snowflake to Segment

After configuring your Snowflake resources, connect them to Segment.

1. In the Segment App, select Add Destination.
2. Search for and select "Snowflake".
3. Add your credentials as follows:
  - **User**: The user name that you created in [Step 4: Create user for Segment](#step-4-create-user-for-segment)
  - **Password**: The password that you set in [Step 4: Create user for Segment](#step-4-create-user-for-segment)
  - **Account**: The account id of your cluster, not the url (for example, url: `my-business.snowflakecomputing.com`, account-id: `my-business`. **Note:** If you are using Snowflake on AWS, the account id includes the region. For example, your url might be: `my-business.us-east-1.snowflakecomputing.com/` and your account-id would be: `my-business.us-east-1`)
  - **Database**: The database name that you created in [Step 2: Create database](#step-2-create-database)
  - **Warehouse**: The name of the warehouse that you created in [Step 1: Create a virtual warehouse](#step-1-create-a-virtual-warehouse)

## Security

### Allowlisting IPs

If you create a network policy with Snowflake and are located in the US, add  `52.25.130.38/32` and `34.223.203.0/28` to the "Allowed IP Addresses" list.

If you create a network policy with Snowflake and are located in the EU, add `3.251.148.96/29` to your "Allowed IP Addresses" list.

### Multi-Factor Authentication (MFA) & SSO

At this time, the Segment Snowflake destination is not compatible with Snowflake's MFA or SSO settings. If your connected user has MFA or SSO enabled, you will need to disable it for syncs to run correctly.

## Best Practices

### Auto Suspend and Auto Resume

Set `AUTO_SUSPEND` to ~10 minutes in the UI (or 600 if using SQL) to minimize the credit consumption of Segment's syncing process.

If you enable the `AUTO_SUSPEND` feature, Segment recommends that you also enable `AUTO-RESUME`. This will ensure that your Snowflake warehouse automatically resumes when Segment loads data. Otherwise, Segment will not be able to load data unless you [manually resume your Snowflake warehouse](https://docs.snowflake.net/manuals/user-guide/warehouses-considerations.html#automating-warehouse-resumption){:target="_blank"}.

### Unique Warehouse, Database, and Role

Segment recommends creating a unique Warehouse, Database and Role for the Segment Snowflake connection to your Snowflake instance to avoid conflicts with other operations happening in your cluster.

## Troubleshooting

### I get "Object does not exist" when running "USE DATABASE" or "USE WAREHOUSE", even if the warehouse or the database are created.

Make sure you created the role and assigned the proper permissions with the account `SYSADMIN` or `ACCOUNTADMIN`. Other non-system accounts don't assign the right permissions.

### I've consumed all my credits after the initial sync.

If you have used all your credits, you must contact Snowflake to purchase more.

Also, make sure `AUTO_SUSPEND` is enabled and set to 5 or 10 minutes in the warehouse used by Segment. This setting helps avoid unintended use of credits by the Segment Snowflake destination.

### My syncs are going slower than I expect.

This complaint is most often due to _not_ using a separate Warehouse specifically for Segment.

If you're already doing so, see [this section of the Snowflake docs](https://docs.snowflake.net/manuals/user-guide/warehouses-load-monitoring.html#slow-query-performance) for more details on how to handle slow running processes.

## FAQ

### What size should I start with when creating a new Snowflake instance?

Most customers have the best luck starting with a X-Small instance.

### Why do I see so many 'Rollback' statements?

A `rollback` is issued at the end of each session to make sure there's no "in-flight" processes hanging out that could block other processes later.

### Does Segment use transactions for loading data?
Segment doesn't open transactions explicitly because that would lock resources. However, if `autocommit` is enabled, each statement functions as its own transaction, and a silent commit is issued after each.

### What privileges do I need to grant?
You shouldn't need to grant any additional privileges. However, you may need to confirm that the USAGE privilege on those schemas is granted to the same role granted to the user connecting to Snowflake through Databricks.

Run these statements in Snowflake UI or CLI, and check the output to verify the permissions.

1. `SHOW GRANTS ON SCHEMA <schema_name>;`
   Look in the output to see if USAGE privilege is granted to the role you're using.
2. `SHOW GRANTS TO USER <username>;`
   Replace "username" with the login ID, and verify the correct role is assigned to that login.

Also, if the user has more than one role, make sure the role you use when doing the data pull has `USAGE` for the schema - and not just the default role. If your organization uses role inheritance (for example, `role apples` is granted to `role gravensteins`), then make sure that the role is being assigned and inherited correctly.

### Indexes
Queuing - you can use a different Warehouse for Segment, or use the recommendations from the Snowflake docs.

### Can I customize my sync schedule?

{% include content/warehouse-sync-sched.md %}

![sync schedule image](/docs/connections/destinations/catalog/images/syncsched.png)
