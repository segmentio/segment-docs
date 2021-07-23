---
rewrite: true
title: Amazon Personalize Destination
---

Segment makes it easy to send your data to Amazon Personalize (and lots of other destinations). Once you collect your data using Segment's [open source libraries](/docs/connections/sources/catalog/), Segment translates and routes your data to Amazon Personalize in the format it can use. [Amazon Personalize](https://aws.amazon.com/personalize/) is a machine learning service that makes it easy for developers to create individualized recommendations for customers using their applications. AWS Personalize enables…

  - Media companies to provide recommended content for viewers based on their viewing history
  - Retailers can provide personalized product recommendations based on shopping behavior
  - Any company to provide personalized search results and targeted marketing promotions based on the latest machine-learning capabilities developed at Amazon

Developing the machine-learning capabilities necessary to produce these sophisticated recommendation systems has been beyond the reach of most organizations today due to the complexity of developing machine learning functionality. Amazon Personalize allows developers with no prior machine learning experience to easily build sophisticated personalization capabilities into their applications, using machine learning technology perfected from years of use on Amazon.com.

## Getting Started

{% include content/connection-modes.md %}

There are a few pre-requisites before getting started. They are:

1. Segment data flowing into an S3 destination OR a warehouse
2. . Ability to create AWS Glue jobs (only required if using S3 to [train your model](#train-your-model))
3. Ability to deploy Lambda functions in Amazon Web Services
4. Access to AWS Personalize

If you don't have an S3, Redshift warehouse, or Snowflake warehouse set up, you can read more about setting up [S3](https://segment.com/docs/connections/storage/catalog/amazon-s3/), [Redshift](https://segment.com/docs/connections/storage/catalog/redshift/), and [Snowflake](https://segment.com/docs/connections/storage/catalog/snowflake/).

***If you're a Segment business tier customer, contact your Success contact to initiate a replay to S3 or your Warehouse.***


There are three main parts to using Amazon Personalize with Segment:

1. [**Train your model**](/docs/connections/destinations/catalog/amazon-personalize/#train-your-model) on historical data in S3 or a Warehouse.
2. [**Create a Personalize Dataset Group**](/docs/connections/destinations/catalog/amazon-personalize/#create-personalize-dataset-group-solution-and-campaign) and Campaign
3. [**Connect Recommendations**](/docs/connections/destinations/catalog/amazon-personalize/#getting-recommendations-and-live-event-updates) and Live Event Updates to your Campaign and Segment

## Train Your Model

**S3 Bucket Permissions**

Whatever method you choose to train your model will result in placing a CSV into an S3 bucket. Be sure to update the policies of the bucket to include [these permissions](https://docs.aws.amazon.com/personalize/latest/dg/data-prep-upload-s3.html) to allow Personalize to access your CSV:

```json
{
    "Version": "2012-10-17",
    "Id": "PersonalizeS3BucketAccessPolicy",
    "Statement": [
        {
            "Sid": "PersonalizeS3BucketAccessPolicy",
            "Effect": "Allow",
            "Principal": {
                "Service": "personalize.amazonaws.com"
            },
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::bucket-name",
                "arn:aws:s3:::bucket-name/*"
            ]
        }
    ]
}
```

**Define a Schema**

To train a Personalize model, you will need to define the event schema for the event names and properties that your model will use as features.  For the examples below, we are using the following Personalize Dataset schema to train our model.  You will want to modify this to suit your use cases.  For more information on Personalize schemas, see:  https://docs.aws.amazon.com/personalize/latest/dg/how-it-works-dataset-schema.html

```json
{
    "type": "record",
    "name": "Interactions",
    "namespace": "com.amazonaws.personalize.schema",
    "fields": [
        {
            "name": "USER_ID",
            "type": "string"
        },
        {
            "name": "ITEM_ID",
            "type": "string"
        },
        {
            "name": "EVENT_TYPE",
            "type": "string"
        },
        {
            "name": "TIMESTAMP",
            "type": "long"
        }
    ],
    "version": "1.0"
}
```

The examples will show how multiple Segment `track` events can be mapped into this schema and used to train a Personalize solution.

### From Redshift

If you already use Redshift, training your model on the data in your warehouse is the simplest way to get up and running.

**Unload Data from Redshift to S3**

  Assuming you have a Personalize schema like that described [below](#create-personalize-dataset-group), you can use the following query to pull out all the date from your `Order Completed`, `Product Added`, and `Product Viewed` events.

```sql
unload ('
  select
    user_id as USER_ID,
    products_sku as ITEM_ID,
    event as EVENT_TYPE,
    date_part(epoch,"timestamp") as TIMESTAMP
  from prod.order_completed
  UNION
  select
    user_id as USER_ID,
    products_sku as ITEM_ID,
    event as EVENT_TYPE,
    date_part(epoch,"timestamp") as TIMESTAMP
  from prod.product_added
  UNION
  select
    user_id as USER_ID,
    products_sku as ITEM_ID,
    event as EVENT_TYPE,
    date_part(epoch,"timestamp") as TIMESTAMP
  from prod.product_viewed
')
to
's3://mybucket/my_folder'
credentials 'aws_access_key_id=AWS_ACCESS_KEY_ID;aws_secret_access_key=AWS_SECRET_ACCESS_KEY;token=AWS_SESSION_TOKEN'
HEADER
REGION AS '<your-region>'
DELIMITER AS ','
PARALLEL OFF;
```

Note: Use `date_part(epoch,"timestamp") as TIMESTAMP` because Personalize requires timestamps to be specified in UNIX/epoch time.

**Verify the Output file**
Browse to the S3 service page in the AWS console and navigate to the bucket path specified in the `unload` command. You should see the output file.


### From Snowflake

There are a few ways to load a CSV into S3 from your [Snowflake](https://docs.snowflake.net/manuals/user-guide/data-unload-s3.html) warehouse. This example shows loading the data directly into an S3 bucket.

Assuming you have a Personalize schema like that described [below](https://paper.dropbox.com/doc/AWS-Personalize-Public-Docs-Draft--AYzHC6162S0frKZwOTxwK6sxAg-T0BVNjCLNfQZeGUF93ca1#:uid=533004255844735424528405&h2=Part-1---Create-Personalize-Da), you can use the following query to pull out all the date from your `Order Completed`, `Product Added`, and `Product Viewed` events.

**Unload Data from Snowflake to S3**

```sql
    copy into
    s3://mybucket/my_folder/my_file.csv
    from
    (
      select
      user_id as USER_ID,
      products_sku as ITEM_ID,
      event as EVENT_TYPE,
      date_part(epoch,"timestamp") as TIMESTAMP
      from prod.order_completed
      UNION
      select
      user_id as USER_ID,
      products_sku as ITEM_ID,
      event as EVENT_TYPE,
      date_part(epoch,"timestamp") as TIMESTAMP
      from prod.product_added
      UNION
      select
      user_id as USER_ID,
      products_sku as ITEM_ID,
      event as EVENT_TYPE,
      date_part(epoch,"timestamp") as TIMESTAMP
      from prod.product_viewed
    )
    file_format=(type=csv)
    single = true -- Personlize requires a single CSV file
    credentials = (aws_key_id='xxxx' aws_secret_key='xxxxx' aws_token='xxxxxx');
```

This example uses temporary S3 credentials, which are generated by AWS STS and expire after a specific period of time. Temporary credentials are [recommended](https://docs.snowflake.net/manuals/user-guide/data-unload-s3.html#unloading-data-directly-into-an-s3-bucket) to protect access to the bucket.

**Verify the Output file**
Browse to the S3 service page in the AWS console and navigate to the bucket path specified in the `unload` command. You should see the output file.


### From S3

**Historical Data Preparation**

Segment's S3 destination will contain a copy of all of the source data you have configured to go to S3.  In your S3 bucket you will have a folder called `/segment-logs`.  Under this folder will be another folder for each source of data you have connected to your Segment S3 destination.

Note that this step is not required unless you plan to do batch data extraction from S3.

Your Glue ETL job will need to crawl each source folder to extract the backup data that will form your training set.  Analysis of this data set is beyond the scope of this document.  It is strongly recommended you familiarize yourself with the types of events that can be sent through Segment.  Our event structure is described in detail here:  https://segment.com/docs/connections/sources/catalog/libraries/server/http/.

The following examples show how to configure an AWS Glue job to convert Segment historical data into the Apache Avro format that Personalize wants to consume for training data sets.

**Create AWS Glue ETL Job**

Navigate to the Glue service in your AWS console.  Click the "Get started" button and then click "Jobs" in the left navigation on the Glue console page.

![](images/GlueJobs.png)


Click the "Add job" button and enter the following information.

- Enter a job name such as "SegmentEventsJsonToCsv".


- For IAM role, you will need to create a role and execution policies that gives your Glue job the ability to write to your S3 bucket:

Policy 1:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "glue:*",
                "s3:GetBucketLocation",
                "s3:ListBucket",
                "s3:ListAllMyBuckets",
                "s3:GetBucketAcl",
                "ec2:DescribeVpcEndpoints",
                "ec2:DescribeRouteTables",
                "ec2:CreateNetworkInterface",
                "ec2:DeleteNetworkInterface",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeSubnets",
                "ec2:DescribeVpcAttribute",
                "iam:ListRolePolicies",
                "iam:GetRole",
                "iam:GetRolePolicy",
                "cloudwatch:PutMetricData"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:CreateBucket"
            ],
            "Resource": [
                "arn:aws:s3:::aws-glue-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::aws-glue-*/*",
                "arn:aws:s3:::*/*aws-glue-*/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::crawler-public*",
                "arn:aws:s3:::aws-glue-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:*:*:/aws-glue/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateTags",
                "ec2:DeleteTags"
            ],
            "Condition": {
                "ForAllValues:StringEquals": {
                    "aws:TagKeys": [
                        "aws-glue-service-resource"
                    ]
                }
            },
            "Resource": [
                "arn:aws:ec2:*:*:network-interface/*",
                "arn:aws:ec2:*:*:security-group/*",
                "arn:aws:ec2:*:*:instance/*"
            ]
        }
    ]
}
```

Policy 2:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::{ your bucket arn }/segment-logs/*",
                "arn:aws:s3:::{ your bucket arn }/transformed/*"
            ]
        }
    ]
}
```


- Leave Type as "Spark".
- For "This job runs", click the radio button "A new script to be authored by you".
- Leave everything else the same and click Next at the bottom of the form.
- On the "Connections" step click "Save job and edit script" since you will not access data in a database for this job.

The source code for a generic Glue job is below.   Note that you will need to modify this code to reflect the names of the events you wish to extract from the Segment logs (see line #25).

Copy the code example to your clipboard and paste it into the Glue editor window.

```python
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from awsglue.context import GlueContext
from awsglue.dynamicframe import DynamicFrame
from awsglue.job import Job
from pyspark.context import SparkContext
from pyspark.sql.functions import unix_timestamp

## @params: [JOB_NAME,S3_JSON_INPUT_PATH,S3_CSV_OUTPUT_PATH]
args = getResolvedOptions(sys.argv, ['JOB_NAME', 'S3_JSON_INPUT_PATH', 'S3_CSV_OUTPUT_PATH'])

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Load JSON into dynamic frame
datasource0 = glueContext.create_dynamic_frame.from_options('s3', {'paths': [args['S3_JSON_INPUT_PATH']]}, 'json')
print("Input file: ", args['S3_JSON_INPUT_PATH'])
print("Input file total record count: ", datasource0.count())

# Filters the JSON documents that we want included in the output CSV
supported_events = ['Product Added', 'Order Completed', 'Product Clicked']
def filter_function(dynamicRecord):
        if ('anonymousId' in dynamicRecord and
                        'userId' in dynamicRecord and
                        'properties' in dynamicRecord and
                        'sku' in dynamicRecord["properties"] and
                        'event' in dynamicRecord and
                        dynamicRecord['event'] in supported_events):
                return True
        else:
                return False

# Apply filter function to dynamic frame
interactions = Filter.apply(frame = datasource0, f = filter_function, transformation_ctx = "interactions")
print("Filtered record count: ", interactions.count())

# Map only the fields we want in the output CSV, changing names to match target schema.
applymapping1 = ApplyMapping.apply(frame = interactions, mappings = [ \
        ("anonymousId", "string", "ANONYMOUS_ID", "string"), \
        ("userId", "string", "USER_ID", "string"), \
        ("properties.sku", "string", "ITEM_ID", "string"), \
        ("event", "string", "EVENT_TYPE", "string"), \
        ("timestamp", "string", "TIMESTAMP_ISO", "string")], \
        transformation_ctx = "applymapping1")

# Repartition to a single file since that is what is required by Personalize
onepartitionDF = applymapping1.toDF().repartition(1)
# Coalesce timestamp into unix timestamp
onepartitionDF = onepartitionDF.withColumn("TIMESTAMP", \
        unix_timestamp(onepartitionDF['TIMESTAMP_ISO'], "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"))
# Convert back to dynamic frame
onepartition = DynamicFrame.fromDF(onepartitionDF, glueContext, "onepartition_df")

# Write output back to S3 as a CSV
glueContext.write_dynamic_frame.from_options(frame = onepartition, connection_type = "s3", \
        connection_options = {"path": args['S3_CSV_OUTPUT_PATH']}, \
        format = "csv", transformation_ctx = "datasink2")

job.commit()
```

Click "Save" to save the job script.

![](images/GlueEditJobScript.png)


Let's review key parts of the script in more detail. First, the script is initialized with a few job parameters. We'll see how to specify these parameter values when we run the job below. For now, just see we're passing in the location of the raw JSON files using `S3_JSON_INPUT_PATH` and the location where the output CSV should be written through `S3_CSV_OUTPUT_PATH`.

```python
    args = getResolvedOptions(sys.argv, ['JOB_NAME', 'S3_JSON_INPUT_PATH', 'S3_CSV_OUTPUT_PATH'])
```

Next the Spark and Glue contexts are created and associated. A Glue Job is also created and initialized.

```python
    sc = SparkContext()
    glueContext = GlueContext(sc)
    spark = glueContext.spark_session
    job = Job(glueContext)
    job.init(args['JOB_NAME'], args)
```

The first step in our Job is to load the raw JSON file as a Glue DynamicFrame.

```python
    datasource0 = glueContext.create_dynamic_frame.from_options('s3', {'paths': [args['S3_JSON_INPUT_PATH']]}, 'json')
```

Since not all events that are written to S3 by Segment are relevant to training a Personalize model, we'll use Glue's `Filter` transformation to keep only the records we want. The `datasource0` DynamicFrame created above is passed to `Filter.apply(...)` function along with the `filter_function` function. It's in `filter_function` where we keep events that have a product SKU and `userId` specified. The resulting DynamicFrame is captured as `interactions`.

```python
def filter_function(dynamicRecord):
    if dynamicRecord["properties"]["sku"] and dynamicRecord["userId"]:
        return True
    else:
        return False

interactions = Filter.apply(frame = datasource0, f = filter_function, transformation_ctx = "interactions")
```

Next we will call Glue's `ApplyMapping` transformation, passing the `interactions` DynamicFrame from above and field mapping specification that indicates the fields we want to retain and their new names. These mapped field names will become the column names in our output CSV. You'll notice that we're using the product SKU as the `ITEM_ID` and `event`as the `EVENT_TYPE`. We're also renaming the `timestamp` field to `TIMESTAMP_ISO` since the format of this field value in the JSON file is an ISO 8601 date and Personalize requires timestamps to be specified in UNIX time (number seconds since Epoc).

```python
applymapping1 = ApplyMapping.apply(frame = interactions, mappings = [ \
    ("anonymousId", "string", "ANONYMOUS_ID", "string"), \
    ("userId", "string", "USER_ID", "string"), \
    ("properties.sku", "string", "ITEM_ID", "string"), \
    ("event", "string", "EVENT_TYPE", "string"), \
    ("timestamp", "string", "TIMESTAMP_ISO", "string")], \
    transformation_ctx = "applymapping1")
```

To convert the ISO 8601 date format to UNIX time for each record, we'll use Spark's `withColumn(...)` to create a new column called `TIMESTAMP` that is the converted value of the `TIMESTAMP_ISO` field. Before we can call `withColumn`, though, we need to convert the Glue DynamicFrame into a Spark DataFrame. That is accomplished by calling `toDF()` on the output of ApplyMapping transformation above. Since Personalize requires our uploaded CSV to be a single file, we'll call `repartition(1)` on the DataFrame to force all data to be written in a single partition. Finally, after creating the `TIMESTAMP` in the expected format, `DyanmicFrame.fromDF()` is called to convert the DataFrame back into a DyanmicFrame.

```python
    # Repartition to a single file
    onepartitionDF = applymapping1.toDF().repartition(1)
    # Coalesce timestamp into unix timestamp
    onepartitionDF = onepartitionDF.withColumn("TIMESTAMP", \
        unix_timestamp(onepartitionDF['TIMESTAMP_ISO'], "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"))
    # Convert back to dynamic frame
    onepartition = DynamicFrame.fromDF(onepartitionDF, glueContext, "onepartition_df")
```

The last step is to write our CSV back to S3 at the path specified by the `S3_CSV_OUTPUT_PATH` job property and commit the job.

```python
    glueContext.write_dynamic_frame.from_options(frame = onepartition, connection_type = "s3", \
        connection_options = {"path": args['S3_CSV_OUTPUT_PATH']}, \
        format = "csv", transformation_ctx = "datasink2")

    job.commit()
```

**Run Your AWS Glue ETL Job**
With our ETL Job script created and saved, it's time to run the job to create the CSV needed to train a Personalize Solution.

Before going any further, open another AWS console browser tab/window by right-clicking on the AWS logo in the upper left corner of the page and select "Open Link in New Tab" (or Window).

While still in the Glue service console and the job listed, click the "Run job" button. This will cause the Parameters panel to display.

Click the "Security configuration, script libraries, and job parameters" section header to cause the job parameters fields to be displayed.

![](images/GlueRunJobDialog.png)


Scroll down to the "Job parameters" section. This is where we will specify the job parameters that our script expects for the path to the input data and the path to the output file. Create two job parameters with the following key and value.

Be sure to prefix each key with `--` as shown. Substitute your account ID for `[ACCOUNT_ID]` in the values below. You copy the bucket name to your clipboard from the S3 service page in the tab/window you opened above. The order they are specified does not matter.

| **Key**              | **Value**                                      |
| -------------------- | ---------------------------------------------- |
| --S3_JSON_INPUT_PATH | s3://personalize-data-[ACCOUNT_ID]/raw-events/ |
| --S3_CSV_OUTPUT_PATH | s3://personalize-data-[ACCOUNT_ID]/transformed |

![](images/GlueRunJobParams.png)


Click the "Run job" button to start the job.  Not that this dialog scrolls.

Once the job has started running you will see log output in the "Logs" tab at the bottom of the page. It may take a few minutes to complete.

When the job completes click the "X" in the upper right corner of the the page to exit the job script editor.

**Verify Output File**
Browse to the S3 service page in the AWS console and find the bucket with a name starting with `personalize-data-...`. Click on the bucket name. If the job completed successfully you should see a folder named "transformed". Click on "transformed" and you should see the output file created by the ETL job.

![](images/GlueJobOutputFile.png)



## Create Personalize Dataset Group, Solution and Campaign

### Create Personalize Dataset Group

Browse to the Amazon Personalize service landing page in the AWS console.

Click the "View dataset groups" button to get started.


![](images/PersonalizeIntroPage.png)


On the Dataset Groups page, click the "Create dataset group" button.

![](images/PersonalizeDatasetGroups.png)


On the "Create dataset group" page, give your dataset group a name.

Select the "Upload user-item interaction data" radio button since we will be uploading the CSV we prepared in the previous steps.

Click "Next" to continue.

![](images/PersonalizeCreateGroup.png)


On the "Create user-item interaction data" page, select the "Create new schema" radio button and give your schema a name.

![](images/PersonalizeSchema.png)


Scroll down to the "Schema definition" editor. Dataset schemas in Personalize are represented in [Avro](https://avro.apache.org/docs/current/spec.html).  For detailed information on Personalize schema definitions, see: https://docs.aws.amazon.com/personalize/latest/dg/how-it-works-dataset-schema.html.


> Avro is a remote procedure call and data serialization framework developed within Apache's Hadoop project. It uses JSON for defining data types and protocols, and serializes data in a compact binary format.

This example uses the following example schema:

```json
{
    "type": "record",
    "name": "Interactions",
    "namespace": "com.amazonaws.personalize.schema",
    "fields": [
        {
            "name": "USER_ID",
            "type": "string"
        },
        {
            "name": "ITEM_ID",
            "type": "string"
        },
        {
            "name": "EVENT_TYPE",
            "type": "string"
        },
        {
            "name": "TIMESTAMP",
            "type": "long"
        }
    ],
    "version": "1.0"
}
```

Let's review the schema in more detail. The required fields for the user-item interaction dataset schema are `USER_ID`, `ITEM_ID`, and `TIMESTAMP`. Additionally, optional there's an optional field EVENT_TYPE.

Copy the contents of Avro schema to your clipboard and paste it into the "Schema definition" editor (replacing the proposed schema).

Click "Next" to save the schema and move to the next step.

The "Import user-item interaction data" step is displayed next. To complete this form we will need to get two pieces of information from IAM and S3. Give your import job a name and set the automatic import to "Off".

For the "IAM service role", select "Create a new role" from the dropdown. In the next pop-up, we recommend listing your bucket name in the "Specific S3 buckets" option, but you're free to choose the option that best suits your needs.

Next you will need the location of the CSV file you generated in the earlier steps.  This needs to be configured in the "Data Location" field on this screen.

![](images/PersonalizeImportJob.png)

After clicking the "Finish" button at the bottom of the page, you will be returned to the Personalize Dashboard where you can monitor the progress of your interaction dataset as it is being created.

Be patient as this process can take a long time to complete.


![](images/PersonalizeInteractionDatasetCreating.png)

### Create Personalize Solution

Once our event CSV is finished importing into a user-item interaction dataset, we can create a Personalize Solution.

From the Dashboard page for the dataset group we created above, click the "Start" button in the "Create solutions" column.


![](images/PersonalizeCreateSolution.png)


On the "Create solution" page, enter a "Solution name".

For a discussion on the different recipes you can use with Personalize, see [here](https://docs.aws.amazon.com/personalize/latest/dg/working-with-predefined-recipes.html)


![](images/PersonalizeSolutionConfig.png)


Click the "Finish" button to create your Solution. This process can take several minutes to several hours to complete.

![](images/PersonalizeSolutionInProgress.png)

### Create Personalize Campaign

A deployed solution is known as a campaign, and is able to make recommendations for your users. To deploy a solution, you create a campaign in the console or by calling the CreateCampaign API. You can choose which version of the solution to use. By default, a campaign uses the latest version of a solution.

From the Dataset Group Dashboard, click the "Create new campaign" button.

![](images/PersonalizeCreateCampaignDash.png)


Enter the name for your campaign.  Select the solution your created above and click "Create campaign".

![](images/PersonalizeCreateCampaign.png)


Personalize will start creating your new campaign. This process can take several minutes.

![](images/PersonalizeCampaignCreating.png)


In the next section, we will build a real-time clickstream ingestion pipeline that accepts events from Segment and can query the solution you just deployed.

## Getting Recommendations and Live Event Updates

Once you deploy your Personalize solution and enable a Campaign, your Lambda can consume event notifications from Segment and use the Solution and Campaign to react to events which will drive your business cases.

The example code Segment provides below shows how to forward events to the Personalize Solution you deployed to keep your model updated.  It then forwards an `identify` event back to Segment with the recommendations from your Solution.


### Set up Segment IAM policy & role for invoking your Lambda

Segment will need to be able to call ("invoke") your Lambda in order to process events.  This requires you to configure an IAM role for your Lambda which allows the Segment account to invoke your function.

#### Create an IAM policy
To create an IAM policy:
1. Sign in to the [Identity and Access Management (IAM) console](https://console.aws.amazon.com/iam/) and follow these instructions to [Create an IAM policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html) to allow Segment permission to invoke your Lambda function.

2. Select the **Create Policy from JSON** option and use the following template policy in the `Policy Document` field. Be sure to change the `{region}`, `{account-id}` and `{function-names}` with the applicable values. Here's example of a Lambda ARN `arn:aws:lambda:us-west-2:355207333203:function:``my-example-function`.

> note ""
> **NOTE:** You can put in a placeholder ARN for now, as you will need to come back to this step to update with the ARN of your Lambda once that's been created.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "lambda:InvokeFunction"
        ],
        "Resource": [
            "lambda ARN 1",
            "lambda ARN 2",
            ...
            "lambda ARN n"
        ]
    }
  ]
}
```

#### Create an IAM role
To create an IAM role:
1. Sign in to the [Identity and Access Management (IAM) console](https://console.aws.amazon.com/iam/) and follow these instructions to [Create an IAM role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user.html#roles-creatingrole-user-console) to allow Segment permission to invoke your Lambda function.
2. While setting up the new role, add the policy you created in the [previous step](/docs/connections/destinations/catalog/amazon-personalize/#create-an-iam-policy).
3. Finish with any other set up items you may want (like `tags`).
4. Search for and click on your new roles from the [IAM home](https://console.aws.amazon.com/iam/home#/home).
5. Select the **Trust Relationships** tab, then click **Edit trust relationship**.

    ![](images/LambdaTrustRelationship.png)

6. Copy and paste the following into your trust relationship. You should replace `<your-source-id>` with either the Source ID of the attached Segment source (the default) or the custom external ID you set in your Amazon Lambda destination settings.

> note ""
> **NOTE:** Your Source ID can be found by navigating to **Settings > API Keys** from your Segment source homepage.
>
> If you're using an External ID, for security purposes, Segment recommends you to use your Workspace ID as your External ID. If you’re currently using an External ID different from your Workspace ID, you’ll be susceptible to attacks. You can find your Workspace ID by going to:  **Settings > Workspace Settings > ID**.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::595280932656:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "YOUR_SEGMENT_SOURCE_ID"
        }
      }
    }
  ]
}
```

If you have multiple Source's using this Role, replace the `sts:ExternalId` setting above with

```json
    "sts:ExternalId": ["YOUR_SEGMENT_SOURCE_ID", "ANOTHER_SOURCE_ID", "A_THIRD_SOURCE_ID"]
```

### Build a Lambda Function to Process Segment Events

In order to process events from Segment, you will need to provide a lambda function that can handle your event flow.  This function can be used to forward events to a Tracker for your Personalize solution, or to post process events, get recommendations from your Solution, or to push these results back to Segment for later use in the destinations you have configured.

We allow you to send each call type (`track`,`identify`,etc) to a different Lambda function. The example below shows one generic function that could be used to handle any call.

We provide an example Lambda function, written in Python, for you to get up and running.

Start by browsing to the Lambda service page in your AWS account.

Click the "Create a function" button to create a new function.

![](images/LambdaDashboard.png)


Select the "Author from scratch" radio button since we will be providing the source code for the function.

Enter a name for your function and select Python 3.7 for the runtime.

For the "Role" field, select "Create a new role from AWS policy templates" from the dropdown. Create a "Role name" that makes sense for you, and leave "Policy templates" empty. We will come back to modify this role shortly.

Click "Create function".

![](images/LambdaCreateFunction.png)


**Lambda Function Source Code**

First, download the `.zip` file at https://github.com/segmentio/segment-lambda-recipes/blob/master/segment-personalize/support/segment_personalize_boilerplate.zip.

Within the Lambda function screen, scroll down to the "Function code" panel. For "Code entry type" choose "Upload a .zip file", click the "Upload" button, then load the `.zip` you downloaded in the first step.

You should now be able to see the code (and associate folders) in the code editor.

![](images/LambdaFunctionCode.png)

Segment will call your lambda once per event.  The provided code will map Segment event fields from the Segment event it gets, and send them to your Personalize Tracker. It will then call Personalize to get a recommendation for the userId in the event, and push that recommendation back as a user trait into Segment, using the `identify` call.

Make sure you are clicking **Save** frequently during the next steps!

**Wire up Personalize API using Lambda Layer (Preview only)**

You will notice in the function source the following `import` and function call.

```python
import of import init_personalize_api as api_helper
...
api_helper.init()
```

This `import` and function call use some boilerplate code, packaged as a [Lambda Layer](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html), needed to configure the Personalize API with the AWS Python SDK. This is only necessary while Personalize is in Preview. Once Personalize is GA and the API is bundled with the Python SDK, as well as other language SDKs, this supporting Layer will no longer be needed.

To install our Layer, open the Lambda navigation panel and click "Layers".

![Lambda Nav Panel](images/LambdaNav.png)

![Lambda Layers Nav](images/LambdaLayersNav.png)

From the Lambda Layers view, click the "Create layer" button.

![Lambda Create Layer](images/LambdaCreateLayer.png)

Create the layer by specifying a name such as "PersonalizeApiInstaller", browsing to the pre-made zip in https://github.com/segmentio/segment-lambda-recipes/blob/master/segment-personalize/support/python_personalize_init.zip, and select Python 3.7 as the compatible runtime. Click the "Create" button to upload the zip file and create the layer.

![Lambda Create Layer Config](images/LambdaCreateLayerConfig.png)

Next you need to add the layer just created to our function. Return to the Lambda function by opening the Lambda navigation panel and clicking "Functions".

![Lambda Nav Panel](images/LambdaNav.png)

![Lambda Function Layer Add](images/LambdaFunctionsNav.png)

Click on your function name to access the configuration page again. In the Lambda Designer, click the "Layers" panel below the function name and then the "Add layer" button in the "Referenced layers" panel at the bottom of the page.

![Lambda Function Layer Add](images/LambdaLayerAdd.png)

Select the layer we just added and the latest version. Click "Add" to add the layer to the function.

![Lambda Function Layer Add](images/LambdaLayerAddSelect.png)

**Update your IAM role for your Lambda to call Personalize**

You will need to modify the IAM Role & Policy originally created with this Lambda to allow it to send and recieve data from Personalize. From the "Execution role" section of your Lambda function, click the "View the <your-role-name>" link.

![](images/ExecutionRoleIAM.png)

Click the arrow next to your policy in this role, then "Edit Policy".

![](images/EditPolicy.png)

Add the code below to the existing permissions from within the JSON editor. Then "Review Policy" and "Save Changes".

```json
{
    "Effect": "Allow",
    "Action": [
        "personalize:GetRecommendations",
        "personalize:Record",
        "personalize:PutEvents"
    ],
    "Resource": [
        "*"
    ]
}
```

**Wire-up Personalize Event Tracker**

Another dependency in our function is the ability to call the Personalize [PutEvents API](https://docs.aws.amazon.com/personalize/latest/dg/API_UBS_PutEvents.html) endpoint as shown in the following excerpt.

```js
    personalize_events.put_events(
      trackingId = os.environ['personalize_tracking_id'],
      userId = event['userId'],
      sessionId = event['anonymousId'],
      eventList = [
          {
              "eventId": event['messageId'],
              "sentAt": int(dp.parse(event['timestamp']).strftime('%s')),
              "eventType": event['event'],
              "properties": json.dumps(properties)
          }
      ]
      )
```

The `trackingId` function argument identifies the Personalize Event Tracker which should handle the events we submit. This value is passed to our Lambda function as an Environment variable.

Let's create a Personalize Event Tracker for the Dataset Group we created earlier.

In another browser tab/window, browse to the Personalize service landing page in the AWS console.

Click on your Dataset Group and then "Event trackers" in the left navigation.

Click the "Create event tracker" button.

![](images/PersonalizeCreateTracker.png)


Enter a name for your Event Tracker.

You will need to configure a role for Personalize to that allows it to execute the tracker.  This is the same as the execution role you defined earlier for Personalize:

Often this is automatically included as a policy labelled "AmazonPersonalizeFullAccess"

```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "personalize:*"
                ],
                "Resource": "*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "cloudwatch:PutMetricData"
                ],
                "Resource": "*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:GetObject",
                    "s3:PutObject",
                    "s3:DeleteObject",
                    "s3:ListBucket"
                ],
                "Resource": [
                    "arn:aws:s3:::*Personalize*",
                    "arn:aws:s3:::*personalize*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "iam:PassRole"
                ],
                "Resource": "*",
                "Condition": {
                    "StringEquals": {
                        "iam:PassedToService": "personalize.amazonaws.com"
                    }
                }
            }
        ]
    }
```

This may be automatically included as policy "AmazonPersonalize-ExecutionPolicy-<some-set-of-numbers>"

```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": [
                    "s3:ListBucket"
                ],
                "Effect": "Allow",
                "Resource": [
                    "arn:aws:s3:::{ your s3 bucket }"
                ]
            },
            {
                "Action": [
                    "s3:GetObject",
                    "s3:PutObject"
                ],
                "Effect": "Allow",
                "Resource": [
                    "arn:aws:s3:::{ your s3 bucket }/*"
                ]
            }
        ]
    }
```

![](images/PersonalizeEventTrackerConfig.png)


The Event Tracker's tracking ID is displayed on the following page and is also available on the Event Tracker's detail page.

Copy this value to your clipboard.

![](images/PersonalizeEventTrackerCreating.png)


Returning to our Lambda function, paste the Event Tracker's tracking ID into an Environment variable for our function with the key `personalize_tracking_id`.

![](images/LambdaEnvVariable.png)

Next, we need to add environment variables for Segment and for the function to tell it the Personalize Campaign to call for retrieving recommendations.

To obtain the Personalize Campaign ARN, browse to the Personalize service landing page in the AWS console.

Select the Dataset Group you created earlier and then Campaigns in the left navigation.

Click on the campaign you created earlier and copy the "Campaign arn" to your clipboard.

![](images/PersonalizeCampaignArn.png)


Return to our Lambda function and scroll down to the "Environment variables" panel.

Add an environment variable with the key `personalize_campaign_arn` and value of the Campaign ARN in your clipboard. Scroll to the top of the page and click the "Save" button to save your changes.

![](images/LambdaRecCampaignArn.png)

And finally, we need a key for the Segment source that will get our update events.

Go back to your Segment workspace tab or window, and click on the source which will be receiving events from your lambda, and copy the write key from the Overview tab.

![](images/SegmentWriteKey.png)


Back again to your Lambda tab or window, and paste the key under a property called `connections_source_api_key`.

_Make sure to click **Save**_ here or you will need to do this again.

![](images/LambdaRecCampaignArn.png)


Your lambda is now ready to receive events from Segment.  Next, you will need to enable your Segment Personalize Destination.


### Configure Segment Personalize Lambda Destination

Once your Lambda function is enabled, you can send it events from Segment using the Personalize Destination.

Search for "Amazon Personalize" in our catalog. Connect the destination to the source you created previously. Now you will be presented with the Amazon Personalize Settings.

We allow you to send each call type to a different Lambda. If you leave the Lambda field blank for a given call type, we won't attempt to send any of those calls.


**Track**

There are two settings relevant for track calls:

1. Lambda for track calls - the Lambda where we should route track calls.
2. Events - a list of specific events to send. You may send *all* track events (see setting details for instructions on how), but use caution with this option, as it may significantly increase your Lambda costs.


## FAQ

**What is the Log Type Setting?**

This setting controls the [Log Type](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html#API_Invoke_RequestSyntax) for your Lambda function using Cloud Watch. Select option `Tail` if you would like to see [detailed logs](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-functions.html) in Cloud Watch.

**My Lambda <> Segment connection is timing out, what do I do?**

Due to how our event delivery system, [Centrifuge](https://segment.com/blog/introducing-centrifuge/), works, your Lambda can't take more than 5 seconds to run per message. If you're consistently running into timeout issues, you should consult the [AWS Lambda docs](https://docs.aws.amazon.com/lambda/index.html#lang/en_us), as well as docs for your language of choice, for tips on optimizing performance.
