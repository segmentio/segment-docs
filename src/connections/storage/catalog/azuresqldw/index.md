---
title: Azure Synapse Analytics Destination
rewrite: true
redirect_from:
  - '/connections/warehouses/catalog/azuresqldw/'
---

Azure's [Azure Synapse Analytics](https://azure.microsoft.com/en-us/services/synapse-analytics/){:target="_blank"}, previously known as Azure SQL Data Warehouse, is a limitless analytics service that brings together enterprise data warehousing and Big Data analytics.

## Getting Started

Complete the following prerequisites in Microsoft Azure before connecting your Azure Synapse Analytics databases to Segment:

1. Sign up for an [Azure subscription](https://azure.microsoft.com/en-us/free/){:target="_blank"}.
2. Provision a [Dedicated SQL Pool](https://docs.microsoft.com/en-us/azure/sql-data-warehouse/create-data-warehouse-portal){:target="_blank"}.

## Connect your Azure database to Segment

To connect your Azure database to Segment, [give Segment access to your SQL Data Warehouse](#give-segment-access-to-your-sql-data-warehouse) and [configure an Azure Synapse Analytics destination](#configure-an-azure-synapse-analytics-destination-in-segment).

### Give Segment access to your SQL Data Warehouse

1. Create a server login for Segment to use. This can be accomplished by running the following SQL command on your SQL Server's `master` database:
  ```sql
  CREATE LOGIN Segment WITH PASSWORD = '<strong password>';
  ```

2. Connect to your Azure database.

3. Segment uses Azure Blob Storage to hold data that is being loaded into Azure Synapse Analytics. In order to facilitate this, a `MASTER KEY` is needed in order for credentials that Segment saves to the database to be encrypted. To create a master key, run the following command: 
  ```sql
  CREATE MASTER KEY;
  ```
  If you are using your Azure Synapse Analytics instance for more than just a Segment integration, it is possible you already have a master key. Running the command more than once will not create a new master key.

4. Create a new database user using the server login that you created in a previous step:
  ```sql
  CREATE USER Segment FOR LOGIN Segment;
  ```

5. Run the following command to give your new user the permissions to load data and manage the resources in your database:
  ```sql
  GRANT CONTROL TO Segment;
  ```

6. Assign this new user a [resource allocation class](https://docs.microsoft.com/en-us/azure/sql-data-warehouse/resource-classes-for-workload-management){:target="_blank"}:
  ```sql
  EXEC sp_addrolemember 'largerc', 'Segment';
  ```
  The default resource allocation class (`smallrc`) may not give Segment enough memory to perform bulk loads, so Segment recommends starting with `largerc`. The larger Dynamic Resource Classes give more memory and allow fewer concurrent queries, which is a better fit for Segment's loading strategy.

7. By default, you cannot connect to Azure Synapse Analytics from the public internet. In order for Segment to connect to your instances, create a [server-level firewall rule](https://docs.microsoft.com/en-us/azure/sql-data-warehouse/create-data-warehouse-portal#create-a-server-level-firewall-rule){:target="_blank"} that allows connections from the [Segment IPs](/docs/connections/storage/warehouses/faq/#which-ips-should-i-allowlist):
  ```sql
  EXEC sp_set_firewall_rule N'<rule name>', '52.25.130.38', '52.25.130.38'; 
  ```

### Configure an Azure Synapse Analytics Destination in Segment

In order to set up the Azure Synapse Analytics destination in Segment, you'll need the following pieces of information:

 - **Server Name:** the name of the SQL Server resource that houses your SQL Data Warehouse
 - **Database:** the name of the SQL Data Warehouse database resource
 - **Username:** the name of the user you created above
 - **Password:** the password of the user you created above

To add a Azure Synapse Analytics destination in the Segment app: 
1. Log in to Segment and select the **Connections** tab. Click **Add Destination**.
2. Select the **Storage Destinations** tab and click the **Azure SQL Data Warehouse** destination. 
3. Select the source(s) you want to sync with the Azure SQL Data Warehouse destination, and click **Next**. 
4. Provide a name for your destination, and then enter data into each of the fields in the "Enter your Credentials" section. For the **Server Name** field, enter only the part of the server name prior to `.database.windows.net`. 
5. Click **Connect**.

> warning "Initial sync timeline"
> The first sync after you configure your Azure Synapse destination with Segment can take up to 24 hours to complete.

## Best Practices

### Making sure Segment has enough resources to load your data

The default [resource allocation class](https://docs.microsoft.com/en-us/azure/sql-data-warehouse/resource-classes-for-workload-management){:target="_blank"} (`smallrc`) may not give Segment enough memory to perform bulk loads, so Segment recommends using a larger class (`largerc`). Larger classes allocate more memory and limit the number of concurrent queries, which is a better fit for Segment's loading strategy.

### Using Selective Sync

Users with a Business Tier plan can enable Selective Sync for their Azure Synapse Analytics destination. With Selective Sync, you can customize which collections and properties from a source are sent to each warehouse, which leads to faster, more relevant syncs. To learn more about Selective Sync, review the [Warehouse Syncs](/docs/connections/storage/warehouses/warehouse-syncs/#warehouse-selective-sync) documentation.

## Troubleshooting

### Segment is not able to connect to Azure Synapse Analytics

If you encounter this error, create a [server-level firewall rule](https://docs.microsoft.com/en-us/azure/sql-data-warehouse/create-data-warehouse-portal#create-a-server-level-firewall-rule){:target="_blank"} that allows connections from the [Segment IPs](/docs/connections/storage/warehouses/faq/#which-ips-should-i-allowlist).
