---
title: Lake Formation
---

{% include content/plan-grid.md name="data-lakes" %}

Lake Formation is a fully managed service built on top of the AWS Glue Data Catalog that provides one central set of tools to build and manage a Data Lake. These tools help import, catalog, transform, and deduplicate data, as well as provide strategies to optimize data storage and security. To learn more about Lake Formation features, see [Amazon Web Services documentation](https://aws.amazon.com/lake-formation/features/){:target="_blank"}.

> note "This feature is not supported in the Azure Data Lakes public beta"
> Lake Formation is only supported for Segment Data Lakes. For more information about Azure Data Lakes, see the [Data Lakes overview documentation](/docs/connections/storage/data-lakes/index/#how-azure-data-lakes-works).

The security policies in Lake Formation use two layers of permissions: each resource is protected by Lake Formation permissions (which control access to Data Catalog resources and S3 locations) and IAM permissions (which control access to Lake Formation and AWS Glue API resources). When any user or role reads or writes to a resource, that action must pass a both a Lake Formation and an IAM resource check: for example, a user trying to create a new table in the Data Catalog may have Lake Formation access to the Data Catalog, but if they don't have the correct Glue API permissions, they will be unable to create the table. 

For more information about security practices in Lake Formation, see Amazon's [Lake Formation Permissions Reference](https://docs.aws.amazon.com/lake-formation/latest/dg/lf-permissions-reference.html){:target="_blank"} documentation. 

## Configure Lake Formation
You can configure Lake Formation using the [`IAMAllowedPrincipals` group](#configure-lake-formation-using-the-iamallowedprincipals-group) or by [using IAM policies for access control](#configure-lake-formation-using-iam-policies). Configuring Lake Formation using the `IAMAllowedPrincipals` group is an easier method, recommended for those exploring Lake Formation. Setting up Lake Formation using IAM policies for access control is a more advanced setup option, recommended for those who want additional customization options. 

> info "Permissions required to configure Data Lakes"
> To configure Lake Formation, you must be logged in to AWS with data lake administrator or database creator permissions. 

### Configure Lake Formation using the IAMAllowedPrincipals group

#### Existing databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/){:target="_blank"}.
2. Under **Data catalog**, select **Settings**. Ensure the checkboxes under the **Default permissions for newly created databases and tables** are not checked. 
3. Under **Permissions**, select the **Data lake permissions** section. Click **Grant**.
4. On the **Grant data permissions** page, select the `IAMAllowedPrincipals` group in the Principals section.
5. In the **Database permissions** section, select the checkboxes for **Super** database permissions and **Super** grantable permissions.
6. Click **Grant**. 
7. On the **Permissions** page, verify the `IAMAllowedPrincipals` group has "All" permissions.

#### New databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/){:target="_blank"}.
2. Under **Data catalog**, select **Settings**. Ensure the checkboxes under **Default permissions for newly created databases and tables** are not checked. 
3. Select the Databases tab and click **Create database**. On the **Create database** page:
    1. Select the **Database** button.
    2. Name your database. 
    3. Set the location to `s3://$datalake_bucket/segment-data/`. <br/> **Optional:** Add a description to your database.
    4. Select the `Use only IAM access control for new tables in this database`.
    5. Click **Create database**.
4. On the **Databases** page, select your database. From the **Actions** menu, select **Grant**. 
5. On the **Grant data permissions** page, select the `IAMAllowedPrincipals` group in the Principals section.
6. In the **Database permissions** section, select the checkboxes for **Super** database permissions and **Super** grantable permissions.
7. Click **Grant**. 
8. On the **Permissions** page, verify the `IAMAllowedPrincipals` group has "All" permissions.

#### Verify your configuration
To verify that you've configured Lake Formation, open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/){:target="_blank"}, select **Data lake permissions**, and verify the `IAMAllowedPrincipals` group is listed with "All" permissions.

### Configure Lake Formation using IAM policies

> note "Granting Super permission to IAM roles"
> If you manually configured your database, assign the `EMR_EC2_DefaultRole` Super permissions in step 8. If you configured your database using Terraform, assign the `segment_emr_instance_profile` Super permissions in step 8. 

#### Existing databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/){:target="_blank"}.
2. Under **Data catalog**, select **Settings**. Ensure the checkboxes under the **Default permissions for newly created databases and tables** are not checked.
3. On the **Databases** page, select your database. From the **Actions** menu, select **Grant**. 
5. On the **Grant data permissions** page, select the `EMR_EC2_DefaultRole` (or `segment_emr_instance_profile`, if you configured your data lake using Terraform) and `segment-data-lake-iam-role` roles in the Principals section.
6. In the **Database permissions** section, select the checkboxes for **Super** database permissions and **Super** grantable permissions.
7. Click **Grant**. 
8. On the **Permissions** page, verify the `EMR_EC2_DefaultRole` (or `segment_emr_instance_profile`) and `segment-data-lake-iam-role` roles have "All" permissions.

#### New databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/){:target="_blank"}.
2. Under **Data catalog**, select **Settings**. Ensure the checkboxes under the **Default permissions for newly created databases and tables** are not checked.
3. Select the Databases tab and click **Create database**. On the **Create database** page:
    1. Select the **Database** button.
    2. Name your database. 
    3. Set the location to `s3://$datalake_bucket/segment-data/`. <br/> **Optional:** Add a description to your database.
    4. Click **Create database**.
4. On the **Databases** page, select your database. From the **Actions** menu, select **Grant**. 
5. On the **Grant data permissions** page, select the `EMR_EC2_DefaultRole` (or `segment_emr_instance_profile`, if you configured your data lake using Terraform) and `segment-data-lake-iam-role` roles in the Principals section.
6. In the **Database permissions** section, select the checkboxes for **Super** database permissions and **Super** grantable permissions.
7. Click **Grant**. 
8. On the **Permissions** page, verify the `EMR_EC2_DefaultRole` (or `segment_emr_instance_profile`) and `segment-data-lake-iam-role` roles have "All" permissions.
