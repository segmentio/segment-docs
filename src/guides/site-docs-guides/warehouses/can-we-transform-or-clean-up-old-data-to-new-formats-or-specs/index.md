---
title: "Can we transform or clean up old data to new formats or specs?"
---

This is a common question if the data you're collecting has evolved over time. For example, if you used to track the event `Signup` but now track `Signed Up`, you'd probably like to merge those two tables to make querying simple and understandable.

Segment does not have a way to update the event data in the context of your warehouse to retroactively merge the tables created from changed events. Instead, you can create a "materialized" view of the unioned events. This is supported in [Redshift](https://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_VIEW.html), [Postgres](https://www.postgresql.org/docs/9.3/rules-materializedviews.html), [Snowflake](https://docs.snowflake.net/manuals/sql-reference/sql/create-view.html), and others, but may not be available in _all_ warehouses.

Protocols customers can also use [Transformations](/docs/protocols/transformations/) to change events at the source, which applies to all cloud-mode destinations (destinations that receive data from the Segment servers) _including_ your data warehouse. Protocols Transformations offer an excellent way to quickly resolve implementation mistakes and help transition events to a Segment spec.

> **Note**: Transformations are currently limited to event, property and trait name changes, and do **not** apply to historical data.
