---
title: Treasure Destination
id: 55a002660a20f4e22f0fb3c2
---
This destination is maintained by Treasure Data.

Once the Segment library is integrated with your server, toggle Treasure Data on in your Segment destinations, and add your API key (which you can find in your Treasure Data console). You will also need to specify the destination database name.

The Segment Treasure Data destination is 100% handled through our servers, so you don't need to bundle their iOS or Android SDKs.

## Table Structure

All of the data from your Segment workspace is hosted on Treasure Data database. Inside that database you will see multiple tables for each of your Segment sources, one for each of the types of data.

Every table is namespaced by the source's name. Inside each source there are a few standard tables:

### source.aliases

A table with all of your alias method calls. This table will include all of the traits you identify users by as top-level columns, for example `<source>.aliases.email`.

### source.groups

A table with all of your group method calls. This table will include all of the traits you record for groups as top-level columns, for example `<source>.groups.employee_count`.

### source.identifies

A table with all of your identify method calls. This table will include all of the traits you identify users by as top-level columns, for example `<source>.identifies.email`.

### source.pages

A table with all of your page method calls. This table will include all of the properties you record for pages as top-level columns, for example `<source>.pages.title`.

### source.screens

A table with all of your screen method calls. This table will include all of the properties you record for screens as top-level columns, for example `<source>.screens.title`.

### source.event_name

For track calls, each event like `Signed Up` or `Order Completed` also has it's own table, with columns for each of the event's distinct properties.
