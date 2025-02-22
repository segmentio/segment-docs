---
title: Unified Warehouse Credentials
---

Warehouse Credentials are secure, external credentials that connect to your data warehouse. You can use these credentials across various warehouse products to simplify your log in experience. 

> info ""
> Warehouse Credentials is currently limited to Free and Team plans and supports the following Segment Warehouse integrations:
> * Warehouse destinations
> * Reverse ETL

### Benefits
The benefits of having shared warehouse credentials include:
* A simplified setup for multiple warehouse products and configurations.  
* A centralized place to view and manage all your external credentials for security purposes.
* A centralized control over Warehouse Credentials that are available for your user to select.

## Create and manage credentials
There are 2 ways to create and manage warehouse credentials:
* During the setup flow for each warehouse offering, you can create a shared credential that can be used across other warehouse products.
* Navigate to **Settings > Warehouse credentials** where you can create and test connections for individual warehouse credentials. You can then select these credentials when setting up your warehouse products. 

### Existing warehouse credentials
If you set up warehouse credentials prior to using Warehouse Connections, your credentials will still be active and supported so that your integration continues to run.

With Segment Warehouse Connections, you can choose to create and utilize a shared credential the next time you need to update your credentials for a warehouse integration.

### Permissions
A credential with a Data Warehouse vendor can often be granted permissions to specific tables, capabilities, and read/write privileges.

The ability to share credentials allows you to use 1 user and grant the user permissions. 


## Warehouse credentials requirements
Each warehouse has unique requirements for authenticating them for integrations.  Reference the specific product links to access the specific setup guides for each warehouse for more information about authenticating to them:

* [Data Graph](/docs/unify/data-graph/)
* [Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/)
* [Reverse ETL](/docs/connections/reverse-etl/setup/)
* [Warehouse destinations](/docs/connections/storage/catalog/)

## Example use cases and permissions
tbd