---
title: What can you do with cloud source data?
---

### What kind of data do you pull from each source?

In general, we've focused on pulling all of the collections directly related to the customer experience. We do not automatically pull all collections available from a partner API, since many of them aren't relevant to the customer journey. You can see a list the collections we pull in the docs [for each cloud source](/docs/connections/sources/#cloud-app). Each collection reflects a table in your database.

Please [let us know](/contact) if you need additional data collected or to change the schema to do the analysis you want. We'd love to know what analysis you're trying to run, what additional data you need, and we'll share with the product team to evaluate.

### What are some questions you can answer with data across cloud, web, and mobile sources combined in a single warehouse?

*   What content drives people forward in our sales funnel?
*   What are the top pages viewed before a support ticket is sent?
*   Do people who opt into text messages engage more than people who only get emails?
*   Do customers that interact with our support team activate faster? - Retain more overtime?
*   What are all of the communications across marketing, success, and sales, this account has had in the last 2 months?

### How do you query sources data?

Generally, you'll need intermediate to advanced SQL training to explore and analyze cloud sources data in a warehouse. The following resources can help you get up and running more quickly!

**Entity Relationship Diagrams** The links to the ER (entity relationship) diagrams [in the documentation](/docs/connections/sources/#cloud-app) will really help you fast track your queries. They show the relationship between each table in a particular source, and how each table can be joined based on particular keys.

**Joining IDs** As you start to get into joining across different types of sources, you'll need a way to join user IDs. This [help article](/docs/faqs/sources/joining-user-profiles) explains how to do this in detail.

**Getting Started Queries** We've created a number of queries for common use cases to help you get started – you can copy and paste them to start querying your data. Find them in the Warehouse section of the [Segment Community](https://segment.forumbee.com/category/warehouses).

**Partner Dashboards** Our BI partners at Mode, Looker, BIME, Periscope, and Chartio have created out of the box dashboards that work on top of our source schemas.
