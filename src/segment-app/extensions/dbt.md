---
title: dbt Integration
---

Segment's dbt integration lets you use [Reverse ETL](/docs/connections/reverse-etl/) with your existing dbt labs models and syncs to help centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes.

With Segment's dbt integration, you can:

- Securely connect Segment to the GitHub repository that stores your dbt models.
- Use centralized dbt models to set up Reverse ETL.
- Trigger Reverse ETL syncs from dbt jobs.

<!-- This page explains... -->

> info ""
> Extensions, including Segment's dbt integration, is currently in public beta and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}.

## Before you begin

Keep the following in mind as you set up the dbt integration:

- The integration supports [dbt Core v1.7](https://docs.getdbt.com/docs/dbt-versions/core-upgrade/upgrading-to-v1.7){:target="_blank"}.
- You can use Snowflake, Databricks, RedShift, Postgres, and BigQuery as Reverse ETL sources.
- dbt models aren't synchronized from the dbt cloud. The model sync connects to a Git repository that loads models into Segment for use with Reverse ETL. 

## Set up Git dbt Models and dbt Cloud

To set up the dbt integration, you'll need:

- an existing dbt account with a Git repository
- (for job syncs:) dbt cloud with jobs already created

### Git repository and dbt Models setup

Follow these steps to connect the Git repository that stores your dbt Models:

1. In your Segment Workspace, go to **Settings > Extensions**.
2. Click **Set up Git sync**.
3. On the **Configure service credentials** page, select a service and protocol, add your SSH private key, then click **Next**.
4. In the **Connect source** window, select a Reverse ETL warehouse source from the dropdown, then click **Save**.

After you've saved your setup, you can configure your Git repository's settings to your needs by changing the selecting the repository, branch, dbt version, default schema, and project path.

### dbt Cloud setup

You can also use dbt Cloud to schedule Reverse ETL syncs after a dbt Cloud job successfully runs. 

To set up dbt Cloud:

1. In your Segment Workspace, go to **Settings > Extensions**.
2. Click **Manage dbt CLoud**.
3. Add your dbt Cloud API key, and, optionally, a custom subdomain. Click **Save**.
