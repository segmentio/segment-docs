---
title: Limits and Supported Data Types
---

Learn more about the use and rate limits Segment placed on Reverse ETL and the objects and arrays Segment supports. 

## Limits
To provide consistent performance and reliability at scale, Segment enforces default use and rate limits for Reverse ETL.

### Usage limits
Reverse ETL usage limits are measured based on the number of records processed to each destination – this includes both successful and failed records. For example, if you processed 50k records to Braze and 50k records to Mixpanel, then your total Reverse ETL usage is 100k records.

Processed records represents the number of records Segment attempts to send to each destination. Keep in mind that not all processed records are successfully delivered, for example, such as when the destination experiences an issue.

Your plan determines how many Reverse ETL records you can process in one monthly billing cycle. When your limit is reached before the end of your billing period, your syncs will pause and then resume on your next billing cycle. To see how many records you’ve processed using Reverse ETL, navigate to **Settings > Usage & billing** and select the **Reverse ETL** tab.

Plan | Number of Reverse ETL records you can process to destinations per month | How to increase your number of Reverse ETL records
---- | --------------------------------------------------------------------------- | ---------------------------------------------------
Free | 500K | Upgrade to the Teams plan in the Segment app by navigating to **Settings > Usage & billing**.
Teams | 1 million | Contact your sales representative to upgrade your plan to Business.
Business | 50 x the number of [MTUs](/docs/guides/usage-and-billing/mtus-and-throughput/#what-is-an-mtu) <br>or .25 x the number of monthly API calls | Contact your sales rep to upgrade your plan.

If you have a non-standard or high volume usage plan, you may have unique Reverse ETL limits or custom pricing.

### Configuration limits

Name | Details | Limit
--------- | ------- | ------
Model query length | The maximum length for the model SQL query. | 131,072 characters
Model identifier column name length | The maximum length for the ID column name. | 191 characters
Model timestamp column name length | The maximum length for the timestamp column name. | 191 characters
Sync frequency | The shortest possible duration Segment allows between syncs. | 15 minutes

### Extract limits
The extract phase is the time spent connecting to your database, executing the model query, updating internal state tables and staging the extracted records for loading.

Name | Details | Limit
----- | ------- | ------
Record count | The maximum number of records a single sync will process. Note: This is the number of records extracted from the warehouse not the limit for the number of records loaded to the destination (for example, new/update/deleted). | 30 million records
Column count | The maximum number of columns a single sync will process. | 512 columns
Column name length | The maximum length of a record column. | 128 characters
Record JSON size | The maximum size for a record when converted to JSON (some of this limit is used by Segment). | 512 KiB
Column JSON size | The maximum size of any single column value. | 128 KiB

## Supported object and arrays 

When you set up destination actions in Reverse ETL, depending on the destination, some [mapping fields](#step-4-create-mappings) may require data to be in the form of an [object](#object-mapping) or [array](#array-mapping). 

### Object mapping
You can send data to a mapping field that requires object data. An example of object mapping is an `Order completed` model with a `Products` column that’s in object format. 

Example: 
    
    {
        "product": {
            "id": 0001,
            "color": "pink",
            "name": "tshirt",
            "revenue": 20,
            "inventory": 500
        }
    }

To send data to a mapping field that requires object data, you can choose between these two options: 

Option | Details
------ | --------
Customize object | This enables you to manually set up the mapping fields with any data from the model. If the model contains some object data, you can select properties within the object to set up the mappings as well.
Select object | This enables you to send all nested properties within an object. The model needs to provide data in the format of the object. 

> success ""
> Certain object mapping fields have a fixed list of properties they can accept. If the names of the nested properties in your object don't match with the destination properties, the data won't send. Segment recommends you to use **Customize Object** to ensure your mapping is successful.


### Array mapping
To send data to a mapping field that requires array data, the model must provide data in the format of an array of objects. An example is an `Order completed` model with a `Product purchased` column that’s in an array format.

Example: 

    
    [
    {
        "currency": "USD",
        "price": 40,
        "productName": "jacket",
        "purchaseTime": "2021-12-17 23:43:47.102",
        "quantity": 1
    },
    {
        "currency": "USD",
        "price": 5,
        "productName": "socks",
        "quantity": 2
    }
    ]
    

To send data to a mapping field that requires array data, you can choose between these two options: 

Option | Details
------ | --------
Customize array | This enables you to select the specific nested properties to send to the destination. 
Select array | This enables you to send all nested properties within the array.

> success ""
> Certain array mapping fields have a fixed list of properties they can accept. If the names of the nested properties in your array don't match the destination properties, the data won't send. Segment recommends you to use the **Customize array** option to ensure your mapping is successful.

Objects in an array don't need to have the same properties. If a user selects a missing property in the input object for a mapping field, the output object will miss the property. 