A warehouse is a central repository of data collected from one or more sources. This is what commonly comes to mind you think about a relational database: structured data that fits neatly into rows and columns.

In Segment, a Warehouse is a special type destination. Instead of streaming data to the destination all the time, we load data to them in bulk at a regular intervals. When we load data, we insert and update events and objects, and automatically adjust their schema to fit the data you've sent to Segment.
