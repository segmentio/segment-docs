---
title: Snowflake Destination
rewrite: true
redirect_from:
  - '/connections/warehouses/catalog/snowflake/'
---

[Snowflake](https://docs.snowflake.net/manuals/index.html){:target="_blank"} is a data warehouse, built for the cloud, that delivers performance, simplicity, concurrency and affordability.

> info ""
> Segment has a Terraform provider, powered by the Public API, that you can use to create a Snowflake warehouse. See the [segment_warehouse (Resource)](https://registry.terraform.io/providers/segmentio/segment/latest/docs/resources/warehouse){:target="_blank”} documentation for more information.

## Getting started

There are six steps to get started using Snowflake with Segment. 

1. [Create a virtual warehouse](#step-1-create-a-virtual-warehouse)
2. [Create a database](#step-2-create-database)
3. [Create a role for Segment](#step-3-create-role-for-segment)
4. [Create a user for Segment](#step-4-create-user-for-segment)
5. [Test the user and credentials](#step-5-test-the-user-and-credentials)
6. [Connect Snowflake to Segment](#step-6-connect-snowflake-to-segment)

{% include content/storage-do-include.md %}

### Prerequisites 

To set up the virtual warehouse, database, role, and user in Snowflake for Segment's Snowflake destination, you must have the `ACCOUNTADMIN` role, or, a custom role with the following [Snowflake privileges](https://docs.snowflake.com/en/user-guide/security-access-control-overview#label-access-control-overview-privileges){:target="_blank"}: 

- [CREATE WAREHOUSE](https://docs.snowflake.com/en/sql-reference/sql/create-warehouse#access-control-requirements){:target="_blank"}: Used to create a Segment-specific virtual warehouses
- [CREATE DATABASE](https://docs.snowflake.com/en/sql-reference/sql/create-database#access-control-requirements){:target="_blank"}: Used to create a Segment-specific database
- [CREATE ROLE](https://docs.snowflake.com/en/sql-reference/sql/create-role#access-control-requirements){:target="_blank"}: Used to create the role that the Segment user assumes in your Snowflake instance
- [CREATE USER](https://docs.snowflake.com/en/sql-reference/sql/create-user#access-control-requirements){:target="_blank"}: Used to create the Segment user in your Snowflake instance

To set up the Snowflake storage destination in Segment, you must have either a [role in the Segment app](/docs/segment-app/iam/roles/) of _Workspace Owner_ or, for Business Tier users, _Warehouse Destination Admin_. 

### Step 1: Create a virtual warehouse

Segment's Snowflake destination requires you to first create a Snowflake [virtual warehouse](https://docs.snowflake.com/en/user-guide/warehouses){:target="_blank"}. 

To avoid conflicts with other operations in your cluster, Segment recommends that you create a new warehouse just for Segment loads. An X-Small warehouse is large enough for most Segment customers when they first create their Snowflake destination.

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

### Step 2: Create a database

Segment recommends creating a new database just for Segment information, as the Segment Snowflake destination creates its own schemas and tables and could create name conflicts with your existing data.

To create a new database, execute the following SQL command:

```sql
CREATE DATABASE "SEGMENT_EVENTS";
```

### Step 3: Create a role for Segment

You need to run these SQL commands rather than creating a role with the "Create Role" dialog in the Classic Console UI.

This role gives Segment just enough permission to load data into your database. Segment recommends that you don't reuse this role for other operations.
1. Click on **Worksheets**
2. Select SEGMENT_EVENTS under database objects
3. Change the role to `ACCOUNTADMIN`
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

### Step 4: Create a user for Segment

Create the user that Segment uses to connect to your warehouse. You can create a user that authenticates with a key pair, or you can create a user that authenticates using a password. For enhanced security, Segment recommends creating a user that authenticates with an encrypted key pair.

#### Create a user that authenticates with a key pair
If you are creating a user that will use a key pair to authenticate, you first must create a public key and then can create a new user. 

##### Generate keys

To start, open a terminal window and generate a private key by running the following command, replacing `key_name` with the name you'd like to give the key. The command generates a private key in PEM format, and will prompt you to enter a passphrase. Write down or remember this passphrase, as you will need it when creating your Segment user and configuring your destination in the Segment app.

> success ""
> If you want to generate an unencrypted private key, append `-nocrypt` to the end of the command.

```
openssl genrsa 2048 | openssl pkcs8 -topk8 -v2 des3 -inform PEM -out key_name.p8
```

After you've created the private key, save the file to a local directory. You'll need to upload the .p8 file to the Segment app when you create your Snowflake destination. 

Next, generate your public key by running the following command, replacing `key_name.p8` with the name of the private key that you previously created and `public_key_name` with the name of your new public key. 

```
openssl rsa -in key_name.p8 -pubout -out public_key_name.pub
```

After you've created the public key, save the file to a local directory. 

##### Generate a new user and assign the key to them

Now, create a new user by executing the following SQL command, replacing the public key value with the key you previously generated.

``` sql
CREATE USER SEGMENT_USER 
  DEFAULT_ROLE = SEGMENT
  RSA_PUBLIC_KEY = 'enter your public key';
GRANT ROLE "SEGMENT" TO USER "SEGMENT_USER";
```

#### Create a user that authenticates with a username and password
If you are creating a user that will use a username and password to authenticate, execute the following SQL command. Be sure to set a strong, unique password.

```sql
CREATE USER "SEGMENT_USER"
  MUST_CHANGE_PASSWORD = FALSE
  DEFAULT_ROLE = "SEGMENT"
  PASSWORD = "my_strong_password"; -- Do not use this password
GRANT ROLE "SEGMENT" TO USER "SEGMENT_USER";
```

### Step 5: Test the user and credentials

Before you continue, test and validate the new user and credentials. After you verify the new credentials, you can connect Snowflake to Segment.

#### Test a key pair
Segment uses [SnowSQL](https://docs.snowflake.com/en/user-guide/snowsql){:target="_blank"} to run these verification steps.
To install SnowSQL and verify your accounts:

1. Download [SnowSQL](https://docs.snowflake.com/en/user-guide/snowsql){:target="_blank"}
2. Open the Installer and follow instructions.
3. When the installation is complete, run the following command, replacing "account", "username", and "path_to_the_rsa_key_encrypted.p8" with your Snowflake Account ID, username, and path to your private RSA key:

```
snowsql -a segment -u <username> -d <Database> -w <warehouse> --private-key-path <path_to_the_rsa_key_encrypted.p8>
```

For accounts outside the US, the account ID includes the region. You can find your account name from the browser address string.

For example, if your web address is `https://myaccountname.snowflakecomputing.com/console#/internal/worksheet`, your account name would be `myaccountname`.

#### Test a username and password
Segment uses [SnowSQL](https://docs.snowflake.com/en/user-guide/snowsql){:target="_blank"} to run these verification steps.
To install SnowSQL and verify your accounts:

1. Download [SnowSQL](https://docs.snowflake.com/en/user-guide/snowsql){:target="_blank"}
2. Open the Installer and follow instructions.
3. When the installation is complete, run the following command, replacing "account" and "user" with your Snowflake Account ID and username:

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

> info "Unified warehouse credentials in public beta"
> With unified warehouse credientials you can create warehouse credentials and use them across Segment warehouse products. Segment is actively working on this feature. Some functionality may change before it becomes generally available.

To connect Snowflake to Segment: 

1. Navigate to your product area:
    * For Storage destinations, navigate to **Connections > Destinations** and select the **Storage** tab. Click **+ Add storage destination**.
    * For Profiles Sync, navigate to **Unify > Profiles Sync**.
2. Select *Snowflake* as your warehouse.
3. Select an existing warehouse credential or create a new warehouse credential by completing the following fields for your Snowflake instance.
    * Account ID: The Snowflake account ID that uniquely identifies your organization account, including a region suffix if applicable.
    * Database name: The database that Segment uses in order to sync data
    * Warehouse: The warehouse in your Snowflake account that Segment uses to run SQL 
    * Username: The Snowflake user that Segment uses to run in your warehouse 
    * Authentication
        * Private key: View Snowflake’s key pair set up doc.You can upload .p8 file format. Key length must be at least 2048-bit. An encrypted key is recommended but not required.
4. Test your connection. 
5. Click **Save**.

  > info "Segment supports uploading one key at a time"
  > Although you can create up to two keys in Snowflake, Segment only supports authenticating with one key at a time. To change the key that is in Segment, return to your Snowflake destination's settings and upload a new key in the **Private Key** field.  

## Use with Engage (Journeys & Linked Audiences)

After you connect Snowflake, you can add a Snowflake Activation from Engage. Linked Audiences writes audience enter/exit events to your warehouse, and Journeys writes journey step events. 

Segment recommends key-pair authentication for the Snowflake user. For mor information, see [create a user that authenticates with a key pair](#create-a-user-that-authenticates-with-a-key-pair).

### Schema and table selection (beta)

When you create a Snowflake Activation from Engage, choose the schema and either select an existing table or enter a new table name. Engage writes to exactly what you specify.

### Sync behavior for Engage (beta)

For Engage writebacks, Segment starts a warehouse sync after each run completes (for example, when an audience run finishes). This replaces a fixed hourly cadence for these writebacks.

> warning ""
> Changing the Snowflake destination’s general sync schedule does **not** affect Engage writebacks. Engage controls when these writes occur.

### Data format and limits

Engage writebacks use Track events. The full event payload is stored in a single stringified JSON column in the target table. 


## Security

### Allowlisting IPs

If you create a network policy with Snowflake and are located in the US, add  `52.25.130.38/32` and `34.223.203.0/28` to the "Allowed IP Addresses" list.

If you create a network policy with Snowflake and are located in the EU, add `3.251.148.96/29` to your "Allowed IP Addresses" list.

### Multi-Factor Authentication (MFA) & SSO

At this time, the Segment Snowflake destination is not compatible with Snowflake's MFA or SSO settings. If your connected user has MFA or SSO enabled, you will need to disable it for syncs to run correctly.

## Best Practices

### Key pair authentication

Segment recommends that you authenticate with your Snowflake warehouse using an encrypted key pair. Key-pair authentication uses PKCS#8 private keys, which are typically exchanged in the PEM base64-encoded format. 

Although you can create up to two keys in Snowflake, Segment only supports authenticating with one key at a time. To change the key that's used to authenticate with Segment, return to your Snowflake destination's settings and upload a new key in the **Private Key** field.

### Auto Suspend and Auto Resume

Set `AUTO_SUSPEND` to ~10 minutes in the UI (or 600 if using SQL) to minimize the credit consumption of Segment's syncing process.

If you enable the `AUTO_SUSPEND` feature, Segment recommends that you also enable `AUTO-RESUME`. This will ensure that your Snowflake warehouse automatically resumes when Segment loads data. Otherwise, Segment will not be able to load data unless you [manually resume your Snowflake warehouse](https://docs.snowflake.net/manuals/user-guide/warehouses-considerations.html#automating-warehouse-resumption){:target="_blank"}.

### Unique Warehouse, Database, and Role

Segment recommends creating a unique Warehouse, Database, and Role for the Segment Snowflake connection to your Snowflake instance to avoid conflicts with other operations happening in your cluster.

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

> info ""
> Engage writebacks (Journeys and Linked Audiences) start a sync **when an Engage run completes**. The schedule controls below apply to Connections, Profiles Sync and other warehouse deliveries, not to Engage-triggered writebacks.

![sync schedule image](/docs/connections/destinations/catalog/images/syncsched.png)

### I'm encountering a "JWT token is invalid" error. What do I do?

For more information about troubleshooting a `JWT token is invalid` error, see Snowflake's [Key Pair Authentication: Troubleshooting](https://docs.snowflake.com/user-guide/key-pair-auth-troubleshooting){:target="_blank”} documentation. 