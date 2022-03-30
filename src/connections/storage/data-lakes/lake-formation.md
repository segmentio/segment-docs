---
title: AWS Lake Formation
---
AWS Lake Formation is a fully managed service built on top of the AWS Glue Data Catalog that provides one central set of tools to securely build and manage a Data Lake. The tools fall into one of two categories: setup and data management and security management. Setup and data management tools help import, catalog, transform, and deduplicate data, and optimize your storage and security. Security management tools help you to define and enforce encryption and access controls and implement audit logging. 

> note "Learn more about AWS Lake Formation features"
> To learn more about AWS Lake Formation features, refer to the [Amazon Web Services documentation](https://aws.amazon.com/lake-formation/features/).

<!--add description of how the security works, because the secure aspect is a big selling point-->

## Configuring Lake Formation
You can configure Lake Formation using the [`IAMAllowedPrincipals` group](#configuring-lake-formation-using-the-iamallowedprincipals-group) or by [using IAM policies for access control](#configuring-lake-formation-using-iam-policies). Configuring Lake Formation using the `IAMAllowedPrincipals` group is an easier method, recommended for those exploring Lake Formation. Setting up using IAM policies for access control is a more advanced setup option, recommended for those who want additional customization options. 

> info "Permissions required to configure Data Lakes"
> To configure Lake Formation, you must be logged in to AWS with data lake administrator or database creator permissions. 

### Configuring Lake Formation using the IAMAllowedPrincipals group

#### Existing databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/).
2. Under **Data catalog**, select the **Settings** tab. Ensure the checkboxes under the **Default permissions for newly created databases and tables** are not checked. 
3. Under **Permissions**, select the **Data lake permissions** section. Select the **Grant** button.
4. On the **Grant data permissions** page, select the `IAMAllowedPrincipals` group in the Principals section.
5. Under the **Database permissions** section, select the checkboxes for **Super** database permissions and **Super** grantable permissions.
6. Select the **Grant** button. 
7. On the **Permissions** page, verify the `IAMAllowedPrincipals` group is listed. 

#### New databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/).
2. Under **Data catalog**, select the **Settings** tab. Ensure the checkboxes under the **Default permissions for newly created databases and tables** are not checked. 
3. Select the Databases tab. Click the **Create database** button, and create your database.
    1. Select the **Database** button.
    2. Name your database. 
    3. Set the location to `s3://$datalake_bucket/segment-data/`. <br/> **Optional:** Add a description to your database.
    4. Select the `Use only IAM access control for new tables in this database`.
    5. Click **Create database**.
4. On the **Databases** page, select your database. From the **Actions** menu, select **Grant** under the Permissions section. 
5. On the **Grant data permissions** page, select the `IAMAllowedPrincipals` group in the Principals section.
6. Under the **Database permissions** section, select the checkboxes for **Super** database permissions and **Super** grantable permissions.
7. Select the **Grant** button. 
8. On the **Permissions** page, verify the `IAMAllowedPrincipals` group is listed. 

#### Verifying your configuration
To verify that you've successfully configured Lake Formation, open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/), select **Data lake permissions**, and verify the `IAMAllowedPrincipals` group is listed with "All" permissions.

### Configuring Lake Formation using IAM policies

<!-- totally start this section from scratch-->

#### Existing databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/).
2. Under **Data catalog**, select the settings tab. Ensure the checkboxes under the **Default permissions for newly created databases and tables** are not checked.
3. 

#### New databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/).
2. Under **Data catalog**, select the settings tab. Ensure the checkboxes under the **Default permissions for newly created databases and tables** are not checked. 
3. Select the Databases tab. Click the **Create database** button, and create your database:
    1. Select the **Database** button.
    2. Name your database. 
    3. Set the location to `s3://$datalake_bucket/segment-data/`. <br/> **Optional:** Add a description to your database.
    4. Click **Create database**.
4. 