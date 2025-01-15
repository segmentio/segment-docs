---
title: Warehouses Overview
---

A **data warehouse** is a central repository of data collected from one or more sources. Examples of data warehouses include Amazon Redshift, Google BigQuery, and Postgres. You can use your data warehouse as a source of data or can send data from your other business tools downstream to your warehouse. 

You might want to use Segment's warehouse integrations in the following situations:
* **Make warehouse data accessible to business teams**: Use [Reverse ETL](/docs/connections/reverse-etl) to connect destinations like Google Sheets to a view in the warehouse to allow business teams to access up-to-date reports.
* **Elevate customer communications**: With [Data Graph](/docs/unify/data-graph), you can create relationships between different entity datasets in your warehouse, like households, accounts, subscriptions, and products to create personalized customer communications.
* **Store customer data in one location for data teams**: Collect customer data from a Segment source and send it downstream to a [storage destination](/docs/connections/storage/warehouses/) for further analysis by data teams.
* **Create a central view of your customers**: [Profile Sync](/docs/unify/profiles-sync/overview) creates a central view of a single customer by aggregating information from multiple data sources into a central profile, which is then synced with your warehouse to build a consistent view of your customer that you can use in Segment or in other business tools. 
* **Import historical data into Segment**: Import historical data from your warehouse into a new business tool using [Reverse ETL](/docs/connections/reverse-etl).

## Get started with warehouses

<div class="flex flex--wrap gutter gutter--large">
  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/reverse-etl/"
      title="Reverse ETL"
      description="Set up your warehouse as a data source to start using Reverse ETL."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/unify/profiles-sync/overview/"
      title="Profile Sync"
      description="Create a centralized view of your customers in your warehouse that you can use with your business tools."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/unify/data-graph/"
      title="Data Graph"
      description="Make relational datasets easily accessible to business teams for targeted and personalized customer engagements."
    %}
  </div>
</div>

<div class="flex flex--wrap gutter gutter--large">
  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/connections/storage/warehouses/"
      title="Data Warehouse Destination"
      description="Set up your warehouse as destination to store data from your sources in one location."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/engage/audiences/index"
      title="Twilio Engage"
      description="Create SQL Traits with the data stored in your data warehouse to enhance your Engage Audiences."
    %}
  </div>

  <div class="flex__column flex__column--12 flex__column--4@medium">
    {% include components/reference-button.html
      href="/docs/guides/duplicate-data"
      title="Deduplicate data"
      description="Learn more about the secondary deduplication supported by Segment's warehouse integrations."
    %}
  </div>
</div>

## Supported warehouses

Learn which Segment integrations support your selected warehouse. 

| Warehouse               | Storage destination                                     | Reverse ETL                                               | Profiles Sync                                             | Data Graph                                 | 
| ----------------------- | ------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------- |
| Azure Synapse Analytics | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> |
| BigQuery                | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> |
| Databricks              | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> |
| IBM Db2                 | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> |
| Heroku Postgres         | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> |
| RDS Postgres            | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/unsupported.svg" /> |
| Redshift                | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> |
| Snowflake               | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> | <img class="inline" src="/docs/images/supported.svg" /> |