---
title: dbt Extension
---

Segment's dbt extension lets you use [Reverse ETL](/docs/connections/reverse-etl/) with your existing dbt labs models and syncs to help centralize model management and versioning, reduce redundancies, and run CI checks to prevent breaking changes.

With Segment's dbt extension, you can:

- Securely connect Segment to a Git repository that stores your dbt models.
- Use centralized dbt models to set up Reverse ETL.
- Trigger Reverse ETL syncs from dbt jobs.

This page explains how to set up a dbt Model and then use the model with Reverse ETL.

## Before you begin

Keep the following in mind as you set up the dbt extension:

- The extension supports [dbt Core v1.7](https://docs.getdbt.com/docs/dbt-versions/core-upgrade/upgrading-to-v1.7){:target="_blank"}.
- You can use [Snowflake](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/snowflake-setup/), [Databricks](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/databricks-setup/), [Redshift](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/redshift-setup/), [Postgres](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/postgres-setup/), and [BigQuery](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/bigquery-setup/) as Reverse ETL sources.
- dbt models aren't synchronized from the dbt cloud. The model sync connects to a Git repository that loads models into Segment for use with Reverse ETL.
- You can connect to GitHub using a GitHub App, token, or SSH.
- For [GitLab](https://docs.gitlab.com/ee/user/ssh.html){:target="_blank"} and [Bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/configure-ssh-and-two-step-verification/){:target="_blank"}, use SSH to connect.

## Set up Git dbt Models and dbt Cloud

To set up the dbt extension, you'll need:

- an existing dbt account with a Git repository
- for job syncs, dbt cloud with jobs already created

### Git repository and dbt Models setup

Follow these steps to connect the Git repository that stores your dbt Models:

1. In your Segment workspace, navigate to **Settings > Extensions**.
2. Click **Set up Git sync**.
3. On the **Configure service credentials** page, select a service and protocol, add your GitHub App, SSH private key or GitHub token, then click **Next**.
4. In the **Connect source** window, select an existing Reverse ETL warehouse source from the dropdown, then click **Save**.

After you've saved your setup, you can configure your Git repository's settings to your needs by changing the repository, branch, dbt version, default schema, and project path.

### dbt Cloud setup

You can also use dbt Cloud to schedule Reverse ETL syncs after a dbt Cloud job successfully runs. 

To set up dbt Cloud:

1. In your Segment workspace, navigate to **Settings > Extensions**.
2. Click **Manage dbt Cloud**.
3. Add your dbt Cloud API key or dbt Personal Access Token and an optional custom subdomain, then click **Save**. 

> info "Adding a custom subdomain"
> By default, dbt sets the subdomain to cloud. To identify your custom subdomain, open your URL and copy the portion before `.getdbt.com`. For example, if your domain was `https://subdomain.getdbt.com/`, your subdomain would be `subdomain`. 

### Model syncs

After you set up dbt, Segment runs an initial sync to load models from your connected Git repository. This initial sync lets you use the most recent models when you set up Reverse ETL. In addition to Segment's initial dbt sync, you can also trigger manual dbt model syncs.

### Use a model with Reverse ETL

After you've successfully set up dbt with a warehouse and connected to your Git repository, you can select dbt models for use with Reverse ETL by following these steps:

1. In your Segment workspace, navigate to **Connections > Sources** and select the Reverse ETL tab. 
2. Click **+Add Reverse ETL source** , select your source, then click **Add Model**.
3. Click **dbt Models** as your modeling method, then select and preview a model from the dbt model dropdown.
4. Add a primary key, then click **Preview your model**. 
5. Click **Next**.
6. Enter your **Model Name**, then click **Create Model**.

To change a connected model, ensure that you've removed it from all active Reverse ETL syncs.
