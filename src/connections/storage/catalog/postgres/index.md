---
title: Postgres Warehouse Destination
rewite: true
redirect_from:
  - '/connections/warehouses/catalog/postgres/'
---
{% include content/warehouse-ip.html %}


PostgreSQL, or Postgres, is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards compliance. As a database server, its primary functions are to store data securely and return that data in response to requests from other software applications.

PostgreSQL is ACID-compliant and transactional. PostgreSQL has updatable views and materialized views, triggers, foreign keys; supports functions and stored procedures, and other expandability. Developed by the PostgreSQL Global Development Group, free and open-source.

> note "Segment sources required"
> In order to add a Postgres destination to Segment, you must first add a source. To learn more about sources in Segment, check out the [Sources Overview](/docs/connections/sources) documentation.

## Getting started
Segment supports the following Postgres database providers:
- [Heroku](#heroku-postgres)
- [RDS](#rds-postgres)

Segment supported a third Postgres provider, Compose, until Compose was [was deprecated on March 1, 2023](https://help.compose.com/docs/compose-deprecation){:target="_blank"}. To continue sending your Segment data to a Postgres destination, consider using either [Heroku Postgres](#heroku-postgres) or [Amazon's Relational Database Service](#rds-postgres).

> warning ""
> Segment only supports these Postgres databases. Postgres databases from other providers aren't guaranteed to work. For questions or concerns about Segment-supported Postgres providers, [contact Segment Support](https://segment.com/help/contact){:target="_blank"}.

## Heroku Postgres

This guide explains how to set up a Postgres database with Heroku. Heroku is a cloud-based platform-as-a-service which simplifies the process of setting up and administering a Postgres database.

> info "First sync duration"
> The initial sync between Segment and Heroku Postgres can take up to 24 hours to complete.

1. [Sign up](https://signup.heroku.com/identity){:target="_blank"} for a Heroku account, or [log in](https://id.heroku.com/login){:target="_blank"} to an existing account.

2. On the Heroku landing page, select **New** and click **Create new app**.

3. Enter a name for your app and select the region where you want to host it. If you want to add your app to a Heroku pipeline, do so here. When you've finished updating your app's settings, click **Create app**.

4. On the Deploy page, select the Resources tab.

5. On the Resources page, enter "Heroku Postgres" in the search bar. Select the billing plan that you want to use for this app and click **Submit Order Form**. Segment recommends that customers start with a Standard 4 plan. _Learn more about plan pricing on the [Heroku Postgres pricing page](https://www.heroku.com/pricing#data-services){:target="_blank"}._

6. Select the Heroku Postgres add-on you created in the previous step and open the Settings tab. Click the **View Credentials...** button and copy the host, database, user, and password values. You will need this information to connect your database to Segment in a later step.

7. Open the Segment app. On the Overview page, click **Add Destination**.

8. Search for and select the Postgres destination.

9. Choose the source(s) you'd like to connect to Postgres, and click **Next**.

10. Enter the host, database, user, and password values you copied from Heroku in an earlier step, and click **Connect**. If Segment connected to your destination, you'll see the Next Steps screen. If you receive an "Invalid database" error, check that your host, database, user, and password fields match the credentials found in the Settings tab of your Heroku Postgres instance.

## RDS Postgres

You can set up a Postgres database with Amazon Relational Database Service (RDS). RDS simplifies the process of setting up and administering a Postgres database.

Follow the steps in Amazon's documentation [Creating a PostgreSQL DB instance and connecting to a database on a PostgreSQL DB instance](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html){:target="_blank"} to create a new PostgreSQL database in RDS. For best performance, create your database in the `US West` region.

> warning "Ensure your database is publicly accessible"
> When you create your database, ensure that the **Public access** setting is set to **Yes**. Segment requires your database to be publicly accessible in order to connect to your database.

When you create your database, Segment recommends that you enter a **Database name** value in the **Additional options** section. This setting creates the Postgres database at instance startup.

#### Network Permissions for Segment to RDS

Once you've created a database, you must create an inbound rule allowing Segment to connect to your instance.

To create a new inbound rule:

1. Open the [RDS Console](https://console.aws.amazon.com/rds/){:target="_blank"}.

2. Open the Databases tab.

3. Select your database and open the Connectivity & security tab. Open the **Security group rules** section.

4. Click on the existing inbound security group and select the Inbound rules tab.

5. Click **Edit inbound rules** to add a new rule, and click **Add rule**.

6. Add a new rule with the following parameters:
    - Select **PostgreSQL** as the type.
    - For **Source**, change the custom IP to `52.25.130.38/32`.

7. Add another rule with the following parameters:
    - Select **PostgreSQL** as the type.
    - For **Source**, change the custom IP to `34.223.203.0/28`.

8. Click **Save rules**.

## Sync schedule

{% include content/warehouse-sync-sched.md %}

![A screenshot of the sync schedule page. The enable sync schedule is toggled on, and the sync schedule dropdowns are visible.](/docs/connections/destinations/catalog/images/syncsched.png)


## Security
To make sure your Postgres database is secure:
- Log in with a user that has read and write permissions so that Segment can write to your database.
- Allowlist the Segment IP addresses (`52.25.130.38/32` and `34.223.203.0/28`). Otherwise, Segment can't load your data.
- Create a service user that has `read/write` permissions.
- Always require SSL/TLS and make sure your data warehouse can only accept secure connections. Segment only connects to your data warehouse using SSL/TLS.

## Best Practices

Once you've got your data in Postgres, you can do even more with it. You might develop an app that performs various functions based on different events being loaded to the database, potentially using [RabbitMQ](https://www.compose.io/articles/going-from-postgresql-rows-to-rabbitmq-messages/){:target="_blank"} as your asynchronous message broker. For example, you might want a banner to appear once your 1000th customer has signed up. The data is at your fingertips; you just need to decide how to use it.

### Query Speed

The speed of your queries depends on the capabilities of the hardware you have chosen as well as the size of the dataset. The amount of data utilization in the cluster will also impact query speed. Check with your hosting provider or Postgres docs for performance best practices.

### Single and Double Quotes in PostgreSQL
If you use double quotes on the name of a table, column, index, or other object when you create it, and if there is even one capital letter in that identifier, you will need to use double quotes every single time you query it.

Single quotes and double quotes in PostgreSQL have completely different jobs, and return completely different data types.  Single quotes return text strings.  Double quotes return identifiers, but with the case preserved.

If you create a table using double quotes:

```sql
CREATE TABLE "Example" (
 ...
);
```

Segment has now created a table in which the table name has not been forced to lowercase, but which has preserved the capital E.  This means that the following query will now fail:

```sql
select * from example;
ERROR: relation "example" does not exist
```

For more information on single vs double follow [this link](http://blog.lerner.co.il/quoting-postgresql/){:target="_blank"}.

## FAQs

### Can I add an index to my tables?

Yes, you can add indexes to your tables without blocking Segment syncs. However, Segment recommends limiting the number of indexes you have. Postgres's native behavior requires that indexes update as more data is loaded, and this can slow down your Segment syncs.

## Troubleshooting

### Permission denied for database
The syncs are failing due to a permissions issue. The user you configured does not have permission to connect to the appropriate database. To resolve these errors: connect to your warehouse using the owner account, or grant permissions to the account you use to connect to Segment.  You can correct these permissions by running the following SQL statement, replacing `<user>` with the account you use to connect to Segment:

`GRANT CONNECT ON DATABASE <database_name> TO <user>`


### Permission denied for schema
The syncs for the source, `<source_name>`, are failing because of a permissions issue. In most cases, the user connected to Segment does not have permission to view the necessary schemas in the warehouse.

To resolve these errors, connect your warehouse using the owner account, or grant permissions to the user you use to connect to Segment. You can correct these permissions by running the following SQL statement - Replace `user` with the user you use to connect to Segment, and run this statement for each schema in the warehouse.

`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA <schema_name> TO <user>`

### Dial TCP: no such host
Segment is unable to connect to the warehouse host, which is causing the syncs to fail. This error is usually due to an invalid host address, a warehouse hosted on a private IP, or a credentials issue.

In order to resolve the error, check the following settings:

- The host address listed in your Segment warehouse settings is correct
- The host is configured with a _publicly_ accessible IP address
- The username and password you use to connect to your Segment workspace matches the username and password on the Warehouse directly

### Dial TCP: i/o timeout
The warehouse syncs are failing due to a connection issue:

`dial tcp XX.XXX.XXX.XXX:XXXX: i/o timeout`

This error can be caused for a few reasons:

- Your warehouse went offline.
- There's a setting needed for Segment to connect which hasn't been correctly configured. Refer to the [Warehouse documentation](/docs/connections/storage/warehouses/) to ensure all steps outlined there have been followed.

### Schema <schema_name> does not exist
The syncs are failing due to a permissions issue. It looks like the user connected does not have permission to create schemas in your warehouse.

To resolve these errors Segment recommends connecting to your warehouse using the owner account, or granting permissions to the current account you use to connect to Segment. You can correct these permissions by running the following SQL statement - Replace `user` with the account you use to connect to Segment, and run this statement for each schema in the warehouse.

`GRANT CREATE ON DATABASE <database_name> TO <user>`
