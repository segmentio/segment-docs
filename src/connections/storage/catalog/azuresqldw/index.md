---
title: Azure Synapse Analytics Destination
rewrite: true
redirect_from:
  - '/connections/warehouses/catalog/azuresqldw/'
---

Azure's [Azure Synapse Analytics](https://azure.microsoft.com/en-us/services/synapse-analytics/), previously known as Azure SQL Data Warehouse, is a limitless analytics service that brings together enterprise data warehousing and Big Data analytics.

## Getting Started

There are four main steps to get started with Segment:

1. Have an [Azure subscription](https://azure.microsoft.com/en-us/free/)
2. Provision [SQL Data Warehouse (Dedicated SQL Pool)](https://docs.microsoft.com/en-us/azure/sql-data-warehouse/create-data-warehouse-portal)
3. Give Segment access to your SQL Data Warehouse
4. Configure the Destination in Segment

Follow the links above to follow Azure's documentation on setting up these prerequisites. Following that, the guide below should take you through the rest.

### Give Segment access to your SQL Data Warehouse

First, create a server login for Segment to use. This can be accomplished by running the following SQL command on your SQL Server's `master` database.

```sql
CREATE LOGIN Segment WITH PASSWORD = '<strong password>';
```

Once this is done, no more action is needed for the `master` database. Next, connect to your Azure database in order to do some further configuration.

Segment uses Azure Blob Storage to hold data that is being loaded into Azure Synapse Analytics. In order to facilitate this, a `MASTER KEY` is needed in order for credentials that Segment saves to the database to be encrypted.

```sql
CREATE MASTER KEY;
```

**NOTE:** If you are using your Azure Synapse Analytics for things besides Segment, it is possible this is already done. Either way, running the command another time will not hurt anything.

Next, create a new database user using the server login that was created previously:

```sql
CREATE USER Segment FOR LOGIN Segment;
```

This new user will need permissions to load data, and manage the resources it needs. Run the following command to accomplish this:

```sql
GRANT CONTROL TO Segment;
```

Lastly, assign this new user a [resource allocation class](https://docs.microsoft.com/en-us/azure/sql-data-warehouse/resource-classes-for-workload-management). The default (`smallrc`) likely will not give Segment enough memory to perform bulk loads, so we recommend starting with `largerc`. The larger "Dynamic Resource Classes" give more memory, while allowing fewer concurrent queries, which is a better fit for Segment's loading strategy:

```sql
EXEC sp_addrolemember 'largerc', 'Segment';
```

By default, Azure Synapse Analytics cannot be connected to from the public internet. In order for Segment to connect, a [server-level firewall rule](https://docs.microsoft.com/en-us/azure/sql-data-warehouse/create-data-warehouse-portal#create-a-server-level-firewall-rule) that allows connections from the [Segment IPs](/docs/connections/storage/warehouses/faq/#which-ips-should-i-whitelist) is needed.

### Configure an Azure SQL Data Warehouse Destination in Segment

In order to set up the necessary destination in Segment, you'll need the following pieces of information:

 - **Server Name:** the name of the SQL Server resource that houses your SQL Data Warehouse
 - **Database:** the name of the SQL Data Warehouse database resource
 - **Username:** the name of the user you created above
 - **Password:** the password of the user you created above

All of these fields are required in order for Segment to load data into your SQL Data Warehouse. The username and password can be obtained during steps of the previous section, while the server and database names can be found in the Azure Portal.

## Best Practices

### Making sure Segment has enough resources to load your data

The default [resource allocation class](https://docs.microsoft.com/en-us/azure/sql-data-warehouse/resource-classes-for-workload-management) (ie: `smallrc`) likely will not give Segment enough memory to perform bulk loads, so we recommend using a larger class (eg: `largerc`). Larger classes allocate more memory, but limit the number of concurrent queries, which is a better fit for Segment's loading strategy.

## Troubleshooting

### Segment is not able to connect to Azure Synapse Analytics

Make sure a [server-level firewall rule](https://docs.microsoft.com/en-us/azure/sql-data-warehouse/create-data-warehouse-portal#create-a-server-level-firewall-rule) that allows connections from the [Segment IPs](/docs/connections/storage/warehouses/faq/#which-ips-should-i-whitelist) is configured.
