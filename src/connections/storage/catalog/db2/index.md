---
title: IBM Db2 Destination
rewrite: true
redirect_from:
  - '/connections/warehouses/catalog/db2/'
---

Use [IBM Db2](https://www.ibm.com/analytics/us/en/db2/){:target="_blank"} with Segment to get
all of your event and Cloud Source data in a warehouse built by IBM. This
guide will walk through what you need to know to get up and running with Db2
Warehouse and Segment.

> note " "
> This document refers specifically to [IBM Db2 Warehouse on Cloud](https://www.ibm.com/cloud/db2-warehouse-on-cloud){:target="_blank"}, [IBM Db2 Warehouse](https://www.ibm.com/analytics/db2){:target="_blank"}, and the [IBM Integrated Analytics System](https://www.ibm.com/products/integrated-analytics-system){:target="_blank"}. For questions related to any of these products, see the [IBM Cloud Docs](https://cloud.ibm.com/docs){:target="_blank"}.

## Getting Started

To get started, you'll need to:
1. [Create a Db2 user for Segment](#create-a-user-for-segment).
2. [Grant the user sufficient permissions](#grant-the-segment-user-permissions).
3. [Create the the IBM Db2 Destination in the Segment app](#create-segment-db2-destination).

### Create a User for Segment

In order to connect your IBM Db2 warehouse to Segment, you need to create a Db2 user account that Segment can assume. To create a user account for Segment:

1. Open the Db2 warehouse and navigate to  **Administration > User management**.

2. Click **Add**.

3. Create a new user account with *user* privileges. Make sure you save the username and password, as these are required to set up the Segment configuration in a later step.

### Grant the Segment User Permissions

To grant the Segment user access to your database:

1. Open the top-left menu in your Db2 Warehouse and select **Run SQL**. 
2. In the SQL input, copy the following code snippet, and replace `segment_user` with the user ID that you created above.
  ```json
  GRANT CONNECT, CREATETAB, IMPLICIT_SCHEMA ON DATABASE TO USER <segment_user>
  ```
3. Click **Run All** to execute the `GRANT` command.

### Create Segment Db2 Destination

To set up an IBM Db2 destination in the Segment app:

1. Open the Segment app, navigate to **Connections** and click **Add Destination**. 
2. Search for and select **IBM Db2 Warehouse**.
3. Select the sources you want to connect to the IBM Db2 warehouse, and click **Next**.
4. Enter a name for your destination, and enter the following credentials:
  - Host (You can find this in your Db2 instance, under Administration > Connections)
  - Port (50001 is the default for Db2)
  - Database name (You can find this in your Db2 instance, under Administration > Connections)
  - User (This is the User ID that you created above)
  - Password (This is the password that you created above)
  - Security ([Enter "SSL" in this field](#ssltls))
5. Click **Connect** to connect your Db2 warehouse to Segment.

## Security

### Allowlisting IPs

If your Db2 Warehouse is in a private network, be sure to [allowlist Segment's IP address](/docs/connections/storage/warehouses/faq/#which-ips-should-i-allowlist) when creating the Db2 user Segment assumes. Otherwise, Segment won't be able to load your data.

### Unique User

Segment recommends you to create a unique User for the Segment Db2 Warehouse connection to your Db2 Warehouse instance so that you can manage permissions separately.

### SSL/TLS
Always require SSL/TLS and make sure your data warehouse can only accept secure connections. Segment only connects to your data warehouse using SSL/TLS.
