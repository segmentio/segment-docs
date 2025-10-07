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

> info " "
> This document refers specifically to [IBM Db2 Warehouse on Cloud](https://www.ibm.com/cloud/db2-warehouse-on-cloud){:target="_blank"}, [IBM Db2 Warehouse](https://www.ibm.com/analytics/db2){:target="_blank"}, and the [IBM Integrated Analytics System](https://www.ibm.com/products/integrated-analytics-system){:target="_blank"}. For questions related to any of these products, see the [IBM Cloud Docs](https://cloud.ibm.com/docs){:target="_blank"}.

## Getting Started

To get started, you'll need to:
1. [Create a Db2 user for Segment](#create-a-user-for-segment).
2. [Grant the user sufficient permissions](#grant-the-segment-user-permissions).
3. [Create the the IBM Db2 Destination in the Segment app](#create-segment-db2-destination).

{% include content/storage-do-include.md %}

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

### Connect IBM Db2 to Segment

> info "Unified warehouse credentials in public beta"
> With unified warehouse credientials you can create warehouse credentials and use them across Segment warehouse products. Segment is actively working on this feature. Some functionality may change before it becomes generally available.

To connect IBM Db2 to Segment: 

1. Navigate to **Connections > Destinations** and select the **Storage** tab in the Segment app. Click **+Add storage destination**. 
2. Select *IBM Db2* as your warehouse.
3. Select an existing warehouse credential or create a new warehouse credential by completing the following fields for your Db2 instance:
    * **Hostname**: The Db2 hostname (You can find this in your Db2 instance, under Administration > Connections)
    * **Port**: The port used for connecting to your Db2 warehouse. The default port for Db2 is 50001, but your port may be different
    * **Database name**: The database that Segment uses in order to sync data (You can find this in your Db2 instance, under Administration > Connections)
    * **Security**: Enter “SSL” in this field
    * **Username**: The Db2 user that Segment uses to run SQL in your warehouse
    * **Password**: The password of the user above
4. Test your connection. 
5. Click **Save**.

## Security

### Allowlisting IPs

Segment recommends enabling IP allowlists for added security. All Segment users with workspaces hosted in the US who use allowlists in their warehouses must update those allowlists to include the following ranges:
* `52.25.130.38/32`
* `34.223.203.0/28`

Users with workspaces in the EU must allowlist `3.251.148.96/29`.

### Unique User

Segment recommends you to create a unique User for the Segment Db2 Warehouse connection to your Db2 Warehouse instance so that you can manage permissions separately.

### SSL/TLS
Always require SSL/TLS and make sure your data warehouse can only accept secure connections. Segment only connects to your data warehouse using SSL/TLS.
