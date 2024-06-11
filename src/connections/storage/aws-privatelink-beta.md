---
title: Amazon Web Services PrivateLink
hidden: true
---

[Amazon Web Services' PrivateLink](https://aws.amazon.com/privatelink/){:target="_blank”} is an AWS service that provides private connectivity between VPCs without exposing traffic to the public Internet. Keeping traffic in the Amazon network reduces the data security risk associated with exposing your Warehouse traffic to the Internet.

> info ""
> Segment's PrivateLink integration is currently in public beta and is governed by Segment’s [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank”}. Only warehouses located in region `us-east-1` are eligible for PrivateLink. 

During the AWS PrivateLink Private Beta, Segment supports the following integrations: 
- Databricks
  - [Databricks storage destination](/docs/connections/storage/catalog/databricks/)
  - [Databricks Reverse ETL source](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/databricks-setup/)
  - [Databricks Profiles Sync destination](/docs/unify/profiles-sync/profiles-sync-setup/databricks-profiles-sync/)
- RDS Postgres
  - [RDS Postgres storage destination](/docs/connections/storage/catalog/postgres/)
  - [RDS Postgres Reverse ETL source](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/postgres-setup/)
  - [RDS Postgres Profiles Sync destination](/docs/unify/profiles-sync/profiles-sync-setup/#step-1-select-a-warehouse)
- Redshift
  - [Redshift storage destination](/docs/connections/storage/catalog/redshift/)
  - [Redshift Reverse ETL source](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/redshift-setup/)
  - [Redshift Profiles Sync destination](/docs/unify/profiles-sync/profiles-sync-setup/#step-1-select-a-warehouse)

## Getting started

You can set up AWS PrivateLink for [Databricks](#databricks), [RDS Postgres](#rds-postgres), and [Redshift](#redshift). 

### Databricks

> info "Segment recommends reviewing the Databricks documentation before attempting AWS PrivateLink setup"
> The setup required to configure the Databricks PrivateLink integration requires front-end and back-end PrivateLink configuration. Review the [Databricks documentation on AWS PrivateLink](https://docs.databricks.com/en/security/network/classic/privatelink.html){:target="_blank”} to ensure you have everything required to set up this configuration before continuing. 

#### Prerequisites

Before you begin, [reach out to Segment]() and indicate your interest in configuring AWS PrivateLink for Databricks. Segment's engineering team will create a VPC endpoint on your behalf and share the VPC endpoint ID with you. You need information about this VPC endpoint to [Create VPC Endpoints](https://docs.databricks.com/en/security/network/classic/privatelink.html#step-3-register-privatelink-objects){:target="_blank”} in your Databricks instance.

To configure AWS PrivateLink for Databricks:
- Your Databricks account must be on the [Enterprise pricing tier](https://www.databricks.com/product/pricing/platform-addons){:target="_blank”} and use the [E2 version](https://docs.databricks.com/en/archive/aws/end-of-life-legacy-workspaces.html#e2-architecture){:target="_blank”} of the platform. 
- Your Databricks workspace must use a [Customer-managed VPC](https://docs.databricks.com/en/security/network/classic/customer-managed-vpc.html){:target="_blank”} and [Secure cluster connectivity](https://docs.databricks.com/en/security/network/classic/secure-cluster-connectivity.html){:target="_blank”}
- You must have the AWS permissions required to [set up a new Databricks workspace](https://docs.databricks.com/en/admin/workspace/create-workspace.html#before-you-begin){:target="_blank”} and [create a VPC](https://docs.aws.amazon.com/vpc/latest/privatelink/getting-started.html#create-vpc-subnets){:target="_blank”} 

> warning "The `us-west-1` region does not support PrivateLink"
> Create a Databricks warehouse in a new region to use PrivateLink.

### Getting started

To configure PrivateLink for Databricks, follow the instructions in Databricks' [Enable private connectivity using AWS PrivateLink](https://docs.databricks.com/en/security/network/classic/privatelink.html){:target="_blank”} documentation. You must create both [front-end and back-end](https://docs.databricks.com/en/security/network/classic/privatelink.html#private-connectivity-overview){:target="_blank”} connections to integration PrivateLink for Segment.

### RDS Postgres 

1. Create a Network Load Balancer VPC endpoint service using the instructions in the [Create a service powered by AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html){:target="_blank”} documentation. 
2. [Reach out to Segment]() for more details about Segment's AWS principal.
3. Add the Segment AWS principal as an “Allowed Principal” to consume the service.
4. [Reach out to Segment]() and provide Segment's engineering team with the name of the service that you created above and the region that service is located in. Segment's engineering team provisions a VPC endpoint for the service in the Segment Edge VPC. After creating the VPC, Segment either provides you with private DNS so you can configure the feature in the Segment app or creates an RDS Postgres source or destination on your behalf already configured with the required connection settings.

### Redshift

1. [Reach out to Segment]() and let the engineering team know you're interested in configuring AWS PrivateLink for Redshift. Segment's engineering team will then share information with you about Segment’s Edge account and VPC.
2. After you receive information from Segment about the Edge account and VPC, [grant cluster access to Segment's Edge account and VPC](https://docs.aws.amazon.com/redshift/latest/gsg/rs-gsg-connect-to-cluster.html){:target="_blank”}.
3. Segment creates a Redshift managed VPC endpoint within a Redshift subnet on your behalf, which creates an internal PrivateLink Endpoint URL. Segment will provide you with this URL, which you need to configure your Warehouse in the Segment app. 
