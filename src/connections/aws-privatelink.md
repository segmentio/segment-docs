---
title: Amazon Web Services PrivateLink
---

[Amazon Web Services' PrivateLink](https://aws.amazon.com/privatelink/){:target="_blank”} is an AWS service that provides private connectivity between VPCs without exposing traffic to the public Internet. Keeping traffic in the Amazon network reduces the data security risk associated with exposing your Warehouse traffic to the Internet.

> info ""
> Segment's PrivateLink integration is currently in private beta and is governed by Segment’s [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank”}. Only warehouses located in regions `us-east-1`, `us-west-2`, or `eu-west-1` are eligible for PrivateLink. You might incur additional networking costs while using AWS PrivateLink. 

During the Private Beta, you can set up AWS PrivateLink for [Databricks](#databricks), [RDS Postgres](#rds-postgres), and [Redshift](#redshift). 

## Databricks

> info "Segment recommends reviewing the Databricks documentation before attempting AWS PrivateLink setup"
> The setup required to configure the Databricks PrivateLink integration requires front-end and back-end PrivateLink configuration. Review the [Databricks documentation on AWS PrivateLink](https://docs.databricks.com/en/security/network/classic/privatelink.html){:target="_blank”} to ensure you have everything required to set up this configuration before continuing. 

### Prerequisites
Before you can configure AWS PrivateLink for Databricks, complete the following prerequisites in your Databricks workspace:
- Databricks account must be on the [Enterprise pricing tier](https://www.databricks.com/product/pricing/platform-addons){:target="_blank”} and use the [E2 version](https://docs.databricks.com/en/archive/aws/end-of-life-legacy-workspaces.html#e2-architecture){:target="_blank”} of the platform. 
- Databricks workspace must use a [Customer-managed VPC](https://docs.databricks.com/en/security/network/classic/customer-managed-vpc.html){:target="_blank”} and [Secure cluster connectivity](https://docs.databricks.com/en/security/network/classic/secure-cluster-connectivity.html){:target="_blank”}.
  - Configure your [VPC](https://docs.databricks.com/en/security/network/classic/customer-managed-vpc.html){:target="_blank”} with DNS hostnames and DNS resolution
  - Configure a [security group](https://docs.databricks.com/en/security/network/classic/customer-managed-vpc.html#security-groups){:target="_blank”} with bidirectional access to 0.0.0.0/0 and ports 443, 3306, 6666, 2443, and 8443-8451. 

### Configure PrivateLink for Databricks
To configure PrivateLink for Databricks:
1. Follow the instructions in Databricks' [Enable private connectivity using AWS PrivateLink](https://docs.databricks.com/en/security/network/classic/privatelink.html){:target="_blank”} documentation. You must create a [back-end](https://docs.databricks.com/en/security/network/classic/privatelink.html#private-connectivity-overview){:target="_blank”} connection to integrate with Segment's front-end connection. 
2. After you've configured a back-end connection for Databricks, request access to Segment's PrivateLink integration by reaching out to your Customer Success Manager (CSM).
3. Your CSM sets up a call with Segment R&D to continue the onboarding process. 

The following Databricks integrations support PrivateLink:
  - [Databricks storage destination](/docs/connections/storage/catalog/databricks/)
  - [Databricks Reverse ETL source](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/databricks-setup/)

## RDS Postgres 

### Prerequisites
Before you can configure AWS PrivateLink for RDS Postgres, complete the following prerequisites in your Databricks workspace:
- **Set up a Network Load Balancer (NLB) to route traffic to your Postgres database**: Segment recommends creating a NLB that has target group IP address synchronization, using a solution like AWS Lambda. 
If any updates are made to the Availability Zones (AZs) enabled for your NLB, please let your CSM know so that Segment can update the AZs of your VPC endpoint.
- **Configure your NLB with one of the following settings**: 
  - Disable the **Enforce inbound rules on PrivateLink traffic** setting
  - If you must enforce inbound rules on PrivateLink traffic, add an inbound rule that allows traffic belonging to Segment's PrivateLink/Edge CIDR: `10.0.0.0/8`

### Configure PrivateLink for RDS Postgres
1. Create a Network Load Balancer VPC endpoint service using the instructions in the [Create a service powered by AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html){:target="_blank”} documentation. 
2. Reach out to your Customer Success Manager (CSM) for more details about Segment's AWS principal.
3. Add the Segment AWS principal as an “Allowed Principal” to consume the Network Load Balancer VPC endpoint service you created in step 1.
4. Reach out to your CSM and provide them with the Service name for the service that you created above. Segment's engineering team provisions a VPC endpoint for the service in the Segment Edge VPC. 
5. After creating the VPC endpoint, Segment provides you with private DNS so you can update the **Host** in your Segment app settings or create a new Postgres integration. <br> The following RDS Postgres integrations support PrivateLink: 
  - [RDS Postgres storage destination](/docs/connections/storage/catalog/postgres/)
  - [RDS Postgres Reverse ETL source](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/postgres-setup/)

## Redshift

### Prerequisites
- **You're using the RA3 node type**: To access Segment's PrivateLink integration, use an RA3 instance.
- **You've enabled cluster relocation**: Cluster relocation migrates your cluster behind a proxy and keeps the cluster endpoint unchanged, even if your cluster needs to be migrated to a new Availability Zone. A consistent cluster endpoint makes it possible for Segment's Edge account and VPC to remain connected to your cluster. To enable cluster relocation, follow the instructions in the AWS [Relocating your cluster](https://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-recovery.html){:target="_blank”} documentation. 
- **Your cluster is using a port within the ranges 5431-5455 or 8191-8215**: Clusters with cluster relocation enabled [might encounter an error if updated to include a port outside of this range](https://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-recovery.html#:~:text=You%20can%20change%20to%20another%20port%20from%20the%20port%20range%20of%205431%2D5455%20or%208191%2D8215.%20(Don%27t%20change%20to%20a%20port%20outside%20the%20ranges.%20It%20results%20in%20an%20error.)){:target="_blank”}.

### Configure PrivateLink for Redshift
Implement Segment's PrivateLink integration by taking the following steps:
1. Let your Customer Success Manager (CSM) know that you're interested in PrivateLink. They will share information with you about Segment’s Edge account and VPC.
2. After you receive the Edge account ID and VPC ID, [grant cluster access to Segment's Edge account and VPC](https://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-cross-vpc-console-grantor.html){:target="_blank”}.
3. Reach back out to your CSM and provide them with the Cluster identifier for your cluster and your AWS account ID. 
4. Segment creates a Redshift managed VPC endpoint within the Segment Redshift subnet on your behalf, which creates a PrivateLink Endpoint URL. Segment then provides you with the internal PrivateLink Endpoint URL. 
5. After Segment provides you with the URL, use it to update or create new Redshift integrations. The following integrations support PrivateLink: 
  - [Redshift storage destination](/docs/connections/storage/catalog/redshift/)
  - [Redshift Reverse ETL source](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/redshift-setup/)
