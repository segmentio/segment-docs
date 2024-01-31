---
title: Subscriptions with SQL Traits
plan: engage-premier
beta: true
---

Use Subscriptions with SQL Traits to connect to your data warehouse and query user subscription data to Engage on a scheduled basis. Use your data warehouse as a single source of truth for subscription statuses and query from warehouses such as BigQuery, Redshift, or Snowflake.

On this page, you'll learn how to use SQL to sync subscription data from your warehouse to Engage.

> warning ""
> Updating subscription statuses with SQL creates new profiles and updates existing profiles. These profile updates may lead to users entering existing audiences or message campaigns. 

## Getting started

To use Subscriptions with SQL Traits, you need the following:
- A warehouse connected to Segment
- A Segment workspace
- A user account with access to Engage in that workspace

> info ""
> Segment supports Redshift, Postgres, Snowflake, Azure SQL, and BigQuery as data warehouse sources for SQL Traits. Visit [Segment's warehouse docs](/docs/connections/storage/warehouses/) for more on getting started with data warehouses.  

> success ""
> Before you begin with Subscriptions with SQL Traits, you may also want to visit the [subscription docs](/docs/engage/user-subscriptions/) to learn more about user subscriptions in Engage.

## Sync subscription data with SQL

You can sync with SQL from two locations in the Segment app. Navigate to **Unify > Profile explorer** or **Engage > Audiences > Profile explorer**, then:

1. Click **Manage subscription statuses**, and select **Update subscription statuses**.
2. Select **Sync with SQL**, and click **Configure**.

### Configure your SQL query

To configure Subscriptions with SQL Traits, you can write your own query or click **Use Template** to use one of the templates Engage provides. For any new users that your query returns, Engage adds a new profile.

> success ""
> Click **Reset Template** to reset your SQL query.

Queries must return at least one pair of the columns below with a value of `subscribed`, `unsubscribed`, or `did_not_subscribe`:
- `email` and `__segment_internal_email_subscription__`
- `phone` and `__segment_internal_sms_subscription__`

For more subscription SQL best practices, view the [query requirements](#query-requirements) below.

### Select a warehouse and preview your query

Once you write your SQL query, click **Select warehouse** from the Configure screen to select the data warehouse you'd like to query.

Before you schedule your sync intervals, click **Preview** to preview a subset of data and validate your results. To see subscription statuses for a particular profile, select a user row, then select the Identities tab.

### Schedule sync intervals

You can schedule sync intervals to import subscription data from your warehouse to Engage:

1. From the Configure screen, click **Schedule**.
2. Add a SQL job name and description.
3. Set the sync schedule.
  - Choose a time to start the SQL job and how often to run syncs.
4. Click **Create** to create and save the SQL job.

> info ""
> SQL queries are executed directly to your data warehouse, which could generate additional costs for pay-per-query warehouses.

### View SQL job history

Use the Update History page to view all SQL jobs.

1. Navigate to **Unify > Profile explorer** or **Engage > Audiences > Profile explorer.**
2. Click **Manage subscription statuses**.
3. Select **View update history**, then select the **SQL Jobs** tab.

From the Update History page, you can view details for each SQL job including the creation date and time, compute status, and the number of users updated across all runs for a job. Click the job link to visit a particular SQL job Overview page.

## Query requirements

When you build your SQL query, keep the following requirements in mind for the data your query returns.

**Your query must:**

- Return at least one column with `user_id`, `anonymous_id`, `email`, `phone` (or `group_id` for account traits if Unify for B2B is enabled).
- Return records less than 16KB in size.

**Your query must not:**

- Include values for both `user_id` and `anonymous_id` for a given record.
- Return any `user_id`s, `anonymous_id`s, or `group_id`s with a `null` value.
- Return any records with duplicate `user_id`s.
- Return duplicate `email` or `phone` records that have different subscription statuses.
- Return more than 25 million rows.
