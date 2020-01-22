---
title: Data Lakes (Beta)
---

_Note: Data Lakes is currently in private beta._

Segment Data Lakes helps you stream the data you send to Segment to Cloud Object Stores (AWS S3 to start) in a manner that is optimized for Data Analytics and Data Science workloads.

Data Lakes blends the experience of using our existing S3 destination and a warehouse destination. The product integrates with the AWS Glue Catalog and publishes files in parquet, a binary encoding format, partitioned by event type and date. These formats are optimized for use with systems like Spark, Athena, or Machine Learning vendors like DataBricks or DataRobot.

## Getting Started

To help you get started with the Data Lakes product, we’ve open sourced [Terraform modules](https://github.com/segmentio/terraform-aws-data-lake) to help automate a lot of the set up work for getting the Segment Data Lakes product up and running. If you prefer to use the AWS UI, we also have documentation for this [here](https://docs.google.com/document/d/1GlWzS5KO4QaiVZx9pwfpgF-N-Xy2e_QQcdYSX-nLMDU/edit?usp=sharing).

Once your AWS resources are created, you can entere these settings and enable Data Lakes via the Segment app, by visiting https://app.segment.com/{workspace-slug}/destinations/catalog/data-lakes (replace `{workspace-slug}` with the slug of your workspace).

Once you enter and save these settings, you’ll be able to enable the Data Lakes destination. This will kick off the process for us to begin syncs, which typically takes a few hours for the first sync.
