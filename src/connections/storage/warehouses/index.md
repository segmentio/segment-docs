---
title: Data Warehouses
redirect_from: '/connections/warehouses/'
---

{% include content/plan-grid.md name="warehouses" %}

## What's a Warehouse?

{% include content/whats-a-warehouse.md %}


When selecting and building a data warehouse, consider three questions:

1.  What type of data will be collected?
2.  How many data sources will there be?
3.  How will the data be used?

Relational databases are great when you know and predefine the information collected and how it will be linked. This is usually the type of database used in the world of user analytics. For instance, a users table might be populated with the columns `name`, `email_address`, or `plan_name`.

Examples of data warehouses include Amazon Redshift, Google BigQuery, and Postgres.

{% include content/how-a-sync-works.md %}

<div data-headings-anchors id="warehouse-schemas"></div>
> info "Looking for the Warehouse Schemas docs?"
>  They've moved! Check them out [here](schema/).

{% include components/reference-button.html href="https://segment.com/academy/intro/when-to-use-sql-for-analysis/?referrer=docs" icon="media/academy.svg" title="Analytics Academy: When to use SQL for analysis" description="When your existing analytics tools can't answer your questions, it's time to level-up and use SQL for analysis." %}

### More Help

[How do I send custom data to my warehouse?](/docs/connections/storage/warehouses/faq/#what-if-i-want-to-add-custom-data-to-my-warehouse)

[How do I give users permissions to my warehouse?](/docs/connections/storage/warehouses/add-warehouse-users/)

Check out the [Frequently Asked Questions about Warehouses](/docs/connections/storage/warehouses/faq/) page and [a list of helpful SQL queries to get you started with Redshift ](/docs/connections/storage/warehouses/redshift-useful-sql).

## FAQs

[How do I decide between Redshift, Postgres, and BigQuery?](/docs/connections/storage/warehouses/choose-warehouse/)

[What do you recommend for Postgres: Amazon or Heroku?](/docs/connections/storage/warehouses/choose-warehouse/)

[How do I give users permissions?](/docs/connections/storage/warehouses/add-warehouse-users/)

[What are the limitations of Redshift clusters and warehouses connectors?](/docs/connections/storage/warehouses/redshift-faq/)

[Where do I find my source slug?](/docs/connections/storage/warehouses/faq/#how-do-i-find-my-source-slug)

### Setting up a warehouse

[How do I create a user, grant usage on a schema and then grant the privileges that the user will need to interact with that schema?](/docs/connections/storage/warehouses/add-warehouse-users/)

[Which IPs should I allowlist?](/docs/connections/storage/warehouses/faq/#which-ips-should-i-whitelist)

[Will Segment sync my historical data?](/docs/connections/storage/warehouses/faq/#will-segment-sync-my-historical-data)

[Can I load in my own data into my warehouse?](/docs/connections/storage/warehouses/faq/#what-if-i-want-to-add-custom-data-to-my-warehouse)

[Can I control what data is sent to my warehouse?](/docs/connections/storage/warehouses/faq/#can-i-control-what-data-is-sent-to-my-warehouse)

### Managing a warehouse

[How fresh is the data in my warehouse?](/docs/connections/storage/warehouses/faq/#how-fresh-is-the-data-in-segment-warehouses)

[Can I add, tweak, or delete some of the tables?](/docs/connections/storage/warehouses/faq/#can-we-add-tweak-or-delete-some-of-the-tables)

[Can I transform or clean up old data to new formats or specs?](/docs/connections/storage/warehouses/faq/#can-we-transform-or-clean-up-old-data-to-new-formats-or-specs)

[What are common errors and how do I debug them?](/docs/connections/storage/warehouses/warehouse-errors/)

[How do I speed up my Redshift queries?](/docs/connections/storage/warehouses/redshift-tuning/)

### Analyzing with SQL

[How do I forecast LTV with SQL and Excel for e-commerce businesses?](/docs/guides/how-to-guides/forecast-with-sql/)

[How do I measure the ROI of my Marketing Campaigns?](/docs/guides/how-to-guides/measure-marketing-roi/)