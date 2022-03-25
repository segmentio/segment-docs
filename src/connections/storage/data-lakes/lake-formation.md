---
title: AWS Lake Formation
---
AWS Lake Formation is a fully managed service built on top of the AWS Glue Data Catalog that provides one central set of tools to securely build and manage a Data Lake. The tools fall into one of two categories: setup and data management and security management. Setup and data management tools help import, catalog, transform, and deduplicate data, and optimize your storage and security. Security management tools help you to define and enforce encryption and access controls and implement audit logging. 

> note "Learn more about AWS Lake Formation features"
> To learn more about AWS Lake Formation features, refer to the [Amazon Web Services documentation](https://aws.amazon.com/lake-formation/features/).

<!---add description of how the security works, because the secure aspect is a big selling point-->

## Configuring Lake Formation
You can configure Lake Formation using the [`IAMAllowedPrincipals` group](#configuring-lake-formation-using-the-iamallowedprincipals-group) or by [using IAM policies for access control](#configuring-lake-formation-using-iam-policies). With the `IAMAllowedPrincipals` group, 
<!--add use case explanation, finish sentence here-->

> info "Permissions required to configure Data Lakes"
> To configure Lake Formation, you must be logged in to AWS with data lake administrator or a database creator permissions. 

### Configuring Lake Formation using the IAMAllowedPrincipals group

#### Existing databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/).
2. Under **Data catalog**, select the settings tab. Ensure the check boxes under the **Default permissions for newly created databases and tables** are not checked. 
3. Under **Permissions**, select the **Admins and database creators** section and give your EMR instance profile role (`EMR_EC2-DEFAULT` if you created your EMR cluster manually, or `segment_emr_instance_profile` if you set it up using Terraform) to the **Database creators** section. 

#### New databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/).
2. Under **Data catalog**, select the settings tab. Ensure the check boxes under the **Default permissions for newly created databases and tables** are not checked. 
3. Select the Databases tab. Click the **Create database** button, and create your database:
    1. Select the **Database** button.
    2. Name your database. 
    3. Set the location to `s3://$datalake_bucket/segment-data/`. <br/> **Optional:** Add a description to your database.
    4. Select the `Use only IAM access control for new tables in this database`.
    5. Click **Create database**.
4. 
<!---asked Udit where the next step lives for the new databases section: doc isn't super clear?-->

### Configuring Lake Formation using IAM policies

#### Existing databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/). 

#### New databases
1. Open the [AWS Lake Formation service](https://console.aws.amazon.com/lakeformation/).
2. Under **Data catalog**, select the settings tab. Ensure the check boxes under the **Default permissions for newly created databases and tables** are not checked. 
3. Select the Databases tab. Click the **Create database** button, and create your database:
    1. Select the **Database** button.
    2. Name your database. 
    3. Set the location to `s3://$datalake_bucket/segment-data/`. <br/> **Optional:** Add a description to your database.
    4. Click **Create database**.
4. 
<!---same as note above: not sure where next step lives for either new/existing databases-->