---
title: S3 (Actions) Destination
hide-boilerplate: true
hide-dossier: false
# id: 5f7dd8e302173ff732db5cc4
# versions:
#   - name: AWS S3 (Classic)
#     link: /docs/connections/destinations/catalog/aws-s3/
---
{% include content/plan-grid.md name="actions" %}

The AWS S3 (Actions) destination allows you to store event data as objects in a secure, scalable cloud storage solution. Each event is written to your S3 bucket, organized into a customizable folder structure such as by event type or timestamp. This makes it easy to manage, archive, and analyze data using downstream tools or AWS services.


## Benefits of AWS S3 (Actions) vs AWS S3 Classic
The traditional AWS S3 Classic destination enabled the storage of raw logs containing data Segment received, directly into your S3 bucket. While this provided a straightforward data storage solution, users often needed to implement additional processing to standardize or transform these logs for downstream analytics or integrations.

The AWS S3 (Actions) destination enhances this capability by introducing configurable options to format and structure event data prior to storage. This new approach offers several key benefits:

1. Standardized Data Formatting
Instead of raw, unprocessed logs, AWS S3 (Actions) lets you define consistent output formats for your data. This standardization simplifies downstream analysis, ensuring your event payloads adhere to predefined schemas without requiring custom transformation processes after storage.

2. Configurable Data Translation
AWS S3 (Actions) supports translation rules that can map raw event attributes to more meaningful or actionable representations. You can configure these rules to meet specific data schema requirements, reducing the need for post-processing and improving compatibility with other tools and analytics platforms.

3. Enhanced Delivery Controls
The destination provides advanced options for batching, compression, and file naming conventions. These controls help optimize storage efficiency and simplify data retrieval workflows.

4. Improved Data Consistency and Quality
By standardizing event payloads before delivery, AWS S3 (Actions) minimizes inconsistencies and errors often associated with raw data ingestion. This leads to cleaner, more reliable data for downstream systems.


## Getting Started
Setting up the AWS S3 (Actions) destination is a straightforward process designed to help you quickly configure and deploy standardized event data to your Amazon S3 bucket. Follow these steps to get started:

### Prerequisites
Ensure you have the following in place before configuring the AWS S3 (Actions) destination:

- Amazon S3 Bucket: Create a bucket in your AWS account or use an existing one where you want to store the event data.
- AWS IAM Permissions: Verify that you have appropriate IAM roles with write access to the S3 bucket and permissions for the Segment connection.
- Access Keys: Prepare your AWS Access Key ID and Secret Access Key. These will be needed to authenticate Segment with your S3 bucket.


## Create a new destination


### Create an IAM role in the AWS console


### Build Configuration Mappings


