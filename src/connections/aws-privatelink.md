---
title: Amazon Web Services PrivateLink
---

[Amazon Web Services' PrivateLink](https://aws.amazon.com/privatelink/){:target="_blank”} is an AWS service that provides private connectivity between VPCs without exposing traffic to the public Internet. Keeping traffic in the Amazon network reduces the data security risk associated with exposing your Warehouse traffic to the Internet.

> info ""
> Segment's PrivateLink integration is currently in private beta and is governed by Segment’s [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank”}. You might incur additional networking costs while using AWS PrivateLink. 

You can configure AWS PrivateLink for [Databricks](#databricks), [RDS Postgres](#rds-postgres), [Redshift](#redshift), and [Snowflake](#snowflake). Only warehouses located in regions `us-east-1`, `us-east-2`, `us-west-2`, or `eu-west-1` are eligible.

Usage limits for each customer during the AWS PrivateLink Private Beta include the following: 
- Up to 2 AWS PrivateLink VPC endpoints.  
- A monthly data transfer limit of 300GB total for all PrivateLink VPC endpoints connected to Segment.

## Databricks

The following Databricks integrations support PrivateLink:
- [Databricks storage destination](/docs/connections/storage/catalog/databricks/)
- [Databricks Reverse ETL source](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/databricks-setup/)
- [Databricks Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/databricks-profiles-sync/)
- [Databricks Data Graph](/docs/unify/data-graph/)

> info "Segment recommends reviewing the Databricks documentation before attempting AWS PrivateLink setup"
> The setup required to configure the Databricks PrivateLink integration requires front-end and back-end PrivateLink configuration. Review the [Databricks documentation on AWS PrivateLink](https://docs.databricks.com/en/security/network/classic/privatelink.html){:target="_blank”} to ensure you have everything required to set up this configuration before continuing. 

### Prerequisites
Before you can implement AWS PrivateLink for Databricks, complete the following prerequisites in your Databricks workspace:
- Databricks account must be on the [Enterprise pricing tier](https://www.databricks.com/product/pricing/platform-addons){:target="_blank”} and use the [E2 version](https://docs.databricks.com/en/archive/aws/end-of-life-legacy-workspaces.html#e2-architecture){:target="_blank”} of the platform. 
- Databricks workspace must use a [Customer-managed VPC](https://docs.databricks.com/en/security/network/classic/customer-managed-vpc.html){:target="_blank”} and [Secure cluster connectivity](https://docs.databricks.com/en/security/network/classic/secure-cluster-connectivity.html){:target="_blank”}.
  - Configure your [VPC](https://docs.databricks.com/en/security/network/classic/customer-managed-vpc.html){:target="_blank”} with DNS hostnames and DNS resolution
  - Configure a [security group](https://docs.databricks.com/en/security/network/classic/customer-managed-vpc.html#security-groups){:target="_blank”} with bidirectional access to 0.0.0.0/0 and ports 443, 3306, 6666, 2443, and 8443-8451. 

### Implement PrivateLink for Databricks
To implement Segment's PrivateLink integration for Databricks:
1. Follow the instructions in Databricks' [Enable private connectivity using AWS PrivateLink](https://docs.databricks.com/en/security/network/classic/privatelink.html){:target="_blank”} documentation. You must create a [back-end](https://docs.databricks.com/en/security/network/classic/privatelink.html#private-connectivity-overview){:target="_blank”} connection to integrate with Segment's front-end connection. 
2. After you've configured a back-end connection for Databricks, let your Customer Success Manager (CSM) know that you're interested in PrivateLink.
3. Segment's engineering team creates a custom VPC endpoint on your behalf. Segment then provides you with the VPC endpoint's ID.
4. Register the VPC endpoint in your Databricks account and create or update your Private Access Setting to include the VPC endpoint. For more information, see Databricks' [Register PrivateLink objects](https://docs.databricks.com/en/security/network/classic/privatelink.html#step-3-register-privatelink-objects){:target="_blank”} documentation.
5. Configure your Databricks workspace to [use the Private Access Setting object](https://docs.databricks.com/en/security/network/classic/privatelink.html#step-4-create-or-update-your-workspace-with-privatelink-objects){:target="_blank”} from the previous step.
6. Reach back out to your CSM and provide them with your Databricks Workspace URL. Segment configures their internal DNS to reroute Segment traffic for your Databricks workspace to your VPC endpoint.
7. Your CSM notifies you that Segment's PrivateLink integration is complete. If you have any existing Segment Databricks integrations that use your Databricks workspace URL, they now automatically use PrivateLink. Any new Databricks integrations created in the Segment app using your Databricks workspace URL will also automatically use PrivateLink.

## RDS Postgres 

The following RDS Postgres integrations support PrivateLink:
- [RDS Postgres storage destination](/docs/connections/storage/catalog/postgres/)
- [RDS Postgres Reverse ETL source](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/postgres-setup/)
- [RDS Postgres Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/)

### Prerequisites
Before you can implement AWS PrivateLink for RDS Postgres, complete the following prerequisites:
- **Set up a Network Load Balancer (NLB) to route traffic to your Postgres database**: Segment recommends creating a NLB that has target group IP address synchronization, using a solution like AWS Lambda. 
If any updates are made to the Availability Zones (AZs) enabled for your NLB, please let your CSM know so that Segment can update the AZs of your VPC endpoint.
- **Configure your NLB with one of the following settings**: 
  - Disable the **Enforce inbound rules on PrivateLink traffic** setting
  - If you must enforce inbound rules on PrivateLink traffic, add an inbound rule that allows traffic belonging to Segment's PrivateLink/Edge CIDR: `10.0.0.0/8`

### Implement PrivateLink for RDS Postgres
To implement Segment's PrivateLink integration for RDS Postgres:
1. Create a Network Load Balancer VPC endpoint service using the instructions in the [Create a service powered by AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html){:target="_blank”} documentation. 
2. Let your Customer Success Manager (CSM) know that you're interested in PrivateLink. They will share information with you about Segment's AWS principal.
3. Add the Segment AWS principal as an “Allowed Principal” to consume the Network Load Balancer VPC endpoint service you created in step 1.
4. Reach out to your CSM and provide them with the Service Name for the service that you created above. Segment's engineering team provisions a VPC endpoint for the service in the Segment Edge VPC. 
5. Segment provides you with the VPC endpoint's private DNS name. Use the DNS name as the **Host** setting to update or create new Postgres integrations in the Segment app.

## Redshift

The following Redshift integrations support PrivateLink:
- [Redshift storage destination](/docs/connections/storage/catalog/redshift/)
- [Redshift Reverse ETL source](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/redshift-setup/)
- [Redshift Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/)
- [Redshift Data Graph](/docs/unify/data-graph/)

### Prerequisites
Before you can implement AWS PrivateLink for Redshift, complete the following prerequisites:
- **You're using the RA3 node type**: To access Segment's PrivateLink integration, use an RA3 instance.
- **You've enabled cluster relocation**: Cluster relocation migrates your cluster behind a proxy and keeps the cluster endpoint unchanged, even if your cluster needs to be migrated to a new Availability Zone. A consistent cluster endpoint makes it possible for Segment's Edge account and VPC to remain connected to your cluster. To enable cluster relocation, follow the instructions in the AWS [Relocating your cluster](https://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-recovery.html){:target="_blank”} documentation. 
- **Your cluster is using a port within the ranges 5431-5455 or 8191-8215**: Clusters with cluster relocation enabled [might encounter an error if updated to include a port outside of this range](https://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-recovery.html#:~:text=You%20can%20change%20to%20another%20port%20from%20the%20port%20range%20of%205431%2D5455%20or%208191%2D8215.%20(Don%27t%20change%20to%20a%20port%20outside%20the%20ranges.%20It%20results%20in%20an%20error.)){:target="_blank”}.

### Implement PrivateLink for Redshift
To implement Segment's PrivateLink integration for Redshift:
1. Let your Customer Success Manager (CSM) know that you're interested in PrivateLink. They will share information with you about Segment’s Edge account and VPC.
2. After you receive the Edge account ID and VPC ID, [grant cluster access to Segment's Edge account and VPC](https://docs.aws.amazon.com/redshift/latest/mgmt/managing-cluster-cross-vpc-console-grantor.html){:target="_blank”}.
3. Reach back out to your CSM and provide them with the Cluster Identifier for your cluster and your AWS account ID. 
4. Segment's engineering team creates a Redshift managed VPC endpoint within the Segment Redshift subnet on your behalf, which creates a PrivateLink Endpoint URL. Segment then provides you with the internal PrivateLink Endpoint URL. 
5. Use the provided PrivateLink Endpoint URL as the **Hostname** setting to update or create new Redshift integrations in the Segment app.

## Snowflake

The following Snowflake integrations support PrivateLink:
- [Snowflake storage destination](/docs/connections/storage/catalog/snowflake/)
- [Snowflake Reverse ETL source](/docs/connections/reverse-etl/reverse-etl-source-setup-guides/snowflake-setup/)
- [Snowflake Profiles Sync](/docs/unify/profiles-sync/profiles-sync-setup/)
- [Snowflake Data Graph](/docs/unify/data-graph/)

### Prerequisites
Before you can implement AWS PrivateLink for Snowflake, complete the following prerequisites:
- Your Snowflake account is on the [Business Critical Edition](https://docs.snowflake.com/en/user-guide/intro-editions){:target="_blank”} or higher.
- Your Snowflake account is hosted on the [AWS cloud platform](https://docs.snowflake.com/en/user-guide/intro-cloud-platforms){:target="_blank”}.

### Implement PrivateLink for Snowflake
To implement Segment's PrivateLink integration for Snowflake:
1. Follow Snowflake's PrivateLink documentation to [enable AWS PrivateLink](https://docs.snowflake.com/en/user-guide/admin-security-privatelink#enabling-aws-privatelink){:target="_blank”} for your Snowflake account.
2. Let your Customer Success Manager (CSM) know that you're interested in PrivateLink. They will provide you with Segment’s AWS Edge account ID.
3. Create a Snowflake Support Case to authorize PrivateLink connections from Segment's AWS account ID as a third party vendor to your Snowflake account.
4. After Snowflake support authorizes Segment, call the [SYSTEM$GET_PRIVATELINK_CONFIG](https://docs.snowflake.com/en/sql-reference/functions/system_get_privatelink_config){:target="_blank”} function while using the Snowflake ACCOUNTADMIN role. Reach back out to your Segment CSM and provide them with the **privatelink-vpce-id** and **privatelink-account-url** values from the function output. Note down for yourself the **privatelink-account-name** value.
5. Segment's engineering team creates a custom VPC endpoint on your behalf. Segment also creates a CNAME record to reroute Segment traffic to use your VPC endpoint. This ensures that Segment connections to your **privatelink-account-name** are made over PrivateLink.
6. Your CSM notifies you that the setup on Segment's side is complete. Use your **privatelink-account-name** as the **Account** setting to update or create new Snowflake integrations in the Segment app.
