---
title: Reverse ETL Quickstart
---

Reverse ETL (Extract, Transform, Load) extracts data from a data warehouse using a query you provide, and syncs the data to your 3rd party destinations. For example, with Reverse ETL, you can sync records from Snowflake to Mixpanel. 

Use Reverse ETL when you want to:

- Sync audiences and other data built in the warehouse to Braze, Hubspot, or Salesforce Marketing Cloud for personalized marketing campaigns.
- Sync enriched data to Mixpanel for a more complete view of the customer, or enrich Segment Unify with data from the warehouse.
- Send data in the warehouse back into Segment as events that can be activated in all supported destinations, including Twilio Engage and other platforms.
- Pass offline or enriched data to conversion APIs like Facebook, Google Ads, TikTok, or Snapchat.
- Connect Google Sheets to a view in the warehouse for other business teams to have access to up-to-date reports.

> success ""
> Reverse ETL supports event and object data. This includes customer profile data, subscriptions, product tables, shopping cart tables, and more.

## Prerequisites

A Reverse ETL implementation requires the following: 
- A Segment user with Workspace Owner or Source Admin and Warehouse Admin roles. _For more information about Roles in Segment, see the [Roles](/docs/segment-app/iam/roles/) documentation._
- A user with read and write access to your Azure, BigQuery, Databricks, Postgres, Redshift, or Snowflake warehouse.
- Access to your chosen downstream destination(s).

Once you've verified you have access to all of these systems, you can follow the steps in the [quickstart guide](/connections/reverse-etl/quickstart/add-a-source) or the [full installation guide](/connections/reverse-etl/index/#getting-started) to configure Reverse ETL.

<div class="double">

{% include components/reference-button.html href="/connections/reverse-etl/index/" newtab="false" icon="reverse-etl.svg" title="Reverse ETL Full Setup Guide" description="A full Reverse ETL implementation." variant="related" subtitle="next" %}

{% include components/reference-button.html href="/connections/reverse-etl/quickstart/add-a-source/" newtab="false" icon="symbols/arrow-right.svg" title="Add a Reverse ETL Source" description="Start setting up your Reverse ETL connection by connecting your warehouse to the Segment app." variant="related" subtitle="next" %}
</div>