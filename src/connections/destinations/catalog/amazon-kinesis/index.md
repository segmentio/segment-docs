---
rewrite: true
title: Amazon Kinesis Destination
---
[Amazon Kinesis](https://aws.amazon.com/kinesis/) enables you to build custom applications that process or analyze streaming data for specialized needs. Amazon Kinesis Streams can continuously capture and store terabytes of data per hour from hundreds of thousands of sources such as website clickstreams, financial transactions, social media feeds, IT logs, and location-tracking events.

This document was last updated on February 05, 2020. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, [let us know](https://segment.com/help/contact)!

## Getting Started

{% include content/connection-modes.md %}

1. Create a Kinesis stream.
   A stream is composed of multiple shards, each of which provides a fixed unit of capacity. The total capacity of the stream is the sum of the capacities of its shards. Each shard corresponds to 1 MB/s of write capacity and 2 MB/s of read capacity. See the [Amazon Kinesis Developer Guide](http://docs.aws.amazon.com/streams/latest/dev/introduction.html) for more information on estimating number of shards needed for your stream. Follow these [instructions](http://docs.aws.amazon.com/streams/latest/dev/learning-kinesis-module-one-create-stream.html) in order to create a new AWS Kinesis Stream.
2. Create an IAM policy.
   Sign in to the [Identity and Access Management (IAM) console](https://console.aws.amazon.com/iam/) and follow these instructions to [Create an IAM policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html) to allow Segment permission to write to your Kinesis Stream.
   Select the **Create Policy from JSON** option and use the following template policy in the `Policy Document` field. Be sure to change the {region}, {account-id} and {stream-name} with the applicable values.

   ```json
   {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "kinesis:PutRecord",
                  "kinesis:PutRecords"
              ],
              "Resource": [
                  "arn:aws:kinesis:{region}:{account-id}:stream/{stream-name}"
              ]
          }
      ]
   }
   ```
   **Note:** A previous version of this policy document only granted `PutRecord` access, which could slow down Kinesis write times by disallowing file batching. Substitute the updated policy document above to grant Kinesis `PutRecords` (plural) and allow batching.

3. Create an IAM role.
   Follow these instructions to [Create an IAM role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user.html#roles-creatingrole-user-console) to allow Segment permission to write to your Kinesis Stream. When prompted to enter an Account ID, enter "595280932656". Make sure to enable 'Require External ID' and enter your Segment Source ID as the External ID*. This can be found by navigating to Settings > API Keys from your Segment source homepage. When adding permissions to your new role, find the policy you created above and attach it.

   **Note:** If you have multiple sources using Kinesis, enter one of their source IDs here for now and then follow the procedure outlined in the Multiple Sources section at the bottom of this doc once you've completed this step and saved your IAM role.

4. Create a new Kinesis destination.
   In the Segment source that you want to connect to your Kinesis destination, click the "Add Destination" button. Search and select the Amazon Kinesis destination and enter the options: `Role Address`, `region`, `stream`.

## Page
If you're not familiar with the Segment Specs, take a look to understand what the [Page method](https://segment.com/docs/connections/spec/page/) does. An example call would look like:

```js
  analytics.page();
```

## Identify
If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](https://segment.com/docs/connections/spec/identify/) does.  An example call would look like:

```js
analytics.identify('97980cfea0085', {
  email: 'gibbons@example.com',
  name: 'John Gibbons'
});
```

## Track
If you're not familiar with the Segment Specs, take a look to understand what the [Track method](https://segment.com/docs/connections/spec/track/) does. An example call would look like:

```js
analytics.track("User Registered", {
  checkinDate: new Date(),
  myCoolProperty: "foobar",
});
```

### Data Model
Let's say you're connecting your Segment customer data stream to Kinesis Stream `arn:aws:kinesis:{region}:{account-id}:stream/{stream-name}`. If you send Segment the following in a `track` call:
```json
{
  "userId": "user_1",
  "event": "User Registered",
  "properties": {
    "plan": "Pro Annual",
    "account_type" : "Facebook"
  }
}
```

The Segment Kinesis destination issues a `PutRecord` request with the following parameters:
```js
kinesis.putRecord({
  Data: new Buffer(JSON.stringify(msg)).toString('base64')
  PartitionKey: msg.userId() || msg.anonymousId(),
  StreamName: 'stream-name'
});
```

Segment uses the the `userId || anonymousId` as the `PartitionKey`. The partition key is used by Amazon Kinesis to distribute data across shards. Amazon Kinesis segregates the data records that belong to a stream into multiple shards, using the partition key associated with each data record to determine which shard a given data record belongs to.

**Note:** The JSON payload is base64 stringified.

## Group
If you're not familiar with the Segment Specs, take a look to understand what the [Group method](https://segment.com/docs/connections/spec/group/) does.

An example group call is shown below:
```js
analytics.group("0e8c78ea9d9dsasahjg", {
  name: "group_name",
  employees: 3,
  plan: "enterprise",
  industry: "Technology"
});
```

## Troubleshooting
When you get started, we recommend using any of the open source [Kinesis tailing utility](https://github.com/search?utf8=%E2%9C%93&q=kinesis-tail) to validate that data is flowing correctly!

## Best Practices

### Updating IAM role permissions for encryption
Extra permissions need to be added to IAM role if using at-rest encryption on the Kinesis stream. An updated role policy like below should resolve issues when submitting PutRecords into Kinesis stream using encryption:

```json
{
	"Version": "2012-10-17",
	"Statement": [{
		"Effect": "Allow",
		"Action": ["kms:GenerateDataKey"],
		"Resource": "${aws_kms_key.kinesis_key.arn}"
	}, {
		"Effect": "Allow",
		"Action": ["kinesis:PutRecord", "kinesis:PutRecords"],
		"Resource": ["${aws_kinesis_stream.kinesis1.arn}"]
	}]
}
```

### Multiple Sources
If you have multiple sources using Kinesis/Firehose, you have two options:

### Attach multiple sources to your IAM role
Find the IAM role you created for this destination in the AWS Console in Services > IAM > Roles. Click on the role, and navigate to the **Trust Relationships** tab. Click **Edit trust relationship**. You should see a snippet that looks something that looks like this:

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
Replace that snippet with the following, and replace the contents of the array with all of your source IDs.
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
          "sts:ExternalId": ["YOUR_SEGMENT_SOURCE_ID", "ANOTHER_SOURCE_ID", "A_THIRD_SOURCE_ID"]
        }
      }
    }
  ]
}
```

### Migrating to PutRecords
The Kinesis destination will default to use PutRecords. A previous version of the IAM policy document only granted `PutRecord` access, which can slow down Kinesis write times and degrade data deliverability. Substitute the updated policy document above to grant Kinesis `PutRecords` (plural) and allow batching, like this: 
   ```json
   {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "kinesis:PutRecord",
                  "kinesis:PutRecords"
              ],
              "Resource": [
                  "arn:aws:kinesis:{region}:{account-id}:stream/{stream-name}"
              ]
          }
      ]
   }
   ```
Once you update your IAM policy, Segment systems will automatically default to use PutRecords for more efficient data transmission. This is a zero-downtime change and will not have any impact on your data other than increasing the deliverability success rate.

### Use a single secret ID
If you have so many sources using Kinesis that it is impractical to attach all of their IDs to your IAM role, you can instead opt to set a single ID to use instead. This approach should be avoided in favor of the above approach if possible since it will result in you having to keep track of a secret value. To set this value, go to the Kinesis destination settings from each of your Segment sources and set the 'Secret ID' to a value of your choosing. This value is a secret and should be treated as sensitively as a password. Once all of your sources have been updated to use this value, find the IAM role you created for this destination in the AWS Console in Services > IAM > Roles. Click on the role, and navigate to the **Trust Relationships** tab. Click **Edit trust relationship**. You should see a snippet that looks something that looks like this:

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
Replace your source ID (found at "YOUR_SEGMENT_SOURCE_ID") with your secret ID.
