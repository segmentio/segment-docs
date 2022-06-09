---
title: Iron.io Destination
id: 54521fd725e721e32a72eec5
---
## Getting Started

When you enable Iron.io in Segment, we'll start sending data to an IronMQ instance with data for your account. Currently, Iron.io supports all of the Segment methods, and will send data from any one of our libraries.

When sending data to Iron.io, we'll auto-fill a queue called "segment". You can use Iron.io as a message queue buffer in front of your webhook server or internal data processing cluster. For example, if you want to analyze your data as part of an ETL process, Iron.io can act as an intermediary buffer.

Here's a case study: [How to Build an ETL Pipeline for ElasticSearch Using Segment and Iron.io (Iron.io's blog)](http://blog.iron.io/2014/10/how-to-build-etl-pipeline-for.html?utm_source=segment&medium=docs)
