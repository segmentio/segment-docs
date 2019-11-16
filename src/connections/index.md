---
title: Connections
---









## What is a source

Sources in Segment are created for each website you want to track. While not required to have a single Source for each server, site or app, **Segment recommendeds creating a Source for each unique source of data**.

Sources belong to a workspace and the URL will look something like this:

`https://segment.com/<my-workspace>/sources/<my-source-name>/`

You can create new sources using the button in the workspace view. Each source you create will have a write key which is used to send data to that source. For example, to load [`analytics.js`, the Segment JavaScript library](https://segment.com/docs/sources/website/analytics.js/) on your page, the snippet on the [Quickstart Guide](https://segment.com/docs/sources/website/analytics.js/quickstart/) includes:

```
analytics.load("YOUR_WRITE_KEY");
```


## What is a destination?

Destinations are business tools or apps that you can connect via Segment with the flick of a switch. Some of our most popular destinations are Google Analytics, Mixpanel, KISSmetrics, Customer.io, Intercom, and KeenIO.

All these tools run on the same data: who are your customers and what are they doing. However, each tool requires that data in slightly different formats. Without Segment, you have to write code to track all of this information, again and again, for each tool, on each page of your app or website.

We eliminate this process by introducing an abstraction layer. You just send your data to us. We understand it, translate it, and send it along to any destination you toggle on in the Segment destinations catalog. Immediately, your user data will start flowing into those tools' dashboards. No extra code required!

We support many categories of destinations, from advertising to marketing, email to customer support, CRM to user testing, and even data warehouses. You can view a complete list of our [destinations](https://segment.com/docs/destinations) or check out our [Catalog page](https://segment.com/catalog) for a searchable list broken down by category.


## What information can I see on Sources and Destinations pages?

The Sources and Destinations pages allow each user to decide what information appears in their personal view for each page.

On both pages, you can click the stack icon in the upper right-hand corner of the table to see and select Source properties to show. You can select up to five columns of properties.

The following information is available for Sources:

- Status
- Environment
- Destinations
- Type
- Category
- Created At
- Created By

On the Destinations page, you can choose among the following properties:

- Status
- Created At
- Type
- Sources
- Category

You can then sort or filter each column to just the values you care about, by clicking on the arrow next to each displayed column.




## What is a warehouse?

A warehouse is a central repository of data that has been collected from one or more sources. This is what commonly comes to mind when thinking about a relational database – structured data that fits neatly into rows and columns.

In Segment, a Warehouse is a special subset of destinations where we load data to them in bulk at a regular interval, inserting and updating events and objects while automatically adjusting their schema to fit the data you've sent to Segment.

When selecting and building a data warehouse, there are three questions to consider:

1.  What type of data will be collected?

2.  How many data sources will there be?

3.  How will the data be used?


Relational databases are great when you know and predefine the information collected and how it will be linked. This is usually the type of database used in the world of user analytics. For instance, a users table might be populated with the columns "name", "email address", "plan name", etc.

Examples of data warehouses include Amazon Redshift, Google BigQuery, MySQL, and Postgres.
